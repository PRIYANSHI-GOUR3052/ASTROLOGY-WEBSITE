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

export default function HeroSection() {
  return (
    <>
      {/* Prominent Banner - visually bold, green gradient, with CTA, always below nav */}
      <section className="pt-28 w-full flex items-center justify-center bg-gradient-to-r from-[#5fa143] via-[#77A656] to-[#357a1a] py-7 px-4 shadow-2xl relative z-30">
        <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-2">Unlock Your Destiny with Nakshatra Gyan</h2>
            <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow-sm">Experience authentic Vedic astrology, remedies, and guidance for your life journey.</p>
          </div>
          <div className="mt-6 md:mt-0 flex-shrink-0">
            <Link href="/services">
              <span className="inline-block bg-white text-[#357a1a] font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#e8f5e9] hover:text-[#285c13] transition-colors text-xl border-2 border-[#a3e635] tracking-wide">Explore Our Services</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-[#F8FAF5] pt-6 md:pt-10 pb-12 md:pb-16 px-2 md:px-0">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-marcellus text-center mb-4 bg-gradient-to-r from-[#23244a] via-[#23244a] to-[#77A656] bg-clip-text text-transparent drop-shadow-lg tracking-tight"
        >
          <span className="inline-block"> Embark on Your Celestial Journey</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl font-cormorant text-center text-[#77A656] tracking-wide italic mb-8"
        >
          Let the stars illuminate your path to self-discovery and fulfillment.
        </motion.p>
        {/* Astrology Grid Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold font-marcellus text-[#23244a]">Cosmic Calendar</h2>
              <p className="text-gray-700 text-base">Stay attuned to the universe with daily celestial highlights, auspicious timings, and planetary movements that shape your day.</p>
              <Link href="/panchang">
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 4px 24px #77A65633' }} className="relative w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 overflow-hidden transition-all">
                  <Image src="/images/cosmiccalendar.png" alt="Placeholder" fill style={{ objectFit: 'cover' }} className="rounded-lg" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold font-marcellus text-[#23244a]">Zodiac Personality Decoder</h2>
              <p className="text-gray-700 text-base">Uncover the hidden layers of your zodiac sign—traits, strengths, and quirks that make you uniquely you.</p>
              <Link href="/astrology">
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 4px 24px #77A65633' }} className="relative w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 overflow-hidden transition-all">
                  <Image src="/images/zodiac_decoder.avif" alt="Placeholder" fill style={{ objectFit: 'cover' }} className="rounded-lg" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
          {/* Center Column */}
          <div className="flex flex-col gap-8">
            <motion.div whileHover={{ scale: 1.04 }} className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
              <h2 className="text-3xl font-bold font-marcellus text-[#23244a]">Astro Wellness Tips</h2>
              <p className="text-gray-700 text-base">Receive practical, holistic wellness advice inspired by the stars, blending ancient wisdom with modern living.</p>
              <Link href="/blog/astrology-remedies-for-life">
                <motion.div whileHover={{ scale: 1.07, boxShadow: '0 6px 32px #77A65633' }} className="relative w-full aspect-video rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 overflow-hidden transition-all">
                  <Image src="/images/astrowellness.jpg" alt="Placeholder" fill style={{ objectFit: 'cover' }} className="rounded-lg" />
                </motion.div>
              </Link>
            </motion.div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold font-marcellus text-[#23244a]">Spiritual Growth Pathways</h2>
              <p className="text-gray-700 text-base">Explore guided meditations, affirmations, and spiritual practices to elevate your mind, body, and soul.</p>
              <Link href="/courses">
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 4px 24px #77A65633' }} className="relative w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 overflow-hidden transition-all">
                  <Image src="/images/spiritualpathway.jpg" alt="Placeholder" fill style={{ objectFit: 'cover' }} className="rounded-lg" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
              <h2 className="text-2xl font-bold font-marcellus text-[#23244a]">Myth & Legend Spotlight</h2>
              <p className="text-gray-700 text-base">Journey through fascinating stories and legends from Vedic astrology, bringing ancient myths to life for today's seeker.</p>
              <Link href="/blog/astrology-remedies-for-life">
                <motion.div whileHover={{ scale: 1.05, boxShadow: '0 4px 24px #77A65633' }} className="relative w-full aspect-square rounded-lg flex items-center justify-center cursor-pointer bg-gray-100 overflow-hidden transition-all">
                  <Image src="/images/myth.jpg" alt="Placeholder" fill style={{ objectFit: 'cover' }} className="rounded-lg" />
                </motion.div>
              </Link>
            </motion.div>
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
                  Explore Our Services
                </motion.span>
              </div>
            </div>
            <motion.h2 
              variants={itemVariants}
              className="font-marcellus text-4xl font-bold text-[#23244a] mt-2"
            >
              Discover Your Cosmic Journey
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
                            {card.title}
                          </h3>
                          <p className="text-black text-sm leading-relaxed group-hover:opacity-100 transition-opacity font-cormorant">
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
            <CarouselPrevious className="-left-8 z-20 text-black" />
            <CarouselNext className="-right-8 z-20 text-black" />
          </Carousel>
        </div>
        {/* Add back the left and right SVG circles in the service section, with updated green colors */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#5fa143" d="M44.1,-76.3C58.4,-69.8,71.9,-59.6,79.9,-46.2C87.9,-32.8,90.4,-16.4,89.6,-0.5C88.7,15.5,84.5,31,76.3,44.2C68.1,57.4,56,68.3,42,75.8C28,83.3,14,87.4,-0.6,88.4C-15.1,89.5,-30.2,87.5,-44.7,81.1C-59.1,74.7,-72.9,64,-81.5,49.8C-90.1,35.6,-93.5,17.8,-92.1,0.8C-90.7,-16.2,-84.5,-32.3,-75.1,-45.8C-65.7,-59.2,-53,-69.9,-39,-75.8C-25,-81.7,-12.5,-82.8,1.6,-85.6C15.7,-88.4,31.4,-93,44.1,-76.3Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[300px] h-[300px] opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path fill="#357a1a" d="M42.7,-73.4C56.9,-67.3,71.2,-58.6,78.9,-45.8C86.6,-33,87.7,-16.5,86.5,-0.7C85.3,15.1,81.8,30.2,74.7,43.5C67.6,56.8,56.9,68.3,43.7,75.6C30.5,82.9,15.3,86,-0.2,86.3C-15.6,86.6,-31.2,84.1,-45.1,77.2C-59,70.3,-71.2,59,-79.4,45C-87.6,31,-91.8,15.5,-90.8,0.6C-89.7,-14.3,-83.4,-28.6,-75.1,-41.5C-66.8,-54.4,-56.5,-65.9,-43.5,-72.8C-30.5,-79.7,-15.2,-82,0.9,-83.6C17,-85.2,34,-85,42.7,-73.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </motion.div>
    </>
  );
} 