// POST /api/video-briefing - die Kurzabfrage nach der Zahlung
//
// Vier Punkte: Ziel, Botschaft, Ton, Branche. Beide Pakete durchlaufen sie.
//
// Danach trennen sich die Wege:
//   automatisches Paket - die Background-Function erzeugt das Video sofort.
//   betreutes Paket     - die Antworten gehen per Mail an den Betreiber, der
//                         das Video von Hand macht.
// In beiden Faellen bekommt der Kunde eine Zusammenfassung.
import { getPaket, getKategorie } from "../../lib/videopakete.mjs";
import { label, frageText } from "../../lib/kurzabfrage.mjs";
import { json, ladeMitToken, saveVideoOrder, siteUrl } from "../../lib/videoshared.mjs";
import { mailSenden, betreiberAdresse, huelle, zeile, tabelle, knopf, esc } from "../../lib/videomailer.mjs";

export default async (req) => {
  if (req.method === "OPTIONS") return json({});
  if (req.method !== "POST") return json({ error: "Nur POST." }, 405);

  try {
    const body = await req.json();
    const order = await ladeMitToken(body.id, body.token);
    if (!order) return json({ error: "Bestellung nicht gefunden." }, 404);

    const paket = getPaket(order.paketId);
    if (!paket || !paket.abfrage)
      return json({ error: "Für dieses Paket gibt es keine Abfrage." }, 400);

    // Vor der Zahlung nimmt der Server nichts an. Sonst koennte jemand mit einem
    // abgebrochenen Kauf Arbeit ausloesen - beim automatischen Paket waere das
    // bares Geld.
    if (order.status === "pending")
      return json({ error: "Die Zahlung ist noch nicht bestätigt. Bitte einen Moment warten." }, 409);

    // Nur einmal. Sonst liesse sich durch mehrfaches Absenden beliebig oft ein
    // Video auf Kosten des Betreibers erzeugen.
    if (order.briefing)
      return json({ error: "Deine Angaben liegen uns schon vor." }, 409);

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
    order.status = paket.automatisch ? "wartet" : "briefing";
    await saveVideoOrder(order);

    // --- Automatisches Paket: Erzeugung anstossen ----------------
    // Die Background-Function antwortet sofort mit 202 und laeuft dann bis zu
    // 15 Minuten weiter. Der Kunde sieht auf der Seite so lange den Fortschritt.
    if (paket.automatisch) {
      await fetch(`${siteUrl()}/.netlify/functions/video-erzeugen-background`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-key": process.env.INTERNAL_SECRET,
        },
        body: JSON.stringify({ orderId: order.id }),
      }).catch(err => console.error("Anstoss fehlgeschlagen:", err?.message || err));

      return json({ ok: true, automatisch: true });
    }

    // --- Betreutes Paket: Mails an beide -------------------------
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
      betreff: "Deine Angaben sind angekommen",
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
      }),
    });

    const [b, k] = await Promise.all([anBetreiber, anKunde]);

    return json({ ok: true, automatisch: false, mailAnKunde: k.ok, mailAnUns: b.ok });
  } catch (err) {
    console.error("Briefing-Fehler:", err.message);
    return json({ error: "Deine Angaben konnten nicht gespeichert werden." }, 500);
  }
};
