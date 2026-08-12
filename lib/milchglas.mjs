// Beschriftung fuer Motive mit festem Bild.
//
// Diese Poster bringen ihre Ueberschrift und die Trophaee schon mit - erzeugt
// wurden sie einmal vorab, nicht bei jeder Bestellung. Hier kommt nur noch
// hinzu, was der Kunde eingibt: sein Name und sein Spruch.
//
// Der Text steht auf einer Milchglasflaeche: der Bildausschnitt darunter wird
// weichgezeichnet, abgerundet maskiert und abgedunkelt. Dadurch bleibt die
// Szene sichtbar - man sieht, dass etwas dahinter liegt - und die Schrift
// steht trotzdem ruhig darauf. Konturen und Schatten braucht sie deshalb
// nicht; die wirken auf einem hochwertigen Poster billig.
//
// Wo die Flaeche sitzt, steht als "textBereich" beim Motiv in motifs.json:
// x/y/w/h als Anteil der Bildkante (0 bis 1). Damit gilt derselbe Eintrag
// fuer jede Ausgabegroesse, vom Vorschaubild bis zum A3-Druck.

import { glyphen, breiteVon, pfadDaten, kanten, umbrechen } from "./textlayer.mjs";

// Erste vorhandene Datei je Rolle gewinnt (siehe textlayer.mjs).
const RUND = ["VarelaRound-Regular.ttf", "Poppins-Medium.ttf"];
const ZIER = ["CaveatBrush-Regular.ttf", "Pacifico-Regular.ttf", "Lora-Regular.ttf"];

const GOLD_VERLAUF = `<defs><linearGradient id="nameGold" x1="0" y1="0" x2="0" y2="1">`
  + `<stop offset="0" stop-color="#ffd863"/>`
  + `<stop offset="0.55" stop-color="#f7b81c"/>`
  + `<stop offset="1" stop-color="#c97d05"/></linearGradient></defs>`;

function pfad(text, groesse, x, y, farbe, rolle) {
  const { stuecke } = glyphen(text, rolle, groesse);
  const daten = [];
  for (const st of stuecke) {
    const d = pfadDaten(st.glyph.getPath(x + st.x, y, groesse).commands);
    if (d) daten.push(d);
  }
  if (!daten.length) return "";
  return `<path d="${daten.join(" ")}" fill="${farbe}"/>`;
}

// Setzt Namenszeile und Spruch und meldet zurueck, wie hoch der Satz wird.
// Passt er nicht in den Bereich, wird die Grundgroesse verkleinert - lieber
// kleinere Schrift als ein Wort, das ueber den Rand laeuft.
function satzBauen(bildBreite, bildHoehe, name, text, box) {
  const bw = bildBreite * box.w;
  const bh = bildHoehe * box.h;
  let g = bh * 0.155;
  let zeilen = [];
  let hoch = 0;

  for (let i = 0; i < 70; i++) {
    zeilen = [];
    // Ohne Namen faengt der Text direkt an - so entsteht kein Loch, wo der
    // Name gestanden haette. Genau das brauchen die Vorschaubilder.
    if (name) zeilen.push({ t: name, g: g * 1.9, r: ZIER, f: "url(#nameGold)", von: true });

    // Jeder Satz ein eigener Absatz - das liest sich ruhiger als ein Block.
    const saetze = String(text || "").split(/(?<=[.!?])\s+/).filter(Boolean);
    saetze.forEach((satz, si) => {
      umbrechen(satz, RUND, g, bw).forEach((z, zi) =>
        zeilen.push({ t: z, g, r: RUND, f: "#ffffff", absatz: si > 0 && zi === 0 }));
    });

    const kT = kanten(RUND, g, false);
    const kN = name ? kanten(ZIER, g * 1.9, false) : { hoch: 0, tief: 0 };
    const absaetze = zeilen.filter(z => z.absatz).length;
    hoch = kN.hoch + (name ? g * 1.5 : 0) + kT.hoch
      + (zeilen.length - (name ? 2 : 1)) * g * 1.42 + absaetze * g * 0.62 + kT.tief;

    // Lange deutsche Woerter passen manchmal in keine Zeile ("Weihnachts-
    // beleuchtung") und ragten dann ueber den Rand. Deshalb zusaetzlich die
    // Breite jeder einzelnen Zeile pruefen.
    const zuBreit = zeilen.some(z => {
      const b = z.von
        ? breiteVon("von ", RUND, z.g * 0.42) + breiteVon(z.t, z.r, z.g)
        : breiteVon(z.t, z.r, z.g);
      return b > bw;
    });

    if (hoch <= bh && !zuBreit) break;
    g *= 0.95;
  }
  return { zeilen, hoch, g };
}

function satzSVG(bildBreite, bildHoehe, box, satz, oben) {
  const x = bildBreite * box.x;
  const { zeilen, g } = satz;
  const hatName = zeilen.length > 0 && zeilen[0].von;
  const teile = [];
  let y = oben;

  zeilen.forEach((z, i) => {
    const k = kanten(z.r, z.g, false);
    if (i === 0) y += k.hoch;
    else if (i === 1 && hatName) y += g * 1.5 + k.hoch;
    else y += g * 1.42 + (z.absatz ? g * 0.62 : 0);

    if (z.von) {
      // "von" bewusst klein und zurueckhaltend, der Name gross in Gold:
      // es ist eine Botschaft von jemandem, kein Etikett.
      const gv = z.g * 0.42;
      teile.push(pfad("von", gv, x, y, "#e8c98a", RUND));
      teile.push(pfad(z.t, z.g, x + breiteVon("von ", RUND, gv), y, z.f, z.r));
    } else {
      teile.push(pfad(z.t, z.g, x, y, z.f, z.r));
    }
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${bildBreite}" height="${bildHoehe}">`
    + GOLD_VERLAUF + teile.join("") + `</svg>`;
}

// Ausschnitt weichzeichnen, abgerundet maskieren, dunklen Schleier darueber.
async function milchglas(sharp, bild, bildBreite, bildHoehe, x, y, w, h) {
  const X = Math.max(0, Math.round(x));
  const Y = Math.max(0, Math.round(y));
  const W = Math.max(1, Math.min(bildBreite - X, Math.round(w)));
  const H = Math.max(1, Math.min(bildHoehe - Y, Math.round(h)));
  const r = Math.round(Math.min(W, H) * 0.06);

  const ausschnitt = await sharp(bild)
    .extract({ left: X, top: Y, width: W, height: H })
    .blur(Math.max(6, W * 0.03))
    .ensureAlpha()
    .toBuffer();

  const maske = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`
    + `<rect x="0" y="0" width="${W}" height="${H}" rx="${r}" fill="#fff"/></svg>`);
  const rund = await sharp(ausschnitt)
    .composite([{ input: maske, blend: "dest-in" }]).png().toBuffer();

  const schleier = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">`
    + `<rect x="0" y="0" width="${W}" height="${H}" rx="${r}" fill="#0b0d14" fill-opacity="0.55"/>`
    + `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="${r}" fill="none" `
    + `stroke="#ffffff" stroke-opacity="0.22" stroke-width="2"/></svg>`);

  return {
    input: await sharp(rund).composite([{ input: schleier }]).png().toBuffer(),
    left: X,
    top: Y,
  };
}

/**
 * Stempelt Name und Spruch auf ein festes Motivbild.
 *
 * @param {Buffer} bild   Motivbild (beliebige Groesse, Seitenverhaeltnis wie im Original)
 * @param {object} box    textBereich des Motivs: {x, y, w, h} als Anteil
 * @param {string} name   Kundenname, leer lassen fuer Vorschaubilder
 * @param {string} text   Spruch
 * @returns {Promise<Buffer>} PNG
 */
export async function beschriften(bild, box, name, text) {
  const sharp = (await import("sharp")).default;
  const meta = await sharp(bild).metadata();
  const b = meta.width;
  const h = meta.height;

  const satz = satzBauen(b, h, name, text, box);
  const rand = Math.round(b * 0.028);

  // Der Satz sitzt mittig im vorgesehenen Bereich.
  const textOben = h * box.y + Math.max(0, h * box.h - satz.hoch) / 2;

  // Normalerweise schmiegt sich die Flaeche eng an den Satz - bei einem kurzen
  // Spruch bliebe sonst unten Luft. Bei Motiven mit "fest" deckt sie dagegen
  // immer den ganzen Bereich ab: Dort steht im Bild bereits ein Beispieltext,
  // der vollstaendig verschwinden muss, auch wenn der Kunde nur zwei Worte
  // schreibt.
  const glasHoehe = box.fest ? h * box.h + rand * 2 : satz.hoch + rand * 2;
  const glasOben = box.fest ? h * box.y - rand : textOben - rand;

  const glas = await milchglas(sharp, bild, b, h,
    b * box.x - rand, glasOben, b * box.w + rand * 2, glasHoehe);
  const svg = satzSVG(b, h, box, satz, textOben);

  return await sharp(bild)
    .composite([glas, { input: Buffer.from(svg), left: 0, top: 0 }])
    .png()
    .toBuffer();
}
