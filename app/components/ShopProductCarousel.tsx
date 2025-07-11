"use client";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';

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
              <Link href={`/shop/${product.slug}`} className="block h-full w-full" style={{ textDecoration: 'none' }}>
                <div className="bg-[#f7f5ed] rounded-2xl p-6 flex flex-col h-[400px] group transition-all duration-200 cursor-pointer w-full">
                  {/* Product Image */}
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 flex items-center justify-center bg-[#f7f5ed]">
                    <img
                      src={product.image || `https://placehold.co/320x320?text=${encodeURIComponent(product.title)}`}
                      alt={product.title}
                      className="object-cover w-full h-full"
                      style={{ minHeight: 180, minWidth: 180 }}
                    />
                  </div>
                  {/* Title */}
                  <h3 className="text-lg font-bold mb-1 text-[#23244a] text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{product.title}</h3>
                  {/* Reviews */}
                  <div className="flex items-center gap-1 mb-2 justify-center">
                    <span className="text-[#FFD700] text-base">&#9733; &#9733; &#9733; &#9733; &#9733;</span>
                    <span className="text-xs text-[#2C3A4B] ml-1 font-semibold">{product.reviewsCount || (1000 + idx * 100)} reviews</span>
                  </div>
                  {/* Price and Add Button */}
                  <div className="flex flex-col items-center justify-end mt-auto pt-2 w-full">
                    <span className="text-lg font-bold text-[#2C3A4B]" style={{ fontFamily: 'Playfair Display, serif' }}>{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through -mt-1">{product.oldPrice}</span>
                    )}
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
} 