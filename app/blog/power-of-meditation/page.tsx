'use client'

import { useState, useEffect } from 'react';
import { User, Calendar, Heart, BookOpen, HelpCircle, Sparkles, Moon } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import Image from 'next/image';
import { CTASection } from '../../components/CTASection';
import { motion } from 'framer-motion';

const post = blogPosts['power-of-meditation'];
const tabs = ['Overview', 'Techniques', 'Benefits', 'FAQs'];

export default function PowerOfMeditationPage() {
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
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>The Power of Meditation</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-3xl leading-relaxed">Discover the ancient practice that brings peace to mind and body. Learn how meditation can transform your life, enhance your spiritual journey, and unlock your inner potential.</p>
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
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-6 mb-8 rounded-lg shadow-sm">
              <p className="text-gray-700 text-lg leading-relaxed">
                <span className="text-indigo-600 font-bold text-xl">Key Takeaway:</span> Meditation is not about emptying your mind, but about becoming aware of your thoughts and finding inner peace. Even 10 minutes of daily practice can transform your mental clarity, emotional balance, and spiritual connection.
              </p>
            </motion.div>
            {/* Hero Image */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image src="/images/astrology.svg" alt={post.title.en} fill className="object-cover" />
            </motion.div>
            {/* Intro */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6">
              <p className="text-xl leading-relaxed">
                {post.content.en.split('\n')[0]}
              </p>
              <p className="text-lg leading-relaxed">
                <span className="font-bold text-indigo-700 text-xl">What is Meditation?</span> Meditation is an ancient spiritual practice that has been used for thousands of years to cultivate inner peace, mental clarity, and spiritual awareness. It's a journey inward—a way to connect with your true self and the divine energy that flows through all of creation.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <h3 className="font-bold text-blue-900 text-lg mb-3 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  The Essence of Meditation
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  At its core, meditation is about presence—being fully aware of the present moment without judgment. It's not about stopping your thoughts, but about observing them with detachment and returning to your center. This practice helps you develop mindfulness, reduce stress, and access higher states of consciousness.
                </p>
              </div>
              <h3 className="font-bold text-black text-2xl mt-8 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Types of Meditation Practices</h3>
              <ul className="list-disc list-inside ml-4 space-y-4 text-lg">
                <li><span className="font-bold text-indigo-700">Mindfulness Meditation:</span> Focus on the present moment, observing thoughts and sensations without judgment. Perfect for beginners and stress reduction.</li>
                <li><span className="font-bold text-indigo-700">Transcendental Meditation:</span> Use of mantras to transcend ordinary thinking and access pure awareness. Promotes deep relaxation and spiritual growth.</li>
                <li><span className="font-bold text-indigo-700">Loving-Kindness Meditation:</span> Cultivate compassion and love for yourself and others. Enhances emotional well-being and relationships.</li>
                <li><span className="font-bold text-indigo-700">Vipassana Meditation:</span> Insight meditation that develops wisdom through self-observation. Helps understand the true nature of reality.</li>
                <li><span className="font-bold text-indigo-700">Zen Meditation:</span> Focus on breath and posture to achieve enlightenment. Emphasizes simplicity and direct experience.</li>
                <li><span className="font-bold text-indigo-700">Chakra Meditation:</span> Focus on energy centers in the body to balance and align your spiritual energy. Enhances vitality and spiritual awareness.</li>
                <li><span className="font-bold text-indigo-700">Mantra Meditation:</span> Repetition of sacred sounds or phrases to focus the mind and connect with divine energy. Deepens spiritual practice.</li>
                <li><span className="font-bold text-indigo-700">Body Scan Meditation:</span> Progressive relaxation through awareness of different body parts. Excellent for stress relief and body awareness.</li>
                <li><span className="font-bold text-indigo-700">Walking Meditation:</span> Mindful walking with awareness of each step and breath. Combines movement with meditation practice.</li>
              </ul>
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
                <span className="text-orange-700 font-bold text-lg">Pro Tip:</span> <span className="text-black font-semibold">Start with just 5-10 minutes daily. Consistency is more important than duration. Choose a technique that resonates with you and practice regularly.</span>
              </div>
            </motion.div>
            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Getting Started with Meditation</h2>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6 mb-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="font-bold text-black text-xl mb-3 flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-indigo-600" />
                      Step 1: Create Your Sacred Space
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">Find a quiet, comfortable place where you won't be disturbed. You can enhance the atmosphere with:</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
                      <li><span className="font-semibold text-indigo-700">Candles or incense:</span> Create a peaceful ambiance</li>
                      <li><span className="font-semibold text-indigo-700">Cushion or chair:</span> Support your posture comfortably</li>
                      <li><span className="font-semibold text-indigo-700">Soft lighting:</span> Gentle, warm light helps relaxation</li>
                      <li><span className="font-semibold text-indigo-700">Sacred objects:</span> Crystals, images, or spiritual symbols</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="font-bold text-black text-xl mb-3 flex items-center">
                      <Moon className="w-5 h-5 mr-2 text-indigo-600" />
                      Step 2: Establish Your Practice
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">Begin with simple techniques and gradually build your practice:</p>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2">
                      <li><span className="font-semibold text-indigo-700">Start small:</span> 5-10 minutes daily is perfect for beginners</li>
                      <li><span className="font-semibold text-indigo-700">Choose a time:</span> Morning or evening, when you're naturally calmer</li>
                      <li><span className="font-semibold text-indigo-700">Be consistent:</span> Daily practice is more effective than occasional long sessions</li>
                      <li><span className="font-semibold text-indigo-700">Be patient:</span> Progress comes gradually, not overnight</li>
                    </ul>
                  </div>
                </motion.div>
                {/* FAQ-style questions */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6 mb-8">
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-black text-xl mb-3 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-indigo-600" />
                      How do I know if I'm meditating correctly?
                    </h3>
                    <p className="text-gray-700 leading-relaxed ml-7">There's no "wrong" way to meditate. If you're sitting quietly and observing your thoughts, you're meditating. The key is consistency and non-judgment. Don't worry about "doing it right"—just show up and practice.</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-black text-xl mb-3 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-indigo-600" />
                      What if I can't stop my thoughts?
                    </h3>
                    <p className="text-gray-700 leading-relaxed ml-7">Thoughts are natural and expected. Don't try to stop them—simply observe them without judgment and gently return your focus to your breath or chosen object. This is the practice of meditation.</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-black text-xl mb-3 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-indigo-600" />
                      How long should I meditate each day?
                    </h3>
                    <p className="text-gray-700 leading-relaxed ml-7">Start with 5-10 minutes daily. As you become comfortable, gradually increase to 20-30 minutes. Quality and consistency matter more than duration. Even 5 minutes of focused practice is beneficial.</p>
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                    <h3 className="font-bold text-black text-xl mb-3 flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-indigo-600" />
                      Can meditation help with anxiety and stress?
                    </h3>
                    <p className="text-gray-700 leading-relaxed ml-7">Absolutely! Meditation is one of the most effective natural remedies for anxiety and stress. It activates the parasympathetic nervous system, reduces cortisol levels, and promotes emotional balance.</p>
                  </div>
                </motion.div>
                {/* Meditation Techniques Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-2xl mb-6" style={{ fontFamily: 'Georgia, serif' }}>Essential Meditation Techniques</h3>
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="grid md:grid-cols-2 gap-6">
                    {[
                      ['Breath Awareness', 'Mindfulness', 'Focus on natural breath rhythm', '/images/astrology.svg', 'bg-gradient-to-br from-blue-50 to-indigo-50'],
                      ['Body Scan', 'Relaxation', 'Progressive body awareness', '/images/astrology.svg', 'bg-gradient-to-br from-green-50 to-emerald-50'],
                      ['Loving-Kindness', 'Compassion', 'Cultivate love and compassion', '/images/astrology.svg', 'bg-gradient-to-br from-pink-50 to-rose-50'],
                      ['Mantra', 'Focus', 'Sacred sound repetition', '/images/astrology.svg', 'bg-gradient-to-br from-purple-50 to-indigo-50'],
                      ['Walking', 'Movement', 'Mindful walking practice', '/images/astrology.svg', 'bg-gradient-to-br from-yellow-50 to-orange-50'],
                      ['Chakra', 'Energy', 'Balance energy centers', '/images/astrology.svg', 'bg-gradient-to-br from-teal-50 to-cyan-50'],
                    ].map(([name, category, description, img, bgClass], i) => (
                      <motion.div key={name as string} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className={`${bgClass} rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all cursor-pointer border border-gray-100`}>
                        <div className="relative w-24 h-24 mb-4">
                          <Image src={img as string} alt={name as string} fill className="object-cover rounded-full border-4 border-white shadow-lg" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>{name}</h4>
                        <p className="text-indigo-700 font-semibold mb-2">{category}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-6 rounded-lg mt-8">
                    <span className="text-indigo-600 font-bold text-lg">Remember:</span> <span className="text-black font-semibold">The best meditation technique is the one you'll practice consistently. Experiment with different methods to find what resonates with you.</span>
                  </div>
                </section>
                {/* Misconceptions Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-2xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>Common Misconceptions About Meditation</h3>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-4 mb-6">
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
                      <p className="text-red-800"><span className="font-bold">Myth:</span> You need to stop all thoughts to meditate properly.</p>
                      <p className="text-red-700 mt-2"><span className="font-semibold">Reality:</span> Thoughts are natural. Meditation is about observing them without judgment, not eliminating them.</p>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                      <p className="text-yellow-800"><span className="font-bold">Myth:</span> You need to sit in lotus position to meditate.</p>
                      <p className="text-yellow-700 mt-2"><span className="font-semibold">Reality:</span> Any comfortable position works—sitting, lying down, or even walking meditation.</p>
                    </div>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
                      <p className="text-blue-800"><span className="font-bold">Myth:</span> Meditation is only for spiritual people.</p>
                      <p className="text-blue-700 mt-2"><span className="font-semibold">Reality:</span> Meditation benefits everyone—it's a practical tool for mental health and well-being.</p>
                    </div>
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
                      <p className="text-green-800"><span className="font-bold">Myth:</span> You need hours of practice to see benefits.</p>
                      <p className="text-green-700 mt-2"><span className="font-semibold">Reality:</span> Even 5-10 minutes daily can provide significant benefits for stress reduction and mental clarity.</p>
                    </div>
                  </motion.div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-lg">
                    <span className="text-yellow-700 font-bold text-lg">Did you know?</span> <span className="text-black font-semibold">Scientific studies show that regular meditation can physically change your brain structure, increasing gray matter in areas associated with learning, memory, and emotional regulation.</span>
                  </div>
                </section>
                {/* Case Study Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-2xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>Case Study: Transformation Through Daily Meditation</h3>
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                    <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                      Rajesh, a 35-year-old software engineer, struggled with chronic stress and anxiety. After starting a daily 15-minute mindfulness meditation practice, he noticed significant improvements within three weeks. His stress levels decreased, sleep quality improved, and he developed better emotional regulation. Six months later, he was practicing 30 minutes daily and had discovered a deeper spiritual connection through chakra meditation.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-6">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-indigo-900 mb-2">Key Benefits Experienced:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Reduced stress and anxiety levels</li>
                          <li>Improved sleep quality</li>
                          <li>Better emotional regulation</li>
                          <li>Enhanced spiritual awareness</li>
                        </ul>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-bold text-green-900 mb-2">Practice Evolution:</h4>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                          <li>Started with 15-minute mindfulness</li>
                          <li>Gradually increased to 30 minutes</li>
                          <li>Explored chakra meditation</li>
                          <li>Developed consistent daily routine</li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                </section>
                {/* Table: Meditation Benefits */}
                <div className="overflow-x-auto mb-8">
                  <motion.table initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      <tr>
                        <th className="py-4 px-4 border-b text-left font-bold text-base">Benefit Type</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-base">Physical Benefits</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-base">Mental Benefits</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-base">Spiritual Benefits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Short-term', 'Reduced heart rate, lower blood pressure', 'Decreased stress, improved focus', 'Inner peace, present moment awareness'],
                        ['Medium-term', 'Better sleep, improved immunity', 'Enhanced emotional regulation, clarity', 'Deeper self-awareness, compassion'],
                        ['Long-term', 'Slower aging, better health markers', 'Increased resilience, wisdom', 'Spiritual awakening, enlightenment'],
                      ].map(([period, physical, mental, spiritual], i) => (
                        <tr key={period} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 border-b font-bold text-indigo-700">{period}</td>
                          <td className="py-3 px-4 border-b text-gray-700">{physical}</td>
                          <td className="py-3 px-4 border-b text-gray-700">{mental}</td>
                          <td className="py-3 px-4 border-b text-gray-700">{spiritual}</td>
                        </tr>
                      ))}
                    </tbody>
                  </motion.table>
                </div>
              </section>
            )}
            {activeTab === 'Techniques' && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Advanced Meditation Techniques</h2>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-blue-900 text-xl mb-3">Transcendental Meditation</h3>
                    <p className="text-blue-800 leading-relaxed mb-4">A technique that uses personalized mantras to transcend ordinary thinking and access pure awareness. Requires proper initiation from a qualified teacher.</p>
                    <ul className="list-disc list-inside text-blue-800 space-y-2">
                      <li>Practice for 20 minutes twice daily</li>
                      <li>Use personalized mantra</li>
                      <li>Access deeper states of consciousness</li>
                      <li>Promotes profound relaxation</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                    <h3 className="font-bold text-green-900 text-xl mb-3">Vipassana Meditation</h3>
                    <p className="text-green-800 leading-relaxed mb-4">Insight meditation that develops wisdom through self-observation. Focuses on the impermanent nature of all phenomena.</p>
                    <ul className="list-disc list-inside text-green-800 space-y-2">
                      <li>Observe bodily sensations</li>
                      <li>Develop equanimity</li>
                      <li>Understand true nature of reality</li>
                      <li>Requires dedicated practice</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-purple-900 text-xl mb-3">Zen Meditation (Zazen)</h3>
                    <p className="text-purple-800 leading-relaxed mb-4">A form of seated meditation that emphasizes posture, breath, and direct experience. Focuses on "just sitting" without goal or expectation.</p>
                    <ul className="list-disc list-inside text-purple-800 space-y-2">
                      <li>Emphasize proper posture</li>
                      <li>Focus on breath awareness</li>
                      <li>Practice "just sitting"</li>
                      <li>Develop mindfulness in daily life</li>
                    </ul>
                  </div>
                </motion.div>
              </section>
            )}
            {activeTab === 'Benefits' && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Comprehensive Benefits of Meditation</h2>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-4">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">Regular meditation practice offers benefits across all dimensions of your being—physical, mental, emotional, and spiritual.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      ['Physical Health', 'Reduced stress hormones, improved immunity, better sleep, lower blood pressure'],
                      ['Mental Clarity', 'Enhanced focus, improved memory, better decision-making, reduced mental fog'],
                      ['Emotional Balance', 'Reduced anxiety, better mood regulation, increased compassion, inner peace'],
                      ['Spiritual Growth', 'Deeper self-awareness, connection to higher consciousness, inner wisdom'],
                      ['Relationships', 'Better communication, increased empathy, reduced reactivity, deeper connections'],
                      ['Life Purpose', 'Clarity about goals, alignment with values, meaningful direction'],
                    ].map(([category, benefits], i) => (
                      <motion.div key={category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="bg-white rounded-lg p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                        <h3 className="font-bold text-indigo-700 text-lg mb-2">{category}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{benefits}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </section>
            )}
            {activeTab === 'FAQs' && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-indigo-900 mb-6 border-b pb-2" style={{ fontFamily: 'Georgia, serif' }}>Frequently Asked Questions</h2>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-6">
                  {[
                    ['How long does it take to see benefits from meditation?', 'Many people notice immediate benefits like reduced stress and better sleep within the first week. Deeper benefits like emotional balance and spiritual insights develop over weeks to months of consistent practice.'],
                    ['Can I meditate if I have a busy mind?', 'Absolutely! A busy mind is actually normal and expected. Meditation is about observing your thoughts without judgment, not stopping them. With practice, your mind will naturally become calmer.'],
                    ['What\'s the best time of day to meditate?', 'Morning meditation sets a positive tone for your day, while evening meditation helps you unwind. Choose a time when you\'re naturally calmer and won\'t be interrupted.'],
                    ['Do I need to be religious to meditate?', 'No, meditation is a secular practice that benefits people of all faiths and no faith. While it has spiritual roots, it\'s primarily a tool for mental health and well-being.'],
                    ['Can meditation replace medical treatment?', 'Meditation is a complementary practice that can enhance medical treatment but shouldn\'t replace it. Always consult healthcare professionals for medical conditions.'],
                  ].map(([q, a], i) => (
                    <motion.div key={q} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-indigo-900 mb-3 flex items-center">
                        <HelpCircle className="w-5 h-5 mr-2 text-indigo-600" />
                        {q}
                      </h3>
                      <p className="text-gray-700 leading-relaxed ml-7">{a}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </section>
            )}
            <CTASection />
            
            {/* Next Blog Section */}
            <section className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-black mb-6">Continue Your Spiritual Journey</h2>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100 hover:shadow-lg transition-all cursor-pointer">
                <a href="/blog" className="block">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-emerald-100">
                      <Image src="/images/astrology.svg" alt="Astrology Blog" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-emerald-600 font-medium mb-1">Explore More</p>
                      <h3 className="text-xl font-bold text-black mb-2">Astrology Blog Collection</h3>
                      <p className="text-gray-700 text-sm mb-3">Discover our complete collection of astrology articles, from planetary influences to birth chart analysis and spiritual practices.</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>15 April, 2024</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>Complete Series</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-emerald-600">
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
                    <span className="text-indigo-700 font-medium">Spiritual Guide by</span> <br />
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
              <h3 className="text-lg font-bold text-orange-900 mb-4">Get Weekly Spiritual Insights</h3>
              <p className="text-gray-700 mb-4">Sign up for our newsletter and receive meditation tips, spiritual guidance, and cosmic wisdom every week.</p>
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
              <h3 className="text-lg font-bold text-yellow-900 mb-4">Meditation Myths Debunked</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You need to stop all thoughts (observe them instead)</li>
                <li>Only spiritual people can meditate (benefits everyone)</li>
                <li>You need hours of practice (5-10 minutes works)</li>
                <li>Lotus position is required (any comfortable position)</li>
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
                  ['Numerology Basics', '/blog/numerology-basics'],
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