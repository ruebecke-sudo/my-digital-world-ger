// GET /.netlify/functions/image-preview?id=…&token=… – Webvorschau MIT MDW-Logo
import { getOrder, imagesStore, json } from "../../lib/shared.mjs";

export default async req => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id") || url.searchParams.get("order_id");
  const token = url.searchParams.get("token");

  const order = await getOrder(id);
  if (!order || order.downloadToken !== token) {
    return json({ error: "Bestellung nicht gefunden." }, 404);
  }
  if (order.status !== "done") {
    return json({ status: order.status }, 202);
  }

  const bild = await imagesStore().get(`${id}_preview`, { type: "arrayBuffer" });
  if (!bild) return json({ error: "Vorschau nicht gefunden." }, 404);

  return new Response(bild, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "private, max-age=3600",
    },
  });
};
