'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ZodiacBannerProps {
  sign: string;
  symbol: string;
  dateRange: string;
  element: string;
  ruler: string;
  quality: string;
  description: string;
}

// Simple zodiac data
const zodiacData: { [key: string]: ZodiacBannerProps } = {
  aries: {
    sign: 'Aries',
    symbol: '♈',
    dateRange: 'March 21 - April 19',
    element: 'Fire',
    ruler: 'Mars',
    quality: 'Cardinal',
    description: 'The pioneers of the zodiac curated into a celestial collection'
  },
  taurus: {
    sign: 'Taurus',
    symbol: '♉',
    dateRange: 'April 20 - May 20',
    element: 'Earth',
    ruler: 'Venus',
    quality: 'Fixed',
    description: 'The stable foundation of the zodiac curated into a celestial collection'
  },
  gemini: {
    sign: 'Gemini',
    symbol: '♊',
    dateRange: 'May 21 - June 20',
    element: 'Air',
    ruler: 'Mercury',
    quality: 'Mutable',
    description: 'The communicators of the zodiac curated into a celestial collection'
  },
  cancer: {
    sign: 'Cancer',
    symbol: '♋',
    dateRange: 'June 21 - July 22',
    element: 'Water',
    ruler: 'Moon',
    quality: 'Cardinal',
    description: 'The nurturers of the zodiac curated into a celestial collection'
  },
  leo: {
    sign: 'Leo',
    symbol: '♌',
    dateRange: 'July 23 - August 22',
    element: 'Fire',
    ruler: 'Sun',
    quality: 'Fixed',
    description: 'The leaders of the zodiac curated into a celestial collection'
  },
  virgo: {
    sign: 'Virgo',
    symbol: '♍',
    dateRange: 'August 23 - September 22',
    element: 'Earth',
    ruler: 'Mercury',
    quality: 'Mutable',
    description: 'The perfectionists of the zodiac curated into a celestial collection'
  },
  libra: {
    sign: 'Libra',
    symbol: '♎',
    dateRange: 'September 23 - October 22',
    element: 'Air',
    ruler: 'Venus',
    quality: 'Cardinal',
    description: 'The diplomats of the zodiac curated into a celestial collection'
  },
  scorpio: {
    sign: 'Scorpio',
    symbol: '♏',
    dateRange: 'October 23 - November 21',
    element: 'Water',
    ruler: 'Pluto',
    quality: 'Fixed',
    description: 'The transformers of the zodiac curated into a celestial collection'
  },
  sagittarius: {
    sign: 'Sagittarius',
    symbol: '♐',
    dateRange: 'November 22 - December 21',
    element: 'Fire',
    ruler: 'Jupiter',
    quality: 'Mutable',
    description: 'The explorers of the zodiac curated into a celestial collection'
  },
  capricorn: {
    sign: 'Capricorn',
    symbol: '♑',
    dateRange: 'December 22 - January 19',
    element: 'Earth',
    ruler: 'Saturn',
    quality: 'Cardinal',
    description: 'The achievers of the zodiac curated into a celestial collection'
  },
  aquarius: {
    sign: 'Aquarius',
    symbol: '♒',
    dateRange: 'January 20 - February 18',
    element: 'Air',
    ruler: 'Uranus',
    quality: 'Fixed',
    description: 'The visionaries of the zodiac curated into a celestial collection'
  },
  pisces: {
    sign: 'Pisces',
    symbol: '♓',
    dateRange: 'February 19 - March 20',
    element: 'Water',
    ruler: 'Neptune',
    quality: 'Mutable',
    description: 'The dreamers of the zodiac curated into a celestial collection'
  }
};

// Main banner component
export default function UniversalZodiacBanner({ signKey }: { signKey: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const data = zodiacData[signKey] || zodiacData['aries'];

  return (
    <section 
      ref={ref}
      className="relative w-full h-[300px] bg-amber-50/60 overflow-hidden"
    >
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-8 h-full flex items-center">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* LEFT SIDE - Visual Element */}
          <motion.div 
            className="flex items-center justify-center lg:justify-start"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
                         {/* Rounded Square with Aries Symbol */}
             <div className="w-36 h-36 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
               <span className="text-5xl text-white font-light">
                 {data.symbol}
               </span>
             </div>
            
            {/* Small decorative dot */}
            <div className="absolute -top-4 -right-4 w-4 h-4 bg-amber-300 rounded-full opacity-60"></div>
          </motion.div>

                     {/* RIGHT SIDE - Text Content */}
           <motion.div 
             className="text-center lg:text-left space-y-3"
             initial={{ opacity: 0, x: 30 }}
             animate={isInView ? { opacity: 1, x: 0 } : {}}
             transition={{ duration: 0.8, delay: 0.4 }}
           >
                         {/* Main Title */}
             <div>
               <h1 className="text-4xl md:text-5xl font-light text-amber-800 mb-2">
                 {data.sign}
               </h1>
               <p className="text-lg text-orange-600 font-medium">
                 {data.dateRange}
               </p>
             </div>
            
                         {/* Description */}
             <p className="text-lg text-stone-600 leading-relaxed max-w-lg">
               {data.description}
             </p>
            
                         {/* Tags */}
             <div className="flex flex-wrap gap-2 pt-1">
                             <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                 {data.element} Element
               </span>
               <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                 {data.ruler} Ruled
               </span>
               <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                 {data.quality} Sign
               </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 