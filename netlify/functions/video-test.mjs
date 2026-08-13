// GET /.netlify/functions/video-test?key=… - Testbestellung ohne Zahlung
//
// Warum es das gibt: Um den Ablauf zu pruefen, muesste man sonst jedes Mal
// echtes Geld durch Stripe schicken und es hinterher erstatten - die
// Bearbeitungsgebuehr bleibt dabei jedes Mal haengen. Ein Kauf ueber 0 EUR geht
// nicht: Stripe lehnt Betraege unter etwa 0,50 EUR ab.
//
// Diese Function legt deshalb eine Bestellung direkt im Zustand "paid" an und
// leitet auf die Danke-Seite weiter. Von dort laeuft alles genau wie bei einem
// echten Kauf: vier Fragen, Erzeugung, Mails.
//
// Geschuetzt durch INTERNAL_SECRET, dieselbe Variable wie beim Webhook.
//
// Achtung: Die Erzeugung selbst kostet weiterhin - Google rechnet jedes Video
// ab, rund 0,83 EUR bei Fast in 1080p. Kostenlos ist hier nur der Verkaufsweg.
import crypto from "node:crypto";
import { getPaket, getKategorie, DEFAULT_PAKET } from "../../lib/videopakete.mjs";
import { saveVideoOrder, siteUrl } from "../../lib/videoshared.mjs";

export default async (req) => {
  const url = new URL(req.url);
  const geheim = process.env.INTERNAL_SECRET;
  if (!geheim || url.searchParams.get("key") !== geheim) {
    return new Response("Kein Zugriff.", { status: 403 });
  }

  const paket = getPaket(url.searchParams.get("paket")) || getPaket(DEFAULT_PAKET);
  const kategorie = getKategorie(url.searchParams.get("kategorie")) || getKategorie("sprecher");
  const email = (url.searchParams.get("mail") || process.env.MAIL_AN || "info@my-digital-world.de").trim();

  const orderId = crypto.randomUUID();
  const token = crypto.randomBytes(24).toString("hex");

  await saveVideoOrder({
    id: orderId,
    art: "video",
    test: true,
    paketId: paket.id,
    kategorieId: kategorie.id,
    email,
    notiz: "Testbestellung ohne Zahlung",
    status: "paid",
    token,
    briefing: null,
    createdAt: new Date().toISOString(),
    paidAt: new Date().toISOString(),
  });

  const ziel = `${siteUrl()}/kurzvideos/danke?order=${orderId}&token=${token}`;
  return new Response(null, { status: 302, headers: { Location: ziel } });
};
