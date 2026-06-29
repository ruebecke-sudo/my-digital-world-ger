import { Link } from 'wouter'
import { ArrowRight, CheckCircle, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Webseiten() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const steps = isDE
    ? [
        { nr: '1', titel: 'Sende uns deine Daten zu', text: 'Im 1. Schritt nach der Kontaktaufnahme sendest du uns deine Inhalte zu, die verwendet werden sollen. Das können dein Logo, Texte und/oder Bilder sein.', link: 'info@my-digital-world.de' },
        { nr: '2', titel: 'Erstellung der Webseite', text: 'Im 2. Schritt erfolgt die Erstellung der Webseite mit den Inhalten. Die Webseiten sind modern, funktionell, responsive und beinhalten alle rechtlich vorgeschriebenen Seiten. (Impressum, Datenschutzerklärung)' },
        { nr: '3', titel: 'Veröffentlichung der Seite', text: 'Im 3. und letzten Schritt wird die Webseite in deinem Hostingpaket veröffentlicht. Dafür benötigen wir den Zugang zum Hoster mit den Benutzerdaten und deinem Passwort.' },
        { nr: '4', titel: 'Revision', text: 'Nach der Veröffentlichung kann noch eine Revision durchgeführt werden, bei der alle Korrekturen mitgeteilt werden müssen.' },
      ]
    : [
        { nr: '1', titel: 'Send us your data', text: 'In the 1st step after getting in touch, you send us your content to be used — this can be your logo, texts and/or images.', link: 'info@my-digital-world.de' },
        { nr: '2', titel: 'Website creation', text: 'In the 2nd step, the website is created with your content. The websites are modern, functional, responsive and include all legally required pages (imprint, privacy policy).' },
        { nr: '3', titel: 'Publication of the site', text: 'In the 3rd and final step, the website is published on your hosting package. For this we need access to the host with your login credentials and password.' },
        { nr: '4', titel: 'Revision', text: 'After publication, a revision can be carried out in which all corrections must be communicated.' },
      ]

  const leistungsumfang = isDE
    ? ['Individuelles Design nach Ihren Vorgaben', 'Vollständig mobiloptimiert (Responsive)', 'Impressum & Datenschutzerklärung', 'Kontaktformular', 'SEO-Grundoptimierung', 'Moderne Webtechnologien', 'Schnelle Ladezeiten', 'Veröffentlichung im Hostingpaket']
    : ['Individual design according to your specifications', 'Fully mobile-optimized (Responsive)', 'Imprint & Privacy policy', 'Contact form', 'Basic SEO optimization', 'Modern web technologies', 'Fast loading times', 'Publication on your hosting package']

  return (
    <div className="pt-24 pb-32">
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            {isDE ? 'Leistungen' : 'Services'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            {isDE ? <>Profitiere jetzt!<br /><span className="gradient-text">Aktionspreis</span></> : <>Benefit now!<br /><span className="gradient-text">Special price</span></>}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        <div className="glass rounded-2xl border border-cyan-500/10 p-8 text-center">
          <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-4">
            {isDE
              ? <>Bist du <span className="text-cyan-400">Unternehmer, selbständig, Gewerbetreibender</span> oder in einem Verein?</>
              : <>Are you an <span className="text-cyan-400">entrepreneur, self-employed, tradesperson</span> or part of an association?</>
            }
          </h2>
          <p className="text-white/75 text-lg mb-6">
            {isDE ? 'dann profitiere jetzt von unserem Aktionspreis für Webseiten' : 'then benefit now from our special price for websites'}
          </p>
          <div className="inline-block">
            <div className="text-6xl font-display font-black text-cyan-400 mb-1">350,- €</div>
            <div className="text-white/70 text-base">{isDE ? 'Für eine komplette, moderne, funktionelle Webseite' : 'For a complete, modern, functional website'}</div>
            <div className="text-white/55 text-sm mt-1">{isDE ? 'Alle Preise sind netto, zzgl. MwSt.' : 'All prices are net, excl. VAT.'}</div>
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/5 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-4">
            {isDE ? 'Eine moderne, funktionelle Webseite' : 'A modern, functional website'}
          </h2>
          <p className="text-white/75 text-base mb-4">
            {isDE ? 'Verwende dein Logo, dein CI mit Fonts und Farben' : 'Use your logo, your CI with fonts and colors'}
          </p>
          <div className="space-y-6 mt-8">
            {steps.map((step) => (
              <div key={step.nr} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 text-cyan-400 font-bold text-base">
                  {step.nr}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-base mb-1">{step.titel}</h3>
                  <p className="text-white/70 text-base leading-relaxed">
                    {step.text}
                    {step.link && (
                      <> <a href={`mailto:${step.link}`} className="text-cyan-400 hover:text-cyan-300">{step.link}</a></>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/5 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-6">{isDE ? 'Leistungsumfang' : 'Scope of services'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {leistungsumfang.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-white/70 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/kontakt">
            <button className="btn-primary flex items-center gap-2 mx-auto text-base">
              <Mail className="w-5 h-5" />
              {isDE ? 'Jetzt anfragen' : 'Enquire now'} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
