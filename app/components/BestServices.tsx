'use client'

import { useLanguage } from '../contexts/useLanguage'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { services as servicesData } from '../../data/services.js'
import { ReusableServiceCard } from './ReusableServiceCard'

export function BestServices() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageSize = 5; // Number of services per page

  // Use imported services data and select the first 6 services for display
  const displayServices = servicesData.slice(0, 6);
  const totalPages = Math.max(1, Math.ceil(displayServices.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * pageSize;
  const pageItems = displayServices.slice(startIdx, startIdx + pageSize);

  const handlePageChange = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  return (
    <section className="min-h-screen py-16 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl p-10 mb-12 text-center shadow-xl overflow-hidden bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe]"
        >
          <div className="absolute inset-0 z-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 10%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.08) 0%, transparent 15%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 10%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 12%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 10%)', backgroundSize: '300px 300px, 400px 400px, 200px 200px, 350px 350px, 250px 250px' }}></div>

          <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-black">
            {t('bestServices.bannerHeading')}
          </h2>
          <p className="relative z-10 text-lg md:text-xl mb-6 opacity-90 text-black">
            {t('bestServices.bannerDescription')}
          </p>
        </motion.div>

        {/* Services Section */}
        <div className="mb-12" ref={containerRef}>
          {/* Header with controls */}
          <div className="mb-6">
            <div className="flex justify-end">
              <div className="flex items-center gap-4">
                {/* View All Button */}
                <Link href="/services/all">
                  <button className="px-6 py-3 bg-black text-white font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-colors duration-200 flex items-center gap-2">
                    View All
                    <span className="text-white">→</span>
                  </button>
                </Link>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-sm"
                      aria-label="Previous page"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 hover:text-black shadow-sm"
                      aria-label="Next page"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Services Row */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`page-${currentPage}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex gap-6 overflow-hidden"
            >
              {pageItems.map((service, index) => (
                <div key={service.slug} className="w-72 flex-shrink-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.25, 
                      delay: index * 0.1, 
                      type: 'spring', 
                      stiffness: 300 
                    }}
                  >
                    <ReusableServiceCard 
                      service={service} 
                      viewMode="grid"
                      className="h-full"
                    />
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
