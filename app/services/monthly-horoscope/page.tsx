'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, TrendingUp, HeartHandshake, Briefcase, Shield, DollarSign, Target, Lightbulb } from 'lucide-react';
import { DrNarendraProfile } from '../../../app/components/DrNarendraProfile';
import { Statistics } from '../../../app/components/Statistics';
import { ContactForm } from '../../../app/components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs', 'Get Your Report'];

const benefits = [
    {
        icon: <CalendarDays className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Strategic Monthly Planning',
        desc: 'Gain a cosmic roadmap for the month ahead, allowing you to plan your actions for maximum success and impact.'
    },
    {
        icon: <TrendingUp className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Identify Opportunities & Trends',
        desc: 'Understand the key planetary transits and how you can leverage them to seize opportunities for growth.'
    },
    {
        icon: <HeartHandshake className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Relationship Guidance',
        desc: 'Get insights into the emotional currents of the month, helping you navigate your personal and professional relationships.'
    },
    {
        icon: <Briefcase className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Career Forecast',
        desc: 'Receive guidance on your professional life, including favorable times for projects, meetings, and career moves.'
    },
    {
        icon: <Shield className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Navigate Challenges',
        desc: 'Be forewarned about potential challenging periods or planetary conflicts, allowing you to prepare and mitigate risks.'
    },
    {
        icon: <DollarSign className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Financial Insights',
        desc: 'Understand the financial energies of the month, highlighting periods for investment, caution, and gains.'
    },
    {
        icon: <Target className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Focus on Key Life Areas',
        desc: 'Discover which areas of your life (love, work, health) will be most active, helping you direct your energy effectively.'
    },
    {
        icon: <Lightbulb className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Gain Deeper Self-Awareness',
        desc: 'Use the monthly themes as a tool for self-reflection and personal development, aligning with your spiritual path.'
    },
];

const faqs = [
    {
        q: "What's the difference between a daily and monthly horoscope?",
        a: "A daily horoscope focuses on very short-term planetary movements, like the Moon's transit, offering immediate guidance. A monthly horoscope provides a broader, more strategic view, analyzing slower-moving planetary transits to identify the major themes, opportunities, and challenges for the entire month."
    },
    {
        q: 'How is a monthly horoscope calculated?',
        a: "It's based on the major planetary transits (like the Sun, Mercury, Venus, Mars) through the zodiac signs and how they interact with the placements in your personal birth chart. This provides a more in-depth and impactful forecast than generic sun-sign horoscopes."
    },
    {
        q: 'Can a monthly horoscope help me make better decisions?',
        a: 'Absolutely. By understanding the energetic landscape of the month, you can time your decisions more effectively. It helps you know when to push forward, when to wait, when to focus on career, and when to nurture relationships, leading to more conscious and successful choices.'
    },
    {
        q: 'Is this a generic or personalized report?',
        a: 'The service offered here is for a detailed, personalized monthly report. While general horoscopes exist, a personalized report is created by analyzing the monthly transits in direct relation to your unique birth chart, offering far more accurate and relevant guidance.'
    },
    {
        q: 'What information do you need for a personalized report?',
        a: "To create a personalized report, we need your full name, and your accurate date, time, and place of birth. This allows us to cast your unique birth chart, which is the foundation of the analysis."
    },
    {
        q: 'How will I receive my monthly report?',
        a: "After you submit your details and the request is processed, your personalized monthly horoscope report will be compiled by our expert astrologers and delivered to you via email as a detailed PDF document."
    },
];


export default function MonthlyHoroscopePage() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        placeOfBirth: "",
        timeOfBirth: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white font-sans">
            <div className="container mx-auto pt-8 px-4 py-16 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Monthly Horoscope Analysis</h1>
                    <p className="text-xl md:text-2xl text-center text-gray-700 max-w-3xl font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                        Plan your month ahead with detailed astrological insights and cosmic guidance for every zodiac sign.
                    </p>
                </motion.div>

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

                {activeTab === 'Overview' && (
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif', textAlign: 'justify' }}>
                        <p>While a daily horoscope offers a snapshot, a <span className="font-bold text-indigo-900">Monthly Horoscope</span> provides a panoramic view of the cosmic landscape ahead. It is an invaluable strategic tool for anyone looking to navigate their life with greater foresight and wisdom. By analyzing the slower and more impactful planetary transits over the course of the month, this analysis reveals the overarching themes, dominant energies, and significant opportunities that will shape your coming weeks. It moves beyond the immediate to give you a framework for proactive and conscious living.</p>
                        <p>Our personalized Monthly Horoscope goes deep into how major planetary movements—such as the Sun's journey through a new sign, Mercury's communication cycles (including retrogrades), and the dynamic shifts of Venus and Mars—will interact with your unique birth chart. This creates a highly relevant and practical guide. We identify which houses (areas of life) in your chart will be activated, helping you understand where to focus your energy: be it career, relationships, health, or personal projects. This is not generic advice; it is a tailored cosmic weather report for your soul.</p>
                        <p>Understanding the flow of the month empowers you to make aligned decisions. A Monthly Horoscope can highlight auspicious periods for launching a new project, having important conversations, or making financial investments. Conversely, it can warn you of potential periods of conflict, misunderstanding, or low energy, advising you to act with more caution and patience. This knowledge transforms you from a passive recipient of fate into an active co-creator of your reality, allowing you to work with the planetary energies, not against them.</p>
                        <p>Ultimately, a Monthly Horoscope is a guide for personal growth and empowerment. It provides a rhythm and a narrative to the month, helping you to understand the 'why' behind the events and feelings you experience. By seeing the bigger picture, you can handle challenges with more grace, seize opportunities with more confidence, and ensure that your actions are in harmony with the celestial tides. It is an essential tool for anyone serious about living a conscious, purposeful, and successful life.</p>
                    </motion.div>
                )}

                {activeTab === 'Benefits' && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of a Monthly Horoscope</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    <h3 className="font-bold text-lg mb-2 text-indigo-900 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
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

                {activeTab === 'Get Your Report' && (
                    <section className="mb-12">
                        <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#e0f2fe] p-10 shadow-xl border border-indigo-100 flex flex-col items-center">
                            <h2 className="text-3xl font-bold text-indigo-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Request Your Personalized Monthly Report</h2>
                            <p className="text-lg text-center mb-6 text-black" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                                To receive a detailed, personalized monthly horoscope, please provide your birth details below.
                            </p>
                            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="text-indigo-900 block mb-2 font-semibold">Full Name</label>
                                        <Input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full" required />
                                    </div>
                                    <div>
                                        <label className="text-indigo-900 block mb-2 font-semibold">Email</label>
                                        <Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full" required />
                                    </div>
                                    <div>
                                        <label className="text-indigo-900 block mb-2 font-semibold">Phone Number</label>
                                        <Input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full" required />
                                    </div>
                                    <div>
                                        <label className="text-indigo-900 block mb-2 font-semibold">Date of Birth</label>
                                        <Input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full" required />
                                    </div>
                                     <div>
                                        <label className="text-indigo-900 block mb-2 font-semibold">Place of Birth (City, Country)</label>
                                        <Input type="text" value={formData.placeOfBirth} onChange={(e) => setFormData({...formData, placeOfBirth: e.target.value})} className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full" required />
                                    </div>
                                    <div>
                                        <label className="text-indigo-900 block mb-2 font-semibold">Time of Birth</label>
                                        <Input type="time" value={formData.timeOfBirth} onChange={(e) => setFormData({...formData, timeOfBirth: e.target.value})} className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full" required />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full bg-indigo-700 text-white hover:bg-indigo-800 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105">
                                    Submit Request
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
    );
} 