'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Product announcements and special offers
const announcements = [
  {
    icon: '🌟',
    text: 'New Collection: Sacred Gemstone Bracelets Now Available',
    link: '/shop/bracelets',
    highlight: true
  },
  {
    icon: '💎',
    text: 'Limited Edition: Cosmic Calendar 2024 - Only 50 Left!',
    link: '/shop/cosmic-calendar',
    highlight: true
  },
  {
    icon: '🔮',
    text: 'Free Shipping on Orders Above ₹999 - Today Only!',
    link: '/shop',
    highlight: false
  },
  {
    icon: '📿',
    text: 'Rudraksha Malas: Handpicked from Nepal Mountains',
    link: '/shop/rudraksha-malas',
    highlight: false
  },
  {
    icon: '⭐',
    text: 'Flash Sale: 30% Off All Yantras - Limited Time!',
    link: '/shop/yantras-plates',
    highlight: true
  },
  {
    icon: '🕯️',
    text: 'Puja Essentials Kit: Complete Spiritual Collection',
    link: '/shop/puja-essentials',
    highlight: false
  },
  {
    icon: '🌙',
    text: 'Personalized Birth Chart Reading - 50% Off This Week',
    link: '/services/personal-reading',
    highlight: true
  },
  {
    icon: '✨',
    text: 'New Arrivals: Healing Crystal Sets from Himalayan Caves',
    link: '/shop/gemstones-crystals',
    highlight: false
  }
];

// Triple duplicate for seamless loop with NO BLANKS
const tickerItems = [...announcements, ...announcements, ...announcements];

export default function ProductAnnouncementTicker() {
  return (
    <div className="relative w-screen overflow-hidden bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 py-3 shadow-lg"
         style={{ 
           marginLeft: 'calc(-50vw + 50%)', 
           marginRight: 'calc(-50vw + 50%)',
           maxWidth: '100vw'
         }}>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-600/90 via-orange-500/90 to-amber-600/90" />
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Ticker Content */}
      <div className="relative z-10">
        <motion.div
          className="flex whitespace-nowrap"
          style={{ paddingLeft: '100%' }}
          animate={{
            x: ["-100%", `-${100 + (100 * announcements.length / 3)}%`]
          }}
          transition={{
            duration: 120, // MUCH SLOWER - 2 minutes per cycle
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {tickerItems.map((item, index) => (
            <div key={`${item.icon}-${index}`} className="flex-shrink-0 mr-8">
              <Link href={item.link}>
                <motion.div
                  className={`flex items-center space-x-3 px-6 py-2 rounded-full cursor-pointer transition-all duration-300 ${
                    item.highlight 
                      ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm shadow-lg' 
                      : 'hover:bg-white/15'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon */}
                  <motion.span 
                    className="text-2xl"
                    animate={item.highlight ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                  >
                    {item.icon}
                  </motion.span>

                  {/* Text */}
                  <span className={`text-white font-medium text-sm md:text-base ${
                    item.highlight ? 'font-bold drop-shadow-lg' : ''
                  }`}>
                    {item.text}
                  </span>

                  {/* Highlight indicator */}
                  {item.highlight && (
                    <div className="flex items-center space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-yellow-300 rounded-full"
                        animate={{ 
                          opacity: [1, 0.3, 1],
                          scale: [1, 0.8, 1] 
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity 
                        }}
                      />
                      <span className="text-yellow-200 text-xs font-bold">NEW</span>
                    </div>
                  )}

                  {/* Arrow indicator */}
                  <motion.svg
                    className="w-4 h-4 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </motion.div>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Top edge glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
      
      {/* Bottom edge glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />
    </div>
  );
} 