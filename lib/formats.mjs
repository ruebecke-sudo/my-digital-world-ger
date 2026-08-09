// Druck- und Bildschirmformate fuer den Poster-Shop.
// Preise hier zentral pflegen - Frontend und Checkout lesen beide aus dieser Tabelle.
//
// w/h  = Zielgroesse in Pixel (Druckformate bei 300 dpi)
// ar   = Seitenverhaeltnis, mit dem Stable Diffusion 3 generiert.
//        Bewusst etwas breiter als das Ziel gewaehlt, damit beim Zuschnitt
//        die Seiten wegfallen und die Typografie oben und unten heil bleibt.
// jpeg = Kompressionsqualitaet des Downloads
//
// Querformate (A4 quer, A3 quer, Full HD liegend) sind absichtlich NICHT dabei:
// Die Motive sind als Hochformat-Poster angelegt, Figur rechts und Textspalte
// links. Quer gedreht schneidet der Zuschnitt zu viel weg und das Ergebnis
// weicht stark von den Mustervorlagen ab.

export const FORMATS = {
  fullhd: {
    id: "fullhd",
    label: "Full HD hoch",
    hinweis: "1080 x 1920 px - Reels & Stories",
    w: 1080, h: 1920, ar: "9:16", jpeg: 92, cents: 200,
  },
  a5: {
    id: "a5",
    label: "DIN A5",
    hinweis: "148 x 210 mm - 300 dpi",
    w: 1748, h: 2480, ar: "4:5", jpeg: 92, cents: 250,
  },
  quadrat: {
    id: "quadrat",
    label: "Quadratisch",
    hinweis: "2480 x 2480 px - 1:1",
    w: 2480, h: 2480, ar: "1:1", jpeg: 92, cents: 250,
  },
  a4: {
    id: "a4",
    label: "DIN A4",
    hinweis: "210 x 297 mm - 300 dpi",
    w: 2480, h: 3508, ar: "4:5", jpeg: 92, cents: 300,
  },
  a3: {
    id: "a3",
    label: "DIN A3",
    hinweis: "297 x 420 mm - 300 dpi",
    w: 3508, h: 4961, ar: "4:5", jpeg: 88, cents: 450,
  },
};

export const DEFAULT_FORMAT = "a4";

export function getFormat(id) {
  return FORMATS[id] || null;
}

// Fuer das Frontend: nur was dort gebraucht wird.
export function formatListe() {
  return Object.values(FORMATS).map(f => ({
    id: f.id, label: f.label, hinweis: f.hinweis, cents: f.cents,
  }));
}
