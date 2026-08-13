// GET /api/video-status?id=…&token=… - die Danke-Seite fragt hier nach
//
// Status-Kette:
//   pending  -> Zahlung noch nicht bestaetigt
//   paid     -> bezahlt, Kurzabfrage steht aus
//   wartet   -> Antworten da, Erzeugung angestossen (nur automatisches Paket)
//   erzeugt  -> Veo arbeitet gerade
//   fertig   -> Video liegt bereit
//   fehler   -> Erzeugung gescheitert, wird von Hand nachgeholt
//   briefing -> Antworten da, ein Mensch macht das Video (betreutes Paket)
import { getPaket, getKategorie, getLaenge } from "../../lib/videopakete.mjs";
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
  const laenge = getLaenge(order.laengeId);

  return json({
    status: order.status,
    paketId: order.paketId,
    paketLabel: paket ? paket.label : "",
    automatisch: Boolean(paket && paket.automatisch),
    kategorieLabel: kategorie ? kategorie.label : "",
    laengeLabel: laenge ? laenge.label : "8 Sekunden",
    email: order.email,
    abfrageAbgegeben: Boolean(order.briefing),
    videoFertig: order.status === "fertig",
  });
};
