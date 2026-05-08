export default function Datenschutz() {
  return (
    <div className="pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            Rechtliches
          </div>
          <h1 className="font-display font-bold text-5xl text-white mb-4" data-testid="text-datenschutz-headline">Datenschutzerklärung</h1>
          <div className="h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
        </div>

        <div className="glass rounded-2xl border border-white/5 p-8 md:p-10 space-y-8 text-white/70 text-base leading-relaxed" data-testid="content-datenschutz">

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Wer wir sind</h2>
            <p>Die Adresse unserer Website ist: https://my-digital-world.de</p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Welche personenbezogenen Daten wir sammeln und warum wir sie sammeln</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-white font-medium mb-2">Kommentare</h3>
                <p>
                  Wenn Besucher Kommentare auf der Website schreiben, sammeln wir die Daten, die im Kommentar-Formular angezeigt werden, außerdem die IP-Adresse des Besuchers und den User-Agent-String (damit wird der Browser identifiziert), um die Erkennung von Spam zu unterstützen.
                </p>
                <p className="mt-2">
                  Aus deiner E-Mail-Adresse kann eine anonymisierte Zeichenfolge erstellt (auch Hash genannt) und dem Gravatar-Dienst übergeben werden, um zu prüfen, ob du diesen benutzt. Die Datenschutzerklärung des Gravatar-Dienstes findest du hier:{' '}
                  <a href="https://automattic.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">https://automattic.com/privacy/</a>.
                  Nachdem dein Kommentar freigegeben wurde, ist dein Profilbild öffentlich im Kontext deines Kommentars sichtbar.
                </p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Medien</h3>
                <p>
                  Wenn du ein registrierter Benutzer bist und Fotos auf diese Website lädst, solltest du vermeiden, Fotos mit einem EXIF-GPS-Standort hochzuladen. Besucher dieser Website könnten Fotos, die auf dieser Website gespeichert sind, herunterladen und deren Standort-Informationen extrahieren.
                </p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Kontaktformulare</h3>
                <p>
                  Wenn Sie uns über das Kontaktformular eine Nachricht senden, werden die angegebenen Daten zwecks Bearbeitung der Anfrage und für eventuelle Anschlussfragen gespeichert. Diese Daten geben wir ohne Ihre Einwilligung nicht weiter.
                </p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Cookies</h3>
                <p>
                  Wenn du einen Kommentar auf unserer Website schreibst, kann das eine Einwilligung sein, deinen Namen, E-Mail-Adresse und Website in Cookies zu speichern. Dies ist eine Komfortfunktion, damit du nicht, wenn du einen weiteren Kommentar schreibst, all diese Daten erneut eingeben musst. Diese Cookies werden ein Jahr lang gespeichert.
                </p>
                <p className="mt-2">
                  Falls du ein Konto hast und dich auf dieser Website anmeldest, werden wir ein temporäres Cookie setzen, um festzustellen, ob dein Browser Cookies akzeptiert. Dieses Cookie enthält keine personenbezogenen Daten und wird verworfen, wenn du deinen Browser schließt.
                </p>
                <p className="mt-2">
                  Wenn du dich anmeldest, werden wir einige Cookies einrichten, um deine Anmeldeinformationen und Anzeigeoptionen zu speichern. Anmelde-Cookies verfallen nach zwei Tagen und Cookies für die Anzeigeoptionen nach einem Jahr. Falls du bei der Anmeldung „Angemeldet bleiben" auswählst, wird deine Anmeldung zwei Wochen lang aufrechterhalten. Mit der Abmeldung aus deinem Konto werden die Anmelde-Cookies gelöscht.
                </p>
                <p className="mt-2">
                  Wenn du einen Artikel bearbeitest oder veröffentlichst, wird ein zusätzlicher Cookie in deinem Browser gespeichert. Dieser Cookie enthält keine personenbezogenen Daten und verweist nur auf die Beitrags-ID des Artikels, den du gerade bearbeitet hast. Der Cookie verfällt nach einem Tag.
                </p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Eingebettete Inhalte von anderen Websites</h3>
                <p>
                  Beiträge auf dieser Website können eingebettete Inhalte beinhalten (z. B. Videos, Bilder, Beiträge etc.). Eingebettete Inhalte von anderen Websites verhalten sich exakt so, als ob der Besucher die andere Website besucht hätte.
                </p>
                <p className="mt-2">
                  Diese Websites können Daten über dich sammeln, Cookies benutzen, zusätzliche Tracking-Dienste von Dritten einbetten und deine Interaktion mit diesem eingebetteten Inhalt aufzeichnen, inklusive deiner Interaktion mit dem eingebetteten Inhalt, falls du ein Konto hast und auf dieser Website angemeldet bist.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Wie lange wir deine Daten speichern</h2>
            <p>
              Wenn du einen Kommentar schreibst, wird dieser Kommentar und seine Metadaten auf unbestimmte Zeit gespeichert. Auf diese Art können wir Folgekommentare automatisch erkennen und freigeben, anstatt sie in einer Moderations-Warteschlange zu halten.
            </p>
            <p className="mt-2">
              Für Benutzer, die sich auf unserer Website registrieren, speichern wir zusätzlich die persönlichen Informationen, die sie in ihren Benutzerprofilen angeben. Alle Benutzer können ihre persönlichen Informationen jederzeit einsehen, verändern oder löschen (der Benutzername kann nicht verändert werden). Administratoren der Website können diese Informationen ebenfalls einsehen und verändern.
            </p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Welche Rechte du an deinen Daten hast</h2>
            <p>
              Wenn du ein Konto auf dieser Website besitzt oder Kommentare geschrieben hast, kannst du einen Export deiner personenbezogenen Daten bei uns anfordern, inklusive aller Daten, die du uns mitgeteilt hast. Darüber hinaus kannst du die Löschung aller personenbezogenen Daten, die wir von dir gespeichert haben, anfordern. Dies umfasst nicht die Daten, die wir aus administrativen, rechtlichen oder sicherheitsrelevanten Gründen aufbewahren müssen.
            </p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Wohin wir deine Daten senden</h2>
            <p>
              Besucher-Kommentare könnten von einem automatisierten Dienst zur Spam-Erkennung untersucht werden.
            </p>
          </section>

          <div className="h-px bg-white/5" />

          <section>
            <h2 className="font-display font-semibold text-white text-lg mb-4">Kontakt</h2>
            <div className="space-y-1">
              <p className="text-white font-medium">Rüdiger Becker</p>
              <p>Hauptstr. 11a, 54344 Kenn</p>
              <p>
                Tel:{' '}
                <a href="tel:+4915906146147" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-datenschutz-phone">
                  +49 (0) 159 0614 6147
                </a>
              </p>
              <p>
                E-Mail:{' '}
                <a href="mailto:info@mydigitalworld.de" className="text-cyan-400 hover:text-cyan-300 transition-colors" data-testid="link-datenschutz-email">
                  info@mydigitalworld.de
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
