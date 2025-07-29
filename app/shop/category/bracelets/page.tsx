"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { UniversalCartButton } from "@/app/components/UniversalCartButton";
import SpiritualTicker from "@/app/components/Hero/SpiritualTicker";
import NakshatraGyaanBanner from "@/app/components/NakshatraGyaanBanner";
import SpiritualJourneyBanner from "@/app/components/SpiritualJourneyBanner";

// Type definitions
interface Product {
  id: number;
  name: string;
  material: string;
  purpose: string[];
  style: string;
  gender: string;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  path: string;
}

interface Filters {
  material: string[];
  purpose: string[];
  style: string[];
  gender: string[];
}

type FilterCategory = keyof Filters;
type DropdownType = FilterCategory | null;

// Product Banner Component with Images
const ProductBanner = () => (
  <div className="w-full bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 py-8 md:py-12 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Full Height Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src="/images/products/bracelets-banner.jpg"
            alt="Sacred Spiritual Bracelets Collection"
            fill
            className="object-cover rounded-2xl shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
        </div>
        
        {/* Right Section - Text Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-3 leading-tight">
            Spiritual Bracelets
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
            Sacred energy wrapped around your wrist for daily protection and healing
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="px-3 py-1 bg-purple-100/50 text-purple-800 rounded-full text-xs font-medium border border-purple-200/50">
              Healing Energy
            </span>
            <span className="px-3 py-1 bg-pink-100/50 text-pink-800 rounded-full text-xs font-medium border border-pink-200/50">
              Protection
            </span>
            <span className="px-3 py-1 bg-rose-100/50 text-rose-800 rounded-full text-xs font-medium border border-rose-200/50">
              Spiritual Growth
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Products Data
const products: Product[] = [
  {
    id: 1,
    name: "Rudraksha Bracelet",
    material: "Rudraksha",
    purpose: ["Protection", "Spiritual Growth"],
    style: "Adjustable Thread",
    gender: "Unisex",
    price: "₹1,299",
    oldPrice: "₹2,999",
    image: "/images/products/rudraksha-bracelet.jpg",
    description: "Sacred Rudraksha beads for spiritual protection and growth",
    path: "/shop/rudraksha-bracelet"
  },
  {
    id: 2,
    name: "Tulsi Bracelet",
    material: "Tulsi",
    purpose: ["Health & Energy", "Protection"],
    style: "Adjustable Thread",
    gender: "Unisex",
    price: "₹899",
    oldPrice: "₹1,999",
    image: "/images/products/tulsi-bracelet.jpg",
    description: "Holy Tulsi beads for health and divine protection",
    path: "/shop/tulsi-bracelet"
  },
  {
    id: 3,
    name: "Sphatik Crystal Bracelet",
    material: "Sphatik (Crystal)",
    purpose: ["Chakra Healing", "Stress Relief"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,199",
    oldPrice: "₹2,499",
    image: "/images/products/sphatik-bracelet.jpg",
    description: "Pure crystal beads for chakra balancing and clarity",
    path: "/shop/sphatik-bracelet"
  },
  {
    id: 4,
    name: "Lava Stone Bracelet",
    material: "Lava Stone",
    purpose: ["Protection", "Grounding"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,099",
    oldPrice: "₹2,299",
    image: "/images/products/lava-stone-bracelet.jpg",
    description: "Volcanic lava stones for grounding and protection",
    path: "/shop/lava-stone-bracelet"
  },
  {
    id: 5,
    name: "Sandalwood Bracelet",
    material: "Sandalwood (Chandan)",
    purpose: ["Stress Relief", "Meditation"],
    style: "Adjustable Thread",
    gender: "Unisex",
    price: "₹799",
    oldPrice: "₹1,799",
    image: "/images/products/sandalwood-bracelet.jpg",
    description: "Sacred sandalwood beads for peace and meditation",
    path: "/shop/sandalwood-bracelet"
  },
  {
    id: 6,
    name: "Tiger Eye Bracelet",
    material: "Tiger Eye",
    purpose: ["Wealth & Abundance", "Protection"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,399",
    oldPrice: "₹2,799",
    image: "/images/products/tiger-eye-bracelet.jpg",
    description: "Tiger eye stones for wealth attraction and protection",
    path: "/shop/tiger-eye-bracelet"
  },
  {
    id: 7,
    name: "Rose Quartz Bracelet",
    material: "Rose Quartz",
    purpose: ["Love & Relationship", "Emotional Healing"],
    style: "Elastic Beaded",
    gender: "Women's",
    price: "₹1,199",
    oldPrice: "₹2,499",
    image: "/images/products/rose-quartz-bracelet.jpg",
    description: "Rose quartz for love, compassion and emotional healing",
    path: "/shop/rose-quartz-bracelet"
  },
  {
    id: 8,
    name: "Amethyst Bracelet",
    material: "Amethyst",
    purpose: ["Stress Relief", "Spiritual Growth"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,299",
    oldPrice: "₹2,599",
    image: "/images/products/amethyst-bracelet.jpg",
    description: "Amethyst for stress relief and spiritual awareness",
    path: "/shop/amethyst-bracelet"
  },
  {
    id: 9,
    name: "Black Tourmaline Bracelet",
    material: "Black Tourmaline",
    purpose: ["Protection", "Grounding"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,199",
    oldPrice: "₹2,399",
    image: "/images/products/black-tourmaline-bracelet.jpg",
    description: "Black tourmaline for powerful protection and grounding",
    path: "/shop/black-tourmaline-bracelet"
  },
  {
    id: 10,
    name: "Green Aventurine Bracelet",
    material: "Green Aventurine",
    purpose: ["Health & Energy", "Wealth & Abundance"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,099",
    oldPrice: "₹2,299",
    image: "/images/products/green-aventurine-bracelet.jpg",
    description: "Green aventurine for health, energy and abundance",
    path: "/shop/green-aventurine-bracelet"
  },
  {
    id: 11,
    name: "7 Chakra Healing Bracelet",
    material: "Mixed Stones",
    purpose: ["Chakra Healing", "Spiritual Growth"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,599",
    oldPrice: "₹3,199",
    image: "/images/products/chakra-bracelet.jpg",
    description: "Complete 7 chakra stones for holistic healing",
    path: "/shop/chakra-bracelet"
  },
  {
    id: 12,
    name: "Citrine Wealth Bracelet",
    material: "Citrine",
    purpose: ["Wealth & Abundance", "Success"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,299",
    oldPrice: "₹2,599",
    image: "/images/products/citrine-bracelet.jpg",
    description: "Citrine for wealth attraction and success",
    path: "/shop/citrine-bracelet"
  }
];

// Filter Options
const filterOptions = {
  material: ["Rudraksha", "Tulsi", "Sphatik (Crystal)", "Lava Stone", "Sandalwood (Chandan)", "Tiger Eye", "Rose Quartz", "Amethyst", "Black Tourmaline", "Green Aventurine", "Mixed Stones", "Citrine"],
  purpose: ["Protection", "Spiritual Growth", "Health & Energy", "Chakra Healing", "Stress Relief", "Grounding", "Meditation", "Wealth & Abundance", "Love & Relationship", "Emotional Healing", "Success"],
  style: ["Adjustable Thread", "Elastic Beaded", "Metal Charm", "Single Bead"],
  gender: ["Men's", "Women's", "Unisex"]
} satisfies Record<FilterCategory, string[]>;

export default function BraceletsPage() {
  const [filters, setFilters] = useState<Filters>({
    material: [],
    purpose: [],
    style: [],
    gender: []
  });
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const materialMatch = filters.material.length === 0 || filters.material.includes(product.material);
    const purposeMatch = filters.purpose.length === 0 || product.purpose.some(p => filters.purpose.includes(p));
    const styleMatch = filters.style.length === 0 || filters.style.includes(product.style);
    const genderMatch = filters.gender.length === 0 || filters.gender.includes(product.gender);

    return materialMatch && purposeMatch && styleMatch && genderMatch;
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
      material: [],
      purpose: [],
      style: [],
      gender: []
    });
  };

  const getActiveFiltersCount = (): number => {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Product Banner */}
      <ProductBanner />
      
      {/* Spiritual Ticker */}
      <SpiritualTicker />
      
      {/* Category Description */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-6 text-gray-800">
          Sacred energy wrapped around your wrist
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
          Discover spiritual bracelets that carry divine energy and healing properties. 
          Each bracelet is crafted with sacred materials to provide protection, healing, and spiritual growth in your daily life.
        </p>

        {/* Filters Section */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-12 border border-gray-100">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-gray-700 font-medium">Filter by:</span>
            
            {/* Material Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'material' ? null : 'material')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Material
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'material' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'material' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.material.map(material => (
                  <label key={material} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.material.includes(material)}
                      onChange={() => toggleFilter('material', material)}
                      className="mr-2"
                    />
                    {material}
                  </label>
                ))}
              </div>
            </div>

            {/* Purpose Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'purpose' ? null : 'purpose')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Purpose
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'purpose' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'purpose' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
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
            </div>

            {/* Style Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'style' ? null : 'style')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Style
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'style' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'style' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.style.map(style => (
                  <label key={style} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.style.includes(style)}
                      onChange={() => toggleFilter('style', style)}
                      className="mr-2"
                    />
                    {style}
                  </label>
                ))}
              </div>
            </div>

            {/* Gender Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'gender' ? null : 'gender')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Gender
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'gender' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'gender' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.gender.map(gender => (
                  <label key={gender} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.gender.includes(gender)}
                      onChange={() => toggleFilter('gender', gender)}
                      className="mr-2"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>

            {/* Clear All Filters */}
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Clear all ({getActiveFiltersCount()})
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([category, values]) =>
                values.map((value: string) => (
                  <span
                    key={`${category}-${value}`}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {value}
                    <button
                      onClick={() => toggleFilter(category as FilterCategory, value)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={product.path} className="w-full max-w-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                >
                  {/* Product Image */}
                  <div className="relative h-36 overflow-hidden rounded-t-2xl">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-serif font-bold text-gray-900 mb-2 text-lg line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 font-light line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Product Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.purpose.slice(0, 1).map((purpose, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full"
                        >
                          {purpose}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="font-bold text-gray-900">{product.price}</span>
                        <span className="text-gray-500 line-through text-sm ml-2">{product.oldPrice}</span>
                      </div>
                      <span className="text-green-600 text-sm font-medium">
                        {Math.round(((parseInt(product.oldPrice.replace(/[^\d]/g, '')) - parseInt(product.price.replace(/[^\d]/g, ''))) / parseInt(product.oldPrice.replace(/[^\d]/g, ''))) * 100)}% OFF
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <UniversalCartButton
                      productId={product.id.toString()}
                      productName={product.name}
                      price={Number(product.price.replace(/[^\d]/g, ''))}
                      image={product.image}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </UniversalCartButton>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Nakshatra Gyaan Banner */}
      <NakshatraGyaanBanner />

      {/* Spiritual Journey Banner */}
      <SpiritualJourneyBanner />
    </div>
  );
} 