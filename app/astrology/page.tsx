'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedStars } from '../components/AnimatedStars';
import { MysticBackground } from '../components/MysticBackground';
import { CTASection } from '../components/CTASection';
import { Testimonials } from '../components/Testimonials';
import { AstrologerProfile } from '../components/AstrologerProfile';
import { DailyHoroscope } from '../components/DailyHoroscope';
import { AboutSummary } from '../components/AboutSummary';
import { UniversalCartButton } from '../components/UniversalCartButton';
import { DrNarendraProfile } from '../components/DrNarendraProfile';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function AstrologyMainPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'What is Astrology?', 'Benefits', 'FAQs', 'Purchase'];
  const servicePrice = 1500;

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-100 to-white text-black">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
          {/* Banner Heading */}
          <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
            <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Astrology Services</h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
              Unlock the mysteries of the stars with our expert astrology services—personalized horoscopes, birth chart analysis, compatibility readings, and more, all designed to illuminate your path and empower your journey.
            </p>
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
              {/* Tab Content */}
              {activeTab === 'Overview' && (
                <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Astrology: Your Cosmic Compass</h2>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Astrology is one of humanity's oldest spiritual sciences—a profound system of understanding the self and the universe through the movements and relationships of celestial bodies. At Nakshatra Gyaan, we honor this timeless Vedic tradition by fusing it with thoughtful modern interpretation, providing meaningful and actionable insights for today's world. Our astrology services are not merely predictive—they are transformative. We view astrology as a tool for self-empowerment, a mirror to one's inner nature, and a compass to navigate the complexities of life with clarity, purpose, and confidence.
                  </p>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Every individual has a unique cosmic blueprint shaped by the planetary alignments at the time of their birth. Our experienced astrologers decode this intricate map through detailed natal chart readings (Janam Kundali), offering deep insights into your personality, strengths, challenges, and karmic patterns. We also provide daily, monthly, and yearly horoscopes tailored to your zodiac sign, helping you make informed choices in love, career, health, and personal growth. In addition, our compatibility analysis delves into relationship dynamics, offering guidance for harmony and longevity in romantic and interpersonal connections.
                  </p>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Beyond analysis, we offer practical, Vedic-based remedies such as gemstone recommendations, mantra prescriptions, personalized rituals, and yantras to help mitigate malefic planetary influences and enhance positive energy in your life. Our focus is on not just forecasting events, but empowering individuals to consciously align with their highest potential. Whether you're facing challenges, seeking clarity on a major decision, or exploring your spiritual path, our guidance is designed to be supportive, grounded, and deeply aligned with your life goals.
                  </p>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    We also specialize in niche astrological services including career astrology, financial astrology, child astrology, and spiritual growth consultations. Each session is conducted with ethical responsibility, confidentiality, and compassion. Our astrologers dedicate time to understanding your personal context before making any recommendations, ensuring that your experience is as enriching as it is accurate. We believe astrology should be a practical tool that adds genuine value to your everyday decisions and long-term journey.
                  </p>
                  <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Nakshatra Gyaan is committed to making ancient wisdom accessible and relevant. In a world full of uncertainty, we offer you a space to reconnect with your inner rhythm and cosmic purpose. Whether you're a believer, a skeptic exploring for the first time, or someone returning to astrology with deeper questions, we welcome you to engage with us. Let our expert astrologers illuminate your path with clarity, compassion, and a commitment to your personal evolution. Your stars hold your story—let us help you read it.
                  </p>
                </section>
              )}
              {activeTab === 'What is Astrology?' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>What is Astrology?</h2>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Astrology is not merely a discipline—it is a divine science, a sacred dialogue between the cosmos and the human soul. Revered across cultures and centuries, astrology deciphers the celestial language of the stars, revealing how the rhythms of the universe intricately interweave with the destiny of every individual. It is the metaphysical art of interpreting planetary alignments, star constellations, and cosmic movements that were etched into the skies at the moment of your birth—an eternal imprint that shapes your personality, emotional landscape, karmic legacy, spiritual path, and life's most significant events.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    More than a predictive tool, astrology is a profound mirror of consciousness. It reflects your inner architecture—your fears, gifts, desires, patterns, and potential—and invites you into a state of awakened self-awareness. Through its lens, you begin to see that life's experiences are not random occurrences, but deeply meaningful expressions of a divine blueprint written across the heavens. It offers insight into your soul's past, purpose in the present, and direction for the future.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Rooted in the luminous Vedic tradition and enriched by thousands of years of spiritual scholarship, astrology empowers you to find clarity in confusion, rhythm amidst chaos, and divinity in the ordinary. It guides you toward intentional living—helping you align your actions with the larger cosmic forces at play, so that you move through life with greater wisdom, grace, and authenticity. In times of transition or turmoil, astrology serves as a lighthouse—offering both grounding and perspective.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    At Nakshatra Gyaan, we approach astrology not as a static body of knowledge, but as a dynamic and living wisdom—a sacred fusion of ancient scriptures, psychological insight, spiritual depth, and compassionate guidance. Our philosophy is not to tell you what will happen, but to help you understand why it's happening and how you can respond with awareness and power. We blend classical Vedic astrology with modern approaches, creating a bridge between timeless truths and contemporary life.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Our offerings go beyond surface-level predictions. From personalized birth chart readings and karmic analysis to remedies, rituals, and meditative guidance—we serve as your spiritual companions on a journey of healing and transformation. Whether you are navigating love, career, health, finances, or seeking deeper meaning, our services aim to rekindle your inner light and align you with your highest path—your dharma.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    In essence, astrology is not about resigning to fate, but about reclaiming your role as a co-creator with the universe. It is about remembering that you are not separate from the stars—you are woven from their very essence. At Nakshatra Gyaan, we invite you to explore astrology not as superstition, but as a sacred science—one that reveals not only the mysteries of the cosmos, but the truth of who you are.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    Ultimately, astrology is a lifelong companion on the path of self-realization. It encourages you to embrace both your light and your shadow, to honor the cycles of growth and rest, and to trust in the unfolding of your unique journey. As you deepen your understanding of the cosmic forces at play, you cultivate resilience, compassion, and a profound sense of belonging to something greater than yourself. At Nakshatra Gyaan, we are dedicated to walking beside you on this sacred voyage—offering wisdom, support, and inspiration as you awaken to your highest potential and step boldly into the dance of the stars.
                  </p>
                  <p className="text-black text-justify mb-5" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                    In every chart, in every planetary cycle, there lies an invitation to greater self-acceptance and conscious evolution. Astrology reminds us that we are both shaped by the cosmos and shapers of our own destiny—each thought, choice, and intention rippling outward into the universe. By attuning to the wisdom of the stars, you learn to honor your unique rhythm, embrace change with courage, and find meaning in every experience. At Nakshatra Gyaan, we believe that astrology is not just a map of the heavens, but a living testament to the infinite possibilities that reside within you, waiting to be awakened and expressed in the world.
                  </p>
                </section>
              )}
              {activeTab === 'Benefits' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Astrology</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-indigo-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                      <h3 className="text-xl font-semibold text-indigo-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Personalized Guidance</h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Receive insights tailored to your unique birth chart, helping you make empowered decisions in love, career, health, and more.
                      </p>
                    </motion.div>
                    {/* Card 2 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-pink-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #ffe0f0 0%, #fdf6f2 100%)' }}>
                      <h3 className="text-xl font-semibold text-pink-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Self-Discovery & Growth</h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Understand your strengths, challenges, and soul lessons—unlocking your highest potential and fostering personal growth.
                      </p>
                    </motion.div>
                    {/* Card 3 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-green-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #e0ffe8 0%, #e0f2fe 100%)' }}>
                      <h3 className="text-xl font-semibold text-green-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Relationship Harmony</h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Explore compatibility, improve communication, and deepen emotional bonds with loved ones through astrological insights.
                      </p>
                    </motion.div>
                    {/* Card 4 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-yellow-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #fffbe0 0%, #f3e8ff 100%)' }}>
                      <h3 className="text-xl font-semibold text-yellow-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Timing & Opportunity</h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Identify auspicious moments for important actions, harness planetary cycles, and navigate challenges with cosmic timing.
                      </p>
                    </motion.div>
                    {/* Card 5 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.0 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #e0f7ff 0%, #f3e8ff 100%)' }}>
                      <h3 className="text-xl font-semibold text-blue-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Holistic Wellbeing</h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Integrate mind, body, and spirit with remedies, affirmations, and spiritual practices rooted in Vedic wisdom.
                      </p>
                    </motion.div>
                    {/* Card 6 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-purple-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0ffe8 100%)' }}>
                      <h3 className="text-xl font-semibold text-purple-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Confidential & Compassionate</h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Every session is handled with empathy, respect, and strict confidentiality—your journey is sacred to us.
                      </p>
                    </motion.div>
                    {/* Card 7 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-orange-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0f0 100%)' }}>
                      <h3 className="text-xl font-semibold text-orange-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Clarity in Decision-Making
                      </h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Astrology illuminates hidden patterns and cycles, empowering you to make confident, well-timed decisions in every area of life—from relationships to career and beyond.
                      </p>
                    </motion.div>
                    {/* Card 8 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.3 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-teal-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #e0fff7 0%, #e0f7ff 100%)' }}>
                      <h3 className="text-xl font-semibold text-teal-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Spiritual Alignment
                      </h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Deepen your connection to the universe and your inner self. Astrology guides you toward greater spiritual awareness, purpose, and harmony with cosmic rhythms.
                      </p>
                    </motion.div>
                    {/* Card 9 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.4 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-red-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #ffe0e0 0%, #fffbe0 100%)' }}>
                      <h3 className="text-xl font-semibold text-red-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Stress Relief & Emotional Balance
                      </h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        By understanding planetary influences and life cycles, astrology helps you manage stress, find emotional equilibrium, and approach challenges with greater calm and resilience.
                      </p>
                    </motion.div>
                    {/* Card 10 */}
                    <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-cyan-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #e0f7ff 0%, #e0ffe8 100%)' }}>
                      <h3 className="text-xl font-semibold text-cyan-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Legacy & Generational Insight
                      </h3>
                      <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Astrology reveals generational patterns and family karma, empowering you to break cycles, heal ancestral wounds, and create a positive legacy for future generations.
                      </p>
                    </motion.div>
                  </div>
                </section>
              )}
              {activeTab === 'FAQs' && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
                  <div className="space-y-8">
                    {/* FAQ 1 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          What can astrology help me with?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Astrology can provide guidance on relationships, career, health, finances, spiritual growth, and more. It helps you understand your strengths, challenges, and the best timing for important decisions.
                      </p>
                    </div>
                    {/* FAQ 2 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Is my information confidential?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Absolutely. All consultations and birth details are kept strictly confidential and used only for your personalized analysis.
                      </p>
                    </div>
                    {/* FAQ 3 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          How do I book a session?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Simply select your desired service, fill in your details, and choose a convenient time. Our team will confirm your booking and guide you through the process.
                      </p>
                    </div>
                    {/* FAQ 4 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Can I get remedies for my problems?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Yes. Our astrologers provide practical remedies—mantras, rituals, gemstones, and lifestyle advice—tailored to your unique chart and concerns.
                      </p>
                    </div>
                    {/* FAQ 5 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          What makes Nakshatra Gyaan different?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        We combine ancient Vedic wisdom with modern insight, offering compassionate, personalized guidance and a holistic approach to astrology. Your journey is our priority.
                      </p>
                    </div>
                    {/* FAQ 6 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Do I need my exact birth time for an accurate reading?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        While having your exact birth time allows for the most precise astrological analysis, we can still provide valuable insights with an approximate time or by using alternative methods. However, for detailed predictions and remedies, the more accurate your birth details, the better.
                      </p>
                    </div>
                    {/* FAQ 7 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Can astrology predict my future exactly?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Astrology offers guidance based on planetary influences and cycles, helping you understand likely trends and opportunities. It does not predict events with absolute certainty, but empowers you to make informed choices and navigate life's challenges with greater awareness.
                      </p>
                    </div>
                    {/* FAQ 8 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          How often should I consult an astrologer?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        The frequency of consultations depends on your needs. Some clients seek annual guidance, while others consult during major life transitions or when facing specific challenges. We recommend a yearly review and additional sessions as needed for clarity and support.
                      </p>
                    </div>
                    {/* FAQ 9 */}
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                        <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Are your astrologers certified and experienced?
                        </span>
                      </div>
                      <p className="text-black text-justify ml-7" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        Yes, all our astrologers are highly qualified, with years of experience in Vedic astrology and related sciences. They are committed to ongoing learning and ethical practice, ensuring you receive the highest standard of guidance and care.
                      </p>
                    </div>
                  </div>
                </section>
              )}
              {activeTab === 'Purchase' && (
                <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                  <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Purchase Astrology Session</h2>
                  <div className="flex justify-center">
                    <div className="w-full max-w-xl bg-gradient-to-br from-[#f3e8ff] via-[#e0f2fe] to-[#fdf6f2] rounded-3xl shadow-2xl border border-white/60 p-0 overflow-hidden relative" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', backdropFilter: 'blur(8px)' }}>
                      {/* Dreamy Abstract Illustration */}
                      <div className="w-full h-44 bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] to-[#fdf6f2] flex items-center justify-center">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <ellipse cx="50" cy="50" rx="40" ry="40" fill="#e0e7ff" />
                          <ellipse cx="70" cy="40" rx="15" ry="15" fill="#f3e8ff" />
                          <ellipse cx="35" cy="65" rx="10" ry="10" fill="#fdf6f2" />
                          <ellipse cx="60" cy="70" rx="7" ry="7" fill="#e0f2fe" />
                        </svg>
                      </div>
                      <div className="p-8 flex flex-col items-center gap-6">
                        <h3 className="text-2xl font-extrabold text-indigo-900 mb-2 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Astrology Consultation
                        </h3>
                        <p className="text-gray-700 text-center mb-2" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                          Book a personalized astrology session with our expert. Receive in-depth analysis, practical remedies, and spiritual guidance tailored to your unique chart and life questions.
                        </p>
                        <ul className="list-disc list-inside text-gray-800 text-left mb-4 space-y-1" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                          <li>Comprehensive birth chart reading</li>
                          <li>Relationship and compatibility analysis</li>
                          <li>Career, finance, and health guidance</li>
                          <li>Remedies and spiritual practices</li>
                          <li>Confidential, compassionate support</li>
                        </ul>
                        <div className="w-full flex flex-col items-center gap-2 mb-4">
                          <span className="text-3xl font-extrabold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                            ₹{servicePrice}
                          </span>
                          <span className="text-sm text-gray-500">One-time fee, all taxes included</span>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                          <UniversalCartButton
                            productId="astrology-session"
                            productName="Astrology Consultation"
                            price={servicePrice}
                            isService={true}
                            variant="addToCart"
                            className="w-full md:w-auto text-base py-3 px-6 bg-black text-white rounded-lg shadow hover:bg-neutral-900 transition"
                          >
                            Add to Cart
                          </UniversalCartButton>
                          <UniversalCartButton
                            productId="astrology-session"
                            productName="Astrology Consultation"
                            price={servicePrice}
                            isService={true}
                            variant="buyNow"
                            className="w-full md:w-auto text-base py-3 px-6 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
                          >
                            Buy Now
                          </UniversalCartButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
            {/* Sidebar */}
            <div className="lg:col-span-1 flex flex-col gap-8">
              <AboutSummary />
            </div>
          </div>

          {/* Testimonials */}
          <section className="mb-20">
            <Testimonials />
          </section>

          {/* Astrologer Profiles */}
          <section className="mb-20">
            <AstrologerProfile />
          </section>

          {/* Final CTA */}
          <section className="mb-10">
            <CTASection />
          </section>
        </div>
      </MysticBackground>
    </div>
  );
}
