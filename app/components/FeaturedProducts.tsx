"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface Product {
  name: string;
  description: string;
  price: number;
  slug: string;
}

export function FeaturedProducts() {
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
  
  // Function to handle checkout using Stripe API
  const handleCheckout = async (price: number, productName: string) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, productName }),
      });
      
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout page
      } else {
        console.error("Checkout Error:", data);
        alert("Payment Failed! Check console for details.");
      }
    } catch (error) {
      console.error("Error processing checkout:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // Function to handle adding to cart
  const handleAddToCart = (product: Product) => {
    // Implement your cart logic here
    console.log(`Added ${product.name} to cart`);
    // You could dispatch to a cart context/store here
  };
  
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-celestial-blue/30 to-cosmic-purple/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-gold">
          विशेष उत्पाद
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-gold">
          Featured Products
        </h3>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="bg-midnight-blue-light/80 hover:bg-midnight-blue transition-colors transform hover:scale-105 duration-300 border border-gold/30 hover:border-gold">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-serif font-semibold mb-2 text-gold text-center">{product.name}</h3>
                  <p className="mb-4 text-sm text-lavender text-center">{product.description}</p>
                  <p className="text-xl font-bold mb-4 text-gold text-center">₹{product.price.toLocaleString('en-IN')}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-black text-white hover:bg-gray-800 w-full"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      onClick={() => handleCheckout(product.price, product.name)}
                      className="bg-black text-white hover:bg-gray-800 w-full"
                    >
                      खरीदें (Buy Now)
                    </Button>
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