'use client';

// Type definitions for category data
type VirgoProduct = {
  id: string;
  name: string;
  image: string;
  price: string;
  originalPrice: string;
  category: string;
  virgoBenefit: string;
  slug: string;
};
type VirgoCategory = {
  name: string;
  benefit: string;
  image: string;
};

function hasBenefit(obj: VirgoProduct | VirgoCategory): obj is VirgoCategory {
  return (obj as VirgoCategory).benefit !== undefined;
}

function getCategoryLabelById(id: string): keyof typeof virgoRecommendations | undefined {
  return categories.find(c => c.id === id)?.label as keyof typeof virgoRecommendations | undefined;
}


import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Virgo', icon: Sparkles },
  { id: 'gemstones', label: 'Gemstone Therapy', icon: Gem },
  { id: 'crystals', label: 'Crystal Healing', icon: Star },
  { id: 'jewelry', label: 'Power Jewelry', icon: Shield },
  { id: 'wellness', label: 'Wellness & Balance', icon: Heart },
  { id: 'prosperity', label: 'Prosperity & Abundance', icon: Target },
  { id: 'relationships', label: 'Love & Relationships', icon: Users },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp }
];

const virgoRecommendations = {
  "Specially for Virgo": [
    {
      id: 'peridot-clarity-ring',
      name: 'Peridot Clarity Ring',
      image: '/images/course-1.jpg',
      price: '₹4,999',
      originalPrice: '₹9,999',
      category: 'Clarity Stones',
      virgoBenefit: 'Enhances mental clarity and focus',
      slug: 'peridot-clarity-ring'
    },
    {
      id: 'jade-harmony-stone',
      name: 'Jade Harmony Stone',
      image: '/images/course-2.jpg',
      price: '₹3,299',
      originalPrice: '₹6,599',
      category: 'Harmony Crystals',
      virgoBenefit: 'Promotes balance and wisdom',
      slug: 'jade-harmony-stone'
    },
    {
      id: 'moss-agate-growth-crystal',
      name: 'Moss Agate Growth Crystal',
      image: '/images/course-3.jpg',
      price: '₹2,799',
      originalPrice: '₹5,599',
      category: 'Growth Crystals',
      virgoBenefit: 'Supports personal growth and healing',
      slug: 'moss-agate-growth-crystal'
    },
    {
      id: 'virgo-precision-crystal',
      name: 'Virgo Precision Crystal',
      image: '/images/course-4.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Precision Crystals',
      virgoBenefit: 'Enhances attention to detail',
      slug: 'virgo-precision-crystal'
    },
    {
      id: 'green-aventurine-wisdom',
      name: 'Green Aventurine Wisdom',
      image: '/images/course-5.jpg',
      price: '₹1,599',
      originalPrice: '₹2,999',
      category: 'Wisdom Stones',
      virgoBenefit: 'Attracts wisdom and opportunity',
      slug: 'green-aventurine-wisdom'
    },
    {
      id: 'amazonite-communication',
      name: 'Amazonite Communication',
      image: '/images/course-6.jpg',
      price: '₹2,199',
      originalPrice: '₹4,399',
      category: 'Communication Stones',
      virgoBenefit: 'Improves communication skills',
      slug: 'amazonite-communication'
    },
    {
      id: 'sodalite-logic-stone',
      name: 'Sodalite Logic Stone',
      image: '/images/course-7.jpg',
      price: '₹1,799',
      originalPrice: '₹3,599',
      category: 'Logic Crystals',
      virgoBenefit: 'Enhances logical thinking',
      slug: 'sodalite-logic-stone'
    },
    {
      id: 'fluorite-organization-crystal',
      name: 'Fluorite Organization Crystal',
      image: '/images/course-8.jpg',
      price: '₹2,499',
      originalPrice: '₹4,999',
      category: 'Organization Crystals',
      virgoBenefit: 'Improves organization skills',
      slug: 'fluorite-organization-crystal'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Peridot Collection', benefit: 'Clarity & Focus', image: '/images/course-1.jpg' },
    { name: 'Jade Set', benefit: 'Harmony & Balance', image: '/images/course-2.jpg' },
    { name: 'Moss Agate Essence', benefit: 'Growth & Healing', image: '/images/course-3.jpg' },
    { name: 'Green Aventurine Success', benefit: 'Wisdom & Opportunity', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Precision Crystals', benefit: 'Attention to Detail', image: '/images/course-5.jpg' },
    { name: 'Communication Stones', benefit: 'Clear Expression', image: '/images/course-6.jpg' },
    { name: 'Logic Crystals', benefit: 'Analytical Thinking', image: '/images/course-7.jpg' },
    { name: 'Organization Stones', benefit: 'Systematic Approach', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Mercury Rings', benefit: 'Communication & Intellect', image: '/images/course-1.jpg' },
    { name: 'Precision Bracelets', benefit: 'Attention to Detail', image: '/images/course-2.jpg' },
    { name: 'Wisdom Necklaces', benefit: 'Practical Knowledge', image: '/images/course-3.jpg' },
    { name: 'Service Pendants', benefit: 'Helping Others', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Mental Wellness', benefit: 'Clarity & Focus', image: '/images/course-5.jpg' },
    { name: 'Physical Health', benefit: 'Practical Care', image: '/images/course-6.jpg' },
    { name: 'Emotional Balance', benefit: 'Stability & Harmony', image: '/images/course-7.jpg' },
    { name: 'Spiritual Growth', benefit: 'Inner Wisdom', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Practical Success', benefit: 'Career Advancement', image: '/images/course-1.jpg' },
    { name: 'Skill Development', benefit: 'Expertise Building', image: '/images/course-2.jpg' },
    { name: 'Service Opportunities', benefit: 'Helping Others', image: '/images/course-3.jpg' },
    { name: 'Stable Growth', benefit: 'Steady Progress', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Practical Love', benefit: 'Reliable Partnership', image: '/images/course-5.jpg' },
    { name: 'Clear Communication', benefit: 'Honest Expression', image: '/images/course-6.jpg' },
    { name: 'Supportive Care', benefit: 'Nurturing Bonds', image: '/images/course-7.jpg' },
    { name: 'Loyal Commitment', benefit: 'Faithful Relationships', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Analytical Skills', benefit: 'Problem Solving', image: '/images/course-1.jpg' },
    { name: 'Attention to Detail', benefit: 'Precision Mastery', image: '/images/course-2.jpg' },
    { name: 'Practical Wisdom', benefit: 'Realistic Approach', image: '/images/course-3.jpg' },
    { name: 'Service Mindset', benefit: 'Helping Others', image: '/images/course-4.jpg' }
  ]
};

export default function VirgoProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-black">Virgo Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed">
          Discover crystals and gemstones specially curated for Virgo&apos;s analytical nature, Mercury influence, and practical approach to life.
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

      {/* SPECIALLY FOR VIRGO SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {virgoRecommendations["Specially for Virgo"].map((product, index) => (
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
                <p className="text-slate-700 font-medium mb-2 font-serif leading-relaxed line-clamp-2">{product.virgoBenefit}</p>
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
          {(virgoRecommendations[getCategoryLabelById(activeCategory) ?? "Gemstone Therapy"] ?? []).map((category, index) => (
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
                {hasBenefit(category) && (
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
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Virgo?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto">
          Virgo, ruled by Mercury, naturally seeks precision, clarity, and practical solutions. These carefully selected crystals and gemstones align with your analytical nature, 
          enhancing your natural strengths while supporting areas of growth. From peridot that sharpens your mental clarity to jade that promotes balance and wisdom, 
          each piece is designed to work harmoniously with your Mercury-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 