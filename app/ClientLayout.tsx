'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { MysticBackground } from './components/MysticBackground';
import Chatbot from './components/Chatbot';
import { AuthProvider } from './contexts/AuthContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  
  const hideLayout = [
    "/admin"
  ].includes(pathname ?? '');
  
  return (
    <AuthProvider>
      <MysticBackground />
      <div className="flex flex-col min-h-screen">
        {!hideLayout && (
          <>
            <Header />
            <main className="flex-grow">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </>
        )}
        
        {hideLayout && children}
        
        <Chatbot />
      </div>
    </AuthProvider>
  );
}