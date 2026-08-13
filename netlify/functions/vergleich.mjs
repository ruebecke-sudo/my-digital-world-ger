// GET /.netlify/functions/vergleich?key=… - Modellvergleich für den Betreiber
//
// Eine einzige Seite, die drei Dinge kann:
//   ?datei=veo   liefert das erzeugte Video aus
//   ?neu=1       startet einen neuen Lauf (kostet rund 1,40 €)
//   sonst        zeigt Prompt, Laufzeiten, Kosten und die Videos nebeneinander
//
// Bewusst als schlichte HTML-Seite und nicht als React-Route: Das hier ist ein
// Werkzeug für dich, kein Teil des Shops. Es soll niemand darüber stolpern.
import { getStore } from "@netlify/blobs";
import { ANBIETER, ANBIETER_LISTE } from "../../lib/vergleich.mjs";

const store = () => getStore("vergleich");
const siteUrl = () => process.env.URL || "http://localhost:8888";

const esc = s => String(s ?? "").replace(/[<>&"]/g, c =>
  ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c]));

const euro = cent => (cent / 100).toFixed(2).replace(".", ",") + " €";

// Standardaufgabe, wenn nichts anderes angegeben ist. Bewusst ein Sprecher-
// Video: Das ist der schwerste Fall, weil Gesicht, Lippen und Ton
// zusammenpassen muessen. Wer den schafft, schafft die anderen drei auch.
const STANDARD = {
  zielId: "angebot",
  tonId: "herzlich",
  brancheId: "gastro",
  botschaft: "Ab Montag gibt es bei uns frisches Brot auch am Sonntag.",
  zusatz: "",
};

export default async (req) => {
  const url = new URL(req.url);
  const geheim = process.env.INTERNAL_SECRET;
  if (!geheim || url.searchParams.get("key") !== geheim) {
    return new Response("Kein Zugriff.", { status: 403 });
  }

  // --- Video ausliefern ---
  const datei = url.searchParams.get("datei");
  if (datei) {
    const daten = await store().get(`video-${datei}`, { type: "arrayBuffer" });
    if (!daten) return new Response("Noch kein Video.", { status: 404 });
    return new Response(daten, {
      headers: { "Content-Type": "video/mp4", "Cache-Control": "private, max-age=600" },
    });
  }

  // --- Neuen Lauf anstossen ---
  if (url.searchParams.get("neu") === "1") {
    const kategorieId = url.searchParams.get("kategorie") || "sprecher";
    const briefing = { ...STANDARD };
    if (url.searchParams.get("botschaft")) briefing.botschaft = url.searchParams.get("botschaft");
    if (url.searchParams.get("ton")) briefing.tonId = url.searchParams.get("ton");
    if (url.searchParams.get("branche")) briefing.brancheId = url.searchParams.get("branche");

    await fetch(`${siteUrl()}/.netlify/functions/vergleich-background`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-internal-key": geheim },
      body: JSON.stringify({ briefing, kategorieId }),
    }).catch(err => console.error("Anstoss fehlgeschlagen:", err?.message));

    return new Response(null, {
      status: 302,
      headers: { Location: `${siteUrl()}/.netlify/functions/vergleich?key=${encodeURIComponent(geheim)}` },
    });
  }

  // --- Seite anzeigen ---
  const lauf = await store().get("lauf", { type: "json" });
  const laeuft = lauf && lauf.status === "laeuft";

  const kacheln = ANBIETER_LISTE.map(a => {
    const e = lauf?.ergebnisse?.find(x => x.id === a.id);
    const fertig = e && e.ok;
    return `<div class="kachel">
      <h3>${esc(a.name)}</h3>
      <p class="klein">${esc(a.hinweis)}</p>
      <p class="preis">${euro(a.centJeVideo)} <span class="klein">je Video</span></p>
      ${fertig
        ? `<video src="?key=${encodeURIComponent(geheim)}&amp;datei=${a.id}" controls playsinline preload="metadata"></video>
           <p class="klein">${e.sekunden} s Wartezeit · ${(e.bytes / 1048576).toFixed(1)} MB</p>`
        : e && !e.ok
          ? `<div class="leer fehler">Fehlgeschlagen<br><span class="klein">${esc(e.fehler)}</span></div>`
          : `<div class="leer">${laeuft ? "läuft…" : "noch kein Video"}</div>`}
    </div>`;
  }).join("");

  const kopf = lauf
    ? `<p class="klein">Lauf vom ${esc(new Date(lauf.begonnenAm).toLocaleString("de-DE"))} ·
        Status: <b>${esc(lauf.status)}</b> ·
        Kategorie: ${esc(lauf.kategorieId)}</p>
       ${lauf.fehler ? `<p class="klein" style="color:#f0a0a0">Abbruch: ${esc(lauf.fehler)}</p>` : ""}
       <details><summary>Verwendeter Prompt</summary><pre>${esc(lauf.prompt)}</pre></details>`
    : `<p class="klein">Noch kein Lauf vorhanden.</p>`;

  const gesamt = ANBIETER_LISTE.reduce((s, a) => s + a.centJeVideo, 0);

  const html = `<!doctype html><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Modellvergleich</title>
<style>
  body{font:16px/1.6 system-ui,sans-serif;background:#060b18;color:#e7ecf5;margin:0;padding:28px 20px;max-width:1100px;margin:0 auto}
  h1{font-size:23px;margin:0 0 6px}
  h3{font-size:16px;margin:0 0 2px;color:#5eead4}
  a.knopf{display:inline-block;background:#22d3ee;color:#04121a;text-decoration:none;font-weight:600;padding:11px 20px;border-radius:11px;margin:18px 0}
  .raster{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin-top:20px}
  .kachel{background:#0e1729;border:1px solid #1e2b45;border-radius:14px;padding:16px}
  .kachel video{width:100%;aspect-ratio:9/16;object-fit:cover;background:#000;border-radius:10px;margin-top:10px}
  .leer{aspect-ratio:9/16;display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;
        background:#0a1120;border:1px dashed #24324e;border-radius:10px;color:#6b7a94;margin-top:10px}
  .leer.fehler{color:#f0a0a0;border-color:#5a2a2a;display:block;padding-top:40%}
  .klein{font-size:13px;color:#93a3bd;margin:2px 0}
  .preis{font-size:18px;font-weight:600;margin:8px 0 0}
  pre{white-space:pre-wrap;background:#0a1120;border:1px solid #1e2b45;border-radius:10px;padding:14px;font-size:13px;color:#a9b7cd}
  details{margin-top:10px}summary{cursor:pointer;color:#93a3bd;font-size:14px}
  .hinweis{background:#141108;border:1px solid #3a3320;border-radius:12px;padding:14px;font-size:14px;color:#e6d3a8;margin-top:22px}
</style>
<h1>Welches Modell reicht?</h1>
<p class="klein">Derselbe Prompt, drei Anbieter, hochkant und mit Ton. Ansehen, vergleichen, entscheiden.</p>
${kopf}
<a class="knopf" href="?key=${encodeURIComponent(geheim)}&amp;neu=1">${lauf ? "Neuen Lauf starten" : "Vergleich starten"}</a>
<span class="klein">kostet etwa ${euro(gesamt)}</span>
${laeuft ? '<p class="klein">Es läuft gerade. Drei Modelle nacheinander dauern fünf bis zehn Minuten – Seite gelegentlich neu laden.</p>' : ""}
<div class="raster">${kacheln}</div>
<div class="hinweis">
  <b>Worauf du achten solltest:</b> Sitzt der gesprochene Satz und passen die Lippen dazu?
  Ist das Bild ruhig oder zappelt es? Steht versehentlich Schrift im Bild?
  Wirkt die Szene zur Branche passend?<br><br>
  Wenn ein günstigeres Modell in diesen vier Punkten mithält, kannst du umstellen –
  das spart rund 0,34 € pro Video. Wenn nicht, weißt du jetzt, warum es sich lohnt,
  bei Veo zu bleiben.
</div>
<p class="klein" style="margin-top:20px">
  Andere Aufgabe ausprobieren: <code>&amp;kategorie=produkt</code>,
  <code>&amp;ton=humorvoll</code>, <code>&amp;branche=handwerk</code> oder
  <code>&amp;botschaft=Dein+Satz</code> an den Startlink anhängen.
</p>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
