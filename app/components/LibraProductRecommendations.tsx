'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Libra', icon: Sparkles },
  { id: 'gemstones', label: 'Gemstone Therapy', icon: Gem },
  { id: 'crystals', label: 'Crystal Healing', icon: Star },
  { id: 'jewelry', label: 'Power Jewelry', icon: Shield },
  { id: 'wellness', label: 'Wellness & Balance', icon: Heart },
  { id: 'prosperity', label: 'Prosperity & Abundance', icon: Target },
  { id: 'relationships', label: 'Love & Relationships', icon: Users },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp }
];

type RecommendationItem = {
  id?: string;
  name: string;
  image: string;
  price?: string;
  originalPrice?: string;
  category?: string;
  libraBenefit?: string;
  slug?: string;
  benefit?: string;
};

type LibraRecommendations = {
  [key: string]: RecommendationItem[];
};

const libraRecommendations: LibraRecommendations = {
  "Specially for Libra": [
    {
      id: 'rose-quartz-harmony-ring',
      name: 'Rose Quartz Harmony Ring',
      image: '/images/course-1.jpg',
      price: '₹3,999',
      originalPrice: '₹7,999',
      category: 'Harmony Stones',
      libraBenefit: 'Enhances love and harmony',
      slug: 'rose-quartz-harmony-ring'
    },
    {
      id: 'opal-balance-stone',
      name: 'Opal Balance Stone',
      image: '/images/course-2.jpg',
      price: '₹4,299',
      originalPrice: '₹8,599',
      category: 'Balance Crystals',
      libraBenefit: 'Promotes balance and beauty',
      slug: 'opal-balance-stone'
    },
    {
      id: 'lapis-lazuli-wisdom-crystal',
      name: 'Lapis Lazuli Wisdom Crystal',
      image: '/images/course-3.jpg',
      price: '₹3,599',
      originalPrice: '₹6,999',
      category: 'Wisdom Crystals',
      libraBenefit: 'Amplifies wisdom and communication',
      slug: 'lapis-lazuli-wisdom-crystal'
    },
    {
      id: 'libra-diplomacy-crystal',
      name: 'Libra Diplomacy Crystal',
      image: '/images/course-4.jpg',
      price: '₹2,199',
      originalPrice: '₹4,399',
      category: 'Diplomacy Crystals',
      libraBenefit: 'Enhances diplomatic skills',
      slug: 'libra-diplomacy-crystal'
    },
    {
      id: 'pink-tourmaline-love',
      name: 'Pink Tourmaline Love',
      image: '/images/course-5.jpg',
      price: '₹2,799',
      originalPrice: '₹5,599',
      category: 'Love Stones',
      libraBenefit: 'Attracts love and romance',
      slug: 'pink-tourmaline-love'
    },
    {
      id: 'aquamarine-communication',
      name: 'Aquamarine Communication',
      image: '/images/course-6.jpg',
      price: '₹3,199',
      originalPrice: '₹6,399',
      category: 'Communication Stones',
      libraBenefit: 'Improves communication skills',
      slug: 'aquamarine-communication'
    },
    {
      id: 'moonstone-intuition',
      name: 'Moonstone Intuition',
      image: '/images/course-7.jpg',
      price: '₹2,499',
      originalPrice: '₹4,999',
      category: 'Intuition Crystals',
      libraBenefit: 'Enhances intuitive decision-making',
      slug: 'moonstone-intuition'
    },
    {
      id: 'clear-quartz-clarity',
      name: 'Clear Quartz Clarity',
      image: '/images/course-8.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Clarity Crystals',
      libraBenefit: 'Brings mental clarity and focus',
      slug: 'clear-quartz-clarity'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Rose Quartz Collection', benefit: 'Love & Harmony', image: '/images/course-1.jpg' },
    { name: 'Opal Set', benefit: 'Balance & Beauty', image: '/images/course-2.jpg' },
    { name: 'Lapis Lazuli Essence', benefit: 'Wisdom & Communication', image: '/images/course-3.jpg' },
    { name: 'Pink Tourmaline Success', benefit: 'Love & Romance', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Diplomacy Crystals', benefit: 'Conflict Resolution', image: '/images/course-5.jpg' },
    { name: 'Communication Stones', benefit: 'Clear Expression', image: '/images/course-6.jpg' },
    { name: 'Intuition Crystals', benefit: 'Inner Wisdom', image: '/images/course-7.jpg' },
    { name: 'Clarity Stones', benefit: 'Mental Focus', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Venus Rings', benefit: 'Love & Beauty', image: '/images/course-1.jpg' },
    { name: 'Harmony Bracelets', benefit: 'Balance & Peace', image: '/images/course-2.jpg' },
    { name: 'Wisdom Necklaces', benefit: 'Intellectual Growth', image: '/images/course-3.jpg' },
    { name: 'Diplomacy Pendants', benefit: 'Conflict Resolution', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Emotional Wellness', benefit: 'Inner Harmony', image: '/images/course-5.jpg' },
    { name: 'Mental Balance', benefit: 'Clear Thinking', image: '/images/course-6.jpg' },
    { name: 'Spiritual Growth', benefit: 'Higher Wisdom', image: '/images/course-7.jpg' },
    { name: 'Physical Harmony', benefit: 'Body Balance', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Harmonious Success', benefit: 'Balanced Achievement', image: '/images/course-1.jpg' },
    { name: 'Fair Opportunities', benefit: 'Just Rewards', image: '/images/course-2.jpg' },
    { name: 'Beauty & Wealth', benefit: 'Aesthetic Prosperity', image: '/images/course-3.jpg' },
    { name: 'Partnership Success', benefit: 'Collaborative Growth', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Romantic Harmony', benefit: 'Balanced Love', image: '/images/course-5.jpg' },
    { name: 'Fair Communication', benefit: 'Honest Dialogue', image: '/images/course-6.jpg' },
    { name: 'Partnership Balance', benefit: 'Equal Relationships', image: '/images/course-7.jpg' },
    { name: 'Loving Diplomacy', benefit: 'Peaceful Bonds', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Decision Making', benefit: 'Confident Choices', image: '/images/course-1.jpg' },
    { name: 'Diplomatic Skills', benefit: 'Conflict Resolution', image: '/images/course-2.jpg' },
    { name: 'Aesthetic Development', benefit: 'Beauty Appreciation', image: '/images/course-3.jpg' },
    { name: 'Fair Judgment', benefit: 'Balanced Perspective', image: '/images/course-4.jpg' }
  ]
};

export default function LibraProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-black">Libra Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed">
          Discover crystals and gemstones specially curated for Libra&apos;s harmonious nature, Venus influence, and desire for balance and beauty.
        </p>
      </div>

      {/* CATEGORY NAVIGATION */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-serif font-semibold transition-all duration-300 ${
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

      {/* SPECIALLY FOR LIBRA SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {libraRecommendations["Specially for Libra"].map((product, index) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              {/* PRODUCT INFO */}
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-serif font-bold text-black mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-black">{product.price}</span>
                  <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                </div>
                <p className="text-slate-700 font-medium mb-2 font-serif leading-relaxed line-clamp-2">{product.libraBenefit}</p>
                <button
                  className="w-full mt-auto bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 text-black font-serif font-bold py-3 rounded-xl shadow hover:from-orange-100 hover:to-amber-200 transition-all duration-300 flex items-center justify-center gap-2 text-base group-hover:scale-[1.02]"
                  tabIndex={-1}
                  type="button"
                >
                  <Sparkles className="w-5 h-5" />
                  Claim Your Power
                </button>
                <span className="block mt-2 text-amber-700 font-semibold underline text-sm group-hover:text-amber-900 transition-colors">Read More</span>
              </div>
            </Link>
          ))}
        </motion.div>
      )}

      {/* OTHER CATEGORIES */}
      {activeCategory !== 'specially' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {(libraRecommendations[categories.find(c => c.id === activeCategory)?.label || ""] || []).map((category, index) => (
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
                <p className="text-slate-700 font-medium mb-4 font-serif leading-relaxed">{category.benefit}</p>
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
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Libra?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto">
          Libra, ruled by Venus, naturally seeks harmony, balance, and beauty. These carefully selected crystals and gemstones align with your diplomatic nature, 
          enhancing your natural strengths while supporting areas of growth. From rose quartz that promotes love and harmony to opal that brings balance and beauty, 
          each piece is designed to work harmoniously with your Venus-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 