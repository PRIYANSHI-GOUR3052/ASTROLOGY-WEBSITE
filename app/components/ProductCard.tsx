'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { UniversalCartButton } from '@/app/components/UniversalCartButton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  slug: string;
  image?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
  showQuickActions?: boolean;
  showWishlist?: boolean;
  showCompare?: boolean;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  onWishlistClick?: (product: Product) => void;
  onCompareClick?: (product: Product) => void;
  onQuickViewClick?: (product: Product) => void;
}

// Helper function to get price value from price string
const getPriceValue = (priceStr: string): number => {
  return parseInt(priceStr.replace(/[^\d]/g, '')) || 0;
};

// Calculate discount percentage
const getDiscountPercentage = (price: string, originalPrice?: string): number => {
  if (!originalPrice) return 0;
  const currentPrice = getPriceValue(price);
  const oldPrice = getPriceValue(originalPrice);
  return oldPrice > 0 ? Math.round(((oldPrice - currentPrice) / oldPrice) * 100) : 0;
};

export const ProductCard = ({
  product,
  viewMode = 'grid',
  showQuickActions = true,
  showWishlist = true,
  showCompare = false,
  className,
  imageClassName,
  priority = false,
  onWishlistClick,
  onCompareClick,
  onQuickViewClick,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  
  const discount = getDiscountPercentage(product.price, product.originalPrice);
  const priceValue = getPriceValue(product.price);
  
  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    onWishlistClick?.(product);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCompareClick?.(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickViewClick?.(product);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={cn(
          "group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
            <Link href={`/shop/${product.slug}`}>
              <Image
                src={product.image || "/images/placeholder.jpg"}
                alt={product.title}
                fill
                className={cn(
                  "object-cover group-hover:scale-105 transition-transform duration-300",
                  imageClassName
                )}
                priority={priority}
                onLoadingComplete={() => setImageLoading(false)}
              />
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
            </Link>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {discount > 0 && (
                <Badge variant="destructive" className="text-xs font-medium">
                  {discount}% OFF
                </Badge>
              )}
              {product.isNew && (
                <Badge className="bg-green-500 hover:bg-green-600 text-xs font-medium">
                  New
                </Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-xs font-medium">
                  Featured
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            {showQuickActions && (
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {showWishlist && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                    onClick={handleWishlistClick}
                  >
                    <Heart className={cn("w-4 h-4", isWishlisted && "fill-red-500 text-red-500")} />
                  </Button>
                )}
                {showCompare && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                    onClick={handleCompareClick}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
                  onClick={handleQuickViewClick}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              {product.category && (
                <Badge variant="outline" className="mb-2 text-xs">
                  {product.category}
                </Badge>
              )}
              
              <Link href={`/shop/${product.slug}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                  {product.title}
                </h3>
              </Link>
              
              <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                {product.description}
              </p>
              
              {/* Rating */}
              {product.rating && (
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < Math.floor(product.rating!) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    ({product.rating}) {product.reviewCount && `• ${product.reviewCount} reviews`}
                  </span>
                </div>
              )}
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              
              <UniversalCartButton
                productId={product.id}
                productName={product.title}
                price={priceValue}
                image={product.image || "/images/placeholder.jpg"}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </UniversalCartButton>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (default)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        "group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden",
        className
      )}
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={product.image || "/images/placeholder.jpg"}
            alt={product.title}
            fill
            className={cn(
              "object-cover group-hover:scale-105 transition-transform duration-300",
              imageClassName
            )}
            priority={priority}
            onLoadingComplete={() => setImageLoading(false)}
          />
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge variant="destructive" className="text-xs font-medium">
              {discount}% OFF
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600 text-xs font-medium">
              New
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-xs font-medium">
              Featured
            </Badge>
          )}
        </div>

        {product.category && (
          <Badge 
            variant="secondary" 
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium"
          >
            {product.category}
          </Badge>
        )}

        {/* Quick Actions Overlay */}
        {showQuickActions && (
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              {showWishlist && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 p-0 bg-white/90 hover:bg-white"
                  onClick={handleWishlistClick}
                >
                  <Heart className={cn("w-4 h-4", isWishlisted && "fill-red-500 text-red-500")} />
                </Button>
              )}
              {showCompare && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 p-0 bg-white/90 hover:bg-white"
                  onClick={handleCompareClick}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 p-0 bg-white/90 hover:bg-white"
                onClick={handleQuickViewClick}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Stock status */}
        {product.inStock === false && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm font-medium">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      
      {/* Content Section */}
      <CardContent className="p-4">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {product.description}
        </p>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(product.rating!) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">
              ({product.rating}) {product.reviewCount && `• ${product.reviewCount} reviews`}
            </span>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Footer with Cart Button */}
      <CardFooter className="p-4 pt-0">
        <UniversalCartButton
          productId={product.id}
          productName={product.title}
          price={priceValue}
          image={product.image || "/images/placeholder.jpg"}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.inStock === false}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
        </UniversalCartButton>
      </CardFooter>
    </motion.div>
  );
};

export default ProductCard;
