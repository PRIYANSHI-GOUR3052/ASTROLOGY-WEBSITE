'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

const zodiacSigns = [
  { name: 'मेष (Aries)', symbol: '♈', dates: 'March 21 - April 19' },
  { name: 'वृषभ (Taurus)', symbol: '♉', dates: 'April 20 - May 20' },
  { name: 'मिथुन (Gemini)', symbol: '♊', dates: 'May 21 - June 20' },
  { name: 'कर्क (Cancer)', symbol: '♋', dates: 'June 21 - July 22' },
  { name: 'सिंह (Leo)', symbol: '♌', dates: 'July 23 - August 22' },
  { name: 'कन्या (Virgo)', symbol: '♍', dates: 'August 23 - September 22' },
  { name: 'तुला (Libra)', symbol: '♎', dates: 'September 23 - October 22' },
  { name: 'वृश्चिक (Scorpio)', symbol: '♏', dates: 'October 23 - November 21' },
  { name: 'धनु (Sagittarius)', symbol: '♐', dates: 'November 22 - December 21' },
  { name: 'मकर (Capricorn)', symbol: '♑', dates: 'December 22 - January 19' },
  { name: 'कुंभ (Aquarius)', symbol: '♒', dates: 'January 20 - February 18' },
  { name: 'मीन (Pisces)', symbol: '♓', dates: 'February 19 - March 20' },
]

export function ZodiacExplorer() {
  const [activeSign, setActiveSign] = useState<string | null>(null)

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-deep-purple/30 to-celestial-blue/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-royal-gold">
          राशि चक्र अन्वेषक
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-royal-gold">
          Zodiac Explorer
        </h3>
        <div className="relative w-96 h-96 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-celestial-blue/20 to-deep-purple/20 rounded-full"></div>
          {zodiacSigns.map((sign, index) => {
            const angle = (index / zodiacSigns.length) * 360
            const x = Math.cos((angle - 90) * (Math.PI / 180)) * 150 + 192
            const y = Math.sin((angle - 90) * (Math.PI / 180)) * 150 + 192

            return (
              <motion.div
                key={sign.name}
                className="absolute w-16 h-16 flex items-center justify-center cursor-pointer"
                style={{ left: x - 32, top: y - 32 }}
                whileHover={{ scale: 1.2 }}
                onHoverStart={() => setActiveSign(sign.name)}
                onHoverEnd={() => setActiveSign(null)}
                aria-label={`${sign.name} zodiac sign`}
                role="button"
                tabIndex={0}
              >
                <div className="w-full h-full rounded-full bg-deep-purple-light/80 border border-royal-gold flex items-center justify-center">
                  <span className="text-3xl text-royal-gold">{sign.symbol}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
        {activeSign && (
          <Card className="bg-deep-purple-light/90 border border-royal-gold max-w-md mx-auto">
            <CardContent className="p-4">
              {zodiacSigns.find(sign => sign.name === activeSign) && (
                <>
                  <h4 className="text-xl font-serif font-semibold text-royal-gold mb-2">{activeSign}</h4>
                  <p className="text-mystic-silver">Dates: {zodiacSigns.find(sign => sign.name === activeSign)?.dates}</p>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

