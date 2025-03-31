'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-nebula-indigo-dark via-cosmic-purple to-celestial-blue opacity-70"></div>
      <motion.div 
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl pt-32 md:text-7xl font-serif font-bold mb-6 text-royal-gold">
          नक्षत्र ज्ञान
          <span className="block text-3xl md:text-5xl mt-2 text-starlight-silver">Nakshatra Gyaan</span>
        </h1>
        <h2 className="text-3xl md:text-4xl font-serif mb-6 text-royal-gold">
          अपना आकाशीय मार्ग खोजें
          <span className="block text-2xl md:text-3xl mt-2 text-starlight-silver">Discover Your Celestial Path</span>
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-mystic-lavender">
          ब्रह्मांड के रहस्यों को उजागर करें और हमारी आध्यात्मिक सेवाओं और विशेषज्ञ मार्गदर्शन के माध्यम से अपने जीवन का उद्देश्य खोजें।
        </p>
        <p className="text-xl mb-12 max-w-2xl mx-auto text-mystic-lavender">
          Unlock the secrets of the cosmos and find your life's purpose through our spiritual services and expert guidance.
        </p>
        <motion.div 
          className="flex justify-center space-x-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Image src="/images/astrology.svg" alt="Mystical Symbol 1" width={100} height={100} className="animate-spin-slow" />
          <Image src="/images/astrology.svg" alt="Mystical Symbol 2" width={100} height={100} className="animate-float" />
          <Image src="/images/astrology.svg" alt="Mystical Symbol 3" width={100} height={100} className="animate-glow" />
        </motion.div>
      </motion.div>
    </section>
  )
}

