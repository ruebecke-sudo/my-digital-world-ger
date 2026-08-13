// Kleine gemeinsame Bausteine der Video-Functions.
//
// Bewusst getrennt von lib/shared.mjs: Dort haengen sharp, der Motivkatalog und
// die Schriftdateien dran. Fuer eine Videobestellung wird davon nichts
// gebraucht, und jede Function startet schneller, wenn sie es nicht mitlaedt.
import { getStore } from "@netlify/blobs";

export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    },
  });

export const siteUrl = () => process.env.URL || "http://localhost:8888";

// Videobestellungen liegen im selben Blob-Store wie die Poster. Sie tragen das
// Feld art: "video" und werden daran ueberall wiedererkannt - vor allem im
// Webhook, der fuer sie keine Bildgenerierung anstossen darf.
export const videoOrdersStore = () => getStore("orders");

export async function getVideoOrder(id) {
  if (!id) return null;
  const order = await videoOrdersStore().get(id, { type: "json" });
  return order && order.art === "video" ? order : null;
}

export async function saveVideoOrder(order) {
  await videoOrdersStore().setJSON(order.id, order);
}

// Bestellung anhand von id + token holen. Gibt null zurueck, wenn eines von
// beidem nicht passt - der Aufrufer muss den Unterschied nicht kennen.
export async function ladeMitToken(id, token) {
  const order = await getVideoOrder(id);
  if (!order || !token || order.token !== token) return null;
  return order;
}

export const preis = cents => (cents / 100).toFixed(2).replace(".", ",") + " €";

// Netlify Blobs nimmt string, ArrayBuffer, Blob oder Stream - aber keinen
// Node-Buffer. Uebergibt man einen, bricht set() ab und die Bestellung landet
// im Fehlerzustand, obwohl das Video fertig war. Der Poster-Weg macht dieselbe
// Umwandlung, siehe generate-background.mjs.
export const alsArrayBuffer = buf =>
  buf instanceof ArrayBuffer
    ? buf
    : buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
