import { useEffect, useState } from 'react'
import { Sparkles, ShoppingCart, ZoomIn, X, ImagePlus, Wand2 } from 'lucide-react'

type Motiv = {
  id: string
  titel: string
  bild?: string | null
  eigenesFoto?: string | null
}
type Format = { id: string; label: string; hinweis: string; cents: number }
const FN = '/.netlify/functions'

const preis = (cents: number) => (cents / 100).toFixed(2).replace('.', ',') + ' €'

// Das Foto wird schon im Browser verkleinert. Das haelt die Wartezeit kurz und
// bleibt sicher unter dem Groessenlimit der Function.
const verkleinern = (datei: File): Promise<string> =>
  new Promise((fertig, scheitern) => {
    const leser = new FileReader()
    leser.onerror = () => scheitern(new Error('Die Datei konnte nicht gelesen werden.'))
    leser.onload = () => {
      const bild = new Image()
      bild.onerror = () => scheitern(new Error('Das ist kein gültiges Bild.'))
      bild.onload = () => {
        const faktor = Math.min(1, 1600 / Math.max(bild.width, bild.height))
        const flaeche = document.createElement('canvas')
        flaeche.width = Math.max(1, Math.round(bild.width * faktor))
        flaeche.height = Math.max(1, Math.round(bild.height * faktor))
        const stift = flaeche.getContext('2d')
        if (!stift) { scheitern(new Error('Das Bild konnte nicht verarbeitet werden.')); return }
        stift.drawImage(bild, 0, 0, flaeche.width, flaeche.height)
        fertig(flaeche.toDataURL('image/jpeg', 0.9))
      }
      bild.src = String(leser.result)
    }
    leser.readAsDataURL(datei)
  })

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
  const [bezeichnung, setBezeichnung] = useState('')
  const [foto, setFoto] = useState('')
  const [fotoSchluessel, setFotoSchluessel] = useState('')
  const [fotoLaedt, setFotoLaedt] = useState(false)
  const [querformat, setQuerformat] = useState(false)

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
  const gewaehltesMotiv = motive.find(m => m.id === auswahl) || null
  const eigenesFoto = gewaehltesMotiv?.eigenesFoto || null

  const fotoWaehlen = async (datei?: File | null) => {
    if (!datei) return
    setFehler('')
    setFotoLaedt(true)
    try {
      const daten = await verkleinern(datei)
      const res = await fetch(`${FN}/foto-upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bild: daten }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error || 'Das Foto konnte nicht hochgeladen werden.')
      setFoto(daten)
      setFotoSchluessel(d.schluessel)
      setQuerformat(!d.hochformat)
    } catch (e) {
      setFehler((e as Error).message)
    } finally {
      setFotoLaedt(false)
    }
  }

  const kaufen = async () => {
    setFehler('')
    if (!auswahl) { setFehler('Bitte zuerst ein Motiv auswählen.'); return }
    if (!formatId) { setFehler('Bitte ein Format auswählen.'); return }
    if (eigenesFoto && !fotoSchluessel) { setFehler('Bitte zuerst dein Foto hochladen.'); return }
    if (!eigenesFoto && !name.trim()) {
      setFehler('Bitte einen Namen eingeben – er erscheint im Bild.')
      return
    }
    setLaedt(true)
    try {
      const res = await fetch(`${FN}/create-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          motifId: auswahl,
          formatId,
          name: name.trim(),
          text: text.trim(),
          bezeichnung: bezeichnung.trim(),
          fotoSchluessel,
        }),
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
            Motiv auswählen oder eigenes Foto hochladen, Format wählen, Name und Wunschtext
            eingeben – nach der Bezahlung steht dein
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
              {m.eigenesFoto ? (
                /* Eigenes Foto: die Dateiauswahl sitzt im Bildrahmen selbst -
                   dort sucht man sie, nicht unten im Formular. */
                <label
                  onClick={() => setAuswahl(m.id)}
                  className="group relative flex w-full aspect-[9/16] cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden border-b border-white/10 bg-gradient-to-b from-cyan-500/10 to-transparent px-4 text-center"
                >
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={e => { setAuswahl(m.id); fotoWaehlen(e.target.files?.[0]) }}
                  />
                  {foto && auswahl === m.id ? (
                    <>
                      <img src={foto} alt="Dein Foto" className="absolute inset-0 h-full w-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/70 py-2 text-xs text-white/90">
                        {fotoLaedt ? 'Wird geladen …' : 'Anderes Foto wählen'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300 group-hover:bg-cyan-500/25 transition-colors">
                        {m.eigenesFoto === 'pixar' ? <Wand2 className="w-7 h-7" /> : <ImagePlus className="w-7 h-7" />}
                      </span>
                      <span className="text-white/80 text-sm font-medium leading-snug">
                        {fotoLaedt
                          ? 'Wird geladen …'
                          : m.eigenesFoto === 'pixar'
                            ? 'Foto wählen – wird zur Comicfigur'
                            : 'Foto wählen – bleibt, wie es ist'}
                      </span>
                      <span className="text-white/40 text-[11px] leading-snug">
                        Bitte im Hochformat
                      </span>
                    </>
                  )}
                </label>
              ) : (
                /* Ganzes Bild oeffnet die Vergroesserung - grosses, eindeutiges Klickziel */
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

              )}

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

        <div id="bestellformular" className="max-w-xl mx-auto glass rounded-2xl border border-cyan-500/10 p-6 sm:p-8">
          {eigenesFoto && (
            <div className="mb-6">
              {foto ? (
                <p className="text-white/50 text-xs mb-4">
                  Dein Foto ist hochgeladen – oben in der Kachel zu sehen. Ein Tipp darauf tauscht es aus.
                </p>
              ) : (
                <p className="text-amber-300/90 text-xs mb-4">
                  Bitte oben in der Kachel dein Foto auswählen – am besten im Hochformat, etwa 9:16
                  wie ein Handyfoto. Nur Fotos hochladen, an denen du die Rechte hast.
                </p>
              )}

              {foto && querformat && (
                <p className="mb-4 text-amber-300/90 text-xs">
                  Dein Foto ist im Querformat. Wir schneiden es mittig auf Hochformat zu – ein
                  Hochformat-Foto sieht deutlich besser aus.
                </p>
              )}

              <label className="block text-white font-medium mb-2">
                Bezeichnung <span className="text-white/50 font-normal">(optional – wird zur Überschrift)</span>
              </label>
              <input
                value={bezeichnung}
                onChange={e => setBezeichnung(e.target.value)}
                maxLength={40}
                placeholder="z. B. Grillmeister"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50"
              />
              <p className="text-white/40 text-xs mt-2">
                Nur das Wort selbst, ohne „des Jahres“ – das setzen wir darunter. Aus
                „Grillmeister“ wird also „Hallo, ich bin der Grillmeister – DES JAHRES.“
                Lässt du alle Felder leer, bekommst du dein Foto ganz ohne Schrift.
              </p>
            </div>
          )}


          {/* Die Formatauswahl bekommt eine eigene, leicht abgesetzte Flaeche -
              so sieht man auf einen Blick, dass hier eine Entscheidung ansteht. */}
          <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.07] p-4 sm:p-5">
            <label className="block text-white font-medium mb-1">Format</label>
            <p className="text-white/50 text-xs mb-3">
              Druckformate mit 300 dpi – per KI hochgerechnet, also auch groß gedruckt scharf.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
          </div>

          <label className="block text-white font-medium mb-2">
            Name <span className="text-white/50 font-normal">
              {eigenesFoto ? '(optional – erscheint im Bild)' : '(erscheint im Bild)'}
            </span>
          </label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={40}
            placeholder="z. B. Emma"
            className="w-full mb-5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50"
          />
          <label className="block text-white font-medium mb-2">
            Dein persönlicher Text <span className="text-white/50 font-normal">
              {eigenesFoto
                ? '(optional – ohne Eingabe bleibt das Foto ohne Schrift)'
                : '(optional – sonst nehmen wir den Spruch des Motivs)'}
            </span>
          </label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength={70}
            rows={3}
            placeholder="z. B. max. 10 Worte"
            className="w-full mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50"
          />
          <button onClick={kaufen} disabled={laedt || fotoLaedt} className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
            <ShoppingCart className="w-4 h-4" />
            {laedt
              ? 'Einen Moment …'
              : gewaehltesFormat
                ? `Jetzt kaufen – ${preis(gewaehltesFormat.cents)}`
                : 'Jetzt kaufen'}
          </button>
          {fehler && <p className="mt-4 text-red-400 text-sm">{fehler}</p>}
          <p className="mt-4 text-white/40 text-xs text-center">
            {eigenesFoto === 'pixar'
              ? 'Sichere Bezahlung über Stripe · Die Verwandlung deines Fotos dauert ein bis zwei Minuten'
              : 'Sichere Bezahlung über Stripe · Dein Poster wird nach der Zahlung mit deinem Text erstellt und steht kurz darauf bereit'}
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
              className="max-h-[72vh] max-w-full w-auto rounded-xl shadow-2xl"
            />
            <p className="text-white/80 text-sm">{zoom.titel}</p>
            {/* Direkt aus der Vergroesserung heraus bestellen - niemand soll
                erst zurueckblaettern muessen, um das Motiv zu waehlen. */}
            <button
              type="button"
              onClick={() => {
                setAuswahl(zoom.id)
                setZoom(null)
                setTimeout(
                  () => document.getElementById('bestellformular')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                  60,
                )
              }}
              className="btn-primary inline-flex items-center justify-center gap-2 px-6"
            >
              <ShoppingCart className="w-4 h-4" />
              Dieses Motiv wählen
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
