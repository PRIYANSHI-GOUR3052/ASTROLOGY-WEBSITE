'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

interface CartItem {
  id: number;
  product_name: string;
  unit_price: number;
  quantity: number;
  carats: number;
  is_stone: number;
}

export default function CartPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    // Check if we were redirected here after login with a cart action
    const checkoutItem = sessionStorage.getItem('checkoutItem');
    if (checkoutItem && status === 'authenticated') {
      const item = JSON.parse(checkoutItem);
      
      if (item.action === 'cart') {
        // Add item to cart
        addToCart(item);
      } else if (item.action === 'buy') {
        // Redirect to checkout
        redirectToCheckout(item);
      }
      
      // Clear session storage
      sessionStorage.removeItem('checkoutItem');
    }
    
    // Fetch cart items
    fetchCartItems();
  }, [status]);
  
  const fetchCartItems = async () => {
    if (status !== 'authenticated') {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const res = await fetch('/api/cart');
      
      if (!res.ok) {
        if (res.status === 401) {
          const data = await res.json();
          if (data.redirectUrl) {
            router.push(data.redirectUrl);
          }
          return;
        }
        throw new Error('Failed to fetch cart items');
      }
      
      const data = await res.json();
      setCartItems(data.cartItems || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };
  
  const addToCart = async (item: { productId: any; quantity: any; isStone: any; carats: any; productName: any }) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: item.productId,
          quantity: item.quantity || 1,
          isStone: item.isStone || false,
          carats: item.carats
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to add item to cart');
      }
      
      toast.success(`${item.productName} added to cart`);
      fetchCartItems();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add item to cart');
    }
  };
  
  const redirectToCheckout = async (item: { price: any; productName: any; productId: any; quantity: any; isStone: any; carats: any }) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: item.price,
          productName: item.productName,
          productId: item.productId,
          quantity: item.quantity || 1,
          isStone: item.isStone || false,
          carats: item.carats
        })
      });
      
      const data = await res.json();
      
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to proceed to checkout');
    }
  };
  
  const removeCartItem = async (cartItemId: any) => {
    try {
      const res = await fetch(`/api/cart?id=${cartItemId}`, {
        method: 'DELETE'
      });
      
      if (!res.ok) {
        throw new Error('Failed to remove item from cart');
      }
      
      toast.success('Item removed from cart');
      setCartItems(cartItems.filter(item => item.id !== cartItemId));
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove item from cart');
    }
  };
  
  const updateQuantity = async (cartItemId: any, newValue: number, isStone: boolean) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItemId,
          quantity: isStone ? undefined : newValue,
          carats: isStone ? newValue : undefined
        })
      });
      
      if (!res.ok) {
        throw new Error('Failed to update cart item');
      }
      
      toast.success('Cart updated');
      fetchCartItems();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update cart item');
    }
  };
  
  const proceedToCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    try {
      setCheckoutLoading(true);
      
      // Prepare cart items for checkout
      const formattedCartItems = cartItems.map(item => ({
        id: item.id,
        name: item.product_name,
        price: item.unit_price,
        quantity: item.quantity,
        isStone: item.is_stone === 1,
        carats: item.carats
      }));
      
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: formattedCartItems
        })
      });
      
      const data = await res.json();
      
      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else if (!data.authenticated && data.redirectUrl) {
        window.location.href = data.redirectUrl; // Redirect to sign in
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to proceed to checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };
  
  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.is_stone === 1 
        ? item.unit_price * item.carats
        : item.unit_price * item.quantity;
      return total + itemPrice;
    }, 0);
  };
  
  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mystic-brown"></div>
        </div>
      </div>
    );
  }
  
  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto pt-10 px-4 py-16">
        <div className="text-center">
        <h1 className="text-6xl lg:text-7xl font-serif font-black mb-2 text-mystic-brown">आपकी कार्ट</h1>
        <h2 className="text-4xl lg:text-5xl font-serif font-medium mb-6 text-mystic-brown">Your Cart</h2>
          <Button asChild>
            <Link href="/signin?redirect=cart">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto pt-10 px-4 py-16">
      <div className="text-center">
        <h1 className="text-6xl lg:text-7xl font-serif font-black mb-2 text-mystic-brown">आपकी कार्ट</h1>
        <h2 className="text-4xl lg:text-5xl font-serif font-medium mb-6 text-mystic-brown">Your Cart</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8 text-mystic-brown/80">
          View and manage items in your cart. Proceed to checkout when you're ready to complete your purchase.
        </p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-mystic-brown"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">{error}</div>
      ) : cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-mystic-brown/50 mb-4" />
          <p className="text-xl text-mystic-brown/80 mb-6">Your cart is empty</p>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="bg-celestial-cream/90 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-mystic-brown">
                          {item.product_name}
                        </h3>
                        <p className="text-mystic-brown/80">
                          ₹{Number(item.unit_price).toLocaleString('en-IN')} 
                          {item.is_stone === 1 ? ' per carat' : ''}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeCartItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <label className="text-mystic-brown/80 mr-2">
                        {item.is_stone === 1 ? 'Carats:' : 'Quantity:'}
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.is_stone === 1 ? item.carats : item.quantity}
                        onChange={(e) => updateQuantity(
                          item.id, 
                          parseFloat(e.target.value), 
                          item.is_stone === 1
                        )}
                        className="w-16 p-2 text-center border border-mystic-brown/30 rounded"
                      />
                    </div>
                    
                    <div className="mt-4 text-right">
                      <p className="text-lg font-medium text-mystic-brown">
                        Subtotal: ₹{Number(
                          item.is_stone === 1 
                            ? item.unit_price * item.carats 
                            : item.unit_price * item.quantity
                        ).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="bg-celestial-cream/90 shadow-md sticky top-4">
              <CardContent className="p-6">
                <h3 className="text-xl font-serif font-semibold mb-4 text-mystic-brown">
                  Order Summary
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-mystic-brown/80">Subtotal</span>
                    <span className="text-mystic-brown font-medium">
                      ₹{calculateTotal().toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mystic-brown/80">Shipping</span>
                    <span className="text-mystic-brown font-medium">Free</span>
                  </div>
                </div>
                
                <div className="border-t border-mystic-brown/20 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-mystic-brown font-medium">Total</span>
                    <span className="text-mystic-brown font-bold text-xl">
                      ₹{calculateTotal().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                
                <Button 
                  onClick={proceedToCheckout}
                  disabled={checkoutLoading || cartItems.length === 0}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
                
                <div className="mt-4">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full"
                  >
                    <Link href="/">
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}