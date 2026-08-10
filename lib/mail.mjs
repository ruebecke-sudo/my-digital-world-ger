// Mailversand ueber Resend.
//
// Warum ueberhaupt eine Mail: Bisher haengt der Zugang zum Poster an einer
// einzigen Adresse mit Bestellnummer und Token. Schliesst der Kunde den Tab,
// ist sein Poster fuer ihn weg - obwohl es bei uns liegt. Stripe gibt uns beim
// Kauf seine Mailadresse; die schreibt der Webhook bereits in die Bestellung.
//
// Ohne RESEND_API_KEY passiert hier nichts. Die Bestellung laeuft dann genau
// wie vorher weiter - eine fehlende Mail darf niemals einen bezahlten Kauf
// scheitern lassen.

const ABSENDER = process.env.MAIL_ABSENDER || "MDW Poster <poster@my-digital-world.de>";

function huelle(inhalt) {
  return `<!doctype html><html lang="de"><body style="margin:0;padding:24px;`
    + `background:#0f1420;font-family:Helvetica,Arial,sans-serif;color:#e8ecf5">`
    + `<div style="max-width:520px;margin:0 auto;background:#161d2e;border-radius:16px;`
    + `padding:28px">${inhalt}</div></body></html>`;
}

/**
 * Schickt dem Kunden sein fertiges Poster.
 *
 * @param {object} order      Bestellung aus dem Blob-Store
 * @param {object} format     Eintrag aus formats.mjs
 * @param {string} seite      Adresse der Seite (siteUrl())
 * @param {number} monate     Wie lange das Poster abrufbar bleibt
 * @returns {Promise<string>} Kurzer Bericht fuers Protokoll
 */
export async function posterMailSenden(order, format, seite, monate = 12) {
  if (!process.env.RESEND_API_KEY) return "kein Schluessel hinterlegt";
  if (!order?.customerEmail) return "keine Mailadresse zur Bestellung";

  const danke = `${seite}/empfehlung/poster/danke`
    + `?order=${order.id}&token=${order.downloadToken}`;
  const laden = `${seite}/.netlify/functions/download`
    + `?id=${order.id}&token=${order.downloadToken}`;
  const anrede = (order.name || "").trim();

  const inhalt = `
    <h1 style="margin:0 0 16px;font-size:22px;color:#ffffff">
      ${anrede ? `Hallo ${anrede}, dein` : "Dein"} Poster ist fertig
    </h1>
    <p style="margin:0 0 20px;line-height:1.6;color:#b9c3d6">
      Vielen Dank für deine Bestellung. Dein Poster steht in
      ${format?.label || "voller Größe"} zum Herunterladen bereit.
    </p>
    <p style="margin:0 0 24px">
      <a href="${laden}" style="display:inline-block;background:#22d3ee;color:#04121a;
        text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:12px">
        Poster herunterladen
      </a>
    </p>
    <p style="margin:0 0 20px;line-height:1.6;color:#b9c3d6">
      Über diese Adresse kommst du jederzeit wieder an dein Poster:<br>
      <a href="${danke}" style="color:#22d3ee">${danke}</a>
    </p>
    <p style="margin:0;line-height:1.6;color:#7f8ba3;font-size:13px">
      Bewahre diese Mail auf – sie ist dein Zugang. Wir halten dein Poster
      ${monate} Monate für dich bereit, danach löschen wir es.
      <br>Bestellnummer: ${order.id}
    </p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: ABSENDER,
      to: [order.customerEmail],
      subject: "Dein MDW-Poster ist fertig",
      html: huelle(inhalt),
    }),
  });

  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return "verschickt";
}
