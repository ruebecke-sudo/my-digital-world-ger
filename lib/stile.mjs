// Stile fuer personalisierte Portraets.
//
// Jeder Eintrag ist ein Auftrag an FLUX Kontext, das aus dem Foto des Kunden
// ein Bild im gewuenschten Stil macht. Zwei Dinge stehen in jedem Auftrag:
//
//   1. Was sich aendern soll - Stil, Kostuem, Umgebung.
//   2. Was bleiben muss - Gesicht, Frisur, Haarfarbe, Ausdruck. Ohne diesen
//      Satz entsteht zwar ein huebsches Bild, aber niemand erkennt darauf die
//      Person, fuer die es gedacht war.
//
// Die Markennamen der grossen Studios stehen bewusst NICHT in den Titeln. Ein
// Zeichenstil ist nicht geschuetzt, die Namen sind es - im Angebot haetten sie
// nichts zu suchen.

const BEWAHREN =
  "Keep the person clearly recognizable: same face shape, same eyes, same " +
  "hairstyle, same hair colour, same skin tone, same age and the same warm " +
  "expression. Absolutely no text, no letters, no watermarks, no logos.";

export const STILE = {
  animation3d: {
    titel: "3D-Animationsfilm",
    auftrag:
      "Turn this photo into an ultra high quality 3D animated movie character " +
      "portrait. Slightly stylised proportions with large expressive eyes, soft " +
      "skin shading, warm cinematic lighting, vibrant saturated colours, gentle " +
      "depth of field, detailed but calm background. " + BEWAHREN,
  },
  zeichentrick: {
    titel: "Zeichentrick-Klassiker",
    auftrag:
      "Turn this photo into a hand-drawn 2D animated feature film character " +
      "portrait: clean confident ink outlines, flat cel shading, painted " +
      "watercolour background, warm nostalgic colour palette. " + BEWAHREN,
  },
  comic: {
    titel: "Comic",
    auftrag:
      "Turn this photo into a bold comic book portrait: strong black ink " +
      "outlines, dramatic cross hatching, halftone dot shading, limited punchy " +
      "colour palette, dynamic lighting from one side. " + BEWAHREN,
  },
  superheld: {
    titel: "Superheld",
    auftrag:
      "Turn this photo into a cinematic superhero portrait. Dress the person in " +
      "a sleek modern superhero suit with subtle armour plating and a flowing " +
      "cape, standing confidently on a rooftop at dusk with city lights and " +
      "drifting sparks behind. Heroic rim lighting. " + BEWAHREN,
  },
  ritter: {
    titel: "Ritter",
    auftrag:
      "Turn this photo into a medieval knight portrait. Dress the person in " +
      "polished steel plate armour with fine engravings and a deep red cloak, " +
      "standing in a castle courtyard with banners and torchlight, helmet held " +
      "under one arm. Painterly, warm evening light. " + BEWAHREN,
  },
  pirat: {
    titel: "Pirat",
    auftrag:
      "Turn this photo into a swashbuckling pirate captain portrait. Dress the " +
      "person in a weathered leather coat, tricorn hat and linen shirt, standing " +
      "on the deck of a tall ship with rigging, ocean spray and a golden sunset " +
      "behind. Rich painterly colours. " + BEWAHREN,
  },
  fantasy: {
    titel: "Fantasy",
    auftrag:
      "Turn this photo into an epic fantasy portrait. Dress the person in an " +
      "ornate embroidered robe with leather details, standing in an ancient " +
      "misty forest with glowing motes of light and old stone ruins behind. " +
      "Painterly, cinematic, magical atmosphere. " + BEWAHREN,
  },
};

export const STIL_LISTE = Object.entries(STILE).map(([id, s]) => ({ id, titel: s.titel }));
