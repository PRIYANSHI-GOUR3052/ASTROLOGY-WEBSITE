'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Heart, Target, Zap, Shield, Star, Gem, Users, TrendingUp, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About Pisces', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', icon: Heart },
  { id: 'growth', label: 'Growth & Challenges', icon: TrendingUp },
  { id: 'products', label: 'Pisces Products', icon: Shield },
  { id: 'neptune', label: 'Neptune Influence', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function PiscesInfoNavigation() {
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
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">About Pisces</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Element & Quality</h4>
                      <p className="text-black leading-relaxed">Water sign with Mutable quality. Pisces represents intuition, compassion, and a deep connection to the spiritual realm.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Ruling Planet</h4>
                      <p className="text-black leading-relaxed">Neptune, the planet of dreams, intuition, and spirituality. This gives Pisces their psychic abilities, compassion, and artistic talents.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Natural Strengths</h4>
                      <p className="text-black leading-relaxed">Intuition, empathy, creativity, spirituality, and compassion. Pisces excels in understanding others and connecting with the divine.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'daily' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Daily Insights for Pisces</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Today&apos;s Forecast</h4>
                      <p className="text-black leading-relaxed mb-4">Neptune aligns with Venus today, bringing heightened intuition and creative inspiration. Trust your instincts and embrace your artistic side.</p>
                      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-xl">
                        <p className="text-black font-medium">Lucky Number: 7</p>
                        <p className="text-black font-medium">Best Time: 9:00 PM - 11:00 PM</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Weekly Focus</h4>
                      <p className="text-black leading-relaxed">This week emphasizes intuition and spiritual growth. Perfect time for meditation, creative projects, and deepening your spiritual connection.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'lucky' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Lucky Elements for Pisces</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Colors</h4>
                      <p className="text-black">Sea Green, Purple, Silver, Turquoise</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Numbers</h4>
                      <p className="text-black">3, 7, 12, 16, 21, 25</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Days</h4>
                      <p className="text-black">Thursday, Monday</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Stones</h4>
                      <p className="text-black">Moonstone, Aquamarine, Amethyst, Pearl</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'compatibility' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Pisces Compatibility</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Best Matches</h4>
                      <p className="text-black leading-relaxed">Cancer, Scorpio, Taurus, and Capricorn. These signs appreciate Pisces&apos;s sensitivity and provide the emotional security they need.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Challenging Matches</h4>
                      <p className="text-black leading-relaxed">Gemini and Sagittarius may find Pisces too emotional, while Pisces may see them as too rational or restless.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Friendship Compatibility</h4>
                      <p className="text-black leading-relaxed">Excellent with Water and Earth signs. Pisces values emotional connection, understanding, and shared spiritual values in friendships.</p>
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
                      <p className="text-black leading-relaxed">Learning to be more practical, developing boundaries, and balancing dreams with reality. Embracing structure and discipline.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Common Challenges</h4>
                      <p className="text-black leading-relaxed">Being too idealistic, emotional overwhelm, and sometimes being too escapist. Learning to stay grounded and practical is key.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Pisces Power Collection</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Moonstone Intuition Crystal</h4>
                      <p className="text-black mb-3">Enhances intuition and psychic abilities</p>
                      <button className="bg-gradient-to-r from-blue-100 to-cyan-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-blue-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Aquamarine Compassion Stone</h4>
                      <p className="text-black mb-3">Promotes compassion and healing</p>
                      <button className="bg-gradient-to-r from-teal-100 to-blue-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Amethyst Spiritual Crystal</h4>
                      <p className="text-black mb-3">Enhances spirituality and protection</p>
                      <button className="bg-gradient-to-r from-purple-100 to-indigo-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'neptune' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Neptune Influence on Pisces</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Dreams & Intuition</h4>
                      <p className="text-black leading-relaxed">Neptune gives Pisces a deep connection to the spiritual realm, heightened intuition, and a natural ability to understand the unseen.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Compassion & Creativity</h4>
                      <p className="text-black leading-relaxed">Pisces&apos;s Neptunian influence brings boundless compassion, artistic talents, and a desire to help and heal others.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'faq' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Why are Pisces so intuitive?</h4>
                      <p className="text-black leading-relaxed">Pisces&apos;s ruling planet Neptune brings a deep connection to the spiritual realm and heightened psychic abilities. They are naturally sensitive to energy and emotions.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">What careers suit Pisces?</h4>
                      <p className="text-black leading-relaxed">Art, music, therapy, healing, spiritual work, charity, and any field requiring empathy, creativity, and helping others.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">How can Pisces improve relationships?</h4>
                      <p className="text-black leading-relaxed">By setting healthy boundaries, being more practical, and balancing their emotional nature with logical thinking and self-care.</p>
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