'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function AstrologyCalculator() {
  const [birthDate, setBirthDate] = useState('')
  const [birthTime, setBirthTime] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [calculationType, setCalculationType] = useState('natal')
  const [focusArea, setFocusArea] = useState('general')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to a backend service
    // and receive the calculated chart or report
    console.log('Calculating:', { birthDate, birthTime, birthPlace, calculationType, focusArea })
  }

  return (
    <div className="bg-midnight-blue-light border border-gold rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-serif font-semibold mb-4 text-gold">Astrology Calculator (Jyotish Ganana)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium mb-1 text-lavender">Birth Date (Janm Tithi)</label>
          <Input
            id="birthDate"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
            className="w-full bg-midnight-blue text-lavender border-lavender/20 focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="birthTime" className="block text-sm font-medium mb-1 text-lavender">Birth Time (Janm Samay)</label>
          <Input
            id="birthTime"
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full bg-midnight-blue text-lavender border-lavender/20 focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="birthPlace" className="block text-sm font-medium mb-1 text-lavender">Birth Place (Janm Sthan)</label>
          <Input
            id="birthPlace"
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            required
            placeholder="City, Country"
            className="w-full bg-midnight-blue text-lavender border-lavender/20 focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="calculationType" className="block text-sm font-medium mb-1 text-lavender">Calculation Type (Ganana Prakar)</label>
          <Select onValueChange={setCalculationType} defaultValue={calculationType}>
            <SelectTrigger className="w-full bg-midnight-blue text-lavender border-lavender/20 focus:border-gold">
              <SelectValue placeholder="Select calculation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="natal">Natal Chart (Janam Kundali)</SelectItem>
              <SelectItem value="transit">Transit Chart (Gochar Kundali)</SelectItem>
              <SelectItem value="synastry">Synastry Chart (Mel Milan)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="focusArea" className="block text-sm font-medium mb-1 text-lavender">Focus Area (Vishesh Kshetra)</label>
          <Select onValueChange={setFocusArea} defaultValue={focusArea}>
            <SelectTrigger className="w-full bg-midnight-blue text-lavender border-lavender/20 focus:border-gold">
              <SelectValue placeholder="Select focus area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General (Samanya)</SelectItem>
              <SelectItem value="career">Career (Vyavsay)</SelectItem>
              <SelectItem value="love">Love (Prem)</SelectItem>
              <SelectItem value="health">Health (Swasthya)</SelectItem>
              <SelectItem value="education">Education (Shiksha)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full bg-gold text-midnight-blue hover:bg-gold-light">
          Calculate (Ganana Karein)
        </Button>
      </form>
    </div>
  )
}

