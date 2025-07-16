import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Link from 'next/link';

const topSelling = [
  {
    name: 'Rose Quartz Bracelet With Buddha',
    image: '/images/course-2.jpg',
    slug: 'rose-quartz-bracelet',
  },
  {
    name: 'Gemstone Consultation With...',
    image: '/images/gemstones.jpg',
    slug: 'gemstone-consultation',
  },
  {
    name: 'Money Magnet Bracelet',
    image: '/images/money-magnet.jpg',
    slug: 'money-magnet-bracelet',
  },
  {
    name: 'Dhan Yog Bracelet',
    image: '/images/dhan-yog-bracelet.jpg',
    slug: 'dhan-yog-bracelet',
  },
  {
    name: 'Raw Pyrite Bracelet',
    image: '/images/pyrite.jpg',
    slug: 'raw-pyrite-bracelet',
  },
];

const newlyLaunched = [
  {
    name: 'Grahan Dosh Shanti Pooja',
    image: '/images/course-4.jpg',
    slug: 'grahan-dosh-shanti-pooja',
  },
  {
    name: 'Guru Chandal Dosh Nivaran Pooja',
    image: '/images/course-5.jpg',
    slug: 'guru-chandal-dosh-nivaran-pooja',
  },
  {
    name: 'Loan(Karz) Mukti Pooja',
    image: '/images/course-6.jpg',
    slug: 'loan-mukti-pooja',
  },
  {
    name: 'Pitra Dosh Shanti Pooja',
    image: '/images/course-1.jpg',
    slug: 'pitra-dosh-shanti-pooja',
  },
  {
    name: 'Vivah Badha Nivaran Pooja',
    image: '/images/astrowellness.jpg',
    slug: 'vivah-badha-nivaran-pooja',
  },
];

function CarouselSection({ title, items, headingColor = '#232323' }: { title: string; items: any[]; headingColor?: string }) {
  return (
    <section className="w-full my-12">
      <h2 className="text-2xl md:text-3xl font-bold uppercase text-center mb-8 tracking-wide" style={{ letterSpacing: '0.04em', color: headingColor }}>{title}</h2>
      <div className="relative w-full px-0">
        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselPrevious />
          <CarouselContent className="flex items-center justify-center">
            {items.map((item, idx) => (
              <CarouselItem key={item.slug} className="basis-[180px] max-w-[180px] px-2 flex flex-col items-center">
                <Link href={`/${item.slug}`} className="flex flex-col items-center group">
                  <div className="rounded-full border-4 border-yellow-400 w-36 h-36 flex items-center justify-center overflow-hidden bg-white shadow-md group-hover:scale-105 transition-transform duration-200">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <span className="mt-3 text-center text-base font-medium text-black leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</span>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

export default function ServiceCarousels() {
  return (
    <div className="w-full">
      <CarouselSection title="TOP SELLING" items={topSelling} headingColor="#232323" />
      <CarouselSection title="NEWLY LAUNCHED" items={newlyLaunched} />
    </div>
  );
} 