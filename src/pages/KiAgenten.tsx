import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'wouter'

const anwendungsbereiche = [
  {
    titel: 'Kundenservice',
    text: 'KI-Agenten beantworten automatisch Anfragen, bieten Produktempfehlungen oder leiten komplexe Anliegen an den passenden Mitarbeiter weiter.',
  },
  {
    titel: 'Vertrieb & Marketing',
    text: 'Automatisierte Analyse-Tools erkennen Trends, segmentieren Zielgruppen und personalisieren Kampagnen in Echtzeit.',
  },
  {
    titel: 'Projektmanagement',
    text: 'Digitale Assistenten können Aufgaben priorisieren, Zeitpläne überwachen und auf Engpässe hinweisen – bevor sie entstehen.',
  },
  {
    titel: 'Datenanalyse',
    text: 'KI-Agenten durchforsten riesige Datenmengen, erkennen Muster und liefern fundierte Entscheidungsgrundlagen.',
  },
  {
    titel: 'E-Commerce',
    text: 'Produktvorschläge, Chatbots, Bestellmanagement – KI-Agenten sorgen für reibungslose Abläufe im Onlinehandel.',
  },
  {
    titel: 'Personalmanagement',
    text: 'Vom automatisierten Bewerbungsscreening bis hin zur Mitarbeiterzufriedenheit – KI übernimmt Routineprozesse effizient und objektiv.',
  },
]

const vorteile = [
  { titel: '24/7 Verfügbarkeit', text: 'KI-Agenten arbeiten ohne Pause – auch nachts, an Wochenenden und an Feiertagen.' },
  { titel: 'Kosteneinsparung', text: 'Durch die Automatisierung von Routineaufgaben lassen sich Personalkosten deutlich senken.' },
  { titel: 'Höhere Effizienz', text: 'Aufgaben werden schneller und fehlerfreier erledigt. Das steigert die Produktivität.' },
  { titel: 'Skalierbarkeit', text: 'Egal, ob 10 oder 10.000 Kundenanfragen: KI-Agenten passen sich dem Volumen flexibel an.' },
  { titel: 'Personalisierte Kundenansprache', text: 'Durch intelligentes Nutzerverhalten bieten KI-Agenten individuell zugeschnittene Lösungen – automatisch.' },
  { titel: 'Wettbewerbsvorteil', text: 'Wer früh auf KI setzt, verschafft sich einen Vorsprung gegenüber der Konkurrenz.' },
]

export default function KiAgenten() {
  return (
    <div className="pt-24 pb-32">
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            Leistungen
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            KI<br />
            <span className="gradient-text">Agenten</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* Was sind KI Agenten */}
        <div className="glass rounded-2xl border border-white/5 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-4">Was sind KI Agenten</h2>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Künstliche Intelligenz (KI) ist längst kein Zukunftsthema mehr – sie ist Gegenwart. Besonders spannend ist der Einsatz sogenannter <strong className="text-white">KI-Agenten</strong>. Dabei handelt es sich um digitale Systeme, die eigenständig Aufgaben erledigen, Entscheidungen treffen oder auf Basis von Daten lernen.
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Anders als herkömmliche Software sind KI-Agenten adaptiv: Sie passen sich an neue Situationen an, lernen aus Fehlern und optimieren ihr Verhalten im Laufe der Zeit.
          </p>
          <p className="text-white/70 text-base leading-relaxed">
            Ob in der Kundenkommunikation, im Vertrieb, im Projektmanagement oder im E-Commerce – KI-Agenten lassen sich flexibel in Geschäftsprozesse integrieren. Sie agieren rund um die Uhr, reagieren blitzschnell auf Veränderungen und entlasten Mitarbeiter effektiv.
          </p>
        </div>

        {/* Warum jetzt handeln */}
        <div className="glass rounded-2xl border border-cyan-500/10 p-8">
          <h2 className="font-display font-bold text-white text-xl mb-4">Warum Sie jetzt handeln sollten</h2>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Die digitale Transformation ist kein vorübergehender Trend – sie ist ein Muss für zukunftsorientierte Unternehmen. KI-Agenten bieten Ihnen die Möglichkeit, komplexe Prozesse zu automatisieren, Ressourcen effizienter zu nutzen und Ihre Kundenbindung zu verbessern.
          </p>
          <p className="text-white/70 text-base leading-relaxed">
            Unsere KI-Lösungen sind <strong className="text-cyan-400">individuell anpassbar, sofort einsatzbereit und skalierbar</strong> – ganz gleich, ob Sie erste Schritte gehen oder bestehende Systeme erweitern möchten. Gemeinsam analysieren wir Ihre Prozesse und finden die perfekte KI-Strategie für Ihr Unternehmen.
          </p>
        </div>

        {/* Anwendungsbereiche */}
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-6">Anwendungsbereiche von KI-Agenten</h2>
          <p className="text-white/70 text-sm mb-6">Die Einsatzmöglichkeiten von KI-Agenten sind nahezu grenzenlos. Hier einige konkrete Beispiele:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anwendungsbereiche.map((bereich) => (
              <div key={bereich.titel} className="glass rounded-xl border border-white/5 p-5">
                <h3 className="font-display font-semibold text-white text-sm mb-2">{bereich.titel}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{bereich.text}</p>
              </div>
            ))}
          </div>
          <p className="text-white/75 text-sm mt-4">
            Gerade kleine und mittelständische Unternehmen profitieren stark vom Einsatz solcher Technologien, da sie mit relativ wenig Aufwand große Wirkung erzielen können.
          </p>
        </div>

        {/* Vorteile */}
        <div>
          <h2 className="font-display font-bold text-white text-xl mb-6">Vorteile von KI-Agenten</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vorteile.map((v) => (
              <div key={v.titel} className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold text-white text-sm mb-1">{v.titel}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl border border-cyan-500/15 p-8 text-center">
          <h2 className="font-display font-bold text-white text-xl mb-4">Jetzt beraten lassen</h2>
          <p className="text-white/70 text-sm mb-6">
            Diese Vorteile machen KI-Agenten zu einem echten Game-Changer – besonders in einem zunehmend digitalen Marktumfeld.
          </p>
          <Link href="/kontakt">
            <button className="btn-primary flex items-center gap-2 mx-auto">
              Kontakt aufnehmen <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
