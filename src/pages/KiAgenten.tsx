import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'wouter'
import { useLanguage } from '../context/LanguageContext'

export default function KiAgenten() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const anwendungsbereiche = isDE
    ? [
        { titel: 'Kundenservice', text: 'KI Agenten beantworten automatisch Anfragen, bieten Produktempfehlungen oder leiten komplexe Anliegen an den passenden Mitarbeiter weiter.' },
        { titel: 'Vertrieb & Marketing', text: 'Automatisierte Analyse-Tools erkennen Trends, segmentieren Zielgruppen und personalisieren Kampagnen in Echtzeit.' },
        { titel: 'Projektmanagement', text: 'Digitale Assistenten können Aufgaben priorisieren, Zeitpläne überwachen und auf Engpässe hinweisen – bevor sie entstehen.' },
        { titel: 'Datenanalyse', text: 'KI Agenten durchforsten riesige Datenmengen, erkennen Muster und liefern fundierte Entscheidungsgrundlagen.' },
        { titel: 'E-Commerce', text: 'Produktvorschläge, Chatbots, Bestellmanagement – KI Agenten sorgen für reibungslose Abläufe im Onlinehandel.' },
        { titel: 'Personalmanagement', text: 'Vom automatisierten Bewerbungsscreening bis hin zur Mitarbeiterzufriedenheit – KI übernimmt Routineprozesse effizient und objektiv.' },
      ]
    : [
        { titel: 'Customer Service', text: 'AI agents automatically answer inquiries, offer product recommendations or forward complex concerns to the right employee.' },
        { titel: 'Sales & Marketing', text: 'Automated analysis tools detect trends, segment target groups and personalize campaigns in real time.' },
        { titel: 'Project Management', text: 'Digital assistants can prioritize tasks, monitor schedules and flag bottlenecks — before they occur.' },
        { titel: 'Data Analysis', text: 'AI agents sift through massive amounts of data, recognize patterns and deliver sound decision-making foundations.' },
        { titel: 'E-Commerce', text: 'Product suggestions, chatbots, order management — AI agents ensure smooth operations in online retail.' },
        { titel: 'HR Management', text: 'From automated application screening to employee satisfaction — AI handles routine processes efficiently and objectively.' },
      ]

  const vorteile = isDE
    ? [
        { titel: '24/7 Verfügbarkeit', text: 'KI Agenten arbeiten ohne Pause – auch nachts, an Wochenenden und an Feiertagen.' },
        { titel: 'Kosteneinsparung', text: 'Durch die Automatisierung von Routineaufgaben lassen sich Personalkosten deutlich senken.' },
        { titel: 'Höhere Effizienz', text: 'Aufgaben werden schneller und fehlerfreier erledigt. Das steigert die Produktivität.' },
        { titel: 'Skalierbarkeit', text: 'Egal, ob 10 oder 10.000 Kundenanfragen: KI Agenten passen sich dem Volumen flexibel an.' },
        { titel: 'Personalisierte Kundenansprache', text: 'Durch intelligentes Nutzerverhalten bieten KI Agenten individuell zugeschnittene Lösungen – automatisch.' },
        { titel: 'Wettbewerbsvorteil', text: 'Wer früh auf KI setzt, verschafft sich einen Vorsprung gegenüber der Konkurrenz.' },
      ]
    : [
        { titel: '24/7 availability', text: 'AI agents work without pause — even at night, on weekends and on public holidays.' },
        { titel: 'Cost savings', text: 'Automating routine tasks can significantly reduce personnel costs.' },
        { titel: 'Higher efficiency', text: 'Tasks are completed faster and with fewer errors, which increases productivity.' },
        { titel: 'Scalability', text: 'Whether 10 or 10,000 customer inquiries: AI agents adapt flexibly to the volume.' },
        { titel: 'Personalized customer engagement', text: 'Through intelligent user behavior, AI agents offer individually tailored solutions — automatically.' },
        { titel: 'Competitive advantage', text: 'Those who adopt AI early gain an edge over the competition.' },
      ]

  return (
    <div className="pt-24 pb-32">
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            {isDE ? 'Leistungen' : 'Services'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            {isDE ? 'KI' : 'AI'}<br />
            <span className="gradient-text">{isDE ? 'Agenten' : 'Agents'}</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        <div className="glass rounded-2xl border border-white/5 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-4">{isDE ? 'Was sind KI Agenten' : 'What are AI Agents'}</h2>
          {isDE ? (
            <>
              <p className="text-white/70 text-base leading-relaxed mb-4">Künstliche Intelligenz (KI) ist längst kein Zukunftsthema mehr – sie ist Gegenwart. Besonders spannend ist der Einsatz sogenannter <strong className="text-white">KI Agenten</strong>. Dabei handelt es sich um digitale Systeme, die eigenständig Aufgaben erledigen, Entscheidungen treffen oder auf Basis von Daten lernen.</p>
              <p className="text-white/70 text-base leading-relaxed mb-4">Anders als herkömmliche Software sind KI Agenten adaptiv: Sie passen sich an neue Situationen an, lernen aus Fehlern und optimieren ihr Verhalten im Laufe der Zeit.</p>
              <p className="text-white/70 text-base leading-relaxed">Ob in der Kundenkommunikation, im Vertrieb, im Projektmanagement oder im E-Commerce – KI Agenten lassen sich flexibel in Geschäftsprozesse integrieren. Sie agieren rund um die Uhr, reagieren blitzschnell auf Veränderungen und entlasten Mitarbeiter effektiv.</p>
            </>
          ) : (
            <>
              <p className="text-white/70 text-base leading-relaxed mb-4">Artificial intelligence (AI) is no longer a future topic — it is the present. Particularly exciting is the use of so-called <strong className="text-white">AI agents</strong>. These are digital systems that independently complete tasks, make decisions or learn based on data.</p>
              <p className="text-white/70 text-base leading-relaxed mb-4">Unlike conventional software, AI agents are adaptive: they adapt to new situations, learn from mistakes and optimize their behavior over time.</p>
              <p className="text-white/70 text-base leading-relaxed">Whether in customer communication, sales, project management or e-commerce — AI agents can be flexibly integrated into business processes. They operate around the clock, respond lightning-fast to changes and effectively relieve employees.</p>
            </>
          )}
        </div>

        <div className="glass rounded-2xl border border-cyan-500/10 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-4">{isDE ? 'Warum Sie jetzt handeln sollten' : 'Why you should act now'}</h2>
          {isDE ? (
            <>
              <p className="text-white/70 text-base leading-relaxed mb-4">Die digitale Transformation ist kein vorübergehender Trend – sie ist ein Muss für zukunftsorientierte Unternehmen. KI Agenten bieten Ihnen die Möglichkeit, komplexe Prozesse zu automatisieren, Ressourcen effizienter zu nutzen und Ihre Kundenbindung zu verbessern.</p>
              <p className="text-white/70 text-base leading-relaxed">Unsere KI-Lösungen sind <strong className="text-cyan-400">individuell anpassbar, sofort einsatzbereit und skalierbar</strong> – ganz gleich, ob Sie erste Schritte gehen oder bestehende Systeme erweitern möchten.</p>
            </>
          ) : (
            <>
              <p className="text-white/70 text-base leading-relaxed mb-4">Digital transformation is not a passing trend — it is a must for forward-thinking companies. AI agents give you the opportunity to automate complex processes, use resources more efficiently and improve customer loyalty.</p>
              <p className="text-white/70 text-base leading-relaxed">Our AI solutions are <strong className="text-cyan-400">individually adaptable, immediately deployable and scalable</strong> — whether you are taking first steps or expanding existing systems.</p>
            </>
          )}
        </div>

        <div>
          <h2 className="font-display font-bold text-white text-xl mb-6">{isDE ? 'Anwendungsbereiche von KI Agenten' : 'Use cases for AI agents'}</h2>
          <p className="text-white/70 text-base mb-6">{isDE ? 'Die Einsatzmöglichkeiten von KI Agenten sind nahezu grenzenlos. Hier einige konkrete Beispiele:' : 'The possible applications for AI agents are almost limitless. Here are some concrete examples:'}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anwendungsbereiche.map((b) => (
              <div key={b.titel} className="glass rounded-xl border border-white/5 p-5">
                <h3 className="font-display font-semibold text-white text-base mb-2">{b.titel}</h3>
                <p className="text-white/70 text-base leading-relaxed">{b.text}</p>
              </div>
            ))}
          </div>
          <p className="text-white/75 text-base mt-4">
            {isDE
              ? 'Gerade kleine und mittelständische Unternehmen profitieren stark vom Einsatz solcher Technologien, da sie mit relativ wenig Aufwand große Wirkung erzielen können.'
              : 'Small and medium-sized businesses in particular benefit greatly from using such technologies, as they can achieve great impact with relatively little effort.'
            }
          </p>
        </div>

        <div>
          <h2 className="font-display font-bold text-white text-xl mb-6">{isDE ? 'Vorteile von KI Agenten' : 'Benefits of AI agents'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vorteile.map((v) => (
              <div key={v.titel} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white text-base mb-1">{v.titel}</h3>
                  <p className="text-white/70 text-base leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl border border-cyan-500/15 p-8 text-center">
          <h2 className="font-display font-bold text-white text-xl mb-4">{isDE ? 'Jetzt beraten lassen' : 'Get advice now'}</h2>
          <p className="text-white/70 text-base mb-6">
            {isDE
              ? 'Diese Vorteile machen KI Agenten zu einem echten Game-Changer – besonders in einem zunehmend digitalen Marktumfeld.'
              : 'These advantages make AI agents a real game-changer — especially in an increasingly digital market environment.'
            }
          </p>
          <Link href="/kontakt">
            <button className="btn-primary flex items-center gap-2 mx-auto">
              {isDE ? 'Kontakt aufnehmen' : 'Get in touch'} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
