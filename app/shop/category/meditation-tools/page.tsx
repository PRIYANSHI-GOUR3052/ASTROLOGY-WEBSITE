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
  <div className="w-full bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 py-8 md:py-12 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Full Height Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src="/images/products/meditation-tools-banner.jpg"
            alt="Sacred Meditation Tools Collection"
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
            Meditation Tools
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
            Sacred tools and instruments to deepen your meditation practice and spiritual journey
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="px-3 py-1 bg-violet-100/50 text-violet-800 rounded-full text-xs font-medium border border-violet-200/50">
              Inner Peace
            </span>
            <span className="px-3 py-1 bg-purple-100/50 text-purple-800 rounded-full text-xs font-medium border border-purple-200/50">
              Mindfulness
            </span>
            <span className="px-3 py-1 bg-indigo-100/50 text-indigo-800 rounded-full text-xs font-medium border border-indigo-200/50">
              Spiritual Growth
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
    name: "Meditation Cushion",
    type: "Seating",
    material: "Cotton",
    purpose: ["Comfort", "Posture"],
    size: "Standard",
    price: "₹1,299",
    oldPrice: "₹2,599",
    image: "/images/products/meditation-cushion.jpg",
    description: "Comfortable meditation cushion for proper posture and comfort",
    path: "/shop/meditation-cushion"
  },
  {
    id: 2,
    name: "Singing Bowl",
    type: "Sound",
    material: "Crystal",
    purpose: ["Healing", "Focus"],
    size: "Medium",
    price: "₹2,999",
    oldPrice: "₹5,999",
    image: "/images/products/singing-bowl.jpg",
    description: "Crystal singing bowl for healing vibrations and focus",
    path: "/shop/singing-bowl"
  },
  {
    id: 3,
    name: "Meditation Mat",
    type: "Seating",
    material: "Natural Fiber",
    purpose: ["Comfort", "Grounding"],
    size: "Large",
    price: "₹899",
    oldPrice: "₹1,799",
    image: "/images/products/meditation-mat.jpg",
    description: "Natural fiber meditation mat for comfort and grounding",
    path: "/shop/meditation-mat"
  },
  {
    id: 4,
    name: "Mala Beads",
    type: "Prayer Beads",
    material: "Rudraksha",
    purpose: ["Japa", "Focus"],
    size: "108 Beads",
    price: "₹1,199",
    oldPrice: "₹2,399",
    image: "/images/products/mala-beads.jpg",
    description: "Sacred Rudraksha mala beads for japa meditation",
    path: "/shop/mala-beads"
  },
  {
    id: 5,
    name: "Incense Holder",
    type: "Accessory",
    material: "Brass",
    purpose: ["Aromatherapy", "Purification"],
    size: "Medium",
    price: "₹499",
    oldPrice: "₹999",
    image: "/images/products/incense-holder.jpg",
    description: "Brass incense holder for aromatherapy and purification",
    path: "/shop/incense-holder"
  },
  {
    id: 6,
    name: "Meditation Timer",
    type: "Timer",
    material: "Wood",
    purpose: ["Focus", "Discipline"],
    size: "Portable",
    price: "₹799",
    oldPrice: "₹1,599",
    image: "/images/products/meditation-timer.jpg",
    description: "Wooden meditation timer for focused practice",
    path: "/shop/meditation-timer"
  },
  {
    id: 7,
    name: "Eye Pillow",
    type: "Accessory",
    material: "Silk",
    purpose: ["Relaxation", "Focus"],
    size: "Standard",
    price: "₹399",
    oldPrice: "₹799",
    image: "/images/products/eye-pillow.jpg",
    description: "Silk eye pillow for deep relaxation and focus",
    path: "/shop/eye-pillow"
  },
  {
    id: 8,
    name: "Tibetan Bells",
    type: "Sound",
    material: "Brass",
    purpose: ["Awareness", "Mindfulness"],
    size: "Small",
    price: "₹699",
    oldPrice: "₹1,399",
    image: "/images/products/tibetan-bells.jpg",
    description: "Tibetan bells for mindfulness and awareness",
    path: "/shop/tibetan-bells"
  },
  {
    id: 9,
    name: "Meditation Blanket",
    type: "Comfort",
    material: "Wool",
    purpose: ["Warmth", "Comfort"],
    size: "Large",
    price: "₹1,599",
    oldPrice: "₹3,199",
    image: "/images/products/meditation-blanket.jpg",
    description: "Warm wool blanket for comfortable meditation",
    path: "/shop/meditation-blanket"
  },
  {
    id: 10,
    name: "Chakra Stones",
    type: "Crystal",
    material: "Natural Stones",
    purpose: ["Healing", "Balance"],
    size: "Set of 7",
    price: "₹1,899",
    oldPrice: "₹3,799",
    image: "/images/products/chakra-stones.jpg",
    description: "Seven chakra stones for healing and balance",
    path: "/shop/chakra-stones"
  },
  {
    id: 11,
    name: "Meditation Journal",
    type: "Writing",
    material: "Paper",
    purpose: ["Reflection", "Growth"],
    size: "A5",
    price: "₹299",
    oldPrice: "₹599",
    image: "/images/products/meditation-journal.jpg",
    description: "Sacred journal for meditation reflections and growth",
    path: "/shop/meditation-journal"
  },
  {
    id: 12,
    name: "Meditation Bench",
    type: "Seating",
    material: "Wood",
    purpose: ["Posture", "Comfort"],
    size: "Adjustable",
    price: "₹2,499",
    oldPrice: "₹4,999",
    image: "/images/products/meditation-bench.jpg",
    description: "Adjustable wooden meditation bench for perfect posture",
    path: "/shop/meditation-bench"
  }
];

// Filter Options
const filterOptions = {
  type: ["Seating", "Sound", "Prayer Beads", "Accessory", "Timer", "Comfort", "Crystal", "Writing"],
  material: ["Cotton", "Crystal", "Natural Fiber", "Rudraksha", "Brass", "Wood", "Silk", "Wool", "Natural Stones", "Paper"],
  purpose: ["Comfort", "Posture", "Healing", "Focus", "Grounding", "Japa", "Aromatherapy", "Purification", "Discipline", "Relaxation", "Awareness", "Mindfulness", "Warmth", "Balance", "Reflection", "Growth"],
  size: ["Standard", "Medium", "Large", "108 Beads", "Portable", "Small", "Set of 7", "A5", "Adjustable"]
};

export default function MeditationToolsPage() {
  const [filters, setFilters] = useState({
    type: [],
    material: [],
    purpose: [],
    size: []
  });
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const typeMatch = filters.type.length === 0 || filters.type.includes(product.type);
    const materialMatch = filters.material.length === 0 || filters.material.includes(product.material);
    const purposeMatch = filters.purpose.length === 0 || product.purpose.some(p => filters.purpose.includes(p));
    const sizeMatch = filters.size.length === 0 || filters.size.includes(product.size);

    return typeMatch && materialMatch && purposeMatch && sizeMatch;
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
      material: [],
      purpose: [],
      size: []
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
          Deepen your meditation practice with sacred tools
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
          Discover authentic meditation tools that enhance your practice and spiritual journey. 
          Each tool is carefully selected to support mindfulness, focus, and inner peace.
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

            {/* Size Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'size' ? null : 'size')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Size
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'size' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'size' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.size.map(size => (
                  <label key={size} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.size.includes(size)}
                      onChange={() => toggleFilter('size', size)}
                      className="mr-2"
                    />
                    {size}
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
                      product={{
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        path: product.path
                      }}
                      className="w-full bg-gray-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors"
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