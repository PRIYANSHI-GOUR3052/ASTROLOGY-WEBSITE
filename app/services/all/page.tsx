"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Grid3X3, List } from 'lucide-react';
import { ReusableServiceGrid } from '@/app/components/service-cards';
import { services } from '@/data/services';
import { AnimatedStars } from '@/app/components/AnimatedStars';
import { MysticBackground } from '@/app/components/MysticBackground';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Filter option builders (similar structure to products page)
const buildFilterOptions = () => {
  const categories = [...new Set(services.map(s => s.category).filter(Boolean))].sort();
  const consultationTypes = ['Video Call', 'Phone Call', 'In Person'];
  const priceRanges = ['Under ₹500', '₹500 - ₹1000', '₹1000 - ₹2000', 'Above ₹2000'];
  const rating = ['4+ Stars', '3+ Stars', '2+ Stars', '1+ Stars'];
  return { category: categories, consultationType: consultationTypes, priceRange: priceRanges, rating };
};

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name' | 'rating';
type ViewMode = 'grid' | 'list';

// Sidebar component similar to products page
const FilterSidebar = ({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
  activeFiltersCount,
  isOpen,
  onClose
}: {
  filters: Record<string, string[]>;
  filterOptions: Record<string, string[]>;
  onFilterChange: (category: string, value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
  isOpen: boolean;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
        />
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-50 lg:relative lg:w-full lg:shadow-none lg:z-auto"
        >
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="hidden lg:flex items-center justify-between mb-6">
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
            {activeFiltersCount > 0 && (
              <button
                onClick={onClearFilters}
                className="mt-6 w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors lg:hidden"
              >
                Clear all filters
              </button>
            )}
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default function AllServicesPage() {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const servicesPerPage = 12;

  const filterOptions = useMemo(() => buildFilterOptions(), []);

  // Initialize filters
  useEffect(() => {
    const initial: Record<string, string[]> = {};
    Object.keys(filterOptions).forEach(k => { initial[k] = []; });
    setFilters(initial);
  }, [filterOptions]);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filteredAndSortedServices = useMemo(() => {
    const result = services.filter(service => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!(
          service.title.toLowerCase().includes(q) ||
          service.description.toLowerCase().includes(q) ||
          service.category?.toLowerCase().includes(q) ||
          service.tags?.some(tag => tag.toLowerCase().includes(q))
        )) return false;
      }
      // Category
      if (filters.category?.length) {
        if (!filters.category.includes(service.category || '')) return false;
      }
      // Consultation type
      if (filters.consultationType?.length) {
        const ct = service.consultationType?.toLowerCase() || '';
        const matches = filters.consultationType.some(opt => {
          const o = opt.toLowerCase();
            if (o.includes('video')) return ct.includes('video');
            if (o.includes('phone')) return ct.includes('phone') || ct.includes('audio');
            if (o.includes('person')) return ct.includes('person');
            return false;
        });
        if (!matches) return false;
      }
      // Price range
      if (filters.priceRange?.length) {
        const price = service.price;
        const prMatch = filters.priceRange.some(range => {
          switch (range) {
            case 'Under ₹500': return price < 500;
            case '₹500 - ₹1000': return price >= 500 && price <= 1000;
            case '₹1000 - ₹2000': return price >= 1000 && price <= 2000;
            case 'Above ₹2000': return price > 2000;
            default: return true;
          }
        });
        if (!prMatch) return false;
      }
      // Rating
      if (filters.rating?.length) {
        const ratingMatch = filters.rating.some(r => {
          const min = parseInt(r.charAt(0));
          return (service.rating || 0) >= min;
        });
        if (!ratingMatch) return false;
      }
      return true;
    });

    // Sort (copy)
    const sorted = [...result];
    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price); break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price); break;
      case 'name':
        sorted.sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      default:
        break;
    }
    return sorted;
  }, [filters, searchQuery, sortOption]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedServices.length / servicesPerPage) || 1;
  const paginatedServices = filteredAndSortedServices.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );

  const toggleFilter = (category: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter(v => v !== value)
        : [...(prev[category] || []), value]
    }));
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    const cleared: Record<string, string[]> = {};
    Object.keys(filterOptions).forEach(k => { cleared[k] = []; });
    setFilters(cleared);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const getActiveFiltersCount = () => Object.values(filters).reduce((s, arr) => s + arr.length, 0);

  return (
  <div className="min-h-screen bg-gray-50">
      <AnimatedStars />
      <MysticBackground>
    <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-normal text-gray-900 mb-4 font-playfair">
              All Spiritual Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 font-playfair">
              Discover our complete collection of spiritual services designed to guide you on your journey of self-discovery and enlightenment. From ancient Vedic wisdom to modern spiritual practices.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">{services.length}+</div>
                <div className="text-sm text-gray-600">Services Available</div>
              </div>
              <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">50+</div>
                <div className="text-sm text-gray-600">Expert Astrologers</div>
              </div>
              <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">10k+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                  <div className="text-2xl font-bold text-green-800">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-0 py-0">
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

              {/* Mobile Sidebar */}
              <FilterSidebar
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={toggleFilter}
                onClearFilters={clearAllFilters}
                activeFiltersCount={getActiveFiltersCount()}
                isOpen={showFilters}
                onClose={() => setShowFilters(false)}
              />

              {/* Services Section */}
              <div className="flex-1">
                {/* Controls Card */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                  </div>

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
                      <span className="text-gray-600">{filteredAndSortedServices.length} services found</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* View Toggle */}
                      <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={cn('p-2 rounded-md transition-colors', viewMode === 'grid' ? 'bg-white shadow-sm text-green-700' : 'text-gray-600 hover:text-gray-800')}
                        >
                          <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={cn('p-2 rounded-md transition-colors', viewMode === 'list' ? 'bg-white shadow-sm text-green-700' : 'text-gray-600 hover:text-gray-800')}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Sort */}
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="text-gray-600 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent bg-white"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="name">Name: A to Z</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {getActiveFiltersCount() > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Active filters:</span>
                        {Object.entries(filters).map(([category, values]) => values.map(value => (
                          <span key={`${category}-${value}`} className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                            {value}
                            <button onClick={() => toggleFilter(category, value)} className="ml-2 text-green-700 hover:text-green-900">
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        )))}
                        <button onClick={clearAllFilters} className="text-sm text-gray-500 hover:text-gray-700 underline">Clear all</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Services Grid/List */}
                <ReusableServiceGrid
                  services={paginatedServices}
                  viewMode={viewMode}
                  columns={4}
                  loading={loading}
                  loadingCount={12}
                  className="max-w-none"
                  emptyMessage="Try adjusting your search or filter criteria to find the right service for you."
                />

                {/* No Results */}
                {filteredAndSortedServices.length === 0 && !loading && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
                    <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                    <button onClick={clearAllFilters} className="bg-green-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-900 transition-colors">
                      Clear all filters
                    </button>
                  </motion.div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={cn('px-4 py-2 rounded-lg transition-colors', currentPage === page ? 'bg-green-800 text-white' : 'border border-gray-300 hover:bg-gray-50')}
                          >
                            {page}
                          </button>
                        );
                      } else if (page === currentPage - 3 || page === currentPage + 3) {
                        return <span key={page} className="px-2">...</span>;
                      }
                      return null;
                    })}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
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

          {/* CTA Section (kept minimal) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-24 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 font-playfair">Need Personalized Guidance?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">Connect with our expert astrologers for a personalized consultation tailored to your unique spiritual journey.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-green-800 hover:bg-green-900 text-white">Talk to Astrologer</Button>
              <Button size="lg" variant="outline" className="border-green-800 text-green-800 hover:bg-green-50">Book Free Consultation</Button>
            </div>
          </motion.div>
        </div>
      </MysticBackground>
    </div>
  );
}
