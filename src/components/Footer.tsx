import { Link } from 'wouter'
import { Mail, Phone, Facebook, Instagram, Zap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-[#040810] border-t border-cyan-500/10 mt-24">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-sm">My Digital</span>
                <span className="font-display font-bold text-cyan-400 text-sm"> World</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Kreative digitale Lösungen für Ihr Unternehmen. Von Webdesign bis KI-Marketing – wir bringen Ihr Business ins digitale Zeitalter.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Startseite' },
                { href: '/leistungen', label: 'Leistungen' },
                { href: '/programme', label: 'Programme' },
                { href: '/impressum', label: 'Impressum' },
                { href: '/datenschutz', label: 'Datenschutz' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} data-testid={`link-footer-${link.label.toLowerCase()}`}>
                    <span className="text-white/50 text-sm hover:text-cyan-400 transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a
                  href="tel:+4915906146147"
                  data-testid="link-footer-phone"
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  +49 (0) 159 0614 6147
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a
                  href="mailto:info@my-digital-world.de"
                  data-testid="link-footer-email"
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  info@my-digital-world.de
                </a>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href="https://www.facebook.com/my-digital-world"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-footer-facebook"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/my_digit_world"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-footer-instagram"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} My Digital World – Rüdiger Becker. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/impressum">
              <span className="text-white/30 text-xs hover:text-white/60 transition-colors cursor-pointer">Impressum</span>
            </Link>
            <Link href="/datenschutz">
              <span className="text-white/30 text-xs hover:text-white/60 transition-colors cursor-pointer">Datenschutz</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
