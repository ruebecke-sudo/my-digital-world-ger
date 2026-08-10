import { useEffect, useState } from 'react'
import { Sparkles, ShoppingCart, ZoomIn, X } from 'lucide-react'

type Motiv = { id: string; titel: string; bild?: string | null }
type Format = { id: string; label: string; hinweis: string; cents: number }
const FN = '/.netlify/functions'

const preis = (cents: number) => (cents / 100).toFixed(2).replace('.', ',') + ' €'

export default function PosterShop() {
  const [motive, setMotive] = useState<Motiv[]>([])
  const [formate, setFormate] = useState<Format[]>([])
  const [auswahl, setAuswahl] = useState<string | null>(null)
  const [formatId, setFormatId] = useState<string | null>(null)
  const [zoom, setZoom] = useState<Motiv | null>(null)
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [fehler, setFehler] = useState('')
  const [laedt, setLaedt] = useState(false)

  useEffect(() => {
    fetch(`${FN}/motifs`)
      .then(r => r.json())
      .then(setMotive)
      .catch(() => setFehler('Die Motive konnten nicht geladen werden. Bitte später erneut versuchen.'))
  }, [])

  useEffect(() => {
    fetch(`${FN}/formats`)
      .then(r => r.json())
      .then(d => { setFormate(d.formate || []); setFormatId(d.standard || null) })
      .catch(() => setFehler('Die Formate konnten nicht geladen werden. Bitte später erneut versuchen.'))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoom(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const bildPfad = (m: Motiv) => m.bild || `/motive/${m.id}.jpg`
  const gewaehltesFormat = formate.find(f => f.id === formatId) || null

  const kaufen = async () => {
    setFehler('')
    if (!auswahl) { setFehler('Bitte zuerst ein Motiv auswählen.'); return }
    if (!formatId) { setFehler('Bitte ein Format auswählen.'); return }
    if (!name.trim()) { setFehler('Bitte einen Namen eingeben – er erscheint im Bild.'); return }
    setLaedt(true)
    try {
      const res = await fetch(`${FN}/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ motifId: auswahl, formatId, name: name.trim(), text: text.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unbekannter Fehler')
      window.location.href = data.url
    } catch (e) {
      setFehler((e as Error).message)
      setLaedt(false)
    }
  }

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> mdw&acute;s Empfehlung
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            Dein persönliches <span className="text-cyan-400">„…des Jahres“</span>-Poster
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Motiv auswählen, Format wählen, Name und Wunschtext eingeben – nach der Bezahlung steht dein
            persönliches Poster sofort zum Download bereit.
          </p>
          <p className="text-white/40 text-xs mt-3">
            Tipp: Auf ein Bild tippen zeigt das Motiv groß.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {motive.map(m => (
            <div
              key={m.id}
              className={`rounded-xl overflow-hidden border-2 transition-all bg-white/5 ${
                auswahl === m.id ? 'border-cyan-400 shadow-lg shadow-cyan-500/20' : 'border-white/10'
              }`}
            >
              {/* Ganzes Bild oeffnet die Vergroesserung – grosses, eindeutiges Klickziel */}
              <button
                type="button"
                onClick={() => setZoom(m)}
                aria-label={`${m.titel} groß ansehen`}
                className="group relative block w-full cursor-zoom-in"
              >
                <img
                  src={bildPfad(m)}
                  alt={m.titel}
                  className="w-full aspect-[9/16] object-cover"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/35 transition-colors">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" /> Groß ansehen
                  </span>
                </span>
                <span className="absolute top-2 right-2 p-2 rounded-full bg-black/60 text-white pointer-events-none">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </button>

              <div className={`px-3 pt-2 text-sm font-medium ${auswahl === m.id ? 'text-cyan-400' : 'text-white/80'}`}>
                {m.titel}
              </div>

              <button
                type="button"
                onClick={() => setAuswahl(m.id)}
                className={`mx-3 my-3 block rounded-lg py-2 px-2 text-xs font-semibold transition-colors w-[calc(100%-1.5rem)] ${
                  auswahl === m.id
                    ? 'bg-cyan-500 text-black'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {auswahl === m.id ? 'Ausgewählt' : 'Dieses Motiv wählen'}
              </button>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto glass rounded-2xl border border-cyan-500/10 p-6 sm:p-8">
          <label className="block text-white font-medium mb-1">Format</label>
          <p className="text-white/50 text-xs mb-3">
            Druckformate mit 300 dpi – per KI hochgerechnet, also auch groß gedruckt scharf.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {formate.map(f => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormatId(f.id)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  formatId === f.id
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <span className={`block text-sm font-medium ${formatId === f.id ? 'text-cyan-400' : 'text-white/85'}`}>
                  {f.label}
                </span>
                <span className="block text-white/40 text-[11px] mt-0.5">{f.hinweis}</span>
                <span className="block text-white/70 text-xs mt-1">{preis(f.cents)}</span>
              </button>
            ))}
          </div>

          <label className="block text-white font-medium mb-2">Name <span className="text-white/50 font-normal">(erscheint im Bild)</span></label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={40}
            placeholder="z. B. Emma"
            className="w-full mb-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50"
          />
          <label className="block text-white font-medium mb-2">
            Dein persönlicher Text <span className="text-white/50 font-normal">(optional – sonst nehmen wir den Spruch des Motivs)</span>
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={70}
            rows={3}
            placeholder="z. B. max. 10 Worte"
            className="w-full mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50"
          />
          <button onClick={kaufen} disabled={laedt} className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
            <ShoppingCart className="w-4 h-4" />
            {laedt
              ? 'Einen Moment …'
              : gewaehltesFormat
                ? `Jetzt kaufen – ${preis(gewaehltesFormat.cents)}`
                : 'Jetzt kaufen'}
          </button>
          {fehler && <p className="mt-4 text-red-400 text-sm">{fehler}</p>}
          <p className="mt-4 text-white/40 text-xs text-center">
            Sichere Bezahlung über Stripe · Dein Poster wird nach der Zahlung mit deinem Text erstellt und steht kurz darauf bereit
          </p>
        </div>
      </div>

      {zoom && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoom(null)}
        >
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => setZoom(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center gap-3" onClick={e => e.stopPropagation()}>
            <img
              src={bildPfad(zoom)}
              alt={zoom.titel}
              className="max-h-[82vh] max-w-full w-auto rounded-xl shadow-2xl"
            />
            <p className="text-white/80 text-sm">{zoom.titel}</p>
          </div>
        </div>
      )}
    </main>
  )
}
