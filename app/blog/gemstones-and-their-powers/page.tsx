'use client'

import { useState, useEffect } from 'react';
import { User, Calendar, Gem, BookOpen, HelpCircle } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import Image from 'next/image';
import { CTASection } from '../../components/CTASection';
import { motion } from 'framer-motion';

const post = blogPosts['gemstones-and-powers'];
const tabs = ['Overview', 'Gemstone Guide', 'Remedies', 'FAQs'];

export default function GemstonesAndPowersPage() {
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
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">Gemstones and Their Powers</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">Explore the mystical properties of gemstones and their astrological significance. Discover how the right stone can transform your energy and destiny.</p>
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
                <span className="text-indigo-600 font-medium">Key Takeaway:</span> Gemstones are not just beautiful—they are powerful tools for healing, protection, and spiritual growth when chosen and worn with awareness.
              </p>
            </motion.div>
            {/* Hero Image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/ASTRO.webp" alt={post.title.en} fill className="object-cover" />
            </motion.div>
            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6">
              <p>
                {post.content.en.split('\n')[0]}
              </p>
              <p>
                <span className="font-semibold text-indigo-700">Why Gemstones?</span> Gemstones have been used for centuries in Vedic astrology to balance planetary energies, attract abundance, and protect against negativity. Each stone resonates with a specific planet and can amplify its positive effects or reduce its challenges.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-4">
                <li><span className="font-semibold text-indigo-700">Yellow Sapphire (Pukhraj):</span> Associated with Jupiter, brings wisdom, prosperity, and spiritual growth.</li>
                <li><span className="font-semibold text-indigo-700">Pearl (Moti):</span> Linked to the Moon, enhances emotional balance, peace, and intuition.</li>
                <li><span className="font-semibold text-indigo-700">Ruby (Manik):</span> Represents the Sun, boosts confidence, vitality, and leadership.</li>
                <li><span className="font-semibold text-indigo-700">Emerald (Panna):</span> Mercury's stone, sharpens intellect, communication, and creativity.</li>
                <li><span className="font-semibold text-indigo-700">Blue Sapphire (Neelam):</span> Saturn's gem, offers discipline, focus, and protection from obstacles.</li>
                <li><span className="font-semibold text-indigo-700">Coral (Moonga):</span> Mars' stone, increases courage, energy, and determination.</li>
                <li><span className="font-semibold text-indigo-700">Diamond (Heera):</span> Venus' gem, attracts love, luxury, and artistic inspiration.</li>
                <li><span className="font-semibold text-indigo-700">Hessonite (Gomed):</span> Rahu's stone, helps with ambition, clarity, and overcoming confusion.</li>
                <li><span className="font-semibold text-indigo-700">Cat's Eye (Lehsunia):</span> Ketu's gem, supports spiritual insight, detachment, and protection from hidden dangers.</li>
              </ul>
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <span className="text-indigo-600 font-medium">Tip:</span> Always consult a qualified astrologer before wearing a gemstone. The right stone can empower you, but the wrong one may intensify challenges.
              </div>
            </motion.div>
            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">How Gemstones Work in Astrology</h2>
                <motion.ul initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-3 text-gray-700 mb-8">
                  <li><span className="text-indigo-500 mr-2">•</span>Gemstones act as cosmic amplifiers, channeling planetary energies into your aura and chakras.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Each stone has unique vibrations that can heal, protect, or enhance specific qualities.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Wearing a gemstone on the correct finger and metal is crucial for best results.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Purification rituals and energizing mantras activate the stone's power.</li>
                </motion.ul>
                {/* FAQ-style questions */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">How do I choose the right gemstone?</h3>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>Consult your birth chart to identify planetary strengths and weaknesses.</li>
                      <li>Choose a gemstone that supports your goals and balances challenging influences.</li>
                      <li>Seek guidance from a trusted astrologer for personalized recommendations.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Can anyone wear any gemstone?</h3>
                    <p className="text-gray-700 ml-2">No. Wearing the wrong stone can intensify negative effects. Always get a professional recommendation before wearing a gemstone.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">How should gemstones be worn?</h3>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>Wear the stone on the correct finger and in the right metal (e.g., gold, silver, or panchdhatu).</li>
                      <li>Perform purification and energizing rituals before wearing.</li>
                      <li>Regularly cleanse and recharge your gemstone for continued benefits.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Are synthetic or treated stones effective?</h3>
                    <p className="text-gray-700 ml-2">Natural, untreated gemstones are preferred for astrological purposes. Synthetic or treated stones may lack the necessary vibrations.</p>
                  </div>
                </motion.div>
                {/* Gemstone Guide Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Gemstone Guide: Properties and Effects</h3>
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid md:grid-cols-2 gap-8">
                    {[
                      ['Yellow Sapphire', 'Jupiter', 'Wisdom, prosperity, spiritual growth', '/images/ASTRO.webp'],
                      ['Pearl', 'Moon', 'Emotional balance, peace, intuition', '/images/phd.webp'],
                      ['Ruby', 'Sun', 'Confidence, vitality, leadership', '/images/ASTRO.webp'],
                      ['Emerald', 'Mercury', 'Intellect, communication, creativity', '/images/phd.webp'],
                      ['Blue Sapphire', 'Saturn', 'Discipline, focus, protection', '/images/ASTRO.webp'],
                      ['Coral', 'Mars', 'Courage, energy, determination', '/images/phd.webp'],
                      ['Diamond', 'Venus', 'Love, luxury, artistic inspiration', '/images/ASTRO.webp'],
                      ['Hessonite', 'Rahu', 'Ambition, clarity, overcoming confusion', '/images/phd.webp'],
                      ["Cat's Eye", 'Ketu', 'Spiritual insight, detachment, protection', '/images/ASTRO.webp'],
                    ].map(([name, planet, effect, img], i) => (
                      <motion.div key={name as string} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all cursor-pointer">
                        <div className="relative w-32 h-32 mb-4">
                          <Image src={img as string} alt={name as string} fill className="object-cover rounded-full border-4 border-indigo-100 shadow" />
                        </div>
                        <h4 className="text-xl font-bold text-black mb-1">{name}</h4>
                        <p className="text-indigo-700 font-medium mb-1">Planet: {planet}</p>
                        <p className="text-gray-700 mb-2">{effect}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg mt-8">
                    <span className="text-indigo-600 font-medium">Tip:</span> <span className="text-black font-medium italic">Always buy gemstones from a reputable source and verify authenticity before use.</span>
                  </div>
                </section>
                {/* Misconceptions Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Common Misconceptions about Gemstones</h3>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2 mb-4">
                    <li>Any gemstone can be worn by anyone—this is not true; the wrong stone can cause problems.</li>
                    <li>Gemstones work instantly; in reality, their effects build gradually over time.</li>
                    <li>Size and price are not the only factors—clarity, authenticity, and correct usage matter most.</li>
                    <li>Gemstones are not a substitute for effort, self-care, or medical advice.</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <span className="text-yellow-700 font-medium">Did you know?</span> <span className="text-black font-medium">Even a small, genuine gemstone can be powerful if chosen and worn correctly.</span>
                  </div>
                </section>
                {/* Case Study Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Case Study: The Power of the Right Gemstone</h3>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
                    <p className="text-gray-700 mb-4">Ravi, a 35-year-old entrepreneur, struggled with indecision and financial instability. After consulting an astrologer, he was advised to wear a yellow sapphire for Jupiter. Within months, he noticed increased confidence, better decision-making, and new business opportunities. Regular cleansing and mantra chanting amplified the stone's effects.</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li><span className="font-semibold text-green-700">Lesson:</span> The right gemstone, chosen with care, can support your goals and well-being.</li>
                      <li><span className="font-semibold text-green-700">Remedy:</span> Combine gemstone use with positive actions, self-reflection, and regular spiritual practices for best results.</li>
                    </ul>
                  </motion.div>
                </section>
                {/* Table: Gemstones and Planets */}
                <div className="overflow-x-auto mb-8">
                  <motion.table initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Gemstone</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Planet</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Benefits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Yellow Sapphire', 'Jupiter', 'Wisdom, prosperity, spiritual growth'],
                        ['Pearl', 'Moon', 'Emotional balance, peace, intuition'],
                        ['Ruby', 'Sun', 'Confidence, vitality, leadership'],
                        ['Emerald', 'Mercury', 'Intellect, communication, creativity'],
                        ['Blue Sapphire', 'Saturn', 'Discipline, focus, protection'],
                        ['Coral', 'Mars', 'Courage, energy, determination'],
                        ['Diamond', 'Venus', 'Love, luxury, artistic inspiration'],
                        ['Hessonite', 'Rahu', 'Ambition, clarity, overcoming confusion'],
                        ["Cat's Eye", 'Ketu', 'Spiritual insight, detachment, protection'],
                      ].map(([gem, planet, benefit], i) => (
                        <tr key={gem} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-3 px-4 border-b font-medium text-black">{gem}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{planet}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{benefit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </motion.table>
                </div>
              </section>
            )}
            {activeTab === 'Gemstone Guide' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Gemstone Selection & Care</h2>
                <motion.ul initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-3 text-gray-700">
                  <li><span className="text-indigo-500 mr-2">✓</span>Choose gemstones based on your birth chart and current planetary periods.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Cleanse stones regularly with water, sunlight, or mantra chanting.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Store gemstones separately to avoid scratches and energy mixing.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Recharge stones during auspicious planetary transits or full moons.</li>
                </motion.ul>
              </section>
            )}
            {activeTab === 'Remedies' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Gemstone Remedies for Life's Challenges</h2>
                <motion.ul initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-3 text-gray-700">
                  <li><span className="text-green-500 mr-2">•</span>Yellow Sapphire for wisdom, prosperity, and overcoming obstacles in education or career.</li>
                  <li><span className="text-green-500 mr-2">•</span>Pearl for emotional healing, peace, and better relationships.</li>
                  <li><span className="text-green-500 mr-2">•</span>Blue Sapphire for protection, discipline, and success during Saturn periods.</li>
                  <li><span className="text-green-500 mr-2">•</span>Emerald for communication, creativity, and business growth.</li>
                  <li><span className="text-green-500 mr-2">•</span>Diamond for love, luxury, and artistic inspiration.</li>
                </motion.ul>
              </section>
            )}
            {activeTab === 'FAQs' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Frequently Asked Questions</h2>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6">
                  {[
                    ['Can gemstones change my destiny?', 'They can support your efforts and balance energies, but your actions and intentions are most important.'],
                    ['How long does it take for a gemstone to work?', 'Effects may be felt within weeks to months, depending on your chart and consistency.'],
                    ['Can I wear more than one gemstone?', 'Yes, but only after consulting an astrologer to avoid conflicting energies.'],
                    ['What if I feel discomfort after wearing a stone?', 'Remove it and consult your astrologer for guidance. Not every stone is suitable for everyone.'],
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
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all cursor-pointer">
                <a href="/blog/numerology-basics" className="block">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-purple-100">
                      <Image src="/images/Numerology.svg" alt="Numerology" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-purple-600 font-medium mb-1">Next in Series</p>
                      <h3 className="text-xl font-bold text-black mb-2">Numerology Basics</h3>
                      <p className="text-gray-700 text-sm mb-3">Discover how numbers influence your life path and destiny. Learn the ancient science of numerology and unlock the secrets hidden in your birth date and name.</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>15 April, 2024</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>12 min read</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-purple-600">
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
                <li>Gemstones work for everyone (consult an expert for personalized advice)</li>
                <li>Remedies are instant (patience and faith are key)</li>
                <li>All bad events are due to planets (karma and choices matter too)</li>
                <li>Gemstones are a substitute for effort (they are a support, not a replacement)</li>
              </ul>
            </div>
            {/* Resources */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Recommended Resources</h3>
              <ul className="space-y-3">
                {[
                  ['The Influence of Planets', '/blog/the-influence-of-planets'],
                  ['Understanding Vedic Astrology', '/blog/understanding-vedic-astrology'],
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