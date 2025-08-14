'use client';

import { useState, useEffect } from 'react';
import { User, Calendar, Star, HelpCircle, Users, Target, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { CTASection } from '../components/CTASection';

import { AstrologerProfile } from '../components/AstrologerProfile';
import { Testimonials } from '../components/Testimonials';
import { useLanguage } from '../contexts/useLanguage';

const tabKeys = ['about.tabs.0', 'about.tabs.1', 'about.tabs.2', 'about.tabs.3'];

export default function AboutPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(tabKeys[0]);
  const [email, setEmail] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-white py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#23244a] mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>{t('about.banner.heading')}</h1>
          <p className="text-lg md:text-2xl text-[#3a3b5c] text-center max-w-3xl leading-relaxed">{t('about.banner.text')}</p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 bg-white">
              {tabKeys.map((tabKey) => (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tabKey ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                >
                  {t(tabKey)}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            {activeTab === 'about.tabs.0' && (
              <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 bg-white rounded-xl p-6">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>{t('about.journey.heading')}</h2>
                <div className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6" style={{ fontFamily: 'Lora, serif', textAlign: 'justify' }}>
                  {[...Array(10).keys()].map(i => t(`about.journey.story.${i}`)).map((story, idx) => (
                    <p key={idx}>{story}</p>
                  ))}
                </div>
                
                {/* Testimonial */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-xl p-6 mt-8 flex items-start gap-4 border">
                  <Quote className="w-8 h-8 text-amber-500 mt-1" />
                  <div>
                    <p className="text-lg italic text-amber-900 mb-2">{t('about.journey.testimonial.text')}</p>
                    <p className="text-amber-800 font-semibold">{t('about.journey.testimonial.author')}</p>
                  </div>
                </motion.div>
              </motion.section>
            )}
            {activeTab === 'about.tabs.1' && (
              <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 bg-white rounded-xl p-6">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>{t('about.team.heading')}</h2>
                <div className="flex justify-center">
                  <AstrologerProfile />
                </div>
                {/* Team Testimonial */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-white rounded-xl p-6 mt-8 flex items-start gap-4 border">
                  <Quote className="w-8 h-8 text-amber-500 mt-1" />
                  <div>
                    <p className="text-lg italic text-amber-900 mb-2">{t('about.team.testimonial.text')}</p>
                    <p className="text-amber-800 font-semibold">{t('about.team.testimonial.author')}</p>
                  </div>
                </motion.div>
              </motion.section>
            )}
            {activeTab === 'about.tabs.2' && (
              <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 bg-white rounded-xl p-6">
                <h2 className="text-3xl font-bold text-amber-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>{t('about.mission.heading')}</h2>
                <div className="bg-white p-6 rounded-xl border mb-6">
                  <h3 className="font-bold text-sky-900 text-lg mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    {t('about.mission.missionTitle')}
                  </h3>
                  <p className="text-sky-800 leading-relaxed">{t('about.mission.missionText')}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border mb-6">
                  <h3 className="font-bold text-purple-900 text-lg mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    {t('about.mission.visionTitle')}
                  </h3>
                  <p className="text-purple-800 leading-relaxed">{t('about.mission.visionText')}</p>
                </div>
                <div className="bg-white border-l-4 p-6 rounded-lg">
                  <span className="text-amber-800 font-bold text-lg">{t('about.mission.impactTitle')}</span> <span className="text-black font-semibold">{t('about.mission.impactText')}</span>
                </div>
              </motion.section>
            )}
            {activeTab === 'about.tabs.3' && (
              <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16 bg-white rounded-xl p-6">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>{t('about.faq.heading')}</h2>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
                  {[...Array(13).keys()].map(i => (
                    <div key={i} className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center"><HelpCircle className="w-5 h-5 mr-2 text-indigo-400" />{t(`about.faq.q${i}`)}</h3>
                      <p className="text-gray-700">{t(`about.faq.a${i}`)}</p>
                    </div>
                  ))}
                </motion.div>
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-indigo-900 mb-8 text-center">{t('about.faq.testimonialsHeading')}</h2>
                  <Testimonials />
                </div>
              </motion.section>
            )}
            {/* Newsletter Signup */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-white rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-amber-900 mb-4">{t('about.newsletter.heading')}</h3>
              <p className="text-gray-700 mb-4">{t('about.newsletter.text')}</p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('about.newsletter.placeholder')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  {t('about.newsletter.button')}
                </button>
              </form>
            </motion.div>
            <CTASection />
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Facts */}
            <div className="bg-white rounded-lg p-6 mb-8 border">
              <h3 className="text-lg font-bold text-amber-900 mb-4">{t('about.quickfacts.heading')}</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {[...Array(6).keys()].map(i => (
                  <li key={i}>{t(`about.quickfacts.fact${i}`)}</li>
                ))}
              </ul>
            </div>
            {/* Resources */}
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-lg font-bold text-amber-900 mb-4">{t('about.resources.heading')}</h3>
              <ul className="space-y-3">
                {[...Array(4).keys()].map(i => (
                  <li key={i}>
                    <a href={t(`about.resources.link${i}.url`)} className="text-amber-700 hover:underline flex items-start">
                      <span className="text-amber-500 mr-2">→</span>
                      <span>{t(`about.resources.link${i}.title`)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
