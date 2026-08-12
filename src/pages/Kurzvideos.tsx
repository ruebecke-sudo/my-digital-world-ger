import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, CheckCircle, Play, Pause, Sparkles, Clock, Smartphone,
  MessageCircle, Wand2, PenLine, Download, Mail, ShieldCheck, ChevronDown,
} from 'lucide-react'

const FN = '/.netlify/functions'

type Paket = {
  id: string
  label: string
  cents: number
  kurz: string
  lieferung: string
  briefing: boolean
}

const preis = (cents: number) => (cents / 100).toFixed(2).replace('.', ',') + ' €'

// Fallback, falls die Function beim ersten Aufruf noch nicht antwortet. Die
// verbindlichen Preise stehen in lib/videopakete.mjs - der Checkout rechnet
// immer damit, egal was hier steht.
const PAKETE_FALLBACK: Paket[] = [
  {
    id: 'komplett',
    label: 'Video erstellen lassen',
    cents: 4500,
    kurz: 'Du sagst, worum es geht - wir liefern das fertige Video.',
    lieferung: 'Fertiges Video per E-Mail, in der Regel innerhalb von 2-3 Werktagen.',
    briefing: true,
  },
  {
    id: 'selbst',
    label: 'Selbst erstellen',
    cents: 2500,
    kurz: 'Das komplette Prompt-Paket - du klickst es in Google Gemini selbst zusammen.',
    lieferung: 'Sofort nach der Zahlung freigeschaltet.',
    briefing: false,
  },
]

const KATEGORIEN = [
  {
    id: 'sprecher',
    label: 'Sprecher-Video',
    datei: 'hero',
    zeile: 'Ein Mensch spricht deine Botschaft',
    text: 'Eine sympathische Person sagt in wenigen Sekunden, worum es geht. Das Format, das im Status am ehesten zu Ende gesehen wird - weil ein Gesicht den Blick hält.',
    passt: ['Dienstleistung erklären', 'Aktion ankündigen', 'Vertrauen aufbauen'],
  },
  {
    id: 'produkt',
    label: 'Produkt & Angebot',
    datei: 'produkt',
    zeile: 'Zeigen statt beschreiben',
    text: 'Dein Produkt in Bewegung, ruhig ausgeleuchtet, ohne Ablenkung. Wer im Status daran vorbeiscrollt, hat das Wichtigste in zwei Sekunden gesehen.',
    passt: ['Neues im Sortiment', 'Angebot der Woche', 'Shop-Verlinkung'],
  },
  {
    id: 'anlass',
    label: 'Anlass & Einladung',
    datei: 'anlass',
    zeile: 'Für den einen besonderen Tag',
    text: 'Hochzeit, Geburtstag, Jubiläum, Eröffnung. Ein kurzes Video, das die Stimmung transportiert - und das Gäste weiterschicken, statt es nur anzusehen.',
    passt: ['Einladung', 'Save the date', 'Danke sagen'],
  },
  {
    id: 'charakter',
    label: 'Charakter & Spaß',
    datei: 'charakter',
    zeile: 'Eine Figur, die hängen bleibt',
    text: 'Überzeichnet, augenzwinkernd, im Look eines modernen Animationsfilms. Funktioniert überall dort, wo eine ernste Werbebotschaft sofort weggewischt würde.',
    passt: ['Aufmerksamkeit', 'Wiedererkennung', 'Zum Weiterleiten'],
  },
]

const BAUSTEINE = [
  { icon: PenLine, titel: 'Konzept & Text', text: 'Aus deiner Botschaft wird ein Satz, der in zehn Sekunden passt. Der Teil, an dem die meisten Videos scheitern.' },
  { icon: Wand2, titel: 'KI-Videoproduktion', text: 'Erzeugt mit Google Gemini und Veo. Mehrere Durchläufe, geliefert wird die beste Fassung.' },
  { icon: Smartphone, titel: 'Hochkant 9:16', text: 'Direkt im Statusformat erzeugt, nicht nachträglich zugeschnitten. Nichts Wichtiges fällt am Rand weg.' },
  { icon: MessageCircle, titel: 'Text im Bild', text: 'Kurze Einblendungen für alle, die ohne Ton schauen - und das sind die meisten.' },
  { icon: Clock, titel: '8 bis 15 Sekunden', text: 'Die Länge, die im Status wirklich zu Ende gesehen wird. Ein Gedanke pro Video, nicht zwei.' },
  { icon: Download, titel: 'Fertige MP4-Datei', text: 'Direkt hochladbar - in den WhatsApp-Status und genauso in Reels, Shorts oder Stories.' },
]

const FRAGEN = [
  {
    frage: 'Wie kommt das Video in meinen WhatsApp-Status?',
    antwort: 'Du bekommst eine MP4-Datei. Speichern, in WhatsApp auf Status gehen, das Kamerasymbol antippen, das Video aus der Galerie wählen, kurzen Text dazu - fertig. Es sind keine Zusatzprogramme nötig.',
  },
  {
    frage: 'Was passiert nach der Bezahlung?',
    antwort: 'Beim Komplettpaket stellen wir dir vier kurze Fragen - Ziel, deine Botschaft in einem Satz, Ton und Branche. Drei davon tippst du nur an. Eine Zusammenfassung geht danach an dich und an uns, dann entsteht das Video. Beim Selbst-erstellen-Paket steht das komplette Prompt-Paket sofort auf der nächsten Seite bereit.',
  },
  {
    frage: 'Kann ich Änderungen wünschen?',
    antwort: 'Beim Komplettpaket ist eine Korrekturschleife enthalten. Antworte einfach auf die Liefermail und beschreibe, was anders sein soll.',
  },
  {
    frage: 'Brauche ich für das Selbst-erstellen-Paket ein bezahltes Gemini-Konto?',
    antwort: 'Für die Videoerzeugung mit Veo brauchst du ein Google-Konto mit Zugang zur Videofunktion. Google gibt dort ein Kontingent vor, das sich von Zeit zu Zeit ändert - der aktuelle Stand steht direkt bei Gemini. Die Prompts selbst funktionieren unabhängig davon.',
  },
  {
    frage: 'Darf ich das Video geschäftlich nutzen?',
    antwort: 'Ja. Das fertige Video darfst du uneingeschränkt für dein eigenes Unternehmen einsetzen - im Status, in sozialen Netzwerken und auf deiner Website.',
  },
  {
    frage: 'Kommen echte Personen im Video vor?',
    antwort: 'Nein. Alle Figuren werden künstlich erzeugt. Es wird niemand abgebildet, der eine Freigabe erteilen müsste - und du hast keine Modelkosten.',
  },
]

// Ein Video zeigt sich stumm und in Schleife, sobald es im Blick ist. Das ist
// im Status genau die Situation, in der es spaeter auch laeuft.
function VideoKachel({ datei, aktiv }: { datei: string; aktiv: boolean }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [laeuft, setLaeuft] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const beobachter = new IntersectionObserver(
      ([eintrag]) => {
        if (eintrag.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.4 }
    )
    beobachter.observe(el)
    return () => beobachter.disconnect()
  }, [])

  const umschalten = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border transition-all ${
        aktiv ? 'border-emerald-400/40 shadow-lg shadow-emerald-500/10' : 'border-white/10'
      }`}
    >
      <video
        ref={ref}
        src={`/kurzvideos/${datei}.mp4`}
        poster={`/kurzvideos/${datei}.jpg`}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setLaeuft(true)}
        onPause={() => setLaeuft(false)}
        onClick={umschalten}
        className="w-full aspect-[9/16] object-cover bg-black cursor-pointer"
      />
      <button
        onClick={umschalten}
        aria-label={laeuft ? 'Pause' : 'Abspielen'}
        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
      >
        {laeuft ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </button>
    </div>
  )
}

export default function Kurzvideos() {
  const [pakete, setPakete] = useState<Paket[]>(PAKETE_FALLBACK)
  const [paketId, setPaketId] = useState('komplett')
  const [kategorieId, setKategorieId] = useState('sprecher')
  const [email, setEmail] = useState('')
  const [fehler, setFehler] = useState('')
  const [laedt, setLaedt] = useState(false)
  const [offeneFrage, setOffeneFrage] = useState<number | null>(null)
  const [abgebrochen, setAbgebrochen] = useState(false)

  useEffect(() => {
    setAbgebrochen(new URLSearchParams(window.location.search).get('abgebrochen') === '1')
    fetch(`${FN}/video-pakete`)
      .then(r => r.json())
      .then(d => { if (d && Array.isArray(d.pakete) && d.pakete.length) setPakete(d.pakete) })
      .catch(() => { /* Fallback-Preise stehen schon */ })
  }, [])

  const paket = pakete.find(p => p.id === paketId) || pakete[0]

  const zurKasse = async () => {
    setFehler('')
    setLaedt(true)
    try {
      const res = await fetch(`${FN}/video-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paketId, kategorieId, email }),
      })
      const daten = await res.json()
      if (!res.ok || !daten.url) throw new Error(daten.error || 'Der Checkout konnte nicht geöffnet werden.')
      window.location.href = daten.url
    } catch (err: any) {
      setFehler(err.message || 'Es ist etwas schiefgelaufen. Bitte noch einmal versuchen.')
      setLaedt(false)
    }
  }

  const zurBestellung = (id: string) => {
    setPaketId(id)
    document.getElementById('bestellen')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pt-24 pb-32">
      {/* ---------- Kopf ---------- */}
      <div className="relative section-overlay py-16">
        <div className="hero-orb w-96 h-96 bg-emerald-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                <Sparkles className="w-3.5 h-3.5" /> Neu bei my-digital-world
              </div>
              <h1 className="font-display font-extrabold text-4xl md:text-5xl text-white mb-5 leading-tight">
                Kurzvideos für deinen<br /><span className="gradient-text">WhatsApp-Status</span>
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                Dein Status wird von genau den Menschen gesehen, die deine Nummer schon haben:
                Kunden, Nachbarn, Stammgäste, Kollegen. Kein Algorithmus dazwischen, keine
                Anzeigenkosten. Was fehlt, ist meistens nur eines - ein Video, das man sich
                zu Ende ansieht.
              </p>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Genau das entsteht hier: hochkant, wenige Sekunden lang, mit künstlicher
                Intelligenz produziert. Fertig geliefert für{' '}
                {preis(pakete.find(p => p.id === 'komplett')?.cents ?? 4500)} - oder als
                komplettes Prompt-Paket zum Selbermachen für{' '}
                {preis(pakete.find(p => p.id === 'selbst')?.cents ?? 2500)}.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => zurBestellung('komplett')} className="btn-primary flex items-center gap-2">
                  Video erstellen lassen <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => zurBestellung('selbst')}
                  className="px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors flex items-center gap-2"
                >
                  Selbst erstellen
                </button>
              </div>
            </div>

            <div className="max-w-[280px] mx-auto w-full">
              <VideoKachel datei="hero" aktiv />
              <p className="text-white/40 text-sm text-center mt-3">
                So sieht ein fertiges Video im Status aus
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 mt-12">

        {abgebrochen && (
          <div className="glass rounded-xl border border-amber-500/25 p-4 text-amber-200 text-base">
            Die Zahlung wurde abgebrochen - es wurde nichts abgebucht. Du kannst
            unten jederzeit neu bestellen.
          </div>
        )}

        {/* ---------- Warum ---------- */}
        <section>
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">
            Warum ausgerechnet der Status
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl">
            Der WhatsApp-Status ist der einzige Kanal, in dem du ohne Umweg bei Menschen
            landest, die dich schon kennen. Das verändert, was ein Video leisten muss.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { titel: 'Direkt bei bekannten Kontakten', text: 'Keine Reichweite, die erst gekauft oder erarbeitet werden muss. Wer deine Nummer hat, sieht deinen Status.' },
              { titel: '24 Stunden Aufmerksamkeit', text: 'Ein Status verschwindet von selbst. Das nimmt den Druck, perfekt zu sein - und erlaubt, regelmäßig etwas zu zeigen.' },
              { titel: 'Wird weitergeleitet', text: 'Was gefällt, landet im nächsten Chat. Genau dort entstehen Empfehlungen, die keine Anzeige kaufen kann.' },
            ].map(k => (
              <div key={k.titel} className="glass rounded-2xl border border-white/5 p-6">
                <h3 className="text-white font-semibold text-base mb-2">{k.titel}</h3>
                <p className="text-white/60 text-base leading-relaxed">{k.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Kategorien ---------- */}
        <section>
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">
            Vier Arten von Videos
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl">
            Tipp auf ein Video, um es anzusehen. Such dir die Richtung aus, die zu deinem
            Vorhaben passt - alles Weitere klärt sich im Briefing.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {KATEGORIEN.map(k => (
              <div key={k.id} className="flex flex-col">
                <VideoKachel datei={k.datei} aktiv={kategorieId === k.id} />
                <div className="mt-4 flex-1 flex flex-col">
                  <h3 className="text-white font-semibold text-base">{k.label}</h3>
                  <p className="text-emerald-400/80 text-sm mb-2">{k.zeile}</p>
                  <p className="text-white/60 text-base leading-relaxed mb-3 flex-1">{k.text}</p>
                  <ul className="space-y-1 mb-4">
                    {k.passt.map(p => (
                      <li key={p} className="flex items-center gap-2 text-white/50 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400/70 flex-shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { setKategorieId(k.id); zurBestellung('komplett') }}
                    className={`w-full px-4 py-2 rounded-xl text-sm font-medium transition-colors border ${
                      kategorieId === k.id
                        ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
                        : 'border-white/15 text-white/70 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {kategorieId === k.id ? 'Ausgewählt' : 'Diese Art wählen'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Bausteine ---------- */}
        <section>
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">
            Was in jedem Video steckt
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl">
            Die Bausteine sind bei allen vier Arten dieselben. Sie unterscheiden sich nur
            darin, wer sie zusammensetzt - wir oder du.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BAUSTEINE.map(b => (
              <div key={b.titel} className="glass rounded-2xl border border-white/5 p-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{b.titel}</h3>
                <p className="text-white/60 text-base leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Preise & Bestellung ---------- */}
        <section id="bestellen" className="scroll-mt-24">
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-3">
            Zwei Wege zum Video
          </h2>
          <p className="text-white/60 text-base mb-8 max-w-2xl">
            Derselbe Weg, dieselben Werkzeuge - der Unterschied ist nur, wie viel du selbst
            in die Hand nimmst.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* Komplettpaket */}
            <button
              onClick={() => setPaketId('komplett')}
              className={`text-left glass rounded-2xl border p-7 transition-all ${
                paketId === 'komplett'
                  ? 'border-emerald-400/40 shadow-lg shadow-emerald-500/10'
                  : 'border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-3">
                    Beliebt
                  </span>
                  <h3 className="font-display font-bold text-white text-xl">Video erstellen lassen</h3>
                </div>
                <div className="text-right">
                  <div className="font-display font-extrabold text-white text-3xl">
                    {preis(pakete.find(p => p.id === 'komplett')?.cents ?? 4500)}
                  </div>
                  <div className="text-white/40 text-sm">einmalig</div>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  'Vier kurze Fragen statt Formular - in einer Minute erledigt',
                  'Konzept, Text und Produktion übernehmen wir',
                  'Mehrere Durchläufe, geliefert wird der beste',
                  'Eine Korrekturschleife inklusive',
                  'Fertige MP4 per E-Mail in 2-3 Werktagen',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2 text-white/70 text-base">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" /> {t}
                  </li>
                ))}
              </ul>
            </button>

            {/* Selbst erstellen */}
            <button
              onClick={() => setPaketId('selbst')}
              className={`text-left glass rounded-2xl border p-7 transition-all ${
                paketId === 'selbst'
                  ? 'border-cyan-400/40 shadow-lg shadow-cyan-500/10'
                  : 'border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-3">
                    Sofort verfügbar
                  </span>
                  <h3 className="font-display font-bold text-white text-xl">Selbst erstellen</h3>
                </div>
                <div className="text-right">
                  <div className="font-display font-extrabold text-white text-3xl">
                    {preis(pakete.find(p => p.id === 'selbst')?.cents ?? 2500)}
                  </div>
                  <div className="text-white/40 text-sm">einmalig</div>
                </div>
              </div>
              <ul className="space-y-2">
                {[
                  'Vier fertige Prompts - einer je Videoart',
                  'Schritt-für-Schritt-Anleitung für Google Gemini',
                  'Direktlink zu Gemini, kein Suchen nötig',
                  'Sieben Regeln, an denen Statusvideos sonst scheitern',
                  'Sofort nach der Zahlung freigeschaltet',
                ].map(t => (
                  <li key={t} className="flex items-start gap-2 text-white/70 text-base">
                    <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" /> {t}
                  </li>
                ))}
              </ul>
            </button>
          </div>

          {/* Bestellformular */}
          <div className="glass rounded-2xl border border-white/10 p-7">
            <h3 className="font-display font-bold text-white text-lg mb-5">
              {paket?.label} für {preis(paket?.cents ?? 0)} bestellen
            </h3>

            {paket?.briefing && (
              <div className="mb-5">
                <label className="block text-white/70 text-base mb-2">Welche Art von Video?</label>
                <div className="flex flex-wrap gap-2">
                  {KATEGORIEN.map(k => (
                    <button
                      key={k.id}
                      onClick={() => setKategorieId(k.id)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                        kategorieId === k.id
                          ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
                          : 'border-white/15 text-white/70 hover:text-white hover:border-white/30'
                      }`}
                    >
                      {k.label}
                    </button>
                  ))}
                </div>
                <p className="text-white/40 text-sm mt-2">
                  Lässt sich im Briefing nach der Zahlung noch ändern.
                </p>
              </div>
            )}

            <div className="mb-5">
              <label htmlFor="kv-email" className="block text-white/70 text-base mb-2">
                Deine E-Mail-Adresse
              </label>
              <input
                id="kv-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@beispiel.de"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-400/40"
              />
              <p className="text-white/40 text-sm mt-2">
                {paket?.briefing
                  ? 'Hierhin geht das fertige Video.'
                  : 'Nur für die Bestellbestätigung - das Paket steht sofort auf der nächsten Seite.'}
              </p>
            </div>

            {paket?.briefing && (
              <p className="text-white/50 text-base mb-5">
                Mehr braucht es hier nicht. Direkt nach der Zahlung stellen wir dir vier
                kurze Fragen - drei zum Antippen, eine zum Schreiben. Das dauert keine Minute.
              </p>
            )}

            {fehler && (
              <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-300 text-base">
                {fehler}
              </div>
            )}

            <button
              onClick={zurKasse}
              disabled={laedt}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {laedt ? 'Kasse wird geöffnet…' : `Jetzt für ${preis(paket?.cents ?? 0)} bestellen`}
              {!laedt && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-white/40 text-sm">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Bezahlung über Stripe
              </span>
              <span>Karte · PayPal · Klarna</span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Rechnung per E-Mail
              </span>
            </div>
          </div>
        </section>

        {/* ---------- Ablauf ---------- */}
        <section>
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-8">
            Wie es weitergeht
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl border border-emerald-500/15 p-7">
              <h3 className="font-display font-bold text-white text-lg mb-5">
                Erstellen lassen · {preis(pakete.find(p => p.id === 'komplett')?.cents ?? 4500)}
              </h3>
              <ol className="space-y-4">
                {[
                  'Paket wählen, E-Mail eintragen, über Stripe bezahlen.',
                  'Vier kurze Fragen - Ziel, Botschaft, Ton, Branche. Die Zusammenfassung bekommst du sofort per Mail.',
                  'Wir produzieren mehrere Fassungen und schicken die beste per E-Mail.',
                  'Änderungswunsch? Einmal antworten genügt - die Korrekturschleife ist enthalten.',
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-sm flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/70 text-base leading-relaxed">{t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass rounded-2xl border border-cyan-500/15 p-7">
              <h3 className="font-display font-bold text-white text-lg mb-5">
                Selbst erstellen · {preis(pakete.find(p => p.id === 'selbst')?.cents ?? 2500)}
              </h3>
              <ol className="space-y-4">
                {[
                  'Paket wählen, E-Mail eintragen, über Stripe bezahlen.',
                  'Das Prompt-Paket erscheint sofort auf der nächsten Seite - mit Kopierknopf für jeden Prompt.',
                  'Ein Klick öffnet Google Gemini. Prompt einfügen, Platzhalter ersetzen, erzeugen lassen.',
                  'Video herunterladen und in den Status stellen. Der Link bleibt gespeichert, du kannst jederzeit zurück.',
                ].map((t, i) => (
                  <li key={t} className="flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-sm flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-white/70 text-base leading-relaxed">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- Fragen ---------- */}
        <section>
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-8">
            Häufige Fragen
          </h2>
          <div className="space-y-3">
            {FRAGEN.map((f, i) => (
              <div key={f.frage} className="glass rounded-xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOffeneFrage(offeneFrage === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-white font-medium text-base">{f.frage}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/50 flex-shrink-0 transition-transform ${
                      offeneFrage === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {offeneFrage === i && (
                  <p className="px-6 pb-5 text-white/60 text-base leading-relaxed">{f.antwort}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Abschluss ---------- */}
        <section className="glass rounded-2xl border border-emerald-500/15 p-8 text-center">
          <h2 className="font-display font-bold text-white text-xl md:text-2xl mb-3">
            Unsicher, welche Art zu dir passt?
          </h2>
          <p className="text-white/60 text-base mb-6 max-w-xl mx-auto">
            Schreib kurz, was du vorhast - eine Einschätzung kostet nichts und dauert
            keine fünf Minuten.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://wa.me/4915906146147"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Per WhatsApp fragen
            </a>
            <a
              href="mailto:info@my-digital-world.de?subject=Kurzvideo%20f%C3%BCr%20den%20WhatsApp-Status"
              className="px-5 py-2.5 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/30 transition-colors flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> E-Mail schreiben
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
