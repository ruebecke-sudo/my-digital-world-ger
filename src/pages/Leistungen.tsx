import { Globe, Share2, TrendingUp, Video, Brain, Presentation, Palette, ArrowRight, CheckCircle, Mail, Phone } from 'lucide-react'
import { Link } from 'wouter'
import { useLanguage } from '../context/LanguageContext'

const leistungen = [
  {
    id: 'webdesign',
    icon: Globe,
    titel: 'Webdesign & Webseitenerstellung',
    untertitel: 'Professionelle Webpräsenzen, die überzeugen',
    beschreibung: 'Eine professionelle Webseite überzeugt Kunden, schafft Vertrauen und macht sichtbar. My Digital World erstellt moderne, mobiloptimierte Seiten – individuell, benutzerfreundlich und suchmaschinenoptimiert.',
    vorteile: [
      'Individuelles Design nach Ihren Wünschen',
      'Vollständig mobiloptimiert (Responsive Design)',
      'SEO-Grundoptimierung inklusive',
      'Schnelle Ladezeiten & Performance',
      'Einfache Pflege und Verwaltung',
    ],
    farbe: 'from-cyan-500/20 to-blue-500/10',
    grenze: 'border-cyan-500/30',
    iconFarbe: 'text-cyan-400',
  },
  {
    id: 'social-media',
    icon: Share2,
    titel: 'Social Media Marketing',
    untertitel: 'Sichtbar werden, wo Ihre Kunden sind',
    beschreibung: 'Ziel ist die Steigerung der Reichweite und Gewinnung neuer Kunden mit gezieltem Social Media Marketing. My Digital World entwickelt individuelle Strategien, erstellt ansprechende Inhalte und managt Social-Media-Kanäle.',
    vorteile: [
      'Individuelle Content-Strategie',
      'Professionelle Beitragsgestaltung',
      'Community Management',
      'Kanal-Analyse und Reporting',
      'Facebook, Instagram & Co.',
    ],
    farbe: 'from-purple-500/20 to-pink-500/10',
    grenze: 'border-purple-500/30',
    iconFarbe: 'text-purple-400',
  },
  {
    id: 'funnel',
    icon: TrendingUp,
    titel: 'Kunden-Funnel',
    untertitel: 'Systematisch mehr Kunden gewinnen',
    beschreibung: 'Ein Kundenfunnel beschreibt den strukturierten Weg, den eine Person vom ersten Kontakt mit einem Unternehmen bis zum Kauf durchläuft – er macht aus Fremden Schritt für Schritt zahlende Kunden, systematisch statt zufällig.',
    vorteile: [
      'Analyse der Zielgruppe und Customer Journey',
      'Landing Pages mit hoher Conversion Rate',
      'E-Mail-Marketing-Automation',
      'Retargeting-Strategien',
      'Messbare Ergebnisse und KPIs',
    ],
    farbe: 'from-green-500/20 to-teal-500/10',
    grenze: 'border-green-500/30',
    iconFarbe: 'text-green-400',
  },
  {
    id: 'videos',
    icon: Video,
    titel: 'Kurzvideos & Reels',
    untertitel: 'Videos, die bewegen und begeistern',
    beschreibung: 'Mit kurzen, knackigen Social-Media-Videos werden Zielgruppen bewegt – My Digital World produziert professionelle Kurzvideos für Facebook, Instagram, TikTok und Co. mit kreativem Content und klarer Planung.',
    vorteile: [
      'Konzeption und Planung des Video-Contents',
      'Professioneller Schnitt und Bearbeitung',
      'Passende Musik und Sound Design',
      'Optimiert für alle Social-Media-Formate',
      'Storytelling mit Mehrwert',
    ],
    farbe: 'from-orange-500/20 to-red-500/10',
    grenze: 'border-orange-500/30',
    iconFarbe: 'text-orange-400',
  },
  {
    id: 'ki-marketing',
    icon: Brain,
    titel: 'KI-gestütztes Marketing',
    untertitel: 'Marketing intelligent und effizient gestalten',
    beschreibung: 'Künstliche Intelligenz macht Marketing smart: Ob Text, Bild oder Analyse – My Digital World nutzt moderne KI-Tools, um Projekte effizient und zielgerichtet umzusetzen und so den entscheidenden Wettbewerbsvorteil zu sichern.',
    vorteile: [
      'KI-generierte Texte und Copywriting',
      'KI-Bildgenerierung für Marketingmaterial',
      'Automatisierte Content-Erstellung',
      'Datenanalyse und Trendauswertung',
      'Effiziente Prozessoptimierung',
    ],
    farbe: 'from-pink-500/20 to-purple-500/10',
    grenze: 'border-pink-500/30',
    iconFarbe: 'text-pink-400',
  },
  {
    id: 'praesentationen',
    icon: Presentation,
    titel: 'Präsentationen',
    untertitel: 'Der erste Eindruck zählt',
    beschreibung: 'In der heutigen Geschäftswelt zählt der erste Eindruck, und eine überzeugende Präsentation kann den entscheidenden Unterschied machen. Inhalte werden klar, strukturiert und visuell ansprechend dargestellt.',
    vorteile: [
      'Professionelles Design und Layout',
      'Klare Struktur und Storytelling',
      'Ansprechende Visualisierungen',
      'Angepasst an Ihre Corporate Identity',
      'Für alle Ausgabemedien optimiert',
    ],
    farbe: 'from-yellow-500/20 to-amber-500/10',
    grenze: 'border-yellow-500/30',
    iconFarbe: 'text-yellow-400',
  },
  {
    id: 'bildbearbeitung',
    icon: Palette,
    titel: 'Künstlerische Bildbearbeitung',
    untertitel: 'Aus Ihrem Bild wird ein Unikat',
    beschreibung: 'Ob knallige Farben, abstrahierte Details oder ein Mix aus mehreren Varianten – aus dem eigenen Bild wird ein echtes Unikat. Kreative Bildbearbeitung auf höchstem künstlerischen Niveau.',
    vorteile: [
      'Individuelle Bildbearbeitung und Retusche',
      'Kreative Bildkomposita und Montagen',
      'Digitale Kunstwerke als Unikate',
      'Farbkorrektur und Color Grading',
      'Anpassung für Print und Digital',
    ],
    farbe: 'from-rose-500/20 to-pink-500/10',
    grenze: 'border-rose-500/30',
    iconFarbe: 'text-rose-400',
  },
]

export default function Leistungen() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  return (
    <div className="pt-24 pb-32">
      {/* Header */}
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            {isDE ? 'Kreative digitale Leistungen' : 'Creative digital services'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight" data-testid="text-leistungen-headline">
            {isDE ? <>Alles aus einer<br /><span className="gradient-text">digitalen Hand</span></> : <>All from one<br /><span className="gradient-text">digital source</span></>}
          </h1>
          <p className="text-white/70 text-base leading-relaxed" data-testid="text-leistungen-subtitle">
            {isDE ? 'Von der Website bis zum KI-Marketing – My Digital World bietet Ihnen alle digitalen Leistungen, die Ihr Unternehmen nach vorne bringen.' : 'From the website to AI marketing — My Digital World offers you all the digital services that move your business forward.'}
          </p>
        </div>
      </div>

      {/* Leistungen */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8" data-testid="group-leistungen-liste">
        <div className="grid grid-cols-1 gap-8">
          {leistungen.map((leistung, index) => {
            const Icon = leistung.icon
            const isEven = index % 2 === 0
            return (
              <div
                key={leistung.id}
                id={leistung.id}
                data-testid={`card-leistung-${leistung.id}`}
                className={`glass rounded-2xl border ${leistung.grenze} p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}
              >
                {/* Content */}
                <div className={!isEven ? 'lg:order-2' : ''}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${leistung.farbe} border ${leistung.grenze} flex items-center justify-center mb-5`}>
                    <Icon className={`w-7 h-7 ${leistung.iconFarbe}`} />
                  </div>
                  <p className={`text-sm font-medium mb-2 ${leistung.iconFarbe}`}>{leistung.untertitel}</p>
                  <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-4 leading-tight">{leistung.titel}</h2>
                  <p className="text-white/75 text-base leading-relaxed mb-6">{leistung.beschreibung}</p>
                  <Link href="/programme">
                    <button className="btn-outline flex items-center gap-2 text-base" data-testid={`button-leistung-programme-${leistung.id}`}>
                      {isDE ? 'Passende Programme ansehen' : 'View matching programs'}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>

                {/* Advantages */}
                <div className={`glass rounded-xl border ${leistung.grenze} p-6 ${!isEven ? 'lg:order-1' : ''}`}>
                  <h3 className="font-display font-semibold text-white text-base mb-4">{isDE ? 'Was Sie erhalten' : 'What you get'}</h3>
                  <ul className="space-y-3">
                    {leistung.vorteile.map((vorteil) => (
                      <li key={vorteil} className="flex items-start gap-3" data-testid={`item-vorteil-${leistung.id}`}>
                        <CheckCircle className={`w-4 h-4 ${leistung.iconFarbe} flex-shrink-0 mt-0.5`} />
                        <span className="text-white/70 text-base">{vorteil}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="glass rounded-3xl border border-cyan-500/20 p-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4" data-testid="text-leistungen-cta-headline">
            {isDE ? <>Welche Leistung passt<br /><span className="gradient-text">zu Ihrem Unternehmen?</span></> : <>Which service fits<br /><span className="gradient-text">your company?</span></>}
          </h2>
          <p className="text-white/70 text-base mb-8">
            {isDE ? 'Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, was My Digital World für Sie tun kann.' : "Let's find out in a no-obligation conversation what My Digital World can do for you."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@my-digital-world.de" data-testid="button-leistungen-email" className="btn-primary flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {isDE ? 'Jetzt anfragen' : 'Enquire now'}
            </a>
            <a href="tel:+4915906146147" data-testid="button-leistungen-phone" className="btn-outline flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +49 159 0614 6147
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
