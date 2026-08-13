// GET /api/video-bestellungen?key=… - Uebersicht fuer den Betreiber
//
// Zeigt alle bezahlten Videobestellungen samt Briefing als schlichte HTML-Seite.
// Geschuetzt durch INTERNAL_SECRET, dieselbe Variable, die schon der Webhook
// benutzt - es kommt also keine neue Zugangsdatei dazu.
import { getPaket } from "../../lib/videopakete.mjs";
import { videoOrdersStore, preis } from "../../lib/videoshared.mjs";

const esc = s => String(s ?? "").replace(/[<>&"]/g, c =>
  ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

const datum = iso => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("de-DE", { dateStyle: "medium", timeStyle: "short" });
};

export default async (req) => {
  const url = new URL(req.url);
  const geheim = process.env.INTERNAL_SECRET;
  if (!geheim || url.searchParams.get("key") !== geheim) {
    return new Response("Kein Zugriff.", { status: 403 });
  }

  const store = videoOrdersStore();
  const { blobs } = await store.list();

  const bestellungen = [];
  for (const b of blobs) {
    const o = await store.get(b.key, { type: "json" }).catch(() => null);
    if (o && o.art === "video" && o.status !== "pending") bestellungen.push(o);
  }
  bestellungen.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));

  const zeilen = bestellungen.map(o => {
    const paket = getPaket(o.paketId);
    const br = o.briefing;
    const felder = br ? [
      ["Ziel", br.ziel],
      ["Botschaft", br.botschaft],
      ["Ton", br.ton],
      ["Branche", br.branche],
      ["Art", br.kategorieLabel],
      ["Anmerkung", br.zusatz],
    ].filter(([, w]) => w).map(([k, w]) =>
      `<div><b>${esc(k)}:</b> ${esc(w)}</div>`).join("") : "<i>noch kein Briefing</i>";

    return `<article${o.test ? ' class="test"' : ""}>
      <h2>${esc(paket ? paket.label : o.paketId)} · ${esc(paket ? preis(paket.cents) : "")}${o.test ? " <span class=\"marke\">TEST</span>" : ""}</h2>
      <div class="meta">${esc(o.email)} · ${esc(datum(o.paidAt || o.createdAt))} · Status: ${esc(o.status)}</div>
      ${o.notiz ? `<div class="notiz"><b>Notiz beim Kauf:</b> ${esc(o.notiz)}</div>` : ""}
      <div class="briefing">${felder}</div>
    </article>`;
  }).join("");

  const html = `<!doctype html><meta charset="utf-8">
<title>Videobestellungen</title>
<style>
  body{font:16px/1.5 system-ui,sans-serif;background:#060b18;color:#e7ecf5;margin:0;padding:24px}
  h1{font-size:22px;margin:0 0 20px}
  article{background:#0e1729;border:1px solid #1e2b45;border-radius:12px;padding:16px;margin-bottom:14px}
  h2{font-size:17px;margin:0 0 4px;color:#5eead4}
  .meta{font-size:14px;color:#93a3bd;margin-bottom:10px}
  .notiz{margin-bottom:10px;color:#cbd5e1}
  .briefing div{margin-bottom:4px}
  b{color:#93a3bd;font-weight:600}
  article.test{border-color:#3a3320;background:#141108}
  .marke{font-size:11px;background:#854f0b;color:#fde7c0;padding:2px 7px;border-radius:99px;vertical-align:middle}
</style>
<h1>Videobestellungen (${bestellungen.length})</h1>
${zeilen || "<p>Noch nichts da.</p>"}`;

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
