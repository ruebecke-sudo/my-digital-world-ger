import { ArrowRight, CheckCircle, Video, Image as ImageIcon, Sparkles, ExternalLink, Volume2 } from 'lucide-react'
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

  // Die 5 vom Benutzer gewünschten Paare
  const galleryItems = [
    {
      id: 'auto',
      title: isDE ? 'Klassischer Ford Cortina' : 'Classic Ford Cortina',
      image: '/auto.jpg',
      video: '/auto.mp4',
      desc: isDE
        ? 'Ein stilvoller hellblauer Ford Cortina aus den 60er Jahren im kultigen Comic-Stil. Die handgemachte Video-Animation erweckt das Auto in einer dynamischen Szene zum Leben.'
        : 'A stylish light blue Ford Cortina from the 60s in iconic comic style. The hand-crafted video animation brings the car to life in a dynamic scene.',
    },
    {
      id: 'eichhoernchen',
      title: isDE ? 'Spielende Eichhörnchen' : 'Squirrels Playing',
      image: '/eichhoernchen.jpg',
      video: '/eichhoernchen.mp4',
      desc: isDE
        ? 'Zwei niedliche Comic-Eichhörnchen. Das Video erweckt die Szene zum Leben und lässt die beiden flink den Baum hinaufklettern.'
        : 'Two cute comic squirrels. The video animation lets them climb up the tree trunk with quick and playful movements.',
    },
    {
      id: 'mdw',
      title: isDE ? 'My Digital World' : 'My Digital World',
      image: '/mdw.jpg',
      video: '/mdw.mp4',
      desc: isDE
        ? 'Die offizielle Visualisierung von My Digital World im detailreichen Comic-Stil. Das animierte Video haucht dem Motiv spektakuläre Bewegung ein.'
        : 'The official visualization of My Digital World in detailed comic style. The animated video breathes spectacular motion into the motif.',
    },
    {
      id: 'naehmaschine',
      title: isDE ? 'Nähmaschine' : 'Sewing Machine',
      image: '/naehmaschine.jpg',
      video: '/naehmaschine.mp4',
      desc: isDE
        ? 'Eine nostalgische Nähmaschine im detailreichen Retro-Look. Die Nähmaschine rattert im Takt der manuell startbaren Animation.'
        : 'A nostalgic sewing machine in detailed retro look. The machine rattles along with the manually playable video animation.',
    },
    {
      id: 'telefon',
      title: isDE ? 'Retro-Wandtelefon' : 'Retro Wall Telephone',
      image: '/telefon.jpg',
      video: '/telefon.mp4',
      desc: isDE 
        ? 'Ein klassisches rotes Münztelefon im lebendigen Comic-Stil. Die Animation erweckt das Wählscheiben-Telefon detailgetreu und mit passenden Retro-Sounds zum Leben.'
        : 'A classic red payphone in vivid comic book style. The animation brings the rotary phone to life with matching retro dial sounds.',
    }
  ]

  return (
    <div className="pt-24 pb-32">
      {/* Hero Banner Video */}
      <div className="w-full relative h-[40vh] md:h-[50vh] overflow-hidden border-b border-cyan-500/10 group">
        <video 
          src="/golf.mp4" 
          controls // Muss manuell gestartet werden laut User-Wunsch
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b18] via-transparent to-transparent pointer-events-none" />
        
        {/* Fullscreen Video Link */}
        <a 
          href="/golf.mp4" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 text-white text-xs px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-cyan-500/10"
        >
          <span>{isDE ? 'Video in voller Größe öffnen' : 'Open Video in Full Size'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
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
                <ImageIcon className="w-5 h-5 text-purple-400" />
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
                  controls // Aktiviert Steuerung und Ton für das Video
                  loop 
                  playsInline 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-black/70 border border-white/10 text-white text-[11px] px-2.5 py-1.5 rounded-lg">
                  <Volume2 className="w-3.5 h-3.5 text-orange-400" />
                  <span>{isDE ? 'Mit Ton' : 'With Audio'}</span>
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <a 
              href="/scene.mp4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              <span>{isDE ? 'Animationsvideo in voller Größe anzeigen' : 'View animation video in full size'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Exclusive Comic Showcase Gallery */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display font-extrabold text-3xl text-white">
              {isDE ? 'Exklusiver Showcase: Bild & Video im Einklang' : 'Exclusive Showcase: Image & Video Harmony'}
            </h2>
            <p className="text-white/70 text-base mt-4">
              {isDE 
                ? 'Jedes Bild erzählt eine Geschichte. Unsere Videos führen sie fort. Klicke auf die Videos, um sie manuell abzuspielen und die passende Tonspur zu hören.'
                : 'Every image tells a story. Our videos continue them. Click on the videos to play them manually and hear the matching audio track.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {galleryItems.map((item) => (
              <div key={item.id} className="glass rounded-3xl border border-white/5 p-6 md:p-8 flex flex-col gap-6 hover:border-purple-500/20 transition-all duration-300">
                {/* Media Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Image */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-white/60 font-medium">{isDE ? 'Statisches Bild' : 'Static Image'}</span>
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40">
                      <img src={item.image} alt={item.id} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  {/* Video */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-white/60 font-medium">{isDE ? 'KI-Video (mit Ton)' : 'AI Video (with Audio)'}</span>
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/40">
                      <video 
                        src={item.video} 
                        controls 
                        loop 
                        playsInline 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-black/70 text-white text-[9px] px-2 py-1 rounded">
                        <Volume2 className="w-3 h-3 text-orange-400" />
                        <span>{isDE ? 'Ton' : 'Audio'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-white text-xl">{item.title}</h3>
                    <a 
                      href={item.video} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <span>{isDE ? 'Vollbild' : 'Fullscreen'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
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
