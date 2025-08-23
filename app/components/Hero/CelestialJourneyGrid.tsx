"use client";
import React from "react";
import { useLanguage } from "../../contexts/useLanguage";


export default function CelestialJourneyGrid() {
  const { t } = useLanguage();
  return (
    <section className="w-full bg-[#FEFBF2] px-2 py-9">
      {/* Heading and subtitle block */}
      <div className="max-w-3xl mx-auto text-center mb-9">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-marcellus text-center mb-2 bg-gradient-to-r from-[#23244a] via-[#23244a] to-[#77A656] bg-clip-text text-transparent drop-shadow-lg tracking-tight">
          {t('hero.celestialJourney')}
        </h1>
        <p className="text-xl sm:text-2xl md:text-2xl font-cormorant text-center text-[#77A656] tracking-wide italic mt-2">
          {t('hero.celestialJourneyDesc')}
        </p>
      </div>
    </section>
  );
} 