import { useState } from 'react'
import { MessageCircle, Mail, Globe, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Kontakt() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const interessen = isDE
    ? ['Dig. Akademie', 'Soc. Media Marketing', 'Dig. Transformation', 'Barrierefreiheit', 'Dig. Präsentation', 'Tipps & Empfehlungen | Thema?', 'KI Agenten', 'Sonstiges']
    : ['Dig. Academy', 'Soc. Media Marketing', 'Dig. Transformation', 'Accessibility', 'Dig. Presentation', 'Tips & Recommendations | Topic?', 'AI Agents', 'Other']

  const [selected, setSelected] = useState<string[]>([])
  const [form, setForm] = useState({ vorname: '', nachname: '', email: '', tel: '', domain: '', nachricht: '', einwilligung: false })
  const [sent, setSent] = useState(false)

  const toggle = (item: string) => setSelected(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.einwilligung) return
    const subject = encodeURIComponent(`${isDE ? 'Kontaktanfrage von' : 'Contact request from'} ${form.vorname} ${form.nachname}`.trim())
    const body = encodeURIComponent([
      `${isDE ? 'Name' : 'Name'}: ${`${form.vorname} ${form.nachname}`.trim() || '–'}`,
      `E-Mail: ${form.email || '–'}`,
      `${isDE ? 'Telefon' : 'Phone'}: ${form.tel || '–'}`,
      `Domain: ${form.domain || '–'}`,
      '',
      `${isDE ? 'Interesse' : 'Interest'}: ${selected.length > 0 ? selected.join(', ') : '–'}`,
      '',
      `${isDE ? 'Nachricht' : 'Message'}:`,
      form.nachricht || '–',
    ].join('\n'))
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
            {isDE ? 'Kontakt' : 'Contact'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            {isDE ? <>Lasse es mich<br /><span className="gradient-text">wissen</span></> : <>Let me<br /><span className="gradient-text">know</span></>}
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            {isDE ? 'My digital world: Themen zu digitaler Transformation, KI und vieles mehr……..' : 'My digital world: topics on digital transformation, AI and much more……..'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <a href="https://wa.me/4915906146147" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 glass rounded-xl border border-white/5 hover:border-cyan-500/20 p-4 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">WhatsApp</p>
                <p className="text-white text-base font-medium group-hover:text-cyan-400 transition-colors">+49 15906146147</p>
              </div>
            </a>
            <a href="mailto:info@my-digital-world.de" className="flex items-center gap-4 glass rounded-xl border border-white/5 hover:border-cyan-500/20 p-4 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">E-Mail</p>
                <p className="text-white text-base font-medium group-hover:text-cyan-400 transition-colors">info@my-digital-world.de</p>
              </div>
            </a>
            <a href="https://www.my-digital-world.de" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 glass rounded-xl border border-white/5 hover:border-cyan-500/20 p-4 transition-all group">
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
                {isDE ? <>Deine Nachricht an <span className="text-cyan-400">My digital world</span></> : <>Your message to <span className="text-cyan-400">My digital world</span></>}
              </h2>
              <p className="text-cyan-400 text-sm mb-6">
                {isDE
                  ? 'Das Formular öffnet Ihr E-Mail-Programm mit allen Angaben vorausgefüllt – Sie müssen nur noch auf Senden klicken.'
                  : 'The form opens your email program with all details pre-filled — you just need to click Send.'
                }
              </p>

              {sent && (
                <div className="flex items-start gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-400 font-medium text-base">{isDE ? 'E-Mail-Programm wurde geöffnet' : 'Email program opened'}</p>
                    <p className="text-white/60 text-sm mt-1">
                      {isDE ? 'Bitte senden Sie die vorausgefüllte E-Mail ab. Wir melden uns so bald wie möglich bei Ihnen.' : 'Please send the pre-filled email. We will get back to you as soon as possible.'}
                    </p>
                  </div>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-white/75 text-base mb-3">{isDE ? 'Ich interessiere mich für:' : 'I am interested in:'}</label>
                  <div className="grid grid-cols-2 gap-2">
                    {interessen.map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer group">
                        <div onClick={() => toggle(item)} className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all cursor-pointer ${selected.includes(item) ? 'bg-cyan-500 border-cyan-500' : 'border-white/20 hover:border-cyan-500/50'}`}>
                          {selected.includes(item) && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span onClick={() => toggle(item)} className={`text-sm transition-colors ${selected.includes(item) ? 'text-white' : 'text-white/70 group-hover:text-white/90'}`}>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/75 text-sm mb-1">{isDE ? 'Meine Domain lautet:' : 'My domain is:'}</label>
                  <p className="text-white/55 text-sm mb-2">{isDE ? 'Bitte hier den Domainnamen eintragen:' : 'Please enter the domain name here:'}</p>
                  <input type="text" value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} placeholder="www.meine-webseite.de" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/75 text-sm mb-1">{isDE ? 'Vorname *' : 'First name *'}</label>
                    <input type="text" value={form.vorname} onChange={e => setForm({ ...form, vorname: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-white/75 text-sm mb-1">{isDE ? 'Nachname' : 'Last name'}</label>
                    <input type="text" value={form.nachname} onChange={e => setForm({ ...form, nachname: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-white/75 text-sm mb-1">{isDE ? 'E-Mail-Adresse *' : 'Email address *'}</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>

                <div>
                  <label className="block text-white/75 text-sm mb-1">{isDE ? 'Tel. Nr.' : 'Phone no.'}</label>
                  <p className="text-white/55 text-sm mb-1">{isDE ? 'Wir rufen gerne zurück' : 'We are happy to call back'}</p>
                  <input type="tel" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors" />
                </div>

                <div>
                  <label className="block text-white/75 text-sm mb-1">{isDE ? 'Kommentar oder Nachricht' : 'Comment or message'}</label>
                  <textarea rows={4} value={form.nachricht} onChange={e => setForm({ ...form, nachricht: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-base placeholder-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" />
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div onClick={() => setForm({ ...form, einwilligung: !form.einwilligung })} className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-all cursor-pointer ${form.einwilligung ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'}`}>
                      {form.einwilligung && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-white/60 text-sm leading-relaxed">
                      {isDE
                        ? 'Ich stimme der Verarbeitung meiner Daten zur Kontaktaufnahme zu. Die Daten werden nicht an Dritte weitergegeben.'
                        : 'I agree to the processing of my data for contact purposes. The data will not be passed on to third parties.'
                      }
                    </span>
                  </label>
                </div>

                <button type="submit" disabled={!form.einwilligung} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
                  <Mail className="w-4 h-4" />
                  {isDE ? 'Nachricht senden' : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
