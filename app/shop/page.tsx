'use client';

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

import { ProductServiceCard } from '../components/UniversalServiceGrid';
import { defaultProducts } from '../components/AllProductsGrid';
import CelestialJourneyMainGrid from '../components/Hero/CelestialJourneyMainGrid';
import ShopByCategory from '../components/ShopByCategory';
import ShopCategoriesMinimal from '../components/ShopCategoriesMinimal';
import ShopByAudience from '../components/ShopByAudience';
import NakshatraTicker from '../components/NakshatraTicker';
import ShopBanner from '../components/ShopBanner';
import ZodiacCategories from '../components/ZodiacCategories';
import SimpleHorizontalBanner from '../components/SimpleHorizontalBanner';
import ProductAnnouncementTicker from '../components/ProductAnnouncementTicker';
import BestSellerCards from '../components/BestSellerCards';
import ProductAssuranceBar from '../components/ProductAssuranceBar';

// Move plugin initialization outside the component
const autoplayPlugin = Autoplay({ delay: 3500, stopOnInteraction: false });

const ShopProductCarousel = dynamic(() => import('../components/ShopProductCarousel'), { ssr: false });

const products = [
  {
    title: 'Natural Gemstone Collection',
    description: 'Authentic, lab-certified gemstones for planetary remedies and spiritual growth. Includes Ruby, Emerald, Blue Sapphire, and more precious stones.',
    price: '₹2,499',
    originalPrice: '₹4,999',
    slug: 'gemstone-collection',
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg",
    category: 'Gemstones',
    rating: 4.8,
  },
  {
    title: 'Rudraksha Mala & Beads',
    description: 'Energized Rudraksha beads and malas for protection, peace, and spiritual power. Handpicked from Nepal for maximum benefits.',
    price: '₹1,199',
    originalPrice: '₹2,399',
    slug: 'rudraksha-collection',
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752753830/rudrakshamala_pibmxj.jpg",
    category: 'Spiritual',
    rating: 4.9,
  },
  {
    title: 'Energized Yantras',
    description: 'Sacred spiritual diagrams (Yantras) energized for prosperity, health, and harmony. Copper and brass varieties available.',
    price: '₹799',
    originalPrice: '₹1,599',
    slug: 'yantras',
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752754014/yantra_kppksi.jpg",
    category: 'Yantras',
    rating: 4.7,
  },
  {
    title: 'Puja Samagri & Ritual Kits',
    description: 'Complete kits for home puja, havan, and Vedic rituals, including all essentials. Perfect for daily worship and special occasions.',
    price: '₹999',
    originalPrice: '₹1,999',
    slug: 'puja-samagri-kits',
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752754218/puja_samagri_sc0vpt.jpg",
    category: 'Ritual Kits',
    rating: 4.6,
  },
  {
    title: 'Astrology Reports & Kundli Services',
    description: 'Personalized astrology reports, Janam Kundli, and detailed horoscope analysis by expert astrologers.',
    price: '₹499',
    originalPrice: '₹999',
    slug: 'astrology-reports-kundli',
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752754647/kundli_h5hiqg.jpg",
    category: 'Reports',
    rating: 4.8,
  },
  {
    title: 'Spiritual Accessories',
    description: 'Incense holders, copper bottles, meditation mats, and more for your spiritual space. Premium quality materials.',
    price: '₹399',
    originalPrice: '₹799',
    slug: 'spiritual-accessories',
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752754784/accessory_viwtit.jpg",
    category: 'Accessories',
    rating: 4.5,
  },
  {
    title: 'Personalized Astrology Tools',
    description: 'Custom-engraved pendants, name plates, and tools based on your birth chart. Made to order with astrological precision.',
    price: '₹1,499',
    originalPrice: '₹2,999',
    slug: 'personalized-astrology-tools',
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752754941/personalized_astrology_tools_mj3501.jpg",
    category: 'Custom',
    rating: 4.9,
  },
  {
    title: 'Crystal Healing Collection',
    description: 'Premium healing crystals including Amethyst, Rose Quartz, and Clear Quartz for energy cleansing and spiritual healing.',
    price: '₹899',
    originalPrice: '₹1,799',
    slug: 'crystal-healing-collection',
    image: '/images/crystal-collection.jpg',
    category: 'Crystals',
    rating: 4.8,
  },
  {
    title: 'Sacred Malas & Prayer Beads',
    description: 'Traditional 108-bead malas made from sandalwood, tulsi, and other sacred materials for meditation and chanting.',
    price: '₹699',
    originalPrice: '₹1,399',
    slug: 'sacred-malas',
    image: '/images/sacred-malas.jpg',
    category: 'Meditation',
    rating: 4.7,
  },
  {
    title: 'Vedic Incense & Dhoop',
    description: 'Pure, natural incense sticks and dhoop cones made from traditional Vedic ingredients for purification rituals.',
    price: '₹299',
    originalPrice: '₹599',
    slug: 'vedic-incense',
    image: '/images/incense-collection.jpg',
    category: 'Aromatherapy',
    rating: 4.5,
  },
  {
    title: 'Copper Vessels & Utensils',
    description: 'Handcrafted copper water bottles, glasses, and ritual vessels for health benefits and spiritual practices.',
    price: '₹1,299',
    originalPrice: '₹2,599',
    slug: 'copper-vessels',
    image: '/images/copper-vessels.jpg',
    category: 'Wellness',
    rating: 4.6,
  },
  {
    title: 'Meditation Cushions & Mats',
    description: 'Comfortable meditation cushions and yoga mats made from organic materials for your spiritual practice.',
    price: '₹1,999',
    originalPrice: '₹3,999',
    slug: 'meditation-accessories',
    image: '/images/meditation-mat.jpg',
    category: 'Meditation',
    rating: 4.8,
  },
  {
    title: 'Spiritual Books & Mantras',
    description: 'Sacred texts, mantra books, and spiritual guides including Bhagavad Gita, Vedic scriptures, and more.',
    price: '₹599',
    originalPrice: '₹1,199',
    slug: 'spiritual-books',
    image: '/images/spiritual-books.jpg',
    category: 'Books',
    rating: 4.9,
  },
  {
    title: 'Feng Shui & Vastu Items',
    description: 'Feng Shui crystals, Vastu pyramids, and harmony items to balance energy in your home and workplace.',
    price: '₹799',
    originalPrice: '₹1,599',
    slug: 'feng-shui-vastu',
    image: '/images/feng-shui.jpg',
    category: 'Energy',
    rating: 4.7,
  },
  {
    title: 'Divine Statues & Idols',
    description: 'Beautiful brass and marble statues of Hindu deities, Buddha, and spiritual figures for your home temple.',
    price: '₹1,999',
    originalPrice: '₹3,999',
    slug: 'divine-statues',
    image: '/images/divine-statues.jpg',
    category: 'Devotional',
    rating: 4.8,
  },
  {
    title: 'Healing Bracelets & Jewelry',
    description: 'Gemstone bracelets, healing pendants, and spiritual jewelry for protection, love, and prosperity.',
    price: '₹1,199',
    originalPrice: '₹2,399',
    slug: 'healing-jewelry',
    image: '/images/healing-jewelry.jpg',
    category: 'Jewelry',
    rating: 4.9,
  },
];

// Helper function to format product keys to readable titles
function formatProductTitle(key: string) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace('Bracelet', ' Bracelet')
    .replace('Combo', ' Combo')
    .replace('Plate', ' Plate')
    .replace('Stone', ' Stone')
    .replace('Mala', ' Mala')
    .replace('Yantras', ' Yantras')
    .replace('Rudraksha', ' Rudraksha')
    .replace('Pyrite', ' Pyrite')
    .replace('Dhan Yog', 'Dhan Yog')
    .replace('Navgraha', 'Navgraha')
    .replace('Shanti', 'Shanti')
    .replace('Evil Eye', 'Evil Eye')
    .replace('Richie Rich', 'Richie Rich')
    .replace('Success', 'Success')
    .replace('Health Wellness', 'Health & Wellness')
    .replace('Career Booster', 'Career Booster')
    .replace('Protection', 'Protection')
    .replace('Peace Harmony', 'Peace & Harmony')
    .replace('Spiritual Growth', 'Spiritual Growth')
    .replace('Focus Clarity', 'Focus & Clarity')
    .replace('Confidence Booster', 'Confidence Booster')
    .replace('Calm Mind', 'Calm Mind')
    .trim();
}

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
      {/* Shop Categories Minimal - CINEMATIC VERSION */}
      <ShopCategoriesMinimal />
      
      {/* Simple Horizontal Banner - 3 GRID LAYOUT AFTER SACRED CATEGORIES */}
      <SimpleHorizontalBanner />

      {/* Product Announcements Ticker - RIGHT AFTER BANNER */}
      <ProductAnnouncementTicker />

      {/* Shop by Audience - AFTER BANNER */}
      <ShopByAudience />

      {/* Product Assurance Bar - AFTER SHOP BY AUDIENCE */}
      <ProductAssuranceBar />

      {/* Existing Content */}
      
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Main Page Heading */}
          {/* Removed duplicate <h1>Spiritual Shop</h1> here */}
          {/* Full-width Product Carousel (dynamically imported) */}
          {/* New Best Seller Cards with RecentPosts Layout */}
          <BestSellerCards products={products} />
          {/* <FeaturedProducts /> */}
          {/* Product Of The Day Section */}
          <ProductOfTheDay />
          {/* Astrologer Profile, Statistics, Testimonials */}
          <Statistics />
          
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