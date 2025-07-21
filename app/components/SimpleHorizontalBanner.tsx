'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';

const SimpleHorizontalBanner = () => {
  // ANIMATION STATE: 'grid' or 'poster'
  const [animationState, setAnimationState] = useState('grid');
  const [posterIndex, setPosterIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // LEFT CAROUSEL DATA - MORE IMAGES
  const leftCarouselData = [
    {
      id: 1,
      title: 'Best Sellers',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092133/feng_shui_vzelik.jpg',
      link: '/shop'
    },
    {
      id: 2,
      title: 'New Arrivals', 
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092333/natural_gemstones_kstmb8.jpg',
      link: '/shop'
    },
    {
      id: 3,
      title: 'Premium Collection',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092131/copper_items_nnae1n.jpg',
      link: '/shop'
    },
    {
      id: 4,
      title: 'Sacred Tools',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754014/yantra_kppksi.jpg',
      link: '/shop'
    }
  ];

  // MIDDLE CAROUSEL DATA - MORE IMAGES
  const middleCarouselData = [
    {
      id: 1,
      title: 'Featured Collections',
      subtitle: 'Premium Astrology Products',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752750566/evil_eye_f5ztpo.jpg',
      link: '/shop'
    },
    {
      id: 2,
      title: 'Sacred Yantras',
      subtitle: 'Powerful Spiritual Tools',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754014/yantra_kppksi.jpg',
      link: '/shop/categories'
    },
    {
      id: 3,
      title: 'Gemstone Collection',
      subtitle: 'Natural Healing Stones',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
      link: '/shop'
    },
    {
      id: 4,
      title: 'Meditation Kit',
      subtitle: 'Complete Spiritual Practice',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752750895/health_khmljy.jpg',
      link: '/shop'
    }
  ];

  // RIGHT CAROUSEL DATA - MORE IMAGES  
  const rightCarouselData = [
    {
      id: 1,
      title: 'Special Offers',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752750453/career_ns8gnt.jpg',
      link: '/shop'
    },
    {
      id: 2,
      title: 'Featured Items',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092130/natural_incense_sticks_xa8jr6.jpg',
      link: '/shop'
    },
    {
      id: 3,
      title: 'Trending Now',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092333/natural_gemstones_kstmb8.jpg',
      link: '/shop'
    },
    {
      id: 4,
      title: 'Limited Edition',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753091688/mala_svpxn3.jpg',
      link: '/shop'
    }
  ];

  // FULL POSTER DATA - HORIZONTAL WIDE IMAGES
  const posterData = [
    {
      id: 1,
      title: 'Unlock Your Cosmic Destiny',
      subtitle: 'Premium Astrology Collection',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042871/continue-learning_mtpgqr.jpg',
      link: '/shop',
      direction: 'rightToLeft'
    },
    {
      id: 2,
      title: 'Sacred Gemstone Collection',
      subtitle: 'Transform Your Energy',
      image: 'https://res.cloudinary.com/dxwspucxw/image/upload/c_crop,ar_4:3/v1752753177/naturalstones_xsst5z.jpg',
      link: '/shop',
      direction: 'leftToRight'
    }
  ];

  // ANIMATION SEQUENCE CONTROLLER
  useEffect(() => {
    if (isPaused) return; // PAUSE ANIMATION ON HOVER
    
    const interval = setInterval(() => {
      if (animationState === 'grid') {
        // Switch to first poster
        setAnimationState('poster');
        setPosterIndex(0);
      } else if (animationState === 'poster' && posterIndex === 0) {
        // Switch to second poster
        setPosterIndex(1);
      } else {
        // Back to grid
        setAnimationState('grid');
        setPosterIndex(0);
      }
      setAnimationKey(prev => prev + 1);
    }, 2500); // 2.5 second intervals for faster timing

    return () => clearInterval(interval);
  }, [animationState, posterIndex, isPaused]);

  // EXIT ANIMATIONS FOR 3-GRID
  const gridExitVariants = {
    leftExit: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    },
    rightExit: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    },
    middleExit: {
      y: '-100%',
      opacity: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  // ENTRANCE ANIMATIONS FOR 3-GRID
  const gridEnterVariants = {
    leftEnter: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }
    },
    rightEnter: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.2 }
    },
    middleEnter: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.15 }
    }
  };

  // POSTER ANIMATIONS
  const posterVariants = {
    rightToLeftEnter: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    },
    rightToLeftExit: {
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    },
    leftToRightEnter: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    },
    leftToRightExit: {
      x: '100%',
      opacity: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <div 
      className="w-screen bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 overflow-hidden relative"
      style={{ 
        marginLeft: 'calc(-50vw + 50%)', 
        marginRight: 'calc(-50vw + 50%)',
        maxWidth: '100vw'
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[450px] w-full">
        
        <AnimatePresence mode="wait">
          {animationState === 'grid' && (
            <motion.div
              key={`grid-${animationKey}`}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-5 gap-1 px-2 h-full"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              
              {/* LEFT CAROUSEL - 1 COLUMN */}
              <motion.div
                className="lg:col-span-1 relative bg-white rounded-xl shadow-lg overflow-hidden h-full"
                initial={{ x: '-100%', opacity: 0 }}
                animate={gridEnterVariants.leftEnter}
                exit={gridExitVariants.leftExit}
              >
                <Carousel
                  className="w-full h-full"
                  opts={{ align: "start", loop: true }}
                  plugins={isPaused ? [] : [Autoplay({ delay: 2000, stopOnInteraction: false })]}
                >
                  <CarouselContent className="h-full -ml-0">
                    {leftCarouselData.map((item) => (
                      <CarouselItem key={item.id} className="pl-0 h-full">
                        <Link href={item.link} className="block w-full h-full">
                          <div className="relative w-full h-full group cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover z-0"
                              sizes="(max-width: 768px) 100vw, 20vw"
                              priority={true}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 text-white z-20">
                              <h3 className="text-lg font-bold">{item.title}</h3>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </motion.div>

              {/* MIDDLE WIDE CAROUSEL - 3 COLUMNS */}
              <motion.div
                className="lg:col-span-3 relative bg-white rounded-xl shadow-lg overflow-hidden h-full"
                initial={{ y: '-100%', opacity: 0 }}
                animate={gridEnterVariants.middleEnter}
                exit={gridExitVariants.middleExit}
              >
                <Carousel
                  className="w-full h-full"
                  opts={{ align: "start", loop: true }}
                  plugins={isPaused ? [] : [Autoplay({ delay: 2200, stopOnInteraction: false })]}
                >
                  <CarouselContent className="h-full -ml-0">
                    {middleCarouselData.map((item) => (
                      <CarouselItem key={item.id} className="pl-0 h-full">
                        <Link href={item.link} className="block w-full h-full">
                          <div className="relative w-full h-full group cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover z-0"
                              sizes="(max-width: 768px) 100vw, 60vw"
                              priority={true}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent z-10" />
                            <div className="absolute bottom-8 left-8 text-white z-20">
                              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                              <p className="text-lg opacity-90">{item.subtitle}</p>
                            </div>
                            <div className="absolute top-8 right-8 z-20">
                              <button
                                className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 hover:scale-105 active:scale-95 transition-all pointer-events-none"
                              >
                                Shop Now
                              </button>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </motion.div>

              {/* RIGHT CAROUSEL - 1 COLUMN */}
              <motion.div
                className="lg:col-span-1 relative bg-white rounded-xl shadow-lg overflow-hidden h-full"
                initial={{ x: '100%', opacity: 0 }}
                animate={gridEnterVariants.rightEnter}
                exit={gridExitVariants.rightExit}
              >
                <Carousel
                  className="w-full h-full"
                  opts={{ align: "start", loop: true }}
                  plugins={isPaused ? [] : [Autoplay({ delay: 1800, stopOnInteraction: false })]}
                >
                  <CarouselContent className="h-full -ml-0">
                    {rightCarouselData.map((item) => (
                      <CarouselItem key={item.id} className="pl-0 h-full">
                        <Link href={item.link} className="block w-full h-full">
                          <div className="relative w-full h-full group cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 bg-gray-100">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover z-0"
                              sizes="(max-width: 768px) 100vw, 20vw"
                              priority={true}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                            <div className="absolute bottom-4 left-4 text-white z-20">
                              <h3 className="text-lg font-bold">{item.title}</h3>
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </motion.div>

            </motion.div>
          )}

          {/* FULL POSTER MODE */}
          {animationState === 'poster' && (
            <motion.div
              key={`poster-${posterIndex}-${animationKey}`}
              className="absolute inset-0 w-full h-full px-2"
              initial={{ 
                x: posterData[posterIndex].direction === 'rightToLeft' ? '100%' : '-100%', 
                opacity: 0 
              }}
              animate={
                posterData[posterIndex].direction === 'rightToLeft' 
                  ? posterVariants.rightToLeftEnter 
                  : posterVariants.leftToRightEnter
              }
              exit={
                posterData[posterIndex].direction === 'rightToLeft'
                  ? posterVariants.rightToLeftExit
                  : posterVariants.leftToRightExit
              }
            >
              <div className="relative w-full h-full bg-white rounded-xl shadow-lg overflow-hidden">
                <Link href={posterData[posterIndex].link} className="block w-full h-full">
                  <div className="relative w-full h-full group cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform duration-300 bg-gray-100">
                    <Image
                      src={posterData[posterIndex].image}
                      alt={posterData[posterIndex].title}
                      fill
                      className="object-cover z-0"
                      sizes="100vw"
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
                          {posterData[posterIndex].title}
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 mb-8 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                          {posterData[posterIndex].subtitle}
                        </p>
                        <button
                          className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 hover:scale-105 active:scale-95 transition-all text-lg pointer-events-none animate-in slide-in-from-bottom-4 duration-500 delay-700"
                        >
                          Explore Collection
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    </div>
  );
};

export default SimpleHorizontalBanner; 