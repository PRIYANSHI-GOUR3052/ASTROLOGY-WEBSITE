'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Scorpio', icon: Sparkles },
  { id: 'gemstones', label: 'Gemstone Therapy', icon: Gem },
  { id: 'crystals', label: 'Crystal Healing', icon: Star },
  { id: 'jewelry', label: 'Power Jewelry', icon: Shield },
  { id: 'wellness', label: 'Wellness & Balance', icon: Heart },
  { id: 'prosperity', label: 'Prosperity & Abundance', icon: Target },
  { id: 'relationships', label: 'Love & Relationships', icon: Users },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp }
];

const scorpioRecommendations = {
  "Specially for Scorpio": [
    {
      id: 'obsidian-transformation-stone',
      name: 'Obsidian Transformation Stone',
      image: '/images/course-1.jpg',
      price: '₹3,999',
      originalPrice: '₹7,999',
      category: 'Transformation Stones',
      scorpioBenefit: 'Aids in deep transformation and protection',
      slug: 'obsidian-transformation-stone'
    },
    {
      id: 'garnet-passion-crystal',
      name: 'Garnet Passion Crystal',
      image: '/images/course-2.jpg',
      price: '₹2,799',
      originalPrice: '₹5,599',
      category: 'Passion Crystals',
      scorpioBenefit: 'Boosts passion and determination',
      slug: 'garnet-passion-crystal'
    },
    {
      id: 'malachite-healing-stone',
      name: 'Malachite Healing Stone',
      image: '/images/course-3.jpg',
      price: '₹3,299',
      originalPrice: '₹6,599',
      category: 'Healing Stones',
      scorpioBenefit: 'Promotes emotional healing and growth',
      slug: 'malachite-healing-stone'
    },
    {
      id: 'black-tourmaline-protection',
      name: 'Black Tourmaline Protection',
      image: '/images/course-4.jpg',
      price: '₹2,199',
      originalPrice: '₹4,399',
      category: 'Protection Crystals',
      scorpioBenefit: 'Shields against negativity',
      slug: 'black-tourmaline-protection'
    },
    {
      id: 'topaz-renewal-stone',
      name: 'Topaz Renewal Stone',
      image: '/images/course-5.jpg',
      price: '₹2,999',
      originalPrice: '₹5,999',
      category: 'Renewal Stones',
      scorpioBenefit: 'Supports renewal and clarity',
      slug: 'topaz-renewal-stone'
    },
    {
      id: 'scorpio-intuition-crystal',
      name: 'Scorpio Intuition Crystal',
      image: '/images/course-6.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Intuition Crystals',
      scorpioBenefit: 'Enhances intuition and insight',
      slug: 'scorpio-intuition-crystal'
    },
    {
      id: 'ruby-power-ring',
      name: 'Ruby Power Ring',
      image: '/images/course-7.jpg',
      price: '₹4,299',
      originalPrice: '₹8,599',
      category: 'Power Stones',
      scorpioBenefit: 'Amplifies personal power',
      slug: 'ruby-power-ring'
    },
    {
      id: 'amethyst-calm-stone',
      name: 'Amethyst Calm Stone',
      image: '/images/course-8.jpg',
      price: '₹2,499',
      originalPrice: '₹4,999',
      category: 'Calm Stones',
      scorpioBenefit: 'Brings calm and clarity',
      slug: 'amethyst-calm-stone'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Obsidian Collection', benefit: 'Transformation & Protection', image: '/images/course-1.jpg' },
    { name: 'Garnet Set', benefit: 'Passion & Determination', image: '/images/course-2.jpg' },
    { name: 'Malachite Essence', benefit: 'Healing & Growth', image: '/images/course-3.jpg' },
    { name: 'Topaz Success', benefit: 'Renewal & Clarity', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Protection Crystals', benefit: 'Shielding Negativity', image: '/images/course-5.jpg' },
    { name: 'Intuition Stones', benefit: 'Insight & Wisdom', image: '/images/course-6.jpg' },
    { name: 'Power Crystals', benefit: 'Personal Power', image: '/images/course-7.jpg' },
    { name: 'Calm Stones', benefit: 'Peace & Clarity', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Pluto Rings', benefit: 'Transformation & Power', image: '/images/course-1.jpg' },
    { name: 'Passion Bracelets', benefit: 'Determination & Drive', image: '/images/course-2.jpg' },
    { name: 'Healing Necklaces', benefit: 'Emotional Growth', image: '/images/course-3.jpg' },
    { name: 'Protection Pendants', benefit: 'Shielding Energy', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Emotional Wellness', benefit: 'Healing & Growth', image: '/images/course-5.jpg' },
    { name: 'Mental Clarity', benefit: 'Insight & Focus', image: '/images/course-6.jpg' },
    { name: 'Spiritual Growth', benefit: 'Transformation', image: '/images/course-7.jpg' },
    { name: 'Physical Balance', benefit: 'Stability & Strength', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Transformation Success', benefit: 'Career Growth', image: '/images/course-1.jpg' },
    { name: 'Power Opportunities', benefit: 'Personal Power', image: '/images/course-2.jpg' },
    { name: 'Healing Wealth', benefit: 'Abundance & Growth', image: '/images/course-3.jpg' },
    { name: 'Renewal Flow', benefit: 'New Beginnings', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Passionate Love', benefit: 'Deep Connection', image: '/images/course-5.jpg' },
    { name: 'Intuitive Bonds', benefit: 'Insightful Relationships', image: '/images/course-6.jpg' },
    { name: 'Healing Love', benefit: 'Emotional Growth', image: '/images/course-7.jpg' },
    { name: 'Loyal Commitment', benefit: 'Faithful Relationships', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Transformation Skills', benefit: 'Personal Change', image: '/images/course-1.jpg' },
    { name: 'Intuitive Mastery', benefit: 'Insight & Wisdom', image: '/images/course-2.jpg' },
    { name: 'Healing Power', benefit: 'Emotional Strength', image: '/images/course-3.jpg' },
    { name: 'Calm Mindset', benefit: 'Peace & Clarity', image: '/images/course-4.jpg' }
  ]
};

export default function ScorpioProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-black">Scorpio Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed">
          Discover crystals and gemstones specially curated for Scorpio&apos;s transformative nature, Pluto influence, and emotional depth.
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

      {/* SPECIALLY FOR SCORPIO SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {scorpioRecommendations["Specially for Scorpio"].map((product, index) => (
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
                <p className="text-slate-700 font-medium mb-2 font-serif leading-relaxed line-clamp-2">{product.scorpioBenefit}</p>
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
          {scorpioRecommendations[categories.find(c => c.id === activeCategory)?.label || ""]?.map((category, index) => (
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
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Scorpio?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto">
          Scorpio, ruled by Pluto (and Mars), naturally seeks transformation, depth, and emotional healing. These carefully selected crystals and gemstones align with your powerful nature, 
          enhancing your natural strengths while supporting areas of growth. From obsidian that aids in transformation to garnet that boosts passion and determination, 
          each piece is designed to work harmoniously with your Pluto-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 