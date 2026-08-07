// POST /api/create-checkout – Bestellung anlegen + Stripe-Bezahlseite
import Stripe from "stripe";
import crypto from "node:crypto";
import { MOTIFS, buildPrompt, saveOrder, json, siteUrl } from "../../lib/shared.mjs";

export default async (req) => {
  if (req.method === "OPTIONS") return json({});
  if (req.method !== "POST") return json({ error: "Nur POST." }, 405);

  try {
    const body = await req.json();
    const motif = MOTIFS[body.motifId];
    const name = (body.name || "").trim();
    const text = (body.text || "").trim();

    if (!motif) return json({ error: "Bitte ein Motiv auswählen." }, 400);
    if (name.length < 1 || name.length > 40)
      return json({ error: "Bitte einen Namen eingeben (max. 40 Zeichen)." }, 400);
    if (text.length > 250)
      return json({ error: "Der persönliche Text ist zu lang (max. 250 Zeichen)." }, 400);

    const orderId = crypto.randomUUID();
    const downloadToken = crypto.randomBytes(24).toString("hex");

    await saveOrder({
      id: orderId,
      motifId: motif.id,
      name,
      text,
      prompt: buildPrompt(motif, name, text),
      status: "pending",              // pending -> paid -> done (oder error)
      downloadToken,
      createdAt: new Date().toISOString(),
    });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: orderId,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: process.env.CURRENCY || "eur",
          unit_amount: parseInt(process.env.PRICE_CENTS || "300", 10),
          product_data: {
            name: process.env.PRODUCT_NAME || "Personalisiertes MDW-Poster",
            description: `Motiv „${motif.titel}“, personalisiert für ${name}`,
          },
        },
      }],
      success_url: `${siteUrl()}/empfehlung/poster/danke?order=${orderId}&token=${downloadToken}`,
      cancel_url: `${siteUrl()}/empfehlung/poster?abgebrochen=1`,
    });

    return json({ url: session.url });
  } catch (err) {
    console.error("Checkout-Fehler:", err.message);
    return json({ error: "Checkout konnte nicht erstellt werden." }, 500);
  }
};
