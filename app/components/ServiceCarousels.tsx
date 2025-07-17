import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
    <section className="w-screen overflow-x-clip my-12" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
      <h2 className="text-2xl md:text-3xl font-bold uppercase mb-8 tracking-wide text-center w-full" style={{ letterSpacing: '0.04em', color: headingColor }}>{title}</h2>
      <div className="w-screen overflow-x-clip" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
        <div className="flex flex-row justify-evenly items-stretch w-screen gap-0">
          {items.map((item) => (
            <div key={item.slug} className="flex flex-col items-center justify-center flex-1 min-w-0" style={{ maxWidth: '240px' }}>
              <Link href={`/${item.slug}`} className="flex flex-col items-center group w-full">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="rounded-full border-4 border-yellow-400 w-36 h-36 flex items-center justify-center overflow-hidden bg-white shadow-md"
                >
                  <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                </motion.div>
                <span className="mt-4 text-center text-lg font-semibold text-black leading-tight w-full" style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiceCarousels() {
  return (
    <div className="w-screen overflow-x-clip" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
      <CarouselSection title="TOP SELLING" items={topSelling} headingColor="#232323" />
      <CarouselSection title="NEWLY LAUNCHED" items={newlyLaunched} />
    </div>
  );
} 