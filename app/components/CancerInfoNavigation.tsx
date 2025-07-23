'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles, Heart, Zap, Shield, Star, Gem, TrendingUp, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About Cancer', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', icon: Heart },
  { id: 'growth', label: 'Growth & Challenges', icon: TrendingUp },
  { id: 'products', label: 'Cancer Products', icon: Shield },
  { id: 'moon', label: 'Moon Influence', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function CancerInfoNavigation() {
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
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">About Cancer</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Element & Quality</h4>
                      <p className="text-black leading-relaxed">Water sign with Cardinal quality. Cancer represents emotional depth, nurturing instincts, and strong family bonds.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Ruling Planet</h4>
                      <p className="text-black leading-relaxed">The Moon, the planet of emotions, intuition, and the subconscious. This gives Cancer their deep emotional sensitivity and nurturing nature.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Natural Strengths</h4>
                      <p className="text-black leading-relaxed">Intuition, emotional intelligence, nurturing abilities, loyalty, and strong protective instincts. Cancer excels in creating safe, loving environments.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'daily' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Daily Insights for Cancer</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Today&apos;s Forecast</h4>
                      <p className="text-black leading-relaxed mb-4">The Moon aligns with Venus today, bringing opportunities for emotional healing and deepening relationships. Trust your intuition.</p>
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                        <p className="text-black font-medium">Lucky Number: 2</p>
                        <p className="text-black font-medium">Best Time: 7:00 PM - 9:00 PM</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Weekly Focus</h4>
                      <p className="text-black leading-relaxed">This week emphasizes emotional well-being and family connections. Perfect time to nurture relationships and create a peaceful home environment.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'lucky' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Lucky Elements for Cancer</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Colors</h4>
                      <p className="text-black">Silver, White, Pale Blue, Cream</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Numbers</h4>
                      <p className="text-black">2, 7, 11, 16, 20</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Days</h4>
                      <p className="text-black">Monday, Thursday</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Stones</h4>
                      <p className="text-black">Pearl, Moonstone, Opal</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'compatibility' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Cancer Compatibility</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Best Matches</h4>
                      <p className="text-black leading-relaxed">Scorpio, Pisces, Taurus, and Virgo. These signs appreciate Cancer&apos;s emotional depth and provide the security they crave.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Challenging Matches</h4>
                      <p className="text-black leading-relaxed">Aries and Libra may find Cancer too emotional, while Cancer may see them as too independent or superficial.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Friendship Compatibility</h4>
                      <p className="text-black leading-relaxed">Excellent with Water and Earth signs. Cancer values emotional connection and loyalty in friendships.</p>
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
                      <p className="text-black leading-relaxed">Learning to set healthy boundaries, developing independence, and balancing emotional sensitivity with practical action.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Common Challenges</h4>
                      <p className="text-black leading-relaxed">Over-sensitivity, moodiness, and sometimes being too clingy. Learning to manage emotions and develop self-reliance is key.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Cancer Power Collection</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Pearl Emotional Ring</h4>
                      <p className="text-black mb-3">Enhances emotional balance and intuition</p>
                      <button className="bg-gradient-to-r from-amber-100 to-orange-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Moonstone Intuition Stone</h4>
                      <p className="text-black mb-3">Amplifies psychic abilities and dreams</p>
                      <button className="bg-gradient-to-r from-blue-100 to-cyan-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Opal Protection Pendant</h4>
                      <p className="text-black mb-3">Provides emotional protection and healing</p>
                      <button className="bg-gradient-to-r from-purple-100 to-pink-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'moon' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Moon Influence on Cancer</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Emotional Depth & Intuition</h4>
                      <p className="text-black leading-relaxed">The Moon makes Cancer deeply intuitive and emotionally sensitive. They have a natural ability to understand others&apos; feelings and create nurturing environments.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Nurturing & Protection</h4>
                      <p className="text-black leading-relaxed">Cancer&apos;s lunar influence gives them strong maternal instincts and a deep need to protect and care for loved ones.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'faq' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Why are Cancer so emotional?</h4>
                      <p className="text-black leading-relaxed">The Moon&apos;s influence makes Cancer naturally sensitive and emotionally attuned. They feel deeply and are highly intuitive.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">What careers suit Cancer?</h4>
                      <p className="text-black leading-relaxed">Nursing, counseling, teaching, real estate, hospitality, and any field requiring empathy, care, and emotional intelligence.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">How can Cancer improve relationships?</h4>
                      <p className="text-black leading-relaxed">By setting healthy boundaries, developing independence, and learning to communicate needs clearly while maintaining their caring nature.</p>
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