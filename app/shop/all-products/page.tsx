"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, X, Filter, Grid3X3, List, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { ReusableProductGrid } from "@/app/components/product-cards";

// Types
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  slug: string;
  image?: string;
  category?: string;
  rating?: number;
}

interface Filters {
  [key: string]: string[];
}

type FilterCategory = string;
type DropdownType = FilterCategory | null;
type ViewMode = "grid" | "list";
type SortOption = "featured" | "price-low" | "price-high" | "name" | "newest";

// Extract filter options from products
const getFilterOptions = () => {
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))].sort();
  const priceRanges = ["Under ₹1000", "₹1000 - ₹3000", "₹3000 - ₹5000", "Above ₹5000"];
  const ratings = ["4+ Stars", "3+ Stars", "2+ Stars", "1+ Stars"];
  
  return {
    category: categories,
    priceRange: priceRanges,
    rating: ratings
  };
};

// Helper function to get price value from price string
const getPriceValue = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[^\d]/g, '')) || 0;
};

// Banner Component
const AllProductsBanner = () => (
  <div className="relative w-full bg-gradient-to-br from-indigo-900 via-green-900 to-emerald-900 py-16 md:py-24 overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-amber-300/10 to-yellow-300/10 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-green-300/10 to-emerald-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Section - Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light mb-6 text-white leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Discover Sacred
            <span className="block bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
              Treasures
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          >
            Explore our complete collection of authentic spiritual products, sacred gemstones, 
            and mystical artifacts. Each item is carefully selected and energized for your 
            spiritual journey and cosmic alignment.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {["Authentic", "Energized", "Premium Quality", "Fast Delivery"].map((tag, index) => (
              <span
                key={tag}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Section - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg"
              alt="Sacred Spiritual Collection"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
          </div>
          
          {/* Floating elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-2xl shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.div>
          
          <motion.div
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-xl shadow-lg"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            🔮
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Filter Sidebar Component
const FilterSidebar = ({ 
  filters, 
  filterOptions, 
  onFilterChange, 
  onClearFilters, 
  activeFiltersCount,
  isOpen,
  onClose 
}: {
  filters: Filters;
  filterOptions: Record<string, string[]>;
  onFilterChange: (category: string, value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('category');
  
  const tabLabels = {
    category: 'Category',
    priceRange: 'Price Range',
    rating: 'Rating'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 lg:hidden filter-backdrop"
            style={{ zIndex: 2147483647 }}
            onClick={onClose}
          />
          {/* Desktop sidebar */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={onClearFilters}
                    className="text-sm text-green-800 hover:text-green-900 font-medium"
                  >
                    Clear all ({activeFiltersCount})
                  </button>
                )}
              </div>
              <div className="space-y-6">
                {Object.entries(filterOptions).map(([category, options]) => (
                  <div key={category} className="border-b border-gray-200 pb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4 capitalize">
                      {category.replace(/([A-Z])/g, ' $1')}
                    </h4>
                    <div className="space-y-2">
                      {options.map(option => (
                        <label key={option} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters[category]?.includes(option) || false}
                            onChange={() => onFilterChange(category, option)}
                            className="mr-3 h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-600"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-xl h-[50vh] lg:hidden filter-modal"
            style={{ zIndex: 2147483647 }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors bg-gray-50 border border-gray-300"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-200 bg-gray-50">
                {Object.keys(filterOptions).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`flex-1 py-3 px-2 text-xs font-medium text-center transition-colors ${
                      activeTab === category
                        ? "text-green-800 bg-white border-b-2 border-green-800"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    {tabLabels[category as keyof typeof tabLabels]}
                  </button>
                ))}
              </div>
              
              {/* Filter Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                  {filterOptions[activeTab]?.map(option => (
                    <label key={option} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={activeTab}
                        checked={filters[activeTab]?.includes(option) || false}
                        onChange={() => onFilterChange(activeTab, option)}
                        className="mr-3 h-4 w-4 text-green-700 border-gray-300 focus:ring-green-600"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Footer with action buttons */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex gap-3">
                  <button
                    onClick={onClearFilters}
                    className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function AllProductsPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const filterOptions = getFilterOptions();

  // Initialize filters
  useEffect(() => {
    const initialFilters: Filters = {};
    Object.keys(filterOptions).forEach(key => {
      initialFilters[key] = [];
    });
    setFilters(initialFilters);
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter(product => {
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        if (!product.title.toLowerCase().includes(searchLower) &&
            !product.description.toLowerCase().includes(searchLower) &&
            !product.category?.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Category filter
      if (filters.category?.length > 0) {
        if (!filters.category.includes(product.category || '')) {
          return false;
        }
      }

      // Price range filter
      if (filters.priceRange?.length > 0) {
        const price = getPriceValue(product.price);
        const matchesPriceRange = filters.priceRange.some(range => {
          switch (range) {
            case "Under ₹1000":
              return price < 1000;
            case "₹1000 - ₹3000":
              return price >= 1000 && price <= 3000;
            case "₹3000 - ₹5000":
              return price >= 3000 && price <= 5000;
            case "Above ₹5000":
              return price > 5000;
            default:
              return true;
          }
        });
        if (!matchesPriceRange) return false;
      }

      // Rating filter
      if (filters.rating?.length > 0) {
        const matchesRating = filters.rating.some(ratingFilter => {
          const minRating = parseInt(ratingFilter.charAt(0));
          return (product.rating || 0) >= minRating;
        });
        if (!matchesRating) return false;
      }

      return true;
    });

    // Sort products (create a copy to avoid mutating the filtered array)
    const sorted = [...filtered];
    switch (sortOption) {
      case "price-low":
        sorted.sort((a, b) => getPriceValue(a.price) - getPriceValue(b.price));
        break;
      case "price-high":
        sorted.sort((a, b) => getPriceValue(b.price) - getPriceValue(a.price));
        break;
      case "name":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "newest":
        // Assuming newer products have higher IDs
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // Featured/default sorting
        break;
    }

    return sorted;
  }, [searchQuery, filters, sortOption]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const toggleFilter = (category: FilterCategory, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter(item => item !== value)
        : [...(prev[category] || []), value]
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearAllFilters = () => {
    const clearedFilters: Filters = {};
    Object.keys(filterOptions).forEach(key => {
      clearedFilters[key] = [];
    });
    setFilters(clearedFilters);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add global style to hide floating elements when modal is open */}
      {showFilters && (
        <style jsx global>{`
          [class*="chatbot"], 
          [id*="chatbot"], 
          [class*="chat"], 
          [id*="chat"],
          [class*="float"], 
          [id*="float"],
          [class*="scroll"], 
          [id*="scroll"],
          [class*="back-to-top"], 
          [id*="back-to-top"],
          .fixed:not(.filter-modal):not(.filter-backdrop) {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `}</style>
      )}
      
      {/* Banner */}
      <AllProductsBanner />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={toggleFilter}
                onClearFilters={clearAllFilters}
                activeFiltersCount={getActiveFiltersCount()}
                isOpen={true}
                onClose={() => {}}
              />
            </div>
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            filterOptions={filterOptions}
            onFilterChange={toggleFilter}
            onClearFilters={clearAllFilters}
            activeFiltersCount={getActiveFiltersCount()}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
          />

          {/* Products Section */}
          <div className="flex-1">
            {/* Search and Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              {/* Controls Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                    {getActiveFiltersCount() > 0 && (
                      <span className="bg-green-800 text-white text-xs px-2 py-1 rounded-full">
                        {getActiveFiltersCount()}
                      </span>
                    )}
                  </button>

                  {/* Results Count */}
                  <span className="text-gray-600">
                    {filteredAndSortedProducts.length} products found
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "grid" ? "bg-white shadow-sm text-green-700" : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === "list" ? "bg-white shadow-sm text-green-700" : "text-gray-600 hover:text-gray-800"
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sort Dropdown */}
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="text-gray-600 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {getActiveFiltersCount() > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Active filters:</span>
                    {Object.entries(filters).map(([category, values]) =>
                      values.map(value => (
                        <span
                          key={`${category}-${value}`}
                          className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                        >
                          {value}
                          <button
                            onClick={() => toggleFilter(category, value)}
                            className="ml-2 text-green-700 hover:text-green-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))
                    )}
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-gray-500 hover:text-gray-700 underline"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            <ReusableProductGrid
              products={paginatedProducts}
              viewMode={viewMode}
              columns={4}
              showQuickActions={true}
              showWishlist={true}
              showCompare={false}
              onWishlistClick={(product) => {
                console.log('Added to wishlist:', product.title);
                // Add wishlist logic here
              }}
              onQuickViewClick={(product) => {
                console.log('Quick view:', product.title);
                // Add quick view logic here
              }}
            />

            {/* No Results */}
            {filteredAndSortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-green-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-900 transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 2 && page <= currentPage + 2)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          currentPage === page
                            ? "bg-green-800 text-white"
                            : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 3 ||
                    page === currentPage + 3
                  ) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
