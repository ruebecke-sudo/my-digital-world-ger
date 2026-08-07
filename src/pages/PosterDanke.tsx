import { useEffect, useState } from 'react'
import { CheckCircle2, Download, Loader2 } from 'lucide-react'

const FN = '/.netlify/functions'

export default function PosterDanke() {
  const [status, setStatus] = useState<'warten' | 'fertig' | 'fehler'>('warten')
  const params = new URLSearchParams(window.location.search)
  const order = params.get('order')
  const token = params.get('token')

  useEffect(() => {
    let aktiv = true
    const pruefen = async () => {
      try {
        const res = await fetch(`${FN}/order-status?id=${order}&token=${token}`)
        const data = await res.json()
        if (!aktiv) return
        if (data.status === 'done') { setStatus('fertig'); return }
        if (data.status === 'error') { setStatus('fehler'); return }
      } catch { /* weiter versuchen */ }
      if (aktiv) setTimeout(pruefen, 3000)
    }
    pruefen()
    return () => { aktiv = false }
  }, [order, token])

  return (
    <main className="pt-28 pb-20 min-h-screen">
      <div className="max-w-lg mx-auto px-4 text-center glass rounded-2xl border border-cyan-500/10 p-10 mt-10">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-white mb-3">Zahlung erfolgreich!</h1>

        {status === 'warten' && (
          <>
            <p className="text-white/60 mb-6">
              Dein persönliches Poster wird gerade erstellt.<br />
              Das dauert ca. 30–60 Sekunden – bitte lass die Seite geöffnet.
            </p>
            <Loader2 className="w-8 h-8 text-cyan-400 mx-auto animate-spin" />
          </>
        )}

        {status === 'fertig' && (
          <>
            <p className="text-white/60 mb-6">Dein Poster ist fertig!</p>
            <a href={`${FN}/download?id=${order}&token=${token}`} className="btn-primary inline-flex items-center gap-2">
              <Download className="w-4 h-4" /> Poster herunterladen
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
    </main>
  )
}
