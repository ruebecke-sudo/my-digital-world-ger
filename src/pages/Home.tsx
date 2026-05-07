import { Link } from 'wouter'
import { ArrowRight, Globe, Share2, TrendingUp, Video, Brain, Presentation, Palette, ChevronRight, Star, Phone, Mail } from 'lucide-react'
import { useEffect, useRef } from 'react'

const services = [
  {
    icon: Globe,
    title: 'Webdesign & Webseitenerstellung',
    desc: 'Moderne, mobiloptimierte und SEO-freundliche Webseiten – individuell, benutzerfreundlich und überzeugend.',
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/20',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    desc: 'Reichweite steigern, neue Kunden gewinnen – mit individuellen Strategien und ansprechendem Content.',
    color: 'from-purple-500/20 to-cyan-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Kunden-Funnel',
    desc: 'Systematisch aus Fremden zahlende Kunden machen – strukturiert, messbar und effektiv.',
    color: 'from-green-500/20 to-cyan-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: Video,
    title: 'Kurzvideos & Reels',
    desc: 'Kurze, knackige Videos für Social Media – kreativ, professionell und zielgruppengerecht.',
    color: 'from-orange-500/20 to-cyan-500/10',
    border: 'border-orange-500/20',
  },
  {
    icon: Brain,
    title: 'KI-gestütztes Marketing',
    desc: 'Moderne KI-Tools für Text, Bild und Analyse – effizient, zielgerichtet und zukunftsorientiert.',
    color: 'from-pink-500/20 to-cyan-500/10',
    border: 'border-pink-500/20',
  },
  {
    icon: Presentation,
    title: 'Präsentationen',
    desc: 'Klar, strukturiert und visuell ansprechend – Präsentationen, die begeistern und überzeugen.',
    color: 'from-yellow-500/20 to-cyan-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: Palette,
    title: 'Künstlerische Bildbearbeitung',
    desc: 'Aus Ihrem Bild ein echtes Unikat – kreative Bildbearbeitung in höchster Qualität.',
    color: 'from-rose-500/20 to-cyan-500/10',
    border: 'border-rose-500/20',
  },
]

const stats = [
  { value: '100%', label: 'Maßgeschneidert' },
  { value: '7+', label: 'Leistungsbereiche' },
  { value: '∞', label: 'Kreativität' },
  { value: '24/7', label: 'Digital präsent' },
]

function AnimatedCounter({ value }: { value: string }) {
  return <span className="gradient-text font-display font-bold text-4xl md:text-5xl">{value}</span>
}

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function Home() {
  const statsRef = useInView()
  const servicesRef = useInView()

  return (
    <div className="overflow-x-hidden">
      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 bg-grid">
        {/* Decorative orbs */}
        <div className="hero-orb w-96 h-96 bg-cyan-500/15 top-1/4 -left-48 pulse-cyan" />
        <div className="hero-orb w-64 h-64 bg-blue-500/10 bottom-1/4 -right-32" style={{ animationDelay: '1s' }} />
        <div className="hero-orb w-48 h-48 bg-cyan-400/10 top-1/3 right-1/4 float-animation" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8" data-testid="text-hero-badge">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Kreative digitale Lösungen für Ihr Unternehmen
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight mb-6" data-testid="text-hero-headline">
            <span className="text-white">Ihre digitale</span>
            <br />
            <span className="gradient-text glow-cyan-text">Welt beginnt hier</span>
          </h1>

          {/* Subline */}
          <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl leading-relaxed mb-10" data-testid="text-hero-subtitle">
            Von der ersten Website bis zur kompletten digitalen Strategie – My Digital World bringt Ihr Unternehmen ins Rampenlicht der digitalen Ära.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-testid="group-hero-ctas">
            <Link href="/leistungen">
              <button className="btn-primary flex items-center gap-2 text-base" data-testid="button-hero-primary">
                Alle Leistungen
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/programme">
              <button className="btn-outline flex items-center gap-2 text-base" data-testid="button-hero-secondary">
                Zu den Programmen
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/30 text-sm" data-testid="group-trust-indicators">
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-cyan-400" />
              Ausgebildeter Mediendesigner
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-cyan-400" />
              Digitale & analoge Expertise
            </span>
            <span className="flex items-center gap-2">
              <Star className="w-4 h-4 text-cyan-400" />
              Maßgeschneiderte Lösungen
            </span>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060b18] to-transparent" />
      </section>

      {/* ========== STATS ========== */}
      <section className="py-20 section-overlay" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" data-testid="group-stats">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} />
                <p className="text-white/50 text-sm mt-2 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ABOUT ========== */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
                Über My Digital World
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight" data-testid="text-about-headline">
                Digitale Expertise,
                <br />
                <span className="gradient-text">die überzeugt</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                Die Reise begann in der analogen Welt der klassischen Mediengestaltung. Als ausgebildeter Mediendesigner habe ich den Wandel zur Digitalisierung aktiv mitgestaltet und begleitet.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Dieses Wissen aus beiden Welten setze ich gezielt für meine Kunden ein: bei der Erstellung moderner Webseiten, im Social Media Marketing und in der digitalen Content-Produktion – kombiniert mit technischem Know-how und einem breiten Erfahrungsschatz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 p-4 glass rounded-xl border-cyan-glow">
                  <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-white/40 text-xs">Telefon</p>
                    <a href="tel:+4915906146147" className="text-white text-sm font-medium hover:text-cyan-400 transition-colors" data-testid="link-about-phone">+49 159 0614 6147</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 glass rounded-xl border-cyan-glow">
                  <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <p className="text-white/40 text-xs">E-Mail</p>
                    <a href="mailto:info@my-digital-world.de" className="text-white text-sm font-medium hover:text-cyan-400 transition-colors" data-testid="link-about-email">info@my-digital-world.de</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual element */}
            <div className="relative" data-testid="group-about-visual">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/10 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-8 rounded-full border border-cyan-500/30" />

                {/* Center card */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="glass rounded-2xl border border-cyan-500/20 p-8 text-center w-64">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <Globe className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="font-display font-bold text-white text-lg mb-1">My Digital World</h3>
                    <p className="text-white/40 text-xs">Rüdiger Becker</p>
                    <p className="text-white/40 text-xs">Mediendesigner & Digital-Experte</p>
                  </div>
                </div>

                {/* Floating icons */}
                {[Brain, Video, Share2, Palette].map((Icon, i) => {
                  const angle = (i * 90) * (Math.PI / 180)
                  const r = 44
                  const x = 50 + r * Math.cos(angle)
                  const y = 50 + r * Math.sin(angle)
                  return (
                    <div
                      key={i}
                      className="absolute w-10 h-10 rounded-xl glass border border-cyan-500/20 flex items-center justify-center float-animation"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        animationDelay: `${i * 0.5}s`,
                      }}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES PREVIEW ========== */}
      <section className="py-24 section-overlay" ref={servicesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
              Kreative digitale Leistungen
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4" data-testid="text-services-headline">
              Was wir für Sie
              <br />
              <span className="gradient-text">möglich machen</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              Mit My Digital World setzen Sie nicht auf Standard, sondern auf maßgeschneiderte Strategien, die exakt auf Ihre Bedürfnisse zugeschnitten sind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" data-testid="group-services-grid">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.title}
                  data-testid={`card-service-${service.title.slice(0, 10).replace(/\s/g, '-').toLowerCase()}`}
                  className={`card-hover glass rounded-2xl border ${service.border} p-6 group`}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-sm mb-2 leading-tight">{service.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{service.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/leistungen">
              <button className="btn-primary flex items-center gap-2 mx-auto" data-testid="button-services-all">
                Alle Leistungen entdecken
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== PROGRAMME TEASER ========== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-12 text-center">
            {/* Background decoration */}
            <div className="hero-orb w-64 h-64 bg-cyan-500/10 -top-32 left-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
                Zu den Programmen
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4" data-testid="text-programmes-teaser-headline">
                Entdecken Sie alle
                <br />
                <span className="gradient-text">digitalen Programme</span>
              </h2>
              <p className="text-white/50 max-w-lg mx-auto text-base mb-8">
                Eine vollständige Übersicht aller Programme und digitalen Werkzeuge, die My Digital World für Sie bereitstellt.
              </p>
              <Link href="/programme">
                <button className="btn-primary flex items-center gap-2 mx-auto text-base" data-testid="button-to-programmes">
                  Zur Programmübersicht
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA / CONTACT ========== */}
      <section className="py-24 section-overlay">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4" data-testid="text-cta-headline">
            Bereit für die
            <br />
            <span className="gradient-text">digitale Zukunft?</span>
          </h2>
          <p className="text-white/50 text-base mb-10">
            Nehmen Sie jetzt Kontakt auf und lassen Sie uns gemeinsam Ihre digitale Strategie entwickeln.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="mailto:info@my-digital-world.de" data-testid="button-cta-email" className="btn-primary flex items-center gap-2 text-base">
              <Mail className="w-5 h-5" />
              E-Mail schreiben
            </a>
            <a href="tel:+4915906146147" data-testid="button-cta-phone" className="btn-outline flex items-center gap-2 text-base">
              <Phone className="w-5 h-5" />
              Anrufen
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
