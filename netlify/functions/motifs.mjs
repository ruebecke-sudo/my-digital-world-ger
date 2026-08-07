// GET /api/motifs – Motivliste fürs Frontend (ohne Prompts!)
import { CATALOG, json } from "../../lib/shared.mjs";

export default async () =>
  json(CATALOG.motive.map(m => ({ id: m.id, titel: m.titel, bild: m.bild || null })));
