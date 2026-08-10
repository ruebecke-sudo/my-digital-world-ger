// POST /.netlify/functions/generate-background
// Background-Function (bis 15 Minuten Laufzeit). Wird von webhook.mjs nach
// erfolgreicher Zahlung mit { orderId } angestossen.
//
// Drei Wege:
//
// A) Motiv mit festem Bild (basisBild) - der Normalfall. Das Poster ist fertig
//    gemalt und liegt im Projekt. Es wird geladen, auf Zielgroesse gebracht,
//    Name und Spruch kommen auf die Milchglasflaeche. Keine KI, keine
//    Wartezeit, kein Zufall: der Kunde bekommt genau das Bild aus der Auswahl.
//
// B) Eigenes Foto des Kunden (eigenesFoto). Bei "pixar" verwandelt FLUX Kontext
//    das Foto in eine 3D-Comicfigur und behaelt dabei die Aehnlichkeit; bei
//    "pur" bleibt das Foto, wie es ist. Darauf kommt nur, was der Kunde selbst
//    eingegeben hat.
//
// C) Motiv ohne Bild - FLUX 1.1 pro malt die Szene ohne Text, dann wird die
//    komplette Typografie darueber gelegt (aeltester Weg).
//
// In allen Faellen entstehen zwei Fassungen in Blobs: "_preview" fuers Web,
// "_download" in voller Groesse.

import {
  getOrder, saveOrder, imagesStore, addBranding, textAufbringen, MOTIFS, siteUrl,
} from "../../lib/shared.mjs";
import { getFormat, DEFAULT_FORMAT } from "../../lib/formats.mjs";
import { posterMailSenden } from "../../lib/mail.mjs";

const API = "https://api.replicate.com/v1";
const authHeader = () => ({ Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` });

// Auftrag an FLUX Kontext. Wichtig ist der Hinweis, Gesicht und Kleidung zu
// erhalten - sonst entsteht zwar eine huebsche Comicfigur, aber niemand
// erkennt mehr, wer da abgebildet ist.
const PIXAR_AUFTRAG =
  "Turn this photo into an ultra high quality 3D animated movie character in " +
  "Pixar and DreamWorks style. Keep the person clearly recognizable: same face " +
  "shape, same hairstyle, same hair colour, same clothing, same pose and the " +
  "same expression. Slightly stylised proportions with large expressive eyes, " +
  "soft skin shading, warm cinematic lighting, vibrant saturated colours, " +
  "detailed but calm background in the same setting as the photo. " +
  "Absolutely no text, no letters, no watermarks, no logos.";

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

// Groesstmoegliche Flaeche im Zielformat, die das Seitenverhaeltnis des
// Posters behaelt.
//
// Die festen Poster sind im Hochformat 9:16 gemalt. Ein DIN-Format ist
// deutlich breiter. Wuerde man wie bisher formatfuellend zuschneiden, fiele
// oben die Ueberschrift und unten die Trophaee weg - also genau das, was das
// Poster ausmacht. Deshalb bleibt das Poster vollstaendig und bekommt
// seitlich einen Rand.
function innenMass(breite, hoehe, format) {
  const faktor = Math.min(format.w / breite, format.h / hoehe);
  return {
    w: Math.max(1, Math.round(breite * faktor)),
    h: Math.max(1, Math.round(hoehe * faktor)),
  };
}

// Fuellt den Rand mit dem eigenen Bild: stark weichgezeichnet, abgedunkelt,
// formatfuellend. Das wirkt wie ein Passepartout aus derselben Szene und
// deutlich hochwertiger als ein schwarzer Balken.
async function aufFormatSetzen(sharp, poster, quelle, format) {
  const meta = await sharp(poster).metadata();
  if (meta.width === format.w && meta.height === format.h) return poster;

  const hintergrund = await sharp(quelle)
    .resize(format.w, format.h, { fit: "cover", position: "centre" })
    .blur(Math.max(20, format.w * 0.02))
    .modulate({ brightness: 0.55, saturation: 0.85 })
    .png()
    .toBuffer();

  return await sharp(hintergrund)
    .composite([{
      input: poster,
      left: Math.round((format.w - meta.width) / 2),
      top: Math.round((format.h - meta.height) / 2),
    }])
    .png()
    .toBuffer();
}

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

    const sharp = (await import("sharp")).default;
    const basis = motif.basisBild;
    const eigenes = motif.eigenesFoto;
    let motivUrl;
    let bild;

    // 1) Bildgrundlage besorgen.
    if (basis) {
      motivUrl = new URL(basis, process.env.URL || "https://my-digital-world.de").href;
      bild = await ladeBuffer(motivUrl);
    } else if (eigenes) {
      if (!order.fotoSchluessel) throw new Error("Zur Bestellung fehlt das Foto.");
      motivUrl = `${siteUrl()}/.netlify/functions/foto?schluessel=${order.fotoSchluessel}`;
      bild = await ladeBuffer(motivUrl);

      if (eigenes === "pixar") {
        const verwandelt = await startPrediction("black-forest-labs/flux-kontext-pro", {
          prompt: PIXAR_AUFTRAG,
          input_image: motivUrl,
          aspect_ratio: "match_input_image",
          output_format: "png",
          safety_tolerance: 2,
        });
        motivUrl = ersteUrl(await warteAufErgebnis(verwandelt));
        bild = await ladeBuffer(motivUrl);
      }
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

    // 2) Zielmass bestimmen. Festes Bild: vollstaendig sichtbar mit Rand.
    //    Generiertes Bild: wie bisher formatfuellend.
    const meta = await sharp(bild).metadata();
    const ziel = basis
      ? innenMass(meta.width, meta.height, format)
      : { w: format.w, h: format.h };

    // 3) Hochrechnen, wenn das Zielmass mehr Pixel braucht.
    //
    // Real-ESRGAN muss das Bild dafuer selbst von unserer Seite laden. Klappt
    // das nicht - etwa weil das Modell mit webp nichts anfangen kann oder der
    // Dienst gerade streikt -, rechnet sharp im naechsten Schritt selbst hoch.
    // Ein etwas weicheres Poster ist allemal besser als eine Bestellung, die
    // mit einer Fehlermeldung endet, obwohl der Kunde bezahlt hat.
    const faktor = Math.max(ziel.w / meta.width, ziel.h / meta.height);
    if (faktor > 1.05) {
      try {
        const up = await startPrediction("nightmareai/real-esrgan", {
          image: motivUrl,
          scale: Math.min(4, Math.ceil(faktor)),
          face_enhance: false,
        });
        bild = await ladeBuffer(ersteUrl(await warteAufErgebnis(up)));
      } catch (err) {
        console.warn("Hochrechnen uebersprungen:", err?.message || err);
      }
    }

    // 4) Exakt auf Zielmass.
    const poster = basis
      ? await sharp(bild)
        .resize(ziel.w, ziel.h, { fit: "fill", kernel: "lanczos3" })
        .png().toBuffer()
      : await sharp(bild)
        .resize(format.w, format.h, {
          fit: "cover",
          position: eigenes ? sharp.strategy.attention : "centre",
          kernel: "lanczos3",
        })
        .png().toBuffer();

    // 5) Beschriften. Bei festem Bild nur Name und Spruch auf der
    //    Milchglasflaeche - Ueberschrift und Trophaee sind schon im Bild.
    // "Grillmeister des Jahres" wuerde sich mit dem Balken "DES JAHRES."
    // darunter doppeln. Die Endung deshalb abschneiden - egal, wie der Kunde
    // sie geschrieben hat.
    const bezeichnungRein = (order.bezeichnung || "")
      .trim()
      .replace(/\s*[-–—]?\s*des\s+jahres\.?$/i, "")
      .trim();
    const motivFuerText = eigenes
      ? { ...motif, bezeichnung: bezeichnungRein, kurz: bezeichnungRein.toUpperCase() }
      : motif;
    const beschriftet = await textAufbringen(poster, motivFuerText, order.name, order.text);

    // 6) Auf das volle Format bringen (nur beim festen Bild noetig).
    const grundlage = basis
      ? await aufFormatSetzen(sharp, beschriftet, bild, format)
      : beschriftet;

    const druckfertig = await sharp(grundlage)
      .jpeg({ quality: format.jpeg, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();

    // 7) Vorschau fuers Web, kleiner gerechnet. Die festen Poster tragen Logo
    //    und Copyright bereits im Bild - dort waere ein zweites Logo doppelt.
    const kleiner = await sharp(druckfertig)
      .resize({ width: Math.min(1400, format.w), withoutEnlargement: true })
      .toBuffer();
    const vorschau = basis ? kleiner : await addBranding(kleiner);

    await imagesStore().set(`${orderId}_preview`, alsArrayBuffer(vorschau));
    await imagesStore().set(`${orderId}_download`, alsArrayBuffer(druckfertig));

    order.status = "done";
    order.breite = format.w;
    order.hoehe = format.h;
    order.dateigroesse = druckfertig.length;
    order.fertigAt = new Date().toISOString();
    await saveOrder(order);

    // Das Original des Kunden wird jetzt nicht mehr gebraucht. Weg damit -
    // ein Portraetfoto laenger aufzubewahren als noetig waere schlechter Stil.
    if (order.fotoSchluessel) {
      try {
        const { uploadsStore } = await import("../../lib/shared.mjs");
        await uploadsStore().delete(order.fotoSchluessel);
      } catch (err) {
        console.warn("Kundenfoto blieb liegen:", err?.message || err);
      }
    }

    // Mail mit dem dauerhaften Link. Schlaegt sie fehl, bleibt die Bestellung
    // trotzdem fertig - der Kunde hat seine Seite ja noch offen.
    try {
      console.log("Postermail:", await posterMailSenden(order, format, siteUrl()));
    } catch (err) {
      console.error("Postermail fehlgeschlagen:", err?.message || err);
    }

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
