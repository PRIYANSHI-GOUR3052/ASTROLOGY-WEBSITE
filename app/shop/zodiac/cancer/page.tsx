'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UniversalZodiacBanner from '../../../components/UniversalZodiacBanner';
import CancerInfoNavigation from '../../../components/CancerInfoNavigation';
import CancerProductRecommendations from '../../../components/CancerProductRecommendations';
import { Statistics } from '../../../components/Statistics';
import SimpleHorizontalBanner from '../../../components/SimpleHorizontalBanner';
import { ShoppingCart, Heart, User, Home, Search, Menu } from 'lucide-react';

export default function CancerZodiacPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate page entrance
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* CINEMATIC PAGE ENTRANCE OVERLAY */}
      <motion.div
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={isLoaded ? { opacity: 0, pointerEvents: 'none' } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="text-white text-4xl font-serif"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isLoaded ? { scale: 1.2, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Cancer
        </motion.div>
      </motion.div>

      {/* MAIN PAGE CONTENT */}
      <motion.div
        className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-yellow-50/40"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* UNIVERSAL ZODIAC BANNER */}
        <UniversalZodiacBanner signKey="cancer" />

        {/* HORIZONTAL DROPDOWN NAVIGATION */}
        <CancerInfoNavigation />

        {/* MAIN CONTENT AREA - FULL WIDTH */}
        <motion.div
          className="w-full bg-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-7xl mx-auto p-4 sm:p-8 pt-8 sm:pt-12">
            <CancerProductRecommendations />
          </div>
        </motion.div>

        {/* STATISTICS SECTION */}
        <motion.div
          className="bg-white py-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <Statistics />
          </div>
        </motion.div>

        {/* SIMPLE HORIZONTAL BANNER */}
        <div className="-mt-8">
          <SimpleHorizontalBanner />
        </div>

        {/* FLOATING ACTION BUTTONS */}
        <motion.div
          className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.button
            className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
          </motion.button>
          <motion.button
            className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
          </motion.button>
          <motion.button
            className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
          </motion.button>
        </motion.div>

        {/* RESPONSIVE MOBILE BOTTOM NAVIGATION */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-30"
          initial={{ y: 100 }}
          animate={isLoaded ? { y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex justify-around items-center">
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-amber-600 transition-colors">
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-amber-600 transition-colors">
              <Search className="w-5 h-5" />
              <span className="text-xs">Search</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-amber-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-xs">Cart</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-amber-600 transition-colors">
              <Menu className="w-5 h-5" />
              <span className="text-xs">Menu</span>
            </button>
          </div>
        </motion.div>

        {/* GLOBAL STYLES FOR REFINED CANCER THEME */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');
          
          .font-serif {
            font-family: 'Playfair Display', serif;
          }
          
          /* Custom scrollbar for Cancer theme */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #fef3c7;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #f59e0b;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #d97706;
          }
          
          /* Smooth animations */
          * {
            scroll-behavior: smooth;
          }
          
          /* Enhanced focus states */
          button:focus, a:focus {
            outline: 2px solid #f59e0b;
            outline-offset: 2px;
          }
        `}</style>
      </motion.div>
    </>
  );
} 