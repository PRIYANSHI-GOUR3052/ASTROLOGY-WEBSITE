'use client'

import { GraduationCap, Heart, Activity, Briefcase, Users, Baby } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../contexts/useLanguage'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CTASection } from './CTASection'

const solutions = [
  {
    icon: <GraduationCap className="w-12 h-12 text-black" />,
    titleKey: "lifeChangingSolutions.solutions.0.title",
    href: "/services/career-guidance",
    descriptionKey: "lifeChangingSolutions.solutions.0.description",
    themeColor: '#e0e7ff', // Light blue
    imageUrl: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-1_lwqxsr.jpg"
  },
  {
    icon: <Heart className="w-12 h-12 text-black" />,
    titleKey: "lifeChangingSolutions.solutions.1.title",
    href: "/services/love-relationship",
    descriptionKey: "lifeChangingSolutions.solutions.1.description",
    themeColor: '#ffe0e0', // Light red
    imageUrl: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-2_ribcdu.jpg"
  },
  {
    icon: <Activity className="w-12 h-12 text-black" />,
    titleKey: "lifeChangingSolutions.solutions.2.title",
    href: "/services/health-astrology",
    descriptionKey: "lifeChangingSolutions.solutions.2.description",
    themeColor: '#e6ffe0', // Light green
    imageUrl: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-3_h9xwl3.jpg"
  },
  {
    icon: <Briefcase className="w-12 h-12 text-black" />,
    titleKey: "lifeChangingSolutions.solutions.3.title",
    href: "/services/business-astrology",
    descriptionKey: "lifeChangingSolutions.solutions.3.description",
    themeColor: '#fff5e0', // Light orange
    imageUrl: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042873/course-4_vkpzzg.jpg"
  },
  {
    icon: <Users className="w-12 h-12 text-black" />,
    titleKey: "lifeChangingSolutions.solutions.4.title",
    href: "/kundali-matching",
    descriptionKey: "lifeChangingSolutions.solutions.4.description",
    themeColor: '#e0e0ff', // Light purple
    imageUrl : "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042874/course-5_uvm6d2.jpg"
  },
  {
    icon: <Baby className="w-12 h-12 text-black" />,
    titleKey: "lifeChangingSolutions.solutions.5.title",
    href: "/services/child-astrology",
    descriptionKey: "lifeChangingSolutions.solutions.5.description",
    themeColor: '#e0ffea', // Light aqua
    imageUrl : "https://res.cloudinary.com/dxwspucxw/image/upload/v1752047576/course-6_mpzxwv.jpg"
  }
]

// Helper function for safe language access
function getLocalizedText(obj: { en: string; hi: string }, lang: string) {
  return obj[lang as keyof typeof obj] ?? obj['en'];
}

export function LifeChangingSolutions() {
  const { t } = useLanguage();
  const router = useRouter();

  const scrollToContact = () => {
    router.push('/contact');
  };

  return (
    <section className="py-16 bg-white text-black font-sans">
      <div className="container mx-auto px-4">
        {/* Banner Section */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-10 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">
            {t('lifeChangingSolutions.bannerTitle')}
          </h2>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">
            {t('lifeChangingSolutions.bannerDescription')}
          </p>
        </div>
        {/* Main Solutions Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Link href={solution.href} key={index} className="block h-full">
                <motion.div
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 h-full flex flex-col"
                  whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.98, rotate: 0 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`relative h-48 w-full ` + (solution.themeColor ? `bg-[${solution.themeColor}]` : 'bg-gray-200')}>
                    <Image
                      src={solution.imageUrl}
                      alt={t(solution.titleKey)}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-extrabold mb-2 text-black">{t(solution.titleKey)}</h3>
                    <p className="text-base text-black mb-4 leading-tight tracking-wide font-serif flex-grow">
                      {t(solution.descriptionKey)}
                    </p>
                  </CardContent>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Explore More Astrological Insights Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black">{t('lifeChangingSolutions.exploreMoreTitle')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Continue Learning Content Card */}
            <motion.div
              className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 ease-in-out transform hover:scale-105 h-full"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.98, rotate: 0 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative h-48 md:h-auto md:w-1/2 w-full bg-gray-200">
                <Image 
                  src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042871/continue-learning_mtpgqr.jpg"
                  alt={t('lifeChangingSolutions.continueLearningAlt')}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <CardContent className="p-6 md:w-1/2 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black">{t('lifeChangingSolutions.continueLearningTitle')}</h3>
                  <p className="text-base text-gray-700 mb-4 leading-relaxed tracking-wide font-serif">
                    {t('lifeChangingSolutions.continueLearningDescription')}
                    <br />
                    Explore guides on birth charts, planetary influences, and practical remedies.<br />
                    Access exclusive articles, video lessons, and tools to help you unlock the wisdom of the stars.
                  </p>
                </div>
                <div className="flex items-end flex-1">
                  <Link href="/study" passHref>
                    <button
                      className="bg-black text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 border border-[#E0E0E0] transition-all duration-300 transform hover:scale-105 mt-2"
                    >
                      {t('lifeChangingSolutions.exploreMoreButton')}
                    </button>
                  </Link>
                </div>
              </CardContent>
            </motion.div>

            {/* CTA Section Card (replaces Book Your Call Now!) */}
            <div className="flex items-end w-full h-full"><CTASection /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
