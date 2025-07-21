'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

// Men's Astrology Categories - CURATED FOR MEN
const mensCategories = [
  {
    name: 'Career & Success',
    description: 'Boost your professional growth and achieve success',
    image: '/images/course-1.jpg',
    slug: 'career-success',
    color: 'from-slate-400 via-gray-500 to-slate-600',
    shadowColor: 'shadow-slate-500/40',
    count: '24 products'
  },
  {
    name: 'Leadership & Power',
    description: 'Enhance leadership qualities and personal authority',
    image: '/images/course-2.jpg',
    slug: 'leadership-power',
    color: 'from-amber-400 via-orange-500 to-red-500',
    shadowColor: 'shadow-amber-500/40',
    count: '18 products'
  },
  {
    name: 'Health & Vitality',
    description: 'Maintain physical strength and mental wellness',
    image: '/images/astrowellness.jpg',
    slug: 'health-vitality',
    color: 'from-green-400 via-emerald-500 to-teal-500',
    shadowColor: 'shadow-green-500/40',
    count: '31 products'
  },
  {
    name: 'Wealth & Prosperity',
    description: 'Attract abundance and financial growth',
    image: '/images/course-3.jpg',
    slug: 'wealth-prosperity',
    color: 'from-yellow-400 via-amber-500 to-orange-500',
    shadowColor: 'shadow-yellow-500/40',
    count: '27 products'
  },
  {
    name: 'Relationship & Marriage',
    description: 'Strengthen bonds and find meaningful connections',
    image: '/images/course-4.jpg',
    slug: 'relationship-marriage',
    color: 'from-rose-400 via-pink-500 to-red-500',
    shadowColor: 'shadow-rose-500/40',
    count: '22 products'
  },
  {
    name: 'Protection & Security',
    description: 'Shield from negative energies and obstacles',
    image: '/images/course-5.jpg',
    slug: 'protection-security',
    color: 'from-indigo-400 via-blue-500 to-cyan-500',
    shadowColor: 'shadow-blue-500/40',
    count: '19 products'
  },
  {
    name: 'Spiritual Growth',
    description: 'Deepen spiritual practice and consciousness',
    image: '/images/course-6.jpg',
    slug: 'spiritual-growth',
    color: 'from-purple-400 via-violet-500 to-purple-600',
    shadowColor: 'shadow-purple-500/40',
    count: '25 products'
  },
  {
    name: 'Travel & Adventure',
    description: 'Safe travels and successful ventures abroad',
    image: '/images/myth.jpg',
    slug: 'travel-adventure',
    color: 'from-teal-400 via-cyan-500 to-blue-500',
    shadowColor: 'shadow-teal-500/40',
    count: '14 products'
  }
];

// ANIMATION VARIANTS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.8
    }
  }
};

const cardHoverVariants = {
  rest: { 
    scale: 1,
    rotateY: 0,
    z: 0
  },
  hover: { 
    scale: 1.02,
    rotateY: 2,
    z: 20,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
      duration: 0.3
    }
  }
};

export default function MensAstrologyPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isPageEntering, setIsPageEntering] = useState(true);

  // PAGE ENTRANCE EFFECT
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsPageEntering(false);
      document.body.style.overflow = 'auto';
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* CINEMATIC PAGE ENTRANCE */}
      <AnimatePresence mode="wait">
        {isPageEntering && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-r from-slate-100 via-white to-slate-100 shadow-2xl"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50"
        initial={{ x: '-100vw', opacity: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1,
          transition: { 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1],
            delay: 0.3 
          }
        }}
      >
        {/* HERO SECTION */}
        <section className="relative py-20 bg-gradient-to-br from-slate-800 via-gray-800 to-slate-900 overflow-hidden">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-light text-white mb-6">
                For <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent font-bold">Men</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Discover powerful astrology solutions designed specifically for men's unique spiritual journey, career growth, and life goals.
              </p>
              
              <motion.div
                className="flex items-center justify-center space-x-6 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
                  <span>160+ Products</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                  <span>8 Categories</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></span>
                  <span>Expert Curated</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-light mb-4 text-slate-800">
                Men's Astrology Categories
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Choose from categories specifically designed to address men's spiritual, professional, and personal growth needs.
              </p>
            </motion.div>

            {/* Categories Grid */}
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {mensCategories.map((category, index) => (
                <motion.div
                  key={category.slug}
                  variants={cardVariants}
                  custom={index}
                >
                  <Link href={`/shop/men/${category.slug}`}>
                    <motion.div
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                      variants={cardHoverVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`}></div>
                        
                        {/* Product Count Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-slate-700">
                          {category.count}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {category.description}
                        </p>

                        {/* Explore Button */}
                        <div className="flex items-center text-amber-600 font-semibold text-sm group-hover:text-amber-700 transition-colors duration-300">
                          <span>Explore Products</span>
                          <motion.svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </div>
                      </div>

                      {/* Border Glow Effect */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none border-2 border-transparent`}></div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link href="/shop/audience">
                <motion.button
                  className="bg-gradient-to-r from-slate-700 to-gray-700 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:from-slate-600 hover:to-gray-600 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Browse Other Audiences
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
} 