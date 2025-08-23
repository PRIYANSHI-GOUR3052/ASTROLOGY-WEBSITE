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

export default function MercuryRetrogradeGuidePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = [
    'Overview', 'What is Mercury Retrograde?', 'Effects', 'FAQs'
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-100 to-white text-black pt-0">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto px-4 pb-20 relative z-10 pt-4">
          {/* Banner Heading */}
          <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-8 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff] mt-0">
            <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Mercury Retrograde Guide</h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
              Understanding the cosmic phenomenon that affects communication, technology, and daily life
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
                    {tab}
                  </button>
                ))}
              </div>
              {/* Tab Content */}
              {activeTab === 'Overview' && (
                <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Understanding Mercury Retrograde</h2>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Mercury retrograde is one of the most talked-about astrological phenomena, occurring when the planet Mercury appears to move backward in its orbit from Earth&apos;s perspective. This optical illusion happens three to four times a year and typically lasts for about three weeks.
                  </p>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    During these periods, Mercury&apos;s energy becomes more introspective and reflective, affecting areas of life that Mercury governs: communication, travel, technology, contracts, and daily routines. While often feared, Mercury retrograde periods can actually be beneficial for review, reflection, and revision.
                  </p>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Understanding how to navigate Mercury retrograde can help you minimize challenges and maximize the opportunities for growth and improvement that these periods offer. With proper preparation and awareness, you can turn potential obstacles into valuable learning experiences.
                  </p>
                </section>
              )}
              {activeTab === 'What is Mercury Retrograde?' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>The Science and Astrology Behind Mercury Retrograde</h2>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    From an astronomical perspective, Mercury retrograde occurs when Earth overtakes Mercury in its orbit around the Sun. As Earth moves faster in its orbit, Mercury appears to slow down, stop, and then move backward relative to the background stars. This creates the illusion of retrograde motion.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    In astrology, Mercury rules communication, thinking, learning, and the exchange of information. When Mercury goes retrograde, these areas of life are said to be affected, often leading to miscommunications, technological glitches, travel delays, and the need to revisit or revise plans and projects.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    The retrograde period is divided into three phases: the pre-shadow phase (when Mercury approaches the retrograde point), the retrograde phase itself, and the post-shadow phase (when Mercury returns to its original position). Each phase has its own unique energy and lessons to offer.
                  </p>
                </section>
              )}
              {activeTab === 'Effects' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>How Mercury Retrograde Affects Different Areas of Life</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        title: "Communication Challenges",
                        description: "Expect miscommunications, misunderstandings, and delays in conversations. Double-check emails, texts, and important messages. Be extra clear in your communication and avoid making assumptions."
                      },
                      {
                        title: "Technology Issues",
                        description: "Computers, phones, and other devices may act up or malfunction. Back up important data regularly and avoid purchasing new technology during retrograde periods."
                      },
                      {
                        title: "Travel Disruptions",
                        description: "Travel plans may face delays, cancellations, or unexpected changes. Allow extra time for journeys and have backup plans ready. Double-check reservations and itineraries."
                      },
                      {
                        title: "Contract and Agreement Review",
                        description: "Avoid signing important contracts or making major commitments during retrograde. Use this time to review existing agreements and make necessary revisions."
                      },
                      {
                        title: "Past Connections Return",
                        description: "Old friends, ex-partners, or unresolved situations may resurface. This is an opportunity to heal past wounds and complete unfinished business."
                      },
                      {
                        title: "Inner Reflection and Review",
                        description: "Mercury retrograde is excellent for introspection, meditation, and reviewing your goals and plans. Use this time to reassess your direction and make necessary adjustments."
                      }
                    ].map((effect, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 40 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.6 + (index * 0.1) }} 
                        viewport={{ once: true }} 
                        className="rounded-2xl shadow-lg p-8 border border-indigo-100 flex flex-col gap-4" 
                        style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}
                      >
                        <h3 className="text-xl font-semibold text-indigo-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{effect.title}</h3>
                        <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                          {effect.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
              {activeTab === 'FAQs' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
                  <div className="space-y-8">
                    {[
                      {
                        question: "How often does Mercury go retrograde?",
                        answer: "Mercury goes retrograde three to four times per year, typically lasting about three weeks each time. The exact frequency and duration can vary slightly from year to year."
                      },
                      {
                        question: "Should I avoid making important decisions during Mercury retrograde?",
                        answer: "While it&apos;s wise to be extra careful with major decisions, you don&apos;t need to put your life on hold. Focus on reviewing, revising, and reflecting rather than starting completely new projects or relationships."
                      },
                      {
                        question: "Can Mercury retrograde affect relationships?",
                        answer: "Yes, communication issues can strain relationships during retrograde periods. This is also a time when past relationships may resurface, offering opportunities for closure or reconciliation."
                      },
                      {
                        question: "What are the best activities during Mercury retrograde?",
                        answer: "Focus on activities that involve review, reflection, and revision. This is an excellent time for meditation, journaling, organizing, completing unfinished projects, and reconnecting with old friends."
                      },
                      {
                        question: "How can I protect myself during Mercury retrograde?",
                        answer: "Practice patience, double-check all communications, back up important data, allow extra time for travel, and use this period for introspection and personal growth rather than rushing into new ventures."
                      }
                    ].map((faq, index) => (
                      <div key={index}>
                        <div className="flex items-center mb-2">
                          <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                          <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                            {faq.question}
                          </span>
                        </div>
                        <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                          {faq.answer}
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

