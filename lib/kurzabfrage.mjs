// Die Kurzabfrage nach der Zahlung: vier Punkte, drei davon zum Antippen.
//
// Eine Quelle fuer beide Seiten: Die Danke-Seite holt sich die Fragen ueber
// /video-pakete, die Function prueft die eingegangenen Antworten gegen dieselbe
// Tabelle. Wer hier etwas aendert, aendert es damit an beiden Stellen.

export const ABFRAGE = [
  {
    id: "ziel",
    frage: "Was soll das Video bewirken?",
    hinweis: "Ein Video kann genau eine Sache gut. Such die aus, auf die es dir am meisten ankommt.",
    optionen: [
      { id: "bekannt", label: "Bekannt machen", zusatz: "Wer bin ich, was mache ich" },
      { id: "angebot", label: "Angebot bewerben", zusatz: "Aktion, Rabatt, Neuheit" },
      { id: "einladen", label: "Einladen", zusatz: "Termin, Feier, Eröffnung" },
      { id: "auffallen", label: "Auffallen", zusatz: "Unterhaltsam, zum Weiterleiten" },
    ],
  },
  {
    id: "botschaft",
    frage: "Deine Botschaft in einem Satz",
    hinweis: "Genau dieser Satz wird der Kern des Videos. Schreib ihn so, wie du ihn jemandem am Telefon sagen würdest.",
    frei: true,
    platzhalter: "z. B. Ab Montag gibt es bei uns frisches Brot auch am Sonntag.",
  },
  {
    id: "ton",
    frage: "In welchem Ton?",
    hinweis: "Bestimmt Bildsprache, Musik und Sprechweise.",
    optionen: [
      { id: "herzlich", label: "Herzlich", zusatz: "Nah, persönlich, warm" },
      { id: "sachlich", label: "Sachlich", zusatz: "Klar, ruhig, seriös" },
      { id: "humorvoll", label: "Humorvoll", zusatz: "Augenzwinkernd, überzeichnet" },
      { id: "hochwertig", label: "Hochwertig", zusatz: "Edel, ruhig, wertig" },
    ],
  },
  {
    id: "branche",
    frage: "Aus welcher Ecke kommst du?",
    hinweis: "Damit die Bildwelt passt - Werkstatt sieht anders aus als Praxis.",
    optionen: [
      { id: "handwerk", label: "Handwerk & Bau" },
      { id: "gastro", label: "Gastronomie & Lebensmittel" },
      { id: "handel", label: "Handel & Shop" },
      { id: "koerper", label: "Beauty, Fitness & Gesundheit" },
      { id: "beratung", label: "Beratung & Dienstleistung" },
      { id: "immobilien", label: "Immobilien & Auto" },
      { id: "verein", label: "Verein, Event & Privat" },
      { id: "sonstiges", label: "Etwas anderes" },
    ],
  },
];

// Nachgelagert und freiwillig: alles, was nicht zu den vier Punkten gehoert,
// aber trotzdem hilft.
export const ZUSATZ = {
  id: "zusatz",
  frage: "Noch etwas, das ich wissen sollte?",
  hinweis: "Firmenname, Wunschtermin, Logo, ein Beispielvideo - alles freiwillig.",
  platzhalter: "Kann auch leer bleiben.",
};

const punkt = id => ABFRAGE.find(p => p.id === id);

// Aus einer Antwort-Id das lesbare Label machen. Unbekannte Ids ergeben "" -
// so kann ueber die Rueckgabe direkt geprueft werden, ob die Antwort gilt.
export function label(punktId, antwortId) {
  const p = punkt(punktId);
  if (!p || !p.optionen) return "";
  const o = p.optionen.find(x => x.id === antwortId);
  return o ? o.label : "";
}

export function frageText(punktId) {
  const p = punkt(punktId);
  return p ? p.frage : punktId;
}

// Fuer das Frontend: die Fragen so, wie sie dort gebraucht werden.
export function abfrageListe() {
  return { punkte: ABFRAGE, zusatz: ZUSATZ };
}
