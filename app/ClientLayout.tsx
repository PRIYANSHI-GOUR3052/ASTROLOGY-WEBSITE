'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { MysticBackground } from './components/MysticBackground';
import Chatbot from './components/chatbot';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { v4 as uuidv4 } from 'uuid';
import { SubHeader } from './components/SubHeader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const shouldHideLayout = [
    "/admin/dashboard",
    "/admin/clients",
    "/admin/courses",
    "/admin/products",
    "/admin/services",
    "/admin/reviews",
    "/admin/settings",
    "/admin/login",
    "/signin",
    "/admin/stone"
  ].includes(pathname ?? '');

  useEffect(() => {
    if (shouldHideLayout) return;

    let visitorId = localStorage.getItem('visitor_id');

    if (!visitorId) {
      visitorId = uuidv4();
      localStorage.setItem('visitor_id', visitorId);
    }

    const trackPageVisit = async () => {
      try {
        const response = await fetch('/api/track-visitor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            path: pathname,
            timestamp: new Date().toISOString(),
            referrer: document.referrer || null,
          }),
        });

        if (!response.ok) {
          console.error('Failed to track visitor');
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    trackPageVisit();
  }, [pathname, shouldHideLayout]);

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white">
          
          <Header />
          <SubHeader />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
          <Chatbot />
        </div>
      </LanguageProvider>
    </AuthProvider>
  );
}
