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
  type: string;
  element: string;
  purpose: string[];
  placement: string;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  path: string;
}

interface Filters {
  type: string[];
  element: string[];
  purpose: string[];
  placement: string[];
}

type FilterCategory = keyof Filters;
type DropdownType = FilterCategory | null;

// Product Banner Component with Images
const ProductBanner = () => (
  <div className="w-full bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 py-8 md:py-12 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Full Height Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src="/images/products/feng-shui-banner.jpg"
            alt="Harmonious Feng Shui Collection"
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
            Feng Shui
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
            Harmonize your space with ancient Chinese wisdom for balance and positive energy
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="px-3 py-1 bg-green-100/50 text-green-800 rounded-full text-xs font-medium border border-green-200/50">
              Energy Balance
            </span>
            <span className="px-3 py-1 bg-emerald-100/50 text-emerald-800 rounded-full text-xs font-medium border border-emerald-200/50">
              Harmony
            </span>
            <span className="px-3 py-1 bg-teal-100/50 text-teal-800 rounded-full text-xs font-medium border border-teal-200/50">
              Prosperity
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
    name: "Lucky Bamboo",
    type: "Plant",
    element: "Wood",
    purpose: ["Prosperity", "Growth"],
    placement: "Southeast",
    price: "₹899",
    oldPrice: "₹1,799",
    image: "/images/products/lucky-bamboo.jpg",
    description: "Sacred bamboo plant for prosperity and positive growth",
    path: "/shop/lucky-bamboo"
  },
  {
    id: 2,
    name: "Crystal Wind Chimes",
    type: "Wind Chime",
    element: "Metal",
    purpose: ["Protection", "Harmony"],
    placement: "Northwest",
    price: "₹1,299",
    oldPrice: "₹2,599",
    image: "/images/products/wind-chimes.jpg",
    description: "Crystal wind chimes for protection and harmonious energy",
    path: "/shop/crystal-wind-chimes"
  },
  {
    id: 3,
    name: "Money Tree Plant",
    type: "Plant",
    element: "Wood",
    purpose: ["Wealth", "Abundance"],
    placement: "Southeast",
    price: "₹1,199",
    oldPrice: "₹2,399",
    image: "/images/products/money-tree.jpg",
    description: "Money tree plant for wealth attraction and abundance",
    path: "/shop/money-tree-plant"
  },
  {
    id: 4,
    name: "Feng Shui Mirror",
    type: "Mirror",
    element: "Metal",
    purpose: ["Protection", "Reflection"],
    placement: "Entrance",
    price: "₹799",
    oldPrice: "₹1,599",
    image: "/images/products/feng-shui-mirror.jpg",
    description: "Sacred mirror for protection and positive energy reflection",
    path: "/shop/feng-shui-mirror"
  },
  {
    id: 5,
    name: "Jade Plant",
    type: "Plant",
    element: "Earth",
    purpose: ["Prosperity", "Health"],
    placement: "East",
    price: "₹699",
    oldPrice: "₹1,399",
    image: "/images/products/jade-plant.jpg",
    description: "Jade plant for prosperity and good health energy",
    path: "/shop/jade-plant"
  },
  {
    id: 6,
    name: "Crystal Geodes",
    type: "Crystal",
    element: "Earth",
    purpose: ["Grounding", "Stability"],
    placement: "Center",
    price: "₹1,599",
    oldPrice: "₹3,199",
    image: "/images/products/crystal-geodes.jpg",
    description: "Natural crystal geodes for grounding and stability",
    path: "/shop/crystal-geodes"
  },
  {
    id: 7,
    name: "Water Fountain",
    type: "Water Feature",
    element: "Water",
    purpose: ["Flow", "Abundance"],
    placement: "North",
    price: "₹2,999",
    oldPrice: "₹5,999",
    image: "/images/products/water-fountain.jpg",
    description: "Flowing water fountain for abundance and positive flow",
    path: "/shop/water-fountain"
  },
  {
    id: 8,
    name: "Salt Lamps",
    type: "Lamp",
    element: "Earth",
    purpose: ["Purification", "Balance"],
    placement: "Any Room",
    price: "₹1,499",
    oldPrice: "₹2,999",
    image: "/images/products/salt-lamps.jpg",
    description: "Himalayan salt lamps for purification and energy balance",
    path: "/shop/salt-lamps"
  },
  {
    id: 9,
    name: "Feng Shui Crystals",
    type: "Crystal",
    element: "Earth",
    purpose: ["Healing", "Protection"],
    placement: "Various",
    price: "₹899",
    oldPrice: "₹1,799",
    image: "/images/products/feng-shui-crystals.jpg",
    description: "Assorted feng shui crystals for healing and protection",
    path: "/shop/feng-shui-crystals"
  },
  {
    id: 10,
    name: "Bamboo Flute",
    type: "Musical",
    element: "Wood",
    purpose: ["Harmony", "Protection"],
    placement: "Above Door",
    price: "₹599",
    oldPrice: "₹1,199",
    image: "/images/products/bamboo-flute.jpg",
    description: "Bamboo flute for harmony and protection above doorways",
    path: "/shop/bamboo-flute"
  },
  {
    id: 11,
    name: "Feng Shui Coins",
    type: "Coins",
    element: "Metal",
    purpose: ["Wealth", "Prosperity"],
    placement: "Wallet/Purse",
    price: "₹299",
    oldPrice: "₹599",
    image: "/images/products/feng-shui-coins.jpg",
    description: "Ancient feng shui coins for wealth and prosperity",
    path: "/shop/feng-shui-coins"
  },
  {
    id: 12,
    name: "Energy Crystals Set",
    type: "Crystal Set",
    element: "Earth",
    purpose: ["Balance", "Harmony"],
    placement: "Various",
    price: "₹1,999",
    oldPrice: "₹3,999",
    image: "/images/products/energy-crystals.jpg",
    description: "Complete set of energy crystals for balance and harmony",
    path: "/shop/energy-crystals-set"
  }
];

// Filter Options
const filterOptions: Record<FilterCategory, string[]> = {
  type: ["Plant", "Wind Chime", "Mirror", "Crystal", "Water Feature", "Lamp", "Musical", "Coins", "Crystal Set"],
  element: ["Wood", "Metal", "Earth", "Water", "Fire"],
  purpose: ["Prosperity", "Growth", "Protection", "Harmony", "Wealth", "Abundance", "Health", "Grounding", "Stability", "Flow", "Purification", "Balance", "Healing", "Reflection"],
  placement: ["Southeast", "Northwest", "East", "Entrance", "Center", "North", "Any Room", "Various", "Above Door", "Wallet/Purse"]
};

export default function FengShuiPage() {
  const [filters, setFilters] = useState<Filters>({
    type: [],
    element: [],
    purpose: [],
    placement: []
  });
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const typeMatch = filters.type.length === 0 || filters.type.includes(product.type);
    const elementMatch = filters.element.length === 0 || filters.element.includes(product.element);
    const purposeMatch = filters.purpose.length === 0 || product.purpose.some(p => filters.purpose.includes(p));
    const placementMatch = filters.placement.length === 0 || filters.placement.includes(product.placement);

    return typeMatch && elementMatch && purposeMatch && placementMatch;
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
      type: [],
      element: [],
      purpose: [],
      placement: []
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
          Harmonize your space with ancient wisdom
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
          Discover authentic feng shui items that bring balance, harmony, and positive energy to your space. 
          Each item is carefully selected to enhance the flow of chi and create a harmonious environment.
        </p>

        {/* Filters Section */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-12 border border-gray-100">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-gray-700 font-medium">Filter by:</span>
            
            {/* Type Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Type
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'type' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'type' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.type.map(type => (
                  <label key={type} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={() => toggleFilter('type', type)}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Element Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'element' ? null : 'element')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Element
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'element' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'element' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.element.map(element => (
                  <label key={element} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.element.includes(element)}
                      onChange={() => toggleFilter('element', element)}
                      className="mr-2"
                    />
                    {element}
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

            {/* Placement Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'placement' ? null : 'placement')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Placement
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'placement' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'placement' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.placement.map(placement => (
                  <label key={placement} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.placement.includes(placement)}
                      onChange={() => toggleFilter('placement', placement)}
                      className="mr-2"
                    />
                    {placement}
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
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  {/* Product Image with Zoom Animation */}
                  <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Product Info - Minimal Design */}
                  <div className="p-6 text-center">
                    <h3 className="font-serif font-bold text-gray-900 mb-3 text-xl">
                      {product.name}
                    </h3>
                    
                    {/* Price - Centered */}
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="font-bold text-gray-900 text-lg">{product.price}</span>
                      <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
                    </div>

                    {/* Add to Cart Button - Simple */}
                    <UniversalCartButton
                      productId={product.id.toString()}
                      productName={product.name}
                      price={Number(product.price.replace(/[^\d]/g, ''))}
                      image={product.image}
                      className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors"
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