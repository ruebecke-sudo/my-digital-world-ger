import { useEffect, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'wouter'
import { ArrowRight, BadgePercent, CheckCircle, Handshake, Megaphone, Repeat, Send, Wallet, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const CONTACT_EMAIL = 'info@my-digital-world.de'

// Same frosted glass as the package page.
const GLAS = 'border border-white/15 bg-white/[0.06] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.14)]'
const FELD = 'w-full rounded-xl border border-white/15 bg-white/[0.07] px-4 py-3 text-white placeholder:text-white/35 backdrop-blur-xl outline-none transition focus:border-cyan-300/60 focus:bg-white/[0.1] focus:ring-4 focus:ring-cyan-400/15'
const LABEL = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/60'

/** Commission rates. Change here and the whole page (incl. example) follows. */
const PROVISION_MONATLICH = 30
const MONATE = 24
const PROVISION_EINRICHTUNG = 15
const PROVISION_DAUERLIZENZ = 30

const euro = (n: number) => n.toLocaleString('de-DE', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €'

export default function Partnerprogramm() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  // Sign-up form as a glass popup; a link to /partnerprogramm#anmelden opens it directly.
  const [formOffen, setFormOffen] = useState(() => typeof window !== 'undefined' && window.location.hash === '#anmelden')

  useEffect(() => {
    const onHash = () => { if (window.location.hash === '#anmelden') setFormOffen(true) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!formOffen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setFormOffen(false) }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [formOffen])

  useEffect(() => {
    const previous = document.title
    document.title = isDE ? 'Partnerprogramm, My Digital World' : 'Partner programme, My Digital World'
    return () => { document.title = previous }
  }, [isDE])

  // Example: retailer package, 1,250 € setup + 79 € per month.
  const bspEinrichtung = 1250 * PROVISION_EINRICHTUNG / 100
  const bspMonat = 79 * PROVISION_MONATLICH / 100
  const bspGesamt = bspEinrichtung + bspMonat * MONATE

  const konditionen = isDE
    ? [
        { icon: Repeat, wert: `${PROVISION_MONATLICH} %`, titel: 'auf alle Monatsgebühren', text: `${MONATE} Monate lang für jeden Kunden, den Sie vermitteln: Webseiten-Pakete und Image-Manager-Abos.` },
        { icon: BadgePercent, wert: `${PROVISION_EINRICHTUNG} %`, titel: 'auf die Einrichtung', text: 'Einmalig auf den Einrichtungspreis jeder vermittelten Webseite.' },
        { icon: Wallet, wert: `${PROVISION_DAUERLIZENZ} %`, titel: 'auf die Dauerlizenz', text: 'Einmalig auf die Image-Manager-Dauerlizenz, also 149,70 € pro Verkauf.' },
      ]
    : [
        { icon: Repeat, wert: `${PROVISION_MONATLICH} %`, titel: 'of all monthly fees', text: `For ${MONATE} months for every customer you refer: website packages and Image Manager subscriptions.` },
        { icon: BadgePercent, wert: `${PROVISION_EINRICHTUNG} %`, titel: 'of the setup fee', text: 'One-off on the setup price of every website you refer.' },
        { icon: Wallet, wert: `${PROVISION_DAUERLIZENZ} %`, titel: 'of the lifetime licence', text: 'One-off on the Image Manager lifetime licence, i.e. €149.70 per sale.' },
      ]

  const schritte = isDE
    ? [
        { icon: Send, titel: 'Anmelden', text: 'Formular unten ausfüllen. Wir melden uns innerhalb von zwei Werktagen.' },
        { icon: Handshake, titel: 'Partnercode erhalten', text: 'Sie bekommen Ihren persönlichen Code, z. B. MUELLER, und die Partnerbedingungen.' },
        { icon: Megaphone, titel: 'Empfehlen', text: 'Ihre Kontakte geben den Code im Fragebogen oder bei der Anmeldung zum Image Manager an.' },
        { icon: Wallet, titel: 'Provision erhalten', text: 'Monatliche Abrechnung per Gutschrift, Auszahlung per Überweisung.' },
      ]
    : [
        { icon: Send, titel: 'Sign up', text: 'Fill in the form below. We will get back to you within two working days.' },
        { icon: Handshake, titel: 'Get your partner code', text: 'You receive your personal code, e.g. MUELLER, and the partner terms.' },
        { icon: Megaphone, titel: 'Recommend', text: 'Your contacts enter the code in the questionnaire or when signing up for Image Manager.' },
        { icon: Wallet, titel: 'Get paid', text: 'Monthly statement as a credit note, payout by bank transfer.' },
      ]

  const zielgruppen = isDE
    ? ['Steuerberater und Unternehmensberater', 'Werbe- und Fotoagenturen', 'Händler- und Handwerksverbände', 'IT-Dienstleister und Netzwerker', 'Zufriedene Kunden']
    : ['Tax and business consultants', 'Advertising and photo agencies', 'Retail and trade associations', 'IT service providers and networkers', 'Happy customers']

  const faqs = isDE
    ? [
        { q: 'Wann gilt ein Kunde als von mir vermittelt?', a: 'Wenn er Ihren Partnercode im Fragebogen oder bei der Anmeldung zum Image Manager angibt. Ohne Code können wir leider nicht zuordnen.' },
        { q: 'Wie oft wird ausgezahlt?', a: 'Einmal im Monat für alle im Vormonat eingegangenen Zahlungen Ihrer Kunden. Sie erhalten eine Gutschrift mit allen Einzelposten.' },
        { q: 'Was passiert, wenn ein Kunde kündigt?', a: 'Für die Monate, die der Kunde bezahlt hat, behalten Sie Ihre Provision. Danach endet sie für diesen Kunden.' },
        { q: 'Kostet die Teilnahme etwas?', a: 'Nein. Die Teilnahme ist kostenlos und unverbindlich.' },
        { q: 'Muss ich Unternehmer sein?', a: 'Provisionen sind steuerpflichtig. Ob Sie ein Gewerbe brauchen, klären Sie bitte mit Ihrem Steuerberater.' },
      ]
    : [
        { q: 'When is a customer counted as referred by me?', a: 'When they enter your partner code in the questionnaire or when signing up for Image Manager. Without the code we cannot attribute them.' },
        { q: 'How often are payouts made?', a: "Once a month for all payments your customers made in the previous month. You receive a credit note listing every item." },
        { q: 'What happens if a customer cancels?', a: 'You keep your commission for the months the customer paid. After that it ends for this customer.' },
        { q: 'Does it cost anything to join?', a: 'No. Joining is free and non-binding.' },
        { q: 'Do I need to be a business?', a: 'Commissions are taxable. Please check with your tax advisor whether you need to register a business.' },
      ]

  async function absenden(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const body = new URLSearchParams()
    for (const [key, value] of new FormData(form).entries()) if (typeof value === 'string') body.append(key, value)
    setStatus('sending')
    try {
      const res = await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      setStatus(res.ok ? 'ok' : 'error')
      if (res.ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative isolate pt-24 pb-32 overflow-x-hidden overflow-y-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[8%] -left-24 h-[30rem] w-[30rem] rounded-full bg-cyan-500/35 blur-[110px]" />
        <div className="absolute top-[22%] right-[-6rem] h-[32rem] w-[32rem] rounded-full bg-purple-600/40 blur-[120px]" />
        <div className="absolute top-[48%] left-[25%] h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/25 blur-[120px]" />
        <div className="absolute top-[72%] -left-20 h-[28rem] w-[28rem] rounded-full bg-cyan-400/30 blur-[120px]" />
        <div className="absolute top-[88%] right-[10%] h-[26rem] w-[26rem] rounded-full bg-purple-500/30 blur-[120px]" />
      </div>

      {/* HERO */}
      <div className="relative section-overlay py-20 text-center">
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Handshake className="w-4 h-4" /> {isDE ? 'Partnerprogramm' : 'Partner programme'}
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-tight">
            {isDE
              ? <>Empfehlen Sie uns und verdienen Sie <span className="gradient-text">{PROVISION_MONATLICH} % mit</span></>
              : <>Recommend us and earn <span className="gradient-text">{PROVISION_MONATLICH} %</span></>}
          </h1>
          <p className="text-white/75 text-lg leading-relaxed">
            {isDE
              ? `Für jeden Kunden, den Sie vermitteln, erhalten Sie ${MONATE} Monate lang ${PROVISION_MONATLICH} % seiner Monatsgebühren und ${PROVISION_EINRICHTUNG} % der Einrichtung. Kostenlos und unverbindlich.`
              : `For every customer you refer you receive ${PROVISION_MONATLICH} % of their monthly fees for ${MONATE} months and ${PROVISION_EINRICHTUNG} % of the setup fee. Free and non-binding.`}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => setFormOffen(true)} className="btn-primary inline-flex items-center gap-2 text-base">
              {isDE ? 'Jetzt Partner werden' : 'Become a partner'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 space-y-16">
        {/* TERMS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {konditionen.map(({ icon: Icon, wert, titel, text }) => (
            <div key={titel} className={`${GLAS} rounded-3xl p-7`}>
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="font-display font-black text-5xl text-cyan-400">{wert}</div>
              <h2 className="font-display font-bold text-white text-lg mt-1 mb-2">{titel}</h2>
              <p className="text-white/65 leading-relaxed">{text}</p>
            </div>
          ))}
        </section>

        {/* EXAMPLE */}
        <section className={`${GLAS} rounded-3xl p-8 md:p-12`}>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-2">
            {isDE ? 'Rechenbeispiel' : 'Example'}
          </h2>
          <p className="text-white/65 mb-8">
            {isDE
              ? 'Sie vermitteln einen Händler mit dem Paket „Händler“: 1.250 € Einrichtung und 79 € im Monat.'
              : 'You refer a retailer with the “Retail” package: €1,250 setup and €79 per month.'}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [isDE ? 'Sofort' : 'Immediately', euro(bspEinrichtung), isDE ? `${PROVISION_EINRICHTUNG} % der Einrichtung` : `${PROVISION_EINRICHTUNG} % of setup`],
              [isDE ? 'Jeden Monat' : 'Every month', euro(bspMonat), isDE ? `${MONATE} Monate lang` : `for ${MONATE} months`],
              [isDE ? 'Insgesamt' : 'In total', euro(bspGesamt), isDE ? 'für einen einzigen Kunden' : 'for a single customer'],
            ].map(([label, betrag, hinweis], i) => (
              <div key={label} className={`rounded-2xl border p-5 ${i === 2 ? 'border-cyan-300/40 bg-cyan-400/[0.08]' : 'border-white/15 bg-white/[0.05]'}`}>
                <div className="text-white/60 text-sm">{label}</div>
                <div className={`font-display font-black text-3xl mt-1 ${i === 2 ? 'text-cyan-300' : 'text-white'}`}>{betrag}</div>
                <div className="text-white/50 text-sm mt-1">{hinweis}</div>
              </div>
            ))}
          </div>
          <p className="text-white/45 text-sm mt-5">
            {isDE ? 'Fünf vermittelte Händler ergeben so über 3.700 € Provision.' : 'Five referred retailers add up to over €3,700 in commission.'}
          </p>
        </section>

        {/* STEPS */}
        <section>
          <h2 className="font-display font-extrabold text-3xl text-white text-center mb-8">
            {isDE ? 'So funktioniert es' : 'How it works'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schritte.map(({ icon: Icon, titel, text }, i) => (
              <div key={titel} className={`${GLAS} rounded-2xl p-5`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display font-black text-2xl text-cyan-400/40">0{i + 1}</span>
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-display font-bold text-white mb-1.5">{titel}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO */}
        <section className={`${GLAS} rounded-3xl p-8 md:p-10 grid gap-8 md:grid-cols-[1fr_1.2fr] items-center`}>
          <div>
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mb-3">
              {isDE ? 'Für wen ist das Programm?' : 'Who is it for?'}
            </h2>
            <p className="text-white/65 leading-relaxed">
              {isDE
                ? 'Für alle, die mit Selbständigen, Händlern und Handwerksbetrieben zu tun haben und eine moderne Webseite oder eine einfache Bildverwaltung empfehlen können.'
                : 'For everyone who works with self-employed people, retailers and trades and can recommend a modern website or simple image management.'}
            </p>
            <p className="mt-4 text-sm">
              <Link href="/aktionspreis-fuer-webseiten" className="text-cyan-300 hover:text-cyan-200 font-semibold">
                {isDE ? 'Das empfehlen Sie: Webseiten-Pakete ansehen →' : 'What you recommend: view website packages →'}
              </Link>
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {zielgruppen.map((z) => (
              <li key={z} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 text-white/85 backdrop-blur-xl">
                <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0" /> {z}
              </li>
            ))}
          </ul>
        </section>

        {/* SIGN-UP call to action (form opens as popup) */}
        <section id="anmelden" className={`scroll-mt-28 ${GLAS} rounded-3xl p-8 md:p-12 text-center relative overflow-hidden`}>
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
          <h2 className="relative font-display font-extrabold text-2xl md:text-4xl text-white mb-3">
            {isDE ? 'Bereit, mitzuverdienen?' : 'Ready to earn with us?'}
          </h2>
          <p className="relative text-white/70 max-w-xl mx-auto mb-8">
            {isDE ? 'Die Anmeldung dauert zwei Minuten, ist kostenlos und unverbindlich.' : 'Signing up takes two minutes, is free and non-binding.'}
          </p>
          <button type="button" onClick={() => setFormOffen(true)} className="relative btn-primary inline-flex items-center gap-2 text-base">
            {isDE ? 'Jetzt Partner werden' : 'Become a partner'} <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-3xl text-white text-center mb-8">
            {isDE ? 'Häufige Fragen' : 'Frequently asked questions'}
          </h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className={`${GLAS} rounded-2xl p-5 group`}>
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display font-semibold text-white">
                  {f.q}
                  <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-white/70 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      {formOffen
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex items-end justify-center bg-[#040810]/55 backdrop-blur-xl sm:items-center sm:p-6"
              role="presentation"
              onClick={() => setFormOffen(false)}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-[10%] left-[8%] h-80 w-80 rounded-full bg-cyan-500/30 blur-[100px]" />
                <div className="absolute right-[6%] bottom-[8%] h-96 w-96 rounded-full bg-purple-600/35 blur-[110px]" />
              </div>
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="partner-popup-titel"
                onClick={(e) => e.stopPropagation()}
                className="glass-frost relative grid w-full max-w-5xl max-h-[100dvh] overflow-y-auto rounded-t-[28px] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[28px] md:grid-cols-[0.8fr_1.2fr]"
              >
                <button
                  type="button"
                  onClick={() => setFormOffen(false)}
                  className="absolute top-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
                  aria-label={isDE ? 'Anmeldung schließen' : 'Close sign-up'}
                >
                  <X className="h-5 w-5" />
                </button>

                <aside className="relative bg-gradient-to-br from-cyan-500/25 via-cyan-500/10 to-purple-600/30 p-6 md:p-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                    <Handshake className="h-3.5 w-3.5" /> {isDE ? 'Partnerprogramm' : 'Partner programme'}
                  </div>
                  <h2 id="partner-popup-titel" className="mt-4 font-display text-2xl font-extrabold leading-tight text-white md:text-3xl">
                    {isDE ? 'Jetzt Partner werden' : 'Become a partner'}
                  </h2>
                  <p className="mt-2 text-sm text-white/70">
                    {isDE ? 'Kostenlos und unverbindlich. Wir melden uns innerhalb von zwei Werktagen mit Ihrem Partnercode.' : 'Free and non-binding. We will get back to you within two working days with your partner code.'}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {konditionen.map(({ wert, titel }) => (
                      <li key={titel} className="flex items-baseline gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 backdrop-blur-xl">
                        <span className="font-display text-2xl font-black text-cyan-300">{wert}</span>
                        <span className="text-sm text-white/80">{titel}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-white/60">
                    {isDE ? `Beispiel: Ein vermittelter Händler bringt Ihnen ${euro(bspGesamt)}.` : `Example: one referred retailer earns you ${euro(bspGesamt)}.`}
                  </p>
                </aside>

                <div className="p-6 md:p-8">
                {status === 'ok' ? (
                  <div role="status" className="py-10 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl text-cyan-300">✓</div>
                    <h3 className="font-display font-bold text-2xl text-white mt-4">{isDE ? 'Vielen Dank!' : 'Thank you!'}</h3>
                    <p className="text-white/65 mt-2">{isDE ? 'Ihre Anmeldung ist angekommen. Wir melden uns in Kürze.' : 'Your application has arrived. We will be in touch shortly.'}</p>
                  </div>
                ) : (
                  <form name="partner-anmeldung" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={absenden} className="space-y-4">
                    <input type="hidden" name="form-name" value="partner-anmeldung" />
                    <p className="hidden"><label>Nicht ausfüllen: <input name="bot-field" tabIndex={-1} /></label></p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block"><span className={LABEL}>{isDE ? 'Name *' : 'Name *'}</span><input required name="name" autoComplete="name" className={FELD} /></label>
                      <label className="block"><span className={LABEL}>{isDE ? 'Firma' : 'Company'}</span><input name="firma" autoComplete="organization" className={FELD} /></label>
                      <label className="block"><span className={LABEL}>E-Mail *</span><input required type="email" name="email" autoComplete="email" className={FELD} /></label>
                      <label className="block"><span className={LABEL}>{isDE ? 'Telefon' : 'Phone'}</span><input type="tel" name="telefon" autoComplete="tel" className={FELD} /></label>
                      <label className="block"><span className={LABEL}>{isDE ? 'Webseite' : 'Website'}</span><input name="webseite" placeholder="www.…" className={FELD} /></label>
                      <label className="block"><span className={LABEL}>{isDE ? 'Wunsch-Partnercode' : 'Preferred partner code'}</span><input name="wunschcode" placeholder={isDE ? 'z. B. MUELLER' : 'e.g. MUELLER'} className={FELD} /></label>
                    </div>
                    <label className="block">
                      <span className={LABEL}>{isDE ? 'Wie möchten Sie uns empfehlen? *' : 'How would you like to recommend us? *'}</span>
                      <textarea required name="kanal" rows={4} placeholder={isDE ? 'z. B. an meine Kunden als Steuerberater, im Handwerkerverband, über Social Media …' : 'e.g. to my clients as a tax advisor, in a trade association, on social media …'} className={`${FELD} resize-y`} />
                    </label>
                    <label className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/[0.05] p-3 text-sm text-white/70">
                      <input type="checkbox" required name="einverstanden" value="ja" className="mt-1 h-4 w-4 accent-cyan-400" />
                      <span>
                        {isDE
                          ? <>Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anmeldung verwendet werden. Details in der <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>. *</>
                          : <>I agree that my details are used to process the application. Details in the <Link href="/datenschutz" className="underline">privacy policy</Link>. *</>}
                      </span>
                    </label>
                    {status === 'error' ? (
                      <p role="alert" className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {isDE ? 'Das hat leider nicht geklappt. Bitte schreiben Sie uns an ' : 'Something went wrong. Please write to '}
                        <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
                      </p>
                    ) : null}
                    <button type="submit" disabled={status === 'sending'} className="btn-primary inline-flex items-center gap-2 text-base disabled:opacity-60">
                      {status === 'sending' ? (isDE ? 'Wird gesendet …' : 'Sending …') : (isDE ? 'Anmeldung senden' : 'Send application')} <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}
