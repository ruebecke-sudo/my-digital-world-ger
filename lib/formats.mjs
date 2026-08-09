// Druck- und Bildschirmformate für den Poster-Shop.
// Preise hier zentral pflegen – Frontend und Checkout lesen beide aus dieser Tabelle.
//
// w/h  = Zielgröße in Pixel (Druckformate bei 300 dpi)
// ar   = Seitenverhältnis, mit dem Stable Diffusion 3 generiert.
//        Bewusst etwas breiter als das Ziel gewählt, damit beim Zuschnitt
//        die Seiten wegfallen und Headline/Titelplatte oben und unten erhalten bleiben.
// jpeg = Kompressionsqualität des Downloads

export const FORMATS = {
  fullhd: {
    id: "fullhd",
    label: "Full HD",
    hinweis: "1920 × 1080 px · Bildschirm",
    w: 1920, h: 1080, ar: "16:9", jpeg: 92, cents: 200,
  },
  a5: {
    id: "a5",
    label: "DIN A5 hoch",
    hinweis: "148 × 210 mm · 300 dpi",
    w: 1748, h: 2480, ar: "4:5", jpeg: 92, cents: 250,
  },
  quadrat: {
    id: "quadrat",
    label: "Quadratisch",
    hinweis: "2480 × 2480 px · 1:1",
    w: 2480, h: 2480, ar: "1:1", jpeg: 92, cents: 250,
  },
  a4: {
    id: "a4",
    label: "DIN A4 hoch",
    hinweis: "210 × 297 mm · 300 dpi",
    w: 2480, h: 3508, ar: "4:5", jpeg: 92, cents: 300,
  },
  a4quer: {
    id: "a4quer",
    label: "DIN A4 quer",
    hinweis: "297 × 210 mm · 300 dpi",
    w: 3508, h: 2480, ar: "3:2", jpeg: 92, cents: 300,
  },
  a3: {
    id: "a3",
    label: "DIN A3 hoch",
    hinweis: "297 × 420 mm · 300 dpi",
    w: 3508, h: 4961, ar: "4:5", jpeg: 88, cents: 450,
  },
  a3quer: {
    id: "a3quer",
    label: "DIN A3 quer",
    hinweis: "420 × 297 mm · 300 dpi",
    w: 4961, h: 3508, ar: "3:2", jpeg: 88, cents: 450,
  },
};

export const DEFAULT_FORMAT = "a4";

export function getFormat(id) {
  return FORMATS[id] || null;
}

// Für das Frontend: nur was dort gebraucht wird.
export function formatListe() {
  return Object.values(FORMATS).map(f => ({
    id: f.id, label: f.label, hinweis: f.hinweis, cents: f.cents,
  }));
}
