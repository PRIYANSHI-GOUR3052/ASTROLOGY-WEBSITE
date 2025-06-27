"use client";

import { useState } from 'react';
import { serviceContent } from '@/app/data/serviceContent';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Statistics } from '@/app/components/Statistics';
import { AstrologerProfile } from '@/app/components/AstrologerProfile';
import { AboutSummary } from '@/app/components/AboutSummary';
import { motion } from 'framer-motion';
import { FaRegLightbulb, FaRegHeart, FaRegStar, FaRegSmile, FaRegComments, FaRegSun, FaRegGem } from 'react-icons/fa';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useLanguage } from '@/app/contexts/useLanguage';
import { DrNarendraProfile } from '@/app/components/DrNarendraProfile';
import { CTASection } from '@/app/components/CTASection';

interface ServiceContent {
  title: string;
  description: string;
  benefits: string[];
  price: string;
  consultationDetails?: string;
  additionalInfo?: string;
  stats?: { label: string; value: string }[];
  astrologer?: {
    name: string;
    photo: string;
    credentials: string;
    bio: string;
  };
  faqs?: { question: string; answer: string }[];
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceContent[params.slug as keyof typeof serviceContent];
  const [activeTab, setActiveTab] = useState('Overview');
  const { lang, setLang } = useLanguage();

  // Premium layout for career-job
  if (params.slug === 'career-job') {
    const tabs = [
      'Overview',
      'What is Career & Job Guidance?',
      'Benefits',
      'FAQs',
      'Purchase',
    ];
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white text-black">
        <div className="container mx-auto px-4 pt-8 pb-20 relative z-10">
          {/* Glassmorphic Banner */}
          <div className="w-full rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#e0f7fa]">
            <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
              Career & Job Guidance
            </h1>
            <p className="text-xl md:text-2xl text-center text-gray-700 max-w-3xl mx-auto mb-4" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
              Unlock your professional destiny with cosmic clarity. Our Vedic astrologers offer deep, actionable insights for every stage of your career journey—from first job to leadership, from uncertainty to breakthrough.
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {tabs.map(tab => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow-md border border-blue-100 backdrop-blur-md ${activeTab === tab ? 'bg-blue-200 text-blue-900 scale-105' : 'bg-white text-blue-700 hover:bg-blue-50'}`}
                style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Content Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Overview Tab */}
              {activeTab === 'Overview' && (
                <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                  {/* User-provided editorial content without emojis */}
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    In today's fast-paced, hyper-competitive world, choosing and navigating a career path can feel overwhelming. Amidst external expectations and internal doubts, how do you find the work that truly resonates with your soul? At Nakshatra Gyaan, we believe your profession is not just a means of livelihood—it is a sacred expression of your dharma, your higher purpose in this lifetime. Through the ancient science of Vedic astrology, we help you uncover your divine professional blueprint and align it with real-world opportunities and inner fulfillment.
                  </p>
                  <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-6 text-justify" style={{ fontFamily: 'Playfair Display, serif', textAlign: 'justify' }}>Why Choose Astrological Career Guidance?</h3>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    Conventional career advice often falls short because it ignores the cosmic design encoded in your birth chart. Your Janma Kundli is a celestial map of your karma, potential, and soul journey. It reveals the ideal environments, industries, and roles where your energy naturally thrives, as well as the karmic challenges that may appear along the way. With the precision of Vedic astrology, combined with insights from modern psychology and spiritual counseling, we offer a comprehensive roadmap that answers questions your heart has been asking all along:
                  </p>
                  <ul className="list-disc ml-8 mb-5 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    <li>What career path is truly aligned with my natural gifts and spiritual essence?</li>
                    <li>Am I destined to lead, serve, heal, teach, innovate, or create?</li>
                    <li>When is the ideal time to change jobs, start a new venture, or take a leap of faith?</li>
                    <li>Why do I keep facing the same challenges in the workplace—and how can I overcome them?</li>
                    <li>Can I achieve material success while staying spiritually grounded and emotionally balanced?</li>
                  </ul>
                  <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-6 text-justify" style={{ fontFamily: 'Playfair Display, serif', textAlign: 'justify' }}>What We Explore in Your Session</h3>
                  <ul className="list-disc ml-8 mb-5 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    <li>The 10th House (Karma Bhava): Your profession, leadership, and public life</li>
                    <li>The 6th House: Work environment, challenges, and service</li>
                    <li>The 2nd and 11th Houses: Income, wealth, gains, and financial fulfillment</li>
                    <li>Planetary Yogas & Doshas: Karmic blocks or blessings impacting your career</li>
                    <li>Dasha-Bhukti Analysis: Your current and upcoming planetary periods</li>
                    <li>Transits (Gochar): External events and cosmic timings influencing your life decisions</li>
                    <li>Nakshatras and Atmakaraka: Your soul's true desire and spiritual calling</li>
                  </ul>
                  <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-6 text-justify" style={{ fontFamily: 'Playfair Display, serif', textAlign: 'justify' }}>The Nakshatra Gyaan Experience</h3>
                  <ul className="list-disc ml-8 mb-5 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    <li><b>Soulful Strategy:</b> Our guidance is not generic—it's spiritually attuned, emotionally aware, and strategically designed to help you grow, not just survive.</li>
                    <li><b>Holistic Remedies:</b> We offer personalized mantras, yantras, gemstones, affirmations, fasting techniques, and pujas to help you remove obstacles and amplify your career potential.</li>
                    <li><b>Actionable Insights:</b> You will receive practical recommendations on industries, roles, skill development, and timing—tailored to your chart, not trends.</li>
                    <li><b>Confidential & Compassionate Space:</b> We understand the vulnerability in career transitions. Whether you're lost, stuck, or standing at a new threshold, we hold space with empathy, non-judgment, and divine intention.</li>
                  </ul>
                  <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-6 text-justify" style={{ fontFamily: 'Playfair Display, serif', textAlign: 'justify' }}>Who This Is For</h3>
                  <ul className="list-disc ml-8 mb-5 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    <li>Students unsure of which academic path to follow</li>
                    <li>Professionals experiencing stagnation, burnout, or a desire for change</li>
                    <li>Entrepreneurs looking for auspicious timing, business direction, or market alignment</li>
                    <li>Spiritual seekers who want to integrate purpose with prosperity</li>
                    <li>Job changers or returnees to the workforce after a break</li>
                  </ul>
                  <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-6 text-justify" style={{ fontFamily: 'Playfair Display, serif', textAlign: 'justify' }}>Career as Karma, Career as Calling</h3>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    In the Vedic tradition, your work is one of the most powerful expressions of your karma. It is where your personal evolution, societal contribution, and spiritual progress intersect. When chosen and pursued consciously, your profession becomes a path of transformation and service—not just a paycheck.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    At Nakshatra Gyaan, we honor that truth. Our consultations are an invitation to reconnect with your true nature, reawaken your confidence, and realign with the divine rhythm of the universe.
                  </p>
                  <Statistics />
                </section>
              )}

              {/* What is Career & Job Guidance? Tab */}
              {activeTab === 'What is Career & Job Guidance?' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-blue-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif', textAlign: 'justify' }}>What is Career & Job Guidance?</h2>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    Career & Job Guidance at Nakshatra Gyaan is not merely a consultation—it is a sacred decoding of your professional destiny. In a world driven by competition, uncertainty, and ever-evolving opportunities, we offer a calm, cosmic perspective that reveals what your soul truly seeks in the realm of work, purpose, and prosperity. Our sessions are designed to guide you toward a career that doesn't just sustain you—but fulfills, inspires, and elevates you.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    What sets our service apart is its deeply integrative approach—a blend of classical Vedic astrology, karmic insight, and modern career psychology. We begin by analyzing your birth chart, which acts as a divine blueprint of your professional inclinations, talents, lessons, and dharma (life purpose). We examine planetary placements, your 10th and 6th houses, nakshatras, dashas (planetary periods), and current transits to understand not just what you can do—but what you are destined to thrive in.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    Our mission is not to fit you into a box, but to help you break free from limitations—be it stagnation, self-doubt, job dissatisfaction, or confusion about your path. Whether you are a student trying to choose a stream, a young professional navigating early career choices, a seasoned employee facing burnout, or an entrepreneur looking for divine timing to launch a business—our guidance meets you where you are and helps you realign.
                  </p>
                  <p className="text-black text-justify mb-2" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    In each session, we explore questions such as:
                  </p>
                  <ul className="list-disc ml-8 mb-5 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    <li>What type of profession will best support my emotional, financial, and spiritual needs?</li>
                    <li>Am I meant to work under someone or lead my own venture?</li>
                    <li>Which skills and energies should I harness to grow in my field?</li>
                    <li>Are my current challenges karmic, and if so, how do I neutralize them?</li>
                    <li>What is the right time to switch jobs, relocate, ask for a promotion, or invest in a dream project?</li>
                    <li>How can I overcome professional blocks, toxic environments, or inner resistance?</li>
                  </ul>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    But our role doesn't end at insight. Every consultation includes actionable guidance—we recommend personalized mantras, planetary remedies, spiritual rituals, gemstones, and lifestyle shifts to activate your professional success. Our astrologers empower you with awareness but also equip you with tools to shift the energies in your favor. We believe that real success comes not just from luck, but from alignment—with time, with dharma, and with inner truth.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    More than just forecasting, we walk beside you in your career evolution journey. Whether you seek recognition, wealth, impact, or peace of mind—we help you define success on your own terms and reach it with clarity, grace, and inner strength. At Nakshatra Gyaan, your career is treated as your karma bhoomi—a sacred field of action—and our purpose is to help you fulfill it with intention and wisdom.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    Let the stars be your mentors, the planets your allies, and your soul your compass. Discover the empowering, transformative magic of Career & Job Guidance—crafted with care, backed by science, and blessed by the cosmos.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    Our consultations are not just about prediction—they are about empowerment. We help you understand the deeper meaning behind your professional experiences, so you can transform challenges into stepping stones and setbacks into opportunities for growth. Every session is a sacred dialogue, where your aspirations are honored and your unique journey is celebrated.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    At Nakshatra Gyaan, we are committed to walking with you at every stage of your career evolution. Whether you are seeking clarity, courage, or a cosmic green light, our guidance is designed to illuminate your path and inspire you to pursue your highest calling with confidence, wisdom, and grace.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                    We understand that every career journey is unique, filled with both triumphs and trials. Our role is to help you see the bigger picture, to recognize the divine timing in every twist and turn, and to trust the process of your own becoming. With every session, you gain not just answers, but a renewed sense of purpose and the tools to manifest your dreams. Let us help you turn uncertainty into opportunity and ambition into achievement—one cosmic insight at a time.
                  </p>
                </section>
              )}

              {/* Benefits Tab */}
              {activeTab === 'Benefits' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-blue-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Career & Job Guidance</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* 8+ animated, pastel glassmorphic benefit cards */}
                    {[
                      {
                        icon: <FaRegLightbulb className="text-blue-400 w-8 h-8 mb-2" />, title: 'Clarity on Career Path', desc: 'Discover your true calling and the most auspicious fields for your growth.'
                      },
                      {
                        icon: <FaRegStar className="text-yellow-400 w-8 h-8 mb-2" />, title: 'Timing of Job Changes', desc: 'Know the best periods for switching jobs, promotions, or business launches.'
                      },
                      {
                        icon: <FaRegSmile className="text-green-400 w-8 h-8 mb-2" />, title: 'Overcoming Obstacles', desc: 'Get remedies and strategies to break through professional stagnation.'
                      },
                      {
                        icon: <FaRegHeart className="text-pink-400 w-8 h-8 mb-2" />, title: 'Workplace Harmony', desc: 'Improve relationships with colleagues, bosses, and teams.'
                      },
                      {
                        icon: <FaRegComments className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Communication Skills', desc: 'Enhance your leadership and communication abilities.'
                      },
                      {
                        icon: <FaRegSun className="text-orange-400 w-8 h-8 mb-2" />, title: 'Material & Spiritual Success', desc: 'Achieve both financial prosperity and inner fulfillment.'
                      },
                      {
                        icon: <FaRegGem className="text-purple-400 w-8 h-8 mb-2" />, title: 'Personalized Remedies', desc: 'Receive mantras, rituals, and astrological solutions tailored to your chart.'
                      },
                      {
                        icon: <FaRegLightbulb className="text-blue-400 w-8 h-8 mb-2" />, title: 'Confidence & Empowerment', desc: 'Step into your power and make bold, conscious career moves.'
                      },
                    ].map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 + idx * 0.1 }}
                        viewport={{ once: true }}
                        className="rounded-2xl bg-white/70 backdrop-blur-md shadow-lg p-8 flex flex-col items-center border border-blue-100 hover:scale-105 transition-transform duration-200"
                        style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}
                      >
                        {benefit.icon}
                        <h3 className="font-bold text-lg mb-2 text-blue-900" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
                        <p className="text-gray-700 text-center text-base">{benefit.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs Tab */}
              {activeTab === 'FAQs' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-blue-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
                  <div className="space-y-8">
                    {/* 8+ in-depth FAQ entries */}
                    {[
                      {
                        q: 'How can astrology help my career?',
                        a: 'Astrology reveals your natural talents, ideal career paths, and the timing of key opportunities. It helps you make informed decisions, avoid pitfalls, and maximize your professional growth.'
                      },
                      {
                        q: 'Can you predict the best time for a job change?',
                        a: 'Yes. By analyzing your planetary periods (Dashas) and transits, we can identify the most auspicious windows for job changes, promotions, or business launches.'
                      },
                      {
                        q: 'What if I am facing repeated setbacks at work?',
                        a: 'We identify the astrological causes of stagnation or obstacles and provide practical remedies—mantras, rituals, and mindset shifts—to help you break through.'
                      },
                      {
                        q: 'Is this guidance suitable for entrepreneurs?',
                        a: 'Absolutely. We offer specialized insights for business owners, including timing for launches, partnership compatibility, and strategies for sustainable growth.'
                      },
                      {
                        q: 'Will my session be confidential?',
                        a: 'Yes. All consultations are private and your information is kept strictly confidential.'
                      },
                      {
                        q: 'Can I get remedies for career problems?',
                        a: 'Yes. We provide personalized remedies—mantras, gemstones, rituals, and affirmations—based on your unique chart.'
                      },
                      {
                        q: 'Do you offer guidance for students or career starters?',
                        a: 'Yes. We help students and young professionals choose the right field, prepare for exams, and plan their career trajectory.'
                      },
                      {
                        q: 'How do I book a session?',
                        a: 'Simply click the "Book Your Session" button in the Purchase tab or contact us for a personalized consultation.'
                      },
                    ].map((faq, idx) => (
                      <div key={idx}>
                        <div className="flex items-center mb-2">
                          <span className="text-blue-600 mr-2 text-xl">&#x3f;</span>
                          <span className="font-bold text-lg text-blue-900" style={{ fontFamily: 'Playfair Display, serif' }}>{faq.q}</span>
                        </div>
                        <p className="text-black text-justify pl-8" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Purchase Tab */}
              {activeTab === 'Purchase' && (
                <section className="mb-12">
                  <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#e0f2fe] p-10 shadow-xl border border-blue-100 flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Career & Job Guidance Session</h2>
                    <p className="text-lg text-center mb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Ready to unlock your professional destiny? Book a personalized session with our expert astrologers and take the next step toward success.
                    </p>
                    <Button className="bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105">
                      Book Your Session Now!
                    </Button>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <AboutSummary />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-16">
          <CTASection />
        </div>
      </div>
    );
  }

  // ...default rendering for other slugs...
  if (!service) {
    return <div style={{ color: "#000" }}>Service not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-r from-[#FAD9C1] to-[#A3BFF3] min-h-screen" style={{ color: "#000" }}>
      {/* ...default JSX... */}
    </div>
  );
}
