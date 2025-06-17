import React from 'react';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image';

export function DrNarendraProfile() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 bg-gradient-to-r from-[#1E3A8A] to-[#065F46] text-white p-8 rounded-lg shadow-lg mb-16">
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
            <h1 className="text-4xl font-bold mb-4">Dr. Narendra Kumar Sharma</h1>
            <p className="text-lg mb-4">
              Dr. Narendra Kumar Sharma is a globally renowned astrologer with over 20 years of experience in Vedic astrology.
              He is celebrated for his accurate predictions, insightful guidance, and compassionate approach to helping individuals
              navigate life's challenges. His expertise spans across various astrological domains, including career, relationships, health,
              and finance.
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
              <span className="ml-2 text-white">(5.0/5.0) - 1000+ Reviews</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Why Choose Dr. Narendra Kumar Sharma */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Dr. Narendra Kumar Sharma?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
              <li><span className="font-semibold">Experience & Expertise:</span> With two decades in Vedic astrology, Dr. Sharma brings profound knowledge and proven solutions.</li>
              <li><span className="font-semibold">Accurate Predictions:</span> His predictions are consistently precise, offering clear foresight for your life's journey.</li>
              <li><span className="font-semibold">Holistic Approach:</span> He combines ancient wisdom with practical advice for comprehensive well-being.</li>
              <li><span className="font-semibold">Global Recognition:</span> Trusted by clients worldwide for his exceptional astrological insights.</li>
              <li><span className="font-semibold">Personalized Guidance:</span> Every consultation is tailored to your unique birth chart and specific concerns.</li>
              <li><span className="font-semibold">Compassionate Support:</span> He offers empathetic and confidential guidance, making you feel understood and supported.</li>
            </ul>
          </div>

          {/* Statistics */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Impact - Key Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-[#A6033F]">20+</p>
                <p className="text-lg text-gray-700">Years of Experience</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-[#A6033F]">10K+</p>
                <p className="text-lg text-gray-700">Happy Clients</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-[#A6033F]">5K+</p>
                <p className="text-lg text-gray-700">Successful Consultations</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <p className="text-5xl font-bold text-[#A6033F]">98%</p>
                <p className="text-lg text-gray-700">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-[#A6033F] to-[#E54868] text-white p-12 rounded-lg shadow-xl">
          <h2 className="text-4xl font-bold mb-4">Ready for Personalized Astrological Guidance?</h2>
          <p className="text-xl mb-8">Book a consultation with Dr. Narendra Kumar Sharma today and unlock your true potential.</p>
          <Button className="bg-white text-[#A6033F] hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
            Book Your Session Now!
          </Button>
        </div>
      </div>
    </section>
  );
}
