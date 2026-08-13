// GET /api/video-datei?id=…&token=… - liefert das fertige Video aus
//
// Dieselbe Datei bedient die Vorschau auf der Danke-Seite und den Download.
// Mit ?download=1 kommt ein Dateiname mit, sonst spielt der Browser das Video
// direkt ab.
import { getStore } from "@netlify/blobs";
import { json, ladeMitToken } from "../../lib/videoshared.mjs";

export default async (req) => {
  const url = new URL(req.url);
  const order = await ladeMitToken(
    url.searchParams.get("id"),
    url.searchParams.get("token")
  );
  if (!order) return json({ error: "Bestellung nicht gefunden." }, 404);
  if (order.status !== "fertig")
    return json({ error: "Das Video ist noch nicht fertig." }, 409);

  const daten = await getStore("videos").get(order.id, { type: "arrayBuffer" });
  if (!daten) return json({ error: "Das Video wurde nicht gefunden." }, 404);

  const laden = url.searchParams.get("download") === "1";

  return new Response(daten, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
      "Cache-Control": "private, max-age=3600",
      ...(laden
        ? { "Content-Disposition": `attachment; filename="mdw-kurzvideo-${order.id.slice(0, 8)}.mp4"` }
        : {}),
    },
  });
};
