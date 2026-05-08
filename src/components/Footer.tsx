import { Link } from 'wouter'
import { Mail, Phone, MessageCircle, Zap } from 'lucide-react'
import { FaFacebook, FaInstagram } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="relative bg-[#040810] border-t border-cyan-500/10 mt-24">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="leading-tight">
                <span className="font-display font-bold text-white text-base">My digital</span>
                <span className="font-display font-bold text-cyan-400 text-base"> world</span>
              </div>
            </div>
            <p className="text-white/75 text-sm leading-relaxed mb-1">Moderne Webseiten | digitale Transformation</p>
            <p className="text-white/75 text-sm leading-relaxed">Wir bieten Ihnen Lösungen um sichtbarer zu werden</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4">Leistungen</h3>
            <ul className="space-y-2">
              {[
                { href: '/aktionspreis-fuer-webseiten', label: 'Website Design' },
                { href: '/soc-media-marketing', label: 'Soc. Media Marketing' },
                { href: '/digitale-praesentationen', label: 'Digitale Präsentationen' },
                { href: '/ki-agenten', label: 'KI Agenten' },
                { href: '/digitale-transformation', label: 'Digitale Transformation' },
                { href: '/programme', label: 'Zu den Programmen' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-white/70 text-base hover:text-cyan-400 transition-colors cursor-pointer">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="tel:+4915906146147" className="text-white/70 text-base hover:text-white transition-colors" data-testid="link-footer-phone">
                  +49 (0) 159 0614 6147
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="https://wa.me/4915906146147" target="_blank" rel="noopener noreferrer" className="text-white/70 text-base hover:text-white transition-colors" data-testid="link-footer-whatsapp">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <a href="mailto:info@my-digital-world.de" className="text-white/70 text-base hover:text-white transition-colors" data-testid="link-footer-email">
                  info@my-digital-world.de
                </a>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a href="https://www.facebook.com/100000643922204" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-500/30 transition-all" data-testid="link-footer-facebook">
                  <FaFacebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/my_digit_world" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-500/30 transition-all" data-testid="link-footer-instagram">
                  <FaInstagram className="w-4 h-4" />
                </a>
              </div>
              <div className="pt-1">
                <p className="text-white/55 text-sm">Hauptstr. 11a, 54344 Kenn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/55 text-sm">© 2025 My digital world – Rüdiger Becker</p>
          <div className="flex items-center gap-6">
            <Link href="/impressum"><span className="text-white/55 text-sm hover:text-white/75 transition-colors cursor-pointer">Impressum</span></Link>
            <Link href="/datenschutz"><span className="text-white/55 text-sm hover:text-white/75 transition-colors cursor-pointer">Datenschutz</span></Link>
            <Link href="/kontakt"><span className="text-white/55 text-sm hover:text-white/75 transition-colors cursor-pointer">Kontakt</span></Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
