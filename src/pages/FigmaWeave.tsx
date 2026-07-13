import { ExternalLink, CheckCircle, Layout, Code, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const features = [
  {
    icon: '💻',
    title: 'Kollaborativer UI/UX Workspace',
    text: 'Gestalte Interfaces, Websites und mobile Apps gemeinsam mit deinem Team in Echtzeit. Figma Weave vereint kreative Freiheit mit modernster Cloud-Kollaboration.',
    tag: 'Echtzeit-Kollaboration',
    color: 'bg-orange-500/10 border-orange-500/20 text-orange-400',
    glow: 'from-orange-500/10',
  },
  {
    icon: '⚡',
    title: 'Interaktive Prototypen',
    text: 'Erstelle klickbare und animierte Prototypen deiner Designs. Teste Benutzerflüsse und präsentiere lebendige UI-Konzepte direkt im Browser.',
    tag: 'Smart Animate',
    color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    glow: 'from-cyan-500/10',
  },
  {
    icon: '🛠️',
    title: 'Integriertes Design-System',
    text: 'Verwalte UI-Komponenten, Farbpaletten und Typografie-Variablen zentral. Skaliere deine UI-Komponenten nahtlos über alle Projekte hinweg.',
    tag: 'Reusable Components',
    color: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    glow: 'from-purple-500/10',
  },
  {
    icon: '⚙️',
    title: 'Moderne Vektorgrafik-Engine',
    text: 'Nutze Pfad-Netzwerke, flexible Raster und Boolean-Operationen für die präzise Gestaltung von Symbolen, Logos und Benutzeroberflächen.',
    tag: 'Vector Networks',
    color: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    glow: 'from-amber-500/10',
  },
  {
    icon: '🚀',
    title: 'Dev Mode & Code-Export',
    text: 'Entwickler erhalten direkten Zugriff auf CSS-Variablen, Tailwind-Tokens, Swift- oder Android-Code. Exportiere Assets mit einem Klick.',
    tag: 'Developer-Ready',
    color: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    glow: 'from-pink-500/10',
  },
  {
    icon: '🔌',
    title: 'Mächtiges Plugin-Ökosystem',
    text: 'Erweitere deinen Workflow durch Tausende Plugins für Datenimport, Barrierefreiheitstests, Lottie-Animationen und automatisches Layouting.',
    tag: 'Plugins & Widgets',
    color: 'bg-green-500/10 border-green-500/20 text-green-400',
    glow: 'from-green-500/10',
  },
]

const usecases = [
  {
    icon: '🎨',
    title: 'UI/UX & Webdesigner',
    text: 'Gestalte bildschöne Webseiten, Dashboards und mobile Applikationen. Figma Weave ist das modernste Tool für die tägliche UI/UX-Arbeit.',
  },
  {
    icon: '👥',
    title: 'Produktteams & Startups',
    text: 'Kollaboriere abteilungsübergreifend. Designer, Entwickler und Produktmanager arbeiten gleichzeitig in derselben Datei und sparen Abstimmungszeit.',
  },
  {
    icon: '📐',
    title: 'Design-System Engineers',
    text: 'Erstelle komplexe und robuste Marken-Libraries mit verschachtelten Varianten, Auto-Layout und responsiven Design-Komponenten.',
  },
  {
    icon: '💻',
    title: 'Frontend-Entwickler',
    text: 'Lese Maße und Abstände pixelgenau ab. Über den Dev-Mode erhältst du direkten Zugriff auf modernen Web-Code zur schnellen Umsetzung.',
  },
]

const pricingFeatures = [
  'Kollaborativer Echtzeit-Workspace',
  'Interaktive Prototypen & Animationen',
  'Umfassende Design-System-Bibliotheken',
  'Dev Mode für Entwickler-Integration',
  'Zugriff auf Tausende Plugins',
  'Unbegrenzter Cloud-Speicher für Entwürfe',
  'Zentrales Projektmanagement für Teams',
]

const LINK = 'https://figma.com'

export default function FigmaWeave() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const featuresEN = [
    { icon: '💻', title: 'Collaborative UI/UX Workspace', text: 'Design interfaces, websites and mobile apps together with your team in real time. Figma Weave combines creative freedom with modern cloud collaboration.', tag: 'Real-time Collaboration', color: 'bg-orange-500/10 border-orange-500/20 text-orange-400', glow: 'from-orange-500/10' },
    { icon: '⚡', title: 'Interactive Prototypes', text: 'Create clickable and animated prototypes of your designs. Test user flows and present living UI concepts directly in the browser.', tag: 'Smart Animate', color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400', glow: 'from-cyan-500/10' },
    { icon: '🛠️', title: 'Integrated Design System', text: 'Manage UI components, color palettes and typography variables centrally. Scale your UI components seamlessly across all projects.', tag: 'Reusable Components', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400', glow: 'from-purple-500/10' },
    { icon: '⚙️', title: 'Modern Vector Graphic Engine', text: 'Use path networks, flexible grids and Boolean operations for precise design of icons, logos and user interfaces.', tag: 'Vector Networks', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400', glow: 'from-amber-500/10' },
    { icon: '🚀', title: 'Dev Mode & Code Export', text: 'Developers get direct access to CSS variables, Tailwind tokens, Swift or Android code. Export assets with one click.', tag: 'Developer-Ready', color: 'bg-pink-500/10 border-pink-500/20 text-pink-400', glow: 'from-pink-500/10' },
    { icon: '🔌', title: 'Powerful Plugin Ecosystem', text: 'Extend your workflow with thousands of plugins for data import, accessibility testing, Lottie animations and automatic layouting.', tag: 'Plugins & Widgets', color: 'bg-green-500/10 border-green-500/20 text-green-400', glow: 'from-green-500/10' },
  ]

  const usecasesEN = [
    { icon: '🎨', title: 'UI/UX & Web Designers', text: 'Design beautiful websites, dashboards and mobile applications. Figma Weave is the state-of-the-art tool for daily UI/UX work.' },
    { icon: '👥', title: 'Product Teams & Startups', text: 'Collaborate across departments. Designers, developers and product managers work simultaneously in the same file to save sync time.' },
    { icon: '📐', title: 'Design System Engineers', text: 'Create complex and robust brand libraries with nested variants, auto-layout and responsive design components.' },
    { icon: '💻', title: 'Frontend Developers', text: 'Read spacing and measurements with pixel precision. The Dev Mode gives you direct access to modern web code for fast implementation.' },
  ]

  const pricingFeaturesEN = [
    'Collaborative real-time workspace',
    'Interactive prototypes & animations',
    'Comprehensive design system libraries',
    'Dev Mode for developer integration',
    'Access to thousands of plugins',
    'Unlimited cloud storage for drafts',
    'Centralized project management for teams',
  ]

  const displayFeatures = isDE ? features : featuresEN
  const displayUsecases = isDE ? usecases : usecasesEN
  const displayPricingFeatures = isDE ? pricingFeatures : pricingFeaturesEN

  return (
    <div className="pt-20 pb-32 overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-orange-500/8 blur-[120px]" />
          <div className="absolute top-1/3 right-[-150px] w-[400px] h-[400px] rounded-full bg-cyan-500/7 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-purple-500/6 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-sm font-medium mb-8 tracking-wider">
            {isDE ? '✦ Echtzeit-Kollaboration · Design System · Developer Ready' : '✦ Real-time Collaboration · Design System · Developer Ready'}
          </div>
          <h1 className="font-display font-extrabold leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(36px,7vw,80px)' }}>
            {isDE ? <>Kollaboratives Design<br /></> : <>Collaborative Design<br /></>}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-cyan-400 to-purple-400">
              {isDE ? 'Figma Weave' : 'Figma Weave'}
            </span><br />
            {isDE ? 'für moderne Teams' : 'for modern teams'}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {isDE
              ? 'Verbinde Design und Frontend-Entwicklung. Figma Weave ist die ultimative Plattform für Wireframes, UI/UX-Design und interaktive Vektorgrafiken.'
              : 'Connect design and frontend development. Figma Weave is the ultimate platform for wireframes, UI/UX design and interactive vector graphics.'
            }
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-display font-bold text-base transition-all hover:shadow-[0_0_36px_rgba(249,115,22,0.45)] hover:-translate-y-0.5"
            >
              ✦ {isDE ? 'Figma Weave entdecken' : 'Discover Figma Weave'} <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/4 text-white font-display font-semibold text-base transition-all"
            >
              {isDE ? 'Funktionen ansehen' : 'View features'}
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 flex-wrap mt-16 pt-12 border-t border-white/7">
            {(isDE ? [
              { num: 'Echtzeit', label: 'Multiplayer-Modus' },
              { num: '1000+', label: 'Plugins & Widgets' },
              { num: 'Pixel', label: 'Genaues Layouting' },
              { num: 'Dev Mode', label: 'Entwickler-Support' },
            ] : [
              { num: 'Real-time', label: 'Multiplayer mode' },
              { num: '1000+', label: 'Plugins & widgets' },
              { num: 'Pixel', label: 'Perfect layouting' },
              { num: 'Dev Mode', label: 'Developer support' },
            ]).map(s => (
              <div key={s.label} className="text-center">
                <span className="block font-display font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">{s.num}</span>
                <span className="block text-white/50 text-sm mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-white/7 max-w-5xl mx-auto" />

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-orange-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">{isDE ? 'Features' : 'Features'}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4 leading-tight tracking-tight">
          {isDE ? <>Gebaut für schnelles,<br />präzises Design</> : <>Built for fast,<br />precise design</>}
        </h2>
        <p className="text-white/50 text-lg max-w-xl mb-12 leading-relaxed">
          {isDE ? 'Egal ob einfache Website oder komplexes Design-System – Figma Weave gibt dir die nötigen Werkzeuge an die Hand.' : 'Whether simple website or complex design system — Figma Weave gives you the tools you need.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayFeatures.map(f => (
            <div key={f.title} className={`relative rounded-2xl border border-white/7 bg-[#111827] p-7 hover:border-white/14 hover:-translate-y-1 transition-all overflow-hidden group`}>
              <div className={`absolute inset-0 bg-gradient-to-b ${f.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl mb-5">{f.icon}</div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{f.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed mb-4">{f.text}</p>
                <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded border ${f.color}`}>{f.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-white/7 max-w-5xl mx-auto" />

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-orange-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">{isDE ? 'Einsatzbereiche' : 'Use Cases'}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 tracking-tight">{isDE ? 'Für den gesamten Design-Workflow' : 'For the entire design workflow'}</h2>
        <p className="text-white/50 text-lg max-w-lg mb-12 leading-relaxed">
          {isDE ? 'Verbinde Designer, Entwickler und Projektmanager in einem einheitlichen Workspace.' : 'Connect designers, developers and project managers in one unified workspace.'}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {displayUsecases.map(u => (
            <div key={u.title} className="rounded-2xl border border-white/7 bg-[#111827] p-8 flex gap-5 hover:border-white/14 transition-all">
              <span className="text-3xl flex-shrink-0 mt-0.5">{u.icon}</span>
              <div>
                <h3 className="font-display font-bold text-white text-lg mb-2">{u.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{u.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-t border-white/7 max-w-5xl mx-auto" />

      {/* Pricing Teaser */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-orange-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">Workspace</p>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 tracking-tight">{isDE ? 'Gemeinsam Großes gestalten' : 'Design great things together'}</h2>
        <p className="text-white/50 text-lg mb-12">{isDE ? 'Figma Weave bietet alles für kollaborative Designprojekte in einem modernen Layout.' : 'Figma Weave provides everything for collaborative design projects in a modern layout.'}</p>
        <div className="max-w-sm mx-auto relative rounded-3xl border border-orange-500/30 bg-gradient-to-br from-[#111827] to-[#0d1220] p-12 text-center overflow-hidden">
          <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-72 h-36 bg-orange-500/12 rounded-full blur-[40px]" />
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4 relative z-10">✦ Pro Workspace</p>
          <ul className="text-left space-y-1 mb-10 relative z-10">
            {displayPricingFeatures.map(f => (
              <li key={f} className="flex items-center gap-3 py-2.5 border-b border-white/7 last:border-0 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <a
            href={LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 block w-full text-center py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-display font-bold text-base transition-all hover:shadow-[0_0_30px_rgba(249,115,22,0.4)]"
          >
            ✦ {isDE ? 'Jetzt starten' : 'Get started now'}
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="relative rounded-3xl border border-orange-500/20 overflow-hidden p-16 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(14,165,233,0.06) 100%)' }}>
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-5 leading-tight tracking-tight">
              {isDE ? <>Bereit für dein<br /><span className="text-orange-400">UI/UX Studio?</span></> : <>Ready for your<br /><span className="text-orange-400">UI/UX Studio?</span></>}
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
              {isDE ? 'Erstelle Designs und Prototypen auf Profi-Niveau. Figma Weave macht es dir und deinem Team leicht.' : 'Create professional-grade designs and prototypes. Figma Weave makes it easy for you and your team.'}
            </p>
            <a
              href={LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-display font-bold text-lg transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.45)] hover:-translate-y-0.5"
            >
              ✦ {isDE ? 'Figma Weave jetzt starten' : 'Start Figma Weave now'} <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-white/30 text-sm mt-5">{isDE ? 'Kostenloser Einstieg · Cloud-Basiert' : 'Free Entry · Cloud-Based'}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
