import { ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'wouter'

export default function DigTransformation() {
  return (
    <div className="pt-24 pb-32">
      <div className="relative section-overlay py-20 text-center">
        <div className="hero-orb w-96 h-96 bg-cyan-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            Leistungen
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            Digitale<br />
            <span className="gradient-text">Transformation</span>
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Dein Foto als Kunstwerk: Vom Schnappschuss zum modernen Kunstobjekt
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">
        {/* Main content */}
        <div className="glass rounded-2xl border border-white/5 p-8">
          <p className="text-white/70 text-base leading-relaxed mb-6">
            <strong className="text-white">Ein Bild sagt mehr als tausend Worte – und in einem einzigartigen Kunststil sagt es noch mehr.</strong>
          </p>
          <p className="text-white/70 text-base leading-relaxed mb-4">
            Stellen Sie sich vor, Ihr Lieblingsfoto – ob ein Porträt, ein Familienbild, ein Haustier oder ein besonderer Moment – verwandelt sich in ein modernes Kunstwerk im Stil von Andy Warhol. Ausdrucksstark, farbintensiv und absolut individuell.
          </p>

          <h3 className="font-display font-semibold text-white text-base mb-4 mt-6">Deine Vorteile auf einen Blick:</h3>
          <div className="space-y-3">
            {[
              'Als Grafikdesigner helfe ich Ihnen, genau das umzusetzen',
              'Ich nehme Ihr Foto und überarbeite es künstlerisch',
              'Ob knallige Farben, abstrahierte Details oder ein Mix aus mehreren Varianten',
              'Hier entsteht aus Deinem Bild ein echtes Unikat',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Varianten */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              titel: 'Pop Art Stil',
              text: 'Knallige Farben und kontrastreiche Darstellung im Stil von Andy Warhol – ausdrucksstark und einzigartig.',
            },
            {
              titel: 'Abstrakte Kunst',
              text: 'Abstrahierte Details und künstlerische Überarbeitung – aus Ihrem Foto wird ein modernes Kunstwerk.',
            },
            {
              titel: 'Mix & Varianten',
              text: 'Kombinationen verschiedener Stile und mehrere Varianten – Sie wählen Ihren Favoriten.',
            },
          ].map((v) => (
            <div key={v.titel} className="glass rounded-2xl border border-cyan-500/10 p-6">
              <h3 className="font-display font-bold text-white mb-3">{v.titel}</h3>
              <p className="text-white/70 text-base leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="glass rounded-2xl border border-cyan-500/15 p-8 text-center">
          <h2 className="font-display font-bold text-white text-xl mb-4">Jetzt Ihr Bild transformieren lassen</h2>
          <p className="text-white/70 text-base mb-6">
            Kontaktieren Sie uns und lassen Sie Ihr Lieblingsfotos zu einem einzigartigen Kunstwerk werden.
          </p>
          <Link href="/kontakt">
            <button className="btn-primary flex items-center gap-2 mx-auto">
              Mehr Infos <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
