'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { Sparkles, ArrowRight, Facebook, Instagram, Twitter, ChevronDown } from 'lucide-react'

const zodiacSigns = [
  { label: { en: 'Aries', hi: 'मेष' }, value: 'Aries' },
  { label: { en: 'Taurus', hi: 'वृषभ' }, value: 'Taurus' },
  { label: { en: 'Gemini', hi: 'मिथुन' }, value: 'Gemini' },
  { label: { en: 'Cancer', hi: 'कर्क' }, value: 'Cancer' },
  { label: { en: 'Leo', hi: 'सिंह' }, value: 'Leo' },
  { label: { en: 'Virgo', hi: 'कन्या' }, value: 'Virgo' },
  { label: { en: 'Libra', hi: 'तुला' }, value: 'Libra' },
  { label: { en: 'Scorpio', hi: 'वृश्चिक' }, value: 'Scorpio' },
  { label: { en: 'Sagittarius', hi: 'धनु' }, value: 'Sagittarius' },
  { label: { en: 'Capricorn', hi: 'मकर' }, value: 'Capricorn' },
  { label: { en: 'Aquarius', hi: 'कुंभ' }, value: 'Aquarius' },
  { label: { en: 'Pisces', hi: 'मीन' }, value: 'Pisces' },
]

interface HoroscopeCard {
  title: { en: string; hi: string; };
  description: { en: string; hi: string; };
  href: string;
}

const horoscopeCards: HoroscopeCard[] = [
  {
    title: { en: "Aries Horoscope", hi: "मेष राशिफल" },
    description: { en: "Your daily insights for Aries, focusing on career and finance.", hi: "मेष राशि के लिए आपकी दैनिक अंतर्दृष्टि, करियर और वित्त पर ध्यान केंद्रित करते हुए।" },
    href: "/daily-horoscope/aries",
  },
  {
    title: { en: "Taurus Horoscope", hi: "वृषभ राशिफल" },
    description: { en: "Discover what the stars hold for Taurus in love and relationships.", hi: "प्रेम और रिश्तों में वृषभ के लिए सितारे क्या कहते हैं, जानें।" },
    href: "/daily-horoscope/taurus",
  },
  {
    title: { en: "Gemini Horoscope", hi: "मिथुन राशिफल" },
    description: { en: "Guidance for Gemini on health and well-being today.", hi: "आज स्वास्थ्य और कल्याण पर मिथुन राशि के लिए मार्गदर्शन।" },
    href: "/daily-horoscope/gemini",
  },
  {
    title: { en: "Cancer Horoscope", hi: "कर्क राशिफल" },
    description: { en: "Career growth and personal development tips for Cancerians.", hi: "कर्क राशि वालों के लिए करियर में वृद्धि और व्यक्तिगत विकास के सुझाव।" },
    href: "/daily-horoscope/cancer",
  },
  {
    title: { en: "Leo Horoscope", hi: "सिंह राशिफल" },
    description: { en: "Financial predictions and lucky numbers for Leo today.", hi: "आज सिंह राशि के लिए वित्तीय भविष्यवाणियां और भाग्यशाली संख्याएँ।" },
    href: "/daily-horoscope/leo",
  },
  {
    title: { en: "Virgo Horoscope", hi: "कन्या राशिफल" },
    description: { en: "Love life and social interactions for Virgo this week.", hi: "इस सप्ताह कन्या राशि के लिए प्रेम जीवन और सामाजिक संबंध।" },
    href: "/daily-horoscope/virgo",
  },
]

interface FAQItem {
  question: { en: string; hi: string; };
  answer: { en: string; hi: string; };
}

const horoscopeFAQs: FAQItem[] = [
  {
    question: { en: "What is a horoscope?", hi: "राशिफल क्या है?" },
    answer: { en: "A horoscope is an astrological chart or diagram representing the positions of the Sun, Moon, planets, astrological aspects, and sensitive angles at the time of an event, such as the moment of a person's birth.", hi: "राशिफल एक ज्योतिषीय चार्ट या आरेख है जो किसी घटना के समय सूर्य, चंद्रमा, ग्रहों, ज्योतिषीय पहलुओं और संवेदनशील कोणों की स्थिति का प्रतिनिधित्व करता है, जैसे किसी व्यक्ति के जन्म का क्षण।" },
  },
  {
    question: { en: "How accurate are horoscopes?", hi: "राशिफल कितने सटीक होते हैं?" },
    answer: { en: "Horoscopes are based on astrological interpretations and serve as guides for self-reflection and potential trends. Their accuracy can vary and is often seen as a tool for personal growth rather than definitive prediction.", hi: "राशिफल ज्योतिषीय व्याख्याओं पर आधारित होते हैं और आत्म-चिंतन और संभावित रुझानों के लिए मार्गदर्शक के रूप में कार्य करते हैं। उनकी सटीकता भिन्न हो सकती है और इसे अक्सर निश्चित भविष्यवाणी के बजाय व्यक्तिगत विकास के लिए एक उपकरण के रूप में देखा जाता है।" },
  },
  {
    question: { en: "Can horoscopes help with career decisions?", hi: "क्या राशिफल करियर के फैसलों में मदद कर सकते हैं?" },
    answer: { en: "Yes, many people use horoscopes and astrological readings to gain insight into their strengths, challenges, and favorable periods, which can inform career decisions and paths.", hi: "हां, कई लोग अपनी ताकत, चुनौतियों और अनुकूल अवधियों के बारे में जानकारी प्राप्त करने के लिए राशिफल और ज्योतिषीय रीडिंग का उपयोग करते हैं, जो करियर के फैसलों और रास्तों को सूचित कर सकते हैं।" },
  },
  {
    question: { en: "What is the difference between sun sign and moon sign?", hi: "सूर्य राशि और चंद्र राशि में क्या अंतर है?" },
    answer: { en: "Your sun sign represents your core personality and ego, determined by the Sun's position at your birth. Your moon sign reflects your emotional nature, inner self, and subconscious habits, determined by the Moon's position.", hi: "आपकी सूर्य राशि आपके मूल व्यक्तित्व और अहंकार का प्रतिनिधित्व करती है, जो आपके जन्म के समय सूर्य की स्थिति से निर्धारित होती है। आपकी चंद्र राशि आपकी भावनात्मक प्रकृति, आंतरिक स्व और अवचेतन आदतों को दर्शाती है, जो चंद्रमा की स्थिति से निर्धारित होती है।" },
  },
]

export function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState<string>('')
  const [horoscope, setHoroscope] = useState<string>('')
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null)
  const { lang } = useLanguage()

  const getHoroscope = () => {
    setHoroscope(`Today is a great day for ${selectedSign}. You'll find opportunities for growth and success in unexpected places. Keep an open mind and trust your instincts.`)
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8] py-16 font-sans">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 leading-tight bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
          {lang === 'hi' ? 'दैनिक राशिफल' : 'Daily Horoscope'}
        </h1>
        <p className="text-lg font-serif text-gray-700 text-center mb-12">
          {lang === 'hi' ? 'आज सितारों से अपनी अंतर्दृष्टि प्राप्त करें' : 'Get your daily insights from the stars today'}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white shadow-lg border border-orange-200 max-w-2xl mx-auto rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
                {lang === 'hi' ? 'अपनी राशि जानें' : 'Know Your Sign'}
              </h3>
              <div className="mb-4">
                <label htmlFor="zodiac-sign" className="block text-sm font-medium mb-2 text-black">
                  {lang === 'hi' ? 'अपनी राशि चुनें' : 'Select Your Zodiac Sign'}
                </label>
                <Select onValueChange={setSelectedSign}>
                  <SelectTrigger className="w-full bg-orange-100 text-black border border-orange-400 rounded-xl px-4 py-2 hover:bg-orange-200 transition-all">
                    <SelectValue placeholder={lang === 'hi' ? 'अपनी राशि चुनें' : 'Choose your sign'} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-orange-300 rounded-xl shadow-lg">
                    {zodiacSigns.map((sign) => (
                      <SelectItem
                        key={sign.value}
                        value={sign.value}
                        className="px-4 py-2 text-sm text-black hover:bg-orange-100 cursor-pointer rounded-xl"
                      >
                        {sign.label[lang]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={getHoroscope}
                disabled={!selectedSign}
                className={`w-full px-4 py-2 rounded-xl border text-sm font-semibold mb-4 transition-all
                ${!selectedSign
                  ? 'bg-gray-300 text-gray-600 border-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:from-[#5A0D9D] hover:to-[#FF7C00] text-white'}
                shadow-md`}
              >
                {lang === 'hi' ? 'राशिफल देखें' : 'View Horoscope'}
              </Button>

              {horoscope && (
                <p className="text-black whitespace-pre-wrap mt-4 font-serif text-base">{horoscope}</p>
              )}
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {horoscopeCards.map((card, index) => (
                <div
                  key={index}
                  className={`rounded-xl shadow-lg p-6 border border-gray-100 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ${
                    index % 4 === 0 ? 'bg-[#FFF5E6]' :
                    index % 4 === 1 ? 'bg-[#F0F7FF]' :
                    index % 4 === 2 ? 'bg-[#F5FFF0]' :
                    'bg-[#FFF0F5]'
                  }`}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">{card.title[lang]}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">{card.description[lang]}</p>
                  <Link href={card.href} passHref>
                    <Button className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:from-[#5A0D9D] hover:to-[#FF7C00] text-white rounded-lg py-2 px-6 shadow-md transition-all duration-300">
                      {lang === 'hi' ? 'और जानें' : 'Learn More'}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <Card className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100">
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src="/images/placeholder-author.jpg"
                  alt="Dr. Narendra Kumar Sharma"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text mb-2">
                {lang === 'hi' ? 'डॉ. नरेंद्र कुमार शर्मा' : 'Dr. Narendra Kumar Sharma'}
              </h3>
              <p className="text-purple-600 text-sm mb-4">{lang === 'hi' ? 'वैदिक ज्योतिषी' : 'Vedic Astrologer'}</p>
              <p className="text-gray-600 text-sm mb-6">
                {lang === 'hi' ? 'नमस्ते, मैं एक अनुभवी वैदिक ज्योतिषी हूँ। मेरा जुनून आपको ब्रह्मांडीय ऊर्जाओं के माध्यम से मार्गदर्शन करना और आपकी वास्तविक क्षमता को उजागर करने में मदद करना है।' : 'Hey, I\'m a renowned Vedic astrologer with years of experience. My passion is to guide you through cosmic energies and help you unlock your true potential.'}
              </p>
              <Link href="/contact" passHref>
                <Button className="w-full bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] hover:from-[#5A0D9D] hover:to-[#FF7C00] text-white rounded-full py-2 px-4 shadow-md transition duration-300 mb-4">
                  {lang === 'hi' ? 'मुझसे संपर्क करें' : 'Contact Me'}
                </Button>
              </Link>
              <div className="flex justify-center items-center space-x-4">
                <span className="text-gray-600">{lang === 'hi' ? 'फ़ॉलो करें :' : 'Follow :'}</span>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="text-gray-600 hover:text-blue-400 transition-colors"><Twitter className="w-6 h-6" /></a>
              </div>
            </Card>

            <Card className="bg-[#FFF5E6] rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
                {lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}
              </h3>
              <div className="space-y-4">
                {horoscopeFAQs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-2 mb-2">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full text-left flex justify-between items-center text-base font-semibold text-gray-900 focus:outline-none py-2"
                    >
                      {faq.question[lang]}
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFAQIndex === index ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {openFAQIndex === index && (
                      <p className="text-gray-700 font-serif text-sm pt-1 pb-2 transition-all duration-300">
                        {faq.answer[lang]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
