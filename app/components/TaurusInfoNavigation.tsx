'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Heart, Target, Zap, Shield, Star, Gem, Users, TrendingUp, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About Taurus', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', icon: Heart },
  { id: 'growth', label: 'Growth & Challenges', icon: TrendingUp },
  { id: 'products', label: 'Taurus Products', icon: Shield },
  { id: 'venus', label: 'Venus Influence', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function TaurusInfoNavigation() {
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
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">About Taurus</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Element & Quality</h4>
                      <p className="text-black leading-relaxed">Earth sign with Fixed quality. Taurus represents stability, determination, and a deep connection to the physical world.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Ruling Planet</h4>
                      <p className="text-black leading-relaxed">Venus, the planet of love, beauty, and harmony. This gives Taurus their appreciation for luxury and aesthetic pleasures.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Natural Strengths</h4>
                      <p className="text-black leading-relaxed">Patience, reliability, sensuality, determination, and a strong work ethic. Taurus excels in building lasting foundations.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'daily' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Daily Insights for Taurus</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Today&apos;s Forecast</h4>
                      <p className="text-black leading-relaxed mb-4">Venus aligns with Jupiter today, bringing opportunities for financial growth and romantic connections. Focus on your long-term goals.</p>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                        <p className="text-black font-medium">Lucky Number: 6</p>
                        <p className="text-black font-medium">Best Time: 2:00 PM - 4:00 PM</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Weekly Focus</h4>
                      <p className="text-black leading-relaxed">This week emphasizes stability and growth. Perfect time to invest in yourself, strengthen relationships, and build your foundation.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'lucky' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Lucky Elements for Taurus</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Colors</h4>
                      <p className="text-black">Green, Pink, White, Light Blue</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Numbers</h4>
                      <p className="text-black">2, 6, 9, 12, 24</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Days</h4>
                      <p className="text-black">Friday, Monday</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Stones</h4>
                      <p className="text-black">Emerald, Rose Quartz, Diamond</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'compatibility' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Taurus Compatibility</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Best Matches</h4>
                      <p className="text-black leading-relaxed">Cancer, Virgo, Capricorn, and Pisces. These signs appreciate Taurus&apos;s stability and provide the emotional depth they crave.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Challenging Matches</h4>
                      <p className="text-black leading-relaxed">Aquarius and Leo may find Taurus too stubborn, while Taurus may see them as too unpredictable.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Friendship Compatibility</h4>
                      <p className="text-black leading-relaxed">Excellent with Earth and Water signs. Taurus values loyalty and deep, meaningful connections.</p>
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
                      <p className="text-black leading-relaxed">Learning to embrace change, developing flexibility, and opening up to new experiences while maintaining your core values.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Common Challenges</h4>
                      <p className="text-black leading-relaxed">Stubbornness, resistance to change, and sometimes being too materialistic. Learning to let go and adapt is key.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Taurus Power Collection</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Emerald Harmony Ring</h4>
                      <p className="text-black mb-3">Enhances love, prosperity, and emotional balance</p>
                      <button className="bg-gradient-to-r from-green-100 to-emerald-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Rose Quartz Bracelet</h4>
                      <p className="text-black mb-3">Promotes self-love and romantic harmony</p>
                      <button className="bg-gradient-to-r from-pink-100 to-rose-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Diamond Clarity Stone</h4>
                      <p className="text-black mb-3">Amplifies inner strength and clarity</p>
                      <button className="bg-gradient-to-r from-blue-100 to-cyan-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'venus' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Venus Influence on Taurus</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Love & Relationships</h4>
                      <p className="text-black leading-relaxed">Venus makes Taurus deeply romantic and loyal. They seek stable, long-term relationships and value physical affection and quality time.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Aesthetics & Luxury</h4>
                      <p className="text-black leading-relaxed">Taurus has an innate appreciation for beauty, art, and luxury. They enjoy surrounding themselves with quality and comfort.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'faq' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Why are Taurus so stubborn?</h4>
                      <p className="text-black leading-relaxed">Taurus&apos;s fixed earth nature makes them determined and persistent. Once they set their mind to something, they rarely give up.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">What careers suit Taurus?</h4>
                      <p className="text-black leading-relaxed">Finance, real estate, agriculture, culinary arts, and any field requiring patience, reliability, and attention to detail.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">How can Taurus improve relationships?</h4>
                      <p className="text-black leading-relaxed">By being more flexible, communicating openly about their needs, and learning to compromise while maintaining their values.</p>
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