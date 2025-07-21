'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

// ARIES-SPECIFIC PRODUCTS & SERVICES
const ariesProducts = [
  {
    name: 'Mars Energy Bracelet',
    description: 'Enhance leadership and courage with Mars-powered gemstone bracelet',
    image: '/images/course-1.jpg',
    price: '₹2,499',
    slug: 'mars-energy-bracelet',
    category: 'Jewelry'
  },
  {
    name: 'Red Coral Ring',
    description: 'Boost confidence and overcome obstacles with authentic red coral',
    image: '/images/course-2.jpg',
    price: '₹4,999',
    slug: 'red-coral-ring',
    category: 'Gemstones'
  },
  {
    name: 'Career Success Yantra',
    description: 'Accelerate professional growth with Mars yantra for Aries natives',
    image: '/images/course-3.jpg',
    price: '₹1,299',
    slug: 'career-success-yantra',
    category: 'Yantras'
  },
  {
    name: 'Leadership Consultation',
    description: 'One-on-one astrology session to unlock your natural leadership potential',
    image: '/images/course-4.jpg',
    price: '₹2,199',
    slug: 'leadership-consultation',
    category: 'Consultations'
  },
  {
    name: 'Aries Birth Chart Reading',
    description: 'Detailed natal chart analysis focused on Aries strengths and challenges',
    image: '/images/course-5.jpg',
    price: '₹1,799',
    slug: 'aries-birth-chart',
    category: 'Readings'
  },
  {
    name: 'Mars Puja Kit',
    description: 'Complete ritual kit to strengthen Mars energy and reduce aggression',
    image: '/images/course-6.jpg',
    price: '₹999',
    slug: 'mars-puja-kit',
    category: 'Puja Kits'
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
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
      duration: 0.8
    }
  }
};

export default function AriesZodiacPage() {
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
            className="fixed inset-0 z-50 bg-gradient-to-r from-red-100 via-white to-orange-100 shadow-2xl"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50"
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
        <section className="relative py-20 bg-gradient-to-br from-red-600 via-orange-600 to-red-700 overflow-hidden">
          
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
              <div className="flex items-center justify-center mb-6">
                <span className="text-8xl mr-4">♈</span>
                <div>
                  <h1 className="text-5xl md:text-7xl font-light text-white mb-2">
                    <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent font-bold">Aries</span>
                  </h1>
                  <p className="text-orange-200 text-lg">March 21 - April 19</p>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                Bold, ambitious, and energetic. Discover powerful astrology products crafted specifically for your fiery Aries nature.
              </p>
              
              <motion.div
                className="flex items-center justify-center space-x-6 text-orange-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></span>
                  <span>Fire Element</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></span>
                  <span>Mars Ruled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></span>
                  <span>Cardinal Sign</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* PRODUCTS SECTION */}
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
                Aries Collection
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 mx-auto rounded-full mb-6"></div>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Specially curated products and services that align with your Aries energy and help you achieve your ambitious goals.
              </p>
            </motion.div>

            {/* Products Grid */}
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {ariesProducts.map((product, index) => (
                <motion.div
                  key={product.slug}
                  variants={cardVariants}
                  custom={index}
                >
                  <Link href={`/shop/product/${product.slug}`}>
                    <motion.div
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-100"
                      whileHover={{ scale: 1.02, y: -8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 right-4 bg-red-500 text-white rounded-full px-3 py-1 text-sm font-semibold">
                          {product.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                          {product.description}
                        </p>

                        {/* Price & CTA */}
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-red-600">
                            {product.price}
                          </span>
                          <motion.button
                            className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold px-4 py-2 rounded-full text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>

                      {/* Border Glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
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
              <Link href="/shop/zodiac">
                <motion.button
                  className="bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:from-red-500 hover:to-orange-500 transition-all duration-300 mr-4"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View All Zodiac Signs
                </motion.button>
              </Link>
              
              <Link href="/daily-horoscope/aries">
                <motion.button
                  className="bg-white text-red-600 font-semibold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl border-2 border-red-600 hover:bg-red-50 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Daily Aries Horoscope
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
} 