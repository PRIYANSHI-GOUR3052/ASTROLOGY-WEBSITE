'use client';

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/useLanguage'
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
  titleKey: "hero.largeArticleCard.title",
  descriptionKey: "hero.largeArticleCard.description",
  authorKey: "hero.largeArticleCard.author",
  dateKey: "hero.largeArticleCard.date",
};

const coffeeArticleCardContent = {
  titleKey: "hero.coffeeArticleCard.title",
  authorKey: "hero.coffeeArticleCard.author",
  dateKey: "hero.coffeeArticleCard.date",
};

const videoCardContent = {
  titleKey: "hero.videoCard.title",
  views: "80,989",
};

const profileCardContent = {
  nameKey: "hero.profileCard.name",
  titleKey: "hero.profileCard.title",
  stats: [
    { labelKey: "hero.profileCard.stats.readings", value: "34" },
    { labelKey: "hero.profileCard.stats.clients", value: "980" },
    { labelKey: "hero.profileCard.stats.rating", value: "4.9" },
  ],
};

const categories = [
  { icon: Circle, labelKey: "hero.categories.nakshatras" },
  { icon: Briefcase, labelKey: "hero.categories.horoscopes" },
  { icon: Play, labelKey: "hero.categories.remedies" },
  { icon: BookOpen, labelKey: "hero.categories.vedicTexts" },
  { icon: HeartPulse, labelKey: "hero.categories.astroWellness" },
];

const searchTags = [
  { key: "hero.searchTags.predictive" },
  { key: "hero.searchTags.compatibility" },
  { key: "hero.searchTags.transits" },
  { key: "hero.searchTags.remedies" },
  { key: "hero.searchTags.dasha" },
];

// Updated data for corner cards with final CSS positions
const cornerCards = [
  {
    final_top: '5rem', final_left: '2.5rem', final_right: 'auto', final_bottom: 'auto',
    rotation: -12,
    gradient: "from-blue-500 to-purple-600",
    tagKey: "hero.corner_cards.0.tag",
    titleKey: "hero.corner_cards.0.title",
    subtextKey: "hero.corner_cards.0.subtext",
    link: "/services/astrology",
    linkTextKey: "hero.corner_cards.0.linkText",
  },
  {
    final_top: '5rem', final_left: 'auto', final_right: '2.5rem', final_bottom: 'auto',
    rotation: 10,
    gradient: "from-purple-500 to-indigo-600",
    tagKey: "hero.corner_cards.1.tag",
    titleKey: "hero.corner_cards.1.title",
    subtextKey: "hero.corner_cards.1.subtext",
    link: "/services/career-guidance",
    linkTextKey: "hero.corner_cards.1.linkText",
  },
  {
    final_top: 'auto', final_left: '2.5rem', final_right: 'auto', final_bottom: '7rem',
    rotation: 15,
    gradient: "from-pink-500 to-orange-500",
    tagKey: "hero.corner_cards.2.tag",
    titleKey: "hero.corner_cards.2.title",
    subtextKey: "hero.corner_cards.2.subtext",
    link: "/blog/understanding-vedic-astrology",
    linkTextKey: "hero.corner_cards.2.linkText",
  },
  {
    final_top: 'auto', final_left: 'auto', final_right: '2.5rem', final_bottom: '7rem',
    rotation: -8,
    gradient: "from-teal-400 to-green-500",
    tagKey: "hero.corner_cards.3.tag",
    titleKey: "hero.corner_cards.3.title",
    subtextKey: "hero.corner_cards.3.subtext",
    link: "/blog/the-influence-of-planets",
    linkTextKey: "hero.corner_cards.3.linkText",
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

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="relative bg-gradient-to-b from-[#F3E8FF] to-[#FFFFFF] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Floating Background */}
      <FloatingElements />
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <Image 
          src="/images/hero-bg-1.jpg" 
          alt={t('hero.bgAlt')} 
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
            key={card.titleKey}
            custom={{ ...card, i }}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover={{ y: -10, scale: 1.05, rotate: card.rotation > 0 ? card.rotation - 3 : card.rotation + 3 }}
            className={`absolute z-20 w-72 p-6 rounded-2xl shadow-2xl bg-gradient-to-br ${card.gradient} text-white border border-white/20 hidden lg:block`}
          >
            <motion.div animate={floatingAnimation(i)}>
              <div className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2">{t(card.tagKey)}</div>
              <h3 className="text-lg font-bold text-white mb-2 leading-tight">{t(card.titleKey)}</h3>
              <p className="text-sm text-white/70 mb-4">{t(card.subtextKey)}</p>
              <Link href={card.link} className="text-sm font-semibold text-white hover:text-white/80 transition-colors flex items-center gap-1">
                {t(card.linkTextKey)}
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