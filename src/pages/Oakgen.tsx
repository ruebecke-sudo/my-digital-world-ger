import { ExternalLink, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const features = [
  {
    icon: '🖼️',
    title: 'KI-Bildgenerierung',
    text: 'FLUX Pro, Midjourney, DALL-E 3, Ideogram V3 und Stable Diffusion, einfach Text eingeben und in Sekunden hochwertige Bilder erhalten.',
    tag: '200+ Modelle',
    color: 'bg-green-500/10 border-green-500/20 text-green-400',
    glow: 'from-green-500/10',
  },
  {
    icon: '🎬',
    title: 'KI-Videogenerierung',
    text: 'Sora 2, Veo 3.1, Kling 2.1, Wan 2.6, Text-zu-Video und Bild-zu-Video bis 4K. Cinematic Realism auf Knopfdruck.',
    tag: 'Bis 4K · Audio inklusive',
    color: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
    glow: 'from-sky-500/10',
  },
  {
    icon: '🎵',
    title: 'Musik & Sprache',
    text: 'Erstelle Songs mit Lyria 2, Suno oder MiniMax Music. Text-to-Speech und Voice Cloning mit ElevenLabs, alles aus einer Hand.',
    tag: 'ElevenLabs · Suno',
    color: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
    glow: 'from-purple-500/10',
  },
  {
    icon: '🤖',
    title: 'KI-Chat & Assistenten',
    text: 'Greife auf Claude Sonnet, GPT-5, Gemini Pro und DeepSeek zu, alle führenden Chat-Modelle unter einem Dach.',
    tag: '10+ Chat-Modelle',
    color: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    glow: 'from-amber-500/10',
  },
  {
    icon: '👤',
    title: 'Talking Avatars & UGC Ads',
    text: 'Erstelle sprechende Avatare und authentische UGC-Werbevideos für Social Media. Ideal für Creator und Marketer.',
    tag: 'HeyGen Integration',
    color: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
    glow: 'from-pink-500/10',
  },
  {
    icon: '⚡',
    title: 'Bildbearbeitung & Upscaling',
    text: 'KI-gestützter Image Editor, Face Swap, Photo Studio, Bildrestaurierung und Upscaling auf bis zu 4K, alles ohne externe Software.',
    tag: '4K Upscaling',
    color: 'bg-green-500/10 border-green-500/20 text-green-400',
    glow: 'from-green-500/10',
  },
]

const models = [
  { label: 'FLUX Pro', hot: true },
  { label: 'Midjourney', hot: true },
  { label: 'Veo 3.1', isNew: true },
  { label: 'Sora 2', hot: true },
  { label: 'Kling 2.1', hot: true },
  { label: 'Wan 2.6', hot: false },
  { label: 'Seedance 2.0', isNew: true },
  { label: 'LTX 2.0', hot: false },
  { label: 'ElevenLabs', hot: false },
  { label: 'Suno', hot: false },
  { label: 'Lyria 2', hot: true },
  { label: 'DALL-E 3', hot: false },
  { label: 'Stable Diffusion', hot: false },
  { label: 'Ideogram V3', hot: false },
  { label: 'Claude Sonnet', hot: true },
  { label: 'GPT-5', hot: true },
  { label: 'Gemini Pro', hot: false },
  { label: 'DeepSeek V3', hot: false },
  { label: 'Grok 4', hot: false },
  { label: 'MiniMax Music', hot: false },
  { label: 'HeyGen', hot: false },
  { label: 'Hailuo', hot: false },
  { label: 'AIVA', hot: false },
]

const usecases = [
  {
    icon: '🎨',
    title: 'Content Creator & Influencer',
    text: 'Erstelle täglich frischen Content: Thumbnails, Reels, Voice-Over und Musikuntermalung, in einem Nachmittag statt einer Woche.',
  },
  {
    icon: '🏢',
    title: 'Marketing & Agenturen',
    text: 'Produktvideos, UGC-Ads, Brand Content und Social Creatives, alle Deliverables aus einer Plattform, ohne Freelancer-Budget.',
  },
  {
    icon: '💻',
    title: 'Solo-Gründer & SaaS',
    text: 'Demo-Videos, Feature Announcements, Social Proof, professionelle Präsentation ohne teures Kreativteam.',
  },
  {
    icon: '🎬',
    title: 'Filmemacher & Videografen',
    text: 'Ergänze deine Produktion mit KI-Videoeffekten, cineastischen Clips, Musikscores und AI-Voice-Overs, für jedes Budget skalierbar.',
  },
]

const pricingFeatures = [
  '200+ KI-Modelle für Bilder & Videos',
  'KI-Chat: Claude, GPT, Gemini & mehr',
  'Sprach- & Musikgenerierung',
  'Talking Avatars & UGC Ads',
  'Bildbearbeitung & 4K-Upscaling',
  'Ein geteiltes Guthaben für alles',
  'Neue Modelle automatisch inklusive',
]

const LINK = 'https://oakgen.ai?ref=MDW26'

export default function Oakgen() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const featuresEN = [
    { icon: '🖼️', title: 'AI Image Generation', text: 'FLUX Pro, Midjourney, DALL-E 3, Ideogram V3 and Stable Diffusion, just enter text and get high-quality images in seconds.', tag: '200+ Models', color: 'bg-green-500/10 border-green-500/20 text-green-400', glow: 'from-green-500/10' },
    { icon: '🎬', title: 'AI Video Generation', text: 'Sora 2, Veo 3.1, Kling 2.1, Wan 2.6, text-to-video and image-to-video up to 4K. Cinematic realism at the push of a button.', tag: 'Up to 4K · Audio included', color: 'bg-sky-500/10 border-sky-500/20 text-sky-400', glow: 'from-sky-500/10' },
    { icon: '🎵', title: 'Music & Voice', text: 'Create songs with Lyria 2, Suno or MiniMax Music. Text-to-speech and voice cloning with ElevenLabs, all from one place.', tag: 'ElevenLabs · Suno', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400', glow: 'from-purple-500/10' },
    { icon: '🤖', title: 'AI Chat & Assistants', text: 'Access Claude Sonnet, GPT-5, Gemini Pro and DeepSeek, all leading chat models under one roof.', tag: '10+ Chat Models', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400', glow: 'from-amber-500/10' },
    { icon: '👤', title: 'Talking Avatars & UGC Ads', text: 'Create talking avatars and authentic UGC ad videos for social media. Ideal for creators and marketers.', tag: 'HeyGen Integration', color: 'bg-pink-500/10 border-pink-500/20 text-pink-400', glow: 'from-pink-500/10' },
    { icon: '⚡', title: 'Image Editing & Upscaling', text: 'AI-powered image editor, face swap, photo studio, image restoration and upscaling up to 4K, all without external software.', tag: '4K Upscaling', color: 'bg-green-500/10 border-green-500/20 text-green-400', glow: 'from-green-500/10' },
  ]

  const usecasesEN = [
    { icon: '🎨', title: 'Content Creators & Influencers', text: 'Create fresh content daily: thumbnails, reels, voice-over and music — in one afternoon instead of one week.' },
    { icon: '🏢', title: 'Marketing & Agencies', text: 'Product videos, UGC ads, brand content and social creatives — all deliverables from one platform, without a freelancer budget.' },
    { icon: '💻', title: 'Solo Founders & SaaS', text: 'Demo videos, feature announcements, social proof — professional presentation without an expensive creative team.' },
    { icon: '🎬', title: 'Filmmakers & Videographers', text: 'Complement your production with AI video effects, cinematic clips, music scores and AI voice-overs — scalable for any budget.' },
  ]

  const pricingFeaturesEN = [
    '200+ AI models for images & videos',
    'AI chat: Claude, GPT, Gemini & more',
    'Voice & music generation',
    'Talking avatars & UGC ads',
    'Image editing & 4K upscaling',
    'One shared credit for everything',
    'New models automatically included',
  ]

  const displayFeatures = isDE ? features : featuresEN
  const displayUsecases = isDE ? usecases : usecasesEN
  const displayPricingFeatures = isDE ? pricingFeatures : pricingFeaturesEN

  return (
    <div className="pt-20 pb-32 overflow-x-hidden">

      {/* Hero */}
      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-green-500/8 blur-[120px]" />
          <div className="absolute top-1/3 right-[-150px] w-[400px] h-[400px] rounded-full bg-sky-500/7 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[350px] h-[350px] rounded-full bg-purple-500/6 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/25 text-green-400 text-sm font-medium mb-8 tracking-wider">
            {isDE ? '✦ 200+ KI-Modelle · Ein Workspace · Ab $9/Monat' : '✦ 200+ AI Models · One Workspace · From $9/month'}
          </div>
          <h1 className="font-display font-extrabold leading-[1.05] tracking-tight mb-6" style={{ fontSize: 'clamp(36px,7vw,80px)' }}>
            {isDE ? <>Dein kreatives<br /></> : <>Your creative<br /></>}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-sky-400 to-purple-400">
              {isDE ? 'KI Studio' : 'AI Studio'}
            </span><br />
            {isDE ? 'in einer Plattform' : 'in one platform'}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {isDE
              ? 'Bilder, Videos, Sprache, Musik, Avatare und KI-Chat, alles vereint in Oakgen.ai. Schluss mit 10 verschiedenen Abos.'
              : 'Images, videos, voice, music, avatars and AI chat — all united in Oakgen.ai. No more 10 different subscriptions.'
            }
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-display font-bold text-base transition-all hover:shadow-[0_0_36px_rgba(34,197,94,0.45)] hover:-translate-y-0.5"
            >
              ✦ {isDE ? 'Jetzt entdecken' : 'Discover now'} <ExternalLink className="w-4 h-4" />
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
              { num: '200+', label: 'KI-Modelle verfügbar' },
              { num: '8', label: 'Kreativ-Kategorien' },
              { num: '$9', label: 'Pro Monat alles inklusive' },
              { num: '1', label: 'Einheitliches Guthaben' },
            ] : [
              { num: '200+', label: 'AI models available' },
              { num: '8', label: 'Creative categories' },
              { num: '$9', label: 'Per month, all included' },
              { num: '1', label: 'Unified credit pool' },
            ]).map(s => (
              <div key={s.label} className="text-center">
                <span className="block font-display font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">{s.num}</span>
                <span className="block text-white/50 text-sm mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="max-w-4xl mx-auto px-4 pb-16 -mt-4">
        <div className="rounded-2xl overflow-hidden border border-white/8 shadow-[0_0_60px_rgba(34,197,94,0.12)]">
          <video
            src="/oakgen_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* Visual showcase SVG cards */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Image Gen card */}
          <div className="rounded-2xl overflow-hidden border border-white/7 bg-[#111827] relative aspect-[4/3]">
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="og1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0f1e14"/><stop offset="100%" stopColor="#0a1628"/></linearGradient>
                <radialGradient id="oglow1" cx="50%" cy="60%" r="50%"><stop offset="0%" stopColor="#22c55e" stopOpacity="0.25"/><stop offset="100%" stopColor="#22c55e" stopOpacity="0"/></radialGradient>
              </defs>
              <rect width="400" height="300" fill="url(#og1)"/>
              <ellipse cx="200" cy="220" rx="180" ry="80" fill="url(#oglow1)"/>
              <polygon points="60,220 140,100 220,220" fill="#1a3a20" opacity="0.9"/>
              <polygon points="110,220 200,80 290,220" fill="#1e4a28" opacity="0.85"/>
              <polygon points="180,220 260,120 340,220" fill="#163318"/>
              <circle cx="50" cy="40" r="1.5" fill="#22c55e" opacity="0.8"/>
              <circle cx="120" cy="25" r="1" fill="white" opacity="0.5"/>
              <circle cx="300" cy="35" r="1.5" fill="#0ea5e9" opacity="0.7"/>
              <circle cx="240" cy="20" r="2" fill="white" opacity="0.6"/>
              <rect x="20" y="240" width="240" height="28" rx="6" fill="rgba(0,0,0,0.5)" stroke="rgba(34,197,94,0.3)" strokeWidth="1"/>
              <text x="30" y="259" fill="#22c55e" fontFamily="monospace" fontSize="11">✦ "Berg bei Sonnenuntergang..."</text>
            </svg>
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur border border-white/10 text-white/60 text-[11px] font-medium px-2.5 py-1 rounded-md">✦ KI-Bildgenerierung</div>
          </div>
          {/* Video Gen card */}
          <div className="rounded-2xl overflow-hidden border border-white/7 bg-[#111827] relative aspect-[4/3]">
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="og2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0e1a2e"/><stop offset="100%" stopColor="#1a0e2e"/></linearGradient>
                <radialGradient id="oglow2" cx="50%" cy="50%" r="40%"><stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"/><stop offset="100%" stopColor="#0ea5e9" stopOpacity="0"/></radialGradient>
              </defs>
              <rect width="400" height="300" fill="url(#og2)"/>
              <ellipse cx="200" cy="150" rx="140" ry="100" fill="url(#oglow2)"/>
              <rect x="10" y="10" width="380" height="280" rx="4" fill="none" stroke="rgba(14,165,233,0.15)" strokeWidth="2"/>
              <circle cx="200" cy="145" r="50" fill="rgba(14,165,233,0.1)" stroke="rgba(14,165,233,0.4)" strokeWidth="2"/>
              <polygon points="185,125 185,165 225,145" fill="#0ea5e9" opacity="0.9"/>
              <rect x="60" y="220" width="280" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
              <rect x="60" y="220" width="110" height="4" rx="2" fill="#0ea5e9"/>
              <rect x="60" y="248" width="60" height="18" rx="4" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.3)" strokeWidth="1"/>
              <text x="66" y="261" fill="#0ea5e9" fontFamily="monospace" fontSize="10">Sora 2</text>
              <rect x="130" y="248" width="50" height="18" rx="4" fill="rgba(14,165,233,0.15)" stroke="rgba(14,165,233,0.3)" strokeWidth="1"/>
              <text x="136" y="261" fill="#0ea5e9" fontFamily="monospace" fontSize="10">Veo 3</text>
            </svg>
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur border border-white/10 text-white/60 text-[11px] font-medium px-2.5 py-1 rounded-md">🎬 KI-Videogenerierung</div>
          </div>
          {/* Music card */}
          <div className="rounded-2xl overflow-hidden border border-white/7 bg-[#111827] relative aspect-[4/3]">
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="og3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#1a0e2a"/><stop offset="100%" stopColor="#0e1525"/></linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#og3)"/>
              {[30,48,66,84,102,120,138,156,174,192,210,228,246,264,282,300,318,336,354].map((x, i) => (
                <rect key={x} x={x} y={150, [40,60,30,70,50,80,55,35,75,50,90,60,30,65,45,80,50,35,60][i]} width="10" height={[80,120,60,140,100,160,110,70,150,100,180,120,60,130,90,160,100,70,120][i]} rx="5" fill={i % 3 === 2 ? '#ec4899' : '#a855f7'} opacity="0.75"/>
              ))}
              <text x="155" y="55" fill="#a855f7" fontSize="28" opacity="0.5">♪</text>
              <rect x="30" y="210" width="340" height="40" rx="8" fill="rgba(0,0,0,0.4)" stroke="rgba(168,85,247,0.2)" strokeWidth="1"/>
              <text x="50" y="235" fill="#a855f7" fontFamily="monospace" fontSize="11">ElevenLabs · Suno · Lyria 2</text>
            </svg>
            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur border border-white/10 text-white/60 text-[11px] font-medium px-2.5 py-1 rounded-md">🎵 Sprache & Musik</div>
          </div>
        </div>
      </section>

      <hr className="border-t border-white/7 max-w-5xl mx-auto" />

      {/* Features */}
      <section id="features" className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-green-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">{isDE ? 'Kernfunktionen' : 'Core Features'}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4 leading-tight tracking-tight">
          {isDE ? <>Alles, was du für<br />Kreativinhalte brauchst</> : <>Everything you need<br />for creative content</>}
        </h2>
        <p className="text-white/50 text-lg max-w-xl mb-12 leading-relaxed">
          {isDE ? 'Kein Tab-Wechsel, keine separaten Abos. Oakgen vereint die besten KI-Tools der Welt in einem einzigen Workspace.' : 'No tab-switching, no separate subscriptions. Oakgen unites the best AI tools in the world in a single workspace.'}
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

      {/* Models */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-green-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">{isDE ? 'Modell-Übersicht' : 'Model Overview'}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 tracking-tight">
          {isDE ? <>Die besten Modelle.<br />Ein Guthaben.</> : <>The best models.<br />One credit.</>}
        </h2>
        <p className="text-white/50 text-lg max-w-lg mb-10 leading-relaxed">
          {isDE ? 'Oakgen integriert die leistungsstärksten KI-Modelle der Welt, und erweitert das Angebot laufend.' : 'Oakgen integrates the most powerful AI models in the world — and continuously expands the offering.'}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {models.map(m => (
            <span
              key={m.label}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-default
                ${m.hot
                  ? 'border-green-500/30 text-green-400 bg-green-500/6 hover:border-green-400/50'
                  : 'border-white/7 text-white/50 bg-[#111827] hover:border-white/20 hover:text-white/80'
                }`}
            >
              {m.label}{m.isNew && <span className="ml-1.5 text-[9px] font-bold bg-amber-400 text-black px-1 py-px rounded align-middle">{isDE ? 'NEU' : 'NEW'}</span>}
            </span>
          ))}
        </div>
      </section>

      <hr className="border-t border-white/7 max-w-5xl mx-auto" />

      {/* Use Cases */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <p className="text-green-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">{isDE ? 'Für wen?' : 'Who is it for?'}</p>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 tracking-tight">{isDE ? 'Für jeden Kreativen' : 'For every creative'}</h2>
        <p className="text-white/50 text-lg max-w-lg mb-12 leading-relaxed">
          {isDE ? 'Egal ob Solopreneur, Agentur oder Content Creator, Oakgen passt sich deinem Workflow an.' : 'Whether solopreneur, agency or content creator — Oakgen adapts to your workflow.'}
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

      {/* Pricing */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <p className="text-green-400 text-xs font-bold tracking-[0.12em] uppercase mb-3">Pricing</p>
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4 tracking-tight">{isDE ? 'Unschlagbares Preis-Leistungs-Verhältnis' : 'Unbeatable value for money'}</h2>
        <p className="text-white/50 text-lg mb-12">{isDE ? 'Statt 10 einzelner Abos reicht ein einziger Plan für alle Tools.' : 'Instead of 10 separate subscriptions, one single plan covers all tools.'}</p>
        <div className="max-w-sm mx-auto relative rounded-3xl border border-green-500/30 bg-gradient-to-br from-[#111827] to-[#0d1220] p-12 text-center overflow-hidden">
          <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-72 h-36 bg-green-500/12 rounded-full blur-[40px]" />
          <p className="text-green-400 text-xs font-bold tracking-widest uppercase mb-4 relative z-10">✦ All-in-One Plan</p>
          <div className="font-display font-extrabold text-7xl text-white leading-none mb-2 relative z-10">
            <sup className="text-3xl align-super">$</sup>9
          </div>
          <p className="text-white/40 text-sm mb-10 relative z-10">{isDE ? 'pro Monat · alle Tools inklusive' : 'per month · all tools included'}</p>
          <ul className="text-left space-y-1 mb-10 relative z-10">
            {displayPricingFeatures.map(f => (
              <li key={f} className="flex items-center gap-3 py-2.5 border-b border-white/7 last:border-0 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <a
            href={LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 block w-full text-center py-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-display font-bold text-base transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
          >
            ✦ {isDE ? 'Jetzt loslegen' : 'Get started now'}
          </a>
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-3xl mx-auto px-4 pb-20">
        <div className="rounded-2xl border border-white/7 bg-[#111827] p-10 text-center">
          <div className="text-amber-400 text-xl tracking-widest mb-4">★★★★★</div>
          <blockquote className="text-white/80 text-lg italic leading-relaxed mb-5">
            {isDE
              ? '„Als Solo-Gründer ist Oakgen mein komplettes Kreativteam. Demo-Videos, Feature-Ankündigungen, Social Proof, alles in einem Nachmittag erledigt. Kein $2.000-Freelancer-Budget mehr nötig."'
              : '"As a solo founder, Oakgen is my entire creative team. Demo videos, feature announcements, social proof — all done in one afternoon. No more $2,000 freelancer budget needed."'
            }
          </blockquote>
          <cite className="text-white/40 text-sm not-italic">{isDE ? '— SaaS-Gründer, verifizierter Oakgen-Nutzer' : '— SaaS Founder, verified Oakgen user'}</cite>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="relative rounded-3xl border border-green-500/20 overflow-hidden p-16 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(14,165,233,0.06) 100%)' }}>
          <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full"
            style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.12) 0%, transparent 70%)' }} />
          <div className="relative z-10">
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-5 leading-tight tracking-tight">
              {isDE ? <>Bereit für dein<br /><span className="text-green-400">KI Studio?</span></> : <>Ready for your<br /><span className="text-green-400">AI Studio?</span></>}
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
              {isDE ? 'Starte heute mit Oakgen.ai, 200+ Modelle, ein Abo, unbegrenzte Kreativität.' : 'Start today with Oakgen.ai — 200+ models, one subscription, unlimited creativity.'}
            </p>
            <a
              href={LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-12 py-5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-display font-bold text-lg transition-all hover:shadow-[0_0_40px_rgba(34,197,94,0.45)] hover:-translate-y-0.5"
            >
              ✦ {isDE ? 'Oakgen.ai jetzt entdecken' : 'Discover Oakgen.ai now'} <ExternalLink className="w-5 h-5" />
            </a>
            <p className="text-white/30 text-sm mt-5">{isDE ? 'Kein Risiko · Sofort nutzbar · Ab $9/Monat' : 'No risk · Immediately usable · From $9/month'}</p>
          </div>
        </div>
      </section>

      {/* Affiliate note */}
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-white/25 text-xs">
          {isDE ? 'Diese Seite enthält Affiliate-Links. Bei einem Kauf erhalten wir eine kleine Provision, für dich entstehen keine Mehrkosten.' : 'This page contains affiliate links. If you make a purchase, we receive a small commission — at no extra cost to you.'}
        </p>
      </div>
    </div>
  )
}

