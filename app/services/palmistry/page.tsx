import { AnimatedStars } from '../../components/AnimatedStars'
import { MysticBackground } from '../../components/MysticBackground'

export default function PalmistryPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-midnight-blue via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-gold animate-pulse">
          हस्त रेखा<br />
          <span className="text-3xl md:text-5xl">Palmistry</span>
        </h1>
        <p className="text-lavender text-lg mb-8 text-center max-w-2xl mx-auto">
          Explore the secrets written in the palm of your hand. Our experienced palmists will analyze the lines, mounts, and shapes of your palm to provide insights into your personality, relationships, career, and life events.
        </p>
        {/* Add more content about palmistry services here */}
      </div>
    </div>
  )
}

