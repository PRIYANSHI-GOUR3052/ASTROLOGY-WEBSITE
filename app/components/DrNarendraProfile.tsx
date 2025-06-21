import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function DrNarendraProfile() {
  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Floating decorative cards */}
      <div className="hidden md:block absolute top-10 left-10 rotate-[-12deg] opacity-90 z-10">
        <div className="bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 rounded-2xl p-6 w-72 shadow-2xl">
          <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">Astrology Expert</div>
          <h3 className="text-white font-bold text-lg mb-2 leading-snug">20+ Years of Transforming Lives</h3>
          <div className="flex items-center text-white/80 text-sm mb-4">
            <span className="mr-2">🌟</span>
            <span>10K+ Clients</span>
            <span className="ml-auto">98% Satisfaction</span>
          </div>
          <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all hover:bg-white/30 inline-block">See Reviews →</span>
        </div>
      </div>
      <div className="hidden md:block absolute top-16 right-10 rotate-[12deg] opacity-90 z-10">
        <div className="bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 rounded-2xl p-6 w-72 shadow-2xl">
          <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">Global Recognition</div>
          <h3 className="text-white font-bold text-lg mb-2 leading-snug">Consultations in 30+ Countries</h3>
          <div className="flex items-center text-white/80 text-sm mb-4">
            <span className="mr-2">🌍</span>
            <span>5K+ Consultations</span>
            <span className="ml-auto">1000+ Reviews</span>
          </div>
          <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all hover:bg-white/30 inline-block">Learn More →</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 relative z-20">
        {/* Large brand name watermark */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-10 z-0">
          <h1 className="text-[80px] md:text-[120px] font-bold tracking-wider m-0">nakshatra</h1>
        </div>

        {/* Main profile card */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-gradient-to-r from-[#1E3A8A]/90 to-[#065F46]/90 p-10 rounded-3xl shadow-2xl mb-16 border border-white/10 relative z-10">
          <div className="flex-shrink-0">
            <Image 
              src="/images/PHD .webp" 
              alt="Dr. Narendra Kumar Sharma"
              width={250}
              height={250}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Dr. Narendra Kumar Sharma</h1>
            <p className="text-lg md:text-xl mb-4 text-white/90 max-w-2xl">
              Dr. Narendra Kumar Sharma is a globally renowned astrologer with over 20 years of experience in Vedic astrology. He is celebrated for his accurate predictions, insightful guidance, and compassionate approach to helping individuals navigate life's challenges. His expertise spans across various astrological domains, including career, relationships, health, and finance.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
              <span className="ml-2 text-white">(5.0/5.0) - 1000+ Reviews</span>
            </div>
          </div>
        </div>

        {/* Why Choose & Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-violet-500/80 via-pink-500/80 to-orange-400/80 p-10 rounded-2xl shadow-xl border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Why Choose Dr. Narendra Kumar Sharma?</h2>
            <ul className="list-disc list-inside text-white/90 space-y-3 text-lg">
              <li><span className="font-semibold">Experience & Expertise:</span> With two decades in Vedic astrology, Dr. Sharma brings profound knowledge and proven solutions.</li>
              <li><span className="font-semibold">Accurate Predictions:</span> His predictions are consistently precise, offering clear foresight for your life's journey.</li>
              <li><span className="font-semibold">Holistic Approach:</span> He combines ancient wisdom with practical advice for comprehensive well-being.</li>
              <li><span className="font-semibold">Global Recognition:</span> Trusted by clients worldwide for his exceptional astrological insights.</li>
              <li><span className="font-semibold">Personalized Guidance:</span> Every consultation is tailored to your unique birth chart and specific concerns.</li>
              <li><span className="font-semibold">Compassionate Support:</span> He offers empathetic and confidential guidance, making you feel understood and supported.</li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-500/80 via-teal-400/80 to-green-400/80 p-10 rounded-2xl shadow-xl border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-6">Our Impact - Key Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
              <div className="p-6 bg-white/10 rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-pink-200">20+</p>
                <p className="text-lg text-white/90">Years of Experience</p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-pink-200">10K+</p>
                <p className="text-lg text-white/90">Happy Clients</p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-pink-200">5K+</p>
                <p className="text-lg text-white/90">Successful Consultations</p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-pink-200">98%</p>
                <p className="text-lg text-white/90">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-violet-500 to-pink-500 text-white p-12 rounded-2xl shadow-2xl border border-white/10">
          <h2 className="text-4xl font-bold mb-4">Ready for Personalized Astrological Guidance?</h2>
          <p className="text-xl mb-8">Book a consultation with Dr. Narendra Kumar Sharma today and unlock your true potential.</p>
          <Link href="/contact">
            <Button className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
              Book Your Session Now!
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
