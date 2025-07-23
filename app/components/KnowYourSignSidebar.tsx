'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Star, Sun, Moon, Heart, Shield, Zap, TrendingUp, Target } from 'lucide-react';

// Generate today's data based on current date
const getTodaysData = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  
  // Lucky colors rotation based on day of year - Earthy Aries palette
  const luckyColors = [
    { name: 'Burnt Sienna', hex: '#B45309', power: 'Leadership & Courage' },
    { name: 'Warm Amber', hex: '#D97706', power: 'Energy & Passion' },
    { name: 'Golden Ochre', hex: '#CA8A04', power: 'Success & Confidence' },
    { name: 'Terracotta', hex: '#DC2626', power: 'Determination & Strength' },
    { name: 'Copper Bronze', hex: '#92400E', power: 'Creativity & Ambition' }
  ];

  const todaysColorIndex = dayOfYear % luckyColors.length;
  const todaysColor = luckyColors[todaysColorIndex];

  // Energy level based on date (simulate astrological influence)
  const energyLevel = 60 + (dayOfYear % 40); // 60-100%

  // Today's prediction based on day of week and date
  const predictions = [
    "Your natural leadership qualities will shine brightly today. Take charge of important decisions.",
    "Mars energy is strong today - perfect time to start new projects or make bold moves.",
    "Your confidence will inspire others. Share your vision and watch people follow your lead.",
    "A day of high energy and motivation. Channel your Aries fire into productive activities.",
    "Your competitive spirit will serve you well today. Embrace challenges with courage.",
    "Today brings opportunities for advancement. Your ambitious nature will open new doors.",
    "Your pioneering spirit is highlighted today. Be the first to try something new."
  ];

  const todaysPrediction = predictions[today.getDay()];

  return {
    date: today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    luckyColor: todaysColor,
    energyLevel,
    prediction: todaysPrediction,
    luckyNumber: (dayOfYear % 9) + 1,
    moonPhase: getMoonPhase(today)
  };
};

// Simple moon phase calculation
const getMoonPhase = (date: Date) => {
  const phases = [
    'New Moon',
    'Waxing Crescent', 
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent'
  ];
  const daysSinceNewMoon = Math.floor((date.getTime() / (1000 * 60 * 60 * 24)) % 29.53);
  const phaseIndex = Math.floor((daysSinceNewMoon / 29.53) * 8);
  return phases[phaseIndex] || 'New Moon';
};

// Aries traits and characteristics
const ariesInfo = {
  personality: [
    "Natural born leader with fierce determination",
    "Passionate and energetic in all pursuits", 
    "Quick decision-maker who acts on instinct",
    "Competitive spirit that drives success",
    "Pioneering nature that loves new challenges"
  ],
  strengths: [
    "Leadership", "Courage", "Determination", "Honesty", "Optimism", "Passion"
  ],
  challenges: [
    "Impatience", "Impulsiveness", "Quick Temper", "Competitive Nature"
  ],
  compatibility: {
    best: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
    challenging: ["Cancer", "Capricorn"]
  }
};

interface KnowYourSignSidebarProps {
  signKey: string;
}

export default function KnowYourSignSidebar({ signKey }: KnowYourSignSidebarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [todaysData, setTodaysData] = useState(getTodaysData());
  const [isExpanded, setIsExpanded] = useState(false);

  // Update data daily
  useEffect(() => {
    const interval = setInterval(() => {
      setTodaysData(getTodaysData());
    }, 1000 * 60 * 60); // Update every hour to catch day changes

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={ref}
      className="bg-white/95 backdrop-blur-lg shadow-2xl border border-gray-300 p-8 max-h-[calc(100vh-4rem)] overflow-y-auto"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* HEADER */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-serif font-light text-black mb-3 flex items-center justify-center gap-3">
          <Star className="text-black w-7 h-7" />
          Know Your Sign
        </h2>
        <div className="w-24 h-0.5 bg-black mx-auto" />
        <p className="text-slate-600 mt-3 text-sm font-light">Personalized insights for your zodiac journey</p>
      </motion.div>

      {/* TODAY'S DATE AND ENERGY */}
      <motion.div 
        className="mb-8 p-6 bg-white border border-gray-300"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-slate-700 w-5 h-5" />
          <span className="text-sm font-medium text-slate-700 font-serif">{todaysData.date}</span>
        </div>
        
        {/* ENERGY LEVEL */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-black flex items-center gap-2 font-serif">
              <Zap className="w-4 h-4 text-black" />
              Mars Energy Today
            </span>
            <span className="text-sm font-bold text-black">{todaysData.energyLevel}%</span>
          </div>
          <div className="w-full bg-gray-200 h-3">
            <motion.div 
              className="bg-black h-3 shadow-inner"
              initial={{ width: 0 }}
              animate={{ width: `${todaysData.energyLevel}%` }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </div>
        </div>

        {/* MOON PHASE */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600 flex items-center gap-2 font-serif">
            <Moon className="w-4 h-4 text-slate-600" />
            Lunar Phase
          </span>
          <span className="text-sm font-medium text-black font-serif">{todaysData.moonPhase}</span>
        </div>
      </motion.div>

      {/* LUCKY COLOR OF THE DAY */}
      <motion.div 
        className="mb-8 p-6 bg-white border border-gray-300 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="font-serif font-medium text-slate-800 mb-4 flex items-center gap-3">
          <div 
            className="w-5 h-5 rounded-full border-2 border-gray-300 shadow-md"
            style={{ backgroundColor: todaysData.luckyColor.hex }}
          />
          Today&apos;s Power Color
        </h3>
        <div className="text-center">
          <motion.div
            className="w-20 h-20 rounded-2xl mx-auto mb-3 border-3 border-gray-200 shadow-lg"
            style={{ backgroundColor: todaysData.luckyColor.hex }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
          />
          <p className="font-serif font-medium text-black text-lg">{todaysData.luckyColor.name}</p>
          <p className="text-sm text-black font-light mt-1">{todaysData.luckyColor.power}</p>
        </div>
      </motion.div>

      {/* TODAY'S PREDICTION */}
      <motion.div 
        className="mb-8 p-6 bg-white border border-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <h3 className="font-serif font-medium text-black mb-4 flex items-center gap-3">
          <Sun className="text-black w-5 h-5" />
          Daily Cosmic Insight
        </h3>
        <p className="text-sm text-black leading-relaxed font-light italic mb-4">
          &quot;{todaysData.prediction}&quot;
        </p>
        <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-3">
          <span className="text-black font-serif">Power Number: <strong className="text-black">{todaysData.luckyNumber}</strong></span>
          <span className="text-black font-serif flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Rising Energy
          </span>
        </div>
      </motion.div>

      {/* EXPANDABLE ARIES INFO */}
      <motion.div 
        className="border-t border-gray-200 pt-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between p-4 bg-black text-white font-serif font-medium hover:bg-gray-800 transition-all duration-300 shadow-lg"
        >
          <span className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Aries Traits & Insights
          </span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xl"
          >
            ↓
          </motion.span>
        </button>

        <motion.div
          initial={false}
          animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="pt-6 space-y-6">
            {/* PERSONALITY TRAITS */}
            <div>
              <h4 className="font-serif font-medium text-black mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4 text-black" />
                Core Personality
              </h4>
              <ul className="text-sm text-black space-y-2 font-light">
                {ariesInfo.personality.slice(0, 3).map((trait, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-black mt-1.5 w-1.5 h-1.5 bg-black flex-shrink-0"></span>
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* STRENGTHS */}
            <div>
              <h4 className="font-serif font-medium text-black mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-black" />
                Natural Strengths
              </h4>
              <div className="flex flex-wrap gap-2">
                {ariesInfo.strengths.slice(0, 4).map((strength, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-white text-black px-3 py-1.5 font-medium border border-black"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>

            {/* COMPATIBILITY */}
            <div>
              <h4 className="font-serif font-medium text-black mb-3">Harmonious Signs</h4>
              <div className="flex flex-wrap gap-2">
                {ariesInfo.compatibility.best.slice(0, 3).map((sign, index) => (
                  <span 
                    key={index}
                    className="text-xs bg-white text-black px-3 py-1.5 font-medium border border-black"
                  >
                    {sign}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* FOOTER */}
      <motion.div 
        className="mt-8 text-center border-t border-gray-200 pt-6"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <p className="text-xs text-slate-500 font-light font-serif">
          Daily cosmic alignments updated in real-time
        </p>
      </motion.div>
    </motion.div>
  );
} 