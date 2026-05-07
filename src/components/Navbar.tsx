import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, Zap } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Start' },
    { href: '/leistungen', label: 'Leistungen' },
    { href: '/programme', label: 'Programme' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060b18]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-sm">My Digital</span>
                <span className="font-display font-bold text-cyan-400 text-sm"> World</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-nav-${link.label.toLowerCase()}`}>
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href
                      ? 'text-cyan-400'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="mailto:info@my-digital-world.de"
              data-testid="button-contact-nav"
              className="btn-primary text-sm"
            >
              Kontakt aufnehmen
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#060b18]/98 backdrop-blur-xl border-b border-cyan-500/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}>
                <span
                  onClick={() => setIsOpen(false)}
                  className={`block text-sm font-medium py-2 transition-colors cursor-pointer ${
                    location === link.href ? 'text-cyan-400' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <a
              href="mailto:info@my-digital-world.de"
              data-testid="button-contact-mobile"
              className="btn-primary text-sm text-center mt-2"
            >
              Kontakt aufnehmen
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
