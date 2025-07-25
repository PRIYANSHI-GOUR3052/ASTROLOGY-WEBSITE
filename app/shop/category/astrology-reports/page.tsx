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
  duration: string;
  format: string;
  purpose: string[];
  pages: string;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  path: string;
}

interface Filters {
  type: string[];
  duration: string[];
  format: string[];
  purpose: string[];
}

type FilterCategory = keyof Filters;
type DropdownType = FilterCategory | null;

// Product Banner Component with Images
const ProductBanner = () => (
  <div className="w-full bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 py-8 md:py-12 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Full Height Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src="/images/products/astrology-reports-banner.jpg"
            alt="Comprehensive Astrology Reports Collection"
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
            Astrology Reports
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
            Detailed cosmic insights and personalized guidance for your life journey
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            <span className="px-3 py-1 bg-teal-100/50 text-teal-800 rounded-full text-xs font-medium border border-teal-200/50">
              Cosmic Insights
            </span>
            <span className="px-3 py-1 bg-cyan-100/50 text-cyan-800 rounded-full text-xs font-medium border border-cyan-200/50">
              Life Guidance
            </span>
            <span className="px-3 py-1 bg-blue-100/50 text-blue-800 rounded-full text-xs font-medium border border-blue-200/50">
              Personalized
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
    name: "Birth Chart Analysis",
    type: "Birth Chart",
    duration: "Lifetime",
    format: "PDF Report",
    purpose: ["Life Purpose", "Personality Analysis"],
    pages: "25-30 pages",
    price: "₹1,999",
    oldPrice: "₹3,999",
    image: "/images/products/birth-chart-report.jpg",
    description: "Comprehensive birth chart analysis revealing your life purpose and personality traits",
    path: "/shop/birth-chart-analysis"
  },
  {
    id: 2,
    name: "Career Guidance Report",
    type: "Career",
    duration: "1 Year",
    format: "PDF Report",
    purpose: ["Career Path", "Professional Growth"],
    pages: "20-25 pages",
    price: "₹1,499",
    oldPrice: "₹2,999",
    image: "/images/products/career-report.jpg",
    description: "Detailed career guidance based on your astrological chart and planetary positions",
    path: "/shop/career-guidance-report"
  },
  {
    id: 3,
    name: "Love & Relationship Report",
    type: "Relationship",
    duration: "6 Months",
    format: "PDF Report",
    purpose: ["Love Life", "Compatibility"],
    pages: "18-22 pages",
    price: "₹1,299",
    oldPrice: "₹2,599",
    image: "/images/products/relationship-report.jpg",
    description: "In-depth analysis of your love life and relationship compatibility",
    path: "/shop/love-relationship-report"
  },
  {
    id: 4,
    name: "Marriage Compatibility Report",
    type: "Compatibility",
    duration: "Lifetime",
    format: "PDF Report",
    purpose: ["Marriage", "Partner Compatibility"],
    pages: "30-35 pages",
    price: "₹2,499",
    oldPrice: "₹4,999",
    image: "/images/products/marriage-report.jpg",
    description: "Comprehensive marriage compatibility analysis for couples",
    path: "/shop/marriage-compatibility-report"
  },
  {
    id: 5,
    name: "Health & Wellness Report",
    type: "Health",
    duration: "1 Year",
    format: "PDF Report",
    purpose: ["Health", "Wellness"],
    pages: "15-20 pages",
    price: "₹1,199",
    oldPrice: "₹2,399",
    image: "/images/products/health-report.jpg",
    description: "Astrological insights into your health and wellness patterns",
    path: "/shop/health-wellness-report"
  },
  {
    id: 6,
    name: "Financial Prosperity Report",
    type: "Finance",
    duration: "1 Year",
    format: "PDF Report",
    purpose: ["Wealth", "Financial Success"],
    pages: "20-25 pages",
    price: "₹1,799",
    oldPrice: "₹3,599",
    image: "/images/products/finance-report.jpg",
    description: "Detailed analysis of your financial prospects and wealth opportunities",
    path: "/shop/financial-prosperity-report"
  },
  {
    id: 7,
    name: "Education & Learning Report",
    type: "Education",
    duration: "2 Years",
    format: "PDF Report",
    purpose: ["Education", "Learning"],
    pages: "18-22 pages",
    price: "₹1,399",
    oldPrice: "₹2,799",
    image: "/images/products/education-report.jpg",
    description: "Guidance for educational choices and learning potential",
    path: "/shop/education-learning-report"
  },
  {
    id: 8,
    name: "Business Success Report",
    type: "Business",
    duration: "1 Year",
    format: "PDF Report",
    purpose: ["Business", "Entrepreneurship"],
    pages: "25-30 pages",
    price: "₹2,199",
    oldPrice: "₹4,399",
    image: "/images/products/business-report.jpg",
    description: "Astrological guidance for business success and entrepreneurship",
    path: "/shop/business-success-report"
  },
  {
    id: 9,
    name: "Child Astrology Report",
    type: "Child",
    duration: "Until 18 Years",
    format: "PDF Report",
    purpose: ["Child Development", "Parenting"],
    pages: "30-35 pages",
    price: "₹2,999",
    oldPrice: "₹5,999",
    image: "/images/products/child-report.jpg",
    description: "Comprehensive analysis for child's development and parenting guidance",
    path: "/shop/child-astrology-report"
  },
  {
    id: 10,
    name: "Remedial Measures Report",
    type: "Remedies",
    duration: "Lifetime",
    format: "PDF Report",
    purpose: ["Remedies", "Solutions"],
    pages: "20-25 pages",
    price: "₹1,599",
    oldPrice: "₹3,199",
    image: "/images/products/remedies-report.jpg",
    description: "Personalized remedial measures and solutions for life challenges",
    path: "/shop/remedial-measures-report"
  },
  {
    id: 11,
    name: "Yearly Horoscope Report",
    type: "Horoscope",
    duration: "1 Year",
    format: "PDF Report",
    purpose: ["Yearly Forecast", "Predictions"],
    pages: "40-45 pages",
    price: "₹2,799",
    oldPrice: "₹5,599",
    image: "/images/products/yearly-report.jpg",
    description: "Detailed yearly horoscope with month-wise predictions and guidance",
    path: "/shop/yearly-horoscope-report"
  },
  {
    id: 12,
    name: "Life Path Report",
    type: "Life Path",
    duration: "Lifetime",
    format: "PDF Report",
    purpose: ["Life Purpose", "Spiritual Growth"],
    pages: "35-40 pages",
    price: "₹3,499",
    oldPrice: "₹6,999",
    image: "/images/products/life-path-report.jpg",
    description: "Comprehensive life path analysis and spiritual growth guidance",
    path: "/shop/life-path-report"
  }
];

// Filter Options
const filterOptions = {
  type: ["Birth Chart", "Career", "Relationship", "Compatibility", "Health", "Finance", "Education", "Business", "Child", "Remedies", "Horoscope", "Life Path"],
  duration: ["Lifetime", "1 Year", "6 Months", "2 Years", "Until 18 Years"],
  format: ["PDF Report", "Printed Report", "Digital Report"],
  purpose: ["Life Purpose", "Personality Analysis", "Career Path", "Professional Growth", "Love Life", "Compatibility", "Marriage", "Partner Compatibility", "Health", "Wellness", "Wealth", "Financial Success", "Education", "Learning", "Business", "Entrepreneurship", "Child Development", "Parenting", "Remedies", "Solutions", "Yearly Forecast", "Predictions", "Spiritual Growth"]
} as const;

export default function AstrologyReportsPage() {
  const [filters, setFilters] = useState<Filters>({
    type: [],
    duration: [],
    format: [],
    purpose: []
  });
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const typeMatch = filters.type.length === 0 || filters.type.includes(product.type);
    const durationMatch = filters.duration.length === 0 || filters.duration.includes(product.duration);
    const formatMatch = filters.format.length === 0 || filters.format.includes(product.format);
    const purposeMatch = filters.purpose.length === 0 || product.purpose.some(p => filters.purpose.includes(p));

    return typeMatch && durationMatch && formatMatch && purposeMatch;
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
      duration: [],
      format: [],
      purpose: []
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
          Cosmic insights for your life journey
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
          Discover comprehensive astrology reports that provide deep insights into your personality, 
          life path, and future possibilities. Each report is personalized based on your birth chart and planetary positions.
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

            {/* Duration Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'duration' ? null : 'duration')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Duration
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'duration' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'duration' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.duration.map(duration => (
                  <label key={duration} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.duration.includes(duration)}
                      onChange={() => toggleFilter('duration', duration)}
                      className="mr-2"
                    />
                    {duration}
                  </label>
                ))}
              </div>
            </div>

            {/* Format Filter */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'format' ? null : 'format')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Format
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'format' ? 'rotate-180' : ''}`} />
              </button>
              <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === 'format' ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                {filterOptions.format.map(format => (
                  <label key={format} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.format.includes(format)}
                      onChange={() => toggleFilter('format', format)}
                      className="mr-2"
                    />
                    {format}
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