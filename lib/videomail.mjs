// Die Mail direkt nach der Zahlung.
//
// Wichtig fuer beide Pakete: Wer den Browser-Tab schliesst, hat sonst keinen Weg
// zurueck - der Link mit Token steht nirgends sonst. Diese Mail ist also nicht
// nur Hoeflichkeit, sondern die Absicherung der Bestellung.
import { getPaket } from "./videopakete.mjs";
import { huelle, knopf, mailSenden, betreiberAdresse } from "./mail.mjs";

const siteUrl = () => process.env.URL || "http://localhost:8888";

export async function videoZahlungBestaetigen(order) {
  if (!order || !order.email) return { ok: false, grund: "keine-adresse" };

  const paket = getPaket(order.paketId);
  const link = `${siteUrl()}/kurzvideos/danke?order=${order.id}&token=${order.token}`;

  const brauchtBriefing = Boolean(paket && paket.briefing);

  const inhalt = brauchtBriefing
    ? `<p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:#475467;">
         Es fehlt nur noch ein Schritt: vier kurze Fragen, damit wir wissen, worum
         es gehen soll. Das dauert keine Minute.
       </p>
       ${knopf("Jetzt die vier Fragen beantworten", link)}
       <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#98a2b3;">
         Heb dir diesen Link auf - über ihn kommst du jederzeit zu deiner Bestellung
         zurück.
       </p>`
    : `<p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:#475467;">
         Dein Prompt-Paket ist freigeschaltet: vier fertige Prompts zum Kopieren,
         die Anleitung in vier Schritten und der Direktlink zu Google Gemini.
       </p>
       ${knopf("Prompt-Paket öffnen", link)}
       <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#98a2b3;">
         Speichere diesen Link als Lesezeichen - er bleibt gültig, du kommst also
         jederzeit an dein Paket zurück.
       </p>`;

  return mailSenden({
    an: order.email,
    antwortAn: betreiberAdresse(),
    betreff: brauchtBriefing
      ? "Zahlung erhalten – noch vier kurze Fragen"
      : "Dein Prompt-Paket für Kurzvideos",
    html: huelle({
      titel: brauchtBriefing ? "Danke für deine Bestellung" : "Dein Paket ist bereit",
      vorspann: paket ? `${paket.label} · Zahlung bestätigt` : "Zahlung bestätigt",
      inhalt,
    }),
  });
}
