"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZodiacWheel } from "../components/ZodiacWheel";
import { Testimonials } from "../components/Testimonials";
import { Statistics } from "../components/Statistics";
import { AstrologerProfile } from "../components/AstrologerProfile";
import { AboutSummary } from "../components/AboutSummary";

export default function PanchangPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Core Elements', 'Timings', 'About'];

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Heading */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Today's Panchang</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
            Your daily Vedic almanac for cosmic alignment, auspicious timings, and spiritual clarity. Discover the five limbs of time, planetary positions, and sacred rituals to harmonize your day with the universe.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Panchang: The Sacred Almanac</h2>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  The Panchang is more than just a calendar—it is a sacred timekeeping system passed down through millennia, guiding spiritual seekers, householders, and sages alike in harmonizing their daily lives with the cosmic flow. Rooted in Vedic astrology, the Panchang is composed of five key elements or 'limbs of time': Tithi (lunar day), Nakshatra (constellation), Yoga (planetary combinations), Karana (half-day lunar division), and Vaar (weekday). Together, these elements paint a complete energetic picture of the day, offering insight into the subtle forces influencing every moment of your life.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  At Nakshatra Gyaan, we understand that in today's fast-paced world, ancient wisdom must be presented with clarity, relevance, and elegance. That's why we offer a modern Panchang experience, meticulously curated by seasoned astrologers who not only interpret the planetary alignments but also translate them into practical, relatable guidance for everyday living. Whether you're scheduling important events, performing rituals, or making life decisions, our Panchang helps you attune to nature's cycles and act in perfect timing.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  Each day brings a unique blend of cosmic energies. A particular Tithi might be ideal for spiritual sadhana, while a specific Nakshatra may favor business dealings or healing rituals. Our Panchang entries are not just about what the stars are doing—they are about what you can do with that knowledge. We go beyond standard charts to offer daily affirmations, personalized remedies, and mindful practices to align your mind, body, and spirit with the universe's natural order. In essence, the Panchang becomes your spiritual compass—subtle, silent, and immensely powerful.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  What makes our approach unique is the integration of traditional Vedic precision with a soul-centered, intuitive lens. We honor the sacred texts and astrological systems, yet we present them with language and symbolism that speaks to the modern heart. Whether you are a devoted practitioner, a curious beginner, or someone seeking deeper awareness, our Panchang offerings meet you where you are—delivering not just information, but illumination.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  The Panchang is not about superstition or restriction; it is about empowerment—helping you flow with time rather than struggle against it. As you begin to live in alignment with cosmic rhythms, you will notice a shift in energy: fewer obstacles, more synchronicities, deeper inner peace. With Nakshatra Gyaan's Panchang, you don't just read your day—you rise into it, fully present, cosmically supported, and spiritually aligned. Let each sunrise greet you with clarity, and let each action be blessed by divine timing.
                </p>
              </section>
            )}
            {activeTab === 'Core Elements' && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Core Panchang Elements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Tithi", value: "Shukla Paksha Dwitiya", desc: "The lunar day, marking the phase of the moon and its spiritual significance." },
                    { label: "Nakshatra", value: "Rohini", desc: "The star constellation the moon occupies, influencing emotions and events." },
                    { label: "Yoga", value: "Siddhi", desc: "A special combination of sun and moon, shaping the day's energy." },
                    { label: "Karana", value: "Bava", desc: "Half of a Tithi, indicating the quality of actions and outcomes." },
                    { label: "Vaar (Day)", value: "Monday", desc: "The weekday, each ruled by a planet and carrying unique vibrations." },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow p-6 border border-indigo-100 flex flex-col gap-2">
                      <h3 className="font-semibold text-xl mb-1 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{item.label}</h3>
                      <p className="text-lg font-bold text-black" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>{item.value}</p>
                      <p className="text-gray-700 text-justify text-sm" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            {activeTab === 'Timings' && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Auspicious & Inauspicious Timings</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>Auspicious Timings</h3>
                    <ul className="list-disc list-inside space-y-2 text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      <li><strong>Brahma Muhurta:</strong> 4:10 AM – 4:58 AM</li>
                      <li><strong>Abhijit Muhurat:</strong> 11:48 AM – 12:42 PM</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-2xl shadow p-6 border border-indigo-100">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>Inauspicious Timings</h3>
                    <ul className="list-disc list-inside space-y-2 text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      <li><strong>Rahu Kaal:</strong> 7:30 AM – 9:00 AM</li>
                      <li><strong>Yamaganda:</strong> 10:30 AM – 12:00 PM</li>
                      <li><strong>Gulika Kaal:</strong> 1:30 PM – 3:00 PM</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-10 bg-white rounded-2xl shadow p-6 border border-indigo-100">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>Vrat & Festivals</h3>
                  <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                    Today is <strong>Somvati Amavasya</strong>, considered highly sacred for performing rituals for ancestors (Pitru Tarpan) and observing fasts for prosperity and good health.
                  </p>
                </div>
                <div className="mt-10 bg-white rounded-2xl shadow p-6 border border-indigo-100">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>Moon & Planetary Positions</h3>
                  <ul className="space-y-1 text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                    <li><strong>Moon in:</strong> Taurus</li>
                    <li><strong>Sun in:</strong> Gemini</li>
                    <li><strong>Mercury in:</strong> Cancer</li>
                    <li><strong>Jupiter in:</strong> Aries</li>
                    <li><strong>Saturn in:</strong> Aquarius (Retrograde)</li>
                  </ul>
                </div>
              </section>
            )}
            {activeTab === 'About' && (
              <section className="mb-12">
                <h2 className="text-4xl font-bold text-neutral-900 mb-10 border-b pb-3 tracking-tight" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}>About Nakshatra Gyaan</h2>
                {/* Founder's Message */}
                <div className="bg-white shadow-md p-8 rounded-2xl border border-neutral-200 mb-12">
                  <h3 className="font-bold text-2xl mb-6 text-neutral-800" style={{ fontFamily: 'Playfair Display, serif' }}>A Message from Our Founder</h3>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.15rem' }}>
                    "Astrology is not just about glimpsing the future—it is a sacred mirror that reflects the soul's journey. It empowers us to understand who we truly are, to make choices in alignment with our higher self, and to walk through life with intention, grace, and spiritual clarity.
                  </p>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.15rem' }}>
                    At Nakshatra Gyaan, our purpose is to bridge the ancient science of the stars with the evolving consciousness of today's world—so that every individual, no matter where they are, can find meaning, healing, and direction."
                  </p>
                  <p className="text-neutral-700 font-semibold mt-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    — Dr. Narendra Kumar Sharma<br />Founder, Nakshatra Gyaan
                  </p>
                </div>
                {/* Legacy & Milestones */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Our Legacy: A Journey Written in the Stars</h3>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-6" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.08rem' }}>
                    From humble beginnings to a global spiritual movement, Nakshatra Gyaan has remained rooted in its devotion to authentic, soul-guided astrology. Every milestone marks a step closer to fulfilling our mission—to bring timeless cosmic wisdom to those seeking truth, healing, and transformation.
                  </p>
                  <h4 className="text-xl font-bold text-neutral-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Key Milestones in Our Celestial Journey</h4>
                  <ul className="space-y-4 pl-4 border-l-2 border-neutral-200 mb-8">
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2002 — The Birth of a Vision:</span> Nakshatra Gyaan is founded by Dr. Narendra Kumar Sharma with a single mission—to democratize astrology and make it accessible, reliable, and spiritually enriching for all.</li>
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2010 — Spreading Light, One Soul at a Time:</span> After conducting over 100 in-person workshops across India, we embraced the digital space and began offering personalized online consultations to seekers worldwide.</li>
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2015 — Going Global with Grace:</span> Launch of our official online platform, enabling clients from more than 30 countries to receive in-depth astrological guidance, daily horoscopes, and life-transforming insights.</li>
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2020 — Expanding Our Mystical Offerings:</span> We broadened our services to include Vedic numerology, intuitive tarot readings, online Vedic rituals (pujas), and integrated mind-body-spirit healing practices, making Nakshatra Gyaan a holistic sanctuary for modern spirituality.</li>
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2024 — Serving a Global Spiritual Family:</span> Today, we proudly serve a global community of over 50,000 members, with more than 10,000 consultations delivered, touching lives with truth, compassion, and clarity.</li>
                  </ul>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Lato, Open Sans, sans-serif', fontSize: '1.08rem' }}>
                    At Nakshatra Gyaan, we do not merely read charts—we listen to your soul, decode its celestial language, and guide you toward a life of alignment, fulfillment, and spiritual evolution. Our journey is fueled by love, our methods are guided by tradition, and our vision is illuminated by the stars.
                  </p>
                  <p className="text-neutral-900 text-justify font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Join us in awakening the cosmic wisdom within you.<br />Your path is written in the stars—and we're here to help you read it.
                  </p>
                </div>
              </section>
            )}
            {/* Astrologer Profile below main content */}
            <div className="mt-12">
              <AstrologerProfile />
            </div>
            {/* Testimonials Section */}
            <div className="mt-12">
              <Testimonials />
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <AboutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
