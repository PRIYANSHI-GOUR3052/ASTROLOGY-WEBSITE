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
                <div className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6" style={{ fontFamily: 'Lora, serif', textAlign: 'justify' }}>
                  <p>Nakshatra Gyaan was born not from a business plan, but from a profound personal quest. Our founder, deeply immersed in the corporate world, felt a growing disconnect between material success and inner fulfillment. It was a chance encounter with a traditional Vedic astrologer in a small village that ignited the spark. This wasn't the predictive, fear-based astrology often portrayed, but a deep, compassionate science of self-understanding—a cosmic map of one's karma and potential. The experience was transformative, revealing a path to navigate life's complexities with awareness and grace. This profound insight became the seed of our mission: to share this authentic, empowering wisdom with a world that was searching for meaning.</p>
                  <p>Our journey began in 2002, far from the digital landscape we inhabit today. The first "office" was a quiet corner in our founder's home, armed with classic astrological texts and a deep-seated passion for helping others. Our first clients were friends and family, and our growth was fueled purely by word-of-mouth. Each consultation was an intimate dialogue, a shared exploration of a unique life story written in the stars. These early years were defined by immense dedication, countless hours spent poring over birth charts, and the simple, powerful reward of seeing someone's eyes light up with clarity and renewed hope.</p>
                  <p>From the very beginning, our philosophy has been rooted in the belief that astrology is a tool for empowerment, not a declaration of inescapable fate. We see the birth chart as a divine blueprint, highlighting our innate strengths, our spiritual challenges, and our ultimate life purpose. We are committed to demystifying this ancient science, stripping away superstition to reveal its practical and psychological depth. Our approach is holistic, blending the timeless precision of Vedic astrology with modern psychological understanding and actionable spiritual counsel, ensuring our guidance is always relevant, compassionate, and life-affirming.</p>
                  <p>The first decade was one of quiet, dedicated service and organic growth. We consciously avoided commercial advertising, choosing instead to let our work speak for itself. This period was crucial for honing our practice and building a foundation of trust. We measured our success not in revenue, but in the tangible, positive transformations we witnessed in our clients' lives—the mended relationships, the newfound career paths, the deep sense of peace achieved. This unwavering focus on integrity and client well-being created a loyal community that became the bedrock upon which Nakshatra Gyaan was built.</p>
                  <p>The year 2015 marked a pivotal moment in our story. We recognized that the need for authentic spiritual guidance knew no geographical boundaries. Embracing this challenge, we launched our online platform, a decision that required a significant leap of faith and a steep learning curve. The goal was to translate the intimacy and depth of a face-to-face consultation into a digital experience without losing the human touch. It was a demanding transition, but it was driven by the vision of making this profound knowledge accessible to seekers in every corner of the globe.</p>
                  <p>The launch of our digital platform opened floodgates we had only dreamed of. Suddenly, we were connecting with individuals from over 30 countries, each with their unique cultural background and life story. This global expansion was both humbling and enriching. It deepened our understanding of the universal human quest for meaning and challenged us to refine our communication to be clear, sensitive, and culturally aware. We were no longer just a local service; we had become a global sanctuary for spiritual exploration, united by the common language of the cosmos.</p>
                  <p>As our community grew, so did the scope of their questions. We realized that to provide truly comprehensive guidance, we needed to look beyond the birth chart alone. This inspired us to integrate the wisdom of astrology's sister sciences. We carefully expanded our team to include experts in Numerology, Tarot, Vastu Shastra, and Palmistry. This evolution allowed us to offer a multi-faceted perspective, providing clients with a richer, more holistic understanding of their lives and empowering them with a wider array of tools for personal and spiritual growth.</p>
                  <p>We soon understood that people were not just seeking answers; they were seeking connection. This insight shifted our focus from being a mere service provider to becoming a community facilitator. We launched our weekly newsletter, not as a marketing tool, but as a source of shared learning and cosmic insights. We developed workshops and online forums to create a safe, supportive space where individuals could share their experiences, ask questions, and grow together. Nakshatra Gyaan evolved into a vibrant ecosystem for like-minded souls on a collective journey of discovery.</p>
                  <p>In a field where misinformation can be rampant, we have always held ourselves to the highest standards of ethics and integrity. This is our most sacred commitment. Our guidance is designed to empower, never to create fear or dependency. We are transparent about what astrology can and cannot do, and we encourage our clients to use their free will as the ultimate guiding force. We are dedicated to the continuous study and responsible practice of this sacred science, ensuring the trust placed in us is always honored.</p>
                  <p>As we look to the future, our mission remains the same, but our vision continues to expand. We are exploring innovative ways to blend ancient wisdom with modern technology, creating more interactive and personalized learning experiences. Our goal is to expand our educational offerings, creating in-depth courses that empower individuals to become more fluent in the language of their own birth charts. We envision Nakshatra Gyaan as a leading global light in the world of spiritual science, continuing to guide, inspire, and empower seekers for generations to come.</p>
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
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Meet Our Founder</h2>
                <div className="flex justify-center">
                  <AstrologerProfile />
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
