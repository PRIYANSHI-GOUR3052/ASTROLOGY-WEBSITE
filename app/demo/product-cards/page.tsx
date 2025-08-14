'use client';

import { ReusableProductCard, ReusableProductGrid, type Product } from '@/app/components/product-cards';

// Example products data
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
    isFeatured: false,
  },
  {
    id: '2',
    title: 'Sacred Rudraksha Mala',
    description: 'Traditional 108 bead rudraksha mala for meditation and spiritual practices.',
    price: '₹1,599',
    slug: 'sacred-rudraksha-mala',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    category: 'Spiritual Items',
    rating: 4.8,
    reviewCount: 42,
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Crystal Healing Set',
    description: 'Complete set of 7 chakra crystals for energy healing and balance.',
    price: '₹4,999',
    originalPrice: '₹6,999',
    slug: 'crystal-healing-set',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    category: 'Crystals',
    rating: 4.3,
    reviewCount: 18,
    inStock: false,
    isNew: false,
    isFeatured: false,
  },
  {
    id: '4',
    title: 'Brass Diya Set',
    description: 'Handcrafted brass diyas for traditional puja and decoration.',
    price: '₹899',
    slug: 'brass-diya-set',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    category: 'Puja Items',
    rating: 4.6,
    reviewCount: 31,
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
];

export default function ProductCardExamplesPage() {
  const handleWishlistClick = (product: Product) => {
    alert(`Added "${product.title}" to wishlist!`);
  };

  const handleQuickViewClick = (product: Product) => {
    alert(`Quick view for "${product.title}"`);
  };

  const handleCompareClick = (product: Product) => {
    alert(`Added "${product.title}" to compare list!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ProductCard Component Examples
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Reusable product card components that can be used throughout the application
            with different configurations and view modes.
          </p>
        </div>

        {/* Single Product Card Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Single Product Cards</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Grid View (Default)</h3>
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

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-4">List View</h3>
              <ReusableProductCard
                product={sampleProducts[1]}
                viewMode="list"
                showQuickActions={true}
                showWishlist={true}
                showCompare={false}
                onWishlistClick={handleWishlistClick}
                onQuickViewClick={handleQuickViewClick}
              />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Out of Stock Product</h3>
            <div className="max-w-sm">
              <ReusableProductCard
                product={sampleProducts[2]}
                viewMode="grid"
                showQuickActions={false}
                showWishlist={true}
                onWishlistClick={handleWishlistClick}
              />
            </div>
          </div>
        </section>

        {/* Product Grid Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Product Grid Examples</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">4-Column Grid (Default)</h3>
            <ReusableProductGrid
              products={sampleProducts}
              viewMode="grid"
              columns={4}
              showQuickActions={true}
              showWishlist={true}
              showCompare={true}
              onWishlistClick={handleWishlistClick}
              onQuickViewClick={handleQuickViewClick}
              onCompareClick={handleCompareClick}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">3-Column Grid</h3>
            <ReusableProductGrid
              products={sampleProducts}
              viewMode="grid"
              columns={3}
              gap="lg"
              showQuickActions={true}
              showWishlist={true}
              onWishlistClick={handleWishlistClick}
              onQuickViewClick={handleQuickViewClick}
            />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-700 mb-4">List View Grid</h3>
            <ReusableProductGrid
              products={sampleProducts}
              viewMode="list"
              showQuickActions={true}
              showWishlist={true}
              showCompare={false}
              onWishlistClick={handleWishlistClick}
              onQuickViewClick={handleQuickViewClick}
            />
          </div>
        </section>

        {/* Loading State */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Loading State</h2>
          <ReusableProductGrid
            products={[]}
            loading={true}
            columns={4}
          />
        </section>

        {/* Empty State */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Empty State</h2>
          <ReusableProductGrid
            products={[]}
            emptyMessage="No products found matching your criteria. Try adjusting your filters."
            columns={4}
          />
        </section>

        {/* Usage Instructions */}
        <section className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">How to Use</h2>
          
          <div className="prose max-w-none">
            <h3 className="text-lg font-medium text-gray-700">Import the components:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { ReusableProductCard, ReusableProductGrid } from '@/app/components/product-cards';`}
            </pre>

            <h3 className="text-lg font-medium text-gray-700 mt-6">Single Product Card:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<ReusableProductCard
  product={product}
  viewMode="grid" // or "list"
  showQuickActions={true}
  showWishlist={true}
  showCompare={false}
  onWishlistClick={(product) => console.log('Wishlist:', product)}
  onQuickViewClick={(product) => console.log('Quick view:', product)}
/>`}
            </pre>

            <h3 className="text-lg font-medium text-gray-700 mt-6">Product Grid:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<ReusableProductGrid
  products={products}
  viewMode="grid" // or "list"
  columns={4} // 2, 3, 4, or 5
  gap="md" // "sm", "md", or "lg"
  loading={false}
  showQuickActions={true}
  showWishlist={true}
  showCompare={false}
  emptyMessage="Custom empty message"
  onWishlistClick={(product) => handleWishlist(product)}
  onQuickViewClick={(product) => handleQuickView(product)}
  onCompareClick={(product) => handleCompare(product)}
/>`}
            </pre>

            <h3 className="text-lg font-medium text-gray-700 mt-6">Product Interface:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`interface Product {
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
}`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
