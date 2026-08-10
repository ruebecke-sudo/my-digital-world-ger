// GET /.netlify/functions/foto?schluessel=… - hochgeladenes Kundenfoto ausliefern
//
// Gebraucht wird das an zwei Stellen: fuer die Vorschau im Shop und damit
// Replicate das Bild fuer die Pixar-Verwandlung laden kann - das Modell holt
// sich sein Ausgangsbild ueber eine oeffentliche Adresse.
//
// Der Schluessel ist eine Zufalls-UUID. Wer ihn nicht kennt, findet das Bild
// nicht; eine Liste aller Uploads gibt es nirgends.

import { uploadsStore, json } from "../../lib/shared.mjs";

export default async req => {
  const schluessel = new URL(req.url).searchParams.get("schluessel");
  if (!schluessel || !/^[0-9a-f-]{36}$/i.test(schluessel)) {
    return json({ error: "Kein gültiger Schlüssel." }, 400);
  }

  const bild = await uploadsStore().get(schluessel, { type: "arrayBuffer" });
  if (!bild) return json({ error: "Bild nicht gefunden." }, 404);

  return new Response(bild, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "private, max-age=3600",
    },
  });
};
