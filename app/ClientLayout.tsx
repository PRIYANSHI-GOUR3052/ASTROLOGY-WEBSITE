'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { MysticBackground } from './components/MysticBackground';
import Chatbot from './components/chatbot';
import { AuthProvider } from './contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Array of admin paths where we should hide the regular layout
  const hideLayout = [
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
    // Get or create visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    
    if (!visitorId) {
      // If no visitor ID exists, create a new one
      visitorId = uuidv4();
      localStorage.setItem('visitor_id', visitorId);
    }

    // Track page visit
    const trackPageVisit = async () => {
      try {
        // Record the page visit to your API
        const response = await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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

    // Only track visits on non-admin pages
    if (!hideLayout) {
      trackPageVisit();
    }
  }, [pathname, hideLayout]);

  return (
    <AuthProvider>
      {!hideLayout ? (
        <>
          <PageTransition>
            <MysticBackground>
              <Header />
              <main>{children}</main>
              <Footer />
              <Chatbot />
            </MysticBackground>
          </PageTransition>
        </>
      ) : (
        children
      )}
    </AuthProvider>
  );
}