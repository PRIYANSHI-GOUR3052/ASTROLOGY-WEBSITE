'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

export function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState('')
  const [horoscope, setHoroscope] = useState('')

  const getHoroscope = () => {
    // In a real application, this would fetch the horoscope from an API
    setHoroscope(`Today is a great day for ${selectedSign}. You'll find opportunities for growth and success in unexpected places. Keep an open mind and trust your instincts.`)
  }

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/30 to-celestial-blue/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-gold">
          दैनिक राशिफल
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-gold">
          Daily Horoscope
        </h3>
        <Card className="bg-midnight-blue-light/80 border border-gold/30 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="mb-4">
              <label htmlFor="zodiac-sign" className="block text-sm font-medium mb-2 text-gold">अपनी राशि चुनें (Select Your Zodiac Sign)</label>
              <Select onValueChange={setSelectedSign}>
                <SelectTrigger className="w-full bg-midnight-blue text-lavender border-lavender/20 focus:border-gold">
                  <SelectValue placeholder="Choose your sign" />
                </SelectTrigger>
                <SelectContent>
                  {zodiacSigns.map((sign) => (
                    <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={getHoroscope} className="w-full bg-gold text-midnight-blue hover:bg-gold-light mb-4" disabled={!selectedSign}>
              राशिफल देखें (View Horoscope)
            </Button>
            {horoscope && (
              <p className="text-lavender">{horoscope}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

