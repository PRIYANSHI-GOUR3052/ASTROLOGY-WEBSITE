'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const services = [
  {
    title: "Personal Astrology Reading",
    description: "Gain deep insights into your personality, life path, and potential future outcomes with a personalized astrology reading. Our expert astrologers will analyze your birth chart and provide guidance on various aspects of your life.",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Couple Compatibility Analysis",
    description: "Understand the dynamics of your relationship through astrological compatibility analysis. We'll examine the synastry between you and your partner, highlighting strengths and potential challenges in your relationship.",
    image: "/placeholder.svg?height=300&width=400"
  },
  {
    title: "Career Guidance Through Astrology",
    description: "Discover your professional strengths and ideal career paths with our astrological career guidance. We'll analyze your birth chart to identify your natural talents and the best times for career moves.",
    image: "/placeholder.svg?height=300&width=400"
  }
]

export function ServiceHighlight() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextService = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
  }

  const prevService = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length)
  }

  return (
    <div className="my-16">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-mystic-brown">
        Featured Services
      </h2>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-celestial-cream/90 shadow-lg">
              <CardContent className="p-6 flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-4 md:mb-0 md:mr-6">
                  <img src={services[currentIndex].image} alt={services[currentIndex].title} className="rounded-lg shadow-md" />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-serif font-semibold mb-4 text-mystic-brown">{services[currentIndex].title}</h3>
                  <p className="text-mystic-brown/80 mb-6">{services[currentIndex].description}</p>
                  <Button className="bg-sunburst-yellow text-mystic-brown hover:bg-sunburst-yellow-light">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-mystic-brown hover:text-sunburst-yellow"
          onClick={prevService}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-mystic-brown hover:text-sunburst-yellow"
          onClick={nextService}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  )
}

