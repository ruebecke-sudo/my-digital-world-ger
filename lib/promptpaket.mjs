// Das Prompt-Paket fuer "Selbst erstellen" (25 EUR).
//
// Wird erst nach bezahlter Bestellung ausgeliefert (video-paket.mjs prueft
// Status und Token). Inhalt hier pflegen - die Danke-Seite stellt ihn nur dar.

export const GEMINI_URL = "https://gemini.google.com/";

export const PROMPT_PAKET = {
  titel: "Dein Prompt-Paket fuer Kurzvideos",
  vorwort:
    "Alles, was du brauchst, um dein Video in Google Gemini selbst zu bauen. " +
    "Arbeite die vier Schritte der Reihe nach ab. Die Bausteine in eckigen " +
    "Klammern ersetzt du durch deine eigenen Angaben.",

  schritte: [
    {
      nr: 1,
      titel: "In Gemini einloggen und Videomodus waehlen",
      text:
        "Oeffne Gemini, melde dich mit deinem Google-Konto an und waehle im " +
        "Eingabefeld die Videoerstellung (Veo). Achte darauf, dass das " +
        "Seitenverhaeltnis auf 9:16 (hochkant) steht - das ist das Format des " +
        "WhatsApp-Status. Alles andere wird spaeter beschnitten.",
    },
    {
      nr: 2,
      titel: "Den passenden Prompt aussuchen und ausfuellen",
      text:
        "Unten stehen vier fertige Prompts, je einer pro Kategorie. Nimm den, " +
        "der zu deinem Vorhaben passt, kopiere ihn und ersetze die Platzhalter. " +
        "Schreib in eigenen Worten, aber bleib bei der Struktur: Szene, Person, " +
        "Kamera, Licht, Sprache, Stimmung. Genau diese Reihenfolge versteht das " +
        "Modell am besten.",
    },
    {
      nr: 3,
      titel: "Erzeugen, pruefen, nachbessern",
      text:
        "Lass zwei bis drei Varianten laufen und nimm die beste. Typische " +
        "Nachbesserungen: 'ruhigere Kamera', 'weniger Bewegung im Hintergrund', " +
        "'freundlicherer Gesichtsausdruck', 'Text erst nach 2 Sekunden " +
        "einblenden'. Aendere immer nur eine Sache pro Durchgang, sonst weisst " +
        "du am Ende nicht, was geholfen hat.",
    },
    {
      nr: 4,
      titel: "Herunterladen und in den Status stellen",
      text:
        "Lade das Video herunter und schick es dir selbst per WhatsApp. Dann " +
        "unter Status auf das Kamerasymbol, Video aus der Galerie waehlen, " +
        "kurzen Text dazu, fertig. Halte dich an 8 bis 15 Sekunden - laenger " +
        "schaut kaum jemand zu Ende.",
    },
  ],

  prompts: [
    {
      kategorie: "Sprecher-Video",
      zweck: "Eine Person spricht deine Botschaft direkt in die Kamera.",
      text:
        "Hochkant-Video im Format 9:16, Laenge 10 Sekunden, fotorealistisch.\n" +
        "Szene: [Ort, z. B. helles Cafe mit Holztisch, unscharfer Hintergrund].\n" +
        "Person: [Alter, Geschlecht, Kleidung, z. B. Mann Anfang 30, graues " +
        "T-Shirt], freundlich, natuerlich, spricht direkt in die Kamera.\n" +
        "Kamera: feste Einstellung auf Brusthoehe, leichte Naeherung, kein " +
        "Schwenk.\n" +
        "Licht: weiches Tageslicht von der Seite.\n" +
        "Sprache: Deutsch. Die Person sagt sinngemaess: \"[dein Satz, maximal " +
        "20 Woerter]\".\n" +
        "Stimmung: sympathisch, ruhig, glaubwuerdig. Keine Schrift im Bild, " +
        "keine Logos, keine Untertitel.",
    },
    {
      kategorie: "Produkt & Angebot",
      zweck: "Dein Produkt oder Angebot wird gezeigt, nicht erklaert.",
      text:
        "Hochkant-Video im Format 9:16, Laenge 10 Sekunden, hochwertige " +
        "Produktaufnahme.\n" +
        "Motiv: [dein Produkt genau beschreiben - Material, Farbe, Groesse].\n" +
        "Kamera: langsame Fahrt um das Produkt herum, danach eine ruhige " +
        "Nahaufnahme des wichtigsten Details.\n" +
        "Hintergrund: [ruhige Flaeche, z. B. dunkler Stein, warmes Holz], " +
        "nichts lenkt ab.\n" +
        "Licht: weiches Studiolicht, sanfte Glanzkante auf der Oberkante.\n" +
        "Stimmung: wertig, aufgeraeumt, modern. Kein Text, keine Hand im Bild, " +
        "keine Logos.",
    },
    {
      kategorie: "Anlass & Einladung",
      zweck: "Hochzeit, Geburtstag, Jubilaeum, Eroeffnung - festlich und persoenlich.",
      text:
        "Hochkant-Video im Format 9:16, Laenge 10 Sekunden, festliche Stimmung.\n" +
        "Anlass: [z. B. Hochzeit / 50. Geburtstag / Neueroeffnung].\n" +
        "Szene: [Ort und Ausstattung, z. B. Garten am Abend mit Lichterketten, " +
        "Konfetti in der Luft].\n" +
        "Personen: [wer zu sehen ist], freudig, in Bewegung.\n" +
        "Kamera: langsame Fahrt nach vorn, leichter Anstieg zum Schluss.\n" +
        "Licht: warmes Abendlicht, glitzernde Lichtpunkte im Hintergrund.\n" +
        "Stimmung: herzlich, feierlich, einladend. Kein Text im Bild.",
    },
    {
      kategorie: "Charakter & Spass",
      zweck: "Eine ueberzeichnete Figur, die man sich merkt.",
      text:
        "Hochkant-Video im Format 9:16, Laenge 10 Sekunden, Animationsstil im " +
        "Look eines modernen 3D-Animationsfilms.\n" +
        "Figur: eine uebertrieben karikierte, menschliche Figur - [Typ, z. B. " +
        "Heimwerker / Schnaeppchenjaeger / Montagshasser] - mit sehr " +
        "ausdrucksstarkem Gesicht. Kein Tier, kein Fabelwesen.\n" +
        "Szene: [passende Umgebung mit liebevollen Requisiten].\n" +
        "Aktion: die Figur [macht etwas Typisches] und schaut am Ende " +
        "triumphierend in die Kamera.\n" +
        "Kamera: leichte Fahrt von unten, Ganzkoerperansicht.\n" +
        "Licht: kraeftige satte Farben, stimmungsvolles Licht von der Seite, " +
        "buntes Konfetti.\n" +
        "Absolut kein Text im Bild: keine Buchstaben, keine Zahlen, keine " +
        "Schilder, keine Logos.",
    },
  ],

  tipps: [
    "Kurz halten. Acht bis fuenfzehn Sekunden sind im Status das Maximum, das wirklich zu Ende gesehen wird.",
    "Ein Gedanke pro Video. Wer zwei Botschaften unterbringt, transportiert am Ende keine.",
    "Hochkant erzeugen, nicht nachtraeglich zuschneiden. Beim Zuschnitt gehen genau die Bildraender verloren, auf denen die Aussage steht.",
    "Der erste Moment entscheidet. Gesicht, Bewegung oder Farbe muessen sofort da sein - eine ruhige Einleitung kostet die Haelfte der Zuschauer.",
    "Ton mitdenken. Viele schauen den Status ohne Ton: Die Aussage muss auch stumm ankommen.",
    "Schrift erst in WhatsApp hinzufuegen. Von der KI gemalte Buchstaben werden fast immer fehlerhaft.",
    "Zwei bis drei Durchlaeufe einplanen. Der erste Versuch sitzt selten, der dritte fast immer.",
  ],
};
