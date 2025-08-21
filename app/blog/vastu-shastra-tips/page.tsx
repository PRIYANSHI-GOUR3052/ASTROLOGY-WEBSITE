'use client'

import { useState, useEffect } from 'react';
import { User, Calendar, BookOpen, HelpCircle } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';
import { CTASection } from '../../components/CTASection';
import { motion } from 'framer-motion';

const post = blogPosts['vastu-shastra-tips'];
const tabs = ['Overview', 'Principles', 'Remedies', 'FAQs'];

export default function VastuShastraTipsPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [email, setEmail] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white pt-0 md:pt-2">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Heading */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">Vastu Shastra Tips</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">Discover the ancient science of Vastu Shastra and learn how to harmonize your living spaces with cosmic energies for prosperity, health, and happiness.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author.en}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {post.category}</span>
              </div>
            </div>
            {/* Hero Image */}
            <div className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image src={post.imageUrl} alt={post.title.en} fill className="object-cover" />
            </div>
            {/* Intro */}
            <div className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6 text-justify">
              <p>
                {post.content.en.split('\n')[0]}
              </p>
              <p>
                <span className="font-semibold text-indigo-700">What is Vastu Shastra?</span> Vastu Shastra is an ancient Indian science of architecture and design that harmonizes human dwellings with natural and cosmic energies. It provides guidelines for creating living spaces that promote health, wealth, prosperity, and spiritual growth by aligning with the five elements and cosmic forces.
              </p>
              <p>
                <span className="font-semibold text-indigo-700">History & Origins:</span> Vastu Shastra originated from the Vedas and has been practiced for over 5,000 years. Ancient sages observed how cosmic energies, natural elements, and geographical directions affect human well-being. This wisdom was documented in texts like the Brihat Samhita and continues to guide modern architecture and interior design.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-4">
                <li><span className="font-semibold text-indigo-700">Five Elements:</span> Vastu is based on the balance of Panchabhutas - Earth (Prithvi), Water (Jal), Fire (Agni), Air (Vayu), and Space (Akash). Each element governs specific areas and functions in your home, and their proper balance ensures harmony and positive energy flow.</li>
                <li><span className="font-semibold text-indigo-700">Eight Directions:</span> The eight cardinal directions (Ashta Dik) each have specific energies and deities. North brings wealth and prosperity, East represents health and family, South governs fame and recognition, and West is associated with creativity and children.</li>
                <li><span className="font-semibold text-indigo-700">Energy Flow:</span> Vastu emphasizes the smooth flow of positive energy (Prana) through your home. Proper placement of rooms, doors, windows, and furniture ensures that cosmic energies circulate freely, bringing abundance and well-being to all family members.</li>
                <li><span className="font-semibold text-indigo-700">Room Placement:</span> Each room has an ideal direction based on its function. The kitchen should face southeast for fire energy, bedrooms should be in the southwest for stability, and the study should face east for concentration and wisdom.</li>
                <li><span className="font-semibold text-indigo-700">Remedies:</span> Vastu offers practical solutions through colors, materials, symbols, and placement adjustments to correct energy imbalances and enhance positive vibrations in your living space.</li>
              </ul>
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <span className="text-indigo-600 font-medium">Tip:</span> Start with small Vastu corrections in your home - even minor adjustments can bring significant positive changes. Focus on decluttering, proper lighting, and maintaining cleanliness as these are fundamental to good Vastu.
              </div>
            </div>

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
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8 rounded-lg">
              <p className="text-gray-700">
                <span className="text-indigo-600 font-medium">Key Takeaway:</span> Vastu Shastra is a practical science that helps create harmonious living environments by aligning your home with cosmic energies, leading to improved health, relationships, and prosperity.
              </p>
            </div>
            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Core Principles of Vastu Shastra</h2>
                <div className="space-y-6 text-gray-700 mb-8 text-justify">
                  <p>
                    Vastu Shastra operates on the fundamental principle that everything in the universe is interconnected through energy. Your home is not just a physical structure but a living entity that interacts with cosmic forces, natural elements, and your personal energy field. When these energies are in harmony, you experience peace, prosperity, and well-being. However, when there's disharmony, it can manifest as health issues, financial problems, or relationship conflicts. Understanding this principle helps you see your living space as a sacred environment that needs to be nurtured and balanced.
                  </p>
                  <p>
                    The concept of energy flow, or Prana, is central to Vastu. Just as your body has energy channels (nadis) that need to be clear for good health, your home has energy pathways that must remain unobstructed for positive energy to circulate freely. Doors, windows, and open spaces act as energy entry points, while walls, furniture, and clutter can block or redirect this flow. The goal is to create a smooth, continuous energy circulation that nourishes every corner of your home and every member of your family.
                  </p>
                  <p>
                    Directional energies play a crucial role in Vastu. Each of the eight directions is ruled by specific cosmic forces and deities, and each governs particular aspects of life. The North is ruled by Kuber (God of Wealth) and brings financial prosperity and career opportunities. The East is ruled by Indra (God of Health) and promotes physical well-being and family harmony. The South is ruled by Yama (God of Fame) and brings recognition and social status. Understanding these directional energies helps you place rooms and functions in their most beneficial locations.
                  </p>
                  <p>
                    The five elements (Panchabhutas) are the building blocks of Vastu. Earth represents stability and foundation, Water symbolizes emotions and flow, Fire brings energy and transformation, Air governs movement and communication, and Space represents expansion and consciousness. Each element has specific qualities and needs to be balanced in your home. For example, too much fire energy can cause conflicts and restlessness, while too much water energy can lead to emotional instability and financial losses.
                  </p>
                  <p>
                    Time and cosmic cycles also influence Vastu. The movement of planets, phases of the moon, and seasonal changes affect the energy dynamics of your home. Vastu remedies and adjustments should be made during auspicious times to maximize their effectiveness. Regular Vastu audits help you stay aligned with changing cosmic energies and maintain the harmony of your living space.
                  </p>
                </div>
              </motion.section>
            )}
            {activeTab === 'Principles' && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Key Principles and Concepts</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="font-bold text-black text-lg mb-3">The Five Elements</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• Earth (Prithvi): Foundation, stability, and material wealth</li>
                      <li>• Water (Jal): Emotions, flow, and financial prosperity</li>
                      <li>• Fire (Agni): Energy, passion, and transformation</li>
                      <li>• Air (Vayu): Movement, communication, and relationships</li>
                      <li>• Space (Akash): Expansion, consciousness, and spiritual growth</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="font-bold text-black text-lg mb-3">The Eight Directions</h3>
                    <ul className="text-gray-700 space-y-2">
                      <li>• North: Wealth and career (Kuber)</li>
                      <li>• Northeast: Knowledge and spirituality (Ishanya)</li>
                      <li>• East: Health and family (Indra)</li>
                      <li>• Southeast: Fire and energy (Agneya)</li>
                      <li>• South: Fame and recognition (Yama)</li>
                      <li>• Southwest: Stability and relationships (Nairutya)</li>
                      <li>• West: Creativity and children (Varuna)</li>
                      <li>• Northwest: Travel and communication (Vayavya)</li>
                    </ul>
                  </div>
                </div>
              </motion.section>
            )}
            {activeTab === 'Remedies' && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Vastu Remedies and Solutions</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="font-bold text-green-900 text-lg mb-3">Structural Remedies</h3>
                    <ul className="text-green-800 space-y-2">
                      <li>• Installing mirrors to redirect negative energy</li>
                      <li>• Using crystals and gemstones for energy balance</li>
                      <li>• Placing wind chimes for positive vibrations</li>
                      <li>• Using salt lamps for purification</li>
                      <li>• Installing proper lighting in dark corners</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="font-bold text-blue-900 text-lg mb-3">Color and Material Remedies</h3>
                    <ul className="text-blue-800 space-y-2">
                      <li>• Using specific colors for different directions</li>
                      <li>• Choosing appropriate materials for construction</li>
                      <li>• Placing plants and natural elements</li>
                      <li>• Using sacred symbols and yantras</li>
                      <li>• Maintaining cleanliness and organization</li>
                    </ul>
                  </div>
                </div>
              </motion.section>
            )}
            {activeTab === 'FAQs' && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {[
                    ['What is the best direction for the main entrance?', 'The main entrance should ideally face North, East, or Northeast as these directions bring positive energy, prosperity, and good health to the family.'],
                    ['How can I improve the energy of my bedroom?', 'Place your bed with the head towards South or East, avoid sleeping under beams, use calming colors, and ensure proper ventilation for positive energy flow.'],
                    ['Which direction is best for the kitchen?', 'The kitchen should face Southeast (Agneya direction) as it represents fire element and brings prosperity, health, and harmony to family relationships.'],
                    ['Can Vastu remedies work in rented apartments?', 'Yes, many Vastu remedies like using crystals, mirrors, plants, and proper furniture placement can be implemented in rented spaces without structural changes.'],
                  ].map(([q, a]) => (
                    <div key={q} className="border-b border-gray-200 pb-6">
                      <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center"><HelpCircle className="w-5 h-5 mr-2 text-indigo-400" />{q}</h3>
                      <p className="text-gray-700">{a}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
            <CTASection />
            
            {/* Next Blog Section */}
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Continue Your Astrological Journey</h2>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 hover:shadow-lg transition-all cursor-pointer">
                <Link href="/blog/gemstones-and-their-powers" className="block">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-purple-100">
                      <Image src="/images/gemstones.jpg" alt="Gemstones" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-purple-600 font-medium mb-1">Next in Series</p>
                      <h3 className="text-xl font-bold text-black mb-2">Gemstones and Their Powers</h3>
                      <p className="text-gray-700 text-sm mb-3">Discover the mystical properties of gemstones and how they can enhance your life through their planetary connections.</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>12 April, 2024</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>6 min read</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </section>
            
            {/* Resources Section */}
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Additional Resources</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Vastu Consultation',
                    description: 'Get personalized Vastu guidance for your home and office spaces.',
                    link: '/services/vastu-consultation',
                    icon: '🏠'
                  },
                  {
                    title: 'Daily Horoscope',
                    description: 'Get your daily horoscope based on Vedic astrology principles.',
                    link: '/daily-horoscope',
                    icon: '🌟'
                  },
                  {
                    title: 'Astrology Services',
                    description: 'Book a consultation with our expert Vedic astrologers.',
                    link: '/services/astrology',
                    icon: '🔮'
                  },
                  {
                    title: 'Astrology Courses',
                    description: 'Learn Vedic astrology and Vastu through our comprehensive courses.',
                    link: '/courses',
                    icon: '📚'
                  }
                ].map((resource) => (
                  <Link key={resource.title} href={resource.link} className="block bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{resource.icon}</div>
                      <div>
                        <h3 className="font-bold text-black text-lg mb-2">{resource.title}</h3>
                        <p className="text-gray-700 text-sm">{resource.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Author Info */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-black text-lg mb-4">About the Author</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <Image src="/images/astrologer.jpg" alt="Vastu Expert" width={64} height={64} className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-black">Dr. Narendra Kumar</p>
                    <p className="text-gray-600 text-sm">Expert Vastu Consultant</p>
                    <p className="text-gray-600 text-sm">20+ years of experience</p>
                  </div>
                </div>
              </div>
              
              {/* Related Topics */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-black text-lg mb-4">Related Topics</h3>
                <div className="space-y-3">
                  <Link href="/blog/understanding-vedic-astrology" className="block text-indigo-600 hover:text-indigo-800 transition-colors">
                    Understanding Vedic Astrology
                  </Link>
                  <Link href="/blog/gemstones-and-their-powers" className="block text-indigo-600 hover:text-indigo-800 transition-colors">
                    Gemstones and Their Powers
                  </Link>
                  <Link href="/blog/astrology-remedies-for-life" className="block text-indigo-600 hover:text-indigo-800 transition-colors">
                    Astrology Remedies for Life
                  </Link>
                  <Link href="/blog/numerology-basics" className="block text-indigo-600 hover:text-indigo-800 transition-colors">
                    Numerology Basics
                  </Link>
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="font-bold text-black text-lg mb-3">Stay Updated</h3>
                <p className="text-gray-700 text-sm mb-4">Get the latest insights on Vastu Shastra and cosmic wisdom.</p>
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
