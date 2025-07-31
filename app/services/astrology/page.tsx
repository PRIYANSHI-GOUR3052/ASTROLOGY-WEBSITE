'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedStars } from '../../components/AnimatedStars';
import { MysticBackground } from '../../components/MysticBackground';
import { CTASection } from '../../components/CTASection';
import { Testimonials } from '../../components/Testimonials';
import { AstrologerProfile } from '../../components/AstrologerProfile';
import { DailyHoroscope } from '../../components/DailyHoroscope';
import { AboutSummary } from '../../components/AboutSummary';
import { UniversalCartButton } from '../../components/UniversalCartButton';
import { DrNarendraProfile } from '../../components/DrNarendraProfile';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useLanguage } from '../../contexts/useLanguage';

export default function AstrologyMainPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = [
    'Overview', 'What is Astrology?', 'Benefits', 'FAQs'
  ];
  const servicePrice = 1500;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-100 to-white text-black pt-0">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto px-4 pb-20 relative z-10 pt-4">
          {/* Banner Heading */}
          <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-8 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff] mt-0">
            <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{t('astrologyServices.pageTitle')}</h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
              {t('astrologyServices.pageDescription')}
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                  >
                    {tab === 'Overview' && t('astrologyServices.tabs.overview')}
                    {tab === 'What is Astrology?' && t('astrologyServices.tabs.whatIsAstrology')}
                    {tab === 'Benefits' && t('astrologyServices.tabs.benefits')}
                    {tab === 'FAQs' && t('astrologyServices.tabs.faqs')}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              {activeTab === 'Overview' && (
                <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('astrologyServices.overview.title')}</h2>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    {t('astrologyServices.overview.content.0')}
                  </p>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    {t('astrologyServices.overview.content.1')}
                  </p>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    {t('astrologyServices.overview.content.2')}
                  </p>
                </section>
              )}
              {activeTab === 'What is Astrology?' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('astrologyServices.whatIsAstrology.title')}</h2>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    {t('astrologyServices.whatIsAstrology.content.0')}
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    {t('astrologyServices.whatIsAstrology.content.1')}
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    {t('astrologyServices.whatIsAstrology.content.2')}
                  </p>
                </section>
              )}
              {activeTab === 'Benefits' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('astrologyServices.benefits.title')}</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 40 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.6 + (index * 0.1) }} 
                        viewport={{ once: true }} 
                        className="rounded-2xl shadow-lg p-8 border border-indigo-100 flex flex-col gap-4" 
                        style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}
                      >
                        <h3 className="text-xl font-semibold text-indigo-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t(`astrologyServices.benefits.benefits.${index}.title`)}</h3>
                        <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                          {t(`astrologyServices.benefits.benefits.${index}.description`)}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
              {activeTab === 'FAQs' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>{t('astrologyServices.faqs.title')}</h2>
                  <div className="space-y-8">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <div key={index}>
                        <div className="flex items-center mb-2">
                          <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                          <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {t(`astrologyServices.faqs.questions.${index}.question`)}
                          </span>
                        </div>
                        <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                          {t(`astrologyServices.faqs.questions.${index}.answer`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <AboutSummary />
            </div>
          </div>

          {/* Testimonials */}
          <section className="mb-20">
            <Testimonials />
          </section>

          {/* Astrologer Profiles */}
          <section className="mb-20">
            <AstrologerProfile />
          </section>

          {/* Final CTA */}
          <section className="mb-10">
            <CTASection />
          </section>
        </div>
      </MysticBackground>
    </div>
  );
}

