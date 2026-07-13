import { Link } from 'wouter'
import { ArrowRight, Monitor, Share2, Bot, Video, CheckCircle2, Star } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Home() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const heroServices = isDE
    ? [
        { icon: Monitor, title: 'website Design', text: 'Ihre Website ist Ihr digitales Schaufenster! My digital world gestaltet moderne, benutzerfreundliche und responsive Websites, die Ihre Marke perfekt präsentieren. Von der Konzeption bis zur Umsetzung.' },
        { icon: Share2, title: 'Soc. Media Marketing', text: 'Steigern Sie Ihre Reichweite und gewinnen Sie neue Kunden mit gezieltem Social Media Marketing! My digital world entwickelt individuelle Strategien, erstellt ansprechende Inhalte und managt Ihre Social Media Kanäle.' },
        { icon: Bot, title: 'KI applications', text: 'Entdecken Sie das Potenzial von Künstlicher Intelligenz für Ihr Unternehmen! My digital world integriert KI-basierte Lösungen, um Ihre Prozesse zu automatisieren. Machen Sie Ihr Business zukunftssicher mit KI!' },
        { icon: Video, title: 'video produktion', text: 'Bewegen Sie Ihre Zielgruppe mit kurzen, knackigen Social Media Videos! My digital world produziert professionelle Kurzvideos. Perfekt für Instagram, TikTok, Facebook & Co.' },
      ]
    : [
        { icon: Monitor, title: 'Website Design', text: 'Your website is your digital storefront! My digital world creates modern, user-friendly and responsive websites that present your brand perfectly — from concept to completion.' },
        { icon: Share2, title: 'Soc. Media Marketing', text: 'Boost your reach and attract new customers with targeted social media marketing! My digital world develops individual strategies, creates engaging content and manages your social media channels.' },
        { icon: Bot, title: 'AI Applications', text: 'Discover the potential of artificial intelligence for your business! My digital world integrates AI-based solutions to automate your processes. Make your business future-proof with AI!' },
        { icon: Video, title: 'Video Production', text: 'Move your target audience with short, punchy social media videos! My digital world produces professional short videos — perfect for Instagram, TikTok, Facebook & Co.' },
      ]

  const leistungen = isDE
    ? [
        { title: 'Website Development', text: 'Eine professionelle Webseite überzeugt Kunden, schafft Vertrauen und macht Sie sichtbar. My digital world erstellt moderne, mobiloptimierte Seiten, individuell, benutzerfreundlich und suchmaschinenoptimiert.', href: '/aktionspreis-fuer-webseiten', cta: 'Mehr Infos' },
        { title: 'soc. media marketing', text: 'Social Media stärkt Ihre Marke und bringt neue Kunden. My digital world entwickelt individuelle Strategien für Facebook, Instagram & Co., mit kreativem Content und klarer Planung.', href: '/soc-media-marketing', cta: 'Mehr Infos' },
        { title: 'print- produkte', text: 'Print bleibt stark, vor allem regional. Wir gestalten hochwertige Flyer, Magazine und Poster, die visuell überzeugen und Ihre Botschaft klar vermitteln, vom Design bis zur Druckdatei.', href: '/kontakt', cta: 'Kontakt' },
        { title: 'Präsentiere Dich digital', text: 'In der heutigen Geschäftswelt zählt der erste Eindruck, und eine überzeugende Präsentation kann den entscheidenden Unterschied machen. Ich unterstütze Sie dabei, Ihre Inhalte klar, strukturiert und visuell ansprechend darzustellen.', href: '/digitale-praesentationen', cta: 'Mehr Infos' },
        { title: 'ki applications', text: 'Künstliche Intelligenz macht Marketing smart. Ob Text, Bild oder Analyse, My digital world nutzt moderne KI-Tools, um Ihre Projekte effizient und zielgerichtet umzusetzen.', href: '/ki-agenten', cta: 'Mehr Infos' },
        { title: 'Dig. Transformation', text: 'Das Bild wird künstlerisch überarbeitet. Ob knallige Farben, abstrahierte Details oder ein Mix aus mehreren Varianten, hier entsteht aus Deinem Bild ein echtes Unikat.', href: '/digitale-transformation', cta: 'Mehr Infos' },
      ]
    : [
        { title: 'Website Development', text: 'A professional website convinces customers, builds trust and makes you visible. My digital world creates modern, mobile-optimized pages — individual, user-friendly and SEO-optimized.', href: '/aktionspreis-fuer-webseiten', cta: 'Learn more' },
        { title: 'Soc. Media Marketing', text: 'Social media strengthens your brand and brings new customers. My digital world develops individual strategies for Facebook, Instagram & Co. — with creative content and clear planning.', href: '/soc-media-marketing', cta: 'Learn more' },
        { title: 'Print Products', text: 'Print remains strong — especially regionally. We design high-quality flyers, magazines and posters that visually convince and clearly convey your message — from design to print file.', href: '/kontakt', cta: 'Contact' },
        { title: 'Present Yourself Digitally', text: "In today's business world, first impressions count — and a compelling presentation can make the decisive difference. I support you in presenting your content clearly, structured and visually appealing.", href: '/digitale-praesentationen', cta: 'Learn more' },
        { title: 'AI Applications', text: 'Artificial intelligence makes marketing smart. Whether text, image or analysis — My digital world uses modern AI tools to implement your projects efficiently and purposefully.', href: '/ki-agenten', cta: 'Learn more' },
        { title: 'Dig. Transformation', text: 'Your photo is artistically reworked. Whether bold colors, abstracted details or a mix of several variants — your image becomes a unique artwork.', href: '/digitale-transformation', cta: 'Learn more' },
      ]

  const gruende = isDE
    ? [
        { title: 'Digitale Lösungen, die wirklich etwas bewegen', text: 'Mit My Digital World setzen Sie nicht auf Standard, sondern auf maßgeschneiderte Strategien, die exakt auf Ihre Bedürfnisse zugeschnitten sind. Ob Website, Online-Marketing oder digitale Transformation: Wir denken ganzheitlich, handeln effizient und liefern Ergebnisse, die sichtbar und messbar sind.' },
        { title: 'Partnerschaft auf Augenhöhe statt anonymer Dienstleister', text: 'Bei uns stehen Sie im Mittelpunkt. Als Ihr digitaler Partner begleiten wir Sie transparent, persönlich und engagiert, von der ersten Idee bis zur erfolgreichen Umsetzung. Wir sprechen Ihre Sprache und setzen auf langfristige Zusammenarbeit mit klaren Zielen und echtem Mehrwert.' },
        { title: 'Mehr Sichtbarkeit. Mehr Reichweite. Mehr Erfolg.', text: 'Mit unserem umfassenden Know-how im digitalen Bereich bringen wir Ihr Business nach vorn. Durch datengetriebenes Online-Marketing, moderne Webtechnologien und kreative Konzepte sorgen wir für nachhaltiges Wachstum, damit Sie nicht nur mithalten, sondern vorausgehen.' },
      ]
    : [
        { title: 'Digital solutions that truly make a difference', text: "With My Digital World you don't settle for standard — but for tailored strategies precisely suited to your needs. Whether website, online marketing or digital transformation: we think holistically, act efficiently and deliver results that are visible and measurable." },
        { title: 'Partnership at eye level instead of anonymous service providers', text: "You are at the center of everything we do. As your digital partner we accompany you transparently, personally and committedly — from the first idea to successful implementation. We speak your language and rely on long-term collaboration with clear goals and real value." },
        { title: 'More visibility. More reach. More success.', text: "With our comprehensive know-how in the digital field we move your business forward. Through data-driven online marketing, modern web technologies and creative concepts we ensure sustainable growth — so you don't just keep up, but get ahead." },
      ]

  return (
    <div className="overflow-x-hidden">
      {/* TOP VIDEO */}
      <div className="w-full pt-16">
        <video src="/hero_video.mp4" autoPlay muted loop playsInline className="w-full h-auto block" />
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center pt-16 bg-grid">
        <div className="hero-orb w-96 h-96 bg-cyan-500/15 top-1/4 -left-48 pulse-cyan" />
        <div className="hero-orb w-64 h-64 bg-blue-500/10 bottom-1/4 -right-32" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight mb-6" data-testid="text-hero-headline">
              <span className="text-white">{isDE ? 'Kreative digitale Lösungen' : 'Creative digital solutions'}</span>
              <br />
              <span className="gradient-text glow-cyan-text">{isDE ? 'für dein Unternehmen' : 'for your business'}</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              {isDE
                ? <>Moderne Webseiten | digitale Transformation –<br />Wir bieten Ihnen Lösungen um sichtbarer zu werden</>
                : <>Modern websites | digital transformation –<br />We offer solutions to make you more visible</>
              }
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/aktionspreis-fuer-webseiten">
                <button className="btn-primary flex items-center gap-2 text-base" data-testid="button-hero-primary">
                  Website Design <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/programme">
                <button className="btn-outline flex items-center gap-2 text-base" data-testid="button-hero-secondary">
                  {isDE ? 'Zu den Programmen' : 'See programs'} <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {heroServices.map((s) => (
              <div key={s.title} className="card-hover glass rounded-2xl p-5 border border-cyan-500/10 hover:border-cyan-500/30 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                  <s.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-2 capitalize">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{s.text}</p>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                About us
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 leading-tight" data-testid="text-about-headline">
                {isDE ? <>Digitale Kompetenz<br /><span className="gradient-text">mit Erfahrung</span></> : <>Digital expertise<br /><span className="gradient-text">with experience</span></>}
              </h2>
              <div className="space-y-4 text-white/75 leading-relaxed text-base">
                {isDE ? (
                  <>
                    <p>Die digitale Welt ist rasant gewachsen, doch ich bin ihr einen Schritt voraus. Denn meine Reise begann lange vor dem digitalen Zeitalter, in der analogen Welt der klassischen Mediengestaltung.</p>
                    <p>Als ausgebildeter Mediendesigner habe ich den Wandel zur Digitalisierung nicht nur miterlebt, sondern aktiv mitgestaltet. Dieses Wissen aus beiden Welten setze ich heute gezielt für meine Kunden ein: bei der Erstellung moderner Webseiten, im Social Media Marketing und in der digitalen Content-Produktion.</p>
                    <p>Wer auf digitale Lösungen setzt, profitiert bei mir nicht nur von technischem Know-how, sondern auch von einem breiten Erfahrungsschatz.</p>
                  </>
                ) : (
                  <>
                    <p>The digital world has grown rapidly — but I stay one step ahead. My journey began long before the digital age, in the analog world of classic media design.</p>
                    <p>As a trained media designer I didn't just witness the shift to digitalization, I actively helped shape it. I apply this knowledge from both worlds specifically for my clients: in creating modern websites, in social media marketing and in digital content production.</p>
                    <p>Those who rely on digital solutions benefit not just from technical know-how, but also from a wealth of experience.</p>
                  </>
                )}
              </div>
            </div>
            <div className="glass rounded-3xl p-8 border border-cyan-500/10">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div>
                  <div className="font-display text-3xl font-black text-cyan-400 mb-1">15+</div>
                  <div className="text-white/75 text-sm">{isDE ? 'Jahre Expertise' : 'Years expertise'}</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-cyan-400 mb-1">15+</div>
                  <div className="text-white/75 text-sm">{isDE ? 'Jahre Weiterbildung' : 'Years training'}</div>
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-cyan-400 mb-1">15+</div>
                  <div className="text-white/75 text-sm">{isDE ? 'Über den Tellerrand' : 'Thinking outside the box'}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />)}
                  </div>
                  <span className="text-white/75 text-base">{isDE ? 'Ausgebildeter Mediendesigner' : 'Certified media designer'}</span>
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              {isDE ? 'Kreative digitale Leistungen' : 'Creative digital services'}
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4" data-testid="text-services-headline">
              {isDE ? <>Kreative digitale Lösungen<br /><span className="gradient-text">für dein Unternehmen</span></> : <>Creative digital solutions<br /><span className="gradient-text">for your business</span></>}
            </h2>
            <p className="text-white/70 max-w-xl mx-auto text-base">
              {isDE
                ? <>My digital world bietet zielgerichtete Lösungen im digitalen Bereich an.<br />Profitiere von unserer Expertise.</>
                : <>My digital world offers targeted solutions in the digital space.<br />Benefit from our expertise.</>
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="group-services-grid">
            {leistungen.map((l) => (
              <div key={l.title} className="card-hover glass rounded-2xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all group flex flex-col">
                <h3 className="font-display font-bold text-white mb-3 capitalize">{l.title}</h3>
                <p className="text-white/70 text-base leading-relaxed flex-1">{l.text}</p>
                <div className="mt-5">
                  <Link href={l.href}>
                    <button className="flex items-center gap-2 text-cyan-400 text-base font-medium hover:text-cyan-300 transition-colors">
                      {l.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARUM */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              {isDE ? 'Warum My digital world' : 'Why My digital world'}
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4" data-testid="text-warum-headline">
              {isDE
                ? <>15 Jahre Expertise. 15 Jahre Weiterbildung.<br /><span className="gradient-text">15 Jahre über den Tellerrand geschaut</span></>
                : <>15 years of expertise. 15 years of training.<br /><span className="gradient-text">15 years of thinking outside the box</span></>
              }
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gruende.map((g) => (
              <div key={g.title} className="glass rounded-2xl p-6 border border-cyan-500/10">
                <CheckCircle2 className="w-6 h-6 text-cyan-400 mb-4" />
                <h3 className="font-display font-bold text-white mb-3 text-base">{g.title}</h3>
                <p className="text-white/70 text-base leading-relaxed">{g.text}</p>
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                {isDE ? 'Zu den Programmen' : 'See programs'}
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4" data-testid="text-programmes-teaser-headline">
                {isDE
                  ? <>Entdecke die besten<br /><span className="gradient-text">KI Tools & Programme</span></>
                  : <>Discover the best<br /><span className="gradient-text">AI Tools & Programs</span></>
                }
              </h2>
              <p className="text-white/70 max-w-lg mx-auto text-base mb-8">
                {isDE
                  ? 'Eine Übersicht der besten KI Tools und Programme die My digital world bereitstellt.'
                  : 'An overview of the best AI tools and programs that My digital world provides.'
                }
              </p>
              <Link href="/programme">
                <button className="btn-primary flex items-center gap-2 mx-auto text-base" data-testid="button-to-programmes">
                  {isDE ? 'Zur Programmübersicht' : 'See all programs'} <ArrowRight className="w-5 h-5" />
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
            {isDE
              ? <>Bereit für die<br /><span className="gradient-text">digitale Zukunft?</span></>
              : <>Ready for the<br /><span className="gradient-text">digital future?</span></>
            }
          </h2>
          <p className="text-white/70 text-base mb-10">
            {isDE
              ? 'Nehmen Sie jetzt Kontakt auf und lassen Sie uns gemeinsam Ihre digitale Strategie entwickeln.'
              : "Get in touch now and let's develop your digital strategy together."
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/kontakt">
              <button className="btn-primary flex items-center gap-2 text-base">
                {isDE ? 'Kontakt aufnehmen' : 'Get in touch'} <ArrowRight className="w-5 h-5" />
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

