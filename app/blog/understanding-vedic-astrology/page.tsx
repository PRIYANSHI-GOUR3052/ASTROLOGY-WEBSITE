'use client'

import { useState, useEffect } from 'react';
import { User, Calendar, Star, BookOpen, HelpCircle } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import Image from 'next/image';
import { CTASection } from '../../components/CTASection';
import { motion } from 'framer-motion';

const post = blogPosts['understanding-vedic-astrology'];
const tabs = ['Overview', 'Principles', 'Remedies', 'FAQs'];

export default function UnderstandingVedicAstrologyPage() {
  const [activeTab, setActiveTab] = useState('Overview');
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
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">Understanding Vedic Astrology</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">Explore the ancient science of Jyotish, decode your birth chart, and discover how Vedic astrology can guide your life's journey.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="mb-8">
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
            </div>
            {/* Key Takeaway */}
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8 rounded-lg">
              <p className="text-gray-700">
                <span className="text-indigo-600 font-medium">Key Takeaway:</span> Vedic astrology is a profound science that reveals your life's blueprint, helping you understand your strengths, challenges, and the timing of important events.
              </p>
            </div>
            {/* Hero Image */}
            <div className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image src={post.imageUrl} alt={post.title.en} fill className="object-cover" />
            </div>
            {/* Intro */}
            <div className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6">
              <p>
                {post.content.en.split('\n')[0]}
              </p>
              <p>
                <span className="font-semibold text-indigo-700">What is Vedic Astrology?</span> Vedic astrology, or Jyotish Shastra, is an ancient Indian science that studies the positions and movements of celestial bodies to interpret their influence on human life. It uses the birth chart (Janam Kundli) as a map of your destiny, revealing your personality, relationships, career, and spiritual path.
              </p>
              <p>
                <span className="font-semibold text-indigo-700">History & Origins:</span> Vedic astrology has its roots in the Vedas, the oldest scriptures of India, dating back thousands of years. Ancient sages observed the skies and developed a sophisticated system to understand cosmic rhythms and their impact on earthly life. This wisdom has been passed down through generations and remains relevant today.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-4">
                <li><span className="font-semibold text-indigo-700">Birth Chart:</span> The foundation of Vedic astrology, showing the positions of planets at your birth and their impact on your life's journey. Each house and sign represents a different aspect of your experience. A detailed chart analysis can reveal your strengths, weaknesses, and karmic lessons.</li>
                <li><span className="font-semibold text-indigo-700">Zodiac Signs:</span> The twelve signs (Rashis) color your personality, preferences, and approach to life. Each sign is ruled by a planet and has unique strengths and challenges. Understanding your Moon sign and ascendant is especially important in Vedic astrology.</li>
                <li><span className="font-semibold text-indigo-700">Planetary Periods (Dasha):</span> Dashas are cycles that highlight the influence of specific planets over time, shaping your opportunities, challenges, and growth. The Vimshottari Dasha system is most widely used, and knowing your current Dasha can help you plan important life events.</li>
                <li><span className="font-semibold text-indigo-700">Yogas:</span> Special planetary combinations that can bring blessings, talents, or challenges. Understanding yogas helps you harness your unique gifts. Some yogas bring fame, wealth, or spiritual insight, while others may indicate obstacles to overcome.</li>
                <li><span className="font-semibold text-indigo-700">Remedies:</span> Vedic astrology offers practical solutions—mantras, rituals, gemstones, and charity—to balance planetary influences and promote well-being. Remedies are personalized and can help you align with your highest potential.</li>
              </ul>
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <span className="text-indigo-600 font-medium">Tip:</span> Consult a qualified astrologer to interpret your chart and recommend personalized remedies for your goals and challenges. Keep a journal of your experiences to notice how planetary cycles affect your life.
              </div>
            </div>
            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Core Principles of Vedic Astrology</h2>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li><span className="text-indigo-500 mr-2">•</span>Every individual has a unique birth chart based on the exact time, date, and place of birth. The chart is divided into twelve houses, each representing a different area of life.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>The twelve houses represent self, family, wealth, communication, home, creativity, health, marriage, transformation, luck, career, gains, and liberation.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Planets in different signs and houses create specific yogas and influences. The relationships between planets (aspects, conjunctions) add further depth to the analysis.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Transits and Dashas activate different parts of your chart at different times, bringing opportunities for growth, change, or healing.</li>
                </ul>
                {/* Additional FAQ-style questions */}
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">How is Vedic astrology different from Western astrology?</h3>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>Vedic astrology uses the sidereal zodiac, which is aligned with the actual constellations, while Western astrology uses the tropical zodiac based on the seasons.</li>
                      <li>Vedic astrology places greater emphasis on the Moon sign, ascendant, and planetary periods (Dashas), while Western astrology often focuses on the Sun sign.</li>
                      <li>Vedic astrology incorporates karmic theory and spiritual evolution as core principles.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">What is the importance of the ascendant (Lagna)?</h3>
                    <p className="text-gray-700 ml-2">The ascendant sets the structure of your birth chart and influences your physical appearance, health, and approach to life. It is the starting point for house calculations and colors your entire chart interpretation.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Can astrology predict the future?</h3>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>Astrology reveals trends, opportunities, and challenges, but your choices and actions shape your destiny. It is a tool for guidance, not fatalism.</li>
                      <li>Timing is a key strength of Vedic astrology—knowing your Dashas and transits can help you make the most of favorable periods and prepare for challenges.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">How can I use astrology for self-growth?</h3>
                    <p className="text-gray-700 ml-2">By understanding your chart, you can align with your strengths, work on your challenges, and make empowered decisions for personal and spiritual growth. Astrology can also help you choose the right career, improve relationships, and find your spiritual path.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">What are Nakshatras?</h3>
                    <p className="text-gray-700 ml-2">Nakshatras are the 27 lunar constellations in Vedic astrology. They add a deeper layer of meaning to your chart, influencing your mind, emotions, and destiny. Each Nakshatra has its own symbolism, ruling deity, and qualities.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">How do yogas affect my life?</h3>
                    <p className="text-gray-700 ml-2">Yogas are special planetary combinations that can bring success, wealth, fame, or challenges. Their effects depend on activation by Dashas and transits, and a skilled astrologer can help you understand their impact in your chart.</p>
                  </div>
                </div>
                {/* New: Yogas Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Important Yogas in Vedic Astrology</h3>
                  <p className="text-gray-700 mb-4">Yogas are special combinations that can bring success, fame, or challenges. Some key yogas include:</p>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1 mb-4">
                    <li><span className="font-semibold text-indigo-700">Raj Yoga:</span> Brings leadership, authority, and prosperity when benefic planets combine in key houses. People with Raj Yoga often rise to positions of power and influence.</li>
                    <li><span className="font-semibold text-indigo-700">Dhan Yoga:</span> Indicates wealth and financial success through favorable planetary placements. Dhan Yoga can manifest as business acumen, inheritance, or sudden gains.</li>
                    <li><span className="font-semibold text-indigo-700">Chandra-Mangal Yoga:</span> Moon and Mars together, giving financial acumen and drive. This yoga is known for boosting entrepreneurial spirit and determination.</li>
                    <li><span className="font-semibold text-indigo-700">Vipreet Raj Yoga:</span> Adversity turns into success through certain planetary positions. People with this yoga often overcome great obstacles to achieve remarkable success.</li>
                    <li><span className="font-semibold text-indigo-700">Gaja-Kesari Yoga:</span> Jupiter and Moon in mutual kendras, bestowing intelligence, respect, and good fortune.</li>
                    <li><span className="font-semibold text-indigo-700">Neecha Bhanga Raja Yoga:</span> Cancellation of planetary debilitation, leading to unexpected rise and recovery from setbacks.</li>
                  </ul>
                  <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg mb-4">
                    <span className="text-indigo-600 font-medium">Tip:</span> <span className="text-black font-medium italic">Yogas manifest fully only when activated by Dashas and transits. Their results may vary based on the strength and placement of planets in your chart.</span>
                  </div>
                </section>
                {/* New: Common Misconceptions Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Common Misconceptions about Vedic Astrology</h3>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2 mb-4">
                    <li>Astrology is not superstition—it is a science of cosmic patterns and timing, validated by centuries of observation and experience.</li>
                    <li>Not all predictions are fixed; free will and karma play a major role. Your actions and intentions can change outcomes.</li>
                    <li>Remedies are not magic—they work by aligning your actions with cosmic energies and require faith, patience, and consistency.</li>
                    <li>Everyone has strengths and challenges; astrology helps you understand and work with them, not judge or label.</li>
                    <li>Astrology is not a substitute for medical or professional advice, but a complementary tool for self-awareness and growth.</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <span className="text-yellow-700 font-medium">Did you know?</span> Even challenging planetary placements can be transformed through awareness, <span className="text-black font-medium">remedies, and positive action.</span>
                  </div>
                </section>
                {/* New: Case Study Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Case Study: Using Vedic Astrology for Life Decisions</h3>
                  <p className="text-gray-700 mb-4">Amit, a 28-year-old engineer, was unsure about a career change. His chart showed a favorable Mercury Dasha and strong tenth house. With astrological guidance, he timed his move, resulting in a successful transition and greater job satisfaction. He also used recommended remedies, such as chanting Mercury mantras and wearing an emerald, to enhance his confidence and communication skills. Over time, Amit noticed improved relationships at work and a sense of purpose in his new role.</p>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                    <li><span className="font-semibold text-green-700">Lesson:</span> Astrology can help you make informed decisions and maximize opportunities. It is most powerful when combined with self-reflection and conscious action.</li>
                    <li><span className="font-semibold text-green-700">Remedy:</span> Personalized mantras, rituals, and lifestyle changes can support your goals and reduce obstacles. Consistency and faith are key to seeing results.</li>
                  </ul>
                </section>
                {/* Table: Houses and Their Meanings */}
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">House</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Significance</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1st', 'Self, body, personality', 'Confidence, health'],
                        ['2nd', 'Wealth, speech, family', 'Savings, communication'],
                        ['3rd', 'Courage, siblings, skills', 'Initiative, writing'],
                        ['4th', 'Home, mother, emotions', 'Real estate, comfort'],
                        ['5th', 'Creativity, children, intellect', 'Art, education'],
                        ['6th', 'Health, service, obstacles', 'Work, competition'],
                        ['7th', 'Marriage, partnerships', 'Spouse, business'],
                        ['8th', 'Transformation, secrets', 'Inheritance, research'],
                        ['9th', 'Luck, dharma, higher learning', 'Travel, philosophy'],
                        ['10th', 'Career, status, authority', 'Profession, reputation'],
                        ['11th', 'Gains, friends, aspirations', 'Income, networking'],
                        ['12th', 'Spirituality, losses, liberation', 'Foreign travel, meditation'],
                      ].map(([house, significance, example], i) => (
                        <tr key={house} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-3 px-4 border-b font-medium text-black">{house}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{significance}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{example}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            {activeTab === 'Principles' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Fundamental Principles Explained</h2>
                <ul className="space-y-3 text-gray-700">
                  <li><span className="text-indigo-500 mr-2">✓</span>The ascendant (Lagna) is the starting point of your chart and sets the tone for your life's journey.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Each planet has a unique role—Sun for soul, Moon for mind, Mars for energy, etc.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Houses, signs, and planets interact to create your unique destiny.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Remedies can help balance difficult influences and enhance positive ones.</li>
                </ul>
              </section>
            )}
            {activeTab === 'Remedies' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Vedic Remedies for Life's Challenges</h2>
                <ul className="space-y-3 text-gray-700">
                  <li><span className="text-green-500 mr-2">•</span>Chanting specific mantras for planetary peace</li>
                  <li><span className="text-green-500 mr-2">•</span>Wearing gemstones as per astrological advice</li>
                  <li><span className="text-green-500 mr-2">•</span>Charity and donations to balance karma</li>
                  <li><span className="text-green-500 mr-2">•</span>Observing fasts and rituals on auspicious days</li>
                </ul>
              </section>
            )}
            {activeTab === 'FAQs' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {[
                    ['Can Vedic astrology help with health issues?', 'Yes, it can indicate periods of vulnerability and suggest remedies for prevention and healing.'],
                    ['Is my destiny fixed according to my chart?', 'No, astrology shows tendencies and timing, but your actions and awareness shape your future.'],
                    ['How often should I consult an astrologer?', 'It is helpful to check your chart during major life changes or when facing important decisions.'],
                    ['Are online horoscopes accurate?', 'General horoscopes are broad; personalized readings based on your birth chart are much more accurate.'],
                  ].map(([q, a], i) => (
                    <div key={q} className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center"><HelpCircle className="w-5 h-5 mr-2 text-indigo-400" />{q}</h3>
                      <p className="text-gray-700">{a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
            <CTASection />
            
            {/* Next Blog Section */}
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Continue Your Astrological Journey</h2>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all cursor-pointer">
                <a href="/blog/gemstones-and-their-powers" className="block">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-green-100">
                      <Image src="/images/ASTRO.webp" alt="Gemstones" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-green-600 font-medium mb-1">Next in Series</p>
                      <h3 className="text-xl font-bold text-black mb-2">Gemstones and Their Powers</h3>
                      <p className="text-gray-700 text-sm mb-3">Explore the mystical properties of gemstones and their astrological significance. Discover how the right stone can transform your energy and destiny.</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>15 April, 2024</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>10 min read</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-green-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.div>
            </section>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            <a href="/about" className="block bg-indigo-50 rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-indigo-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="text-indigo-700 font-medium">Astrological Review by</span> <br />
                    <span className="font-semibold text-indigo-900">Dr. Narendra Kumar Sharma</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Updated on 15 April, 2024</span>
                  </p>
                </div>
              </div>
            </a>
            {/* Newsletter */}
            <div className="bg-orange-50 rounded-lg p-6 mb-8">
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
            </div>
            {/* Common Myths */}
            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-yellow-900 mb-4">Common Astrology Myths</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Astrology is only about prediction (it's also about guidance and self-awareness)</li>
                <li>Gemstones work for everyone (consult an expert for personalized advice)</li>
                <li>Remedies are instant (patience and faith are key)</li>
                <li>All bad events are due to planets (karma and choices matter too)</li>
              </ul>
            </div>
            {/* Resources */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Recommended Resources</h3>
              <ul className="space-y-3">
                {[
                  ['The Influence of Planets', '/blog/the-influence-of-planets'],
                  ['Gemstones and Their Powers', '/blog/gemstones-and-powers'],
                  ['Numerology Basics', '/blog/numerology-basics'],
                  ['Guide to Crystal Healing', '/blog/crystal-healing'],
                ].map(([title, link], i) => (
                  <li key={title}>
                    <a href={link} className="text-indigo-700 hover:underline flex items-start">
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