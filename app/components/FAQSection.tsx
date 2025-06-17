'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle, Shield, CreditCard, Truck } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    question: "What is Vedic astrology and how does it differ from Western astrology?",
    answer: "Vedic astrology, also known as Jyotish, is an ancient Indian system of astrology that uses the sidereal zodiac, while Western astrology uses the tropical zodiac. Vedic astrology places more emphasis on the moon sign and incorporates additional factors like dashas (planetary periods) in its analysis.",
    icon: "HelpCircle"
  },
  {
    question: "How often should I consult an astrologer?",
    answer: "The frequency of consultations depends on individual needs and circumstances. Some people consult annually for a general overview, while others may seek guidance during significant life events or transitions. We recommend at least one comprehensive reading per year, with follow-up consultations as needed.",
    icon: "Shield"
  },
  {
    question: "Can astrology predict the future with 100% accuracy?",
    answer: "While astrology can provide valuable insights and potential outcomes, it's important to understand that the future is not set in stone. Astrology offers guidance and highlights tendencies, but free will and personal choices play a significant role in shaping one's future.",
    icon: "CreditCard"
  },
  {
    question: "What information do I need to provide for an accurate astrological reading?",
    answer: "For a precise astrological reading, we typically require your date of birth, exact time of birth, and place of birth. The more accurate this information is, the more detailed and personalized your reading can be.",
    icon: "Truck"
  }
]

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const IconComponent = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
      case "HelpCircle":
        return <HelpCircle className="w-6 h-6 text-white" />;
      case "Shield":
        return <Shield className="w-6 h-6 text-white" />;
      case "CreditCard":
        return <CreditCard className="w-6 h-6 text-white" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  return (
    <section className="mb-16 bg-white py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#f4ebe6] rounded-full p-4 mb-4">
            <HelpCircle className="w-8 h-8 text-[#fe7b57]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-[#343d48] text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center text-lg">
            Find answers to common questions about our service. Can't find
            what you're looking for? <Link href="#" className="text-[#fe7b57] font-semibold hover:underline">Contact our support team.</Link>
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={false}
              animate={{ backgroundColor: activeIndex === index ? '#fff' : '#fff' }}
              whileHover={{ scale: 1.01, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.99 }}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out"
            >
              <button
                className="flex items-center w-full p-4 text-left focus:outline-none"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <motion.div
                  className="flex-shrink-0 bg-[#fe7b57] rounded-lg p-2 mr-4"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  animate={{
                    rotate: [0, -5, 5, -5, 5, 0],
                    transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }
                  }}
                >
                  <IconComponent iconName={faq.icon} />
                </motion.div>
                <span className="flex-grow text-lg font-medium text-[#343d48]">{faq.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#fe7b57]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#fe7b57]" />
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
                    <div className="border-t border-gray-200 ml-16 pr-4 py-4 text-gray-700">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

