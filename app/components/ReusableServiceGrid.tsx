'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid, List, Filter, Search, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReusableServiceCard, Service } from './ReusableServiceCard';
import { cn } from '@/lib/utils';

interface ReusableServiceGridProps {
  services: Service[];
  className?: string;
  showControls?: boolean;
  showViewToggle?: boolean;
  showSortOptions?: boolean;
  showFilterOptions?: boolean;
  showSearchBar?: boolean;
  initialViewMode?: 'grid' | 'list';
  loading?: boolean;
  loadingCount?: number;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateAction?: React.ReactNode;
  onServiceClick?: (service: Service) => void;
  onBookmarkClick?: (service: Service) => void;
  onCompareClick?: (service: Service) => void;
}

// Loading skeleton component
const ServiceCardSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-48 h-48 sm:h-32 bg-gray-200" />
          <div className="flex-1 p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-200 rounded w-20" />
              <div className="h-8 bg-gray-200 rounded w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
};

export const ReusableServiceGrid = ({
  services,
  className,
  showControls = true,
  showViewToggle = true,
  showSortOptions = false,
  showFilterOptions = false,
  showSearchBar = false,
  initialViewMode = 'grid',
  loading = false,
  loadingCount = 8,
  emptyStateTitle = "No Services Found",
  emptyStateDescription = "Try adjusting your search criteria or explore our other services.",
  emptyStateAction,
  onServiceClick,
  onBookmarkClick,
  onCompareClick,
}: ReusableServiceGridProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'popularity'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter and sort services
  const filteredServices = services
    .filter(service => 
      searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = (a.rating || 0) - (b.rating || 0);
          break;
        case 'popularity':
          comparison = (a.ordersCount || 0) - (b.ordersCount || 0);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSortChange = (newSortBy: typeof sortBy) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        {showControls && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
              <div className="h-8 bg-gray-200 rounded w-20 animate-pulse" />
            </div>
          </div>
        )}
        
        <div className={cn(
          "grid gap-6",
          viewMode === 'grid' 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        )}>
          {Array.from({ length: loadingCount }).map((_, index) => (
            <ServiceCardSkeleton key={index} viewMode={viewMode} />
          ))}
        </div>
      </div>
    );
  }

  // Show empty state
  if (!loading && filteredServices.length === 0) {
    return (
      <div className={cn("space-y-6", className)}>
        {showControls && (
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {showSearchBar && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}
            
            <div className="flex gap-2">
              {showViewToggle && (
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "rounded-none",
                      viewMode === 'grid' ? "bg-purple-600 text-white" : ""
                    )}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "rounded-none",
                      viewMode === 'list' ? "bg-purple-600 text-white" : ""
                    )}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              {showSortOptions && (
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSortChange('price')}
                    className={cn(sortBy === 'price' ? "bg-purple-50 border-purple-300" : "")}
                  >
                    Price {sortBy === 'price' && <SortAsc className={cn("w-3 h-3 ml-1", sortOrder === 'desc' && "rotate-180")} />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSortChange('rating')}
                    className={cn(sortBy === 'rating' ? "bg-purple-50 border-purple-300" : "")}
                  >
                    Rating {sortBy === 'rating' && <SortAsc className={cn("w-3 h-3 ml-1", sortOrder === 'desc' && "rotate-180")} />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSortChange('popularity')}
                    className={cn(sortBy === 'popularity' ? "bg-purple-50 border-purple-300" : "")}
                  >
                    Popular {sortBy === 'popularity' && <SortAsc className={cn("w-3 h-3 ml-1", sortOrder === 'desc' && "rotate-180")} />}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{emptyStateTitle}</h3>
            <p className="text-gray-600 mb-4">{emptyStateDescription}</p>
            {emptyStateAction}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Controls */}
      {showControls && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            </span>
            
            {showSearchBar && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {showViewToggle && (
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "rounded-none",
                    viewMode === 'grid' ? "bg-purple-600 text-white" : ""
                  )}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "rounded-none",
                    viewMode === 'list' ? "bg-purple-600 text-white" : ""
                  )}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            {showSortOptions && (
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSortChange('price')}
                  className={cn(sortBy === 'price' ? "bg-purple-50 border-purple-300" : "")}
                >
                  Price {sortBy === 'price' && <SortAsc className={cn("w-3 h-3 ml-1", sortOrder === 'desc' && "rotate-180")} />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSortChange('rating')}
                  className={cn(sortBy === 'rating' ? "bg-purple-50 border-purple-300" : "")}
                >
                  Rating {sortBy === 'rating' && <SortAsc className={cn("w-3 h-3 ml-1", sortOrder === 'desc' && "rotate-180")} />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSortChange('popularity')}
                  className={cn(sortBy === 'popularity' ? "bg-purple-50 border-purple-300" : "")}
                >
                  Popular {sortBy === 'popularity' && <SortAsc className={cn("w-3 h-3 ml-1", sortOrder === 'desc' && "rotate-180")} />}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Services Grid */}
      <motion.div
        layout
        className={cn(
          "grid gap-6",
          viewMode === 'grid' 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, index) => (
            <ReusableServiceCard
              key={service.id}
              service={service}
              viewMode={viewMode}
              priority={index < 4}
              onBookmarkClick={onBookmarkClick}
              onCompareClick={onCompareClick}
              onQuickViewClick={onServiceClick}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ReusableServiceGrid;
