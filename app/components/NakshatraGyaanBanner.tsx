'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function NakshatraGyaanBanner() {
  return (
    <div className="w-full py-16 md:py-20" style={{ backgroundColor: '#FEFBF2' }}>
      <div className="w-full px-4 md:px-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-8">
          {/* Full-width Image with rounded corners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden h-[300px] w-full">
              <Image
                src="/images/course-2.jpg"
                alt="Vedic Astrology Consultation"
                fill
                className="object-cover"
                sizes="100vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-center space-y-6"
          >
            {/* Badge */}
            <div className="flex justify-center">
              <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider bg-amber-100 px-4 py-2 rounded-full">
                Authentic Vedic Astrology
              </span>
            </div>

            {/* Main Heading - Center Aligned */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Discover Your Cosmic
              <span className="block text-amber-600">Destiny with Nakshatra Gyaan</span>
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              Embark on a transformative journey through the ancient wisdom of Vedic astrology. Our expert astrologers blend traditional knowledge with modern insights.
            </p>

            {/* Features with Checkmarks */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">Expert Vedic Astrologers</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">Personalized Consultations</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">100% Authentic Remedies</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-gray-700 font-medium">24/7 Spiritual Guidance</span>
              </div>
            </div>

            {/* Call-to-Action Button */}
            <div className="pt-6">
              <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-full transition-colors duration-200 shadow-lg">
                Start Your Journey
              </button>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout - Original */}
        <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
          
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
                sizes="50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 