'use client';

import { motion } from 'framer-motion';
import { AnimatedStars } from '../components/AnimatedStars';
import { MysticBackground } from '../components/MysticBackground';
import { CTASection } from '../components/CTASection';
import { Testimonials } from '../components/Testimonials';
import { AstrologerProfile } from '../components/AstrologerProfile';
import { DailyHoroscope } from '../components/DailyHoroscope';
export default function AstrologyMainPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-100 to-white text-black">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">

          {/* Hero Section */}
          <section className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-4"
            >
              Unlock the Mysteries of the Stars 
            </motion.h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Explore our expert astrology services designed to help you connect with the cosmic energies that influence your life. Whether you're curious about what the stars hold for your day or seeking deeper insights into your personality and life path, we have something tailored just for you. Our daily horoscopes provide accurate, timely predictions that guide your decisions and help you navigate life's ups and downs. For those looking to understand themselves on a deeper level, our personalized birth chart readings decode the planetary alignments at the time of your birth, revealing your strengths, weaknesses, opportunities, and challenges.

We also offer love and relationship compatibility readings, giving you clarity about your emotional dynamics with your partner or potential soulmate. Our astrologers bring years of experience, combining ancient wisdom with modern interpretations to deliver meaningful insights. Additionally, you can explore topics like career astrology, financial guidance, and spiritual growth through your planetary placements. With every session, we aim to empower you with self-awareness and direction, helping you make confident choices aligned with your unique destiny. Let the stars illuminate your path—because the universe is always speaking; all you need to do is listen. Begin your astrological journey with us today.
            </p>
          </section>

          {/* What We Offer */}
          <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-6 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Personalized Horoscopes',
                  desc: 'Daily, weekly, and yearly horoscopes aligned with your sign.',
                },
                {
                  title: 'Birth Chart Analysis',
                  desc: 'In-depth natal chart readings to understand your strengths and challenges.',
                },
                {
                  title: 'Love & Relationship Readings',
                  desc: 'Explore compatibility, love predictions, and relationship advice.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Daily Horoscope */}
          <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-6 text-center">Daily Horoscope</h2>
            <DailyHoroscope />
          </section>

         

          {/* Testimonials */}
          <section className="mb-20">
            <Testimonials />
          </section>

          {/* Astrologer Profiles */}
          <section className="mb-20">
            <AstrologerProfile />
          </section>

          {/* Final CTA */}
          <section className="mb-10">
            <CTASection />
          </section>
        </div>
      </MysticBackground>
    </div>
  );
}
