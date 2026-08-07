import { useState } from 'react'
import { Link } from 'wouter'
import { ExternalLink, CheckCircle, Copy, Check, Info, Download, Maximize2, X, CreditCard } from 'lucide-react'
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
  
  // Popup / Formular States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPoster, setSelectedPoster] = useState('spassvogel')
  const [formData, setFormData] = useState({
    wunschName: '',
    wunschText: '',
    dsgvoChecked: false
  })

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, dsgvoChecked: e.target.checked }))
  }

  // Stripe Checkout Redirect
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.dsgvoChecked) return

    // Stripe URL mit Custom-Parametern anreichern
    const baseStripeUrl = 'https://buy.stripe.com/cNi5kCaAwg0NdtraZGfQI00'
    const params = new URLSearchParams({
      client_reference_id: `${selectedPoster}:${formData.wunschName || 'KeinName'}:${formData.wunschText || 'KeinText'}`.substring(0, 100) // Stripe limit is 100 chars
    })

    // Weiterleitung zu Stripe Checkout (sicherste Methode)
    const destination = `${baseStripeUrl}?${params.toString()}`
    window.location.assign(destination)
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
              ? 'Nutze unsere exklusiven Rabattcodes und Partnerlinks, um bei führenden Anbietern bares Geld zu sparen.'
              : 'Use our exclusive discount codes and partner links to save real money with leading providers.'}
          </p>
        </div>
      </div>

      {/* Freier Download Bereich (Unter Headline platziert) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-16">
        <div className="glass rounded-3xl border border-purple-500/15 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-display font-extrabold text-3xl text-white mb-3">
              {isDE ? 'Personalisiere dein Poster' : 'Personalize your Poster'}
            </h2>
            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-4">
              ✦ {isDE ? 'Zum freien Download & personalisierbar' : 'For free download & personalizable'}
            </span>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {isDE 
                ? 'Dieses exklusive Poster kannst du in voller Auflösung herunterladen. Möchtest du es mit deinem eigenen Wunschnamen oder einem individuellen Text bedrucken lassen? Bestelle dein ganz persönliches Unikat!'
                : 'You can download this exclusive poster in full resolution. Would you like to have it printed with your own name or an individual text? Order your very own unique print!'}
            </p>

            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl max-w-md mx-auto text-purple-300 text-sm font-semibold mb-6">
              {isDE 
                ? 'Die Personalisierung des Bildes inkl. Download in höchster Auflösung beträgt pro Bild 3,- €' 
                : 'Personalizing the image including download in highest resolution is €3.00 per image'}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-display font-bold text-sm transition-all hover:shadow-[0_0_24px_rgba(168,85,247,0.3)]"
            >
              {isDE ? 'Jetzt Poster personalisieren (3,- €)' : 'Personalize Poster now (€3.00)'}
            </button>
          </div>

          {/* Grid mit zwei Vorschaubildern (Miesmacher 1 und Spaßvogel) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Bild 1: Miesmacher des Jahres */}
            <div className="glass bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-4">
              <div className="relative w-44 aspect-[2/3] rounded-xl overflow-hidden border border-white/5 shadow-md">
                <img 
                  src="/miesmacher1.jpg" 
                  alt="Miesmacher des Jahres Poster" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 w-full">
                <a 
                  href="/miesmacher1.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/95 text-xs font-medium transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  {isDE ? 'Ansehen' : 'View'}
                </a>
                <a 
                  href="/miesmacher1.jpg" 
                  download="miesmacher-des-jahres-poster.jpg"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isDE ? 'Download' : 'Download'}
                </a>
              </div>
            </div>

            {/* Bild 2: Spaßvogel des Jahres */}
            <div className="glass bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-4">
              <div className="relative w-44 aspect-[2/3] rounded-xl overflow-hidden border border-white/5 shadow-md">
                <img 
                  src="/spassvogel.jpg" 
                  alt="Spaßvogel des Jahres Poster" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2 w-full">
                <a 
                  href="/spassvogel.jpg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/95 text-xs font-medium transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  {isDE ? 'Ansehen' : 'View'}
                </a>
                <a 
                  href="/spassvogel.jpg" 
                  download="spassvogel-des-jahres-poster.jpg"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-purple-500 hover:bg-purple-400 text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  {isDE ? 'Download' : 'Download'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KI-Poster-Shop mit Sofort-Download */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-16">
        <div className="glass rounded-3xl border border-purple-500/15 p-6 md:p-10 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[90px] pointer-events-none" />
          <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            ✦ {isDE ? 'NEU: Vollautomatisch mit Sofort-Download' : 'NEW: Fully automated with instant download'}
          </span>
          <h2 className="font-display font-extrabold text-3xl text-white mb-3">
            {isDE ? 'Dein persönliches KI-Poster in 1 Minute' : 'Your personal AI poster in 1 minute'}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-6">
            {isDE
              ? 'Wähle aus 20 Motiven, gib deinen Namen und Wunschtext ein – nach der Bezahlung wird dein Poster automatisch per KI erstellt und steht sofort zum Download bereit. Kein Warten auf E-Mails!'
              : 'Choose from 20 designs, enter your name and text – after payment your poster is generated automatically by AI and ready for download immediately. No waiting for emails!'}
          </p>
          <Link href="/empfehlung/poster">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-display font-bold text-sm transition-all hover:shadow-[0_0_24px_rgba(168,85,247,0.3)]">
              {isDE ? 'Zum KI-Poster-Shop (3,- €)' : 'To the AI poster shop (€3.00)'}
            </button>
          </Link>
        </div>
      </div>

      {/* Pixar Annoncen Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-16">
        <div className="glass rounded-3xl border border-cyan-500/15 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-extrabold text-3xl text-white mb-3">
              {isDE ? 'Pixar-Stil Charakter-Poster' : 'Pixar Style Character Posters'}
            </h2>
            <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
              ✦ {isDE ? 'Kostenfreier Download der Kollektion' : 'Free collection download'}
            </span>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              {isDE
                ? 'Entdecke unsere liebevoll gestalteten Charaktere im unverkennbaren Pixar-Animationsstil. Jedes Bild steht dir zur freien privaten Nutzung zur Verfügung. Klicke auf die Vorschau, um das Poster hochauflösend anzuzeigen, oder lade es direkt herunter.'
                : 'Discover our lovingly crafted characters in the unique Pixar animation style. Each image is freely available for private use. Click the preview to view the high-resolution poster or download it directly.'}
            </p>
            
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-display font-bold text-sm transition-all hover:shadow-[0_0_24px_rgba(6,182,212,0.3)]"
            >
              {isDE ? 'Pixar Poster personalisiert bestellen (3,- €)' : 'Order personalized Pixar Poster (€3.00)'}
            </button>
          </div>

          {/* Grid mit kompakten Vorschauen */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[
              { id: 'chaosmanager', title: isDE ? 'Chaosmanager' : 'Chaos Manager', file: '/chaosmanager.png' },
              { id: 'fitness', title: isDE ? 'Fitnessprofi' : 'Fitness Pro', file: '/fitness.png' },
              { id: 'fotograf', title: isDE ? 'Fotograf' : 'Photographer', file: '/fotograf.png' },
              { id: 'grillmeister', title: isDE ? 'Grillmeister' : 'Grill Master', file: '/grillmeister.png' },
              { id: 'gutelaunebotschafter', title: isDE ? 'Gute Laune Botschafter' : 'Good Mood Ambassador', file: '/gutelaunebotschafter.png' },
              { id: 'gaertner', title: isDE ? 'Gärtner' : 'Gardener', file: '/gaertner.png' },
              { id: 'handyprofi', title: isDE ? 'Handyprofi' : 'Phone Expert', file: '/handyprofi.png' },
              { id: 'heimwerker', title: isDE ? 'Heimwerker' : 'Handyman', file: '/heimwerker.png' },
              { id: 'heimwerker2', title: isDE ? 'Heimwerker Pro' : 'Handyman Pro', file: '/heimwerker2.png' },
              { id: 'miesmacher_logo', title: isDE ? 'Miesmacher des Jahres' : 'Spoilsport of the Year', file: '/miesmacher_logo.png' },
              { id: 'montagshasser', title: isDE ? 'Montagshasser' : 'Monday Hater', file: '/montagshasser.png' },
              { id: 'noergler', title: isDE ? 'Nörgler' : 'Grumbler', file: '/noergler.png' },
              { id: 'optimist', title: isDE ? 'Optimist' : 'Optimist', file: '/optimist.png' },
              { id: 'parkplatzsucher', title: isDE ? 'Parkplatzsucher' : 'Parking Spot Seeker', file: '/parkplatzsucher.png' },
              { id: 'schnaeppchenjaeger', title: isDE ? 'Schnäppchenjäger' : 'Bargain Hunter', file: '/schnaeppchenjaeger.png' },
              { id: 'serienjunkie', title: isDE ? 'Serienjunkie' : 'Series Addict', file: '/serienjunkie.png' },
              { id: 'spassvogel_logo', title: isDE ? 'Spaßvogel' : 'Joker', file: '/spassvogel_logo.png' },
              { id: 'sternekoch', title: isDE ? 'Sternekoch' : 'Star Chef', file: '/sternekoch.png' },
              { id: 'urlaubsplaner', title: isDE ? 'Urlaubsplaner' : 'Holiday Planner', file: '/urlaubsplaner.png' },
              { id: 'weihnachtsfan', title: isDE ? 'Weihnachtsfan' : 'Christmas Fan', file: '/weihnachtsfan.png' }
            ].map((item) => (
              <div key={item.id} className="glass bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-between gap-3 hover:border-cyan-500/30 transition-all duration-300 group">
                <a 
                  href={item.file} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-white/5 shadow-sm block cursor-zoom-in"
                  title={isDE ? 'In voller Größe anzeigen' : 'Open in full size'}
                >
                  <img 
                    src={item.file} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="w-6 h-6 text-white" />
                  </div>
                </a>
                
                <div className="text-center w-full">
                  <h3 className="text-white text-xs font-bold truncate max-w-full mb-2" title={item.title}>{item.title}</h3>
                  <a 
                    href={item.file} 
                    download={`${item.id}.png`}
                    className="w-full flex items-center justify-center gap-1 py-1.5 px-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-bold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {isDE ? 'Download' : 'Download'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations Cards */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Personalisierungs-Formular als DSGVO Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative z-10 w-full max-w-lg glass bg-[#070d19]/95 border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h3 className="font-display font-extrabold text-2xl text-white mb-2">
                {isDE ? 'Poster personalisieren' : 'Personalize Poster'}
              </h3>
              <p className="text-white/60 text-xs leading-relaxed">
                {isDE 
                  ? 'Wähle dein Motiv und gib deine Änderungswünsche ein. Nach dem Klick auf Bezahlen wirst du direkt zur sicheren Stripe-Kassenseite geleitet.'
                  : 'Select your motif and enter your customization details. Clicking pay will redirect you to the Stripe checkout page.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Posterauswahl */}
              <div>
                <label className="block text-white/80 text-xs font-semibold mb-1.5">{isDE ? 'Gewünschtes Poster-Design' : 'Poster Design'}</label>
                <select
                  name="selectedPoster"
                  value={selectedPoster}
                  onChange={(e) => setSelectedPoster(e.target.value)}
                  className="w-full bg-[#030712] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors [&>option]:bg-[#030712] [&>option]:text-white"
                >
                  <option value="spassvogel">{isDE ? 'Spaßvogel des Jahres' : 'Joker of the Year'}</option>
                  <option value="miesmacher">{isDE ? 'Miesmacher des Jahres' : 'Spoilsport of the Year'}</option>
                  <option value="chaosmanager">{isDE ? 'Chaosmanager' : 'Chaos Manager'}</option>
                  <option value="fitness">{isDE ? 'Fitnessprofi' : 'Fitness Pro'}</option>
                  <option value="fotograf">{isDE ? 'Fotograf' : 'Photographer'}</option>
                  <option value="grillmeister">{isDE ? 'Grillmeister' : 'Grill Master'}</option>
                  <option value="gutelaunebotschafter">{isDE ? 'Gute Laune Botschafter' : 'Good Mood Ambassador'}</option>
                  <option value="gaertner">{isDE ? 'Gärtner' : 'Gardener'}</option>
                  <option value="handyprofi">{isDE ? 'Handyprofi' : 'Phone Expert'}</option>
                  <option value="heimwerker">{isDE ? 'Heimwerker' : 'Handyman'}</option>
                  <option value="heimwerker2">{isDE ? 'Heimwerker Pro' : 'Handyman Pro'}</option>
                  <option value="montagshasser">{isDE ? 'Montagshasser' : 'Monday Hater'}</option>
                  <option value="noergler">{isDE ? 'Nörgler' : 'Grumbler'}</option>
                  <option value="optimist">{isDE ? 'Optimist' : 'Optimist'}</option>
                  <option value="parkplatzsucher">{isDE ? 'Parkplatzsucher' : 'Parking Spot Seeker'}</option>
                  <option value="schnaeppchenjaeger">{isDE ? 'Schnäppchenjäger' : 'Bargain Hunter'}</option>
                  <option value="serienjunkie">{isDE ? 'Serienjunkie' : 'Series Addict'}</option>
                  <option value="sternekoch">{isDE ? 'Sternekoch' : 'Star Chef'}</option>
                  <option value="urlaubsplaner">{isDE ? 'Urlaubsplaner' : 'Holiday Planner'}</option>
                  <option value="weihnachtsfan">{isDE ? 'Weihnachtsfan' : 'Christmas Fan'}</option>
                </select>
              </div>

              {/* Trennlinie für visuelle Struktur */}
              <div className="border-t border-purple-500/20 my-6 pt-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                  {isDE ? 'Personalisierungswünsche' : 'Customization Details'}
                </span>
              </div>

              {/* Änderungswunsch Name */}
              <div className="mt-4">
                <label className="block text-purple-300 text-xs font-bold mb-1.5">{isDE ? 'Änderungswunsch: Name (im Bild)' : 'Custom Name (in Poster)'}</label>
                <input
                  type="text"
                  name="wunschName"
                  value={formData.wunschName}
                  onChange={handleInputChange}
                  placeholder={isDE ? 'z. B. Roger' : 'e.g. Roger'}
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-all placeholder-white/30"
                />
              </div>

              {/* Änderungswunsch Text */}
              <div className="mt-6">
                <label className="block text-purple-300 text-xs font-bold mb-1.5">{isDE ? 'Änderungswunsch: Text (im Bild)' : 'Custom Description Text'}</label>
                <textarea
                  name="wunschText"
                  rows={2}
                  value={formData.wunschText}
                  onChange={handleInputChange}
                  placeholder={isDE ? 'z. B. Ich bin so stolz auf mich...' : 'e.g. I am so proud of...'}
                  className="w-full bg-black/60 border border-purple-500/40 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400 transition-all resize-none placeholder-white/30"
                />
              </div>

              {/* Preis-Hinweis & DSGVO Checkbox */}
              <div className="pt-2">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="dsgvoChecked"
                    required
                    checked={formData.dsgvoChecked}
                    onChange={handleCheckboxChange}
                    className="mt-1 accent-purple-500 focus:ring-purple-500 h-4 w-4 text-purple-600 border-white/10 rounded"
                  />
                  <label htmlFor="dsgvoChecked" className="text-white/60 text-[11px] leading-relaxed cursor-pointer select-none">
                    {isDE ? (
                      <>
                        Ich stimme zu, dass meine Angaben zur Weiterverarbeitung bei Stripe gespeichert werden. Ich habe die{' '}
                        <a href="/datenschutz" target="_blank" className="text-purple-400 hover:underline">
                          Datenschutzerklärung
                        </a>{' '}
                        gelesen und akzeptiere sie. Die Personalisierung inklusive hochauflösendem Download beträgt einmalig **3,- €**.
                      </>
                    ) : (
                      <>
                        I agree that my details will be stored for processing at Stripe. I have read and accept the{' '}
                        <a href="/datenschutz" target="_blank" className="text-purple-400 hover:underline">
                          Privacy Policy
                        </a>
                        . The customization including high-resolution download is a one-time fee of **€3.00**.
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formData.dsgvoChecked}
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-display font-bold text-sm transition-all shadow-lg hover:shadow-[0_0_24px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4" />
                {isDE ? 'Jetzt mit Stripe bezahlen (3,- €)' : 'Pay with Stripe (€3.00)'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
