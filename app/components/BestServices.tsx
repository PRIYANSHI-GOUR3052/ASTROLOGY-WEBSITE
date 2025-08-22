'use client'

import { useLanguage } from '../contexts/useLanguage'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { services as servicesData } from '../../data/services.js'
import { ReusableServiceCard } from './ReusableServiceCard'

export function BestServices() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responsiveCardsPerView, setResponsiveCardsPerView] = useState(5);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollStep = 1;

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setResponsiveCardsPerView(1); // Mobile: 1 card
      } else if (width < 1024) {
        setResponsiveCardsPerView(2); // Tablet: 2 cards
      } else if (width < 1280) {
        setResponsiveCardsPerView(3); // Small desktop: 3 cards
      } else if (width < 1536) {
        setResponsiveCardsPerView(4); // Medium desktop: 4 cards
      } else {
        setResponsiveCardsPerView(5); // Large desktop: 5 cards
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  // Use imported services data and select the first 6 services for display
  const displayServices = servicesData.slice(0, 6);
  const totalCards = displayServices.length;
  const maxIndex = Math.max(0, totalCards - responsiveCardsPerView);
  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < maxIndex;

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && canScrollLeft) {
      setCurrentIndex(Math.max(0, currentIndex - scrollStep));
    } else if (direction === 'right' && canScrollRight) {
      setCurrentIndex(Math.min(maxIndex, currentIndex + scrollStep));
    }
  };

  return (
    <section className="min-h-screen py-16 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl p-10 mb-12 text-center shadow-xl overflow-hidden"
          style={{ backgroundColor: '#FEFBF2' }}
        >
          <div className="absolute inset-0 z-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 10%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.08) 0%, transparent 15%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 10%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 12%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 10%)', backgroundSize: '300px 300px, 400px 400px, 200px 200px, 350px 350px, 250px 250px' }}></div>

          <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-black">
            {t('bestServices.bannerHeading')}
          </h2>
          <p className="relative z-10 text-lg md:text-xl mb-6 opacity-90" style={{ color: '#166534' }}>
            {t('bestServices.bannerDescription')}
          </p>
        </motion.div>

        {/* Services Section */}
        <div className="mb-12" ref={containerRef}>
          {/* Header with controls */}
          <div className="mb-6">
            <div className="flex justify-end">
              <div className="flex items-center gap-4">
                {/* View All Button */}
                <Link href="/services/all">
                  <button className="px-6 py-3 bg-black text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
                    View All
                    <span className="text-white">→</span>
                  </button>
                </Link>
                
                {/* Carousel Navigation */}
                {totalCards > responsiveCardsPerView && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleScroll('left')}
                      disabled={!canScrollLeft}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-sm transition-all duration-200"
                      aria-label="Scroll left"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleScroll('right')}
                      disabled={!canScrollRight}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-sm transition-all duration-200"
                      aria-label="Scroll right"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Carousel container */}
          <div 
            className="relative overflow-hidden cursor-grab active:cursor-grabbing"
            style={{
              width: `${responsiveCardsPerView * (288 + 24) - 24}px`, // Exact width for visible cards only
              maxWidth: '100%',
            }}
            onWheel={(e) => {
              // Only handle horizontal scrolling (Shift+wheel or horizontal wheel)
              if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
                const scrollDirection = (e.deltaX || e.deltaY) > 0 ? 'right' : 'left';
                handleScroll(scrollDirection);
              }
            }}
          >
            <motion.div
              className="flex gap-6"
              animate={{
                x: `-${currentIndex * (288 + 24)}px`, // 288px card width + 24px gap
              }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 300,
              }}
              style={{
                width: `${displayServices.length * (288 + 24)}px`, // Total width for all cards
              }}
              drag="x"
              dragConstraints={{
                left: -maxIndex * (288 + 24),
                right: 0,
              }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                const dragOffset = info.offset.x;
                const dragThreshold = 100;
                
                if (Math.abs(dragOffset) > dragThreshold) {
                  if (dragOffset > 0 && canScrollLeft) {
                    handleScroll('left');
                  } else if (dragOffset < 0 && canScrollRight) {
                    handleScroll('right');
                  }
                }
              }}
            >
              {displayServices.map((service, index) => (
                <div key={service.slug} className="w-72 flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.25, 
                      delay: index * 0.05, 
                      type: 'spring', 
                      stiffness: 300 
                    }}
                  >
                    <ReusableServiceCard 
                      service={service} 
                      viewMode="grid"
                      className="h-full"
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
