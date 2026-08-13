// POST /.netlify/functions/vergleich-background
//
// Erzeugt denselben Prompt mit allen Anbietern aus lib/vergleich.mjs und legt
// die Videos in Blobs ab. Background-Function, weil drei Modelle nacheinander
// gut zehn Minuten brauchen koennen.
//
// Geschuetzt durch INTERNAL_SECRET - jeder Lauf kostet Geld.
import { getStore } from "@netlify/blobs";
import { vergleichLaufen } from "../../lib/vergleich.mjs";
import { videoPrompt, szenenPlan } from "../../lib/veo.mjs";
import { alsArrayBuffer } from "../../lib/videoshared.mjs";

const store = () => getStore("vergleich");

export default async (req) => {
  if (req.headers.get("x-internal-key") !== process.env.INTERNAL_SECRET) {
    return new Response("Kein Zugriff.", { status: 403 });
  }

  const { briefing, kategorieId, nur } = await req.json();
  const prompt = videoPrompt(briefing, kategorieId);
  const szenen = szenenPlan(briefing, kategorieId, 15);

  const lauf = {
    begonnenAm: new Date().toISOString(),
    kategorieId,
    briefing,
    prompt,
    szenen,
    nur: nur || "",
    status: "laeuft",
    ergebnisse: [],
  };
  await store().setJSON("lauf", lauf);

  try {
    lauf.ergebnisse = await vergleichLaufen(prompt, async (id, video) => {
      await store().set(`video-${id}`, alsArrayBuffer(video), {
        metadata: { contentType: "video/mp4" },
      });
    }, nur, szenen);
    lauf.status = "fertig";
  } catch (err) {
    lauf.status = "fehler";
    lauf.fehler = String(err?.message || err).slice(0, 400);
  }
  lauf.beendetAm = new Date().toISOString();
  await store().setJSON("lauf", lauf);

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
