'use client';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LiveChat } from './components/LiveChat';
import { PageTransition } from './components/PageTransition';
import { MysticBackground } from './components/MysticBackground';
import { AuthProvider } from './contexts/AuthContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <MysticBackground />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
        </div>
      </AuthProvider>
      <LiveChat />
    </>
  );
} 