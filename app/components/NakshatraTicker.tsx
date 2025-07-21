'use client';

import Marquee from 'react-fast-marquee';

const tickerItems = [
  'Discover your Nakshatra Gemstone',
  'Shop Vedic Remedies for Every Zodiac',
  '100% Authentic, Energized by Experts',
  'Personalized Astrology Reports Available',
  'Exclusive Spiritual Accessories Collection',
  'Free Shipping on Orders Above ₹999',
  'Trusted by Thousands of Happy Customers',
];

export default function NakshatraTicker() {
  return (
    <div className="w-full bg-black py-2">
      <Marquee
        gradient={false}
        speed={40}
        direction="right"
        pauseOnHover
        className="text-base md:text-lg font-semibold"
      >
        {tickerItems.map((item, idx) => (
          <span
            key={idx}
            className="mx-8"
            style={{ color: idx % 2 === 0 ? '#FFD580' : '#fff' }}
          >
            {item}
          </span>
        ))}
      </Marquee>
    </div>
  );
} 