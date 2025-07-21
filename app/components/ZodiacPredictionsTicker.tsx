'use client';

import { motion } from 'framer-motion';

// Daily zodiac predictions and wisdom
const predictions = [
  {
    sign: 'Aries',
    symbol: '♈',
    prediction: 'Today brings new opportunities for career growth',
    color: 'text-red-300'
  },
  {
    sign: 'Taurus',
    symbol: '♉', 
    prediction: 'Focus on relationships and emotional healing',
    color: 'text-green-300'
  },
  {
    sign: 'Gemini',
    symbol: '♊',
    prediction: 'Communication skills will lead to success',
    color: 'text-yellow-300'
  },
  {
    sign: 'Cancer',
    symbol: '♋',
    prediction: 'Trust your intuition in important decisions',
    color: 'text-blue-300'
  },
  {
    sign: 'Leo',
    symbol: '♌',
    prediction: 'Creative projects receive recognition today',
    color: 'text-orange-300'
  },
  {
    sign: 'Virgo',
    symbol: '♍',
    prediction: 'Attention to detail brings unexpected rewards',
    color: 'text-emerald-300'
  },
  {
    sign: 'Libra',
    symbol: '♎',
    prediction: 'Balance and harmony lead to peaceful solutions',
    color: 'text-pink-300'
  },
  {
    sign: 'Scorpio',
    symbol: '♏',
    prediction: 'Deep transformation brings positive changes',
    color: 'text-purple-300'
  },
  {
    sign: 'Sagittarius',
    symbol: '♐',
    prediction: 'Adventure and learning expand your horizons',
    color: 'text-indigo-300'
  },
  {
    sign: 'Capricorn',
    symbol: '♑',
    prediction: 'Hard work and discipline yield great results',
    color: 'text-gray-300'
  },
  {
    sign: 'Aquarius',
    symbol: '♒',
    prediction: 'Innovation and friendship create new paths',
    color: 'text-cyan-300'
  },
  {
    sign: 'Pisces',
    symbol: '♓',
    prediction: 'Dreams and spirituality guide your journey',
    color: 'text-teal-300'
  }
];

// Triple duplicate for seamless loop with NO BLANKS
const tickerItems = [...predictions, ...predictions, ...predictions];

export default function ZodiacPredictionsTicker() {
  return (
    <div className="relative w-screen overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 py-4 border-y border-purple-700/30"
         style={{ 
           marginLeft: 'calc(-50vw + 50%)', 
           marginRight: 'calc(-50vw + 50%)',
           maxWidth: '100vw'
         }}>
      
      {/* Background Stars Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95" />
      <div className="absolute inset-0">
        <div className="absolute top-2 left-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-6 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-3 left-32 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute bottom-5 right-16 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-3000"></div>
      </div>

      {/* Header */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 rounded-full shadow-lg border border-purple-400/30">
          <span className="text-white font-semibold text-sm flex items-center space-x-2">
            <span className="text-lg">🔮</span>
            <span>Daily Predictions</span>
          </span>
        </div>
      </div>

      {/* Ticker Content */}
      <div className="relative z-10 ml-48">
        <motion.div
          className="flex whitespace-nowrap"
          style={{ paddingLeft: '100%' }}
          animate={{
            x: ["-100%", `-${100 + (100 * predictions.length / 3)}%`]
          }}
          transition={{
            duration: 150, // MUCH SLOWER - 2.5 minutes per cycle
            ease: "linear",
            repeat: Infinity
          }}
        >
          {tickerItems.map((item, index) => (
            <div key={`${item.sign}-${index}`} className="flex-shrink-0 mr-12">
              <motion.div
                className="flex items-center space-x-4 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ 
                  scale: 1.03
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Zodiac Symbol */}
                <motion.div 
                  className={`text-3xl ${item.color}`}
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  {item.symbol}
                </motion.div>

                {/* Content */}
                <div className="flex flex-col">
                  <span className={`${item.color} font-bold text-sm uppercase tracking-wide`}>
                    {item.sign}
                  </span>
                  <span className="text-white/90 text-sm font-medium max-w-xs">
                    {item.prediction}
                  </span>
                </div>

                {/* Sparkle Effect */}
                <motion.div
                  className="w-2 h-2 bg-yellow-300 rounded-full"
                  animate={{ 
                    opacity: [1, 0.3, 1],
                    scale: [1, 0.7, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: (index * 0.3) % 2
                  }}
                />
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mystical Glow Effects */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />
      
      {/* Side Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-purple-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-purple-900 to-transparent z-10" />
    </div>
  );
} 