"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { FaRegLightbulb, FaRegStar, FaRegGem } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DrNarendraProfile } from '../../../app/components/DrNarendraProfile';
import { Statistics } from '../../../app/components/Statistics';
import { ContactForm } from '../../../app/components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs', 'Purchase'];

const benefits = [
  {
    icon: <FaRegLightbulb className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Name Correction', desc: 'Unlock the power of your name with numerology-based corrections for greater harmony and success.'
  },
  {
    icon: <FaRegStar className="text-yellow-400 w-8 h-8 mb-2" />, title: 'Lucky Number Discovery', desc: 'Discover your personal lucky numbers and use them to enhance opportunities in life.'
  },
  {
    icon: <FaRegGem className="text-purple-400 w-8 h-8 mb-2" />, title: 'Numerology Remedies', desc: 'Receive personalized remedies and guidance based on your unique numerology chart.'
  },
];

const faqs = [
  {
    q: 'What is numerology and how does it work?',
    a: 'Numerology is the ancient science of numbers that reveals your life path, strengths, and challenges by analyzing your birth date and name. Each number carries a unique vibration that influences your destiny.'
  },
  {
    q: 'How can a numerology reading help me?',
    a: 'A numerology reading provides deep insight into your personality, relationships, career, and spiritual growth. It helps you make informed decisions and align with your true purpose.'
  },
  {
    q: 'What are numerology remedies?',
    a: 'Numerology remedies include name corrections, lucky numbers, affirmations, and rituals designed to harmonize your energy and attract positive outcomes.'
  },
];

export default function NumerologyPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    fullName: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white font-sans">
      <div className="container mx-auto pt-8 px-4 py-16 relative z-10">
        {/* Glassmorphic Banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Numerology Analysis</h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-2xl font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Discover the power of numbers in your life with personalized numerology reading.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors font-sans ${activeTab === tab ? 'border-indigo-500 text-indigo-600 font-bold' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif', textAlign: 'justify' }}>
            <p><span className="font-bold text-indigo-900">Numerology</span> is the ancient metaphysical science of numbers, rooted in the belief that numbers carry unique vibrations and energies that influence every aspect of our lives. By analyzing the numbers present in your birth date and name, numerology reveals profound insights into your personality, strengths, challenges, and destiny.</p>
            <p>Originating in ancient civilizations such as Egypt, Babylon, and India, numerology has evolved into a sophisticated system for self-discovery and spiritual growth. Each number, from 1 to 9, as well as the master numbers 11, 22, and 33, is associated with specific qualities and archetypes. These numbers form the foundation of your numerology chart, offering a cosmic blueprint for your life's journey.</p>
            <p>Numerology is not just about prediction—it is a tool for empowerment. By understanding your core numbers, you can make informed decisions, align with your true purpose, and navigate life's transitions with greater clarity and confidence. Whether you seek guidance in relationships, career, or personal growth, numerology provides a timeless key to unlocking your highest potential.</p>
            <p>The most crucial number in your numerology chart is the Life Path Number. Derived from your date of birth, it reveals your primary life purpose, the central theme of your existence, and the major lessons you are here to learn. It is the roadmap that outlines the opportunities and challenges you will encounter, guiding you toward your most authentic self. Understanding your Life Path Number is like being handed a compass for your journey; it helps you make choices that are in harmony with your soul's intention, leading to greater fulfillment and a sense of being on the right track.</p>
            <p>Your Expression Number, also known as the Destiny Number, is calculated from the letters in your full birth name. This number unveils your innate talents, natural abilities, and potential for achievement in this lifetime. It highlights the gifts you are meant to develop and share with the world. While your Life Path number shows the road you are on, the Expression Number describes your unique way of walking that road—the specific flavor and style you bring to your life's journey. It points to your potential career paths and how you can best express your inner self in the outer world.</p>
            <p>Hidden within the vowels of your name is your Soul Urge Number, or Heart's Desire. This is the number that speaks of your inner cravings, your true motivations, and what your soul secretly yearns for. It often represents the private, inner self that you may not show to the world. Understanding your Soul Urge is critical for genuine happiness, as it reveals what truly fuels your spirit. Fulfilling the desires of this number brings deep contentment and a sense of inner peace, connecting you to your most authentic motivations.</p>
            <p>The Personality Number, derived from the consonants in your name, represents your outer self—the way you appear to others and the aspects of your character that you feel comfortable sharing. It is the 'mask' you wear in public and the first impression you make. This number reveals how others perceive you and what kind of energy you project into your environment. Aligning the expression of your Personality Number with your inner numbers (like the Soul Urge) creates a sense of wholeness and authenticity, where your inner and outer worlds are in harmony.</p>
            <p>Your Birthday Number, simply the day you were born, adds a specific talent or gift that you bring to your Life Path. While the Life Path number is the main highway, the Birthday Number is like a special skill or tool you have in your toolbox for the journey. It represents a particular talent that comes naturally to you and can be used to help you fulfill your destiny. Acknowledging and developing the qualities of your Birthday Number can provide you with an extra boost of confidence and ability as you navigate your life.</p>
            <p>In numerology, certain numbers are known as Karmic Debt numbers (13, 14, 16, and 19). If one of these numbers appears in your core chart, it suggests that you are working through specific lessons from a past life. These are not punishments, but rather opportunities for soul growth. Each Karmic Debt number points to a specific challenge—such as a need for hard work (13), a lesson in managing freedom (14), a test of faith and ego (16), or a challenge related to abuse of power (19). Understanding this allows you to consciously work with these energies, transforming a potential obstacle into a source of profound strength and wisdom.</p>
            <p>Numerology is not static; it also provides a dynamic view of your life through Personal Cycles. Your Personal Year Number, calculated based on your birth date and the current calendar year, reveals the overarching theme and energy for a specific year. It acts as a guide for what to focus on—whether it's a year for new beginnings (a 1 Personal Year), building relationships (a 2), or a time of completion and release (a 9). Similarly, Personal Month and Day cycles provide more granular timing, helping you align your actions with the natural flow of cosmic energy for optimal results in your daily life. This predictive aspect of numerology allows for strategic planning and living in sync with your personal rhythm.</p>
            <p>While the Pythagorean system of numerology is most common in the West, the Chaldean system is one of the oldest and most revered methods, originating in ancient Babylonia. Unlike the Pythagorean system which uses the numbers 1-9, the Chaldean system focuses on numbers 1-8, believing the number 9 to be sacred and separate. The Chaldean method assigns numerical values to letters based on their sound vibration rather than their alphabetical order, which many practitioners believe provides a more accurate and mystical representation of one's energetic signature. It places a strong emphasis on the name you are most commonly known by, rather than your birth name, asserting that this 'social' vibration has a powerful impact on your daily life and public persona.</p>
            <p>A crucial part of a detailed numerological forecast involves understanding Pinnacles and Challenges. Your life is divided into four major cycles, or Pinnacles, each representing a specific period of learning and development. The Pinnacle number reveals the general theme and opportunities available to you during that era of your life. Paired with each Pinnacle is a Challenge number, which points to a specific weakness or lesson you must work to overcome during that period. Mastering your Challenge number is key to realizing the full potential of the corresponding Pinnacle, turning a potential struggle into a source of significant personal growth and accomplishment.</p>
            <p>The relationship between your core numbers is just as important as the numbers themselves. A 'Bridge Number' is calculated from the difference between your Life Path Number and your Expression Number. This special number reveals how you can bridge the gap between your life's purpose (Life Path) and your natural talents (Expression). It provides practical advice on how to integrate these two fundamental aspects of your being, helping you to feel more aligned and effective. For example, if there is a large gap, the Bridge number can show you what qualities you need to develop to feel more 'on purpose' and utilize your gifts more fully.</p>
            <p>Numerology offers profound insights into relationship compatibility. By comparing the core numbers of two individuals, we can create a detailed synastry report that highlights areas of natural harmony, potential friction, and shared life purpose. The Life Path numbers reveal how your individual journeys align, while comparing Soul Urge numbers can show deep emotional and spiritual connection. Understanding the numerical dynamics between you and a partner can foster greater compassion, improve communication, and help navigate disagreements with a higher level of awareness and mutual respect.</p>
            <p>The phenomenon of repeatedly seeing certain number sequences, often called 'Angel Numbers' (like 11:11, 444, or 222), is a modern extension of numerology's principles. These repeating numbers are considered to be messages from the universe, your spirit guides, or your higher self, meant to grab your attention. Each sequence carries a specific meaning, offering guidance, reassurance, or a call to action. Recognizing and interpreting these signs can make you feel more connected to the universe and provide timely validation that you are on the right path or need to pay attention to a specific area of your life.</p>
            <p>The power of a name is a central tenet in numerology, and through 'Name Numerology,' it's possible to make adjustments to harmonize your personal energy for better outcomes. If your current name creates a challenging vibration or is out of sync with your Life Path number, a numerologist can suggest a minor alteration—such as adding a letter, changing the spelling slightly, or adopting a new middle name. This is not about changing who you are, but about fine-tuning the vibrational frequency you send out to the universe. This recalibration can help to smooth your path, attract more favorable opportunities, and create a greater sense of well-being and success.</p>
            <p>Beyond personal charts, Universal Numbers provide a backdrop of energy that affects everyone on the planet. The Universal Year Number, for example, sets the tone for global trends, challenges, and opportunities for a given year. In 2024 (2+0+2+4=8), the Universal Year is an 8, a number of power, abundance, and karma. This suggests a global focus on finances, authority, and reaping the rewards (or consequences) of past actions. By understanding the Universal Year's theme, you can align your personal goals with the broader energetic currents, helping you to either ride the wave of collective energy or prepare for its specific challenges.</p>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
              <span className="text-indigo-600 font-medium">Key Takeaway:</span> <span className="font-bold text-indigo-900">Numerology</span> offers a unique lens to understand yourself and your life's path through the power of numbers.
            </div>
          </motion.div>
        )}
        {activeTab === 'Benefits' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Numerology</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/70 backdrop-blur-md shadow-lg p-8 flex flex-col items-center border border-indigo-100 hover:scale-105 transition-transform duration-200"
                  style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
                >
                  {benefit.icon}
                  <h3 className="font-bold text-lg mb-2 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
                  <p className="text-gray-700 text-center text-base">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'FAQs' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq, idx) => (
                <div key={idx}>
                  <div className="flex items-center mb-2">
                    <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                    <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{faq.q}</span>
                  </div>
                  <p className="text-black text-justify pl-8" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'Purchase' && (
          <section className="mb-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#e0f2fe] p-10 shadow-xl border border-indigo-100 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-indigo-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Numerology Session</h2>
              <p className="text-lg text-center mb-6" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                Ready to unlock the secrets of your numbers? Book a personalized numerology session and discover your true potential.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-indigo-900 block mb-2 font-semibold">Name</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-indigo-900 block mb-2 font-semibold">Email</label>
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-indigo-900 block mb-2 font-semibold">Phone Number</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-indigo-900 block mb-2 font-semibold">Date of Birth</label>
                    <input 
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-indigo-900 block mb-2 font-semibold">Full Name (as per birth certificate)</label>
                    <input 
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-indigo-900 block mb-2 font-semibold">Your Message or Specific Questions</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full h-32"
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-indigo-700 text-white hover:bg-indigo-800 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
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

