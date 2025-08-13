'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import ServiceCarousels from './ServiceCarousels';
import NakshatraGyaanBanner from './NakshatraGyaanBanner';
import ProductAssuranceBar from './ProductAssuranceBar';
import { UniversalServiceCard } from './UniversalServiceCard';
import { UniversalServiceCardGrid } from './UniversalServiceCardGrid';

interface ProductServiceCardProps {
  image: string;
  title: string;
  description: string;
  badge?: string;
  href: string;
}

const services = [
  {
    slug: 'kundali-matching',
    title: 'Kundali Matching',
    description: 'Discover the science and sacred art of Vedic compatibility. Our expert astrologers blend tradition and modern insight to guide you toward a harmonious, blessed union.',
    image: '/images/birth_chart_mockup.jpg',
    badge: 'STARTS AT ₹2100',
    price: '₹2,100',
    originalPrice: '₹3,500',
  },
  {
    slug: 'panchang',
    title: "Today's Panchang",
    description: 'Your daily Vedic almanac for cosmic alignment, auspicious timings, and spiritual clarity.',
    image: '/images/cosmiccalendar.png',
    badge: '',
    price: '₹299',
    originalPrice: '₹499',
  },
  {
    slug: 'career-job',
    title: 'Career & Job Guidance',
    description: 'Navigate your professional path with cosmic clarity. Get personalized guidance to make informed career decisions and overcome challenges.',
    image: '/images/course-3.jpg',
    badge: 'HIGHLY RECOMMENDED',
    price: '₹1,499',
    originalPrice: '₹2,999',
  },
  {
    slug: 'grah-shanti',
    title: 'Grah Shanti Puja',
    description: 'Harmonize planetary energies and mitigate negative influences with a traditional Grah Shanti Puja.',
    image: '/images/course-2.jpg',
    badge: 'FIRST MONDAY SPECIAL',
  },
  {
    slug: 'numerology',
    title: 'Numerology Analysis',
    description: 'Discover the power of numbers in your life with personalized numerology reading.',
    image: '/images/course-4.jpg',
    badge: '',
    price: '₹899',
    originalPrice: '₹1,499',
  },
  {
    slug: 'online-puja',
    title: 'Online Puja Services',
    description: 'Experience the sacred power of Vedic rituals from the comfort of your home.',
    image: '/images/course-1.jpg',
    badge: 'STARTS AT ₹5100',
    price: '₹5,100',
    originalPrice: '₹7,500',
  },
  {
    slug: 'palmistry',
    title: 'Palmistry Consultation',
    description: 'Unlock the secrets hidden in your hands. Get insightful readings on your life path, character, and future.',
    image: '/images/course-5.jpg',
    badge: '',
    price: '₹799',
    originalPrice: '₹1,299',
  },
  {
    slug: 'personal-reading',
    title: 'Personal Astrology Reading',
    description: 'In-depth analysis of your natal chart, providing insights into your personality, life path, career, and relationships.',
    image: '/images/astrology_understanding.jpg',
    badge: '',
  },
  {
    slug: 'tantra',
    title: 'Tantra Consultation',
    description: 'Explore the transformative path of Tantra with expert guidance for spiritual growth and healing.',
    image: '/images/tantra.svg',
    badge: '',
  },
  {
    slug: 'tarot-reading',
    title: 'Tarot Reading',
    description: 'Unlock the mystical secrets of the cards and gain profound insight into your life\'s journey.',
    image: '/images/tarot-banner.jpg',
    badge: '',
  },
  {
    slug: 'vedic-remedies',
    title: 'Vedic Remedies',
    description: 'Personalized Vedic remedies to balance planetary influences and bring harmony to your life. Includes gemstones, yantras, and rituals.',
    image: '/images/astrowellness.jpg',
    badge: 'RECOMMENDED',
  },
  {
    slug: 'spiritual-counseling',
    title: 'Spiritual Counseling',
    description: 'One-on-one sessions with expert spiritual guides to help you overcome life challenges and find inner peace.',
    image: '/images/spiritualpathway.jpg',
    badge: '',
  },
  {
    slug: 'vedic-astrology',
    title: 'Vedic Astrology',
    description: 'Get deep insights into your life, career, and relationships with traditional Vedic astrology readings from expert astrologers.',
    image: '/images/astrology_understanding.jpg', // reused
    badge: 'POPULAR',
  },
  {
    slug: 'child-astrology',
    title: 'Child Astrology',
    description: 'Discover your child’s unique strengths, talents, and life path with a personalized astrological analysis.',
    image: '/images/birth_chart_mockup.jpg', // reused
    badge: '',
  },
  {
    slug: 'business-astrology',
    title: 'Business Astrology',
    description: 'Unlock business success and growth with astrological guidance for entrepreneurs and business owners.',
    image: '/images/course-3.jpg', // reused
    badge: 'NEW',
  },
  {
    slug: 'health-wellness',
    title: 'Health & Wellness',
    description: 'Receive holistic health and wellness advice based on your birth chart and planetary influences.',
    image: '/images/astrowellness.jpg', // reused
    badge: '',
  },
  {
    slug: 'marriage-matching',
    title: 'Marriage Matching',
    description: 'Ensure a harmonious marriage with detailed horoscope matching and compatibility analysis.',
    image: '/images/kundali-matching.jpg', // fallback to kundali-matching if available, else reuse another
    badge: 'RECOMMENDED',
  },
  {
    slug: 'remedial-consultation',
    title: 'Remedial Consultation',
    description: 'Get personalized remedies for doshas and planetary afflictions to bring peace and prosperity.',
    image: '/images/grah-shanti.jpg', // fallback to grah-shanti if available, else reuse another
    badge: '',
  },
  {
    slug: 'yearly-predictions',
    title: 'Yearly Predictions',
    description: 'Plan your year ahead with detailed astrological predictions and guidance for every aspect of life.',
    image: '/images/course-4.jpg', // reused
    badge: '2024',
  },
  {
    slug: 'gemstone-recommendation',
    title: 'Gemstone Recommendation',
    description: 'Find the right gemstones to enhance your luck, health, and success based on your horoscope.',
    image: '/images/gemstones.jpg', // reused
    badge: '',
  },
  {
    slug: 'vastu-consultation',
    title: 'Vastu Consultation',
    description: 'Harmonize your home and workspace with Vastu Shastra principles for peace and prosperity.',
    image: '/images/astrology.svg', // reused
    badge: '',
  },
];

export function UniversalServicesGrid({ className = '' }) {
  const [search, setSearch] = useState('');

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.description.toLowerCase().includes(search.toLowerCase())
  );

  // Split services: first 3 for horizontal grid, next 4 for Featured Services, next 4 for Expert Consultations, next 4 for third special layout
  const firstThreeServices = filteredServices.slice(0, 3);
  const nextFourServices = filteredServices.slice(3, 7);
  const nextFourServices2 = filteredServices.slice(7, 11);
  const nextFourServices3 = filteredServices.slice(11, 15);

  return (
    <>
      <div className="flex justify-center md:justify-end mb-8">
        <form
          className="flex w-full max-w-[500px] shadow-md"
          onSubmit={e => { e.preventDefault(); }}
          style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}
        >
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Let's find what you're looking for..."
            style={{
              background: '#fff',
              border: 'none',
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: '16px',
              padding: '14px 24px',
              fontSize: '1.15rem',
              fontFamily: 'Playfair Display, serif',
              color: '#232323',
              width: '100%',
              outline: 'none',
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          />
          <button
            type="submit"
            tabIndex={-1}
            style={{
              background: '#F0E3DA',
              border: 'none',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
              width: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            onClick={e => { e.preventDefault(); const input = document.querySelector('input[type=text]') as HTMLInputElement | null; input?.focus(); }}
          >
            <svg width="22" height="22" fill="none" stroke="black" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </form>
      </div>

      {/* First 3 cards in horizontal grid */}
      <UniversalServiceCardGrid 
        services={firstThreeServices}
        className={className}
        maxCards={3}
        gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      />

      {/* Section Heading */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Featured Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
          Discover our most popular spiritual services and expert consultations
        </p>
      </div>

      {/* Next 4 cards in RecentPosts-style layout (3 small left, 1 large right) */}
      {nextFourServices.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left Column: Three Small Cards */}
            <div className="flex flex-col gap-6">
              {nextFourServices.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/services/${service.slug}`} className="block group" style={{ textDecoration: 'none' }}>
                    <div className="flex flex-row bg-white rounded-2xl shadow-lg overflow-hidden h-[200px] w-full hover:shadow-xl transition-all duration-300">
                      {/* Image on the left */}
                      <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center my-auto mx-4 overflow-hidden rounded-xl">
                        <motion.img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          style={{ opacity: 0.9 }}
                          whileHover={{ 
                            scale: 1.15,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                        />
                        {service.badge && (
                          <span className="absolute top-2 left-2 bg-[#e74c3c] text-white text-xs font-semibold px-3 py-1 rounded shadow z-10">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      
                      {/* Content on the right */}
                      <div className="flex-1 p-4 flex flex-col justify-center">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 group-hover:text-gray-500 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {service.description}
                        </p>
                        <motion.span 
                          className="inline-block px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold shadow hover:bg-gray-800 transition-all w-max"
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                        >
                          Learn More →
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Column: One Large Featured Card */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href={`/services/${nextFourServices[3].slug}`} className="block group" style={{ textDecoration: 'none' }}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[450px] hover:shadow-xl transition-all duration-300">
                    <div className="relative w-full h-64 flex items-center justify-center">
                      <img
                        src={nextFourServices[3].image}
                        alt={nextFourServices[3].title}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.9 }}
                      />
                      {nextFourServices[3].badge && (
                        <span className="absolute top-4 left-4 bg-[#e74c3c] text-white text-sm font-semibold px-4 py-1 rounded-lg shadow">
                          {nextFourServices[3].badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between h-[164px]">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {nextFourServices[3].title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {nextFourServices[3].description}
                        </p>
                      </div>
                      <span className="inline-block px-6 py-2 rounded-lg bg-black text-white text-base font-semibold shadow hover:bg-gray-800 transition-all w-max">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Service Carousels (Top-Selling Section) */}
      <div className="mt-16 mb-32">
        <ServiceCarousels />
      </div>

      {/* Nakshatra Gyaan Banner */}
      <div className="mt-16 mb-32">
        <NakshatraGyaanBanner />
      </div>

      {/* Second Section Heading */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Expert Consultations
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
          Deep insights and personalized guidance from our spiritual experts
        </p>
      </div>

      {/* Next 4 cards in same layout (3 small left, 1 large right) */}
      {nextFourServices2.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left Column: Three Small Cards */}
            <div className="flex flex-col gap-6">
              {nextFourServices2.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/services/${service.slug}`} className="block group" style={{ textDecoration: 'none' }}>
                    <div className="flex flex-row bg-white rounded-2xl shadow-lg overflow-hidden h-[240px] sm:h-[200px] w-full hover:shadow-xl transition-all duration-300">
                      {/* Image on the left */}
                      <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center my-auto mx-4 overflow-hidden rounded-xl">
                        <motion.img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          style={{ opacity: 0.9 }}
                          whileHover={{ 
                            scale: 1.15,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                        />
                        {service.badge && (
                          <span className="absolute top-2 left-2 bg-[#e74c3c] text-white text-xs font-semibold px-3 py-1 rounded shadow z-10">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      
                      {/* Content on the right */}
                      <div className="flex-1 p-4 flex flex-col justify-center">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 group-hover:text-gray-500 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {service.description}
                        </p>
                        <motion.span 
                          className="inline-block px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold shadow hover:bg-gray-800 transition-all w-max"
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                        >
                          Learn More →
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Column: One Large Featured Card */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href={`/services/${nextFourServices2[3].slug}`} className="block group" style={{ textDecoration: 'none' }}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[450px] hover:shadow-xl transition-all duration-300">
                    <div className="relative w-full h-64 flex items-center justify-center">
                      <img
                        src={nextFourServices2[3].image}
                        alt={nextFourServices2[3].title}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.9 }}
                      />
                      {nextFourServices2[3].badge && (
                        <span className="absolute top-4 left-4 bg-[#e74c3c] text-white text-sm font-semibold px-4 py-1 rounded-lg shadow">
                          {nextFourServices2[3].badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between h-[164px]">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {nextFourServices2[3].title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {nextFourServices2[3].description}
                        </p>
                      </div>
                      <span className="inline-block px-6 py-2 rounded-lg bg-black text-white text-base font-semibold shadow hover:bg-gray-800 transition-all w-max">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Third Section Heading */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          Specialized Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
          Tailored solutions for specific life areas and spiritual needs
        </p>
      </div>

      {/* Next 4 cards in same layout (3 small left, 1 large right) */}
      {nextFourServices3.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left Column: Three Small Cards */}
            <div className="flex flex-col gap-6">
              {nextFourServices3.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/services/${service.slug}`} className="block group" style={{ textDecoration: 'none' }}>
                    <div className="flex flex-row bg-white rounded-2xl shadow-lg overflow-hidden h-[200px] w-full hover:shadow-xl transition-all duration-300">
                      {/* Image on the left */}
                      <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 flex items-center justify-center my-auto mx-4 overflow-hidden rounded-xl">
                        <motion.img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          style={{ opacity: 0.9 }}
                          whileHover={{ 
                            scale: 1.15,
                            transition: { duration: 0.4, ease: "easeOut" }
                          }}
                        />
                        {service.badge && (
                          <span className="absolute top-2 left-2 bg-[#e74c3c] text-white text-xs font-semibold px-3 py-1 rounded shadow z-10">
                            {service.badge}
                          </span>
                        )}
                      </div>
                      
                      {/* Content on the right */}
                      <div className="flex-1 p-4 flex flex-col justify-center">
                        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {service.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 group-hover:text-gray-500 transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {service.description}
                        </p>
                        <motion.span 
                          className="inline-block px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold shadow hover:bg-gray-800 transition-all w-max"
                          whileHover={{ 
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                        >
                          Learn More →
                        </motion.span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Column: One Large Featured Card */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href={`/services/${nextFourServices3[3].slug}`} className="block group" style={{ textDecoration: 'none' }}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[450px] hover:shadow-xl transition-all duration-300">
                    <div className="relative w-full h-64 flex items-center justify-center">
                      <img
                        src={nextFourServices3[3].image}
                        alt={nextFourServices3[3].title}
                        className="w-full h-full object-cover"
                        style={{ opacity: 0.9 }}
                      />
                      {nextFourServices3[3].badge && (
                        <span className="absolute top-4 left-4 bg-[#e74c3c] text-white text-sm font-semibold px-4 py-1 rounded-lg shadow">
                          {nextFourServices3[3].badge}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col justify-between h-[164px]">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {nextFourServices3[3].title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {nextFourServices3[3].description}
                        </p>
                      </div>
                      <span className="inline-block px-6 py-2 rounded-lg bg-black text-white text-base font-semibold shadow hover:bg-gray-800 transition-all w-max">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* Product Assurance Bar */}
      <ProductAssuranceBar />
    </>
  );
}

// Extracted Card Component for reuse
export function ProductServiceCard({ image, title, description, badge, href }: ProductServiceCardProps) {
  return (
    <Link href={href} className="block group h-full" style={{ textDecoration: 'none' }}>
      <div className="relative rounded-2xl overflow-hidden shadow-lg h-[380px] min-h-[380px] flex flex-col justify-end group-hover:scale-[1.02] group-hover:shadow-2xl duration-200 bg-[#f7f5ed]">
        {/* Service/Product Image */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ minHeight: 220, maxHeight: 380 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.92 }}
          />
        </motion.div>
        {/* Badge */}
        {badge && (
          <span className="absolute top-4 left-4 bg-[#e74c3c] text-white text-xs px-3 py-1 rounded-full z-10 shadow" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.01em' }}>{badge}</span>
        )}
        {/* Overlay for text */}
        <div className="relative z-10 w-full px-6 py-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end min-h-[120px]">
          <h3 className="text-xl mb-2 text-white text-left" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>{title}</h3>
          <p className="text-sm text-white text-left" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>{description}</p>
        </div>
      </div>
    </Link>
  );
}