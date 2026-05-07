import { ExternalLink } from 'lucide-react'

const programme = [
  {
    name: 'HIX.ai',
    beschreibung: 'Der KI-Alleskönner – All-in-One KI-Plattform für Texte, Marketing, E-Mails und mehr. Über 120 KI-gestützte Schreibassistenten in 50+ Sprachen.',
    link: 'https://hix.ai',
    kategorie: 'KI Allround',
    katColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  {
    name: 'Genspark AI',
    beschreibung: 'Leistungsstarke KI-Such- und Rechercheplatform für tiefgehende Analysen, Zusammenfassungen und intelligente Inhaltsrecherche.',
    link: 'https://www.genspark.ai',
    kategorie: 'KI Allround',
    katColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
  {
    name: 'HeyGen',
    beschreibung: 'Hochwertige Videoerstellung mit KI – erstelle professionelle Videos mit realistischen KI-Avataren, Lippensynchronisation und automatischer Übersetzung.',
    link: 'https://www.heygen.com',
    kategorie: 'Video mit KI',
    katColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    name: 'Creatify Lab',
    beschreibung: 'Videoanzeigen in Minuten – KI-generierte Video-Ads mit Avataren, Voiceover und automatischem Skript-Generator für Social Media.',
    link: 'https://creatify.ai',
    kategorie: 'Video mit KI',
    katColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    name: 'Lets Enhance',
    beschreibung: 'Bilder perfekt vergrößern – KI-gestützte Bildverbesserung, die Auflösung erhöhen und Qualität verbessern ohne Qualitätsverlust.',
    link: 'https://letsenhance.io',
    kategorie: 'Bildbearbeitung',
    katColor: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  {
    name: 'Manychat',
    beschreibung: 'Chat-Marketing-Automatisierung für Instagram, Facebook Messenger und WhatsApp – automatisierte Antworten und Leadgenerierung.',
    link: 'https://manychat.com',
    kategorie: 'Social Media',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  {
    name: 'Social Plus AI',
    beschreibung: 'KI-gestützte Social-Media-Unterstützung für Planung, Erstellung und Optimierung von Social-Media-Inhalten.',
    link: 'https://socialplus.ai',
    kategorie: 'Social Media',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  {
    name: 'Insta Tipps',
    beschreibung: 'Expertenwissen und Tipps für erfolgreiches Instagram-Marketing – Strategien, Hashtags und Content-Ideen.',
    link: 'https://www.instagram.com/my_digit_world',
    kategorie: 'Social Media',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  },
  {
    name: 'Mate Studio',
    beschreibung: 'KI-gestütztes Design- und Präsentationstool für professionelle Inhalte, Grafiken und digitale Präsentationen.',
    link: 'https://mate.studio',
    kategorie: 'Präsentation & Räume',
    katColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  {
    name: 'Virtuelle Raumgestaltung',
    beschreibung: 'KI-Tool zur virtuellen Einrichtung und Gestaltung von Räumen – perfekt für Immobilien, Innenarchitektur und Staging.',
    link: 'https://www.my-digital-world.de',
    kategorie: 'Präsentation & Räume',
    katColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  },
  {
    name: 'ai marketing',
    beschreibung: 'Künstliche Intelligenz für smartes Marketing – automatisierte Analyse, Zielgruppenansprache und Kampagnenoptimierung.',
    link: 'https://www.my-digital-world.de/ki-agenten',
    kategorie: 'Marketing',
    katColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  },
  {
    name: 'Tanganica',
    beschreibung: 'E-Commerce Marketing Automatisierung – KI-gesteuerte Werbekampagnen für Online-Shops auf Google, Facebook und mehr.',
    link: 'https://www.tanganica.com',
    kategorie: 'Marketing',
    katColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
  },
  {
    name: 'Flip Magazine',
    beschreibung: 'Digitale Broschüren und Magazine erstellen – interaktive Flipbooks aus PDFs für professionelle Online-Präsentationen.',
    link: 'https://flipsnack.com',
    kategorie: 'Content & Magazin',
    katColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    name: 'UGC Creator',
    beschreibung: 'User Generated Content erstellen – authentische, nutzernahe Videos und Inhalte für höhere Glaubwürdigkeit im Marketing.',
    link: 'https://creatify.ai',
    kategorie: 'Content & Magazin',
    katColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  {
    name: 'APPSUMO',
    beschreibung: 'Marktplatz für Lifetime-Deals auf Top-Software und digitale Tools – einmalig bezahlen, dauerhaft nutzen.',
    link: 'https://appsumo.com',
    kategorie: 'Deals & Tools',
    katColor: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  {
    name: 'Artistly',
    beschreibung: 'KI-gestützte Plattform zur künstlerischen Bildbearbeitung und Erstellung einzigartiger digitaler Kunstwerke.',
    link: 'https://artistly.ai',
    kategorie: 'Deals & Tools',
    katColor: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  {
    name: 'ai music',
    beschreibung: 'KI-generierte Musik für Videos, Präsentationen und Marketinginhalte – lizenzfreie Tracks in Sekunden erstellen.',
    link: 'https://suno.ai',
    kategorie: 'Musik',
    katColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  },
  {
    name: 'ChatGPT News',
    beschreibung: 'Aktuelle Neuigkeiten und Entwicklungen rund um ChatGPT und OpenAI – immer auf dem neuesten Stand der KI-Welt.',
    link: 'https://openai.com',
    kategorie: 'ChatGPT',
    katColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
]

export default function Programme() {
  return (
    <div className="pt-24 pb-32">
      {/* Header */}
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            Zu den Programmen
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight" data-testid="text-programme-headline">
            Alle digitalen<br />
            <span className="gradient-text">Programme & Tools</span>
          </h1>
          <p className="text-white/50 text-base leading-relaxed" data-testid="text-programme-subtitle">
            Eine Übersicht aller Programme, die My Digital World empfiehlt und einsetzt –<br />
            von KI-Tools über Social Media bis zu Marketing-Software.
          </p>
        </div>
      </div>

      {/* Programme Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="group-programme-grid">
          {programme.map((prog) => (
            <a
              key={prog.name}
              href={prog.link}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`card-programm-${prog.name.replace(/\s/g, '-').toLowerCase()}`}
              className="card-hover glass rounded-xl border border-white/5 hover:border-cyan-500/20 p-5 group flex flex-col gap-3 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-semibold text-white text-base group-hover:text-cyan-400 transition-colors">
                    {prog.name}
                  </h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] border ${prog.katColor}`}>
                    {prog.kategorie}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1" />
              </div>
              <p className="text-white/50 text-sm leading-relaxed flex-1">{prog.beschreibung}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
