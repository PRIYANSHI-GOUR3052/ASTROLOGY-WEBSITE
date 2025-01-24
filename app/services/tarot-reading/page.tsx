import { AnimatedStars } from '../../components/AnimatedStars'
import { MysticBackground } from '../../components/MysticBackground'

export default function TarotReadingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-midnight-blue via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-gold animate-pulse">
          टैरो रीडिंग<br />
          <span className="text-3xl md:text-5xl">Tarot Reading</span>
        </h1>
        <p className="text-lavender text-lg mb-8 text-center max-w-2xl mx-auto">
          Gain clarity and guidance through the ancient wisdom of tarot cards. Our skilled tarot readers will interpret the cards to provide insights into your past, present, and future, helping you navigate life's challenges and opportunities.
        </p>
        {/* Add more content about tarot reading services here */}
      </div>
    </div>
  )
}

