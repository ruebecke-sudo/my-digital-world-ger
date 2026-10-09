import { useEffect } from 'react'
import { Link } from 'wouter'
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  ClipboardList,
  Images,
  Mail,
  MessageCircle,
  Minus,
  Rocket,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// Questionnaire and PDFs live statically in public/fragebogen/ (built in the webseiten-baukasten project).
const FRAGEBOGEN_URL = '/fragebogen/'
const CONTACT_EMAIL = 'info@my-digital-world.de'

type Paket = {
  name: string
  fuer: string
  einmalig: string
  monatlich: string
  highlight?: boolean
}

export default function Webseiten() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  useEffect(() => {
    const previous = document.title
    document.title = isDE ? 'Webseiten-Pakete, My Digital World' : 'Website packages, My Digital World'
    return () => { document.title = previous }
  }, [isDE])

  const argumente = isDE
    ? [
        { icon: BarChart3, title: 'Sie sehen, was die Webseite bringt', text: 'Jeden Monat eine E-Mail mit Besuchern, Anrufen, WhatsApp-Nachrichten und Anfragen über die Webseite. Schwarz auf weiß.' },
        { icon: Images, title: 'Neue Bilder in 2 Minuten online', text: 'Ordner hochladen, fertig. Mit Image Manager Pro pflegen Sie Produkte und Referenzen selbst, ohne Webdesigner.' },
        { icon: ShieldCheck, title: 'Ohne Cookie-Banner', text: 'Die Statistik arbeitet ohne Cookies, Schriften liegen auf dem eigenen Server. Kein Banner, das Besucher vertreibt.' },
      ]
    : [
        { icon: BarChart3, title: 'See what your website delivers', text: 'Every month an email with visitors, calls, WhatsApp messages and enquiries from your website. In black and white.' },
        { icon: Images, title: 'New images online in 2 minutes', text: 'Upload a folder, done. With Image Manager Pro you maintain products and references yourself, without a web designer.' },
        { icon: ShieldCheck, title: 'No cookie banner', text: 'The statistics work without cookies and fonts are self-hosted. No banner that drives visitors away.' },
      ]

  const pakete: Paket[] = isDE
    ? [
        { name: 'Start', fuer: 'Für Selbständige und kleine Betriebe', einmalig: '600 €', monatlich: '39 €' },
        { name: 'Händler', fuer: 'Für Fachhändler mit vielen Produkten', einmalig: '1.250 €', monatlich: '79 €', highlight: true },
        { name: 'Premium', fuer: 'Für große Sortimente und mehrere Bereiche', einmalig: '2.250 €', monatlich: '149 €' },
      ]
    : [
        { name: 'Start', fuer: 'For freelancers and small businesses', einmalig: '€600', monatlich: '€39' },
        { name: 'Retail', fuer: 'For specialist retailers with many products', einmalig: '€1,250', monatlich: '€79', highlight: true },
        { name: 'Premium', fuer: 'For large ranges and several departments', einmalig: '€2,250', monatlich: '€149' },
      ]

  // One row per feature: value for Start, Retail, Premium (true = included, false = not included).
  const leistungen: Array<[string, boolean | string, boolean | string, boolean | string]> = isDE
    ? [
        ['Moderne Webseite, Handy und PC', 'Startseite + 6 Unterseiten', 'Startseite + 6 Unterseiten', 'mehr Seiten + Blog'],
        ['Impressum, Datenschutz, SEO-Grundlagen', true, true, true],
        ['Kontakt-Popup, Terminanfrage, WhatsApp', true, true, true],
        ['Hosting, Updates, kleine Änderungen', true, true, true],
        ['Besucherstatistik ohne Cookies', true, true, true],
        ['Warnung bei Ausfall der Webseite', true, true, true],
        ['Monatsbericht per E-Mail', false, true, true],
        ['Image Manager Pro: Bilder selbst pflegen', false, 'Starter', 'Professional'],
        ['Galerien nach Marke und Raum', false, true, true],
        ['Erstbefüllung der Bilder durch uns', false, 'bis 150 Bilder', 'bis 500 Bilder'],
        ['Quartalsgespräch: Was sagen die Zahlen?', false, false, true],
      ]
    : [
        ['Modern website, mobile and desktop', 'home + 6 subpages', 'home + 6 subpages', 'more pages + blog'],
        ['Imprint, privacy policy, SEO basics', true, true, true],
        ['Contact popup, appointment request, WhatsApp', true, true, true],
        ['Hosting, updates, small changes', true, true, true],
        ['Visitor statistics without cookies', true, true, true],
        ['Alert if the website goes down', true, true, true],
        ['Monthly report by email', false, true, true],
        ['Image Manager Pro: maintain images yourself', false, 'Starter', 'Professional'],
        ['Galleries by brand and room', false, true, true],
        ['Initial image upload done by us', false, 'up to 150 images', 'up to 500 images'],
        ['Quarterly call: what do the numbers say?', false, false, true],
      ]

  const schritte = isDE
    ? [
        { nr: '01', title: 'Fragebogen ausfüllen', text: 'Online oder als PDF. Stichpunkte genügen, die Texte formulieren wir.' },
        { nr: '02', title: 'Entwurf ansehen', text: 'Sie bekommen Ihre fertige Webseite zur Ansicht. Eine Korrekturrunde ist inklusive.' },
        { nr: '03', title: 'Online gehen', text: 'Wir veröffentlichen die Seite, verbinden Ihre Domain und richten die Statistik ein.' },
        { nr: '04', title: 'Ergebnisse sehen', text: 'Ab dem nächsten Monat kommt Ihr Bericht per E-Mail. Änderungen schicken Sie uns einfach.' },
      ]
    : [
        { nr: '01', title: 'Fill in the questionnaire', text: 'Online or as a PDF. Bullet points are enough, we write the texts.' },
        { nr: '02', title: 'Review the draft', text: 'You get your finished website to review. One round of corrections is included.' },
        { nr: '03', title: 'Go live', text: 'We publish the site, connect your domain and set up the statistics.' },
        { nr: '04', title: 'See results', text: 'From the next month your report arrives by email. Just send us any changes.' },
      ]

  const faqs = isDE
    ? [
        { q: 'Ich habe schon eine Webseite. Lohnt sich das?', a: 'Wissen Sie, wie viele Anfragen sie im Monat bringt? Wir messen es. Image Manager Pro gibt es auch einzeln für bestehende Webseiten, etwa mit WordPress.' },
        { q: 'Warum ist die Einrichtung so günstig?', a: 'Wir arbeiten mit einem erprobten Baukasten und betreuen Ihre Seite danach dauerhaft. Sie zahlen wenig zum Start und eine faire Monatsgebühr für Hosting, Pflege und Statistik.' },
        { q: 'Brauche ich einen Cookie-Banner?', a: 'Für unsere Webseiten nicht. Die Statistik arbeitet ohne Cookies, der Hinweis für die Datenschutzerklärung ist schon dabei.' },
        { q: 'Was kostet die Domain?', a: 'Die Domain trägt der Kunde selbst, meist wenige Euro im Jahr. Die Registrierung oder den Umzug übernehmen wir.' },
        { q: 'Was, wenn ich keine Zeit für Bilder habe?', a: 'Im Paket Händler und Premium übernehmen wir die Erstbefüllung. Danach reicht es, einen Ordner hochzuladen.' },
      ]
    : [
        { q: 'I already have a website. Is it worth it?', a: 'Do you know how many enquiries it brings each month? We measure it. Image Manager Pro is also available on its own for existing websites, e.g. WordPress.' },
        { q: 'Why is the setup so affordable?', a: 'We work with a proven toolkit and look after your site permanently afterwards. You pay little to start and a fair monthly fee for hosting, care and statistics.' },
        { q: 'Do I need a cookie banner?', a: 'Not for our websites. The statistics work without cookies and the privacy policy text is included.' },
        { q: 'What does the domain cost?', a: 'The customer pays for the domain, usually a few euros a year. We handle registration or transfer.' },
        { q: "What if I don't have time for images?", a: 'In the Retail and Premium packages we do the initial upload. After that, uploading a folder is all it takes.' },
      ]

  const zelle = (wert: boolean | string) =>
    wert === true ? (
      <CheckCircle className="w-5 h-5 text-cyan-400 mx-auto" aria-label={isDE ? 'enthalten' : 'included'} />
    ) : wert === false ? (
      <Minus className="w-4 h-4 text-white/25 mx-auto" aria-label={isDE ? 'nicht enthalten' : 'not included'} />
    ) : (
      <span className="text-white/85 text-sm">{wert}</span>
    )

  return (
    <div className="pt-24 pb-32">
      {/* HERO */}
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {isDE ? 'Webseiten-Pakete' : 'Website packages'}
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-tight">
            {isDE
              ? <>Eine Webseite, die <span className="gradient-text">nachweisbar Anfragen</span> bringt</>
              : <>A website that <span className="gradient-text">demonstrably brings enquiries</span></>}
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            {isDE
              ? 'Moderne Webseite, Bilder selbst pflegen und jeden Monat sehen, wie viele Kunden anrufen, schreiben oder anfragen. Günstig starten, wir kümmern uns um den Rest.'
              : 'A modern website, images you maintain yourself and every month you see how many customers call, write or enquire. Start affordably, we take care of the rest.'}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="#pakete" className="btn-primary inline-flex items-center gap-2 text-base">
              {isDE ? 'Pakete ansehen' : 'View packages'} <ArrowRight className="w-4 h-4" />
            </a>
            <a href={`${FRAGEBOGEN_URL}index.html`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-base text-white/85 hover:border-cyan-400/50 hover:text-white transition-colors">
              <ClipboardList className="w-4 h-4" /> {isDE ? 'Fragebogen ausfüllen' : 'Fill in the questionnaire'}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-16">
        {/* ARGUMENTS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {argumente.map(({ icon: Icon, title, text }) => (
            <div key={title} className="glass rounded-2xl border border-white/5 p-6 hover:border-cyan-500/20 transition-all">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="font-display font-bold text-white text-lg mb-2">{title}</h2>
              <p className="text-white/65 text-base leading-relaxed">{text}</p>
            </div>
          ))}
        </section>

        {/* PACKAGES */}
        <section id="pakete" className="scroll-mt-28">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-3">
              {isDE ? 'Drei Pakete, ein Ziel: mehr Anfragen' : 'Three packages, one goal: more enquiries'}
            </h2>
            <p className="text-white/65">
              {isDE ? 'Alle Preise netto, zzgl. MwSt.' : 'All prices net, excl. VAT.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {pakete.map((p, i) => (
              <div
                key={p.name}
                className={`relative glass rounded-3xl p-7 flex flex-col ${p.highlight ? 'border border-cyan-400/40 shadow-[0_0_60px_rgba(34,211,238,0.12)] md:-translate-y-2' : 'border border-white/10'}`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-3 py-1 text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {isDE ? 'Empfohlen' : 'Recommended'}
                  </div>
                )}
                <h3 className="font-display font-extrabold text-2xl text-white">{p.name}</h3>
                <p className="text-white/60 text-sm mt-1 mb-6">{p.fuer}</p>
                <div className="mb-1">
                  <span className="font-display font-black text-4xl text-cyan-400">{p.monatlich}</span>
                  <span className="text-white/60"> {isDE ? '/ Monat' : '/ month'}</span>
                </div>
                <p className="text-white/70 text-sm mb-6">
                  {isDE ? `einmalig ${p.einmalig} Einrichtung` : `one-off ${p.einmalig} setup`}
                </p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {leistungen.filter((row) => row[i + 1] !== false).map((row) => (
                    <li key={row[0]} className="flex items-start gap-2.5 text-sm text-white/75">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{row[0]}{typeof row[i + 1] === 'string' ? <span className="text-white/50"> · {row[i + 1]}</span> : null}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`${FRAGEBOGEN_URL}index.html`}
                  className={p.highlight ? 'btn-primary inline-flex items-center justify-center gap-2 text-base' : 'inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-base text-white/85 hover:border-cyan-400/50 hover:text-white transition-colors'}
                >
                  {isDE ? `${p.name} anfragen` : `Request ${p.name}`} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* COMPARISON TABLE */}
          <div className="glass rounded-3xl border border-white/5 mt-10 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <caption className="sr-only">{isDE ? 'Leistungen im Vergleich' : 'Features compared'}</caption>
              <thead>
                <tr className="border-b border-white/10">
                  <th className="p-4 text-white/60 text-sm font-semibold">{isDE ? 'Leistung' : 'Feature'}</th>
                  {pakete.map((p) => (
                    <th key={p.name} className={`p-4 text-center font-display font-bold ${p.highlight ? 'text-cyan-400' : 'text-white'}`}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leistungen.map((row) => (
                  <tr key={row[0]} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-white/75 text-sm">{row[0]}</td>
                    <td className="p-4 text-center">{zelle(row[1])}</td>
                    <td className="p-4 text-center bg-cyan-400/[0.03]">{zelle(row[2])}</td>
                    <td className="p-4 text-center">{zelle(row[3])}</td>
                  </tr>
                ))}
                <tr className="border-t border-white/10">
                  <td className="p-4 text-white font-semibold text-sm">{isDE ? 'Einrichtung einmalig' : 'One-off setup'}</td>
                  {pakete.map((p) => <td key={p.name} className="p-4 text-center text-white font-semibold">{p.einmalig}</td>)}
                </tr>
                <tr>
                  <td className="p-4 text-white font-semibold text-sm">{isDE ? 'Monatlich' : 'Monthly'}</td>
                  {pakete.map((p) => <td key={p.name} className="p-4 text-center text-cyan-400 font-bold">{p.monatlich}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white/50 text-sm text-center mt-4">
            {isDE
              ? 'Domainkosten trägt der Kunde. Weitere Unterseiten, Sprachen oder Zusatzwünsche nach Absprache.'
              : 'Domain costs are borne by the customer. Additional pages, languages or extras by arrangement.'}
          </p>
        </section>

        {/* EXAMPLE */}
        <section className="glass rounded-3xl border border-purple-500/20 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative grid md:grid-cols-[1.2fr_1fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-4 uppercase tracking-wider">
                <Rocket className="w-3.5 h-3.5" /> {isDE ? 'Aus der Praxis' : 'In practice'}
              </div>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-4">
                {isDE ? 'Einrichtungshaus mit über 300 Produktbildern' : 'Furniture store with over 300 product images'}
              </h2>
              <p className="text-white/70 leading-relaxed">
                {isDE
                  ? 'Ein Einrichtungshaus pflegt seine Marken- und Produktbilder selbst mit Image Manager Pro. Neue Kollektionen kommen per Ordner-Upload online und erscheinen automatisch auf der Markenseite und in den Raum-Galerien der Startseite. Anfragen laufen über ein Kontakt-Popup, und jeden Monat zeigt der Bericht, wie viele davon über die Webseite kamen.'
                  : 'A furniture store maintains its brand and product images itself with Image Manager Pro. New collections go online via folder upload and appear automatically on the brands page and in the room galleries on the home page. Enquiries come in via a contact popup, and every month the report shows how many came through the website.'}
              </p>
            </div>
            <ul className="space-y-3">
              {(isDE
                ? ['300+ Bilder, nach Marke und Raum sortiert', 'Neue Marke in wenigen Minuten online', 'Kontakt-Popup und Terminbuchung', 'Statistik ohne Cookie-Banner']
                : ['300+ images, sorted by brand and room', 'New brand online in minutes', 'Contact popup and appointment booking', 'Statistics without a cookie banner']
              ).map((punkt) => (
                <li key={punkt} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" /> {punkt}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* STEPS */}
        <section>
          <h2 className="font-display font-extrabold text-3xl text-white text-center mb-8">
            {isDE ? 'So einfach geht es' : "It's that simple"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schritte.map((s) => (
              <div key={s.nr} className="glass rounded-2xl border border-white/5 p-5 hover:border-cyan-500/20 transition-all">
                <div className="font-display font-black text-3xl text-cyan-400/40 mb-3">{s.nr}</div>
                <h3 className="font-display font-bold text-white text-base mb-2">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl text-white text-center mb-8">
            {isDE ? 'Häufige Fragen' : 'Frequently asked questions'}
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="glass rounded-2xl border border-white/5 p-5 group">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display font-semibold text-white">
                  {f.q}
                  <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-white/70 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="glass rounded-3xl border border-cyan-500/20 p-8 md:p-12 text-center">
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3">
            {isDE ? 'Bereit für Ihre neue Webseite?' : 'Ready for your new website?'}
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            {isDE
              ? 'Füllen Sie den Fragebogen aus, und Sie erhalten Ihr persönliches Angebot. Oder schreiben Sie uns einfach.'
              : 'Fill in the questionnaire and receive your personal offer. Or simply write to us.'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`${FRAGEBOGEN_URL}index.html`} className="btn-primary inline-flex items-center gap-2 text-base">
              <ClipboardList className="w-5 h-5" /> {isDE ? 'Fragebogen ausfüllen' : 'Fill in the questionnaire'}
            </a>
            <Link href="/kontakt" className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-base text-white/85 hover:border-cyan-400/50 hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5" /> {isDE ? 'Kontakt aufnehmen' : 'Get in touch'}
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-base text-white/85 hover:border-cyan-400/50 hover:text-white transition-colors">
              <Mail className="w-5 h-5" /> {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
