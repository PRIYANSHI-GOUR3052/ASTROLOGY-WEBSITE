'use client';

import { useState } from 'react';
import { ReusableProductCard, ReusableProductGrid } from './product-cards';
import type { Product } from './ReusableProductCard';

// Sample products for demonstration
const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Natural Ruby Gemstone',
    description: 'Authentic lab-certified ruby for planetary remedies and spiritual growth.',
    price: '₹2,999',
    originalPrice: '₹3,999',
    slug: 'natural-ruby-gemstone',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    category: 'Gemstones',
    rating: 4.5,
    reviewCount: 24,
    inStock: true,
    isNew: true,
  },
  {
    id: '2',
    title: 'Emerald Crystal Set',
    description: 'Premium emerald crystal collection for Mercury planet benefits.',
    price: '₹4,499',
    originalPrice: '₹5,999',
    slug: 'emerald-crystal-set',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    category: 'Crystal Sets',
    rating: 4.8,
    reviewCount: 15,
    inStock: true,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Blue Sapphire Ring',
    description: 'Handcrafted blue sapphire ring for Saturn planet remedies.',
    price: '₹8,999',
    slug: 'blue-sapphire-ring',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    category: 'Jewelry',
    rating: 4.2,
    reviewCount: 8,
    inStock: true,
  },
  {
    id: '4',
    title: 'Yellow Sapphire Pendant',
    description: 'Powerful yellow sapphire pendant for Jupiter blessings.',
    price: '₹6,799',
    originalPrice: '₹7,999',
    slug: 'yellow-sapphire-pendant',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    category: 'Jewelry',
    rating: 4.6,
    reviewCount: 12,
    inStock: false,
  },
];

export const ProductCardsDemo = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const handleWishlistClick = (product: Product) => {
    console.log('Added to wishlist:', product.title);
    // In a real app, you would update your wishlist state here
  };

  const handleQuickViewClick = (product: Product) => {
    console.log('Quick view:', product.title);
    // In a real app, you would open a modal or navigate to product details
  };

  const handleCompareClick = (product: Product) => {
    console.log('Added to compare:', product.title);
    // In a real app, you would add to comparison list
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Reusable Product Cards Demo
        </h1>
        <p className="text-gray-600 mb-6">
          This demo shows the ReusableProductCard and ReusableProductGrid components in action.
        </p>
        
        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'grid'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Single Product Card Example */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Single ReusableProductCard
        </h2>
        <div className="max-w-sm">
          <ReusableProductCard
            product={sampleProducts[0]}
            viewMode="grid"
            showQuickActions={true}
            showWishlist={true}
            showCompare={true}
            onWishlistClick={handleWishlistClick}
            onQuickViewClick={handleQuickViewClick}
            onCompareClick={handleCompareClick}
          />
        </div>
      </div>

      {/* Product Grid Example */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          ReusableProductGrid
        </h2>
        <ReusableProductGrid
          products={sampleProducts}
          viewMode={viewMode}
          columns={4}
          gap="md"
          showQuickActions={true}
          showWishlist={true}
          showCompare={true}
          onWishlistClick={handleWishlistClick}
          onQuickViewClick={handleQuickViewClick}
          onCompareClick={handleCompareClick}
        />
      </div>

      {/* Loading State Example */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Loading State
        </h2>
        <ReusableProductGrid
          products={[]}
          viewMode={viewMode}
          columns={4}
          loading={true}
        />
      </div>

      {/* Empty State Example */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Empty State
        </h2>
        <ReusableProductGrid
          products={[]}
          viewMode={viewMode}
          columns={4}
          emptyMessage="No products match your search criteria. Try adjusting your filters."
        />
      </div>
    </div>
  );
};

export default ProductCardsDemo;
