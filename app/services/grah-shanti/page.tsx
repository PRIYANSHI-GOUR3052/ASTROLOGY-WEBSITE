'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Shield, TrendingUp, Sparkles, Home, BrainCircuit, Heart, Briefcase, HeartHandshake, Zap } from 'lucide-react';
import { DrNarendraProfile } from '../../../app/components/DrNarendraProfile';
import { Statistics } from '../../../app/components/Statistics';
import { ContactForm } from '../../../app/components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs', 'Book Puja'];

const benefits = [
    {
        icon: <Shield className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Neutralize Negative Influences',
        desc: 'Pacify malefic planets and protect yourself from their adverse effects on your health, career, and relationships.'
    },
    {
        icon: <TrendingUp className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Enhance Positive Energies',
        desc: 'Strengthen the positive influence of benefic planets in your chart to attract success, abundance, and growth.'
    },
    {
        icon: <Sparkles className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Remove Obstacles',
        desc: 'Clear astrological blockages that cause delays, struggles, and unforeseen challenges in your path.'
    },
    {
        icon: <Home className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Promote Peace & Harmony',
        desc: 'Restore tranquility and harmony within your home and family by calming planetary conflicts.'
    },
    {
        icon: <BrainCircuit className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Gain Mental Clarity',
        desc: 'Reduce mental anguish, confusion, and anxiety caused by afflicted planets like the Moon, Rahu, and Ketu.'
    },
    {
        icon: <Heart className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Improve Health & Well-being',
        desc: 'Mitigate health issues associated with specific planetary afflictions and promote overall vitality.'
    },
    {
        icon: <Briefcase className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Career & Financial Stability',
        desc: 'Overcome professional hurdles and financial instability by appeasing planets that govern these areas of life.'
    },
    {
        icon: <HeartHandshake className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Harmonize Relationships',
        desc: 'Resolve conflicts and foster understanding in personal and professional relationships affected by planetary discord.'
    },
    {
        icon: <Zap className="text-indigo-400 w-8 h-8 mb-2" />,
        title: 'Accelerated Karmic Healing',
        desc: 'Speed up the resolution of past karmic debts, lessening their impact and paving the way for a brighter future.'
    },
];

const faqs = [
    {
        q: 'What is a Grah Shanti Puja?',
        a: "A Grah Shanti Puja is a sacred Vedic ritual performed to appease the nine planets (Navagrahas) and reduce their negative effects (doshas) in a person's life, as indicated by their birth chart. The goal is to restore cosmic balance and attract peace and prosperity."
    },
    {
        q: 'How do I know if I need a Grah Shanti Puja?',
        a: "If you are experiencing persistent challenges, delays, conflicts, or health issues despite your best efforts, it could be due to malefic planetary influences. An astrological consultation can analyze your birth chart to determine if a Grah Shanti Puja is recommended for you."
    },
    {
        q: 'Is the puja performed for all nine planets at once?',
        a: "It depends on the individual's chart. Sometimes a general Navagraha Puja is performed for overall harmony. More often, the puja is focused on a specific planet that is causing the most trouble (e.g., a Shani Shanti Puja for Saturn or a Rahu Puja)."
    },
    {
        q: 'Can this puja be performed remotely?',
        a: "Yes. Our learned priests can perform the puja on your behalf. You will be given the specific timings, and you can participate mentally or via live stream from your location. The positive vibrations and blessings will reach you regardless of your physical presence."
    },
    {
        q: 'What details are required for the puja?',
        a: "We typically require your full name, your date, time, and place of birth, and your Gotra (if known). A 'Sankalpa' (statement of purpose) will be taken in your name before the ritual begins."
    },
    {
        q: 'How long does it take to see the effects of the puja?',
        a: "The effects can vary from person to person. Some people experience a sense of peace and clarity immediately, while for others, the positive changes unfold gradually over several weeks or months. The sincerity of your faith and your own karmic patterns also play a role."
    },
];


export default function GrahShantiPage() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        placeOfBirth: "",
        timeOfBirth: "",
        message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white font-sans">
            <div className="container mx-auto pt-8 px-4 py-16 relative z-10">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Grah Shanti Puja & Remedies</h1>
                    <p className="text-xl md:text-2xl text-center text-gray-700 max-w-3xl font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                        Harmonize planetary energies in your life for peace, prosperity, and spiritual well-being through sacred Vedic rituals.
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
                        <p>In the cosmic theatre of life, the <span className="font-bold text-indigo-900">Navagrahas</span>, or nine planets, are the primary celestial actors influencing the script of our lives. According to Vedic astrology, our destiny is intricately woven with the positions of these planets at the time of our birth. When these planets are favorably placed, they bestow blessings of health, wealth, and happiness. However, when they are in malefic positions or afflicted, they can create significant obstacles, known as 'Doshas', leading to struggles, conflicts, and challenges. A <span className="font-bold text-indigo-900">Grah Shanti Puja</span> is a powerful and time-honored Vedic remedy designed to appease these planetary deities and mitigate their negative effects.</p>
                        <p>The term 'Grah' means 'planet' and 'Shanti' means 'peace'. A Grah Shanti Puja is therefore a ritual to establish peace and harmony with the planetary energies that govern our lives. This is not about changing one's destiny but about smoothing the fated path. It is a sacred appeal to the cosmic forces, seeking their compassion and grace to reduce suffering and enhance positive outcomes. The puja involves intricate rituals, including the chanting of specific planetary mantras (hymns), making offerings (like grains, flowers, and ghee) into a sacred fire (Homa), and performing acts of charity, all aimed at harmonizing the energetic frequency of the afflicted planets.</p>
                        <p>Each planet governs specific aspects of our lives. An afflicted Sun can cause issues with authority and self-esteem; a weak Moon can lead to emotional turmoil; malefic Mars can trigger aggression and accidents; a troubled Mercury affects communication and intellect. Similarly, Jupiter governs wisdom and fortune, Venus rules love and luxury, and Saturn is the great karmic teacher, responsible for discipline and longevity. The shadow planets, Rahu and Ketu, are karmic entities that can cause sudden, unexpected events, confusion, and spiritual blockages. A Grah Shanti Puja is highly personalized, targeting the specific planets that require pacification based on a thorough analysis of an individual's birth chart.</p>
                        <p>The core of the puja lies in the power of sound vibration (Mantra) and intention (Sankalpa). The priest, on behalf of the individual, takes a Sankalpa, a sacred vow stating the purpose of the puja. Then, thousands of repetitions of the specific planetary mantras are chanted with precision and devotion. This process creates a powerful field of positive energy that is believed to neutralize the negative vibrations of the malefic planets. It is a profound act of acknowledging the cosmic laws of karma and humbly seeking to realign oneself with the dharma (righteous path), thereby inviting divine grace and intervention to ease life's journey.</p>
                        <p>Beyond individual planets, the timing of these pujas is often aligned with specific planetary transits or periods (Dashas) to maximize their efficacy. Performing a puja during a planet's own day, or when it is transiting a sensitive point in the birth chart, can amplify the ritual's power. For instance, a Shani (Saturn) Shanti Puja is often recommended during the challenging Sade Sati period. This strategic timing ensures that the healing energies are directed with maximum precision, addressing the karmic lessons presented by the planets at the most opportune moment for spiritual intervention and relief.</p>
                        <p>A Grah Shanti Puja is not a one-time magic fix but a part of a holistic approach to spiritual well-being. The benefits of the puja are best sustained when accompanied by personal lifestyle changes. This can include wearing specific gemstones to strengthen benefic planets, fasting on certain days of the week, donating specific items related to the afflicted planet, and engaging in personal prayer or meditation. The puja acts as a powerful catalyst, clearing the path, but personal effort and a sattvic (pure) lifestyle help in maintaining the newfound harmony and preventing the recurrence of planetary afflictions.</p>
                        <p>The Homa, or sacred fire ceremony, is a central component of the Grah Shanti Puja. The fire god, Agni, is revered as a divine messenger who carries the offerings and prayers from the earthly plane to the celestial realms and the planetary deities. Every herb, grain, and drop of ghee offered into the fire has a specific symbolic meaning and energetic property designed to appease a particular Grah. This ritual of transformation—turning physical offerings into subtle energy—is a deeply powerful process that purifies the environment and the aura of the individual for whom the puja is being performed.</p>
                        <p>It's important to understand that Grah Shanti is not about fearing the planets. In Vedic philosophy, the planets are seen as agents of karma, delivering the results of our past actions, both good and bad. They are cosmic teachers, and their challenging periods are opportunities for immense spiritual growth. A Grah Shanti Puja is an act of acknowledging this cosmic law with humility. It is a way of saying, "I understand the lesson you are here to teach me, and I am making a conscious effort to learn it with grace." This shift in perspective, from fear to reverence, is a key part of the healing process.</p>
                        <p>The blessings of a Grah Shanti Puja extend beyond the individual to their entire family. The positive vibrations generated by the ritual create a shield of spiritual protection around the home, fostering an environment of peace, understanding, and mutual support. By healing the astrological chart of one member, the karmic balance of the entire family system is often uplifted. This makes the puja a powerful tool not just for personal problem-solving but for enhancing the collective happiness and well-being of one's loved ones.</p>
                        <p>Ultimately, a Grah Shanti Puja is an investment in your spiritual and material peace. It is an act of proactive self-care that addresses the root energetic causes of your struggles, rather than just managing the symptoms. By aligning yourself with the universal rhythms and seeking the grace of the Navagrahas, you empower yourself to navigate your life's journey with greater resilience, clarity, and confidence. It is a sacred process that helps you clear karmic debts, unlock your true potential, and invite more light and harmony into your existence.</p>
                    </motion.div>
                )}

                {activeTab === 'Benefits' && (
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Grah Shanti Puja</h2>
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

                {activeTab === 'Book Puja' && (
                    <section className="mb-12">
                        <div className="rounded-3xl bg-gradient-to-r from-[#e0f7fa] via-[#f3e8ff] to-[#e0f2fe] p-10 shadow-xl border border-indigo-100 flex flex-col items-center">
                            <h2 className="text-3xl font-bold text-indigo-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Book Your Grah Shanti Puja</h2>
                            <p className="text-lg text-center mb-6" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                                To book a personalized Grah Shanti Puja, please provide your birth details below so our astrologers can analyze your chart.
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
                                <div>
                                    <label className="text-indigo-900 block mb-2 font-semibold">Your Message or Specific Problems</label>
                                    <Textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-white/80 text-indigo-900 border border-indigo-200 rounded-lg px-4 py-2 w-full h-32" />
                                </div>
                                <Button type="submit" className="w-full bg-indigo-700 text-white hover:bg-indigo-800 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105">
                                    Submit Inquiry
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