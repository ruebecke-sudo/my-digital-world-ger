// Textebene fuer die Poster.
//
// Die KI liefert nur das Bild. Die komplette Typografie entsteht hier und wird
// anschliessend per sharp darueber gelegt. Jeder Buchstabe wird in einen
// SVG-Vektorpfad umgewandelt (opentype.js) – es findet KEINE Suche nach
// Systemschriften statt. Damit ist der frueher aufgetretene Fehler, bei dem
// jeder Buchstabe als leeres Kaestchen erschien, konstruktiv ausgeschlossen.

import fs from "node:fs";
import path from "node:path";
import opentypePaket from "opentype.js";

const opentype = opentypePaket && opentypePaket.parse ? opentypePaket : opentypePaket.default;

export const ANTON = "Anton-Regular.ttf";
export const PACIFICO = "Pacifico-Regular.ttf";
export const POPPINS = "Poppins-Medium.ttf";
export const POPPINS_FETT = "Poppins-Bold.ttf";
export const PLAYFAIR = "PlayfairDisplay.ttf";

const geladen = new Map();

// Netlify legt die per included_files mitgelieferten Dateien relativ zum
// Projektstamm ab. Je nach Bundling-Variante stimmt der Pfad unterschiedlich –
// deshalb mehrere Kandidaten durchprobieren, statt auf einen zu wetten.
function schriftPfad(datei) {
  const kandidaten = [
    path.join(process.cwd(), "assets", "fonts", datei),
    path.join(process.cwd(), "..", "assets", "fonts", datei),
    path.join(process.cwd(), "..", "..", "assets", "fonts", datei),
  ];
  try {
    kandidaten.push(new URL("../assets/fonts/" + datei, import.meta.url).pathname);
  } catch { /* import.meta nicht verfuegbar */ }

  for (const k of kandidaten) {
    try { if (fs.existsSync(k)) return k; } catch { /* weiter */ }
  }
  throw new Error(`Schriftdatei nicht gefunden: ${datei} (gesucht in: ${kandidaten.join(", ")})`);
}

function schrift(datei) {
  if (!geladen.has(datei)) {
    const b = fs.readFileSync(schriftPfad(datei));
    const ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
    geladen.set(datei, opentype.parse(ab));
  }
  return geladen.get(datei);
}

// ---------------------------------------------------------------- Grundlagen
//
// Bewusst NICHT font.getPath()/getAdvanceWidth() verwenden: Deren Textformung
// (Bidi/ccmp) wirft bei manchen Schriften "substitutionType ... not yet
// supported" und haette die Generierung zur Laufzeit abgebrochen. Wir setzen
// die Glyphen selbst – fuer deutschen Text reichen Zeichenzuordnung und
// Kerning voellig aus.

function glyphen(text, datei, groesse) {
  const f = schrift(datei);
  const skala = groesse / f.unitsPerEm;
  const stuecke = [];
  let x = 0;
  let vorher = null;
  for (const zeichen of Array.from(String(text))) {
    const g = f.charToGlyph(zeichen);
    if (vorher) x += f.getKerningValue(vorher, g) * skala;
    stuecke.push({ glyph: g, x });
    x += g.advanceWidth * skala;
    vorher = g;
  }
  return { stuecke, breite: x };
}

const breiteVon = (text, datei, groesse) =>
  text ? glyphen(text, datei, groesse).breite : 0;

function pfad(text, datei, groesse, x, y, farbe, strich = 0) {
  if (!text) return "";
  const { stuecke } = glyphen(text, datei, groesse);
  const daten = [];
  for (const st of stuecke) {
    const d = st.glyph.getPath(x + st.x, y, groesse).toPathData(2);
    if (d) daten.push(d);
  }
  if (!daten.length) return "";
  const s = strich
    ? ` stroke="${farbe}" stroke-width="${strich}" stroke-linejoin="round"`
    : "";
  return `<path d="${daten.join(" ")}" fill="${farbe}"${s}/>`;
}

function passendeGroesse(text, datei, maxBreite, start, minimum) {
  let g = start;
  while (g > minimum && breiteVon(text, datei, g) > maxBreite) {
    g -= Math.max(1, Math.round(g * 0.04));
  }
  return g;
}

function umbrechen(text, datei, groesse, maxBreite) {
  const zeilen = [];
  let aktuell = "";
  for (const wort of String(text || "").split(/\s+/).filter(Boolean)) {
    const probe = aktuell ? aktuell + " " + wort : wort;
    if (breiteVon(probe, datei, groesse) <= maxBreite) {
      aktuell = probe;
    } else {
      if (aktuell) zeilen.push(aktuell);
      aktuell = wort;
    }
  }
  if (aktuell) zeilen.push(aktuell);
  return zeilen;
}

// Ueberschrift an Bindestrichen umbrechen: "GUTE-LAUNE-BOTSCHAFTER"
// wird zu "GUTE-LAUNE-" / "BOTSCHAFTER" statt mitten im Wort zu reissen.
function kopfZeilen(kurz, maxBreite, start, minimum) {
  const teile = String(kurz || "").split(/(?<=-)/).filter(Boolean);
  const laengstes = teile.reduce((a, b) => (b.length > a.length ? b : a), "");
  const groesse = passendeGroesse(laengstes, ANTON, maxBreite, start, minimum);

  const zeilen = [];
  let aktuell = "";
  for (const t of teile) {
    const probe = aktuell + t;
    if (breiteVon(probe, ANTON, groesse) <= maxBreite) {
      aktuell = probe;
    } else {
      if (aktuell) zeilen.push(aktuell);
      aktuell = t;
    }
  }
  if (aktuell) zeilen.push(aktuell);
  return { zeilen, groesse };
}

// Zeile setzen und dabei Schluesselwoerter farbig hervorheben.
function zeileMitAkzent(zeile, datei, groesse, x, y, normal, akzent, woerter) {
  let out = "";
  let cx = x;
  for (const wort of zeile.split(" ")) {
    const kern = wort.replace(/[^\p{L}\p{N}-]/gu, "");
    const farbe = woerter.has(kern) ? akzent : normal;
    out += pfad(wort + " ", datei, groesse, cx, y, farbe);
    cx += breiteVon(wort + " ", datei, groesse);
  }
  return out;
}

// Dunkler Verlauf hinter dem Text. Die KI haelt sich nicht immer daran, links
// Platz zu lassen – der Verlauf sorgt dafuer, dass die Schrift trotzdem lesbar
// bleibt, ohne das Bild zuzudecken.
function abdunkler(breite, hoehe) {
  return `<defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity="0.60"/>
    <stop offset="0.45" stop-color="#000" stop-opacity="0.34"/>
    <stop offset="0.80" stop-color="#000" stop-opacity="0.06"/>
    <stop offset="1" stop-color="#000" stop-opacity="0"/>
  </linearGradient></defs>
  <rect x="0" y="0" width="${breite}" height="${hoehe}" fill="url(#s)"/>`;
}

// ---------------------------------------------------------------- Layout 1

function layoutStandard(breite, hoehe, d) {
  const s = Math.min(breite / 1024, hoehe / 1820);
  const rand = Math.round(58 * s);
  const spalte = Math.round(breite * 0.58) - rand;
  const WEISS = "#ffffff", ROT = "#de2626", BLAU = "#1c5cd6";
  const teile = [abdunkler(breite, hoehe)];

  let y = Math.round(205 * s);
  teile.push(pfad("Hallo,", PACIFICO, 128 * s, rand, y, WEISS));

  y += Math.round(112 * s);
  const grName = passendeGroesse(`ich bin ${d.name},`, POPPINS, spalte, 54 * s, 24 * s);
  teile.push(pfad(`ich bin ${d.name},`, POPPINS, grName, rand, y, WEISS));

  y += Math.round(104 * s);
  const kopf = kopfZeilen(d.kurz, spalte, 116 * s, 34 * s);
  for (const zeile of kopf.zeilen) {
    teile.push(pfad(zeile, ANTON, kopf.groesse, rand, y, ROT));
    y += Math.round(kopf.groesse * 1.02);
  }

  y += Math.round(24 * s);
  const grBalken = passendeGroesse("DES JAHRES.", POPPINS_FETT, spalte, 58 * s, 26 * s);
  const bB = breiteVon("DES JAHRES.", POPPINS_FETT, grBalken);
  teile.push(
    `<rect x="${rand - 12 * s}" y="${y - grBalken * 0.82}" width="${bB + 40 * s}" ` +
    `height="${grBalken * 1.42}" fill="${BLAU}"/>`
  );
  teile.push(pfad("DES JAHRES.", POPPINS_FETT, grBalken, rand + 8 * s, y, WEISS));

  y += Math.round(grBalken * 1.6);
  const grText = 39 * s;
  const zeilenhoehe = Math.round(grText * 1.34);
  const punkt = Math.round(11 * s);
  const einzug = Math.round(44 * s);
  const akzente = new Set(d.akzente || []);
  const unten = hoehe * 0.90;

  for (const satz of String(d.spruch || "").split(/(?<=\.)\s+/).filter(Boolean)) {
    if (y > unten) break;
    teile.push(`<circle cx="${rand + punkt}" cy="${y - grText * 0.32}" r="${punkt}" fill="${ROT}"/>`);
    for (const zeile of umbrechen(satz, POPPINS, grText, spalte - einzug)) {
      if (y > unten) break;
      teile.push(zeileMitAkzent(zeile, POPPINS, grText, rand + einzug, y, WEISS, ROT, akzente));
      y += zeilenhoehe;
    }
    y += Math.round(18 * s);
  }
  return teile.join("\n");
}

// ---------------------------------------------------------------- Layout 2

function layoutEdel(breite, hoehe, d) {
  const s = Math.min(breite / 1024, hoehe / 1820);
  const rand = Math.round(58 * s);
  const spalte = Math.round(breite * 0.46) - rand;
  const GOLD = "#e8b84a", WEISS = "#faf8f4";
  const teile = [abdunkler(breite, hoehe)];

  const zierde = (yy) => {
    const w = Math.round(150 * s), m = rand + w / 2, h = Math.round(7 * s);
    return `<path d="M${rand} ${yy} H${rand + w}" stroke="${GOLD}" stroke-width="${2.5 * s}"/>` +
      `<path d="M${m} ${yy - h} L${m + h} ${yy} L${m} ${yy + h} L${m - h} ${yy} Z" fill="${GOLD}"/>`;
  };

  // Groesse zuerst bestimmen, damit die Zierlinie genug Abstand zur
  // Oberkante der Versalien bekommt und sie nicht beruehrt.
  const grKopf = passendeGroesse(d.kurzSchoen, PLAYFAIR, spalte, 170 * s, 46 * s);

  let y = Math.round(170 * s);
  teile.push(zierde(y));

  y += Math.round(grKopf * 0.92);
  teile.push(pfad(d.kurzSchoen, PLAYFAIR, grKopf, rand, y, GOLD, 2.2 * s));

  y += Math.round(grKopf * 0.62);
  const grUnter = Math.round(grKopf * 0.46);
  teile.push(pfad("des Jahres", PLAYFAIR, grUnter, rand, y, WEISS, 1.2 * s));

  y += Math.round(58 * s);
  teile.push(zierde(y));

  y += Math.round(96 * s);
  const grText = 37 * s;
  const zeilenhoehe = Math.round(grText * 1.42);
  const akzente = new Set(d.akzente || []);
  const voll = `Hallo, ${d.anrede} ${d.bezeichnung}. ${d.spruch}`;
  const unten = hoehe * 0.90;

  for (const zeile of umbrechen(voll, POPPINS, grText, spalte)) {
    if (y > unten) break;
    teile.push(zeileMitAkzent(zeile, POPPINS, grText, rand, y, WEISS, GOLD, akzente));
    y += zeilenhoehe;
  }
  return teile.join("\n");
}

// ---------------------------------------------------------------- Aufruf

const gross = (t) => String(t || "").toUpperCase();
const schoen = (t) => {
  const s = String(t || "").toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Woerter, die farbig hervorgehoben werden: laengere Substantive und die
// festen Gefuehlsbegriffe. Kurze Funktionswoerter bleiben neutral.
function akzentWoerter(spruch, extra = []) {
  const stopp = new Set(["Ich", "Mit", "Und", "Der", "Die", "Das", "Ein", "Eine",
    "Heute", "Gemeinsam", "Egal", "Nach", "Bei", "Von", "Aus", "Bereits"]);
  const treffer = String(spruch || "").match(/\p{Lu}\p{L}{4,}/gu) || [];
  return [...new Set([...extra, ...treffer.filter(w => !stopp.has(w))])].slice(0, 6);
}

/**
 * Erzeugt die Textebene als SVG in der Groesse des fertigen Bildes.
 * @param {number} breite  Bildbreite in Pixel
 * @param {number} hoehe   Bildhoehe in Pixel
 * @param {object} motif   Eintrag aus motifs.json
 * @param {string} name    Kundenname
 * @param {string} text    Kundentext (leer = defaultText des Motivs)
 */
export function textebeneSVG(breite, hoehe, motif, name, text) {
  const spruch = (text && text.trim()) || motif.defaultText || "";
  const kurz = motif.kurz || gross(motif.bezeichnung);
  const daten = {
    name: (name || "").trim(),
    kurz: gross(kurz),
    kurzSchoen: schoen(kurz),
    bezeichnung: motif.bezeichnung || "",
    anrede: motif.anrede || "ich bin der",
    spruch,
    akzente: akzentWoerter(spruch, motif.akzente || []),
  };
  const inhalt = motif.layout === "edel"
    ? layoutEdel(breite, hoehe, daten)
    : layoutStandard(breite, hoehe, daten);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${hoehe}" ` +
    `viewBox="0 0 ${breite} ${hoehe}">${inhalt}</svg>`;
}

/** Copyright-Zeile als Vektorpfade – ersetzt den fruehreren SVG-Textknoten. */
export function copyrightSVG(breite, hoehe) {
  const txt = "Copyright © my-digital-world.de";
  const groesse = Math.max(11, Math.round(hoehe * 0.014));
  const b = breiteVon(txt, POPPINS_FETT, groesse);
  const y = hoehe - Math.round(hoehe * 0.012);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${hoehe}">` +
    pfad(txt, POPPINS_FETT, groesse, (breite - b) / 2, y, "#ffffff") +
    `</svg>`;
}
