'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Heart, Zap, Shield, Star, Gem, TrendingUp, HelpCircle } from 'lucide-react';

const navigationItems = [
  { id: 'about', label: 'About Scorpio', icon: Sparkles },
  { id: 'daily', label: 'Daily Insights', icon: Star },
  { id: 'lucky', label: 'Lucky Elements', icon: Gem },
  { id: 'compatibility', label: 'Compatibility', icon: Heart },
  { id: 'growth', label: 'Growth & Challenges', icon: TrendingUp },
  { id: 'products', label: 'Scorpio Products', icon: Shield },
  { id: 'pluto', label: 'Pluto Influence', icon: Zap },
  { id: 'faq', label: 'FAQ', icon: HelpCircle }
];

export default function ScorpioInfoNavigation() {
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
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">About Scorpio</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Element & Quality</h4>
                      <p className="text-black leading-relaxed">Water sign with Fixed quality. Scorpio represents transformation, depth, and a powerful drive for truth and intensity.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Ruling Planet</h4>
                      <p className="text-black leading-relaxed">Pluto (and Mars, traditionally), the planet of transformation, power, and rebirth. This gives Scorpio their intensity, resilience, and magnetic presence.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Natural Strengths</h4>
                      <p className="text-black leading-relaxed">Determination, intuition, emotional depth, resourcefulness, and the ability to transform and heal. Scorpio excels in uncovering hidden truths.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'daily' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Daily Insights for Scorpio</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Today&apos;s Forecast</h4>
                      <p className="text-black leading-relaxed mb-4">Pluto aligns with the Moon today, bringing opportunities for deep emotional healing and powerful transformation. Trust your intuition.</p>
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
                        <p className="text-black font-medium">Lucky Number: 9</p>
                        <p className="text-black font-medium">Best Time: 8:00 PM - 10:00 PM</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Weekly Focus</h4>
                      <p className="text-black leading-relaxed">This week emphasizes transformation and renewal. Perfect time to let go of the past, embrace change, and focus on personal growth.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'lucky' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Lucky Elements for Scorpio</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-red-50 to-maroon-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Colors</h4>
                      <p className="text-black">Deep red, maroon, black, and dark purple</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Numbers</h4>
                      <p className="text-black">8, 11, 18, and 22</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Stones</h4>
                      <p className="text-black">Obsidian, garnet, malachite, and topaz</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Lucky Days</h4>
                      <p className="text-black">Tuesday and Thursday</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'compatibility' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Scorpio Compatibility</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Best Matches</h4>
                      <p className="text-black leading-relaxed">Cancer, Pisces, Virgo, and Capricorn. These signs appreciate Scorpio&apos;s depth and provide the loyalty and stability they need.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Challenging Matches</h4>
                      <p className="text-black leading-relaxed">Leo and Aquarius may find Scorpio too intense, while Scorpio may see them as too detached or unpredictable.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Friendship Compatibility</h4>
                      <p className="text-black leading-relaxed">Excellent with Water and Earth signs. Scorpio values loyalty, trust, and deep emotional connections in friendships.</p>
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
                      <p className="text-black leading-relaxed">Learning to let go of grudges, developing trust, and embracing vulnerability. Allowing transformation and healing to occur.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Common Challenges</h4>
                      <p className="text-black leading-relaxed">Jealousy, secrecy, and sometimes being too controlling. Learning to trust and open up is key.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Scorpio Power Collection</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Obsidian Transformation Stone</h4>
                      <p className="text-black mb-3">Aids in deep transformation and protection</p>
                      <button className="bg-gradient-to-r from-purple-100 to-indigo-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-maroon-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Garnet Passion Crystal</h4>
                      <p className="text-black mb-3">Boosts passion and determination</p>
                      <button className="bg-gradient-to-r from-red-100 to-maroon-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Malachite Healing Stone</h4>
                      <p className="text-black mb-3">Promotes emotional healing and growth</p>
                      <button className="bg-gradient-to-r from-green-100 to-emerald-100 text-black font-serif font-bold py-2 px-4 rounded-lg">View Details</button>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'pluto' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Pluto Influence on Scorpio</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Transformation & Power</h4>
                      <p className="text-black leading-relaxed">Pluto gives Scorpio a powerful drive for transformation, rebirth, and uncovering hidden truths. They are resilient and resourceful.</p>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold text-black mb-3">Emotional Depth</h4>
                      <p className="text-black leading-relaxed">Scorpio&apos;s Plutonic influence brings emotional depth, intuition, and the ability to heal themselves and others.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeDropdown === 'faq' && (
                <div className="space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-black mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">Why are Scorpio so intense?</h4>
                      <p className="text-black leading-relaxed">Scorpio&apos;s ruling planet Pluto brings intensity, depth, and a desire for transformation. They feel emotions deeply and seek truth in all things.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">What careers suit Scorpio?</h4>
                      <p className="text-black leading-relaxed">Psychology, research, healing, investigation, finance, and any field requiring depth, intuition, and resilience.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-bold text-black mb-2">How can Scorpio improve relationships?</h4>
                      <p className="text-black leading-relaxed">By learning to trust, being more open, and letting go of control. Embracing vulnerability and honest communication is key.</p>
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