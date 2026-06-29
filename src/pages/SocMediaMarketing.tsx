import { ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import { Link } from 'wouter'
import { useLanguage } from '../context/LanguageContext'

export default function SocMediaMarketing() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const highlights = isDE
    ? ['Vereinfache Deine Aufgaben', 'Automatisiere Deine Prozesse', 'Vereinheitliche Deine Tools']
    : ['Simplify your tasks', 'Automate your processes', 'Unify your tools']

  const features = isDE
    ? ['Plane Inhalte für den Monat', 'Wähle die besten Stunden und Hashtags aus', 'Genehmige geplanten Inhalt', 'Messe Deine Ergebnisse mit intuitiven Grafiken', 'Antworte von einem Ort aus auf Kommentare', 'Analysiere Deine Konkurrenten', 'Analysiere und wähle den richtigen Influencer aus', 'Verknüpfe Deine strategischen Inhalte', 'Erstelle visuelle Berichte in 5 Minuten']
    : ['Plan content for the month', 'Choose the best times and hashtags', 'Approve scheduled content', 'Measure your results with intuitive graphics', 'Reply to comments from one place', 'Analyze your competitors', 'Analyze and choose the right influencer', 'Link your strategic content', 'Create visual reports in 5 minutes']

  const leistungen = isDE
    ? ['Individuelle Content-Strategie für Ihr Unternehmen', 'Facebook, Instagram & Co. Betreuung', 'Professionelle Beitragsgestaltung', 'Community Management', 'Kanal-Analyse und Reporting', 'Hashtag-Strategie und Timing-Optimierung', 'Kurzvideos für Social Media', 'Werbeanzeigen-Management']
    : ['Individual content strategy for your business', 'Facebook, Instagram & Co. management', 'Professional post design', 'Community management', 'Channel analysis and reporting', 'Hashtag strategy and timing optimization', 'Short videos for social media', 'Ad management']

  return (
    <div className="pt-24 pb-32">
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            {isDE ? 'Leistungen' : 'Services'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            Soc. Media<br /><span className="gradient-text">Marketing</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            {isDE ? 'My digital world Empfehlung für Social Media Marketing' : 'My digital world recommendation for social media marketing'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        <div className="glass rounded-2xl border border-cyan-500/15 p-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
              {isDE ? 'My digital world Empfehlung' : 'My digital world recommendation'}
            </span>
            <h2 className="font-display font-bold text-white text-2xl md:text-3xl mb-2">
              {isDE ? 'Soc. Media Marketing Software' : 'Soc. Media Marketing Software'}
            </h2>
          </div>
          <blockquote className="border-l-2 border-cyan-500/50 pl-4 mb-6">
            <p className="text-white/70 text-base italic leading-relaxed">
              {isDE ? 'Metricool: Das digitale Schweizer Taschenmesser für Social Media Marketer' : 'Metricool: The digital Swiss Army knife for social media marketers'}
            </p>
            <p className="text-white/70 text-base mt-2">
              {isDE
                ? <>Mehr als 2 Millionen Fachleute, Agenturen und Marken nutzen <strong className="text-white">Metricool</strong> als One-Stop-Shop für Social Media und Online-Anzeigenmanagement.</>
                : <>More than 2 million professionals, agencies and brands use <strong className="text-white">Metricool</strong> as a one-stop shop for social media and online ad management.</>
              }
            </p>
          </blockquote>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {highlights.map((item) => (
              <div key={item} className="glass rounded-xl border border-cyan-500/10 p-4 text-center">
                <p className="text-white font-semibold text-base">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-white font-semibold mb-4">{isDE ? 'Ein einziges Tool für alle Social Media Aufgaben:' : 'One single tool for all social media tasks:'}</p>
          <p className="text-white/70 text-base mb-6">
            {isDE
              ? 'Für alle, unabhängig von Ihren Fähigkeiten, Kenntnissen und Ressourcen. Denn wir glauben, dass alle Menschen, Unternehmen und Organisationen, unabhängig von ihrer Größe oder ihrem Budget, einen prominenten Platz in der digitalen Welt verdienen.'
              : 'For everyone, regardless of your skills, knowledge and resources. Because we believe that all people, businesses and organizations, regardless of their size or budget, deserve a prominent place in the digital world.'
            }
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
            {features.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-white/70 text-base">{item}</span>
              </div>
            ))}
          </div>
          <a href="https://f.mtr.cool/IZCUBS" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 w-fit" data-testid="link-metricool">
            {isDE ? 'Gehe jetzt zu Metricool' : 'Go to Metricool now'} <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="glass rounded-2xl border border-white/5 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-6">{isDE ? 'Unsere Social Media Leistungen' : 'Our social media services'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {leistungen.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-white/70 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/kontakt">
            <button className="btn-primary flex items-center gap-2 mx-auto text-base">
              {isDE ? 'Jetzt anfragen' : 'Enquire now'} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
