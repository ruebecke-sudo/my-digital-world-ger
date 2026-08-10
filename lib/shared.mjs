// Gemeinsame Bausteine für alle Netlify Functions
import { getStore } from "@netlify/blobs";
import catalog from "./catalog.mjs";
import { LOGO_BASE64 } from "./logo.mjs";
import { copyrightSVG } from "./textlayer.mjs";
import { textebeneSVG } from "./stil.mjs";

export const CATALOG = catalog;
export const MOTIFS = Object.fromEntries(catalog.motive.map(m => [m.id, m]));

// --- Bestellungen in Netlify Blobs ---------------------------
export const ordersStore = () => getStore("orders");
export const imagesStore = () => getStore("images");

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
// Die KI liefert das Bild ohne Schrift. Name und Kundentext kommen hier als
// Vektorebene darueber und stehen dadurch garantiert korrekt im Poster.
export async function textAufbringen(bildBuffer, motif, name, text) {
  const sharp = (await import("sharp")).default;
  const meta = await sharp(bildBuffer).metadata();
  const svg = textebeneSVG(meta.width, meta.height, motif, name, text);
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
