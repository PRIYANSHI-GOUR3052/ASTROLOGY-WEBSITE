'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    slug: 'kundali-matching',
    title: 'Kundali Matching',
    description: 'Discover the science and sacred art of Vedic compatibility. Our expert astrologers blend tradition and modern insight to guide you toward a harmonious, blessed union.',
    image: '/images/birth_chart_mockup.jpg',
    badge: 'STARTS AT ₹2100',
  },
  {
    slug: 'panchang',
    title: "Today's Panchang",
    description: 'Your daily Vedic almanac for cosmic alignment, auspicious timings, and spiritual clarity.',
    image: '/images/cosmiccalendar.png',
    badge: '',
  },
  {
    slug: 'career-job',
    title: 'Career & Job Guidance',
    description: 'Navigate your professional path with cosmic clarity. Get personalized guidance to make informed career decisions and overcome challenges.',
    image: '/images/course-3.jpg',
    badge: 'HIGHLY RECOMMENDED',
  },
  {
    slug: 'grah-shanti',
    title: 'Grah Shanti Puja',
    description: 'Harmonize planetary energies and mitigate negative influences with a traditional Grah Shanti Puja.',
    image: '/images/astrology.svg',
    badge: 'FIRST MONDAY SPECIAL',
  },
  {
    slug: 'numerology',
    title: 'Numerology Analysis',
    description: 'Discover the power of numbers in your life with personalized numerology reading.',
    image: '/images/Numerology.svg',
    badge: '',
  },
  {
    slug: 'online-puja',
    title: 'Online Puja Services',
    description: 'Experience the sacred power of Vedic rituals from the comfort of your home.',
    image: '/images/course-1.jpg',
    badge: 'STARTS AT ₹5100',
  },
  {
    slug: 'palmistry',
    title: 'Palmistry Consultation',
    description: 'Unlock the secrets hidden in your hands. Get insightful readings on your life path, character, and future.',
    image: '/images/palm.svg',
    badge: '',
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
];

export function UniversalServicesGrid({ className = '' }) {
  const [search, setSearch] = useState('');

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.description.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 ${className}`}>
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/services/${service.slug}`} className="block group h-full" style={{ textDecoration: 'none' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[340px] flex flex-col justify-end group-hover:scale-[1.02] group-hover:shadow-2xl duration-200 bg-[#f7f5ed]">
                {/* Service Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                  style={{ minHeight: 220, maxHeight: 340, opacity: 0.92 }}
                />
                {/* Badge */}
                {service.badge && (
                  <span className="absolute top-4 left-4 bg-[#e74c3c] text-white text-xs px-3 py-1 rounded-full z-10 shadow" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.01em' }}>{service.badge}</span>
                )}
                {/* Overlay for text */}
                <div className="relative z-10 w-full px-6 py-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end min-h-[120px]">
                  <h3 className="text-xl mb-2 text-white text-left" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>{service.title}</h3>
                  <p className="text-sm text-white text-left" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>{service.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}