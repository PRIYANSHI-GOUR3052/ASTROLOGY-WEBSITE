'use client';

import UnlockCosmosBanner from './Hero/UnlockCosmosBanner';
import SpiritualTicker from './Hero/SpiritualTicker';
import ZodiacCategories from './ZodiacCategories';
import CelestialJourneyGrid from './Hero/CelestialJourneyGrid';
import dynamic from "next/dynamic";

const CelestialJourneyMainGrid = dynamic(
  () => import("./Hero/CelestialJourneyMainGrid"),
  {
    loading: () => <div>Loading...</div>,
    ssr: false,
  }
);

export default function NewHeroSection() {
  return (
    <>
      <UnlockCosmosBanner />
      <SpiritualTicker />
      <ZodiacCategories />
      
      <CelestialJourneyGrid />
      {/* Existing grid starts here */}
      <CelestialJourneyMainGrid />
    </>
  );
}