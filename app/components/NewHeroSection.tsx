'use client';

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '../contexts/useLanguage'
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

const cardData = [
  {
    title: 'Zodiac Insights',
    description: 'Discover your celestial blueprint through detailed analysis of planetary positions and their influence on your life path. Our expert astrologers reveal your cosmic destiny.',
    icon: '🌟',
    href: '/services/zodiac-insights',
    gradient: 'from-[#E6F4F1] to-[#B8E4FF]'
  },
  {
    title: 'Nakshatra Reading',
    description: 'Unlock the ancient wisdom of your birth star. Understanding your Nakshatra reveals your innate talents, life purpose, and spiritual journey ahead.',
    icon: '✨',
    href: '/services/nakshatra-wisdom',
    gradient: 'from-[#FFE6E6] to-[#FFC7D1]'
  },
  {
    title: 'Spiritual Healing',
    description: 'Experience transformative healing through vedic remedies, mantras, and spiritual practices. Find peace and balance in cosmic harmony.',
    icon: '🕉️',
    href: '/services/spiritual-healing',
    gradient: 'from-[#E6F0FF] to-[#B8D4FF]'
  },
  {
    title: 'Life Path Reading',
    description: 'Navigate your journey with clarity. Our comprehensive life path analysis illuminates your career, relationships, and personal growth.',
    icon: '🌙',
    href: '/services/life-path',
    gradient: 'from-[#F0E6FF] to-[#D4B8FF]'
  },
  {
    title: 'Karmic Patterns',
    description: 'Understand and transform your karmic patterns. Discover how past life influences shape your present and guide your future.',
    icon: '⭐',
    href: '/services/karmic-patterns',
    gradient: 'from-[#FFE6F0] to-[#FFB8D4]'
  }
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
  { src: '/images/birth_chart_mockup.jpg', alt: 'Birth Chart Analysis' },
  { src: '/images/horoscope_daily.jpg', alt: 'Daily Horoscope' },
  { src: '/images/astrology_app_mockup.jpg', alt: 'Astrology Consultation' },
  { src: '/images/tarot-banner.jpg', alt: 'Tarot Reading' },
  { src: '/images/blog/gemstones.jpg', alt: 'Gemstone Powers' },
  { src: '/images/blog/planets.jpg', alt: 'Planetary Influence' },
  { src: '/images/course-1.webp', alt: 'Astrology Course' },
  { src: '/images/course-3.webp', alt: 'Numerology Course' },
];

const illustrationsData = [
  { size: 60, top: '15%', left: '5%', rotate: 180, path: 'M50 0L61.2 34.5L97.5 34.5L68.1 55.9L79.4 90.5L50 69.1L20.6 90.5L31.9 55.9L2.5 34.5L38.8 34.5L50 0Z' }, // Star
  { size: 40, top: '70%', left: '10%', rotate: 90, path: 'M50,2A48,48,0,0,0,34.5,95.1A48,48,0,1,1,50,2Z' }, // Crescent Moon
  { size: 50, top: '20%', left: '85%', rotate: 270, path: 'M50 0L61.2 34.5L97.5 34.5L68.1 55.9L79.4 90.5L50 69.1L20.6 90.5L31.9 55.9L2.5 34.5L38.8 34.5L50 0Z' }, // Star
  { size: 30, top: '80%', left: '90%', rotate: 120, path: 'M50,2A48,48,0,1,0,50,98A48,48,0,0,0,50,2Zm0,88A40,40,0,1,1,90,50,40,40,0,0,1,50,90Z' }, // Ring
  { size: 25, top: '50%', left: '50%', rotate: 120, path: 'M50,2A48,48,0,1,0,50,98A48,48,0,0,0,50,2Zm0,88A40,40,0,1,1,90,50,40,40,0,0,1,50,90Z' }, // Ring
];

interface IllustrationProps {
  delay: number;
  duration: number;
  path: string;
  size: number;
  top: string;
  left: string;
  rotate: number;
}

const Illustration = ({ delay, duration, path, size, top, left, rotate }: IllustrationProps) => (
  <motion.div
    className="absolute opacity-30"
    style={{ top, left, width: size, height: size }}
    initial={{ opacity: 0, y: 50, rotate: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0.4, 0], 
      y: [50, -30, -30, -100], 
      rotate: [0, rotate / 2, rotate, rotate] 
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity, 
      ease: "linear"
    }}
  >
    <svg viewBox="0 0 100 100" fill="#77A656" xmlns="http://www.w3.org/2000/svg">
      <path d={path} />
    </svg>
  </motion.div>
);

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  const [gridImages, setGridImages] = React.useState([
    { src: '/images/birth_chart_mockup.jpg', alt: 'Birth Chart Analysis' },
    { src: '/images/blog/gemstones.jpg', alt: 'Gemstone Powers' },
    { src: '/images/blog/planets.jpg', alt: 'Planetary Influence' },
    { src: '/images/course-1.webp', alt: 'Astrology Course' },
  ]);
  const imageIndexRef = React.useRef(7);

  React.useEffect(() => {
    const interval = setInterval(() => {
        setGridImages(prevImages => {
            const newImages = [...prevImages];
            const imageToReplace = Math.floor(Math.random() * 4);
            newImages[imageToReplace] = allGridImages[imageIndexRef.current % allGridImages.length];
            imageIndexRef.current += 1;
            return newImages;
        })
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen w-full flex flex-col items-center justify-start bg-[#FFFCD3] overflow-hidden pt-32 pb-12 px-4"
    >
      {/* Main hero container */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 w-full max-w-7xl mx-auto bg-[#FFFCD3] backdrop-blur-sm shadow-2xl px-12 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8"
      >
        {/* Left: Main heading */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col justify-center items-start gap-4"
        >
          <motion.span 
            variants={itemVariants}
            className="font-cinzel uppercase text-sm tracking-[0.2em] text-[#77A656] font-bold mb-2 hover:text-[#5c8341] transition-colors"
          >
            Nakshatra Gyan
          </motion.span>
          <motion.h1 
            variants={itemVariants}
            className="font-marcellus text-6xl md:text-7xl font-black text-[#23244a] leading-tight mb-4 text-left tracking-tight relative"
          >
            <span className="block font-black text-[#23244a] drop-shadow-sm">
              Unlock Your
            </span>
            <span className="block relative">
              <span className="relative bg-gradient-to-br from-[#77A656] via-[#5c8341] to-[#23244a] bg-clip-text text-transparent font-black drop-shadow-sm">
                Cosmic Potential
              </span>
            </span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="font-cormorant text-xl text-gray-700 max-w-md text-left leading-relaxed"
          >
            Get personalized Vedic astrology insights, discover your nakshatra, and receive authentic remedies for your life's journey. Trusted by thousands for accuracy and care.
          </motion.p>
          <motion.a 
            variants={itemVariants}
            href="/about" 
            className="font-cinzel inline-block bg-[#77A656] text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg hover:bg-[#5c8341] hover:scale-105 hover:shadow-xl transition-all duration-300 tracking-wider relative overflow-hidden group"
          >
            <span className="relative z-10">Discover More About Us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </motion.a>
        </motion.div>
        
        {/* Right: 4-Image Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-2 gap-4 p-4"
        >
          <div className="space-y-4">
            <motion.div 
              variants={itemVariants}
              className="relative h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <AnimatePresence>
                <motion.div
                  key={gridImages[0].src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={gridImages[0].src}
                    alt={gridImages[0].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="relative h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <AnimatePresence>
                <motion.div
                  key={gridImages[1].src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={gridImages[1].src}
                    alt={gridImages[1].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
          <div className="space-y-4 pt-8">
            <motion.div 
              variants={itemVariants}
              className="relative h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <AnimatePresence>
                <motion.div
                  key={gridImages[2].src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={gridImages[2].src}
                    alt={gridImages[2].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
            <motion.div 
              variants={itemVariants}
              className="relative h-48 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <AnimatePresence>
                <motion.div
                  key={gridImages[3].src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image 
                    src={gridImages[3].src}
                    alt={gridImages[3].alt}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Popular Services Section */}
      <motion.div 
        variants={itemVariants}
        className="w-full bg-[#FFF5E1] py-16 mt-16 relative overflow-hidden"
      >
        {/* Left Corner Illustration */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#77A656" d="M44.1,-76.3C58.4,-69.8,71.9,-59.6,79.9,-46.2C87.9,-32.8,90.4,-16.4,89.6,-0.5C88.7,15.5,84.5,31,76.3,44.2C68.1,57.4,56,68.3,42,75.8C28,83.3,14,87.4,-0.6,88.4C-15.1,89.5,-30.2,87.5,-44.7,81.1C-59.1,74.7,-72.9,64,-81.5,49.8C-90.1,35.6,-93.5,17.8,-92.1,0.8C-90.7,-16.2,-84.5,-32.3,-75.1,-45.8C-65.7,-59.2,-53,-69.9,-39,-75.8C-25,-81.7,-12.5,-82.8,1.6,-85.6C15.7,-88.4,31.4,-93,44.1,-76.3Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Right Corner Illustration */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#77A656" d="M42.7,-73.4C56.9,-67.3,71.2,-58.6,78.9,-45.8C86.6,-33,87.7,-16.5,86.5,-0.7C85.3,15.1,81.8,30.2,74.7,43.5C67.6,56.8,56.9,68.3,43.7,75.6C30.5,82.9,15.3,86,-0.2,86.3C-15.6,86.6,-31.2,84.1,-45.1,77.2C-59,70.3,-71.2,59,-79.4,45C-87.6,31,-91.8,15.5,-90.8,0.6C-89.7,-14.3,-83.4,-28.6,-75.1,-41.5C-66.8,-54.4,-56.5,-65.9,-43.5,-72.8C-30.5,-79.7,-15.2,-82,0.9,-83.6C17,-85.2,34,-85,42.7,-73.4Z" transform="translate(100 100)" />
          </svg>
        </div>

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
            <motion.span
              variants={itemVariants} 
              className="font-cinzel uppercase text-sm tracking-[0.2em] text-[#77A656] font-bold mb-2 inline-block"
            >
              Explore Our Services
            </motion.span>
            <motion.h2 
              variants={itemVariants}
              className="font-marcellus text-4xl font-bold text-[#23244a] mt-2"
            >
              Discover Your Cosmic Journey
            </motion.h2>
          </div>

          <Carousel 
            ref={emblaRef}
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
              skipSnaps: false,
              containScroll: "trimSnaps"
            }}
            plugins={[plugin.current]}
            onMouseEnter={() => plugin.current.stop()}
            onMouseLeave={() => plugin.current.reset()}
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
                      <div className={`h-full w-full rounded-[32px] p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-gradient-to-b ${card.gradient} relative overflow-hidden group shadow-lg hover:shadow-xl border border-white/20`}>
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
                          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 shadow-lg border border-white/20">
                            <span className="text-4xl transform group-hover:scale-110 transition-transform">
                              {card.icon}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-[#2A2A2A] mb-4 group-hover:text-[#1a1a1a] font-marcellus tracking-wide">
                            {card.title}
                          </h3>

                          <p className="text-[#4A4A4A] text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity font-cormorant">
                            {card.description}
                          </p>

                          <div className="mt-auto pt-6">
                            <span className="inline-flex items-center text-[#2A2A2A] text-sm font-medium group-hover:translate-x-1 transition-transform">
                              <span className="mr-2">Learn More</span>
                              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute -left-[100px] top-1/2 -translate-y-1/2 z-30">
              <CarouselPrevious className="h-16 w-16 rounded-full bg-[#77A656] text-white border-2 border-white hover:bg-[#5c8341] hover:scale-110 transition-all duration-300 opacity-90 hover:opacity-100 shadow-lg" />
              <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[150px] h-[150px] opacity-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#77A656" d="M47.5,-67.2C60.9,-59.6,70.8,-44.8,75.8,-28.9C80.8,-13,80.9,4,75.8,19.2C70.7,34.4,60.4,47.8,47.3,57.4C34.2,67,18.3,72.8,1.2,71.2C-15.9,69.7,-31.8,60.8,-45.4,49.4C-59,38,-70.3,24.1,-74.1,8C-77.9,-8.1,-74.3,-26.4,-64.4,-40.2C-54.5,-54,-38.4,-63.3,-23,-67.7C-7.6,-72.1,7.1,-71.6,22.4,-69.3C37.8,-67,47.8,-62.8,47.5,-67.2Z" transform="translate(100 100)" />
                </svg>
              </div>
            </div>
            <div className="absolute -right-[100px] top-1/2 -translate-y-1/2 z-30">
              <CarouselNext className="h-16 w-16 rounded-full bg-[#77A656] text-white border-2 border-white hover:bg-[#5c8341] hover:scale-110 transition-all duration-300 opacity-90 hover:opacity-100 shadow-lg" />
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[150px] h-[150px] opacity-10">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#77A656" d="M42.7,-73.4C56.9,-67.3,71.2,-58.6,78.9,-45.8C86.6,-33,87.7,-16.5,86.5,-0.7C85.3,15.1,81.8,30.2,74.7,43.5C67.6,56.8,56.9,68.3,43.7,75.6C30.5,82.9,15.3,86,-0.2,86.3C-15.6,86.6,-31.2,84.1,-45.1,77.2C-59,70.3,-71.2,59,-79.4,45C-87.6,31,-91.8,15.5,-90.8,0.6C-89.7,-14.3,-83.4,-28.6,-75.1,-41.5C-66.8,-54.4,-56.5,-65.9,-43.5,-72.8C-30.5,-79.7,-15.2,-82,0.9,-83.6C17,-85.2,34,-85,42.7,-73.4Z" transform="translate(100 100)" />
                </svg>
              </div>
            </div>
          </Carousel>
        </div>
      </motion.div>
    </motion.section>
  );
}

// Floating background elements (restored, light blurred circles)
function FloatingElements() {
  const [floatingElements, setFloatingElements] = useState<any[]>([]);

  useEffect(() => {
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 60,
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
          className="absolute rounded-full opacity-20 blur-2xl animate-float"
          style={{
            width: `${element.size}px`,
            height: `${element.size}px`,
            left: `${element.x}%`,
            top: `${element.y}%`,
            background: `linear-gradient(45deg, 
              ${element.id % 3 === 0 ? '#f3e8ff, #fbbf24' : 
                element.id % 3 === 1 ? '#a7f3d0, #f9fafb' : 
                '#fbcfe8, #fef3c7'})`,
            animationDuration: `${element.duration}s`,
            animationDelay: `${element.delay}s`
          }}
        />
      ))}
    </div>
  );
} 