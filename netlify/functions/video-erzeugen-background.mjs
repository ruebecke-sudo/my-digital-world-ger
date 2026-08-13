// POST /.netlify/functions/video-erzeugen-background
//
// Background-Function (bis 15 Minuten Laufzeit). Wird von video-briefing.mjs
// angestossen, sobald ein Kunde des Selbst-Pakets seine vier Antworten
// abgeschickt hat.
//
// Warum im Hintergrund: Veo braucht ein bis drei Minuten. Eine normale Function
// waere nach zehn Sekunden abgeschnitten - der Kunde haette bezahlt und
// bekaeme nichts.
//
// Der Aufruf ist durch INTERNAL_SECRET geschuetzt, dieselbe Variable, die schon
// der Poster-Weg benutzt. Sonst koennte jeder auf Kosten des Betreibers Videos
// erzeugen lassen.
import { getStore } from "@netlify/blobs";
import { videoPrompt, videoErzeugen } from "../../lib/veo.mjs";
import { getPaket } from "../../lib/videopakete.mjs";
import { getVideoOrder, saveVideoOrder, json, siteUrl, alsArrayBuffer } from "../../lib/videoshared.mjs";
import { videoFertigMail, videoFehlerMail } from "../../lib/videomail.mjs";

export const videosStore = () => getStore("videos");

export default async (req) => {
  if (req.headers.get("x-internal-key") !== process.env.INTERNAL_SECRET) {
    return new Response("Kein Zugriff.", { status: 403 });
  }

  let order;
  try {
    const { orderId } = await req.json();
    order = await getVideoOrder(orderId);
    if (!order) return json({ error: "Bestellung nicht gefunden." }, 404);

    const paket = getPaket(order.paketId);
    if (!paket || !paket.automatisch)
      return json({ error: "Dieses Paket wird nicht automatisch erzeugt." }, 400);
    if (!order.briefing)
      return json({ error: "Es liegen noch keine Antworten vor." }, 400);

    // Doppelte Anstoesse abfangen. Netlify wiederholt Aufrufe im Fehlerfall,
    // und jedes erzeugte Video kostet Geld.
    if (order.status === "erzeugt" || order.status === "fertig")
      return json({ ok: true, hinweis: "war schon fertig" });

    order.status = "erzeugt";
    order.begonnenAm = new Date().toISOString();
    await saveVideoOrder(order);

    const prompt = videoPrompt(order.briefing, order.kategorieId);
    order.prompt = prompt;

    const video = await videoErzeugen(prompt);

    await videosStore().set(order.id, alsArrayBuffer(video), {
      metadata: { contentType: "video/mp4", erstelltAm: new Date().toISOString() },
    });

    order.status = "fertig";
    order.fertigAm = new Date().toISOString();
    order.groesse = video.length;
    await saveVideoOrder(order);

    await videoFertigMail(order, siteUrl());
    return json({ ok: true });
  } catch (err) {
    console.error("Videoerzeugung fehlgeschlagen:", err?.message || err);
    if (order) {
      order.status = "fehler";
      order.fehler = String(err?.message || err).slice(0, 500);
      await saveVideoOrder(order).catch(() => {});
      // Der Kunde soll nicht warten, bis er von selbst merkt, dass nichts kommt.
      await videoFehlerMail(order).catch(() => {});
    }
    return json({ error: "Videoerzeugung fehlgeschlagen." }, 500);
  }
};
