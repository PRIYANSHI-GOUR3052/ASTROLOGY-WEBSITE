'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '../contexts/useLanguage'
import { Star, Calendar, Gem, BookOpen, HeartPulse } from 'lucide-react'

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-black text-white py-20 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Floating decorative cards similar to footer */}
      <Link href="/services/astrology" className="hidden lg:block absolute top-10 left-10 rotate-[-12deg] opacity-90 z-10 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 rounded-2xl p-6 w-72 shadow-2xl">
          <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">{t('hero.corner_cards.0.tag')}</div>
          <h3 className="text-white font-bold text-lg mb-2 leading-snug">{t('hero.corner_cards.0.title')}</h3>
          <div className="flex items-center text-white/80 text-sm mb-4">
            <span className="mr-2">🌟</span>
            <span>{t('hero.corner_cards.0.subtext')}</span>
          </div>
          <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all hover:bg-white/30 inline-block">{t('hero.corner_cards.0.linkText')}</span>
        </div>
      </Link>
      
      <Link href="/services/career-guidance" className="hidden lg:block absolute top-16 right-10 rotate-[12deg] opacity-90 z-10 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 rounded-2xl p-6 w-72 shadow-2xl">
          <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">{t('hero.corner_cards.1.tag')}</div>
          <h3 className="text-white font-bold text-lg mb-2 leading-snug">{t('hero.corner_cards.1.title')}</h3>
          <div className="flex items-center text-white/80 text-sm mb-4">
            <span className="mr-2">📅</span>
            <span>{t('hero.corner_cards.1.subtext')}</span>
          </div>
          <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all hover:bg-white/30 inline-block">{t('hero.corner_cards.1.linkText')}</span>
        </div>
      </Link>

      <div className="max-w-6xl mx-auto px-5 relative z-20">
        {/* Main hero content */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            {t('hero.mainHeading')}<br />
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
              {t('hero.subHeading')}
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-400 text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.secondaryText')}
          </motion.p>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 max-w-md mx-auto mb-12 justify-center"
          >
            <Link 
              href="/kundali-matching"
              className="bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold px-8 py-4 rounded-full text-lg transition-transform hover:scale-105 shadow-xl"
            >
              {t('hero.ctaButton')}
            </Link>
            <Link 
              href="/services"
              className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:bg-white/20"
            >
              {t('learnMore')}
            </Link>
          </motion.div>

          {/* Categories Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-12"
          >
            {[
              { icon: Star, label: t('hero.categories.nakshatras') },
              { icon: Calendar, label: t('hero.categories.horoscopes') },
              { icon: Gem, label: t('hero.categories.remedies') },
              { icon: BookOpen, label: t('hero.categories.vedicTexts') },
              { icon: HeartPulse, label: t('hero.categories.astroWellness') }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group"
              >
                <category.icon className="w-8 h-8 mx-auto mb-2 text-violet-400 group-hover:text-violet-300 transition-colors" />
                <p className="text-white/80 text-sm text-center font-medium">{category.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Search Tags */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
          >
            {[
              t('hero.searchTags.predictive'),
              t('hero.searchTags.compatibility'),
              t('hero.searchTags.transits'),
              t('hero.searchTags.remedies'),
              t('hero.searchTags.dasha')
            ].map((tag, index) => (
              <span 
                key={index}
                className="bg-white/10 border border-white/20 text-white/80 px-4 py-2 rounded-full text-sm hover:bg-white/20 transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Large brand name at bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center"
        >
          <h2 className="text-[64px] md:text-[80px] font-bold text-white/10 tracking-wider m-0 select-none">
            {t('footer.brand.name')}
          </h2>
        </motion.div>
      </div>
    </section>
  );
} 