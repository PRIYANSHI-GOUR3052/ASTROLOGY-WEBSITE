import { Star, Quote } from 'lucide-react';
import Link from 'next/link';

export function AboutSummary() {
  return (
    <section className="bg-white rounded-2xl shadow p-6 border border-indigo-100 mb-8">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4 font-serif">Our Journey</h2>
      <div className="mb-6 text-gray-700 space-y-4 text-base">
        <p>Nakshatra Gyaan was founded in 2002 with a vision to make ancient astrological wisdom accessible and practical for modern lives. Over the years, we have helped thousands discover their true potential, overcome challenges, and find clarity on their life path.</p>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <h3 className="font-bold text-blue-900 text-base mb-2 flex items-center">
            <Star className="w-4 h-4 mr-2" />
            Our Philosophy
          </h3>
          <p className="text-blue-800">We believe every individual has a unique cosmic blueprint. Our mission is to help you understand and harness the power of your celestial connections for a more fulfilling life. We blend Vedic and modern astrology, spiritual counseling, and practical remedies for holistic growth.</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
          <span className="text-orange-700 font-bold">Milestone:</span> <span className="text-black font-semibold">In 2015, we launched our online platform, reaching seekers in over 30 countries and building a global community of astrology enthusiasts.</span>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-4 rounded-lg">
          <span className="text-green-700 font-bold">Values:</span> <span className="text-black font-semibold">Integrity, compassion, and empowerment are at the heart of everything we do. We are committed to ethical guidance and lifelong learning.</span>
        </div>
      </div>
      <div className="bg-indigo-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-2">Quick Facts</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>20+ years of astrological guidance</li>
          <li>10,000+ consultations delivered</li>
          <li>500+ workshops and courses</li>
          <li>Global community: 50,000+ members</li>
          <li>Personalized remedies and solutions</li>
          <li>Ethical, confidential, and compassionate service</li>
        </ul>
      </div>
      <div className="bg-indigo-50 rounded-lg p-4">
        <h3 className="text-lg font-bold text-indigo-900 mb-2">Recommended Resources</h3>
        <ul className="space-y-2">
          <li><Link href="/blog/understanding-your-birth-chart" className="text-indigo-700 hover:underline flex items-center"><span className="text-indigo-500 mr-2">→</span>Understanding Your Birth Chart</Link></li>
          <li><Link href="/blog/gemstones-and-their-powers" className="text-indigo-700 hover:underline flex items-center"><span className="text-indigo-500 mr-2">→</span>Gemstones and Their Powers</Link></li>
          <li><Link href="/blog/numerology-basics" className="text-indigo-700 hover:underline flex items-center"><span className="text-indigo-500 mr-2">→</span>Numerology Basics</Link></li>
          <li><Link href="/blog/the-influence-of-planets" className="text-indigo-700 hover:underline flex items-center"><span className="text-indigo-500 mr-2">→</span>The Influence of Planets</Link></li>
        </ul>
      </div>
    </section>
  );
} 