import { useEffect, useState } from 'react'
import { CheckCircle2, Download, X } from 'lucide-react'

const FN = '/.netlify/functions'

export default function PosterDanke() {
  const [status, setStatus] = useState<'warten' | 'fertig' | 'fehler'>('warten')
  const [fortschritt, setFortschritt] = useState(4)
  const [popupOpen, setPopupOpen] = useState(false)
  const params = new URLSearchParams(window.location.search)
  const order = params.get('order')
  const token = params.get('token')
  const bildUrl = `${FN}/download?id=${order}&token=${token}`

  useEffect(() => {
    if (status !== 'warten') return
    const iv = setInterval(() => {
      setFortschritt(f => (f < 95 ? f + (95 - f) * 0.04 : f))
    }, 500)
    return () => clearInterval(iv)
  }, [status])

  useEffect(() => {
    let aktiv = true
    const pruefen = async () => {
      try {
        const res = await fetch(`${FN}/order-status?id=${order}&token=${token}`)
        const data = await res.json()
        if (!aktiv) return
        if (data.status === 'done') { setFortschritt(100); setStatus('fertig'); return }
        if (data.status === 'error') { setStatus('fehler'); return }
      } catch { /* weiter versuchen */ }
      if (aktiv) setTimeout(pruefen, 3000)
    }
    pruefen()
    return () => { aktiv = false }
  }, [order, token])

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-xl mx-auto px-4 text-center glass rounded-2xl border border-cyan-500/10 p-8 sm:p-10 mt-10">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-white mb-3">Zahlung erfolgreich!</h1>

        {status === 'warten' && (
          <>
            <p className="text-white/60 mb-6">
              Dein persönliches Poster wird gerade erstellt.<br />
              Das dauert ca. 30–60 Sekunden – bitte lass die Seite geöffnet.
            </p>
            <div className="w-full h-4 rounded-full bg-white/10 border border-white/10 overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-500 ease-out"
                style={{ width: `${fortschritt}%` }}
              />
            </div>
            <p className="text-white/50 text-sm">{Math.round(fortschritt)} % – die KI malt gerade dein Poster …</p>
          </>
        )}

        {status === 'fertig' && (
          <>
            <p className="text-white/60 mb-5">Dein Poster ist fertig – hier die Vorschau:</p>
            <div 
              className="relative inline-block mb-6 cursor-pointer group"
              onClick={() => setPopupOpen(true)}
            >
              <img
                src={`${bildUrl}&disposition=inline`}
                alt="Vorschau deines persönlichen Posters"
                className="rounded-xl border border-white/15 shadow-2xl shadow-black/40 max-h-[70vh] w-auto mx-auto group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-black/40">
                <span className="text-white text-sm font-medium">Klicken für Vollbild</span>
              </div>
            </div>
            <a href={bildUrl} className="btn-primary inline-flex items-center gap-2">
              <Download className="w-4 h-4" /> Poster in voller Auflösung herunterladen
            </a>
          </>
        )}

        {status === 'fehler' && (
          <p className="text-red-400">
            Bei der Erstellung ist leider etwas schiefgelaufen. Deine Zahlung ist eingegangen –
            bitte melde dich über die Kontaktseite, wir kümmern uns sofort darum.
          </p>
        )}
      </div>

      {/* Popup Modal */}
      {popupOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPopupOpen(false)}
        >
          <button
            onClick={() => setPopupOpen(false)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 rounded-full p-3 text-white transition-all z-51"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={`${bildUrl}&disposition=inline`}
            alt="Dein Poster in Originalgröße"
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}
