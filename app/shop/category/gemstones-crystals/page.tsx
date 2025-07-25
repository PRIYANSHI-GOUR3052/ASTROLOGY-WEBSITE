"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, X, ShoppingCart } from 'lucide-react';
import { UniversalCartButton } from "@/app/components/UniversalCartButton";
import NakshatraGyaanBanner from '../../../components/NakshatraGyaanBanner';

// Type definitions
interface Product {
  id: number;
  name: string;
  type: string;
  color: string;
  purpose: string[];
  zodiac: string[];
  chakra: string[];
  planet: string;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  path: string;
  rating?: number;
}

interface Filters {
  name: string[];
  color: string[];
  purpose: string[];
  zodiac: string[];
  chakra: string[];
  planet: string[];
}

type FilterCategory = keyof Filters;
type DropdownType = FilterCategory | null;

// Product Banner Component with Images
const ProductBanner = () => (
  <div className="w-full bg-gradient-to-r from-blue-50 via-blue-50 to-amber-50 py-20 md:py-28 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-800 mb-6 leading-tight">
          Gemstones
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto mb-8">
          The whispers of the universe curated into a collection
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <span className="px-4 py-2 bg-amber-100/50 text-amber-800 rounded-full text-sm font-medium border border-amber-200/50">
            Natural Energy
          </span>
          <span className="px-4 py-2 bg-purple-100/50 text-purple-800 rounded-full text-sm font-medium border border-purple-200/50">
            Spiritual Healing
          </span>
          <span className="px-4 py-2 bg-blue-100/50 text-blue-800 rounded-full text-sm font-medium border border-blue-200/50">
            Cosmic Wisdom
          </span>
        </div>
      </div>
      
      {/* Horizontal Gemstone Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        <Image
          src="/images/products/gemstones-banner.jpg"
          alt="Beautiful Gemstones Collection"
          fill
          className="object-cover rounded-2xl shadow-2xl"
          sizes="100vw"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
      </div>
    </div>
  </div>
);

// Product Data with navigation paths
const products: Product[] = [
  {
    id: 1,
    name: "Amethyst",
    type: "Amethyst",
    color: "Purple",
    purpose: ["Healing Crystals", "Meditation & Focus"],
    zodiac: ["Pisces", "Aquarius"],
    chakra: ["Third Eye", "Crown"],
    planet: "Jupiter",
    price: "₹1,200",
    oldPrice: "₹2,000",
    image: "/images/products/amethyst.jpg",
    description: "Enhances spiritual awareness and promotes calm",
    path: "/shop/amethyst-crystal"
  },
  {
    id: 2,
    name: "Rose Quartz",
    type: "Rose Quartz",
    color: "Pink",
    purpose: ["Love & Relationship", "Healing Crystals"],
    zodiac: ["Taurus", "Libra"],
    chakra: ["Heart"],
    planet: "Venus",
    price: "₹800",
    oldPrice: "₹1,500",
    image: "/images/products/rose-quartz.jpg",
    description: "Stone of unconditional love and emotional healing",
    path: "/shop/rose-quartz-crystal"
  },
  {
    id: 3,
    name: "Citrine",
    type: "Citrine",
    color: "Yellow",
    purpose: ["Abundance / Wealth", "Chakra Balancing"],
    zodiac: ["Leo", "Sagittarius"],
    chakra: ["Solar Plexus"],
    planet: "Sun",
    price: "₹1,500",
    oldPrice: "₹2,500",
    image: "/images/products/citrine.jpg",
    description: "Manifests abundance and personal power",
    path: "/shop/citrine-crystal"
  },
  {
    id: 4,
    name: "Tiger's Eye",
    type: "Tiger's Eye",
    color: "Brown",
    purpose: ["Protection Stones", "Abundance / Wealth"],
    zodiac: ["Capricorn", "Virgo"],
    chakra: ["Root", "Solar Plexus"],
    planet: "Mars",
    price: "₹900",
    oldPrice: "₹1,800",
    image: "/images/products/tigers-eye.jpg",
    description: "Protection and grounding with abundance energy",
    path: "/shop/tigers-eye-crystal"
  },
  {
    id: 5,
    name: "Lapis Lazuli",
    type: "Lapis Lazuli",
    color: "Blue",
    purpose: ["Healing Crystals", "Meditation & Focus"],
    zodiac: ["Sagittarius", "Pisces"],
    chakra: ["Throat", "Third Eye"],
    planet: "Jupiter",
    price: "₹2,000",
    oldPrice: "₹3,500",
    image: "/images/products/lapis-lazuli.jpg",
    description: "Enhances communication and spiritual wisdom",
    path: "/shop/lapis-lazuli-crystal"
  },
  {
    id: 6,
    name: "Clear Quartz",
    type: "Clear Quartz",
    color: "Clear",
    purpose: ["Healing Crystals", "Chakra Balancing"],
    zodiac: ["All Signs"],
    chakra: ["Crown", "All Chakras"],
    planet: "All Planets",
    price: "₹600",
    oldPrice: "₹1,200",
    image: "/images/products/clear-quartz.jpg",
    description: "Master healer and energy amplifier",
    path: "/shop/clear-quartz-crystal"
  },
  {
    id: 7,
    name: "Black Tourmaline",
    type: "Black Tourmaline",
    color: "Black",
    purpose: ["Protection Stones"],
    zodiac: ["Scorpio", "Capricorn"],
    chakra: ["Root"],
    planet: "Saturn",
    price: "₹1,100",
    oldPrice: "₹2,000",
    image: "/images/products/black-tourmaline.jpg",
    description: "Powerful protection and grounding stone",
    path: "/shop/black-tourmaline-crystal"
  },
  {
    id: 8,
    name: "Aventurine",
    type: "Aventurine",
    color: "Green",
    purpose: ["Abundance / Wealth", "Love & Relationship"],
    zodiac: ["Taurus", "Cancer"],
    chakra: ["Heart"],
    planet: "Venus",
    price: "₹700",
    oldPrice: "₹1,400",
    image: "/images/products/aventurine.jpg",
    description: "Stone of opportunity and emotional healing",
    path: "/shop/aventurine-crystal"
  },
  {
    id: 9,
    name: "Carnelian",
    type: "Carnelian",
    color: "Orange",
    purpose: ["Protection Stones", "Abundance / Wealth"],
    zodiac: ["Aries", "Leo"],
    chakra: ["Sacral", "Solar Plexus"],
    planet: "Mars",
    price: "₹800",
    oldPrice: "₹1,600",
    image: "/images/products/carnelian.jpg",
    description: "Boosts creativity and personal power",
    path: "/shop/carnelian-crystal"
  },
  {
    id: 10,
    name: "Moonstone",
    type: "Moonstone",
    color: "White",
    purpose: ["Love & Relationship", "Healing Crystals"],
    zodiac: ["Cancer", "Pisces"],
    chakra: ["Crown"],
    planet: "Moon",
    price: "₹1,300",
    oldPrice: "₹2,200",
    image: "/images/products/moonstone.jpg",
    description: "Enhances intuition and emotional balance",
    path: "/shop/moonstone-crystal"
  },
  {
    id: 11,
    name: "Labradorite",
    type: "Labradorite",
    color: "Multi",
    purpose: ["Protection Stones", "Meditation & Focus"],
    zodiac: ["Scorpio", "Aquarius"],
    chakra: ["Third Eye"],
    planet: "Uranus",
    price: "₹1,600",
    oldPrice: "₹2,800",
    image: "/images/products/labradorite.jpg",
    description: "Protection and mystical transformation",
    path: "/shop/labradorite-crystal"
  },
  {
    id: 12,
    name: "Red Jasper",
    type: "Red Jasper",
    color: "Red",
    purpose: ["Protection Stones", "Healing Crystals"],
    zodiac: ["Aries", "Scorpio"],
    chakra: ["Root"],
    planet: "Mars",
    price: "₹750",
    oldPrice: "₹1,500",
    image: "/images/products/red-jasper.jpg",
    description: "Grounding and protective energy",
    path: "/shop/red-jasper-crystal"
  }
];

// Filter Options
const filterOptions: Record<FilterCategory, string[]> = {
  name: ["Amethyst", "Rose Quartz", "Citrine", "Tiger's Eye", "Lapis Lazuli", "Clear Quartz", "Black Tourmaline", "Aventurine", "Carnelian", "Moonstone", "Labradorite", "Red Jasper"],
  color: ["Purple", "Pink", "Yellow", "Brown", "Blue", "Clear", "Black", "Green", "Orange", "White", "Multi", "Red"],
  purpose: ["Protection Stones", "Healing Crystals", "Love & Relationship", "Abundance / Wealth", "Chakra Balancing", "Meditation & Focus"],
  zodiac: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
  chakra: ["Root", "Sacral", "Solar Plexus", "Heart", "Throat", "Third Eye", "Crown"],
  planet: ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu", "Uranus"]
};

export default function GemstonesCrystalsPage() {
  const [filters, setFilters] = useState<Filters>({
    name: [],
    color: [],
    purpose: [],
    zodiac: [],
    chakra: [],
    planet: []
  });
  const [activeDropdown, setActiveDropdown] = useState<FilterCategory | null>(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const nameMatch = filters.name.length === 0 || filters.name.includes(product.type);
    const colorMatch = filters.color.length === 0 || filters.color.includes(product.color);
    const purposeMatch = filters.purpose.length === 0 || product.purpose.some(p => filters.purpose.includes(p));
    const zodiacMatch = filters.zodiac.length === 0 || product.zodiac.some(z => filters.zodiac.includes(z));
    const chakraMatch = filters.chakra.length === 0 || product.chakra.some(c => filters.chakra.includes(c));
    const planetMatch = filters.planet.length === 0 || filters.planet.includes(product.planet);

    return nameMatch && colorMatch && purposeMatch && zodiacMatch && chakraMatch && planetMatch;
  });

  const toggleFilter = (category: FilterCategory, value: string): void => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = (): void => {
    setFilters({
      name: [],
      color: [],
      purpose: [],
      zodiac: [],
      chakra: [],
      planet: []
    });
  };

  const getActiveFiltersCount = (): number => {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product Banner */}
      <ProductBanner />
      
      {/* Category Description */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6 text-gray-800">
          Resonate with your energy
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
          Discover the perfect gemstones and crystals that align with your zodiac sign, planetary influences, and personal intentions. 
          Each stone carries unique vibrational energy to enhance your spiritual journey and bring balance to your life.
        </p>

        {/* Filters Section */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-12 border border-gray-100">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-gray-700 font-medium">Filter by:</span>
            
            {/* Name Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'name' ? null : 'name')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Name
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'name' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filterOptions.name.map(name => (
                    <label key={name} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.name.includes(name)}
                        onChange={() => toggleFilter('name', name)}
                        className="mr-2"
                      />
                      {name}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Color Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'color' ? null : 'color')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Color
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'color' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filterOptions.color.map(color => (
                    <label key={color} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.color.includes(color)}
                        onChange={() => toggleFilter('color', color)}
                        className="mr-2"
                      />
                      {color}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Purpose Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'purpose' ? null : 'purpose')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Purpose
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'purpose' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filterOptions.purpose.map(purpose => (
                    <label key={purpose} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.purpose.includes(purpose)}
                        onChange={() => toggleFilter('purpose', purpose)}
                        className="mr-2"
                      />
                      {purpose}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Zodiac Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'zodiac' ? null : 'zodiac')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Zodiac
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'zodiac' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filterOptions.zodiac.map(zodiac => (
                    <label key={zodiac} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.zodiac.includes(zodiac)}
                        onChange={() => toggleFilter('zodiac', zodiac)}
                        className="mr-2"
                      />
                      {zodiac}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Chakra Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'chakra' ? null : 'chakra')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Chakra
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'chakra' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filterOptions.chakra.map(chakra => (
                    <label key={chakra} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.chakra.includes(chakra)}
                        onChange={() => toggleFilter('chakra', chakra)}
                        className="mr-2"
                      />
                      {chakra}
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Planet Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'planet' ? null : 'planet')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Planet
                <ChevronDown className="w-4 h-4" />
              </button>
              {activeDropdown === 'planet' && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {filterOptions.planet.map(planet => (
                    <label key={planet} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.planet.includes(planet)}
                        onChange={() => toggleFilter('planet', planet)}
                        className="mr-2"
                      />
                      {planet}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {Object.entries(filters).map(([category, values]) =>
                values.map((value: string) => (
                  <span
                    key={`${category}-${value}`}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {value}
                    <button
                      onClick={() => toggleFilter(category as FilterCategory, value)}
                      className="ml-1 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-600 hover:text-gray-800 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredProducts.map((product, idx) => (
              <Link href={product.path} key={product.id} className="w-full max-w-sm">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.10)' }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 cursor-pointer border border-gray-100"
                >
                  <div className="relative w-full flex items-center justify-center p-3" style={{ background: 'transparent', transition: 'background 0.3s' }}>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-36 relative">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover rounded-xl" 
                        style={{ objectFit: 'cover', position: 'absolute' }} 
                      />
                    </motion.div>
                  </div>
                  <div className="flex flex-col flex-1 p-4">
                    <h3 className="text-lg font-serif font-bold mb-2 leading-snug text-gray-900">{product.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-2 gap-3">
                      <span className="font-medium">{product.type}</span>
                      <span className="font-medium">{product.rating || 4.5} rating</span>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2 font-light">{product.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.purpose.slice(0, 1).map(purpose => (
                        <span key={purpose} className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-lg font-medium">
                          {purpose}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <span className="font-bold text-lg text-gray-900">{product.price}</span>
                        <span className="text-gray-400 line-through ml-2 text-sm">{product.oldPrice}</span>
                      </div>
                    </div>
                    <motion.div whileHover={{ x: 5 }} className="mt-auto w-max">
                      <UniversalCartButton
                        productId={product.id.toString()}
                        productName={product.name}
                        price={Number(product.price.replace(/[^\d]/g, ''))}
                        image={product.image}
                        className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                      >
                        Add to Cart
                        <span className="ml-2">→</span>
                      </UniversalCartButton>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products match your current filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Clear Filters
                <span className="ml-2">→</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NakshatraGyaanBanner */}
      <NakshatraGyaanBanner />
    </div>
  );
} 