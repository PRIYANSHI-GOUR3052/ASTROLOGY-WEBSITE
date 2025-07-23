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

// Product Banner Component with Images
const ProductBanner = () => (
  <div className="w-full bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 py-8 md:py-12 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Full Height Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src="/images/products/yantras-banner.jpg"
            alt="Sacred Yantras & Plates Collection"
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
            Yantras & Plates
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
            Sacred geometric patterns and divine plates for spiritual energy and protection
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="px-3 py-1 bg-indigo-100/50 text-indigo-800 rounded-full text-xs font-medium border border-indigo-200/50">
              Sacred Geometry
            </span>
            <span className="px-3 py-1 bg-purple-100/50 text-purple-800 rounded-full text-xs font-medium border border-purple-200/50">
              Divine Energy
            </span>
            <span className="px-3 py-1 bg-blue-100/50 text-blue-800 rounded-full text-xs font-medium border border-blue-200/50">
              Protection
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Products Data
const products = [
  {
    id: 1,
    name: "Sri Yantra",
    type: "Yantra",
    deity: "Goddess Lakshmi",
    material: "Copper",
    purpose: ["Wealth & Prosperity", "Spiritual Growth"],
    size: "3x3 inches",
    price: "₹2,999",
    oldPrice: "₹5,999",
    image: "/images/products/sri-yantra.jpg",
    description: "Sacred Sri Yantra for wealth, prosperity and spiritual awakening",
    path: "/shop/sri-yantra"
  },
  {
    id: 2,
    name: "Kali Yantra",
    type: "Yantra",
    deity: "Goddess Kali",
    material: "Copper",
    purpose: ["Protection", "Destruction of Negativity"],
    size: "3x3 inches",
    price: "₹2,499",
    oldPrice: "₹4,999",
    image: "/images/products/kali-yantra.jpg",
    description: "Powerful Kali Yantra for protection and removing obstacles",
    path: "/shop/kali-yantra"
  },
  {
    id: 3,
    name: "Ganesh Yantra",
    type: "Yantra",
    deity: "Lord Ganesh",
    material: "Copper",
    purpose: ["Success", "Removing Obstacles"],
    size: "3x3 inches",
    price: "₹2,199",
    oldPrice: "₹4,399",
    image: "/images/products/ganesh-yantra.jpg",
    description: "Ganesh Yantra for success and removing all obstacles",
    path: "/shop/ganesh-yantra"
  },
  {
    id: 4,
    name: "Durga Yantra",
    type: "Yantra",
    deity: "Goddess Durga",
    material: "Copper",
    purpose: ["Protection", "Courage"],
    size: "3x3 inches",
    price: "₹2,299",
    oldPrice: "₹4,599",
    image: "/images/products/durga-yantra.jpg",
    description: "Durga Yantra for protection and inner strength",
    path: "/shop/durga-yantra"
  },
  {
    id: 5,
    name: "Hanuman Yantra",
    type: "Yantra",
    deity: "Lord Hanuman",
    material: "Copper",
    purpose: ["Strength", "Devotion"],
    size: "3x3 inches",
    price: "₹1,999",
    oldPrice: "₹3,999",
    image: "/images/products/hanuman-yantra.jpg",
    description: "Hanuman Yantra for strength, courage and devotion",
    path: "/shop/hanuman-yantra"
  },
  {
    id: 6,
    name: "Shiva Yantra",
    type: "Yantra",
    deity: "Lord Shiva",
    material: "Copper",
    purpose: ["Spiritual Growth", "Meditation"],
    size: "3x3 inches",
    price: "₹2,799",
    oldPrice: "₹5,599",
    image: "/images/products/shiva-yantra.jpg",
    description: "Shiva Yantra for spiritual awakening and meditation",
    path: "/shop/shiva-yantra"
  },
  {
    id: 7,
    name: "Vishnu Yantra",
    type: "Yantra",
    deity: "Lord Vishnu",
    material: "Copper",
    purpose: ["Preservation", "Peace"],
    size: "3x3 inches",
    price: "₹2,399",
    oldPrice: "₹4,799",
    image: "/images/products/vishnu-yantra.jpg",
    description: "Vishnu Yantra for preservation and inner peace",
    path: "/shop/vishnu-yantra"
  },
  {
    id: 8,
    name: "Saraswati Yantra",
    type: "Yantra",
    deity: "Goddess Saraswati",
    material: "Copper",
    purpose: ["Knowledge", "Wisdom"],
    size: "3x3 inches",
    price: "₹2,199",
    oldPrice: "₹4,399",
    image: "/images/products/saraswati-yantra.jpg",
    description: "Saraswati Yantra for knowledge, wisdom and learning",
    path: "/shop/saraswati-yantra"
  },
  {
    id: 9,
    name: "Kuber Yantra",
    type: "Yantra",
    deity: "Lord Kuber",
    material: "Copper",
    purpose: ["Wealth", "Financial Success"],
    size: "3x3 inches",
    price: "₹2,599",
    oldPrice: "₹5,199",
    image: "/images/products/kuber-yantra.jpg",
    description: "Kuber Yantra for wealth and financial prosperity",
    path: "/shop/kuber-yantra"
  },
  {
    id: 10,
    name: "Navagraha Yantra",
    type: "Yantra",
    deity: "Nine Planets",
    material: "Copper",
    purpose: ["Planetary Remedies", "Astrological Benefits"],
    size: "4x4 inches",
    price: "₹3,999",
    oldPrice: "₹7,999",
    image: "/images/products/navagraha-yantra.jpg",
    description: "Navagraha Yantra for all planetary remedies and benefits",
    path: "/shop/navagraha-yantra"
  },
  {
    id: 11,
    name: "Sacred Copper Plate",
    type: "Plate",
    deity: "Universal",
    material: "Copper",
    purpose: ["General Worship", "Energy Purification"],
    size: "6x6 inches",
    price: "₹1,499",
    oldPrice: "₹2,999",
    image: "/images/products/copper-plate.jpg",
    description: "Sacred copper plate for general worship and energy purification",
    path: "/shop/copper-plate"
  },
  {
    id: 12,
    name: "Silver Puja Plate",
    type: "Plate",
    deity: "Universal",
    material: "Silver",
    purpose: ["Puja", "Offerings"],
    size: "5x5 inches",
    price: "₹2,999",
    oldPrice: "₹5,999",
    image: "/images/products/silver-plate.jpg",
    description: "Pure silver plate for puja and sacred offerings",
    path: "/shop/silver-plate"
  }
];

// Filter Options
const filterOptions = {
  type: ["Yantra", "Plate"],
  deity: ["Goddess Lakshmi", "Goddess Kali", "Lord Ganesh", "Goddess Durga", "Lord Hanuman", "Lord Shiva", "Lord Vishnu", "Goddess Saraswati", "Lord Kuber", "Nine Planets", "Universal"],
  material: ["Copper", "Silver", "Brass"],
  purpose: ["Wealth & Prosperity", "Spiritual Growth", "Protection", "Destruction of Negativity", "Success", "Removing Obstacles", "Courage", "Strength", "Devotion", "Meditation", "Preservation", "Peace", "Knowledge", "Wisdom", "Financial Success", "Planetary Remedies", "Astrological Benefits", "General Worship", "Energy Purification", "Puja", "Offerings"]
};

export default function YantrasPlatesPage() {
  const [filters, setFilters] = useState({
    type: [],
    deity: [],
    material: [],
    purpose: []
  });
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const typeMatch = filters.type.length === 0 || filters.type.includes(product.type);
    const deityMatch = filters.deity.length === 0 || filters.deity.includes(product.deity);
    const materialMatch = filters.material.length === 0 || filters.material.includes(product.material);
    const purposeMatch = filters.purpose.length === 0 || product.purpose.some(p => filters.purpose.includes(p));

    return typeMatch && deityMatch && materialMatch && purposeMatch;
  });

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      type: [],
      deity: [],
      material: [],
      purpose: []
    });
  };

  const getActiveFiltersCount = () => {
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
          Sacred geometric patterns of divine energy
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
          Discover sacred yantras and divine plates that channel cosmic energy and provide spiritual protection. 
          Each yantra carries the power of specific deities and cosmic forces for your spiritual journey.
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

            {/* Deity Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'deity' ? null : 'deity')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Deity
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'deity' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'deity' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.deity.map(deity => (
                  <label key={deity} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.deity.includes(deity)}
                      onChange={() => toggleFilter('deity', deity)}
                      className="mr-2"
                    />
                    {deity}
                  </label>
                ))}
              </div>
            </div>

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
                values.map(value => (
                  <span
                    key={`${category}-${value}`}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {value}
                    <button
                      onClick={() => toggleFilter(category, value)}
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
                          className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-full"
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
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        path: product.path
                      }}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    />
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