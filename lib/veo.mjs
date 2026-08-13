// Videoerzeugung ueber die Gemini-API (Veo 3.1).
//
// Veo liefert 8 Sekunden mit eigenem Ton. Der Aufruf laeuft asynchron: erst
// startet man einen Vorgang, dann fragt man ihn ab, bis er fertig ist. Das
// dauert meist ein bis drei Minuten - deshalb gehoert der ganze Ablauf in eine
// Background-Function und nicht in die Antwort auf einen Klick.
//
// Benoetigte Netlify-Variable: GEMINI_API_KEY (mit aktivierter Abrechnung,
// sonst lehnt Google die Videomodelle ab).

const BASIS = "https://generativelanguage.googleapis.com/v1beta";

// Fast reicht fuer ein Statusvideo voellig und kostet ein Viertel von Standard.
//
// 720p ist bewusst der Standard: Ein WhatsApp-Status wird auf einem Handy im
// Hochformat angesehen, dort ist zwischen 720p und 1080p nichts zu sehen -
// 1080p kostet aber 20 % mehr. Ueber VEO_MODELL und VEO_AUFLOESUNG laesst sich
// beides ohne Codeaenderung umstellen.
const MODELL = () => process.env.VEO_MODELL || "veo-3.1-fast-generate-preview";
const AUFLOESUNG = () => process.env.VEO_AUFLOESUNG || "720p";

// --- Prompt aus den vier Antworten bauen ----------------------------
//
// Die Antworten des Kunden sind bewusst grob (vier Punkte, drei davon zum
// Antippen). Was hier passiert, ist die eigentliche Arbeit: aus wenigen
// Stichworten eine Szene bauen, die Veo versteht. Reihenfolge und Wortwahl
// sind auf das Modell abgestimmt - Szene, Person, Kamera, Licht, Sprache,
// Stimmung.

const TON = {
  herzlich: {
    stimmung: "warm, personal and inviting",
    licht: "soft warm daylight, gentle golden tones",
    tempo: "calm, unhurried camera",
  },
  sachlich: {
    stimmung: "clear, calm and trustworthy",
    licht: "clean neutral daylight, no dramatic contrast",
    tempo: "steady, almost static camera",
  },
  humorvoll: {
    stimmung: "light-hearted, playful, with a wink",
    licht: "bright saturated colours, cheerful lighting",
    tempo: "lively camera with a small push-in",
  },
  hochwertig: {
    stimmung: "premium, refined and quiet",
    licht: "soft studio light with a subtle rim highlight",
    tempo: "slow deliberate camera movement",
  },
};

const BRANCHE = {
  handwerk: "a tidy workshop or a building site with tools and materials",
  gastro: "a warm restaurant, bakery or kitchen with fresh food in view",
  handel: "a bright, well-ordered shop interior with shelves and products",
  koerper: "a clean modern studio or practice room, bright and friendly",
  beratung: "a bright modern office with a desk, plants and daylight",
  immobilien: "a bright modern property interior or a car showroom",
  verein: "a friendly community setting, decorated for an occasion",
  sonstiges: "a bright, friendly and uncluttered everyday setting",
};

const ZIEL = {
  bekannt: "introducing who they are and what they do",
  angebot: "presenting a current offer",
  einladen: "inviting people to an event or appointment",
  auffallen: "catching attention in a crowded feed",
};

// Was in jedem Prompt steht, egal welche Kategorie: hochkant, 8 Sekunden,
// keine gemalte Schrift. Buchstaben malt jedes Videomodell fehlerhaft - Text
// kommt spaeter in WhatsApp dazu.
const GRUNDREGELN =
  "Vertical 9:16 format, filmed for a phone screen. " +
  "Absolutely no text, letters, numbers, subtitles, signs, watermarks or logos " +
  "anywhere in the frame. No on-screen captions.";

export function videoPrompt(briefing = {}, kategorieId = "sprecher") {
  const ton = TON[briefing.tonId] || TON.herzlich;
  const ort = BRANCHE[briefing.brancheId] || BRANCHE.sonstiges;
  const zweck = ZIEL[briefing.zielId] || ZIEL.bekannt;
  const satz = (briefing.botschaft || "").trim().replace(/"/g, "'");
  const extra = (briefing.zusatz || "").trim().replace(/"/g, "'");

  const teile = [];

  if (kategorieId === "sprecher") {
    teile.push(
      `A friendly, natural-looking person speaking directly into the camera, ${zweck}.`,
      `Setting: ${ort}, softly out of focus behind them.`,
      "Camera: fixed chest-height shot, very slight push-in, no panning.",
      `Lighting: ${ton.licht}.`,
      `The person speaks in German and says: "${satz}"`,
      `Mood: ${ton.stimmung}. The delivery is relaxed and believable, not like an advert.`
    );
  } else if (kategorieId === "produkt") {
    teile.push(
      `A high-end product shot, ${zweck}.`,
      `Subject: ${satz}`,
      `Setting: ${ort}, background quiet and free of distraction.`,
      `Camera: ${ton.tempo}, slowly circling the subject, ending on a close detail.`,
      `Lighting: ${ton.licht}.`,
      `Mood: ${ton.stimmung}. No hands and no people in frame.`
    );
  } else if (kategorieId === "anlass") {
    teile.push(
      `A festive, celebratory scene, ${zweck}.`,
      `Occasion: ${satz}`,
      `Setting: ${ort}, decorated for the occasion, small lights and gentle movement.`,
      `Camera: ${ton.tempo}, moving forward, rising slightly at the end.`,
      `Lighting: ${ton.licht}, warm sparkling highlights in the background.`,
      `Mood: ${ton.stimmung}, welcoming and full of anticipation.`
    );
  } else {
    teile.push(
      "A strongly caricatured human character in the look of a modern 3D animated film, " +
        "with a very expressive face. Not an animal, not a creature.",
      `The character is ${zweck}. What it is about: ${satz}`,
      `Setting: ${ort}, with playful thematic props.`,
      `Camera: ${ton.tempo}, slight low angle, full body in frame.`,
      `Lighting: ${ton.licht}, rich saturated colours.`,
      `Mood: ${ton.stimmung}. The character looks triumphantly into the camera at the end.`
    );
  }

  if (extra) teile.push(`Additional wishes from the customer: ${extra}`);
  teile.push(GRUNDREGELN);

  return teile.join(" ");
}

// --- Aufruf der API -------------------------------------------------

async function starten(prompt) {
  const res = await fetch(`${BASIS}/models/${MODELL()}:predictLongRunning`, {
    method: "POST",
    headers: {
      "x-goog-api-key": process.env.GEMINI_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      instances: [{ prompt }],
      parameters: {
        aspectRatio: "9:16",
        resolution: AUFLOESUNG(),
        negativePrompt:
          "text, letters, numbers, subtitles, captions, watermark, logo, " +
          "distorted faces, extra fingers, blurry, low quality",
      },
    }),
  });
  if (!res.ok) throw new Error(`Veo-Start ${res.status}: ${await res.text()}`);
  const daten = await res.json();
  if (!daten.name) throw new Error("Veo hat keinen Vorgang zurueckgegeben.");
  return daten.name;
}

const warte = ms => new Promise(r => setTimeout(r, ms));

// Fragt den Vorgang ab, bis er fertig ist. Die Obergrenze liegt bewusst unter
// den 15 Minuten der Background-Function, damit am Ende noch Zeit bleibt, das
// Video abzulegen und die Mail zu verschicken.
async function abwarten(vorgang, maxMs = 9 * 60 * 1000) {
  const bis = Date.now() + maxMs;
  while (Date.now() < bis) {
    await warte(10000);
    const res = await fetch(`${BASIS}/${vorgang}`, {
      headers: { "x-goog-api-key": process.env.GEMINI_API_KEY },
    });
    if (!res.ok) throw new Error(`Veo-Abfrage ${res.status}: ${await res.text()}`);
    const daten = await res.json();
    if (!daten.done) continue;
    if (daten.error) throw new Error(`Veo: ${daten.error.message || "unbekannter Fehler"}`);
    const uri = daten?.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
    if (!uri) throw new Error("Veo war fertig, hat aber kein Video geliefert.");
    return uri;
  }
  throw new Error("Veo hat zu lange gebraucht.");
}

async function herunterladen(uri) {
  const res = await fetch(uri, {
    headers: { "x-goog-api-key": process.env.GEMINI_API_KEY },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`Video-Download ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * Erzeugt ein Video und gibt es als Buffer zurueck.
 *
 * @param {string} prompt  Ergebnis von videoPrompt()
 * @returns {Promise<Buffer>} fertige MP4-Datei
 */
export async function videoErzeugen(prompt) {
  if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY fehlt.");
  const vorgang = await starten(prompt);
  const uri = await abwarten(vorgang);
  return herunterladen(uri);
}
