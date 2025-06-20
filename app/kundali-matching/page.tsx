"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

import { ZodiacWheel } from "../components/ZodiacWheel";
import { Statistics } from "../components/Statistics";
import { DrNarendraProfile } from "../components/DrNarendraProfile";
import { AboutSummary } from "../components/AboutSummary";
import { UniversalCartButton } from "../components/UniversalCartButton";

export default function KundaliMatchingPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'What is Kundali Matching?', 'Benefits', 'FAQs', 'Purchase'];
  const servicePrice = 2100; // Example price, update as needed

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Heading */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Kundali Matching</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
            Discover the science and sacred art of Vedic compatibility. Our expert astrologers blend tradition and modern insight to guide you toward a harmonious, blessed union.
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
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Kundali Matching: A Sacred Union of Souls</h2>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  Kundali Matching, or Horoscope Matching, is a revered tradition rooted deeply in the ancient wisdom of Vedic astrology. At Nakshatra Gyaan, we honor this sacred practice by offering a comprehensive and thoughtful approach to compatibility analysis between two individuals preparing for the commitment of marriage. Our methodology is not limited to point-based systems; instead, we focus on delivering a holistic perspective that takes into account the emotional, spiritual, psychological, and practical dimensions of a potential union.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  Our expert astrologers begin by evaluating the birth charts of both individuals through the lens of the Ashtakoota system—a classical framework that assigns a score based on eight distinct aspects of compatibility. These include mental and emotional connection, physical and sexual harmony, genetic compatibility, temperament alignment, and long-term relationship stability. The cumulative score out of 36 points offers a general indication of compatibility, but at Nakshatra Gyaan, we believe in going beyond numbers. We delve into the unique interplay of planetary influences, considering the roles of the Moon, Venus, Mars, Jupiter, and other celestial bodies that shape one's capacity for love, trust, and emotional resilience.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  A critical part of our analysis involves identifying the presence of doshas—such as Mangal Dosha, Nadi Dosha, and Bhakoot Dosha—that can significantly impact married life if left unaddressed. Rather than viewing these as inescapable flaws, we provide carefully considered remedies and insights to mitigate their effects. These may include recommended rituals, mantras, gemstones, or changes in timing, all aligned with the individual's karmic framework and spiritual evolution. Our goal is not to alarm, but to empower—offering realistic and compassionate guidance so that couples can enter their union with clarity, preparedness, and peace of mind.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  We also consider the timing of planetary dashas and transits to assess the long-term journey of the couple. This includes identifying phases of harmony, potential challenges, and opportunities for growth across emotional, financial, and familial dimensions. Our reports are designed not to provide simplistic answers, but to create a meaningful narrative that highlights the strengths of the match, areas that may require effort, and how both individuals can work together to build a life that is balanced and fulfilling.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  What sets our approach apart is our dedication to personalized interpretation. Unlike automated tools that generate impersonal scores, our astrologers invest time in understanding the complete astrological profile of both individuals. We aim to provide context, not just data—guiding couples toward self-awareness, mutual understanding, and conscious decision-making. Whether the marriage is arranged or a result of personal choice, our Kundali Matching service offers a bridge between ancient tradition and the realities of modern relationships.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  At Nakshatra Gyaan, we consider this process not just a service, but a responsibility. Marriage is a sacred commitment, and we approach every match with the care, accuracy, and spiritual sensitivity it deserves. Our commitment is to help you embark on your marital journey with confidence, guided by cosmic insight and grounded wisdom.
                </p>
              </section>
            )}
            {activeTab === 'What is Kundali Matching?' && (
              <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>What is Kundali Matching?</h2>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  Kundali Matching, also known as Horoscope Matching, is a detailed and highly regarded astrological process rooted in the ancient science of Vedic astrology. It involves the systematic comparison of two individuals' birth charts (janam kundalis) to evaluate their compatibility for marriage, both in terms of emotional and spiritual alignment and practical life harmony. This practice has been an integral part of Indian matrimonial tradition for centuries, serving as a guiding tool for families and individuals seeking long-term relationship success. At the heart of this methodology lie the Ashtakoota and Dashakoota Milan systems—sophisticated frameworks that assess the alignment of energies between two partners through multiple parameters.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  The Ashtakoota system evaluates eight critical aspects of compatibility: Varna (spiritual alignment), Vashya (mutual influence or control), Tara (birth star compatibility and longevity), Yoni (sexual and biological compatibility), Graha Maitri (mental and intellectual connection), Gana (behavioral nature), Bhakoot (emotional bonding and family dynamics), and Nadi (physiological and genetic match). These factors are quantified to generate a cumulative score out of 36, with a score of 18 or above generally considered auspicious. However, true compatibility cannot be reduced to a number alone. That's why our analysis goes further, examining important astrological conditions such as Manglik Dosha, Nadi Dosha, and other planetary combinations or afflictions that may influence the marriage's success or present obstacles.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                  At Nakshatra Gyaan, we combine this time-honored wisdom with a contemporary, compassionate perspective. Our experienced astrologers approach each match with attention to both traditional metrics and individual life context, offering not just a technical reading but also intuitive insights into potential challenges and strengths in the relationship. Rather than offering a one-size-fits-all solution, we tailor our consultations to each couple's unique astrological makeup and life aspirations. By integrating Vedic principles with modern psychological understanding, we present couples with a comprehensive roadmap for emotional connection, spiritual harmony, and practical compatibility. Our goal is to support conscious union—one where love is both destined and diligently nurtured.
                </p>
              </section>
            )}
            {activeTab === 'Benefits' && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Kundali Matching</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Card 1 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-indigo-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <h3 className="text-xl font-semibold text-indigo-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Holistic Compatibility Assessment</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      Our process goes beyond numbers, offering a multidimensional analysis of emotional, spiritual, psychological, and practical compatibility. This ensures couples are matched not just by tradition, but by true resonance and shared values.
                    </p>
                  </motion.div>
                  {/* Card 2 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-pink-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #ffe0f0 0%, #fdf6f2 100%)' }}>
                    <h3 className="text-xl font-semibold text-pink-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Personalized Remedies & Guidance</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      We identify doshas and potential challenges, then provide tailored remedies—rituals, mantras, gemstones, and timing adjustments—empowering couples to overcome obstacles and nurture a harmonious union.
                    </p>
                  </motion.div>
                  {/* Card 3 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-green-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #e0ffe8 0%, #e0f2fe 100%)' }}>
                    <h3 className="text-xl font-semibold text-green-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Auspicious Timing & Life Planning</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      Our analysis includes planetary dashas and transits, helping couples choose the most auspicious dates for marriage and anticipate key phases in their shared journey—emotionally, financially, and spiritually.
                    </p>
                  </motion.div>
                  {/* Card 4 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-yellow-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #fffbe0 0%, #f3e8ff 100%)' }}>
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Strengthening Emotional Bonds</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      By understanding each partner's emotional needs and communication styles, our service fosters deeper empathy, trust, and intimacy—laying the foundation for a resilient, loving relationship.
                    </p>
                  </motion.div>
                  {/* Card 5 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.0 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #e0f7ff 0%, #f3e8ff 100%)' }}>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Empowering Conscious Decision-Making</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      Our reports provide not just data, but context and insight—helping couples make informed, conscious choices about their future, grounded in both tradition and modern understanding.
                    </p>
                  </motion.div>
                  {/* Card 6 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-purple-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0ffe8 100%)' }}>
                    <h3 className="text-xl font-semibold text-purple-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Confidential & Compassionate Support</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                      Every consultation is handled with the utmost confidentiality and empathy. We are committed to supporting you with compassion, respect, and spiritual sensitivity at every step of your journey.
                    </p>
                  </motion.div>
                </div>
              </section>
            )}
            {activeTab === 'FAQs' && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  <AccordionItem value="faq1" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Is Kundali matching scientifically proven?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      While Kundali Matching is rooted in spiritual and traditional beliefs, it follows a systematic method based on astronomical data and calculations. It is not considered scientific in the modern empirical sense, but it is deeply respected in Vedic culture for its wisdom, guidance, and the positive impact it has had on countless marriages over centuries.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq2" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      What if the Kundali doesn't match?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      If the match is poor, our astrologers recommend specific remedies and rituals (upayas) to help neutralize negative effects. We believe that no match is entirely doomed—through conscious effort, spiritual practices, and mutual understanding, many challenges can be overcome. Consultation with an experienced astrologer is crucial before making any final decisions.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq3" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Is Kundali matching necessary for love marriages?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Even in love marriages, Kundali Matching can provide valuable insights into future challenges and strengths of the relationship. Many couples opt for it to receive guidance, blessings, and practical advice for a strong, harmonious future together—regardless of how the relationship began.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq4" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      How long does the Kundali Matching process take?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Our detailed, personalized Kundali Matching report is typically delivered within 24-48 hours after receiving the required birth details. This ensures our astrologers have ample time to provide a thorough, insightful, and compassionate analysis.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq5" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Will my information remain confidential?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Absolutely. We treat every consultation with the utmost confidentiality and respect. Your personal details and birth information are never shared with third parties and are used solely for the purpose of your astrological analysis.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            )}
            {activeTab === 'Purchase' && (
              <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Purchase Kundali Matching</h2>
                <div className="flex justify-center">
                  <div className="w-full max-w-xl bg-gradient-to-br from-[#f3e8ff] via-[#e0f2fe] to-[#fdf6f2] rounded-3xl shadow-2xl border border-white/60 p-0 overflow-hidden relative" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)', backdropFilter: 'blur(8px)' }}>
                    {/* Dreamy Abstract Illustration */}
                    <div className="w-full h-44 bg-gradient-to-br from-[#e0e7ff] via-[#f3e8ff] to-[#fdf6f2] flex items-center justify-center">
                      {/* Replace with a real SVG/illustration as desired */}
                      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="50" cy="50" rx="40" ry="40" fill="#e0e7ff" />
                        <ellipse cx="70" cy="40" rx="15" ry="15" fill="#f3e8ff" />
                        <ellipse cx="35" cy="65" rx="10" ry="10" fill="#fdf6f2" />
                        <ellipse cx="60" cy="70" rx="7" ry="7" fill="#e0f2fe" />
                      </svg>
                    </div>
                    <div className="p-8 flex flex-col items-center gap-6">
                      <h3 className="text-2xl font-extrabold text-indigo-900 mb-2 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Kundali Matching Report
                      </h3>
                      <p className="text-gray-700 text-center mb-2" style={{ fontFamily: 'Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                        Get a comprehensive compatibility analysis, remedies, and expert guidance for a harmonious union. Delivered as a detailed, personalized report by our senior astrologers.
                      </p>
                      <ul className="list-disc list-inside text-gray-800 text-left mb-4 space-y-1" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>
                        <li>In-depth Guna Milan & Dosha analysis</li>
                        <li>Personalized remedies and upayas</li>
                        <li>Marriage timing & auspicious dates</li>
                        <li>Expert astrologer review</li>
                        <li>PDF report delivered to your email</li>
                      </ul>
                      <div className="w-full flex flex-col items-center gap-2 mb-4">
                        <span className="text-3xl font-extrabold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                          ₹{servicePrice}
                        </span>
                        <span className="text-sm text-gray-500">One-time fee, all taxes included</span>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                        <UniversalCartButton
                          productId="kundali-matching"
                          productName="Kundali Matching"
                          price={servicePrice}
                          isService={true}
                          variant="addToCart"
                          className="w-full md:w-auto text-base py-3 px-6 bg-black text-white rounded-lg shadow hover:bg-neutral-900 transition"
                        >
                          Add to Cart
                        </UniversalCartButton>
                        <UniversalCartButton
                          productId="kundali-matching"
                          productName="Kundali Matching"
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
            {/* Astrologer Profile below main content */}
            <div className="mt-12">
              <DrNarendraProfile />
            </div>
            {/* Call to Action */}
            <div className="text-center mt-12">
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Match Your Kundali Now</h2>
              <p className="text-lg mb-4 text-gray-700" style={{ fontFamily: 'Lato, Open Sans, sans-serif' }}>Get a detailed compatibility report from our expert astrologers.</p>
              <Button className="bg-gold text-black text-lg px-8 py-3 hover:bg-yellow-400 transition">
                Start Matching
              </Button>
            </div>
          </div>
          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            <AboutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}