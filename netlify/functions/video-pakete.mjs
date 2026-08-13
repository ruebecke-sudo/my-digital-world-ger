// GET /api/video-pakete - Preise, Kategorien und die Kurzabfrage fuer das Frontend
import { paketListe, laengeListe, VIDEO_KATEGORIEN } from "../../lib/videopakete.mjs";
import { abfrageListe } from "../../lib/kurzabfrage.mjs";
import { json } from "../../lib/videoshared.mjs";

export default async () =>
  json({
    pakete: paketListe(),
    laengen: laengeListe(),
    kategorien: Object.values(VIDEO_KATEGORIEN),
    abfrage: abfrageListe(),
  });
