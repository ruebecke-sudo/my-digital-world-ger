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
        className="glass-frost relative max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[28px] p-3 sm:p-4"
      >
        {/* Colour glows behind the glass frame */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
          <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="absolute -right-16 -bottom-20 h-72 w-72 rounded-full bg-purple-600/35 blur-3xl" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur transition hover:bg-black/60 sm:top-7 sm:right-7"
          aria-label={isDE ? 'Video schließen' : 'Close video'}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Video size follows the screen height, so video, text and buttons fit without scrolling. */}
        <div
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          style={{ width: 'min(calc(96vw - 2rem), 1500px, calc((100dvh - 14.5rem) * 16 / 9))' }}
        >
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

        <div className="relative flex flex-wrap items-center justify-between gap-x-4 gap-y-3 px-1 pt-4 sm:px-2" style={{ maxWidth: 'min(calc(96vw - 2rem), 1500px, calc((100dvh - 14.5rem) * 16 / 9))' }}>
          <div className="min-w-[15rem] flex-1">
            <h2 id="video-popup-titel" className="font-display text-lg font-extrabold text-white sm:text-xl">
              {isDE ? 'Willkommen bei My Digital World' : 'Welcome to My Digital World'}
            </h2>
            <p className="text-sm text-white/65">
              {isDE ? 'Kreative digitale Lösungen für Ihr Unternehmen. Wohin möchten Sie?' : 'Creative digital solutions for your business. Where would you like to go?'}
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
            {ziele.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.07] px-3 py-3 text-[13px] font-semibold text-white/90 backdrop-blur-xl transition hover:border-cyan-300/50 hover:bg-white/[0.12]"
              >
                <Icon className="h-4 w-4 shrink-0 text-cyan-300" /> <span className="min-w-0 break-words leading-tight">{label}</span>
              </Link>
            ))}
            <button type="button" onClick={onClose} className="btn-primary col-span-2 inline-flex items-center justify-center gap-2 !px-4 !py-3 text-sm sm:col-span-1">
              {isDE ? 'Zur Startseite' : 'Home page'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
