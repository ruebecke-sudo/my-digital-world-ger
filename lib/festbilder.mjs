// Feste Motivbilder.
//
// Fuer diese Motive liegt das fertige Poster im Projekt: public/basis/mXX.webp.
// Es wird bei einer Bestellung geladen statt neu erzeugt - der Kunde bekommt
// genau das Bild, das er in der Galerie gesehen hat. Kein KI-Aufruf, keine
// Wartezeit, kein Zufall.
//
// basisBild  Pfad zum fertigen Poster (Hochformat 9:16, 941 x 1672 px).
// textBereich  Wo die Milchglasflaeche mit Name und Spruch sitzt - x/y/w/h als
//     Anteil der Bildkante (0 bis 1). Die Werte wurden je Motiv auf die
//     ruhigste freie Stelle unterhalb der Ueberschrift gelegt.
//
// Ein Motiv ohne Eintrag hier laeuft weiter ueber den alten Weg (FLUX malt das
// Bild, die komplette Typografie wird darueber gelegt).

export const FESTBILDER = {
  // Besserwisser
  m01: {
    basisBild: "/basis/m01.webp",
    textBereich: { x: 0.045, y: 0.468, w: 0.44, h: 0.27 },
  },
  // Nörgler
  m02: {
    basisBild: "/basis/m02.webp",
    textBereich: { x: 0.045, y: 0.345, w: 0.44, h: 0.27 },
  },
  // Ausreden-Profi
  m03: {
    basisBild: "/basis/m03.webp",
    textBereich: { x: 0.045, y: 0.468, w: 0.44, h: 0.27 },
  },
  // Montags-Hasser
  m04: {
    basisBild: "/basis/m04.webp",
    textBereich: { x: 0.045, y: 0.384, w: 0.44, h: 0.27 },
  },
  // Kaffeesüchtiger
  m05: {
    basisBild: "/basis/m05.webp",
    textBereich: { x: 0.045, y: 0.461, w: 0.44, h: 0.27 },
  },
  // Grillmeister
  m06: {
    basisBild: "/basis/m06.webp",
    textBereich: { x: 0.045, y: 0.327, w: 0.44, h: 0.27 },
  },
  // Handy-Profi
  m07: {
    basisBild: "/basis/m07.webp",
    textBereich: { x: 0.045, y: 0.412, w: 0.44, h: 0.27 },
  },
  // Serienjunkie
  m08: {
    basisBild: "/basis/m08.webp",
    textBereich: { x: 0.045, y: 0.401, w: 0.44, h: 0.27 },
  },
  // Fitness-Ausreden-Champion
  m09: {
    basisBild: "/basis/m09.webp",
    textBereich: { x: 0.045, y: 0.405, w: 0.44, h: 0.27 },
  },
  // Heimwerker
  m10: {
    basisBild: "/basis/m10.webp",
    textBereich: { x: 0.045, y: 0.338, w: 0.44, h: 0.27 },
  },
  // Chaosmanager
  m11: {
    basisBild: "/basis/m11.webp",
    textBereich: { x: 0.045, y: 0.38, w: 0.44, h: 0.27 },
  },
  // Schnäppchenjäger
  m12: {
    basisBild: "/basis/m12.webp",
    textBereich: { x: 0.045, y: 0.426, w: 0.44, h: 0.27 },
  },
  // Sternekoch
  m13: {
    basisBild: "/basis/m13.webp",
    textBereich: { x: 0.045, y: 0.387, w: 0.44, h: 0.27 },
  },
  // Gärtner
  m14: {
    basisBild: "/basis/m14.webp",
    textBereich: { x: 0.045, y: 0.405, w: 0.44, h: 0.27 },
  },
  // Parkplatz-Sucher
  m15: {
    basisBild: "/basis/m15.webp",
    textBereich: { x: 0.045, y: 0.384, w: 0.44, h: 0.27 },
  },
  // Weihnachtsfan
  m16: {
    basisBild: "/basis/m16.webp",
    textBereich: { x: 0.045, y: 0.447, w: 0.52, h: 0.27 },
  },
  // Urlaubsplaner
  m17: {
    basisBild: "/basis/m17.webp",
    textBereich: { x: 0.045, y: 0.468, w: 0.44, h: 0.27 },
  },
  // Fotograf
  m18: {
    basisBild: "/basis/m18.webp",
    textBereich: { x: 0.045, y: 0.366, w: 0.44, h: 0.27 },
  },
  // Optimist
  m19: {
    basisBild: "/basis/m19.webp",
    textBereich: { x: 0.045, y: 0.359, w: 0.44, h: 0.27 },
  },
  // Gute-Laune-Botschafter
  m20: {
    basisBild: "/basis/m20.webp",
    textBereich: { x: 0.045, y: 0.447, w: 0.44, h: 0.27 },
  },
  // Hochzeitspaar
  m21: {
    basisBild: "/basis/m21.webp",
    textBereich: { x: 0.045, y: 0.394, w: 0.44, h: 0.27 },
  },
  // Braut
  m22: {
    basisBild: "/basis/m22.webp",
    textBereich: { x: 0.515, y: 0.415, w: 0.44, h: 0.27 },
  },
  // Bräutigam
  m23: {
    basisBild: "/basis/m23.webp",
    textBereich: { x: 0.045, y: 0.317, w: 0.44, h: 0.27 },
  },
  // Hochzeitspaar – zwei Männer
  m24: {
    basisBild: "/basis/m24.webp",
    textBereich: { x: 0.045, y: 0.391, w: 0.44, h: 0.27 },
  },
  // Hochzeitspaar – zwei Frauen
  m25: {
    basisBild: "/basis/m25.webp",
    textBereich: { x: 0.045, y: 0.405, w: 0.44, h: 0.27 },
  },
};
