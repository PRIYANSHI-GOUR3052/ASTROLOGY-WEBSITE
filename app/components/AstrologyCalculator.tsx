'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '../contexts/useLanguage'

export function AstrologyCalculator() {
  const [birthDate, setBirthDate] = useState<Date | undefined>(undefined)
  const [birthTime, setBirthTime] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [calculationType, setCalculationType] = useState('natal')
  const [focusArea, setFocusArea] = useState('general')
  const { lang } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Calculating:', { birthDate, birthTime, birthPlace, calculationType, focusArea })
  }

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-gray-100"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <h2 className="text-3xl font-serif font-bold mb-4 text-center bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
        {lang === 'hi' ? 'ज्योतिष कैलकुलेटर' : 'Astrology Calculator'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <label htmlFor="birthDate" className="block text-sm font-medium mb-1 text-gray-700">
            {lang === 'hi' ? 'जन्म तिथि' : 'Birth Date'}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal bg-[#E6F3FF] text-[#2B6CB0] border-gray-200 hover:bg-[#D1E7FF]",
                  !birthDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50">
              <Calendar
                mode="single"
                selected={birthDate}
                onSelect={setBirthDate}
                initialFocus
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <label htmlFor="birthTime" className="block text-sm font-medium mb-1 text-gray-700">
            {lang === 'hi' ? 'जन्म समय' : 'Birth Time'}
          </label>
          <Input
            id="birthTime"
            type="time"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full bg-[#E6F3FF] text-[#2B6CB0] border-gray-200 focus:border-[#2B6CB0] focus:ring-[#2B6CB0]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label htmlFor="birthPlace" className="block text-sm font-medium mb-1 text-gray-700">
            {lang === 'hi' ? 'जन्म स्थान' : 'Birth Place'}
          </label>
          <Input
            id="birthPlace"
            type="text"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            required
            placeholder={lang === 'hi' ? 'शहर, देश' : 'City, Country'}
            className="w-full bg-[#E6F3FF] text-[#2B6CB0] border-gray-200 focus:border-[#2B6CB0] focus:ring-[#2B6CB0]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <label htmlFor="calculationType" className="block text-sm font-medium mb-1 text-gray-700">
            {lang === 'hi' ? 'गणना प्रकार' : 'Calculation Type'}
          </label>
          <Select onValueChange={setCalculationType} defaultValue={calculationType}>
            <SelectTrigger className="w-full bg-[#E6F3FF] text-[#2B6CB0] border-gray-200 focus:border-[#2B6CB0] focus:ring-[#2B6CB0]">
              <SelectValue placeholder={lang === 'hi' ? 'गणना प्रकार चुनें' : 'Select calculation type'} />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#2B6CB0] border border-gray-200 shadow-lg">
              <SelectItem value="natal" className="hover:bg-[#E6F3FF] cursor-pointer">
                {lang === 'hi' ? 'जन्म कुंडली' : 'Natal Chart'}
              </SelectItem>
              <SelectItem value="transit" className="hover:bg-[#E6F3FF] cursor-pointer">
                {lang === 'hi' ? 'गोचर कुंडली' : 'Transit Chart'}
              </SelectItem>
              <SelectItem value="synastry" className="hover:bg-[#E6F3FF] cursor-pointer">
                {lang === 'hi' ? 'मेल मिलान' : 'Synastry Chart'}
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <label htmlFor="focusArea" className="block text-sm font-medium mb-1 text-gray-700">
            {lang === 'hi' ? 'विशेष क्षेत्र' : 'Focus Area'}
          </label>
          <Select onValueChange={setFocusArea} defaultValue={focusArea}>
            <SelectTrigger className="w-full bg-[#E6F3FF] text-[#2B6CB0] border-gray-200 focus:border-[#2B6CB0] focus:ring-[#2B6CB0]">
              <SelectValue placeholder={lang === 'hi' ? 'क्षेत्र चुनें' : 'Select focus area'} />
            </SelectTrigger>
            <SelectContent className="bg-white text-[#2B6CB0] border border-gray-200 shadow-lg">
              <SelectItem value="general" className="hover:bg-[#E6F3FF] cursor-pointer">
                {lang === 'hi' ? 'सामान्य' : 'General'}
              </SelectItem>
              <SelectItem value="career" className="hover:bg-[#E6F3FF] cursor-pointer">
                {lang === 'hi' ? 'व्यवसाय' : 'Career'}
              </SelectItem>
              <SelectItem value="love" className="hover:bg-[#E6F3FF] cursor-pointer">
                {lang === 'hi' ? 'प्रेम' : 'Love'}
              </SelectItem>
              <SelectItem value="health" className="hover:bg-[#E6F3FF] cursor-pointer">
                {lang === 'hi' ? 'स्वास्थ्य' : 'Health'}
              </SelectItem>
              <SelectItem value="education" className="hover:bg-[#E6F3FF] cursor-pointer">
                {lang === 'hi' ? 'शिक्षा' : 'Education'}
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            type="submit" 
            className="w-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full py-2 shadow-md transition duration-300"
            whileTap={{ scale: 0.98 }}
          >
            {lang === 'hi' ? 'गणना करें' : 'Calculate'}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

