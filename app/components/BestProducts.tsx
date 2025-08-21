'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Home, Map, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/useLanguage';
import { useEffect, useRef, useState } from 'react';
import { ReusableProductCard } from './ReusableProductCard';
import { products } from '../../data/products.js';

export function BestProducts() {
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

  // Use first 8 products for display
  const displayProducts = products.slice(0, 8);
  const totalCards = displayProducts.length;
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
    <section className="py-16 sm:py-24 bg-white font-sans" style={{ width: '97vw', margin: '0 auto' }}>
      <div className="w-full p-0 m-0">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div
            className="rounded-3xl shadow-md"
            style={{
              background: 'linear-gradient(90deg, #fdf6f2 0%, #f6f1fa 50%, #e3f2fd 100%)',
              boxShadow: '0 4px 16px 0 rgba(36, 34, 68, 0.08)',
              padding: '3rem 1.5rem',
              borderRadius: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-2"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                color: '#111',
                letterSpacing: '-0.01em',
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              Explore our Best Products
            </h1>
            <div
              className="text-lg md:text-xl font-medium"
              style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                color: '#374151',
                textAlign: 'center',
                marginTop: '0.5rem',
              }}
            >
              Discover our most popular astrology products
            </div>
          </div>
        </div>

        {/* Products Carousel Section */}
        <div className="mb-12" ref={containerRef}>
          {/* Header with controls */}
          <div className="mb-6">
            <div className="flex justify-end">
              <div className="flex items-center gap-4">
                {/* View All Button */}
                <Link href="/shop/all-products">
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
                width: `${displayProducts.length * (288 + 24)}px`, // Total width for all cards
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
              {displayProducts.map((product, index) => (
                <div key={product.id} className="w-72 flex-shrink-0">
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
                    <ReusableProductCard 
                      product={product} 
                      viewMode="grid"
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