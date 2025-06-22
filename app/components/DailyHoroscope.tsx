'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { Sparkles, ArrowRight, Facebook, Instagram, Twitter, ChevronDown } from 'lucide-react'
import { horoscopeCards } from '@/app/data/horoscopeCards'

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

const dailyPredictions = {
  Aries: {
    en: "Today is a day for bold action, Aries. Your dynamic energy is high, making it a perfect time to start new projects or tackle challenging tasks. Trust your instincts and lead the way.",
    hi: "मेष, आज साहसिक कार्रवाई का दिन है। आपकी गतिशील ऊर्जा उच्च है, जो इसे नई परियोजनाओं को शुरू करने या चुनौतीपूर्ण कार्यों से निपटने के लिए एक आदर्श समय बनाती है। अपनी प्रवृत्ति पर भरोसा करें और नेतृत्व करें।",
  },
  Taurus: {
    en: "Focus on stability and comfort, Taurus. It's a great day to manage your finances or indulge in simple pleasures. Patience will be your greatest asset, so avoid rushing into decisions.",
    hi: "वृषभ, स्थिरता और आराम पर ध्यान केंद्रित करें। यह आपके वित्त का प्रबंधन करने या साधारण सुखों में लिप्त होने के लिए एक अच्छा दिन है। धैर्य आपकी सबसे बड़ी संपत्ति होगी, इसलिए निर्णयों में जल्दबाजी करने से बचें।",
  },
  Gemini: {
    en: "Your communication skills are at their peak, Gemini. Engage in meaningful conversations, share your ideas, and connect with others. A new perspective could come from an unexpected chat.",
    hi: "मिथुन, आपकी संचार कौशल अपने चरम पर है। सार्थक बातचीत में शामिल हों, अपने विचार साझा करें और दूसरों से जुड़ें। एक अप्रत्याशित बातचीत से एक नया दृष्टिकोण आ सकता है।",
  },
  Cancer: {
    en: "Listen to your heart today, Cancer. Your intuition is guiding you, especially in matters of home and family. Nurture your relationships and create a sense of security around you.",
    hi: "कर्क, आज अपने दिल की सुनें। आपकी अंतर्ज्ञान आपको मार्गदर्शन कर रही है, खासकर घर और परिवार के मामलों में। अपने रिश्तों का पोषण करें और अपने आस-पास सुरक्षा की भावना पैदा करें।",
  },
  Leo: {
    en: "It's your time to shine, Leo! Your creativity and confidence are magnetic. Step into the spotlight, express yourself, and don't be afraid to take center stage. Your talents will be recognized.",
    hi: "सिंह, यह आपके चमकने का समय है! आपकी रचनात्मकता और आत्मविश्वास चुंबकीय हैं। सुर्खियों में कदम रखें, खुद को व्यक्त करें, और केंद्र मंच लेने से न डरें। आपकी प्रतिभाओं को पहचाना जाएगा।",
  },
  Virgo: {
    en: "A practical and organized approach will serve you well, Virgo. Focus on details, whether at work or in your personal life. Your efficiency will bring you a sense of accomplishment.",
    hi: "कन्या, एक व्यावहारिक और संगठित दृष्टिकोण आपकी अच्छी सेवा करेगा। काम पर या अपने निजी जीवन में विवरणों पर ध्यान केंद्रित करें। आपकी दक्षता आपको उपलब्धि की भावना लाएगी।",
  },
  Libra: {
    en: "Harmony in relationships is your focus, Libra. Seek balance and fairness in your interactions. A diplomatic approach will help you resolve any conflicts and strengthen your bonds.",
    hi: "तुला, रिश्तों में सामंजस्य आपका ध्यान है। अपनी बातचीत में संतुलन और निष्पक्षता की तलाश करें। एक राजनयिक दृष्टिकोण आपको किसी भी संघर्ष को हल करने और अपने बंधनों को मजबूत करने में मदद करेगा।",
  },
  Scorpio: {
    en: "Embrace transformation, Scorpio. Today is a powerful day for inner growth and letting go of what no longer serves you. Trust the process and welcome positive change.",
    hi: "वृश्चिक, परिवर्तन को अपनाएं। आज आंतरिक विकास और जो अब आपकी सेवा नहीं करता है उसे जाने देने के लिए एक शक्तिशाली दिन है। प्रक्रिया पर भरोसा करें और सकारात्मक बदलाव का स्वागत करें।",
  },
  Sagittarius: {
    en: "Adventure is calling, Sagittarius! Broaden your horizons, whether by learning something new or exploring a different place. Your optimistic outlook will attract exciting opportunities.",
    hi: "धनु, रोमांच बुला रहा है! अपनी क्षितिज का विस्तार करें, चाहे कुछ नया सीखकर या किसी अलग जगह की खोज करके। आपका आशावादी दृष्टिकोण रोमांचक अवसरों को आकर्षित करेगा।",
  },
  Capricorn: {
    en: "Your ambition is highlighted today, Capricorn. Focus on your long-term goals and take practical steps to achieve them. Your discipline and hard work will pay off.",
    hi: "मकर, आज आपकी महत्वाकांक्षा पर प्रकाश डाला गया है। अपने दीर्घकालिक लक्ष्यों पर ध्यान केंद्रित करें और उन्हें प्राप्त करने के लिए व्यावहारिक कदम उठाएं। आपका अनुशासन और कड़ी मेहनत रंग लाएगी।",
  },
  Aquarius: {
    en: "Your innovative ideas can make a difference, Aquarius. Connect with like-minded people and collaborate on projects that matter to you. Your unique perspective is valuable.",
    hi: "कुंभ, आपके अभिनव विचार एक अंतर डाल सकते हैं। समान विचारधारा वाले लोगों से जुड़ें और उन परियोजनाओं पर सहयोग करें जो आपके लिए मायने रखती हैं। आपका अनूठा दृष्टिकोण मूल्यवान है।",
  },
  Pisces: {
    en: "Trust your intuition, Pisces. Your sensitivity and compassion are heightened, allowing you to connect deeply with others. It's a good day for creative pursuits and spiritual reflection.",
    hi: "मीन, अपनी अंतर्ज्ञान पर भरोसा करें। आपकी संवेदनशीलता और करुणा बढ़ गई है, जिससे आप दूसरों के साथ गहराई से जुड़ सकते हैं। यह रचनात्मक कार्यों और आध्यात्मिक प्रतिबिंब के लिए एक अच्छा दिन है।",
  },
};

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
    if (selectedSign) {
      const prediction = dailyPredictions[selectedSign as keyof typeof dailyPredictions];
      if (prediction) {
        setHoroscope(prediction[lang]);
      }
    }
  }

  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index)
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8] pt-8 pb-16 font-sans">
      <div className="container mx-auto px-4">
        {/* Banner Heading */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-10 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">
            {lang === 'hi' ? 'दैनिक राशिफल' : 'Daily Horoscope'}
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">
            {lang === 'hi' ? 'आज सितारों से अपनी अंतर्दृष्टि प्राप्त करें' : 'Get your daily insights from the stars today'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2 bg-white shadow-lg border border-orange-200 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-black mb-4">
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
                    ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
                    : 'bg-[#F3E8FF] text-[#7C3AED] border-[#E0E0E0] hover:bg-[#E0F2FE] hover:text-[#FBBF24]'}
                  shadow-md`}
                >
                  {lang === 'hi' ? 'राशिफल देखें' : 'View Horoscope'}
                </Button>

                {horoscope && (
                  <p className="text-black whitespace-pre-wrap mt-4 font-serif text-base">{horoscope}</p>
                )}
              </Card>

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
                  <h3 className="text-xl font-bold text-black mb-2">{card.title[lang]}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">{card.description[lang]}</p>
                  <Link href={card.href} passHref>
                    <Button className="bg-[#F3E8FF] text-[#7C3AED] rounded-lg py-2 px-6 shadow-md transition-all duration-300 border border-[#E0E0E0] hover:bg-[#E0F2FE] hover:text-[#FBBF24]">
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
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">
                {lang === 'hi' ? 'डॉ. नरेंद्र कुमार शर्मा' : 'Dr. Narendra Kumar Sharma'}
              </h3>
              <p className="text-purple-600 text-sm mb-4">{lang === 'hi' ? 'वैदिक ज्योतिषी' : 'Vedic Astrologer'}</p>
              <p className="text-gray-600 text-sm mb-6">
                {lang === 'hi' ? 'नमस्ते, मैं एक अनुभवी वैदिक ज्योतिषी हूँ। मेरा जुनून आपको ब्रह्मांडीय ऊर्जाओं के माध्यम से मार्गदर्शन करना और आपकी वास्तविक क्षमता को उजागर करने में मदद करना है।' : 'Hey, I\'m a renowned Vedic astrologer with years of experience. My passion is to guide you through cosmic energies and help you unlock your true potential.'}
              </p>
              <Link href="/contact" passHref>
                <Button className="w-full bg-[#F3E8FF] text-[#7C3AED] rounded-full py-2 px-4 shadow-md transition duration-300 border border-[#E0E0E0] hover:bg-[#E0F2FE] hover:text-[#FBBF24] mb-4">
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
              <h3 className="text-2xl font-bold text-black mb-4">
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
