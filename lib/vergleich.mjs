// Vergleichslauf: derselbe Prompt durch mehrere Videomodelle.
//
// Der Sinn ist nicht, das billigste Modell zu finden - die Preisunterschiede
// liegen bei Cent. Der Sinn ist zu sehen, ob ein guenstigeres Modell fuer ein
// Acht-Sekunden-Statusvideo ueberhaupt schlechter ist. Diese Frage laesst sich
// nur beantworten, indem man dieselbe Aufgabe nebeneinander legt.
//
// Veo laeuft ueber die Gemini-API (schon eingerichtet), die uebrigen ueber
// Replicate - der Token dafuer liegt bereits im Projekt.

import { videoErzeugen } from "./veo.mjs";

const REPLICATE = "https://api.replicate.com/v1";
const authHeader = () => ({ Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` });

async function replicateLauf(modell, input, maxSekunden = 480) {
  const start = await fetch(`${REPLICATE}/models/${modell}/predictions`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });
  if (!start.ok) throw new Error(`${modell} -> ${start.status}: ${(await start.text()).slice(0, 200)}`);

  let p = await start.json();
  const ende = Date.now() + maxSekunden * 1000;
  while (Date.now() < ende) {
    if (p.status === "succeeded") break;
    if (p.status === "failed" || p.status === "canceled")
      throw new Error(`${modell}: ${p.error || p.status}`);
    await new Promise(r => setTimeout(r, 4000));
    const res = await fetch(`${REPLICATE}/predictions/${p.id}`, { headers: authHeader() });
    if (!res.ok) throw new Error(`${modell}: Statusabfrage ${res.status}`);
    p = await res.json();
  }
  if (p.status !== "succeeded") throw new Error(`${modell}: Zeitüberschreitung`);

  const url = Array.isArray(p.output) ? p.output[0] : p.output;
  if (!url) throw new Error(`${modell}: kein Video geliefert`);
  const datei = await fetch(url);
  if (!datei.ok) throw new Error(`${modell}: Video nicht abrufbar (${datei.status})`);
  return Buffer.from(await datei.arrayBuffer());
}

// Die Anbieter. Preis in Cent je erzeugtem Video (8 Sekunden), damit die
// Vergleichsseite ihn ohne Umrechnung anzeigen kann.
export const ANBIETER = {
  veo: {
    id: "veo",
    name: "Google Veo 3.1 Fast",
    hinweis: "Das Modell, das gerade im Einsatz ist",
    centJeVideo: 69,
    ton: true,
    erzeugen: prompt => videoErzeugen(prompt),
  },
  wan: {
    id: "wan",
    name: "Alibaba Wan 2.5",
    hinweis: "Offenes Modell, halber Preis, mit Ton",
    centJeVideo: 35,
    ton: true,
    erzeugen: prompt =>
      replicateLauf("wan-video/wan-2.5-t2v", {
        prompt,
        size: "720*1280",
        duration: 10,
        audio: true,
      }),
  },
  grok: {
    id: "grok",
    name: "xAI Grok Imagine",
    hinweis: "Schnell, halber Preis, mit Ton",
    centJeVideo: 35,
    ton: true,
    erzeugen: prompt =>
      replicateLauf("xai/grok-imagine-video", {
        prompt,
        resolution: "720p",
        aspect_ratio: "9:16",
      }),
  },
};

export const ANBIETER_LISTE = Object.values(ANBIETER);

// Ein Lauf ueber alle drei. Faellt einer aus, laufen die anderen weiter -
// ein Vergleich mit zwei Ergebnissen ist immer noch ein Vergleich.
export async function vergleichLaufen(prompt, ablegen) {
  const ergebnisse = [];
  for (const a of ANBIETER_LISTE) {
    const begonnen = Date.now();
    try {
      const video = await a.erzeugen(prompt);
      await ablegen(a.id, video);
      ergebnisse.push({
        id: a.id, name: a.name, ok: true,
        sekunden: Math.round((Date.now() - begonnen) / 1000),
        bytes: video.length,
      });
    } catch (err) {
      console.error(`Vergleich ${a.id} fehlgeschlagen:`, err?.message || err);
      ergebnisse.push({
        id: a.id, name: a.name, ok: false,
        sekunden: Math.round((Date.now() - begonnen) / 1000),
        fehler: String(err?.message || err).slice(0, 300),
      });
    }
  }
  return ergebnisse;
}
