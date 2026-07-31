import { useState } from 'react'
import { ExternalLink, CheckCircle, Copy, Check, Info } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface Recommendation {
  name: string
  beschreibung: string
  link: string
  kategorie: string
  katColor: string
  code?: string
  bonusText?: string
  logoChar: string
  accentColor: string
  gradFrom: string
  gradTo: string
  details: string[]
}

const recommendations: Recommendation[] = [
  {
    name: 'rabot.energy',
    beschreibung: 'Wechseln Sie zum dynamischen Ökostromanbieter rabot.energy und sparen Sie bares Geld. Laden Sie Ihr E-Auto oder nutzen Sie Haushaltsgeräte genau dann, wenn der Strom an der Börse am günstigsten ist.',
    link: 'https://www.rabot.energy',
    kategorie: 'Energie & Sparen',
    katColor: 'bg-green-500/10 text-green-400 border-green-500/20',
    code: 'SVIQAXI',
    bonusText: '75 € Wechselbonus',
    logoChar: 'R',
    accentColor: '#22c55e',
    gradFrom: '#15803d',
    gradTo: '#166534',
    details: [
      'Stundengenaue Abrechnung nach echten Börsenstrompreisen',
      '100% Ökostrom für ein grünes Gewissen',
      'Volle Transparenz und tägliche Kostenkontrolle per App',
      'Keine langfristige Vertragsbindung (monatlich kündbar)',
    ],
  },
]

export default function Empfehlungen() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const recommendationsEN = [
    {
      name: 'rabot.energy',
      beschreibung: 'Switch to the dynamic green electricity provider rabot.energy and save real money. Charge your e-car or run household appliances exactly when electricity is cheapest on the market.',
      link: 'https://www.rabot.energy',
      kategorie: 'Energy & Savings',
      katColor: 'bg-green-500/10 text-green-400 border-green-500/20',
      code: 'SVIQAXI',
      bonusText: '75 € Switch Bonus',
      logoChar: 'R',
      accentColor: '#22c55e',
      gradFrom: '#15803d',
      gradTo: '#166534',
      details: [
        'Hourly billing based on real exchange electricity prices',
        '100% green electricity for a green conscience',
        'Full transparency and daily cost control via app',
        'No long-term contract commitment (monthly cancelable)',
      ],
    },
  ]

  const displayRecs = isDE ? recommendations : recommendationsEN

  return (
    <div className="pt-24 pb-32">
      {/* Header */}
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            {isDE ? 'Empfehlungen & Deals' : 'Recommendations & Deals'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            {isDE ? 'Exklusive' : 'Exclusive'}<br />
            <span className="gradient-text">{isDE ? 'Empfehlungen' : 'Recommendations'}</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed max-w-xl mx-auto">
            {isDE
              ? 'Nutzen Sie unsere exklusiven Rabattcodes und Partnerlinks, um bei führenden Anbietern bares Geld zu sparen.'
              : 'Use our exclusive discount codes and partner links to save real money with leading providers.'}
          </p>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 gap-8">
          {displayRecs.map((rec) => (
            <div
              key={rec.name}
              className="glass rounded-2xl border border-white/5 p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Info & Logo */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${rec.gradFrom}, ${rec.gradTo})` }}
                  >
                    {rec.logoChar}
                  </div>
                  <div>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1 border ${rec.katColor}`}>
                      {rec.kategorie}
                    </span>
                    <h2 className="text-2xl font-bold text-white leading-tight">{rec.name}</h2>
                  </div>
                </div>
                <p className="text-white/75 text-base leading-relaxed mb-6">{rec.beschreibung}</p>

                {/* Details list */}
                <ul className="space-y-2.5 mb-6">
                  {rec.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-white/70 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Code & CTA Card */}
              <div className="lg:col-span-5 glass bg-white/5 rounded-2xl border border-white/10 p-6 flex flex-col justify-between h-full relative overflow-hidden">
                <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-green-500/10 rounded-full blur-xl pointer-events-none" />
                
                {/* Promo highlight banner */}
                {rec.bonusText && (
                  <div className="mb-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">
                      ★ {rec.bonusText}
                    </span>
                  </div>
                )}

                {/* Code display */}
                {rec.code && (
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4 text-center mb-5">
                    <p className="text-xs text-white/50 mb-1">{isDE ? 'AKTIONSPROCODE' : 'PROMO CODE'}</p>
                    <div className="flex items-center justify-center gap-3">
                      <code className="text-xl font-mono font-bold text-white tracking-widest">{rec.code}</code>
                      <button
                        onClick={() => copyToClipboard(rec.code!)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all"
                        title={isDE ? 'Code kopieren' : 'Copy code'}
                      >
                        {copiedCode === rec.code ? (
                          <Check className="w-4 h-4 text-green-400 animate-scale" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {copiedCode === rec.code && (
                      <p className="text-green-400 text-[11px] mt-1.5 font-medium animate-fade-in">
                        {isDE ? 'Code kopiert!' : 'Code copied!'}
                      </p>
                    )}
                  </div>
                )}

                {/* Info Text */}
                <div className="flex gap-2.5 items-start mb-6 text-white/60 text-xs">
                  <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p>
                    {isDE
                      ? 'Geben Sie den Gutscheincode bei der Anmeldung ein, um Ihren 75 € Bonus zu aktivieren.'
                      : 'Enter the voucher code during registration to activate your 75 € bonus.'}
                  </p>
                </div>

                {/* CTA Button */}
                <a
                  href={rec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-semibold text-black text-sm transition-all hover:scale-[1.02] shadow-lg bg-green-500 hover:bg-green-400"
                >
                  {isDE ? 'Jetzt 75 € Bonus sichern' : 'Claim 75 € Bonus now'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
