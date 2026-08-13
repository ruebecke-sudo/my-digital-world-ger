// Vergleichslauf: dieselbe Aufgabe durch mehrere Videomodelle.
//
// Der Sinn ist nicht, das billigste Modell zu finden - die Preisunterschiede
// liegen bei Cent. Der Sinn ist zu sehen, ob ein guenstigeres Modell fuer ein
// Statusvideo ueberhaupt schlechter ist, und was der Mehrszenen-Modus von
// Kling wirklich bringt. Diese Frage laesst sich nur beantworten, indem man
// dieselbe Aufgabe nebeneinander legt.
//
// Die Modelle selbst stehen in lib/videomodelle.mjs - dieselbe Quelle, aus der
// auch die echten Bestellungen erzeugt werden.

import { MODELL_LISTE } from "./videomodelle.mjs";

export const ANBIETER_LISTE = MODELL_LISTE;

// Auswahl aus einer Liste wie "wan,grok". Unbekannte Namen werden still
// ignoriert; bleibt nichts uebrig, laufen alle.
export function anbieterWaehlen(nur) {
  if (!nur) return ANBIETER_LISTE;
  const ids = String(nur).split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  const gewaehlt = ANBIETER_LISTE.filter(a => ids.includes(a.id));
  return gewaehlt.length ? gewaehlt : ANBIETER_LISTE;
}

// Ein Lauf ueber die gewaehlten Anbieter. Faellt einer aus, laufen die anderen
// weiter - ein Vergleich mit drei Ergebnissen ist immer noch ein Vergleich.
//
// Jedes Modell bekommt die Laenge, die es kann: Veo acht Sekunden, Kling
// fuenfzehn mit Szenenplan. Alles auf dieselbe Dauer zu zwingen waere ein
// unfairer Vergleich.
export async function vergleichLaufen(prompt, ablegen, nur, szenen) {
  const ergebnisse = [];
  for (const a of anbieterWaehlen(nur)) {
    const begonnen = Date.now();
    try {
      const video = await a.erzeugen({ prompt, szenen, sekunden: a.sekunden });
      await ablegen(a.id, video);
      ergebnisse.push({
        id: a.id, name: a.name, ok: true,
        sekunden: Math.round((Date.now() - begonnen) / 1000),
        laenge: a.sekunden,
        bytes: video.length,
      });
    } catch (err) {
      console.error(`Vergleich ${a.id} fehlgeschlagen:`, err?.message || err);
      ergebnisse.push({
        id: a.id, name: a.name, ok: false,
        sekunden: Math.round((Date.now() - begonnen) / 1000),
        fehler: String(err?.message || err).slice(0, 300),
      });
    }
  }
  return ergebnisse;
}
