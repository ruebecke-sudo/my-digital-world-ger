// Kurzvideos fuer den WhatsApp-Status - Pakete und Kategorien.
//
// Preise hier zentral pflegen: Die Landingpage liest sie ueber
// /video-pakete, der Checkout rechnet mit denselben Werten. So kann der
// Preis im Browser nicht manipuliert werden.
//
// Beide Pakete liefern ein fertiges Video. Der Unterschied liegt im Weg:
//
//   selbst   - der Kunde beantwortet vier Fragen, der Server erzeugt das Video
//              daraus automatisch. In wenigen Minuten da, ein Durchlauf.
//   komplett - dieselben vier Fragen, aber ein Mensch macht das Video. Mehrere
//              Durchlaeufe, Feinschliff, eine Korrekturschleife. Fuer alle, die
//              mit Technik nichts zu tun haben wollen.

export const VIDEO_PAKETE = {
  komplett: {
    id: "komplett",
    label: "Wir machen es für dich",
    cents: 4500,
    kurz: "Du beantwortest vier Fragen - den Rest übernehmen wir von Hand.",
    lieferung: "Fertiges Video per E-Mail, in der Regel innerhalb von 2-3 Werktagen.",
    abfrage: true,
    automatisch: false,
  },
  selbst: {
    id: "selbst",
    label: "Selbst zusammenstellen",
    cents: 2500,
    kurz: "Vier Fragen beantworten - dein Video entsteht sofort automatisch.",
    lieferung: "Fertiges Video in wenigen Minuten, direkt auf der Seite und per E-Mail.",
    abfrage: true,
    automatisch: true,
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
    lieferung: p.lieferung, abfrage: p.abfrage, automatisch: p.automatisch,
  }));
}
