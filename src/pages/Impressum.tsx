export default function Impressum() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            Rechtliches
          </div>
          <h1 className="font-display font-bold text-5xl text-white mb-4" data-testid="text-impressum-headline">Impressum</h1>
          <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>

        <div className="glass rounded-2xl border border-white/5 p-8 md:p-10 space-y-8 text-white/70 text-sm leading-relaxed" data-testid="content-impressum">

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Verantwortlich für diese Webseite:</h2>
            <div className="space-y-1">
              <p className="text-white font-medium">my-digital-world.de</p>
              <p className="text-white font-medium">Rüdiger Becker</p>
              <p>Hauptstr. 11a</p>
              <p>54344 Kenn</p>
              <p className="mt-3">
                Tel:{' '}
                <a href="tel:+4915906146147" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-impressum-phone">
                  +49 (0) 159 0614 6147
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a href="mailto:info@mydigitalworld.de" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-impressum-email">
                  info@mydigitalworld.de
                </a>
              </p>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Haftungsausschluss</h2>
            <p>
              Die enthaltenen Angaben sind nach unserem besten Wissen und Gewissen richtig, vollständig und aktuell. Dennoch wird diese Website, einschließlich des durch sie zugänglich gemachten Inhalts ohne Zusicherung oder Gewährleistungen jeglicher Art, weder ausdrücklich noch stillschweigend, zur Verfügung gestellt. Der Zugang und die Benutzung dieser Website geschieht auf eigene Gefahr des Benutzers. Wir sind nicht verantwortlich für Schäden, die in Verbindung mit dem Zugang oder der Benutzung der Website aufgetreten sind.
            </p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Online-Streitbeilegung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
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
