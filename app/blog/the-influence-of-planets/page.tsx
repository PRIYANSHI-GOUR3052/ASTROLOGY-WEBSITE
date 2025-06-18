'use client'

import { useState, useEffect } from 'react';
import { User, Calendar, Star, BookOpen, HelpCircle } from 'lucide-react';
import { blogPosts } from '../../data/blogPosts';
import Image from 'next/image';
import { CTASection } from '../../components/CTASection';
import { motion } from 'framer-motion';

const post = blogPosts['influence-of-planets'];
const tabs = ['Overview', 'Effects', 'Remedies', 'FAQs'];

export default function InfluenceOfPlanetsPage() {
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
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 leading-tight">
                {post.title.en}
              </h1>
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1"><User className="w-4 h-4" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {post.date}</span>
                <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {post.category}</span>
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
            </div>
            {/* Key Takeaway */}
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-8 rounded-lg">
              <p className="text-gray-700">
                <span className="text-indigo-600 font-medium">Key Takeaway:</span> The nine planets (Navagraha) influence every aspect of our lives—understanding their effects can help you align with cosmic energies and find remedies for challenges.
              </p>
            </div>
            {/* Hero Image */}
            <div className="w-full h-64 md:h-96 relative mb-8 rounded-lg overflow-hidden shadow-lg">
              <Image src={post.imageUrl} alt={post.title.en} fill className="object-cover" />
            </div>
            {/* Intro */}
            <div className="mb-8 text-lg leading-relaxed text-gray-700 space-y-6">
              <p>
                Discover how celestial bodies affect our daily lives and spiritual journey. The positions and movements of the planets, Sun, and Moon at the time of your birth create a unique cosmic blueprint—your birth chart. This chart reveals your strengths, challenges, and the lessons you are meant to learn in this lifetime.
              </p>
              <p>
                <span className="font-semibold text-indigo-700">Daily Influences:</span> Each day, planetary transits activate different areas of your life. For example, a strong Moon transit may heighten your emotions, while a favorable Jupiter aspect can bring opportunities for growth and wisdom. By understanding these influences, you can make better decisions and align your actions with the cosmic flow.
              </p>
              <ul className="list-disc list-inside ml-4 space-y-4">
                <li><span className="font-semibold text-indigo-700">Relationships:</span> Venus and Mars play a key role in love, attraction, and harmony. Their positions can indicate periods of romance or the need for healing in relationships. When Venus is strong, you may experience deep affection, artistic inspiration, and harmonious partnerships. Mars brings passion and drive, but if afflicted, can cause conflicts or impulsive actions. Astrological analysis can reveal the best times for love, marriage, or resolving relationship issues.</li>
                <li><span className="font-semibold text-indigo-700">Career & Ambitions:</span> The Sun, Saturn, and Mercury influence your ambitions, discipline, and communication. The Sun represents your core purpose and leadership qualities, Saturn brings structure, perseverance, and lessons through challenges, while Mercury governs intellect, adaptability, and business acumen. Favorable alignments can signal promotions, new ventures, or recognition, while challenging periods may require patience, skill-building, or strategic planning.</li>
                <li><span className="font-semibold text-indigo-700">Health & Well-being:</span> The Moon and ascendant sign affect your physical and emotional health. The Moon governs your mind, moods, and habits, while the ascendant and its ruler influence your body type and vitality. Planetary afflictions may point to areas needing extra care, such as stress management, dietary changes, or spiritual remedies. Regularly tracking lunar cycles and planetary transits can help you maintain balance and well-being.</li>
                <li><span className="font-semibold text-indigo-700">Spiritual Growth:</span> Jupiter and Ketu are associated with wisdom, detachment, and spiritual evolution. Jupiter inspires learning, generosity, and faith, while Ketu encourages letting go of material attachments and seeking higher truths. Their influence can inspire meditation, study of sacred texts, and transformative spiritual practices. Times of strong Jupiter or Ketu influence are ideal for retreats, pilgrimages, or deepening your spiritual path.</li>
                <li><span className="font-semibold text-indigo-700">Financial Prosperity:</span> Jupiter and Venus can bring abundance, wealth, and opportunities for financial growth when well-placed in your chart. Jupiter's blessings may manifest as luck, expansion, or wise investments, while Venus attracts luxury, comfort, and creative income. Challenging placements may require prudent budgeting, charitable giving, or seeking expert advice to improve your financial situation.</li>
                <li><span className="font-semibold text-indigo-700">Family & Home:</span> The Moon and fourth house planets influence your sense of belonging, emotional security, and harmony at home. A strong Moon fosters nurturing relationships, a peaceful home environment, and supportive family ties. Malefic influences may bring misunderstandings or instability, but remedies such as family rituals, home blessings, or fostering open communication can restore harmony.</li>
                <li><span className="font-semibold text-indigo-700">Personal Transformation:</span> Rahu and Ketu drive major life changes, spiritual awakenings, and the breaking of old patterns for soul growth. Rahu pushes you toward new experiences, ambitions, and sometimes obsessions, while Ketu helps you release what no longer serves you. Their cycles often coincide with turning points, breakthroughs, or the need to embrace change and trust your inner guidance.</li>
              </ul>
              <p>
                <span className="font-semibold text-indigo-700">Spiritual Journey:</span> Astrology is not just about prediction—it's a tool for self-awareness and spiritual growth. By tuning into the rhythms of the cosmos, you can cultivate mindfulness, embrace change, and walk your path with greater confidence and peace.
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <span className="text-indigo-600 font-medium">Tip:</span> Keep a daily journal of your moods, experiences, and planetary transits. Over time, you'll notice patterns that help you harness positive energies and navigate challenges with wisdom.
              </div>
            </div>
            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">What Are the Navagraha?</h2>
                <ul className="space-y-3 text-gray-700 mb-8">
                  <li><span className="text-indigo-500 mr-2">•</span>The Navagraha are the nine major celestial bodies in Vedic astrology: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Each planet governs specific aspects of life, personality, and destiny.</li>
                  <li><span className="text-indigo-500 mr-2">•</span>Planetary periods (Dasha) and transits (Gochar) shape your experiences and challenges.</li>
                </ul>
                {/* Additional FAQ-style questions */}
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">How do planets influence my daily life?</h3>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>Planetary transits can affect your mood, energy, and opportunities each day.</li>
                      <li>Major events often coincide with significant planetary movements in your chart.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">What is a Dasha period?</h3>
                    <p className="text-gray-700 ml-2">A Dasha is a planetary period that highlights the influence of a specific planet over several years, shaping your experiences and growth during that time.</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Why are remedies recommended in astrology?</h3>
                    <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                      <li>Remedies help balance challenging planetary influences.</li>
                      <li>They can include mantras, donations, gemstones, and rituals to promote harmony and well-being.</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">Can astrology help with relationships and career?</h3>
                    <p className="text-gray-700 ml-2">Yes! Astrology provides insights into compatibility, timing for important decisions, and strategies for personal and professional growth.</p>
                  </div>
                </div>
                {/* New: Planetary Yogas Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">What are Planetary Yogas?</h3>
                  <p className="text-gray-700 mb-4">Yogas are special planetary combinations in your birth chart that can bring unique blessings or challenges. Some famous yogas include:</p>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1 mb-4">
                    <li><span className="font-semibold text-indigo-700">Gajakesari Yoga:</span> Formed by Jupiter and Moon, brings wisdom, respect, and prosperity.</li>
                    <li><span className="font-semibold text-indigo-700">Budh-Aditya Yoga:</span> Sun and Mercury together, enhances intellect and communication.</li>
                    <li><span className="font-semibold text-indigo-700">Chandra-Mangal Yoga:</span> Moon and Mars, gives financial growth and determination.</li>
                    <li><span className="font-semibold text-indigo-700">Vipreet Raj Yoga:</span> Planets in certain houses turn challenges into success.</li>
                  </ul>
                  <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg mb-4">
                    <span className="text-indigo-600 font-medium">Tip:</span> <span className="text-black font-medium">Not all yogas are active at all times. Their effects depend on planetary periods (Dasha) and transits.</span>
                  </div>
                </section>
                {/* New: Common Misconceptions Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Common Misconceptions about Planets in Astrology</h3>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-2 mb-4">
                    <li>Planets do not cause events directly—they reflect cosmic patterns and tendencies.</li>
                    <li>Retrograde planets are not always negative; they can bring introspection and growth.</li>
                    <li>Everyone has both strengths and challenges in their chart—no chart is "bad" or "cursed".</li>
                    <li>Astrology is a tool for guidance, not fatalism. Your actions and choices matter.</li>
                  </ul>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                    <span className="text-yellow-700 font-medium">Did you know?</span> Even challenging planetary placements can be transformed through awareness, <span className="text-black font-medium">remedies, and positive action.</span>
                  </div>
                </section>
                {/* New: Case Study Section */}
                <section className="mb-12">
                  <h3 className="font-bold text-black text-xl mb-4">Case Study: How Planetary Transits Changed a Life</h3>
                  <p className="text-gray-700 mb-4">Priya, a 32-year-old teacher, faced career stagnation and emotional stress. Analyzing her chart revealed a challenging Saturn transit and a favorable Jupiter Dasha approaching. Remedies included chanting, charity, and meditation. Within a year, she received a promotion and found greater peace of mind.</p>
                  <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
                    <li><span className="font-semibold text-green-700">Lesson:</span> Understanding your chart helps you prepare for challenges and seize opportunities.</li>
                    <li><span className="font-semibold text-green-700">Remedy:</span> Personalized solutions can make a real difference in your life journey.</li>
                  </ul>
                </section>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Planet</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Significance</th>
                        <th className="py-4 px-4 border-b text-left font-bold text-black text-base">Remedy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Sun', 'Soul, authority, health', 'Surya Namaskar, offer water to Sun'],
                        ['Moon', 'Mind, emotions, mother', 'Chant Chandra mantra, wear pearl'],
                        ['Mars', 'Energy, courage, siblings', 'Donate red lentils, Hanuman worship'],
                        ['Mercury', 'Intellect, speech, business', 'Chant Budh mantra, wear emerald'],
                        ['Jupiter', 'Wisdom, teachers, children', 'Donate yellow sweets, wear yellow sapphire'],
                        ['Venus', 'Love, beauty, luxury', 'Chant Shukra mantra, wear diamond'],
                        ['Saturn', 'Karma, discipline, obstacles', 'Shani puja, donate black sesame'],
                        ['Rahu', 'Desires, illusions, foreign', 'Chant Rahu mantra, donate blue cloth'],
                        ['Ketu', 'Spirituality, detachment', 'Chant Ketu mantra, feed stray dogs'],
                      ].map(([planet, significance, remedy], i) => (
                        <tr key={planet} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                          <td className="py-3 px-4 border-b font-medium text-black">{planet}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{significance}</td>
                          <td className="py-3 px-4 border-b font-medium text-black">{remedy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
            {activeTab === 'Effects' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">How Planets Affect Your Life</h2>
                <ul className="space-y-3 text-gray-700">
                  <li><span className="text-indigo-500 mr-2">✓</span>Planetary positions at birth shape your personality, strengths, and challenges.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Transits trigger important life events—marriage, career, health, etc.</li>
                  <li><span className="text-indigo-500 mr-2">✓</span>Understanding your Dasha helps you prepare for opportunities and obstacles.</li>
                </ul>
              </section>
            )}
            {activeTab === 'Remedies' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Astrological Remedies</h2>
                <ul className="space-y-3 text-gray-700">
                  <li><span className="text-green-500 mr-2">•</span>Chanting mantras for afflicted planets</li>
                  <li><span className="text-green-500 mr-2">•</span>Wearing gemstones as per astrological advice</li>
                  <li><span className="text-green-500 mr-2">•</span>Charity and donations on specific days</li>
                  <li><span className="text-green-500 mr-2">•</span>Fasting and puja for planetary peace</li>
                </ul>
              </section>
            )}
            {activeTab === 'FAQs' && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-2">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {[
                    ['How do I know which planet is strong or weak in my chart?', 'Consult your birth chart (Janam Kundli) with an astrologer for detailed analysis.'],
                    ['Can remedies really change my destiny?', 'Remedies help reduce negative effects and enhance positive ones, but karma and effort are also important.'],
                    ['What is Dasha and why is it important?', 'Dasha is the planetary period system that influences life events and timing.'],
                    ['Are gemstones safe for everyone?', 'Only wear gemstones after consulting a qualified astrologer, as wrong stones can have adverse effects.'],
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
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 hover:shadow-lg transition-all cursor-pointer">
                <a href="/blog/understanding-vedic-astrology" className="block">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-indigo-100">
                      <Image src="/images/astrology.svg" alt="Vedic Astrology" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-indigo-600 font-medium mb-1">Next in Series</p>
                      <h3 className="text-xl font-bold text-black mb-2">Understanding Vedic Astrology</h3>
                      <p className="text-gray-700 text-sm mb-3">Learn the fundamentals of Vedic astrology and its impact on life decisions. Discover how ancient wisdom can guide your modern choices.</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>15 April, 2024</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>8 min read</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-indigo-600">
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
            <div className="bg-indigo-50 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-indigo-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-indigo-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="text-indigo-700 font-medium">Astrological Review by</span> <br />
                    <span className="font-semibold text-indigo-900">{post.author}</span>
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Updated on {post.date}</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Newsletter */}
            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-green-900 mb-4">Get Weekly Astrology Insights</h3>
              <p className="text-gray-700 mb-4">Sign up for our newsletter and receive cosmic tips, remedies, and predictions every week.</p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
            {/* Common Myths */}
            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-yellow-900 mb-4">Common Astrology Myths</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>All bad events are due to planets (karma matters too)</li>
                <li>Gemstones work for everyone (consult an expert)</li>
                <li>Astrology is only prediction (it's also guidance)</li>
                <li>Remedies are instant (patience is key)</li>
              </ul>
            </div>
            {/* Resources */}
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Recommended Resources</h3>
              <ul className="space-y-3">
                {[
                  ['Understanding Your Birth Chart', '/blog/understanding-your-birth-chart'],
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