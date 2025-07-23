'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Pisces', icon: Sparkles },
  { id: 'gemstones', label: 'Gemstone Therapy', icon: Gem },
  { id: 'crystals', label: 'Crystal Healing', icon: Star },
  { id: 'jewelry', label: 'Power Jewelry', icon: Shield },
  { id: 'wellness', label: 'Wellness & Balance', icon: Heart },
  { id: 'prosperity', label: 'Prosperity & Abundance', icon: Target },
  { id: 'relationships', label: 'Love & Relationships', icon: Users },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp }
];

const piscesRecommendations = {
  "Specially for Pisces": [
    {
      id: 'moonstone-intuition-crystal',
      name: 'Moonstone Intuition Crystal',
      image: '/images/course-1.jpg',
      price: '₹3,999',
      originalPrice: '₹7,999',
      category: 'Intuition Crystals',
      piscesBenefit: 'Enhances intuition and psychic abilities',
      slug: 'moonstone-intuition-crystal'
    },
    {
      id: 'aquamarine-compassion-stone',
      name: 'Aquamarine Compassion Stone',
      image: '/images/course-2.jpg',
      price: '₹2,799',
      originalPrice: '₹5,599',
      category: 'Compassion Stones',
      piscesBenefit: 'Promotes compassion and healing',
      slug: 'aquamarine-compassion-stone'
    },
    {
      id: 'amethyst-spiritual-crystal',
      name: 'Amethyst Spiritual Crystal',
      image: '/images/course-3.jpg',
      price: '₹3,299',
      originalPrice: '₹6,599',
      category: 'Spiritual Crystals',
      piscesBenefit: 'Enhances spirituality and protection',
      slug: 'amethyst-spiritual-crystal'
    },
    {
      id: 'pearl-emotional-stone',
      name: 'Pearl Emotional Stone',
      image: '/images/course-4.jpg',
      price: '₹2,199',
      originalPrice: '₹4,399',
      category: 'Emotional Stones',
      piscesBenefit: 'Balances emotions and promotes calm',
      slug: 'pearl-emotional-stone'
    },
    {
      id: 'opal-creativity-crystal',
      name: 'Opal Creativity Crystal',
      image: '/images/course-5.jpg',
      price: '₹2,999',
      originalPrice: '₹5,999',
      category: 'Creativity Crystals',
      piscesBenefit: 'Boosts creativity and inspiration',
      slug: 'opal-creativity-crystal'
    },
    {
      id: 'pisces-dream-crystal',
      name: 'Pisces Dream Crystal',
      image: '/images/course-6.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Dream Crystals',
      piscesBenefit: 'Enhances dreams and intuition',
      slug: 'pisces-dream-crystal'
    },
    {
      id: 'fluorite-protection-stone',
      name: 'Fluorite Protection Stone',
      image: '/images/course-7.jpg',
      price: '₹2,499',
      originalPrice: '₹4,999',
      category: 'Protection Stones',
      piscesBenefit: 'Provides spiritual protection',
      slug: 'fluorite-protection-stone'
    },
    {
      id: 'celestite-healing-crystal',
      name: 'Celestite Healing Crystal',
      image: '/images/course-8.jpg',
      price: '₹1,799',
      originalPrice: '₹3,599',
      category: 'Healing Crystals',
      piscesBenefit: 'Promotes healing and peace',
      slug: 'celestite-healing-crystal'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Moonstone Collection', benefit: 'Intuition & Dreams', image: '/images/course-1.jpg' },
    { name: 'Aquamarine Set', benefit: 'Compassion & Healing', image: '/images/course-2.jpg' },
    { name: 'Amethyst Essence', benefit: 'Spirituality & Protection', image: '/images/course-3.jpg' },
    { name: 'Pearl Emotional', benefit: 'Balance & Calm', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Creativity Crystals', benefit: 'Inspiration & Art', image: '/images/course-5.jpg' },
    { name: 'Dream Stones', benefit: 'Intuition & Dreams', image: '/images/course-6.jpg' },
    { name: 'Protection Crystals', benefit: 'Spiritual Safety', image: '/images/course-7.jpg' },
    { name: 'Healing Stones', benefit: 'Peace & Recovery', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Neptune Rings', benefit: 'Intuition & Dreams', image: '/images/course-1.jpg' },
    { name: 'Compassion Bracelets', benefit: 'Healing & Love', image: '/images/course-2.jpg' },
    { name: 'Spiritual Necklaces', benefit: 'Protection & Wisdom', image: '/images/course-3.jpg' },
    { name: 'Dream Pendants', benefit: 'Intuition & Vision', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Emotional Wellness', benefit: 'Balance & Harmony', image: '/images/course-5.jpg' },
    { name: 'Spiritual Balance', benefit: 'Peace & Connection', image: '/images/course-6.jpg' },
    { name: 'Intuition Wellness', benefit: 'Clarity & Insight', image: '/images/course-7.jpg' },
    { name: 'Dream Wellness', benefit: 'Rest & Vision', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Spiritual Success', benefit: 'Divine Guidance', image: '/images/course-1.jpg' },
    { name: 'Intuition Prosperity', benefit: 'Clear Direction', image: '/images/course-2.jpg' },
    { name: 'Compassion Wealth', benefit: 'Abundant Love', image: '/images/course-3.jpg' },
    { name: 'Dream Prosperity', benefit: 'Manifestation', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Emotional Love', benefit: 'Deep Connection', image: '/images/course-5.jpg' },
    { name: 'Spiritual Bonds', benefit: 'Soul Connection', image: '/images/course-6.jpg' },
    { name: 'Compassionate Relationships', benefit: 'Understanding & Care', image: '/images/course-7.jpg' },
    { name: 'Dream Partners', benefit: 'Romantic Vision', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Intuition Skills', benefit: 'Psychic Development', image: '/images/course-1.jpg' },
    { name: 'Spiritual Mastery', benefit: 'Divine Connection', image: '/images/course-2.jpg' },
    { name: 'Compassion Development', benefit: 'Empathy & Healing', image: '/images/course-3.jpg' },
    { name: 'Dream Mindset', benefit: 'Vision & Manifestation', image: '/images/course-4.jpg' }
  ]
};

export default function PiscesProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-black">Pisces Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed">
          Discover crystals and gemstones specially curated for Pisces&apos;s intuitive nature, Neptune influence, and deep spiritual connection.
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

      {/* SPECIALLY FOR PISCES SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {piscesRecommendations["Specially for Pisces"].map((product, index) => (
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
                <p className="text-slate-700 font-medium mb-2 font-serif leading-relaxed line-clamp-2">{product.piscesBenefit}</p>
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
          {piscesRecommendations[categories.find(c => c.id === activeCategory)?.label || ""]?.map((category, index) => (
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
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Pisces?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto">
          Pisces, ruled by Neptune, naturally seeks spiritual connection, intuition, and compassion. These carefully selected crystals and gemstones align with your dreamy nature, 
          enhancing your natural strengths while supporting areas of growth. From moonstone that enhances intuition to aquamarine that promotes compassion and healing, 
          each piece is designed to work harmoniously with your Neptune-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 