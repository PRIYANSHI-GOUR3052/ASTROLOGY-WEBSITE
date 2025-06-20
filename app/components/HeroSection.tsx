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
import ArcCarousel from './ArcCarousel'
import CardStack from './CardStack'

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
  return (
    <section className="w-full min-h-[70vh] bg-white px-2 md:px-8 py-4 flex flex-col items-center justify-center mt-20 md:mt-32">
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start">
        {/* Left Column */}
        <div className="flex flex-col gap-8">
          {/* Article 1 */}
          <div className="flex flex-col">
            <div className="relative w-full h-64 md:h-72 flex-shrink-0 overflow-hidden">
              <Image src="/images/ASTRO.webp" alt="Nakshatra Secrets" fill className="object-cover" />
            </div>
            <div className="mt-4">
              <div className="font-extrabold text-xl md:text-2xl leading-snug">Unveiling Nakshatra Secrets</div>
              <div className="text-sm text-gray-500 mb-1">JUL 15 • ASTROLOGY</div>
              <div className="text-base text-gray-700">Explore the hidden meanings and cosmic influences of each Nakshatra in your birth chart.</div>
            </div>
          </div>
          {/* Article 2 */}
          <div className="flex flex-col">
            <div className="relative w-full h-64 md:h-72 flex-shrink-0 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80" alt="Astrology Remedies" fill className="object-cover" />
            </div>
            <div className="mt-4">
              <div className="font-extrabold text-xl md:text-2xl leading-snug">Astrology Remedies for Life</div>
              <div className="text-sm text-gray-500 mb-1">JUL 10 • REMEDIES</div>
              <div className="text-base text-gray-700">Discover powerful Vedic remedies to balance your planetary energies and improve your destiny.</div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div className="flex flex-col items-start w-full">
          <div className="relative w-full h-80 md:h-[500px] overflow-hidden mb-6">
            <Image src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" alt="Nakshatra Gyan Hero" fill className="object-cover" />
          </div>
          <div className="w-full">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-3 text-black">Nakshatra Gyaan: Unlock Your Celestial Path</h1>
            <p className="text-gray-700 text-lg md:text-xl font-medium">Dive deep into the wisdom of Nakshatras and Vedic astrology. Get expert guidance, daily insights, and cosmic solutions for your life's journey.</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-8">
          {/* Article 1 */}
          <div className="flex flex-col">
            <div className="relative w-full h-52 md:h-64 flex-shrink-0 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80" alt="Daily Horoscope" fill className="object-cover" />
            </div>
            <div className="mt-4">
              <div className="font-extrabold text-xl leading-snug">Today's Nakshatra Forecast</div>
              <div className="text-sm text-gray-500 mb-1">JUL 16 • HOROSCOPE</div>
              <div className="text-base text-gray-700">Get your personalized Nakshatra-based horoscope and make the most of today's energies.</div>
            </div>
          </div>
          {/* Article 2 */}
          <div className="flex flex-col">
            <div className="relative w-full h-52 md:h-64 flex-shrink-0 overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80" alt="Astrology Consultation" fill className="object-cover" />
            </div>
            <div className="mt-4">
              <div className="font-extrabold text-xl leading-snug">Book a Vedic Astrology Consultation</div>
              <div className="text-sm text-gray-500 mb-1">JUL 18 • CONSULTATION</div>
              <div className="text-base text-gray-700">Connect with our expert astrologers for in-depth Nakshatra and planetary guidance.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}