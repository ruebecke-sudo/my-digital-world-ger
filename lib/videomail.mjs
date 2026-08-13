// Die Mails rund um eine Videobestellung.
//
// Wichtig bei allen: Wer den Browser-Tab schliesst, hat sonst keinen Weg
// zurueck - der Link mit Token steht nirgends sonst. Diese Mails sind also
// nicht nur Hoeflichkeit, sondern die Absicherung der Bestellung.
import { getPaket } from "./videopakete.mjs";
import { huelle, knopf, mailSenden, betreiberAdresse } from "./videomailer.mjs";

const siteUrl = () => process.env.URL || "http://localhost:8888";

const bestellLink = order =>
  `${siteUrl()}/kurzvideos/danke?order=${order.id}&token=${order.token}`;

// --- direkt nach der Zahlung ----------------------------------------
export async function videoZahlungBestaetigen(order) {
  if (!order || !order.email) return { ok: false, grund: "keine-adresse" };

  const paket = getPaket(order.paketId);
  const link = bestellLink(order);

  const nachsatz = paket && paket.automatisch
    ? "Danach entsteht dein Video automatisch - das dauert nur ein paar Minuten."
    : "Danach machen wir uns an die Arbeit.";

  return mailSenden({
    an: order.email,
    antwortAn: betreiberAdresse(),
    betreff: "Zahlung erhalten – noch vier kurze Fragen",
    html: huelle({
      titel: "Danke für deine Bestellung",
      vorspann: paket ? `${paket.label} · Zahlung bestätigt` : "Zahlung bestätigt",
      inhalt:
        `<p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:#475467;">
           Es fehlt nur noch ein Schritt: vier kurze Fragen, damit klar ist, worum
           es gehen soll. Drei davon tippst du nur an, das dauert keine Minute.
           ${nachsatz}
         </p>
         ${knopf("Jetzt die vier Fragen beantworten", link)}
         <p style="margin:20px 0 0;font-size:13px;line-height:1.6;color:#98a2b3;">
           Heb dir diesen Link auf - über ihn kommst du jederzeit zu deiner
           Bestellung zurück.
         </p>`,
    }),
  });
}

// --- Video ist fertig (nur beim automatischen Paket) -----------------
export async function videoFertigMail(order) {
  if (!order || !order.email) return { ok: false, grund: "keine-adresse" };
  const link = bestellLink(order);

  return mailSenden({
    an: order.email,
    antwortAn: betreiberAdresse(),
    betreff: "Dein Kurzvideo ist fertig",
    html: huelle({
      titel: "Dein Video ist da",
      vorspann:
        "Es ist fertig und wartet auf dich - ansehen und herunterladen kannst du " +
        "es über diesen Link.",
      inhalt:
        knopf("Video ansehen und herunterladen", link) +
        `<p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#475467;">
           <b style="color:#101828;">So kommt es in deinen Status:</b> Video
           herunterladen, in WhatsApp auf <i>Status</i> gehen, das Kamerasymbol
           antippen, das Video aus der Galerie wählen, kurzen Text dazu - fertig.
         </p>
         <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#98a2b3;">
           Der Link bleibt gültig, du kommst also jederzeit wieder an dein Video.
           Falls es nicht so geworden ist, wie du es dir vorgestellt hast:
           antworte einfach auf diese Mail.
         </p>`,
    }),
  });
}

// --- wenn die Erzeugung schiefgeht -----------------------------------
//
// Der Kunde hat bezahlt. Er darf nicht vor einer Seite sitzen, die sich ewig
// dreht, ohne zu wissen, was los ist.
export async function videoFehlerMail(order) {
  if (!order || !order.email) return { ok: false, grund: "keine-adresse" };

  const anUns = mailSenden({
    an: betreiberAdresse(),
    antwortAn: order.email,
    betreff: `ACHTUNG: Videoerzeugung fehlgeschlagen (${order.id.slice(0, 8)})`,
    html: huelle({
      titel: "Eine Videoerzeugung ist gescheitert",
      vorspann: `Kunde: ${order.email} · Bestellung ${order.id.slice(0, 8)}`,
      inhalt: `<p style="margin:0;font-size:14px;line-height:1.6;color:#475467;">
                 Fehler: ${String(order.fehler || "unbekannt")}
               </p>
               <p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#475467;">
                 Der Kunde wurde bereits benachrichtigt. Bitte das Video von Hand
                 erstellen oder das Geld erstatten.
               </p>`,
      fussnote: "Diese Mail geht nur an dich.",
    }),
  });

  const anKunde = mailSenden({
    an: order.email,
    antwortAn: betreiberAdresse(),
    betreff: "Kleine Verzögerung bei deinem Video",
    html: huelle({
      titel: "Da ist etwas dazwischengekommen",
      vorspann:
        "Die automatische Erzeugung deines Videos hat nicht geklappt. Das ist " +
        "ärgerlich, aber kein Grund zur Sorge: Wir haben eine Meldung bekommen " +
        "und machen dein Video von Hand.",
      inhalt: `<p style="margin:0;font-size:15px;line-height:1.6;color:#475467;">
                 Du hörst innerhalb eines Werktags von uns. Wenn dir das zu lange
                 dauert, antworte auf diese Mail - dann erstatten wir dir den
                 Betrag ohne Rückfrage zurück.
               </p>`,
    }),
  });

  const [a, b] = await Promise.all([anUns, anKunde]);
  return { ok: a.ok && b.ok };
}
