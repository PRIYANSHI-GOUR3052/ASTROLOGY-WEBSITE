'use client'

import React, { useState } from 'react'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F8F8F8] to-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center font-serif bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
        {lang === 'hi' ? 'राशिचक्र अन्वेषक' : 'Zodiac Explorer'}
      </h1>

      {/* Main content with zodiac wheel and cards */}
      <div className="relative w-full max-w-7xl h-[900px] bg-white rounded-xl shadow-lg p-8">
        {/* Zodiac Wheel - Centered within this container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-64 h-64 rounded-full border border-gray-300 flex items-center justify-center shadow-inner">
            {zodiacSigns.map((sign, index) => {
              const rotation = sign.angle - 90 // Adjust for CSS rotation starting from 12 o'clock
              const radius = 100 // Distance from center
              const x = radius * Math.cos((rotation * Math.PI) / 180)
              const y = radius * Math.sin((rotation * Math.PI) / 180)

              return (
                <div
                  key={sign.id}
                  className="absolute flex flex-col items-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${rotation + 90}deg)`,
                  }}
                  onClick={() => setActiveSignIndex(index)}
                >
                  <span
                    className="text-xl"
                    style={{ color: activeSignIndex === index ? sign.color : '#6B7280' }}
                  >
                    {sign.symbol}
                  </span>
                  <span
                    className="text-xs font-medium mt-1"
                    style={{ color: activeSignIndex === index ? sign.color : '#6B7280' }}
                  >
                    {sign.name[lang]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Randomly placed Zodiac Cards - Eye candy bloggy look */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {zodiacCards.map((card) => (
            <div
              key={card.id}
              className="absolute p-4 rounded-xl shadow-md cursor-pointer border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-98"
              style={{
                top: card.position.top,
                left: card.position.left,
                backgroundColor: card.themeColor,
              }}
            >
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text font-serif">
                {card.title[lang]}
              </h3>
              <p className="text-gray-700 text-sm mb-4">{card.description[lang]}</p>
              <button className="px-4 py-2 bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full text-sm font-medium transition duration-300">
                {lang === 'hi' ? 'और जानें' : 'Learn More'}
              </button>
            </div>
          ))}
        </div>

        {/* Active Sign Card - Centered relative to the wheel */}
        <div
          key={activeSign.id}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-auto bg-white rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col items-center text-center"
        >
          <h2 className="text-4xl mb-2 font-bold font-serif bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
            {activeSign.name[lang]}
          </h2>
          <p className="text-6xl mb-4">{activeSign.symbol}</p>
          <p className="text-md text-gray-700 mb-2">
            <span className="font-semibold">{lang === 'hi' ? 'तत्व:' : 'Element:'}</span> {activeSign.element[lang]}
          </p>
          <p className="text-md text-gray-700 mb-4">
            <span className="font-semibold">{lang === 'hi' ? 'दिनांक:' : 'Dates:'}</span> {activeSign.dates}
          </p>
          <p className="text-sm text-gray-600 mb-4">{activeSign.traits[lang]}</p>
          <div className="flex space-x-4">
            <button
              onClick={prevSign}
              className="p-2 rounded-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] transition duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSign}
              className="p-2 rounded-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] transition duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Zodiac Cards Section */}
      <div className="relative z-10 mt-16 w-full max-w-7xl">
        <h2 className="mb-8 text-center text-4xl font-extrabold text-gray-900">
          {lang === 'en' ? 'Explore Key Concepts' : 'मुख्यA अवधारणाएँA खोजें'}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {zodiacCards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col items-start rounded-xl p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-103 hover:shadow-xl active:scale-98"
              style={{ backgroundColor: card.themeColor }}
            >
              <h4 className="mb-3 text-2xl font-bold text-gray-800">
                {card.title[lang]}
              </h4>
              <p className="text-base text-gray-700">
                {card.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Astrology Calculator Section */}
      {/* <AstrologyCalculator /> */}
    </div>
  )
}