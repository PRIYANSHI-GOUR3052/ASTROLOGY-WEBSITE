'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function CartIcon() {
  const { items } = useCart();
  const { t } = useLanguage();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link 
      href="/cart" 
      className="relative flex items-center text-black hover:text-purple-600 transition-colors"
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="w-6 h-6 text-black" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-gold text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {itemCount}
        </span>
      )}
      <span className="ml-2 text-sm hidden sm:inline text-black">{t('header.cart')}</span>
    </Link>
  );
} 