import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { Testimonials } from '../components/Testimonials'
import { FAQSection } from '../components/FAQSection'
import { CTASection } from '../components/CTASection'
import { ServiceHighlight } from '../components/ServiceHighlight'
import { UniversalServicesGrid } from '../components/UniversalServiceGrid'
export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-golden-amber-dark via-sunburst-yellow to-golden-amber-dark">
      <AnimatedStars />
      <MysticBackground>
      <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-mystic-brown animate-pulse">
          हमारी आध्यात्मिक सेवाएं<br />
          <span className="text-3xl md:text-5xl">Our Spiritual Services</span>
        </h1>
        <p className="text-xl text-mystic-brown text-center mb-16 max-w-3xl mx-auto">
          Embark on a transformative journey with our comprehensive range of spiritual services. 
          Let our expert astrologers and spiritual guides illuminate your path to self-discovery and enlightenment.
        </p>

      
        <UniversalServicesGrid />
        <ServiceHighlight />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </div>
        </MysticBackground>
    </div>
  )
}
