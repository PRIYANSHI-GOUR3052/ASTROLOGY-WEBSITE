'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// Nakshatra Gyan astrology-related cards
const cards = [
  {
    image: '/images/astrology_app_mockup.jpg',
    title: 'Personal Horoscope',
    description: 'Get your detailed birth chart and daily predictions from expert astrologers.',
  },
  {
    image: '/images/gemstones.jpg',
    title: 'Gemstone Recommendation',
    description: 'Discover the right gemstones to enhance your luck, health, and prosperity.',
  },
  {
    image: '/images/birth_chart_mockup.jpg',
    title: 'Kundali Matching',
    description: 'Find your perfect match with advanced Vedic compatibility analysis.',
  },
  {
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-3_h9xwl3.jpg',
    title: 'Numerology Insights',
    description: 'Unlock the secrets of your numbers for career, relationships, and more.',
  },
  {
    image: '/images/tarot-banner.jpg',
    title: 'Tarot Reading',
    description: 'Get answers to your questions with intuitive tarot card readings.',
  },
  {
    image: '/images/astrology_understanding.jpg',
    title: 'Astrology Courses',
    description: 'Learn astrology from the basics to advanced with our expert-led courses.',
  },
  {
    image: '/images/astrowellness.jpg',
    title: 'Astro Wellness',
    description: 'Personalized remedies and wellness tips based on your unique horoscope.',
  },
];

export default function CurvedHeroCarousel() {
  return (
    <section className="w-full min-h-[90vh] flex flex-col items-center justify-center bg-[#f7f5f2] px-2 py-8">
      {/* Heading */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">
          Unlock Your Destiny with <span className="text-[#6A0DAD]">Nakshatra Gyan</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Experience authentic Vedic astrology, remedies, and guidance for your life journey.
        </p>
        <a href="/services">
          <button className="bg-[#6A0DAD] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-[#4A3F2F] transition">
            Explore Our Services
          </button>
        </a>
      </div>
      {/* Swiper Carousel */}
      <div className="w-full flex flex-col items-center">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          loop={true}
          coverflowEffect={{
            rotate: 40,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          modules={[EffectCoverflow, Autoplay]}
          className="w-full max-w-5xl h-[400px]"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i} className="flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-between p-8 w-[320px] h-[340px] mx-auto transition-all duration-700">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                  <Image src={card.image} alt={card.title} width={96} height={96} className="object-cover w-full h-full" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">{card.title}</h3>
                <p className="text-sm text-gray-600 text-center mb-2">{card.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 