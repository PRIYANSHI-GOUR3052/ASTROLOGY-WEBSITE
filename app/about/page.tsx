'use client';

import { useState, useEffect } from 'react';
import { User, Calendar, Star, HelpCircle, Users, Target, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CTASection } from '../components/CTASection';
import { Statistics } from '../components/Statistics';
import { AstrologerProfile } from '../components/AstrologerProfile';
import { Testimonials } from '../components/Testimonials';

const tabs = ['Our Journey', 'Our Team', 'Mission & Vision', 'FAQs'];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('Our Journey');
  const [email, setEmail] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>About Nakshatra Gyaan</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-3xl leading-relaxed">Guiding seekers on their spiritual journey for over two decades. Our team of expert astrologers and spiritual guides combines ancient wisdom with modern insights to provide you with accurate and life-changing guidance.</p>
        </motion.div>
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
            {activeTab === 'Our Journey' && (
              <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Our Story</h2>
                <div className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6">
                  <p>Nakshatra Gyaan was founded in 2002 with a vision to make ancient astrological wisdom accessible and practical for modern lives. Over the years, we have helped thousands discover their true potential, overcome challenges, and find clarity on their life path.</p>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Our Philosophy
                    </h3>
                    <p className="text-blue-800 leading-relaxed">We believe every individual has a unique cosmic blueprint. Our mission is to help you understand and harness the power of your celestial connections for a more fulfilling life. We blend Vedic and modern astrology, spiritual counseling, and practical remedies for holistic growth.</p>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
                    <span className="text-orange-700 font-bold text-lg">Milestone:</span> <span className="text-black font-semibold">In 2015, we launched our online platform, reaching seekers in over 30 countries and building a global community of astrology enthusiasts.</span>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-lg">
                    <span className="text-green-700 font-bold text-lg">Values:</span> <span className="text-black font-semibold">Integrity, compassion, and empowerment are at the heart of everything we do. We are committed to ethical guidance and lifelong learning.</span>
                  </div>
                </div>
                <Statistics />
                {/* Testimonial */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-indigo-50 rounded-xl p-6 mt-8 flex items-start gap-4 border border-indigo-100">
                  <Quote className="w-8 h-8 text-indigo-400 mt-1" />
                  <div>
                    <p className="text-lg italic text-indigo-900 mb-2">“Nakshatra Gyaan's guidance changed my life. Their remedies and insights helped me find clarity and confidence during a difficult period.”</p>
                    <p className="text-indigo-700 font-semibold">— Aarti Sharma, Mumbai</p>
                  </div>
                </motion.div>
              </motion.section>
            )}
            {activeTab === 'Our Team' && (
              <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Meet Our Team</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <AstrologerProfile />
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100">
                    <div className="relative w-24 h-24 mb-4">
                      <Image src="/images/female-avatar.png" alt="Astrologer" fill className="object-cover rounded-full border-4 border-indigo-100 shadow" />
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Priyanshi Gour</h4>
                    <p className="text-indigo-700 font-medium mb-1">Astrology Content Specialist</p>
                    <p className="text-gray-700 mb-2">Priyanshi brings a modern perspective to ancient wisdom, making astrology accessible and engaging for all.</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100">
                    <div className="relative w-24 h-24 mb-4">
                      <Image src="/images/placeholder-user.jpg" alt="Astrologer" fill className="object-cover rounded-full border-4 border-indigo-100 shadow" />
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Rahul Verma</h4>
                    <p className="text-indigo-700 font-medium mb-1">Vedic Astrology Expert</p>
                    <p className="text-gray-700 mb-2">Rahul specializes in Vedic chart analysis and practical remedies, helping clients find solutions to life's toughest challenges.</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-100">
                    <div className="relative w-24 h-24 mb-4">
                      <Image src="/images/placeholder-user.jpg" alt="Astrologer" fill className="object-cover rounded-full border-4 border-indigo-100 shadow" />
                    </div>
                    <h4 className="text-xl font-bold text-black mb-1">Sneha Patel</h4>
                    <p className="text-indigo-700 font-medium mb-1">Numerology & Tarot Specialist</p>
                    <p className="text-gray-700 mb-2">Sneha combines numerology and tarot to offer holistic guidance and empower clients on their spiritual journey.</p>
                  </motion.div>
                </div>
                {/* Team Testimonial */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-indigo-50 rounded-xl p-6 mt-8 flex items-start gap-4 border border-indigo-100">
                  <Quote className="w-8 h-8 text-indigo-400 mt-1" />
                  <div>
                    <p className="text-lg italic text-indigo-900 mb-2">“The Nakshatra Gyaan team is not just knowledgeable—they truly care. Their support and wisdom have been invaluable to me.”</p>
                    <p className="text-indigo-700 font-semibold">— Suresh Gupta, Delhi</p>
                  </div>
                </motion.div>
              </motion.section>
            )}
            {activeTab === 'Mission & Vision' && (
              <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Our Mission & Vision</h2>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100 mb-6">
                  <h3 className="font-bold text-green-900 text-lg mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Mission
                  </h3>
                  <p className="text-green-800 leading-relaxed">To empower individuals with the knowledge of astrology, helping them make informed decisions, embrace their strengths, and navigate life's challenges with confidence. We aim to demystify astrology and make it a tool for self-growth, not superstition.</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 mb-6">
                  <h3 className="font-bold text-purple-900 text-lg mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Vision
                  </h3>
                  <p className="text-purple-800 leading-relaxed">To be the most trusted source for astrological guidance, blending tradition with innovation and fostering a global community of seekers. We envision a world where everyone can access the wisdom of the stars to create a life of purpose and joy.</p>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
                  <span className="text-orange-700 font-bold text-lg">Impact:</span> <span className="text-black font-semibold">Over 10,000+ consultations delivered, 500+ workshops conducted, and a growing online community of 50,000+ members worldwide.</span>
                </div>
              </motion.section>
            )}
            {activeTab === 'FAQs' && (
              <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Frequently Asked Questions</h2>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="space-y-6">
                  {[
                    ['What makes Nakshatra Gyaan unique?', 'Our blend of ancient wisdom, modern insights, and a compassionate approach sets us apart. We focus on practical guidance and personal empowerment.'],
                    ['How can I consult an astrologer?', 'You can book a session through our website or contact us for personalized guidance.'],
                    ['Are your remedies and predictions personalized?', 'Yes, all our guidance is tailored to your unique birth chart and life situation.'],
                    ['Do you offer courses or workshops?', 'Yes, we regularly offer astrology courses and workshops for all levels.'],
                    ['Can astrology help with career and relationships?', 'Absolutely! Our consultations cover career, relationships, health, and more—providing actionable insights for every area of life.'],
                    ['Is my information kept confidential?', 'Yes, we maintain strict confidentiality and never share your personal details without consent.'],
                    ['Do you offer support after a consultation?', 'Yes, we provide follow-up support and are always available for your questions and concerns.'],
                    ['How do I book a personal consultation?', 'You can book a session directly through our website\'s consultation page or contact us via email/phone for personalized assistance.'],
                    ['What types of astrology do you practice?', 'We specialize in Vedic astrology, but also offer guidance in numerology, tarot, and modern astrological techniques.'],
                    ['Can I get a birth chart reading if I don\'t know my exact birth time?', 'Yes! While an exact time is ideal, we can still provide valuable insights using your date and place of birth.'],
                    ['Do you offer astrology for business or career guidance?', 'Absolutely! We provide career, business, and financial astrology consultations tailored to your unique chart.'],
                    ['Are your services available internationally?', 'Yes, we serve clients worldwide through online consultations, reports, and workshops.'],
                    ['How do you ensure privacy and confidentiality?', 'We treat your information with the utmost respect and never share your details without your consent.'],
                  ].map(([q, a], i) => (
                    <div key={q} className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center"><HelpCircle className="w-5 h-5 mr-2 text-indigo-400" />{q}</h3>
                      <p className="text-gray-700">{a}</p>
                    </div>
                  ))}
                </motion.div>
                <div className="mt-16">
                  <h2 className="text-2xl font-bold text-indigo-900 mb-8 text-center">Reader Testimonials</h2>
                  <Testimonials />
                </div>
              </motion.section>
            )}
            {/* Newsletter Signup */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-orange-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-orange-900 mb-4">Get Weekly Astrology Insights</h3>
              <p className="text-gray-700 mb-4">Sign up for our newsletter and receive cosmic tips, remedies, and predictions every week.</p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Subscribe Now
                </button>
              </form>
            </motion.div>
            <CTASection />
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Facts */}
            <div className="bg-indigo-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Quick Facts</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>20+ years of astrological guidance</li>
                <li>10,000+ consultations delivered</li>
                <li>500+ workshops and courses</li>
                <li>Global community: 50,000+ members</li>
                <li>Personalized remedies and solutions</li>
                <li>Ethical, confidential, and compassionate service</li>
              </ul>
            </div>
            {/* Resources */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Recommended Resources</h3>
              <ul className="space-y-3">
                {[
                  ['Understanding Your Birth Chart', '/blog/understanding-your-birth-chart'],
                  ['Gemstones and Their Powers', '/blog/gemstones-and-their-powers'],
                  ['Numerology Basics', '/blog/numerology-basics'],
                  ['The Influence of Planets', '/blog/the-influence-of-planets'],
                ].map(([title, link], i) => (
                  <li key={title}>
                    <a href={link as string} className="text-indigo-700 hover:underline flex items-start">
                      <span className="text-indigo-500 mr-2">→</span>
                      <span>{title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
