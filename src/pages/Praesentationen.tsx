import { ArrowRight, CheckCircle, ExternalLink, Sparkles, Play, Monitor } from 'lucide-react'
import { Link } from 'wouter'
import { useLanguage } from '../context/LanguageContext'

export default function Praesentationen() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const anwendungsfaelle = isDE
    ? [
        'Unternehmensvorstellungen und Firmenpräsentationen',
        'Produkt- und Dienstleistungspräsentationen',
        'Investoren- und Bankengespräche',
        'Messen und Events',
        'Interne Schulungen und Mitarbeiterpräsentationen',
        'Immobilien-Exposés und Raumdarstellungen',
        'Social Media Kurzvideos und Reels',
        'Werbevideos und Image-Filme',
      ]
    : [
        'Company introductions and corporate presentations',
        'Product and service presentations',
        'Investor and bank meetings',
        'Trade fairs and events',
        'Internal training and employee presentations',
        'Real estate exposés and room visualizations',
        'Social media short videos and reels',
        'Promotional videos and image films',
      ]

  const angebote = isDE
    ? [
        { icon: Monitor, titel: 'Digitale Firmenpräsentationen', text: 'Multimediale Darstellung deines Unternehmens, Produkte, Dienstleistungen, Vision und Werte. Vorteile: ortsunabhängig verfügbar, kann leicht aktualisiert oder verbreitet werden.', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/30', iconColor: 'text-cyan-400' },
        { icon: Play, titel: 'Soc. Media Kurzvideos', text: 'Kurze, meist unter einer Minute lange Videoclips, speziell für TikTok, Instagram Reels oder YouTube Shorts. Durch ihre kompakte Form und schnelle Verbreitung ein effektives Mittel für Marketing und Markenaufbau.', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', iconColor: 'text-purple-400' },
        { icon: Sparkles, titel: 'Immobilien Präsentationen', text: 'Multimediale Darstellungen von Immobilien, die online über Webseiten, Exposés oder Videos präsentiert werden. Ermöglichen potenziellen Käufern oder Mietern, sich ortsunabhängig einen umfassenden Eindruck zu verschaffen.', color: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/30', iconColor: 'text-yellow-400' },
      ]
    : [
        { icon: Monitor, titel: 'Digital Company Presentations', text: 'Multimedia presentation of your company, products, services, vision and values. Benefits: available regardless of location, can be easily updated or distributed.', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/30', iconColor: 'text-cyan-400' },
        { icon: Play, titel: 'Soc. Media Short Videos', text: 'Short video clips, usually under a minute, specifically for TikTok, Instagram Reels or YouTube Shorts. Their compact format and rapid distribution make them an effective tool for marketing and brand building.', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', iconColor: 'text-purple-400' },
        { icon: Sparkles, titel: 'Real Estate Presentations', text: 'Multimedia presentations of real estate presented online via websites, exposés or videos. Allow potential buyers or renters to get a comprehensive impression regardless of location.', color: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/30', iconColor: 'text-yellow-400' },
      ]

  const vorteile = isDE
    ? [
        'Klares, modernes Design im Einklang mit Ihrer Markenidentität',
        'Strukturierter Aufbau für maximale Verständlichkeit',
        'Einbindung von Grafiken, Videos, Animationen oder interaktiven Elementen',
        'Formatierung für verschiedene Einsatzzwecke: PowerPoint, PDF, Bildschirmpräsentation, Event-Slideshow u. v. m.',
      ]
    : [
        'Clear, modern design in line with your brand identity',
        'Structured layout for maximum clarity',
        'Integration of graphics, videos, animations or interactive elements',
        'Formatting for various uses: PowerPoint, PDF, screen presentation, event slideshow and more',
      ]

  return (
    <div className="pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)]">
          <video src="/one_place.mp4" autoPlay muted loop playsInline className="w-full h-auto block" />
        </div>
      </div>

      <div className="relative section-overlay py-24 text-center overflow-hidden">
        <div className="hero-orb w-[600px] h-[600px] bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="hero-orb w-72 h-72 bg-purple-500/10 top-20 right-10" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" /> {isDE ? 'Leistungen' : 'Services'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            {isDE ? 'Digitale' : 'Digital'}<br />
            <span className="gradient-text">{isDE ? 'Präsentationen' : 'Presentations'}</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">
            {isDE ? 'Maßgeschneiderte Präsentationen, die wirken' : 'Tailor-made presentations that make an impact'}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-12">
        <a href="https://creative-ai-marketing-mdw.replit.app/" target="_blank" rel="noopener noreferrer" className="group block">
          <div className="relative rounded-3xl overflow-hidden border border-cyan-400/30 hover:border-cyan-400/70 transition-all duration-300 shadow-[0_0_40px_rgba(6,182,212,0.15)] hover:shadow-[0_0_60px_rgba(6,182,212,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-slate-900 to-purple-950" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10" />
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-400/30 transition-all duration-500" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-purple-400/30 transition-all duration-500" />
            <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-sm font-medium mb-5">
                  <Sparkles className="w-3.5 h-3.5" /> {isDE ? 'Bild & Videogenerierung' : 'Image & video generation'}
                </div>
                <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 leading-tight">
                  Creative AI Marketing<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    {isDE ? 'in Aktion erleben' : 'in action'}
                  </span>
                </h2>
                <p className="text-white/70 text-base leading-relaxed mb-6 max-w-lg">
                  {isDE
                    ? 'Entdecken Sie, wie moderne KI-gestützte Marketing-Präsentationen aussehen können, interaktiv, professionell und auf Ihr Unternehmen zugeschnitten.'
                    : 'Discover what modern AI-powered marketing presentations can look like — interactive, professional and tailored to your company.'
                  }
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-cyan-400 text-slate-900 font-bold text-base group-hover:from-cyan-400 group-hover:to-cyan-300 transition-all duration-300 shadow-lg shadow-cyan-500/30">
                  {isDE ? 'Jetzt Demo starten' : 'Start demo now'}
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <div className="flex-shrink-0 w-48 h-48 relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white/60 text-xs font-medium">Live Demo</p>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cyan-400 animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-purple-400 animate-pulse delay-300" />
              </div>
            </div>
          </div>
        </a>

        <div className="glass rounded-2xl border border-white/5 p-8">
          <p className="text-white/70 text-base leading-relaxed mb-6">
            {isDE
              ? 'Ich erstelle für Ihr Unternehmen digitale Präsentationen, die nicht nur informieren, sondern überzeugen. Dabei achte ich auf eine professionelle Gestaltung, abgestimmt auf Ihr Corporate Design und Ihre Zielgruppe.'
              : 'I create digital presentations for your company that not only inform, but convince. I pay attention to professional design aligned with your corporate identity and target audience.'
            }
          </p>
          <h3 className="font-display font-semibold text-white text-base mb-4">
            {isDE ? 'Ihre Vorteile auf einen Blick:' : 'Your benefits at a glance:'}
          </h3>
          <div className="space-y-3">
            {vorteile.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display font-bold text-white text-2xl mb-6 text-center">
            {isDE ? 'Unsere Leistungen' : 'Our services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {angebote.map((angebot) => {
              const Icon = angebot.icon
              return (
                <div key={angebot.titel} className={`relative rounded-2xl border ${angebot.border} p-6 overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${angebot.color}`} />
                  <div className="relative z-10">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 ${angebot.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-white mb-3 text-base">{angebot.titel}</h3>
                    <p className="text-white/70 text-base leading-relaxed mb-4">{angebot.text}</p>
                    <Link href="/kontakt">
                      <button className={`${angebot.iconColor} text-sm hover:opacity-80 transition-opacity flex items-center gap-1 font-medium`}>
                        {isDE ? 'Beispiel anfragen' : 'Request example'} <ArrowRight className="w-3 h-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="glass rounded-2xl border border-white/5 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-2">
            {isDE ? 'Für welche Anlässe?' : 'For which occasions?'}
          </h2>
          <p className="text-white/70 text-base mb-6">
            {isDE
              ? 'Setzen Sie auf eine Präsentation, die Ihr Unternehmen professionell repräsentiert, visuell überzeugend, inhaltlich auf den Punkt.'
              : 'Rely on a presentation that represents your company professionally — visually convincing, content right on point.'
            }
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
              {isDE ? 'Jetzt anfragen' : 'Enquire now'} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

