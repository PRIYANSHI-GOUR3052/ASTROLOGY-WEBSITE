'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Heart, Target, Shield, Star, Gem, Users, TrendingUp } from 'lucide-react';

const categories = [
  { id: 'specially', label: 'Specially for Leo', icon: Sparkles },
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
  leoBenefit?: string;
  slug?: string;
  benefit?: string;
};

type LeoRecommendations = {
  [key: string]: RecommendationItem[];
};

const leoRecommendations: LeoRecommendations = {
  "Specially for Leo": [
    {
      id: 'ruby-leadership-ring',
      name: 'Ruby Leadership Ring',
      image: '/images/course-1.jpg',
      price: '₹5,999',
      originalPrice: '₹11,999',
      category: 'Leadership Stones',
      leoBenefit: 'Enhances leadership and charisma',
      slug: 'ruby-leadership-ring'
    },
    {
      id: 'amber-confidence-stone',
      name: 'Amber Confidence Stone',
      image: '/images/course-2.jpg',
      price: '₹2,299',
      originalPrice: '₹4,599',
      category: 'Confidence Crystals',
      leoBenefit: 'Boosts self-confidence and creativity',
      slug: 'amber-confidence-stone'
    },
    {
      id: 'tiger-eye-power-pendant',
      name: 'Tiger Eye Power Pendant',
      image: '/images/course-3.jpg',
      price: '₹3,599',
      originalPrice: '₹6,999',
      category: 'Power Stones',
      leoBenefit: 'Amplifies personal power and protection',
      slug: 'tiger-eye-power-pendant'
    },
    {
      id: 'leo-creativity-crystal',
      name: 'Leo Creativity Crystal',
      image: '/images/course-4.jpg',
      price: '₹1,899',
      originalPrice: '₹3,799',
      category: 'Creativity Crystals',
      leoBenefit: 'Enhances artistic expression and inspiration',
      slug: 'leo-creativity-crystal'
    },
    {
      id: 'citrine-success-stone',
      name: 'Citrine Success Stone',
      image: '/images/course-5.jpg',
      price: '₹2,799',
      originalPrice: '₹5,499',
      category: 'Success Stones',
      leoBenefit: 'Attracts success and abundance',
      slug: 'citrine-success-stone'
    },
    {
      id: 'carnelian-vitality-bracelet',
      name: 'Carnelian Vitality Bracelet',
      image: '/images/course-6.jpg',
      price: '₹1,999',
      originalPrice: '₹3,999',
      category: 'Vitality Jewelry',
      leoBenefit: 'Boosts energy and vitality',
      slug: 'carnelian-vitality-bracelet'
    },
    {
      id: 'garnet-passion-ring',
      name: 'Garnet Passion Ring',
      image: '/images/course-7.jpg',
      price: '₹3,299',
      originalPrice: '₹5,999',
      category: 'Passion Stones',
      leoBenefit: 'Enhances passion and determination',
      slug: 'garnet-passion-ring'
    },
    {
      id: 'sunstone-radiance-crystal',
      name: 'Sunstone Radiance Crystal',
      image: '/images/course-8.jpg',
      price: '₹2,599',
      originalPrice: '₹4,999',
      category: 'Radiance Crystals',
      leoBenefit: 'Amplifies natural radiance and charm',
      slug: 'sunstone-radiance-crystal'
    }
  ],
  "Gemstone Therapy": [
    { name: 'Ruby Collection', benefit: 'Leadership & Charisma', image: '/images/course-1.jpg' },
    { name: 'Amber Set', benefit: 'Confidence & Creativity', image: '/images/course-2.jpg' },
    { name: 'Tiger Eye Essence', benefit: 'Power & Protection', image: '/images/course-3.jpg' },
    { name: 'Citrine Success', benefit: 'Abundance & Success', image: '/images/course-4.jpg' }
  ],
  "Crystal Healing": [
    { name: 'Creativity Crystals', benefit: 'Artistic Expression', image: '/images/course-5.jpg' },
    { name: 'Vitality Stones', benefit: 'Energy & Life Force', image: '/images/course-6.jpg' },
    { name: 'Passion Crystals', benefit: 'Determination & Drive', image: '/images/course-7.jpg' },
    { name: 'Radiance Stones', benefit: 'Natural Charm', image: '/images/course-8.jpg' }
  ],
  "Power Jewelry": [
    { name: 'Sun Rings', benefit: 'Leadership & Authority', image: '/images/course-1.jpg' },
    { name: 'Confidence Bracelets', benefit: 'Self-Assurance', image: '/images/course-2.jpg' },
    { name: 'Power Necklaces', benefit: 'Personal Power', image: '/images/course-3.jpg' },
    { name: 'Charisma Pendants', benefit: 'Magnetic Personality', image: '/images/course-4.jpg' }
  ],
  "Wellness & Balance": [
    { name: 'Energy Wellness', benefit: 'Vitality & Strength', image: '/images/course-5.jpg' },
    { name: 'Confidence Building', benefit: 'Self-Esteem', image: '/images/course-6.jpg' },
    { name: 'Creative Expression', benefit: 'Artistic Flow', image: '/images/course-7.jpg' },
    { name: 'Leadership Development', benefit: 'Authority Skills', image: '/images/course-8.jpg' }
  ],
  "Prosperity & Abundance": [
    { name: 'Success Attraction', benefit: 'Career Advancement', image: '/images/course-1.jpg' },
    { name: 'Leadership Opportunities', benefit: 'Authority Roles', image: '/images/course-2.jpg' },
    { name: 'Creative Success', benefit: 'Artistic Recognition', image: '/images/course-3.jpg' },
    { name: 'Abundance Flow', benefit: 'Wealth Attraction', image: '/images/course-4.jpg' }
  ],
  "Love & Relationships": [
    { name: 'Romantic Leadership', benefit: 'Love & Passion', image: '/images/course-5.jpg' },
    { name: 'Charismatic Connection', benefit: 'Magnetic Attraction', image: '/images/course-6.jpg' },
    { name: 'Generous Love', benefit: 'Giving & Receiving', image: '/images/course-7.jpg' },
    { name: 'Loyal Partnership', benefit: 'Faithful Bonds', image: '/images/course-8.jpg' }
  ],
  "Personal Growth": [
    { name: 'Leadership Skills', benefit: 'Authority Development', image: '/images/course-1.jpg' },
    { name: 'Confidence Building', benefit: 'Self-Assurance', image: '/images/course-2.jpg' },
    { name: 'Creative Mastery', benefit: 'Artistic Excellence', image: '/images/course-3.jpg' },
    { name: 'Humility Balance', benefit: 'Modest Confidence', image: '/images/course-4.jpg' }
  ]
};

export default function LeoProductRecommendations() {
  const [activeCategory, setActiveCategory] = useState('specially');

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-serif font-bold text-black">Leo Power Collection</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-600 mx-auto rounded-full"></div>
        <p className="text-xl text-black font-serif max-w-3xl mx-auto leading-relaxed">
          Discover crystals and gemstones specially curated for Leo&apos;s fiery nature, Sun influence, and natural leadership qualities.
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

      {/* SPECIALLY FOR LEO SECTION */}
      {activeCategory === 'specially' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {leoRecommendations["Specially for Leo"].map((product, index) => (
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
                <p className="text-slate-700 font-medium mb-2 font-serif leading-relaxed line-clamp-2">{product.leoBenefit}</p>
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
          {(leoRecommendations[categories.find(c => c.id === activeCategory)?.label || ""] || []).map((category, index) => (
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
        <h3 className="text-2xl font-serif font-bold text-black mb-4">Why These Crystals Work for Leo?</h3>
        <p className="text-black font-serif leading-relaxed max-w-4xl mx-auto">
          Leo, ruled by the Sun, naturally gravitates toward leadership, creativity, and self-expression. These carefully selected crystals and gemstones align with your fiery nature, 
          enhancing your natural strengths while supporting areas of growth. From rubies that amplify your leadership qualities to amber that boosts your natural confidence, 
          each piece is designed to work harmoniously with your Sun-ruled energy.
        </p>
      </motion.div>
    </div>
  );
} 