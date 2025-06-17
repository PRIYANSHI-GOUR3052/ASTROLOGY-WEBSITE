'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '../contexts/LanguageContext'
import {
  Share2, Search, MessageCircle, UserPlus,
  ChevronLeft, ChevronRight, Maximize, RotateCcw,
  Circle, Briefcase, Play, BookOpen, HeartPulse, ArrowRight, // Icons for categories
  Star, Moon, Sun, Sparkles, Heart, Calendar, Gem, Home, GraduationCap // New icons
} from 'lucide-react'
// import { pastelColors } from '@/app/components/Testimonials' // Keep commented out as cardGradients are now used
import { ZodiacWheel } from './ZodiacWheel'

// Define some soft gradients for cards
const cardGradients = [
  "from-purple-100 via-pink-100 to-red-100", // Brighter, cuter
  "from-green-100 via-yellow-100 to-lime-100", // Another vibrant combo
  "from-blue-100 via-cyan-100 to-indigo-100",
  "from-orange-100 via-amber-100 to-yellow-100",
  "from-fuchsia-100 via-rose-100 to-purple-100",
  "from-teal-100 via-emerald-100 to-blue-100",
];

// Content constants
const largeArticleCardContent = {
  image: "https://via.placeholder.com/400x250/A6B7C3/FFFFFF?text=Astrology+Insight", // Placeholder for lamp image
  title: {
    en: "Nakshatra Gyaan",
    hi: "नक्षत्र ज्ञान",
  },
  description: {
    en: "Discover Your Celestial Path. Unlock the secrets of the cosmos and find your life's purpose through our spiritual services and expert guidance.",
    hi: "अपना आकाशीय मार्ग खोजें। हमारी आध्यात्मिक सेवाओं और विशेषज्ञ मार्गदर्शन के माध्यम से ब्रह्मांड के रहस्यों को अनलॉक करें और अपने जीवन का उद्देश्य खोजें।",
  },
  author: { en: "Dr. Narendra Kumar Sharma", hi: "डॉ. नरेंद्र कुमार शर्मा" },
  date: { en: "Jul 15, 2024", hi: "जुलाई 15, 2024" },
};

const coffeeArticleCardContent = {
  // image: "https://via.placeholder.com/150/A6B7C3/FFFFFF?text=Cosmic+Coffee", // Placeholder for coffee image
  title: {
    en: "The Astrological Significance of Daily Rituals",
    hi: "दैनिक अनुष्ठानों का ज्योतिषीय महत्व",
  },
  author: { en: "Priya Singh", hi: "प्रिया सिंह" },
  // authorImage: "https://via.placeholder.com/30/C4D1D9/FFFFFF?text=PS",
  date: { en: "Jul 10, 2024", hi: "जुलाई 10, 2024" },
};

const videoCardContent = {
  // image: "https://via.placeholder.com/200x120/A6B7C3/FFFFFF?text=Nakshatra+Film", // Placeholder for building image
  title: { en: "An Inspiring Short Film: Journey Through Nakshatras", hi: "एक प्रेरणादायक लघु फिल्म: नक्षत्रों के माध्यम से यात्रा" },
  views: "80,989",
};

const profileCardContent = {
  // image: "https://via.placeholder.com/80/C4D1D9/FFFFFF?text=AG", // Placeholder for Alex's image
  name: { en: "Dr. Narendra Kumar Sharma", hi: "डॉ. नरेंद्र कुमार शर्मा" }, // Changed name
  title: { en: "Vedic Astrologer", hi: "वैदिक ज्योतिषी" },
  stats: [
    { label: { en: "Readings", hi: "पठन" }, value: "34" },
    { label: { en: "Clients", hi: "ग्राहक" }, value: "980" },
    { label: { en: "Rating", hi: "रेटिंग" }, value: "4.9" },
  ],
};

const categories = [
  { icon: Circle, label: { en: "Nakshatras", hi: "नक्षत्र" } },
  { icon: Briefcase, label: { en: "Horoscopes", hi: "राशिफल" } },
  { icon: Play, label: { en: "Remedies", hi: "उपाय" } },
  { icon: BookOpen, label: { en: "Vedic Texts", hi: "वैदिक ग्रंथ" } },
  { icon: HeartPulse, label: { en: "Astro-Wellness", hi: "ज्योतिष-कल्याण" } },
];

const searchTags = [
  { en: "Predictive", hi: "भविष्यवाचक" },
  { en: "Compatibility", hi: "संगतता" },
  { en: "Transits", hi: "गोचर" },
  { en: "Remedies", hi: "उपाय" },
  { en: "Dasha", hi: "दशा" },
];

export function HeroSection() {
  const { lang } = useLanguage();

  const Tag = ({ text }: { text: { en: string; hi: string } }) => (
    <span className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full mr-2 mb-2 whitespace-nowrap">
      #{text[lang]}
    </span>
  );

  return (
    <section className="relative font-sans min-h-screen py-12 bg-[##FFFFFF] overflow-hidden">
      {/* Abstract background shapes - for shimmery effect */}
      <div className="absolute top-10 left-0 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

          {/* Large Article Card (Top Left) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`md:col-span-8 rounded-xl shadow-lg p-6 flex flex-col lg:flex-row items-start gap-6 bg-gradient-to-br ${cardGradients[1 % cardGradients.length]} transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl`}
          >
            <div className="flex-shrink-0 w-full lg:w-2/5 h-60 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center text-gray-600 text-lg">
              Article Card Placeholder
            </div>
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight font-serif bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
                {largeArticleCardContent.title[lang]}
              </h2>
              <p className="text-gray-900 text-base mb-4 line-clamp-3 font-sans">
                {largeArticleCardContent.description[lang]}
              </p>
              <div className="flex items-center justify-between text-gray-900">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-purple-300 rounded-full flex items-center justify-center text-purple-800 text-xs font-bold">
                    NS
                  </div>
                  <span className="font-medium">{largeArticleCardContent.author[lang]}</span>
                  <span className="text-gray-500">• {largeArticleCardContent.date[lang]}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Second Card (Top Right) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`md:col-span-4 rounded-xl shadow-lg p-6 bg-gradient-to-br ${cardGradients[2 % cardGradients.length]} transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl`}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-serif font-bold mb-4 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">Explore Astrology</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Star className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Birth Chart Analysis</h4>
                    <p className="text-xs text-gray-700">Understand your cosmic blueprint</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Moon className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Planetary Transits</h4>
                    <p className="text-xs text-gray-700">Track celestial movements</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Sun className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Relationship Compatibility</h4>
                    <p className="text-xs text-gray-700">Discover cosmic connections</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Career Guidance</h4>
                    <p className="text-xs text-gray-700">Align with your destiny</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Spiritual Growth</h4>
                    <p className="text-xs text-gray-700">Enhance your inner journey</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Third Card (Middle Left) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`md:col-span-4 rounded-xl shadow-lg p-6 bg-gradient-to-br ${cardGradients[3 % cardGradients.length]} transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl`}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-xl font-serif font-bold mb-4 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">Astrology Services</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Muhurta Selection</h4>
                    <p className="text-xs text-gray-700">Choose auspicious timings</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Gem className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Gemstone Guidance</h4>
                    <p className="text-xs text-gray-700">Enhance planetary influences</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <Home className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Vastu Consultation</h4>
                    <p className="text-xs text-gray-700">Harmonize your living space</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Astrology Courses</h4>
                    <p className="text-xs text-gray-700">Learn ancient wisdom</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-purple-800" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Vedic Texts Study</h4>
                    <p className="text-xs text-gray-700">Explore sacred knowledge</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Dr. Narendra Kumar Sharma Card (Middle Right) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`md:col-span-4 rounded-xl shadow-lg p-3 bg-gradient-to-br ${cardGradients[4 % cardGradients.length]} transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl flex flex-col items-center text-center`}
          >
            <h3 className="text-xl font-serif font-bold mb-1 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">Dr. Narendra Kumar Sharma</h3>
            <p className="text-base mb-2 font-sans text-gray-900">
              {profileCardContent.title[lang]} {/* Vedic Astrologer title */}
            </p>
            <p className="text-sm mb-3 font-sans text-gray-900">
              {lang === 'en' ? "Renowned Vedic Astrologer and spiritual guide, dedicated to illuminating paths with ancient wisdom." : "प्रसिद्ध वैदिक ज्योतिषी और आध्यात्मिक गुरु, प्राचीन ज्ञान से मार्ग प्रशस्त करने के लिए समर्पित।"}
            </p>
            <div className="flex justify-center gap-4 mb-4">
              {profileCardContent.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="font-extrabold text-gray-900 text-base font-serif">{stat.value}</p>
                  <p className="text-gray-600 text-sm font-sans">{stat.label[lang]}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 mb-4">
              <Link href="/contact" className="bg-gray-200 text-gray-800 px-4 py-1.5 rounded-full hover:bg-gray-300 transition-colors flex items-center gap-1.5 text-xs">
                <MessageCircle className="w-3.5 h-3.5" /> Chat
              </Link>
              <Link href="https://www.instagram.com/narendra_kumar_sharma/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white px-4 py-1.5 rounded-full hover:shadow-lg transition-all duration-300 flex items-center gap-1.5 text-xs">
                <UserPlus className="w-3.5 h-3.5" /> Follow
              </Link>
            </div>
            <Link href="/about" className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white rounded-full px-3 py-0.5 shadow-md flex items-center gap-0.5 hover:shadow-lg transition-all duration-300">
              <span className="text-xs font-medium">{lang === 'en' ? "Learn More" : "और जानें"}</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>
          </motion.div>

          {/* Video Card (Middle Right) - Replaced with Zodiac Wheel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`md:col-span-4 flex items-center justify-center`}
          >
            <ZodiacWheel />
          </motion.div>

          {/* New Card: About Our Website & Astrology (Replaces old Profile Card) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className={`md:col-span-8 rounded-xl shadow-lg p-6 bg-gradient-to-br ${cardGradients[5 % cardGradients.length]} transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl flex flex-col items-center text-center`}
          >
            <h3 className="text-2xl font-extrabold font-serif mb-2 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">
              {lang === 'en' ? "Explore Our Cosmic World" : "हमारे ब्रह्मांडीय विश्व का अन्वेषण करें"}
            </h3>
            <p className="text-gray-900 text-base mb-4 font-sans">
              {lang === 'en' ? 
                "Dive deep into Vedic astrology, daily horoscopes, remedies, and spiritual guidance. Our platform offers personalized insights to help you navigate life's journey. Discover your destiny, understand planetary influences, and align with cosmic energies for a fulfilling life. We provide comprehensive charts, expert consultations, and a wealth of ancient wisdom at your fingertips." 
                : 
                "वैदिक ज्योतिष, दैनिक राशिफल, उपचार और आध्यात्मिक मार्गदर्शन में गहराई से उतरें। हमारा मंच आपको जीवन की यात्रा में मदद करने के लिए व्यक्तिगत अंतर्दृष्टि प्रदान करता है। अपनी नियति का पता लगाएं, ग्रहों के प्रभावों को समझें, और एक पूर्ण जीवन के लिए ब्रह्मांडीय ऊर्जाओं के साथ संरेखित करें। हम आपकी उंगलियों पर व्यापक चार्ट, विशेषज्ञ परामर्श और प्राचीन ज्ञान का खजाना प्रदान करते हैं।"}
            </p>
            <Link href="/services" className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white rounded-full px-6 py-2 shadow-md flex items-center gap-2 hover:shadow-lg transition-all duration-300">
              <span className="text-sm font-medium">{lang === 'en' ? "Get Started" : "शुरू करें"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Navigation Arrows and Tags (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className={`md:col-span-4 flex flex-col justify-end items-end gap-4 p-4 bg-gradient-to-br ${cardGradients[0 % cardGradients.length]} rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl`}
          >
            <div className="flex gap-2">
              <Button className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100">
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </Button>
              <Button className="bg-white rounded-full p-3 shadow-md hover:bg-gray-100">
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </Button>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Link 
                href="/study" 
                className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white rounded-full px-6 py-2 shadow-md flex items-center gap-2 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-sm font-medium">Nakshatra Gyaan</span>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">2024</span>
              </Link>
              <Link 
                href="/daily-horoscope" 
                className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white rounded-full px-6 py-2 shadow-md flex items-center gap-2 hover:shadow-lg transition-all duration-300"
              >
                <span className="text-sm font-medium">Daily Horoscopes</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}