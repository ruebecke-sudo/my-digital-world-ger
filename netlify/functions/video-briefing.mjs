// POST /api/video-briefing - die Kurzabfrage nach der Zahlung
//
// Vier Punkte: Ziel, Botschaft, Ton, Branche. Danach geht je eine Mail an den
// Betreiber und an den Kunden - beide sehen dasselbe, nur anders eingekleidet.
import { getPaket, getKategorie } from "../../lib/videopakete.mjs";
import { label, frageText } from "../../lib/kurzabfrage.mjs";
import { json, ladeMitToken, saveVideoOrder, siteUrl } from "../../lib/videoshared.mjs";
import { mailSenden, betreiberAdresse, huelle, zeile, tabelle, knopf, esc } from "../../lib/mail.mjs";

export default async (req) => {
  if (req.method === "OPTIONS") return json({});
  if (req.method !== "POST") return json({ error: "Nur POST." }, 405);

  try {
    const body = await req.json();
    const order = await ladeMitToken(body.id, body.token);
    if (!order) return json({ error: "Bestellung nicht gefunden." }, 404);

    const paket = getPaket(order.paketId);
    if (!paket || !paket.briefing)
      return json({ error: "Für dieses Paket gibt es keine Abfrage." }, 400);

    // Vor der Zahlung nimmt der Server nichts an. Sonst koennte jemand mit einem
    // abgebrochenen Kauf Arbeit ausloesen.
    if (order.status === "pending")
      return json({ error: "Die Zahlung ist noch nicht bestätigt. Bitte einen Moment warten." }, 409);

    const botschaft = String(body.botschaft || "").trim().slice(0, 400);
    const zusatz = String(body.zusatz || "").trim().slice(0, 500);

    const ziel = label("ziel", body.ziel);
    const ton = label("ton", body.ton);
    const branche = label("branche", body.branche);

    if (!ziel) return json({ error: "Bitte auswählen, was das Video bewirken soll." }, 400);
    if (botschaft.length < 5) return json({ error: "Bitte deine Botschaft in einem Satz eingeben." }, 400);
    if (!ton) return json({ error: "Bitte einen Ton auswählen." }, 400);
    if (!branche) return json({ error: "Bitte eine Branche auswählen." }, 400);

    const kategorie = getKategorie(order.kategorieId);

    order.briefing = {
      zielId: body.ziel, ziel,
      botschaft,
      tonId: body.ton, ton,
      brancheId: body.branche, branche,
      zusatz,
      kategorieLabel: kategorie ? kategorie.label : "",
      abgegebenAm: new Date().toISOString(),
    };
    order.status = "briefing";
    await saveVideoOrder(order);

    // --- Mails ---------------------------------------------------
    // Der Versand darf die Antwort nicht aufhalten und erst recht nicht
    // scheitern lassen: Das Briefing ist gespeichert, alles Weitere ist Komfort.
    const zeilen = tabelle(
      zeile(frageText("ziel"), ziel) +
      zeile(frageText("botschaft"), botschaft) +
      zeile(frageText("ton"), ton) +
      zeile(frageText("branche"), branche) +
      (kategorie ? zeile("Art des Videos", kategorie.label) : "") +
      (zusatz ? zeile("Anmerkung", zusatz) : "")
    );

    const kurzId = order.id.slice(0, 8);

    const anBetreiber = mailSenden({
      an: betreiberAdresse(),
      antwortAn: order.email,
      betreff: `Neues Videobriefing – ${ziel} (${kurzId})`,
      html: huelle({
        titel: "Neues Videobriefing",
        vorspann: `Von <b>${esc(order.email)}</b> · ${esc(paket.label)} · Bestellung ${esc(kurzId)}`,
        inhalt: zeilen + knopf("Alle Bestellungen ansehen",
          `${siteUrl()}/.netlify/functions/video-bestellungen?key=${encodeURIComponent(process.env.INTERNAL_SECRET || "")}`),
        fussnote: "Diese Mail geht nur an dich. Eine Antwort landet direkt beim Kunden.",
      }),
    });

    const anKunde = mailSenden({
      an: order.email,
      antwortAn: betreiberAdresse(),
      betreff: "Dein Videobriefing ist angekommen",
      html: huelle({
        titel: "Danke – wir haben alles",
        vorspann:
          "Hier ist noch einmal, was du uns mitgegeben hast. Wenn etwas nicht stimmt " +
          "oder dir noch etwas einfällt, antworte einfach auf diese Mail.",
        inhalt: zeilen +
          `<p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#475467;">
            Dein Video ist in der Regel innerhalb von 2–3 Werktagen fertig und kommt an
            diese Adresse. Eine Korrekturschleife ist enthalten.
          </p>`,
        fussnote: "my-digital-world &middot; info@my-digital-world.de &middot; WhatsApp 0159 06146147",
      }),
    });

    const [b, k] = await Promise.all([anBetreiber, anKunde]);

    return json({ ok: true, mailAnKunde: k.ok, mailAnUns: b.ok });
  } catch (err) {
    console.error("Briefing-Fehler:", err.message);
    return json({ error: "Das Briefing konnte nicht gespeichert werden." }, 500);
  }
};
