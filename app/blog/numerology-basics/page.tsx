'use client'

import { useState, useEffect } from 'react';
import { User, Calendar, Hash, BookOpen, HelpCircle } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import Image from 'next/image';
import { CTASection } from '../../components/CTASection';
import { motion } from 'framer-motion';

const post = blogPosts['numerology-basics'];
const tabs = ['Overview', 'Number Guide', 'Calculations', 'FAQs'];

export default function NumerologyBasicsPage() {
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
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">Numerology Basics</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">Discover how numbers influence your life path and destiny. Learn the ancient science of numerology and unlock the secrets hidden in your birth date and name.</p>
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
            {/* Key Takeaway */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8 rounded-lg">
              <p className="text-gray-700">
                <span className="text-indigo-600 font-medium">Key Takeaway:</span> Numbers are not just mathematical symbols—they carry vibrational energies that influence every aspect of your life, from personality traits to life purpose and destiny.
              </p>
            </motion.div>
            {/* Hero Image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/Numerology.svg" alt={post.title.en} fill className="object-cover" />
            </motion.div>
            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6">
              <p>
                {post.content.en.split('\n')[0]}
              </p>
              <p>
                <span className="font-semibold text-indigo-700">What is Numerology?</span> Numerology is the mystical study of numbers and their influence on human life. It's based on the belief that numbers have vibrational frequencies that affect our personality, relationships, career, and life path. By understanding these numerical patterns, we can gain insights into our strengths, challenges, and purpose.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-4">
                <li><span className="font-semibold text-indigo-700">Life Path Number:</span> Derived from your birth date, reveals your life's purpose and the lessons you're here to learn.</li>
                <li><span className="font-semibold text-indigo-700">Destiny Number:</span> Calculated from your full name, indicates your natural talents and the path you're destined to follow.</li>
                <li><span className="font-semibold text-indigo-700">Soul Number:</span> Based on the vowels in your name, represents your inner desires and spiritual aspirations.</li>
                <li><span className="font-semibold text-indigo-700">Personality Number:</span> Derived from consonants in your name, shows how others perceive you.</li>
                <li><span className="font-semibold text-indigo-700">Birth Day Number:</span> Your day of birth reveals your natural talents and abilities.</li>
                <li><span className="font-semibold text-indigo-700">Maturity Number:</span> Shows the person you'll become in the latter part of your life.</li>
                <li><span className="font-semibold text-indigo-700">Personal Year Number:</span> Changes annually, indicating the theme and opportunities for each year.</li>
                <li><span className="font-semibold text-indigo-700">Karmic Debt Numbers:</span> Reveal past-life lessons and challenges to overcome.</li>
                <li><span className="font-semibold text-indigo-700">Master Numbers:</span> 11, 22, and 33 carry special spiritual significance and higher vibrations.</li>
              </ul>
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <span className="text-indigo-600 font-medium">Tip:</span> Numerology works best when combined with self-awareness and conscious effort. Numbers provide guidance, but your choices and actions shape your destiny.
              </div>
            </motion.div>
            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">How Numerology Works</h2>
                <motion.ul initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-3 text-gray-700 mb-8">
                  <li><span className="text-indigo-500 mr-2">•</span>Numbers vibrate at specific frequencies that influence our energy and experiences.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Your birth date and name create a unique numerical blueprint for your life.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Each number (1-9) has distinct characteristics, strengths, and challenges.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Master numbers (11, 22, 33) carry higher spiritual vibrations and potential.</li>
                </motion.ul>
                {/* FAQ-style questions */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">How do I calculate my Life Path Number?</h3>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>Add all digits of your birth date (e.g., 15-03-1990 = 1+5+0+3+1+9+9+0 = 28)</li>
                      <li>Reduce to a single digit: 2+8 = 10, then 1+0 = 1</li>
                      <li>Your Life Path Number is 1</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">What's the difference between Life Path and Destiny Number?</h3>
                    <p className="text-gray-700 ml-2">Life Path Number comes from your birth date and shows your life's purpose, while Destiny Number comes from your name and reveals your natural talents and abilities.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Do master numbers need to be reduced?</h3>
                    <p className="text-gray-700 ml-2">No, master numbers (11, 22, 33) should be kept as they are, as they carry special spiritual significance and higher vibrations.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Can numerology predict the future?</h3>
                    <p className="text-gray-700 ml-2">Numerology provides insights into patterns and tendencies, but it doesn't predict specific events. It helps you understand your potential and make better choices.</p>
                  </div>
                </motion.div>
                {/* Number Guide Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Number Meanings: 1-9 and Master Numbers</h3>
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid md:grid-cols-2 gap-8">
                    {[
                      ['1', 'Leader', 'Independence, ambition, innovation', '/images/Numerology.svg', 'Fire', 'bg-gradient-to-br from-red-50 to-orange-50'],
                      ['2', 'Peacemaker', 'Cooperation, diplomacy, intuition', '/images/Numerology.svg', 'Water', 'bg-gradient-to-br from-blue-50 to-cyan-50'],
                      ['3', 'Communicator', 'Creativity, expression, joy', '/images/Numerology.svg', 'Air', 'bg-gradient-to-br from-yellow-50 to-amber-50'],
                      ['4', 'Builder', 'Stability, organization, hard work', '/images/Numerology.svg', 'Earth', 'bg-gradient-to-br from-green-50 to-emerald-50'],
                      ['5', 'Adventurer', 'Freedom, change, experience', '/images/Numerology.svg', 'Air', 'bg-gradient-to-br from-purple-50 to-indigo-50'],
                      ['6', 'Nurturer', 'Responsibility, harmony, service', '/images/Numerology.svg', 'Earth', 'bg-gradient-to-br from-pink-50 to-rose-50'],
                      ['7', 'Seeker', 'Spirituality, analysis, wisdom', '/images/Numerology.svg', 'Water', 'bg-gradient-to-br from-slate-50 to-gray-50'],
                      ['8', 'Achiever', 'Power, success, material wealth', '/images/Numerology.svg', 'Fire', 'bg-gradient-to-br from-orange-50 to-red-50'],
                      ['9', 'Humanitarian', 'Compassion, completion, universal love', '/images/Numerology.svg', 'Fire', 'bg-gradient-to-br from-violet-50 to-purple-50'],
                      ['11', 'Intuitive', 'Spiritual insight, inspiration, illumination', '/images/Numerology.svg', 'Master', 'bg-gradient-to-br from-indigo-50 to-blue-50'],
                      ['22', 'Master Builder', 'Practical vision, large-scale achievement', '/images/Numerology.svg', 'Master', 'bg-gradient-to-br from-teal-50 to-cyan-50'],
                      ['33', 'Master Teacher', 'Spiritual teaching, healing, guidance', '/images/Numerology.svg', 'Master', 'bg-gradient-to-br from-amber-50 to-yellow-50'],
                    ].map(([number, title, traits, img, element, bgClass], i) => (
                      <motion.div key={number as string} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} className={`${bgClass} rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all cursor-pointer border border-gray-100 hover:border-gray-200`}>
                        <div className="relative w-32 h-32 mb-4">
                          <Image src={img as string} alt={`Number ${number}`} fill className="object-cover rounded-full border-4 border-white shadow-lg" />
                        </div>
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-gray-600 bg-white/70 rounded-full border border-gray-200">
                            {element} Element
                          </span>
                        </div>
                        <h4 className="text-6xl font-black text-gray-800 mb-2 tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>{number}</h4>
                        <h5 className="text-xl font-bold text-gray-900 mb-2 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{title}</h5>
                        <p className="text-gray-700 mb-2 text-sm leading-relaxed font-medium">{traits}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg mt-8">
                    <span className="text-indigo-600 font-medium">Tip:</span> <span className="text-black font-medium italic">Your numbers work together to create a complete picture of your personality and life path.</span>
                  </div>
                </section>
                {/* Misconceptions Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Common Misconceptions about Numerology</h3>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2 mb-4">
                    <li>Numerology is just superstition—it's actually based on mathematical patterns and vibrational frequencies.</li>
                    <li>All people with the same number are identical—numbers show tendencies, but individual choices matter.</li>
                    <li>Numbers can predict exact events—they provide guidance and insights, not specific predictions.</li>
                    <li>Changing your name will completely change your destiny—it can influence your path, but your core numbers remain.</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <span className="text-yellow-700 font-medium">Did you know?</span> <span className="text-black font-medium">Pythagoras, the famous mathematician, was also a numerologist who believed numbers were the language of the universe.</span>
                  </div>
                </section>
                {/* Case Study Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Case Study: Discovering Life Purpose Through Numbers</h3>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <p className="text-gray-700 mb-4">Priya, a 28-year-old marketing professional, felt unfulfilled despite her success. Her Life Path Number 7 revealed her natural inclination toward analysis and spirituality. This insight led her to pursue a career in market research and start a meditation practice. Within a year, she felt more aligned with her true purpose and experienced greater satisfaction in both work and personal life.</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li><span className="font-semibold text-green-700">Lesson:</span> Understanding your numbers can help you align with your natural talents and life purpose.</li>
                      <li><span className="font-semibold text-green-700">Application:</span> Use numerology as a tool for self-discovery and making informed life choices.</li>
                    </ul>
                  </motion.div>
                </section>
                {/* Table: Number Characteristics */}
                <div className="overflow-x-auto mb-8">
                  <motion.table initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Number</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Element</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Strengths</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Challenges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['1', 'Fire', 'Leadership, independence, innovation', 'Impatience, ego, domination'],
                        ['2', 'Water', 'Cooperation, intuition, diplomacy', 'Oversensitivity, indecision'],
                        ['3', 'Air', 'Creativity, communication, joy', 'Scattered energy, superficiality'],
                        ['4', 'Earth', 'Stability, organization, reliability', 'Rigidity, resistance to change'],
                        ['5', 'Air', 'Freedom, adventure, versatility', 'Restlessness, irresponsibility'],
                        ['6', 'Earth', 'Responsibility, harmony, service', 'Self-sacrifice, worry'],
                        ['7', 'Water', 'Spirituality, analysis, wisdom', 'Isolation, skepticism'],
                        ['8', 'Fire', 'Power, success, material wealth', 'Materialism, workaholism'],
                        ['9', 'Fire', 'Compassion, completion, universal love', 'Emotional baggage, martyrdom'],
                      ].map(([num, element, strengths, challenges], i) => (
                        <tr key={num} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-3 px-4 border-b font-medium text-black">{num}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{element}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{strengths}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{challenges}</td>
                        </tr>
                      ))}
                    </tbody>
                  </motion.table>
                </div>
              </section>
            )}
            {activeTab === 'Number Guide' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Understanding Your Numbers</h2>
                <motion.ul initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-3 text-gray-700">
                  <li><span className="text-indigo-500 mr-2">✓</span>Calculate your core numbers to understand your life blueprint.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Recognize your strengths and work on your challenges.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Use numerology to make better life decisions and career choices.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Understand compatibility with others through number analysis.</li>
                </motion.ul>
              </section>
            )}
            {activeTab === 'Calculations' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Numerology Calculations Made Simple</h2>
                <motion.ul initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-3 text-gray-700">
                  <li><span className="text-green-500 mr-2">•</span>Life Path Number: Add all digits of birth date, reduce to single digit</li>
                  <li><span className="text-green-500 mr-2">•</span>Destiny Number: Convert name letters to numbers, add, reduce</li>
                  <li><span className="text-green-500 mr-2">•</span>Soul Number: Use only vowels from your name</li>
                  <li><span className="text-green-500 mr-2">•</span>Personality Number: Use only consonants from your name</li>
                  <li><span className="text-green-500 mr-2">•</span>Personal Year: Add birth day + birth month + current year</li>
                </motion.ul>
              </section>
            )}
            {activeTab === 'FAQs' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Frequently Asked Questions</h2>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6">
                  {[
                    ['Can numerology help with career choices?', 'Yes, your numbers can reveal your natural talents and suitable career paths.'],
                    ['Do numbers affect relationships?', 'Numerology can show compatibility and potential challenges in relationships.'],
                    ['Should I change my name for better numbers?', 'Consider it carefully - it can influence your path but won\'t change your core essence.'],
                    ['How accurate is numerology?', 'It provides valuable insights and patterns, but your free will and choices are most important.'],
                  ].map(([q, a], i) => (
                    <div key={q} className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center"><HelpCircle className="w-5 h-5 mr-2 text-indigo-400" />{q}</h3>
                      <p className="text-gray-700">{a}</p>
                    </div>
                  ))}
                </motion.div>
              </section>
            )}
            <CTASection />
            
            {/* Next Blog Section */}
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Continue Your Astrological Journey</h2>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100 hover:shadow-lg transition-all cursor-pointer">
                <a href="/blog/understanding-your-birth-chart" className="block">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-orange-100">
                      <Image src="/images/astrology.svg" alt="Birth Chart" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-orange-600 font-medium mb-1">Next in Series</p>
                      <h3 className="text-xl font-bold text-black mb-2">Understanding Your Birth Chart</h3>
                      <p className="text-gray-700 text-sm mb-3">A birth chart is a vital map of your life, showing the position of planets at the time of your birth. Learn to read your cosmic blueprint.</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>15 April, 2024</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>15 min read</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-orange-600">
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
                    <span className="text-indigo-700 font-medium">Numerological Review by</span> <br />
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
              <h3 className="text-lg font-bold text-orange-900 mb-4">Get Weekly Numerology Insights</h3>
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
              <h3 className="text-lg font-bold text-yellow-900 mb-4">Common Numerology Myths</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Numbers control your destiny (you have free will)</li>
                <li>All calculations are the same (methods vary)</li>
                <li>Numbers can predict exact events (they show patterns)</li>
                <li>Changing your name fixes everything (it's one tool among many)</li>
              </ul>
            </div>
            {/* Resources */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Recommended Resources</h3>
              <ul className="space-y-3">
                {[
                  ['The Influence of Planets', '/blog/the-influence-of-planets'],
                  ['Understanding Vedic Astrology', '/blog/understanding-vedic-astrology'],
                  ['Gemstones and Their Powers', '/blog/gemstones-and-their-powers'],
                  ['Understanding Your Birth Chart', '/blog/understanding-your-birth-chart'],
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