// GET /.netlify/functions/foto-probe - Poster aus einem Foto ansehen, ohne Kauf
//
// Nur zum Pruefen gedacht: zeigt, wie ein hochgeladenes Foto mit Zuschnitt,
// Typografie und - auf Wunsch - Pixar-Verwandlung aussieht. Damit laesst sich
// die Strecke abnehmen, bevor ein Kunde dafuer bezahlt.
//
//   ?probe=<Schluessel>   Pflicht, sonst passiert nichts
//   &foto=<UUID>          hochgeladenes Foto aus dem Shop
//   &bild=<Adresse>       oder ein Bild von unserer eigenen Seite
//   &stil=pixar|pur       Verwandlung ja oder nein (Standard: pur)
//   &bezeichnung=...&name=...&text=...
//
// Der Aufruf kostet bei "pixar" genau eine Bildgenerierung. Die Funktion darf
// deshalb geloescht werden, sobald alles steht.

import { uploadsStore, textAufbringen, addBranding, siteUrl, json } from "../../lib/shared.mjs";

const PROBE_SCHLUESSEL = "mdw-probe-2026";
const EIGENE_SEITEN = ["my-digital-world.de", "mdw-mainsite.netlify.app"];

const API = "https://api.replicate.com/v1";

const PIXAR_AUFTRAG =
  "Turn this photo into an ultra high quality 3D animated movie character in " +
  "Pixar and DreamWorks style. Keep the person clearly recognizable: same face " +
  "shape, same hairstyle, same hair colour, same clothing, same pose and the " +
  "same expression. Slightly stylised proportions with large expressive eyes, " +
  "soft skin shading, warm cinematic lighting, vibrant saturated colours, " +
  "detailed but calm background in the same setting as the photo. " +
  "Absolutely no text, no letters, no watermarks, no logos.";

async function verwandeln(bildUrl) {
  const kopf = {
    Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(`${API}/models/black-forest-labs/flux-kontext-pro/predictions`, {
    method: "POST",
    headers: kopf,
    body: JSON.stringify({
      input: {
        prompt: PIXAR_AUFTRAG,
        input_image: bildUrl,
        aspect_ratio: "match_input_image",
        output_format: "png",
        safety_tolerance: 2,
      },
    }),
  });
  if (!res.ok) throw new Error(`Replicate ${res.status}: ${await res.text()}`);

  let p = await res.json();
  const ende = Date.now() + 120000;
  while (Date.now() < ende) {
    if (p.status === "succeeded") {
      const out = Array.isArray(p.output) ? p.output[0] : p.output;
      const bild = await fetch(out);
      return Buffer.from(await bild.arrayBuffer());
    }
    if (p.status === "failed" || p.status === "canceled") {
      throw new Error(`Verwandlung ${p.status}: ${p.error || "kein Grund angegeben"}`);
    }
    await new Promise(r => setTimeout(r, 3000));
    const nach = await fetch(`${API}/predictions/${p.id}`, { headers: kopf });
    p = await nach.json();
  }
  throw new Error("Zeitüberschreitung bei der Verwandlung.");
}

export default async req => {
  const p = new URL(req.url).searchParams;
  if (p.get("probe") !== PROBE_SCHLUESSEL) return json({ error: "Nicht erlaubt." }, 401);

  try {
    const sharp = (await import("sharp")).default;
    let bild;

    const fotoSchluessel = p.get("foto");
    const bildAdresse = p.get("bild");

    if (fotoSchluessel) {
      const roh = await uploadsStore().get(fotoSchluessel, { type: "arrayBuffer" });
      if (!roh) return json({ error: "Foto nicht gefunden." }, 404);
      bild = Buffer.from(roh);
    } else if (bildAdresse) {
      const ziel = new URL(bildAdresse);
      if (!EIGENE_SEITEN.some(d => ziel.hostname.endsWith(d))) {
        return json({ error: "Nur Bilder von der eigenen Seite." }, 400);
      }
      const res = await fetch(ziel.href);
      if (!res.ok) return json({ error: "Bild nicht abrufbar." }, 400);
      bild = Buffer.from(await res.arrayBuffer());
    } else {
      return json({ error: "Bitte foto= oder bild= angeben." }, 400);
    }

    // Fuer die Verwandlung braucht Replicate eine oeffentliche Adresse.
    if (p.get("stil") === "pixar") {
      const quelle = fotoSchluessel
        ? `${siteUrl()}/.netlify/functions/foto?schluessel=${fotoSchluessel}`
        : new URL(bildAdresse).href;
      bild = await verwandeln(quelle);
    }

    // Hochformat wie im Shop: 1080 x 1920, Ausschnitt nach Bildinhalt.
    const zugeschnitten = await sharp(bild)
      .resize(1080, 1920, { fit: "cover", position: sharp.strategy.attention, kernel: "lanczos3" })
      .png()
      .toBuffer();

    const motiv = {
      eigenesFoto: p.get("stil") === "pixar" ? "pixar" : "pur",
      bezeichnung: (p.get("bezeichnung") || "").trim(),
      kurz: (p.get("bezeichnung") || "").trim().toUpperCase(),
      anrede: "ich bin der",
      titel: "Probe",
    };

    const beschriftet = await textAufbringen(
      zugeschnitten, motiv, p.get("name") || "", p.get("text") || "");
    const fertig = await addBranding(beschriftet);

    return new Response(await sharp(fertig).jpeg({ quality: 88 }).toBuffer(), {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("Probe fehlgeschlagen:", err);
    return json({ error: String(err?.message || err) }, 500);
  }
};
