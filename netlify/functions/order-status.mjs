// GET /api/order-status?id=…&token=… – Erfolgsseite fragt den Status ab
import { getOrder, json } from "../../lib/shared.mjs";

export default async (req) => {
  const url = new URL(req.url);
  const order = await getOrder(url.searchParams.get("id"));
  if (!order || order.downloadToken !== url.searchParams.get("token")) {
    return json({ error: "Bestellung nicht gefunden." }, 404);
  }
  return json({ status: order.status });
};
