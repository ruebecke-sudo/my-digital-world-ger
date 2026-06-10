import { useState } from 'react'
import {
  ExternalLink, X,
  Zap, Globe, Monitor, Layers,
  Layout, Star, Search, Users,
  Image, PenTool, Award, TrendingUp,
} from 'lucide-react'

type LucideIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>

interface Feature {
  Icon: LucideIcon
  label: string
  color: string
}

interface PopupConfig {
  badge: string
  accentColor: string
  gradFrom: string
  gradTo: string
  logoChar: string
  description: string
  statValue: string
  statLabel: string
  StatIcon: LucideIcon
  features: Feature[]
  cta: string
  infoLink?: string
}

interface Resource {
  name: string
  beschreibung: string
  link: string
  kategorie: string
  katColor: string
  popup: PopupConfig
}

const resources: Resource[] = [
  {
    name: 'Landingfolio',
    beschreibung: 'Die beste Sammlung an Landing Page Design-Inspiration, Templates und Komponenten – kuratiert für höchste Qualität.',
    link: 'https://www.landingfolio.com',
    kategorie: 'Landing Pages',
    katColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    popup: {
      badge: 'Landing Page Inspiration',
      accentColor: '#22d3ee',
      gradFrom: '#0891b2',
      gradTo: '#0e7490',
      logoChar: 'L',
      description: 'Entdecke hunderte kuratierte Landing Page Designs, fertige Templates und über 800 Komponenten für Tailwind & Webflow – für SaaS, Marketing & mehr.',
      statValue: '800+ Komponenten',
      statLabel: 'für Tailwind & Webflow',
      StatIcon: Layout,
      features: [
        { Icon: Layout, label: 'Beste Landing Page Designs', color: '#22d3ee' },
        { Icon: Layers, label: 'Templates & Komponenten', color: '#34d399' },
        { Icon: Monitor, label: 'Tailwind & Webflow ready', color: '#60a5fa' },
      ],
      cta: 'Landingfolio entdecken',
      infoLink: 'https://www.landingfolio.com',
    },
  },
  {
    name: 'SaaSFrame',
    beschreibung: 'UI Design Inspiration für SaaS Builder – über 5.000 echte UX & UI Design-Beispiele aus realen SaaS-Produkten.',
    link: 'https://www.saasframe.io',
    kategorie: 'SaaS UI Design',
    katColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    popup: {
      badge: 'SaaS UI Design Inspiration',
      accentColor: '#60a5fa',
      gradFrom: '#2563eb',
      gradTo: '#1d4ed8',
      logoChar: 'S',
      description: 'Erstelle Websites, Produkt-Interfaces und E-Mail-Sequenzen für dein SaaS schneller – mit einer Bibliothek von 5.000+ echten UX & UI Design-Beispielen.',
      statValue: '5.000+ Screens',
      statLabel: 'reale UX & UI Designs',
      StatIcon: Monitor,
      features: [
        { Icon: Monitor, label: 'SaaS Websites & Dashboards', color: '#60a5fa' },
        { Icon: Layers, label: 'App Screens & Flows', color: '#22d3ee' },
        { Icon: PenTool, label: 'E-Mail-Design Inspiration', color: '#a78bfa' },
      ],
      cta: 'SaaSFrame erkunden',
      infoLink: 'https://www.saasframe.io',
    },
  },
  {
    name: 'Mobbin',
    beschreibung: 'Echte Design-Inspiration aus 1.000+ iOS & Web Apps – genutzt von Design-Teams bei Uber, Meta, Airbnb und Pinterest.',
    link: 'https://mobbin.com',
    kategorie: 'App Design',
    katColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    popup: {
      badge: 'Real-World App Designs',
      accentColor: '#f472b6',
      gradFrom: '#db2777',
      gradTo: '#be185d',
      logoChar: 'M',
      description: 'Entdecke echte Design-Inspiration aus über 1.000 iOS & Web Apps und 400 Websites – wöchentlich neue Inhalte, genutzt von Teams wie Uber, Meta und Airbnb.',
      statValue: '1.000+ Apps',
      statLabel: 'iOS, Android & Web',
      StatIcon: Image,
      features: [
        { Icon: Image, label: 'iOS & Android App Designs', color: '#f472b6' },
        { Icon: Globe, label: '400+ Web Apps & Sites', color: '#22d3ee' },
        { Icon: Users, label: 'Genutzt von Uber, Meta, Airbnb', color: '#fbbf24' },
      ],
      cta: 'Mobbin kostenlos erkunden',
      infoLink: 'https://mobbin.com',
    },
  },
  {
    name: 'Pageflows',
    beschreibung: 'UI/UX Inspiration aus echten User Flows – über 100.000 Designer weltweit nutzen Pageflows für bessere Produkte.',
    link: 'https://pageflows.com',
    kategorie: 'User Flows',
    katColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    popup: {
      badge: 'UI/UX Flow Inspiration',
      accentColor: '#fbbf24',
      gradFrom: '#d97706',
      gradTo: '#b45309',
      logoChar: 'P',
      description: 'Erkunde echte User Flows und Design-Patterns aus führenden Apps und Websites. Trusted by 100.000+ Designer weltweit – Disney, Booking.com, Google.',
      statValue: '100.000+ Designer',
      statLabel: 'weltweit',
      StatIcon: TrendingUp,
      features: [
        { Icon: Search, label: 'Echte User Flows & Patterns', color: '#fbbf24' },
        { Icon: Monitor, label: 'iOS, Android & Web', color: '#34d399' },
        { Icon: Star, label: 'Trusted by Disney & Google', color: '#f472b6' },
      ],
      cta: 'Pageflows entdecken',
      infoLink: 'https://pageflows.com',
    },
  },
  {
    name: 'Dribbble',
    beschreibung: 'Die weltbeste Design-Community – entdecke Portfolios, Top-Designer und echte Projekte für Inspiration und Freelancer-Suche.',
    link: 'https://dribbble.com',
    kategorie: 'Design Community',
    katColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    popup: {
      badge: 'Weltbeste Design Community',
      accentColor: '#fb7185',
      gradFrom: '#e11d48',
      gradTo: '#be123c',
      logoChar: 'D',
      description: 'Arbeite mit den weltbesten Web-Designern – entdecke Shots, Portfolios und echte Projekte. Brief einreichen und Vorschläge kostenlos erhalten.',
      statValue: 'Weltbeste Designer',
      statLabel: 'für Web, App & Branding',
      StatIcon: Award,
      features: [
        { Icon: Image, label: 'Design Shots & Portfolios', color: '#fb7185' },
        { Icon: Users, label: 'Top Freelancer finden', color: '#22d3ee' },
        { Icon: PenTool, label: 'Echte Projekte & Inspiration', color: '#fbbf24' },
      ],
      cta: 'Dribbble erkunden',
      infoLink: 'https://dribbble.com',
    },
  },
  {
    name: 'Awwwards',
    beschreibung: 'Die Oscars des Web-Designs – täglich ausgezeichnete Websites, digitale Erlebnisse und Portfolios auf Weltklasse-Niveau.',
    link: 'https://www.awwwards.com',
    kategorie: 'Web Design Awards',
    katColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    popup: {
      badge: 'Webdesign Awards & Inspiration',
      accentColor: '#34d399',
      gradFrom: '#059669',
      gradTo: '#047857',
      logoChar: 'A',
      description: 'Täglich neue ausgezeichnete Websites, Portfolios und digitale Erlebnisse auf Weltklasse-Niveau – die bekannteste Auszeichnung im Web-Design.',
      statValue: 'Site of the Day',
      statLabel: 'täglich prämiert',
      StatIcon: Award,
      features: [
        { Icon: Award, label: 'Ausgezeichnete Top-Websites', color: '#34d399' },
        { Icon: Globe, label: 'Portfolios & Agenturen', color: '#60a5fa' },
        { Icon: Zap, label: 'Tägliche Design-Inspiration', color: '#fbbf24' },
      ],
      cta: 'Awwwards entdecken',
      infoLink: 'https://www.awwwards.com',
    },
  },
]

function ToolPopup({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const p = resource.popup
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#0d1628', border: `1px solid ${p.accentColor}30` }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="p-6 pb-4"
          style={{ background: `linear-gradient(135deg, ${p.gradFrom}22, ${p.gradTo}11)` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${p.gradFrom}, ${p.gradTo})` }}
            >
              {p.logoChar}
            </div>
            <div>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-1"
                style={{ background: `${p.accentColor}20`, color: p.accentColor, border: `1px solid ${p.accentColor}30` }}
              >
                {p.badge}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">{resource.name}</h3>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{p.description}</p>
        </div>

        <div className="px-6 py-4 border-t border-white/5">
          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-4"
            style={{ background: `${p.accentColor}10`, border: `1px solid ${p.accentColor}20` }}
          >
            <p.StatIcon className="w-5 h-5 flex-shrink-0" style={{ color: p.accentColor }} />
            <div>
              <p className="text-base font-bold text-white">{p.statValue}</p>
              <p className="text-xs text-white/50">{p.statLabel}</p>
            </div>
          </div>

          <div className="space-y-2 mb-5">
            {p.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}15` }}>
                  <f.Icon className="w-3.5 h-3.5" style={{ color: f.color }} />
                </div>
                <span className="text-sm text-white/75">{f.label}</span>
              </div>
            ))}
          </div>

          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${p.gradFrom}, ${p.gradTo})` }}
          >
            {p.cta}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ForFree() {
  const [activeResource, setActiveResource] = useState<Resource | null>(null)
  const [search, setSearch] = useState('')

  const filtered = resources.filter(r => {
    const q = search.toLowerCase()
    return (
      r.name.toLowerCase().includes(q) ||
      r.kategorie.toLowerCase().includes(q) ||
      r.beschreibung.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-[#060b18] pt-20">
      {activeResource && (
        <ToolPopup resource={activeResource} onClose={() => setActiveResource(null)} />
      )}

      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            Kostenlose Ressourcen
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Die besten{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Design-Ressourcen
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Kostenlose Tools und Inspiration für Landing Pages, UI/UX Design, App Flows und Web-Design – kuratiert von My Digital World.
          </p>
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <p className="text-white/40 text-sm">{filtered.length} Ressourcen</p>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Ressource suchen ..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>Keine Ressourcen gefunden.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(resource => (
                <button
                  key={resource.name}
                  onClick={() => setActiveResource(resource)}
                  className="group relative text-left rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => {
                    const accent = resource.popup.accentColor
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${accent}40`
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accent}15`
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${resource.popup.gradFrom}, ${resource.popup.gradTo})` }}
                      >
                        {resource.popup.logoChar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm leading-tight">{resource.name}</h3>
                        <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${resource.katColor}`}>
                          {resource.kategorie}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-0.5" />
                  </div>

                  <p className="text-white/55 text-xs leading-relaxed mb-3 line-clamp-3">
                    {resource.beschreibung}
                  </p>

                  {resource.popup.infoLink && (
                    <a
                      href={resource.popup.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-80"
                      style={{ color: resource.popup.accentColor }}
                    >
                      weitere Infos hier
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
