'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/useLanguage';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto pt-10 px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl lg:text-5xl font-serif font-medium mb-4 text-black">{t('cart.yourCart')}</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8 text-gray-700">
          {t('cart.description')}
        </p>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-black mb-4" />
          <p className="text-xl mb-6 text-black">{t('cart.empty')}</p>
          <Button asChild>
            <Link href="/">{t('cart.continueShopping')}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center bg-white rounded-xl shadow-md p-6 gap-6 border border-gray-200">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg border" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-serif font-semibold text-black truncate">{item.name}</h3>
                  <p className="text-black text-lg mt-1">₹{Number(item.price).toLocaleString('en-IN')}</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <label className="text-black text-sm">{t('cart.quantity')}</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 text-center border border-black rounded text-black"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                    title={t('cart.remove')}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="ml-8 text-right min-w-[120px]">
                  <p className="text-lg font-medium text-black">Subtotal:</p>
                  <p className="text-xl font-bold text-black">₹{Number(item.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 sticky top-4 h-fit flex flex-col gap-6">
            <h3 className="text-2xl font-serif font-semibold mb-2 text-black">{t('cart.orderSummary')}</h3>
            <div className="flex justify-between text-lg">
              <span className="text-black">{t('cart.subtotal')}</span>
              <span className="text-black font-medium">₹{Number(total).toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-black">{t('cart.shipping')}</span>
              <span className="text-black font-medium">{t('cart.shippingFree')}</span>
            </div>
            <div className="border-t border-black pt-4 mb-2">
              <div className="flex justify-between text-xl">
                <span className="text-black font-medium">{t('cart.total')}</span>
                <span className="text-black font-bold text-2xl">₹{Number(total).toLocaleString('en-IN')}</span>
              </div>
            </div>
            <Button className="w-full bg-black text-white hover:bg-gray-800" disabled>
              {t('cart.proceedToCheckout')}
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                {t('cart.continueShopping')}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}