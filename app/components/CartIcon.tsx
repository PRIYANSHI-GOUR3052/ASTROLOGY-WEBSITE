'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from "../contexts/useLanguage";
import React from 'react';

interface CartIconProps {
  iconColor?: string;
}

export default function CartIcon({ iconColor = 'black' }: CartIconProps) {
  const { items } = useCart();
  const { t } = useLanguage();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-200 transition-colors flex items-center" aria-label="Shopping Cart">
      <ShoppingCart className="h-6 w-6" style={{ color: iconColor }} />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold bg-yellow-400 text-purple-900">
          {itemCount}
        </span>
      )}
      <span className="ml-2 text-sm hidden sm:inline text-black">{t('header.cart')}</span>
    </Link>
  );
} 