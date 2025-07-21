'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Audience categories - EARTHLY POLISHED COLORS WITH IMAGES
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
      duration: 1.2,
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

export default function ShopByAudience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section 
      className="w-screen py-20 relative overflow-visible bg-gradient-to-b from-transparent via-amber-50/30 to-transparent"
      style={{ 
        marginLeft: 'calc(-50vw + 50%)', 
        marginRight: 'calc(-50vw + 50%)',
        maxWidth: '100vw'
      }}
    >
      
      <div className="w-full px-8 md:px-16 lg:px-20 relative z-10" style={{ overflow: 'visible' }}>
        
        {/* CINEMATIC HEADER */}
        <motion.div
          className="text-center mb-16 py-4"
          style={{ overflow: 'visible', minHeight: '120px' }}
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
          <div className="overflow-visible">
            <h2 className="text-4xl md:text-5xl font-light mb-4 bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent px-4" style={{ lineHeight: '1.4', paddingTop: '12px', paddingBottom: '12px', overflow: 'visible' }}>
              Shop by Audience
            </h2>
          </div>
          
          {/* ANIMATED UNDERLINE */}
          <div className="overflow-visible">
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 mx-auto rounded-full"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={isInView ? { 
                scaleX: 1, 
                opacity: 1,
                transition: { duration: 1, delay: 0.8 }
              } : {}}
            />
          </div>
          
          <div className="overflow-visible">
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mt-4" style={{ overflow: 'visible' }}>
              Find the perfect spiritual products curated for every age group and gender.
            </p>
          </div>
        </motion.div>

        {/* HEROIC AUDIENCE GRID */}
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
              variants={heroicSlideVariants}
              className="flex flex-col items-center"
            >
              <Link href={`/shop/audience/${category.slug}`}>
                <motion.div
                  variants={iconHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className="relative cursor-pointer"
                >
                  {/* MAIN CIRCLE - WITH IMAGE */}
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
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
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


      </div>
    </section>
  );
} 