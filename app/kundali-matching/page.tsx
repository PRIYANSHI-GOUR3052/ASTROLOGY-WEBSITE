"use client";

import React from "react";
import { Button } from "../../components/ui/button";

import { ZodiacWheel } from "../components/ZodiacWheel";
import { Testimonials } from "../components/Testimonials";
import { Statistics } from "../components/Statistics";
import { AstrologerProfile } from "../components/AstrologerProfile";

export default function KundaliMatchingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FAD9C1] to-[#A3BFF3] px-6 py-16 text-black">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Page Heading */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 font-serif"> Kundali Matching</h1>
        </div>

        {/* Hero Section: Text + ZodiacWheel Side by Side */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="md:w-1/2">
            <p className="text-xl text-gray-800 leading-relaxed">
              Kundali Matching, also known as Horoscope Matching, is a vital aspect of Vedic astrology. It is the process of matching the birth charts of the prospective bride and groom to ensure a harmonious and prosperous married life. This sacred tradition analyzes Guna Milan (point-based compatibility system), Manglik Dosha, Nadi Dosha, and other planetary aspects.
              <br /><br />
              Matching kundalis can reveal the emotional, mental, and spiritual compatibility between the couple. It helps avoid future conflicts and ensures that the marriage is blessed with love, understanding, and shared destiny.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <ZodiacWheel />
          </div>
        </div>

        {/* What is Kundali Matching? */}
        <div className="bg-white/80 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">📜 What is Kundali Matching?</h2>
          <p className="text-gray-800 leading-relaxed">
            Kundali Matching is a detailed and precise astrological procedure that involves analyzing two individuals' horoscopes (janam kundalis) to determine their compatibility for marriage. It plays a major role in arranged marriages in Indian culture and is based on the principles of Ashtakoota Milan and Dashakoota Milan systems.
            <br /><br />
            The Ashtakoota system assesses eight aspects including Varna (spiritual compatibility), Vashya (dominance), Tara (birth star compatibility), Yoni (sexual compatibility), Graha Maitri (mental compatibility), Gana (temperament), Bhakoot (family and love), and Nadi (health and genes). The maximum score is 36, and a match above 18 is considered acceptable.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white/80 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">🌟 Benefits of Kundali Matching</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Ensures compatibility in core life values, temperaments, and beliefs.</li>
            <li>Helps avoid serious mismatches or doshas that could lead to conflicts.</li>
            <li>Identifies potential health issues or obstacles in the future.</li>
            <li>Assists in determining the best time for marriage.</li>
            <li>Supports long-lasting emotional, physical, and spiritual harmony.</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/80 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">❓ Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Is Kundali matching scientifically proven?</h3>
              <p className="text-gray-800">While kundali matching is rooted in spiritual and traditional beliefs, it follows a systematic method based on astronomical data and calculations. It's not considered scientific in the modern empirical sense but is deeply respected in Vedic culture.</p>
            </div>
            <div>
              <h3 className="font-semibold">What if the Kundali doesn't match?</h3>
              <p className="text-gray-800">If the match is poor, some remedies and rituals (upayas) may help neutralize negative effects. Consultation with an experienced astrologer is crucial before making any final decisions.</p>
            </div>
            <div>
              <h3 className="font-semibold">Is Kundali matching necessary for love marriages?</h3>
              <p className="text-gray-800">Even in love marriages, kundali matching can provide insights into future challenges and strengths of the relationship. Many couples opt for it to receive guidance and blessings for a strong future together.</p>
            </div>
          </div>
        </div>

        {/* Astrologer Profile */}
        <AstrologerProfile />

        {/* Statistics */}
        <Statistics />

        {/* Testimonials */}
        <Testimonials />

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">💍 Match Your Kundali Now</h2>
          <p className="text-lg mb-4 text-gray-700">Get a detailed compatibility report from our expert astrologers.</p>
          <Button className="bg-gold text-black text-lg px-8 py-3 hover:bg-yellow-400 transition">
            Start Matching
          </Button>
        </div>
      </div>
    </div>
  );
}