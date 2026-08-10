// Gemeinsame Bausteine für alle Netlify Functions
import { getStore } from "@netlify/blobs";
import catalog from "./catalog.mjs";
import { LOGO_BASE64 } from "./logo.mjs";
import { copyrightSVG } from "./textlayer.mjs";
import { textebeneSVG } from "./stil.mjs";
import { beschriften } from "./milchglas.mjs";
import { FESTBILDER } from "./festbilder.mjs";

export const CATALOG = catalog;

// motifs.json bleibt die Pflegedatei fuer Texte und Prompts. Welches Motiv ein
// fertiges Bild mitbringt, steht getrennt davon in festbilder.mjs - so muss die
// Katalogdatei fuer den Bildumbau nicht angefasst werden.
export const MOTIFS = Object.fromEntries(
  catalog.motive.map(m => [m.id, { ...m, ...(FESTBILDER[m.id] || {}) }])
);

// --- Bestellungen in Netlify Blobs ---------------------------
export const ordersStore = () => getStore("orders");
export const imagesStore = () => getStore("images");
// Hochgeladene Kundenfotos liegen getrennt von den fertigen Postern.
export const uploadsStore = () => getStore("uploads");

// Wo bei einem eigenen Foto die Milchglasflaeche sitzt, wenn der Kunde keine
// Bezeichnung fuer die Ueberschrift angegeben hat: unten links, wo auf Fotos
// am ehesten Ruhe herrscht.
export const FOTO_TEXTBEREICH = { x: 0.06, y: 0.6, w: 0.5, h: 0.28 };

export async function getOrder(id) {
  if (!id) return null;
  return await ordersStore().get(id, { type: "json" });
}
export async function saveOrder(order) {
  await ordersStore().setJSON(order.id, order);
}

// --- Prompt bauen --------------------------------------------
// „Hallo, ich bin {name}. Ich bin der {bezeichnung}. {text}“
//
// Ein Motiv darf "stylePrompt" und/oder "textSchema" selbst mitbringen und
// damit die globale Vorgabe überschreiben – gebraucht z. B. beim Hochzeitspaar,
// das zu zweit auftritt und eine andere Typografie hat.
export function buildPrompt(motif) {
  const stil = motif.stylePrompt || CATALOG.stylePrompt;
  return `${stil} Szene: ${motif.szene} ` +
    `Die Hauptfigur ist ein MENSCH: eine uebertrieben karikierte, menschliche ` +
    `Pixar-Figur mit sehr ausdrucksstarkem Gesicht - kein Tier, kein Monster, ` +
    `kein Fabelwesen. Ganzkoerperansicht. ` +
    `Bildaufbau: Die Figur steht klar in der rechten Bildhaelfte. Die linke ` +
    `Bildhaelfte bleibt dunkel, ruhig und frei von wichtigen Details. ` +
    `Die Szene ist dunkel und stimmungsvoll ausgeleuchtet, das Licht kommt von ` +
    `rechts. Kraeftige satte Farben, buntes Konfetti, liebevolle thematische ` +
    `Requisiten. Der untere Bildrand bleibt frei. ` +
    `Absolut kein Text im Bild: keine Buchstaben, keine Zahlen, keine Woerter, ` +
    `keine Schilder mit Aufschrift, keine Logos, keine Gravuren.`;
}

// --- Textebene aufstempeln -----------------------------------
//
// Drei Faelle:
//
// 1. Motiv mit festem Bild (erkennbar am "textBereich"): Ueberschrift und
//    Trophaee sind schon gemalt. Es kommt nur noch die Milchglasflaeche mit
//    Name und Spruch hinzu.
// 2. Eigenes Foto des Kunden ("eigenesFoto"): Auf dem Foto steht ausschliesslich
//    das, was er selbst eingegeben hat. Mit Bezeichnung entsteht die volle
//    Poster-Typografie, ohne Bezeichnung nur die Milchglasflaeche, und wenn er
//    gar nichts eingibt, bleibt das Foto unberuehrt.
// 3. Motiv ohne festes Bild: Die KI liefert das Bild ohne Schrift, die
//    komplette Typografie entsteht hier als Vektorebene.
//
// In allen Faellen steht der Text garantiert korrekt im Poster - er wird nicht
// von der Bild-KI gemalt.
export async function textAufbringen(bildBuffer, motif, name, text) {
  const eigenes = Boolean(motif.eigenesFoto);
  const nameRein = (name || "").trim();
  const spruch = eigenes
    ? (text || "").trim()
    : ((text && text.trim()) || motif.defaultText || "");

  // "Grillmeister des Jahres" wuerde sich mit dem Balken "DES JAHRES."
  // darunter doppeln. Die Endung deshalb abschneiden - egal, wie der Kunde
  // sie geschrieben hat.
  const bezeichnung = eigenes
    ? (motif.bezeichnung || "").trim().replace(/\s*[-–—]?\s*des\s+jahres\.?$/i, "").trim()
    : (motif.bezeichnung || "");

  if (eigenes) {
    if (!bezeichnung && !spruch && !nameRein) return bildBuffer;
    if (!bezeichnung) {
      return await beschriften(bildBuffer, FOTO_TEXTBEREICH, nameRein, spruch);
    }
  } else if (motif.textBereich) {
    return await beschriften(bildBuffer, motif.textBereich, nameRein, spruch);
  }

  const sharp = (await import("sharp")).default;
  const meta = await sharp(bildBuffer).metadata();
  const motivRein = eigenes
    ? { ...motif, bezeichnung, kurz: bezeichnung.toUpperCase() }
    : motif;
  const svg = textebeneSVG(meta.width, meta.height, motivRein, nameRein, spruch);
  return sharp(bildBuffer)
    .composite([{ input: Buffer.from(svg), left: 0, top: 0 }])
    .png()
    .toBuffer();
}

// --- MDW-Logo + Copyright aufstempeln ------------------------
export async function addBranding(imageBuffer) {
  const sharp = (await import("sharp")).default;
  const meta = await sharp(imageBuffer).metadata();
  const overlays = [];

  const logoBreite = Math.round(meta.width * 0.16);
  const logo = await sharp(Buffer.from(LOGO_BASE64, "base64"))
    .resize({ width: logoBreite }).png().toBuffer();
  const logoMeta = await sharp(logo).metadata();
  overlays.push({
    input: logo,
    left: Math.round(meta.width * 0.03),
    top: meta.height - logoMeta.height - Math.round(meta.height * 0.015),
  });

  // Frueher ein SVG-Textknoten: auf Netlify fehlen Systemschriften, deshalb
  // erschien jeder Buchstabe als leeres Kaestchen. Jetzt Vektorpfade.
  overlays.push({
    input: Buffer.from(copyrightSVG(meta.width, meta.height)),
    left: 0,
    top: 0,
  });

  return sharp(imageBuffer).composite(overlays).png().toBuffer();
}

// --- Hilfen ---------------------------------------------------
export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
export const siteUrl = () => process.env.URL || "http://localhost:8888";
