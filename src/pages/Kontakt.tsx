import { useState } from 'react'
import { MessageCircle, Mail, Globe, CheckCircle } from 'lucide-react'

const interessen = [
  'Dig. Akademie',
  'Soc. Media Marketing',
  'Dig. Transformation',
  'Barrierefreiheit',
  'Dig. Präsentation',
  'Tipps & Empfehlungen | Thema?',
  'KI Agenten',
  'Sonstiges',
]

export default function Kontakt() {
  const [selected, setSelected] = useState<string[]>([])
  const [form, setForm] = useState({
    vorname: '',
    nachname: '',
    email: '',
    tel: '',
    domain: '',
    nachricht: '',
    einwilligung: false,
  })
  const [sent, setSent] = useState(false)

  const toggle = (item: string) => {
    setSelected(prev =>
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.einwilligung) return

    const subject = encodeURIComponent(
      `Kontaktanfrage von ${form.vorname} ${form.nachname}`.trim()
    )

    const body = encodeURIComponent(
      [
        `Name: ${`${form.vorname} ${form.nachname}`.trim() || '–'}`,
        `E-Mail: ${form.email || '–'}`,
        `Telefon: ${form.tel || '–'}`,
        `Domain: ${form.domain || '–'}`,
        '',
        `Interesse: ${selected.length > 0 ? selected.join(', ') : '–'}`,
        '',
        `Nachricht:`,
        form.nachricht || '–',
      ].join('\n')
    )

    window.location.href = `mailto:info@my-digital-world.de?subject=${subject}&body=${body}`

    setSent(true)
    setForm({ vorname: '', nachname: '', email: '', tel: '', domain: '', nachricht: '', einwilligung: false })
    setSelected([])
  }

  return (
    <div className="pt-24 pb-32">
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            Kontakt
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            Lasse es mich<br />
            <span className="gradient-text">wissen</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            My digital world: Themen zu digitaler Transformation, KI und vieles mehr……..
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <a
              href="https://wa.me/4915906146147"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 glass rounded-xl border border-white/5 hover:border-cyan-500/20 p-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">WhatsApp</p>
                <p className="text-white text-base font-medium group-hover:text-cyan-400 transition-colors">+49 15906146147</p>
              </div>
            </a>

            <a
              href="mailto:info@my-digital-world.de"
              className="flex items-center gap-4 glass rounded-xl border border-white/5 hover:border-cyan-500/20 p-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">E-Mail</p>
                <p className="text-white text-base font-medium group-hover:text-cyan-400 transition-colors">info@my-digital-world.de</p>
              </div>
            </a>

            <a
              href="https://www.my-digital-world.de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 glass rounded-xl border border-white/5 hover:border-cyan-500/20 p-4 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Website</p>
                <p className="text-white text-base font-medium group-hover:text-cyan-400 transition-colors">www.my-digital-world.de</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl border border-white/5 p-8">
              <h2 className="font-display font-bold text-white text-lg mb-2">
                Deine Nachricht an <span className="text-cyan-400">My digital world</span>
              </h2>
              <p className="text-cyan-400 text-sm mb-6">
                Das Formular öffnet Ihr E-Mail-Programm mit allen Angaben vorausgefüllt – Sie müssen nur noch auf Senden klicken.
              </p>

              {/* Success state */}
              {sent && (
                <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-400 font-medium text-base">E-Mail-Programm wurde geöffnet</p>
                    <p className="text-white/60 text-sm mt-1">
                      Bitte senden Sie die vorausgefüllte E-Mail ab. Wir melden uns so bald wie möglich bei Ihnen.
                    </p>
                  </div>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Interessen */}
                <div>
                  <label className="block text-white/75 text-base mb-3">Ich interessiere mich für:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {interessen.map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer group">
                        <div
                          onClick={() => toggle(item)}
                          className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${
                            selected.includes(item)
                              ? 'bg-cyan-500 border-cyan-500'
                              : 'border-white/20 hover:border-cyan-500/50'
                          }`}
                        >
                          {selected.includes(item) && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span
                          onClick={() => toggle(item)}
                          className={`text-sm transition-colors ${selected.includes(item) ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}
                        >
                          {item}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Domain */}
                <div>
                  <label className="block text-white/75 text-sm mb-1">Meine Domain lautet:</label>
                  <p className="text-white/55 text-sm mb-2">Bitte hier den Domainnamen eintragen:</p>
                  <input
                    type="text"
                    value={form.domain}
                    onChange={e => setForm({ ...form, domain: e.target.value })}
                    placeholder="www.meine-webseite.de"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/75 text-sm mb-1">Vorname *</label>
                    <input
                      type="text"
                      value={form.vorname}
                      onChange={e => setForm({ ...form, vorname: e.target.value })}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/75 text-sm mb-1">Nachname</label>
                    <input
                      type="text"
                      value={form.nachname}
                      onChange={e => setForm({ ...form, nachname: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>

                {/* E-Mail */}
                <div>
                  <label className="block text-white/75 text-sm mb-1">E-Mail-Adresse *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                {/* Tel */}
                <div>
                  <label className="block text-white/75 text-sm mb-1">Tel. Nr.</label>
                  <p className="text-white/55 text-sm mb-1">Wir rufen gerne zurück</p>
                  <input
                    type="tel"
                    value={form.tel}
                    onChange={e => setForm({ ...form, tel: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/75 text-sm mb-1">Kommentar oder Nachricht</label>
                  <textarea
                    rows={4}
                    value={form.nachricht}
                    onChange={e => setForm({ ...form, nachricht: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                  />
                </div>

                {/* Einwilligung */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      onClick={() => setForm({ ...form, einwilligung: !form.einwilligung })}
                      className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all cursor-pointer ${
                        form.einwilligung ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'
                      }`}
                    >
                      {form.einwilligung && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white/60 text-sm leading-relaxed">
                      Ich stimme der Verarbeitung meiner Daten zur Kontaktaufnahme zu. Die Daten werden nicht an Dritte weitergegeben.
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!form.einwilligung}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Mail className="w-4 h-4" />
                  Nachricht senden
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
