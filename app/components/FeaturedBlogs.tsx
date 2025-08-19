'use client'

import { blogPosts } from '../data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/useLanguage';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define proper types for blog data
interface BlogContent {
  [key: string]: string;
}

interface BlogPost {
  title: BlogContent;
  content: BlogContent;
  description: BlogContent;
  imageUrl: string;
  date: string;
}

const getReadTime = (content: string) => {
  // Simple estimate: 200 words per minute
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

// Map blog titles to their correct URL keys
const getBlogUrl = (title: string) => {
  const urlMap: { [key: string]: string } = {
    'The Influence of Planets': 'the-influence-of-planets',
    'Understanding Vedic Astrology': 'understanding-vedic-astrology',
    'Gemstones and Their Powers': 'gemstones-and-their-powers',
    'Numerology Basics': 'numerology-basics',
    'Understanding Your Birth Chart': 'understanding-your-birth-chart',
    'The Power of Meditation': 'power-of-meditation'
  };
  
  return urlMap[title] || title.toLowerCase().replace(/\s+/g, '-');
};

export default function FeaturedBlogs() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
  }, []);
  
  // Check if we're on the blog page
  const isBlogPage = pathname === '/blog';
  
  // Get the first 6 blogs
  const blogs = Object.values(blogPosts).slice(0, 6) as BlogPost[];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black">{t('blog.featured.heading')}</h2>
        {!isBlogPage && (
          <Link href="/blog" className="inline-flex items-center px-4 py-2 rounded-lg bg-black text-white text-base font-semibold hover:bg-gray-800 transition">
            {t('blog.featured.viewAll')}
            <span className="ml-2">&rarr;</span>
          </Link>
        )}
      </div>
      
      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, idx) => {
          const safeLang = blog.title[lang] ? lang : 'en';
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              whileHover={{ y: -8, boxShadow: '0 8px 32px 0 rgba(80,80,120,0.10)' }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col h-full transition-all duration-300 cursor-pointer"
            >
              <div className="relative w-full flex items-center justify-center p-4" style={{ background: 'transparent', transition: 'background 0.3s' }}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="w-full h-48 md:h-56 relative">
                  <Image src={blog.imageUrl} alt={blog.title.en} fill className="object-cover rounded-2xl" style={{ objectFit: 'cover', position: 'absolute' }} />
                </motion.div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-xl font-extrabold mb-2 leading-snug text-black">{blog.title[safeLang]}</h3>
                <div className="flex items-center text-gray-500 text-sm mb-3 gap-4">
                  <span>📅 {blog.date}</span>
                  <span>⏱ {getReadTime(blog.content[safeLang])} {t('blog.featured.minRead')}</span>
                </div>
                <p className="text-gray-700 mb-4 line-clamp-2">{blog.description[safeLang]}</p>
                <motion.div whileHover={{ x: 5 }} className="mt-auto w-max">
                  <Link href={`/blog/${getBlogUrl(blog.title.en)}`} className="inline-flex items-center px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition">
                    {t('blog.featured.readMore')}
                    <span className="ml-2">→</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile View - Horizontal Scroll */}
      <div className="md:hidden">
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={`absolute left-0 top-32 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-opacity ${
              canScrollLeft ? 'opacity-100 hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ marginLeft: '-20px' }}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={`absolute right-0 top-32 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center transition-opacity ${
              canScrollRight ? 'opacity-100 hover:bg-gray-50' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{ marginRight: '-20px' }}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-2"
            style={{ 
              scrollSnapType: 'x mandatory', 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {blogs.map((blog, idx) => {
              const safeLang = blog.title[lang] ? lang : 'en';
              return (
                <div
                  key={`mobile-${idx}`}
                  className="flex-none w-[calc(52%-6px)] min-w-[170px] snap-start"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[300px] flex flex-col">
                    <div className="relative w-full h-32 flex-shrink-0">
                      <Image 
                        src={blog.imageUrl} 
                        alt={blog.title.en} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                        {blog.title[safeLang]}
                      </h3>
                      <div className="text-xs text-gray-500 mb-3 space-y-1">
                        <div>📅 {blog.date}</div>
                        <div>⏱ {getReadTime(blog.content[safeLang])} {t('blog.featured.minRead')}</div>
                      </div>
                      <div className="mt-auto">
                        <Link 
                          href={`/blog/${getBlogUrl(blog.title.en)}`}
                          className="block w-full px-3 py-2 rounded-lg bg-black text-white text-xs font-semibold text-center hover:bg-gray-800 transition-all"
                        >
                          {t('blog.featured.readMore')} →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}