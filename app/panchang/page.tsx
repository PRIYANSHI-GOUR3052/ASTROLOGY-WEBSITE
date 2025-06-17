"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ZodiacWheel } from "../components/ZodiacWheel";
import { Testimonials } from "../components/Testimonials";
import { Statistics } from "../components/Statistics";
import { AstrologerProfile } from "../components/AstrologerProfile";

export default function PanchangPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FAD9C1] to-[#A3BFF3] px-6 py-16 text-black">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Page Heading */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 font-serif">📿 Today’s Panchang</h1>
        </div>

        {/* Hero Section: Text + ZodiacWheel Side by Side */}
      {/* Hero Section: Text Card + ZodiacWheel Side by Side */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
  {/* Text Card */}
  <div className="md:w-1/2">
    <div className="bg-white/90 p-6 rounded-xl shadow border-l-4 border-gold">
      <h2 className="text-2xl font-semibold mb-3 text-midnight-blue">
        🔭 Cosmic Insight
      </h2>
      <p className="text-gray-800 leading-relaxed">
        Dive into the sacred rhythm of the cosmos. <strong>The Panchang</strong> is your ancient Vedic compass — aligning your actions, intentions, and energy with celestial movements.
        Whether planning a ceremony, initiating a new venture, or simply syncing with the day's energy, the Panchang empowers you with clarity, purpose, and cosmic harmony.
      </p>
    </div>
  </div>

  {/* Zodiac Wheel Component */}
  <div className="md:w-1/2 flex justify-center">
    <ZodiacWheel />
  </div>
</div>


        {/* Core Panchang Elements */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white/80 p-6 rounded-xl shadow">
          {[
            { label: "Tithi", value: "Shukla Paksha Dwitiya" },
            { label: "Nakshatra", value: "Rohini" },
            { label: "Yoga", value: "Siddhi" },
            { label: "Karana", value: "Bava" },
            { label: "Vaar (Day)", value: "Monday" },
          ].map((item, i) => (
            <div key={i} className="p-4 border-l-4 border-gold">
              <h3 className="font-semibold text-lg">{item.label}</h3>
              <p className="text-sm text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Auspicious Timings */}
        <div className="bg-white/80 p-6 rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-bold mb-2">🕒 Auspicious & Inauspicious Timings</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            <li><strong>Brahma Muhurta:</strong> 4:10 AM – 4:58 AM</li>
            <li><strong>Abhijit Muhurat:</strong> 11:48 AM – 12:42 PM</li>
            <li><strong>Rahu Kaal:</strong> 7:30 AM – 9:00 AM</li>
            <li><strong>Yamaganda:</strong> 10:30 AM – 12:00 PM</li>
            <li><strong>Gulika Kaal:</strong> 1:30 PM – 3:00 PM</li>
          </ul>
        </div>

        {/* Vrat & Festival */}
        <div className="bg-white/80 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">🎉 Vrat & Festivals</h2>
          <p className="text-gray-800">
            Today is <strong>Somvati Amavasya</strong>, considered highly sacred for performing rituals for ancestors (Pitru Tarpan) and observing fasts for prosperity and good health.
          </p>
        </div>

        {/* Moon & Planetary Positions */}
        <div className="bg-white/80 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">🌙 Moon & Planetary Positions</h2>
          <ul className="space-y-1 text-gray-800">
            <li><strong>Moon in:</strong> Taurus</li>
            <li><strong>Sun in:</strong> Gemini</li>
            <li><strong>Mercury in:</strong> Cancer</li>
            <li><strong>Jupiter in:</strong> Aries</li>
            <li><strong>Saturn in:</strong> Aquarius (Retrograde)</li>
          </ul>
        </div>

        {/* What is Panchang? */}
        <div className="bg-white/80 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">📖 What is Panchang?</h2>
          <p className="text-gray-800 leading-relaxed">
            Panchang is the ancient Indian calendar that helps determine auspicious timings and understand the influence of planetary motions on our lives. It consists of five key elements — Tithi, Nakshatra, Yoga, Karana, and Vaar. Knowing the Panchang can help you plan important events, rituals, and spiritual practices in alignment with the universe.
          </p>
        </div>

        {/* Astrologer Profile */}
        <AstrologerProfile />

        {/* Statistics */}
        <Statistics />

        {/* Testimonials */}
        <Testimonials />

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">🔮 Want Personalized Panchang?</h2>
          <p className="text-lg mb-4 text-gray-700">Get a detailed report based on your birth chart.</p>
          <Button className="bg-gold text-black text-lg px-8 py-3 hover:bg-yellow-400 transition">
            Book Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
