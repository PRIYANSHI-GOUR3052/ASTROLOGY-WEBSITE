import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { AstrologerProfile } from '../components/AstrologerProfile'
import { Statistics } from '../components/Statistics'

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-midnight-blue via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto px-4 pt-32 py-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-gold animate-pulse">
          हमारे बारे में<br />
          <span className="text-3xl md:text-5xl">About Us</span>
        </h1>
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 text-center text-gold">Our Journey</h2>
          <p className="text-lg text-lavender mb-4">
            Nakshatra Gyaan has been guiding seekers on their spiritual journey for over two decades. Our team of expert astrologers and spiritual guides combines ancient wisdom with modern insights to provide you with accurate and life-changing guidance.
          </p>
          <p className="text-lg text-lavender">
            We believe that every individual has a unique cosmic blueprint, and our mission is to help you understand and harness the power of your celestial connections.
          </p>
        </div>
        <Statistics />
        <AstrologerProfile />
      </div>
    </div>
  )
}

