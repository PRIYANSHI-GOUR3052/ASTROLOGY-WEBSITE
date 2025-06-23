'use client';

import Link from 'next/link';
import Image from 'next/image';

const zodiacSigns = [
  { name: 'Aries', hi: 'मेष', img: '/images/zodiac/aries.jpg', slug: 'aries' },
  { name: 'Taurus', hi: 'वृषभ', img: '/images/zodiac/taurus.jpg', slug: 'taurus' },
  { name: 'Gemini', hi: 'मिथुन', img: '/images/zodiac/gemini.jpg', slug: 'gemini' },
  { name: 'Cancer', hi: 'कर्क', img: '/images/zodiac/cancer.jpg', slug: 'cancer' },
  { name: 'Leo', hi: 'सिंह', img: '/images/zodiac/leo.jpg', slug: 'leo' },
  { name: 'Virgo', hi: 'कन्या', img: '/images/zodiac/virgo.jpg', slug: 'virgo' },
  { name: 'Libra', hi: 'तुला', img: '/images/zodiac/libra.jpg', slug: 'libra' },
  { name: 'Scorpio', hi: 'वृश्चिक', img: '/images/zodiac/scorpio.jpg', slug: 'scorpio' },
  { name: 'Sagittarius', hi: 'धनु', img: '/images/zodiac/sagittarius.jpg', slug: 'sagittarius' },
  { name: 'Capricorn', hi: 'मकर', img: '/images/zodiac/capricorn.jpg', slug: 'capricorn' },
  { name: 'Aquarius', hi: 'कुंभ', img: '/images/zodiac/aquarius.jpg', slug: 'aquarius' },
  { name: 'Pisces', hi: 'मीन', img: '/images/zodiac/pisces.jpg', slug: 'pisces' },
];

export default function DailyHoroscopeSelectionPage() {
  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">Select Your Zodiac Sign</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">Choose your sign to get your free daily horoscope prediction for love, career, and health.</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {zodiacSigns.map((sign) => (
            <Link key={sign.slug} href={`/daily-horoscope/${sign.slug}`}>
              <div className="group flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 cursor-pointer">
                <div className="relative w-24 h-24 mb-3">
                  <Image src={sign.img} alt={sign.name} fill className="object-contain" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">{sign.name}</h3>
                <p className="text-sm text-gray-500">{sign.hi}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
