// Gemeinsame Bausteine für alle Netlify Functions
import { getStore } from "@netlify/blobs";
import catalog from "./catalog.mjs";
import { LOGO_BASE64 } from "./logo.mjs";

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
export function buildPrompt(motif, name, text) {
  const kundentext = text || motif.defaultText;
  const textTeil = CATALOG.textSchema
    .replaceAll("{titel}", motif.titel)
    .replaceAll("{name}", name)
    .replaceAll("{bezeichnung}", motif.bezeichnung)
    .replaceAll("{kurz}", motif.kurz || motif.bezeichnung.toUpperCase())
    .replaceAll("{text}", kundentext);
  return `${CATALOG.stylePrompt} Szene: ${motif.szene} ${textTeil} Alle Texte in fehlerfreiem Deutsch, exakt wie angegeben.`;
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

  const schrift = Math.round(meta.height * 0.014);
  overlays.push({
    input: Buffer.from(
      `<svg width="${meta.width}" height="${meta.height}">
         <text x="50%" y="${meta.height - Math.round(meta.height * 0.012)}"
               text-anchor="middle" font-family="Arial, sans-serif"
               font-size="${schrift}" fill="#ffffff" fill-opacity="0.9">Copyright © my-digital-world.de</text>
       </svg>`
    ),
    left: 0, top: 0,
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
