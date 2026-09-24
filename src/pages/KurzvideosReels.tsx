import { useState, useRef } from 'react'
import { Link } from 'wouter'
import {
  Video,
  Play,
  Pause,
  Volume2,
  Sparkles,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Smartphone,
  Eye,
  Share2,
  Zap,
  Film,
  Layers,
  Award
} from 'lucide-react'
import { FaInstagram, FaTiktok, FaFacebook, FaYoutube } from 'react-icons/fa'
import { useLanguage } from '../context/LanguageContext'

interface ReelItem {
  id: string
  titleDE: string
  titleEN: string
  categoryDE: string
  categoryEN: string
  descDE: string
  descEN: string
  videoUrl: string
  duration: string
  tags: string[]
}

const reelsData: ReelItem[] = [
  {
    id: 'burg-dreis',
    titleDE: 'Burg Dreis – Kulisse & Atmosphäre',
    titleEN: 'Burg Dreis – Scenery & Atmosphere',
    categoryDE: 'Location & Gastronomie',
    categoryEN: 'Location & Hospitality',
    descDE: 'Atmosphärisches Kurzvideo mit dynamischen Schnitten und emotionalem Storytelling für Events, Gastronomie und exklusive Locations.',
    descEN: 'Atmospheric short video featuring dynamic cuts and emotional storytelling for events, hospitality, and exclusive venues.',
    videoUrl: '/Videos%20Reel/Burg%20Dreis%20Reel-18-09-2026.mp4',
    duration: '0:57',
    tags: ['Location', 'Event', '9:16 HD'],
  },
  {
    id: 'zb-interieur-magazin',
    titleDE: 'ZB Interieur – Magazin Ausgabe 2026',
    titleEN: 'ZB Interieur – Magazine Edition 2026',
    categoryDE: 'Editorial & Design Showcase',
    categoryEN: 'Editorial & Design Showcase',
    descDE: 'Elegante visuelle Vorstellung des aktuellen Magazins 2026 mit stilvollen Übergängen und Fokus auf Trends und Inspirationen.',
    descEN: 'Elegant visual presentation of the current 2026 magazine with stylish transitions and focus on trends and inspiration.',
    videoUrl: '/Videos%20Reel/Zb%20Interieur%20Magazin%202026%20LR.mp4',
    duration: '1:47',
    tags: ['Magazin', 'Editorial', '9:16 HD'],
  },
  {
    id: 'zb-interieur-reel-2',
    titleDE: 'ZB Interieur – Modern Living & Wohlfühlatmosphäre',
    titleEN: 'ZB Interieur – Modern Living & Ambiance',
    categoryDE: 'Interior Design & Wohnkultur',
    categoryEN: 'Interior Design & Living',
    descDE: 'Exklusive Einblicke in moderne Raumkonzepte, hochwertige Materialien und harmonische Möbelarrangements im vertikalen Videoformat.',
    descEN: 'Exclusive insights into modern room concepts, high-end materials, and harmonious furniture arrangements in vertical video format.',
    videoUrl: '/Videos%20Reel/ZB%20Interieur%20Reel%202%2021-9-2026%20gr.mp4',
    duration: '0:51',
    tags: ['Interior', 'Living', '9:16 HD'],
  },
  {
    id: 'zb-interieur-moeller-design',
    titleDE: 'ZB Interieur – Möller Design Showcase',
    titleEN: 'ZB Interieur – Möller Design Showcase',
    categoryDE: 'Möbeldesign & Handwerk',
    categoryEN: 'Furniture Design & Craft',
    descDE: 'Präzise Inszenierung der handwerklichen Exzellenz und Eleganz von Möller Design Betten und Schlafzimmermöbeln.',
    descEN: 'Precise staging of craftsmanship excellence and elegance of Möller Design beds and bedroom furniture.',
    videoUrl: '/Videos%20Reel/ZB%20Interieur%20Reel%20Moeller%20Design%203.mp4',
    duration: '0:59',
    tags: ['Möller Design', 'Brand Spot', '9:16 HD'],
  },
]

export default function KurzvideosReels() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const vorteile = isDE
    ? [
        {
          icon: TrendingUp,
          title: 'Maximale organische Reichweite',
          desc: 'Die Algorithmen von Instagram, TikTok und Facebook pushen vertikale Kurzvideos bevorzugt in den Feed von Nutzern, die Ihnen noch nicht folgen.',
        },
        {
          icon: Smartphone,
          title: 'Natives 9:16 Vollbild-Format',
          desc: 'Kurzvideos füllen den gesamten Bildschirm des Smartphones aus. Keine Ablenkung, volle Aufmerksamkeit auf Ihre Produkte und Botschaften.',
        },
        {
          icon: Eye,
          title: 'Starke Hooks in den ersten 3 Sekunden',
          desc: 'Wir konzipieren gezielte Einstiege, die das Weiterscrollen sofort stoppen und die Zuschauer bis zum Call-to-Action fesseln.',
        },
        {
          icon: Share2,
          title: 'Höhere Interaktion & Viralität',
          desc: 'Reels werden überdurchschnittlich oft gelikt, kommentiert und geteilt – der effektivste Hebel für authentisches Wachstum.',
        },
      ]
    : [
        {
          icon: TrendingUp,
          title: 'Maximum Organic Reach',
          desc: 'Algorithms on Instagram, TikTok and Facebook prioritize short-form vertical videos to users who do not follow you yet.',
        },
        {
          icon: Smartphone,
          title: 'Native 9:16 Fullscreen Format',
          desc: 'Short videos fill the entire smartphone screen. Zero distraction, 100% focus on your products and message.',
        },
        {
          icon: Eye,
          title: 'Compelling 3-Second Hooks',
          desc: 'We craft hooks that immediately stop the scroll and keep viewers hooked all the way to your call-to-action.',
        },
        {
          icon: Share2,
          title: 'Higher Engagement & Virality',
          desc: 'Reels generate significantly more likes, comments, and shares — the most effective driver for organic business growth.',
        },
      ]

  const schritte = isDE
    ? [
        {
          nr: '01',
          title: 'Konzept & Storyboard',
          desc: 'Zielgruppenanalyse, Definition der Kernbotschaft und Entwicklung eines packenden Skripts mit starker Hook.',
        },
        {
          nr: '02',
          title: 'Aufnahme & Footage',
          desc: 'Dreharbeiten vor Ort mit professionellem Equipment oder Aufbereitung Ihres bestehenden Bild- und Videomaterials.',
        },
        {
          nr: '03',
          title: 'Dynamischer Videoschnitt',
          desc: 'Präziser Rhythmus, visuelle Effekte, Zooms und Übergänge, die für flüssige Übergänge und hohe Verweildauer sorgen.',
        },
        {
          nr: '04',
          title: 'Sound & Captions',
          desc: 'Trendige, lizenzierte Musik sowie dynamische Untertitel – unverzichtbar, da über 70% aller Kurzvideos lautlos geschaut werden.',
        },
        {
          nr: '05',
          title: 'Plattform-Optimierung',
          desc: 'Export in optimaler Auflösung, passender Bildrate und Dateigröße für Instagram, TikTok, Facebook & YouTube Shorts.',
        },
      ]
    : [
        {
          nr: '01',
          title: 'Concept & Storyboard',
          desc: 'Audience analysis, core message definition, and development of a captivating script with a proven hook.',
        },
        {
          nr: '02',
          title: 'Shooting & Footage',
          desc: 'On-location filming with professional gear or expert adaptation of your existing photo and video assets.',
        },
        {
          nr: '03',
          title: 'Dynamic Video Editing',
          desc: 'Precise pacing, visual accents, zoom cuts, and seamless transitions engineered for maximum watch time.',
        },
        {
          nr: '04',
          title: 'Sound & Captions',
          desc: 'Trendy, licensed audio and bold subtitles — essential since over 70% of viewers watch without sound.',
        },
        {
          nr: '05',
          title: 'Platform Optimization',
          desc: 'Export in crisp resolution, correct frame rates, and optimal compression for Instagram, TikTok, Facebook & Shorts.',
        },
      ]

  const plattformen = [
    {
      name: 'Instagram Reels',
      icon: FaInstagram,
      color: 'from-pink-500/20 to-purple-500/10 border-pink-500/30 text-pink-400',
      badgeColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      descDE: 'Perfekt für Markenaufbau, stilvolle Visuals, Produktplatzierungen und virale Explore-Reichweite.',
      descEN: 'Ideal for brand building, aesthetic visuals, product features, and viral explore page discovery.',
    },
    {
      name: 'TikTok',
      icon: FaTiktok,
      color: 'from-cyan-500/20 to-pink-500/10 border-cyan-500/30 text-cyan-400',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      descDE: 'Die Königsklasse für rasante organische Reichweite, Trend-Sounds und authentische Kundenansprache.',
      descEN: 'The gold standard for rapid organic reach, trending audios, and authentic customer connection.',
    },
    {
      name: 'Facebook Reels',
      icon: FaFacebook,
      color: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      descDE: 'Hervorragend für kaufkräftige Zielgruppen, lokale Dienstleister und hohe Teilungsraten im Newsfeed.',
      descEN: 'Great for high-intent audiences, regional service businesses, and high share rates in user feeds.',
    },
    {
      name: 'YouTube Shorts',
      icon: FaYoutube,
      color: 'from-red-500/20 to-orange-500/10 border-red-500/30 text-red-400',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/20',
      descDE: 'Nachhaltige Auffindbarkeit über die YouTube-Suche und schneller Aufbau treuer Kanal-Abonnenten.',
      descEN: 'Long-term discoverability via YouTube search algorithms and fast subscriber acquisition.',
    },
  ]

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="hero-orb w-64 h-64 bg-purple-500/10 bottom-0 right-1/4" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Film className="w-4 h-4" />
            <span>{isDE ? 'Leistungen · Social Media Video' : 'Services · Social Media Video'}</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight" data-testid="text-kurzvideos-headline">
            {isDE ? (
              <>
                Kurzvideos <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  &amp; Reels
                </span>
              </>
            ) : (
              <>
                Short Videos <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
                  &amp; Reels
                </span>
              </>
            )}
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {isDE
              ? 'Professionelle Reels & Kurzvideos für Instagram, TikTok, Facebook & YouTube Shorts. Fesselndes Storytelling und erstklassiger Videoschnitt, der Ihre Reichweite explodieren lässt.'
              : 'Professional reels & short-form videos for Instagram, TikTok, Facebook & YouTube Shorts. Engaging storytelling and premier video editing engineered to scale your reach.'}
          </p>

          {/* Social Platform Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold">
              <FaInstagram className="w-4 h-4" /> Instagram Reels
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold">
              <FaTiktok className="w-4 h-4" /> TikTok
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
              <FaFacebook className="w-4 h-4" /> Facebook Reels
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-semibold">
              <FaYoutube className="w-4 h-4" /> YouTube Shorts
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#showcase" className="btn-primary flex items-center gap-2 text-base">
              <Play className="w-4 h-4 fill-black" />
              {isDE ? 'Reels ansehen' : 'Watch Reels'}
            </a>
            <Link href="/kontakt">
              <button className="btn-outline flex items-center gap-2 text-base">
                {isDE ? 'Projekt anfragen' : 'Request Project'} <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-24">

        {/* SHOWCASE SECTION */}
        <section id="showcase" className="scroll-mt-28">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              {isDE ? 'Video Showcase' : 'Video Showcase'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Unsere Reels & Kurzvideo Produktionen' : 'Our Reels & Short Video Productions'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE
                ? 'Erleben Sie hier einige Beispiele unserer Kurzvideo-Produktionen im optimierten 9:16 Hochformat. Jedes Video wurde speziell für maximale Aufmerksamkeit auf Mobilgeräten gestaltet.'
                : 'Experience examples of our short-form video productions in optimized 9:16 vertical format. Each video is custom-crafted for maximum engagement on mobile screens.'}
            </p>
          </div>

          {/* Grid of 4 Vertical Reels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reelsData.map((reel) => (
              <div
                key={reel.id}
                className="glass rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden flex flex-col group bg-[#091024]/70 shadow-xl shadow-black/40"
              >
                {/* 9:16 Video Player Container */}
                <div className="relative aspect-[9/16] bg-black/60 overflow-hidden">
                  <video
                    src={reel.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 pointer-events-none flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-cyan-400">
                      9:16 Reel
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-white/80">
                      {reel.duration}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {reel.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-300 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs font-semibold text-cyan-400 mb-1">
                      {isDE ? reel.categoryDE : reel.categoryEN}
                    </p>
                    <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-cyan-300 transition-colors">
                      {isDE ? reel.titleDE : reel.titleEN}
                    </h3>
                    <p className="text-white/70 text-xs leading-relaxed mb-4">
                      {isDE ? reel.descDE : reel.descEN}
                    </p>
                  </div>

                  {/* Open in full window button */}
                  <div className="pt-3 border-t border-white/5 mt-auto">
                    <a
                      href={reel.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-xs font-medium text-white transition-all"
                    >
                      <span>{isDE ? 'In voller Größe öffnen' : 'Open in Full Size'}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHY REELS SECTION */}
        <section className="glass rounded-3xl border border-white/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              {isDE ? 'Der Reichweiten-Booster' : 'Reach Accelerator'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Warum Kurzvideos heute den Unterschied machen' : 'Why Short Videos Make the Difference Today'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE
                ? 'Das Nutzerverhalten in sozialen Netzwerken hat sich grundlegend gewandelt: Schnelle, visuell ansprechende Hochkant-Videos haben die höchste Aufmerksamkeit und Verweildauer. Wer heute wachsen will, setzt auf Reels.'
                : 'Social media consumption has fundamentally shifted: Fast, visually engaging vertical videos command the highest attention and watch time. Brands that want to grow today must leverage reels.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vorteile.map((v) => {
              const Icon = v.icon
              return (
                <div
                  key={v.title}
                  className="glass rounded-2xl border border-white/5 p-6 hover:border-cyan-500/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{v.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* SUPPORTED PLATFORMS */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5" />
              {isDE ? 'Multi-Plattform Strategie' : 'Multi-Platform Strategy'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Ein Video – Bereit für alle Kanäle' : 'One Video – Ready for All Channels'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE
                ? 'Wir produzieren Ihre Kurzvideos so, dass sie nahtlos auf allen führenden Plattformen performen. Nutzen Sie Synergien und maximieren Sie Ihre Sichtbarkeit ohne Mehrarbeit.'
                : 'We produce your short videos to perform seamlessly across all leading platforms. Leverage synergies and maximize your visibility with zero extra hassle.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plattformen.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.name}
                  className="glass rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${p.badgeColor}`}>
                        9:16
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{p.name}</h3>
                    <p className="text-white/70 text-xs leading-relaxed">
                      {isDE ? p.descDE : p.descEN}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="glass rounded-3xl border border-white/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              {isDE ? 'Ablauf & Produktion' : 'Workflow & Production'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Schritt für Schritt zu Ihrem fertigen Reel' : 'Step by Step to Your Finished Reel'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE
                ? 'Von der ersten Idee bis zum fertigen Video für Ihren Feed: Unser bewährter Produktionsprozess garantiert professionelle Ergebnisse ohne unnötigen Aufwand für Sie.'
                : 'From initial concept to final publish-ready reel: our streamlined workflow guarantees professional results with zero friction for your team.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {schritte.map((s, idx) => (
              <div
                key={s.nr}
                className="relative glass rounded-2xl border border-white/5 p-5 flex flex-col hover:border-cyan-500/20 transition-all"
              >
                <div className="font-display font-black text-3xl text-cyan-400/40 mb-3">{s.nr}</div>
                <h4 className="font-display font-bold text-white text-sm mb-2">{s.title}</h4>
                <p className="text-white/60 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <div className="glass rounded-3xl border border-cyan-500/20 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {isDE ? 'Jetzt Reichweite aufbauen' : 'Start Scaling Your Reach'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Bereit für Ihre eigenen Reels?' : 'Ready for Your Own Custom Reels?'}
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-8">
              {isDE
                ? 'Lassen Sie uns gemeinsam virale Kurzvideos erstellen, die Ihre Zielgruppe fesseln und Ihr Unternehmen sichtbar machen. Schreiben Sie uns einfach eine Nachricht oder rufen Sie direkt an!'
                : 'Let us craft engaging short-form videos together that captivate your audience and elevate your brand visibility. Send us a message or give us a call!'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/kontakt">
                <button className="btn-primary flex items-center gap-2 text-base">
                  {isDE ? 'Jetzt unverbindlich anfragen' : 'Inquire Now Without Obligation'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <a
                href="https://wa.me/4915906146147"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex items-center gap-2 text-base"
              >
                {isDE ? 'WhatsApp Direktkontakt' : 'Direct WhatsApp'}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
