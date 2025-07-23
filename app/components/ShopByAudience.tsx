'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

// Audience categories - 
const audienceCategories = [
  {
    name: 'For Men',
    icon: '👨',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753089570/man_xbrq9o.jpg',
    slug: 'men',
    color: 'from-slate-300 via-gray-400 to-slate-400',
    shadowColor: 'shadow-slate-400/40',
    glowColor: 'shadow-slate-300/50'
  },
  {
    name: 'For Women',
    icon: '👩',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753089695/woman_ikkahn.jpg',
    slug: 'women', 
    color: 'from-rose-300 via-pink-300 to-rose-400',
    shadowColor: 'shadow-rose-400/40',
    glowColor: 'shadow-rose-300/50'
  },
  {
    name: 'For Kids',
    icon: '🧒',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753089804/kid_qnjq5g.jpg',
    slug: 'kids',
    color: 'from-yellow-300 via-amber-300 to-orange-300',
    shadowColor: 'shadow-yellow-400/40',
    glowColor: 'shadow-yellow-300/50'
  },
  {
    name: 'For Elders',
    icon: '👴',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753089897/elder_zqk4n7.jpg',
    slug: 'elders',
    color: 'from-emerald-300 via-green-400 to-teal-400',
    shadowColor: 'shadow-emerald-400/40',
    glowColor: 'shadow-emerald-300/50'
  }
];

// FLOWING BALL ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

// FLOWING ENTRANCE - BALLS FLOWING FROM DIFFERENT DIRECTIONS
const flowingBallVariants = {
  hidden: (index: number) => ({
    x: index % 2 === 0 ? -300 : 300, // Alternate from left/right
    y: -100 - (index * 50), // Start from different heights
    opacity: 0,
    scale: 0.3,
    rotate: index % 2 === 0 ? -180 : 180,
  }),
  visible: (index: number) => ({
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 80,
      duration: 1.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  })
};

// SIMPLE FRONT SCALE HOVER EFFECTS
const iconHoverVariants = {
  rest: { 
    scale: 1
  },
  hover: { 
    scale: 1.05,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 300
    }
  }
};

interface ShopByAudienceProps {
  variant?: 'default' | 'inline'; // inline for zodiac pages
}

export default function ShopByAudience({ variant = 'default' }: ShopByAudienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // For default (shop page) - show all circles immediately
  if (variant === 'default') {
    return (
      <section className="w-full py-20 relative bg-gradient-to-b from-white/80 via-amber-50/60 to-white/80 backdrop-blur-sm">
        <div className="w-full px-8 md:px-16 lg:px-20 relative z-10">
          <motion.div
            className="text-center mb-16 py-4"
            initial={{ opacity: 0, y: -50 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }
            } : {}}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent">
              Shop by Audience
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 mx-auto rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { scaleX: 1, opacity: 1, transition: { duration: 1, delay: 0.8 } } : {}}
            />
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4">
              Find the perfect spiritual products curated for every age group and gender.
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-8 max-w-none justify-items-center"
          >
            {audienceCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                variants={flowingBallVariants}
                custom={index}
                className="flex flex-col items-center"
              >
                <Link href={`/shop/audience/${category.slug}`}>
                  <motion.div variants={iconHoverVariants} initial="rest" whileHover="hover" className="relative cursor-pointer">
                    <motion.div
                      className={`relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full bg-gradient-to-br ${category.color} shadow-xl ${category.shadowColor} border-4 border-white/30 overflow-hidden`}
                      whileHover={{ scale: 1.15, boxShadow: '0 25px 50px rgba(251, 146, 60, 0.4)', transition: { duration: 0.3 } }}
                    >
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <Image src={category.image} alt={category.name} fill className="object-cover object-center" sizes="(max-width: 768px) 112px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, 160px" />
                      </div>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${category.color} opacity-20 mix-blend-soft-light`} />
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                    </motion.div>
                  </motion.div>
                </Link>
                <motion.h3
                  className="mt-4 text-center text-sm md:text-base lg:text-lg font-semibold text-slate-700"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.8 + index * 0.2, duration: 0.6 } }}
                >
                  {category.name}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // For inline (zodiac pages) - subtle horizontal layout
  return (
    <section className="w-full py-12 relative bg-red-100 border-4 border-red-500">
      <div className="w-full px-8 md:px-16 lg:px-20 relative z-10">
        
        {/* SUBTLE HORIZONTAL LAYOUT */}
        <motion.div
          className="flex items-center justify-center space-x-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }
          } : {}}
        >
          {/* ELEGANT TITLE */}
          <motion.h2 
            className="text-4xl md:text-5xl font-black text-white cursor-pointer hover:text-yellow-300 transition-colors duration-300 bg-black px-6 py-3 rounded-lg border-4 border-white shadow-2xl"
            style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            onClick={toggleExpanded}
          >
            Shop by Audience
          </motion.h2>
          
          {/* SIMPLE ARROW */}
          <motion.div
            className="text-5xl text-white cursor-pointer hover:text-yellow-300 transition-colors duration-300 select-none font-black bg-black px-4 py-3 rounded-lg border-4 border-white shadow-2xl"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            onClick={toggleExpanded}
            animate={{
              rotate: isExpanded ? 90 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            ›
          </motion.div>

          {/* HORIZONTAL CIRCLES - APPEAR IN SAME LINE */}
          {isExpanded && (
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { 
                  duration: 0.8,
                  staggerChildren: 0.2,
                  delayChildren: 0.1
                }
              }}
            >
              {audienceCategories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: -30 * (index + 1),
                    y: -20
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    x: 0,
                    y: 0
                  }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 200,
                    delay: index * 0.1
                  }}
                  className="flex flex-col items-center"
                >
                  <Link href={`/shop/audience/${category.slug}`}>
                    <motion.div
                      className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${category.color} shadow-lg border-2 border-white/50 overflow-hidden cursor-pointer`}
                      whileHover={{
                        scale: 1.2,
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover object-center"
                          sizes="56px"
                        />
                      </div>
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${category.color} opacity-15 mix-blend-soft-light`} />
                    </motion.div>
                  </Link>
                  
                  {/* SMALL LABEL ON HOVER */}
                  <motion.span
                    className="text-xs text-slate-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {category.name.replace('For ', '')}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
}