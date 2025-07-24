"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { UniversalCartButton } from '@/app/components/UniversalCartButton'

interface Product {
  name: string;
  description: string;
  price: number;
  slug: string;
  id: number;
}

export function FeaturedProducts() {
  const router = useRouter()
  const { status } = useSession()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/featured");
        if (!res.ok) {
          throw new Error('Failed to fetch featured products');
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError('Failed to load featured products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <section className="py-16 relative bg-[#FAE6E6]">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-black">
          विशेष उत्पाद
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-black">
          Featured Products
        </h3>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="bg-white hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300 border border-black hover:border-black">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-2 text-black text-center">{product.name}</h3>
                  <p className="mb-4 text-sm text-black text-center">{product.description}</p>
                  <p className="text-xl font-bold mb-4 text-black text-center">₹{product.price.toLocaleString('en-IN')}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <UniversalCartButton
                      productId={product.id.toString()}
                      productName={product.name}
                      price={product.price}
                      variant="addToCart"
                      className="bg-black text-white hover:bg-gray-800 w-full"
                    >
                      Add to Cart
                    </UniversalCartButton>
                    
                    <UniversalCartButton
                      productId={product.id.toString()}
                      productName={product.name}
                      price={product.price}
                      variant="buyNow"
                      className="bg-black text-white hover:bg-gray-800 w-full"
                    >
                      खरीदें (Buy Now)
                    </UniversalCartButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}