'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const RouteLoadingIndicator = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
    </div>
  );
};

export default RouteLoadingIndicator;
