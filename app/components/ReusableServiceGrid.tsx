'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReusableServiceCard, Service } from './ReusableServiceCard';
import { cn } from '@/lib/utils';

interface ReusableServiceGridProps {
  services: Service[];
  viewMode?: 'grid' | 'list';
  columns?: 2 | 3 | 4 | 5;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  loading?: boolean;
  loadingCount?: number;
  emptyMessage?: string;
  onServiceClick?: (service: Service) => void;
  onBookmarkClick?: (service: Service) => void;
  onCompareClick?: (service: Service) => void;
  // Backwards compatibility (ignored in new simplified layout):
  showControls?: boolean;
  showViewToggle?: boolean;
  showSortOptions?: boolean;
  showFilterOptions?: boolean;
  showSearchBar?: boolean;
  initialViewMode?: 'grid' | 'list';
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateAction?: React.ReactNode;
}

// Loading skeleton component (mirrors product grid style)
const ServiceCardSkeleton = ({ viewMode }: { viewMode: 'grid' | 'list' }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
    {viewMode === 'grid' ? (
      <>
        <div className="aspect-[4/3] bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="flex justify-between items-center">
            <div className="h-5 bg-gray-200 rounded w-20" />
            <div className="h-8 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </>
    ) : (
      <div className="flex">
        <div className="w-48 h-48 bg-gray-200" />
        <div className="flex-1 p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="mt-auto flex justify-between items-center">
            <div className="h-5 bg-gray-200 rounded w-20" />
            <div className="h-8 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </div>
    )}
  </div>
);

export const ReusableServiceGrid = ({
  services,
  viewMode = 'grid',
  columns = 4,
  gap = 'md',
  className,
  loading = false,
  loadingCount = 8,
  emptyMessage = 'No services found',
  onServiceClick,
  onBookmarkClick,
  onCompareClick,
}: ReusableServiceGridProps) => {

  const getGridClasses = () => {
    if (viewMode === 'list') return 'grid grid-cols-1 gap-4';

    const columnClasses: Record<number, string> = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    };
    const gapClasses: Record<string, string> = {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
    };
    return `grid ${columnClasses[columns]} ${gapClasses[gap]}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className={cn(getGridClasses(), className)}>
        {Array.from({ length: loadingCount }).map((_, i) => (
          <ServiceCardSkeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  // Empty state
  if (!services || services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-32 h-32 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h18M3 10h18M3 16h18" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Services Found</h3>
        <p className="text-gray-600 max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn(getGridClasses(), className)}>
      <AnimatePresence mode="popLayout">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
          >
            <ReusableServiceCard
              service={service}
              viewMode={viewMode}
              priority={index < 4}
              onBookmarkClick={onBookmarkClick}
              onCompareClick={onCompareClick}
              onQuickViewClick={onServiceClick}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ReusableServiceGrid;
