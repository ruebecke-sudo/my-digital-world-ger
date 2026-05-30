import { useState } from 'react'
import {
  ExternalLink, Tag, X,
  Zap, Globe, Smartphone, Users,
  FileText, PenTool, Video, Film, Image,
  MessageCircle, Mail, Share2,
  BarChart2, Target, TrendingUp,
  Code, Monitor, Layers, Layout,
  BookOpen, GraduationCap,
  ShoppingBag, Percent, Package,
  Brain, Star, Camera,
  RefreshCw, Search, Hash, Bell, Cpu, Music,
} from 'lucide-react'

type LucideIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>

interface Feature {
  Icon: LucideIcon
  label: string
  color: string
}

interface PopupConfig {
  badge: string
  accentColor: string
  gradFrom: string
  gradTo: string
  logoChar: string
  description: string
  statValue: string
  statLabel: string
  StatIcon: LucideIcon
  features: Feature[]
  cta: string
  promoCode?: string
  promoText?: string
}

interface Programme {
  name: string
  beschreibung: string
  link: string
  kategorie: string
  katColor: string
  popup: PopupConfig
}

const programme: Programme[] = [
  {
    name: 'HIX.ai',
    beschreibung: 'Der KI-Alleskönner – All-in-One KI-Plattform für Texte, Marketing, E-Mails und mehr. Über 120 KI-gestützte Schreibassistenten in 50+ Sprachen.',
    link: 'https://hix.ai/?ref=zju1mti',
    kategorie: 'KI Allround',
    katColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    popup: {
      badge: 'All-in-One KI Schreibplattform',
      accentColor: '#22d3ee',
      gradFrom: '#0891b2',
      gradTo: '#0e7490',
      logoChar: 'H',
      description: 'Die komplette KI-Plattform für professionelle Texte, E-Mails und Marketing-Inhalte – in über 50 Sprachen, mit 120+ spezialisierten Assistenten.',
      statValue: '120+ Assistenten',
      statLabel: 'in 50+ Sprachen',
      StatIcon: FileText,
      features: [
        { Icon: PenTool, label: 'SEO-Texte & Blog-Artikel', color: '#22d3ee' },
        { Icon: Mail, label: 'E-Mails & Newsletter', color: '#34d399' },
        { Icon: Globe, label: '50+ Sprachen unterstützt', color: '#60a5fa' },
      ],
      cta: 'HIX.ai jetzt testen',
    },
  },
  {
    name: 'Genspark AI',
    beschreibung: 'Leistungsstarke KI-Such- und Rechercheplatform für tiefgehende Analysen, Zusammenfassungen und intelligente Inhaltsrecherche.',
    link: 'https://genspark.ai?via=rdiger216',
    kategorie: 'KI Allround',
    katColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    popup: {
      badge: 'KI-Such & Rechercheplattform',
      accentColor: '#22d3ee',
      gradFrom: '#0891b2',
      gradTo: '#0e7490',
      logoChar: 'G',
      description: 'Intelligente KI-Suche die wirklich versteht, was du meinst – tiefgehende Analysen, präzise Zusammenfassungen und Echtzeit-Webrecherche.',
      statValue: 'KI Recherche 2.0',
      statLabel: 'in Echtzeit',
      StatIcon: Search,
      features: [
        { Icon: Search, label: 'Tiefe Webrecherche mit KI', color: '#22d3ee' },
        { Icon: FileText, label: 'Inhalte zusammenfassen', color: '#34d399' },
        { Icon: TrendingUp, label: 'Echtzeit-Analysen & Insights', color: '#60a5fa' },
      ],
      cta: 'Genspark kostenlos testen',
    },
  },
  {
    name: 'HeyGen',
    beschreibung: 'Hochwertige Videoerstellung mit KI – erstelle professionelle Videos mit realistischen KI-Avataren, Lippensynchronisation und automatischer Übersetzung.',
    link: 'https://www.heygen.com',
    kategorie: 'Video mit KI',
    katColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    popup: {
      badge: 'KI-Video Generator',
      accentColor: '#a78bfa',
      gradFrom: '#7c3aed',
      gradTo: '#6d28d9',
      logoChar: 'H',
      description: 'Erstelle professionelle KI-Videos mit realistischen Avataren, perfekter Lippensynchronisation und automatischer Übersetzung in 40+ Sprachen.',
      statValue: '200+ Avatare',
      statLabel: 'in 40+ Sprachen',
      StatIcon: Video,
      features: [
        { Icon: Users, label: 'Realistische KI-Avatare', color: '#a78bfa' },
        { Icon: Globe, label: 'Automatische Übersetzung', color: '#60a5fa' },
        { Icon: Film, label: 'Professionelle Video-Qualität', color: '#f472b6' },
      ],
      cta: 'HeyGen kostenlos testen',
    },
  },
  {
    name: 'Creatify Lab',
    beschreibung: 'Videoanzeigen in Minuten – KI-generierte Video-Ads mit Avataren, Voiceover und automatischem Skript-Generator für Social Media.',
    link: 'https://creatify.ai/?via=rudiger',
    kategorie: 'Video mit KI',
    katColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    popup: {
      badge: 'KI Video-Ad Creator',
      accentColor: '#a78bfa',
      gradFrom: '#7c3aed',
      gradTo: '#6d28d9',
      logoChar: 'C',
      description: 'Erstelle hochkonvertierende Video-Ads in Minuten – mit KI-Avataren, automatischem Voiceover und fertigem Skript für jede Social-Media-Plattform.',
      statValue: 'Ads in Minuten',
      statLabel: 'für jede Plattform',
      StatIcon: Film,
      features: [
        { Icon: Zap, label: 'Video-Ads in Minuten erstellen', color: '#fbbf24' },
        { Icon: Smartphone, label: 'Alle Social-Media-Formate', color: '#fb923c' },
        { Icon: Users, label: 'KI-Avatare & Voiceover', color: '#a78bfa' },
      ],
      cta: 'Creatify jetzt starten',
    },
  },
  {
    name: 'Lets Enhance',
    beschreibung: 'Bilder perfekt vergrößern – KI-gestützte Bildverbesserung, die Auflösung erhöhen und Qualität verbessern ohne Qualitätsverlust.',
    link: 'https://letsenhance.io?via=cx6193',
    kategorie: 'Bildbearbeitung',
    katColor: 'bg-green-500/10 text-green-400 border-green-500/20',
    popup: {
      badge: 'KI-Bildoptimierung',
      accentColor: '#34d399',
      gradFrom: '#059669',
      gradTo: '#047857',
      logoChar: 'L',
      description: 'Vergrößere und verbessere Bilder mit KI – bis zu 16-fache Hochauflösung ohne Qualitätsverlust, ideal für E-Commerce, Print und Marketing.',
      statValue: 'Bis 16x',
      statLabel: 'Hochauflösung',
      StatIcon: Image,
      features: [
        { Icon: Image, label: 'KI-Hochauflösung ohne Verlust', color: '#34d399' },
        { Icon: Zap, label: 'Batch-Verarbeitung vieler Bilder', color: '#fbbf24' },
        { Icon: Target, label: 'Perfekt für E-Commerce & Print', color: '#60a5fa' },
      ],
      cta: 'Lets Enhance testen',
    },
  },
  {
    name: 'Manychat',
    beschreibung: 'Chat-Marketing-Automatisierung für Instagram, Facebook Messenger und WhatsApp – automatisierte Antworten und Leadgenerierung.',
    link: 'https://manychat.partnerlinks.io/2e84ajwtz501',
    kategorie: 'Social Media',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Chat-Marketing Automatisierung',
      accentColor: '#fb923c',
      gradFrom: '#ea580c',
      gradTo: '#c2410c',
      logoChar: 'M',
      description: 'Automatisiere dein Chat-Marketing auf Instagram, WhatsApp und Messenger – generiere Leads automatisch und beantworte Nachrichten rund um die Uhr.',
      statValue: '1M+ Unternehmen',
      statLabel: 'vertrauen Manychat',
      StatIcon: MessageCircle,
      features: [
        { Icon: MessageCircle, label: 'Automatische DM-Antworten', color: '#fb923c' },
        { Icon: Users, label: 'Leadgenerierung per Chat', color: '#34d399' },
        { Icon: Zap, label: 'Instagram & WhatsApp Flows', color: '#fbbf24' },
      ],
      cta: 'Manychat kostenlos starten',
    },
  },
  {
    name: 'Social Plus AI',
    beschreibung: 'KI-gestützte Social-Media-Unterstützung für Planung, Erstellung und Optimierung von Social-Media-Inhalten.',
    link: 'https://socialplus.ai',
    kategorie: 'Social Media',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'KI Social Media Tool',
      accentColor: '#fb923c',
      gradFrom: '#ea580c',
      gradTo: '#c2410c',
      logoChar: 'S',
      description: 'Plane, erstelle und optimiere Social-Media-Inhalte mit KI – mehr Engagement, weniger Zeitaufwand für professionelle Präsenz auf allen Kanälen.',
      statValue: 'KI Content',
      statLabel: 'für alle Kanäle',
      StatIcon: Share2,
      features: [
        { Icon: Brain, label: 'KI-generierte Inhalte', color: '#22d3ee' },
        { Icon: BarChart2, label: 'Engagement-Analyse & Optimierung', color: '#60a5fa' },
        { Icon: Share2, label: 'Planung & Auto-Publishing', color: '#fb923c' },
      ],
      cta: 'Social Plus AI testen',
    },
  },
  {
    name: 'Insta Tipps',
    beschreibung: 'Expertenwissen und Tipps für erfolgreiches Instagram-Marketing – Strategien, Hashtags und Content-Ideen.',
    link: 'https://www.instagram.com/my_digit_world',
    kategorie: 'Social Media',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Instagram Expertenwissen',
      accentColor: '#fb923c',
      gradFrom: '#ea580c',
      gradTo: '#c2410c',
      logoChar: 'I',
      description: 'Professionelles Instagram-Marketing leicht gemacht – praxiserprobte Strategien, Hashtag-Tricks und Content-Ideen für schnelles Follower-Wachstum.',
      statValue: 'Täglich neue',
      statLabel: 'Tipps & Tricks',
      StatIcon: Star,
      features: [
        { Icon: Hash, label: 'Hashtag-Strategien & Reichweite', color: '#fb923c' },
        { Icon: TrendingUp, label: 'Wachstums-Hacks für Instagram', color: '#34d399' },
        { Icon: Star, label: 'Content-Ideen & Vorlagen', color: '#fbbf24' },
      ],
      cta: 'Jetzt folgen',
    },
  },
  {
    name: 'Metricool',
    beschreibung: 'Das All-in-One Social Media Tool – Inhalte planen, Analysen auswerten, Berichte erstellen, Wettbewerber beobachten und Ads verwalten. Vertraut von über 2 Millionen Nutzern weltweit.',
    link: 'https://f.mtr.cool/IZCUBS',
    kategorie: 'Social Media',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Social Media Management',
      accentColor: '#fb923c',
      gradFrom: '#ea580c',
      gradTo: '#c2410c',
      logoChar: 'M',
      description: 'Plane, veröffentliche und analysiere deine Social-Media-Inhalte auf allen Plattformen – Instagram, TikTok, LinkedIn, YouTube, X und mehr. Alles in einem Tab.',
      statValue: '2M+ Nutzer',
      statLabel: 'weltweit',
      StatIcon: BarChart2,
      features: [
        { Icon: Share2, label: 'Inhalte planen & automatisch posten', color: '#fb923c' },
        { Icon: BarChart2, label: 'Detaillierte Analytics & Berichte', color: '#60a5fa' },
        { Icon: Target, label: 'Ads-Management (Meta, Google, TikTok)', color: '#34d399' },
      ],
      cta: 'Metricool kostenlos testen',
    },
  },
  {
    name: 'Mate Studio',
    beschreibung: 'KI-gestütztes Design- und Präsentationstool für professionelle Inhalte, Grafiken und digitale Präsentationen.',
    link: 'https://www.mate-studio.com',
    kategorie: 'Präsentation & Räume',
    katColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    popup: {
      badge: 'KI Design & Präsentation',
      accentColor: '#fbbf24',
      gradFrom: '#d97706',
      gradTo: '#b45309',
      logoChar: 'M',
      description: 'Erstelle beeindruckende Präsentationen und 3D-Räume mit KI – professionelle Designs in Minuten, kein Designer-Know-how nötig.',
      statValue: '10% Rabatt',
      statLabel: 'mit Promo-Code',
      StatIcon: Layers,
      features: [
        { Icon: Layers, label: '3D-Präsentationen & Räume', color: '#fbbf24' },
        { Icon: Brain, label: 'KI-Design-Assistent', color: '#22d3ee' },
        { Icon: Tag, label: '10% Rabatt mit Code', color: '#34d399' },
      ],
      cta: 'Mate Studio testen',
      promoCode: 'mate-k8x3v9m2w7',
      promoText: 'Erhalte 10% Rabatt mit diesem Code',
    },
  },
  {
    name: 'Virtuelle Raumgestaltung',
    beschreibung: 'KI-Tool zur virtuellen Einrichtung und Gestaltung von Räumen – perfekt für Immobilien, Innenarchitektur und Staging.',
    link: 'https://homedesigns.ai?fpr=xyz7zs',
    kategorie: 'Präsentation & Räume',
    katColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    popup: {
      badge: 'KI Raumplanung & Staging',
      accentColor: '#fbbf24',
      gradFrom: '#d97706',
      gradTo: '#b45309',
      logoChar: 'V',
      description: 'Gestalte Räume virtuell mit KI – professionelles Immobilien-Staging, Innenarchitektur-Visualisierungen und 3D-Ansichten auf Knopfdruck.',
      statValue: 'In Sekunden',
      statLabel: 'Räume visualisieren',
      StatIcon: Layout,
      features: [
        { Icon: Layout, label: 'KI-Raumgestaltung & Design', color: '#fbbf24' },
        { Icon: Camera, label: 'Professionelles Immobilien-Staging', color: '#34d399' },
        { Icon: Monitor, label: '3D-Visualisierungen erstellen', color: '#60a5fa' },
      ],
      cta: 'Jetzt Raum gestalten',
    },
  },
  {
    name: 'ai marketing',
    beschreibung: 'Künstliche Intelligenz für smartes Marketing – automatisierte Analyse, Zielgruppenansprache und Kampagnenoptimierung.',
    link: 'https://produktstudio.ai/?atp=Cd3Ugz',
    kategorie: 'Marketing',
    katColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    popup: {
      badge: 'KI-Marketing Plattform',
      accentColor: '#f472b6',
      gradFrom: '#db2777',
      gradTo: '#be185d',
      logoChar: 'A',
      description: 'Smarter Marketing mit KI – automatisierte Zielgruppenanalyse, Kampagnenoptimierung und ROI-Steigerung für dein Unternehmen.',
      statValue: 'ROI maximieren',
      statLabel: 'mit KI-Marketing',
      StatIcon: Target,
      features: [
        { Icon: Target, label: 'Präzise Zielgruppenanalyse', color: '#f472b6' },
        { Icon: TrendingUp, label: 'Kampagnen automatisch optimieren', color: '#34d399' },
        { Icon: BarChart2, label: 'Detaillierte Performance-Analysen', color: '#60a5fa' },
      ],
      cta: 'ai marketing testen',
    },
  },
  {
    name: 'GetResponse',
    beschreibung: 'All-in-One E-Mail-Marketing-Plattform mit Newsletter, Landingpages, Webinaren und Marketing-Automatisierung – ideal für kleine und mittlere Unternehmen.',
    link: 'https://try.getresponsetoday.com/hcp4gef2gtvg',
    kategorie: 'Marketing',
    katColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    popup: {
      badge: 'E-Mail Marketing Plattform',
      accentColor: '#f472b6',
      gradFrom: '#db2777',
      gradTo: '#be185d',
      logoChar: 'G',
      description: 'Die All-in-One Marketing-Plattform – E-Mail-Kampagnen, Landingpages, Webinare und Automation für nachhaltiges Unternehmenswachstum.',
      statValue: '350.000+',
      statLabel: 'Kunden weltweit',
      StatIcon: Mail,
      features: [
        { Icon: Mail, label: 'Newsletter & E-Mail-Automation', color: '#f472b6' },
        { Icon: Globe, label: 'Landingpages & Webinare', color: '#60a5fa' },
        { Icon: Users, label: 'Kontaktmanagement & CRM', color: '#34d399' },
      ],
      cta: 'GetResponse kostenlos testen',
    },
  },
  {
    name: 'MagicFit',
    beschreibung: 'Dein KI-Content-Studio – verwandle Produktfotos in virale Posts, Stories, Reels und Ads in Minuten. Über 40.000 Marken erzielen damit 4,2x ROAS, 510% mehr Engagement und sparen 85% Zeit.',
    link: 'http://magicfit.pushowl.com/?ref=ruediger',
    kategorie: 'Marketing',
    katColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    popup: {
      badge: 'KI Content Studio · by PushOwl',
      accentColor: '#f472b6',
      gradFrom: '#db2777',
      gradTo: '#be185d',
      logoChar: 'M',
      description: 'Aus jedem Produktfoto werden in Minuten virale Posts, Stories, Reels und Ads – mit KI-Agenten, die Content erstellen, der wirklich verkauft.',
      statValue: '40.000+ Marken',
      statLabel: '4,2x ROAS im Schnitt',
      StatIcon: TrendingUp,
      features: [
        { Icon: Zap, label: 'Virale Posts & Reels in Minuten', color: '#f472b6' },
        { Icon: Target, label: '4,2x ROAS & 510% mehr Engagement', color: '#34d399' },
        { Icon: Film, label: 'Ads, Stories & Templates mit KI', color: '#fbbf24' },
      ],
      cta: 'MagicFit kostenlos starten',
    },
  },
  {
    name: 'Make',
    beschreibung: 'Leistungsstarke No-Code Automatisierungsplattform – verbinde Apps, automatisiere Workflows und spare täglich Stunden an manueller Arbeit ohne Programmierkenntnisse.',
    link: 'https://www.make.com/en?pc=mdwgermany',
    kategorie: 'Automatisierung',
    katColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    popup: {
      badge: 'No-Code Automatisierung',
      accentColor: '#8b5cf6',
      gradFrom: '#7c3aed',
      gradTo: '#6d28d9',
      logoChar: 'M',
      description: 'Automatisiere alles ohne Code – verbinde 1.500+ Apps mit visuellem Drag-and-Drop und spare täglich Stunden an manueller Arbeit.',
      statValue: '1.500+ Apps',
      statLabel: 'verbinden & automatisieren',
      StatIcon: RefreshCw,
      features: [
        { Icon: Zap, label: 'Visueller Workflow Builder', color: '#8b5cf6' },
        { Icon: Globe, label: '1.500+ App-Integrationen', color: '#34d399' },
        { Icon: RefreshCw, label: 'Automatisiert rund um die Uhr', color: '#60a5fa' },
      ],
      cta: 'Make kostenlos testen',
    },
  },
  {
    name: 'Replit',
    beschreibung: 'KI-gestützte Entwicklungsplattform im Browser – Apps, Websites und Skripte erstellen ohne lokale Installation. Ideal für Einsteiger und Profis, die schnell und kollaborativ bauen möchten.',
    link: 'https://replit-affiliate.replit.app/',
    kategorie: 'No-Code',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'KI Browser-Entwicklungsplattform',
      accentColor: '#fb923c',
      gradFrom: '#ea580c',
      gradTo: '#c2410c',
      logoChar: 'R',
      description: 'Entwickle Apps und Websites direkt im Browser – mit KI-Unterstützung, ohne Setup-Aufwand. Von der Idee zur fertigen App in Minuten.',
      statValue: 'Millionen',
      statLabel: 'Entwickler weltweit',
      StatIcon: Code,
      features: [
        { Icon: Code, label: 'Coding im Browser – kein Setup', color: '#fb923c' },
        { Icon: Brain, label: 'KI-Assistent beim Entwickeln', color: '#22d3ee' },
        { Icon: Zap, label: 'Sofort deployen & teilen', color: '#fbbf24' },
      ],
      cta: 'Replit starten',
    },
  },
  {
    name: 'Emergent Lab',
    beschreibung: 'Full-Stack Web- & Mobile-Apps in Minuten mit KI erstellen – kein Code nötig. Von Y Combinator geförderter App-Builder mit über 3 Mio. Nutzern weltweit.',
    link: 'https://app.emergent.sh/?via=rudiger',
    kategorie: 'App Builder',
    katColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    popup: {
      badge: 'YC S24 · AI App Builder',
      accentColor: '#8b5cf6',
      gradFrom: '#7c3aed',
      gradTo: '#6d28d9',
      logoChar: 'e',
      description: 'Erstelle vollständige Full-Stack Web- & Mobile-Apps in Minuten – mit KI. Kein Code-Wissen nötig.',
      statValue: '3M+ Nutzer',
      statLabel: 'weltweit',
      StatIcon: Users,
      features: [
        { Icon: Zap, label: 'Apps in Minuten deployen', color: '#fbbf24' },
        { Icon: Globe, label: 'Web-Apps mit KI generieren', color: '#22d3ee' },
        { Icon: Smartphone, label: 'Mobile Apps für iOS & Android', color: '#34d399' },
      ],
      cta: 'Jetzt kostenlos starten',
    },
  },
  {
    name: 'Flip Magazine',
    beschreibung: 'Digitale Broschüren und Magazine erstellen – interaktive Flipbooks aus PDFs für professionelle Online-Präsentationen.',
    link: 'https://flipsnack.com',
    kategorie: 'Content & Magazin',
    katColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    popup: {
      badge: 'Digitales Flipbook Tool',
      accentColor: '#60a5fa',
      gradFrom: '#2563eb',
      gradTo: '#1d4ed8',
      logoChar: 'F',
      description: 'Verwandle PDFs in interaktive, professionelle Online-Magazine – Flipbooks für Kataloge, Broschüren und Präsentationen.',
      statValue: 'PDF → Flipbook',
      statLabel: 'in Sekunden',
      StatIcon: BookOpen,
      features: [
        { Icon: BookOpen, label: 'Interaktive Flipbooks aus PDFs', color: '#60a5fa' },
        { Icon: Globe, label: 'Online teilen & publizieren', color: '#34d399' },
        { Icon: Layers, label: 'Professionelle Magazin-Layouts', color: '#fbbf24' },
      ],
      cta: 'Flipsnack testen',
    },
  },
  {
    name: 'UGC Creator',
    beschreibung: 'User Generated Content erstellen – authentische, nutzernahe Videos und Inhalte für höhere Glaubwürdigkeit im Marketing.',
    link: 'https://creatify.ai/?via=rudiger',
    kategorie: 'Content & Magazin',
    katColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    popup: {
      badge: 'KI UGC Video Creator',
      accentColor: '#60a5fa',
      gradFrom: '#2563eb',
      gradTo: '#1d4ed8',
      logoChar: 'U',
      description: 'Erstelle authentische UGC-Videos mit KI-Avataren – glaubwürdige Werbeinhalte, die konvertieren, ohne echte Creators zu buchen.',
      statValue: 'Authentische',
      statLabel: 'Ads & Content',
      StatIcon: Film,
      features: [
        { Icon: Film, label: 'UGC-Videos mit KI-Avataren', color: '#60a5fa' },
        { Icon: Users, label: 'Hohe Glaubwürdigkeit & Reichweite', color: '#34d399' },
        { Icon: Share2, label: 'Alle Social-Media-Plattformen', color: '#fb923c' },
      ],
      cta: 'UGC Creator testen',
    },
  },
  {
    name: 'Produktstudio',
    beschreibung: 'KI-gestütztes Tool zur professionellen Produktfotografie – erstelle hochwertige Produktbilder für Webshops und Social Media ohne teures Fotostudio.',
    link: 'https://produktstudio.ai?atp=Cd3Ugz',
    kategorie: 'Content & Magazin',
    katColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    popup: {
      badge: 'KI-Produktfotografie',
      accentColor: '#60a5fa',
      gradFrom: '#2563eb',
      gradTo: '#1d4ed8',
      logoChar: 'P',
      description: 'Professionelle Produktfotos ohne Fotostudio – KI generiert hochwertige Bilder für deinen Webshop und Social Media in Minuten.',
      statValue: 'Ohne Studio',
      statLabel: 'professionelle Fotos',
      StatIcon: Camera,
      features: [
        { Icon: Camera, label: 'KI-generierte Produktfotos', color: '#60a5fa' },
        { Icon: Image, label: 'Custom & weißer Hintergrund', color: '#34d399' },
        { Icon: Package, label: 'E-Commerce & Social Media ready', color: '#fbbf24' },
      ],
      cta: 'Produktstudio testen',
    },
  },
  {
    name: 'APPSUMO',
    beschreibung: 'Marktplatz für Lifetime-Deals auf Top-Software und digitale Tools – einmalig bezahlen, dauerhaft nutzen.',
    link: 'https://appsumo.com/s/150tk1h/',
    kategorie: 'Deals & Tools',
    katColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    popup: {
      badge: 'Software Lifetime-Deals',
      accentColor: '#f87171',
      gradFrom: '#dc2626',
      gradTo: '#b91c1c',
      logoChar: 'A',
      description: 'Der Marktplatz für Software-Schnäppchen – Lifetime-Lizenzen für Top-SaaS-Tools zu einem Bruchteil des regulären Preises. Einmal zahlen, für immer nutzen.',
      statValue: 'Bis 90% Rabatt',
      statLabel: 'auf Top-Software',
      StatIcon: Percent,
      features: [
        { Icon: Package, label: 'Lifetime-Lizenzen für Top-Tools', color: '#f87171' },
        { Icon: Percent, label: 'Bis 90% günstiger als regulär', color: '#34d399' },
        { Icon: ShoppingBag, label: 'Täglich neue Deals entdecken', color: '#fbbf24' },
      ],
      cta: 'APPSUMO Deals entdecken',
    },
  },
  {
    name: 'Artistly',
    beschreibung: 'KI-gestützte Plattform zur künstlerischen Bildbearbeitung und Erstellung einzigartiger digitaler Kunstwerke.',
    link: 'https://paykstrt.com/48893/174534',
    kategorie: 'Deals & Tools',
    katColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    popup: {
      badge: 'KI Kunst-Generator',
      accentColor: '#f87171',
      gradFrom: '#dc2626',
      gradTo: '#b91c1c',
      logoChar: 'A',
      description: 'Erstelle einzigartige digitale Kunstwerke mit KI – verschiedene Kunststile, professionelle Bildbearbeitung und kreative Möglichkeiten ohne Ende.',
      statValue: 'Einzigartige',
      statLabel: 'KI-Kunstwerke',
      StatIcon: Star,
      features: [
        { Icon: Star, label: 'KI-Bildgenerierung & Kunst', color: '#f87171' },
        { Icon: Layers, label: 'Verschiedene Kunststile', color: '#a78bfa' },
        { Icon: Image, label: 'Hochwertige digitale Ergebnisse', color: '#34d399' },
      ],
      cta: 'Artistly entdecken',
    },
  },
  {
    name: 'WordPressit',
    beschreibung: 'Schnell und einfach professionelle WordPress-Webseiten erstellen – mit fertigen Templates, Hosting und allem was für eine moderne Website benötigt wird.',
    link: 'https://worldpressit.com/ref/643/',
    kategorie: 'Deals & Tools',
    katColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    popup: {
      badge: 'WordPress Website-Builder',
      accentColor: '#f87171',
      gradFrom: '#dc2626',
      gradTo: '#b91c1c',
      logoChar: 'W',
      description: 'Professionelle WordPress-Webseiten schnell und einfach erstellen – mit fertigen Templates, Hosting inklusive und ohne technisches Vorwissen.',
      statValue: 'In Minuten',
      statLabel: 'online & fertig',
      StatIcon: Globe,
      features: [
        { Icon: Globe, label: 'Professionelle Website in Minuten', color: '#f87171' },
        { Icon: Monitor, label: 'Hosting & Domains inklusive', color: '#60a5fa' },
        { Icon: Zap, label: 'Fertige Templates & kein Technikwissen', color: '#fbbf24' },
      ],
      cta: 'WordPressit jetzt starten',
    },
  },
  {
    name: 'Oakgen.ai',
    beschreibung: 'Ein KI-Workspace für alles – nutze führende KI-Modelle für Chat, Bilder, Video, Stimme, Musik, Avatare, UGC-Ads und Bildbearbeitung in einem einzigen Arbeitsbereich mit gemeinsamem Guthaben.',
    link: 'https://my-digital-world-main.replit.app/oakgen',
    kategorie: 'KI Allround',
    katColor: 'bg-green-500/10 text-green-400 border-green-500/20',
    popup: {
      badge: 'All-in-One KI-Workspace',
      accentColor: '#34d399',
      gradFrom: '#059669',
      gradTo: '#047857',
      logoChar: 'O',
      description: 'Alle führenden KI-Modelle an einem Ort – Chat, Bilder, Video, Musik, Stimme und mehr. Ein gemeinsames Guthaben für sämtliche KI-Funktionen.',
      statValue: '20+ KI-Modelle',
      statLabel: 'in einem Workspace',
      StatIcon: Cpu,
      features: [
        { Icon: Brain, label: 'Chat, Bilder, Video & Musik', color: '#34d399' },
        { Icon: Cpu, label: '20+ führende KI-Modelle', color: '#22d3ee' },
        { Icon: Music, label: 'Stimme, Avatare & UGC-Ads', color: '#a78bfa' },
      ],
      cta: 'Oakgen.ai entdecken',
    },
  },
  {
    name: 'ChatGPT News',
    beschreibung: 'Aktuelle Neuigkeiten und Entwicklungen rund um ChatGPT und OpenAI – immer auf dem neuesten Stand der KI-Welt.',
    link: 'https://www.instagram.com/my_digit_world',
    kategorie: 'ChatGPT',
    katColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    popup: {
      badge: 'KI-News & ChatGPT Updates',
      accentColor: '#34d399',
      gradFrom: '#059669',
      gradTo: '#047857',
      logoChar: 'C',
      description: 'Immer up-to-date über ChatGPT, OpenAI und die gesamte KI-Welt – täglich neue Updates, Tipps und Entwicklungen direkt auf Instagram.',
      statValue: 'Täglich neue',
      statLabel: 'KI-Updates',
      StatIcon: Bell,
      features: [
        { Icon: Brain, label: 'Neueste ChatGPT-Updates', color: '#34d399' },
        { Icon: Bell, label: 'OpenAI-News in Echtzeit', color: '#fbbf24' },
        { Icon: TrendingUp, label: 'KI-Trends & Insights', color: '#60a5fa' },
      ],
      cta: 'Jetzt folgen',
    },
  },
  {
    name: 'Die digitale Akademie',
    beschreibung: 'MentorTools – die All-in-One Plattform für Online-Kurse, digitale Produkte und Mitgliederbereiche. Erstelle, vermarkte und verkaufe dein Wissen professionell.',
    link: 'https://mentortools.com',
    kategorie: 'Akademie & Kurse',
    katColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    popup: {
      badge: 'Online-Kurs Plattform',
      accentColor: '#818cf8',
      gradFrom: '#4f46e5',
      gradTo: '#4338ca',
      logoChar: 'A',
      description: 'Erstelle, vermarkte und verkaufe dein Wissen mit MentorTools – Kurse, Mitgliederbereiche und Coaching-Funktionen in einer Plattform.',
      statValue: 'All-in-One',
      statLabel: 'Kurs-System',
      StatIcon: GraduationCap,
      features: [
        { Icon: GraduationCap, label: 'Online-Kurse & Coaching', color: '#818cf8' },
        { Icon: Mail, label: 'Automatisierte E-Mail-Sequenzen', color: '#60a5fa' },
        { Icon: Users, label: 'Mitgliederbereich & Community', color: '#34d399' },
      ],
      cta: 'MentorTools testen',
    },
  },
]

interface PopupProps {
  name: string
  link: string
  popup: PopupConfig
  onClose: () => void
}

function ToolPopup({ name, link, popup, onClose }: PopupProps) {
  const { StatIcon } = popup
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.78)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
          border: `1px solid ${popup.accentColor}4d`,
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: `0 25px 60px ${popup.accentColor}30, 0 0 0 1px ${popup.accentColor}1a`,
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/40 hover:text-white/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${popup.accentColor}1a 0%, ${popup.accentColor}0d 100%)`,
            borderBottom: `1px solid ${popup.accentColor}2a`,
            padding: '22px 24px 18px',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 42,
                height: 42,
                background: `linear-gradient(135deg, ${popup.gradFrom}, ${popup.gradTo})`,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                fontWeight: 800,
                color: '#fff',
                flexShrink: 0,
                letterSpacing: '-0.02em',
              }}
            >
              {popup.logoChar}
            </div>
            <div>
              <div className="text-white text-[17px] font-bold leading-tight">{name}</div>
              <div style={{ color: popup.accentColor, fontSize: 10.5, fontWeight: 500, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                {popup.badge}
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-white/60 text-[13.5px] leading-relaxed mb-4">
            {popup.description}
          </p>

          {/* Stat */}
          <div
            className="flex items-center gap-2 mb-4 rounded-xl px-4 py-2.5"
            style={{ background: `${popup.accentColor}12`, border: `1px solid ${popup.accentColor}25` }}
          >
            <StatIcon className="w-4 h-4 flex-shrink-0" style={{ color: popup.accentColor }} />
            <span className="text-[13px] font-semibold" style={{ color: popup.accentColor }}>{popup.statValue}</span>
            <span className="text-xs text-white/30">{popup.statLabel}</span>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-2 mb-5">
            {popup.features.map(({ Icon, label, color }, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" style={{ color }} />
                <span className="text-white/70 text-[13px]">{label}</span>
              </div>
            ))}
          </div>

          {/* Promo code */}
          {popup.promoCode && (
            <div className="mb-4 rounded-xl p-3" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <p className="text-yellow-300/70 text-xs mb-2 flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> {popup.promoText}
              </p>
              <code className="block text-center font-mono font-bold text-yellow-300 text-sm tracking-widest bg-yellow-400/10 border border-yellow-400/20 rounded-lg px-3 py-1.5">
                {popup.promoCode}
              </code>
            </div>
          )}

          {/* CTA */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white text-[13.5px] font-semibold transition-opacity hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${popup.gradFrom}, ${popup.gradTo})`,
              boxShadow: `0 4px 18px ${popup.accentColor}35`,
            }}
          >
            {popup.cta}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="text-white/20 text-[11px] text-center mt-2">
            Kostenlos loslegen · Kein Kreditkarte erforderlich
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Programme() {
  const [activePopup, setActivePopup] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const active = programme.find((p) => p.name === activePopup)
  const filtered = query.trim()
    ? programme.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.kategorie.toLowerCase().includes(query.toLowerCase()) ||
        p.beschreibung.toLowerCase().includes(query.toLowerCase())
      )
    : programme

  return (
    <div className="pt-24 pb-32">
      {active && (
        <ToolPopup
          name={active.name}
          link={active.link}
          popup={active.popup}
          onClose={() => setActivePopup(null)}
        />
      )}

      {/* Header */}
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            Zu den Programmen
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight" data-testid="text-programme-headline">
            Alle digitalen<br />
            <span className="gradient-text">Programme & Tools</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed" data-testid="text-programme-subtitle">
            Eine Übersicht aller Programme, die My Digital World empfiehlt und einsetzt –<br />
            von KI-Tools über Social Media bis zu Marketing-Software.
          </p>
        </div>
      </div>

      {/* Programme Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

        {/* Toolbar: count left, search right */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <p className="text-white/40 text-sm">
            {filtered.length} {filtered.length === 1 ? 'Tool' : 'Tools'}
            {query.trim() && <span className="text-white/25"> gefunden</span>}
          </p>

          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
            <input
              type="text"
              placeholder="Tool suchen …"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-56 sm:w-72 pl-9 pr-9 py-2 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: query ? '0 0 0 2px rgba(34,211,238,0.2)' : 'none',
                borderColor: query ? 'rgba(34,211,238,0.4)' : 'rgba(255,255,255,0.1)',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'rgba(34,211,238,0.4)'
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(34,211,238,0.15)'
              }}
              onBlur={(e) => {
                if (!query) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.boxShadow = 'none'
                }
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="group-programme-grid">
          {filtered.length > 0 ? filtered.map((prog) => (
            <button
              key={prog.name}
              onClick={() => setActivePopup(prog.name)}
              data-testid={`card-programm-${prog.name.replace(/\s/g, '-').toLowerCase()}`}
              className="card-hover glass rounded-xl border border-white/5 p-5 group flex flex-col gap-3 transition-all text-left w-full"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = prog.popup.accentColor + '40')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-semibold text-white text-base transition-colors group-hover:text-white">
                    {prog.name}
                  </h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] border ${prog.katColor}`}>
                    {prog.kategorie}
                  </span>
                </div>
                <ExternalLink
                  className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-1"
                />
              </div>
              <p className="text-white/70 text-base leading-relaxed flex-1">{prog.beschreibung}</p>
              {prog.popup.promoCode && (
                <div className="mt-1 rounded-lg bg-yellow-500/10 border border-yellow-400/30 p-3">
                  <p className="text-yellow-300/80 text-xs mb-1.5 flex items-center gap-1.5">
                    <Tag className="w-3 h-3" /> {prog.popup.promoText}
                  </p>
                  <code className="block text-center font-mono font-bold text-yellow-300 text-sm tracking-widest bg-yellow-400/10 border border-yellow-400/20 rounded-md px-3 py-1.5">
                    {prog.popup.promoCode}
                  </code>
                </div>
              )}
            </button>
          )) : (
            <div className="col-span-3 py-20 text-center">
              <Search className="w-10 h-10 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-sm">Kein Tool gefunden für „{query}"</p>
              <button onClick={() => setQuery('')} className="mt-3 text-cyan-400 text-xs hover:underline">
                Suche zurücksetzen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
