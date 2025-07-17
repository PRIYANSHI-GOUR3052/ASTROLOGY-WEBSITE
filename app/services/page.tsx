"use client";
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { Testimonials } from '../components/Testimonials'
import { FAQSection } from '../components/FAQSection'
import { CTASection } from '../components/CTASection'

import { UniversalServicesGrid } from '../components/UniversalServiceGrid';
import ServiceCarousels from '../components/ServiceCarousels';
export default function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-golden-amber-dark via-sunburst-yellow to-golden-amber-dark">
      <AnimatedStars />
      <MysticBackground>
      <div className="container mx-auto pt-0 px-4 pb-16 relative z-10">
        <h1
          className="text-5xl md:text-7xl mb-2 text-center font-normal text-black"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, letterSpacing: '0.01em', marginTop: '0px' }}
        >
          Our Spiritual Services
        </h1>
        <p
          className="text-xl text-center mb-10 max-w-3xl mx-auto"
          style={{ color: '#232323', fontFamily: 'Playfair Display, serif', fontWeight: 400, letterSpacing: '0.01em' }}
        >
          Embark on a transformative journey with our comprehensive range of spiritual services. Let our expert astrologers and spiritual guides illuminate your path to self-discovery and enlightenment.
        </p>

      
        <UniversalServicesGrid />
        <ServiceCarousels />
        
        <Testimonials />
        <FAQSection />
        <CTASection />
      </div>
        </MysticBackground>
    </div>
  )
}
