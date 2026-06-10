import { useState } from 'react'
import {
  ExternalLink, X,
  Zap, Globe, Monitor, Layers,
  Layout, Star, Search, Users,
  Image, PenTool, Award, TrendingUp, BookOpen,
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
  infoLink?: string
}

interface Resource {
  name: string
  beschreibung: string
  link: string
  kategorie: string
  katColor: string
  popup: PopupConfig
}

const resources: Resource[] = [
  {
    name: 'Landingfolio',
    beschreibung: 'Die beste Sammlung an Landing Page Design-Inspiration, Templates und Komponenten – kuratiert für höchste Qualität.',
    link: 'https://www.landingfolio.com',
    kategorie: 'Landing Pages',
    katColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    popup: {
      badge: 'Landing Page Inspiration',
      accentColor: '#22d3ee',
      gradFrom: '#0891b2',
      gradTo: '#0e7490',
      logoChar: 'L',
      description: 'Entdecke hunderte kuratierte Landing Page Designs, fertige Templates und über 800 Komponenten für Tailwind & Webflow – für SaaS, Marketing & mehr.',
      statValue: '800+ Komponenten',
      statLabel: 'für Tailwind & Webflow',
      StatIcon: Layout,
      features: [
        { Icon: Layout, label: 'Beste Landing Page Designs', color: '#22d3ee' },
        { Icon: Layers, label: 'Templates & Komponenten', color: '#34d399' },
        { Icon: Monitor, label: 'Tailwind & Webflow ready', color: '#60a5fa' },
      ],
      cta: 'Landingfolio entdecken',
      infoLink: 'https://www.landingfolio.com',
    },
  },
  {
    name: 'SaaSFrame',
    beschreibung: 'UI Design Inspiration für SaaS Builder – über 5.000 echte UX & UI Design-Beispiele aus realen SaaS-Produkten.',
    link: 'https://www.saasframe.io',
    kategorie: 'SaaS UI Design',
    katColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    popup: {
      badge: 'SaaS UI Design Inspiration',
      accentColor: '#60a5fa',
      gradFrom: '#2563eb',
      gradTo: '#1d4ed8',
      logoChar: 'S',
      description: 'Erstelle Websites, Produkt-Interfaces und E-Mail-Sequenzen für dein SaaS schneller – mit einer Bibliothek von 5.000+ echten UX & UI Design-Beispielen.',
      statValue: '5.000+ Screens',
      statLabel: 'reale UX & UI Designs',
      StatIcon: Monitor,
      features: [
        { Icon: Monitor, label: 'SaaS Websites & Dashboards', color: '#60a5fa' },
        { Icon: Layers, label: 'App Screens & Flows', color: '#22d3ee' },
        { Icon: PenTool, label: 'E-Mail-Design Inspiration', color: '#a78bfa' },
      ],
      cta: 'SaaSFrame erkunden',
      infoLink: 'https://www.saasframe.io',
    },
  },
  {
    name: 'Mobbin',
    beschreibung: 'Echte Design-Inspiration aus 1.000+ iOS & Web Apps – genutzt von Design-Teams bei Uber, Meta, Airbnb und Pinterest.',
    link: 'https://mobbin.com',
    kategorie: 'App Design',
    katColor: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    popup: {
      badge: 'Real-World App Designs',
      accentColor: '#f472b6',
      gradFrom: '#db2777',
      gradTo: '#be185d',
      logoChar: 'M',
      description: 'Entdecke echte Design-Inspiration aus über 1.000 iOS & Web Apps und 400 Websites – wöchentlich neue Inhalte, genutzt von Teams wie Uber, Meta und Airbnb.',
      statValue: '1.000+ Apps',
      statLabel: 'iOS, Android & Web',
      StatIcon: Image,
      features: [
        { Icon: Image, label: 'iOS & Android App Designs', color: '#f472b6' },
        { Icon: Globe, label: '400+ Web Apps & Sites', color: '#22d3ee' },
        { Icon: Users, label: 'Genutzt von Uber, Meta, Airbnb', color: '#fbbf24' },
      ],
      cta: 'Mobbin kostenlos erkunden',
      infoLink: 'https://mobbin.com',
    },
  },
  {
    name: 'Pageflows',
    beschreibung: 'UI/UX Inspiration aus echten User Flows – über 100.000 Designer weltweit nutzen Pageflows für bessere Produkte.',
    link: 'https://pageflows.com',
    kategorie: 'User Flows',
    katColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    popup: {
      badge: 'UI/UX Flow Inspiration',
      accentColor: '#fbbf24',
      gradFrom: '#d97706',
      gradTo: '#b45309',
      logoChar: 'P',
      description: 'Erkunde echte User Flows und Design-Patterns aus führenden Apps und Websites. Trusted by 100.000+ Designer weltweit – Disney, Booking.com, Google.',
      statValue: '100.000+ Designer',
      statLabel: 'weltweit',
      StatIcon: TrendingUp,
      features: [
        { Icon: Search, label: 'Echte User Flows & Patterns', color: '#fbbf24' },
        { Icon: Monitor, label: 'iOS, Android & Web', color: '#34d399' },
        { Icon: Star, label: 'Trusted by Disney & Google', color: '#f472b6' },
      ],
      cta: 'Pageflows entdecken',
      infoLink: 'https://pageflows.com',
    },
  },
  {
    name: 'Dribbble',
    beschreibung: 'Die weltbeste Design-Community – entdecke Portfolios, Top-Designer und echte Projekte für Inspiration und Freelancer-Suche.',
    link: 'https://dribbble.com',
    kategorie: 'Design Community',
    katColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    popup: {
      badge: 'Weltbeste Design Community',
      accentColor: '#fb7185',
      gradFrom: '#e11d48',
      gradTo: '#be123c',
      logoChar: 'D',
      description: 'Arbeite mit den weltbesten Web-Designern – entdecke Shots, Portfolios und echte Projekte. Brief einreichen und Vorschläge kostenlos erhalten.',
      statValue: 'Weltbeste Designer',
      statLabel: 'für Web, App & Branding',
      StatIcon: Award,
      features: [
        { Icon: Image, label: 'Design Shots & Portfolios', color: '#fb7185' },
        { Icon: Users, label: 'Top Freelancer finden', color: '#22d3ee' },
        { Icon: PenTool, label: 'Echte Projekte & Inspiration', color: '#fbbf24' },
      ],
      cta: 'Dribbble erkunden',
      infoLink: 'https://dribbble.com',
    },
  },
  {
    name: 'Awwwards',
    beschreibung: 'Die Oscars des Web-Designs – täglich ausgezeichnete Websites, digitale Erlebnisse und Portfolios auf Weltklasse-Niveau.',
    link: 'https://www.awwwards.com',
    kategorie: 'Web Design Awards',
    katColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    popup: {
      badge: 'Webdesign Awards & Inspiration',
      accentColor: '#34d399',
      gradFrom: '#059669',
      gradTo: '#047857',
      logoChar: 'A',
      description: 'Täglich neue ausgezeichnete Websites, Portfolios und digitale Erlebnisse auf Weltklasse-Niveau – die bekannteste Auszeichnung im Web-Design.',
      statValue: 'Site of the Day',
      statLabel: 'täglich prämiert',
      StatIcon: Award,
      features: [
        { Icon: Award, label: 'Ausgezeichnete Top-Websites', color: '#34d399' },
        { Icon: Globe, label: 'Portfolios & Agenturen', color: '#60a5fa' },
        { Icon: Zap, label: 'Tägliche Design-Inspiration', color: '#fbbf24' },
      ],
      cta: 'Awwwards entdecken',
      infoLink: 'https://www.awwwards.com',
    },
  },
  {
    name: 'Behance',
    beschreibung: 'Adobes weltgrößte Kreativ-Plattform – entdecke Portfolios, Projekte und Inspiration von den besten Designern weltweit.',
    link: 'https://www.behance.net/',
    kategorie: 'Creative Portfolio',
    katColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    popup: {
      badge: 'Adobe Creative Platform',
      accentColor: '#3b9af8',
      gradFrom: '#1473e6',
      gradTo: '#0d66d0',
      logoChar: 'B',
      description: 'Die weltgrößte Plattform für Kreative – entdecke Millionen von Design-Projekten, Portfolios und Inspirationen. Freelancer finden oder selbst entdeckt werden.',
      statValue: 'Millionen Projekte',
      statLabel: 'weltbeste Kreative',
      StatIcon: Users,
      features: [
        { Icon: Image, label: 'Design-Portfolios & Projekte', color: '#3b9af8' },
        { Icon: Users, label: 'Top Freelancer entdecken', color: '#22d3ee' },
        { Icon: PenTool, label: 'Branding, UI, Illustration & mehr', color: '#a78bfa' },
      ],
      cta: 'Behance erkunden',
      infoLink: 'https://www.behance.net/',
    },
  },
  {
    name: 'Land-book',
    beschreibung: 'Kuratierte Galerie der schönsten Websites – Inspiration für Landing Pages, Portfolios und digitale Erlebnisse auf höchstem Niveau.',
    link: 'https://land-book.com/',
    kategorie: 'Website Galerie',
    katColor: 'bg-green-500/10 text-green-400 border-green-500/20',
    popup: {
      badge: 'Website Design Galerie',
      accentColor: '#4ade80',
      gradFrom: '#16a34a',
      gradTo: '#15803d',
      logoChar: 'L',
      description: 'Eine handverlesene Galerie der schönsten Websites – für Landing Pages, Portfolios, SaaS und mehr. Täglich neue Inspirationen auf höchstem gestalterischem Niveau.',
      statValue: 'Top Websites',
      statLabel: 'täglich kuratiert',
      StatIcon: Globe,
      features: [
        { Icon: Globe, label: 'Kuratierte Website Designs', color: '#4ade80' },
        { Icon: Layout, label: 'Landing Pages & Portfolios', color: '#22d3ee' },
        { Icon: Star, label: 'Täglich neue Inspirationen', color: '#fbbf24' },
      ],
      cta: 'Land-book entdecken',
      infoLink: 'https://land-book.com/',
    },
  },
  {
    name: 'Lapa Ninja',
    beschreibung: 'Über 7.300 Landing Page Designs seit 2015 – mit 15.000+ vollständigen Website-Screenshots, Fonts und Design-Ressourcen.',
    link: 'https://www.lapa.ninja/',
    kategorie: 'Landing Pages',
    katColor: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    popup: {
      badge: 'Landing Page Inspiration',
      accentColor: '#a78bfa',
      gradFrom: '#7c3aed',
      gradTo: '#6d28d9',
      logoChar: 'LN',
      description: 'Lapa Ninja bietet über 7.300 Landing Page Designs seit 2015 – inklusive 15.000+ vollständiger Website-Screenshots, Fonts und Design-Lernressourcen.',
      statValue: '7.300+ Designs',
      statLabel: 'seit 2015',
      StatIcon: Layout,
      features: [
        { Icon: Layout, label: '7.300+ Landing Page Designs', color: '#a78bfa' },
        { Icon: Image, label: '15.000+ Website Screenshots', color: '#22d3ee' },
        { Icon: PenTool, label: 'Fonts & Design-Ressourcen', color: '#fbbf24' },
      ],
      cta: 'Lapa Ninja erkunden',
      infoLink: 'https://www.lapa.ninja/',
    },
  },
  {
    name: 'Pttrns',
    beschreibung: 'Tausende kuratierte Mobile Design Patterns – werde ein besserer Interface-Designer mit echten App-Screens und UX-Mustern.',
    link: 'https://pttrns.com/',
    kategorie: 'Mobile Patterns',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Mobile Design Patterns',
      accentColor: '#fb923c',
      gradFrom: '#ea580c',
      gradTo: '#c2410c',
      logoChar: 'P',
      description: 'Mit Pttrns wirst du ein besserer Interface-Designer – tausende kuratierte Mobile Design Patterns, echte App-Screens und UX-Muster aus führenden iOS & Android Apps.',
      statValue: '1.000+ Patterns',
      statLabel: 'kuratierte Mobile Designs',
      StatIcon: Monitor,
      features: [
        { Icon: Monitor, label: 'Kuratierte Mobile Patterns', color: '#fb923c' },
        { Icon: Search, label: 'iOS & Android App Screens', color: '#22d3ee' },
        { Icon: Users, label: 'Designer Community', color: '#a78bfa' },
      ],
      cta: 'Pttrns entdecken',
      infoLink: 'https://pttrns.com/',
    },
  },
  {
    name: 'UX Archive',
    beschreibung: 'Das größte Archiv für UX Patterns – echte App-Screens aus Top-Apps nach Kategorien sortiert für schnelle UI/UX Inspiration.',
    link: 'https://uxarchive.com/',
    kategorie: 'UX Patterns',
    katColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    popup: {
      badge: 'UX Patterns Archiv',
      accentColor: '#2dd4bf',
      gradFrom: '#0d9488',
      gradTo: '#0f766e',
      logoChar: 'UX',
      description: 'Das größte frei zugängliche Archiv für UX Patterns – echte App-Screens aus den bekanntesten Apps der Welt, nach Kategorien und Flows sortiert.',
      statValue: 'UX Patterns',
      statLabel: 'nach Kategorie sortiert',
      StatIcon: Layers,
      features: [
        { Icon: Layers, label: 'UX Patterns & User Flows', color: '#2dd4bf' },
        { Icon: Search, label: 'Nach Kategorien filterbar', color: '#60a5fa' },
        { Icon: Monitor, label: 'Echte App-Screens', color: '#fbbf24' },
      ],
      cta: 'UX Archive erkunden',
      infoLink: 'https://uxarchive.com/',
    },
  },

  // Design Tools
  {
    name: 'Figma',
    beschreibung: 'Das führende kollaborative Design-Tool – UI/UX Design, Prototyping und Handoff in einer cloud-basierten Plattform.',
    link: 'https://www.figma.com/',
    kategorie: 'Design Tool',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Design Tool',
      accentColor: '#f97316',
      gradFrom: '#ea580c',
      gradTo: '#c2410c',
      logoChar: 'F',
      description: 'Das weltweit führende kollaborative Design-Tool – UI/UX Design, Prototyping, Komponenten und Developer-Handoff in einer einzigen Plattform. Kostenloser Starter-Plan verfügbar.',
      statValue: 'Kostenlos starten',
      statLabel: 'Starter-Plan verfügbar',
      StatIcon: PenTool,
      features: [
        { Icon: PenTool, label: 'UI/UX Design & Prototyping', color: '#f97316' },
        { Icon: Users, label: 'Echtzeit-Kollaboration', color: '#22d3ee' },
        { Icon: Layers, label: 'Komponenten & Auto Layout', color: '#a78bfa' },
      ],
      cta: 'Figma kostenlos starten',
      infoLink: 'https://www.figma.com/',
    },
  },
  {
    name: 'Penpot',
    beschreibung: 'Open-Source Design-Tool als Figma-Alternative – kollaboratives UI/UX Design, Prototyping und selbst hostbar.',
    link: 'https://penpot.app/',
    kategorie: 'Design Tool',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Open-Source Design Tool',
      accentColor: '#a78bfa',
      gradFrom: '#7c3aed',
      gradTo: '#6d28d9',
      logoChar: 'PP',
      description: 'Die 100% kostenlose Open-Source Alternative zu Figma – Design, Prototyping und Handoff in einer Plattform. Selbst hostbar oder als Cloud-Version nutzbar.',
      statValue: '100% kostenlos',
      statLabel: 'Open Source',
      StatIcon: Globe,
      features: [
        { Icon: PenTool, label: 'UI/UX Design & Prototyping', color: '#a78bfa' },
        { Icon: Globe, label: 'Self-hosted oder Cloud', color: '#22d3ee' },
        { Icon: Users, label: 'Kollaboratives Arbeiten', color: '#fbbf24' },
      ],
      cta: 'Penpot kostenlos nutzen',
      infoLink: 'https://penpot.app/',
    },
  },
  {
    name: 'Canva',
    beschreibung: 'Das einfachste Grafik-Design-Tool – Social Media Posts, Präsentationen, Logos und mehr ohne Vorkenntnisse erstellen.',
    link: 'https://www.canva.com/',
    kategorie: 'Design Tool',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Grafik Design Tool',
      accentColor: '#22d3ee',
      gradFrom: '#0891b2',
      gradTo: '#0e7490',
      logoChar: 'C',
      description: 'Das weltweit beliebteste Grafik-Design-Tool für alle – tausende Templates für Social Media, Präsentationen, Flyer, Logos und mehr. Kostenlos verfügbar.',
      statValue: '1 Mrd+ Designs',
      statLabel: 'weltweit erstellt',
      StatIcon: Image,
      features: [
        { Icon: Image, label: 'Social Media & Marketing', color: '#22d3ee' },
        { Icon: Layout, label: 'Tausende Templates', color: '#fbbf24' },
        { Icon: Zap, label: 'KI-gestützte Design-Tools', color: '#a78bfa' },
      ],
      cta: 'Canva kostenlos starten',
      infoLink: 'https://www.canva.com/',
    },
  },
  {
    name: 'Whimsical',
    beschreibung: 'Schnelles visuelles Denken – Wireframes, Flowcharts, Mindmaps und Sticky Notes in einem kollaborativen Tool.',
    link: 'https://whimsical.com/',
    kategorie: 'Design Tool',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Wireframes & Flowcharts',
      accentColor: '#fb7185',
      gradFrom: '#e11d48',
      gradTo: '#be123c',
      logoChar: 'W',
      description: 'Whimsical ist das schnellste Tool für visuelles Denken – Wireframes, Flowcharts, Mindmaps und Docs in einem kollaborativen Workspace. Kostenloser Starter-Plan.',
      statValue: 'Kostenlos starten',
      statLabel: 'Starter-Plan verfügbar',
      StatIcon: Layers,
      features: [
        { Icon: Layout, label: 'Wireframes & Mockups', color: '#fb7185' },
        { Icon: TrendingUp, label: 'Flowcharts & Mindmaps', color: '#22d3ee' },
        { Icon: Users, label: 'Echtzeit-Kollaboration', color: '#fbbf24' },
      ],
      cta: 'Whimsical kostenlos nutzen',
      infoLink: 'https://whimsical.com/',
    },
  },
  {
    name: 'Framer',
    beschreibung: 'Design und publish deine Website direkt – interaktive Prototypen und live Websites ohne Code, mit AI-Unterstützung.',
    link: 'https://www.framer.com/',
    kategorie: 'Design Tool',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'Design & Website Builder',
      accentColor: '#60a5fa',
      gradFrom: '#2563eb',
      gradTo: '#1d4ed8',
      logoChar: 'Fr',
      description: 'Mit Framer designst du und veröffentlichst deine Website in einem Schritt – interaktive Animationen, Komponenten und AI-Tools. Kostenloser Plan für erste Projekte.',
      statValue: 'Design to Live',
      statLabel: 'ohne Code publizieren',
      StatIcon: Monitor,
      features: [
        { Icon: Monitor, label: 'Website Design & Publishing', color: '#60a5fa' },
        { Icon: Zap, label: 'Interaktive Animationen', color: '#fbbf24' },
        { Icon: Star, label: 'AI-gestütztes Design', color: '#a78bfa' },
      ],
      cta: 'Framer kostenlos starten',
      infoLink: 'https://www.framer.com/',
    },
  },
  {
    name: 'Uizard',
    beschreibung: 'KI-gestütztes UI-Design – wandle Skizzen oder Screenshots in editierbare Mockups und Prototypen um.',
    link: 'https://uizard.io/',
    kategorie: 'Design Tool',
    katColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    popup: {
      badge: 'AI UI Design Tool',
      accentColor: '#f472b6',
      gradFrom: '#db2777',
      gradTo: '#be185d',
      logoChar: 'Ui',
      description: 'Uizard nutzt KI, um Skizzen und Screenshots in editierbare UI-Mockups zu verwandeln. Schnell Prototypen erstellen, auch ohne Design-Erfahrung.',
      statValue: 'KI-Powered',
      statLabel: 'Skizze zu Mockup in Sekunden',
      StatIcon: Zap,
      features: [
        { Icon: Zap, label: 'Skizze → Mockup per AI', color: '#f472b6' },
        { Icon: Layout, label: 'App & Web Prototypen', color: '#22d3ee' },
        { Icon: Users, label: 'Team-Kollaboration', color: '#fbbf24' },
      ],
      cta: 'Uizard kostenlos testen',
      infoLink: 'https://uizard.io/',
    },
  },

  // Komponenten & UI Kits
  {
    name: 'shadcn/ui',
    beschreibung: 'Hochwertige React-Komponenten zum Kopieren – frei anpassbar, zugänglich und ohne eigene Abhängigkeit.',
    link: 'https://ui.shadcn.com/',
    kategorie: 'UI Kit',
    katColor: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    popup: {
      badge: 'React Komponenten',
      accentColor: '#e2e8f0',
      gradFrom: '#334155',
      gradTo: '#1e293b',
      logoChar: 'SH',
      description: 'Shadcn/ui ist keine Bibliothek – du kopierst die Komponenten direkt in dein Projekt. Vollständig anpassbar, zugänglich (ARIA) und mit Tailwind CSS gestylt.',
      statValue: '100% anpassbar',
      statLabel: 'kein npm-Paket nötig',
      StatIcon: Layers,
      features: [
        { Icon: Layers, label: 'Copy & Paste Komponenten', color: '#e2e8f0' },
        { Icon: Monitor, label: 'Tailwind CSS + Radix UI', color: '#22d3ee' },
        { Icon: Star, label: 'Zugänglich & barrierefrei', color: '#fbbf24' },
      ],
      cta: 'shadcn/ui erkunden',
      infoLink: 'https://ui.shadcn.com/',
    },
  },
  {
    name: 'Tailwind UI',
    beschreibung: 'Offizielle Tailwind CSS Komponenten – professionelle UI-Blocks für Landing Pages, App-Shells und Marketing-Seiten.',
    link: 'https://tailwindui.com/components',
    kategorie: 'UI Kit',
    katColor: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    popup: {
      badge: 'Tailwind CSS Komponenten',
      accentColor: '#38bdf8',
      gradFrom: '#0284c7',
      gradTo: '#0369a1',
      logoChar: 'TW',
      description: 'Die offiziellen Tailwind CSS Komponenten – über 500 professionelle UI-Blocks für Marketing, App-UIs und E-Commerce. Viele kostenlos verfügbar.',
      statValue: '500+ Komponenten',
      statLabel: 'für Marketing & App-UI',
      StatIcon: Layout,
      features: [
        { Icon: Layout, label: 'Marketing & Landing Pages', color: '#38bdf8' },
        { Icon: Monitor, label: 'App Shells & Dashboards', color: '#22d3ee' },
        { Icon: PenTool, label: 'HTML, React & Vue', color: '#a78bfa' },
      ],
      cta: 'Tailwind UI entdecken',
      infoLink: 'https://tailwindui.com/components',
    },
  },
  {
    name: 'Flowbite',
    beschreibung: 'Kostenlose Tailwind CSS Komponenten-Bibliothek – über 600 UI-Elemente, Blocks und interaktive Komponenten.',
    link: 'https://www.flowbite.com/',
    kategorie: 'UI Kit',
    katColor: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    popup: {
      badge: 'Tailwind CSS UI Library',
      accentColor: '#3b82f6',
      gradFrom: '#2563eb',
      gradTo: '#1d4ed8',
      logoChar: 'FB',
      description: 'Flowbite ist eine kostenlose Open-Source Komponenten-Bibliothek auf Basis von Tailwind CSS – über 600 UI-Elemente, Blocks und Figma-Dateien inklusive.',
      statValue: '600+ Komponenten',
      statLabel: 'Open Source & kostenlos',
      StatIcon: Layers,
      features: [
        { Icon: Layers, label: '600+ UI Komponenten & Blocks', color: '#3b82f6' },
        { Icon: PenTool, label: 'Figma Design Kit inklusive', color: '#22d3ee' },
        { Icon: Monitor, label: 'HTML, React, Vue, Svelte', color: '#fbbf24' },
      ],
      cta: 'Flowbite kostenlos nutzen',
      infoLink: 'https://www.flowbite.com/',
    },
  },
  {
    name: 'Aceternity UI',
    beschreibung: 'Animierte React-Komponenten mit Tailwind CSS und Framer Motion – spektakuläre UI-Effekte zum einfachen Einbinden.',
    link: 'https://ui.aceternity.com/',
    kategorie: 'UI Kit',
    katColor: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    popup: {
      badge: 'Animierte UI Komponenten',
      accentColor: '#a78bfa',
      gradFrom: '#7c3aed',
      gradTo: '#6d28d9',
      logoChar: 'AC',
      description: 'Aceternity UI bietet spektakuläre animierte React-Komponenten mit Tailwind CSS und Framer Motion – von 3D-Karten über Spotlight-Effekte bis zu Gradient-Hintergründen.',
      statValue: 'Copy & Paste',
      statLabel: 'animierte Komponenten',
      StatIcon: Zap,
      features: [
        { Icon: Zap, label: 'Spektakuläre Animationen', color: '#a78bfa' },
        { Icon: Monitor, label: 'React + Tailwind + Framer', color: '#22d3ee' },
        { Icon: Star, label: 'Sofort einsatzbereit', color: '#fbbf24' },
      ],
      cta: 'Aceternity UI erkunden',
      infoLink: 'https://ui.aceternity.com/',
    },
  },
  {
    name: 'Magic UI',
    beschreibung: 'Animierte React-Komponenten für moderne Landing Pages – 150+ UI-Elemente mit Framer Motion und Tailwind CSS.',
    link: 'https://www.magicui.design/',
    kategorie: 'UI Kit',
    katColor: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    popup: {
      badge: 'Animated UI Components',
      accentColor: '#ec4899',
      gradFrom: '#db2777',
      gradTo: '#be185d',
      logoChar: 'MU',
      description: 'Magic UI bietet 150+ animierte React-Komponenten speziell für moderne Landing Pages – Particle Effects, Shimmer, Typing Animations und vieles mehr.',
      statValue: '150+ Komponenten',
      statLabel: 'für Landing Pages',
      StatIcon: Star,
      features: [
        { Icon: Star, label: '150+ animierte Komponenten', color: '#ec4899' },
        { Icon: Zap, label: 'Partikel, Shimmer, Typing', color: '#22d3ee' },
        { Icon: Monitor, label: 'React + Tailwind + Framer', color: '#fbbf24' },
      ],
      cta: 'Magic UI entdecken',
      infoLink: 'https://www.magicui.design/',
    },
  },
  {
    name: 'Figma Community',
    beschreibung: 'Tausende kostenlose Figma Templates, UI Kits, Icons und Design-Ressourcen – direkt in Figma nutzbar.',
    link: 'https://www.figma.com/community',
    kategorie: 'UI Kit',
    katColor: 'bg-slate-500/10 text-slate-300 border-slate-500/20',
    popup: {
      badge: 'Figma Templates & UI Kits',
      accentColor: '#f97316',
      gradFrom: '#ea580c',
      gradTo: '#c2410c',
      logoChar: 'FC',
      description: 'Die offizielle Figma Community mit tausenden kostenlosen Templates, UI Kits, Icon-Sets, Plugins und Design-Ressourcen – direkt in Figma zum Duplizieren.',
      statValue: 'Tausende Ressourcen',
      statLabel: 'kostenlos & direkt nutzbar',
      StatIcon: Layout,
      features: [
        { Icon: Layout, label: 'UI Kits & Templates', color: '#f97316' },
        { Icon: Image, label: 'Icon-Sets & Illustrationen', color: '#22d3ee' },
        { Icon: Zap, label: 'Plugins & Widgets', color: '#a78bfa' },
      ],
      cta: 'Figma Community erkunden',
      infoLink: 'https://www.figma.com/community',
    },
  },

  // UX Wissen
  {
    name: 'Laws of UX',
    beschreibung: 'Die wichtigsten psychologischen Gesetze und Prinzipien des UX-Designs – kompakt erklärt mit praktischen Beispielen.',
    link: 'https://lawsofux.com/',
    kategorie: 'UX Wissen',
    katColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    popup: {
      badge: 'UX Design Prinzipien',
      accentColor: '#ef4444',
      gradFrom: '#dc2626',
      gradTo: '#b91c1c',
      logoChar: 'LUX',
      description: 'Laws of UX erklärt die wichtigsten psychologischen Gesetze des UX-Designs – Hick\'s Law, Fitts\'s Law, Miller\'s Law und mehr, mit praktischen Anwendungsbeispielen.',
      statValue: '21+ UX Gesetze',
      statLabel: 'mit Praxisbeispielen',
      StatIcon: BookOpen,
      features: [
        { Icon: BookOpen, label: '21+ UX Design Gesetze', color: '#ef4444' },
        { Icon: Search, label: 'Psychologie & Kognition', color: '#22d3ee' },
        { Icon: Star, label: 'Praktische Anwendungstipps', color: '#fbbf24' },
      ],
      cta: 'Laws of UX erkunden',
      infoLink: 'https://lawsofux.com/',
    },
  },
  {
    name: 'Checklist.design',
    beschreibung: 'Vollständige UX/UI Design-Checklisten für alle gängigen Komponenten – nie wieder ein wichtiges Detail vergessen.',
    link: 'https://checklist.design/',
    kategorie: 'UX Wissen',
    katColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    popup: {
      badge: 'UX/UI Design Checklisten',
      accentColor: '#10b981',
      gradFrom: '#059669',
      gradTo: '#047857',
      logoChar: 'CL',
      description: 'Checklist.design bietet vollständige Design-Checklisten für alle gängigen UI-Komponenten und Flows – von Forms über Modals bis zu Onboarding. Nie wieder ein Detail vergessen.',
      statValue: '100+ Checklisten',
      statLabel: 'für alle UI-Komponenten',
      StatIcon: Layers,
      features: [
        { Icon: Layers, label: 'Checklisten für alle Komponenten', color: '#10b981' },
        { Icon: Monitor, label: 'Forms, Modals, Nav & mehr', color: '#22d3ee' },
        { Icon: Star, label: 'Best Practices auf einen Blick', color: '#fbbf24' },
      ],
      cta: 'Checklist.design öffnen',
      infoLink: 'https://checklist.design/',
    },
  },
  {
    name: 'Refactoring UI',
    beschreibung: 'Das UX/UI-Design-Buch für Entwickler – lerne wie du schlechtes UI in ansprechendes Design verwandelst.',
    link: 'https://www.refactoringui.com/',
    kategorie: 'UX Wissen',
    katColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    popup: {
      badge: 'UI Design für Entwickler',
      accentColor: '#3b82f6',
      gradFrom: '#2563eb',
      gradTo: '#1d4ed8',
      logoChar: 'RUI',
      description: 'Refactoring UI von den Tailwind-Machern Adam Wathan & Steve Schoger zeigt Entwicklern Schritt für Schritt, wie man schlechtes UI in professionelles Design verwandelt.',
      statValue: 'Bestseller',
      statLabel: 'UI Design für Entwickler',
      StatIcon: BookOpen,
      features: [
        { Icon: BookOpen, label: 'UI Design Schritt für Schritt', color: '#3b82f6' },
        { Icon: PenTool, label: 'Farben, Typo, Spacing', color: '#22d3ee' },
        { Icon: Star, label: 'Von den Tailwind-Machern', color: '#fbbf24' },
      ],
      cta: 'Refactoring UI entdecken',
      infoLink: 'https://www.refactoringui.com/',
    },
  },
]

function ToolPopup({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  const p = resource.popup
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#0d1628', border: `1px solid ${p.accentColor}30` }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="p-6 pb-4"
          style={{ background: `linear-gradient(135deg, ${p.gradFrom}22, ${p.gradTo}11)` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${p.gradFrom}, ${p.gradTo})` }}
            >
              {p.logoChar}
            </div>
            <div>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-1"
                style={{ background: `${p.accentColor}20`, color: p.accentColor, border: `1px solid ${p.accentColor}30` }}
              >
                {p.badge}
              </span>
              <h3 className="text-lg font-bold text-white leading-tight">{resource.name}</h3>
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{p.description}</p>
        </div>

        <div className="px-6 py-4 border-t border-white/5">
          <div
            className="flex items-center gap-3 p-3 rounded-xl mb-4"
            style={{ background: `${p.accentColor}10`, border: `1px solid ${p.accentColor}20` }}
          >
            <p.StatIcon className="w-5 h-5 flex-shrink-0" style={{ color: p.accentColor }} />
            <div>
              <p className="text-base font-bold text-white">{p.statValue}</p>
              <p className="text-xs text-white/50">{p.statLabel}</p>
            </div>
          </div>

          <div className="space-y-2 mb-5">
            {p.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${f.color}15` }}>
                  <f.Icon className="w-3.5 h-3.5" style={{ color: f.color }} />
                </div>
                <span className="text-sm text-white/75">{f.label}</span>
              </div>
            ))}
          </div>

          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${p.gradFrom}, ${p.gradTo})` }}
          >
            {p.cta}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function ForFree() {
  const [activeResource, setActiveResource] = useState<Resource | null>(null)
  const [search, setSearch] = useState('')

  const filtered = resources.filter(r => {
    const q = search.toLowerCase()
    return (
      r.name.toLowerCase().includes(q) ||
      r.kategorie.toLowerCase().includes(q) ||
      r.beschreibung.toLowerCase().includes(q)
    )
  })

  return (
    <div className="min-h-screen bg-[#060b18] pt-20">
      {activeResource && (
        <ToolPopup resource={activeResource} onClose={() => setActiveResource(null)} />
      )}

      <section className="relative py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
            Kostenlose Ressourcen
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Die besten{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              Design-Ressourcen
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Kostenlose Tools und Inspiration für Landing Pages, UI/UX Design, App Flows und Web-Design – kuratiert von My Digital World.
          </p>
        </div>
      </section>

      <section className="px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <p className="text-white/40 text-sm">{filtered.length} Ressourcen</p>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Ressource suchen ..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>Keine Ressourcen gefunden.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(resource => (
                <button
                  key={resource.name}
                  onClick={() => setActiveResource(resource)}
                  className="group relative text-left rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => {
                    const accent = resource.popup.accentColor
                    ;(e.currentTarget as HTMLElement).style.borderColor = `${accent}40`
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${accent}15`
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = ''
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${resource.popup.gradFrom}, ${resource.popup.gradTo})` }}
                      >
                        {resource.popup.logoChar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-sm leading-tight">{resource.name}</h3>
                        <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${resource.katColor}`}>
                          {resource.kategorie}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0 mt-0.5" />
                  </div>

                  <p className="text-white/55 text-xs leading-relaxed mb-3 line-clamp-3">
                    {resource.beschreibung}
                  </p>

                  {resource.popup.infoLink && (
                    <a
                      href={resource.popup.infoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-medium transition-colors hover:opacity-80"
                      style={{ color: resource.popup.accentColor }}
                    >
                      weitere Infos hier
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
