// Stile fuer personalisierte Portraets.
//
// Jeder Eintrag ist ein Auftrag an FLUX Kontext, das aus dem Foto des Kunden
// ein Bild im gewuenschten Stil macht. In jedem Auftrag steht zweierlei: was
// sich aendern soll - Stil, Kostuem, Umgebung - und was bleiben muss:
// Gesicht, Frisur, Haarfarbe, Ausdruck. Ohne den zweiten Teil entsteht ein
// huebsches Bild, auf dem niemand die Person wiedererkennt.
//
// Die Markennamen der grossen Studios stehen bewusst nicht in den Titeln.
// Ein Zeichenstil ist nicht geschuetzt, die Namen sind es.
//
// "gruppe" trennt zwei Arten von Ergebnis, die sich im Test deutlich
// unterschieden:
//   verwandlung - Kostuem und Szene werden ausgetauscht. Das sind die Bilder,
//                 fuer die Leute Geld ausgeben.
//   stil        - nur die Machart aendert sich, die Szene bleibt. Huebsch,
//                 aber austauschbar; taugt als guenstigere Nebenlinie.

const BEWAHREN =
  "Keep the person clearly recognizable: same face shape, same eyes, same " +
  "hairstyle, same hair colour, same skin tone, same age and the same warm " +
  "expression. Absolutely no text, no letters, no watermarks, no logos.";

// Ohne diesen Satz greift das Modell beim Superhelden auf das zurueck, was es
// kennt - im Test kam ein unverkennbares Superman-Wappen auf der Brust zurueck.
const KEINE_MARKEN =
  "Invent an original costume design. Do not use any existing superhero " +
  "emblem, shield, symbol, colour scheme or costume from comics, films, games " +
  "or television, and do not resemble any known character.";

export const STILE = {
  ritter: {
    titel: "Ritter",
    gruppe: "verwandlung",
    auftrag:
      "Turn this photo into a medieval knight portrait. Dress the person in " +
      "polished steel plate armour with fine engravings and a deep red cloak, " +
      "standing in a castle courtyard with banners and torchlight, helmet held " +
      "under one arm. Painterly, warm evening light. " + BEWAHREN,
  },
  pirat: {
    titel: "Pirat",
    gruppe: "verwandlung",
    auftrag:
      "Turn this photo into a swashbuckling pirate captain portrait. Dress the " +
      "person in a weathered leather coat, tricorn hat and linen shirt, standing " +
      "on the deck of a tall ship with rigging, ocean spray and a golden sunset " +
      "behind. Rich painterly colours. Keep the hair length exactly as in the " +
      "photo - do not lengthen it. " + BEWAHREN,
  },
  fantasy: {
    titel: "Fantasy",
    gruppe: "verwandlung",
    auftrag:
      "Turn this photo into an epic fantasy portrait. Dress the person in an " +
      "ornate embroidered robe with leather details, standing in an ancient " +
      "misty forest with glowing motes of light and old stone ruins behind. " +
      "Painterly, cinematic, magical atmosphere. " + BEWAHREN,
  },
  superheld: {
    titel: "Superheld",
    gruppe: "verwandlung",
    // Der Umhang zog das Modell zuverlaessig zu Superman - erst ohne ihn und
    // mit ausdruecklichem Verbot der Schildform kam ein eigenes Kostuem heraus.
    auftrag:
      "Turn this photo into a cinematic modern hero portrait. Dress the person " +
      "in sleek matte tactical armour with segmented shoulder and forearm " +
      "plates and a high collar. No cape. The chest plate is completely plain " +
      "and smooth: no emblem, no crest, no shield outline, no pentagon or " +
      "diamond shape, no letter, no symbol of any kind. Standing on a rooftop " +
      "at dusk with city lights and drifting sparks behind, heroic rim " +
      "lighting. " + KEINE_MARKEN + " " + BEWAHREN,
  },
  animation3d: {
    titel: "3D-Animationsfilm",
    gruppe: "stil",
    auftrag:
      "Redraw this person as a fully three-dimensional animated movie character " +
      "- not a retouched photograph. Clearly stylised cartoon proportions: " +
      "noticeably larger head, big round expressive eyes with bright catchlights, " +
      "smooth simplified skin without pores, soft rounded shapes, simplified " +
      "hair sculpted in clean strands. Glossy studio render look with soft " +
      "subsurface scattering, warm key light, vibrant saturated colours and a " +
      "softly blurred colourful background. " + BEWAHREN,
  },
  zeichentrick: {
    titel: "Zeichentrick-Klassiker",
    gruppe: "stil",
    auftrag:
      "Turn this photo into a hand-drawn 2D animated feature film character " +
      "portrait: clean confident ink outlines, flat cel shading, painted " +
      "watercolour background, warm nostalgic colour palette. " + BEWAHREN,
  },
  comic: {
    titel: "Comic",
    gruppe: "stil",
    auftrag:
      "Turn this photo into a bold comic book portrait: strong black ink " +
      "outlines, dramatic cross hatching, halftone dot shading, limited punchy " +
      "colour palette, dynamic lighting from one side. " + KEINE_MARKEN + " " + BEWAHREN,
  },
};

export const STIL_LISTE = Object.entries(STILE).map(([id, s]) => ({
  id,
  titel: s.titel,
  gruppe: s.gruppe,
}));
