'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Aquarius', icon: Sparkles },
  { id: 'gemstones', label: 'Gemstone Therapy', icon: Gem },
  { id: 'crystals', label: 'Crystal Healing', icon: Star },
  { id: 'jewelry', label: 'Power Jewelry', icon: Shield },
  { id: 'wellness', label: 'Wellness & Balance', icon: Heart },
  { id: 'prosperity', label: 'Prosperity & Abundance', icon: Target },
  { id: 'relationships', label: 'Love & Relationships', icon: Users },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp }
];

const aquariusRecommendations = {
  "Specially for Aquarius": [
    {
      id: 'amethyst-innovation-crystal',
      name: 'Amethyst Innovation Crystal',
      image: '/images/course-1.jpg',
      price: '₹3,999',
      originalPrice: '₹7,999',
      category: 'Innovation Crystals',
      aquariusBenefit: 'Enhances innovation and intuition',
      slug: 'amethyst-innovation-crystal'
    },
    {
      id: 'aquamarine-vision-stone',
      name: 'Aquamarine Vision Stone',
      image: '/images/course-2.jpg',
      price: '₹2,799',
      originalPrice: '₹5,599',
      category: 'Vision Stones',
      aquariusBenefit: 'Promotes vision and clarity',
      slug: 'aquamarine-vision-stone'
    },
    {
      id: 'clear-quartz-amplifier',
      name: 'Clear Quartz Amplifier',
      image: '/images/course-3.jpg',
      price: '₹3,299',
      originalPrice: '₹6,599',
      category: 'Amplifier Crystals',
      aquariusBenefit: 'Amplifies energy and clarity',
      slug: 'clear-quartz-amplifier'
    },
    {
      id: 'fluorite-intelligence-crystal',
      name: 'Fluorite Intelligence Crystal',
      image: '/images/course-4.jpg',
      price: '₹2,199',
      originalPrice: '₹4,399',
      category: 'Intelligence Crystals',
      aquariusBenefit: 'Boosts intelligence and focus',
      slug: 'fluorite-intelligence-crystal'
    },
    {
      id: 'labradorite-magic-stone',
      name: 'Labradorite Magic Stone',
      image: '/images/course-5.jpg',
      price: '₹2,999',
      originalPrice: '₹5,999',
      category: 'Magic Stones',
      aquariusBenefit: 'Enhances magic and intuition',
      slug: 'labradorite-magic-stone'
    },
    {
      id: 'aquarius-originality-crystal',
      name: 'Aquarius Originality Crystal',
      image: '/images/course-6.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Originality Crystals',
      aquariusBenefit: 'Boosts originality and creativity',
      slug: 'aquarius-originality-crystal'
    },
    {
      id: 'sodalite-logic-stone',
      name: 'Sodalite Logic Stone',
      image: '/images/course-7.jpg',
      price: '₹2,499',
      originalPrice: '₹4,999',
      category: 'Logic Stones',
      aquariusBenefit: 'Enhances logic and reasoning',
      slug: 'sodalite-logic-stone'
    },
    {
      id: 'celestite-communication-crystal',
      name: 'Celestite Communication Crystal',
      image: '/images/course-8.jpg',
      price: '₹1,799',
      originalPrice: '₹3,599',
      category: 'Communication Crystals',
      aquariusBenefit: 'Improves communication skills',
      slug: 'celestite-communication-crystal'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Amethyst Collection', benefit: 'Innovation & Intuition', image: '/images/course-1.jpg' },
    { name: 'Aquamarine Set', benefit: 'Vision & Clarity', image: '/images/course-2.jpg' },
    { name: 'Clear Quartz Essence', benefit: 'Amplification & Energy', image: '/images/course-3.jpg' },
    { name: 'Fluorite Intelligence', benefit: 'Focus & Intelligence', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Magic Crystals', benefit: 'Intuition & Magic', image: '/images/course-5.jpg' },
    { name: 'Originality Stones', benefit: 'Creativity & Innovation', image: '/images/course-6.jpg' },
    { name: 'Logic Crystals', benefit: 'Reasoning & Clarity', image: '/images/course-7.jpg' },
    { name: 'Communication Stones', benefit: 'Expression & Clarity', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Uranus Rings', benefit: 'Innovation & Rebellion', image: '/images/course-1.jpg' },
    { name: 'Originality Bracelets', benefit: 'Creativity & Innovation', image: '/images/course-2.jpg' },
    { name: 'Vision Necklaces', benefit: 'Clarity & Insight', image: '/images/course-3.jpg' },
    { name: 'Logic Pendants', benefit: 'Reasoning & Focus', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Innovation Wellness', benefit: 'Creativity & Balance', image: '/images/course-5.jpg' },
    { name: 'Vision Balance', benefit: 'Clarity & Harmony', image: '/images/course-6.jpg' },
    { name: 'Originality Wellness', benefit: 'Creativity & Focus', image: '/images/course-7.jpg' },
    { name: 'Logic Wellness', benefit: 'Reasoning & Clarity', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Innovation Success', benefit: 'Creative Success', image: '/images/course-1.jpg' },
    { name: 'Vision Prosperity', benefit: 'Clear Success', image: '/images/course-2.jpg' },
    { name: 'Originality Wealth', benefit: 'Creative Abundance', image: '/images/course-3.jpg' },
    { name: 'Logic Prosperity', benefit: 'Strategic Success', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Innovative Love', benefit: 'Creative Connection', image: '/images/course-5.jpg' },
    { name: 'Visionary Bonds', benefit: 'Clear Understanding', image: '/images/course-6.jpg' },
    { name: 'Original Relationships', benefit: 'Unique Connection', image: '/images/course-7.jpg' },
    { name: 'Logical Partners', benefit: 'Clear Communication', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Innovation Skills', benefit: 'Creative Growth', image: '/images/course-1.jpg' },
    { name: 'Vision Mastery', benefit: 'Clarity & Insight', image: '/images/course-2.jpg' },
    { name: 'Originality Development', benefit: 'Creative Expression', image: '/images/course-3.jpg' },
    { name: 'Logic Mindset', benefit: 'Clear Thinking', image: '/images/course-4.jpg' }
  ]
};

export default function AquariusProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-black">Aquarius Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed">
          Discover crystals and gemstones specially curated for Aquarius&apos; innovative nature, Uranus influence, and unique perspective on the world.
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

      {/* SPECIALLY FOR AQUARIUS SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {aquariusRecommendations["Specially for Aquarius"].map((product, index) => (
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
                <p className="text-slate-700 font-medium mb-2 font-serif leading-relaxed line-clamp-2">{product.aquariusBenefit}</p>
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
          {aquariusRecommendations[categories.find(c => c.id === activeCategory)?.label || ""]?.map((category, index) => (
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
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Aquarius?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto">
          Aquarius, ruled by Uranus, naturally seeks innovation, originality, and progressive thinking. These carefully selected crystals and gemstones align with your unique nature, 
          enhancing your natural strengths while supporting areas of growth. From amethyst that enhances innovation to aquamarine that promotes vision and clarity, 
          each piece is designed to work harmoniously with your Uranus-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 