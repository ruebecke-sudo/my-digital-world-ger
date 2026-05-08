import { Link } from 'wouter'
import { ArrowRight, Monitor, Share2, Bot, Video, CheckCircle2, Star } from 'lucide-react'

const heroServices = [
  {
    icon: Monitor,
    title: 'website Design',
    text: 'Ihre Website ist Ihr digitales Schaufenster! My digital world gestaltet moderne, benutzerfreundliche und responsive Websites, die Ihre Marke perfekt präsentieren. Von der Konzeption bis zur Umsetzung.',
  },
  {
    icon: Share2,
    title: 'Soc. Media Marketing',
    text: 'Steigern Sie Ihre Reichweite und gewinnen Sie neue Kunden mit gezieltem Social Media Marketing! My digital world entwickelt individuelle Strategien, erstellt ansprechende Inhalte und managt Ihre Social Media Kanäle.',
  },
  {
    icon: Bot,
    title: 'KI applications',
    text: 'Entdecken Sie das Potenzial von Künstlicher Intelligenz für Ihr Unternehmen! My digital world integriert KI-basierte Lösungen, um Ihre Prozesse zu automatisieren. Machen Sie Ihr Business zukunftssicher mit KI!',
  },
  {
    icon: Video,
    title: 'video produktion',
    text: 'Bewegen Sie Ihre Zielgruppe mit kurzen, knackigen Social Media Videos! My digital world produziert professionelle Kurzvideos. Perfekt für Instagram, TikTok, Facebook & Co.',
  },
]

const leistungen = [
  {
    title: 'Website Development',
    text: 'Eine professionelle Webseite überzeugt Kunden, schafft Vertrauen und macht Sie sichtbar. My digital world erstellt moderne, mobiloptimierte Seiten – individuell, benutzerfreundlich und suchmaschinenoptimiert.',
    href: '/aktionspreis-fuer-webseiten',
    cta: 'Mehr Infos',
  },
  {
    title: 'soc. media marketing',
    text: 'Social Media stärkt Ihre Marke und bringt neue Kunden. My digital world entwickelt individuelle Strategien für Facebook, Instagram & Co. – mit kreativem Content und klarer Planung.',
    href: '/soc-media-marketing',
    cta: 'Mehr Infos',
  },
  {
    title: 'print- produkte',
    text: 'Print bleibt stark – vor allem regional. Wir gestalten hochwertige Flyer, Magazine und Poster, die visuell überzeugen und Ihre Botschaft klar vermitteln – vom Design bis zur Druckdatei.',
    href: '/kontakt',
    cta: 'Kontakt',
  },
  {
    title: 'Präsentiere Dich digital',
    text: 'In der heutigen Geschäftswelt zählt der erste Eindruck – und eine überzeugende Präsentation kann den entscheidenden Unterschied machen. Ich unterstütze Sie dabei, Ihre Inhalte klar, strukturiert und visuell ansprechend darzustellen.',
    href: '/digitale-praesentationen',
    cta: 'Mehr Infos',
  },
  {
    title: 'ki applications',
    text: 'Künstliche Intelligenz macht Marketing smart. Ob Text, Bild oder Analyse – My digital world nutzt moderne KI-Tools, um Ihre Projekte effizient und zielgerichtet umzusetzen.',
    href: '/ki-agenten',
    cta: 'Mehr Infos',
  },
  {
    title: 'Dig. Transformation',
    text: 'Das Bild wird künstlerisch überarbeitet. Ob knallige Farben, abstrahierte Details oder ein Mix aus mehreren Varianten – hier entsteht aus Deinem Bild ein echtes Unikat.',
    href: '/digitale-transformation',
    cta: 'Mehr Infos',
  },
]

const gruende = [
  {
    title: 'Digitale Lösungen, die wirklich etwas bewegen',
    text: 'Mit My Digital World setzen Sie nicht auf Standard – sondern auf maßgeschneiderte Strategien, die exakt auf Ihre Bedürfnisse zugeschnitten sind. Ob Website, Online-Marketing oder digitale Transformation: Wir denken ganzheitlich, handeln effizient und liefern Ergebnisse, die sichtbar und messbar sind.',
  },
  {
    title: 'Partnerschaft auf Augenhöhe statt anonymer Dienstleister',
    text: 'Bei uns stehen Sie im Mittelpunkt. Als Ihr digitaler Partner begleiten wir Sie transparent, persönlich und engagiert – von der ersten Idee bis zur erfolgreichen Umsetzung. Wir sprechen Ihre Sprache und setzen auf langfristige Zusammenarbeit mit klaren Zielen und echtem Mehrwert.',
  },
  {
    title: 'Mehr Sichtbarkeit. Mehr Reichweite. Mehr Erfolg.',
    text: 'Mit unserem umfassenden Know-how im digitalen Bereich bringen wir Ihr Business nach vorn. Durch datengetriebenes Online-Marketing, moderne Webtechnologien und kreative Konzepte sorgen wir für nachhaltiges Wachstum – damit Sie nicht nur mithalten, sondern vorausgehen.',
  },
]

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16 bg-grid">
        <div className="hero-orb w-96 h-96 bg-cyan-500/15 top-1/4 -left-48 pulse-cyan" />
        <div className="hero-orb w-64 h-64 bg-blue-500/10 bottom-1/4 -right-32" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight mb-6" data-testid="text-hero-headline">
              <span className="text-white">Kreative digitale Lösungen</span>
              <br />
              <span className="gradient-text glow-cyan-text">für dein Unternehmen</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Moderne Webseiten | digitale Transformation –<br />
              Wir bieten Ihnen Lösungen um sichtbarer zu werden
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/aktionspreis-fuer-webseiten">
                <button className="btn-primary flex items-center gap-2 text-base" data-testid="button-hero-primary">
                  Alle Leistungen <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/programme">
                <button className="btn-outline flex items-center gap-2 text-base" data-testid="button-hero-secondary">
                  Zu den Programmen <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* 4 hero services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {heroServices.map((s) => (
              <div
                key={s.title}
                className="card-hover glass rounded-2xl p-5 border border-cyan-500/10 hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                  <s.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-display font-bold text-white text-sm mb-2 capitalize">{s.title}</h3>
                <p className="text-white/70 text-xs leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060b18] to-transparent" />
      </section>

      {/* ABOUT */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
                About us
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight" data-testid="text-about-headline">
                Digitale Kompetenz<br />
                <span className="gradient-text">mit Erfahrung</span>
              </h2>
              <div className="space-y-4 text-white/75 leading-relaxed text-base">
                <p>
                  Die digitale Welt ist rasant gewachsen – doch ich bin ihr einen Schritt voraus. Denn meine Reise begann lange vor dem digitalen Zeitalter, in der analogen Welt der klassischen Mediengestaltung.
                </p>
                <p>
                  Als ausgebildeter Mediendesigner habe ich den Wandel zur Digitalisierung nicht nur miterlebt, sondern aktiv mitgestaltet. Dieses Wissen aus beiden Welten setze ich heute gezielt für meine Kunden ein: bei der Erstellung moderner Webseiten, im Social Media Marketing und in der digitalen Content-Produktion.
                </p>
                <p>
                  Wer auf digitale Lösungen setzt, profitiert bei mir nicht nur von technischem Know-how, sondern auch von einem breiten Erfahrungsschatz.
                </p>
              </div>
            </div>
            <div className="glass rounded-3xl p-8 border border-cyan-500/10">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="font-display text-3xl font-black text-cyan-400 mb-1">15+</div>
                  <div className="text-white/75 text-xs">Jahre Expertise</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-cyan-400 mb-1">15+</div>
                  <div className="text-white/75 text-xs">Jahre Weiterbildung</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-cyan-400 mb-1">15+</div>
                  <div className="text-white/75 text-xs">Über den Tellerrand</div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />)}
                  </div>
                  <span className="text-white/75 text-sm">Ausgebildeter Mediendesigner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section className="py-24 section-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
              Kreative digitale Leistungen
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4" data-testid="text-services-headline">
              Kreative digitale Lösungen<br />
              <span className="gradient-text">für dein Unternehmen</span>
            </h2>
            <p className="text-white/70 max-w-xl mx-auto text-base">
              My digital world bietet zielgerichtete Lösungen im digitalen Bereich an.<br />
              Profitiere von unserer Expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="group-services-grid">
            {leistungen.map((l) => (
              <div
                key={l.title}
                className="card-hover glass rounded-2xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all group flex flex-col"
              >
                <h3 className="font-display font-bold text-white mb-3 capitalize">{l.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed flex-1">{l.text}</p>
                <div className="mt-5">
                  <Link href={l.href}>
                    <button className="flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors">
                      {l.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARUM MY DIGITAL WORLD */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-4">
              Warum My digital world
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4" data-testid="text-warum-headline">
              15 Jahre Expertise. 15 Jahre Weiterbildung.<br />
              <span className="gradient-text">15 Jahre über den Tellerrand geschaut</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gruende.map((g) => (
              <div key={g.title} className="glass rounded-2xl p-6 border border-cyan-500/10">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="font-display font-bold text-white mb-3 text-sm">{g.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME TEASER */}
      <section className="py-24 section-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 p-12 text-center">
            <div className="hero-orb w-64 h-64 bg-cyan-500/10 -top-32 left-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
                Zu den Programmen
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4" data-testid="text-programmes-teaser-headline">
                Entdecken Sie alle<br />
                <span className="gradient-text">digitalen Programme</span>
              </h2>
              <p className="text-white/70 max-w-lg mx-auto text-base mb-8">
                Eine vollständige Übersicht aller KI-Programme und digitalen Werkzeuge, die My Digital World für Sie bereitstellt.
              </p>
              <Link href="/programme">
                <button className="btn-primary flex items-center gap-2 mx-auto text-base" data-testid="button-to-programmes">
                  Zur Programmübersicht <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Bereit für die<br />
            <span className="gradient-text">digitale Zukunft?</span>
          </h2>
          <p className="text-white/70 text-base mb-10">
            Nehmen Sie jetzt Kontakt auf und lassen Sie uns gemeinsam Ihre digitale Strategie entwickeln.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/kontakt">
              <button className="btn-primary flex items-center gap-2 text-base">
                Kontakt aufnehmen <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <a href="tel:+4915906146147" className="btn-outline flex items-center gap-2 text-base">
              +49 (0) 159 0614 6147
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
