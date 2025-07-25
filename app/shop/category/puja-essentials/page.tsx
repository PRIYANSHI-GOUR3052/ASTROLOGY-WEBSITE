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
  material: string;
  purpose: string[];
  size: string;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  path: string;
}

interface Filters {
  type: string[];
  material: string[];
  purpose: string[];
  size: string[];
}

type FilterCategory = keyof Filters;

// Product Banner Component with Images
const ProductBanner = () => (
  <div className="w-full bg-gradient-to-r from-orange-50 via-red-50 to-yellow-50 py-8 md:py-12 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Full Height Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src="/images/products/puja-essentials-banner.jpg"
            alt="Sacred Puja Essentials Collection"
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
            Puja Essentials
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
            Sacred items and essentials for complete spiritual rituals and ceremonies
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="px-3 py-1 bg-orange-100/50 text-orange-800 rounded-full text-xs font-medium border border-orange-200/50">
              Sacred Rituals
            </span>
            <span className="px-3 py-1 bg-red-100/50 text-red-800 rounded-full text-xs font-medium border border-red-200/50">
              Divine Worship
            </span>
            <span className="px-3 py-1 bg-yellow-100/50 text-yellow-800 rounded-full text-xs font-medium border border-yellow-200/50">
              Spiritual Ceremonies
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
    name: "Sacred Kumkum",
    type: "Tilak",
    material: "Natural",
    purpose: ["Tilak", "Forehead Marking"],
    size: "50g",
    price: "₹199",
    oldPrice: "₹399",
    image: "/images/products/kumkum.jpg",
    description: "Sacred red powder for tilak and spiritual marking",
    path: "/shop/sacred-kumkum"
  },
  {
    id: 2,
    name: "Chandan Paste",
    type: "Tilak",
    material: "Sandalwood",
    purpose: ["Tilak", "Cooling"],
    size: "100g",
    price: "₹299",
    oldPrice: "₹599",
    image: "/images/products/chandan.jpg",
    description: "Pure sandalwood paste for tilak and cooling effect",
    path: "/shop/chandan-paste"
  },
  {
    id: 3,
    name: "Sacred Agarbatti",
    type: "Incense",
    material: "Natural Herbs",
    purpose: ["Purification", "Meditation"],
    size: "Pack of 12",
    price: "₹149",
    oldPrice: "₹299",
    image: "/images/products/agarbatti.jpg",
    description: "Sacred incense sticks for purification and meditation",
    path: "/shop/sacred-agarbatti"
  },
  {
    id: 4,
    name: "Ghee Diya",
    type: "Lamp",
    material: "Brass",
    purpose: ["Aarti", "Lighting"],
    size: "Medium",
    price: "₹399",
    oldPrice: "₹799",
    image: "/images/products/ghee-diya.jpg",
    description: "Traditional brass diya for ghee lighting and aarti",
    path: "/shop/ghee-diya"
  },
  {
    id: 5,
    name: "Sacred Akshat",
    type: "Rice",
    material: "Rice",
    purpose: ["Blessings", "Offerings"],
    size: "500g",
    price: "₹99",
    oldPrice: "₹199",
    image: "/images/products/akshat.jpg",
    description: "Sacred rice for blessings and spiritual offerings",
    path: "/shop/sacred-akshat"
  },
  {
    id: 6,
    name: "Panchamrit",
    type: "Sacred Mixture",
    material: "Natural",
    purpose: ["Prasad", "Blessings"],
    size: "250ml",
    price: "₹199",
    oldPrice: "₹399",
    image: "/images/products/panchamrit.jpg",
    description: "Sacred five-ingredient mixture for prasad and blessings",
    path: "/shop/panchamrit"
  },
  {
    id: 7,
    name: "Sacred Bell",
    type: "Bell",
    material: "Brass",
    purpose: ["Aarti", "Purification"],
    size: "Medium",
    price: "₹299",
    oldPrice: "₹599",
    image: "/images/products/bell.jpg",
    description: "Sacred brass bell for aarti and spiritual purification",
    path: "/shop/sacred-bell"
  },
  {
    id: 8,
    name: "Camphor Tablets",
    type: "Camphor",
    material: "Natural",
    purpose: ["Aarti", "Purification"],
    size: "Pack of 50",
    price: "₹79",
    oldPrice: "₹159",
    image: "/images/products/camphor.jpg",
    description: "Pure camphor tablets for aarti and purification",
    path: "/shop/camphor-tablets"
  },
  {
    id: 9,
    name: "Sacred Thread",
    type: "Thread",
    material: "Cotton",
    purpose: ["Protection", "Blessings"],
    size: "10m",
    price: "₹149",
    oldPrice: "₹299",
    image: "/images/products/thread.jpg",
    description: "Sacred cotton thread for protection and blessings",
    path: "/shop/sacred-thread"
  },
  {
    id: 10,
    name: "Betel Leaves",
    type: "Leaves",
    material: "Natural",
    purpose: ["Offerings", "Blessings"],
    size: "Pack of 21",
    price: "₹129",
    oldPrice: "₹259",
    image: "/images/products/betel-leaves.jpg",
    description: "Fresh betel leaves for sacred offerings and blessings",
    path: "/shop/betel-leaves"
  },
  {
    id: 11,
    name: "Sacred Flowers",
    type: "Flowers",
    material: "Natural",
    purpose: ["Offerings", "Decoration"],
    size: "Mixed Pack",
    price: "₹199",
    oldPrice: "₹399",
    image: "/images/products/flowers.jpg",
    description: "Sacred flowers for offerings and altar decoration",
    path: "/shop/sacred-flowers"
  },
  {
    id: 12,
    name: "Sacred Water",
    type: "Water",
    material: "Holy Water",
    purpose: ["Purification", "Blessings"],
    size: "500ml",
    price: "₹99",
    oldPrice: "₹199",
    image: "/images/products/holy-water.jpg",
    description: "Sacred water for purification and spiritual cleansing",
    path: "/shop/sacred-water"
  }
];

// Filter Options
const filterOptions = {
  type: ["Tilak", "Incense", "Lamp", "Rice", "Sacred Mixture", "Bell", "Camphor", "Thread", "Leaves", "Flowers", "Water"],
  material: ["Natural", "Sandalwood", "Natural Herbs", "Brass", "Cotton", "Holy Water"],
  purpose: ["Tilak", "Forehead Marking", "Cooling", "Purification", "Meditation", "Aarti", "Lighting", "Blessings", "Offerings", "Prasad", "Protection", "Decoration"],
  size: ["50g", "100g", "Pack of 12", "Medium", "500g", "250ml", "Pack of 50", "10m", "Pack of 21", "Mixed Pack", "500ml"]
} as const;

export default function PujaEssentialsPage() {
  const [filters, setFilters] = useState<Filters>({
    type: [],
    material: [],
    purpose: [],
    size: []
  });
  const [activeDropdown, setActiveDropdown] = useState<FilterCategory | null>(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const typeMatch = filters.type.length === 0 || filters.type.includes(product.type);
    const materialMatch = filters.material.length === 0 || filters.material.includes(product.material);
    const purposeMatch = filters.purpose.length === 0 || product.purpose.some(p => filters.purpose.includes(p));
    const sizeMatch = filters.size.length === 0 || filters.size.includes(product.size);

    return typeMatch && materialMatch && purposeMatch && sizeMatch;
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
      material: [],
      purpose: [],
      size: []
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
          Complete your sacred rituals with divine essentials
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
          Discover authentic puja essentials that complete your spiritual ceremonies and rituals. 
          Each item is carefully selected to enhance your divine worship and spiritual practices.
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