// GET /.netlify/functions/formats – Formatliste inkl. Preise für den Shop
import { json } from "../../lib/shared.mjs";
import { formatListe, DEFAULT_FORMAT } from "../../lib/formats.mjs";

export default async () => json({ formate: formatListe(), standard: DEFAULT_FORMAT });
