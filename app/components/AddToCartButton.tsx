'use client';

import { useCart } from '../contexts/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  image?: string;
  className?: string;
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  className = '',
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({ id, name, price, image });
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <ShoppingCart className="w-4 h-4" />
      {isAdding ? 'Added!' : 'Add to Cart'}
    </button>
  );
} 