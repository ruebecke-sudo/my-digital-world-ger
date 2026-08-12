import { useEffect, useRef, useState } from 'react'
import { Link } from 'wouter'
import {
  CheckCircle, Copy, Check, ExternalLink, Loader2, AlertCircle,
  Mail, MessageCircle, Lightbulb, ArrowLeft, ArrowRight, Pencil,
} from 'lucide-react'

const FN = '/.netlify/functions'

type Status = {
  status: string
  paketId: string
  paketLabel: string
  brauchtBriefing: boolean
  kategorieLabel: string
  email: string
  briefingAbgegeben: boolean
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
  frage: 'Noch etwas, das ich wissen sollte?',
  hinweis: 'Firmenname, Wunschtermin, Logo, ein Beispielvideo - alles freiwillig.',
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
  const timer = useRef<any>(null)

  // Kurzabfrage
  const [punkte, setPunkte] = useState<Punkt[]>(PUNKTE_FALLBACK)
  const [zusatzFrage, setZusatzFrage] = useState<Zusatz>(ZUSATZ_FALLBACK)
  const [schritt, setSchritt] = useState(0)           // 0..3 = Fragen, 4 = Übersicht
  const [antworten, setAntworten] = useState<Record<string, string>>({})
  const [zusatz, setZusatz] = useState('')
  const [sendet, setSendet] = useState(false)
  const [gesendet, setGesendet] = useState(false)
  const [mailAnKunde, setMailAnKunde] = useState(true)
  const [formFehler, setFormFehler] = useState('')

  // Auf die Zahlungsbestaetigung von Stripe warten. Der Webhook braucht meist
  // ein paar Sekunden - so lange steht der Status auf "pending".
  useEffect(() => {
    if (!orderId || !token) { setFehler('Der Link ist unvollständig.'); return }

    const stop = () => { if (timer.current) { clearInterval(timer.current); timer.current = null } }

    const holen = async () => {
      try {
        const res = await fetch(`${FN}/video-status?id=${orderId}&token=${token}`)
        const d = await res.json()
        if (!res.ok) { setFehler(d.error || 'Bestellung nicht gefunden.'); stop(); return }
        setDaten(d)
        if (d.status !== 'pending') stop()
      } catch {
        // Netzwerkaussetzer beim naechsten Durchlauf erneut versuchen
      }
    }

    holen()
    timer.current = setInterval(holen, 3000)
    return stop
  }, [orderId, token])

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

  // Prompt-Paket erst holen, wenn bezahlt ist - vorher lehnt die Function ab.
  useEffect(() => {
    if (!daten || daten.paketId !== 'selbst' || daten.status === 'pending' || paket) return
    fetch(`${FN}/video-paket?id=${orderId}&token=${token}`)
      .then(r => r.json())
      .then(d => { if (d.paket) { setPaket(d.paket); if (d.geminiUrl) setGeminiUrl(d.geminiUrl) } })
      .catch(() => setFehler('Das Paket konnte nicht geladen werden. Bitte die Seite neu laden.'))
  }, [daten, orderId, token, paket])

  const antworten_setzen = (punktId: string, wert: string) =>
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
      if (!res.ok) throw new Error(d.error || 'Das Briefing konnte nicht gespeichert werden.')
      setMailAnKunde(d.mailAnKunde !== false)
      setGesendet(true)
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

  const fertig = gesendet || daten.briefingAbgegeben
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

      {/* ================= Komplettpaket: Kurzabfrage ================= */}
      {daten.brauchtBriefing && (
        fertig ? (
          <div className="glass rounded-2xl border border-emerald-500/20 p-8 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
            <h2 className="font-display font-bold text-white text-xl mb-3">Alles da</h2>
            <p className="text-white/60 text-base mb-2">
              {mailAnKunde
                ? <>Eine Zusammenfassung ist gerade an <span className="text-white">{daten.email}</span> unterwegs - und liegt ebenso bei uns.</>
                : <>Deine Angaben sind bei uns angekommen.</>}
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
        ) : (
          <div className="glass rounded-2xl border border-white/10 p-7 sm:p-9">
            {/* Fortschritt */}
            <div className="flex items-center gap-2 mb-7">
              {punkte.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setSchritt(i)}
                  aria-label={`Schritt ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === schritt ? 'w-8 bg-emerald-400'
                      : antworten[p.id] ? 'w-8 bg-emerald-400/40' : 'w-8 bg-white/10'
                  }`}
                />
              ))}
              <span className="ml-auto text-white/40 text-sm">
                {schritt < punkte.length ? `${schritt + 1} von ${punkte.length}` : 'Übersicht'}
              </span>
            </div>

            {/* ----- Frageschritte ----- */}
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
                          onClick={() => { antworten_setzen(aktuell.id, o.id); setTimeout(weiter, 160) }}
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
                      onChange={e => antworten_setzen(aktuell.id, e.target.value.slice(0, 400))}
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

            {/* ----- Übersicht ----- */}
            {schritt === punkte.length && (
              <div>
                <h2 className="font-display font-bold text-white text-xl sm:text-2xl mb-2">
                  Passt das so?
                </h2>
                <p className="text-white/50 text-base mb-6">
                  Tipp auf eine Zeile, wenn du sie noch ändern willst.
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
                    {sendet ? 'Wird gesendet…' : 'Abschicken'}
                  </button>
                </div>

                <p className="text-white/30 text-sm mt-5 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5" /> Eine Kopie geht an {daten.email}
                </p>
              </div>
            )}
          </div>
        )
      )}

      {/* ================= Selbst erstellen: Prompt-Paket ================= */}
      {!daten.brauchtBriefing && (
        !paket ? (
          <div className="text-center py-10">
            <Loader2 className="w-8 h-8 text-cyan-400 mx-auto mb-4 animate-spin" />
            <p className="text-white/60 text-base">Dein Paket wird geladen…</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="glass rounded-2xl border border-cyan-500/20 p-7">
              <h2 className="font-display font-bold text-white text-xl mb-3">{paket.titel}</h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">{paket.vorwort}</p>
              <a href={geminiUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 w-fit">
                Google Gemini öffnen <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-white/40 text-sm mt-4">
                Der Link zu dieser Seite liegt auch in deinem Postfach - du kommst
                also jederzeit an dein Paket zurück.
              </p>
            </div>

            <div>
              <h3 className="font-display font-bold text-white text-lg mb-5">In vier Schritten</h3>
              <ol className="space-y-4">
                {paket.schritte.map(s => (
                  <li key={s.nr} className="glass rounded-xl border border-white/5 p-5 flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-sm flex items-center justify-center flex-shrink-0">
                      {s.nr}
                    </span>
                    <div>
                      <h4 className="text-white font-semibold text-base mb-1">{s.titel}</h4>
                      <p className="text-white/60 text-base leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="font-display font-bold text-white text-lg mb-5">Deine vier Prompts</h3>
              <div className="space-y-4">
                {paket.prompts.map(p => (
                  <div key={p.kategorie} className="glass rounded-xl border border-white/5 p-5">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="text-white font-semibold text-base">{p.kategorie}</h4>
                      <KopierKnopf text={p.text} />
                    </div>
                    <p className="text-white/50 text-sm mb-4">{p.zweck}</p>
                    <pre className="whitespace-pre-wrap break-words text-white/70 text-sm leading-relaxed bg-black/30 border border-white/5 rounded-lg p-4 font-mono">
                      {p.text}
                    </pre>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl border border-white/5 p-7">
              <h3 className="font-display font-bold text-white text-lg mb-5 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-cyan-400" /> Woran es sonst scheitert
              </h3>
              <ul className="space-y-3">
                {paket.tipps.map(t => (
                  <li key={t} className="flex items-start gap-3 text-white/60 text-base leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-2xl border border-emerald-500/15 p-7 text-center">
              <p className="text-white/60 text-base mb-5">
                Wenn es doch nicht so wird, wie du es dir vorstellst: Wir übernehmen es
                gerne komplett.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/kurzvideos">
                  <button className="btn-primary flex items-center gap-2">Video erstellen lassen</button>
                </Link>
                <a
                  href="mailto:info@my-digital-world.de?subject=Frage%20zum%20Prompt-Paket"
                  className="px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" /> Frage stellen
                </a>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}
