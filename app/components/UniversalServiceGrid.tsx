'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, Moon, Sun, Hash, Home, Map, Gem } from 'lucide-react';
import { UniversalCartButton } from '@/app/components/UniversalCartButton';

// Map of icon names to Lucide components
const iconMap = {
  'Sun': Sun,
  'Moon': Moon,
  'Star': Star,
  'Hash': Hash,
  'Home': Home,
  'Map': Map,
  'Gem': Gem,
  // Add more icons as needed
};

interface Service {
  id: string;
  slug: string;
  title_hi: string;
  title_en: string;
  description_hi: string;
  description_en: string;
  price: number;
  icon_type: string;
  icon_path: string;
}

export function UniversalServicesGrid({ className = '', compact = false }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Failed to load services. Please try again later.');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Function to render the appropriate icon
  const renderIcon = (iconType: string, iconPath: string | number | undefined) => {
    if (iconType === 'lucide' && typeof iconPath === 'string' && iconPath in iconMap) {
      const IconComponent = iconMap[iconPath as keyof typeof iconMap];
      return IconComponent ? <IconComponent className="w-12 h-12 text-sunburst-yellow" /> : null;
    } else if (iconType === 'svg') {
      return <img src={String(iconPath)} alt="Service icon" className="w-12 h-12" />;
    }
    return null;
  };

  if (loading) {
    return <div className="text-center py-8">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 ${className}`}>
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-celestial-cream/90 hover:bg-celestial-cream transition-colors shadow-lg hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                {renderIcon(service.icon_type, service.icon_path)}
              </div>
              <h2 className="text-2xl font-serif font-semibold mb-2 text-mystic-brown text-center">{service.title_hi}</h2>
              <h3 className="text-xl font-serif mb-4 text-mystic-brown text-center">{service.title_en}</h3>
              
              {!compact && (
                <>
                  <p className="text-mystic-brown/80 mb-2 text-center">{service.description_hi}</p>
                  <p className="text-mystic-brown/80 mb-4 text-center">{service.description_en}</p>
                </>
              )}
              
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-sunburst-yellow">₹{service.price}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <UniversalCartButton
                  productId={service.slug}
                  productName={`${service.title_hi} (${service.title_en})`}
                  price={service.price}
                  quantity={1}
                  isStone={false}
                  isService={true} 
                  carats={null}
                  className="bg-black text-white hover:bg-gray-800 flex-1"
                >
                  Add to Cart
                </UniversalCartButton>
                
                <UniversalCartButton
                  productId={service.slug}
                  productName={`${service.title_hi} (${service.title_en})`}
                  price={service.price}
                  quantity={1}
                  isStone={false}
                  isService={true} 
                  carats={null}
                  variant="buyNow"
                  className="bg-black text-white hover:bg-gray-800 flex-1"
                >
                  खरीदें (Buy Now)
                </UniversalCartButton>
              </div>
              
              <div className="text-center mt-4">
                <Button asChild className="bg-black text-white hover:bg-gray-800 flex-1">
                  <Link href={`/services/${service.slug}`}>
                    <span className="block">आप अभी बुक करें</span>
                    <span className="block">BOOK YOUR CALL NOW</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}