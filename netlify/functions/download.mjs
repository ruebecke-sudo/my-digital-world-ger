// GET /api/download?id=…&token=… – fertiges Bild ausliefern
import { getOrder, imagesStore } from "../../lib/shared.mjs";

export default async (req) => {
  const url = new URL(req.url);
  const order = await getOrder(url.searchParams.get("id"));
  if (!order || order.downloadToken !== url.searchParams.get("token") || order.status !== "done") {
    return new Response("Kein Zugriff.", { status: 403 });
  }
  const bild = await imagesStore().get(order.id, { type: "arrayBuffer" });
  if (!bild) return new Response("Bild nicht gefunden.", { status: 404 });

  return new Response(bild, {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": 'attachment; filename="mein-mdw-poster.png"',
    },
  });
};
