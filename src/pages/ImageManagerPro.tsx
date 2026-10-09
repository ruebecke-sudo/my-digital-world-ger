import { useEffect } from 'react'
import { Link } from 'wouter'
import {
  Images,
  Upload,
  Tags,
  Search,
  Users,
  Globe,
  Palette,
  ShieldCheck,
  Layers,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Mail,
  FlaskConical,
  RefreshCw,
  Infinity as InfinityIcon,
  LayoutTemplate,
  FileText,
  ClipboardCheck,
  Package,
  Download,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// The neutral Image Manager Pro app (own Netlify site built in standalone mode from the zb-interieur repo).
const APP_URL = 'https://imagemanager.my-digital-world.de/image-manager'
const CONTACT_EMAIL = 'info@my-digital-world.de'
// Online-Fragebogen und PDFs liegen statisch in public/fragebogen/ (erzeugt im Projekt webseiten-baukasten).
const FRAGEBOGEN_URL = '/fragebogen/'

export default function ImageManagerPro() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  useEffect(() => {
    const previous = document.title
    document.title = 'Image Manager Pro, My Digital World'
    return () => { document.title = previous }
  }, [])

  const funktionen = [
    {
      icon: Upload,
      title: isDE ? 'Mehrere Bilder auf einmal' : 'Upload many images at once',
      desc: isDE
        ? 'Bilder auswählen, Vorschau prüfen, einzelne wieder entfernen und erst dann hochladen.'
        : 'Select images, check the preview, remove single files and only then upload.',
    },
    {
      icon: Tags,
      title: isDE ? 'Vier eigene Kategorien' : 'Four custom categories',
      desc: isDE
        ? 'Bezeichnungen frei wählbar, etwa Marke, Typ, Raum und Stil oder Kunde, Anlass, Ort und Jahr. Mehreren Bildern gleichzeitig zuweisen.'
        : 'Name them freely, e.g. brand, type, room and style or client, occasion, place and year. Assign them to many images at once.',
    },
    {
      icon: Search,
      title: isDE ? 'Suchen und filtern' : 'Search and filter',
      desc: isDE
        ? 'Volltextsuche, Filter nach Kategorien, Listen oder Rasteransicht.'
        : 'Full text search, category filters, list or grid view.',
    },
    {
      icon: Globe,
      title: isDE ? 'Fertige Galerie mit QR Code' : 'Ready gallery with QR code',
      desc: isDE
        ? 'Ihre eigene Galerie Seite mit Logo, Link und QR Code. Oder per Code direkt auf WordPress, Wix, Jimdo, Shopify und jeder anderen Website.'
        : 'Your own gallery page with logo, link and QR code. Or embedded directly on WordPress, Wix, Jimdo, Shopify and any other website.',
    },
    {
      icon: Users,
      title: isDE ? 'Team und Rollen' : 'Team and roles',
      desc: isDE
        ? 'Mitarbeiter per E-Mail einladen. Rollen Inhaber, Administrator, Mitarbeiter und Nur Lesen.'
        : 'Invite colleagues by email. Roles owner, administrator, member and read only.',
    },
    {
      icon: Palette,
      title: isDE ? 'Ihr eigener Auftritt' : 'Your own branding',
      desc: isDE
        ? 'Eigenes Logo, eigener Name und eigene Markenfarbe. Ihre Kunden sehen Ihre Marke.'
        : 'Your own logo, name and brand color. Your customers see your brand.',
    },
    {
      icon: ShieldCheck,
      title: isDE ? 'Getrennte Arbeitsbereiche' : 'Separate workspaces',
      desc: isDE
        ? 'Jeder Kunde arbeitet in seinem eigenen Bereich. Daten anderer Kunden sind nicht sichtbar.'
        : 'Every customer works in their own workspace. Other customers’ data is not visible.',
    },
    {
      icon: RefreshCw,
      title: isDE ? 'Änderungen nachreichen' : 'Push changes later',
      desc: isDE
        ? 'Texte oder Kategorien geändert? Mit einem Klick an die Website übertragen.'
        : 'Changed texts or categories? Transfer them to the website with one click.',
    },
  ]

  const schritte = isDE
    ? [
        { nr: '01', title: 'Konto anlegen', desc: 'Firmenname, E-Mail und Passwort eingeben. Ihr Arbeitsbereich wird automatisch erstellt.' },
        { nr: '02', title: 'E-Mail bestätigen', desc: 'Klicken Sie den Link in der Bestätigungsmail einmal an.' },
        { nr: '03', title: 'Auftritt gestalten', desc: 'Unter Einstellungen Logo hochladen, Name und Farbe festlegen.' },
        { nr: '04', title: 'Bilder hochladen', desc: 'Bilder mit Vorschau hochladen, benennen und Kategorien vergeben.' },
        { nr: '05', title: 'Galerie zeigen', desc: 'Galerie einschalten, Link teilen, QR Code drucken oder mit dem Assistenten auf Ihrer Website einbauen.' },
      ]
    : [
        { nr: '01', title: 'Create an account', desc: 'Enter company name, email and password. Your workspace is created automatically.' },
        { nr: '02', title: 'Confirm your email', desc: 'Click the link in the confirmation email once.' },
        { nr: '03', title: 'Set up your branding', desc: 'Under settings, upload your logo and choose name and color.' },
        { nr: '04', title: 'Upload images', desc: 'Upload images with preview, name them and assign categories.' },
        { nr: '05', title: 'Show your gallery', desc: 'Switch on the gallery, share the link, print the QR code or add it to your website with the assistant.' },
      ]

  const tarife = [
    { name: 'Starter', price: isDE ? '19 € / Monat' : '€19 / month', limits: isDE ? '500 Bilder · 2 Benutzer · 1 Website' : '500 images · 2 users · 1 website' },
    { name: 'Professional', price: isDE ? '39 € / Monat' : '€39 / month', limits: isDE ? '5.000 Bilder · 5 Benutzer · 2 Websites' : '5,000 images · 5 users · 2 websites', highlight: true },
    { name: 'Business', price: isDE ? '79 € / Monat' : '€79 / month', limits: isDE ? '25.000 Bilder · 15 Benutzer · 5 Websites' : '25,000 images · 15 users · 5 websites' },
    { name: isDE ? 'Agentur' : 'Agency', price: isDE ? 'Auf Anfrage' : 'On request', limits: isDE ? 'Bilder, Benutzer und Websites nach Absprache' : 'Images, users and websites by arrangement' },
  ]

  const webseitePakete = isDE
    ? [
        { name: 'Rundum-sorglos', desc: 'Wir kümmern uns um alles: Hosting, Domain, Kontaktformular und kleine Änderungen.' },
        { name: 'Eigener Hoster', desc: 'Sie haben schon Hosting, z. B. bei IONOS oder Strato? Sie bekommen die fertige Webseite zum Hochladen.' },
      ]
    : [
        { name: 'All-inclusive', desc: 'We take care of everything: hosting, domain, contact form and small changes.' },
        { name: 'Your own host', desc: 'Already have hosting, e.g. with IONOS or Strato? You receive the finished website ready to upload.' },
      ]

  const webseiteSchritte = isDE
    ? [
        { nr: '01', title: 'Checkliste ansehen', desc: 'Welche Unterlagen wir brauchen: Logo, Fotos, Impressumsdaten.' },
        { nr: '02', title: 'Fragebogen ausfüllen', desc: 'Online oder als PDF. Stichpunkte genügen, die Texte formulieren wir.' },
        { nr: '03', title: 'Entwurf erhalten', desc: 'Sie bekommen Ihre fertige Webseite zur Ansicht und geben sie frei.' },
      ]
    : [
        { nr: '01', title: 'Check the checklist', desc: 'What we need from you: logo, photos, legal details.' },
        { nr: '02', title: 'Fill in the questionnaire', desc: 'Online or as a PDF. Bullet points are enough, we write the texts.' },
        { nr: '03', title: 'Receive your draft', desc: 'You get your finished website to review and approve.' },
      ]

  const webseiteDownloads = [
    { href: `${FRAGEBOGEN_URL}fragebogen.pdf`, icon: FileText, label: isDE ? 'Fragebogen (PDF, ausfüllbar)' : 'Questionnaire (PDF, fillable)' },
    { href: `${FRAGEBOGEN_URL}checkliste.pdf`, icon: ClipboardCheck, label: isDE ? 'Checkliste (PDF)' : 'Checklist (PDF)' },
    { href: `${FRAGEBOGEN_URL}pakete.pdf`, icon: Package, label: isDE ? 'Pakete (PDF)' : 'Packages (PDF)' },
  ]

  const faqs = isDE
    ? [
        { q: 'Was kostet der Test?', a: 'Nichts. Nach der Anmeldung arbeiten Sie im Umfang des Starter Tarifs. Ein Wechsel in einen anderen Tarif ist jederzeit im Bereich Tarif möglich.' },
        { q: 'Muss ich etwas installieren?', a: 'Nein. Image Manager Pro läuft im Browser, auf dem Computer genauso wie auf Tablet und Smartphone.' },
        { q: 'Wie kommen die Bilder auf meine Website?', a: 'Ganz ohne Technik: Sie bekommen eine fertige Galerie Seite und setzen nur einen Link darauf. Oder der Assistent erkennt Ihr Website System und zeigt drei einfache Schritte, für WordPress gibt es ein fertiges Plugin zum Hochladen.' },
        { q: 'Was passiert mit meinen Testdaten?', a: 'Ihre Daten bleiben in Ihrem Arbeitsbereich. Wenn Sie den Test beenden möchten, schreiben Sie uns eine E-Mail und wir löschen Ihren Arbeitsbereich vollständig.' },
      ]
    : [
        { q: 'What does the test cost?', a: 'Nothing. After signing up you work within the Starter plan. You can switch plans at any time in the plan section.' },
        { q: 'Do I need to install anything?', a: 'No. Image Manager Pro runs in the browser, on computers as well as tablets and smartphones.' },
        { q: 'How do the images get onto my website?', a: 'No technical skills needed: you get a ready gallery page and simply link to it. Or the assistant detects your website system and shows three simple steps, for WordPress there is a ready plugin to upload.' },
        { q: 'What happens to my test data?', a: 'Your data stays in your workspace. If you want to end the test, send us an email and we will delete your workspace completely.' },
      ]

  return (
    <div className="pt-24 pb-32 overflow-x-hidden">
      {/* HERO */}
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="hero-orb w-64 h-64 bg-purple-500/10 bottom-0 right-1/4" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <FlaskConical className="w-4 h-4" />
            <span>{isDE ? 'Testphase · Jetzt kostenlos ausprobieren' : 'Test phase · Try it for free'}</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight" data-testid="text-imagemanager-headline">
            Image Manager{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">Pro</span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {isDE
              ? 'Alle Bilder Ihres Unternehmens an einem Ort. Hochladen, kategorisieren, im Team verwalten und mit einem Klick auf Ihre Websites bringen.'
              : 'All of your company’s images in one place. Upload, categorize, manage as a team and publish to your websites with one click.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`${APP_URL}/login`} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 text-base" data-testid="link-imagemanager-start">
              {isDE ? 'Kostenlos testen' : 'Start free test'} <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#so-gehts" className="btn-outline flex items-center gap-2 text-base">
              {isDE ? 'So funktioniert der Test' : 'How the test works'}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-24">

        {/* PRODUCT PREVIEW */}
        <section aria-label={isDE ? 'Vorschau der Bildverwaltung' : 'Preview of the image library'} className="glass rounded-3xl border border-white/10 p-3 md:p-4 shadow-2xl shadow-black/40">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0b1226] grid md:grid-cols-[200px_1fr]">
            <div className="hidden md:block bg-[#070d1d] border-r border-white/5 p-4 space-y-2">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500" />
                <div className="h-2.5 w-20 rounded bg-white/30" />
              </div>
              {[isDE ? 'Übersicht' : 'Overview', isDE ? 'Bildverwaltung' : 'Images', 'Websites', isDE ? 'Kategorien' : 'Categories', isDE ? 'Einstellungen' : 'Settings', isDE ? 'Tarif' : 'Plan'].map((label, index) => (
                <div key={label} className={`px-3 py-2 rounded-lg text-xs ${index === 1 ? 'bg-white text-[#0b1226] font-semibold' : 'text-white/60'}`}>{label}</div>
              ))}
            </div>
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                {[['1.248', isDE ? 'Bilder' : 'Images'], ['36', isDE ? 'Kategorien' : 'Categories'], ['3', 'Websites'], ['Professional', isDE ? 'Ihr Tarif' : 'Your plan']].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="font-display font-bold text-white text-lg">{value}</div>
                    <div className="text-white/50 text-[11px]">{label}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {['from-cyan-500/40 to-blue-600/30', 'from-purple-500/40 to-pink-500/30', 'from-amber-400/40 to-orange-500/30', 'from-emerald-400/40 to-cyan-500/30', 'from-blue-500/40 to-indigo-600/30', 'from-pink-500/40 to-purple-600/30'].map((gradient, index) => (
                  <div key={gradient} className={`aspect-square rounded-xl bg-gradient-to-br ${gradient} border border-white/10 flex items-end p-2 ${index > 2 ? 'hidden sm:flex' : 'flex'}`}>
                    <span className="px-1.5 py-0.5 rounded bg-black/50 text-[9px] text-emerald-300">{isDE ? 'übertragen' : 'synced'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <Images className="w-3.5 h-3.5" />
              {isDE ? 'Funktionen' : 'Features'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Was Sie im Test ausprobieren können' : 'What you can try during the test'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE
                ? 'Der Testzugang enthält alle Funktionen. Nur die Mengen richten sich nach dem gewählten Tarif.'
                : 'The test account includes every feature. Only the quantities depend on the plan.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {funktionen.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title} className="glass rounded-2xl border border-white/5 p-6 hover:border-cyan-500/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-all">
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* HOW THE TEST WORKS */}
        <section id="so-gehts" className="scroll-mt-28 glass rounded-3xl border border-white/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              {isDE ? 'In fünf Schritten' : 'In five steps'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'So testen Sie Image Manager Pro' : 'How to test Image Manager Pro'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE
                ? 'In wenigen Minuten haben Sie Ihren eigenen Arbeitsbereich mit Ihrem Logo und Ihren ersten Bildern.'
                : 'Within minutes you have your own workspace with your logo and your first images.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {schritte.map((s) => (
              <div key={s.nr} className="relative glass rounded-2xl border border-white/5 p-5 flex flex-col hover:border-cyan-500/20 transition-all">
                <div className="font-display font-black text-3xl text-cyan-400/40 mb-3">{s.nr}</div>
                <h3 className="font-display font-bold text-white text-sm mb-2">{s.title}</h3>
                <p className="text-white/60 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a href={`${APP_URL}/login`} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-base">
              {isDE ? 'Jetzt Testzugang anlegen' : 'Create test account now'} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* PLANS */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              {isDE ? 'Tarife' : 'Plans'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Wächst mit Ihrem Bildbestand' : 'Grows with your image library'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE
                ? 'Alle Tarife enthalten alle Funktionen und sind monatlich kündbar. Alle Preise inkl. MwSt.'
                : 'Every plan includes every feature and can be cancelled monthly. All prices incl. VAT.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tarife.map((t) => (
              <div key={t.name} className={`glass rounded-2xl border p-6 flex flex-col ${t.highlight ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/10' : 'border-white/10'}`}>
                {t.highlight && <span className="self-start mb-3 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-300">{isDE ? 'BELIEBT' : 'POPULAR'}</span>}
                <h3 className="font-display font-bold text-white text-xl">{t.name}</h3>
                <div className="mt-2 font-display font-extrabold text-2xl text-cyan-300">{t.price}</div>
                <p className="mt-4 text-white/65 text-sm leading-relaxed">{t.limits}</p>
                <ul className="mt-4 space-y-2 text-white/70 text-xs">
                  {(isDE ? ['Alle Funktionen', 'Eigenes Logo und Farbe', 'Monatlich kündbar'] : ['All features', 'Own logo and color', 'Cancel monthly']).map((item) => (
                    <li key={item} className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 glass rounded-2xl border border-purple-500/30 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <InfinityIcon className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-xl">{isDE ? 'Dauerlizenz' : 'Lifetime license'}</h3>
                <p className="mt-1 text-white/70 text-sm">
                  {isDE
                    ? 'Einmal 499 € zahlen und dauerhaft nutzen. 25.000 Bilder, 10 Benutzer, 3 Websites, keine monatliche Gebühr.'
                    : 'Pay €499 once and use it permanently. 25,000 images, 10 users, 3 websites, no monthly fee.'}
                </p>
              </div>
            </div>
            <a href={`${APP_URL}/login`} target="_blank" rel="noopener noreferrer" className="btn-outline flex items-center justify-center gap-2 text-base shrink-0">
              {isDE ? 'Erst testen' : 'Test first'} <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* TEST MODE NOTICE, remove when Stripe switches to live mode */}
        <section className="glass rounded-2xl border border-amber-400/30 p-6 md:p-8 flex items-start gap-4 -mt-12">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
            <FlaskConical className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h3 className="font-display font-bold text-white text-lg">{isDE ? 'Testphase: Es wird kein Geld abgebucht' : 'Test phase: no money is charged'}</h3>
            <p className="mt-1 text-white/70 text-sm leading-relaxed">
              {isDE
                ? 'Sie können jeden Tarif und die Dauerlizenz gefahrlos buchen. Verwenden Sie dafür die Testkarte 4242 4242 4242 4242 mit einem beliebigen Ablaufdatum in der Zukunft und einer beliebigen Prüfziffer.'
                : 'You can book any plan and the lifetime license without risk. Use the test card 4242 4242 4242 4242 with any future expiry date and any security code.'}
            </p>
          </div>
        </section>

        {/* WEBSITE ON DEMAND (questionnaire from the webseiten-baukasten project) */}
        <section id="webseite" className="scroll-mt-28 glass rounded-3xl border border-purple-500/20 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3 uppercase tracking-wider">
              <LayoutTemplate className="w-3.5 h-3.5" />
              {isDE ? 'Neu: Ihre Webseite' : 'New: your website'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Die passende Webseite gleich dazu' : 'The matching website as well'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE
                ? 'Eine komplette Geschäftswebseite auf Basis eines Fragebogens: Startseite, Leistungen, Über uns, Galerie, Preise, FAQ, Kontakt, Impressum und Datenschutz. Für Handy und PC, ohne Cookies und mit datenschutzfreundlicher Besucherstatistik. Ihre Image-Manager-Galerie lässt sich direkt einbinden.'
                : 'A complete business website based on a questionnaire: home, services, about us, gallery, prices, FAQ, contact, imprint and privacy policy. For mobile and desktop, without cookies and with privacy-friendly visitor statistics. Your Image Manager gallery can be embedded directly.'}
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {webseiteSchritte.map((s) => (
              <div key={s.nr} className="glass rounded-2xl border border-white/5 p-5 hover:border-purple-500/20 transition-all">
                <div className="font-display font-black text-3xl text-purple-400/40 mb-3">{s.nr}</div>
                <h3 className="font-display font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {webseitePakete.map((p) => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-white">{p.name}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <a href={`${FRAGEBOGEN_URL}index.html`} className="btn-primary inline-flex items-center gap-2 text-base" data-testid="link-fragebogen-online">
              {isDE ? 'Fragebogen online ausfüllen' : 'Fill in the questionnaire online (German)'} <ArrowRight className="w-4 h-4" />
            </a>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {webseiteDownloads.map((d) => {
                const Icon = d.icon
                return (
                  <a key={d.href} href={d.href} download className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-cyan-300 transition-colors">
                    <Icon className="w-4 h-4 text-cyan-400" />
                    {d.label}
                    <Download className="w-3.5 h-3.5 opacity-60" />
                  </a>
                )
              })}
            </div>
            <Link href="/aktionspreis-fuer-webseiten" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              {isDE ? 'Pakete und Preise ansehen' : 'View packages and prices'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-8 text-center">
            {isDE ? 'Häufige Fragen' : 'Frequently asked questions'}
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-2xl border border-white/10 p-5 group">
                <summary className="cursor-pointer font-display font-bold text-white list-none flex items-center justify-between gap-4">
                  {f.q}
                  <span className="text-cyan-400 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-white/70 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="glass rounded-3xl border border-cyan-500/20 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Fragen zum Test oder zum Agentur Tarif?' : 'Questions about the test or the agency plan?'}
            </h2>
            <p className="text-white/75 text-base leading-relaxed mb-8">
              {isDE
                ? 'Schreiben Sie uns, wir helfen beim Einrichten und beim Verbinden Ihrer Website.'
                : 'Write to us, we help with the setup and with connecting your website.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Image Manager Pro')}`} className="btn-primary flex items-center gap-2 text-base">
                <Mail className="w-4 h-4" /> {CONTACT_EMAIL}
              </a>
              <Link href="/kontakt">
                <button className="btn-outline flex items-center gap-2 text-base">
                  {isDE ? 'Kontaktformular' : 'Contact form'} <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
