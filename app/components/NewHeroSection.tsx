'use client';

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Star, Calendar, Gem, BookOpen, HeartPulse } from 'lucide-react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatedStars } from './AnimatedStars'
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Marquee from 'react-fast-marquee';
import { useLanguage } from '../contexts/useLanguage';

const cardData = [
  {
    title: 'Career & Job Guidance',
    description: 'Navigate your professional path with cosmic clarity. Our expert astrologers provide personalized guidance to help you make informed career decisions, identify opportunities, and overcome workplace challenges.',
    icon: null,
    href: '/services/career-guidance',
  },
  {
    title: 'Grah Shanti Puja',
    description: 'Harmonize planetary energies and mitigate negative influences with a traditional Grah Shanti Puja. This sacred ritual is performed to bring peace, prosperity, and balance to your life.',
    icon: null,
    href: '/services/grah-shanti',
  },
  {
    title: 'Kundali Matching',
    description: 'Discover the science and sacred art of Vedic compatibility. Our expert astrologers blend tradition and modern insight to guide you toward a harmonious, blessed union.',
    icon: null,
    href: '/kundali-matching',
  },
  {
    title: 'Numerology Analysis',
    description: 'Discover the power of numbers in your life with personalized numerology reading.',
    icon: null,
    href: '/services/numerology',
  },
  {
    title: 'Online Puja Services',
    description: 'Experience the sacred power of Vedic rituals from the comfort of your home. Our online puja services connect you with expert priests, authentic traditions, and divine blessings—no matter where you are in the world.',
    icon: null,
    href: '/online-puja',
  },
  {
    title: 'Palmistry Consultation',
    description: 'Unlock the secrets hidden in your hands. Our palmistry experts provide insightful readings on your life path, character, and future.',
    icon: null,
    href: '/study/palmistry',
  },
  {
    title: "Today's Panchang",
    description: 'Your daily Vedic almanac for cosmic alignment, auspicious timings, and spiritual clarity. Discover the five limbs of time, planetary positions, and sacred rituals to harmonize your day with the universe.',
    icon: null,
    href: '/panchang',
  },
  {
    title: 'Personal Astrology Reading',
    description: 'Our personal astrology reading service offers an in-depth analysis of your natal chart, providing insights into your personality, life path, career, relationships, and more.',
    icon: null,
    href: '/services/personal-reading',
  },
  {
    title: 'Tantra Consultation',
    description: 'Explore the transformative path of Tantra with expert guidance. Our consultations focus on spiritual growth, healing, and meditation practices.',
    icon: null,
    href: '/services/tantra',
  },
  {
    title: 'Tarot Reading',
    description: "Unlock the mystical secrets of the cards and gain profound insight into your life's journey.",
    icon: null,
    href: '/services/tarot-reading',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const allGridImages = [
  { src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/birth_chart_mockup_beesbo.jpg', alt: 'Birth Chart Analysis' },
  { src: '/images/horoscope_daily.jpg', alt: 'Daily Horoscope' },
  { src: '/images/astrology_app_mockup.jpg', alt: 'Astrology Consultation' },
  { src: '/images/tarot-banner.jpg', alt: 'Tarot Reading' },
  { src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752049127/gemstones_wztxzb.jpg', alt: 'Gemstone Powers' },
  { src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752049128/planets_aeujo5.jpg', alt: 'Planetary Influence' },
  { src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-1_lwqxsr.jpg', alt: 'Astrology Course' },
  { src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-3_h9xwl3.jpg', alt: 'Numerology Course' },
];

const illustrationsData = [
  { size: 60, top: '15%', left: '5%', rotate: 180, path: 'M50 0L61.2 34.5L97.5 34.5L68.1 55.9L79.4 90.5L50 69.1L20.6 90.5L31.9 55.9L2.5 34.5L38.8 34.5L50 0Z' }, // Star
  { size: 40, top: '70%', left: '10%', rotate: 90, path: 'M50,2A48,48,0,0,0,34.5,95.1A48,48,0,1,1,50,2Z' }, // Crescent Moon
  { size: 50, top: '20%', left: '85%', rotate: 270, path: 'M50 0L61.2 34.5L97.5 34.5L68.1 55.9L79.4 90.5L50 69.1L20.6 90.5L31.9 55.9L2.5 34.5L38.8 34.5L50 0Z' }, // Star
  { size: 30, top: '80%', left: '90%', rotate: 120, path: 'M50,2A48,48,0,1,0,50,98A48,48,0,0,0,50,2Zm0,88A40,40,0,1,1,90,50,40,40,0,0,1,50,90Z' }, // Ring
  { size: 25, top: '50%', left: '50%', rotate: 120, path: 'M50,2A48,48,0,1,0,50,98A48,48,0,0,0,50,2Zm0,88A40,40,0,1,1,90,50,40,40,0,0,1,50,90Z' }, // Ring
];

// Ticker content
const shloka = 'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥';
const meanings: Record<string, string> = {
  en: 'May all beings be happy. May all be free from illness. May all see what is auspicious. May none suffer in any way.',
  hi: 'सभी सुखी रहें। सभी निरोगी रहें। सभी शुभ देखें। और कोई भी दुख का भागी न बने।',
  es: 'Que todos sean felices. Que todos estén libres de enfermedad. Que todos vean lo auspicioso. Que nadie sufra de ninguna manera.',
  fr: 'Que tous soient heureux. Que tous soient exempts de maladie. Que tous voient ce qui est de bon augure. Que personne ne souffre en aucune façon.',
  de: 'Mögen alle glücklich sein. Mögen alle frei von Krankheit sein. Mögen alle das Glückliche sehen. Möge niemand auf irgendeine Weise leiden.',
  zh: '愿众生幸福。愿众生无病。愿众生见吉祥。愿无人受苦。',
  ru: 'Пусть все будут счастливы. Пусть все будут свободны от болезней. Пусть все видят благоприятное. Пусть никто не страдает.',
  ar: 'ليكن الجميع سعداء. ليكن الجميع خاليين من المرض. ليكن الجميع يرون ما هو خير. لا يعاني أحد بأي شكل من الأشكال.',
};

export default function HeroSection() {
  // Carousel images
  const images = [
    '/images/astro.jpg',
    '/images/astrology_app.jpg',
    '/images/astrowellness.jpg',
    '/images/spiritualpathway.jpg',
    '/images/myth.jpg',
    '/images/horoscopedaily.jpg',
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  const { t } = useLanguage();
  const { lang } = useLanguage();
  return (
    <>
      {/* Prominent Banner - visually bold, green gradient, with CTA, always below nav */}
      <section className="pt-28 w-full flex items-center justify-center bg-[#FEFBF2] py-7 px-4 shadow-2xl relative z-30 overflow-hidden" style={{ minHeight: '320px', minWidth: '100%' }}>
        {/* Background carousel */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          {images.map((img, idx) => (
            <img
              key={img}
              src={img}
              alt="Astrology background"
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
              style={{ transition: 'opacity 1s ease-in-out' }}
              draggable={false}
            />
          ))}
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        {/* Content on top */}
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-2">
              {t('hero.mainHeading')}
            </h2>
            <p className="text-lg md:text-xl font-bold text-white drop-shadow-sm">
              {t('hero.subHeading')}
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <Link href="/services">
              <span className="inline-block bg-[#FEFBF2] text-[#23244a] font-bold px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-amber-700 transition-colors text-xl border-2 border-[#e5e5e5] tracking-wide">
                {t('hero.ctaButton')}
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Ticker between hero and next section */}
      <div className="w-full py-6 px-2 flex items-center justify-center min-h-[72px]" style={{ background: 'linear-gradient(90deg, #f7f7fa 0%, #e9eafc 100%)', color: '#232323' }}>
        <Marquee gradient={false} speed={40} pauseOnHover={true} direction="right" className="w-full">
          <div className="flex flex-row items-center w-full gap-4">
            <div className="flex flex-col justify-center items-end min-w-[220px] mr-8">
              <span className="font-[\'Noto Serif Devanagari\',serif] text-base md:text-lg font-semibold leading-tight tracking-wide" style={{ fontFamily: 'Noto Serif Devanagari, serif', color: '#232323' }}>
                ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।
              </span>
              <span className="font-[\'Noto Serif Devanagari\',serif] text-base md:text-lg font-semibold leading-tight tracking-wide" style={{ fontFamily: 'Noto Serif Devanagari, serif', color: '#232323' }}>
                सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥
              </span>
            </div>
            <div className="flex flex-col justify-center items-start min-w-[260px] ml-8">
              <span className="font-serif text-sm md:text-base font-medium leading-tight tracking-wide italic" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#232323' }}>
                {meanings[lang]?.split('. ').slice(0,2).join('. ')}
              </span>
              <span className="font-serif text-sm md:text-base font-medium leading-tight tracking-wide italic" style={{ fontFamily: 'Cormorant Garamond, serif', color: '#232323' }}>
                {meanings[lang]?.split('. ').slice(2).join('. ')}
              </span>
            </div>
          </div>
        </Marquee>
      </div>

      {/* New AUIN-style section */}
      <section className="w-full bg-[#FEFBF2] px-2 py-9">
        {/* Heading and subtitle block */}
        <div className="max-w-3xl mx-auto text-center mb-9">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-marcellus text-center mb-2 bg-gradient-to-r from-[#23244a] via-[#23244a] to-[#77A656] bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            Celestial Journey
          </h1>
          <p className="text-xl sm:text-2xl md:text-2xl font-cormorant text-center text-[#77A656] tracking-wide italic mt-2">
            Let the stars illuminate your path to self-discovery and fulfillment.
          </p>
        </div>
        {/* Existing grid starts here */}
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Tall Card */}
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 h-full min-h-[450px] justify-between">
              <h2 className="text-xl font-bold font-marcellus text-[#23244a]">
                Cosmic Calendar
              </h2>
              <p className="text-sm text-gray-700">
                Track celestial events and align your life with the universe's
                rhythm.
              </p>
              <Link href="/panchang">
                <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752494996/A_realistic_cosmic_calendar_illustration_showing_the_planets_of_the_solar_system_orbiting_around_the_sun_with_soft_lighting_galaxy_background_visible_constellations_moon_phases_and_astrological_zodiac_symbols_s_1_uxgzjk.jpg"
                    alt="Cosmic Calendar"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </Link>
            </div>
          </div>

          {/* Center: Carousel with two small blocks below */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Carousel */}
            <div className="bg-white rounded-xl shadow overflow-hidden h-[450px]">
              <Carousel
                opts={{ loop: true, align: "center", skipSnaps: false }}
                plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
                className="w-full h-full"
              >
                <CarouselContent>
                  {[
                    {
                      img: "/images/astro.jpg",
                      title: "Your Stars Today",
                      desc: "Get real-time guidance for your zodiac sign.",
                      href: "/daily-horoscope",
                    },
                    {
                      img: "/images/spiritualpathway.jpg",
                      title: "Spiritual Cleanse",
                      desc: "Discover powerful astrology-based remedies.",
                      href: "/blog/astrology-remedies-for-life",
                    },
                    {
                      img: "/images/myth.jpg",
                      title: "Myth & Legends",
                      desc: "Learn about ancient Vedic myths and rituals.",
                      href: "/blog/vedic-myths",
                    },
                  ].map((item, i) => (
                    <CarouselItem key={i} className="p-3">
                      <Link href={item.href}>
                        <div className="rounded-xl overflow-hidden shadow bg-white hover:scale-[1.02] transition-all cursor-pointer h-[396px] flex flex-col">
                          <div className="relative h-56 w-full">
                            <Image
                              src={item.img}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="text-xl font-bold font-marcellus text-[#23244a] mb-2">
                              {item.title}
                            </h3>
                            <p className="text-sm text-gray-600 font-cormorant">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Below: Zodiac + Myth blocks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Zodiac Decoder */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
                <h2 className="text-xl font-bold font-marcellus text-[#23244a]">
                  Zodiac Decoder
                </h2>
                <p className="text-sm text-gray-700">
                  Understand your sign's traits and how they impact your life.
                </p>
                <Link href="/astrology">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042879/zodiac_decoder_aphuoz.avif"
                      alt="Zodiac Decoder"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </Link>
              </div>

              {/* Myth & Legends */}
              <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
                <h2 className="text-xl font-bold font-marcellus text-[#23244a]">
                  Myth & Legends
                </h2>
                <p className="text-sm text-gray-700">
                  Explore timeless stories that shaped astrology.
                </p>
                <Link href="/blog/astrology-remedies-for-life">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden">
                    <Image
                      src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042876/myth_h93fku.jpg"
                      alt="Myth"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Tall Card */}
          <div className="lg:col-span-3 xl:col-span-3">
            <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3 h-full min-h-[450px] justify-between">
              <h2 className="text-xl font-bold font-marcellus text-[#23244a]">
                Spiritual Growth
              </h2>
              <p className="text-sm text-gray-700">
                Elevate your journey with curated courses & rituals.
              </p>
              <Link href="/courses">
                <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752497900/A_highly_realistic_image_of_a_calm_person_meditating_in_lotus_pose_on_a_flat_rock_bathed_in_soft_golden_sunrise_light._The_background_features_misty_hills_and_subtle_spiritual_symbols_like_chakra_icons_or_Om_sign_faint_zetsen.jpg"
                    alt="Spiritual Growth"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Restore Popular Services Section below hero */}
      <motion.div 
        variants={itemVariants}
        className="w-full bg-[#F8FAF5] py-16 mt-0 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" className="absolute inset-0">
              <pattern id="service-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="none" stroke="#77A656" strokeWidth="0.5" />
              </pattern>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#service-pattern)" />
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center">
              <div className="px-8 py-3 rounded-xl shadow-md bg-gradient-to-r from-[#e8f5e9] via-[#f8faf5] to-[#e3e9f7] border border-[#d1e7dd] mb-6">
                <motion.span
                  variants={itemVariants}
                  className="font-cinzel uppercase text-lg tracking-[0.3em] text-[#77A656] font-bold text-center"
                >
                  {t('hero.exploreServices')}
                </motion.span>
              </div>
            </div>
            <motion.h2 
              variants={itemVariants}
              className="font-marcellus text-4xl font-bold text-[#23244a] mt-2"
            >
              {t('hero.discoverCosmicJourney')}
            </motion.h2>
          </div>
          <Carousel 
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              skipSnaps: false,
              containScroll: "trimSnaps"
            }}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            className="w-full relative group overflow-visible"
          >
            <CarouselContent className="py-4">
              {cardData.map((card, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 pl-4 first:pl-0">
                  <motion.div 
                    variants={itemVariants}
                    className="h-[400px] w-full"
                  >
                    <Link href={card.href}>
                      <div className="h-full w-full p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-[#F8FAF5] relative overflow-hidden group shadow-lg hover:shadow-xl border border-white/20">
                        {/* Card Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <svg width="100%" height="100%">
                            <defs>
                              <pattern id={`card-pattern-${index}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                                <circle cx="20" cy="20" r="1" fill="currentColor" />
                              </pattern>
                              <linearGradient id={`card-overlay-${index}`} x1="0" y1="0" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                            <rect x="0" y="0" width="100%" height="100%" fill={`url(#card-pattern-${index})`} />
                            <rect x="0" y="0" width="100%" height="100%" fill={`url(#card-overlay-${index})`} />
                          </svg>
                        </div>
                        {/* Glowing Orb */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity" />
                        <div className="relative z-10 h-full flex flex-col items-start">
                          <div className="w-20 h-20 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 shadow-lg border border-white/20">
                            <svg className="w-14 h-14 text-[#bdbdbd]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="4"/><circle cx="18" cy="18" r="3"/><path d="M6 34l10-10 7 7 9-9 10 10"/></svg>
                          </div>
                          <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-black font-marcellus tracking-wide">
                            {t(`hero.card${index}Title`)}
                          </h3>
                          <p className="text-black text-sm leading-relaxed group-hover:opacity-100 transition-opacity font-cormorant">
                            {t(`hero.card${index}Desc`)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </motion.div>
    </>
  );
}