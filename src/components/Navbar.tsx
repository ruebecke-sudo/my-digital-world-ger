import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, ChevronDown, Zap } from 'lucide-react'

const leistungenLinks = [
  { href: '/aktionspreis-fuer-webseiten', label: 'Website Design' },
  { href: '/soc-media-marketing', label: 'Soc. Media Marketing' },
  { href: '/digitale-praesentationen', label: 'Digitale PrÃ¤sentationen' },
  { href: '/ki-agenten', label: 'KI Agenten' },
  { href: '/digitale-transformation', label: 'Digitale Transformation' },
  { href: '/comic-stil', label: 'Comicstil' },
  { href: '/kurzvideos', label: 'Kurzvideos für WhatsApp' },
]


  const empfehlungenLinks = [
{ href: '/empfehlung/poster', label: 'MDW-Poster-Shop', badge: 'NEU' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [leistungenOpen, setLeistungenOpen] = useState(false)
  const [empfehlungenOpen, setEmpfehlungenOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [location] = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const empfehlungenDropdownRef = useRef<HTMLDivElement>(null)

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
      if (empfehlungenDropdownRef.current && !empfehlungenDropdownRef.current.contains(e.target as Node)) {
        setEmpfehlungenOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const isLeistungActive = leistungenLinks.some(l => l.href === location)
  const isEmpfehlungActive = empfehlungenLinks.some(l => l.href === location)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060b18]/95 backdrop-blur-xl border-b border-cyan-500/10 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="w-[96%] max-w-[1700px] mx-auto">
        <div className="flex items-center justify-between gap-6 h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-logo" className="flex-shrink-0">
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
          <div className="hidden xl:flex items-center gap-4 2xl:gap-6 whitespace-nowrap">
            <Link href="/" data-testid="link-nav-start">
              <span className={`text-[15px] 2xl:text-base font-medium transition-colors cursor-pointer ${location === '/' ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}>
                Start
              </span>
            </Link>

            {/* Leistungen Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLeistungenOpen(!leistungenOpen)}
                data-testid="button-nav-leistungen"
                className={`flex items-center gap-1 text-[15px] 2xl:text-base font-medium transition-colors ${isLeistungActive ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}
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
              <span className={`text-[15px] 2xl:text-base font-medium transition-colors cursor-pointer ${location === '/programme' ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}>
                Tools & Programme
              </span>
            </Link>

            <Link href="/for-free" data-testid="link-nav-forfree">
              <span className={`text-[15px] 2xl:text-base font-medium transition-colors cursor-pointer ${location === '/for-free' ? 'text-green-400' : 'text-green-400 hover:text-green-300'}`}>
                For free
              </span>
            </Link>

            {/* Empfehlungen Dropdown */}
            <div className="relative" ref={empfehlungenDropdownRef}>
              <button
                onClick={() => setEmpfehlungenOpen(!empfehlungenOpen)}
                data-testid="button-nav-empfehlungen"
                className={`flex items-center gap-1 text-[15px] 2xl:text-base font-medium transition-colors ${isEmpfehlungActive ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}
              >
                Empfehlungen
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${empfehlungenOpen ? 'rotate-180' : ''}`} />
              </button>
              {empfehlungenOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 glass rounded-xl border border-cyan-500/10 shadow-xl shadow-black/30 py-2">
                  {empfehlungenLinks.map(link => (
                    <Link key={link.href} href={link.href} data-testid={`link-dropdown-${link.label.toLowerCase().replace(/\s/g,'-')}`}>
                      <span
                        onClick={() => setEmpfehlungenOpen(false)}
                        className={`block px-4 py-2 text-base cursor-pointer transition-colors flex items-center justify-between ${location === link.href ? 'text-cyan-400 bg-cyan-500/5' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                      >
                        {link.label}
                        {link.badge && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500 text-black leading-none">{link.badge}</span>}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a href="https://mdw-bild-videogenerator.netlify.app" target="_blank" rel="noopener noreferrer" data-testid="link-nav-avgenerator">
              <span className="inline-flex items-center gap-1.5 text-base font-medium text-orange-400 hover:text-orange-300 cursor-pointer">
                MDW-IV-Generator
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-500 text-black leading-none animate-pulse">NEU</span>
              </span>
            </a>

            <Link href="/kontakt" data-testid="link-nav-kontakt">
              <span className={`text-[15px] 2xl:text-base font-medium transition-colors cursor-pointer ${location === '/kontakt' ? 'text-cyan-400' : 'text-white/70 hover:text-white'}`}>
                Kontakt
              </span>
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden xl:flex flex-shrink-0">
            <Link href="/kontakt">
              <button className="btn-primary text-[15px] 2xl:text-base" data-testid="button-contact-nav">
                Jetzt anfragen
              </button>
            </Link>
          </div>

          {/* Mobile menu */}
          <button onClick={() => setIsOpen(!isOpen)} data-testid="button-mobile-menu" className="xl:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-[#060b18]/98 backdrop-blur-xl border-b border-cyan-500/10">
          <div className="w-[96%] max-w-[1700px] mx-auto py-4 flex flex-col gap-1">
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
            <Link href="/for-free"><span onClick={() => setIsOpen(false)} className={`block py-2 text-base font-medium transition-colors cursor-pointer ${location === '/for-free' ? 'text-green-400' : 'text-green-400 hover:text-green-300'}`}>For free</span></Link>
            <div className="py-1">
              <p className="text-sm text-white/55 uppercase tracking-wider mb-1">Empfehlungen</p>
              {empfehlungenLinks.map(link => (
                <Link key={link.href} href={link.href}>
                  <span onClick={() => setIsOpen(false)} className={`block py-2 pl-3 text-base cursor-pointer flex items-center justify-between ${location === link.href ? 'text-cyan-400' : 'text-white/75 hover:text-white'}`}>
                    {link.label}
                    {link.badge && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500 text-black leading-none">{link.badge}</span>}
                  </span>
                </Link>
              ))}
            </div>
            <a href="https://mdw-bild-videogenerator.netlify.app" target="_blank" rel="noopener noreferrer"><span onClick={() => setIsOpen(false)} className="flex items-center gap-2 py-2 text-base font-medium text-orange-400 hover:text-orange-300 cursor-pointer">MDW-IV-Generator <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-500 text-black leading-none">NEU</span></span></a>
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
