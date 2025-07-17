"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZodiacWheel } from "../components/ZodiacWheel";
import { Testimonials } from "../components/Testimonials";
import { Statistics } from "../components/Statistics";
import { AstrologerProfile } from "../components/AstrologerProfile";
import { AboutSummary } from "../components/AboutSummary";
import { useLanguage } from "../contexts/useLanguage";

export default function PanchangPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = [
    t('panchangPage.tabs.overview'),
    t('panchangPage.tabs.coreElements'),
    t('panchangPage.tabs.timings'),
    t('panchangPage.tabs.about'),
    t('panchangPage.tabs.purchase')
  ];

  return (
    <div className="min-h-screen bg-white pt-0 md:pt-2">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Heading */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.banner.heading')}</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
            {t('panchangPage.banner.description')}
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
              {tabs.map((tab, idx) => (
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
            {activeTab === t('panchangPage.tabs.overview') && (
              <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.overview.heading')}</h2>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  {t('panchangPage.overview.p1')}
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  {t('panchangPage.overview.p2')}
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  {t('panchangPage.overview.p3')}
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  {t('panchangPage.overview.p4')}
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  {t('panchangPage.overview.p5')}
                </p>
              </section>
            )}
            {activeTab === t('panchangPage.tabs.coreElements') && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.core.heading')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['tithi', 'nakshatra', 'yoga', 'karana', 'vaar'].map((key, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow p-6 border border-indigo-100 flex flex-col gap-2">
                      <h3 className="font-semibold text-xl mb-1 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{t(`panchangPage.core.${key}.label`)}</h3>
                      <p className="text-lg font-bold text-black" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>{t(`panchangPage.core.${key}.value`)}</p>
                      <p className="text-gray-700 text-justify text-sm" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>{t(`panchangPage.core.${key}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {activeTab === t('panchangPage.tabs.timings') && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.timings.heading')}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.timings.auspicious.heading')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      <li><strong>{t('panchangPage.timings.auspicious.brahma')}</strong> {t('panchangPage.timings.auspicious.brahmaTime')}</li>
                      <li><strong>{t('panchangPage.timings.auspicious.abhijit')}</strong> {t('panchangPage.timings.auspicious.abhijitTime')}</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.timings.inauspicious.heading')}</h3>
                    <ul className="list-disc list-inside space-y-2 text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      <li><strong>{t('panchangPage.timings.inauspicious.rahu')}</strong> {t('panchangPage.timings.inauspicious.rahuTime')}</li>
                      <li><strong>{t('panchangPage.timings.inauspicious.yamaganda')}</strong> {t('panchangPage.timings.inauspicious.yamagandaTime')}</li>
                      <li><strong>{t('panchangPage.timings.inauspicious.gulika')}</strong> {t('panchangPage.timings.inauspicious.gulikaTime')}</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-10 bg-white rounded-2xl shadow p-6 border border-indigo-100">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.timings.vrat.heading')}</h3>
                  <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                    {t('panchangPage.timings.vrat.text')}
                  </p>
                </div>
                <div className="mt-10 bg-white rounded-2xl shadow p-6 border border-indigo-100">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.timings.planetary.heading')}</h3>
                  <ul className="space-y-1 text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                    <li><strong>{t('panchangPage.timings.planetary.moon')}</strong> {t('panchangPage.timings.planetary.moonSign')}</li>
                    <li><strong>{t('panchangPage.timings.planetary.sun')}</strong> {t('panchangPage.timings.planetary.sunSign')}</li>
                    <li><strong>{t('panchangPage.timings.planetary.mercury')}</strong> {t('panchangPage.timings.planetary.mercurySign')}</li>
                    <li><strong>{t('panchangPage.timings.planetary.jupiter')}</strong> {t('panchangPage.timings.planetary.jupiterSign')}</li>
                    <li><strong>{t('panchangPage.timings.planetary.saturn')}</strong> {t('panchangPage.timings.planetary.saturnSign')}</li>
                  </ul>
                </div>
              </section>
            )}
            {activeTab === t('panchangPage.tabs.about') && (
              <section className="mb-12">
                <h2 className="text-4xl font-bold text-neutral-900 mb-10 border-b pb-3 tracking-tight" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}>{t('panchangPage.about.heading')}</h2>
                {/* Founder's Message */}
                <div className="bg-white shadow-md p-8 rounded-2xl border border-neutral-200 mb-12">
                  <h3 className="font-bold text-2xl mb-6 text-neutral-800" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.about.founder.heading')}</h3>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.15rem' }}>
                    {t('panchangPage.about.founder.p1')}
                  </p>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.15rem' }}>
                    {t('panchangPage.about.founder.p2')}
                  </p>
                  <p className="text-neutral-700 font-semibold mt-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {t('panchangPage.about.founder.signature')}
                  </p>
                </div>
                {/* Legacy & Milestones */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.about.legacy.heading')}</h3>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-6" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.08rem' }}>
                    {t('panchangPage.about.legacy.p1')}
                  </p>
                  <h4 className="text-xl font-bold text-neutral-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{t('panchangPage.about.legacy.milestonesHeading')}</h4>
                  <ul className="space-y-4 pl-4 border-l-2 border-neutral-200 mb-8">
                    {['m1','m2','m3','m4','m5'].map((m,i)=>
                      <li key={i} className="text-neutral-800 text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}>{t(`panchangPage.about.legacy.${m}`)}</li>
                    )}
                  </ul>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.08rem' }}>
                    {t('panchangPage.about.legacy.p2')}
                  </p>
                  <p className="text-neutral-900 text-justify font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {t('panchangPage.about.legacy.cta')}
                  </p>
                </div>
              </section>
            )}
            {activeTab === t('panchangPage.tabs.purchase') && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Purchase</h2>
              </section>
            )}
            {/* Astrologer Profile below main content */}
            <div className="mt-12">
              <AstrologerProfile />
            </div>
            {/* Testimonials Section */}
            <div className="mt-12">
              <Testimonials />
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <AboutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
