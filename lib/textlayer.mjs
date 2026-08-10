// Textebene fuer die Poster.
//
// Die KI liefert nur das Bild. Die komplette Typografie entsteht hier und wird
// anschliessend per sharp darueber gelegt. Jeder Buchstabe wird in einen
// SVG-Vektorpfad umgewandelt (opentype.js) - es findet KEINE Suche nach
// Systemschriften statt. Damit ist der Fehler, bei dem jeder Buchstabe als
// leeres Kaestchen erschien, konstruktiv ausgeschlossen.
//
// ZUM AUFBAU DER ABSTAENDE
// -----------------------
// Die erste Fassung setzte den Text mit festen Pixelspruengen (112 px, 104 px,
// 24 px ...), waehrend die Schriftgroessen sich automatisch verkleinerten, um in
// die Spaltenbreite zu passen. Sobald eine Ueberschrift schrumpfte, blieb der
// Abstand davor unveraendert gross - dadurch wirkten die Abstaende zufaellig.
//
// Jetzt gilt:
//   1. Alle Groessen und Abstaende sind Vielfache EINER Grundgroesse B.
//   2. Gesetzt wird nach optischen Kanten, nicht nach Grundlinien. Die Ober- und
//      Unterkante jeder Zeile kommt aus den echten Umrissen der Schrift
//      (Versalhoehe, Oberlaenge, Unterlaenge) statt aus geschaetzten Faktoren.
//   3. Gemessen wird an festen Musterbuchstaben, nicht am Kundentext. Ein Poster
//      fuer "Jörg" hat damit genau dieselben Abstaende wie eines fuer "Anna".
//   4. Passt der Satz nicht in die Hoehe, wird B verkleinert und alles skaliert
//      mit - die Proportionen bleiben in jedem Format identisch.

import fs from "node:fs";
import path from "node:path";
import opentypePaket from "opentype.js";

const opentype = opentypePaket && opentypePaket.parse ? opentypePaket : opentypePaket.default;

// Schriften. Jede Rolle nennt mehrere Dateien: die erste, die im Ordner
// assets/fonts liegt, wird genommen. So laesst sich eine Schrift austauschen,
// indem man einfach die neue Datei dazulegt - ohne Codeaenderung. Die jeweils
// erste Angabe ist die aus den freigegebenen Mustern.
export const DISPLAY = ["Lato-Black.ttf", "Anton-Regular.ttf"];   // Ueberschrift
export const SERIF = ["Lora-Regular.ttf", "PlayfairDisplay.ttf", "Pacifico-Regular.ttf"];
export const POPPINS = ["Poppins-Medium.ttf"];                    // Lauftext
export const POPPINS_FETT = ["Poppins-Bold.ttf"];                 // Balken, Copyright

// Alte Namen weiterhin exportieren, damit nichts bricht, was sie noch nutzt.
export const ANTON = DISPLAY;
export const PACIFICO = SERIF;
export const PLAYFAIR = SERIF;

const geladen = new Map();

// Netlify legt die per included_files mitgelieferten Dateien relativ zum
// Projektstamm ab. Je nach Bundling-Variante stimmt der Pfad unterschiedlich -
// deshalb mehrere Kandidaten durchprobieren, statt auf einen zu wetten.
function schriftPfad(rolle) {
  const namen = Array.isArray(rolle) ? rolle : [rolle];
  const gesucht = [];
  for (const datei of namen) {
    const kandidaten = [
      path.join(process.cwd(), "assets", "fonts", datei),
      path.join(process.cwd(), "..", "assets", "fonts", datei),
      path.join(process.cwd(), "..", "..", "assets", "fonts", datei),
    ];
    try {
      kandidaten.push(new URL("../assets/fonts/" + datei, import.meta.url).pathname);
    } catch { /* import.meta nicht verfuegbar */ }

    for (const k of kandidaten) {
      gesucht.push(k);
      try { if (fs.existsSync(k)) return k; } catch { /* weiter */ }
    }
  }
  throw new Error(`Keine Schriftdatei gefunden fuer ${namen.join(" / ")} ` +
    `(gesucht in: ${gesucht.join(", ")})`);
}

function schrift(rolle) {
  const schluessel = Array.isArray(rolle) ? rolle.join("|") : String(rolle);
  if (!geladen.has(schluessel)) {
    const b = fs.readFileSync(schriftPfad(rolle));
    const ab = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
    geladen.set(schluessel, opentype.parse(ab));
  }
  return geladen.get(schluessel);
}

// Fuer Zwischenspeicher-Schluessel: eine Rolle eindeutig benennen.
const rollenName = (rolle) => (Array.isArray(rolle) ? rolle.join("|") : String(rolle));

// ---------------------------------------------------------------- Grundlagen
//
// Bewusst NICHT font.getPath()/getAdvanceWidth() verwenden: Deren Textformung
// (Bidi/ccmp) wirft bei manchen Schriften "substitutionType ... not yet
// supported" und haette die Generierung zur Laufzeit abgebrochen. Wir setzen
// die Glyphen selbst - fuer deutschen Text reichen Zeichenzuordnung und
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

// Umrisse selbst in SVG-Pfaddaten schreiben.
//
// Bewusst NICHT path.toPathData() verwenden: In opentype.js 2.x ist dort eine
// Optimierung aktiv, die bei bestimmten Buchstaben-Positionen "NaN" in die
// Pfaddaten schreibt. Ein einziges NaN bringt den Renderer dazu, den REST des
// Pfades stillschweigend weglassen - beim Test verschwand aus
// "Copyright © my-digital-world.de" alles ab dem "t". Es gab keine
// Fehlermeldung, der Text war einfach zur Haelfte weg. Selbst geschrieben kann
// das nicht passieren; ausserdem ist der Code damit unabhaengig davon, welche
// opentype.js-Fassung installiert wird.
const zahl = (v) => {
  if (!Number.isFinite(v)) return "0";
  const r = Math.round(v * 100) / 100;
  return Number.isInteger(r) ? String(r) : r.toFixed(2);
};

function pfadDaten(commands) {
  let d = "";
  for (const c of commands) {
    switch (c.type) {
      case "M": d += `M${zahl(c.x)} ${zahl(c.y)}`; break;
      case "L": d += `L${zahl(c.x)} ${zahl(c.y)}`; break;
      case "Q": d += `Q${zahl(c.x1)} ${zahl(c.y1)} ${zahl(c.x)} ${zahl(c.y)}`; break;
      case "C": d += `C${zahl(c.x1)} ${zahl(c.y1)} ${zahl(c.x2)} ${zahl(c.y2)} ` +
        `${zahl(c.x)} ${zahl(c.y)}`; break;
      case "Z": d += "Z"; break;
      default: break;
    }
  }
  return d;
}

function pfad(text, datei, groesse, x, y, farbe, strich = 0) {
  if (!text) return "";
  const { stuecke } = glyphen(text, datei, groesse);
  const daten = [];
  for (const st of stuecke) {
    const d = pfadDaten(st.glyph.getPath(x + st.x, y, groesse).commands);
    if (d) daten.push(d);
  }
  if (!daten.length) return "";
  const s = strich
    ? ` stroke="${farbe}" stroke-width="${strich}" stroke-linejoin="round"`
    : "";
  return `<path d="${daten.join(" ")}" fill="${farbe}"${s}/>`;
}

// --- Optische Kanten -------------------------------------------------------
//
// Gibt zurueck, wie weit die Umrisse einer Zeile ueber die Grundlinie
// hinausragen (hoch) und wie weit darunter (tief) - in Pixeln, gemessen an den
// echten Konturen. Gemessen wird an Musterbuchstaben:
//   Versalien   -> "H"   (keine Unterlaengen)
//   Gemischt    -> "Hh" ueber der Linie, "gpy" darunter
// Dadurch sitzt jede Zeile immer gleich, egal welcher Kundenname darin steht.

const kantenSpeicher = new Map();

function kantenRoh(muster, datei, groesse) {
  const { stuecke } = glyphen(muster, datei, groesse);
  let y1 = Infinity;
  let y2 = -Infinity;
  for (const st of stuecke) {
    // Kanten aus den Kommandos selbst bestimmen, nicht ueber getBoundingBox() -
    // dieselbe Ueberlegung wie bei pfadDaten: keine Abhaengigkeit von einer
    // Bibliotheksfassung an einer Stelle, die das Layout aller Poster bestimmt.
    for (const c of st.glyph.getPath(0, 0, groesse).commands) {
      for (const v of [c.y, c.y1, c.y2]) {
        if (!Number.isFinite(v)) continue;
        if (v < y1) y1 = v;
        if (v > y2) y2 = v;
      }
    }
  }
  if (!Number.isFinite(y1)) return { hoch: groesse * 0.7, tief: groesse * 0.2 };
  return { hoch: -y1, tief: y2 };
}

function kanten(datei, groesse, versalien = false) {
  const schluessel = `${rollenName(datei)}|${versalien}`;
  if (!kantenSpeicher.has(schluessel)) {
    // Einmal bei 1000 px messen, danach linear skalieren - Umrisse sind linear.
    const oben = kantenRoh(versalien ? "H" : "Hh", datei, 1000).hoch;
    const unten = versalien ? 0 : kantenRoh("gpy", datei, 1000).tief;
    kantenSpeicher.set(schluessel, { hoch: oben / 1000, tief: unten / 1000 });
  }
  const k = kantenSpeicher.get(schluessel);
  return { hoch: k.hoch * groesse, tief: k.tief * groesse };
}

function passendeGroesse(text, datei, maxBreite, start, minimum) {
  let g = start;
  while (g > minimum && breiteVon(text, datei, g) > maxBreite) g *= 0.97;
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
  const groesse = passendeGroesse(laengstes, DISPLAY, maxBreite, start, minimum);

  const zeilen = [];
  let aktuell = "";
  for (const t of teile) {
    const probe = aktuell + t;
    if (breiteVon(probe, DISPLAY, groesse) <= maxBreite) {
      aktuell = probe;
    } else {
      if (aktuell) zeilen.push(aktuell);
      aktuell = t;
    }
  }
  if (aktuell) zeilen.push(aktuell);
  return { zeilen, groesse };
}

// Zeile setzen und dabei Schluesselwoerter farbig hervorheben. Satzzeichen am
// Wortende behalten die Grundfarbe - ein rot mitgefaerbter Schlusspunkt sah
// nach einem Fehler aus.
function zeileMitAkzent(zeile, datei, groesse, x, y, normal, akzent, woerter) {
  let out = "";
  let cx = x;
  for (const wort of String(zeile).split(" ")) {
    const kern = wort.replace(/[^\p{L}\p{N}-]/gu, "");
    if (woerter.has(kern) && kern) {
      // Wort in Kern und anhaengende Satzzeichen zerlegen.
      const i = wort.indexOf(kern);
      const vor = wort.slice(0, i);
      const nach = wort.slice(i + kern.length);
      for (const [t, f] of [[vor, normal], [kern, akzent], [nach + " ", normal]]) {
        if (!t) continue;
        out += pfad(t, datei, groesse, cx, y, f);
        cx += breiteVon(t, datei, groesse);
      }
    } else {
      out += pfad(wort + " ", datei, groesse, cx, y, normal);
      cx += breiteVon(wort + " ", datei, groesse);
    }
  }
  return out;
}

// Dunkler Verlauf hinter dem Text. Die KI haelt sich nicht immer daran, links
// Platz zu lassen - der Verlauf sorgt dafuer, dass die Schrift trotzdem lesbar
// bleibt, ohne das Bild zuzudecken.
function abdunkler(breite, hoehe) {
  return `<defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#000" stop-opacity="0.62"/>
    <stop offset="0.45" stop-color="#000" stop-opacity="0.36"/>
    <stop offset="0.80" stop-color="#000" stop-opacity="0.07"/>
    <stop offset="1" stop-color="#000" stop-opacity="0"/>
  </linearGradient></defs>
  <rect x="0" y="0" width="${breite}" height="${hoehe}" fill="url(#s)"/>`;
}

// --- Satzspiegel -----------------------------------------------------------
//
// Ein Block kennt seinen Abstand nach oben und seine eigene Hoehe, aber noch
// nicht seine Position. Erst wenn alle Bloecke stehen, ist die Gesamthoehe
// bekannt; dann wird von oben nach unten gezeichnet.

function stapel(bloecke) {
  return bloecke.reduce((summe, b) => summe + b.abstand + b.hoehe, 0);
}

function zeichneStapel(bloecke, y0) {
  const teile = [];
  let y = y0;
  for (const b of bloecke) {
    y += b.abstand;
    teile.push(b.zeichne(y));
    y += b.hoehe;
  }
  return teile.join("\n");
}

// Eine einzelne Zeile als Block.
function zeile(text, datei, groesse, x, farbe, { versalien = false, strich = 0, abstand = 0 } = {}) {
  const k = kanten(datei, groesse, versalien);
  return {
    abstand,
    hoehe: k.hoch + k.tief,
    zeichne: (y) => pfad(text, datei, groesse, x, y + k.hoch, farbe, strich),
  };
}

// Ein Absatz mit gleichmaessigem Zeilenabstand als ein Block.
function absatz(zeilen, datei, groesse, x, durchschuss, farbe, akzent, abstand = 0) {
  const k = kanten(datei, groesse, false);
  return {
    abstand,
    hoehe: zeilen.length ? k.hoch + (zeilen.length - 1) * durchschuss + k.tief : 0,
    zeichne: (y) => zeilen.map((z, i) => (akzent
      ? zeileMitAkzent(z, datei, groesse, x, y + k.hoch + i * durchschuss, akzent.normal, akzent.farbe, akzent.woerter)
      : pfad(z, datei, groesse, x, y + k.hoch + i * durchschuss, farbe))).join("\n"),
  };
}

// ---------------------------------------------------------------- Layout 1

function bloeckeStandard(breite, hoehe, d, B, rand, spalte) {
  const WEISS = "#ffffff", ROT = "#de2626", BLAU = "#1c5cd6";
  const bloecke = [];

  // Die Ueberschrift darf breiter laufen als der Lauftext - sie ist das
  // dominante Element. Der Lauftext bleibt in einer schmalen, gut lesbaren
  // Spalte, damit rechts das Motiv frei bleibt.
  const kopfBreite = Math.round(breite * 0.66) - rand;

  // "Hallo," - Serif, gross, ruhig.
  const gHallo = passendeGroesse("Hallo,", SERIF, spalte, B * 3.3, B);
  bloecke.push(zeile("Hallo,", SERIF, gHallo, rand, WEISS));

  // "ich bin Roger," - kleiner Vorspann darunter.
  const anrede = `ich bin ${d.name},`;
  const gName = passendeGroesse(anrede, POPPINS, spalte, B * 1.38, B * 0.7);
  bloecke.push(zeile(anrede, POPPINS, gName, rand, WEISS, { abstand: B * 0.78 }));

  // Ueberschrift in Versalien, notfalls an Bindestrichen umgebrochen.
  const kopf = kopfZeilen(d.kurz, kopfBreite, B * 3.1, B * 0.9);
  const kKopf = kanten(DISPLAY, kopf.groesse, true);
  const kopfDurchschuss = kKopf.hoch * 1.32;
  bloecke.push({
    abstand: B * 1.28,
    hoehe: kKopf.hoch + (kopf.zeilen.length - 1) * kopfDurchschuss,
    zeichne: (y) => kopf.zeilen
      .map((z, i) => pfad(z, DISPLAY, kopf.groesse, rand, y + kKopf.hoch + i * kopfDurchschuss, ROT))
      .join("\n"),
  });

  // Blauer Balken "DES JAHRES." - Innenabstand aus der Versalhoehe, links und
  // rechts gleich viel.
  const gBalken = passendeGroesse("DES JAHRES.", POPPINS_FETT, spalte * 0.94, B * 1.5, B * 0.8);
  const kBalken = kanten(POPPINS_FETT, gBalken, true);
  const luft = kBalken.hoch * 0.52;
  const bBalken = breiteVon("DES JAHRES.", POPPINS_FETT, gBalken);
  bloecke.push({
    abstand: B * 0.82,
    hoehe: kBalken.hoch + luft * 2,
    zeichne: (y) =>
      `<rect x="${(rand - luft).toFixed(1)}" y="${y.toFixed(1)}" ` +
      `width="${(bBalken + luft * 2).toFixed(1)}" height="${(kBalken.hoch + luft * 2).toFixed(1)}" ` +
      `fill="${BLAU}"/>` +
      pfad("DES JAHRES.", POPPINS_FETT, gBalken, rand, y + luft + kBalken.hoch, WEISS),
  });

  // Kundentext als Punkte. Ein Satz = ein Punkt.
  const durchschuss = B * 1.5;
  const einzug = B * 1.15;
  const akzent = { normal: WEISS, farbe: ROT, woerter: new Set(d.akzente || []) };
  const saetze = String(d.spruch || "").split(/(?<=\.)\s+/).filter(Boolean);

  saetze.forEach((satz, i) => {
    const zeilen = umbrechen(satz, POPPINS, B, spalte - einzug);
    if (!zeilen.length) return;
    const blk = absatz(zeilen, POPPINS, B, rand + einzug, durchschuss, WEISS, akzent,
      i === 0 ? B * 1.4 : B * 0.95);
    const kB = kanten(POPPINS, B, false);
    const r = B * 0.24;
    bloecke.push({
      ...blk,
      zeichne: (y) =>
        `<circle cx="${(rand + r * 1.4).toFixed(1)}" cy="${(y + kB.hoch * 0.68).toFixed(1)}" ` +
        `r="${r.toFixed(1)}" fill="${ROT}"/>` + blk.zeichne(y),
    });
  });

  return bloecke;
}

// ---------------------------------------------------------------- Layout 2

function bloeckeEdel(breite, hoehe, d, B, rand, spalte) {
  const GOLD = "#e8b84a", WEISS = "#faf8f4";
  const bloecke = [];

  const zierde = (abstand) => {
    const w = B * 3.6, h = B * 0.19;
    return {
      abstand,
      hoehe: h * 2,
      zeichne: (y) => {
        const m = rand + w / 2, mid = y + h;
        return `<path d="M${rand.toFixed(1)} ${mid.toFixed(1)} H${(rand + w).toFixed(1)}" ` +
          `stroke="${GOLD}" stroke-width="${(B * 0.07).toFixed(2)}"/>` +
          `<path d="M${m.toFixed(1)} ${(mid - h).toFixed(1)} L${(m + h).toFixed(1)} ${mid.toFixed(1)} ` +
          `L${m.toFixed(1)} ${(mid + h).toFixed(1)} L${(m - h).toFixed(1)} ${mid.toFixed(1)} Z" fill="${GOLD}"/>`;
      },
    };
  };

  bloecke.push(zierde(0));

  const gKopf = passendeGroesse(d.kurzSchoen, SERIF, spalte, B * 4.6, B * 1.2);
  bloecke.push(zeile(d.kurzSchoen, SERIF, gKopf, rand, GOLD, { abstand: B * 1.1, strich: B * 0.05 }));

  const gUnter = gKopf * 0.44;
  bloecke.push(zeile("des Jahres", SERIF, gUnter, rand, WEISS, { abstand: B * 0.34 }));

  bloecke.push(zierde(B * 1.1));

  const durchschuss = B * 1.54;
  const akzent = { normal: WEISS, farbe: GOLD, woerter: new Set(d.akzente || []) };
  const voll = `Hallo, ${d.anrede} ${d.bezeichnung}. ${d.spruch}`;
  const zeilen = umbrechen(voll, POPPINS, B, spalte);
  bloecke.push(absatz(zeilen, POPPINS, B, rand, durchschuss, WEISS, akzent, B * 1.9));

  return bloecke;
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
 *
 * Die Grundgroesse B wird so gewaehlt, dass der Satz in den vorgesehenen
 * Bereich passt: erst der Wunschwert, dann in kleinen Schritten kleiner, bis es
 * sitzt. Weil alle Abstaende Vielfache von B sind, bleibt das Verhaeltnis
 * zwischen den Zeilen dabei unveraendert.
 *
 * @param {number} breite  Bildbreite in Pixel
 * @param {number} hoehe   Bildhoehe in Pixel
 * @param {object} motif   Eintrag aus motifs.json
 * @param {string} name    Kundenname
 * @param {string} text    Kundentext (leer = defaultText des Motivs)
 */
export function textebeneSVG(breite, hoehe, motif, name, text) {
  const spruch = (text && text.trim()) || motif.defaultText || "";
  const kurz = motif.kurz || gross(motif.bezeichnung);
  const d = {
    name: (name || "").trim(),
    kurz: gross(kurz),
    kurzSchoen: schoen(kurz),
    bezeichnung: motif.bezeichnung || "",
    anrede: motif.anrede || "ich bin der",
    spruch,
    akzente: akzentWoerter(spruch, motif.akzente || []),
  };

  const edel = motif.layout === "edel";
  const rand = Math.round(breite * 0.057);
  const spalte = Math.round(breite * (edel ? 0.55 : 0.62)) - rand;
  const bauen = edel ? bloeckeEdel : bloeckeStandard;

  // Satzbereich: oben etwas Luft, unten Platz fuer Logo und Copyright.
  const y0 = hoehe * 0.062;
  const y1 = hoehe * (edel ? 0.90 : 0.925);
  const platz = y1 - y0;

  // Grundgroesse: immer derselbe Anteil der Bildbreite - beim 1024 px breiten
  // Muster sind das 39 px. Nur die Breite zaehlt, weil sie bestimmt, wie viele
  // Zeichen in eine Zeile passen; dass es in die Hoehe passt, regelt die
  // Schleife darunter. Wurde vorher die kleinere Kante genommen, geriet der
  // Text im Quadrat auf die halbe Groesse und wirkte verloren.
  let B = breite * 0.0381;
  let bloecke = bauen(breite, hoehe, d, B, rand, spalte);

  for (let i = 0; i < 60 && stapel(bloecke) > platz; i++) {
    B *= 0.97;
    bloecke = bauen(breite, hoehe, d, B, rand, spalte);
  }

  // Der Satz haengt oben. Bleibt Platz uebrig, wandert er nur ein wenig nach
  // unten - hoechstens eine Grundgroesse. Frueher rutschte kurzer Text bis in
  // die Bildmitte, wodurch oben ein grosses Loch entstand.
  const rest = Math.max(0, platz - stapel(bloecke));
  const inhalt = abdunkler(breite, hoehe) + "\n" +
    zeichneStapel(bloecke, y0 + Math.min(rest / 3, B));

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${hoehe}" ` +
    `viewBox="0 0 ${breite} ${hoehe}">${inhalt}</svg>`;
}

/**
 * Copyright-Zeile als Vektorpfade.
 *
 * Die Grundlinie lag zuvor nur 1,2 % der Bildhoehe ueber dem unteren Rand -
 * die Unterlaengen von p, y und g liefen dadurch bis an die Bildkante. Jetzt
 * wird von der Unterkante der Umrisse aus gerechnet, nicht von der Grundlinie.
 */
export function copyrightSVG(breite, hoehe) {
  const txt = "Copyright © my-digital-world.de";
  const groesse = Math.max(11, Math.round(hoehe * 0.0135));
  const k = kanten(POPPINS_FETT, groesse, false);
  const b = breiteVon(txt, POPPINS_FETT, groesse);
  const grundlinie = hoehe - Math.round(hoehe * 0.022) - k.tief;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${hoehe}">` +
    pfad(txt, POPPINS_FETT, groesse, (breite - b) / 2, grundlinie, "#ffffff") +
    `</svg>`;
}

// Bausteine fuer stil.mjs, das den Satzspiegel im Musterstil aufbaut.
export { glyphen, breiteVon, pfadDaten, kanten, passendeGroesse, umbrechen };
