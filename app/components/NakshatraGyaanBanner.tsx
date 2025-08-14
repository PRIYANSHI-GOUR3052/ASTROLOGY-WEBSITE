'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function NakshatraGyaanBanner() {
  return (
    <div className="w-full py-16 md:py-20" style={{ backgroundColor: '#FEFBF2' }}>
      <div className="w-full px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Section - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Top Badge */}
            <div className="inline-block">
              <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider bg-amber-100 px-4 py-2 rounded-full">
                Authentic Vedic Astrology
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Discover Your Cosmic
              <span className="block text-amber-600">Destiny with Nakshatra</span>
              <span className="block text-amber-600">Gyaan</span>
            </h2>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
              Embark on a transformative journey through the ancient wisdom of Vedic astrology. Our expert astrologers blend traditional knowledge with modern insights to illuminate your path to self-discovery, harmony, and spiritual growth.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Expert Vedic Astrologers</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">100% Authentic Remedies</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Personalized Consultations</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">24/7 Spiritual Guidance</span>
              </div>
            </div>
          </motion.div>

          {/* Right Section - Single Prominent Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden h-[500px]">
              <Image
                src="/images/course-2.jpg"
                alt="Vedic Astrology Consultation"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 