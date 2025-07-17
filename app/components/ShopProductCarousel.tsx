"use client";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ProductServiceCard } from './UniversalServiceGrid';

const autoplayPlugin = Autoplay({ delay: 3500, stopOnInteraction: false });

type Product = {
  image?: string;
  title: string;
  price: string;
  oldPrice?: string;
  reviewsCount?: number;
  slug: string;
  description: string;
};

interface ShopProductCarouselProps {
  products: Product[];
}

export default function ShopProductCarousel({ products }: ShopProductCarouselProps) {
  return (
    <div
      className="w-screen max-w-none relative left-1/2 right-1/2 -mx-[50vw] px-0"
      style={{ left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
          background: transparent !important;
        }
        .scrollbar-hide {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        /* Hide scrollbar for all children */
        div::-webkit-scrollbar {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
          background: transparent !important;
        }
      `}</style>
      {/* Recommendations Heading */}
      <div className="w-full flex flex-col items-center justify-center mb-2 mt-8">
        <h2
          className="text-3xl md:text-4xl mb-8 text-center font-normal text-black"
          style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, letterSpacing: '0.01em' }}
        >
          Best Seller
        </h2>
      </div>
      <Carousel
        opts={{ align: 'start', loop: true, dragFree: true, containScroll: 'trimSnaps' }}
        plugins={[autoplayPlugin]}
        className="w-full"
      >
        <CarouselContent className="py-2 flex items-stretch">
          {products.map((product: Product, idx: number) => (
            <CarouselItem key={product.slug} className="basis-[320px] max-w-[320px] px-4 flex items-stretch">
              <ProductServiceCard
                image={product.image || '/images/placeholder.jpg'}
                title={product.title}
                description={product.description}
                badge={product.oldPrice ? 'BEST SELLER' : ''}
                href={`/shop/${product.slug}`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
} 