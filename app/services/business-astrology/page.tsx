"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { FaBuilding, FaHandshake, FaChartLine, FaShieldAlt, FaLightbulb, FaGem } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DrNarendraProfile } from '@/app/components/DrNarendraProfile';
import { Statistics } from '@/app/components/Statistics';
import { ContactForm } from '@/app/components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs', 'Purchase'];

const benefits = [
  {
    icon: <FaBuilding className="text-orange-400 w-8 h-8 mb-2" />, title: 'Auspicious Launch Timing', desc: 'Determine the most powerful astrological muhurta (timing) to launch your business for maximum success.'
  },
  {
    icon: <FaHandshake className="text-blue-400 w-8 h-8 mb-2" />, title: 'Partnership Compatibility', desc: 'Analyze the charts of business partners to ensure synergy, trust, and long-term profitable collaboration.'
  },
  {
    icon: <FaChartLine className="text-green-400 w-8 h-8 mb-2" />, title: 'Financial Growth Strategies', desc: 'Identify planetary influences on your finances and get remedies to attract wealth and abundance.'
  },
  {
    icon: <FaShieldAlt className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Risk Assessment', desc: 'Foresee potential challenges, market downturns, or internal conflicts and receive guidance to mitigate risks.'
  },
  {
    icon: <FaLightbulb className="text-yellow-400 w-8 h-8 mb-2" />, title: 'Business Name & Branding', desc: 'Use numerology and astrology to select a brand name that vibrates with success and attracts customers.'
  },
  {
    icon: <FaGem className="text-purple-400 w-8 h-8 mb-2" />, title: 'Personalized Success Remedies', desc: 'Receive tailored mantras, yantras, and gemstone recommendations to energize your business ventures.'
  },
];

const faqs = [
  {
    q: 'What is Business Astrology?',
    a: 'Business Astrology applies the principles of Vedic astrology to the world of commerce. It involves analyzing the founder\'s birth chart and the business\'s "birth" (launch date) to guide strategic decisions, forecast challenges, and maximize success.'
  },
  {
    q: 'How can astrology help my business?',
    a: 'It provides a strategic advantage by helping you align your business actions with favorable cosmic energies. This includes choosing the right time for key decisions, understanding partnership dynamics, and mitigating potential risks before they arise.'
  },
  {
    q: 'Is this only for new businesses?',
    a: 'No, it is valuable for both new and established businesses. For startups, we guide on launch timing and naming. For existing businesses, we provide insights for expansion, overcoming stagnation, and navigating challenging periods.'
  },
  {
    q: 'Can you help with choosing a business partner?',
    a: 'Yes, partnership compatibility is a key area. By comparing the horoscopes of potential partners, we can assess their complementary strengths, potential for conflict, and overall likelihood of a successful and harmonious venture.'
  },
  {
    q: 'What information is needed for a consultation?',
    a: 'We primarily need the date, time, and place of birth of the business owner(s). If the business is already established, the date and time of its official registration or launch are also very helpful.'
  },
];

export default function BusinessAstrologyPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-orange-50 to-white font-sans">
      <div className="container mx-auto pt-8 px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fff5e6] via-[#f3e8ff] to-[#fff0f5] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#fff5e6]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Business Astrology</h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-3xl" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Navigate the corporate cosmos with divine insight. Unlock your business's true potential and align your strategy with the stars for unparalleled success.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors font-sans ${activeTab === tab ? 'border-orange-500 text-orange-600 font-bold' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif', textAlign: 'justify' }}>
            <p><span className="font-bold text-orange-900">Business Astrology</span> is an invaluable strategic tool that applies the timeless wisdom of Vedic astrology to the modern marketplace. It recognizes that a business is a living entity with its own destiny, deeply connected to the cosmic energies of its founder. By analyzing the founder's birth chart alongside the business's launch chart (muhurta), we can unlock a roadmap to success that transcends conventional business plans.</p>
            <p>Every entrepreneur dreams of success, but the path is often filled with uncertainty. Business Astrology provides clarity by illuminating the most favorable times (muhurta) for critical actions like launching a company, signing a major deal, or releasing a new product. It helps in selecting a business name and brand identity that is not only catchy but also numerologically and astrologically aligned for prosperity. Furthermore, it offers profound insights into partnership compatibility, ensuring that your business relationships are built on a foundation of trust and synergistic energy.</p>
            <p>Our expert analysis delves into key houses in your chart—the 10th house of career, the 11th house of gains, the 2nd house of wealth, and the 7th house of partnerships. We examine the strength of planets like Jupiter (for expansion), Mercury (for commerce), and Saturn (for longevity) to create a holistic strategy. This is not about leaving your success to fate; it is about making informed, divinely-guided decisions to steer your venture towards its highest potential, turning cosmic challenges into powerful opportunities for growth.</p>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
              <span className="text-orange-600 font-medium">Key Takeaway:</span> Align your entrepreneurial journey with celestial wisdom to build a resilient, prosperous, and purposeful business.
            </div>
          </motion.div>
        )}
        {activeTab === 'Benefits' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-orange-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Business Astrology</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/70 backdrop-blur-md shadow-lg p-8 flex flex-col items-center border border-orange-100 hover:scale-105 transition-transform duration-200"
                  style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
                >
                  {benefit.icon}
                  <h3 className="font-bold text-lg mb-2 text-orange-900 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
                  <p className="text-gray-700 text-center text-base">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'FAQs' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-orange-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq, idx) => (
                <div key={idx}>
                  <div className="flex items-center mb-2">
                    <span className="text-orange-600 mr-2 text-xl">&#x3f;</span>
                    <span className="font-bold text-lg text-orange-900" style={{ fontFamily: 'Playfair Display, serif' }}>{faq.q}</span>
                  </div>
                  <p className="text-black text-justify pl-8" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'Purchase' && (
          <section className="mb-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#fff5e6] p-10 shadow-xl border border-orange-100 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-orange-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Business Astrology Session</h2>
              <p className="text-lg text-center mb-6 text-black" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                Ready to elevate your business strategy? Book a personalized session for powerful astrological insights.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-orange-900 block mb-2 font-semibold">Name</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/80 text-orange-900 border border-orange-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-orange-900 block mb-2 font-semibold">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/80 text-orange-900 border border-orange-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-orange-900 block mb-2 font-semibold">Phone Number</label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-white/80 text-orange-900 border border-orange-200 rounded-lg px-4 py-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="text-orange-900 block mb-2 font-semibold">Your Message or Specific Questions</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/80 text-orange-900 border border-orange-200 rounded-lg px-4 py-2 w-full h-32"
                    placeholder="Include your date/time/place of birth, and your business name or industry if applicable."
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-orange-600 text-white hover:bg-orange-700 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  Book Consultation
                </Button>
              </form>
            </div>
          </section>
        )}

        <div className="mt-20 space-y-20">
          <DrNarendraProfile />
          <Statistics />
        </div>

        <div className="mt-20">
          <ContactForm />
        </div>
      </div>
    </div>
  )
} 