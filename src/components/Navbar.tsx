import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export function Navbar() {
  const { lang, setLang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [leistungenOpen, setLeistungenOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [location] = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isDE = lang === 'de'

  const leistungenLinks = [
    { href: '/aktionspreis-fuer-webseiten', label: isDE ? 'Website Design' : 'Website Design' },
    { href: '/soc-media-marketing', label: isDE ? 'Soc. Media Marketing' : 'Soc. Media Marketing' },
    { href: '/digitale-praesentationen', label: isDE ? 'Digitale Präsentationen' : 'Digital Presentations' },
    { href: '/ki-agenten', label: isDE ? 'KI Agenten' : 'AI Agents' },
    { href: '/digitale-transformation', label: isDE ? 'Digitale Transformation' : 'Digital Transformation' },
  ]

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

  const LangToggle = ({ mobile }: { mobile?: boolean }) => (
    <div className={`flex items-center gap-0 rounded-lg border border-white/10 overflow-hidden text-xs font-bold ${mobile ? 'self-start' : ''}`}>
      <button
        onClick={() => setLang('de')}
        className={`px-2.5 py-1.5 transition-colors ${lang === 'de' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/45 hover:text-white/75'}`}
      >
        DE
      </button>
      <div className="w-px h-4 bg-white/10" />
      <button
        onClick={() => setLang('en')}
        className={`px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/45 hover:text-white/75'}`}
      >
        EN
      </button>
    </div>
  )

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
                <span className="font-display font-bold text-white text-base">my-digital-</span>
                <span className="font-display font-bold text-cyan-400 text-base">world</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" data-testid="link-nav-start">
              <span className={`text-base font-medium transition-colors cursor-pointer ${location === '/' ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}>
                {isDE ? 'Start' : 'Home'}
              </span>
            </Link>

            {/* Leistungen Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLeistungenOpen(!leistungenOpen)}
                data-testid="button-nav-leistungen"
                className={`flex items-center gap-1 text-base font-medium transition-colors ${isLeistungActive ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}
              >
                {isDE ? 'Leistungen' : 'Services'}
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
                {isDE ? 'Tools & Programme' : 'Tools & Programs'}
              </span>
            </Link>

            <Link href="/for-free" data-testid="link-nav-forfree">
              <span className={`text-base font-medium transition-colors cursor-pointer ${location === '/for-free' ? 'text-emerald-400' : 'text-white/70 hover:text-white'}`}>
                For free
              </span>
            </Link>

            <Link href="/oakgen" data-testid="link-nav-oakgen">
              <span className={`inline-flex items-center gap-1.5 text-base font-medium transition-colors cursor-pointer ${location === '/oakgen' ? 'text-green-400' : 'text-white/70 hover:text-white'}`}>
                Oakgen.ai
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-black leading-none animate-pulse">NEU</span>
              </span>
            </Link>

            <Link href="/kontakt" data-testid="link-nav-kontakt">
              <span className={`text-base font-medium transition-colors cursor-pointer ${location === '/kontakt' ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}>
                {isDE ? 'Kontakt' : 'Contact'}
              </span>
            </Link>
          </div>

          {/* CTA + Lang Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <LangToggle />
            <Link href="/kontakt">
              <button className="btn-primary text-base" data-testid="button-contact-nav">
                {isDE ? 'Jetzt anfragen' : 'Get in touch'}
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} data-testid="button-mobile-menu" className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#060b18]/98 backdrop-blur-xl border-b border-cyan-500/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <LangToggle mobile />
            <div className="my-1 h-px bg-white/5" />
            <Link href="/"><span onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-white/70 hover:text-white cursor-pointer">{isDE ? 'Start' : 'Home'}</span></Link>
            <div className="py-1">
              <p className="text-sm text-white/55 uppercase tracking-wider mb-1">{isDE ? 'Leistungen' : 'Services'}</p>
              {leistungenLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <span onClick={() => setIsOpen(false)} className={`block py-2 pl-3 text-base cursor-pointer ${location === link.href ? 'text-cyan-400' : 'text-white/75 hover:text-white'}`}>
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
            <Link href="/programme"><span onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-white/70 hover:text-white cursor-pointer">{isDE ? 'Tools & Programme' : 'Tools & Programs'}</span></Link>
            <Link href="/for-free"><span onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-white/70 hover:text-white cursor-pointer">For free</span></Link>
            <Link href="/oakgen"><span onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2 text-base font-medium text-white/70 hover:text-white cursor-pointer">Oakgen.ai <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-500 text-black leading-none">NEU</span></span></Link>
            <Link href="/kontakt"><span onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-white/70 hover:text-white cursor-pointer">{isDE ? 'Kontakt' : 'Contact'}</span></Link>
            <Link href="/kontakt">
              <button className="btn-primary text-base text-center mt-3 w-full" onClick={() => setIsOpen(false)}>{isDE ? 'Jetzt anfragen' : 'Get in touch'}</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
