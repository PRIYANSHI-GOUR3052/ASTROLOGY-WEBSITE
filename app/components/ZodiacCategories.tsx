'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// FIRST ROW - 6 MAIN ZODIAC SIGNS
const mainZodiacSigns = [
  {
    name: 'Aries',
    symbol: '',
    dates: 'Mar 21 - Apr 19',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092662/2a9a8fad-602c-4a8b-b0a2-a2acee74386d.png',
    slug: 'aries',
    color: 'from-red-300 via-orange-300 to-red-400',
    shadowColor: 'shadow-red-400/40'
  },
  {
    name: 'Taurus',
    symbol: '',
    dates: 'Apr 20 - May 20',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753095187/taurus_2_bbgbls.jpg',
    slug: 'taurus',
    color: 'from-green-300 via-emerald-300 to-green-400',
    shadowColor: 'shadow-green-400/40'
  },
  {
    name: 'Gemini',
    symbol: '',
    dates: 'May 21 - Jun 20',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753095191/gemini_usaz4b.jpg',
    slug: 'gemini',
    color: 'from-yellow-300 via-amber-300 to-yellow-400',
    shadowColor: 'shadow-yellow-400/40'
  },
  {
    name: 'Cancer',
    symbol: '',
    dates: 'Jun 21 - Jul 22',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753095191/cancer_ihdhhi.jpg',
    slug: 'cancer',
    color: 'from-blue-300 via-cyan-300 to-blue-400',
    shadowColor: 'shadow-blue-400/40'
  },
  {
    name: 'Leo',
    symbol: '',
    dates: 'Jul 23 - Aug 22',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753095189/leo_ieeqpu.jpg',
    slug: 'leo',
    color: 'from-orange-300 via-amber-300 to-orange-400',
    shadowColor: 'shadow-orange-400/40'
  },
  {
    name: 'Virgo',
    symbol: '',
    dates: 'Aug 23 - Sep 22',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753095189/virgo_iirwhi.jpg',
    slug: 'virgo',
    color: 'from-emerald-300 via-teal-300 to-emerald-400',
    shadowColor: 'shadow-emerald-400/40'
  }
];

// EXPANDABLE - REMAINING 6 ZODIAC SIGNS
const additionalZodiacSigns = [
  {
    name: 'Libra',
    symbol: '♎',
    dates: 'Sep 23 - Oct 22',
    image: '/images/myth.jpg',
    slug: 'libra',
    color: 'from-pink-300 via-rose-300 to-pink-400',
    shadowColor: 'shadow-pink-400/40'
  },
  {
    name: 'Scorpio',
    symbol: '♏',
    dates: 'Oct 23 - Nov 21',
    image: '/images/astrowellness.jpg',
    slug: 'scorpio',
    color: 'from-purple-300 via-violet-300 to-purple-400',
    shadowColor: 'shadow-purple-400/40'
  },
  {
    name: 'Sagittarius',
    symbol: '♐',
    dates: 'Nov 22 - Dec 21',
    image: '/images/course-1.jpg',
    slug: 'sagittarius',
    color: 'from-indigo-300 via-blue-300 to-indigo-400',
    shadowColor: 'shadow-indigo-400/40'
  },
  {
    name: 'Capricorn',
    symbol: '♑',
    dates: 'Dec 22 - Jan 19',
    image: '/images/course-2.jpg',
    slug: 'capricorn',
    color: 'from-gray-300 via-slate-300 to-gray-400',
    shadowColor: 'shadow-gray-400/40'
  },
  {
    name: 'Aquarius',
    symbol: '♒',
    dates: 'Jan 20 - Feb 18',
    image: '/images/course-3.jpg',
    slug: 'aquarius',
    color: 'from-cyan-300 via-sky-300 to-cyan-400',
    shadowColor: 'shadow-cyan-400/40'
  },
  {
    name: 'Pisces',
    symbol: '♓',
    dates: 'Feb 19 - Mar 20',
    image: '/images/course-4.jpg',
    slug: 'pisces',
    color: 'from-teal-300 via-green-300 to-teal-400',
    shadowColor: 'shadow-teal-400/40'
  }
];

// CINEMATIC ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// HEROIC RIGHT TO LEFT SLIDE
const heroicSlideVariants = {
  hidden: { 
    x: 120,
    opacity: 0,
    scale: 0.85
  },
  visible: { 
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// SIMPLE FRONT SCALE HOVER
const iconHoverVariants = {
  rest: { 
    scale: 1
  },
  hover: { 
    scale: 1.1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300,
      duration: 0.3
    }
  }
};

export default function ZodiacCategories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAll, setShowAll] = useState(false);

  return (
    <section 
      className="py-16 relative w-screen overflow-visible" 
      style={{ 
        marginLeft: 'calc(-50vw + 50%)', 
        marginRight: 'calc(-50vw + 50%)',
        maxWidth: '100vw'
      }}
    >
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-yellow-200/15 to-amber-200/15 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full px-8 md:px-16 lg:px-20 relative z-10">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-slate-800"
              style={{ fontFamily: 'Playfair Display, serif' }}>
            Shop By Zodiac
          </h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 mx-auto rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { 
              scaleX: 1, 
              opacity: 1,
              transition: { duration: 1, delay: 0.8 }
            } : {}}
          />
        </motion.div>

        {/* MAIN ZODIAC SIGNS - First Row */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 mb-8 px-4 py-6 max-w-none"
        >
          {mainZodiacSigns.map((sign, index) => (
            <motion.div
              key={sign.slug}
              variants={heroicSlideVariants}
              className="flex flex-col items-center p-2"
            >
              <Link href={`/shop/zodiac/${sign.slug}`}>
                <motion.div
                  variants={iconHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className="relative cursor-pointer"
                >
                  {/* CIRCULAR ZODIAC CARD */}
                  <motion.div
                    className={`relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full bg-gradient-to-br ${sign.color} shadow-lg ${sign.shadowColor} border-3 border-white/40 overflow-hidden`}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: '0 25px 50px rgba(251, 146, 60, 0.4)',
                      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                    }}
                  >
                    {/* ZODIAC IMAGE */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <Image
                        src={sign.image}
                        alt={sign.name}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 112px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, 160px"
                      />
                    </div>
                    
                    {/* SUBTLE COLOR OVERLAY */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${sign.color} opacity-30 mix-blend-soft-light`} />
                    
                    {/* ZODIAC SYMBOL */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold drop-shadow-lg">
                        {sign.symbol}
                      </span>
                    </div>
                    
                    {/* INNER GLOW */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                  </motion.div>
                </motion.div>
              </Link>

              {/* ZODIAC NAME */}
              <motion.h3
                className="mt-3 text-center text-sm md:text-base font-semibold text-slate-700"
                style={{ fontFamily: 'Playfair Display, serif' }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? {
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.1 + 0.8, duration: 0.4 }
                } : {}}
              >
                {sign.name}
              </motion.h3>
              
              {/* DATES */}
              <motion.p
                className="text-xs text-slate-500 mt-1 text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? {
                  opacity: 1,
                  transition: { delay: index * 0.1 + 1, duration: 0.4 }
                } : {}}
              >
                {sign.dates}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* EXPANDABLE SECTION */}
        <AnimatePresence>
          {showAll && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-visible"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-10 mb-8 px-4 py-6 max-w-none"
              >
                {additionalZodiacSigns.map((sign, index) => (
                  <motion.div
                    key={sign.slug}
                    variants={heroicSlideVariants}
                    className="flex flex-col items-center p-2"
                  >
                    <Link href={`/shop/zodiac/${sign.slug}`}>
                      <motion.div
                        variants={iconHoverVariants}
                        initial="rest"
                        whileHover="hover"
                        className="relative cursor-pointer"
                      >
                                                 {/* CIRCULAR ZODIAC CARD */}
                         <motion.div
                           className={`relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full bg-gradient-to-br ${sign.color} shadow-lg ${sign.shadowColor} border-3 border-white/40 overflow-hidden`}
                           whileHover={{
                             scale: 1.15,
                             boxShadow: '0 25px 50px rgba(251, 146, 60, 0.4)',
                             transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
                           }}
                         >
                          {/* ZODIAC IMAGE */}
                          <div className="absolute inset-0 rounded-full overflow-hidden">
                                                         <Image
                               src={sign.image}
                               alt={sign.name}
                               fill
                               className="object-cover object-center"
                               sizes="(max-width: 768px) 112px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, 160px"
                             />
                          </div>
                          
                          {/* COLOR OVERLAY */}
                          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${sign.color} opacity-30 mix-blend-soft-light`} />
                          
                                                     {/* ZODIAC SYMBOL */}
                           <div className="absolute inset-0 flex items-center justify-center">
                             <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold drop-shadow-lg">
                               {sign.symbol}
                             </span>
                           </div>
                          
                          {/* INNER GLOW */}
                          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                        </motion.div>
                      </motion.div>
                    </Link>

                    {/* ZODIAC NAME */}
                    <h3 className="mt-3 text-center text-sm md:text-base font-semibold text-slate-700"
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                      {sign.name}
                    </h3>
                    
                    {/* DATES */}
                    <p className="text-xs text-slate-500 mt-1 text-center">
                      {sign.dates}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXPAND/COLLAPSE BUTTON */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.button
            onClick={() => setShowAll(!showAll)}
            className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center mx-auto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="mr-2">
              {showAll ? 'Show Less Signs' : 'Show More Signs'}
            </span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 