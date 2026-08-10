// Taeglicher Hausputz. Laeuft von selbst, niemand muss ihn anstossen.
//
// Zwei Dinge sammeln sich sonst still an:
//
// 1. Hochgeladene Kundenfotos, aus denen nie eine Bestellung wurde - jemand
//    laedt ein Bild hoch und bricht ab. Porträtfotos sind personenbezogene
//    Daten; die wollen wir nicht unbegrenzt herumliegen haben.
// 2. Fertige Poster von Bestellungen, die laengst erledigt sind.
//
// Fertige Poster halten wir MONATE lang bereit - so lange kommt der Kunde ueber
// den Link aus seiner Mail wieder an sein Bild. Danach wird geloescht, und der
// Shop sagt das auch vorher.

import { ordersStore, imagesStore, uploadsStore, json } from "../../lib/shared.mjs";

const MONATE = Number(process.env.AUFBEWAHRUNG_MONATE || 12);
const UPLOAD_STUNDEN = Number(process.env.UPLOAD_STUNDEN || 48);

const istAelterAls = (zeitpunkt, millisekunden) => {
  const t = Date.parse(zeitpunkt || "");
  return Number.isFinite(t) && Date.now() - t > millisekunden;
};

export default async () => {
  const bericht = { bestellungen: 0, bilder: 0, uploads: 0, fehler: [] };
  const grenzeBestellung = MONATE * 30 * 24 * 60 * 60 * 1000;
  const grenzeUpload = UPLOAD_STUNDEN * 60 * 60 * 1000;

  // --- alte Bestellungen samt Postern ---
  try {
    const { blobs } = await ordersStore().list();
    for (const { key } of blobs) {
      try {
        const order = await ordersStore().get(key, { type: "json" });
        if (!order || !istAelterAls(order.createdAt, grenzeBestellung)) continue;
        for (const teil of ["_preview", "_download"]) {
          try { await imagesStore().delete(key + teil); bericht.bilder++; } catch { /* war schon weg */ }
        }
        if (order.fotoSchluessel) {
          try { await uploadsStore().delete(order.fotoSchluessel); } catch { /* war schon weg */ }
        }
        await ordersStore().delete(key);
        bericht.bestellungen++;
      } catch (err) {
        bericht.fehler.push(`Bestellung ${key}: ${err?.message || err}`);
      }
    }
  } catch (err) {
    bericht.fehler.push(`Bestellliste: ${err?.message || err}`);
  }

  // --- Fotos ohne Bestellung ---
  try {
    const { blobs } = await uploadsStore().list();
    for (const { key } of blobs) {
      try {
        const { metadata } = (await uploadsStore().getMetadata(key)) || {};
        // Ohne Zeitstempel koennen wir das Alter nicht beurteilen - dann lieber
        // liegen lassen, als versehentlich ein bezahltes Foto zu loeschen.
        if (!metadata?.erstellt) continue;
        if (!istAelterAls(metadata.erstellt, grenzeUpload)) continue;
        await uploadsStore().delete(key);
        bericht.uploads++;
      } catch (err) {
        bericht.fehler.push(`Upload ${key}: ${err?.message || err}`);
      }
    }
  } catch (err) {
    bericht.fehler.push(`Uploadliste: ${err?.message || err}`);
  }

  console.log("Hausputz:", JSON.stringify(bericht));
  return json(bericht);
};

export const config = { schedule: "@daily" };
