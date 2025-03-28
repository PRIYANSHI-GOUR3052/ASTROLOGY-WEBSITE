'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { MysticBackground } from './components/MysticBackground';
import Chatbot from './components/chatbot';
import { AuthProvider } from './contexts/AuthContext';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  
  const hideLayout = [
    "/admin/dashboard",
    "/admin/clients",
    "/admin/courses",
    "/admin/products",
    "/admin/messages",
    "/admin/reviews",
    "/admin/settings"
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
              
        <Chatbot />
            <Footer />
          </>
        )}
        
        {hideLayout && children}
      
      </div>
    </AuthProvider>
  );
}