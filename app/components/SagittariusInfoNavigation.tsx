'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Heart, Zap, Shield, Star, Gem, TrendingUp, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About Sagittarius', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', icon: Heart },
  { id: 'growth', label: 'Growth & Challenges', icon: TrendingUp },
  { id: 'products', label: 'Sagittarius Products', icon: Shield },
  { id: 'jupiter', label: 'Jupiter Influence', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function SagittariusInfoNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* NAVIGATION BAR */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => toggleDropdown(item.id)}
                className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg font-serif font-semibold text-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                {item.label}
                {activeDropdown === item.id ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* DROPDOWN CONTENT */}
        <AnimatePresence mode="wait">
          {activeDropdown && (
            <motion.div
              key={activeDropdown}
              className="bg-white rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {activeDropdown === 'about' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">About Sagittarius</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Element & Quality</h4>
                      <p className="text-black leading-relaxed">Fire sign with Mutable quality. Sagittarius represents exploration, optimism, and a quest for truth and adventure.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Ruling Planet</h4>
                      <p className="text-black leading-relaxed">Jupiter, the planet of expansion, wisdom, and good fortune. This gives Sagittarius their adventurous spirit, optimism, and love for learning.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Natural Strengths</h4>
                      <p className="text-black leading-relaxed">Optimism, curiosity, independence, honesty, and a love for travel and new experiences. Sagittarius excels in inspiring others to explore.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'daily' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Daily Insights for Sagittarius</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Today&apos;s Forecast</h4>
                      <p className="text-black leading-relaxed mb-4">Jupiter aligns with Mercury today, bringing opportunities for learning, travel, and expanding your horizons. Embrace new ideas and adventures.</p>
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl">
                        <p className="text-black font-medium">Lucky Number: 3</p>
                        <p className="text-black font-medium">Best Time: 4:00 PM - 6:00 PM</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Weekly Focus</h4>
                      <p className="text-black leading-relaxed">This week emphasizes adventure and growth. Perfect time to start a new journey, learn something new, or plan a trip.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'lucky' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Lucky Elements for Sagittarius</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Colors</h4>
                      <p className="text-black">Purple, Blue, Gold, Turquoise</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Numbers</h4>
                      <p className="text-black">3, 12, 21, 30, 42</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Days</h4>
                      <p className="text-black">Thursday, Sunday</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Stones</h4>
                      <p className="text-black">Turquoise, Amethyst, Lapis Lazuli, Citrine</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'compatibility' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Sagittarius Compatibility</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Best Matches</h4>
                      <p className="text-black leading-relaxed">Aries, Leo, Libra, and Aquarius. These signs appreciate Sagittarius&apos;s optimism and provide the excitement and freedom they crave.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Challenging Matches</h4>
                      <p className="text-black leading-relaxed">Virgo and Pisces may find Sagittarius too restless, while Sagittarius may see them as too cautious or sensitive.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Friendship Compatibility</h4>
                      <p className="text-black leading-relaxed">Excellent with Fire and Air signs. Sagittarius values adventure, honesty, and open-mindedness in friendships.</p>
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
                      <p className="text-black leading-relaxed">Learning to be more patient, developing focus, and balancing freedom with responsibility. Embracing commitment and follow-through.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Common Challenges</h4>
                      <p className="text-black leading-relaxed">Restlessness, impatience, and sometimes being too blunt. Learning to listen and consider others&apos; feelings is key.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Sagittarius Power Collection</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Turquoise Adventure Stone</h4>
                      <p className="text-black mb-3">Encourages exploration and optimism</p>
                      <button className="bg-gradient-to-r from-yellow-100 to-amber-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Amethyst Wisdom Crystal</h4>
                      <p className="text-black mb-3">Promotes wisdom and spiritual growth</p>
                      <button className="bg-gradient-to-r from-purple-100 to-indigo-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lapis Lazuli Truth Stone</h4>
                      <p className="text-black mb-3">Enhances truth and communication</p>
                      <button className="bg-gradient-to-r from-blue-100 to-cyan-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'jupiter' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Jupiter Influence on Sagittarius</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Expansion & Wisdom</h4>
                      <p className="text-black leading-relaxed">Jupiter gives Sagittarius a love for learning, growth, and expanding their horizons. They are optimistic and open-minded.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Adventure & Optimism</h4>
                      <p className="text-black leading-relaxed">Sagittarius&apos;s Jupiterian influence brings a thirst for adventure, travel, and a positive outlook on life.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'faq' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Why are Sagittarius so adventurous?</h4>
                      <p className="text-black leading-relaxed">Sagittarius&apos;s ruling planet Jupiter brings a love for exploration, learning, and new experiences. They are naturally curious and optimistic.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">What careers suit Sagittarius?</h4>
                      <p className="text-black leading-relaxed">Travel, education, philosophy, publishing, sports, and any field requiring exploration, learning, and open-mindedness.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">How can Sagittarius improve relationships?</h4>
                      <p className="text-black leading-relaxed">By being more patient, listening to others, and balancing their need for freedom with commitment and understanding.</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 