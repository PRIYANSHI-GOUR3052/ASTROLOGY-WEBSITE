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
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-serif font-medium mb-6 text-black">{t('cart.yourCart')}</h2>
        <p className="text-lg max-w-3xl mx-auto mb-8" style={{ color: '#000' }}>
          {t('cart.description')}
        </p>
      </div>
      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-mystic-brown/50 mb-4" />
          <p className="text-xl mb-6 text-black">{t('cart.empty')}</p>
          <Button asChild>
            <Link href="/">{t('cart.continueShopping')}</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-celestial-cream/90 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-xl font-serif font-semibold text-mystic-brown">
                          {item.name}
                        </h3>
                        <p className="text-mystic-brown/80">
                          ₹{Number(item.price).toLocaleString('en-IN')}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                        title={t('cart.remove')}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center">
                      <label className="text-mystic-brown/80 mr-2">{t('cart.quantity')}:</label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 p-2 text-center border border-mystic-brown/30 rounded"
                      />
                    </div>
                    <div className="mt-4 text-right">
                      <p className="text-lg font-medium text-mystic-brown">
                        Subtotal: ₹{Number(item.price * item.quantity).toLocaleString('en-IN')}
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
                  {t('cart.orderSummary')}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-mystic-brown/80">{t('cart.subtotal')}</span>
                    <span className="text-mystic-brown font-medium">
                      ₹{Number(total).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mystic-brown/80">{t('cart.shipping')}</span>
                    <span className="text-mystic-brown font-medium">{t('cart.shippingFree')}</span>
                  </div>
                </div>
                <div className="border-t border-mystic-brown/20 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-mystic-brown font-medium">{t('cart.total')}</span>
                    <span className="text-mystic-brown font-bold text-xl">
                      ₹{Number(total).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800" disabled>
                  {t('cart.proceedToCheckout')}
                </Button>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/">
                      {t('cart.continueShopping')}
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