"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { FaRegLightbulb, FaRegStar, FaRegGem, FaRegSmile, FaRegHeart, FaRegComments, FaRegSun } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DrNarendraProfile } from '@/app/components/DrNarendraProfile';
import { Statistics } from '@/app/components/Statistics';
import { ContactForm } from '@/app/components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs', 'Purchase'];

const benefits = [
  {
    icon: <FaRegLightbulb className="text-blue-400 w-8 h-8 mb-2" />, title: 'Clarity on Career Path', desc: 'Discover your true calling and the most auspicious fields for your growth.'
  },
  {
    icon: <FaRegStar className="text-yellow-400 w-8 h-8 mb-2" />, title: 'Timing of Job Changes', desc: 'Know the best periods for switching jobs, promotions, or business launches.'
  },
  {
    icon: <FaRegSmile className="text-green-400 w-8 h-8 mb-2" />, title: 'Overcoming Obstacles', desc: 'Get remedies and strategies to break through professional stagnation.'
  },
  {
    icon: <FaRegHeart className="text-pink-400 w-8 h-8 mb-2" />, title: 'Workplace Harmony', desc: 'Improve relationships with colleagues, bosses, and teams.'
  },
  {
    icon: <FaRegComments className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Communication Skills', desc: 'Enhance your leadership and communication abilities.'
  },
  {
    icon: <FaRegSun className="text-orange-400 w-8 h-8 mb-2" />, title: 'Material & Spiritual Success', desc: 'Achieve both financial prosperity and inner fulfillment.'
  },
  {
    icon: <FaRegGem className="text-purple-400 w-8 h-8 mb-2" />, title: 'Personalized Remedies', desc: 'Receive mantras, rituals, and astrological solutions tailored to your chart.'
  },
  {
    icon: <FaRegLightbulb className="text-blue-400 w-8 h-8 mb-2" />, title: 'Confidence & Empowerment', desc: 'Step into your power and make bold, conscious career moves.'
  },
];

const faqs = [
  {
    q: 'How can astrology help my career?',
    a: 'Astrology reveals your natural talents, ideal career paths, and the timing of key opportunities. It helps you make informed decisions, avoid pitfalls, and maximize your professional growth.'
  },
  {
    q: 'Can you predict the best time for a job change?',
    a: 'Yes. By analyzing your planetary periods (Dashas) and transits, we can identify the most auspicious windows for job changes, promotions, or business launches.'
  },
  {
    q: 'What if I am facing repeated setbacks at work?',
    a: 'We identify the astrological causes of stagnation or obstacles and provide practical remedies—mantras, rituals, and mindset shifts—to help you break through.'
  },
  {
    q: 'Is this guidance suitable for entrepreneurs?',
    a: 'Absolutely. We offer specialized insights for business owners, including timing for launches, partnership compatibility, and strategies for sustainable growth.'
  },
  {
    q: 'Will my session be confidential?',
    a: 'Yes. All consultations are private and your information is kept strictly confidential.'
  },
  {
    q: 'Can I get remedies for career problems?',
    a: 'Yes. We provide personalized remedies—mantras, gemstones, rituals, and affirmations—based on your unique chart.'
  },
  {
    q: 'Do you offer guidance for students or career starters?',
    a: 'Yes. We help students and young professionals choose the right field, prepare for exams, and plan their career trajectory.'
  },
  {
    q: 'How do I book a session?',
    a: 'Simply click the "Book Your Session" button in the Purchase tab or contact us for a personalized consultation.'
  },
];

export default function CareerGuidancePage() {
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
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-blue-50 to-white font-sans">
      <div className="container mx-auto pt-8 px-4 py-16 relative z-10">
        {/* Glassmorphic Banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#e0f7fa]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Career & Job Guidance</h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-3xl" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Unlock your professional destiny with cosmic clarity. Our Vedic astrologers offer deep, actionable insights for every stage of your career journey.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors font-sans ${activeTab === tab ? 'border-blue-500 text-blue-600 font-bold' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif', textAlign: 'justify' }}>
            <p>In today's fast-paced, hyper-competitive world, choosing and navigating a career path can feel overwhelming. Amidst external expectations and internal doubts, how do you find the work that truly resonates with your soul? At Nakshatra Gyaan, we believe your profession is not just a means of livelihood—it is a sacred expression of your dharma, your higher purpose in this lifetime. Through the ancient science of Vedic astrology, we help you uncover your divine professional blueprint and align it with real-world opportunities and inner fulfillment.</p>
            <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-6" style={{ fontFamily: 'Playfair Display, serif' }}>Why Choose Astrological Career Guidance?</h3>
            <p>Conventional career advice often falls short because it ignores the cosmic design encoded in your birth chart. Your Janma Kundli is a celestial map of your karma, potential, and soul journey. It reveals the ideal environments, industries, and roles where your energy naturally thrives, as well as the karmic challenges that may appear along the way. With the precision of Vedic astrology, combined with insights from modern psychology and spiritual counseling, we offer a comprehensive roadmap that answers questions your heart has been asking all along:</p>
            <ul className="list-disc ml-8">
              <li>What career path is truly aligned with my natural gifts and spiritual essence?</li>
              <li>Am I destined to lead, serve, heal, teach, innovate, or create?</li>
              <li>When is the ideal time to change jobs, start a new venture, or take a leap of faith?</li>
              <li>Why do I keep facing the same challenges in the workplace—and how can I overcome them?</li>
              <li>Can I achieve material success while staying spiritually grounded and emotionally balanced?</li>
            </ul>
            <h3 className="text-2xl font-bold text-blue-800 mb-2 mt-6" style={{ fontFamily: 'Playfair Display, serif' }}>What is Career & Job Guidance?</h3>
            <p>Career & Job Guidance at Nakshatra Gyaan is not merely a consultation—it is a sacred decoding of your professional destiny. In a world driven by competition, uncertainty, and ever-evolving opportunities, we offer a calm, cosmic perspective that reveals what your soul truly seeks in the realm of work, purpose, and prosperity. Our sessions are designed to guide you toward a career that doesn't just sustain you—but fulfills, inspires, and elevates you.</p>
            <p>What sets our service apart is its deeply integrative approach—a blend of classical Vedic astrology, karmic insight, and modern career psychology. We begin by analyzing your birth chart, which acts as a divine blueprint of your professional inclinations, talents, lessons, and dharma (life purpose). We examine planetary placements, your 10th and 6th houses, nakshatras, dashas (planetary periods), and current transits to understand not just what you can do—but what you are destined to thrive in.</p>
            <p>Our mission is not to fit you into a box, but to help you break free from limitations—be it stagnation, self-doubt, job dissatisfaction, or confusion about your path. Whether you are a student trying to choose a stream, a young professional navigating early career choices, a seasoned employee facing burnout, or an entrepreneur looking for divine timing to launch a business—our guidance meets you where you are and helps you realign.</p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
              <span className="text-blue-600 font-medium">Key Takeaway:</span> <span className="font-bold text-blue-900">Career Guidance</span> provides a cosmic roadmap to align your professional life with your soul's true purpose.
            </div>
          </motion.div>
        )}
        {activeTab === 'Benefits' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Career & Job Guidance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/70 backdrop-blur-md shadow-lg p-8 flex flex-col items-center border border-blue-100 hover:scale-105 transition-transform duration-200"
                  style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
                >
                  {benefit.icon}
                  <h3 className="font-bold text-lg mb-2 text-blue-900" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
                  <p className="text-gray-700 text-center text-base">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'FAQs' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq, idx) => (
                <div key={idx}>
                  <div className="flex items-center mb-2">
                    <span className="text-blue-600 mr-2 text-xl">&#x3f;</span>
                    <span className="font-bold text-lg text-blue-900" style={{ fontFamily: 'Playfair Display, serif' }}>{faq.q}</span>
                  </div>
                  <p className="text-black text-justify pl-8" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'Purchase' && (
          <section className="mb-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#e0f2fe] p-10 shadow-xl border border-blue-100 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Career & Job Guidance Session</h2>
              <p className="text-lg text-center mb-6 text-black" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                Ready to unlock your professional destiny? Book a personalized session with our expert astrologers and take the next step toward success.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-blue-900 block mb-2 font-semibold">Name</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/80 text-blue-900 border border-blue-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-blue-900 block mb-2 font-semibold">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/80 text-blue-900 border border-blue-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-blue-900 block mb-2 font-semibold">Phone Number</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white/80 text-blue-900 border border-blue-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-blue-900 block mb-2 font-semibold">Date of Birth</label>
                    <input 
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="bg-white/80 text-blue-900 border border-blue-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-blue-900 block mb-2 font-semibold">Your Message or Specific Questions</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/80 text-blue-900 border border-blue-200 rounded-lg px-4 py-2 w-full h-32"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-blue-700 text-white hover:bg-blue-800 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
                >
                  Book Consultation
                </Button>
              </form>
            </div>
          </section>
        )}

        {/* Dr. Narendra Profile & Statistics */}
        <div className="mt-20 space-y-20">
          <DrNarendraProfile />
          <Statistics />
        </div>

        {/* Contact Form CTA */}
        <div className="mt-20">
          <ContactForm />
        </div>
      </div>
    </div>
  )
} 