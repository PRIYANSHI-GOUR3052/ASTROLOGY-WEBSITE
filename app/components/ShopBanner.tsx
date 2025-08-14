'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Define types for better TypeScript support
interface CarouselItem {
  id: string;
  title: string;
  image: {
    src: string;
    title: string;
    url: string;
  };
}

interface ShopBannerProps {
  variant?: 'default' | 'gemstones' | 'spiritual' | 'astrology' | 'jewelry' | 'services';
  customData?: CarouselItem[];
  showAllProductsButton?: boolean;
  title?: string;
}

// Default carousel data - one image per category
const defaultCarouselData = [
  {
    id: 'gemstones',
    title: 'Sacred Gemstones & Crystals',
    image: {
      src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
      title: 'Astro Wellness Kit',
      url: '/shop/astro-wellness-kit'
    }
  },
  {
    id: 'spiritual',
    title: 'Spiritual Accessories',
    image: {
      src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754784/accessory_viwtit.jpg',
      title: 'Gemstone Collection',
      url: '/shop/gemstone-collection'
    }
  },
  {
    id: 'astrology',
    title: 'Astrology Services',
    image: {
      src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754941/personalized_astrology_tools_mj3501.jpg',
      title: 'Rudraksha Mala',
      url: '/shop/rudraksha-collection'
    }
  },
  {
    id: 'jewelry',
    title: 'Sacred Jewelry & Malas',
    image: {
      src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754647/kundli_h5hiqg.jpg',
      title: 'Birth Chart Analysis',
      url: '/shop/birth-chart-report'
    }
  },
];

// Category-specific carousel data
const categoryCarouselData = {
  gemstones: [
    {
      id: 'gemstones-1',
      title: 'Sacred Gemstones & Crystals',
      image: {
        src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
        title: 'Natural Gemstones',
        url: '/shop/gemstones'
      }
    },
    // Add more gemstone-specific items
  ],
  spiritual: [
    {
      id: 'spiritual-1',
      title: 'Spiritual Accessories',
      image: {
        src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754784/accessory_viwtit.jpg',
        title: 'Spiritual Tools',
        url: '/shop/spiritual-accessories'
      }
    },
    // Add more spiritual-specific items
  ],
  astrology: [
    {
      id: 'astrology-1',
      title: 'Astrology Services',
      image: {
        src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754941/personalized_astrology_tools_mj3501.jpg',
        title: 'Astrology Consultation',
        url: '/shop/astrology-services'
      }
    },
    // Add more astrology-specific items
  ],
  jewelry: [
    {
      id: 'jewelry-1',
      title: 'Sacred Jewelry & Malas',
      image: {
        src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754647/kundli_h5hiqg.jpg',
        title: 'Sacred Jewelry',
        url: '/shop/jewelry'
      }
    },
    // Add more jewelry-specific items
  ],
  services: [
    {
      id: 'services-1',
      title: 'Astrology Services',
      image: {
        src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754941/personalized_astrology_tools_mj3501.jpg',
        title: 'Personalized Readings',
        url: '/services/personalized-readings'
      }
    },
    {
      id: 'services-2',
      title: 'Consultation Services',
      image: {
        src: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754647/kundli_h5hiqg.jpg',
        title: 'Expert Consultation',
        url: '/services/consultation'
      }
    },
    // Add more service-specific items
  ],
};

export default function ShopBanner({ 
  variant = 'default', 
  customData, 
  showAllProductsButton = true,
  title 
}: ShopBannerProps) {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Determine which data to use
  const carouselData = customData || 
    (variant !== 'default' ? categoryCarouselData[variant] : null) || 
    defaultCarouselData;

  // Carousel switching every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselData.length);
      setAnimationKey(prev => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentCarousel = carouselData[currentCarouselIndex];

  return (
    <div className="relative w-full h-[350px] sm:h-[450px] overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-800">
      {/* Animated Image Container - Only images slide */}
      <AnimatePresence>
        <motion.div
          key={`carousel-${currentCarouselIndex}-${animationKey}`}
          className="absolute inset-0 w-full h-full"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Main Image Container */}
          <Link href={currentCarousel.image.url} className="block relative w-full h-full group cursor-pointer">
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={currentCarousel.image.src}
                alt={currentCarousel.image.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority={currentCarouselIndex === 0}
              />
              {/* Subtle overlay for better text readability */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
              {/* Gradient overlays for aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
              <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-b from-black/40 to-transparent" />
            </div>
          </Link>

          {/* Click indicator for main image - hide on xs, show on sm+ */}
          <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-amber-400 text-slate-800 rounded-full p-4 shadow-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Persistent Product Title Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[90vw] max-w-xs sm:bottom-8 sm:left-8 sm:translate-x-0">
        <Link href={currentCarousel.image.url} className="group">
          <div className="bg-black/60 hover:bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-4 transition-all duration-300 border border-white/10 text-center sm:text-left">
            <h3 className="text-lg sm:text-2xl md:text-3xl font-light text-white group-hover:text-amber-200 transition-colors duration-300">
              {currentCarousel.image.title}
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-1 sm:mt-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
              Click to explore
            </p>
          </div>
        </Link>
      </div>

      {/* Persistent Progress Indicator - hide on xs, show on sm+ */}
      <div className="hidden sm:flex absolute bottom-8 right-8 z-20 space-x-3">
        {carouselData.map((item: CarouselItem, index: number) => (
          <button
            key={index}
            onClick={() => {
              setCurrentCarouselIndex(index);
              setAnimationKey(prev => prev + 1);
            }}
            className={`w-12 h-1.5 rounded-full transition-all duration-300 hover:h-2 ${
              index === currentCarouselIndex 
                ? 'bg-white' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          >
            {index === currentCarouselIndex && (
              <motion.div
                className="h-full bg-amber-400 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Persistent Corner decorative element - hide on xs, show on sm+ */}
      <div className="hidden sm:block absolute top-8 right-8 z-20">
        <div className="flex items-center space-x-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">Featured</span>
        </div>
      </div>

      {/* View All Products Button - top center on mobile, top left on desktop */}
      {showAllProductsButton && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 sm:top-8 sm:left-8 sm:translate-x-0 z-20">
          <Link href={variant === 'services' ? '/services/all' : '/shop/all-products'} className="group">
            <div className="bg-black/60 hover:bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 sm:px-6 sm:py-3 transition-all duration-300 border border-white/10 text-center sm:text-left">
              <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-amber-200 transition-colors duration-300">
                🔍 {title || (variant === 'services' ? 'View All Services' : 'View All Products')}
              </h3>
              <p className="text-white/70 text-xs mt-1 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Browse our {variant === 'services' ? 'services' : 'collection'}
              </p>
            </div>
          </Link>
        </div>
      )}

      {/* Persistent Navigation hint - hide on xs, show on sm+ */}
      <div className="hidden sm:block absolute bottom-20 right-8 z-20 text-right">
        <div className="bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
          <p className="text-white/90 text-sm font-medium">
            {currentCarouselIndex + 1} / {carouselData.length}
          </p>
          <p className="text-white/60 text-xs mt-1">
            Click dots to navigate
          </p>
        </div>
      </div>

      {/* Global overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5 pointer-events-none" />
    </div>
  );
}