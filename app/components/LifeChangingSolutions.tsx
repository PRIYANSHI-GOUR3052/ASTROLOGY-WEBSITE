'use client'

import { GraduationCap, Heart, Activity, Briefcase, Users, Baby } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const solutions = [
  {
    icon: <GraduationCap className="w-12 h-12 text-black" />,
    title: { hi: "करियर (Career)", en: "Career" },
    href: "/services/career-guidance",
    description: {
      hi: "छात्रों को परीक्षाओं के बाद क्या करना है, नौकरियों और भविष्य के बारे में जानने की जरूरत होती है। ज्योतिषी अरुण जी आपकी जन्म कुंडली का विश्लेषण करके सही करियर चुनने में मदद करेंगे।",
      en: "Many students get confused about what to do after exams, jobs, and the future. Talk to astrologer Arun ji who can assist you in making the right career choices by analyzing your birth chart."
    },
    themeColor: '#e0e7ff' // Light blue
  },
  {
    icon: <Heart className="w-12 h-12 text-black" />,
    title: { hi: "प्रेम और रिश्ते (Love & Relationship)", en: "Love & Relationship" },
    href: "/services/love-relationship",
    description: {
      hi: "अपने साथी के साथ सर्वश्रेष्ठ प्रेम राशिफल संगतता की तलाश में हैं? एक परामर्श कॉल आपके रिश्ते की संभावनाओं को उजागर कर सकती है।",
      en: "Looking for the best love horoscope compatibility with your partner? One counseling call can reveal the potential of your relationship."
    },
    themeColor: '#ffe0e0' // Light red
  },
  {
    icon: <Activity className="w-12 h-12 text-black" />,
    title: { hi: "स्वास्थ्य (Health)", en: "Health" },
    href: "/services/health-astrology",
    description: {
      hi: "वैदिक ज्योतिष भविष्यवाणियां स्वास्थ्य समस्याओं की पूर्व सूचना दे सकती हैं। शीघ्र परामर्श के लिए ज्योतिषी से बात करें।",
      en: "Vedic astrology predictions can forecast health issues before they appear. Seek early consultation by talking to the astrologer."
    },
    themeColor: '#e6ffe0' // Light green
  },
  {
    icon: <Briefcase className="w-12 h-12 text-black" />,
    title: { hi: "व्यापार (Business)", en: "Business" },
    href: "/services/business-astrology",
    description: {
      hi: "व्यापार शुरू करते समय या बड़े निर्णय लेते समय, ज्योतिष से सटीक मार्गदर्शन महत्वपूर्ण है। एक ज्योतिषी से परामर्श आपकी व्यावसायिक समस्याओं को हल कर सकता है।",
      en: "When starting a business or facing big choices, getting accurate insights from astrology is important. Consulting an astrologer can help solve your business problems."
    },
    themeColor: '#fff5e0' // Light orange
  },
  {
    icon: <Users className="w-12 h-12 text-black" />,
    title: { hi: "विवाह (Marriage)", en: "Marriage" },
    href: "/kundali-matching",
    description: {
      hi: "भारत में विवाह के लिए कुंडली मिलान की प्रथा बहुत महत्वपूर्ण है। गुण मिलान, मंगल दोष और संगतता विश्लेषण प्राप्त करें।",
      en: "In India, the practice of Kundli Milan for marriage is very important. Get Gun Milan, Mangal Dosha, & compatibility analysis."
    },
    themeColor: '#e0e0ff' // Light purple
  },
  {
    icon: <Baby className="w-12 h-12 text-black" />,
    title: { hi: "संतान (Child)", en: "Child" },
    href: "/services/child-astrology",
    description: {
      hi: "प्राचीन भारतीय वैदिक ज्योतिष दोनों साथियों की कुंडली का परीक्षण करता है, विशेष रूप से बच्चों के बारे में जानने के इच्छुक लोगों के लिए। ज्योतिषी आपको संतान से संबंधित समस्याओं के लिए सटीक समाधान प्रदान करेंगे।",
      en: "The ancient Indian Vedic astrology examines the horoscopes of both partners, especially for those interested in knowing about children. The astrologer will provide accurate solutions for issues related to childbirth."
    },
    themeColor: '#e0ffea' // Light aqua
  }
]

// Helper function for safe language access
function getLocalizedText(obj: { en: string; hi: string }, lang: string) {
  return obj[lang as keyof typeof obj] ?? obj['en'];
}

export function LifeChangingSolutions() {
  const { lang } = useLanguage();
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
            {lang === 'hi' ? 'एक कॉल में जीवन बदलने वाले समाधान' : 'Best Life Changing Solutions In Just One Call'}
          </h2>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">
            {lang === 'hi'
              ? 'छात्रों, प्रेम, स्वास्थ्य, व्यापार, विवाह, और संतान से जुड़े सभी सवालों के लिए ज्योतिषीय समाधान पाएं।'
              : 'Get astrological solutions for all your questions related to career, love, health, business, marriage, and children.'}
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
                      src={`/images/course-${index + 1}.webp`}
                      alt={getLocalizedText(solution.title, lang)}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-extrabold mb-2 text-black">{getLocalizedText(solution.title, lang)}</h3>
                    <p className="text-base text-black mb-4 leading-tight tracking-wide font-serif flex-grow">
                      {getLocalizedText(solution.description, lang)}
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black">{lang === 'hi' ? 'और ज्योतिषीय अंतर्दृष्टि का अन्वेषण करें' : 'Explore More Astrological Insights'}</h2>
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
                  src="/images/continue-learning.webp"
                  alt={lang === 'hi' ? 'ज्योतिषीय यात्रा जारी रखें' : 'Continue Astrological Journey'}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <CardContent className="p-6 md:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-2 text-black">{lang === 'hi' ? 'अपनी ज्योतिषीय समझ को गहरा करें' : 'Deepen Your Astrological Understanding'}</h3>
                <p className="text-base text-gray-700 mb-4 leading-relaxed tracking-wide font-serif">{lang === 'hi' ? 'प्राचीन ज्योतिषीय सिद्धांतों और उनके आधुनिक अनुप्रयोगों में गोता लगाएँ। हमारे व्यापक संसाधनों के साथ अपनी आध्यात्मिक यात्रा को आगे बढ़ाएँ।' : 'Dive deeper into ancient astrological principles and their modern applications. Advance your spiritual journey with our comprehensive resources.'}</p>
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

              <h3 className="text-3xl font-bold mb-6 text-black relative z-10">{lang === 'hi' ? 'अभी कॉल बुक करें!' : 'Book Your Call Now!'}</h3>
              <p className="text-gray-600 mb-6 text-center max-w-sm relative z-10">{lang === 'hi' ? 'व्यक्तिगत ज्योतिषीय मार्गदर्शन और समाधान के लिए हमारे विशेषज्ञों के साथ एक विशेष परामर्श बुक करें।' : 'Book a personalized consultation with our experts for astrological guidance and solutions.'}</p>
              <motion.button
                onClick={scrollToContact}
                className="bg-[#F3E8FF] text-[#7C3AED] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#E0F2FE] hover:text-[#FBBF24] border border-[#E0E0E0] transition-all duration-300 transform hover:scale-105 relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {lang === 'hi' ? 'संपर्क फ़ॉर्म पर जाएं' : 'Go to Contact Form'}
              </motion.button>
            </motion.div>

            <motion.div
              className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 shadow-xl flex flex-col items-center text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <h3 className="text-3xl font-bold mb-6 text-black relative z-10">{lang === 'hi' ? 'ज्योतिषीय यात्रा में प्रगति' : 'Progress in Astrological Journey'}</h3>
              <p className="text-gray-600 mb-6 text-center max-w-sm relative z-10">{lang === 'hi' ? 'अपनी ज्योतिषीय शिक्षा और अंतर्दृष्टि को गहरा करते रहें। हमारे व्यापक संसाधनों के साथ अपनी आध्यात्मिक यात्रा को आगे बढ़ाएँ।' : 'Dive deeper into ancient astrological principles and their modern applications. Advance your spiritual journey with our comprehensive resources.'}</p>
              <Link href="/blog" passHref>
                <motion.button
                  className="bg-[#F3E8FF] text-[#7C3AED] font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-[#E0F2FE] hover:text-[#FBBF24] border border-[#E0E0E0] transition-all duration-300 transform hover:scale-105 relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {lang === 'hi' ? 'और ज्योतिषीय अंतर्दृष्टि खोजें' : 'Explore More Astrological Insights'}
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
