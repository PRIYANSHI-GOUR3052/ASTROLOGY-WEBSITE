import { AnimatedStars } from '../../components/AnimatedStars'
import { MysticBackground } from '../../components/MysticBackground'

export default function AstrologyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-midnight-blue via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-gold animate-pulse">
          ज्योतिष<br />
          <span className="text-3xl md:text-5xl">Astrology</span>
        </h1>
        <p className="text-lavender text-lg mb-8 text-center max-w-2xl mx-auto">
          Discover the cosmic influences on your life through our expert astrology services. Our skilled astrologers will analyze your birth chart to provide insights into your personality, relationships, career, and life path.
        </p>
        {/* Add more content about astrology services here */}
      </div>
    </div>
  )
}

