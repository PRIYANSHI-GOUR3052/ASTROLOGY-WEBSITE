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
        rating: legacy.rating,
        reviewsCount: legacy.reviewsCount,
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

  // Generate a compact pagination range (1 ... n)
  const paginationNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxButtons = 7;
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    const showLeftEllipsis = currentPage > 4;
    const showRightEllipsis = currentPage < totalPages - 3;
    const firstPage = 1;
    const lastPage = totalPages;

    pages.push(firstPage);
    if (showLeftEllipsis) pages.push('…');

    const start = showLeftEllipsis ? currentPage - 1 : 2;
    const end = showRightEllipsis ? currentPage + 1 : totalPages - 1;

    for (let i = start; i <= end; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }
    if (showRightEllipsis) pages.push('…');
    pages.push(lastPage);
    return pages;
  }, [currentPage, totalPages]);

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
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-xl px-2 py-1 border border-gray-200 shadow-sm">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-inner"
                  aria-label="Previous page"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                {paginationNumbers.map((p, idx) => (
                  typeof p === 'number' ? (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`min-w-9 h-9 px-3 rounded-md border text-sm font-medium transition-colors ${p === currentPage ? 'bg-black text-white border-black' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 hover:text-black'}`}
                      aria-current={p === currentPage ? 'page' : undefined}
                    >
                      {p}
                    </button>
                  ) : (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">{p}</span>
                  )
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-inner"
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
