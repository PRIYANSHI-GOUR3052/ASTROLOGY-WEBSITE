'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Cancer', icon: Sparkles },
  { id: 'gemstones', label: 'Gemstone Therapy', icon: Gem },
  { id: 'crystals', label: 'Crystal Healing', icon: Star },
  { id: 'jewelry', label: 'Power Jewelry', icon: Shield },
  { id: 'wellness', label: 'Wellness & Balance', icon: Heart },
  { id: 'prosperity', label: 'Prosperity & Abundance', icon: Target },
  { id: 'relationships', label: 'Love & Relationships', icon: Users },
  { id: 'growth', label: 'Personal Growth', icon: TrendingUp }
];

const cancerRecommendations = {
  "Specially for Cancer": [
    {
      id: 'pearl-emotional-ring',
      name: 'Pearl Emotional Ring',
      image: '/images/course-1.jpg',
      price: '₹3,999',
      originalPrice: '₹7,999',
      category: 'Emotional Balance',
      cancerBenefit: 'Enhances emotional balance and intuition',
      slug: 'pearl-emotional-ring'
    },
    {
      id: 'moonstone-intuition-stone',
      name: 'Moonstone Intuition Stone',
      image: '/images/course-2.jpg',
      price: '₹2,299',
      originalPrice: '₹4,599',
      category: 'Intuition Crystals',
      cancerBenefit: 'Amplifies psychic abilities and dreams',
      slug: 'moonstone-intuition-stone'
    },
    {
      id: 'opal-protection-pendant',
      name: 'Opal Protection Pendant',
      image: '/images/course-3.jpg',
      price: '₹4,599',
      originalPrice: '₹8,999',
      category: 'Protection Stones',
      cancerBenefit: 'Provides emotional protection and healing',
      slug: 'opal-protection-pendant'
    },
    {
      id: 'cancer-nurturing-crystal',
      name: 'Cancer Nurturing Crystal',
      image: '/images/course-4.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Nurturing Crystals',
      cancerBenefit: 'Enhances caring and protective instincts',
      slug: 'cancer-nurturing-crystal'
    },
    {
      id: 'silver-moon-bracelet',
      name: 'Silver Moon Bracelet',
      image: '/images/course-5.jpg',
      price: '₹2,799',
      originalPrice: '₹5,499',
      category: 'Moon Energy',
      cancerBenefit: 'Connects with lunar energy and emotions',
      slug: 'silver-moon-bracelet'
    },
    {
      id: 'aquamarine-healing-stone',
      name: 'Aquamarine Healing Stone',
      image: '/images/course-6.jpg',
      price: '₹3,299',
      originalPrice: '₹5,999',
      category: 'Healing Crystals',
      cancerBenefit: 'Promotes emotional healing and peace',
      slug: 'aquamarine-healing-stone'
    },
    {
      id: 'rose-quartz-love-crystal',
      name: 'Rose Quartz Love Crystal',
      image: '/images/course-7.jpg',
      price: '₹1,599',
      originalPrice: '₹2,999',
      category: 'Love Crystals',
      cancerBenefit: 'Enhances love and compassion',
      slug: 'rose-quartz-love-crystal'
    },
    {
      id: 'amethyst-protection-ring',
      name: 'Amethyst Protection Ring',
      image: '/images/course-8.jpg',
      price: '₹2,199',
      originalPrice: '₹3,999',
      category: 'Protection Jewelry',
      cancerBenefit: 'Provides spiritual protection and calm',
      slug: 'amethyst-protection-ring'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Pearl Collection', benefit: 'Emotional Balance & Intuition', image: '/images/course-1.jpg' },
    { name: 'Moonstone Set', benefit: 'Psychic Abilities & Dreams', image: '/images/course-2.jpg' },
    { name: 'Opal Essence', benefit: 'Emotional Protection', image: '/images/course-3.jpg' },
    { name: 'Silver Moon', benefit: 'Lunar Energy Connection', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Nurturing Crystals', benefit: 'Caring & Protection', image: '/images/course-5.jpg' },
    { name: 'Healing Stones', benefit: 'Emotional Healing', image: '/images/course-6.jpg' },
    { name: 'Love Crystals', benefit: 'Compassion & Love', image: '/images/course-7.jpg' },
    { name: 'Protection Crystals', benefit: 'Spiritual Protection', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Moon Rings', benefit: 'Emotional & Intuitive', image: '/images/course-1.jpg' },
    { name: 'Nurturing Bracelets', benefit: 'Caring & Protective', image: '/images/course-2.jpg' },
    { name: 'Healing Necklaces', benefit: 'Emotional Wellness', image: '/images/course-3.jpg' },
    { name: 'Protection Pendants', benefit: 'Spiritual & Emotional Safety', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Emotional Wellness', benefit: 'Inner Peace', image: '/images/course-5.jpg' },
    { name: 'Intuitive Development', benefit: 'Psychic Abilities', image: '/images/course-6.jpg' },
    { name: 'Family Harmony', benefit: 'Domestic Peace', image: '/images/course-7.jpg' },
    { name: 'Spiritual Protection', benefit: 'Energetic Safety', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Emotional Wealth', benefit: 'Inner Richness', image: '/images/course-1.jpg' },
    { name: 'Family Prosperity', benefit: 'Domestic Abundance', image: '/images/course-2.jpg' },
    { name: 'Intuitive Success', benefit: 'Psychic Gifts', image: '/images/course-3.jpg' },
    { name: 'Protection Wealth', benefit: 'Security & Safety', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Emotional Connection', benefit: 'Deep Bonds', image: '/images/course-5.jpg' },
    { name: 'Family Love', benefit: 'Domestic Harmony', image: '/images/course-6.jpg' },
    { name: 'Intuitive Romance', benefit: 'Soul Connections', image: '/images/course-7.jpg' },
    { name: 'Protective Love', benefit: 'Safe Relationships', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Emotional Intelligence', benefit: 'Self-Awareness', image: '/images/course-1.jpg' },
    { name: 'Intuitive Development', benefit: 'Psychic Growth', image: '/images/course-2.jpg' },
    { name: 'Boundary Setting', benefit: 'Healthy Limits', image: '/images/course-3.jpg' },
    { name: 'Self-Protection', benefit: 'Emotional Safety', image: '/images/course-4.jpg' }
  ]
};

export default function CancerProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-black">Cancer Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-lg sm:text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed px-4">
          Discover crystals and gemstones specially curated for Cancer&apos;s watery nature, Moon influence, and deep emotional sensitivity.
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

      {/* SPECIALLY FOR CANCER SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {cancerRecommendations["Specially for Cancer"].map((product, index) => (
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
                <p className="text-xs sm:text-base text-slate-700 font-medium mb-1 sm:mb-2 font-serif leading-relaxed line-clamp-2">{product.cancerBenefit}</p>
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
          {cancerRecommendations[categories.find(c => c.id === activeCategory)?.label || ""]?.map((category, index) => (
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
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Cancer?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto text-justify px-4 sm:px-0">
          Cancer, ruled by the Moon, naturally gravitates toward emotional depth, intuition, and nurturing energy. These carefully selected crystals and gemstones align with your watery nature, 
          enhancing your natural strengths while supporting areas of growth. From pearls that amplify your emotional intelligence to moonstone that deepens your intuition, 
          each piece is designed to work harmoniously with your Moon-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 