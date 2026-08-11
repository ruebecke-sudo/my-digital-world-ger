// GET /.netlify/functions/stil-probe - Stile an einem Testfoto ausprobieren
//
// Zum Abnehmen der Portraet-Idee gedacht, nicht fuer Kunden. Die Funktion
// verwandelt ein hochgeladenes Foto in einen der Stile aus lib/stile.mjs und
// gibt das Ergebnis direkt als Bild zurueck.
//
//   ?probe=<Schluessel>&liste=1        zeigt die zuletzt hochgeladenen Fotos
//   ?probe=<Schluessel>&stile=1        zeigt die verfuegbaren Stile
//   ?probe=<Schluessel>&foto=<UUID>&stil=ritter
//
// Jeder Aufruf mit "stil" kostet eine Bildgenerierung (wenige Cent). Die Datei
// darf geloescht werden, sobald die Auswahl steht.

import { uploadsStore, siteUrl, json } from "../../lib/shared.mjs";
import { STILE, STIL_LISTE } from "../../lib/stile.mjs";

const PROBE_SCHLUESSEL = "mdw-stile-2026";
const API = "https://api.replicate.com/v1";

async function verwandeln(bildUrl, auftrag) {
  const kopf = {
    Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(`${API}/models/black-forest-labs/flux-kontext-pro/predictions`, {
    method: "POST",
    headers: kopf,
    body: JSON.stringify({
      input: {
        prompt: auftrag,
        input_image: bildUrl,
        aspect_ratio: "match_input_image",
        output_format: "png",
        safety_tolerance: 2,
      },
    }),
  });
  if (!res.ok) throw new Error(`Replicate ${res.status}: ${await res.text()}`);

  let p = await res.json();
  const ende = Date.now() + 150000;
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
    p = await (await fetch(`${API}/predictions/${p.id}`, { headers: kopf })).json();
  }
  throw new Error("Zeitüberschreitung bei der Verwandlung.");
}

export default async req => {
  const p = new URL(req.url).searchParams;
  if (p.get("probe") !== PROBE_SCHLUESSEL) return json({ error: "Nicht erlaubt." }, 401);

  try {
    if (p.get("stile")) return json({ stile: STIL_LISTE });

    // Zuletzt hochgeladene Fotos auflisten, damit sich der Schluessel eines
    // frisch hochgeladenen Testfotos finden laesst.
    if (p.get("liste")) {
      const { blobs } = await uploadsStore().list();
      const mitZeit = [];
      for (const { key } of blobs.slice(-25)) {
        const { metadata } = (await uploadsStore().getMetadata(key)) || {};
        mitZeit.push({ schluessel: key, erstellt: metadata?.erstellt || "unbekannt" });
      }
      mitZeit.sort((a, b) => String(b.erstellt).localeCompare(String(a.erstellt)));
      return json({ neueste: mitZeit.slice(0, 8) });
    }

    const schluessel = p.get("foto");
    const stilId = p.get("stil");
    const stil = STILE[stilId];
    if (!schluessel) return json({ error: "Bitte foto=<UUID> angeben." }, 400);
    if (!stil) return json({ error: "Unbekannter Stil.", moeglich: Object.keys(STILE) }, 400);

    const roh = await uploadsStore().get(schluessel, { type: "arrayBuffer" });
    if (!roh) return json({ error: "Foto nicht gefunden." }, 404);

    const quelle = `${siteUrl()}/.netlify/functions/foto?schluessel=${schluessel}`;
    const fertig = await verwandeln(quelle, stil.auftrag);

    const sharp = (await import("sharp")).default;
    return new Response(await sharp(fertig).jpeg({ quality: 90 }).toBuffer(), {
      headers: { "Content-Type": "image/jpeg", "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("Stilprobe fehlgeschlagen:", err);
    return json({ error: String(err?.message || err) }, 500);
  }
};
