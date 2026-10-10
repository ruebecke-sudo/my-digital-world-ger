import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'wouter'
import { ArrowRight, Handshake, Images, LayoutTemplate, Mail, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

/**
 * Intro video of the home page as a frosted glass popup with a translucent frame around the
 * video and buttons into the site. Nothing is stored on the visitor's device.
 */
export function VideoPopup({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const ziele = [
    { href: '/aktionspreis-fuer-webseiten', icon: LayoutTemplate, label: isDE ? 'Webseiten-Pakete' : 'Website packages' },
    { href: '/image-manager-pro', icon: Images, label: 'Image Manager Pro' },
    { href: '/partnerprogramm', icon: Handshake, label: isDE ? 'Partnerprogramm' : 'Partner programme' },
    { href: '/kontakt', icon: Mail, label: isDE ? 'Kontakt' : 'Contact' },
  ]

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#040810]/60 p-3 backdrop-blur-md sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-popup-titel"
        onClick={(e) => e.stopPropagation()}
        className="glass-frost relative w-full max-w-4xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[28px] p-3 sm:p-5"
      >
        {/* Colour glows behind the glass frame */}
        <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-16 -bottom-20 h-72 w-72 rounded-full bg-purple-600/35 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 sm:top-7 sm:right-7"
          aria-label={isDE ? 'Video schließen' : 'Close video'}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
          <video
            src="/hero_video.mp4"
            poster="/hero_video_poster.webp"
            autoPlay
            muted
            loop
            playsInline
            controls
            className="block aspect-video w-full"
          />
        </div>

        <div className="relative px-1 pt-5 pb-1 sm:px-2">
          <h2 id="video-popup-titel" className="font-display text-xl font-extrabold text-white sm:text-2xl">
            {isDE ? 'Willkommen bei My Digital World' : 'Welcome to My Digital World'}
          </h2>
          <p className="mt-1 text-sm text-white/65 sm:text-base">
            {isDE ? 'Kreative digitale Lösungen für Ihr Unternehmen. Wohin möchten Sie?' : 'Creative digital solutions for your business. Where would you like to go?'}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {ziele.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-3 text-[13px] font-semibold sm:px-3.5 sm:text-sm text-white/90 backdrop-blur-xl transition hover:border-cyan-300/50 hover:bg-white/[0.12]"
              >
                <Icon className="h-4 w-4 shrink-0 text-cyan-300" /> <span className="min-w-0 break-words leading-tight">{label}</span>
              </Link>
            ))}
          </div>
          <button type="button" onClick={onClose} className="btn-primary mt-4 inline-flex w-full items-center justify-center gap-2 text-base sm:w-auto">
            {isDE ? 'Weiter zur Startseite' : 'Continue to the home page'} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
