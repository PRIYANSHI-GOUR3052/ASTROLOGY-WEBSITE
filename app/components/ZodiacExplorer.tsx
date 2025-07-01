'use client'

import React, { useState } from 'react'
import { useLanguage } from '../contexts/useLanguage'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface ZodiacSign {
  id: string
  name: { en: string; hi: string }
  symbol: string
  element: { en: string; hi: string }
  dates: string
  traits: { en: string; hi: string }
  color: string
  angle: number
}

interface ZodiacCard {
  id: string
  title: { en: string; hi: string }
  description: { en: string; hi: string }
  position: { top: string; left: string }
  themeColor: string
}

const zodiacSigns: ZodiacSign[] = [
  {
    id: 'aries',
    name: { en: 'Aries', hi: 'मेष' },
    symbol: '♈',
    element: { en: 'Fire', hi: 'अग्नि' },
    dates: 'Mar 21 - Apr 19',
    traits: {
      en: 'Courageous, determined, confident, enthusiastic, optimistic, honest, passionate',
      hi: 'साहसी, दृढ़ निश्चयी, आत्मविश्वासी, उत्साही, आशावादी, ईमानदार, भावुक',
    },
    color: '#FF6B6B',
    angle: 30,
  },
  {
    id: 'taurus',
    name: { en: 'Taurus', hi: 'वृषभ' },
    symbol: '♉',
    element: { en: 'Earth', hi: 'पृथ्वी' },
    dates: 'Apr 20 - May 20',
    traits: {
      en: 'Reliable, patient, practical, devoted, responsible, stable',
      hi: 'विश्वसनीय, धैर्यवान, व्यावहारिक, समर्पित, जिम्मेदार, स्थिर',
    },
    color: '#4ECDC4',
    angle: 60,
  },
  {
    id: 'gemini',
    name: { en: 'Gemini', hi: 'मिथुन' },
    symbol: '♊',
    element: { en: 'Air', hi: 'वायु' },
    dates: 'May 21 - Jun 20',
    traits: {
      en: 'Gentle, affectionate, curious, adaptable, ability to learn quickly and exchange ideas',
      hi: 'सौम्य, स्नेही, जिज्ञासु, अनुकूलनीय, तेजी से सीखने और विचारों का आदान-प्रदान करने की क्षमता',
    },
    color: '#45B7D1',
    angle: 90,
  },
  {
    id: 'cancer',
    name: { en: 'Cancer', hi: 'कर्क' },
    symbol: '♋',
    element: { en: 'Water', hi: 'जल' },
    dates: 'Jun 21 - Jul 22',
    traits: {
      en: 'Highly imaginative, loyal, emotional, sympathetic, persuasive',
      hi: 'अत्यधिक कल्पनाशील, वफादार, भावनात्मक, सहानुभूतिपूर्ण, प्रेरक',
    },
    color: '#FFD166',
    angle: 120,
  },
  {
    id: 'leo',
    name: { en: 'Leo', hi: 'सिंह' },
    symbol: '♌',
    element: { en: 'Fire', hi: 'अग्नि' },
    dates: 'Jul 23 - Aug 22',
    traits: {
      en: 'Creative, passionate, generous, warm-hearted, cheerful, humorous',
      hi: 'रचनात्मक, भावुक, उदार, गर्मजोशी से भरा, हंसमुख, विनोदी',
    },
    color: '#F4A261',
    angle: 150,
  },
  {
    id: 'virgo',
    name: { en: 'Virgo', hi: 'कन्या' },
    symbol: '♍',
    element: { en: 'Earth', hi: 'पृथ्वी' },
    dates: 'Aug 23 - Sep 22',
    traits: {
      en: 'Loyal, analytical, kind, hardworking, practical',
      hi: 'वफादार, विश्लेषणात्मक, दयालु, मेहनती, व्यावहारिक',
    },
    color: '#8DCCAD',
    angle: 180,
  },
  {
    id: 'libra',
    name: { en: 'Libra', hi: 'तुला' },
    symbol: '♎',
    element: { en: 'Air', hi: 'वायु' },
    dates: 'Sep 23 - Oct 22',
    traits: {
      en: 'Cooperative, diplomatic, gracious, fair-minded, social',
      hi: 'सहयोगी, कूटनीतिक,A दयालु, निष्पक्ष, सामाजिक',
    },
    color: '#C7D0EE',
    angle: 210,
  },
  {
    id: 'scorpio',
    name: { en: 'Scorpio', hi: 'वृश्चिक' },
    symbol: '♏',
    element: { en: 'Water', hi: 'जल' },
    dates: 'Oct 23 - Nov 21',
    traits: {
      en: 'Resourceful, brave, passionate, stubborn, a true friend',
      hi: 'संसाधनपूर्ण, बहादुर, भावुक, जिद्दी, सच्चा दोस्त',
    },
    color: '#A06CD5',
    angle: 240,
  },
  {
    id: 'sagittarius',
    name: { en: 'Sagittarius', hi: 'धनु' },
    symbol: '♐',
    element: { en: 'Fire', hi: 'अग्नि' },
    dates: 'Nov 22 - Dec 21',
    traits: {
      en: 'Generous, idealistic, great sense of humor',
      hi: 'उदार, आदर्शवादी, हास्य का महान भाव',
    },
    color: '#FF9F68',
    angle: 270,
  },
  {
    id: 'capricorn',
    name: { en: 'Capricorn', hi: 'मकर' },
    symbol: '♑',
    element: { en: 'Earth', hi: 'पृथ्वी' },
    dates: 'Dec 22 - Jan 19',
    traits: {
      en: 'Responsible, disciplined, self-control, good managers',
      hi: 'जिम्मेदार,A अनुशासित, आत्म-नियंत्रण, अच्छेA प्रबंधक',
    },
    color: '#6B8E23',
    angle: 300,
  },
  {
    id: 'aquarius',
    name: { en: 'Aquarius', hi: 'कुंभ' },
    symbol: '♒',
    element: { en: 'Air', hi: 'वायु' },
    dates: 'Jan 20 - Feb 18',
    traits: {
      en: 'Progressive, original, independent, humanitarian',
      hi: 'प्रगतिशील,AA मौलिक,A स्वतंत्र,AAA मानवतावादी',
    },
    color: '#20B2AA',
    angle: 330,
  },
  {
    id: 'pisces',
    name: { en: 'Pisces', hi: 'मीन' },
    symbol: '♓',
    element: { en: 'Water', hi: 'जल' },
    dates: 'Feb 19 - Mar 20',
    traits: {
      en: 'Compassionate, artistic, intuitive, gentle, wise',
      hi: 'करुणामय,A कलात्मक,A सहज,A सौम्य,A बुद्धिमान',
    },
    color: '#9370DB',
    angle: 360,
  },
]

const zodiacCards: ZodiacCard[] = [
  {
    id: 'card1',
    title: { en: 'Elemental Harmony', hi: 'तात्विकA सामंजस्य' },
    description: {
      en: 'Understand how fire, earth, air, and water elements influence your personality.',
      hi: 'समझें कि अग्नि, पृथ्वी, वायु और जल तत्व आपकेA व्यक्तित्व को कैसे प्रभावित करते हैं।',
    },
    position: { top: '2%', left: '2%' }, // Top-left
    themeColor: '#FFF5E6',
  },
  {
    id: 'card2',
    title: { en: 'Planetary Alignments', hi: 'ग्रहों कीA स्थिति' },
    description: {
      en: 'Discover the impact of planetary positions on your life journey.',
      hi: 'अपने जीवनA यात्रा पर ग्रहों कीA स्थिति के प्रभाव कीA खोज करें।',
    },
    position: { top: '2%', left: '70%' }, // Top-right
    themeColor: '#F0F7FF',
  },
  {
    id: 'card3',
    title: { en: 'Lunar Phases', hi: 'चंद्रमा कीA कलाएँ' },
    description: {
      en: 'Explore the subtle energies of the moon and its phases on your emotions.',
      hi: 'चंद्रमा और उसकीA कलाओं कीA सूक्ष्म ऊर्जाओं को अपनीA भावनाओं परA अनुभव करें।',
    },
    position: { top: '40%', left: '0%' }, // Middle-left
    themeColor: '#F5FFF0',
  },
  {
    id: 'card4',
    title: { en: 'Rising Signs', hi: 'उदय लग्न' },
    description: {
      en: 'Uncover your ascendant sign and its role in shaping your outer personality.',
      hi: 'अपने लग्नA राशि औरAA बाहरी व्यक्तित्व कोA आकार देने में इसकीA भूमिका का अनावरण करें।',
    },
    position: { top: '40%', left: '75%' }, // Middle-right
    themeColor: '#FFF0F5',
  },
  {
    id: 'card5',
    title: { en: 'Zodiac Compatibility', hi: 'राशि अनुकूलता' },
    description: {
      en: 'Find out how well you align with other zodiac signs in relationships.',
      hi: 'जानें कि आपA रिश्तों में अन्यA राशिA चिह्नों के साथA कितनाA अच्छाA मेल खाते हैं।',
    },
    position: { top: '78%', left: '5%' }, // Bottom-left
    themeColor: '#FFF5E6',
  },
  {
    id: 'card6',
    title: { en: 'Astrological Houses', hi: 'ज्योतिषीयA भाव' },
    description: {
      en: 'Learn about the twelve houses and their significance in your birth chart.',
      hi: 'बारह भावों औरA अपनीA जन्म कुंडली में उनकेA महत्व के बारे में जानें।',
    },
    position: { top: '78%', left: '65%' }, // Bottom-right
    themeColor: '#F0F7FF',
  },
]

export function ZodiacExplorer() {
  const [activeSignIndex, setActiveSignIndex] = useState(0)
  const { lang } = useLanguage()
  const activeSign = zodiacSigns[activeSignIndex]

  const nextSign = () => {
    setActiveSignIndex((prevIndex) => (prevIndex + 1) % zodiacSigns.length)
  }

  const prevSign = () => {
    setActiveSignIndex((prevIndex) => (prevIndex - 1 + zodiacSigns.length) % zodiacSigns.length)
  }

  return (
    <div className="w-full px-0 py-16 mt-20 md:mt-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-serif bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
        {lang === 'hi' ? 'राशिचक्र अन्वेषक' : 'Zodiac Explorer'}
      </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {lang === 'hi' 
            ? 'अपनी राशि की विशेषताओं और प्रभावों को जानें'
            : 'Discover the characteristics and influences of your zodiac sign'}
        </p>
      </div>

      {/* Main Content: 3-column grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full px-4 lg:px-12 xl:px-24">
        {/* Left: Sign Details Card */}
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 flex flex-col items-center border w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-full text-center lg:text-left" 
            key={activeSign.id} 
            initial={{opacity: 0, x: -20}} 
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
          >
            <p className="text-7xl mb-4 text-center lg:text-left" style={{color: activeSign.color}}>{activeSign.symbol}</p>
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
              {(activeSign.name as Record<string, string>)[lang] || activeSign.name['en']}
            </h2>
            <div className="space-y-2 text-gray-700 text-lg mb-6">
              <p><span className="font-semibold">{lang === 'hi' ? 'तत्व: ' : 'Element: '}</span>{(activeSign.element as Record<string, string>)[lang] || activeSign.element['en']}</p>
              <p><span className="font-semibold">{lang === 'hi' ? 'दिनांक: ' : 'Dates: '}</span>{activeSign.dates}</p>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">{(activeSign.traits as Record<string, string>)[lang] || activeSign.traits['en']}</p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <motion.button
                onClick={prevSign}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                onClick={nextSign}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Center: Zodiac Wheel */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center flex-shrink-0 mx-auto">
            {zodiacSigns.map((sign, index) => {
              const rotation = sign.angle - 90
              const radius = 130 // md: 150
              const x = radius * Math.cos((rotation * Math.PI) / 180)
              const y = radius * Math.sin((rotation * Math.PI) / 180)

              return (
                <motion.div
                  key={sign.id}
                  className="absolute flex flex-col items-center cursor-pointer"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  whileHover={{ scale: 1.15 }}
                  onClick={() => setActiveSignIndex(index)}
                  animate={{ scale: activeSignIndex === index ? 1.2 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div 
                    className="text-3xl"
                    style={{ color: activeSignIndex === index ? sign.color : '#9CA3AF' }}
                  >
                    {sign.symbol}
                  </motion.div>
                </motion.div>
              )
            })}
            {/* Center circle */}
            <div className="w-48 h-48 bg-gray-50 rounded-full border shadow-inner"></div>
          </div>
        </div>

        {/* Right: Key Concepts 2x2 grid */}
        <div className="flex flex-col items-center lg:items-end w-full">
          <h2 className="text-2xl font-bold text-center lg:text-right mb-2 text-gray-800">
            {lang === 'en' ? 'Explore Key Concepts' : 'मुख्य अवधारणाएँ खोजें'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg">
            {zodiacCards.slice(0,4).map((card, index) => (
              <motion.div
              key={card.id}
                className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                style={{ backgroundColor: card.themeColor }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
                  {(card.title as Record<string, string>)[lang] || card.title['en']}
                </h3>
                <p className="text-gray-700 mb-4">
                  {(card.description as Record<string, string>)[lang] || card.description['en']}
                </p>
                <button className="px-4 py-2 bg-white/60 hover:bg-white/90 text-gray-800 rounded-full text-sm font-semibold transition duration-300 shadow-sm">
                {lang === 'hi' ? 'और जानें' : 'Learn More'}
              </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}