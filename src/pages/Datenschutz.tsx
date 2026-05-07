export default function Datenschutz() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium mb-6">
            Rechtliches
          </div>
          <h1 className="font-display font-bold text-5xl text-white mb-4" data-testid="text-datenschutz-headline">Datenschutzerklärung</h1>
          <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="glass rounded-2xl border border-white/5 p-8 md:p-10 space-y-8 text-white/70 text-sm leading-relaxed" data-testid="content-datenschutz">

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-white font-medium mb-2">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">2. Datenerfassung auf dieser Website</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                <p>
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Wie erfassen wir Ihre Daten?</h3>
                <p>
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="mt-2">
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Wofür nutzen wir Ihre Daten?</h3>
                <p>
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p>
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">3. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter: Replit, Inc. Der Anbieter ist Replit, Inc., 101 2nd St, Suite 700, San Francisco, CA 94105, USA. Details entnehmen Sie der Datenschutzerklärung von Replit:{' '}
              <a
                href="https://replit.com/site/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                data-testid="link-datenschutz-replit"
              >
                https://replit.com/site/privacy
              </a>
              .
            </p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">4. Hinweis zur verantwortlichen Stelle</h2>
            <p className="mb-4">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <div className="space-y-1 text-white/70">
              <p className="text-white font-medium">Rüdiger Becker</p>
              <p>My Digital World</p>
              <p>Hauptstr. 11a</p>
              <p>54344 Kenn</p>
              <p className="mt-3">
                Telefon:{' '}
                <a href="tel:+4915906146147" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-datenschutz-phone">
                  +49 (0) 159 0614 6147
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a href="mailto:info@my-digital-world.de" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-datenschutz-email">
                  info@my-digital-world.de
                </a>
              </p>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">5. Speicherdauer</h2>
            <p>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
            </p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">6. Allgemeine Hinweise und Pflichtinformationen</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Datenschutz</h3>
                <p>
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Recht auf Auskunft, Löschung und Berichtigung</h3>
                <p>
                  Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Recht auf Einschränkung der Verarbeitung</h3>
                <p>
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
                  <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen.</li>
                  <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
                  <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Recht auf Datenübertragbarkeit</h3>
                <p>
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">SSL- bzw. TLS-Verschlüsselung</h3>
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">7. Datenerfassung auf dieser Website</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">Server-Log-Dateien</h3>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-white/50">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="mt-2">
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </div>
              <div>
                <h3 className="text-white font-medium mb-2">Kontaktformular / E-Mail-Kontakt</h3>
                <p>
                  Wenn Sie uns per E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus der Anfrage inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">8. Soziale Medien</h2>
            <p>
              Diese Website enthält Links zu sozialen Netzwerken (Facebook, Instagram). Beim Anklicken dieser Links werden Sie direkt auf die jeweiligen Plattformen weitergeleitet. Es werden dabei keine personenbezogenen Daten von Ihnen automatisch an die Plattformen übermittelt. Für die Datenschutzpraktiken dieser Plattformen sind deren jeweilige Datenschutzerklärungen maßgeblich.
            </p>
          </section>

          <div className="text-white/30 text-xs mt-6">
            Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
          </div>
        </div>
      </div>
    </div>
  )
}
