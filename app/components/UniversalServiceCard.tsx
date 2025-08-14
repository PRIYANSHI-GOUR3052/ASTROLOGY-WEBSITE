'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface UniversalServiceCardProps {
  image: string;
  title: string;
  description: string;
  badge?: string;
  href: string;
  index?: number;
  price?: string;
  originalPrice?: string;
  onAddToCart?: () => void;
}

export function UniversalServiceCard({ 
  image, 
  title, 
  description, 
  badge, 
  href, 
  index = 0,
  price,
  originalPrice,
  onAddToCart
}: UniversalServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="block group h-full" style={{ textDecoration: 'none' }}>
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-auto flex flex-col group-hover:scale-[1.02] group-hover:shadow-2xl duration-200 bg-[#f7f5ed]">
          {/* Service/Product Image */}
          <Link href={href} className="block">
            <motion.div
              className="relative w-full h-[280px] z-0"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover object-center"
                style={{ opacity: 0.92 }}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Badge */}
              {badge && (
                <span 
                  className="absolute top-4 left-4 bg-[#e74c3c] text-white text-xs px-3 py-1 rounded-full z-10 shadow" 
                  style={{ 
                    fontFamily: 'Inter, sans-serif', 
                    fontWeight: 600, 
                    letterSpacing: '0.01em' 
                  }}
                >
                  {badge}
                </span>
              )}
              
              {/* Overlay for text */}
              <div className="absolute inset-0 z-10 w-full px-6 py-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end min-h-[120px]">
                <h3 
                  className="text-xl mb-2 text-white text-left" 
                  style={{ 
                    fontFamily: 'Playfair Display, serif', 
                    fontWeight: 400 
                  }}
                >
                  {title}
                </h3>
                <p 
                  className="text-sm text-white text-left" 
                  style={{ 
                    fontFamily: 'Playfair Display, serif', 
                    fontWeight: 400 
                  }}
                >
                  {description}
                </p>
              </div>
            </motion.div>
          </Link>
          
          {/* Whitespace and Price/Cart Section */}
          {(price || onAddToCart) && (
            <div className="px-6 py-4 bg-white">
              <div className="flex items-center justify-between">
                {/* Price Section */}
                <div className="flex items-center gap-2">
                  {price && (
                    <span 
                      className="text-lg font-bold text-[#23244a]" 
                      style={{ 
                        fontFamily: 'Playfair Display, serif', 
                        fontWeight: 600 
                      }}
                    >
                      {price}
                    </span>
                  )}
                  {originalPrice && originalPrice !== price && (
                    <span 
                      className="text-sm text-gray-400 line-through" 
                      style={{ 
                        fontFamily: 'Playfair Display, serif' 
                      }}
                    >
                      {originalPrice}
                    </span>
                  )}
                </div>
                
                {/* Add to Cart Button */}
                {onAddToCart && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddToCart();
                    }}
                    className="bg-[#23244a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1a1b35] transition-colors duration-200"
                    style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 500
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default UniversalServiceCard;
