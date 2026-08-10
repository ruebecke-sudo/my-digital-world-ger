// POST /.netlify/functions/generate-background
// Background-Function (bis 15 Minuten Laufzeit). Wird von webhook.mjs nach
// erfolgreicher Zahlung mit { orderId } angestossen.
//
// Ablauf: SD3 generiert das Motiv -> Real-ESRGAN rechnet hoch, falls das
// Zielformat groesser ist -> sharp bringt es exakt auf Zielmass -> zwei
// Fassungen in Blobs: "_preview" mit MDW-Logo, "_download" ohne.

import {
  getOrder, saveOrder, imagesStore, addBranding, textAufbringen, MOTIFS,
} from "../../lib/shared.mjs";
import { getFormat, DEFAULT_FORMAT } from "../../lib/formats.mjs";

const API = "https://api.replicate.com/v1";
const authHeader = () => ({ Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` });

// Ueber den Model-Endpoint aufrufen - so brauchen wir keinen Versions-Hash.
async function startPrediction(model, input) {
  const res = await fetch(`${API}/models/${model}/predictions`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });
  if (!res.ok) throw new Error(`Replicate ${model} -> ${res.status}: ${await res.text()}`);
  return res.json();
}

async function warteAufErgebnis(prediction, maxSekunden = 540) {
  let p = prediction;
  const ende = Date.now() + maxSekunden * 1000;
  while (Date.now() < ende) {
    if (p.status === "succeeded") return p.output;
    if (p.status === "failed" || p.status === "canceled") {
      throw new Error(`Prediction ${p.status}: ${p.error || "kein Grund angegeben"}`);
    }
    await new Promise(r => setTimeout(r, 4000));
    const res = await fetch(`${API}/predictions/${p.id}`, { headers: authHeader() });
    if (!res.ok) throw new Error(`Statusabfrage fehlgeschlagen: ${res.status}`);
    p = await res.json();
  }
  throw new Error("Zeitueberschreitung bei der Bildgenerierung.");
}

const ersteUrl = out => (Array.isArray(out) ? out[0] : out);

async function ladeBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Bild nicht abrufbar: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// Netlify Blobs erwartet string | ArrayBuffer | Blob - Buffer sauber umwandeln.
const alsArrayBuffer = buf =>
  buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);

export default async req => {
  if (req.headers.get("x-internal-key") !== process.env.INTERNAL_SECRET) {
    return new Response("Nicht erlaubt.", { status: 401 });
  }

  let orderId = null;
  try {
    ({ orderId } = await req.json());
    const order = await getOrder(orderId);
    if (!order) return new Response("Bestellung nicht gefunden.", { status: 404 });
    if (order.status === "done") return new Response("Bereits fertig.", { status: 200 });

    const format = getFormat(order.formatId) || getFormat(DEFAULT_FORMAT);
    const motif = MOTIFS[order.motifId];
    if (!motif) throw new Error("Motiv unbekannt: " + order.motifId);

    order.status = "generating";
    await saveOrder(order);

    // 1) Bildgrundlage besorgen.
    //    Hat das Motiv ein festes Bild hinterlegt (basisBild), wird nichts
    //    generiert: der Kunde bekommt genau das Bild, das er in der Auswahl
    //    gesehen hat. Kein KI-Aufruf, keine Wartezeit, kein Zufall. Nur wenn
    //    kein festes Bild vorliegt, malt FLUX 1.1 pro die Szene - ohne Text.
    const sharp = (await import("sharp")).default;
    const basis = motif.basisBild;
    let motivUrl;
    let bild;

    if (basis) {
      motivUrl = new URL(basis, process.env.URL || "https://my-digital-world.de").href;
      bild = await ladeBuffer(motivUrl);
    } else {
      const gen = await startPrediction("black-forest-labs/flux-1.1-pro", {
        prompt: order.prompt,
        aspect_ratio: format.ar,
        output_format: "png",
        output_quality: 100,
      });
      motivUrl = ersteUrl(await warteAufErgebnis(gen));
      bild = await ladeBuffer(motivUrl);
    }

    // 2) Hochrechnen, wenn das Zielformat mehr Pixel braucht.
    const meta = await sharp(bild).metadata();
    const faktor = Math.max(format.w / meta.width, format.h / meta.height);
    if (faktor > 1.05) {
      const up = await startPrediction("nightmareai/real-esrgan", {
        image: motivUrl,
        scale: Math.min(4, Math.ceil(faktor)),
        face_enhance: false,
      });
      bild = await ladeBuffer(ersteUrl(await warteAufErgebnis(up)));
    }

    // 3) Exakt auf Zielmass. Zuschnitt mittig: es fallen die Seiten weg,
    //    Headline oben und Titelplatte unten bleiben vollstaendig.
    // 3) Exakt auf Zielmass. Zuschnitt mittig: es fallen die Seiten weg.
    const grundlage = await sharp(bild)
      .resize(format.w, format.h, { fit: "cover", position: "centre", kernel: "lanczos3" })
      .png()
      .toBuffer();

    // 4) Typografie als Vektorebene aufstempeln - Name und Kundentext
    //    erscheinen dadurch garantiert korrekt und fehlerfrei.
    const mitText = await textAufbringen(grundlage, motif, order.name, order.text);

    const druckfertig = await sharp(mitText)
      .jpeg({ quality: format.jpeg, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();

    // 4) Vorschau fuers Web: mit Logo, kleiner gerechnet
    const vorschau = await addBranding(
      await sharp(druckfertig)
        .resize({ width: Math.min(1400, format.w), withoutEnlargement: true })
        .toBuffer()
    );

    await imagesStore().set(`${orderId}_preview`, alsArrayBuffer(vorschau));
    await imagesStore().set(`${orderId}_download`, alsArrayBuffer(druckfertig));

    order.status = "done";
    order.breite = format.w;
    order.hoehe = format.h;
    order.dateigroesse = druckfertig.length;
    order.fertigAt = new Date().toISOString();
    await saveOrder(order);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Generierung fehlgeschlagen:", err);
    if (orderId) {
      const order = await getOrder(orderId);
      if (order) {
        order.status = "error";
        order.fehler = String(err?.message || err);
        await saveOrder(order);
      }
    }
    return new Response("Fehler bei der Generierung.", { status: 500 });
  }
};
