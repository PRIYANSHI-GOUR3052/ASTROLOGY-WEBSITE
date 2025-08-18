'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { ReusableServiceCard, Service as ReusableService } from './ReusableServiceCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Incoming (legacy) service shape accepted by this showcase.
 * We map it to the richer ReusableService interface needed by ReusableServiceCard.
 */
interface LegacyServiceItem {
  slug: string;
  title: string;
  description: string;
  image: string; // main image
  badge?: string; // maps to isPopular / isNew heuristics
  price?: number;
  originalPrice?: number;
  rating?: number;
  reviewsCount?: number;
}

interface ServiceShowcaseProps {
  services: (LegacyServiceItem | ReusableService)[];
  title: string;
  subtitle?: string;
  pageSize?: number; // number of cards per row page (default 6)
  autoScrollOnPageChange?: boolean; // if true, scrolls showcase into view on pagination (default false)
}

export default function ServiceShowcase({
  services,
  title,
  subtitle,
  pageSize = 6,
  autoScrollOnPageChange = false,
}: ServiceShowcaseProps) {
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Normalize incoming services to ReusableService shape expected by ReusableServiceCard
  const normalized: ReusableService[] = useMemo(() => {
    if (!services || services.length === 0) return [];
    return services.map((s) => {
      // If it already looks like a ReusableService (has id & price & description) just cast
      const candidate = s as ReusableService;
      if (candidate.id && typeof candidate.price === 'number') {
        return candidate;
      }
      const legacy = s as LegacyServiceItem;
      return {
        id: legacy.slug, // derive id from slug
        slug: legacy.slug,
        title: legacy.title,
        description: legacy.description,
        shortDescription: legacy.description?.slice(0, 120),
        price: legacy.price ?? 0,
        originalPrice: legacy.originalPrice,
        discount: legacy.originalPrice && legacy.price && legacy.originalPrice > legacy.price
          ? `${Math.round(((legacy.originalPrice - (legacy.price ?? 0)) / legacy.originalPrice) * 100)}%`
          : undefined,
        images: legacy.image ? [legacy.image] : ['/images/placeholder.jpg'],
        isPopular: legacy.badge?.toLowerCase() === 'popular',
        isNew: legacy.badge?.toLowerCase() === 'new',
        rating: legacy.rating || 4.5, // Default rating if not provided
        reviewsCount: legacy.reviewsCount || Math.floor(Math.random() * 50) + 10, // Random reviews if not provided
        duration: '45 mins', // Default duration
        consultationType: 'Video Call', // Default consultation type
        availability: 'available' as const, // Default availability
      } as ReusableService;
    });
  }, [services]);

  const totalPages = Math.max(1, Math.ceil(normalized.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = normalized.slice(startIdx, startIdx + pageSize);

  const handlePageChange = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Optional scroll (disabled by default to avoid shifting user's viewport)
  useEffect(() => {
    if (autoScrollOnPageChange) {
      containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage, autoScrollOnPageChange]);

  // Guard: nothing to show - moved after hooks to comply with rules of hooks
  if (!services || services.length === 0) return null;

  return (
    <div className="mb-12" ref={containerRef}>
      {/* Heading with top-right pagination */}
      <div className="mb-4 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-3xl">
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                className="text-lg md:text-xl text-gray-600"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {subtitle}
              </p>
            )}
            <div className="mt-2 text-sm text-gray-500 font-medium">
              Page {currentPage} of {totalPages}
            </div>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-sm"
                  aria-label="Previous page"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-sm"
                  aria-label="Next page"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Single row of cards */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`page-${currentPage}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="flex gap-6 overflow-hidden"
        >
          {pageItems.map((service) => (
            <div key={service.id} className="w-72 flex-shrink-0">
              <ReusableServiceCard service={service} viewMode="grid" />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
