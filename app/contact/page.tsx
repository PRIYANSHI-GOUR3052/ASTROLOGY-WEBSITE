"use client"

import { ContactForm } from '../components/ContactForm'
import { ContactInfo } from '../components/ContactInfo'
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'

export default function ContactPage({
  searchParams,
}: {
  searchParams: { service: string }
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-midnight-blue via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-gold animate-pulse">
          हमसे संपर्क करें<br />
          <span className="text-3xl md:text-5xl">Contact Us</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ContactInfo />
          <ContactForm />
        </div>
        <p>Selected service: {searchParams.service}</p>
      </div>
    </div>
  )
}

