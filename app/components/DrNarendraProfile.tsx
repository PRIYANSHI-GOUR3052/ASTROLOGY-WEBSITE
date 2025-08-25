import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function DrNarendraProfile() {
  return (
    <section className="relative bg-white text-black py-20 overflow-hidden">
      <div className="w-full px-5 relative z-20">
        {/* Main profile card */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-10 rounded-3xl shadow-lg mb-16 border border-amber-200 relative z-10 bg-white">
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Dr. Narendra Kumar Sharma</h1>
            <p className="text-lg md:text-xl mb-4 text-black max-w-2xl text-justify">
              Dr. Narendra Kumar Sharma is a globally renowned astrologer with over 20 years of experience in Vedic astrology. He is celebrated for his accurate predictions, insightful guidance, and compassionate approach to helping individuals navigate life&apos;s challenges. His expertise spans across various astrological domains, including career, relationships, health, and finance.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-black mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
              <span className="ml-2 text-black font-semibold">(5.0/5.0) - 1000+ Reviews</span>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="rounded-2xl p-6 shadow-lg flex flex-col h-full border border-amber-200 bg-white">
            <div className="text-green-800 mb-4 inline-block self-start font-medium">Astrology Expert</div>
            <h3 className="text-black font-bold text-lg mb-2 leading-snug">20+ Years of Transforming Lives</h3>
            <div className="flex items-center text-black text-sm mb-4">
              <span className="mr-2">🌟</span>
              <span>10K+ Clients</span>
              <span className="ml-auto">98% Satisfaction</span>
            </div>
            <div className="mt-auto pt-4">
              <Link href="/reviews" className="text-green-800 px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all hover:text-green-700 inline-block">
                See Reviews →
              </Link>
            </div>
          </div>
          <div className="rounded-2xl p-6 shadow-lg flex flex-col h-full border border-amber-200 bg-white">
            <div className="text-green-800 mb-4 inline-block self-start font-medium">Global Recognition</div>
            <h3 className="text-black font-bold text-lg mb-2 leading-snug">Consultations in 30+ Countries</h3>
            <div className="flex items-center text-black text-sm mb-4">
              <span className="mr-2">🌍</span>
              <span>5K+ Consultations</span>
              <span className="ml-auto">1000+ Reviews</span>
            </div>
            <div className="mt-auto pt-4">
              <Link href="/about" className="text-green-800 px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all hover:text-green-700 inline-block">
                Learn More →
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose & Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="p-10 rounded-2xl shadow-lg border border-amber-200 bg-white">
            <h2 className="text-3xl font-bold text-black mb-6">Why Choose Dr. Narendra Kumar Sharma?</h2>
            <ul className="list-disc list-inside text-black space-y-3 text-lg text-justify">
              <li><span className="font-semibold text-black">Experience & Expertise:</span> With two decades in Vedic astrology, Dr. Sharma brings profound knowledge and proven solutions.</li>
              <li><span className="font-semibold text-black">Accurate Predictions:</span> His predictions are consistently precise, offering clear foresight for your life&apos;s journey.</li>
              <li><span className="font-semibold text-black">Holistic Approach:</span> He combines ancient wisdom with practical advice for comprehensive well-being.</li>
              <li><span className="font-semibold text-black">Global Recognition:</span> Trusted by clients worldwide for his exceptional astrological insights.</li>
              <li><span className="font-semibold text-black">Personalized Guidance:</span> Every consultation is tailored to your unique birth chart and specific concerns.</li>
              <li><span className="font-semibold text-black">Compassionate Support:</span> He offers empathetic and confidential guidance, making you feel understood and supported.</li>
            </ul>
          </div>
          <div className="p-10 rounded-2xl shadow-lg border border-amber-200 bg-white">
            <h2 className="text-3xl font-bold text-black mb-6">Our Impact - Key Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
              <div className="p-6 rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-green-800">20+</p>
                <p className="text-lg text-black">Years of Experience</p>
              </div>
              <div className="p-6 rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-green-800">10K+</p>
                <p className="text-lg text-black">Happy Clients</p>
              </div>
              <div className="p-6 rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-green-800">5K+</p>
                <p className="text-lg text-black">Successful Consultations</p>
              </div>
              <div className="p-6 rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-green-800">98%</p>
                <p className="text-lg text-black">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center p-12 rounded-2xl shadow-lg border border-amber-200 bg-white">
          <h2 className="text-4xl font-bold mb-4 text-black">Ready for Personalized Astrological Guidance?</h2>
          <p className="text-xl mb-8 text-black">Book a consultation with Dr. Narendra Kumar Sharma today and unlock your true potential.</p>
          <Link href="/contact" className="flex justify-center w-full">
            <Button className="bg-white text-green-800 hover:bg-gray-50 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105 mx-auto border border-green-800">
              Book Your Session Now!
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
