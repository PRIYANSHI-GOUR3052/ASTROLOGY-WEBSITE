"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { FaUser, FaCompass, FaHeart, FaShieldAlt, FaCalendarAlt, FaHeartbeat, FaInfinity, FaPrayingHands } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DrNarendraProfile } from '../../../app/components/DrNarendraProfile';
import { Statistics } from '../../../app/components/Statistics';
import { ContactForm } from '../../../app/components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs', 'Purchase'];

const benefits = [
  {
    icon: <FaUser className="text-teal-400 w-8 h-8 mb-2" />, title: 'Deep Self-Understanding', desc: 'Gain profound insights into your core personality, hidden strengths, and unique life patterns based on your natal chart.'
  },
  {
    icon: <FaCompass className="text-sky-400 w-8 h-8 mb-2" />, title: 'Life Path & Career Clarity', desc: 'Understand your true calling, identify your most promising career paths, and make informed decisions with confidence.'
  },
  {
    icon: <FaHeart className="text-rose-400 w-8 h-8 mb-2" />, title: 'Relationship Harmony', desc: 'Uncover your relationship patterns, emotional needs, and compatibility factors to foster healthier, more fulfilling connections.'
  },
  {
    icon: <FaShieldAlt className="text-amber-400 w-8 h-8 mb-2" />, title: 'Navigate Life\'s Challenges', desc: 'Foresee potential challenges and receive cosmic guidance on how to navigate life\'s transitions with grace and resilience.'
  },
  {
    icon: <FaCalendarAlt className="text-cyan-400 w-8 h-8 mb-2" />, title: 'Optimal Timing (Muhurta)', desc: 'Leverage cosmic timing by understanding auspicious periods for major life events like marriage, career changes, or investments.'
  },
  {
    icon: <FaHeartbeat className="text-lime-400 w-8 h-8 mb-2" />, title: 'Holistic Wellness Insights', desc: 'Explore the connection between planetary placements and your physical and mental well-being, receiving guidance on maintaining balance.'
  },
  {
    icon: <FaInfinity className="text-fuchsia-400 w-8 h-8 mb-2" />, title: 'Understand Karmic Journey', desc: 'Gain clarity on your soul\'s purpose and past-life patterns by exploring the significance of the lunar nodes (Rahu & Ketu) in your chart.'
  },
  {
    icon: <FaPrayingHands className="text-orange-400 w-8 h-8 mb-2" />, title: 'Personalized Spiritual Practices', desc: 'Receive recommendations for mantras, meditations, and rituals tailored to your unique astrological makeup to enhance your spiritual growth.'
  }
];

const faqs = [
  {
    q: 'What is a personal astrology reading?',
    a: 'A personal astrology reading is a highly detailed, one-on-one analysis of your birth chart (natal chart). This chart is a cosmic snapshot of the sky at the exact moment of your birth, and it serves as your unique spiritual blueprint.'
  },
  {
    q: 'What information is required for an accurate reading?',
    a: 'For the most precise and insightful reading, we require your full date of birth, the exact time of birth (as recorded on your birth certificate), and the city and country of your birth.'
  },
  {
    q: 'How is the reading delivered?',
    a: 'Your personal reading is delivered as a comprehensive written report sent to your email, followed by an optional live consultation with our expert astrologer to discuss the findings and answer your questions.'
  },
  {
    q: 'Does astrology predict a fixed future?',
    a: 'Astrology does not predict an unchangeable fate. Instead, it provides a roadmap of potentials, probabilities, and energetic influences. It is a powerful tool for self-awareness that empowers you to make conscious choices, but your free will is always paramount in shaping your destiny.'
  },
  {
    q: 'What if I don\'t know my exact birth time?',
    a: 'An exact birth time is crucial for the most accurate reading, especially for determining your Ascendant (Rising Sign) and house placements. If you don\'t know your time, we can still perform a reading based on other rectification techniques, though some specific details may be less precise. We recommend trying to find your birth time from official records for the best results.'
  },
  {
    q: 'Can a reading help me with a specific, urgent decision?',
    a: 'Yes. For specific questions, we often use Horary Astrology (Prashna), which creates a chart for the moment a question is asked. This provides targeted, immediate insight into a situation, complementing the broader life-path guidance of your natal chart reading.'
  },
  {
    q: 'What is the difference between this and a generic sun-sign horoscope?',
    a: 'Generic horoscopes are based only on your Sun sign and offer broad advice for millions of people. A personal reading is an in-depth analysis of your unique chart, considering all planets, houses, and aspects. It is an entirely personalized guide to your specific life, making it infinitely more accurate and detailed.'
  },
  {
    q: 'How should I prepare for my personal reading?',
    a: 'Come with an open heart and reflect on the key areas of your life where you are seeking clarity. It is helpful to jot down specific questions beforehand. Being in a quiet, private space during your consultation will also help you absorb the information fully and make the most of our time together.'
  }
];

export default function PersonalReadingPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-sky-50 to-white font-sans">
      <div className="container mx-auto pt-8 pb-16 px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#f0f9ff] via-[#f0f5ff] to-[#eef9ff] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#e0f2fe]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Personal Astrology Reading</h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-2xl font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Discover your cosmic blueprint with a personalized reading of your natal chart.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors font-sans ${activeTab === tab ? 'border-sky-500 text-sky-600 font-bold' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-800 space-y-6 font-sans" style={{ textAlign: 'justify' }}>
            <p><span className="font-bold text-sky-900">A Personal Astrology Reading</span> is your key to unlocking the sacred contract your soul made with the universe before you were born. By creating a natal chart—a precise map of the heavens at your exact moment of birth—we can reveal the profound cosmic influences that shape your personality, destiny, and life's purpose.</p>
            <p>Our expert astrologers go beyond generic sun-sign horoscopes to provide a deeply personalized and nuanced interpretation of your unique chart. We analyze the positions and interactions of all the planets, houses, and important points (like your ascendant and moon sign) to create a holistic picture of who you are.</p>
            <p>This reading is a powerful tool for self-discovery, empowerment, and strategic life planning. It can illuminate your innate talents, clarify your career path, explain your relationship dynamics, and help you understand your karmic lessons. Whether you are at a crossroads or simply wish to know yourself more deeply, a personal reading offers invaluable clarity and guidance.</p>
            <p>The core components of your chart—the planets, signs, and houses—form a celestial tapestry that is uniquely yours. The planets represent different facets of your psyche (e.g., Mercury for communication, Venus for love), the zodiac signs color how these energies are expressed, and the twelve houses pinpoint the specific areas of life where these energies manifest, such as career, relationships, and home life. Understanding how these three elements interweave is the first step toward mastering your own personal astrology.</p>
            <p>While many are familiar with their Sun sign, your Ascendant (or Rising sign) and Moon sign are equally, if not more, crucial for a complete self-portrait. The Ascendant represents the mask you wear, your outer personality, and how others perceive you. Your Moon sign, in contrast, governs your inner world—your emotions, instincts, and subconscious needs. A personal reading synthesizes these "big three" to offer a rich, multi-layered understanding of your internal and external self.</p>
            <p>We also delve into the intricate web of planetary aspects—the geometric angles planets form with one another in your chart. These aspects, such as conjunctions, trines, squares, and oppositions, function like conversations between your inner drives. Some conversations are harmonious and create easy flow (trines), while others generate tension and challenges that push you toward growth (squares). Interpreting these aspects is critical for understanding your innate talents, internal conflicts, and the dynamic interplay of your personality.</p>
            <p>A key part of our analysis involves exploring your karmic journey through the lunar nodes, Rahu (the North Node) and Ketu (the South Node). These mathematical points in your chart are not celestial bodies but are deeply significant, representing your past-life patterns and your soul's evolutionary purpose in this lifetime. Understanding your nodal axis can shed light on the baggage you've carried in and the new direction your soul is yearning to take, providing a profound sense of purpose and direction.</p>
            <p>Ultimately, a personal reading is a collaborative and empowering experience. It is not about receiving rigid predictions but about gaining a practical toolkit for life. Armed with this cosmic self-knowledge, you can navigate your days with greater awareness, make choices that are in true alignment with your soul's purpose, anticipate cycles of challenge and opportunity, and cultivate more compassion for yourself and others. It is a guide to living more consciously, a confirmation of your unique place in the cosmos, and an invitation to become the most authentic version of yourself.</p>
            <p>To deepen the analysis, we meticulously examine the twelve astrological houses, which represent distinct arenas of your life. The First House defines your identity and outward appearance, while the Seventh House governs marriage and partnerships. Your career and public reputation are illuminated by the Tenth House, and your innermost emotional foundations are revealed in the Fourth House. By observing which planets occupy which houses, we can pinpoint exactly where your life's major themes will play out, offering specific insights into your experiences with money, family, health, and spirituality. This provides a practical framework for understanding why certain areas of your life flow with ease while others may require more conscious effort and attention.</p>
            <p>A natal chart is not a static document; it is a dynamic map that evolves with you. Our readings incorporate an analysis of current and upcoming transits—the ongoing movements of the planets in the sky as they interact with your birth chart. When a transiting planet like Jupiter or Saturn forms an aspect with one of your natal planets, it activates specific themes and presents unique opportunities or challenges. Understanding these transits allows you to work proactively with the prevailing cosmic energies, helping you to plan major life events, navigate difficult periods, and seize moments of opportune growth with strategic foresight.</p>
            <p>Beyond the major planets, our readings often incorporate the wisdom of key asteroids and celestial points that add further layers of nuance. For instance, the asteroid Chiron, often called the "Wounded Healer," points to our deepest core wound and, paradoxically, our greatest gift for healing others once we have integrated its lessons. Analyzing Chiron's position by sign and house can reveal the nature of a recurring struggle in your life and illuminate the path toward transforming that pain into a source of profound strength and compassion for both yourself and others.</p>
            <p>We also assess your chart's elemental and modal balance. The distribution of your planets among the four elements—Fire (action, spirit), Earth (practicality, grounding), Air (intellect, communication), and Water (emotion, intuition)—reveals your fundamental temperament and how you process life. Similarly, the balance of modalities—Cardinal (initiating), Fixed (sustaining), and Mutable (adapting)—shows how you approach tasks and respond to change. Understanding your unique elemental and modal signature provides a foundational grasp of your natural energetic style and helps you cultivate balance where it is needed.</p>
            <p>The true magic of an astrological reading lies in the art of synthesis. It is not merely a checklist of planetary positions but a deeply intuitive process of weaving all these complex threads into a single, coherent narrative that tells your unique story. Our astrologers are skilled in this art, connecting the dots between your personality, your karmic path, your current challenges, and your highest potential. This holistic synthesis transforms complex astrological data into a meaningful, empowering, and practical guide that you can use to consciously co-create your most fulfilling life journey.</p>
            <p>While transits show what the universe is bringing to you from the outside, we also use predictive techniques like Secondary Progressions to understand your internal evolution. Based on the "a day for a year" principle, your progressed chart reveals the slow, organic unfolding of your personality and soul's story over time. A progressed New Moon, for example, can signify the start of a major new 30-year chapter in your life. Analyzing progressions provides a profound timeline of your psychological development, highlighting periods of deep internal shifts, maturation, and the emergence of new facets of your identity.</p>
            <p>A personal reading offers unparalleled insight into your relationship dynamics, primarily through the lens of the Descendant—the cusp of your Seventh House. This point in your chart describes the qualities you are unconsciously drawn to in a partner, often representing the traits you need to integrate within yourself. By analyzing the sign on the Descendant and any planets in the Seventh House, we can illuminate your patterns in one-to-one partnerships, the lessons you are meant to learn through them, and the kind of relationship that will ultimately bring you the most growth and fulfillment.</p>
            <p>Many people express concern over retrograde planets in their birth chart, but these are not inherently negative. A natal retrograde planet simply suggests that its energy is turned inward, processed more subjectively, and may manifest in less conventional ways. It often points to a significant karmic theme or a talent that requires deep, personal exploration before it can be effectively expressed externally. A personal reading demystifies these placements, reframing them as invitations to develop a unique, masterful relationship with that planet's energy, turning a perceived challenge into a profound source of wisdom and strength.</p>
            <p>For an even finer layer of detail, our analysis may incorporate the influence of major fixed stars that are in close alignment with your natal planets or angles. Unlike the planets, these distant suns are "fixed" in the zodiac and are imbued with ancient, potent mythological meaning. An alignment with a star like Regulus might indicate a potential for leadership and renown, while a conjunction with Algol could point to intense transformative experiences. These stellar connections add a powerful, mythic dimension to your personal narrative, often highlighting areas of extraordinary destiny or talent.</p>
            <p>The role of the astrologer in a personal reading is not that of a psychic or a fortune-teller, but of a skilled translator and compassionate guide. We create a safe, non-judgmental space for you to explore your life's most pressing questions. We see ourselves as your partner in discovery, helping you decode the symbolic language of your own cosmic DNA. The goal is to facilitate a dialogue between you and your chart, fostering 'aha' moments and empowering you with the self-awareness needed to navigate your life with greater intention, confidence, and a deep sense of connection to your own sacred journey.</p>
            <div className="bg-sky-50 border-l-4 border-sky-400 p-4 rounded-lg">
              <span className="text-sky-600 font-medium">Key Takeaway:</span> Your natal chart is a cosmic blueprint, and a <span className="font-bold text-sky-900">Personal Reading</span> is the key to interpreting it and unlocking your true potential.
            </div>
          </motion.div>
        )}
        {activeTab === 'Benefits' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-sky-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of a Personal Reading</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 + idx * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/70 backdrop-blur-md shadow-lg p-8 flex flex-col items-center border border-sky-100 hover:scale-105 transition-transform duration-200"
                >
                  {benefit.icon}
                  <h3 className="font-bold text-lg mb-2 text-sky-900 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
                  <p className="text-gray-700 text-center text-base">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'FAQs' && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-sky-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-sky-100">
                  <div className="flex items-start mb-2">
                    <span className="text-sky-600 mr-3 text-2xl font-bold">&#x3f;</span>
                    <span className="font-bold text-lg text-sky-900" style={{ fontFamily: 'Playfair Display, serif' }}>{faq.q}</span>
                  </div>
                  <p className="text-gray-800 text-justify pl-9" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {activeTab === 'Purchase' && (
          <section className="mb-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f0f5ff] to-[#eef9ff] p-10 shadow-xl border border-sky-100 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-sky-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Personal Reading</h2>
              <p className="text-lg text-center mb-6 text-gray-700" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                Invest in yourself and unlock the wisdom of your personal cosmic code.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sky-900 block mb-2 font-semibold">Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/80 text-sky-900 border border-sky-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                  <div>
                    <label className="text-sky-900 block mb-2 font-semibold">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/80 text-sky-900 border border-sky-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                   <div>
                    <label className="text-sky-900 block mb-2 font-semibold">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/80 text-sky-900 border border-sky-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                  <div>
                    <label className="text-sky-900 block mb-2 font-semibold">Date of Birth</label>
                    <input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="bg-white/80 text-sky-900 border border-sky-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                  <div className="md:col-span-2">
                     <label className="text-sky-900 block mb-2 font-semibold">Time of Birth (e.g., 03:45 PM)</label>
                    <input type="time" value={formData.timeOfBirth} onChange={(e) => setFormData({...formData, timeOfBirth: e.target.value})} className="bg-white/80 text-sky-900 border border-sky-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sky-900 block mb-2 font-semibold">Place of Birth (City, Country)</label>
                    <input type="text" value={formData.placeOfBirth} onChange={(e) => setFormData({...formData, placeOfBirth: e.target.value})} className="bg-white/80 text-sky-900 border border-sky-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                </div>
                <div>
                  <label className="text-sky-900 block mb-2 font-semibold">Your Message or Specific Questions</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-white/80 text-sky-900 border border-sky-200 rounded-lg px-4 py-2 w-full h-32" />
                </div>
                <Button type="submit" className="w-full bg-sky-700 text-white hover:bg-sky-800 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105">
                  Book Your Reading
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