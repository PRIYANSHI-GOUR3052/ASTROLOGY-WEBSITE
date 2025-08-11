'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

// Main 5 categories for shop page - EARTHLY POLISHED COLORS WITH IMAGES
const mainCategories = [
  {
    name: 'Gemstones & Crystals',
    icon: '💎',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    slug: 'gemstones-crystals',
    color: 'from-emerald-300 via-green-400 to-teal-400',
    shadowColor: 'shadow-emerald-400/40',
    glowColor: 'shadow-emerald-300/50'
  },
  {
    name: 'Rudraksha & Malas',
    icon: '📿',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753830/rudrakshamala_pibmxj.jpg',
    slug: 'rudraksha-malas', 
    color: 'from-amber-300 via-orange-300 to-yellow-400',
    shadowColor: 'shadow-amber-400/40',
    glowColor: 'shadow-amber-300/50'
  },
  {
    name: 'Spiritual Bracelets',
    icon: '⚡',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754784/accessory_viwtit.jpg',
    slug: 'bracelets',
    color: 'from-rose-300 via-pink-300 to-rose-400',
    shadowColor: 'shadow-rose-400/40',
    glowColor: 'shadow-rose-300/50'
  },
  {
    name: 'Sacred Yantras',
    icon: '🔯',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754014/yantra_kppksi.jpg',
    slug: 'yantras-plates',
    color: 'from-yellow-300 via-amber-300 to-orange-300',
    shadowColor: 'shadow-yellow-400/40',
    glowColor: 'shadow-yellow-300/50'
  },
  {
    name: 'Puja Essentials',
    icon: '🕯️',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754218/puja_samagri_sc0vpt.jpg',
    slug: 'puja-essentials',
    color: 'from-blue-300 via-cyan-300 to-teal-300',
    shadowColor: 'shadow-blue-400/40',
    glowColor: 'shadow-blue-300/50'
  }
];

// CINEMATIC ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// HEROIC ENTRANCE - RIGHT TO LEFT SLIDE
const heroicSlideVariants = {
  hidden: { 
    x: 150,
    opacity: 0,
    scale: 0.8,
    rotateY: 45
  },
  visible: { 
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
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

// PAGE TRANSITION VARIANTS
const pageExitVariants = {
  exit: {
    x: '100vw',
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

export default function ShopCategoriesMinimal() {
  const ref = useRef(null);
  const router = useRouter();
  const isInView = useInView(ref, { once: true, margin: "-150px" });
  const [isTransitioning, setIsTransitioning] = useState(false);

  // CINEMATIC PAGE TRANSITION
  const handleExploreMore = async () => {
    setIsTransitioning(true);
    
    // Create cinematic exit animation
    document.body.style.overflow = 'hidden';
    
    // Wait for exit animation
    setTimeout(() => {
      router.push('/shop/categories');
    }, 800);
  };

  return (
    <>
      {/* ELEGANT PAGE EXIT OVERLAY - BOOK PAGE TURNING */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-r from-amber-50 via-white to-amber-50"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      <section 
        className="w-screen py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-white/50 to-transparent"
        style={{ 
          marginLeft: 'calc(-50vw + 50%)', 
          marginRight: 'calc(-50vw + 50%)',
          maxWidth: '100vw'
        }}
      >
        
        <div className="w-full px-8 md:px-16 lg:px-20 relative z-10">
          
          {/* CINEMATIC HEADER */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -50, rotateX: -30 }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              transition: { 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2 
              }
            } : {}}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent">
              Sacred Categories
            </h2>
            
            {/* ANIMATED UNDERLINE */}
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

          {/* HEROIC CATEGORIES GRID */}
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 mb-16 max-w-none justify-items-center"
          >
            {mainCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                variants={heroicSlideVariants}
                className="flex flex-col items-center"
              >
                <Link href={`/shop/category/${category.slug}`}>
                  <motion.div
                    variants={iconHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className="relative cursor-pointer"
                  >

                    
                    {/* MAIN CIRCLE - MUCH LARGER SIZE WITH IMAGE */}
                    <motion.div
                      className={`relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 xl:w-40 xl:h-40 rounded-full bg-gradient-to-br ${category.color} shadow-xl ${category.shadowColor} border-4 border-white/30 overflow-hidden`}
                      whileHover={{
                        scale: 1.15,
                        boxShadow: '0 25px 50px rgba(251, 146, 60, 0.4)',
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* CATEGORY IMAGE */}
                      <div className="absolute inset-0 rounded-full overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover object-center"
                          sizes="(max-width: 768px) 112px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, 160px"
                        />
                      </div>
                      
                      {/* SUBTLE COLOR OVERLAY */}
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${category.color} opacity-20 mix-blend-soft-light`} />
                      
                      {/* INNER GLOW BORDER */}
                      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                    </motion.div>


                  </motion.div>
                </Link>

                {/* CATEGORY NAME */}
                <motion.h3
                  className="mt-4 text-center text-sm md:text-base lg:text-lg font-semibold text-slate-700"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.8 + index * 0.2,
                      duration: 0.6
                    }
                  } : {}}
                >
                  {category.name}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>

          {/* CINEMATIC EXPLORE MORE BUTTON */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                delay: 1.8,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }
            } : {}}
          >
            <motion.button
              onClick={handleExploreMore}
              className="relative px-12 py-4 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 text-lg overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
              }}
              whileTap={{ scale: 0.98 }}
              disabled={isTransitioning}
            >
              {/* SHIMMER EFFECT */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: [-300, 300]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
              
              <span className="relative flex items-center space-x-3">
                <span>{isTransitioning ? 'Opening Portal...' : 'Explore More Realms'}</span>
                <motion.svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{
                    x: [0, 5, 0],
                    rotate: isTransitioning ? [0, 360] : 0
                  }}
                  transition={{
                    x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 1, repeat: Infinity }
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
} 