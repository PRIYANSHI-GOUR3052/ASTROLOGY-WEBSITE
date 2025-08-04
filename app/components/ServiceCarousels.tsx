import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CarouselItem {
  name: string;
  image: string;
  slug: string;
}

const topSelling: CarouselItem[] = [
  {
    name: 'Rose Quartz Bracelet With Buddha',
    image: '/images/course-2.jpg',
    slug: 'rose-quartz-bracelet',
  },
  {
    name: 'Gemstone Consultation With...',
    image: '/images/course-1.jpg',
    slug: 'gemstone-consultation',
  },
  {
    name: 'Money Magnet Bracelet',
    image: '/images/course-3.jpg',
    slug: 'money-magnet-bracelet',
  },
  {
    name: 'Dhan Yog Bracelet',
    image: '/images/course-4.jpg',
    slug: 'dhan-yog-bracelet',
  },
  {
    name: 'Raw Pyrite Bracelet',
    image: '/images/course-5.jpg',
    slug: 'raw-pyrite-bracelet',
  },
];

const newlyLaunched: CarouselItem[] = [
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
    image: '/images/course-2.jpg',
    slug: 'vivah-badha-nivaran-pooja',
  },
];

import React, { useState } from 'react';

function CarouselSection({ title, items, headingColor = '#232323' }: { title: string; items: CarouselItem[]; headingColor?: string }) {
  const [showAll, setShowAll] = useState(false);
  const displayItems = showAll ? items : items.slice(0, 5);
  const hasMore = items.length > 5;
  return (
    <section className="w-screen overflow-x-clip my-8 md:my-12" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold uppercase mb-6 md:mb-8 tracking-wide text-center w-full px-4" style={{ letterSpacing: '0.04em', color: headingColor }}>{title}</h2>
      <div className="w-screen overflow-x-clip" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
        {/* Mobile: 3 on first row, 2 on second row, both evenly spaced */}
        <div className="flex flex-col md:hidden w-full px-4 gap-4">
          <div className="flex flex-row justify-evenly items-center w-full gap-4">
            {displayItems.slice(0, 3).map((item) => (
              <div key={item.slug} className="flex flex-col items-center justify-center flex-1">
                <Link href={`/${item.slug}`} className="flex flex-col items-center group w-full">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="rounded-full border-4 border-yellow-400 w-20 h-20 flex items-center justify-center overflow-hidden bg-white shadow-md mx-auto"
                  >
                    <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover w-full h-full" />
                  </motion.div>
                  <span className="mt-3 text-center text-xs font-semibold text-black leading-tight w-full px-1" style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</span>
                </Link>
              </div>
            ))}
          </div>
          {displayItems.length > 3 && (
            <div className="flex flex-row justify-evenly items-center w-full gap-4">
              {displayItems.slice(3, 5).map((item) => (
                <div key={item.slug} className="flex flex-col items-center justify-center flex-1">
                  <Link href={`/${item.slug}`} className="flex flex-col items-center group w-full">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="rounded-full border-4 border-yellow-400 w-20 h-20 flex items-center justify-center overflow-hidden bg-white shadow-md mx-auto"
                    >
                      <Image src={item.image} alt={item.name} width={80} height={80} className="object-cover w-full h-full" />
                    </motion.div>
                    <span className="mt-3 text-center text-xs font-semibold text-black leading-tight w-full px-1" style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Desktop: all 5 cards in one row, evenly spaced */}
        <div className="hidden md:flex flex-row justify-evenly items-center w-full gap-8 px-4">
          {displayItems.map((item) => (
            <div key={`desktop-${item.slug}`} className="flex flex-col items-center justify-center flex-1">
              <Link href={`/${item.slug}`} className="flex flex-col items-center group w-full">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="rounded-full border-4 border-yellow-400 w-28 lg:w-36 h-28 lg:h-36 flex items-center justify-center overflow-hidden bg-white shadow-md mx-auto"
                >
                  <Image src={item.image} alt={item.name} width={144} height={144} className="object-cover w-full h-full" />
                </motion.div>
                <span className="mt-4 text-center text-sm lg:text-lg font-semibold text-black leading-tight w-full" style={{ fontFamily: 'Inter, sans-serif' }}>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>
        {/* View More button */}
        {hasMore && !showAll && (
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-full shadow hover:bg-yellow-500 transition-colors"
              onClick={() => setShowAll(true)}
            >
              View More
            </button>
          </div>
        )}
        {/* View Less button */}
        {hasMore && showAll && (
          <div className="flex justify-center mt-4">
            <button
              className="px-6 py-2 bg-gray-200 text-black font-semibold rounded-full shadow hover:bg-gray-300 transition-colors"
              onClick={() => setShowAll(false)}
            >
              View Less
            </button>
          </div>
        )}
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