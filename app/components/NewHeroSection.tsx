'use client';

import UnlockCosmosBanner from './Hero/UnlockCosmosBanner';
import SpiritualTicker from './Hero/SpiritualTicker';
import CelestialJourneyGrid from './Hero/CelestialJourneyGrid';
import CelestialJourneyMainGrid from "./Hero/CelestialJourneyMainGrid";
import ServiceCarousels from "./ServiceCarousels";

export default function NewHeroSection() {
  return (
    <>
      <UnlockCosmosBanner />
      <SpiritualTicker />
      <ServiceCarousels />
      <CelestialJourneyGrid />
      {/* Existing grid starts here */}
      <CelestialJourneyMainGrid />
    </>
  );
}