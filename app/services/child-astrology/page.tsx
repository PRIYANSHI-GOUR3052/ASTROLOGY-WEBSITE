"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { FaBaby, FaVenus, FaRegMoon, FaSchool, FaHeart, FaUserFriends } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DrNarendraProfile } from '@/app/components/DrNarendraProfile';
import { Statistics } from '@/app/components/Statistics';
import { ContactForm } from '@/app/components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs', 'Purchase'];

const benefits = [
  {
    icon: <FaVenus className="text-pink-400 w-8 h-8 mb-2" />, title: 'Timing of Childbirth', desc: 'Analyze planetary periods to identify the most favorable times for conception and childbirth.'
  },
  {
    icon: <FaBaby className="text-blue-400 w-8 h-8 mb-2" />, title: 'Remedies for Progeny Issues', desc: 'Receive powerful and compassionate remedies to overcome obstacles related to childbirth.'
  },
  {
    icon: <FaRegMoon className="text-indigo-400 w-8 h-8 mb-2" />, title: "Child's Horoscope Analysis", desc: "Understand your child's potential, personality, and life path from their birth chart."
  },
  {
    icon: <FaSchool className="text-green-400 w-8 h-8 mb-2" />, title: 'Educational Path Guidance', desc: "Identify your child's innate talents and the most suitable educational streams for them."
  },
  {
    icon: <FaHeart className="text-red-400 w-8 h-8 mb-2" />, title: "Insights into Child's Health", desc: 'Gain knowledge about potential health vulnerabilities and preventative wellness strategies.'
  },
  {
    icon: <FaUserFriends className="text-orange-400 w-8 h-8 mb-2" />, title: 'Parent-Child Relationship', desc: 'Foster a deeper, more harmonious bond by understanding the astrological dynamics between you and your child.'
  },
];

const faqs = [
  {
    q: 'What is Progeny and Child Astrology?',
    a: "It is a specialized field of Vedic astrology that focuses on childbirth, conception, and the well-being of a child. It analyzes the 5th house in the parents' charts to provide insights and remedies related to having children."
  },
  {
    q: 'Can astrology help if we are facing delays in having a child?',
    a: 'Yes. By examining the horoscopes of both partners, we can identify planetary afflictions causing delays and suggest powerful, spiritually-grounded remedies to mitigate these challenges.'
  },
  {
    q: 'Can you create a horoscope for my newborn?',
    a: "Absolutely. A newborn's horoscope, or Janma Kundli, is a precious map of their life. It reveals their core personality, strengths, potential challenges, and destiny, providing a guide for conscious parenting."
  },
  {
    q: "What can my child's chart reveal about their future?",
    a: "It can indicate their natural talents, suitable career paths, health predispositions, and overall life patterns. This knowledge empowers parents to nurture their child's unique potential effectively."
  },
  {
    q: 'Are the suggested remedies safe?',
    a: 'Yes, all our remedies are spiritual in nature. They are safe, positive, and designed to harmonize planetary energies. They typically include mantras, pujas, and gemstone recommendations, and never interfere with medical treatments.'
  },
];

export default function ChildAstrologyPage() {
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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-pink-50 to-white font-sans">
      <div className="container mx-auto pt-8 px-4 py-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fff0f5] via-[#f3e8ff] to-[#e6f7ff] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#fff0f5]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Progeny & Child Astrology</h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-3xl" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Illuminate the path of parenthood and understand the cosmic blueprint of your child&apos;s destiny with divine astrological guidance.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors font-sans ${activeTab === tab ? 'border-pink-500 text-pink-600 font-bold' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
              style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif', textAlign: 'justify' }}>
            <p><span className="font-bold text-pink-900">Progeny Astrology</span> is a deeply compassionate and specialized field of Vedic astrology dedicated to the journey of parenthood. It addresses one of life&apos;s most profound desires: the blessing of having a child. By analyzing the horoscopes of the prospective parents, particularly the 5th house (the house of children, creativity, and intellect), we can gain invaluable insights into the timing, health, and destiny related to progeny.</p>
            <p>For couples dreaming of starting a family, this science offers a guiding light. It helps identify the most fertile and astrologically supportive periods for conception, increasing the chances of a healthy pregnancy. If there are delays or obstacles, Progeny Astrology can pinpoint the specific planetary afflictions responsible—such as the influence of malefic planets like Saturn, Mars, or Ketu on the 5th house—and provide powerful, time-tested remedies to pacify these energies and clear the path to parenthood.</p>
            <p>Beyond conception, creating a <span className="font-bold text-pink-900">Child&apos;s Horoscope (Janma Kundli)</span> at birth is one of the greatest gifts a parent can give. This celestial blueprint reveals the child&apos;s innate nature (Prakriti), their intellectual and emotional strengths, potential health issues, and their destined path in life. Understanding your child&apos;s astrological makeup from the very beginning allows for conscious parenting—nurturing their natural talents, supporting them through challenges, and guiding them towards a future that is in true alignment with their soul&apos;s purpose.</p>
            <p>The analysis extends beyond just the 5th house. The strength of Jupiter, the primary significator (karaka) for children and wisdom, is paramount. We assess its placement, aspects, and dignity in the chart. A well-placed Jupiter can bless a couple with virtuous and fortunate children, while an afflicted Jupiter may require specific remedial measures like chanting mantras or performing pujas to strengthen its positive influence.</p>
            <p>Furthermore, the Saptamsha (D7) divisional chart is meticulously examined. This chart is a microscopic view of the 5th house and provides highly specific details about children. It can indicate the number of children, their gender, their relationship with the parents, and their overall well-being. Analyzing the D7 chart allows for a much deeper and more accurate level of prediction and guidance regarding all matters of progeny.</p>
            <p>Child-rearing in the modern world presents unique challenges. A child&apos;s horoscope acts as a divine manual, helping parents understand their child&apos;s psychological and emotional needs. For instance, a child with a prominent Moon may be highly sensitive and require a nurturing environment, whereas a child with a strong Mars may be energetic and competitive, needing constructive outlets for their dynamism. Astrological guidance helps tailor parenting styles to the child&apos;s innate personality.</p>
            <p>Education is another critical area where Child Astrology provides immense value. By analyzing the 4th house (primary education) and 9th house (higher education), along with the planet Mercury (intellect) and Jupiter (wisdom), we can identify the most suitable educational fields for a child. This prevents the confusion and stress of forcing a child into a stream that is not aligned with their natural talents, ensuring they excel in their chosen path.</p>
            <p>Astrological remedies, or &apos;upayas&apos;, are a cornerstone of this practice. These are not superstitions but are spiritual technologies designed to harmonize cosmic energies. For couples facing progeny issues, remedies can range from simple mantra chanting to specific gemstone recommendations or the performance of sacred rituals like the Santan Gopal Puja. These remedies work on a subtle energetic level to remove blockages and invite divine grace.</p>
            <p>The parent-child relationship can also be understood and improved through astrology. By comparing the horoscopes of the parent and child (a practice known as synastry), we can understand the karmic bond between them. This reveals potential areas of harmony and friction, allowing parents to foster a relationship built on understanding, empathy, and mutual respect, navigating the teenage years and beyond with greater ease.</p>
            <p>Ultimately, Child Astrology is a holistic and empowering tool. It provides a spiritual perspective on the entire journey of parenthood, from the desire for a child to raising them into a well-rounded, successful, and happy adult. It transforms parenting from a series of guesses and anxieties into a conscious, guided, and deeply fulfilling spiritual practice, ensuring the best possible future for the next generation.</p>
            <p>A deeper layer of analysis involves the <span className="font-bold text-pink-900">Nakshatras</span>, or lunar mansions. The Nakshatra in which a child&apos;s Moon is placed at birth provides profound insights into their subconscious patterns, core motivations, and life themes. A child born in the Ashwini Nakshatra, for example, will be a natural pioneer, quick-witted and energetic, while a child born in the Revati Nakshatra will be gentle, compassionate, and spiritually inclined. Knowing this helps parents connect with their child&apos;s soul essence.</p>
            <p>The ancient ceremony of <span className="font-bold text-pink-900">Namakarana</span> (naming a child) is also deeply rooted in astrology. Traditionally, a child is given a name whose first syllable corresponds to the sound associated with their birth Nakshatra. This practice is believed to align the child&apos;s vibrational identity with the cosmic energies of their birth chart, creating a lifetime of harmony and attracting positive opportunities.</p>
            <p>Understanding the sequence of planetary periods, known as <span className="font-bold text-pink-900">Vimshottari Dasha</span>, is like having a predictive timeline of a child&apos;s life. This system reveals which planetary energies will be most active during different phases. Parents can thus anticipate periods of academic brilliance, potential health concerns, creative breakthroughs, or social challenges, allowing them to provide the right support and guidance at the right time.</p>
            <p>Vedic astrology also identifies specific planetary combinations called <span className="font-bold text-pink-900">Balarishta</span>, which can indicate health vulnerabilities in early childhood. Far from being a source of fear, this knowledge is empowering. It allows for the timely performance of protective remedies and pujas that act as a divine shield, safeguarding the child&apos;s health and ensuring their longevity and vitality.</p>
            <p>For parents of <span className="font-bold text-pink-900">special needs children</span>, astrology offers a compassionate and insightful perspective. It helps them understand the unique karmic journey of their child, revealing their hidden strengths, non-traditional forms of intelligence, and the specific spiritual lessons their soul has chosen. This fosters a deeper acceptance and empowers parents to create the most supportive environment for their child&apos;s unique developmental path.</p>
            <p>The <span className="font-bold text-pink-900">Moon&apos;s condition</span> in a child&apos;s chart is of utmost importance, as it governs their mind, emotions, and their bond with their mother. A strong, well-placed Moon grants emotional stability, a sharp memory, and a nurturing disposition. Conversely, an afflicted Moon might indicate a tendency towards anxiety or moodiness, which, when known, allows parents to proactively teach emotional regulation and provide a secure emotional foundation.</p>
            <p>Finally, the horoscope reveals the influence of <span className="font-bold text-pink-900">ancestral karma and legacy</span>, primarily through the 5th and 9th houses. A child&apos;s birth is a continuation of a deep karmic lineage. Understanding these patterns can shed light on inherited talents or recurring challenges. Performing specific remedies can help heal ancestral blockages, ensuring that the child is free to create their own positive destiny while carrying forward the best of their heritage.</p>
            <div className="bg-pink-50 border-l-4 border-pink-400 p-4 rounded-lg">
              <span className="text-pink-600 font-medium">Key Takeaway:</span> Embrace the journey of parenthood with cosmic wisdom, from overcoming conception challenges to nurturing your child&apos;s unique destiny.
            </div>
          </motion.div>
        )}
        {activeTab === 'Benefits' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-pink-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Progeny & Child Astrology</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/70 backdrop-blur-md shadow-lg p-8 flex flex-col items-center border border-pink-100 hover:scale-105 transition-transform duration-200"
                  style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}
                >
                  {benefit.icon}
                  <h3 className="font-bold text-lg mb-2 text-pink-900 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
                  <p className="text-gray-700 text-center text-base">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'FAQs' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-pink-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
            <div className="space-y-8">
              {faqs.map((faq, idx) => (
                <div key={idx}>
                  <div className="flex items-center mb-2">
                    <span className="text-pink-600 mr-2 text-xl">&#x3f;</span>
                    <span className="font-bold text-lg text-pink-900" style={{ fontFamily: 'Playfair Display, serif' }}>{faq.q}</span>
                  </div>
                  <p className="text-black text-justify pl-8" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'Purchase' && (
          <section className="mb-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#fff0f5] p-10 shadow-xl border border-pink-100 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-pink-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Progeny Astrology Session</h2>
              <p className="text-lg text-center mb-6 text-black" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                Whether you are planning for a child or seeking guidance for your little one, book a session for profound insights.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-pink-900 block mb-2 font-semibold">Your Name</label>
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-white/80 text-pink-900 border border-pink-200 rounded-lg px-4 py-2 w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-pink-900 block mb-2 font-semibold">Partner&apos;s Name (Optional)</label>
                    <input 
                      type="text"
                      className="bg-white/80 text-pink-900 border border-pink-200 rounded-lg px-4 py-2 w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-pink-900 block mb-2 font-semibold">Your Email</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/80 text-pink-900 border border-pink-200 rounded-lg px-4 py-2 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="text-pink-900 block mb-2 font-semibold">Your Message or Specific Questions</label>
                  <textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/80 text-pink-900 border border-pink-200 rounded-lg px-4 py-2 w-full h-32"
                    placeholder="Please include date/time/place of birth for yourself and your partner if seeking conception guidance."
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full bg-pink-600 text-white hover:bg-pink-700 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105"
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