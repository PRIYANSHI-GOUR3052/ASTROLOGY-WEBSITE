"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../../contexts/useLanguage";

// Move images array outside component to prevent recreation
const CAROUSEL_IMAGES = [
  "/images/astro.jpg",
  "/images/astrology_app.jpg",
  "/images/astrowellness.jpg",
  "/images/spiritualpathway.jpg",
  "/images/myth.jpg",
  "/images/horoscopedaily.jpg",
];

export default function UnlockCosmosBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const nextIndex = (prev + 1) % CAROUSEL_IMAGES.length;
        
        // Preload the next image just before it's needed
        const nextNextIndex = (nextIndex + 1) % CAROUSEL_IMAGES.length;
        const img = new Image();
        img.src = CAROUSEL_IMAGES[nextNextIndex];
        
        return nextIndex;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const { t } = useLanguage();

  return (
    <section className="pt-28 w-full flex items-center justify-center bg-[#FEFBF2] py-7 px-4 relative z-30 overflow-hidden" style={{ minHeight: '320px', minWidth: '100%' }}>
      {/* Preload only the first image for immediate display */}
      <link rel="preload" as="image" href={CAROUSEL_IMAGES[0]} />
      
      {/* Background carousel */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {CAROUSEL_IMAGES.map((img: string, idx: number) => (
          <img
            key={img}
            src={img}
            alt={`Astrology background ${idx + 1}`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            style={{ transition: 'opacity 1s ease-in-out' }}
            draggable={false}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : "low"}
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
            <span className="inline-block bg-[#FEFBF2] font-bold px-8 py-4 rounded-full shadow-lg hover:border-green-800 transition-all duration-300 text-xl border-2 border-[#e5e5e5] tracking-wide" style={{ color: '#166534' }}>
              {t('hero.ctaButton')}
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}