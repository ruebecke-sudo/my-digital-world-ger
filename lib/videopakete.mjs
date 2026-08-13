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

// --- Laenge ---------------------------------------------------------
//
// Die haeufigste Rueckfrage ist "geht das auch laenger?". Kein Modell erzeugt
// heute mehr als etwa 15 Sekunden am Stueck - das ist die Obergrenze, und sie
// ist mit Kling im Mehrszenen-Modus auch sinnvoll gefuellt: drei Einstellungen
// statt einer. Genau das meinen Kunden meistens, wenn sie "laenger" sagen.
//
// Der Aufpreis deckt die hoeheren Modellkosten (rund 2,20 EUR statt 0,70 EUR)
// um ein Vielfaches - er verkauft die Idee, nicht die Sekunden.
export const LAENGEN = {
  kurz: {
    id: "kurz",
    sekunden: 8,
    aufpreisCents: 0,
    label: "8 Sekunden",
    kurz: "Eine Einstellung, eine Aussage",
    modell: "veo",
  },
  lang: {
    id: "lang",
    sekunden: 15,
    aufpreisCents: 1000,
    label: "15 Sekunden",
    kurz: "Drei Szenen - hinführen, Botschaft, Abschluss",
    modell: "kling",
  },
};

export const DEFAULT_LAENGE = "kurz";

export function getLaenge(id) {
  return LAENGEN[id] || null;
}

export function laengeListe() {
  return Object.values(LAENGEN).map(l => ({
    id: l.id, sekunden: l.sekunden, aufpreisCents: l.aufpreisCents,
    label: l.label, kurz: l.kurz,
  }));
}

// Der verbindliche Preis. Wird sowohl im Checkout als auch auf der Seite
// benutzt - gerechnet wird aber immer serverseitig.
export function preisCents(paket, laenge) {
  return (paket ? paket.cents : 0) + (laenge ? laenge.aufpreisCents : 0);
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
