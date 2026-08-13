// POST /api/video-checkout - Videobestellung anlegen + Stripe-Bezahlseite
import Stripe from "stripe";
import crypto from "node:crypto";
import { getPaket, getKategorie, getLaenge, DEFAULT_LAENGE, preisCents } from "../../lib/videopakete.mjs";
import { json, siteUrl, saveVideoOrder } from "../../lib/videoshared.mjs";

export default async (req) => {
  if (req.method === "OPTIONS") return json({});
  if (req.method !== "POST") return json({ error: "Nur POST." }, 405);

  try {
    const body = await req.json();
    const paket = getPaket(body.paketId);
    const kategorie = getKategorie(body.kategorieId);
    const laenge = getLaenge(body.laengeId) || getLaenge(DEFAULT_LAENGE);
    const email = (body.email || "").trim();
    const notiz = (body.notiz || "").trim();

    if (!paket) return json({ error: "Bitte ein Paket auswählen." }, 400);
    if (!kategorie) return json({ error: "Bitte eine Art von Video auswählen." }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      return json({ error: "Bitte eine gültige E-Mail-Adresse eingeben." }, 400);
    if (notiz.length > 500)
      return json({ error: "Die Notiz ist zu lang (max. 500 Zeichen)." }, 400);

    const betrag = preisCents(paket, laenge);

    const orderId = crypto.randomUUID();
    const token = crypto.randomBytes(24).toString("hex");

    await saveVideoOrder({
      id: orderId,
      art: "video",
      paketId: paket.id,
      laengeId: laenge.id,
      kategorieId: kategorie ? kategorie.id : "",
      email,
      notiz,
      // pending -> paid -> briefing (nur beim Komplettpaket) -> done
      status: "pending",
      token,
      briefing: null,
      createdAt: new Date().toISOString(),
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const beschreibung = `${kategorie.label} · ${laenge.label}` +
      (paket.automatisch
        ? " · fertig in wenigen Minuten"
        : " · Lieferung per E-Mail in 2-3 Werktagen");

    const sitzung = {
      mode: "payment",
      client_reference_id: orderId,
      customer_email: email,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: process.env.CURRENCY || "eur",
          unit_amount: betrag,
          product_data: {
            name: `MDW-Kurzvideo ${laenge.label} – ${paket.label}`,
            description: beschreibung,
          },
        },
      }],
      success_url: `${siteUrl()}/kurzvideos/danke?order=${orderId}&token=${token}`,
      cancel_url: `${siteUrl()}/kurzvideos?abgebrochen=1`,
    };

    // Zahlarten fest benennen - gleiche Begruendung wie im Poster-Checkout:
    // Ueberlaesst man Stripe die Auswahl, blendet Checkout zusaetzlich "Link"
    // ein und fragt Wiederkehrende nach einem Bestaetigungscode. Falls eine
    // Methode fuer Betrag oder Waehrung ausfaellt, greift die automatische
    // Auswahl, damit niemand vor einer kaputten Kasse steht.
    const zahlarten = ["card", "paypal", "klarna", "revolut_pay", "amazon_pay"];
    let session;
    try {
      session = await stripe.checkout.sessions.create({ ...sitzung, payment_method_types: zahlarten });
    } catch (err) {
      console.warn("Feste Zahlarten abgelehnt, nehme die automatische Auswahl:", err?.message || err);
      session = await stripe.checkout.sessions.create(sitzung);
    }

    return json({ url: session.url });
  } catch (err) {
    console.error("Video-Checkout-Fehler:", err.message);
    return json({ error: "Checkout konnte nicht erstellt werden." }, 500);
  }
};
