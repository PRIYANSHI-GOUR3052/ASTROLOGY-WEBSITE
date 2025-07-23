'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  ChevronDown, 
  Star, 
  Calendar, 
  Zap, 
  Heart, 
  Shield, 
  Gem, 
  HelpCircle,
  Sun,
  Moon,
  TrendingUp
} from 'lucide-react';

interface DropdownSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

// Get today's dynamic data
const getTodaysData = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  
  const luckyColors = [
    { name: 'Burnt Sienna', hex: '#B45309', power: 'Leadership & Courage' },
    { name: 'Warm Amber', hex: '#D97706', power: 'Energy & Passion' },
    { name: 'Golden Ochre', hex: '#CA8A04', power: 'Success & Confidence' },
    { name: 'Terracotta', hex: '#DC2626', power: 'Determination & Strength' },
    { name: 'Copper Bronze', hex: '#92400E', power: 'Creativity & Ambition' }
  ];

  const todaysColorIndex = dayOfYear % luckyColors.length;
  const todaysColor = luckyColors[todaysColorIndex];
  const energyLevel = 60 + (dayOfYear % 40);

  const predictions = [
    "Your natural leadership qualities will shine brightly today. Take charge of important decisions.",
    "Mars energy is strong today - perfect time to start new projects or make bold moves.",
    "Your confidence will inspire others. Share your vision and watch people follow your lead.",
    "A day of high energy and motivation. Channel your Aries fire into productive activities.",
    "Your competitive spirit will serve you well today. Embrace challenges with courage.",
    "Today brings opportunities for advancement. Your ambitious nature will open new doors.",
    "Your pioneering spirit is highlighted today. Be the first to try something new."
  ];

  return {
    date: today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
    luckyColor: todaysColor,
    energyLevel,
    prediction: predictions[today.getDay()],
    luckyNumber: (dayOfYear % 9) + 1
  };
};

// Animation variants for content sections
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function AriesInfoNavigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [todaysData] = useState(getTodaysData());
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (sectionId: string) => {
    setActiveDropdown(activeDropdown === sectionId ? null : sectionId);
  };

  const dropdownSections: DropdownSection[] = [
    {
      id: 'about',
      title: 'About Aries',
      icon: <Star className="w-4 h-4" />,
      content: (
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 px-0 py-4 sm:py-8 font-serif"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Core Traits</h4>
            <ul className="space-y-3 text-black">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                <span className="leading-relaxed">Natural born leader with fierce determination</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                <span className="leading-relaxed">Passionate and energetic in all pursuits</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                <span className="leading-relaxed">Quick decision-maker who acts on instinct</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                <span className="leading-relaxed">Competitive spirit that drives success</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Astrological Info</h4>
            <div className="space-y-4 text-black">
              <div className="flex justify-between items-center">
                <span className="leading-relaxed">Element:</span>
                <span className="font-bold">Fire</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="leading-relaxed">Ruling Planet:</span>
                <span className="font-bold">Mars</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="leading-relaxed">Quality:</span>
                <span className="font-bold">Cardinal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="leading-relaxed">Date Range:</span>
                <span className="font-bold">March 21 - April 19</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="leading-relaxed">Symbol:</span>
                <span className="font-bold">♈ The Ram</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Natural Strengths</h4>
            <div className="flex flex-wrap gap-3">
              {['Leadership', 'Courage', 'Determination', 'Honesty', 'Optimism', 'Passion'].map((strength, index) => (
                <span key={index} className="text-black px-4 py-2 font-bold text-base">
                  {strength}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )
    },
    {
      id: 'daily',
      title: 'Daily Insights',
      icon: <Calendar className="w-4 h-4" />,
      content: (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 p-4 sm:p-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <h4 className="font-serif font-medium text-black mb-4 flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Today&apos;s Forecast
            </h4>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200/30">
              <p className="text-sm text-gray-700 mb-4 font-light italic leading-relaxed">&quot;{todaysData.prediction}&quot;</p>
              <div className="text-xs text-gray-600 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-amber-600">Date:</span>
                  <span className="font-medium text-gray-800">{todaysData.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-600">Power Number:</span>
                  <span className="font-bold text-orange-600 text-sm">{todaysData.luckyNumber}</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-serif font-medium text-black mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Mars Energy Level
            </h4>
            <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-200/30">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-700 font-medium">Current Energy:</span>
                <span className="text-sm font-bold text-orange-600">{todaysData.energyLevel}%</span>
              </div>
              <div className="w-full bg-amber-100/50 rounded-full h-3 mb-3 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full shadow-sm"
                  initial={{ width: 0 }}
                  animate={{ width: `${todaysData.energyLevel}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              <p className="text-xs text-amber-700 font-light">High energy period - perfect for new initiatives</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-serif font-medium text-black mb-4">Cosmic Alignment</h4>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200/40">
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Moon className="w-3 h-3 text-slate-500" />
                    Moon Phase:
                  </span>
                  <span className="font-medium text-slate-800">Waxing Crescent</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-3 h-3 text-slate-500" />
                    Energy Flow:
                  </span>
                  <span className="font-medium text-slate-800">Rising</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )
    },
    {
      id: 'lucky',
      title: 'Lucky Elements',
      icon: <Gem className="w-4 h-4" />,
      content: (
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 px-0 py-4 sm:py-8 font-serif"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h4 className="font-bold text-black mb-6 text-lg">Power Color</h4>
            <div>
              <div
                className="w-20 h-20 mx-auto mb-4 rounded-full shadow-md"
                style={{ backgroundColor: todaysData.luckyColor.hex }}
              />
              <p className="font-bold text-black text-lg mb-2">{todaysData.luckyColor.name}</p>
              <p className="text-black leading-relaxed">{todaysData.luckyColor.power}</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center">
            <h4 className="font-bold text-black mb-6 text-lg">Lucky Numbers</h4>
            <div>
              <div className="text-3xl font-bold text-black mb-4">{todaysData.luckyNumber}</div>
              <div className="flex justify-center gap-3 mb-4">
                {[3, 9, 21].map(num => (
                  <span key={num} className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">{num}</span>
                ))}
              </div>
              <p className="text-black leading-relaxed">Today&apos;s most favorable numbers</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center">
            <h4 className="font-bold text-black mb-6 text-lg">Best Times</h4>
            <div>
              <div className="space-y-3 text-black">
                <div className="font-bold text-base">Morning: 6-9 AM</div>
                <div className="font-bold text-base">Evening: 6-8 PM</div>
                <p className="text-black leading-relaxed mt-4">Peak Mars energy hours</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="text-center">
            <h4 className="font-bold text-black mb-6 text-lg">Lucky Stones</h4>
            <div>
              <div className="space-y-3 text-black">
                <div className="font-bold text-base">Red Jasper</div>
                <div className="font-bold text-base">Carnelian</div>
                <div className="font-bold text-base">Ruby</div>
                <p className="text-black leading-relaxed mt-4">Mars-aligned gemstones</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )
    },
    {
      id: 'compatibility',
      title: 'Compatibility',
      icon: <Heart className="w-4 h-4" />,
      content: (
        <motion.div 
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 px-0 py-4 sm:py-8 font-serif"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg text-center">Best Matches</h4>
            <div className="space-y-4">
              {[
                { sign: 'Leo', compatibility: '95%', reason: 'Fire signs create passionate bonds' },
                { sign: 'Sagittarius', compatibility: '92%', reason: 'Adventure and freedom lovers' },
                { sign: 'Gemini', compatibility: '88%', reason: 'Intellectual and dynamic duo' },
                { sign: 'Aquarius', compatibility: '85%', reason: 'Independent spirits unite' }
              ].map((match, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-black text-base">{match.sign}</span>
                    <span className="font-bold text-black">{match.compatibility}</span>
                  </div>
                  <p className="text-black leading-relaxed">{match.reason}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg text-center">Challenging Matches</h4>
            <div className="space-y-4">
              {[
                { sign: 'Cancer', compatibility: '45%', reason: 'Different emotional needs' },
                { sign: 'Capricorn', compatibility: '50%', reason: 'Opposite approaches to life' },
                { sign: 'Virgo', compatibility: '55%', reason: 'Pace and planning differences' }
              ].map((match, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-black text-base">{match.sign}</span>
                    <span className="font-bold text-black">{match.compatibility}</span>
                  </div>
                  <p className="text-black leading-relaxed">{match.reason}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg text-center">Relationship Tips</h4>
            <div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="text-black leading-relaxed">Lead with honesty and directness</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="text-black leading-relaxed">Give your partner space to breathe</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="text-black leading-relaxed">Channel competitive energy positively</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="text-black leading-relaxed">Practice patience in conflicts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-1.5 flex-shrink-0"></span>
                  <span className="text-black leading-relaxed">Appreciate different perspectives</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )
    },
    {
      id: 'growth',
      title: 'Growth & Challenges',
      icon: <Shield className="w-4 h-4" />,
      content: (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-8 font-serif"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Areas for Development</h4>
            <div className="space-y-6">
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Patience & Reflection</h5>
                <p className="text-black mb-3 leading-relaxed">Learning to pause before acting can lead to better outcomes.</p>
                <div className="text-black">
                  <strong>Tip:</strong> Count to 10 before making important decisions
                </div>
              </div>
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Emotional Awareness</h5>
                <p className="text-black mb-3 leading-relaxed">Understanding others&apos; feelings strengthens relationships.</p>
                <div className="text-black">
                  <strong>Tip:</strong> Practice active listening and empathy daily
                </div>
              </div>
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Long-term Planning</h5>
                <p className="text-black mb-3 leading-relaxed">Balancing immediate action with strategic thinking.</p>
                <div className="text-black">
                  <strong>Tip:</strong> Set weekly and monthly goals, not just daily ones
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Career & Life Guidance</h4>
            <div className="space-y-6">
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Ideal Career Paths</h5>
                <ul className="text-black space-y-1 leading-relaxed">
                  <li>• Leadership & Management</li>
                  <li>• Entrepreneurship</li>
                  <li>• Sports & Athletics</li>
                  <li>• Military & Law Enforcement</li>
                  <li>• Sales & Marketing</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Personal Growth Focus</h5>
                <ul className="text-black space-y-1 leading-relaxed">
                  <li>• Develop teamwork skills</li>
                  <li>• Practice mindfulness</li>
                  <li>• Build lasting relationships</li>
                  <li>• Learn from failures</li>
                  <li>• Cultivate inner peace</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )
    },
    {
      id: 'products',
      title: 'Aries Products',
      icon: <Gem className="w-4 h-4" />,
      content: (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 font-serif"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {[
            { 
              name: 'Mars Energy Bracelet', 
              price: '₹1,299', 
              benefit: 'Enhances leadership qualities',
              image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
              slug: 'mars-energy-bracelet'
            },
            { 
              name: 'Red Jasper Stone', 
              price: '₹899', 
              benefit: 'Boosts courage and confidence',
              image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
              slug: 'red-jasper-stone'
            },
            { 
              name: 'Aries Birth Chart', 
              price: '₹2,499', 
              benefit: 'Personalized cosmic insights',
              image: '/images/birth-chart.jpg',
              slug: 'aries-birth-chart'
            },
            { 
              name: 'Fire Element Candle', 
              price: '₹599', 
              benefit: 'Ignites inner passion',
              image: '/images/candles.jpg',
              slug: 'fire-element-candle'
            },
            { 
              name: 'Carnelian Pendant', 
              price: '₹1,599', 
              benefit: 'Amplifies creative energy',
              image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
              slug: 'carnelian-pendant'
            },
            { 
              name: 'Mars Yantra', 
              price: '₹799', 
              benefit: 'Attracts planetary blessings',
              image: '/images/yantra.jpg',
              slug: 'mars-yantra'
            },
            { 
              name: 'Aries Crystal Set', 
              price: '₹1,999', 
              benefit: 'Complete energy alignment',
              image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
              slug: 'aries-crystal-set'
            },
            { 
              name: 'Leadership Talisman', 
              price: '₹1,199', 
              benefit: 'Strengthens natural authority',
              image: '/images/talisman.jpg',
              slug: 'leadership-talisman'
            }
          ].map((product, index) => (
                          <motion.div 
                key={index} 
                variants={itemVariants} 
                className="bg-gradient-to-br from-amber-50/80 to-orange-50/60 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-amber-200/30 hover:border-amber-300/50 cursor-pointer group"
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  router.push(`/shop/${product.slug}`);
                }}
              >
                <div className="w-full h-32 mb-4 rounded-xl overflow-hidden bg-white/50">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    width={300}
                    height={128}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={() => {
                      // Fallback handled by Next.js Image component
                    }}
                  />
                </div>
                <h5 className="font-bold text-gray-800 mb-3 text-base leading-tight">{product.name}</h5>
                <p className="text-amber-600 font-bold mb-3 text-lg">{product.price}</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.benefit}</p>
                <button 
                  className="w-full bg-gradient-to-r from-stone-300 to-stone-400 text-stone-800 py-2.5 text-sm font-medium rounded-xl hover:from-stone-400 hover:to-stone-500 transition-all duration-300 shadow-md hover:shadow-lg hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/shop/${product.slug}`);
                  }}
                >
                  View Details
                </button>
              </motion.div>
          ))}
        </motion.div>
      )
    },
    {
      id: 'planetary',
      title: 'Mars Influence',
      icon: <Star className="w-4 h-4" />,
      content: (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 font-serif"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Mars in Astrology</h4>
            <div>
              <p className="text-black mb-4 leading-relaxed">
                Mars, the red planet, governs action, desire, and motivation. As Aries&apos; ruling planet, 
                it bestows natural leadership abilities and pioneering spirit.
              </p>
              <ul className="text-black space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Represents warrior energy and courage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Influences ambition and drive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Controls physical energy and stamina</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Current Transits</h4>
            <div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-black">Mars Position:</span>
                    <span className="text-black">Capricorn</span>
                  </div>
                  <p className="text-black leading-relaxed">Focus on structured achievement</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-black">Aspect:</span>
                    <span className="text-black">Trine Jupiter</span>
                  </div>
                  <p className="text-black leading-relaxed">Expanded opportunities for growth</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-black">Energy Level:</span>
                    <span className="text-black">High</span>
                  </div>
                  <p className="text-black leading-relaxed">Perfect time for new initiatives</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Monthly Forecast</h4>
            <div>
              <div className="space-y-4">
                <div>
                  <h5 className="font-bold text-black mb-2">This Week</h5>
                  <p className="text-black leading-relaxed">High energy for career advancement and leadership opportunities.</p>
                </div>
                <div>
                  <h5 className="font-bold text-black mb-2">Next Week</h5>
                  <p className="text-black leading-relaxed">Focus shifts to relationships and partnerships for balanced growth.</p>
                </div>
                <div>
                  <h5 className="font-bold text-black mb-2">Month Ahead</h5>
                  <p className="text-black leading-relaxed">Major planetary alignment supports long-term goals and ambitions.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )
    },
    {
      id: 'faqs',
      title: 'FAQs',
      icon: <HelpCircle className="w-4 h-4" />,
      content: (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 font-serif"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Common Questions</h4>
            <div className="space-y-6">
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Why are Aries so impatient?</h5>
                <p className="text-black leading-relaxed">Mars energy creates urgency. Aries see possibilities and want immediate action, which can appear impatient to others.</p>
              </div>
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Do Aries make good leaders?</h5>
                <p className="text-black leading-relaxed">Yes! Natural leadership is an Aries superpower. They inspire action and aren&apos;t afraid to make tough decisions.</p>
              </div>
              <div>
                <h5 className="font-bold text-black mb-2 text-base">What careers suit Aries best?</h5>
                <p className="text-black leading-relaxed">Entrepreneurship, sports, military, sales, and any field requiring initiative and leadership excel for Aries.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-black mb-6 text-lg">Myths vs Reality</h4>
            <div className="space-y-6">
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Myth: Aries are always angry</h5>
                <p className="text-black leading-relaxed">Reality: Aries are passionate and direct, not angry. They express emotions honestly without hidden agendas.</p>
              </div>
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Myth: Aries don&apos;t think before acting</h5>
                <p className="text-black leading-relaxed">Reality: Aries make quick decisions based on intuition and experience, which often proves correct.</p>
              </div>
              <div>
                <h5 className="font-bold text-black mb-2 text-base">Myth: Aries are selfish</h5>
                <p className="text-black leading-relaxed">Reality: Aries are self-focused for growth but deeply loyal to loved ones and causes they believe in.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )
    }
  ];

  return (
    <div ref={dropdownRef} className="relative w-full bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 border-b border-gray-300 sticky top-0 z-50">
      {/* Main Navigation Bar */}
      <div className="w-full px-0">
        <div className="flex items-center justify-center overflow-x-auto scrollbar-hide min-h-[80px] sm:min-h-[60px]">
          {dropdownSections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => toggleDropdown(section.id)}
              className={`flex items-center gap-2 sm:gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-black whitespace-nowrap transition-all duration-300 relative overflow-hidden ${
                activeDropdown === section.id 
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
              {activeDropdown === section.id && (
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
                  scale: activeDropdown === section.id ? 1.05 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  animate={{ 
                    rotate: activeDropdown === section.id ? 360 : 0,
                    scale: activeDropdown === section.id ? 1.1 : 1
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                >
                  {section.icon}
                </motion.div>
                <span className="font-serif text-sm sm:text-base">{section.title}</span>
                <motion.div
                  animate={{ 
                    rotate: activeDropdown === section.id ? 180 : 0,
                    scale: activeDropdown === section.id ? 1.2 : 1
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
          ))}
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
              {dropdownSections.find(section => section.id === activeDropdown)?.content}
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