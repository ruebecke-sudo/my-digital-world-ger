// Kurzvideos fuer den WhatsApp-Status - Pakete, Kategorien und das Prompt-Paket.
//
// Preise hier zentral pflegen: Die Landingpage liest sie ueber
// /api/video-pakete, der Checkout rechnet mit denselben Werten. So kann der
// Preis im Browser nicht manipuliert werden.

export const VIDEO_PAKETE = {
  komplett: {
    id: "komplett",
    label: "Video erstellen lassen",
    cents: 4500,
    kurz: "Du sagst, worum es geht - wir liefern das fertige Video.",
    lieferung: "Fertiges Video per E-Mail, in der Regel innerhalb von 2-3 Werktagen.",
    briefing: true,
  },
  selbst: {
    id: "selbst",
    label: "Selbst erstellen",
    cents: 2500,
    kurz: "Das komplette Prompt-Paket - du klickst es in Google Gemini selbst zusammen.",
    lieferung: "Sofort nach der Zahlung freigeschaltet.",
    briefing: false,
  },
};

export const DEFAULT_PAKET = "komplett";

export function getPaket(id) {
  return VIDEO_PAKETE[id] || null;
}

// Die vier Kategorien entsprechen den Beispielvideos auf der Landingpage.
export const VIDEO_KATEGORIEN = {
  sprecher: { id: "sprecher", label: "Sprecher-Video" },
  produkt: { id: "produkt", label: "Produkt & Angebot" },
  anlass: { id: "anlass", label: "Anlass & Einladung" },
  charakter: { id: "charakter", label: "Charakter & Spass" },
};

export function getKategorie(id) {
  return VIDEO_KATEGORIEN[id] || null;
}

// Fuer das Frontend: nur, was dort gebraucht wird.
export function paketListe() {
  return Object.values(VIDEO_PAKETE).map(p => ({
    id: p.id, label: p.label, cents: p.cents, kurz: p.kurz,
    lieferung: p.lieferung, briefing: p.briefing,
  }));
}
