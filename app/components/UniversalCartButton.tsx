'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface UniversalCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  quantity?: number;
  isStone?: boolean;
  isService?: boolean;
  carats?: number | null;
  variant?: 'addToCart' | 'buyNow';
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export function UniversalCartButton({
  productId,
  productName,
  price,
  quantity = 1,
  isStone = false,
  isService = false,
  carats = null,
  variant = 'addToCart',
  children,
  className = '',
  ...props
}: UniversalCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Determine item type based on props
      const itemType = isStone ? 'stone' : (isService ? 'service' : 'product');
      
      console.log(`Adding to cart: ${productName} (${productId}), type: ${itemType}`);
      
      // Add to cart API call
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
          isStone,
          isService,
          carats,
          itemType,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        
        // If user is not authenticated, redirect to sign in
        if (response.status === 401 && data.redirectUrl) {
          router.push(data.redirectUrl);
          return;
        }

        throw new Error(data.error || data.details || 'Failed to add item to cart');
      }

      const data = await response.json();

      // Show success toast
      toast({
        title: 'Item added to cart',
        description: `${productName} has been added to your cart.`,
        variant: 'default',
      });

      // If it's a "Buy Now" variant, redirect to checkout
      if (variant === 'buyNow') {
        router.push('/checkout');
      }
    } catch (error: unknown) {
      console.error('Error adding to cart:', error);
      
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isLoading}
      className={className}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {variant === 'buyNow' ? 'Processing...' : 'Adding...'}
        </>
      ) : (
        children
      )}
    </Button>
  );
}