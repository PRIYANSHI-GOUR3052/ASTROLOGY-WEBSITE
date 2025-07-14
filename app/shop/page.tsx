'use client';

import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { FeaturedProducts } from '../components/FeaturedProducts'
import { ProductGrid } from '../components/ProductGrid'
import { AstrologyStones } from '../components/AstrologyStones'
import { ShopCTA } from '../components/ShopCTA'
import Link from 'next/link'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import ProductOfTheDay from '../components/ProductOfTheDay';
import AllProductsGrid from '../components/AllProductsGrid';
import { AstrologerProfile } from '../components/AstrologerProfile';
import { Statistics } from '../components/Statistics';
import { Testimonials } from '../components/Testimonials';

// Move plugin initialization outside the component
const autoplayPlugin = Autoplay({ delay: 3500, stopOnInteraction: false });

const ShopProductCarousel = dynamic(() => import('../components/ShopProductCarousel'), { ssr: false });

const products = [
  {
    title: 'Natural Gemstone Collection',
    description: 'Authentic, lab-certified gemstones for planetary remedies and spiritual growth.',
    price: '₹2,499',
    slug: 'gemstone-collection',
  },
  {
    title: 'Rudraksha Mala & Beads',
    description: 'Energized Rudraksha beads and malas for protection, peace, and spiritual power.',
    price: '₹1,199',
    slug: 'rudraksha-collection',
  },
  {
    title: 'Energized Yantras',
    description: 'Sacred spiritual diagrams (Yantras) energized for prosperity, health, and harmony.',
    price: '₹799',
    slug: 'yantras',
  },
  {
    title: 'Puja Samagri & Ritual Kits',
    description: 'Complete kits for home puja, havan, and Vedic rituals, including all essentials.',
    price: '₹999',
    slug: 'puja-samagri-kits',
  },
  {
    title: 'Astrology Reports & Kundli Services',
    description: 'Personalized astrology reports, Janam Kundli, and detailed horoscope analysis.',
    price: '₹499',
    slug: 'astrology-reports-kundli',
  },
  {
    title: 'Spiritual Accessories',
    description: 'Incense holders, copper bottles, meditation mats, and more for your spiritual space.',
    price: '₹399',
    slug: 'spiritual-accessories',
  },
  {
    title: 'Personalized Astrology Tools',
    description: 'Custom-engraved pendants, name plates, and tools based on your birth chart.',
    price: '₹1,499',
    slug: 'personalized-astrology-tools',
  },
];

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-golden-amber-dark via-sunburst-yellow to-golden-amber-dark">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
          {/* Main Page Heading */}
          <div className="w-full flex flex-col items-center justify-center mb-8 mt-4">
            <h1
              className="text-5xl md:text-7xl mb-2 text-center font-normal text-black"
              style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, letterSpacing: '0.01em' }}
            >
              Spiritual Shop
            </h1>
          </div>
          {/* Full-width Product Carousel (dynamically imported) */}
          <ShopProductCarousel products={products} />
          {/* <FeaturedProducts /> */}
          {/* Shop by Purpose Section */}
          <div className="w-full flex flex-col items-center my-16">
            <h2 className="text-3xl md:text-4xl mb-10 text-center font-normal text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, letterSpacing: '0.01em' }}>Shop by Purpose</h2>
            <div className="flex flex-row flex-wrap justify-center gap-8 w-full max-w-6xl">
              {/* Money */}
              <div className="shop-purpose-card flex flex-col items-center bg-[#f7f5ed] rounded-xl shadow-sm p-6 w-48 h-56 justify-center">
                <Link href="#money" className="block w-full h-36 flex items-center justify-center mb-4" style={{ aspectRatio: '1/1' }}>
                  <img src="/images/course-1.jpg" alt="Money" className="w-full h-full object-contain rounded-md" style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
                </Link>
                <span className="text-base mt-2" style={{ fontFamily: 'Playfair Display, serif', color: '#23244a' }}>Money</span>
              </div>
              {/* Love */}
              <div className="shop-purpose-card flex flex-col items-center bg-[#f7f5ed] rounded-xl shadow-sm p-6 w-48 h-56 justify-center">
                <Link href="#love" className="block w-full h-36 flex items-center justify-center mb-4" style={{ aspectRatio: '1/1' }}>
                  <img src="/images/course-2.jpg" alt="Love" className="w-full h-full object-contain rounded-md" style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
                </Link>
                <span className="text-base mt-2" style={{ fontFamily: 'Playfair Display, serif', color: '#23244a' }}>Love</span>
              </div>
              {/* Career */}
              <div className="shop-purpose-card flex flex-col items-center bg-[#f7f5ed] rounded-xl shadow-sm p-6 w-48 h-56 justify-center">
                <Link href="#career" className="block w-full h-36 flex items-center justify-center mb-4" style={{ aspectRatio: '1/1' }}>
                  <img src="/images/course-3.jpg" alt="Career" className="w-full h-full object-contain rounded-md" style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
                </Link>
                <span className="text-base mt-2" style={{ fontFamily: 'Playfair Display, serif', color: '#23244a' }}>Career</span>
              </div>
              {/* Evil Eye */}
              <div className="shop-purpose-card flex flex-col items-center bg-[#f7f5ed] rounded-xl shadow-sm p-6 w-48 h-56 justify-center">
                <Link href="#evil-eye" className="block w-full h-36 flex items-center justify-center mb-4" style={{ aspectRatio: '1/1' }}>
                  <img src="/images/astrology.svg" alt="Evil Eye" className="w-full h-full object-contain rounded-md" style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
                </Link>
                <span className="text-base mt-2" style={{ fontFamily: 'Playfair Display, serif', color: '#23244a' }}>Evil Eye</span>
              </div>
              {/* Health */}
              <div className="shop-purpose-card flex flex-col items-center bg-[#f7f5ed] rounded-xl shadow-sm p-6 w-48 h-56 justify-center">
                <Link href="#health" className="block w-full h-36 flex items-center justify-center mb-4" style={{ aspectRatio: '1/1' }}>
                  <img src="/images/astrowellness.jpg" alt="Health" className="w-full h-full object-contain rounded-md" style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }} />
                </Link>
                <span className="text-base mt-2" style={{ fontFamily: 'Playfair Display, serif', color: '#23244a' }}>Health</span>
              </div>
            </div>
          </div>
          {/* Product Of The Day Section */}
          <ProductOfTheDay />
          {/* All Products Grid Section */}
          <AllProductsGrid />
          {/* Astrologer Profile, Statistics, Testimonials */}
          <AstrologerProfile />
          <Statistics />
          <Testimonials />
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
      </MysticBackground>
    </div>
  )
}
