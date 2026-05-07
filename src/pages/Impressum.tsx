export default function Impressum() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            Rechtliches
          </div>
          <h1 className="font-display font-bold text-5xl text-white mb-4" data-testid="text-impressum-headline">Impressum</h1>
          <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="glass rounded-2xl border border-white/5 p-8 md:p-10 space-y-8 text-white/70 text-sm leading-relaxed" data-testid="content-impressum">

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-1">
              <p className="text-white font-medium">Rüdiger Becker</p>
              <p>My Digital World</p>
              <p>Hauptstr. 11a</p>
              <p>54344 Kenn</p>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Kontakt</h2>
            <div className="space-y-2">
              <p>
                <span className="text-white/40">Telefon:</span>{' '}
                <a href="tel:+4915906146147" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-impressum-phone">
                  +49 (0) 159 0614 6147
                </a>
              </p>
              <p>
                <span className="text-white/40">E-Mail:</span>{' '}
                <a href="mailto:info@my-digital-world.de" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-impressum-email">
                  info@my-digital-world.de
                </a>
              </p>
              <p>
                <span className="text-white/40">Website:</span>{' '}
                <a href="https://www.my-digital-world.de" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-impressum-website">
                  www.my-digital-world.de
                </a>
              </p>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Haftungsausschluss</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Haftung für Inhalte</h3>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="mt-2">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="mt-2">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Urheberrecht</h3>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p className="mt-2">
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Verantwortlich für den Inhalt</h2>
            <div className="space-y-1">
              <p className="text-white font-medium">Rüdiger Becker</p>
              <p>Hauptstr. 11a</p>
              <p>54344 Kenn</p>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                data-testid="link-impressum-os-plattform"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
            <p className="mt-3">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
