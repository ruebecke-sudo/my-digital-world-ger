import { ArrowRight, CheckCircle, Video, Image, Sparkles } from 'lucide-react'
import { Link } from 'wouter'
import { useLanguage } from '../context/LanguageContext'

export default function ComicStil() {
  const { lang } = useLanguage()
  const isDE = lang === 'de'

  const vorteile = isDE
    ? [
        'Einzigartiger, ausdrucksstarker Retro-Look mit kräftigen Farben',
        'Perfekt für auffällige Illustrationen und Storytelling',
        'Individuelle Anpassung von Linienstärken und Farbpaletten',
        'Direkte Transformation von realen Fotos in Kunstwerke',
      ]
    : [
        'Unique, expressive retro look with bold colors',
        'Perfect for eye-catching illustrations and storytelling',
        'Individual adjustment of line weights and color palettes',
        'Direct transformation of real photos into artworks',
      ]

  const features = isDE
    ? [
        {
          titel: 'Retro-Strichführung',
          text: 'Klassische, klare Outlines und Halbtonraster-Strukturen, die dem Design einen authentischen Print-Comic-Look verleihen.',
        },
        {
          titel: 'Lebendige Farbwelten',
          text: 'Gesättigte Primärfarben und markante Kontraste sorgen für maximale Aufmerksamkeit auf allen digitalen Kanälen.',
        },
        {
          titel: 'Grenzenlose Fantasie',
          text: 'Vom Maskottchen über Marketing-Grafiken bis hin zu kompletten Story-Panels – alles lässt sich im Comicstil visualisieren.',
        },
      ]
    : [
        {
          titel: 'Retro Linework',
          text: 'Classic, clean outlines and halftone patterns that give your designs an authentic printed comic book look.',
        },
        {
          titel: 'Vivid Color Palettes',
          text: 'Saturated primary colors and bold contrasts ensure maximum attention across all digital channels.',
        },
        {
          titel: 'Uncapped Imagination',
          text: 'From brand mascots to promotional graphics and full story panels — anything can be visualized in comic style.',
        },
      ]

  return (
    <div className="pt-24 pb-32">
      {/* Hero Banner Video */}
      <div className="w-full relative h-[40vh] md:h-[50vh] overflow-hidden border-b border-cyan-500/10">
        <video 
          src="/golf.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-transparent to-transparent" />
      </div>

      {/* Header Info */}
      <div className="relative section-overlay py-16 text-center">
        <div className="hero-orb w-96 h-96 bg-purple-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            {isDE ? 'Kreativ-Stile' : 'Creative Styles'}
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-6xl text-white mb-4 leading-tight">
            {isDE ? 'Bildgenerierung im' : 'Image Generation in'}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
              {isDE ? 'Comicstil' : 'Comic Style'}
            </span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {isDE 
              ? 'Erwecke deine Ideen zum Leben: Erschaffe ausdrucksstarke Kunstwerke und erweitere sie mit spektakulären, lebendigen Video-Animationen.' 
              : 'Bring your ideas to life: create highly expressive artworks and enhance them with spectacular, living video animations.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-20">
        {/* Intro Section */}
        <div className="glass rounded-3xl border border-white/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display font-extrabold text-3xl text-white mb-6">
                {isDE ? 'Die Kraft des Comicstils' : 'The Power of Comic Art'}
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                {isDE
                  ? 'Der Comicstil bricht mit traditionellen Foto-Konventionen und bietet eine einzigartige Möglichkeit der Markenkommunikation. Durch die Reduktion auf klare Konturen und lebendige Farben entstehen Visuals, die ins Auge springen und eine emotionale Geschichte erzählen.'
                  : 'Comic art breaks with traditional photographic conventions and offers a unique way of brand communication. By reducing details to bold outlines and vibrant colors, you create visuals that grab attention and tell an emotional story.'}
              </p>
              <div className="space-y-4">
                {vorteile.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/80 text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] group">
              <img 
                src="/golf.jpg" 
                alt="golf" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-all duration-700" 
              />
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 text-white/90 text-xs px-3 py-1.5 rounded-lg">
                ✦ {isDE ? 'Generiertes Comic-Artwork (Golf)' : 'Generated Comic Artwork (Golf)'}
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.titel} className="glass rounded-2xl border border-purple-500/10 p-8 hover:border-purple-500/20 transition-all duration-300">
              <h3 className="font-display font-bold text-white text-lg mb-3">{f.titel}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>

        {/* Exclusive Image-to-Video Section */}
        <div className="glass rounded-3xl border border-white/5 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold mb-4 uppercase tracking-wider">
              <Video className="w-3.5 h-3.5" />
              {isDE ? 'Bild-zu-Video Option' : 'Image-to-Video Option'}
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
              {isDE ? 'Vom statischen Bild zum lebendigen Clip' : 'Bring Static Images to Life'}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {isDE 
                ? 'Erlebe die nächste Evolutionsstufe des Designs. Mit unserem MDW-IV-Generator kannst du jedes generierte Comic-Bild als Startframe nutzen, um eine flüssige Videosequenz zu rendern. Der Stil bleibt dabei perfekt erhalten.'
                : 'Experience the next stage of design evolution. With our MDW-IV-Generator, you can use any generated comic image as a starting frame to render a smooth video clip while keeping the art style perfectly intact.'}
            </p>
          </div>

          {/* Side by side comparison (Exclusive Look) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Source Image */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/90 font-medium">
                <Image className="w-5 h-5 text-purple-400" />
                <span>{isDE ? '1. Ausgangsbild (Statisches Artwork)' : '1. Source Image (Static Artwork)'}</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/40 flex items-center justify-center">
                <img 
                  src="/scene.jpg" 
                  alt="scene" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs font-medium text-white/90 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5">
                  Style: 1960s Comic Strip
                </div>
              </div>
            </div>

            {/* Rendered Video */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-white/90 font-medium">
                <Video className="w-5 h-5 text-orange-400" />
                <span>{isDE ? '2. Animerter Clip (KI-Videoszene)' : '2. Animated Clip (AI Video Scene)'}</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/40">
                <video 
                  src="/scene.mp4" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-xs font-medium text-white/90 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Render-Engine: Luma Ray 2
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass rounded-3xl border border-cyan-500/15 p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-orange-500/5 pointer-events-none" />
          <h2 className="font-display font-extrabold text-3xl text-white mb-4">
            {isDE ? 'Erschaffe deine eigenen Comic-Welten' : 'Create Your Own Comic Universes'}
          </h2>
          <p className="text-white/70 text-base max-w-xl mx-auto mb-8 leading-relaxed">
            {isDE
              ? 'Nutze unseren exklusiven MDW-IV-Generator mit über 200 kostenfreien Credits und generiere deine Artworks und Clips direkt im Browser.'
              : 'Use our exclusive MDW-IV-Generator with 200 free starting credits and generate your artworks and clips directly in your browser.'}
          </p>
          <a
            href="https://mdw-bild-videogenerator.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-display font-bold text-base transition-all hover:shadow-[0_0_36px_rgba(168,85,247,0.4)] hover:-translate-y-0.5"
          >
            {isDE ? 'Comic-Generator starten' : 'Start Comic Generator'}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
