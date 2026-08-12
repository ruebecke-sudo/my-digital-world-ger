// GET /api/video-paket?id=…&token=… - liefert das Prompt-Paket nach der Zahlung
//
// Der Inhalt liegt bewusst nicht im Frontend-Bundle: Sonst koennte ihn jeder
// aus dem Quelltext der Seite lesen, ohne zu bezahlen.
import { PROMPT_PAKET, GEMINI_URL } from "../../lib/promptpaket.mjs";
import { json, ladeMitToken } from "../../lib/videoshared.mjs";

export default async (req) => {
  const url = new URL(req.url);
  const order = await ladeMitToken(
    url.searchParams.get("id"),
    url.searchParams.get("token")
  );
  if (!order) return json({ error: "Bestellung nicht gefunden." }, 404);
  if (order.paketId !== "selbst")
    return json({ error: "Dieses Paket gehört nicht zur Bestellung." }, 400);
  if (order.status === "pending")
    return json({ error: "Die Zahlung ist noch nicht bestätigt." }, 409);

  return json({ paket: PROMPT_PAKET, geminiUrl: GEMINI_URL });
};
