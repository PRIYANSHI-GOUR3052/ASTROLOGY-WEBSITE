'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "What is Vedic astrology and how does it differ from Western astrology?",
    answer: "Vedic astrology, also known as Jyotish, is an ancient Indian system of astrology that uses the sidereal zodiac, while Western astrology uses the tropical zodiac. Vedic astrology places more emphasis on the moon sign and incorporates additional factors like dashas (planetary periods) in its analysis."
  },
  {
    question: "How often should I consult an astrologer?",
    answer: "The frequency of consultations depends on individual needs and circumstances. Some people consult annually for a general overview, while others may seek guidance during significant life events or transitions. We recommend at least one comprehensive reading per year, with follow-up consultations as needed."
  },
  {
    question: "Can astrology predict the future with 100% accuracy?",
    answer: "While astrology can provide valuable insights and potential outcomes, it's important to understand that the future is not set in stone. Astrology offers guidance and highlights tendencies, but free will and personal choices play a significant role in shaping one's future."
  },
  {
    question: "What information do I need to provide for an accurate astrological reading?",
    answer: "For a precise astrological reading, we typically require your date of birth, exact time of birth, and place of birth. The more accurate this information is, the more detailed and personalized your reading can be."
  }
]

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-mystic-brown">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{ backgroundColor: activeIndex === index ? 'rgba(255, 255, 240, 0.1)' : 'rgba(255, 255, 240, 0.05)' }}
            className="border border-sunburst-yellow rounded-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span className="text-lg font-medium text-mystic-brown">{faq.question}</span>
              {activeIndex === index ? (
                <ChevronUp className="w-5 h-5 text-sunburst-yellow" />
              ) : (
                <ChevronDown className="w-5 h-5 text-sunburst-yellow" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: "auto" },
                    collapsed: { opacity: 0, height: 0 }
                  }}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="p-4 text-mystic-brown/80">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

