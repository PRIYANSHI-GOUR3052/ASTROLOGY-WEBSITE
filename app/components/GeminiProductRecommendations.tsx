'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Gemini', icon: Sparkles },
  { id: 'gemstones', label: 'Gemstone Therapy', icon: Gem },
  { id: 'crystals', label: 'Crystal Healing', icon: Star },
  { id: 'jewelry', label: 'Power Jewelry', icon: Shield },
  { id: 'wellness', label: 'Wellness & Balance', icon: Heart },
  { id: 'prosperity', label: 'Prosperity & Abundance', icon: Target },
  { id: 'relationships', label: 'Love & Relationships', icon: Users },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp }
];

const geminiRecommendations = {
  "Specially for Gemini": [
    {
      id: 'agate-communication-ring',
      name: 'Agate Communication Ring',
      image: '/images/course-1.jpg',
      price: '₹2,999',
      originalPrice: '₹5,999',
      category: 'Communication Stones',
      geminiBenefit: 'Enhances communication skills',
      slug: 'agate-communication-ring'
    },
    {
      id: 'citrine-intelligence-stone',
      name: 'Citrine Intelligence Stone',
      image: '/images/course-2.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Mental Energy',
      geminiBenefit: 'Boosts mental clarity and creativity',
      slug: 'citrine-intelligence-stone'
    },
    {
      id: 'pearl-harmony-pendant',
      name: 'Pearl Harmony Pendant',
      image: '/images/course-3.jpg',
      price: '₹3,599',
      originalPrice: '₹6,999',
      category: 'Emotional Balance',
      geminiBenefit: 'Promotes emotional wisdom',
      slug: 'pearl-harmony-pendant'
    },
    {
      id: 'gemini-adaptability-crystal',
      name: 'Gemini Adaptability Crystal',
      image: '/images/course-4.jpg',
      price: '₹1,599',
      originalPrice: '₹2,999',
      category: 'Adaptability Crystals',
      geminiBenefit: 'Enhances flexibility and learning',
      slug: 'gemini-adaptability-crystal'
    },
    {
      id: 'yellow-sapphire-wisdom',
      name: 'Yellow Sapphire Wisdom',
      image: '/images/course-5.jpg',
      price: '₹4,299',
      originalPrice: '₹7,999',
      category: 'Wisdom Stones',
      geminiBenefit: 'Amplifies intellectual growth',
      slug: 'yellow-sapphire-wisdom'
    },
    {
      id: 'aquamarine-expression-stone',
      name: 'Aquamarine Expression Stone',
      image: '/images/course-6.jpg',
      price: '₹2,799',
      originalPrice: '₹4,999',
      category: 'Expression Crystals',
      geminiBenefit: 'Enhances self-expression and confidence',
      slug: 'aquamarine-expression-stone'
    },
    {
      id: 'tiger-eye-focus-crystal',
      name: 'Tiger Eye Focus Crystal',
      image: '/images/course-7.jpg',
      price: '₹1,299',
      originalPrice: '₹2,599',
      category: 'Focus Crystals',
      geminiBenefit: 'Improves concentration and determination',
      slug: 'tiger-eye-focus-crystal'
    },
    {
      id: 'blue-lace-agate-calm',
      name: 'Blue Lace Agate Calm',
      image: '/images/course-8.jpg',
      price: '₹1,999',
      originalPrice: '₹3,499',
      category: 'Calming Stones',
      geminiBenefit: 'Reduces anxiety and promotes peace',
      slug: 'blue-lace-agate-calm'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Agate Collection', benefit: 'Communication & Clarity', image: '/images/course-1.jpg' },
    { name: 'Citrine Set', benefit: 'Mental Energy & Creativity', image: '/images/course-2.jpg' },
    { name: 'Pearl Essence', benefit: 'Emotional Wisdom', image: '/images/course-3.jpg' },
    { name: 'Yellow Sapphire', benefit: 'Intellectual Growth', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Adaptability Crystals', benefit: 'Flexibility & Learning', image: '/images/course-5.jpg' },
    { name: 'Expression Stones', benefit: 'Self-Expression', image: '/images/course-6.jpg' },
    { name: 'Focus Crystals', benefit: 'Concentration & Focus', image: '/images/course-7.jpg' },
    { name: 'Calming Stones', benefit: 'Peace & Tranquility', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Mercury Rings', benefit: 'Communication & Intellect', image: '/images/course-1.jpg' },
    { name: 'Adaptability Bracelets', benefit: 'Flexibility & Growth', image: '/images/course-2.jpg' },
    { name: 'Wisdom Necklaces', benefit: 'Intellectual Enhancement', image: '/images/course-3.jpg' },
    { name: 'Expression Pendants', benefit: 'Self-Expression & Confidence', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Mental Wellness', benefit: 'Cognitive Health', image: '/images/course-5.jpg' },
    { name: 'Emotional Balance', benefit: 'Inner Harmony', image: '/images/course-6.jpg' },
    { name: 'Communication Skills', benefit: 'Expression & Clarity', image: '/images/course-7.jpg' },
    { name: 'Social Confidence', benefit: 'Interpersonal Skills', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Intellectual Wealth', benefit: 'Knowledge & Skills', image: '/images/course-1.jpg' },
    { name: 'Communication Success', benefit: 'Career Advancement', image: '/images/course-2.jpg' },
    { name: 'Learning Opportunities', benefit: 'Personal Development', image: '/images/course-3.jpg' },
    { name: 'Social Prosperity', benefit: 'Networking Success', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Intellectual Connection', benefit: 'Mental Bonding', image: '/images/course-5.jpg' },
    { name: 'Communication Harmony', benefit: 'Clear Expression', image: '/images/course-6.jpg' },
    { name: 'Social Charm', benefit: 'Interpersonal Skills', image: '/images/course-7.jpg' },
    { name: 'Emotional Intelligence', benefit: 'Understanding Others', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Learning Enhancement', benefit: 'Knowledge Acquisition', image: '/images/course-1.jpg' },
    { name: 'Communication Mastery', benefit: 'Expression Skills', image: '/images/course-2.jpg' },
    { name: 'Focus Development', benefit: 'Concentration Skills', image: '/images/course-3.jpg' },
    { name: 'Adaptability Training', benefit: 'Flexibility Skills', image: '/images/course-4.jpg' }
  ]
};

export default function GeminiProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-black">Gemini Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-lg sm:text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed px-4">
          Discover crystals and gemstones specially curated for Gemini&apos;s airy nature, Mercury influence, and love for communication and learning.
        </p>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-serif font-semibold transition-all duration-300 text-sm sm:text-base ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-black shadow-lg'
                  : 'bg-white text-black hover:bg-amber-50 shadow-md hover:shadow-lg'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="w-5 h-5" />
              {category.label}
            </motion.button>
          );
        })}
      </div>

      {/* SPECIALLY FOR GEMINI SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {geminiRecommendations["Specially for Gemini"].map((product, index) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative h-48 sm:h-64 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              {/* PRODUCT INFO */}
              <div className="p-3 sm:p-6 flex flex-col h-full">
                <h3 className="text-base sm:text-xl font-serif font-bold text-black mb-1 sm:mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <span className="text-lg sm:text-2xl font-bold text-black">{product.price}</span>
                  <span className="text-xs sm:text-sm text-slate-400 line-through">{product.originalPrice}</span>
                </div>
                <p className="text-xs sm:text-base text-slate-700 font-medium mb-1 sm:mb-2 font-serif leading-relaxed line-clamp-2">{product.geminiBenefit}</p>
                <button
                  className="w-full mt-auto bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 text-black font-serif font-bold py-1.5 sm:py-3 rounded-xl shadow hover:from-orange-100 hover:to-amber-200 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-base group-hover:scale-[1.02]"
                  tabIndex={-1}
                  type="button"
                >
                  <Sparkles className="w-3 h-3 sm:w-5 sm:h-5" />
                  Claim Your Power
                </button>
                <span className="block mt-1 sm:mt-2 text-amber-700 font-semibold underline text-xs sm:text-sm group-hover:text-amber-900 transition-colors">Read More</span>
              </div>
            </Link>
          ))}
        </motion.div>
      )}

      {/* OTHER CATEGORIES */}
      {activeCategory !== 'specially' && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {(geminiRecommendations[
            categories.find(c => c.id === activeCategory)?.label as keyof typeof geminiRecommendations
          ] ?? []).map((category, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white via-amber-50/30 to-orange-50/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.03, y: -12 }}
            >
              {/* CATEGORY IMAGE */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* CATEGORY INFO */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-black mb-2">{category.name}</h3>
                {'benefit' in category && (
                  <p className="text-slate-700 font-medium mb-4 font-serif leading-relaxed">{category.benefit}</p>
                )}
                <button className="w-full bg-gradient-to-r from-amber-100 to-orange-100 text-black font-serif font-bold py-3 rounded-xl shadow hover:from-orange-200 hover:to-amber-200 transition-all duration-300 flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Explore Collection
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* DETAILED EXPLANATION */}
      <motion.div
        className="bg-gradient-to-br from-amber-50/80 to-orange-100/60 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Gemini?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto">
          Gemini, ruled by Mercury, naturally gravitates toward communication, learning, and intellectual pursuits. These carefully selected crystals and gemstones align with your airy nature, 
          enhancing your natural strengths while supporting areas of growth. From agate that amplifies your communication skills to citrine that boosts your mental energy, 
          each piece is designed to work harmoniously with your Mercury-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 