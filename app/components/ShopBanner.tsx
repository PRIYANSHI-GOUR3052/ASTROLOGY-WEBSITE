'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

// Different carousel datasets
const carouselData = [
  {
    id: 'gemstones',
    title: 'Sacred Gemstones & Crystals',
    images: [
      {
        src: '/images/astrowellness.jpg',
        title: 'Astro Wellness Kit',
        url: '/shop/astro-wellness-kit'
      },
      {
        src: '/images/course-1.jpg',
        title: 'Gemstone Collection',
        url: '/shop/gemstone-collection'
      },
      {
        src: '/images/course-2.jpg',
        title: 'Rudraksha Mala',
        url: '/shop/rudraksha-collection'
      },
      {
        src: '/images/birth_chart_mockup.jpg',
        title: 'Birth Chart Analysis',
        url: '/shop/birth-chart-report'
      },
    ]
  },
  {
    id: 'spiritual',
    title: 'Spiritual Accessories',
    images: [
      {
        src: '/images/course-3.jpg',
        title: 'Meditation Accessories',
        url: '/shop/meditation-accessories'
      },
      {
        src: '/images/course-4.jpg',
        title: 'Puja Samagri Kit',
        url: '/shop/puja-samagri-kits'
      },
      {
        src: '/images/astrology_app.jpg',
        title: 'Astrology Tools',
        url: '/shop/astrology-tools'
      },
      {
        src: '/images/myth.jpg',
        title: 'Sacred Artifacts',
        url: '/shop/sacred-artifacts'
      },
    ]
  },
  {
    id: 'astrology',
    title: 'Astrology Services',
    images: [
      {
        src: '/images/birth_chart_mockup.jpg',
        title: 'Kundli Services',
        url: '/shop/astrology-reports-kundli'
      },
      {
        src: '/images/cosmiccalendar.png',
        title: 'Cosmic Calendar',
        url: '/shop/cosmic-calendar'
      },
      {
        src: '/images/course-5.jpg',
        title: 'Astrology Course',
        url: '/shop/astrology-course'
      },
      {
        src: '/images/astro.jpg',
        title: 'Personal Reading',
        url: '/services/personal-reading'
      },
    ]
  },
  {
    id: 'jewelry',
    title: 'Sacred Jewelry & Malas',
    images: [
      {
        src: '/images/course-6.jpg',
        title: 'Sacred Jewelry',
        url: '/shop/sacred-jewelry'
      },
      {
        src: '/images/astrowellness.jpg',
        title: 'Healing Bracelets',
        url: '/shop/healing-bracelets'
      },
      {
        src: '/images/course-2.jpg',
        title: 'Rudraksha Jewelry',
        url: '/shop/rudraksha-jewelry'
      },
      {
        src: '/images/astrology_app.jpg',
        title: 'Personalized Tools',
        url: '/shop/personalized-astrology-tools'
      },
    ]
  },
];

// Animation variants for directional enter/exit - FASTER TIMING
const carouselVariants = {
  // Enter animations
  enterFromRight: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: '100%', opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }
  },
  enterFromTop: {
    initial: { y: '-100%', opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { x: '-100%', opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }
  },
  enterFromLeft: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: '-100%', opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }
  },
  enterNaturally: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { y: '-100%', opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }
  }
};

export default function ShopBanner() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Carousel switching every 3.5 seconds for faster timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselData.length);
      setAnimationKey(prev => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Get animation variant based on carousel index
  const getAnimationVariant = (index: number) => {
    const variants = ['enterNaturally', 'enterFromRight', 'enterFromTop', 'enterFromLeft'];
    return variants[index % variants.length];
  };

  const currentCarousel = carouselData[currentCarouselIndex];
  const currentVariant = getAnimationVariant(currentCarouselIndex);

  return (
    <div className="relative w-full h-[450px] overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-800">
      
      <AnimatePresence mode="wait">
        <motion.div
          key={`carousel-${currentCarouselIndex}-${animationKey}`}
          className="absolute inset-0 w-full h-full"
          variants={carouselVariants[currentVariant as keyof typeof carouselVariants]}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {/* Title Overlay - Clickable */}
          <div className="absolute top-8 left-8 z-20">
            <Link 
              href={`/shop/category/${currentCarousel.id}`}
              className="block bg-black/40 hover:bg-black/60 backdrop-blur-sm rounded-lg px-6 py-3 transition-all duration-200 group cursor-pointer"
            >
              <h2 className="text-2xl md:text-3xl font-light text-white group-hover:text-amber-200 transition-colors duration-200">
                {currentCarousel.title}
              </h2>
              <p className="text-white/70 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Browse all products
              </p>
            </Link>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-8 z-20 flex space-x-2">
            {carouselData.map((_, index) => (
              <div
                key={index}
                className={`w-12 h-1 rounded-full transition-all duration-200 ${
                  index === currentCarouselIndex 
                    ? 'bg-white' 
                    : 'bg-white/30'
                }`}
              >
                {index === currentCarouselIndex && (
                  <motion.div
                    className="h-full bg-amber-400 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 3.5, ease: "linear" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Main Carousel */}
          <Carousel
            opts={{ 
              loop: true, 
              align: "center",
              skipSnaps: false,
            }}
            plugins={[Autoplay({ delay: 2200, stopOnInteraction: false })]}
            className="w-full h-full"
          >
            <CarouselContent className="h-full">
              {currentCarousel.images.map((image, index) => (
                <CarouselItem key={`${currentCarousel.id}-${index}`} className="h-full p-0">
                  <Link href={image.url} className="block relative w-full h-full group cursor-pointer">
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={index === 0}
                      />
                      
                      {/* Subtle overlay for better text readability */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-200" />
                      
                      {/* Gradient overlays for aesthetic */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Product title overlay on hover */}
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2">
                          <h3 className="text-slate-800 font-semibold text-sm md:text-base truncate">
                            {image.title}
                          </h3>
                          <p className="text-slate-600 text-xs">Click to explore</p>
                        </div>
                      </div>
                      
                      {/* Click indicator */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div className="bg-amber-400 text-slate-800 rounded-full p-2 shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Corner decorative element */}
          <div className="absolute top-8 right-8 z-20">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-white text-sm font-medium">Live</span>
            </div>
          </div>

          {/* Bottom right info */}
          <div className="absolute bottom-8 right-8 z-20 text-right">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-white text-sm">
                {currentCarouselIndex + 1} of {carouselData.length}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Global overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />
    </div>
  );
} 