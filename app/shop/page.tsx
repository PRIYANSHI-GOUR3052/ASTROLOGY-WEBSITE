'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { products } from '../../data/products';

const ProductOfTheDay = dynamic(() => import('../components/ProductOfTheDay'), { loading: () => <div>Loading...</div>, ssr: false });
const Statistics = dynamic(() => import('../components/Statistics').then(mod => mod.Statistics), { loading: () => <div>Loading...</div>, ssr: false });
const CelestialJourneyMainGrid = dynamic(() => import('../components/Hero/CelestialJourneyMainGrid'), { loading: () => <div>Loading...</div>, ssr: false });
const ShopCategoriesMinimal = dynamic(() => import('../components/ShopCategoriesMinimal'), { loading: () => <div>Loading...</div>, ssr: false });
const NakshatraTicker = dynamic(() => import('../components/NakshatraTicker'), { loading: () => <div>Loading...</div>, ssr: false });
const ShopBanner = dynamic(() => import('../components/ShopBanner'), { loading: () => <div>Loading...</div>, ssr: false });
const ZodiacCategories = dynamic(() => import('../components/ZodiacCategories'), { loading: () => <div>Loading...</div>, ssr: false });
const SimpleHorizontalBanner = dynamic(() => import('../components/SimpleHorizontalBanner'), { loading: () => <div>Loading...</div>, ssr: false });
const ProductAnnouncementTicker = dynamic(() => import('../components/ProductAnnouncementTicker'), { loading: () => <div>Loading...</div>, ssr: false });
const BestSellerCards = dynamic(() => import('../components/BestSellerCards'), { loading: () => <div>Loading...</div>, ssr: false });
const ProductAssuranceBar = dynamic(() => import('../components/ProductAssuranceBar'), { loading: () => <div>Loading...</div>, ssr: false });
const NakshatraGyaanBanner = dynamic(() => import('../components/NakshatraGyaanBanner'), { loading: () => <div>Loading...</div>, ssr: false });
const SpiritualJourneyBanner = dynamic(() => import('../components/SpiritualJourneyBanner'), { loading: () => <div>Loading...</div>, ssr: false });


export default function ShopPage() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.shop-purpose-card').forEach(card => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <ShopBanner />
      {/* NakshatraTicker - Moved right after banner for better flow */}
      <NakshatraTicker />
      {/* Zodiac Categories - ALL 12 ZODIAC SIGNS */}
      <ZodiacCategories />
      {/* CelestialJourneyMainGrid Section */}
      <CelestialJourneyMainGrid />
      
      {/* Nakshatra Gyaan Banner */}
      <NakshatraGyaanBanner />
      
      {/* Shop Categories Minimal - CINEMATIC VERSION */}
      <ShopCategoriesMinimal />
      
      {/* Simple Horizontal Banner - 3 GRID LAYOUT AFTER SACRED CATEGORIES */}
      <SimpleHorizontalBanner />

      {/* Product Announcements Ticker - RIGHT AFTER BANNER */}
      <ProductAnnouncementTicker />

      {/* Product Assurance Bar - AFTER SHOP BY AUDIENCE */}
      <ProductAssuranceBar />

      {/* Existing Content */}
      
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Main Page Heading */}
          {/* Removed duplicate <h1>Spiritual Shop</h1> here */}
          {/* Full-width Product Carousel (dynamically imported) */}
          {/* New Best Seller Cards with RecentPosts Layout */}
          <BestSellerCards products={products.map(product => ({ ...product, loading: 'lazy' }))} />
          {/* <FeaturedProducts /> */}
          {/* Product Of The Day Section */}
          <ProductOfTheDay />
          {/* Astrologer Profile, Statistics, Testimonials */}
          <Statistics />
          
          {/* Spiritual Journey Banner */}
          <SpiritualJourneyBanner />

          <style jsx global>{`
            .shop-purpose-card {
              opacity: 0;
              transform: translateY(40px);
              animation: shopPurposeFadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) forwards;
            }
            .shop-purpose-card:nth-child(1) { animation-delay: 0.05s; }
            .shop-purpose-card:nth-child(2) { animation-delay: 0.15s; }
            .shop-purpose-card:nth-child(3) { animation-delay: 0.25s; }
            .shop-purpose-card:nth-child(4) { animation-delay: 0.35s; }
            .shop-purpose-card:nth-child(5) { animation-delay: 0.45s; }
            .shop-purpose-card:nth-child(6) { animation-delay: 0.55s; }
            @keyframes shopPurposeFadeIn {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
          {/* AstrologyStones */}
          {/* <AstrologyStones /> */}
        </div>
     
    </div>
  )
}