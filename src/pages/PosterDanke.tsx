import { useEffect, useRef, useState } from 'react'

const FN = '/.netlify/functions'

export default function PosterDanke() {
  const params = new URLSearchParams(window.location.search)
  const orderId = params.get('order')
  const token = params.get('token')

  const [status, setStatus] = useState('pending')
  const [progress, setProgress] = useState(4)
  const [vorschau, setVorschau] = useState<string | null>(null)
  const [popup, setPopup] = useState(false)
  const [laedt, setLaedt] = useState(false)
  const [dlFehler, setDlFehler] = useState('')
  const timer = useRef<any>(null)

  useEffect(() => {
    if (!orderId || !token) return

    const stop = () => { if (timer.current) { clearInterval(timer.current); timer.current = null } }

    const poll = async () => {
      try {
        const res = await fetch(`${FN}/order-status?id=${orderId}&token=${token}`)
        const data = await res.json()
        if (!res.ok) return

        setStatus(data.status)

        if (data.status === 'pending') {
          setProgress(p => Math.min(p + Math.random() * 3, 25))
        } else if (data.status === 'paid') {
          setProgress(p => Math.min(p + Math.random() * 3, 40))
        } else if (data.status === 'generating') {
          setProgress(p => Math.min(p + Math.random() * 2, 95))
        } else if (data.status === 'done') {
          setProgress(100)
          setVorschau(`${FN}/image-preview?id=${orderId}&token=${token}`)
          stop()
        } else if (data.status === 'error') {
          stop()
        }
      } catch {
        // Netzwerkaussetzer beim naechsten Durchlauf erneut versuchen
      }
    }

    poll()
    timer.current = setInterval(poll, 3000)
    return stop
  }, [orderId, token])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPopup(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Datei per fetch holen und als Blob speichern. Ein einfacher <a>-Link wird in
  // der Single-Page-App vom Router abgefangen und loest keine Anfrage aus.
  const herunterladen = async () => {
    setDlFehler('')
    setLaedt(true)
    try {
      const res = await fetch(`${FN}/download?id=${orderId}&token=${token}`)
      if (!res.ok) {
        let meldung = 'Der Download hat nicht geklappt. Bitte kurz warten und erneut versuchen.'
        try {
          const j = await res.json()
          if (j && j.error) meldung = j.error
        } catch { /* keine JSON-Antwort */ }
        throw new Error(meldung)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `mdw-poster-${orderId}.jpg`
      document.body.appendChild(a)
      a.click()
      a.remove()
      setTimeout(() => URL.revokeObjectURL(url), 10000)
    } catch (e) {
      setDlFehler((e as Error).message)
    } finally {
      setLaedt(false)
    }
  }

  if (!orderId || !token) {
    return (
      <main className="pt-28 pb-20 min-h-screen">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-white mb-3">Bestellung nicht gefunden</h1>
          <p className="text-white/60">
            Der Link ist unvollständig. Bitte rufe die Seite über den Link aus der Bestätigung auf.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="glass rounded-2xl border border-cyan-500/10 p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/60 flex items-center justify-center">
              <svg className="w-8 h-8 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold text-white text-center mb-2">
            Zahlung erfolgreich
          </h1>
          <p className="text-white/60 text-center mb-6">
            Dein Poster wird jetzt erstellt und in Druckqualität hochgerechnet. Das dauert ein bis
            zwei Minuten – bitte lass die Seite offen.
          </p>

          {status !== 'error' && (
            <div className="mb-6">
              <div className="relative w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-white/50 mt-2 text-center">
                {status === 'done'
                  ? 'Fertig – dein Poster wartet auf dich.'
                  : `${Math.round(progress)} % – die KI malt gerade dein Poster …`}
              </p>
            </div>
          )}

          {vorschau && (
            <div
              className="mb-6 rounded-xl overflow-hidden border border-white/10 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setPopup(true)}
              title="Klicken zum Vergrößern"
            >
              <img src={vorschau} alt="Vorschau deines Posters" className="w-full h-auto" />
            </div>
          )}

          {status === 'done' && (
            <>
              <button
                type="button"
                onClick={herunterladen}
                disabled={laedt}
                className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {laedt ? 'Datei wird geholt …' : 'Poster herunterladen'}
              </button>

              {dlFehler && (
                <p className="mt-3 text-red-400 text-sm text-center">{dlFehler}</p>
              )}

              <p className="mt-3 text-white/40 text-xs text-center">
                Die Vorschau zeigt unser Logo – deine Download-Datei ist ohne Logo und in voller
                Druckauflösung.{' '}
                <a
                  href={`${FN}/download?id=${orderId}&token=${token}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white/70"
                >
                  Falls der Button nicht reagiert, hier direkt öffnen.
                </a>
              </p>
            </>
          )}

          {status === 'error' && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-300 text-sm">
              Bei der Erstellung ist etwas schiefgegangen. Deine Zahlung ist erfasst – schreib uns
              kurz an info@my-digital-world.de mit dieser Bestellnummer, dann kümmern wir uns
              sofort darum:
              <span className="block mt-2 font-mono text-xs text-red-200 break-all">{orderId}</span>
            </div>
          )}
        </div>
      </div>

      {popup && vorschau && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPopup(false)}
        >
          <button
            type="button"
            aria-label="Schließen"
            onClick={() => setPopup(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            src={vorschau}
            alt="Vorschau deines Posters"
            className="max-h-[85vh] max-w-full w-auto rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}
