'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from './contexts/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <CartProvider>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </CartProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}