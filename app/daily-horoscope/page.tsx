'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { AnimatedStars } from '../components/AnimatedStars';
import { MysticBackground } from '../components/MysticBackground';
import { DailyHoroscope } from '../components/DailyHoroscope';
import { CTASection } from '../components/CTASection';
import { Testimonials } from '../components/Testimonials';
import { AstrologerProfile } from '../components/AstrologerProfile';


interface HoroscopeCard {
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  href: string;
}

const horoscopeCards: HoroscopeCard[] = [
  {
    title: { en: "Aries Horoscope", hi: "मेष राशिफल" },
    description: {
      en: "Your daily insights for Aries, focusing on career and finance.",
      hi: "मेष राशि के लिए आपकी दैनिक अंतर्दृष्टि, करियर और वित्त पर ध्यान केंद्रित करते हुए।"
    },
    href: "/daily-horoscope/aries",
  },
  {
    title: { en: "Taurus Horoscope", hi: "वृषभ राशिफल" },
    description: {
      en: "Discover what the stars hold for Taurus in love and relationships.",
      hi: "प्रेम और रिश्तों में वृषभ के लिए सितारे क्या कहते हैं, जानें।"
    },
    href: "/daily-horoscope/taurus",
  },
  {
    title: { en: "Gemini Horoscope", hi: "मिथुन राशिफल" },
    description: {
      en: "Guidance for Gemini on health and well-being today.",
      hi: "आज स्वास्थ्य और कल्याण पर मिथुन राशि के लिए मार्गदर्शन।"
    },
    href: "/daily-horoscope/gemini",
  },
  {
    title: { en: "Cancer Horoscope", hi: "कर्क राशिफल" },
    description: {
      en: "Career growth and personal development tips for Cancerians.",
      hi: "कर्क राशि वालों के लिए करियर में वृद्धि और व्यक्तिगत विकास के सुझाव।"
    },
    href: "/daily-horoscope/cancer",
  },
  {
    title: { en: "Leo Horoscope", hi: "सिंह राशिफल" },
    description: {
      en: "Leadership opportunities and creative pursuits for Leos.",
      hi: "सिंह राशि वालों के लिए नेतृत्व के अवसर और रचनात्मक गतिविधियां।"
    },
    href: "/daily-horoscope/leo",
  },
  {
    title: { en: "Virgo Horoscope", hi: "कन्या राशिफल" },
    description: {
      en: "Practical solutions and organizational skills for Virgos.",
      hi: "कन्या राशि वालों के लिए व्यावहारिक समाधान और संगठनात्मक कौशल।"
    },
    href: "/daily-horoscope/virgo",
  },
  {
    title: { en: "Libra Horoscope", hi: "तुला राशिफल" },
    description: {
      en: "Balance and harmony in relationships for Librans.",
      hi: "तुला राशि वालों के लिए रिश्तों में संतुलन और सद्भाव।"
    },
    href: "/daily-horoscope/libra",
  },
  {
    title: { en: "Scorpio Horoscope", hi: "वृश्चिक राशिफल" },
    description: {
      en: "Deep insights and transformative opportunities for Scorpios.",
      hi: "वृश्चिक राशि वालों के लिए गहरी अंतर्दृष्टि और परिवर्तनकारी अवसर।"
    },
    href: "/daily-horoscope/scorpio",
  },
  {
    title: { en: "Sagittarius Horoscope", hi: "धनु राशिफल" },
    description: {
      en: "Adventure and philosophical pursuits for Sagittarians.",
      hi: "धनु राशि वालों के लिए साहसिक और दार्शनिक खोज।"
    },
    href: "/daily-horoscope/sagittarius",
  },
  {
    title: { en: "Capricorn Horoscope", hi: "मकर राशिफल" },
    description: {
      en: "Career advancement and financial planning for Capricorns.",
      hi: "मकर राशि वालों के लिए करियर में प्रगति और वित्तीय योजना।"
    },
    href: "/daily-horoscope/capricorn",
  },
  {
    title: { en: "Aquarius Horoscope", hi: "कुंभ राशिफल" },
    description: {
      en: "Innovation and social connections for Aquarians.",
      hi: "कुंभ राशि वालों के लिए नवाचार और सामाजिक संबंध।"
    },
    href: "/daily-horoscope/aquarius",
  },
  {
    title: { en: "Pisces Horoscope", hi: "मीन राशिफल" },
    description: {
      en: "Spiritual growth and creative expression for Pisceans.",
      hi: "मीन राशि वालों के लिए आध्यात्मिक विकास और रचनात्मक अभिव्यक्ति।"
    },
    href: "/daily-horoscope/pisces",
  },
];

export default function DailyHoroscopePage() {
  const { lang } = useLanguage();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-nebula-indigo via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
          <h1 className="text-4xl font-bold text-center mb-4 text-black">Daily Horoscopes</h1>
          <h2 className="text-2xl font-semibold text-center mb-8 text-black">दैनिक राशिफल</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {horoscopeCards.map((card, index) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={card.href}>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gold/20">
                    <h3 className="text-xl font-semibold mb-2 text-black">{card.title.en}</h3>
                    <h4 className="text-lg font-medium mb-3 text-black">{card.title.hi}</h4>
                    <p className="text-black">{card.description.en}</p>
                    <p className="text-black mt-2">{card.description.hi}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          

          <DailyHoroscope />
          <AstrologerProfile />
          <Testimonials />
          <CTASection />
        </div>
      </MysticBackground>
    </div>
  );
}
