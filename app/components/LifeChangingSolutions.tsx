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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Continue Learning Content Card */}
            <motion.div
              className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 ease-in-out transform hover:scale-105"
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
              <CardContent className="p-6 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2 text-black">{t('lifeChangingSolutions.continueLearningTitle')}</h3>
                <p className="text-base text-gray-700 mb-4 leading-relaxed tracking-wide font-serif">{t('lifeChangingSolutions.continueLearningDescription')}</p>
              </CardContent>
            </motion.div>

            {/* Book Your Call Now! Card */}
            <motion.div
              className="bg-[#F5F2ED] rounded-xl shadow-xl p-6 flex flex-col justify-between items-center text-center relative overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05, y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
              whileTap={{ scale: 0.98, rotate: 0 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-[#D4C7B5] opacity-70"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
              <div className="absolute top-6 right-6 text-[#D4C7B5] opacity-70"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
              <div className="absolute bottom-4 left-4 text-[#D4C7B5] opacity-70"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
              <div className="absolute bottom-6 right-6 text-[#D4C7B5] opacity-70"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>

              <h3 className="text-3xl font-bold mb-6 text-black relative z-10">{t('lifeChangingSolutions.bookCallTitle')}</h3>
              <p className="text-gray-600 mb-6 text-center max-w-sm relative z-10">{t('lifeChangingSolutions.bookCallDescription')}</p>
              <motion.button
                onClick={scrollToContact}
                className="bg-[#F3E8FF] text-[#7C3AED] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#E0F2FE] hover:text-[#FBBF24] border border-[#E0E0E0] transition-all duration-300 transform hover:scale-105 relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('lifeChangingSolutions.goToContact')}
              </motion.button>
            </motion.div>

            <motion.div
              className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-xl flex flex-col items-center text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-black relative z-10">{t('lifeChangingSolutions.progressTitle')}</h3>
              <p className="text-gray-600 mb-6 text-center max-w-sm relative z-10">{t('lifeChangingSolutions.progressDescription')}</p>
              <Link href="/blog" passHref>
                <motion.button
                  className="bg-[#F3E8FF] text-[#7C3AED] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#E0F2FE] hover:text-[#FBBF24] border border-[#E0E0E0] transition-all duration-300 transform hover:scale-105 relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('lifeChangingSolutions.exploreMoreButton')}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
