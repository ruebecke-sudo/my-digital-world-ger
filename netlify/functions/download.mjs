// GET /.netlify/functions/download?id=…&token=… – Kundenfassung ohne Logo
import { getOrder, imagesStore, json } from "../../lib/shared.mjs";
import { getFormat, DEFAULT_FORMAT } from "../../lib/formats.mjs";

export default async req => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || url.searchParams.get("order_id");
  const token = url.searchParams.get("token");

  const order = await getOrder(id);
  if (!order || order.downloadToken !== token) {
    return json({ error: "Bestellung nicht gefunden." }, 404);
  }
  if (order.status !== "done") {
    return json({ status: order.status, error: "Das Poster ist noch nicht fertig." }, 202);
  }

  const bild = await imagesStore().get(`${id}_download`, { type: "arrayBuffer" });
  if (!bild) return json({ error: "Bilddatei nicht gefunden." }, 404);

  const format = getFormat(order.formatId) || getFormat(DEFAULT_FORMAT);
  const datei = `mdw-poster-${order.motifId}-${format.id}.jpg`;

  return new Response(bild, {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Disposition": `attachment; filename="${datei}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
};
