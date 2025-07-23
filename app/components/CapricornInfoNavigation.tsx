'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Heart, Zap, Shield, Star, Gem, TrendingUp, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About Capricorn', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', icon: Heart },
  { id: 'growth', label: 'Growth & Challenges', icon: TrendingUp },
  { id: 'products', label: 'Capricorn Products', icon: Shield },
  { id: 'saturn', label: 'Saturn Influence', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function CapricornInfoNavigation() {
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
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">About Capricorn</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Element & Quality</h4>
                      <p className="text-black leading-relaxed">Earth sign with Cardinal quality. Capricorn represents ambition, discipline, and a practical approach to achieving goals.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Ruling Planet</h4>
                      <p className="text-black leading-relaxed">Saturn, the planet of discipline, responsibility, and structure. This gives Capricorn their determination, patience, and ability to build lasting foundations.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Natural Strengths</h4>
                      <p className="text-black leading-relaxed">Ambition, discipline, patience, responsibility, and practical wisdom. Capricorn excels in building and achieving long-term goals.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'daily' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Daily Insights for Capricorn</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Today&apos;s Forecast</h4>
                      <p className="text-black leading-relaxed mb-4">Saturn aligns with Venus today, bringing opportunities for building relationships and achieving career goals. Focus on practical steps toward your ambitions.</p>
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl">
                        <p className="text-black font-medium">Lucky Number: 8</p>
                        <p className="text-black font-medium">Best Time: 2:00 PM - 4:00 PM</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Weekly Focus</h4>
                      <p className="text-black leading-relaxed">This week emphasizes discipline and achievement. Perfect time to set new goals, work on long-term projects, and build solid foundations.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'lucky' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Lucky Elements for Capricorn</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Colors</h4>
                      <p className="text-black">Brown, Black, Gray, Dark Green</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Numbers</h4>
                      <p className="text-black">4, 8, 13, 17, 22, 26</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Days</h4>
                      <p className="text-black">Saturday, Tuesday</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Stones</h4>
                      <p className="text-black">Onyx, Obsidian, Jet, Black Tourmaline</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'compatibility' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Capricorn Compatibility</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Best Matches</h4>
                      <p className="text-black leading-relaxed">Taurus, Virgo, Scorpio, and Pisces. These signs appreciate Capricorn&apos;s stability and provide the emotional support they need.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Challenging Matches</h4>
                      <p className="text-black leading-relaxed">Aries and Libra may find Capricorn too serious, while Capricorn may see them as too impulsive or indecisive.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Friendship Compatibility</h4>
                      <p className="text-black leading-relaxed">Excellent with Earth and Water signs. Capricorn values loyalty, reliability, and shared goals in friendships.</p>
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
                      <p className="text-black leading-relaxed">Learning to relax, developing emotional expression, and balancing work with personal life. Embracing spontaneity and joy.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Common Challenges</h4>
                      <p className="text-black leading-relaxed">Being too serious, perfectionism, and sometimes being too rigid. Learning to enjoy life and be more flexible is key.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Capricorn Power Collection</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Onyx Discipline Stone</h4>
                      <p className="text-black mb-3">Strengthens discipline and focus</p>
                      <button className="bg-gradient-to-r from-gray-100 to-slate-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-black-50 to-gray-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Obsidian Protection Crystal</h4>
                      <p className="text-black mb-3">Provides protection and grounding</p>
                      <button className="bg-gradient-to-r from-black-100 to-gray-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-slate-50 to-zinc-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Jet Success Stone</h4>
                      <p className="text-black mb-3">Enhances success and achievement</p>
                      <button className="bg-gradient-to-r from-slate-100 to-zinc-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'saturn' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Saturn Influence on Capricorn</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Discipline & Structure</h4>
                      <p className="text-black leading-relaxed">Saturn gives Capricorn a strong sense of responsibility, discipline, and the ability to build lasting structures and achieve long-term goals.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Patience & Wisdom</h4>
                      <p className="text-black leading-relaxed">Capricorn&apos;s Saturnian influence brings patience, practical wisdom, and a methodical approach to life and success.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'faq' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Why are Capricorn so ambitious?</h4>
                      <p className="text-black leading-relaxed">Capricorn&apos;s ruling planet Saturn brings a strong sense of responsibility and the drive to achieve. They are naturally goal-oriented and disciplined.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">What careers suit Capricorn?</h4>
                      <p className="text-black leading-relaxed">Business, finance, management, law, engineering, and any field requiring discipline, structure, and long-term planning.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">How can Capricorn improve relationships?</h4>
                      <p className="text-black leading-relaxed">By being more emotionally expressive, learning to relax and have fun, and balancing work commitments with personal relationships.</p>
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