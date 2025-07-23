'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Heart, Zap, Shield, Star, Gem, TrendingUp, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About Gemini', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', icon: Heart },
  { id: 'growth', label: 'Growth & Challenges', icon: TrendingUp },
  { id: 'products', label: 'Gemini Products', icon: Shield },
  { id: 'mercury', label: 'Mercury Influence', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function GeminiInfoNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-b border-gray-300 sticky top-0 z-50">
      {/* Main Navigation Bar */}
      <div className="w-full px-0">
        <div className="flex items-center justify-center overflow-x-auto scrollbar-hide min-h-[80px] sm:min-h-[60px]">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => toggleDropdown(item.id)}
                className={`flex items-center gap-2 sm:gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black whitespace-nowrap transition-all duration-300 relative overflow-hidden ${
                  activeDropdown === item.id 
                    ? 'bg-black text-white shadow-lg' 
                    : 'hover:bg-gray-100 hover:shadow-md'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  y: -1,
                }}
                whileTap={{ 
                  scale: 0.98,
                  y: 0
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 17 
                }}
              >
                {activeDropdown === item.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black"
                    layoutId="activeButton"
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.25, 0.46, 0.45, 0.94] 
                    }}
                  />
                )}
                
                <motion.div
                  className="relative z-10 flex items-center gap-2"
                  animate={{
                    scale: activeDropdown === item.id ? 1.05 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    animate={{ 
                      rotate: activeDropdown === item.id ? 360 : 0,
                      scale: activeDropdown === item.id ? 1.1 : 1
                    }}
                    transition={{ 
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                    className="w-5 h-5 sm:w-6 sm:h-6"
                  >
                    <Icon />
                  </motion.div>
                  <span className="font-serif text-sm sm:text-base">{item.label}</span>
                  <motion.div
                    animate={{ 
                      rotate: activeDropdown === item.id ? 180 : 0,
                      scale: activeDropdown === item.id ? 1.2 : 1
                    }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Dropdown Content */}
      <AnimatePresence>
                  {activeDropdown && (
          <motion.div
            key={activeDropdown}
            initial={{ 
              opacity: 0, 
              height: 0,
              y: -20,
              scale: 0.95
            }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              y: -10,
              scale: 0.98
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.25, 0.46, 0.45, 0.94],
              staggerChildren: 0.1
            }}
            className="absolute top-full left-0 right-0 bg-gradient-to-br from-amber-100 via-orange-50 to-orange-100 border-b border-gray-300 shadow-2xl overflow-hidden backdrop-blur-sm px-4 sm:px-0"
            style={{
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/30 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                duration: 1.2, 
                ease: 'easeInOut',
                delay: 0.2
              }}
            />
            <motion.div
              className="max-w-7xl mx-auto relative z-10 px-4 sm:px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                ease: 'easeOut'
              }}
            >
              {activeDropdown === 'about' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">About Gemini</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Element & Quality</h4>
                      <p className="text-black leading-relaxed">Air sign with Mutable quality. Gemini represents communication, adaptability, and intellectual curiosity.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Ruling Planet</h4>
                      <p className="text-black leading-relaxed">Mercury, the planet of communication, intellect, and quick thinking. This gives Gemini their natural gift for expression and learning.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Natural Strengths</h4>
                      <p className="text-black leading-relaxed">Versatility, communication skills, intellectual curiosity, adaptability, and social charm. Gemini excels in connecting with others.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'daily' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Daily Insights for Gemini</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Today&apos;s Forecast</h4>
                      <p className="text-black leading-relaxed mb-4">Mercury aligns with Jupiter today, bringing opportunities for learning, travel, and meaningful conversations. Perfect day for networking.</p>
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                        <p className="text-black font-medium">Lucky Number: 5</p>
                        <p className="text-black font-medium">Best Time: 10:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Weekly Focus</h4>
                      <p className="text-black leading-relaxed">This week emphasizes communication and learning. Perfect time to start new projects, connect with friends, and expand your knowledge.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'lucky' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Lucky Elements for Gemini</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Colors</h4>
                      <p className="text-black">Yellow, Orange, Light Blue, White</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Numbers</h4>
                      <p className="text-black">3, 5, 7, 12, 21</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Days</h4>
                      <p className="text-black">Wednesday, Friday</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Stones</h4>
                      <p className="text-black">Agate, Pearl, Citrine</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'compatibility' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Gemini Compatibility</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Best Matches</h4>
                      <p className="text-black leading-relaxed">Libra, Aquarius, Aries, and Leo. These signs appreciate Gemini&apos;s wit and provide the intellectual stimulation they crave.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Challenging Matches</h4>
                      <p className="text-black leading-relaxed">Pisces and Virgo may find Gemini too scattered, while Gemini may see them as too rigid or emotional.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Friendship Compatibility</h4>
                      <p className="text-black leading-relaxed">Excellent with Air and Fire signs. Gemini values mental connection and stimulating conversations.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'growth' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Growth & Challenges</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Areas for Growth</h4>
                      <p className="text-black leading-relaxed">Learning to focus and commit, developing emotional depth, and finding balance between variety and consistency.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Common Challenges</h4>
                      <p className="text-black leading-relaxed">Restlessness, inconsistency, and sometimes being too superficial. Learning to go deeper and follow through is key.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Gemini Power Collection</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Agate Communication Ring</h4>
                      <p className="text-black mb-3">Enhances communication and mental clarity</p>
                      <button className="bg-gradient-to-r from-amber-100 to-orange-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Citrine Intelligence Stone</h4>
                      <p className="text-black mb-3">Boosts mental energy and creativity</p>
                      <button className="bg-gradient-to-r from-yellow-100 to-amber-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Pearl Harmony Pendant</h4>
                      <p className="text-black mb-3">Promotes emotional balance and wisdom</p>
                      <button className="bg-gradient-to-r from-blue-100 to-cyan-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'mercury' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Mercury Influence on Gemini</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Communication & Learning</h4>
                      <p className="text-black leading-relaxed">Mercury makes Gemini naturally gifted communicators and learners. They excel in writing, speaking, and absorbing new information quickly.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Adaptability & Versatility</h4>
                      <p className="text-black leading-relaxed">Gemini&apos;s mutable nature combined with Mercury&apos;s quick thinking makes them highly adaptable and able to handle multiple tasks simultaneously.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'faq' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Why are Gemini so talkative?</h4>
                      <p className="text-black leading-relaxed">Mercury&apos;s influence makes Gemini natural communicators. They process thoughts through speaking and love sharing ideas with others.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">What careers suit Gemini?</h4>
                      <p className="text-black leading-relaxed">Journalism, teaching, sales, marketing, public relations, and any field requiring communication, versatility, and quick thinking.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">How can Gemini improve relationships?</h4>
                      <p className="text-black leading-relaxed">By developing emotional depth, learning to commit and follow through, and balancing their need for variety with stability.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
} 