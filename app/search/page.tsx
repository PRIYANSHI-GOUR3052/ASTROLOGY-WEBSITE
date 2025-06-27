'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { blogPosts } from '../data/blogPosts';
import { serviceContent } from '../data/serviceContent';
import { horoscopeCards } from '../data/horoscopeCards';
import { motion } from 'framer-motion';
import { TarotReadingContent } from '../components/TarotReadingContent';

// Define interfaces locally to match the actual data structure
interface LocalizedString {
  hi: string;
  en: string;
}

interface BlogPost {
  title: LocalizedString;
  description: LocalizedString;
  content: LocalizedString;
  author: string;
}

interface Service {
    title: string;
    description: string;
}

interface SearchResult {
  type: 'Blog' | 'Service' | 'Horoscope';
  title: string;
  description: string;
  href: string;
}

interface HoroscopeCard {
  title: LocalizedString;
  description: LocalizedString;
  href: string;
}

function SearchComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams ? searchParams.get('q') : null;
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query) {
      const lowerCaseQuery = query.toLowerCase();

      if (lowerCaseQuery === 'astrology course') {
        router.push('/courses');
        return; 
      }

      if (lowerCaseQuery === 'blogs') {
        router.push('/blog');
        return;
      }
      
      if (lowerCaseQuery === 'services') {
        const allServices: SearchResult[] = Object.entries(serviceContent)
          .map(([slug, service]) => {
            const isRootService = ['kundali-matching', 'online-puja', 'panchang'].includes(slug);
            return {
              type: 'Service',
              title: service.title,
              description: service.description,
              href: isRootService ? `/${slug}` : `/services/${slug}`,
            };
          });
        setResults(allServices);
        return;
      }

      if (lowerCaseQuery !== 'tarot reading') {
        // Search through blog posts
        const blogResults: SearchResult[] = Object.entries(blogPosts)
          .filter(([slug, post]) => 
            post.title.en.toLowerCase().includes(lowerCaseQuery) ||
            post.title.hi.toLowerCase().includes(lowerCaseQuery) ||
            post.content.en.toLowerCase().includes(lowerCaseQuery) ||
            post.content.hi.toLowerCase().includes(lowerCaseQuery) ||
            post.author.en.toLowerCase().includes(lowerCaseQuery)
          )
          .map(([slug, post]) => ({
            type: 'Blog',
            title: post.title.en, // Display English title in results
            description: post.description.en.substring(0, 150) + '...',
            href: `/blog/${slug}`,
          }));

        // Search through services
        const serviceResults: SearchResult[] = Object.entries(serviceContent)
          .filter(([slug, service]) => 
            service.title.toLowerCase().includes(lowerCaseQuery) ||
            service.description.toLowerCase().includes(lowerCaseQuery)
          )
          .map(([slug, service]) => {
            const isRootService = ['kundali-matching', 'online-puja', 'panchang'].includes(slug);
            return {
              type: 'Service',
              title: service.title,
              description: service.description,
              href: isRootService ? `/${slug}` : `/services/${slug}`,
            };
          });
        
        // Search through horoscope cards
        const horoscopeResults: SearchResult[] = horoscopeCards
          .filter(card =>
            card.title.en.toLowerCase().includes(lowerCaseQuery) ||
            card.title.hi.toLowerCase().includes(lowerCaseQuery) ||
            card.description.en.toLowerCase().includes(lowerCaseQuery) ||
            card.description.hi.toLowerCase().includes(lowerCaseQuery)
          )
          .map(card => ({
            type: 'Horoscope', // New type
            title: card.title.en,
            description: card.description.en,
            href: card.href,
          }));
          
        setResults([...blogResults, ...serviceResults, ...horoscopeResults]);
      } else {
        setResults([]);
      }
    } else {
      setResults([]);
    }
  }, [query, router]);

  if (query && query.toLowerCase() === 'tarot reading') {
    return <TarotReadingContent />;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-40"
         style={{
           backgroundImage: 'radial-gradient(circle at top, rgba(121, 69, 236, 0.15), transparent 40%)',
         }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <motion.h1 
            className="text-5xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              Search Results
            </span>
          </motion.h1>

          {query ? (
            <motion.p 
              className="text-lg text-gray-400 mb-10 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Showing results for: <span className="font-semibold text-violet-400">"{query}"</span>
            </motion.p>
          ) : (
             <p className="text-lg text-gray-400 mb-10 text-center">
              Enter a term above to discover cosmic insights.
            </p>
          )}

          <div className="space-y-6">
            {results.length > 0 ? (
              results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={result.href} >
                    <div className="block bg-white/5 p-6 rounded-xl shadow-lg transition-all duration-300 hover:bg-white/10 hover:shadow-violet-500/20 border border-white/10">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-3 ${
                          result.type === 'Blog' ? 'bg-blue-500/10 text-blue-300' :
                          result.type === 'Service' ? 'bg-green-500/10 text-green-300' :
                          'bg-yellow-500/10 text-yellow-300'
                        }`}
                      >
                        {result.type}
                      </span>
                      <h3 className="text-2xl font-bold text-white hover:text-violet-400 transition-colors">
                        {result.title}
                      </h3>
                      <p className="text-gray-400 mt-2">
                        {result.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              query && (
                <motion.div 
                  className="text-center bg-white/5 p-10 rounded-xl shadow-lg border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-white">No Results Found</h2>
                  <p className="text-gray-400 mt-3 max-w-md mx-auto">
                    We couldn't find anything matching your search. Please try a different celestial term.
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen pt-40 text-center">Loading search results...</div>}>
            <SearchComponent />
        </Suspense>
    )
} 