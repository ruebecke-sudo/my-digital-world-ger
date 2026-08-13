import { useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import {
  CheckCircle, Copy, Check, ExternalLink, Loader2, AlertCircle,
  Mail, MessageCircle, Lightbulb, ArrowLeft, ArrowRight, Pencil,
  Download, Film, ChevronDown,
} from 'lucide-react'

const FN = '/.netlify/functions'

type Status = {
  status: string
  paketId: string
  paketLabel: string
  automatisch: boolean
  kategorieLabel: string
  email: string
  abfrageAbgegeben: boolean
  videoFertig: boolean
}

type Option = { id: string; label: string; zusatz?: string }
type Punkt = {
  id: string
  frage: string
  hinweis: string
  optionen?: Option[]
  frei?: boolean
  platzhalter?: string
}
type Zusatz = { id: string; frage: string; hinweis: string; platzhalter: string }

type PromptPaket = {
  titel: string
  vorwort: string
  schritte: { nr: number; titel: string; text: string }[]
  prompts: { kategorie: string; zweck: string; text: string }[]
  tipps: string[]
}

// Fallback, falls die Function beim ersten Aufruf nicht antwortet. Verbindlich
// ist lib/kurzabfrage.mjs - dort prueft der Server auch die Antworten.
const PUNKTE_FALLBACK: Punkt[] = [
  {
    id: 'ziel',
    frage: 'Was soll das Video bewirken?',
    hinweis: 'Ein Video kann genau eine Sache gut. Such die aus, auf die es dir am meisten ankommt.',
    optionen: [
      { id: 'bekannt', label: 'Bekannt machen', zusatz: 'Wer bin ich, was mache ich' },
      { id: 'angebot', label: 'Angebot bewerben', zusatz: 'Aktion, Rabatt, Neuheit' },
      { id: 'einladen', label: 'Einladen', zusatz: 'Termin, Feier, Eröffnung' },
      { id: 'auffallen', label: 'Auffallen', zusatz: 'Unterhaltsam, zum Weiterleiten' },
    ],
  },
  {
    id: 'botschaft',
    frage: 'Deine Botschaft in einem Satz',
    hinweis: 'Genau dieser Satz wird der Kern des Videos. Schreib ihn so, wie du ihn jemandem am Telefon sagen würdest.',
    frei: true,
    platzhalter: 'z. B. Ab Montag gibt es bei uns frisches Brot auch am Sonntag.',
  },
  {
    id: 'ton',
    frage: 'In welchem Ton?',
    hinweis: 'Bestimmt Bildsprache, Musik und Sprechweise.',
    optionen: [
      { id: 'herzlich', label: 'Herzlich', zusatz: 'Nah, persönlich, warm' },
      { id: 'sachlich', label: 'Sachlich', zusatz: 'Klar, ruhig, seriös' },
      { id: 'humorvoll', label: 'Humorvoll', zusatz: 'Augenzwinkernd, überzeichnet' },
      { id: 'hochwertig', label: 'Hochwertig', zusatz: 'Edel, ruhig, wertig' },
    ],
  },
  {
    id: 'branche',
    frage: 'Aus welcher Ecke kommst du?',
    hinweis: 'Damit die Bildwelt passt - Werkstatt sieht anders aus als Praxis.',
    optionen: [
      { id: 'handwerk', label: 'Handwerk & Bau' },
      { id: 'gastro', label: 'Gastronomie & Lebensmittel' },
      { id: 'handel', label: 'Handel & Shop' },
      { id: 'koerper', label: 'Beauty, Fitness & Gesundheit' },
      { id: 'beratung', label: 'Beratung & Dienstleistung' },
      { id: 'immobilien', label: 'Immobilien & Auto' },
      { id: 'verein', label: 'Verein, Event & Privat' },
      { id: 'sonstiges', label: 'Etwas anderes' },
    ],
  },
]

const ZUSATZ_FALLBACK: Zusatz = {
  id: 'zusatz',
  frage: 'Noch etwas, das wir wissen sollten?',
  hinweis: 'Firmenname, Wunschtermin, ein Detail zur Szene - alles freiwillig.',
  platzhalter: 'Kann auch leer bleiben.',
}

function KopierKnopf({ text }: { text: string }) {
  const [kopiert, setKopiert] = useState(false)

  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Aeltere Browser und unsichere Verbindungen kennen die Zwischenablage
      // nicht. Dann wird der Text markiert, damit Strg+C weiterhin geht.
      const feld = document.createElement('textarea')
      feld.value = text
      document.body.appendChild(feld)
      feld.select()
      try { document.execCommand('copy') } catch { /* dann eben von Hand */ }
      document.body.removeChild(feld)
    }
    setKopiert(true)
    setTimeout(() => setKopiert(false), 2000)
  }

  return (
    <button
      onClick={kopieren}
      className="px-3 py-1.5 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors flex items-center gap-2 text-sm flex-shrink-0"
    >
      {kopiert ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Kopiert</> : <><Copy className="w-3.5 h-3.5" /> Kopieren</>}
    </button>
  )
}

export default function KurzvideoDanke() {
  const params = new URLSearchParams(window.location.search)
  const orderId = params.get('order')
  const token = params.get('token')

  const [daten, setDaten] = useState<Status | null>(null)
  const [fehler, setFehler] = useState('')
  const [paket, setPaket] = useState<PromptPaket | null>(null)
  const [geminiUrl, setGeminiUrl] = useState('https://gemini.google.com/')
  const [paketOffen, setPaketOffen] = useState(false)
  const timer = useRef<any>(null)

  // Kurzabfrage
  const [punkte, setPunkte] = useState<Punkt[]>(PUNKTE_FALLBACK)
  const [zusatzFrage, setZusatzFrage] = useState<Zusatz>(ZUSATZ_FALLBACK)
  const [schritt, setSchritt] = useState(0)
  const [antworten, setAntworten] = useState<Record<string, string>>({})
  const [zusatz, setZusatz] = useState('')
  const [sendet, setSendet] = useState(false)
  const [gesendet, setGesendet] = useState(false)
  const [formFehler, setFormFehler] = useState('')
  const [fortschritt, setFortschritt] = useState(6)

  // Status abfragen, bis nichts mehr passiert. Das deckt drei Wartezeiten ab:
  // die Zahlungsbestaetigung von Stripe, die Videoerzeugung und den Fall, dass
  // der Kunde die Seite spaeter noch einmal aufruft.
  useEffect(() => {
    if (!orderId || !token) { setFehler('Der Link ist unvollständig.'); return }

    const stop = () => { if (timer.current) { clearInterval(timer.current); timer.current = null } }

    const holen = async () => {
      try {
        const res = await fetch(`${FN}/video-status?id=${orderId}&token=${token}`)
        const d: Status = await res.json()
        if (!res.ok) { setFehler((d as any).error || 'Bestellung nicht gefunden.'); stop(); return }
        setDaten(d)

        if (d.status === 'wartet') setFortschritt(p => Math.min(p + 4, 25))
        else if (d.status === 'erzeugt') setFortschritt(p => Math.min(p + 3, 94))
        else if (d.status === 'fertig') { setFortschritt(100); stop() }
        else if (d.status === 'fehler') stop()
        else if (d.status === 'briefing') stop()
        else if (d.status === 'paid') stop()
      } catch {
        // Netzwerkaussetzer beim naechsten Durchlauf erneut versuchen
      }
    }

    holen()
    timer.current = setInterval(holen, 3000)
    return stop
  }, [orderId, token])

  // Nach dem Absenden der Antworten muss wieder gepollt werden - die Erzeugung
  // laeuft jetzt.
  const pollenStarten = () => {
    if (timer.current) return
    timer.current = setInterval(async () => {
      try {
        const res = await fetch(`${FN}/video-status?id=${orderId}&token=${token}`)
        const d: Status = await res.json()
        if (!res.ok) return
        setDaten(d)
        if (d.status === 'erzeugt') setFortschritt(p => Math.min(p + 3, 94))
        else if (d.status === 'wartet') setFortschritt(p => Math.min(p + 4, 25))
        else if (d.status === 'fertig' || d.status === 'fehler') {
          if (d.status === 'fertig') setFortschritt(100)
          clearInterval(timer.current); timer.current = null
        }
      } catch { /* weiter versuchen */ }
    }, 3000)
  }

  // Fragen vom Server holen, damit sie nur an einer Stelle gepflegt werden.
  useEffect(() => {
    fetch(`${FN}/video-pakete`)
      .then(r => r.json())
      .then(d => {
        if (d?.abfrage?.punkte?.length) setPunkte(d.abfrage.punkte)
        if (d?.abfrage?.zusatz) setZusatzFrage(d.abfrage.zusatz)
      })
      .catch(() => { /* Fallback steht schon */ })
  }, [])

  // Prompt-Paket als Beigabe - erst holen, wenn das Video fertig ist.
  useEffect(() => {
    if (!daten || daten.paketId !== 'selbst' || daten.status !== 'fertig' || paket) return
    fetch(`${FN}/video-paket?id=${orderId}&token=${token}`)
      .then(r => r.json())
      .then(d => { if (d.paket) { setPaket(d.paket); if (d.geminiUrl) setGeminiUrl(d.geminiUrl) } })
      .catch(() => { /* Beigabe, kein Drama */ })
  }, [daten, orderId, token, paket])

  const antwortSetzen = (punktId: string, wert: string) =>
    setAntworten(a => ({ ...a, [punktId]: wert }))

  const weiter = () => setSchritt(s => Math.min(s + 1, punkte.length))
  const zurueck = () => setSchritt(s => Math.max(s - 1, 0))

  const absenden = async () => {
    setFormFehler('')
    setSendet(true)
    try {
      const res = await fetch(`${FN}/video-briefing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, token, ...antworten, zusatz }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error || 'Deine Angaben konnten nicht gespeichert werden.')
      setGesendet(true)
      if (d.automatisch) { setFortschritt(8); pollenStarten() }
    } catch (err: any) {
      setFormFehler(err.message)
    } finally {
      setSendet(false)
    }
  }

  // ---------- Fehler ----------
  if (fehler && !daten) {
    return (
      <div className="pt-32 pb-32 max-w-2xl mx-auto px-4 text-center">
        <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-4" />
        <h1 className="font-display font-bold text-white text-2xl mb-3">Da stimmt etwas nicht</h1>
        <p className="text-white/60 text-base mb-6">{fehler}</p>
        <p className="text-white/50 text-base">
          Falls du bezahlt hast, ist nichts verloren - schreib kurz an{' '}
          <a href="mailto:info@my-digital-world.de" className="text-cyan-400 hover:text-cyan-300">info@my-digital-world.de</a>,
          dann klären wir es von Hand.
        </p>
      </div>
    )
  }

  // ---------- Warten auf Stripe ----------
  if (!daten || daten.status === 'pending') {
    return (
      <div className="pt-32 pb-32 max-w-2xl mx-auto px-4 text-center">
        <Loader2 className="w-10 h-10 text-emerald-400 mx-auto mb-4 animate-spin" />
        <h1 className="font-display font-bold text-white text-2xl mb-3">Zahlung wird bestätigt</h1>
        <p className="text-white/60 text-base">
          Das dauert meist nur wenige Sekunden. Bitte diese Seite offen lassen.
        </p>
      </div>
    )
  }

  const abgegeben = gesendet || daten.abfrageAbgegeben
  const laeuft = daten.status === 'wartet' || daten.status === 'erzeugt'
  const aktuell = punkte[schritt]
  const beantwortet = aktuell
    ? (aktuell.frei ? (antworten[aktuell.id] || '').trim().length >= 5 : Boolean(antworten[aktuell.id]))
    : false
  const allesDa = punkte.every(p =>
    p.frei ? (antworten[p.id] || '').trim().length >= 5 : Boolean(antworten[p.id]))

  return (
    <div className="pt-28 pb-32 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-7 h-7 text-emerald-400" />
        </div>
        <h1 className="font-display font-extrabold text-white text-3xl mb-3">Danke für deine Bestellung</h1>
        <p className="text-white/60 text-base">
          {daten.paketLabel} · Bestätigung geht an {daten.email}
        </p>
      </div>

      {/* ================= Kurzabfrage ================= */}
      {!abgegeben && (
        <div className="glass rounded-2xl border border-white/10 p-7 sm:p-9">
          <div className="flex items-center gap-2 mb-7">
            {punkte.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setSchritt(i)}
                aria-label={`Schritt ${i + 1}`}
                className={`h-1.5 w-8 rounded-full transition-all ${
                  i === schritt ? 'bg-emerald-400'
                    : antworten[p.id] ? 'bg-emerald-400/40' : 'bg-white/10'
                }`}
              />
            ))}
            <span className="ml-auto text-white/40 text-sm">
              {schritt < punkte.length ? `${schritt + 1} von ${punkte.length}` : 'Übersicht'}
            </span>
          </div>

          {schritt < punkte.length && aktuell && (
            <div>
              <h2 className="font-display font-bold text-white text-xl sm:text-2xl mb-2">
                {aktuell.frage}
              </h2>
              <p className="text-white/50 text-base mb-6">{aktuell.hinweis}</p>

              {aktuell.optionen ? (
                <div className="grid sm:grid-cols-2 gap-3">
                  {aktuell.optionen.map(o => {
                    const gewaehlt = antworten[aktuell.id] === o.id
                    return (
                      <button
                        key={o.id}
                        onClick={() => { antwortSetzen(aktuell.id, o.id); setTimeout(weiter, 160) }}
                        className={`text-left px-5 py-4 rounded-xl border transition-all ${
                          gewaehlt
                            ? 'bg-emerald-500/15 border-emerald-400/40'
                            : 'border-white/10 hover:border-white/25 hover:bg-white/5'
                        }`}
                      >
                        <span className={`block font-medium text-base ${gewaehlt ? 'text-emerald-300' : 'text-white'}`}>
                          {o.label}
                        </span>
                        {o.zusatz && (
                          <span className="block text-white/40 text-sm mt-0.5">{o.zusatz}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <>
                  <textarea
                    autoFocus
                    rows={3}
                    value={antworten[aktuell.id] || ''}
                    onChange={e => antwortSetzen(aktuell.id, e.target.value.slice(0, 400))}
                    placeholder={aktuell.platzhalter}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-emerald-400/40 resize-none text-base"
                  />
                  <p className="text-white/30 text-sm mt-2">
                    {(antworten[aktuell.id] || '').length} von 400 Zeichen
                  </p>
                </>
              )}

              <div className="flex items-center justify-between mt-7">
                <button
                  onClick={zurueck}
                  disabled={schritt === 0}
                  className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors disabled:opacity-0 text-base"
                >
                  <ArrowLeft className="w-4 h-4" /> Zurück
                </button>
                <button
                  onClick={weiter}
                  disabled={!beantwortet}
                  className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Weiter <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {schritt === punkte.length && (
            <div>
              <h2 className="font-display font-bold text-white text-xl sm:text-2xl mb-2">
                Passt das so?
              </h2>
              <p className="text-white/50 text-base mb-6">
                Tipp auf eine Zeile, wenn du sie noch ändern willst.
                {daten.automatisch && ' Danach entsteht dein Video - eine Änderung ist dann nicht mehr möglich.'}
              </p>

              <div className="space-y-2 mb-6">
                {punkte.map((p, i) => {
                  const wert = p.optionen
                    ? (p.optionen.find(o => o.id === antworten[p.id])?.label || '—')
                    : (antworten[p.id] || '—')
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSchritt(i)}
                      className="w-full text-left px-5 py-3 rounded-xl border border-white/10 hover:border-white/25 hover:bg-white/5 transition-all flex items-start gap-4 group"
                    >
                      <span className="flex-1">
                        <span className="block text-white/40 text-sm">{p.frage}</span>
                        <span className="block text-white text-base mt-0.5">{wert}</span>
                      </span>
                      <Pencil className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-1" />
                    </button>
                  )
                })}
              </div>

              <div className="mb-6">
                <label htmlFor="zusatz" className="block text-white text-base mb-1">
                  {zusatzFrage.frage} <span className="text-white/40">(freiwillig)</span>
                </label>
                <p className="text-white/40 text-sm mb-2">{zusatzFrage.hinweis}</p>
                <textarea
                  id="zusatz"
                  rows={3}
                  value={zusatz}
                  onChange={e => setZusatz(e.target.value.slice(0, 500))}
                  placeholder={zusatzFrage.platzhalter}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 focus:outline-none focus:border-emerald-400/40 resize-none text-base"
                />
              </div>

              {formFehler && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-base">
                  {formFehler}
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={zurueck}
                  className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-base"
                >
                  <ArrowLeft className="w-4 h-4" /> Zurück
                </button>
                <button
                  onClick={absenden}
                  disabled={sendet || !allesDa}
                  className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sendet ? 'Wird gesendet…' : daten.automatisch ? 'Video erstellen' : 'Abschicken'}
                </button>
              </div>

              <p className="text-white/30 text-sm mt-5 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> Eine Kopie geht an {daten.email}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ================= Automatisch: Erzeugung laeuft ================= */}
      {abgegeben && daten.automatisch && laeuft && (
        <div className="glass rounded-2xl border border-emerald-500/20 p-8 text-center">
          <Film className="w-9 h-9 text-emerald-400 mx-auto mb-5" />
          <h2 className="font-display font-bold text-white text-xl mb-3">Dein Video entsteht gerade</h2>
          <p className="text-white/60 text-base mb-7 max-w-md mx-auto">
            Das dauert ein bis drei Minuten. Du kannst die Seite offen lassen -
            und falls du sie schließt, kommt der Link ohnehin per E-Mail.
          </p>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden max-w-sm mx-auto mb-3">
            <div
              className="h-full bg-emerald-400 transition-all duration-1000"
              style={{ width: `${fortschritt}%` }}
            />
          </div>
          <p className="text-white/40 text-sm">{Math.round(fortschritt)} %</p>
        </div>
      )}

      {/* ================= Automatisch: Video ist fertig ================= */}
      {daten.status === 'fertig' && (
        <div className="space-y-8">
          <div className="glass rounded-2xl border border-emerald-500/25 p-7">
            <h2 className="font-display font-bold text-white text-xl mb-5 text-center">
              Dein Video ist fertig
            </h2>
            <div className="max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-white/10">
              <video
                src={`${FN}/video-datei?id=${orderId}&token=${token}`}
                controls
                playsInline
                className="w-full aspect-[9/16] object-cover bg-black"
              />
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-6">
              <a
                href={`${FN}/video-datei?id=${orderId}&token=${token}&download=1`}
                className="btn-primary flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Herunterladen
              </a>
              <a
                href="https://wa.me/4915906146147"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Passt nicht? Schreib uns
              </a>
            </div>
          </div>

          <div className="glass rounded-2xl border border-white/5 p-7">
            <h3 className="font-display font-bold text-white text-lg mb-4">
              So kommt es in deinen Status
            </h3>
            <ol className="space-y-3">
              {[
                'Video herunterladen - es landet in deiner Galerie.',
                'In WhatsApp auf Status gehen und das Kamerasymbol antippen.',
                'Das Video aus der Galerie wählen, kurzen Text dazu, senden.',
              ].map((t, i) => (
                <li key={t} className="flex gap-4">
                  <span className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-sm flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-white/70 text-base leading-relaxed">{t}</span>
                </li>
              ))}
            </ol>
            <p className="text-white/40 text-sm mt-5">
              Der Link zu dieser Seite liegt auch in deinem Postfach - du kommst
              also jederzeit wieder an dein Video.
            </p>
          </div>

          {/* Beigabe: das Prompt-Paket zum Weitermachen */}
          {paket && (
            <div className="glass rounded-2xl border border-cyan-500/20 overflow-hidden">
              <button
                onClick={() => setPaketOffen(!paketOffen)}
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left"
              >
                <span>
                  <span className="block text-white font-semibold text-base">
                    Geschenkt dazu: dein Prompt-Paket
                  </span>
                  <span className="block text-white/50 text-sm mt-0.5">
                    Vier fertige Prompts und die Anleitung, um selbst weiterzumachen
                  </span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-white/40 flex-shrink-0 transition-transform ${paketOffen ? 'rotate-180' : ''}`}
                />
              </button>

              {paketOffen && (
                <div className="px-7 pb-7 space-y-7">
                  <p className="text-white/60 text-base leading-relaxed">{paket.vorwort}</p>

                  <a href={geminiUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 w-fit">
                    Google Gemini öffnen <ExternalLink className="w-4 h-4" />
                  </a>

                  <div>
                    <h4 className="text-white font-semibold text-base mb-4">In vier Schritten</h4>
                    <ol className="space-y-3">
                      {paket.schritte.map(s => (
                        <li key={s.nr} className="flex gap-4">
                          <span className="w-7 h-7 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-sm flex items-center justify-center flex-shrink-0">
                            {s.nr}
                          </span>
                          <div>
                            <span className="block text-white text-base">{s.titel}</span>
                            <span className="block text-white/60 text-base leading-relaxed">{s.text}</span>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold text-base">Deine vier Prompts</h4>
                    {paket.prompts.map(p => (
                      <div key={p.kategorie} className="rounded-xl border border-white/5 p-5">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <h5 className="text-white font-medium text-base">{p.kategorie}</h5>
                          <KopierKnopf text={p.text} />
                        </div>
                        <p className="text-white/50 text-sm mb-4">{p.zweck}</p>
                        <pre className="whitespace-pre-wrap break-words text-white/70 text-sm leading-relaxed bg-black/30 border border-white/5 rounded-lg p-4 font-mono">
                          {p.text}
                        </pre>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-cyan-400" /> Woran es sonst scheitert
                    </h4>
                    <ul className="space-y-3">
                      {paket.tipps.map(t => (
                        <li key={t} className="flex items-start gap-3 text-white/60 text-base leading-relaxed">
                          <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= Automatisch: etwas ist schiefgegangen ================= */}
      {daten.status === 'fehler' && (
        <div className="glass rounded-2xl border border-amber-500/25 p-8 text-center">
          <AlertCircle className="w-9 h-9 text-amber-400 mx-auto mb-5" />
          <h2 className="font-display font-bold text-white text-xl mb-3">
            Das hat leider nicht geklappt
          </h2>
          <p className="text-white/60 text-base mb-6 max-w-md mx-auto">
            Die automatische Erzeugung ist gescheitert. Wir haben eine Meldung
            bekommen und machen dein Video von Hand - du hörst innerhalb eines
            Werktags von uns an {daten.email}.
          </p>
          <p className="text-white/50 text-base mb-6">
            Wenn dir das zu lange dauert, sag Bescheid. Dann erstatten wir dir
            den Betrag ohne Rückfrage zurück.
          </p>
          <a href="https://wa.me/4915906146147" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 w-fit mx-auto">
            <MessageCircle className="w-4 h-4" /> Kurz melden
          </a>
        </div>
      )}

      {/* ================= Betreut: Angaben sind da ================= */}
      {abgegeben && !daten.automatisch && (
        <div className="glass rounded-2xl border border-emerald-500/20 p-8 text-center">
          <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
          <h2 className="font-display font-bold text-white text-xl mb-3">Alles da</h2>
          <p className="text-white/60 text-base mb-2">
            Eine Zusammenfassung ist an <span className="text-white">{daten.email}</span> unterwegs
            - und liegt ebenso bei uns.
          </p>
          <p className="text-white/60 text-base mb-6">
            Dein Video ist in der Regel innerhalb von 2-3 Werktagen fertig. Eine
            Korrekturschleife ist enthalten - antworte dafür einfach auf die Mail.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="https://wa.me/4915906146147" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Etwas nachreichen
            </a>
            <Link href="/kurzvideos">
              <button className="px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors">
                Zurück zur Übersicht
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
