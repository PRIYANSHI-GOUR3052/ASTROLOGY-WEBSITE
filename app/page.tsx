import { HeroSection } from './components/HeroSection'
import { LifeChangingSolutions } from './components/LifeChangingSolutions'
import { AstrologerProfile } from './components/AstrologerProfile'
import { BestAstrologyServices } from './components/BestAstrologyServices'
import { AnimatedStars } from './components/AnimatedStars'
import { ZodiacExplorer } from './components/ZodiacExplorer'
import { Testimonials } from './components/Testimonials'
import { AstrologyCalculator } from './components/AstrologyCalculator'
import { ServicesOverview } from './components/ServicesOverview'
import { FeaturedProducts } from './components/FeaturedProducts'
import { BlogPreview } from './components/BlogPreview'
import { ContactForm } from './components/ContactForm'
import { DailyHoroscope } from './components/DailyHoroscope'
import { AstrologyQuiz } from './components/AstrologyQuiz'
import { Statistics } from './components/Statistics'
import { ScrollAnimation } from './components/ScrollAnimation'

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cosmic-purple-dark via-celestial-blue-dark to-cosmic-purple-dark">
      <AnimatedStars />
      <HeroSection />
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation>
          <Statistics />
        </ScrollAnimation>

        <ScrollAnimation>
          <DailyHoroscope />
        </ScrollAnimation>

        <ScrollAnimation>
          <LifeChangingSolutions />
        </ScrollAnimation>

        <ScrollAnimation>
          <BestAstrologyServices />
        </ScrollAnimation>

        <ScrollAnimation>
          <ServicesOverview />
        </ScrollAnimation>

        <ScrollAnimation>
          <ZodiacExplorer />
        </ScrollAnimation>

        <ScrollAnimation>
          <AstrologyCalculator />
        </ScrollAnimation>

        <ScrollAnimation>
          <AstrologerProfile />
        </ScrollAnimation>

        <ScrollAnimation>
          <FeaturedProducts />
        </ScrollAnimation>

        <ScrollAnimation>
          <BlogPreview />
        </ScrollAnimation>

        <ScrollAnimation>
          <AstrologyQuiz />
        </ScrollAnimation>

        <ScrollAnimation>
          <Testimonials />
        </ScrollAnimation>

        <ScrollAnimation>
          <ContactForm />
        </ScrollAnimation>
      </div>
    </div>
  )
}

