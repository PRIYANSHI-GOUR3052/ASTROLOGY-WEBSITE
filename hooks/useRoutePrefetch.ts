'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface PrefetchOptions {
  priority?: 'high' | 'low';
  delay?: number;
}

export const useRoutePrefetch = () => {
  const router = useRouter();
  const prefetchedRoutes = useRef(new Set<string>());
  const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const prefetchRoute = (href: string, options: PrefetchOptions = {}) => {
    if (prefetchedRoutes.current.has(href)) {
      return; // Already prefetched
    }

    const { priority = 'low', delay = 0 } = options;

    // Clear existing timeout for this route
    const existingTimeout = timeouts.current.get(href);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    const timeout = setTimeout(() => {
      try {
        router.prefetch(href);
        prefetchedRoutes.current.add(href);
        timeouts.current.delete(href);
      } catch (error) {
        console.warn(`Failed to prefetch route: ${href}`, error);
      }
    }, delay);

    timeouts.current.set(href, timeout);
  };

  const prefetchAdminRoutes = () => {
    // Prefetch common admin routes with high priority
    const highPriorityRoutes = [
      '/admin/dashboard',
      '/admin/clients',
      '/admin/astrologers',
    ];

    // Prefetch with slight delays to avoid overwhelming the network
    highPriorityRoutes.forEach((route, index) => {
      prefetchRoute(route, { priority: 'high', delay: index * 100 });
    });

    // Prefetch less common routes with lower priority
    const lowPriorityRoutes = [
      '/admin/courses',
      '/admin/products/zodiac-sign',
      '/admin/products/categories',
      '/admin/products/attributes',
      '/admin/products/create',
      '/admin/stone',
      '/admin/services',
      '/admin/reviews',
      '/admin/settings',
    ];

    lowPriorityRoutes.forEach((route, index) => {
      prefetchRoute(route, { priority: 'low', delay: 1000 + index * 200 });
    });
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      timeouts.current.forEach(timeout => clearTimeout(timeout));
      timeouts.current.clear();
    };
  }, []);

  return { prefetchRoute, prefetchAdminRoutes };
};
