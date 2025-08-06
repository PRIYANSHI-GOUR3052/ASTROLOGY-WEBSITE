'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export const usePerformanceMonitor = () => {
  const startTimeRef = useRef<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    // Track navigation performance
    const measureNavigation = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const navigation = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          const ttfb = navigation.responseStart - navigation.fetchStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart;

          // Log performance metrics (can be sent to analytics)
          if (process.env.NODE_ENV === 'development') {
            console.log(`%c🚀 Navigation Performance for ${pathname}`, 'color: #10b981; font-weight: bold');
            console.log(`Load Time: ${loadTime.toFixed(2)}ms`);
            console.log(`TTFB: ${ttfb.toFixed(2)}ms`);
            console.log(`DOM Content Loaded: ${domContentLoaded.toFixed(2)}ms`);
          }
        }
      }
    };

    // Measure page load time
    startTimeRef.current = performance.now();
    
    // Use requestIdleCallback if available, otherwise setTimeout
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(measureNavigation);
    } else {
      setTimeout(measureNavigation, 0);
    }

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTimeRef.current;
      
      if (process.env.NODE_ENV === 'development' && renderTime > 0) {
        console.log(`%c⚡ Page render time: ${renderTime.toFixed(2)}ms`, 'color: #8b5cf6');
      }
    };
  }, [pathname]);

  // Measure component render time
  const measureRender = (componentName: string) => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`%c📊 ${componentName} render: ${renderTime.toFixed(2)}ms`, 'color: #f59e0b');
      }
    };
  };

  return { measureRender };
};
