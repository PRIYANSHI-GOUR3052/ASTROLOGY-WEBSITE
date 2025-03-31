'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StoneDetails } from './StoneDetails';

interface Product {
  name: string;
  description: string;
  price?: number;
  pricePerCarat?: number;
  slug: string;
  isStone: boolean;
}

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/all");
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    // Add your cart logic here
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-center text-mystic-brown">
        हमारे सभी उत्पाद (All Our Products)
      </h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mystic-brown"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="bg-celestial-cream/90 hover:bg-celestial-cream transition-colors transform hover:scale-105 duration-300 border border-sunburst-yellow/30 hover:border-sunburst-yellow">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-semibold mb-2 text-mystic-brown text-center">{product.name}</h3>
                <p className="mb-4 text-sm text-mystic-brown/80 text-center">{product.description}</p>
                {product.isStone ? (
                  <StoneDetails pricePerCarat={product.pricePerCarat || 0} />
                ) : (
                  <p className="text-xl font-bold mb-4 text-mystic-brown text-center">
                    ₹{product.price ? product.price.toLocaleString('en-IN') : 'Price not available'}
                  </p>
                )}
                <div className="text-center flex justify-center gap-2">
                  <Button 
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Button asChild className="bg-black text-white hover:bg-gray-800">
                    <Link href={`/shop/${product.slug}`}>खरीदें (Buy Now)</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
