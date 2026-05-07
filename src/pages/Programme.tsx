import { ExternalLink, Globe, Share2, TrendingUp, Video, Brain, Presentation, Palette, Search, BarChart3, MessageSquare, Smartphone, Camera, PenTool, Layers, Zap } from 'lucide-react'

const programmeKategorien = [
  {
    kategorie: 'Webdesign & Erstellung',
    beschreibung: 'Professionelle Werkzeuge für moderne Webpräsenzen',
    icon: Globe,
    farbe: 'from-cyan-500/20 to-blue-600/10',
    grenze: 'border-cyan-500/20',
    iconFarbe: 'text-cyan-400',
    programme: [
      {
        name: 'WordPress',
        beschreibung: 'Das weltweit führende CMS für professionelle Websites mit umfangreichen Anpassungsmöglichkeiten.',
        link: 'https://wordpress.org',
        tags: ['CMS', 'Website', 'Blog'],
      },
      {
        name: 'Elementor',
        beschreibung: 'Intuitiver Drag-&-Drop Page Builder für WordPress – gestalten Sie Ihre Seite visuell.',
        link: 'https://elementor.com',
        tags: ['Page Builder', 'Design', 'WordPress'],
      },
      {
        name: 'Webflow',
        beschreibung: 'Professionelle no-code Webentwicklungsplattform für designer-freundliche Ergebnisse.',
        link: 'https://webflow.com',
        tags: ['No-Code', 'Design', 'CMS'],
      },
      {
        name: 'IONOS',
        beschreibung: 'Zuverlässiges Hosting und Domainverwaltung für deutsche Unternehmen.',
        link: 'https://www.ionos.de',
        tags: ['Hosting', 'Domain', 'SSL'],
      },
    ],
  },
  {
    kategorie: 'Social Media Marketing',
    beschreibung: 'Tools für maximale Reichweite auf allen Plattformen',
    icon: Share2,
    farbe: 'from-purple-500/20 to-pink-600/10',
    grenze: 'border-purple-500/20',
    iconFarbe: 'text-purple-400',
    programme: [
      {
        name: 'Meta Business Suite',
        beschreibung: 'Zentrale Verwaltung für Facebook und Instagram – Planung, Analyse und Werbung.',
        link: 'https://business.facebook.com',
        tags: ['Facebook', 'Instagram', 'Ads'],
      },
      {
        name: 'Buffer',
        beschreibung: 'Social-Media-Planungstool für konsistente Posts über alle Kanäle hinweg.',
        link: 'https://buffer.com',
        tags: ['Planung', 'Scheduling', 'Analytics'],
      },
      {
        name: 'Hootsuite',
        beschreibung: 'Professionelles Social Media Management mit Monitoring und Reporting.',
        link: 'https://hootsuite.com',
        tags: ['Management', 'Monitoring', 'Reports'],
      },
      {
        name: 'Later',
        beschreibung: 'Visueller Planer für Instagram, TikTok und Pinterest – perfekt für Content Creator.',
        link: 'https://later.com',
        tags: ['Instagram', 'TikTok', 'Planung'],
      },
    ],
  },
  {
    kategorie: 'Kunden-Funnel & Conversion',
    beschreibung: 'Strategische Werkzeuge zur Kundengewinnung',
    icon: TrendingUp,
    farbe: 'from-green-500/20 to-teal-600/10',
    grenze: 'border-green-500/20',
    iconFarbe: 'text-green-400',
    programme: [
      {
        name: 'ClickFunnels',
        beschreibung: 'Erstelle hochkonvertierende Sales Funnels ohne technisches Know-how.',
        link: 'https://www.clickfunnels.com',
        tags: ['Funnel', 'Landing Page', 'Sales'],
      },
      {
        name: 'Mailchimp',
        beschreibung: 'E-Mail-Marketing-Plattform für automatisierte Kampagnen und Newsletter.',
        link: 'https://mailchimp.com',
        tags: ['E-Mail', 'Automation', 'Newsletter'],
      },
      {
        name: 'ActiveCampaign',
        beschreibung: 'Leistungsstarke Marketing-Automation für personalisierte Kundenkommunikation.',
        link: 'https://www.activecampaign.com',
        tags: ['CRM', 'Automation', 'E-Mail'],
      },
      {
        name: 'Calendly',
        beschreibung: 'Automatische Terminbuchung für reibungslose Kundengespräche.',
        link: 'https://calendly.com',
        tags: ['Termine', 'Buchung', 'Meetings'],
      },
    ],
  },
  {
    kategorie: 'Kurzvideos & Reels',
    beschreibung: 'Profi-Tools für viralen Video-Content',
    icon: Video,
    farbe: 'from-orange-500/20 to-red-600/10',
    grenze: 'border-orange-500/20',
    iconFarbe: 'text-orange-400',
    programme: [
      {
        name: 'CapCut',
        beschreibung: 'Intuitive Video-Editing-App für professionelle Reels und Kurzvideos.',
        link: 'https://www.capcut.com',
        tags: ['Video', 'Reels', 'Editing'],
      },
      {
        name: 'DaVinci Resolve',
        beschreibung: 'Professionelle Videobearbeitung – kostenlos und Hollywood-Qualität.',
        link: 'https://www.blackmagicdesign.com/products/davinciresolve',
        tags: ['Video', 'Profi', 'Color Grading'],
      },
      {
        name: 'InShot',
        beschreibung: 'Mobile Video-Editing-App für schnelle, hochwertige Social-Media-Videos.',
        link: 'https://inshot.com',
        tags: ['Mobile', 'Video', 'Instagram'],
      },
      {
        name: 'Canva Video',
        beschreibung: 'Animierte Videos und Präsentations-Videos einfach per Drag & Drop erstellen.',
        link: 'https://www.canva.com/video-editor',
        tags: ['Animation', 'Einfach', 'Templates'],
      },
    ],
  },
  {
    kategorie: 'KI-gestütztes Marketing',
    beschreibung: 'Künstliche Intelligenz für smartes Marketing',
    icon: Brain,
    farbe: 'from-pink-500/20 to-purple-600/10',
    grenze: 'border-pink-500/20',
    iconFarbe: 'text-pink-400',
    programme: [
      {
        name: 'ChatGPT',
        beschreibung: 'KI-Textgenerierung für Content, Texte, Marketing-Kopien und Ideen.',
        link: 'https://chat.openai.com',
        tags: ['KI', 'Text', 'Content'],
      },
      {
        name: 'Midjourney',
        beschreibung: 'KI-Bildgenerierung für einzigartige Marketing-Visuals und Kreativarbeit.',
        link: 'https://www.midjourney.com',
        tags: ['KI', 'Bilder', 'Design'],
      },
      {
        name: 'Jasper AI',
        beschreibung: 'KI-gestützter Marketing-Texter für Ads, Blogposts und Social Media Content.',
        link: 'https://www.jasper.ai',
        tags: ['KI', 'Copywriting', 'Marketing'],
      },
      {
        name: 'Adobe Firefly',
        beschreibung: 'Generative KI direkt in Adobe-Produkten für professionelle Kreativarbeit.',
        link: 'https://firefly.adobe.com',
        tags: ['KI', 'Adobe', 'Generativ'],
      },
    ],
  },
  {
    kategorie: 'Präsentationen',
    beschreibung: 'Überzeugende Präsentationen für jeden Anlass',
    icon: Presentation,
    farbe: 'from-yellow-500/20 to-amber-600/10',
    grenze: 'border-yellow-500/20',
    iconFarbe: 'text-yellow-400',
    programme: [
      {
        name: 'PowerPoint',
        beschreibung: 'Der Klassiker – mächtig, vielseitig und professionell für jede Präsentation.',
        link: 'https://www.microsoft.com/de-de/microsoft-365/powerpoint',
        tags: ['Präsentation', 'Office', 'Profi'],
      },
      {
        name: 'Canva Presentations',
        beschreibung: 'Designschöne Präsentationen ohne Designkenntnisse – mit hunderten Templates.',
        link: 'https://www.canva.com/presentations',
        tags: ['Design', 'Templates', 'Einfach'],
      },
      {
        name: 'Beautiful.ai',
        beschreibung: 'KI-unterstützte Präsentationserstellung für automatisch ausbalancierte Slides.',
        link: 'https://www.beautiful.ai',
        tags: ['KI', 'Präsentation', 'Smart'],
      },
      {
        name: 'Pitch',
        beschreibung: 'Modernes Kollaborations-Tool für Teams – Präsentationen gemeinsam erstellen.',
        link: 'https://pitch.com',
        tags: ['Kollaboration', 'Team', 'Modern'],
      },
    ],
  },
  {
    kategorie: 'Künstlerische Bildbearbeitung',
    beschreibung: 'Kreative Tools für einzigartige Bildwerke',
    icon: Palette,
    farbe: 'from-rose-500/20 to-pink-600/10',
    grenze: 'border-rose-500/20',
    iconFarbe: 'text-rose-400',
    programme: [
      {
        name: 'Adobe Photoshop',
        beschreibung: 'Das Profi-Standard-Werkzeug für Bildbearbeitung und kreative Komposition.',
        link: 'https://www.adobe.com/de/products/photoshop.html',
        tags: ['Profi', 'Bildbearbeitung', 'Design'],
      },
      {
        name: 'Adobe Lightroom',
        beschreibung: 'Professionelle Fotobearbeitung und Farbkorrektur für atemberaubende Ergebnisse.',
        link: 'https://www.adobe.com/de/products/photoshop-lightroom.html',
        tags: ['Foto', 'Color Grading', 'Profi'],
      },
      {
        name: 'Procreate',
        beschreibung: 'Digitales Zeichnen und illustrieren auf iPad – für künstlerische Bildwerke.',
        link: 'https://procreate.com',
        tags: ['iPad', 'Illustration', 'Kunst'],
      },
      {
        name: 'Affinity Photo',
        beschreibung: 'Professionelle Alternative zu Photoshop – einmalige Lizenz, voller Umfang.',
        link: 'https://affinity.serif.com/de/photo',
        tags: ['Profi', 'Einmalig', 'Alternative'],
      },
    ],
  },
  {
    kategorie: 'SEO & Analyse',
    beschreibung: 'Messbare Ergebnisse durch Daten und Optimierung',
    icon: Search,
    farbe: 'from-teal-500/20 to-cyan-600/10',
    grenze: 'border-teal-500/20',
    iconFarbe: 'text-teal-400',
    programme: [
      {
        name: 'Google Analytics 4',
        beschreibung: 'Kostenlose Web-Analyse von Google – verstehen Sie Ihr Nutzerverhalten.',
        link: 'https://analytics.google.com',
        tags: ['Analytics', 'Google', 'Kostenlos'],
      },
      {
        name: 'Google Search Console',
        beschreibung: 'Offizielle SEO-Tools von Google für Sichtbarkeit und Performance-Monitoring.',
        link: 'https://search.google.com/search-console',
        tags: ['SEO', 'Google', 'Kostenlos'],
      },
      {
        name: 'Semrush',
        beschreibung: 'Umfassende SEO- und Marketing-Plattform für Keyword-Recherche und Wettbewerber-Analyse.',
        link: 'https://www.semrush.com',
        tags: ['SEO', 'Keywords', 'Analyse'],
      },
      {
        name: 'Ubersuggest',
        beschreibung: 'Einsteigerfreundliches SEO-Tool für Keyword-Ideen und Content-Strategie.',
        link: 'https://neilpatel.com/ubersuggest',
        tags: ['SEO', 'Keywords', 'Einsteiger'],
      },
    ],
  },
]

const weitereTools = [
  { icon: BarChart3, name: 'Google Ads', link: 'https://ads.google.com', tags: ['Werbung', 'Google', 'PPC'] },
  { icon: MessageSquare, name: 'WhatsApp Business', link: 'https://business.whatsapp.com', tags: ['Kommunikation', 'Business'] },
  { icon: Smartphone, name: 'TikTok for Business', link: 'https://www.tiktok.com/business', tags: ['TikTok', 'Social Media'] },
  { icon: Camera, name: 'Unsplash', link: 'https://unsplash.com', tags: ['Fotos', 'Kostenlos'] },
  { icon: PenTool, name: 'Figma', link: 'https://www.figma.com', tags: ['Design', 'UI/UX'] },
  { icon: Layers, name: 'Notion', link: 'https://www.notion.so', tags: ['Projektmanagement', 'Docs'] },
  { icon: Zap, name: 'Zapier', link: 'https://zapier.com', tags: ['Automation', 'Integration'] },
  { icon: Globe, name: 'Canva', link: 'https://www.canva.com', tags: ['Design', 'Templates'] },
]

export default function Programme() {
  return (
    <div className="pt-24 pb-32">
      {/* Header */}
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            Zu den Programmen
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight" data-testid="text-programme-headline">
            Alle digitalen
            <br />
            <span className="gradient-text">Programme & Tools</span>
          </h1>
          <p className="text-white/50 text-base leading-relaxed" data-testid="text-programme-subtitle">
            Eine vollständige Übersicht aller Programme, die My Digital World für Sie einsetzt – für jede Aufgabe das richtige Werkzeug.
          </p>
        </div>
      </div>

      {/* Programme Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8" data-testid="group-programme-kategorien">
        {programmeKategorien.map((kat) => {
          const KatIcon = kat.icon
          return (
            <div key={kat.kategorie} className="mb-16" data-testid={`section-kategorie-${kat.kategorie.slice(0, 8).replace(/\s/g, '-').toLowerCase()}`}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kat.farbe} border ${kat.grenze} flex items-center justify-center`}>
                  <KatIcon className={`w-6 h-6 ${kat.iconFarbe}`} />
                </div>
                <div>
                  <h2 className="font-display font-bold text-white text-2xl">{kat.kategorie}</h2>
                  <p className="text-white/40 text-sm">{kat.beschreibung}</p>
                </div>
              </div>

              {/* Programme Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kat.programme.map((prog) => (
                  <a
                    key={prog.name}
                    href={prog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`card-programm-${prog.name.replace(/\s/g, '-').toLowerCase()}`}
                    className={`card-hover glass rounded-xl border ${kat.grenze} p-5 group flex flex-col gap-3`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">
                        {prog.name}
                      </h3>
                      <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-white/50 text-xs leading-relaxed flex-1">{prog.beschreibung}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )
        })}

        {/* Weitere Tools */}
        <div className="mt-4" data-testid="section-weitere-tools">
          <div className="text-center mb-8">
            <h2 className="font-display font-bold text-3xl text-white mb-2">Weitere nützliche Tools</h2>
            <p className="text-white/40 text-sm">Zusätzliche Programme aus dem digitalen Werkzeugkasten</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {weitereTools.map((tool) => {
              const ToolIcon = tool.icon
              return (
                <a
                  key={tool.name}
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`card-tool-${tool.name.replace(/\s/g, '-').toLowerCase()}`}
                  className="card-hover glass rounded-xl border border-white/5 p-4 flex flex-col items-center gap-2 text-center group"
                >
                  <ToolIcon className="w-5 h-5 text-white/40 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-white/60 text-xs font-medium group-hover:text-white transition-colors leading-tight">{tool.name}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
