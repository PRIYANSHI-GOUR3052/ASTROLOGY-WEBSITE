'use client';

import Marquee from 'react-fast-marquee';

const serviceTickerItems = [
  '🌟 Expert Vedic Astrologers Available 24/7',
  '🔮 Personalized Kundali Analysis & Remedies',
  '💎 Authentic Gemstones & Spiritual Accessories',
  '📅 Daily Panchang & Auspicious Timings',
  '🎯 Career & Life Path Guidance',
  '💕 Love & Relationship Compatibility',
  '🏠 Vastu Shastra & Home Harmony',
  '🧘 Spiritual Counseling & Meditation',
  '📚 Learn Vedic Astrology & Numerology',
  '✨ 100% Authentic & Energized Products',
  '🚚 Free Shipping on Orders Above ₹999',
  '⭐ Trusted by 50,000+ Happy Customers',
];

export default function ServiceTicker() {
  return (
    <div className="w-screen -mx-4 md:-mx-8 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 py-4 border-y border-amber-200">
      <Marquee
        gradient={false}
        speed={30}
        direction="left"
        pauseOnHover
        className="text-lg md:text-xl font-bold"
      >
        {serviceTickerItems.map((item, idx) => (
          <span
            key={idx}
            className="mx-12"
            style={{ 
              color: idx % 2 === 0 ? '#B45309' : '#92400E',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
} 