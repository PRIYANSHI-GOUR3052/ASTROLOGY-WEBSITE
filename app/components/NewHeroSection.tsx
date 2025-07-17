'use client';

import UnlockCosmosBanner from './Hero/UnlockCosmosBanner';
import SpiritualTicker from './Hero/SpiritualTicker';
import CelestialJourneyGrid from './Hero/CelestialJourneyGrid';
import CelestialJourneyMainGrid from "./Hero/CelestialJourneyMainGrid";

export default function NewHeroSection() {
  return (
    <>
      <UnlockCosmosBanner />
      <SpiritualTicker />
      <CelestialJourneyGrid />
      {/* Existing grid starts here */}
      <CelestialJourneyMainGrid />
    </>
  );
}