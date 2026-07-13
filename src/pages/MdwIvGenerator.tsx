import { ExternalLink, CheckCircle, Video, Image, Zap, Sparkles, TrendingUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const features = [
  {
    icon: '🎬',
    title: 'High-End KI-Videogenerierung',
    text: 'Erstelle flüssige Videos in Full-HD (1080p) mit Luma Ray 2. Ideal für Social-Media-Content, E-Commerce-Animationen und kreative Clips.',
    tag: 'Luma Ray 2 · 1080p',
    color: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    glow: 'from-purple-500/10',
  },
  {
    icon: '🖼️',
    title: 'KI-Bildgenerierung auf Profi-Niveau',
    text: 'Nutze modernste FLUX-Modelle (Schnell & Dev) für fotorealistische und detailreiche Bilder. Keine komplizierten Prompts nötig.',
    tag: 'FLUX Dev/Schnell',
    color: 'bg-green-500/10 border-green-500/20 text-green-400',
    glow: 'from-green-500/10',
  },
  {
    icon: '✨',
    title: 'Echtzeit-Übersetzer 🇩🇪 ➔ 🇺🇸',
    text: 'Gib deine Prompts einfach auf Deutsch ein und lasse sie mit einem Klick in perfekt optimiertes Englisch für die Bildmodelle übersetzen.',
    tag: 'Integrierte Übersetzung',
    color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    glow: 'from-cyan-500/10',
  },
  {
    icon: '🛍️',
    title: 'E-Commerce Fotostudio',
    text: 'Verwandle einfache Produktfotos in professionelle Studioaufnahmen für Onlineshops. Entferne Hintergründe auf Knopfdruck.',
    tag: 'Product Studio & Background Remover',
    color: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    glow: 'from-amber-500/10',
  },
  {
    icon: '📈',
    title: 'KI Image Upscaling (Enhance)',
    text: 'Skaliere und schärfe deine generierten Bilder per Mausklick, um druckfertige High-End-Motive für Marketing und Druck zu erhalten.',
    tag: 'Enhance & Upscale',
    color: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    glow: 'from-pink-500/10',
  },
  {
    icon: '🌐',
    title: 'Community-Galerie & Archiv',
    text: 'Speichere deine Kunstwerke sicher in deinem persönlichen Medienarchiv und teile deine besten Kreationen direkt in der Galerie.',
    tag: 'Medienarchiv & Share-Funktion',
    color: 'bg-green-500/10 border-green-500/20 text-green-400',
    glow: 'from-green-500/10',
  },
]

const usecases = [
  {
    icon: '🎨',
    title: 'Social Media Creator',
    text: 'Erstelle virale Reels, TikTok-Videos und Instagram-Posts in Rekordzeit. Perfekter Content ohne lange Renderzeiten.',
  },
  {
    icon: '🛒',
    title: 'E-Commerce Händler',
    text: 'Präsentiere deine Produkte in verkaufsstarken Kulissen für Shopify, Amazon und Co. – ganz ohne teures physisches Fotostudio.',
  },
  {
    icon: '📐',
    title: 'Designer & Kreativagenturen',
    text: 'Nutze den Generator für schnelles Prototyping, Moodboards und visuelle Inspiration in Kundenprojekten.',
  },
  {
    icon: '🚀',
    title: 'Marketing-Teams',
    text: 'Generiere ansprechende Werbeanzeigen, Bildmotive und animierte Produktpräsentationen zur Steigerung deines ROAS.',
  },
]

const pricingFeatures = [
  'Inklusive 200 kostenfreier Start-Credits',
  'Full-HD 1080p Videoerstellung (5 Credits)',
  'Hochwertige FLUX Bildgenerierung (1 Credit)',
  'Unbegrenzter Zugriff auf E-Commerce Studio',
  'Kostenloser Hintergrund-Entferner',
  'Kein Abonnement-Zwang (Pay-as-you-go)',
  'Volle kommerzielle Nutzungsrechte',
]

const LINK = 'https://mdw-bild-videogenerator.netlify.app'

export default function MdwIvGenerator() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const featuresEN = [
    { icon: '🎬', title: 'High-End AI Video Generation', text: 'Create smooth videos in Full-HD (1080p) using Luma Ray 2. Perfect for social media content, e-commerce animations and creative clips.', tag: 'Luma Ray 2 · 1080p', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400', glow: 'from-purple-500/10' },
    { icon: '🖼️', title: 'Professional-Grade AI Image Generation', text: 'Use state-of-the-art FLUX models (Schnell & Dev) for photorealistic and detailed images. No complex prompting required.', tag: 'FLUX Dev/Schnell', color: 'bg-green-500/10 border-green-500/20 text-green-400', glow: 'from-green-500/10' },
    { icon: '✨', title: 'Real-time Translator 🇩🇪 ➔ 🇺🇸', text: 'Simply enter your prompts in German and translate them into perfectly optimized English for the AI models with one click.', tag: 'Integrated Translation', color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400', glow: 'from-cyan-500/10' },
    { icon: '🛍️', title: 'E-Commerce Product Studio', text: 'Transform simple product photos into professional studio shots for online stores. Remove backgrounds at the click of a button.', tag: 'Product Studio & Background Remover', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400', glow: 'from-amber-500/10' },
    { icon: '📈', title: 'AI Image Upscaling (Enhance)', text: 'Scale and sharpen your generated images with one click to get print-ready high-end motifs for marketing and print.', tag: 'Enhance & Upscale', color: 'bg-pink-500/10 border-pink-500/20 text-pink-400', glow: 'from-pink-500/10' },
    { icon: '🌐', title: 'Community Gallery & Archive', text: 'Save your artwork securely in your personal media archive and share your best creations directly in the gallery.', tag: 'Media Archive & Share Function', color: 'bg-green-500/10 border-green-500/20 text-green-400', glow: 'from-green-500/10' },
  ]

  const usecasesEN = [
    { icon: '🎨', title: 'Social Media Creators', text: 'Create viral reels, TikTok videos and Instagram posts in record time. Perfect content without long rendering times.' },
    { icon: '🛒', title: 'E-Commerce Sellers', text: 'Present your products in high-converting backgrounds for Shopify, Amazon, etc. — without an expensive physical photo studio.' },
    { icon: '📐', title: 'Designers & Creative Agencies', text: 'Use the generator for fast prototyping, mood boards and visual inspiration in customer projects.' },
    { icon: '🚀', title: 'Marketing Teams', text: 'Generate engaging ads, image assets and animated product presentations to increase your ROAS.' },
  ]

  const pricingFeaturesEN = [
    'Includes 200 free starting credits',
    'Full-HD 1080p video creation (5 credits)',
    'High-quality FLUX image generation (1 credit)',
    'Unlimited access to E-Commerce Studio',
    'Free background remover tool',
    'No monthly subscription required (Pay-as-you-go)',
    'Full commercial usage rights',
  ]

  const displayFeatures = isDE ? features : featuresEN
  const displayUsecases = isDE ? usecases : usecasesEN
  const displayPricingFeatures = isDE ? pricingFeatures : pricingFeaturesEN

  return (
    <div className="pt-20 pb-32 overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-purple-500/8 blur-[120px]" />
          <div className="absolute top-1/3 right-[-150px] w-[400px] h-[400px] rounded-full bg-orange-500/7 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-cyan-500/6 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/25 text-orange-400 text-sm font-medium mb-8 tracking-wider">
            {isDE ? '✦ 200 Free Credits · FLUX Dev · Luma Ray 2' : '✦ 200 Free Credits · FLUX Dev · Luma Ray 2'}
          </div>
          <h1 className="font-display font-extrabold leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(36px,7vw,80px)' }}>
            {isDE ? <>Fotorealistische Bilder &<br /></> : <>Photorealistic Images &<br /></>}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400">
              {isDE ? 'Full-HD Videos' : 'Full-HD Videos'}
            </span><br />
            {isDE ? 'in Sekundenschnelle' : 'in seconds'}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {isDE
              ? 'Erstelle atemberaubende KI-Bilder und 1080p Videos mit dem MDW-IV-Generator. Profitiere von dem integrierten E-Commerce-Fotostudio und unserer exklusiven Prompt-Bibliothek.'
              : 'Create stunning AI images and 1080p videos with the MDW-IV-Generator. Benefit from the integrated E-Commerce Photo Studio and our exclusive prompt library.'
            }
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-display font-bold text-base transition-all hover:shadow-[0_0_36px_rgba(249,115,22,0.45)] hover:-translate-y-0.5"
            >
              ✦ {isDE ? 'Jetzt kostenlos starten' : 'Start for free now'} <ExternalLink className="w-4 h-4" />
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
              { num: '200', label: 'Credits geschenkt' },
              { num: '1080p', label: 'Full-HD Auflösung' },
              { num: '1 Klick', label: 'Deutsch-Englisch Übersetzung' },
              { num: '0 €', label: 'Abo-Zwang (Pay-as-you-go)' },
            ] : [
              { num: '200', label: 'Free credits included' },
              { num: '1080p', label: 'Full-HD Resolution' },
              { num: '1 Click', label: 'German-English translation' },
              { num: '0 €', label: 'Subscription required' },
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
        <p className="text-orange-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">{isDE ? 'Funktionen' : 'Features'}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4 leading-tight tracking-tight">
          {isDE ? <>Alles, was du für moderne<br />KI-Medien brauchst</> : <>Everything you need for modern<br />AI media</>}
        </h2>
        <p className="text-white/50 text-lg max-w-xl mb-12 leading-relaxed">
          {isDE ? 'Nutze die fortschrittlichsten Text-to-Video und Image-to-Video Modelle direkt in einem einfachen, deutschsprachigen Dashboard.' : 'Use the most advanced text-to-video and image-to-video models directly in a simple dashboard.'}
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
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 tracking-tight">{isDE ? 'Maximale Performance für dein Projekt' : 'Maximum performance for your project'}</h2>
        <p className="text-white/50 text-lg max-w-lg mb-12 leading-relaxed">
          {isDE ? 'Erzeuge hochwertige Visuals für Marketing, Vertrieb, Webdesign und Content Creation.' : 'Generate high-quality visuals for marketing, sales, web design and content creation.'}
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

      {/* Pricing / Credit System */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-orange-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">Credits</p>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 tracking-tight">{isDE ? 'Kostenloser Start mit 200 Credits' : 'Free start with 200 credits'}</h2>
        <p className="text-white/50 text-lg mb-12">{isDE ? 'Erhalte direkt nach der Registrierung 200 Credits geschenkt und lade bei Bedarf flexibel auf.' : 'Get 200 credits free immediately after registration and top up flexibly if needed.'}</p>
        <div className="max-w-sm mx-auto relative rounded-3xl border border-orange-500/30 bg-gradient-to-br from-[#111827] to-[#0d1220] p-12 text-center overflow-hidden">
          <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-72 h-36 bg-orange-500/12 rounded-full blur-[40px]" />
          <p className="text-orange-400 text-xs font-bold tracking-widest uppercase mb-4 relative z-10">✦ Pay-As-You-Go Plan</p>
          <div className="font-display font-extrabold text-7xl text-white leading-none mb-2 relative z-10">
            <sup className="text-3xl align-super">€</sup>0
          </div>
          <p className="text-white/40 text-sm mb-10 relative z-10">{isDE ? 'für die ersten 200 Credits' : 'for the first 200 credits'}</p>
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
            ✦ {isDE ? 'Jetzt kostenlos registrieren' : 'Register for free now'}
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
              {isDE ? <>Bereit für den<br /><span className="text-orange-400">MDW-IV-Generator?</span></> : <>Ready for the<br /><span className="text-orange-400">MDW-IV-Generator?</span></>}
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
              {isDE ? 'Erstelle atemberaubende Full-HD Videos und fotorealistische Bilder. Melde dich an und sichere dir 200 kostenfreie Start-Credits.' : 'Create stunning Full-HD videos and photorealistic images. Register and get 200 free starting credits.'}
            </p>
            <a
              href={LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-display font-bold text-lg transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.45)] hover:-translate-y-0.5"
            >
              ✦ {isDE ? 'Generator jetzt starten' : 'Start Generator now'} <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-white/30 text-sm mt-5">{isDE ? '200 Gratis-Credits · Sofort nutzbar · Ohne Kreditkarte' : '200 Free Credits · Instantly usable · No credit card'}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
