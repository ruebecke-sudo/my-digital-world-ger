// GET /api/video-pakete - Preise, Kategorien und die Kurzabfrage fuer das Frontend
import { paketListe, VIDEO_KATEGORIEN } from "../../lib/videopakete.mjs";
import { abfrageListe } from "../../lib/kurzabfrage.mjs";
import { json } from "../../lib/videoshared.mjs";

export default async () =>
  json({
    pakete: paketListe(),
    kategorien: Object.values(VIDEO_KATEGORIEN),
    abfrage: abfrageListe(),
  });
