import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'

const leistungenLinks = [
  { href: '/aktionspreis-fuer-webseiten', label: 'Website Design' },
  { href: '/soc-media-marketing', label: 'Soc. Media Marketing' },
  { href: '/digitale-praesentationen', label: 'Digitale Präsentationen' },
  { href: '/ki-agenten', label: 'KI Agenten' },
  { href: '/digitale-transformation', label: 'Digitale Transformation' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [leistungenOpen, setLeistungenOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [location] = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLeistungenOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isLeistungActive = leistungenLinks.some(l => l.href === location)

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
              <div className="leading-tight">
                <span className="font-display font-bold text-white text-base">My digital</span>
                <span className="font-display font-bold text-cyan-400 text-base"> world</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" data-testid="link-nav-start">
              <span className={`text-base font-medium transition-colors cursor-pointer ${location === '/' ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}>
                Start
              </span>
            </Link>

            {/* Leistungen Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLeistungenOpen(!leistungenOpen)}
                data-testid="button-nav-leistungen"
                className={`flex items-center gap-1 text-base font-medium transition-colors ${isLeistungActive ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}
              >
                Leistungen
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${leistungenOpen ? 'rotate-180' : ''}`} />
              </button>
              {leistungenOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl border border-cyan-500/10 shadow-xl shadow-black/30 py-2">
                  {leistungenLinks.map(link => (
                    <Link key={link.href} href={link.href} data-testid={`link-dropdown-${link.label.toLowerCase().replace(/\s/g,'-')}`}>
                      <span
                        onClick={() => setLeistungenOpen(false)}
                        className={`block px-4 py-2 text-base cursor-pointer transition-colors ${location === link.href ? 'text-cyan-400 bg-cyan-500/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/programme" data-testid="link-nav-programme">
              <span className={`text-base font-medium transition-colors cursor-pointer ${location === '/programme' ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}>
                Tools & Programme
              </span>
            </Link>

            <Link href="/kontakt" data-testid="link-nav-kontakt">
              <span className={`text-base font-medium transition-colors cursor-pointer ${location === '/kontakt' ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}>
                Kontakt
              </span>
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link href="/kontakt">
              <button className="btn-primary text-base" data-testid="button-contact-nav">
                Jetzt anfragen
              </button>
            </Link>
          </div>

          {/* Mobile menu */}
          <button onClick={() => setIsOpen(!isOpen)} data-testid="button-mobile-menu" className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#060b18]/98 backdrop-blur-xl border-b border-cyan-500/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <Link href="/"><span onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-white/70 hover:text-white cursor-pointer">Start</span></Link>
            <div className="py-1">
              <p className="text-sm text-white/55 uppercase tracking-wider mb-1">Leistungen</p>
              {leistungenLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <span onClick={() => setIsOpen(false)} className={`block py-2 pl-3 text-base cursor-pointer ${location === link.href ? 'text-cyan-400' : 'text-white/75 hover:text-white'}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/programme"><span onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-white/70 hover:text-white cursor-pointer">Tools & Programme</span></Link>
            <Link href="/kontakt"><span onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-white/70 hover:text-white cursor-pointer">Kontakt</span></Link>
            <Link href="/kontakt">
              <button className="btn-primary text-base text-center mt-3 w-full" onClick={() => setIsOpen(false)}>Jetzt anfragen</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
