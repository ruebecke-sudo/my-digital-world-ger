// Alle Videomodelle an einer Stelle.
//
// Sowohl der Vergleichslauf als auch die echte Bestellung greifen hierauf zu -
// so kann nicht passieren, dass im Vergleich etwas anderes laeuft als beim
// Kunden.
//
// Veo laeuft ueber die Gemini-API, alles Uebrige ueber Replicate. Beide
// Zugaenge sind im Projekt schon eingerichtet.

import { videoErzeugen as veoErzeugen, NEGATIV } from "./veo.mjs";

const REPLICATE = "https://api.replicate.com/v1";
const authHeader = () => ({ Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}` });

export async function replicateLauf(modell, input, maxSekunden = 540) {
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

// centJeVideo bezieht sich auf die jeweils uebliche Laenge des Modells und ist
// eine Schaetzung fuer die Anzeige - abgerechnet wird beim Anbieter nach
// Sekunden.
export const MODELLE = {
  veo: {
    id: "veo",
    name: "Google Veo 3.1 Fast",
    hinweis: "Acht Sekunden, eine Einstellung",
    sekunden: 8,
    centJeVideo: 69,
    ton: true,
    erzeugen: ({ prompt }) => veoErzeugen(prompt),
  },

  kling: {
    id: "kling",
    name: "Kling 3.0",
    hinweis: "Bis 15 Sekunden, mehrere Szenen am Stück",
    sekunden: 15,
    centJeVideo: 218,
    ton: true,
    // Der Mehrszenen-Modus ist der eigentliche Grund fuer dieses Modell:
    // multi_prompt beschreibt bis zu sechs Einstellungen, deren Dauern in der
    // Summe genau "duration" ergeben muessen - sonst lehnt Kling ab.
    erzeugen: ({ prompt, szenen, sekunden = 15 }) => {
      const eingabe = {
        prompt,
        mode: "standard",           // 720p; "pro" waere 1080p und deutlich teurer
        duration: sekunden,
        aspect_ratio: "9:16",
        generate_audio: true,
        negative_prompt: NEGATIV,
      };
      if (Array.isArray(szenen) && szenen.length > 1) {
        const summe = szenen.reduce((s, x) => s + x.duration, 0);
        if (summe === sekunden) eingabe.multi_prompt = JSON.stringify(szenen);
        else console.warn(`Szenendauern ergeben ${summe}s statt ${sekunden}s - eine Einstellung stattdessen.`);
      }
      return replicateLauf("kwaivgi/kling-v3-video", eingabe);
    },
  },

  wan: {
    id: "wan",
    name: "Alibaba Wan 2.5",
    hinweis: "Offenes Modell, halber Preis, mit Ton",
    sekunden: 10,
    centJeVideo: 35,
    ton: true,
    // "audio" ist hier KEIN Schalter, sondern die Adresse einer Tondatei zum
    // Nachvertonen. Wer dort true uebergibt, bekommt einen 422er. Wan erzeugt
    // den Ton ohnehin selbst aus dem Prompt.
    erzeugen: ({ prompt }) =>
      replicateLauf("wan-video/wan-2.5-t2v", {
        prompt,
        size: "720*1280",
        duration: 10,
        negative_prompt: NEGATIV,
      }),
  },

  grok: {
    id: "grok",
    name: "xAI Grok Imagine",
    hinweis: "Schnell und günstig, bis 15 Sekunden",
    sekunden: 8,
    centJeVideo: 35,
    ton: true,
    // Ohne duration nimmt Grok 5 Sekunden - zu kurz fuer einen gesprochenen Satz.
    erzeugen: ({ prompt, sekunden = 8 }) =>
      replicateLauf("xai/grok-imagine-video", {
        prompt,
        duration: sekunden,
        resolution: "720p",
        aspect_ratio: "9:16",
      }),
  },
};

export const MODELL_LISTE = Object.values(MODELLE);

export function getModell(id) {
  return MODELLE[id] || null;
}
