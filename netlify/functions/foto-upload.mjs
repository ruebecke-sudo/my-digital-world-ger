// POST /.netlify/functions/foto-upload - Kundenfoto entgegennehmen
//
// Der Browser verkleinert das Foto vor dem Senden auf hoechstens 1600 px und
// schickt es als Daten-URL. Das haelt uns unter dem Groessenlimit einer
// Netlify-Function und spart dem Kunden Wartezeit.
//
// Gespeichert wird unter einem zufaelligen Schluessel im Blob-Store "uploads".
// Der Schluessel ist die einzige Kennung - wer ihn nicht hat, kommt an das Bild
// nicht heran.

import crypto from "node:crypto";
import { uploadsStore, json } from "../../lib/shared.mjs";

const ERLAUBT = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 8 * 1024 * 1024;

export default async req => {
  if (req.method === "OPTIONS") return json({});
  if (req.method !== "POST") return json({ error: "Nur POST." }, 405);

  try {
    const { bild } = await req.json();
    const treffer = /^data:([^;]+);base64,(.+)$/s.exec(String(bild || ""));
    if (!treffer) return json({ error: "Kein gültiges Bild empfangen." }, 400);

    const [, typ, base64] = treffer;
    if (!ERLAUBT.includes(typ)) {
      return json({ error: "Bitte ein JPG, PNG oder WEBP hochladen." }, 400);
    }

    const roh = Buffer.from(base64, "base64");
    if (roh.length > MAX_BYTES) {
      return json({ error: "Das Bild ist zu groß (max. 8 MB)." }, 400);
    }

    // Nochmal durch sharp schicken: das prueft nebenbei, ob wirklich ein Bild
    // vorliegt, entfernt EXIF-Daten (auch den Aufnahmeort) und dreht das Foto
    // gemaess Orientierung gerade.
    const sharp = (await import("sharp")).default;
    const bearbeitet = await sharp(roh)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toBuffer();
    const masse = await sharp(bearbeitet).metadata();

    const schluessel = crypto.randomUUID();
    // Zeitstempel mitgeben: der taegliche Hausputz loescht damit Fotos, aus
    // denen nie eine Bestellung wurde.
    await uploadsStore().set(
      schluessel,
      bearbeitet.buffer.slice(bearbeitet.byteOffset, bearbeitet.byteOffset + bearbeitet.byteLength),
      { metadata: { erstellt: new Date().toISOString() } },
    );

    return json({
      schluessel,
      breite: masse.width,
      hoehe: masse.height,
      hochformat: masse.height >= masse.width,
    });
  } catch (err) {
    console.error("Foto-Upload fehlgeschlagen:", err?.message || err);
    return json({ error: "Das Bild konnte nicht verarbeitet werden." }, 500);
  }
};
