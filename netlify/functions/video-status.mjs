// GET /api/video-status?id=…&token=… - die Danke-Seite fragt hier nach
import { getPaket, getKategorie } from "../../lib/videopakete.mjs";
import { json, ladeMitToken } from "../../lib/videoshared.mjs";

export default async (req) => {
  const url = new URL(req.url);
  const order = await ladeMitToken(
    url.searchParams.get("id"),
    url.searchParams.get("token")
  );
  if (!order) return json({ error: "Bestellung nicht gefunden." }, 404);

  const paket = getPaket(order.paketId);
  const kategorie = getKategorie(order.kategorieId);

  return json({
    status: order.status,
    paketId: order.paketId,
    paketLabel: paket ? paket.label : "",
    brauchtBriefing: Boolean(paket && paket.briefing),
    kategorieLabel: kategorie ? kategorie.label : "",
    email: order.email,
    briefingAbgegeben: Boolean(order.briefing),
  });
};
