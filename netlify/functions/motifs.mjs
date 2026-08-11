// GET /api/motifs – Motivliste fürs Frontend (ohne Prompts!)
import { CATALOG, json } from "../../lib/shared.mjs";
import { STIL_LISTE } from "../../lib/stile.mjs";

export default async () =>
  json(CATALOG.motive.map(m => ({
    id: m.id,
    titel: m.titel,
    bild: m.bild || null,
    // "pixar" oder "pur": beim eigenen Foto zeigt der Shop statt eines
    // Vorschaubildes das Upload-Feld.
    eigenesFoto: m.eigenesFoto || null,
    // Nur die Kachel mit Verwandlung bringt die Stilauswahl mit. Die Auftraege
    // selbst bleiben serverseitig - hier gehen nur Kennung und Titel raus.
    stile: m.eigenesFoto === "pixar" ? STIL_LISTE : null,
  })));
