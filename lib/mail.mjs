// Mailversand ueber Resend.
//
// Bewusst ohne zusaetzliches Paket: Resend hat eine schlichte HTTP-Schnittstelle,
// ein fetch genuegt. Damit bleibt das Function-Bundle klein und es kommt keine
// weitere Abhaengigkeit ins Projekt.
//
// Benoetigte Netlify-Variablen:
//   RESEND_API_KEY  - der Schluessel aus resend.com
//   MAIL_VON        - Absender, z. B. "my-digital-world <info@my-digital-world.de>"
//   MAIL_AN         - wohin die Betreiber-Mail geht
//
// Fehlt der Schluessel, wird nicht geworfen: Eine Bestellung darf nicht daran
// scheitern, dass eine Mail nicht rausgeht. Das Briefing liegt in jedem Fall im
// Blob-Store und steht auf der Uebersichtsseite.

const ABSENDER = () => process.env.MAIL_VON || "my-digital-world <info@my-digital-world.de>";
const BETREIBER = () => process.env.MAIL_AN || "info@my-digital-world.de";

export const esc = s => String(s ?? "").replace(/[<>&"]/g, c =>
  ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

export async function mailSenden({ an, betreff, html, antwortAn }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY fehlt - Mail an", an, "wurde nicht verschickt.");
    return { ok: false, grund: "kein-key" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ABSENDER(),
        to: Array.isArray(an) ? an : [an],
        subject: betreff,
        html,
        ...(antwortAn ? { reply_to: antwortAn } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend hat abgelehnt:", res.status, await res.text());
      return { ok: false, grund: "abgelehnt" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Mailversand fehlgeschlagen:", err?.message || err);
    return { ok: false, grund: "netzwerk" };
  }
}

export const betreiberAdresse = BETREIBER;

// --- Grundgeruest -------------------------------------------------
//
// Helles Layout mit Tabellen statt Flexbox: Outlook und einige Android-Clients
// beherrschen modernes CSS nicht, und ein zerfallenes Layout in der Bestaetigung
// wirkt unserioeser als ein schlichtes.

export function huelle({ titel, vorspann, inhalt, fussnote }) {
  return `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titel)}</title></head>
<body style="margin:0;padding:24px 12px;background:#f4f6fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 1px 3px rgba(16,24,40,.08);">
  <tr><td style="background:#060b18;padding:20px 28px;">
    <span style="font-size:17px;font-weight:700;color:#ffffff;letter-spacing:-.2px;">my-digital-</span><span style="font-size:17px;font-weight:700;color:#22d3ee;letter-spacing:-.2px;">world</span>
  </td></tr>
  <tr><td style="padding:28px;">
    <h1 style="margin:0 0 12px;font-size:20px;line-height:1.3;color:#101828;font-weight:700;">${esc(titel)}</h1>
    ${vorspann ? `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475467;">${vorspann}</p>` : ""}
    ${inhalt}
  </td></tr>
  <tr><td style="padding:18px 28px;background:#f9fafb;border-top:1px solid #eaecf0;">
    <p style="margin:0;font-size:12px;line-height:1.6;color:#98a2b3;">
      ${fussnote || "my-digital-world &middot; info@my-digital-world.de &middot; WhatsApp 0159 06146147"}
    </p>
  </td></tr>
</table>
</body></html>`;
}

// Eine Zeile "Frage / Antwort" im Mailtext.
export function zeile(frage, antwort) {
  if (!antwort) return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #eaecf0;vertical-align:top;width:38%;">
      <span style="font-size:13px;color:#667085;">${esc(frage)}</span>
    </td>
    <td style="padding:10px 0 10px 14px;border-bottom:1px solid #eaecf0;vertical-align:top;">
      <span style="font-size:15px;color:#101828;line-height:1.5;">${esc(antwort)}</span>
    </td>
  </tr>`;
}

export function tabelle(zeilen) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eaecf0;">${zeilen}</table>`;
}

export function knopf(text, url) {
  return `<p style="margin:24px 0 0;">
    <a href="${esc(url)}" style="display:inline-block;background:#060b18;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 22px;border-radius:10px;">${esc(text)}</a>
  </p>`;
}
