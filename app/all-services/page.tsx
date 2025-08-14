'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, Users, Video, Phone, Calendar } from 'lucide-react';
import { ReusableServiceGrid } from '@/app/components/service-cards';
import { services } from '@/data/services';
import { AnimatedStars } from '@/app/components/AnimatedStars';
import { MysticBackground } from '@/app/components/MysticBackground';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Service categories for filtering
const serviceCategories = [
  { id: 'all', name: 'All Services', icon: Star },
  { id: 'vedic-astrology', name: 'Vedic Astrology', icon: Star },
  { id: 'horoscope', name: 'Horoscope', icon: Calendar },
  { id: 'consultation', name: 'Consultation', icon: Users },
  { id: 'remedies', name: 'Remedies', icon: Clock },
  { id: 'spiritual-guidance', name: 'Spiritual Guidance', icon: Star },
];

// Consultation types for filtering
const consultationTypes = [
  { id: 'all', name: 'All Types', icon: Video },
  { id: 'video-call', name: 'Video Call', icon: Video },
  { id: 'phone-call', name: 'Phone Call', icon: Phone },
  { id: 'in-person', name: 'In Person', icon: Users },
];

// Price ranges for filtering
const priceRanges = [
  { id: 'all', name: 'All Prices', min: 0, max: Infinity },
  { id: 'under-500', name: 'Under ₹500', min: 0, max: 500 },
  { id: '500-1000', name: '₹500 - ₹1000', min: 500, max: 1000 },
  { id: '1000-2000', name: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { id: 'above-2000', name: 'Above ₹2000', min: 2000, max: Infinity },
];

export default function AllServicesPage() {
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedConsultationType, setSelectedConsultationType] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filter services based on selected criteria
  useEffect(() => {
    let filtered = services;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => 
        service.category?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        service.tags?.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }

    // Filter by consultation type
    if (selectedConsultationType !== 'all') {
      filtered = filtered.filter(service => {
        const consultationType = service.consultationType?.toLowerCase();
        switch (selectedConsultationType) {
          case 'video-call':
            return consultationType?.includes('video');
          case 'phone-call':
            return consultationType?.includes('phone') || consultationType?.includes('audio');
          case 'in-person':
            return consultationType?.includes('person');
          default:
            return true;
        }
      });
    }

    // Filter by price range
    if (selectedPriceRange !== 'all') {
      const priceRange = priceRanges.find(range => range.id === selectedPriceRange);
      if (priceRange) {
        filtered = filtered.filter(service => 
          service.price >= priceRange.min && service.price <= priceRange.max
        );
      }
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredServices(filtered);
  }, [selectedCategory, selectedConsultationType, selectedPriceRange, searchQuery]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedConsultationType('all');
    setSelectedPriceRange('all');
    setSearchQuery('');
  };

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedConsultationType !== 'all',
    selectedPriceRange !== 'all',
    searchQuery !== ''
  ].filter(Boolean).length;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
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
                <div className="text-2xl font-bold text-purple-600">{services.length}+</div>
                <div className="text-sm text-gray-600">Services Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Expert Astrologers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">10k+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for services, astrologers, or spiritual guidance..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Filter Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-2",
                    showFilters && "bg-purple-50 border-purple-300"
                  )}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1 bg-purple-100 text-purple-700">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearAllFilters}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <div className="text-sm text-gray-600">
                Showing {filteredServices.length} of {services.length} services
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6"
              >
                {/* Category Filter */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-gray-900">Category</h3>
                    <div className="space-y-2">
                      {serviceCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                            selectedCategory === category.id
                              ? "bg-purple-100 text-purple-700"
                              : "hover:bg-gray-100 text-gray-700"
                          )}
                        >
                          <category.icon className="w-4 h-4" />
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Consultation Type Filter */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-gray-900">Consultation Type</h3>
                    <div className="space-y-2">
                      {consultationTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedConsultationType(type.id)}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                            selectedConsultationType === type.id
                              ? "bg-purple-100 text-purple-700"
                              : "hover:bg-gray-100 text-gray-700"
                          )}
                        >
                          <type.icon className="w-4 h-4" />
                          {type.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Price Range Filter */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 text-gray-900">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <button
                          key={range.id}
                          onClick={() => setSelectedPriceRange(range.id)}
                          className={cn(
                            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                            selectedPriceRange === range.id
                              ? "bg-purple-100 text-purple-700"
                              : "hover:bg-gray-100 text-gray-700"
                          )}
                        >
                          {range.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ReusableServiceGrid
              services={filteredServices}
              loading={loading}
              loadingCount={12}
              showControls={true}
              showViewToggle={true}
              showSortOptions={true}
              initialViewMode="grid"
              emptyStateTitle="No Services Found"
              emptyStateDescription="Try adjusting your filters or search criteria to find the perfect spiritual service for you."
              emptyStateAction={
                <Button 
                  onClick={clearAllFilters}
                  className="bg-purple-600 text-white hover:bg-purple-700"
                >
                  Clear Filters
                </Button>
              }
              className="max-w-none"
            />
          </motion.div>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
          >
            <h2 className="text-3xl font-bold mb-4 font-playfair">
              Need Personalized Guidance?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Connect with our expert astrologers for a personalized consultation tailored to your unique spiritual journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Talk to Astrologer
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                Book Free Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </MysticBackground>
    </div>
  );
}
