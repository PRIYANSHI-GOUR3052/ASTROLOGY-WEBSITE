'use client'

import { useState } from 'react'

const zodiacSigns = [
  { name: 'मेष (Aries)', symbol: '♈' },
  { name: 'वृषभ (Taurus)', symbol: '♉' },
  { name: 'मिथुन (Gemini)', symbol: '♊' },
  { name: 'कर्क (Cancer)', symbol: '♋' },
  { name: 'सिंह (Leo)', symbol: '♌' },
  { name: 'कन्या (Virgo)', symbol: '♍' },
  { name: 'तुला (Libra)', symbol: '♎' },
  { name: 'वृश्चिक (Scorpio)', symbol: '♏' },
  { name: 'धनु (Sagittarius)', symbol: '♐' },
  { name: 'मकर (Capricorn)', symbol: '♑' },
  { name: 'कुंभ (Aquarius)', symbol: '♒' },
  { name: 'मीन (Pisces)', symbol: '♓' },
]

export function ZodiacWheel() {
  const [activeSign, setActiveSign] = useState<string | null>(null)

  return (
    <div 
      className="relative w-96 h-96 mx-auto animate-spin"
      style={{ animationDuration: '20s' }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full"></div>
      {zodiacSigns.map((sign, index) => {
        const angle = (index / zodiacSigns.length) * 360
        const x = Math.cos((angle - 90) * (Math.PI / 180)) * 150 + 192
        const y = Math.sin((angle - 90) * (Math.PI / 180)) * 150 + 192

        return (
          <div
            key={sign.name}
            className="absolute w-16 h-16 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-120"
            style={{ left: x - 32, top: y - 32 }}
            onMouseEnter={() => setActiveSign(sign.name)}
            onMouseLeave={() => setActiveSign(null)}
          >
            <div className="w-full h-full rounded-full bg-midnight-blue-light/80 border border-gold flex items-center justify-center">
              <span className="text-3xl text-gold">{sign.symbol}</span>
            </div>
          </div>
        )
      })}
      {activeSign && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-midnight-blue-light/90 p-4 rounded-lg border border-gold">
            <p className="text-gold text-xl">{activeSign}</p>
          </div>
        </div>
      )}
    </div>
  )
}