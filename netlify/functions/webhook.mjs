// POST /api/webhook – Stripe meldet erfolgreiche Zahlung.
// Antwortet schnell und stößt die Bildgenerierung als Background-Function an.
import Stripe from "stripe";
import { getOrder, saveOrder, json, siteUrl } from "../../lib/shared.mjs";

export default async (req) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      await req.text(),
      req.headers.get("stripe-signature"),
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook-Signatur ungültig:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const order = await getOrder(session.client_reference_id);

    if (order && order.status === "pending") {
      order.status = "paid";
      order.customerEmail = session.customer_details?.email || null;
      order.paidAt = new Date().toISOString();
      await saveOrder(order);

      // Videobestellungen aus dem Kurzvideo-Angebot liegen im selben Store,
      // tragen aber art: "video". Fuer sie gibt es nichts zu generieren - das
      // Video entsteht von Hand bzw. der Kunde bekommt sein Prompt-Paket.
      if (order.art === "video") return json({ received: true });

      // Background-Function anstoßen (antwortet sofort mit 202,
      // läuft dann bis zu 15 Minuten – genug für die Bildgenerierung)
      await fetch(`${siteUrl()}/.netlify/functions/generate-background`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-key": process.env.INTERNAL_SECRET,
        },
        body: JSON.stringify({ orderId: order.id }),
      });
    }
  }

  return json({ received: true });
};
