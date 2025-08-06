'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const categories = [
  {
    name: 'Gemstones & Crystals',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    slug: 'gemstones-crystals',
    description: 'Healing stones & sacred crystals',
    color: 'from-emerald-500 to-teal-600',
    icon: '💎'
  },
  {
    name: 'Rudraksha & Malas',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753830/rudrakshamala_pibmxj.jpg',
    slug: 'rudraksha-malas',
    description: 'Sacred beads & prayer malas',
    color: 'from-amber-500 to-orange-600',
    icon: '📿'
  },
  {
    name: 'Spiritual Bracelets',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753181211/bracelets_lqvtwk.png',
    slug: 'bracelets',
    description: 'Energy bracelets & accessories',
    color: 'from-purple-500 to-indigo-600',
    icon: '⚡'
  },
  {
    name: 'Sacred Yantras',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754014/yantra_kppksi.jpg',
    slug: 'yantras-plates',
    description: 'Mystical diagrams & plates',
    color: 'from-yellow-500 to-amber-600',
    icon: '🔯'
  },
  {
    name: 'Astrology Reports',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753178112/astrology_report_paqulv.png',
    slug: 'astrology-reports',
    description: 'Personalized cosmic insights',
    color: 'from-blue-500 to-cyan-600',
    icon: '🌟'
  },
  {
    name: 'Puja Essentials',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754218/puja_samagri_sc0vpt.jpg',
    slug: 'puja-essentials',
    description: 'Complete ritual kits',
    color: 'from-rose-500 to-pink-600',
    icon: '🕯️'
  },
  {
    name: 'Feng Shui Items',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092133/feng_shui_vzelik.jpg',
    slug: 'feng-shui',
    description: 'Harmony & prosperity items',
    color: 'from-green-500 to-emerald-600',
    icon: '🏮'
  },
  {
    name: 'Meditation Tools',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753181389/meditation_tools_vuwblt.png',
    slug: 'meditation-tools',
    description: 'Mindfulness & peace aids',
    color: 'from-violet-500 to-purple-600',
    icon: '🧘'
  },
  // Additional categories (initially hidden)
  {
    name: 'Vastu Solutions',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753079524/Vastu_Shastra_f0haqy.jpg',
    slug: 'vastu-solutions',
    description: 'Home harmony products',
    color: 'from-indigo-500 to-blue-600',
    icon: '🏘️'
  },
  {
    name: 'Spiritual Books',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092132/book_collection_xmxrru.jpg',
    slug: 'spiritual-books',
    description: 'Sacred texts & wisdom',
    color: 'from-orange-500 to-red-600',
    icon: '📚'
  },
  {
    name: 'Healing Remedies',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753178835/healing_d4zat3.png',
    slug: 'healing-remedies',
    description: 'Natural healing solutions',
    color: 'from-teal-500 to-green-600',
    icon: '🌿'
  },
  {
    name: 'Cosmic Jewelry',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092130/jewelery_tbvrw1.jpg',
    slug: 'cosmic-jewelry',
    description: 'Celestial accessories',
    color: 'from-pink-500 to-rose-600',
    icon: '✨'
  },
  {
    name: 'Tarot & Divination',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753179851/tarot_bcbqeh.png',
    slug: 'tarot-divination',
    description: 'Cards & divination tools',
    color: 'from-purple-600 to-indigo-700',
    icon: '🔮'
  },
  {
    name: 'Incense & Aromatherapy',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092130/natural_incense_sticks_xa8jr6.jpg',
    slug: 'incense-aromatherapy',
    description: 'Sacred scents & oils',
    color: 'from-amber-600 to-yellow-600',
    icon: '🌸'
  },
  {
    name: 'Protection Amulets',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753179309/amulets_wsxif3.png',
    slug: 'protection-amulets',
    description: 'Shields & protective charms',
    color: 'from-red-500 to-pink-600',
    icon: '🛡️'
  },
  {
    name: 'Chakra Healing',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753179627/chakra_healing_zg9orn.png',
    slug: 'chakra-healing',
    description: 'Energy center alignment',
    color: 'from-rainbow-gradient',
    icon: '🌈'
  }
];

// Animation variants - FASTER ANIMATIONS
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // Reduced from 0.1
      delayChildren: 0.1 // Reduced from 0.2
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30, // Reduced from 50
    scale: 0.9, // Reduced from 0.8
    rotateY: -15 // Reduced from -30
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      damping: 25, // Increased for snappier feel
      stiffness: 150, // Increased from 100
      duration: 0.5 // Reduced from 0.8
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
    scale: 1.03, // Reduced from 1.05
    rotateY: 3, // Reduced from 5
    z: 30, // Reduced from 50
    transition: {
      type: "spring",
      damping: 20, // Increased from 15
      stiffness: 300, // Increased from 200
      duration: 0.2 // Much faster
    }
  }
};

export default function ShopByCategory({ limit }: { limit?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // State for showing all categories
  const [showAll, setShowAll] = useState(false);
  
  // CINEMATIC PAGE ENTRANCE STATE
  const [isPageEntering, setIsPageEntering] = useState(true);
  
  // Show limited categories initially, or all when expanded
  const shownCategories = limit && !showAll 
    ? categories.slice(0, limit) 
    : showAll 
      ? categories 
      : categories.slice(0, 8); // Default to 8 categories

  // CINEMATIC PAGE ENTRANCE EFFECT
  useEffect(() => {
    // Only run on /shop/categories page (no limit prop)
    if (!limit) {
      document.body.style.overflow = 'hidden';
      
      const timer = setTimeout(() => {
        setIsPageEntering(false);
        document.body.style.overflow = 'auto';
      }, 100);
      
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'auto';
      };
    }
  }, [limit]);

  return (
    <>
      {/* ELEGANT PAGE ENTRANCE - BOOK PAGE FROM LEFT */}
      <AnimatePresence mode="wait">
        {!limit && isPageEntering && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-r from-amber-100 via-white to-amber-100 shadow-2xl"
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          />
        )}
      </AnimatePresence>

      <motion.section 
        className="w-full py-20 bg-gradient-to-b from-slate-50 via-white to-purple-50/30 relative overflow-hidden"
        initial={!limit ? { x: '-100vw', opacity: 0 } : false}
        animate={!limit ? { 
          x: 0, 
          opacity: 1,
          transition: { 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1],
            delay: 0.3 
          }
        } : false}
      >
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-amber-300/10 to-yellow-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }} // Faster
        >
          <h2 className="text-4xl md:text-6xl font-light mb-4 bg-gradient-to-r from-slate-800 via-purple-800 to-slate-800 bg-clip-text text-transparent leading-tight">
            Explore Sacred Realms
          </h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-amber-400 mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }} // Faster
          />
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of spiritual treasures, each category offering unique pathways to enlightenment and well-being.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8"
        >
          {shownCategories.map((category, index) => (
            <motion.div
              key={category.slug}
              variants={itemVariants}
              custom={index}
            >
              <Link href={`/shop/category/${category.slug}`}>
                <motion.div
                  className="group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 overflow-hidden cursor-pointer" // Faster transition
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }} // Much faster tap
                >
                  {/* Gradient background overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-200`}></div> {/* Faster */}
                  
                  {/* Floating icon */}
                  <motion.div
                    className="absolute -top-2 -right-2 text-4xl opacity-20 group-hover:opacity-60 transition-opacity duration-200" // Faster
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 3, // Faster rotation
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {category.icon}
                  </motion.div>

                  {/* Image container */}
                  <motion.div
                    className="relative w-full aspect-square mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:shadow-lg transition-shadow duration-200" // Faster
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }} // Faster and subtler
                  >
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      draggable={false}
                      priority={index < 4}
                      loading={index < 4 ? undefined : 'lazy'}
                      onError={(e) => {
                        // fallback for next/image: use placeholder if error
                        if (e.currentTarget instanceof HTMLImageElement) {
                          e.currentTarget.src = '/images/placeholder.jpg';
                        }
                      }}
                    />
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200`}></div>
                    
                    {/* Shimmer effect - FASTER */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{
                        x: [-100, 300]
                      }}
                      transition={{
                        duration: 0.8, // Much faster shimmer
                        repeat: Infinity,
                        repeatDelay: 1.5, // Faster repeat
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <motion.h3
                      className="text-xl font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-purple-700 group-hover:bg-clip-text transition-all duration-200" // Faster
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      {category.name}
                    </motion.h3>
                    <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-700 transition-colors duration-200"> {/* Faster */}
                      {category.description}
                    </p>

                    {/* Explore button */}
                    <motion.div
                      className="mt-4 flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200" // Faster
                      initial={{ x: -10 }}
                      whileHover={{ x: 0, transition: { duration: 0.15 } }} // Much faster
                    >
                      <span className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent mr-2`}>
                        Explore Collection
                      </span>
                      <motion.svg
                        className={`w-4 h-4 text-slate-600`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 3, 0] }} // Reduced movement
                        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }} // Faster
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </motion.div>
                  </div>

                  {/* Border glow effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-200 pointer-events-none`} // Faster
                       style={{ padding: '2px' }}>
                    <div className="w-full h-full bg-white rounded-3xl"></div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Expand/Collapse Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }} // Faster
        >
          {!showAll ? (
            <motion.button
              onClick={() => setShowAll(true)}
              className="px-12 py-4 bg-gradient-to-r from-slate-800 to-purple-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-slate-700 hover:to-purple-700 transition-all duration-200 text-lg" // Faster
              whileHover={{ scale: 1.03, y: -1, transition: { duration: 0.15 } }} // Faster and subtler
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }} // Much faster
            >
              <span className="flex items-center space-x-2">
                <span>Discover All Sacred Collections</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, -2, 0] }} // Bounce effect
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </span>
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setShowAll(false)}
              className="px-12 py-4 bg-gradient-to-r from-purple-800 to-slate-800 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-slate-700 transition-all duration-200 text-lg"
              whileHover={{ scale: 1.03, y: -1, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="flex items-center space-x-2">
                <span>Show Less Categories</span>
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ y: [0, 2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </motion.svg>
              </span>
            </motion.button>
          )}
                 </motion.div>
       </div>
      </motion.section>
    </>
   );
 }