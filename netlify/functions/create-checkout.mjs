// POST /api/create-checkout – Bestellung anlegen + Stripe-Bezahlseite
import Stripe from "stripe";
import crypto from "node:crypto";
import { MOTIFS, buildPrompt, saveOrder, json, siteUrl } from "../../lib/shared.mjs";
import { getFormat, DEFAULT_FORMAT } from "../../lib/formats.mjs";

export default async (req) => {
  if (req.method === "OPTIONS") return json({});
  if (req.method !== "POST") return json({ error: "Nur POST." }, 405);

  try {
    const body = await req.json();
    const motif = MOTIFS[body.motifId];
    const format = getFormat(body.formatId) || getFormat(DEFAULT_FORMAT);
    const name = (body.name || "").trim();
    const text = (body.text || "").trim();
    const bezeichnung = (body.bezeichnung || "").trim();
    const fotoSchluessel = (body.fotoSchluessel || "").trim();

    if (!motif) return json({ error: "Bitte ein Motiv auswählen." }, 400);
    if (!format) return json({ error: "Bitte ein Format auswählen." }, 400);

    // Beim eigenen Foto ist der Name freiwillig: Es steht nur im Bild, was der
    // Kunde eingibt - gibt er nichts ein, bekommt er sein Foto pur.
    if (motif.eigenesFoto) {
      if (!/^[0-9a-f-]{36}$/i.test(fotoSchluessel)) {
        return json({ error: "Bitte zuerst ein Foto hochladen." }, 400);
      }
      if (bezeichnung.length > 40) {
        return json({ error: "Die Bezeichnung ist zu lang (max. 40 Zeichen)." }, 400);
      }
    } else if (name.length < 1 || name.length > 40) {
      return json({ error: "Bitte einen Namen eingeben (max. 40 Zeichen)." }, 400);
    }

    if (name.length > 40)
      return json({ error: "Der Name ist zu lang (max. 40 Zeichen)." }, 400);
    if (text.length > 250)
      return json({ error: "Der persönliche Text ist zu lang (max. 250 Zeichen)." }, 400);

    const orderId = crypto.randomUUID();
    const downloadToken = crypto.randomBytes(24).toString("hex");

    await saveOrder({
      id: orderId,
      motifId: motif.id,
      formatId: format.id,
      name,
      text,
      bezeichnung,
      fotoSchluessel: motif.eigenesFoto ? fotoSchluessel : "",
      prompt: motif.eigenesFoto ? "" : buildPrompt(motif, name, text),
      status: "pending", // pending -> paid -> generating -> done (oder error)
      downloadToken,
      createdAt: new Date().toISOString(),
    });

    const fuer = name ? `, personalisiert für ${name}` : "";

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      client_reference_id: orderId,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: process.env.CURRENCY || "eur",
          unit_amount: format.cents,
          product_data: {
            name: `${process.env.PRODUCT_NAME || "Personalisiertes MDW-Poster"} – ${format.label}`,
            description: `Motiv „${motif.titel}“${fuer} · ${format.hinweis}`,
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
