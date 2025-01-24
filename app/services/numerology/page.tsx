import { AnimatedStars } from '../../components/AnimatedStars'
import { MysticBackground } from '../../components/MysticBackground'

export default function NumerologyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-midnight-blue via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-gold animate-pulse">
          अंक ज्योतिष<br />
          <span className="text-3xl md:text-5xl">Numerology</span>
        </h1>
        <p className="text-lavender text-lg mb-8 text-center max-w-2xl mx-auto">
          Uncover the hidden meanings in your life's numbers. Our numerology experts will analyze your name and birth date to reveal your life path, destiny, and personal year numbers, providing valuable insights into your life's journey.
        </p>
        {/* Add more content about numerology services here */}
      </div>
    </div>
  )
}

