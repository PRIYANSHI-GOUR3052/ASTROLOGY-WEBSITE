'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReusableProductCard, Product } from './ReusableProductCard';
import { cn } from '@/lib/utils';

interface ReusableProductGridProps {
  products: Product[];
  viewMode?: 'grid' | 'list';
  columns?: 2 | 3 | 4 | 5;
  gap?: 'sm' | 'md' | 'lg';
  showQuickActions?: boolean;
  showWishlist?: boolean;
  showCompare?: boolean;
  className?: string;
  loading?: boolean;
  emptyMessage?: string;
  onWishlistClick?: (product: Product) => void;
  onCompareClick?: (product: Product) => void;
  onQuickViewClick?: (product: Product) => void;
}

export const ReusableProductGrid = ({
  products,
  viewMode = 'grid',
  columns = 4,
  gap = 'md',
  showQuickActions = true,
  showWishlist = true,
  showCompare = false,
  className,
  loading = false,
  emptyMessage = 'No products found',
  onWishlistClick,
  onCompareClick,
  onQuickViewClick,
}: ReusableProductGridProps) => {
  
  const getGridClasses = () => {
    if (viewMode === 'list') {
      return 'grid grid-cols-1 gap-4';
    }
    
    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
      5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    };
    
    const gapClasses = {
      sm: 'gap-3',
      md: 'gap-4',
      lg: 'gap-6',
    };
    
    return `grid ${columnClasses[columns]} ${gapClasses[gap]}`;
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className={cn('grid', getGridClasses(), className)}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-100 overflow-hidden"
          >
            {viewMode === 'grid' && (
              <>
                <div className="aspect-square bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
                  </div>
                </div>
              </>
            )}
            {viewMode === 'list' && (
              <div className="flex">
                <div className="w-48 h-48 bg-gray-200 animate-pulse" />
                <div className="flex-1 p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                  <div className="mt-auto flex justify-between items-center">
                    <div className="h-5 bg-gray-200 rounded animate-pulse w-20" />
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-32 h-32 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l3-3 3 3M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600 max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn(getGridClasses(), className)}>
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              ease: "easeOut"
            }}
          >
            <ReusableProductCard
              product={product}
              viewMode={viewMode}
              showQuickActions={showQuickActions}
              showWishlist={showWishlist}
              showCompare={showCompare}
              priority={index < 4} // Prioritize first 4 images
              onWishlistClick={onWishlistClick}
              onCompareClick={onCompareClick}
              onQuickViewClick={onQuickViewClick}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ReusableProductGrid;
