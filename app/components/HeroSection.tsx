'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Share2, Search, MessageCircle, UserPlus,
  ChevronLeft, ChevronRight, Maximize, RotateCcw,
  Circle, Briefcase, Play, BookOpen, HeartPulse, ArrowRight, // Icons for categories
  Star, Moon, Sun, Sparkles, Heart, Calendar, Gem, Home, GraduationCap // New icons
} from 'lucide-react'
// import { pastelColors } from '@/app/components/Testimonials' // Keep commented out as cardGradients are now used
import { ZodiacWheel } from './ZodiacWheel'
import ArcCarousel from './ArcCarousel'
import CardStack from './CardStack'
import { useEffect, useState } from 'react'

// Define some soft gradients for cards
const cardGradients = [
  "from-purple-100 via-pink-100 to-red-100", // Brighter, cuter
  "from-green-100 via-yellow-100 to-lime-100", // Another vibrant combo
  "from-blue-100 via-cyan-100 to-indigo-100",
  "from-orange-100 via-amber-100 to-yellow-100",
  "from-fuchsia-100 via-rose-100 to-purple-100",
  "from-teal-100 via-emerald-100 to-blue-100",
];

// Content constants
const largeArticleCardContent = {
  image: "https://via.placeholder.com/400x250/A6B7C3/FFFFFF?text=Astrology+Insight", // Placeholder for lamp image
  title: {
    en: "Nakshatra Gyaan",
    hi: "नक्षत्र ज्ञान",
  },
  description: {
    en: "Discover Your Celestial Path. Unlock the secrets of the cosmos and find your life's purpose through our spiritual services and expert guidance.",
    hi: "अपना आकाशीय मार्ग खोजें। हमारी आध्यात्मिक सेवाओं और विशेषज्ञ मार्गदर्शन के माध्यम से ब्रह्मांड के रहस्यों को अनलॉक करें और अपने जीवन का उद्देश्य खोजें।",
  },
  author: { en: "Dr. Narendra Kumar Sharma", hi: "डॉ. नरेंद्र कुमार शर्मा" },
  date: { en: "Jul 15, 2024", hi: "जुलाई 15, 2024" },
};

const coffeeArticleCardContent = {
  // image: "https://via.placeholder.com/150/A6B7C3/FFFFFF?text=Cosmic+Coffee", // Placeholder for coffee image
  title: {
    en: "The Astrological Significance of Daily Rituals",
    hi: "दैनिक अनुष्ठानों का ज्योतिषीय महत्व",
  },
  author: { en: "Priya Singh", hi: "प्रिया सिंह" },
  // authorImage: "https://via.placeholder.com/30/C4D1D9/FFFFFF?text=PS",
  date: { en: "Jul 10, 2024", hi: "जुलाई 10, 2024" },
};

const videoCardContent = {
  // image: "https://via.placeholder.com/200x120/A6B7C3/FFFFFF?text=Nakshatra+Film", // Placeholder for building image
  title: { en: "An Inspiring Short Film: Journey Through Nakshatras", hi: "एक प्रेरणादायक लघु फिल्म: नक्षत्रों के माध्यम से यात्रा" },
  views: "80,989",
};

const profileCardContent = {
  // image: "https://via.placeholder.com/80/C4D1D9/FFFFFF?text=AG", // Placeholder for Alex's image
  name: { en: "Dr. Narendra Kumar Sharma", hi: "डॉ. नरेंद्र कुमार शर्मा" }, // Changed name
  title: { en: "Vedic Astrologer", hi: "वैदिक ज्योतिषी" },
  stats: [
    { label: { en: "Readings", hi: "पठन" }, value: "34" },
    { label: { en: "Clients", hi: "ग्राहक" }, value: "980" },
    { label: { en: "Rating", hi: "रेटिंग" }, value: "4.9" },
  ],
};

const categories = [
  { icon: Circle, label: { en: "Nakshatras", hi: "नक्षत्र" } },
  { icon: Briefcase, label: { en: "Horoscopes", hi: "राशिफल" } },
  { icon: Play, label: { en: "Remedies", hi: "उपाय" } },
  { icon: BookOpen, label: { en: "Vedic Texts", hi: "वैदिक ग्रंथ" } },
  { icon: HeartPulse, label: { en: "Astro-Wellness", hi: "ज्योतिष-कल्याण" } },
];

const searchTags = [
  { en: "Predictive", hi: "भविष्यवाचक" },
  { en: "Compatibility", hi: "संगतता" },
  { en: "Transits", hi: "गोचर" },
  { en: "Remedies", hi: "उपाय" },
  { en: "Dasha", hi: "दशा" },
];

// Updated data for corner cards with final CSS positions
const cornerCards = [
  {
    final_top: '5rem', final_left: '2.5rem', final_right: 'auto', final_bottom: 'auto',
    rotation: -12,
    gradient: "from-blue-500 to-purple-600",
    tag: "Expert Consultation",
    title: "Professional astrological guidance",
    subtext: "Available worldwide",
    link: "/services/astrology",
    linkText: "Book now",
  },
  {
    final_top: '5rem', final_left: 'auto', final_right: '2.5rem', final_bottom: 'auto',
    rotation: 10,
    gradient: "from-purple-500 to-indigo-600",
    tag: "Career Astrology",
    title: "Align your career with the stars",
    subtext: "Find your true calling",
    link: "/services/career-guidance",
    linkText: "Explore paths",
  },
  {
    final_top: 'auto', final_left: '2.5rem', final_right: 'auto', final_bottom: '7rem',
    rotation: 15,
    gradient: "from-pink-500 to-orange-500",
    tag: "Astrology & Culture",
    title: "The mystical art of celestial guidance",
    subtext: "Read in 5 mins",
    link: "/blog/understanding-vedic-astrology",
    linkText: "Read more",
  },
  {
    final_top: 'auto', final_left: 'auto', final_right: '2.5rem', final_bottom: '7rem',
    rotation: -8,
    gradient: "from-teal-400 to-green-500",
    tag: "Cosmic Insights",
    title: "The importance of planetary alignment",
    subtext: "Read in 8 mins",
    link: "/blog/the-influence-of-planets",
    linkText: "Read more",
  },
];

// New variants for the "flower opening" animation
const cardVariants = {
  initial: (i: number) => ({
    top: '50%',
    left: '50%',
    translateX: '-50%',
    translateY: '-50%',
    opacity: 0,
    rotate: 0,
  }),
  animate: (cardData: any) => ({
    top: cardData.final_top,
    left: cardData.final_left,
    right: cardData.final_right,
    bottom: cardData.final_bottom,
    translateX: '0%',
    translateY: '0%',
    opacity: 1,
    rotate: cardData.rotation,
    transition: {
      delay: cardData.i * 0.18 + 0.7,
      type: "spring",
      stiffness: 38,
      damping: 16,
      mass: 0.9,
      bounce: 0.22,
      opacity: { duration: 0.5 },
    },
  }),
};

const floatingAnimation = (i: number) => ({
  y: ["-6px", "6px"],
  transition: {
    delay: i * 0.5,
    duration: 3 + i * 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  },
});

// Floating background elements (from BreastCancerApp, adapted for Next.js/TS)
function FloatingElements() {
  const [floatingElements, setFloatingElements] = useState<any[]>([]);

  useEffect(() => {
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5
    }));
    setFloatingElements(elements);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute rounded-full opacity-20 animate-float"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.x}%`,
            top: `${element.y}%`,
            background: `linear-gradient(45deg, 
              ${element.id % 3 === 0 ? '#fbbf24, #f59e0b' : 
                element.id % 3 === 1 ? '#ec4899, #be185d' : 
                '#8b5cf6, #7c3aed'})`,
            animationDuration: `${element.duration}s`,
            animationDelay: `${element.delay}s`
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-[#F3E8FF] to-[#FFFFFF] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Floating Background */}
      <FloatingElements />
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <Image 
          src="/images/hero-bg-1.jpg" 
          alt="Cosmic background" 
          layout="fill" 
          objectFit="cover" 
          className="animate-pulse-slow"
        />
      </div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      {/* Corner Cards */}
      <AnimatePresence>
        {cornerCards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={{ ...card, i }}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover={{ y: -10, scale: 1.05, rotate: card.rotation > 0 ? card.rotation - 3 : card.rotation + 3 }}
            className={`absolute z-20 w-72 p-6 rounded-2xl shadow-2xl bg-gradient-to-br ${card.gradient} text-white border border-white/20 hidden lg:block`}
          >
            <motion.div animate={floatingAnimation(i)}>
              <div className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">{card.tag}</div>
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">{card.title}</h3>
              <p className="text-sm text-white/70 mb-4">{card.subtext}</p>
              <Link href={card.link} className="text-sm font-semibold text-white hover:text-white/80 transition-colors flex items-center gap-1">
                {card.linkText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 px-4"
      >
        {/* Soft background circle behind card */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[340px] bg-purple-200 rounded-full blur-2xl opacity-40 -z-10" />
        <div
          className="mx-auto my-8 max-w-4xl w-full -rotate-3"
          style={{
            borderRadius: '2.8rem',
            background: 'linear-gradient(135deg, #fbbf24, #be185d, #8b5cf6, #7c3aed)',
            padding: '5px',
            boxShadow: '0 18px 56px 0 rgba(80,0,80,0.18)',
          }}
        >
          <div
            className="bg-white/90 w-full h-full flex flex-col items-center justify-center px-12 py-14"
            style={{
              minHeight: '200px',
              borderRadius: '2.5rem',
            }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-800 mb-4">
              {t('hero.mainHeading')}
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mx-auto mb-8">
              {t('hero.subHeading')}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">
              <a href="/kundali-matching" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300">
                {t('hero.ctaButton')}
              </a>
              <p className="text-gray-600 font-medium mt-2 md:mt-0 whitespace-nowrap">{t('hero.secondaryText')}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
