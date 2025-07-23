"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { FaHeartbeat, FaLeaf, FaBrain, FaShieldAlt, FaRegSun, FaRegGem, FaAppleAlt, FaSpa } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DrNarendraProfile } from '@/app/components/DrNarendraProfile';
import { Statistics } from '@/app/components/Statistics';
import { ContactForm } from '@/app/components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs', 'Purchase'];

const benefits = [
  {
    icon: <FaHeartbeat className="text-red-400 w-8 h-8 mb-2" />, title: 'Proactive Health Insights', desc: 'Identify potential health vulnerabilities in your chart before they manifest, allowing for preventative care.'
  },
  {
    icon: <FaLeaf className="text-green-400 w-8 h-8 mb-2" />, title: 'Personalized Wellness', desc: 'Receive tailored advice on diet, exercise, and lifestyle that aligns with your unique cosmic constitution.'
  },
  {
    icon: <FaBrain className="text-blue-400 w-8 h-8 mb-2" />, title: 'Mental & Emotional Clarity', desc: 'Understand the astrological roots of stress and anxiety and learn remedies to foster mental peace.'
  },
  {
    icon: <FaShieldAlt className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Strengthening Vitality', desc: 'Learn which planets govern your energy levels and how to enhance your overall vitality and immunity.'
  },
  {
    icon: <FaAppleAlt className="text-pink-400 w-8 h-8 mb-2" />, title: 'Astrological Dietary Guidance', desc: 'Discover foods that are harmonious with your planetary makeup to promote better digestion and health.'
  },
  {
    icon: <FaSpa className="text-teal-400 w-8 h-8 mb-2" />, title: 'Holistic Healing Remedies', desc: 'Receive guidance on gemstones, mantras, and rituals to mitigate negative planetary influences on your health.'
  },
];

const faqs = [
  {
    q: 'What is Medical Astrology?',
    a: 'Medical Astrology is a specialized branch of Vedic astrology that analyzes the birth chart to understand health, diseases, and vitality. It examines the influence of planets and houses on different parts of the body to provide insights into wellness.'
  },
  {
    q: 'Can astrology predict specific diseases?',
    a: 'Astrology can indicate predispositions or vulnerabilities to certain types of health issues based on planetary placements. It serves as a guide for preventative care, not a definitive diagnosis of specific diseases.'
  },
  {
    q: 'Is this a replacement for a doctor\'s advice?',
    a: 'Absolutely not. Astrological guidance is a complementary tool for holistic well-being. It should never replace professional medical advice, diagnosis, or treatment from a qualified doctor.'
  },
  {
    q: 'How does my birth chart relate to my health?',
    a: 'Each house and planet in your birth chart corresponds to different parts of the body and bodily functions. For example, the 6th house governs health and illness. An analysis reveals your constitutional strengths and weaknesses.'
  },
  {
    q: 'What kind of remedies are suggested for health issues?',
    a: 'Remedies are holistic and can include dietary recommendations, lifestyle changes, specific mantras, gemstone therapy, and rituals designed to pacify malefic planetary influences and strengthen benefic ones.'
  },
];

export default function HealthAstrologyPage() {
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-green-50 to-white font-sans">
      <div className="container mx-auto pt-8 px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#f0fff4] via-[#f3e8ff] to-[#e6f7ff] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#e6f7ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Medical & Health Astrology</h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-3xl" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Align your well-being with the cosmos. Discover how Vedic astrology can illuminate your path to physical vitality and emotional balance.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors font-sans ${activeTab === tab ? 'border-green-500 text-green-600 font-bold' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif', textAlign: 'justify' }}>
            <p><span className="font-bold text-green-900">Medical Astrology</span> is a profound branch of Vedic science that offers deep insights into your physical and mental well-being. It operates on the principle that the celestial bodies—planets, stars, and zodiac signs—exert a tangible influence on our bodies. By creating and analyzing your birth chart, we can map out your unique constitutional strengths, identify potential health vulnerabilities, and understand the cosmic timing of health-related events in your life.</p>
            <p>Your birth chart serves as a divine blueprint for your health. The 6th house is paramount, as it is the house of diseases, debts, and obstacles. The condition of this house and its lord reveals much about your susceptibility to illness. Similarly, the Ascendant (Lagna) and its lord represent your overall physical body and vitality. The 8th house indicates longevity and chronic conditions, while the 12th house can signify issues like hospitalization or hidden ailments. Each planet also governs specific parts of the body and health matters—the Sun rules vitality and bones, the Moon governs the mind and emotions, Mars relates to blood and energy, and Saturn influences chronic diseases and longevity.</p>
            <p>Our approach to Health Astrology is not about fatalistic prediction; it is about empowerment. By understanding your astrological predispositions, you can take proactive steps to safeguard your health. This ancient wisdom provides personalized guidance on diet, lifestyle, and daily routines that are in harmony with your planetary energies. It helps you understand the &quot;why&quot; behind recurring health issues, offering a spiritual perspective on physical challenges. It is a powerful tool for preventative care, helping you cultivate balance and resilience long before problems arise.</p>
            <p>A crucial aspect of a health reading involves analyzing planetary periods (Dashas) and transits (Gochar). These cycles indicate when certain health themes may become more prominent in your life. Knowing that a challenging planetary period is approaching allows you to be more vigilant and adopt supportive practices. Conversely, a favorable period can be harnessed for rejuvenation and strengthening your well-being. This predictive insight allows for strategic health management, aligning your actions with the natural cosmic rhythm for optimal wellness.</p>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
              <span className="text-green-600 font-medium">Important Disclaimer:</span> Health astrology is a complementary, spiritual guidance tool. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any health concerns.
            </div>
          </motion.div>
        )}
        {activeTab === 'Benefits' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Health Astrology</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/70 backdrop-blur-md shadow-lg p-8 flex flex-col items-center border border-green-100 hover:scale-105 transition-transform duration-200"
                  style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
                >
                  {benefit.icon}
                  <h3 className="font-bold text-lg mb-2 text-green-900 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
                  <p className="text-gray-700 text-center text-base">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'FAQs' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-green-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq, idx) => (
                <div key={idx}>
                  <div className="flex items-center mb-2">
                    <span className="text-green-600 mr-2 text-xl">&#x3f;</span>
                    <span className="font-bold text-lg text-green-900" style={{ fontFamily: 'Playfair Display, serif' }}>{faq.q}</span>
                  </div>
                  <p className="text-black text-justify pl-8" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'Purchase' && (
          <section className="mb-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#e6f7ff] p-10 shadow-xl border border-green-100 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Health Astrology Session</h2>
              <p className="text-lg text-center mb-6 text-black" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                Ready to align your well-being with the cosmos? Book a personalized session for deep insights into your health.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-green-900 block mb-2 font-semibold">Name</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-green-900 block mb-2 font-semibold">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-green-900 block mb-2 font-semibold">Phone Number</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-green-900 block mb-2 font-semibold">Date of Birth</label>
                    <input 
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-green-900 block mb-2 font-semibold">Your Health Concerns (Optional)</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full h-32"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-green-700 text-white hover:bg-green-800 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
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