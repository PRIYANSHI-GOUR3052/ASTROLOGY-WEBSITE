'use client';

import { useCart } from '../contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-serif font-bold mb-6 text-center text-gold">
          आपकी कार्ट
          <span className="block text-2xl mt-2">Your Cart</span>
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-400 mb-6 text-lg">Your cart is empty</p>
          <Link
            href="/services"
            className="inline-block bg-gold text-black px-8 py-3 rounded-md hover:bg-gold/90 transition-colors font-semibold"
          >
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-serif font-bold mb-8 text-center text-gold">
        आपकी कार्ट
        <span className="block text-2xl mt-2">Your Cart</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 py-6 border-b border-gray-800"
            >
              <div className="flex-1">
                <h3 className="text-xl font-serif font-semibold text-gold mb-2">{item.name}</h3>
                <p className="text-gray-400">₹{item.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gold" />
                  </button>
                  <span className="w-8 text-center text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gold" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 p-2 hover:bg-red-900/20 rounded-full transition-colors text-red-500"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-gold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-black/30 p-8 rounded-lg border border-gold/20">
            <h2 className="text-2xl font-serif font-semibold mb-6 text-gold">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>GST (18%)</span>
                <span>₹{(total * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-800 pt-4 mt-4">
                <div className="flex justify-between font-semibold text-gold text-xl">
                  <span>Total</span>
                  <span>₹{(total * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-gold text-black text-center py-4 rounded-md mt-8 hover:bg-gold/90 transition-colors font-semibold"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/services"
              className="block w-full text-center py-4 mt-4 text-gold hover:text-gold/80 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 