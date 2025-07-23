'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UniversalZodiacBanner from '../../../components/UniversalZodiacBanner';
import PiscesInfoNavigation from '../../../components/PiscesInfoNavigation';
import PiscesProductRecommendations from '../../../components/PiscesProductRecommendations';
import { Statistics } from '../../../components/Statistics';
import SimpleHorizontalBanner from '../../../components/SimpleHorizontalBanner';

export default function PiscesZodiacPage() {
  const [isPageEntering, setIsPageEntering] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // PAGE ENTRANCE EFFECT
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setIsPageEntering(false);
      setIsLoaded(true);
      document.body.style.overflow = 'auto';
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* CINEMATIC PAGE ENTRANCE OVERLAY */}
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

      {/* MAIN PAGE CONTENT */}
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-yellow-50/40"
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        
            {/* UNIVERSAL ZODIAC BANNER */}
    <UniversalZodiacBanner signKey="pisces" />

    {/* HORIZONTAL DROPDOWN NAVIGATION */}
    <PiscesInfoNavigation />

    {/* MAIN CONTENT AREA - FULL WIDTH */}
    <motion.div 
      className="w-full bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={isLoaded ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      <div className="max-w-7xl mx-auto p-8 pt-12">
        <PiscesProductRecommendations />
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
          className="fixed bottom-8 right-8 z-40 space-y-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {/* CHAT WITH ASTROLOGER */}
          <motion.button
            className="bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute right-16 bg-white text-black px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-serif border border-gray-200">
              Chat with Astrologer
            </span>
          </motion.button>

          {/* DAILY HOROSCOPE */}
          <motion.button
            className="bg-white text-black p-4 rounded-full shadow-2xl hover:bg-gray-100 border border-gray-200 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <span className="absolute right-16 bg-black text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-serif">
              Daily Horoscope
            </span>
          </motion.button>
        </motion.div>

        {/* RESPONSIVE MOBILE BOTTOM NAVIGATION */}
        <motion.div
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-orange-200/30 px-4 py-3 z-30"
          initial={{ opacity: 0, y: 100 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex justify-between items-center">
            <button className="flex flex-col items-center py-2 px-4 text-orange-800">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold mb-1">
                ♓
              </div>
              <span className="text-xs font-medium font-serif">Pisces</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-slate-600">
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs font-medium font-serif">Shop</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-slate-600">
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-xs font-medium font-serif">Reading</span>
            </button>
            <button className="flex flex-col items-center py-2 px-4 text-slate-600">
              <svg className="w-5 h-5 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs font-medium font-serif">Consult</span>
            </button>
          </div>
        </motion.div>

        {/* GLOBAL STYLES FOR REFINED PISCES THEME */}
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600&display=swap');
          
          .pisces-glow {
            box-shadow: 0 0 25px rgba(249, 115, 22, 0.15);
          }
          
          .pisces-warm-animation {
            position: relative;
            overflow: hidden;
          }
          
          .pisces-warm-animation::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(249, 115, 22, 0.05) 0%, transparent 70%);
            animation: warmGlow 6s ease-in-out infinite alternate;
          }
          
          @keyframes warmGlow {
            0% { transform: scale(0.95) rotate(0deg); opacity: 0.3; }
            100% { transform: scale(1.05) rotate(180deg); opacity: 0.6; }
          }
          
          .neptune-energy-pulse {
            animation: neptuneEnergy 4s ease-in-out infinite;
          }
          
          @keyframes neptuneEnergy {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(249, 115, 22, 0.12);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 35px rgba(249, 115, 22, 0.25);
              transform: scale(1.008);
            }
          }
          
          /* Custom scrollbar for warm Pisces theme */
          ::-webkit-scrollbar {
            width: 10px;
          }
          
          ::-webkit-scrollbar-track {
            background: #fff7ed;
            border-radius: 6px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #f97316, #fbbf24);
            border-radius: 6px;
            border: 2px solid #fff7ed;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #ea580c, #f59e0b);
          }
          
          /* Rich typography and sophisticated styling */
          .font-serif {
            font-family: 'Playfair Display', serif;
          }
          
          .backdrop-blur-glass {
            background: rgba(255, 255, 255, 0.90);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(249, 115, 22, 0.08);
          }
          
          .warm-gradient {
            background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%);
          }
          
          .text-shadow-soft {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
        `}</style>
      </motion.div>
    </>
  );
} 