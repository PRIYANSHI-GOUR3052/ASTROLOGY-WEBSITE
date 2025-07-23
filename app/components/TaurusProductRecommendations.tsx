'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Taurus', icon: Sparkles },
  { id: 'gemstones', label: 'Gemstone Therapy', icon: Gem },
  { id: 'crystals', label: 'Crystal Healing', icon: Star },
  { id: 'jewelry', label: 'Power Jewelry', icon: Shield },
  { id: 'wellness', label: 'Wellness & Balance', icon: Heart },
  { id: 'prosperity', label: 'Prosperity & Abundance', icon: Target },
  { id: 'relationships', label: 'Love & Relationships', icon: Users },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp }
];

const taurusRecommendations = {
  "Specially for Taurus": [
    {
      id: 'emerald-harmony-ring',
      name: 'Emerald Harmony Ring',
      image: '/images/course-1.jpg',
      price: '₹3,999',
      originalPrice: '₹7,999',
      category: 'Venus Gemstones',
      taurusBenefit: 'Enhances love and prosperity',
      slug: 'emerald-harmony-ring'
    },
    {
      id: 'rose-quartz-bracelet',
      name: 'Rose Quartz Bracelet',
      image: '/images/course-2.jpg',
      price: '₹2,299',
      originalPrice: '₹4,599',
      category: 'Love Crystals',
      taurusBenefit: 'Promotes self-love and harmony',
      slug: 'rose-quartz-bracelet'
    },
    {
      id: 'diamond-clarity-stone',
      name: 'Diamond Clarity Stone',
      image: '/images/course-3.jpg',
      price: '₹5,999',
      originalPrice: '₹11,999',
      category: 'Clarity Stones',
      taurusBenefit: 'Amplifies inner strength',
      slug: 'diamond-clarity-stone'
    },
    {
      id: 'taurus-stability-crystal',
      name: 'Taurus Stability Crystal',
      image: '/images/course-4.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Stability Crystals',
      taurusBenefit: 'Grounds and stabilizes energy',
      slug: 'taurus-stability-crystal'
    },
    {
      id: 'green-aventurine-prosperity',
      name: 'Green Aventurine Prosperity',
      image: '/images/course-5.jpg',
      price: '₹1,599',
      originalPrice: '₹2,999',
      category: 'Prosperity Stones',
      taurusBenefit: 'Attracts wealth and abundance',
      slug: 'green-aventurine-prosperity'
    },
    {
      id: 'moonstone-emotional-balance',
      name: 'Moonstone Emotional Balance',
      image: '/images/course-6.jpg',
      price: '₹2,799',
      originalPrice: '₹4,999',
      category: 'Emotional Healing',
      taurusBenefit: 'Balances emotions and intuition',
      slug: 'moonstone-emotional-balance'
    },
    {
      id: 'carnelian-motivation-stone',
      name: 'Carnelian Motivation Stone',
      image: '/images/course-7.jpg',
      price: '₹1,299',
      originalPrice: '₹2,599',
      category: 'Motivation Crystals',
      taurusBenefit: 'Boosts determination and drive',
      slug: 'carnelian-motivation-stone'
    },
    {
      id: 'lapis-lazuli-wisdom-ring',
      name: 'Lapis Lazuli Wisdom Ring',
      image: '/images/course-8.jpg',
      price: '₹3,299',
      originalPrice: '₹5,999',
      category: 'Wisdom Stones',
      taurusBenefit: 'Enhances wisdom and communication',
      slug: 'lapis-lazuli-wisdom-ring'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Emerald Collection', benefit: 'Love & Prosperity', image: '/images/course-1.jpg' },
    { name: 'Rose Quartz Set', benefit: 'Emotional Healing', image: '/images/course-2.jpg' },
    { name: 'Diamond Essence', benefit: 'Clarity & Strength', image: '/images/course-3.jpg' },
    { name: 'Green Aventurine', benefit: 'Abundance & Luck', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Stability Crystals', benefit: 'Grounding Energy', image: '/images/course-5.jpg' },
    { name: 'Balance Stones', benefit: 'Emotional Harmony', image: '/images/course-6.jpg' },
    { name: 'Motivation Crystals', benefit: 'Drive & Focus', image: '/images/course-7.jpg' },
    { name: 'Wisdom Stones', benefit: 'Intellectual Growth', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Venus Rings', benefit: 'Love & Beauty', image: '/images/course-1.jpg' },
    { name: 'Stability Bracelets', benefit: 'Grounding & Protection', image: '/images/course-2.jpg' },
    { name: 'Prosperity Necklaces', benefit: 'Wealth & Success', image: '/images/course-3.jpg' },
    { name: 'Harmony Pendants', benefit: 'Balance & Peace', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Emotional Wellness', benefit: 'Inner Peace', image: '/images/course-5.jpg' },
    { name: 'Physical Vitality', benefit: 'Health & Energy', image: '/images/course-6.jpg' },
    { name: 'Mental Clarity', benefit: 'Focus & Concentration', image: '/images/course-7.jpg' },
    { name: 'Spiritual Growth', benefit: 'Higher Consciousness', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Wealth Attraction', benefit: 'Financial Success', image: '/images/course-1.jpg' },
    { name: 'Business Growth', benefit: 'Career Advancement', image: '/images/course-2.jpg' },
    { name: 'Investment Luck', benefit: 'Smart Decisions', image: '/images/course-3.jpg' },
    { name: 'Abundance Flow', benefit: 'Continuous Prosperity', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Romantic Harmony', benefit: 'Love & Passion', image: '/images/course-5.jpg' },
    { name: 'Self-Love Journey', benefit: 'Inner Confidence', image: '/images/course-6.jpg' },
    { name: 'Relationship Healing', benefit: 'Emotional Bonds', image: '/images/course-7.jpg' },
    { name: 'Family Harmony', benefit: 'Domestic Peace', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Patience Development', benefit: 'Inner Calm', image: '/images/course-1.jpg' },
    { name: 'Determination Boost', benefit: 'Goal Achievement', image: '/images/course-2.jpg' },
    { name: 'Flexibility Training', benefit: 'Adaptability', image: '/images/course-3.jpg' },
    { name: 'Wisdom Enhancement', benefit: 'Life Lessons', image: '/images/course-4.jpg' }
  ]
};

export default function TaurusProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-black">Taurus Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 mx-auto rounded-full"></div>
        <p className="text-lg sm:text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed px-4">
          Discover crystals and gemstones specially curated for Taurus&apos;s earthy nature, Venus influence, and desire for stability and beauty.
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
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-black shadow-lg'
                  : 'bg-white text-black hover:bg-green-50 shadow-md hover:shadow-lg'
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

      {/* SPECIALLY FOR TAURUS SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {taurusRecommendations["Specially for Taurus"].map((product, index) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-200"
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
                <p className="text-xs sm:text-base text-slate-700 font-medium mb-1 sm:mb-2 font-serif leading-relaxed line-clamp-2">{product.taurusBenefit}</p>
                <button
                  className="w-full mt-auto bg-gradient-to-r from-green-50 via-emerald-50 to-green-100 text-black font-serif font-bold py-1.5 sm:py-3 rounded-xl shadow hover:from-emerald-100 hover:to-green-200 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-base group-hover:scale-[1.02]"
                  tabIndex={-1}
                  type="button"
                >
                  <Sparkles className="w-3 h-3 sm:w-5 sm:h-5" />
                  Claim Your Power
                </button>
                <span className="block mt-1 sm:mt-2 text-green-700 font-semibold underline text-xs sm:text-sm group-hover:text-green-900 transition-colors">Read More</span>
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
          {taurusRecommendations[categories.find(c => c.id === activeCategory)?.label || ""]?.map((category, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer"
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
                <p className="text-slate-700 font-medium mb-4 font-serif leading-relaxed">{category.benefit}</p>
                <button className="w-full bg-gradient-to-r from-green-100 to-emerald-100 text-black font-serif font-bold py-3 rounded-xl shadow hover:from-emerald-200 hover:to-green-200 transition-all duration-300 flex items-center justify-center gap-2">
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
        className="bg-gradient-to-br from-green-50/80 to-emerald-100/60 rounded-2xl p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Taurus?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto text-justify px-4 sm:px-0">
          Taurus, ruled by Venus, naturally gravitates toward beauty, stability, and material comfort. These carefully selected crystals and gemstones align with your earthy nature, 
          enhancing your natural strengths while supporting areas of growth. From emeralds that amplify your love nature to rose quartz that deepens your capacity for self-love, 
          each piece is designed to work harmoniously with your Venus-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 