import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'wouter'

const anwendungsfaelle = [
  'Unternehmensvorstellungen und Firmenpräsentationen',
  'Produkt- und Dienstleistungspräsentationen',
  'Investoren- und Bankengespräche',
  'Messen und Events',
  'Interne Schulungen und Mitarbeiterpräsentationen',
  'Immobilien-Exposés und Raumdarstellungen',
  'Social Media Kurzvideos und Reels',
  'Werbevideos und Image-Filme',
]

export default function Praesentationen() {
  return (
    <div className="pt-24 pb-32">
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            Leistungen
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            Digitale<br />
            <span className="gradient-text">Präsentationen</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Maßgeschneiderte Präsentationen, die wirken
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* Intro */}
        <div className="glass rounded-2xl border border-white/5 p-8">
          <p className="text-white/70 text-base leading-relaxed mb-6">
            Ich erstelle für Ihr Unternehmen digitale Präsentationen, die nicht nur informieren, sondern überzeugen. Dabei achte ich auf eine professionelle Gestaltung, abgestimmt auf Ihr Corporate Design und Ihre Zielgruppe.
          </p>
          <h3 className="font-display font-semibold text-white text-base mb-4">Ihre Vorteile auf einen Blick:</h3>
          <div className="space-y-3">
            {[
              'Klares, modernes Design im Einklang mit Ihrer Markenidentität',
              'Strukturierter Aufbau für maximale Verständlichkeit',
              'Einbindung von Grafiken, Videos, Animationen oder interaktiven Elementen',
              'Formatierung für verschiedene Einsatzzwecke: PowerPoint, PDF, Bildschirmpräsentation, Event-Slideshow u. v. m.',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Angebote */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              titel: 'Digitale Firmenpräsentationen',
              text: 'Multimediale Darstellung deines Unternehmens, Produkte, Dienstleistungen, Vision und Werte. Vorteile: ortsunabhängig verfügbar, kann leicht aktualisiert oder verbreitet werden.',
            },
            {
              titel: 'Soc. Media Kurzvideos',
              text: 'Kurze, meist unter einer Minute lange Videoclips, speziell für TikTok, Instagram Reels oder YouTube Shorts. Durch ihre kompakte Form und schnelle Verbreitung sind sie ein effektives Mittel für Marketing und Markenaufbau.',
            },
            {
              titel: 'Immobilien Präsentationen',
              text: 'Multimediale Darstellungen von Immobilien, die online über Webseiten, Exposés, oder Videos präsentiert werden. Ermöglichen potenziellen Käufern oder Mietern, sich ortsunabhängig einen umfassenden Eindruck zu verschaffen.',
            },
          ].map((angebot) => (
            <div key={angebot.titel} className="glass rounded-2xl border border-cyan-500/10 p-6">
              <h3 className="font-display font-bold text-white mb-3">{angebot.titel}</h3>
              <p className="text-white/70 text-base leading-relaxed">{angebot.text}</p>
              <div className="mt-4">
                <Link href="/kontakt">
                  <button className="text-cyan-400 text-base hover:text-cyan-300 transition-colors flex items-center gap-1">
                    Beispiel anfragen <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Für welche Anlässe */}
        <div className="glass rounded-2xl border border-white/5 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-2">Für welche Anlässe?</h2>
          <p className="text-white/70 text-base mb-6">
            Setzen Sie auf eine Präsentation, die Ihr Unternehmen professionell repräsentiert – visuell überzeugend, inhaltlich auf den Punkt.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {anwendungsfaelle.map((item) => (
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
              Jetzt anfragen <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
