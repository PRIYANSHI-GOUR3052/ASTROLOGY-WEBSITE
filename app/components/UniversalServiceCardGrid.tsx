'use client';

import { UniversalServiceCard } from './UniversalServiceCard';

interface Service {
  slug: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
  price?: string;
  originalPrice?: string;
}

interface UniversalServiceCardGridProps {
  services: Service[];
  className?: string;
  maxCards?: number;
  gridCols?: string;
}

export function UniversalServiceCardGrid({ 
  services, 
  className = '', 
  maxCards = 3,
  gridCols = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
}: UniversalServiceCardGridProps) {
  const displayServices = services.slice(0, maxCards);

  const handleAddToCart = (service: Service) => {
    // Add to cart logic here
    console.log('Adding to cart:', service.title);
    // You can implement cart logic here
  };

  return (
    <div className={`grid ${gridCols} gap-8 mb-16 ${className}`}>
      {displayServices.map((service, index) => (
        <UniversalServiceCard
          key={service.slug}
          image={service.image}
          title={service.title}
          description={service.description}
          badge={service.badge}
          href={`/services/${service.slug}`}
          index={index}
          price={service.price}
          originalPrice={service.originalPrice}
          onAddToCart={() => handleAddToCart(service)}
        />
      ))}
    </div>
  );
}

export default UniversalServiceCardGrid;
