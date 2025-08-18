"use client";
import { useState } from 'react';
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import dynamic from 'next/dynamic';
import ShopBanner from '../components/ShopBanner'
import NakshatraTicker from '../components/NakshatraTicker'
import { ServicesSearch } from '../components/ServicesSearch'
import { UniversalServiceCardGrid } from '../components/UniversalServiceCardGrid'
import ServiceShowcase from '../components/ServiceShowcase'
import ServiceCarousels from '../components/ServiceCarousels'
import NakshatraGyaanBanner from '../components/NakshatraGyaanBanner'
import ProductAssuranceBar from '../components/ProductAssuranceBar'
import { services } from '../data/servicesData'

const CTASection = dynamic(() => import('../components/CTASection').then(mod => mod.CTASection), { loading: () => <div>Loading...</div>, ssr: false });
const SpiritualJourneyBanner = dynamic(() => import('../components/SpiritualJourneyBanner'), { loading: () => <div>Loading...</div>, ssr: false });
export default function ServicesPage() {
  const [search, setSearch] = useState('');

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(search.toLowerCase()) ||
    service.description.toLowerCase().includes(search.toLowerCase())
  );

  // Normalized list for ServiceShowcase (expects numeric price) while retaining original for first grid
  const toNumber = (val: string | number | undefined): number => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const cleaned = val.replace(/[^0-9.]/g, '');
      const n = Number(cleaned);
      return isNaN(n) ? 0 : n;
    }
    return 0;
  };
  const showcaseServices = filteredServices.map(s => ({
    ...s,
    price: toNumber((s as typeof services[0]).price),
    originalPrice: (s as typeof services[0]).originalPrice !== undefined ? toNumber((s as typeof services[0]).originalPrice) : undefined,
  }));

  // Service segmentation:
  // - First 3: static horizontal grid
  // - Next 12: Featured (paginated single-row showcase)
  // - Next 6: Expert Consultations
  // - Next 6: Specialized Services
  const firstThreeServices = filteredServices.slice(0, 3); // keep original shape for UniversalServiceCardGrid
  const featuredServices = showcaseServices.slice(3, 15); // up to 12 items
  const expertConsultations = showcaseServices.slice(15, 21);
  const specializedServices = showcaseServices.slice(21, 27);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-50 via-white to-orange-50 -mt-4">
      <AnimatedStars />
      <MysticBackground>
      
      {/* SHOP BANNER AT THE TOP */}
      <ShopBanner variant="services" />
      
      {/* NAKSHATRA TICKER */}
      <NakshatraTicker />
      
      <div className="container mx-auto pt-8 px-4 pb-16 relative z-10">
        <h1
          className="text-5xl md:text-7xl mb-2 text-center font-normal text-black"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, letterSpacing: '0.01em', marginTop: '0px' }}
        >
          Our Spiritual Services
        </h1>
        <p
          className="text-xl text-center mb-10 max-w-3xl mx-auto"
          style={{ color: '#232323', fontFamily: 'Playfair Display, serif', fontWeight: 400, letterSpacing: '0.01em' }}
        >
          Embark on a transformative journey with our comprehensive range of spiritual services. Let our expert astrologers and spiritual guides illuminate your path to self-discovery and enlightenment.
        </p>

        {/* Services Search */}
        <ServicesSearch onSearchChange={setSearch} />

        {/* First 3 cards in horizontal grid
        <UniversalServiceCardGrid
          services={firstThreeServices}
          className=""
          maxCards={3}
          gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        /> */}

        {/* Featured Services (expanded & paginated) */}
        <ServiceShowcase
          title="Featured Services"
          subtitle="Discover our most popular spiritual services and expert consultations"
          services={featuredServices}
          pageSize={5}
        />

        {/* Service Carousels (Top-Selling Section) */}
        <div className="mt-16 mb-32">
          <ServiceCarousels />
        </div>

        {/* Nakshatra Gyaan Banner */}
        <div className="mt-16 mb-32">
          <NakshatraGyaanBanner />
        </div>

        {/* Expert Services */}
        <ServiceShowcase
          title="Expert Consultations"
          subtitle="Get guidance from our top astrologers, numerologists, and vastu experts"
          services={expertConsultations}
          pageSize={5}
        />

        {/* Specialized Services */}
        <ServiceShowcase
          title="Specialized Services"
          subtitle="Unique spiritual offerings tailored to your needs"
          services={specializedServices}
          pageSize={5}
        />

        {/* Product Assurance Bar */}
        <ProductAssuranceBar />
        
        <div className="mt-16">
          <CTASection />
        </div>
      </div>

      {/* Spiritual Journey Banner */}
      <SpiritualJourneyBanner />
        </MysticBackground>
    </div>
  )
}
