'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Heart, Target, Zap, Shield, Star, Gem, Users, TrendingUp, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About Leo', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', icon: Heart },
  { id: 'growth', label: 'Growth & Challenges', icon: TrendingUp },
  { id: 'products', label: 'Leo Products', icon: Shield },
  { id: 'sun', label: 'Sun Influence', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function LeoInfoNavigation() {
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
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">About Leo</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Element & Quality</h4>
                      <p className="text-black leading-relaxed">Fire sign with Fixed quality. Leo represents creativity, leadership, and a natural desire to shine and inspire others.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Ruling Planet</h4>
                      <p className="text-black leading-relaxed">The Sun, the center of our solar system and source of life. This gives Leo their natural charisma, confidence, and radiant personality.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Natural Strengths</h4>
                      <p className="text-black leading-relaxed">Leadership, creativity, generosity, loyalty, and natural charisma. Leo excels in inspiring others and taking center stage.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'daily' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Daily Insights for Leo</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Today&apos;s Forecast</h4>
                      <p className="text-black leading-relaxed mb-4">The Sun aligns with Jupiter today, bringing opportunities for leadership, recognition, and creative success. Your natural charisma is amplified.</p>
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl">
                        <p className="text-black font-medium">Lucky Number: 1</p>
                        <p className="text-black font-medium">Best Time: 12:00 PM - 2:00 PM</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Weekly Focus</h4>
                      <p className="text-black leading-relaxed">This week emphasizes leadership and creativity. Perfect time to take charge, express yourself, and inspire others with your natural talents.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'lucky' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Lucky Elements for Leo</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Colors</h4>
                      <p className="text-black">Gold, Orange, Red, Purple</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Numbers</h4>
                      <p className="text-black">1, 4, 10, 22, 31</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Days</h4>
                      <p className="text-black">Sunday, Tuesday</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Stones</h4>
                      <p className="text-black">Ruby, Amber, Tiger Eye</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'compatibility' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Leo Compatibility</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Best Matches</h4>
                      <p className="text-black leading-relaxed">Aries, Sagittarius, Gemini, and Libra. These signs appreciate Leo&apos;s warmth and provide the admiration and stimulation they crave.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Challenging Matches</h4>
                      <p className="text-black leading-relaxed">Taurus and Scorpio may find Leo too dramatic, while Leo may see them as too stubborn or intense.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Friendship Compatibility</h4>
                      <p className="text-black leading-relaxed">Excellent with Fire and Air signs. Leo values loyalty, fun, and mutual admiration in friendships.</p>
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
                      <p className="text-black leading-relaxed">Learning to share the spotlight, developing humility, and balancing confidence with sensitivity to others&apos; needs.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Common Challenges</h4>
                      <p className="text-black leading-relaxed">Pride, stubbornness, and sometimes being too self-centered. Learning to listen and consider others is key.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Leo Power Collection</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Ruby Leadership Ring</h4>
                      <p className="text-black mb-3">Enhances leadership and charisma</p>
                      <button className="bg-gradient-to-r from-amber-100 to-orange-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Amber Confidence Stone</h4>
                      <p className="text-black mb-3">Boosts self-confidence and creativity</p>
                      <button className="bg-gradient-to-r from-yellow-100 to-amber-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Tiger Eye Power Pendant</h4>
                      <p className="text-black mb-3">Amplifies personal power and protection</p>
                      <button className="bg-gradient-to-r from-red-100 to-orange-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'sun' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Sun Influence on Leo</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Leadership & Charisma</h4>
                      <p className="text-black leading-relaxed">The Sun makes Leo natural leaders with magnetic personalities. They have an innate ability to inspire and motivate others.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Creativity & Expression</h4>
                      <p className="text-black leading-relaxed">Leo&apos;s solar influence gives them a natural flair for drama, creativity, and self-expression. They love to entertain and be entertained.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'faq' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Why are Leo so confident?</h4>
                      <p className="text-black leading-relaxed">The Sun&apos;s influence makes Leo naturally confident and self-assured. They have an innate sense of their own worth and abilities.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">What careers suit Leo?</h4>
                      <p className="text-black leading-relaxed">Acting, politics, teaching, sales, entertainment, and any field requiring leadership, creativity, and public speaking.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">How can Leo improve relationships?</h4>
                      <p className="text-black leading-relaxed">By learning to share attention, developing humility, and balancing their need for recognition with genuine care for others.</p>
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