"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../../contexts/useLanguage";

export default function UnlockCosmosBanner() {
  const images = [
    "/images/astro.jpg",
    "/images/astrology_app.jpg",
    "/images/astrowellness.jpg",
    "/images/spiritualpathway.jpg",
    "/images/myth.jpg",
    "/images/horoscopedaily.jpg",
  ];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  const { t } = useLanguage();
  return (
    <section className="pt-28 w-full flex items-center justify-center bg-[#FEFBF2] py-7 px-4 relative z-30 overflow-hidden" style={{ minHeight: '320px', minWidth: '100%' }}>
      {/* Background carousel */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {images.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt="Astrology background"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 1s ease-in-out' }}
            draggable={false}
          />
        ))}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      {/* Content on top */}
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 relative z-10">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-2">
            {t('hero.mainHeading')}
          </h2>
          <p className="text-lg md:text-xl font-bold text-white drop-shadow-sm">
            {t('hero.subHeading')}
          </p>
        </div>
        <div className="mt-6 md:mt-0 flex-shrink-0">
          <Link href="/services">
            <span className="inline-block bg-[#FEFBF2] text-[#23244a] font-bold px-8 py-4 rounded-full shadow-lg hover:bg-white hover:text-amber-700 transition-colors text-xl border-2 border-[#e5e5e5] tracking-wide">
              {t('hero.ctaButton')}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}