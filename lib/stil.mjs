// Poster-Typografie nach dem Muster "Spaßvogel".
//
// Merkmale des Musters, die hier nachgebaut werden:
//   - "Hallo," und die Bezeichnung in einer Pinselschrift, nicht in Versalien
//   - "ich bin der" und der Lauftext in einer runden Schrift, deutlich kleiner
//   - der ganze Satz leicht schraeg gestellt
//   - "DES JAHRES." auf einem gemalten violetten Pinselbalken
//   - Schluesselwoerter in Gold, das letzte auf einem gelben Pinselstrich
//   - duenne violette Trennlinie zwischen den Saetzen
//
// Jede Zeile wird dreimal gezeichnet: Schatten, Kontur, Fuellung. Filter werden
// bewusst nicht verwendet, weil librsvg sie nur teilweise unterstuetzt.

import { glyphen, breiteVon, pfadDaten, kanten, passendeGroesse, umbrechen } from "./textlayer.mjs";

// Erste vorhandene Datei je Rolle gewinnt.
export const PINSEL = ["CaveatBrush-Regular.ttf", "Pacifico-Regular.ttf", "Lora-Regular.ttf"];
export const RUND_FETT = ["BubblegumSans-Regular.ttf", "VarelaRound-Regular.ttf", "Lato-Black.ttf"];
export const RUND = ["VarelaRound-Regular.ttf", "Poppins-Medium.ttf"];

const WEISS = "#ffffff";
const DUNKEL = "#1a1030";
const GOLD = "#f7b81c";
const GOLD_HELL = "#ffd34e";
const VIOLETT = "#6b2fa0";
const VIOLETT_TIEF = "#4a1f73";
const GELB = "#ffc61a";

// --- Zeichenhilfen ---------------------------------------------------------

function rohPfad(text, rolle, groesse, x, y) {
  const { stuecke } = glyphen(text, rolle, groesse);
  const teile = [];
  for (const st of stuecke) {
    const d = pfadDaten(st.glyph.getPath(x + st.x, y, groesse).commands);
    if (d) teile.push(d);
  }
  return teile.join(" ");
}

function zeile(text, rolle, groesse, x, y, fuellung, o = {}) {
  const d = rohPfad(text, rolle, groesse, x, y);
  if (!d) return "";
  const kontur = o.kontur ?? groesse * 0.055;
  const v = o.versatz ?? groesse * 0.045;
  const teile = [];
  if (o.schatten !== false) {
    teile.push(`<path d="${d}" fill="#000" fill-opacity="0.4" stroke="#000" ` +
      `stroke-opacity="0.4" stroke-width="${kontur.toFixed(1)}" stroke-linejoin="round" ` +
      `transform="translate(${v.toFixed(1)},${(v * 1.2).toFixed(1)})"/>`);
  }
  if (kontur > 0) {
    teile.push(`<path d="${d}" fill="none" stroke="${o.konturFarbe || DUNKEL}" ` +
      `stroke-opacity="${o.konturDeckung ?? 0.9}" stroke-width="${kontur.toFixed(1)}" ` +
      `stroke-linejoin="round"/>`);
  }
  teile.push(`<path d="${d}" fill="${fuellung}"/>`);
  return teile.join("");
}

// Gemalter Pinselbalken: Rechteck mit welligen Kanten und angeschraegten Enden.
function pinselBalken(x, y, breite, hoehe, farbe, deckung = 1) {
  const w = hoehe * 0.16;
  const s = hoehe * 0.30;
  const d = [
    `M${(x + s * 0.5).toFixed(1)} ${(y + w * 0.6).toFixed(1)}`,
    `C${(x + breite * 0.3).toFixed(1)} ${(y - w * 0.5).toFixed(1)} ` +
    `${(x + breite * 0.7).toFixed(1)} ${(y + w * 0.7).toFixed(1)} ` +
    `${(x + breite).toFixed(1)} ${(y - w * 0.2).toFixed(1)}`,
    `L${(x + breite - s).toFixed(1)} ${(y + hoehe + w * 0.3).toFixed(1)}`,
    `C${(x + breite * 0.6).toFixed(1)} ${(y + hoehe - w * 0.5).toFixed(1)} ` +
    `${(x + breite * 0.35).toFixed(1)} ${(y + hoehe + w).toFixed(1)} ` +
    `${x.toFixed(1)} ${(y + hoehe + w * 0.2).toFixed(1)}`,
    "Z",
  ].join(" ");
  return `<path d="${d}" fill="${farbe}" fill-opacity="${deckung}"/>`;
}

const trennlinie = (x, y, breite, hoehe) =>
  `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${breite.toFixed(1)}" ` +
  `height="${hoehe.toFixed(1)}" rx="${(hoehe / 2).toFixed(1)}" fill="${VIOLETT}" fill-opacity="0.85"/>`;

// --- Satzspiegel -----------------------------------------------------------

const stapelHoehe = b => b.reduce((s, x) => s + x.abstand + x.hoehe, 0);

function zeichnen(b, y0) {
  const teile = [];
  let y = y0;
  for (const el of b) { y += el.abstand; teile.push(el.zeichne(y)); y += el.hoehe; }
  return teile.join("\n");
}

// --- Aufbau ----------------------------------------------------------------

function bloecke(d, B, rand, spalte) {
  const b = [];

  // Hallo, - Pinselschrift, gross
  const gH = passendeGroesse("Hallo,", PINSEL, spalte * 0.95, B * 3.2, B);
  const kH = kanten(PINSEL, gH, false);
  b.push({ abstand: 0, hoehe: kH.hoch + kH.tief * 0.35,
    zeichne: y => zeile("Hallo,", PINSEL, gH, rand, y + kH.hoch, WEISS) });

  // ich bin der - runde Schrift, klein
  const anrede = d.anrede;
  const gA = passendeGroesse(anrede, RUND, spalte * 0.8, B * 0.92, B * 0.5);
  const kA = kanten(RUND, gA, false);
  b.push({ abstand: B * 0.1, hoehe: kA.hoch + kA.tief,
    zeichne: y => zeile(anrede, RUND, gA, rand + B * 0.3, y + kA.hoch, WEISS,
      { kontur: gA * 0.07 }) });

  // Bezeichnung - Pinselschrift in Gold, gemischte Schreibweise wie im Muster
  const teile = String(d.bezeichnung).split(/(?<=-)/).filter(Boolean);
  const laengstes = teile.reduce((a, x) => (x.length > a.length ? x : a), "");
  const gK = passendeGroesse(laengstes, PINSEL, spalte * 0.98, B * 3.4, B * 0.9);
  const zeilenK = [];
  let akt = "";
  for (const t of teile) {
    if (breiteVon(akt + t, PINSEL, gK) <= spalte * 0.98) akt += t;
    else { if (akt) zeilenK.push(akt); akt = t; }
  }
  if (akt) zeilenK.push(akt);
  const kK = kanten(PINSEL, gK, false);
  const zK = kK.hoch * 1.05;
  b.push({
    abstand: B * 0.12,
    hoehe: kK.hoch + (zeilenK.length - 1) * zK + kK.tief * 0.4,
    zeichne: y => zeilenK.map((z, i) =>
      zeile(z, PINSEL, gK, rand, y + kK.hoch + i * zK, "url(#gold)")).join(""),
  });

  // DES JAHRES. auf violettem Pinselbalken
  const gD = passendeGroesse("DES JAHRES.", RUND_FETT, spalte * 0.72, B * 1.25, B * 0.6);
  const kD = kanten(RUND_FETT, gD, true);
  const luft = kD.hoch * 0.55;
  const bD = breiteVon("DES JAHRES.", RUND_FETT, gD);
  const balkenH = kD.hoch + luft * 2;
  b.push({
    abstand: B * 0.28, hoehe: balkenH * 1.1,
    zeichne: y => pinselBalken(rand - luft * 0.6, y, bD + luft * 2.4, balkenH, VIOLETT, 0.92) +
      zeile("DES JAHRES.", RUND_FETT, gD, rand + luft * 0.2, y + luft + kD.hoch, WEISS,
        { kontur: gD * 0.05, konturFarbe: VIOLETT_TIEF }),
  });

  // Kundentext - runde Schrift, klein, Schluesselwoerter in Gold.
  // Im letzten Satz liegt das Schluesselwort auf einem gelben Pinselstrich,
  // genau wie "präsentieren" im Muster.
  const gT = Math.min(B * 0.95, gK * 0.38);
  const kT = kanten(RUND, gT, false);
  const zT = kT.hoch * 1.62;
  const saetze = String(d.spruch || "").split(/(?<=[.!?])\s+/).filter(Boolean);

  saetze.forEach((satz, si) => {
    const letzter = si === saetze.length - 1;
    const zs = umbrechen(satz, RUND, gT, spalte * 0.92);
    if (!zs.length) return;
    const treffer = (d.akzente || []).filter(a => satz.toLowerCase().includes(a.toLowerCase()));
    const woerter = new Set();
    for (const a of treffer) for (const w of a.split(" ")) woerter.add(w.toLowerCase());

    const malen = (z, y) => {
      let vor = "", haupt = "";
      let cx = rand;
      for (const wort of z.split(" ")) {
        const kern = wort.replace(/[^\p{L}\p{N}-]/gu, "").toLowerCase();
        const ist = kern && woerter.has(kern);
        const w = breiteVon(wort + " ", RUND, gT);
        if (ist && letzter) {
          // Der gelbe Pinselstrich braucht rundherum Luft, sonst schneidet er
          // die Ober- und Unterlaengen des Wortes an.
          const wortBreite = breiteVon(wort, RUND, gT);
          vor += pinselBalken(cx - gT * 0.22, y - kT.hoch - gT * 0.14,
            wortBreite + gT * 0.44, kT.hoch + kT.tief + gT * 0.24, GELB, 0.95);
          haupt += zeile(wort + " ", RUND, gT, cx, y, DUNKEL, { schatten: false, kontur: 0 });
        } else {
          haupt += zeile(wort + " ", RUND, gT, cx, y, ist ? GOLD_HELL : WEISS,
            { kontur: gT * 0.07 });
        }
        cx += w;
      }
      return vor + haupt;
    };

    b.push({
      abstand: si === 0 ? B * 0.7 : B * 0.34,
      hoehe: kT.hoch + (zs.length - 1) * zT + kT.tief + (letzter ? 0 : B * 0.34),
      zeichne: y => zs.map((z, i) => malen(z, y + kT.hoch + i * zT)).join("") +
        (letzter ? "" : trennlinie(rand, y + kT.hoch + (zs.length - 1) * zT + kT.tief + B * 0.16,
          spalte * 0.62, B * 0.055)),
    });
  });

  return b;
}

// "GUTE-LAUNE-BOTSCHAFTER" -> "Gute-Laune-Botschafter". Das Muster setzt die
// Bezeichnung in gemischter Schreibweise, nicht in Versalien.
const schoen = t => String(t || "").toLowerCase()
  .replace(/(^|[-\s])(\p{L})/gu, (_, v, b) => v + b.toUpperCase());

/**
 * Textebene im Musterstil.
 * @param {number} spaltenAnteil Anteil der Bildbreite, den die Schrift nutzt
 * @param {number} neigung       Schraegstellung in Grad (negativ = links hoch)
 */
export function textebeneSVG(breite, hoehe, motif, name, text, spaltenAnteil = 0.46, neigung = -2.6) {
  const spruch = (text && text.trim()) || motif.defaultText || "";
  const d = {
    bezeichnung: schoen(motif.kurz || motif.bezeichnung),
    // Der Kundenname steht in der kleinen Zeile. Ohne Namen faellt sie auf die
    // Formulierung des Musters zurueck.
    anrede: (name || "").trim() ? `ich bin ${name.trim()},` : (motif.anrede || "ich bin der"),
    spruch,
    akzente: motif.akzente || [],
  };
  const rand = Math.round(breite * 0.055);
  const spalte = Math.round(breite * spaltenAnteil) - rand;
  const y0 = hoehe * 0.045;
  const platz = hoehe * 0.66 - y0;

  const ziel = platz * 0.95;
  const maxB = breite * 0.085;
  let B = breite * 0.030;
  const bauen = () => bloecke(d, B, rand, spalte);
  let bl = bauen();
  for (let i = 0; i < 90 && stapelHoehe(bl) > platz; i++) { B *= 0.97; bl = bauen(); }
  for (let i = 0; i < 90 && B < maxB; i++) {
    const alt = B;
    B *= 1.03;
    const probe = bauen();
    if (stapelHoehe(probe) > ziel) { B = alt; bl = bauen(); break; }
    bl = probe;
  }

  const defs = `<defs><linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${GOLD_HELL}"/><stop offset="0.55" stop-color="${GOLD}"/>
    <stop offset="1" stop-color="#d8890a"/></linearGradient></defs>`;

  // Der ganze Satz wird um seinen eigenen Mittelpunkt gedreht, damit er nicht
  // aus dem Bild wandert.
  const mx = rand + spalte / 2;
  const my = y0 + stapelHoehe(bl) / 2;
  const gruppe = `<g transform="rotate(${neigung} ${mx.toFixed(1)} ${my.toFixed(1)})">` +
    zeichnen(bl, y0) + `</g>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${breite}" height="${hoehe}" ` +
    `viewBox="0 0 ${breite} ${hoehe}">${defs}${gruppe}</svg>`;
}
