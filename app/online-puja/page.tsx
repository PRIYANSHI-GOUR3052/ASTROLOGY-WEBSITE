// app/online-pooja/page.tsx
'use client';

import { useState } from 'react';
import { AboutSummary } from '../components/AboutSummary';
import { UniversalCartButton } from '../components/UniversalCartButton';
import { DrNarendraProfile } from '../components/DrNarendraProfile';
import { motion } from 'framer-motion';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function OnlinePujaPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Benefits', 'FAQs', 'Purchase', 'About'];
  const servicePrice = 5100;

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Heading */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>Online Puja Services</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
            Experience the sacred power of Vedic rituals from the comfort of your home. Our online puja services connect you with expert priests, authentic traditions, and divine blessings—no matter where you are in the world.
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
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>The Essence of Online Puja</h2>
                <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                  Online Puja is a modern bridge to ancient Vedic rituals, allowing you to invoke divine blessings, remove obstacles, and align your life with cosmic energies—no matter your location. At Nakshatra Gyaan, we bring the sanctity of the temple to your home, with every ceremony performed by experienced, compassionate priests who honor tradition and your unique intentions.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                  Whether you seek prosperity, health, peace, or spiritual growth, our online puja services are tailored to your needs. Each ritual is conducted live, with mantras, offerings, and sacred fire, and you can participate virtually, receive prasad, and connect with the divine in real time. Our process is transparent, authentic, and deeply transformative.
                </p>
                <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                  Join a global community of seekers who trust Nakshatra Gyaan for meaningful, accessible, and powerful spiritual experiences—wherever you are on your journey.
                </p>
              </section>
            )}
            {activeTab === 'Benefits' && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Online Puja</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Card 1 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-indigo-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <h3 className="text-xl font-semibold text-indigo-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Authentic Vedic Rituals</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Every puja is performed by highly trained priests, following precise Vedic procedures, mantras, and offerings—ensuring spiritual efficacy and authenticity.
                    </p>
                  </motion.div>
                  {/* Card 2 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-pink-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #ffe0f0 0%, #fdf6f2 100%)' }}>
                    <h3 className="text-xl font-semibold text-pink-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Personalized Intentions</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      We tailor each ceremony to your specific goals—be it health, wealth, relationships, or spiritual progress—so your prayers are heard and honored.
                    </p>
                  </motion.div>
                  {/* Card 3 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-green-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #e0ffe8 0%, #e0f2fe 100%)' }}>
                    <h3 className="text-xl font-semibold text-green-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Global Accessibility</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Participate in sacred rituals from anywhere in the world. Our online platform ensures you never miss an auspicious moment, regardless of distance.
                    </p>
                  </motion.div>
                  {/* Card 4 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-yellow-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #fffbe0 0%, #f3e8ff 100%)' }}>
                    <h3 className="text-xl font-semibold text-yellow-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Convenience & Comfort</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Join live ceremonies, interact with priests, and receive prasad—all from the comfort of your home, with flexible scheduling and seamless technology.
                    </p>
                  </motion.div>
                  {/* Card 5 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.0 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-blue-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #e0f7ff 0%, #f3e8ff 100%)' }}>
                    <h3 className="text-xl font-semibold text-blue-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Transparent & Trustworthy</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Watch your puja live, receive detailed reports, and trust in our transparent process—your faith and satisfaction are our highest priorities.
                    </p>
                  </motion.div>
                  {/* Card 6 */}
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1.1 }} viewport={{ once: true }} className="rounded-2xl shadow-lg p-8 border border-purple-100 flex flex-col gap-4" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0ffe8 100%)' }}>
                    <h3 className="text-xl font-semibold text-purple-700 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Spiritual Transformation</h3>
                    <p className="text-black text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Experience deep inner peace, healing, and spiritual upliftment as you participate in time-honored rituals that connect you to the divine.
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
                      What is an online puja and how does it work?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      An online puja is a sacred Vedic ritual performed by expert priests on your behalf, streamed live so you can participate virtually. You provide your intentions and details, join the ceremony online, and receive prasad and blessings at home.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq2" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Is online puja as effective as in-person rituals?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Yes. The power of a puja lies in the intention, mantras, and ritual precision. Our priests follow authentic procedures, and your participation—whether physical or virtual—invokes the same divine blessings.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq3" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      How do I prepare for my online puja?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      We provide clear instructions before your ceremony. You may be asked to set up a sacred space, light a lamp, and join the live stream with an open heart and mind. Our team guides you every step of the way.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq4" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Can I request a specific puja or deity?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Absolutely. We offer a wide range of pujas for different deities and intentions. Let us know your needs, and we will recommend or arrange the most suitable ritual for you.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq5" className="rounded-2xl shadow-lg border border-indigo-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #e0f2fe 100%)' }}>
                    <AccordionTrigger className="text-lg font-semibold text-indigo-900 px-6 py-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Is my information confidential?
                    </AccordionTrigger>
                    <AccordionContent className="text-black text-justify px-6 pb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                      Yes. Your privacy is our priority. All personal details and intentions shared for the puja are kept strictly confidential and used only for the purpose of your ceremony.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>
            )}
            {activeTab === 'Purchase' && (
              <section className="mb-12 text-lg leading-relaxed text-black space-y-6">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Purchase Online Puja</h2>
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
                        Online Puja Service
                      </h3>
                      <p className="text-gray-700 text-center mb-2" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', textAlign: 'justify' }}>
                        Book a personalized Vedic ritual, performed live by expert priests, for your chosen intention. Receive blessings, prasad, and a detailed report—wherever you are in the world.
                      </p>
                      <ul className="list-disc list-inside text-gray-800 text-left mb-4 space-y-1" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>
                        <li>Live-streamed ceremony with interactive participation</li>
                        <li>Customizable rituals for health, wealth, relationships, and more</li>
                        <li>Expert Vedic priests and authentic procedures</li>
                        <li>Prasad and report delivered to your home</li>
                        <li>Confidential, compassionate service</li>
                      </ul>
                      <div className="w-full flex flex-col items-center gap-2 mb-4">
                        <span className="text-3xl font-extrabold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                          ₹{servicePrice}
                        </span>
                        <span className="text-sm text-gray-500">One-time fee, all taxes included</span>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
                        <UniversalCartButton
                          productId="online-puja"
                          productName="Online Puja"
                          price={servicePrice}
                          isService={true}
                          variant="addToCart"
                          className="w-full md:w-auto text-base py-3 px-6 bg-black text-white rounded-lg shadow hover:bg-neutral-900 transition"
                        >
                          Add to Cart
                        </UniversalCartButton>
                        <UniversalCartButton
                          productId="online-puja"
                          productName="Online Puja"
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
            {activeTab === 'About' && (
              <section className="mb-12">
                <h2 className="text-4xl font-bold text-neutral-900 mb-10 border-b pb-3 tracking-tight" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em' }}>About Nakshatra Gyaan</h2>
                <div className="bg-white shadow-md p-8 rounded-2xl border border-neutral-200 mb-12">
                  <h3 className="font-bold text-2xl mb-6 text-neutral-800" style={{ fontFamily: 'Playfair Display, serif' }}>A Message from Our Founder</h3>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.15rem' }}>
                    &quot;Astrology is not just about glimpsing the future—it is a sacred mirror that reflects the soul&apos;s journey. It empowers us to understand who we truly are, to make choices in alignment with our higher self, and to walk through life with intention, grace, and spiritual clarity.
                  </p>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.15rem' }}>
                    At Nakshatra Gyaan, our purpose is to bridge the ancient science of the stars with the evolving consciousness of today&apos;s world—so that every individual, no matter where they are, can find meaning, healing, and direction.&quot;
                  </p>
                  <p className="text-neutral-700 font-semibold mt-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                    — Dr. Narendra Kumar Sharma<br />Founder, Nakshatra Gyaan
                  </p>
                </div>
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-5" style={{ fontFamily: 'Playfair Display, serif' }}>Our Legacy: A Journey Written in the Stars</h3>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-6" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.08rem' }}>
                    From humble beginnings to a global spiritual movement, Nakshatra Gyaan has remained rooted in its devotion to authentic, soul-guided astrology. Every milestone marks a step closer to fulfilling our mission—to bring timeless cosmic wisdom to those seeking truth, healing, and transformation.
                  </p>
                  <h4 className="text-xl font-bold text-neutral-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Key Milestones in Our Celestial Journey</h4>
                  <ul className="space-y-4 pl-4 border-l-2 border-neutral-200 mb-8">
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2002 — The Birth of a Vision:</span> Nakshatra Gyaan is founded by Dr. Narendra Kumar Sharma with a single mission—to democratize astrology and make it accessible, reliable, and spiritually enriching for all.</li>
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2010 — Spreading Light, One Soul at a Time:</span> After conducting over 100 in-person workshops across India, we embraced the digital space and began offering personalized online consultations to seekers worldwide.</li>
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2015 — Going Global with Grace:</span> Launch of our official online platform, enabling clients from more than 30 countries to receive in-depth astrological guidance, daily horoscopes, and life-transforming insights.</li>
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2020 — Expanding Our Mystical Offerings:</span> We broadened our services to include Vedic numerology, intuitive tarot readings, online Vedic rituals (pujas), and integrated mind-body-spirit healing practices, making Nakshatra Gyaan a holistic sanctuary for modern spirituality.</li>
                    <li className="text-neutral-800 text-justify" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.05rem' }}><span className="font-semibold">2024 — Serving a Global Spiritual Family:</span> Today, we proudly serve a global community of over 50,000 members, with more than 10,000 consultations delivered, touching lives with truth, compassion, and clarity.</li>
                  </ul>
                  <p className="text-neutral-800 text-justify leading-relaxed mb-4" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif', fontSize: '1.08rem' }}>
                    At Nakshatra Gyaan, we do not merely read charts—we listen to your soul, decode its celestial language, and guide you toward a life of alignment, fulfillment, and spiritual evolution. Our journey is fueled by love, our methods are guided by tradition, and our vision is illuminated by the stars.
                  </p>
                  <p className="text-neutral-900 text-justify font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Join us in awakening the cosmic wisdom within you.<br />Your path is written in the stars—and we&apos;re here to help you read it.
                  </p>
                </div>
              </section>
            )}
            {/* Dr. Narendra Profile below main content */}
            <div className="mt-12">
              <DrNarendraProfile />
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
