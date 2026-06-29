import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'wouter'
import { useLanguage } from '../context/LanguageContext'

export default function DigTransformation() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const vorteile = isDE
    ? [
        'Als Grafikdesigner helfe ich Ihnen, genau das umzusetzen',
        'Ich nehme Ihr Foto und überarbeite es künstlerisch',
        'Ob knallige Farben, abstrahierte Details oder ein Mix aus mehreren Varianten',
        'Hier entsteht aus Deinem Bild ein echtes Unikat',
      ]
    : [
        'As a graphic designer I help you implement exactly that',
        'I take your photo and rework it artistically',
        'Whether bold colors, abstracted details or a mix of several variants',
        'Your image becomes a true one-of-a-kind original',
      ]

  const varianten = isDE
    ? [
        { titel: 'Pop Art Stil', text: 'Knallige Farben und kontrastreiche Darstellung im Stil von Andy Warhol – ausdrucksstark und einzigartig.' },
        { titel: 'Abstrakte Kunst', text: 'Abstrahierte Details und künstlerische Überarbeitung – aus Ihrem Foto wird ein modernes Kunstwerk.' },
        { titel: 'Mix & Varianten', text: 'Kombinationen verschiedener Stile und mehrere Varianten – Sie wählen Ihren Favoriten.' },
      ]
    : [
        { titel: 'Pop Art Style', text: 'Bold colors and high-contrast presentation in the style of Andy Warhol — expressive and unique.' },
        { titel: 'Abstract Art', text: 'Abstracted details and artistic reworking — your photo becomes a modern artwork.' },
        { titel: 'Mix & Variants', text: 'Combinations of various styles and multiple variants — you choose your favorite.' },
      ]

  return (
    <div className="pt-24 pb-32">
      <div className="w-full">
        <video src="/uhr_video.mp4" autoPlay muted loop playsInline className="w-full h-auto block" />
      </div>

      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            {isDE ? 'Leistungen' : 'Services'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            {isDE ? 'Digitale' : 'Digital'}<br />
            <span className="gradient-text">{isDE ? 'Transformation' : 'Transformation'}</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            {isDE ? 'Dein Foto als Kunstwerk: Vom Schnappschuss zum modernen Kunstobjekt' : 'Your photo as artwork: from snapshot to modern art object'}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        <div className="glass rounded-2xl border border-white/5 p-8">
          <p className="text-white/70 text-base leading-relaxed mb-6">
            <strong className="text-white">
              {isDE ? 'Ein Bild sagt mehr als tausend Worte – und in einem einzigartigen Kunststil sagt es noch mehr.' : 'A picture says more than a thousand words — and in a unique art style it says even more.'}
            </strong>
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            {isDE
              ? 'Stellen Sie sich vor, Ihr Lieblingsfoto – ob ein Porträt, ein Familienbild, ein Haustier oder ein besonderer Moment – verwandelt sich in ein modernes Kunstwerk im Stil von Andy Warhol. Ausdrucksstark, farbintensiv und absolut individuell.'
              : 'Imagine your favorite photo — whether a portrait, a family picture, a pet or a special moment — transforming into a modern artwork in the style of Andy Warhol. Expressive, color-intense and absolutely individual.'
            }
          </p>
          <h3 className="font-display font-semibold text-white text-base mb-4 mt-6">
            {isDE ? 'Deine Vorteile auf einen Blick:' : 'Your benefits at a glance:'}
          </h3>
          <div className="space-y-3">
            {vorteile.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {varianten.map((v) => (
            <div key={v.titel} className="glass rounded-2xl border border-cyan-500/10 p-6">
              <h3 className="font-display font-bold text-white mb-3">{v.titel}</h3>
              <p className="text-white/70 text-base leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl border border-cyan-500/15 p-8 text-center">
          <h2 className="font-display font-bold text-white text-xl mb-4">
            {isDE ? 'Jetzt Ihr Bild transformieren lassen' : 'Get your image transformed now'}
          </h2>
          <p className="text-white/70 text-base mb-6">
            {isDE
              ? 'Kontaktieren Sie uns und lassen Sie Ihr Lieblingsfotos zu einem einzigartigen Kunstwerk werden.'
              : 'Contact us and let your favorite photo become a unique work of art.'
            }
          </p>
          <Link href="/kontakt">
            <button className="btn-primary flex items-center gap-2 mx-auto">
              {isDE ? 'Mehr Infos' : 'Learn more'} <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
