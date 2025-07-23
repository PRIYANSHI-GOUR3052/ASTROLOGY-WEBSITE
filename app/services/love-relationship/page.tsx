'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Star, Shield, Search, GitCompareArrows, Handshake, Sparkles, MessageCircle, HeartCrack, BookOpen, KeyRound, Link, Home, DollarSign, HeartHandshake, Users2, Undo2, Briefcase, TrendingUp, CalendarCheck } from 'lucide-react';
import { DrNarendraProfile } from '../../components/DrNarendraProfile';
import { Statistics } from '../../components/Statistics';
import { ContactForm } from '../../components/ContactForm';

const tabs = ['Overview', 'Benefits', 'FAQs'];

const benefits = [
    {
      icon: <GitCompareArrows className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Understand Compatibility', desc: 'Gain deep insights into your core compatibility, highlighting areas of natural harmony and potential friction.'
    },
    {
      icon: <Handshake className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Resolve Conflicts', desc: 'Identify the astrological roots of recurring disagreements and learn effective strategies to navigate them.'
    },
    {
      icon: <Sparkles className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Identify Soulmate Potential', desc: 'Explore the karmic and spiritual connections that indicate a deep, soul-level bond with your partner.'
    },
    {
      icon: <MessageCircle className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Improve Communication', desc: 'Learn how your planetary placements affect communication styles, helping you and your partner understand each other better.'
    },
    {
      icon: <HeartCrack className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Healing Past Wounds', desc: 'Understand how past relationship karma affects your present and receive guidance on healing and moving forward.'
    },
    {
      icon: <Star className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Auspicious Timing', desc: 'Discover favorable timings (Muhurta) for important relationship milestones like marriage or engagement.'
    },
    {
      icon: <Link className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Strengthen Your Bond', desc: 'Discover shared life goals and karmic purposes that can create a more profound and meaningful connection.'
    },
    {
      icon: <Home className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Navigate Family Dynamics', desc: 'Understand how family-related planetary influences (from both sides) impact your relationship and learn to manage them.'
    },
    {
      icon: <DollarSign className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Financial Compatibility', desc: 'Assess financial indicators in both charts to create a shared vision and strategy for prosperity as a couple.'
    },
    {
      icon: <HeartHandshake className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Boost Intimacy', desc: 'Uncover the astrological keys to emotional and physical intimacy, helping you connect on a deeper, more passionate level.'
    },
    {
      icon: <Users2 className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Parenting Style Insights', desc: 'Explore planetary influences on parenting styles to understand how you can work together harmoniously as future parents.'
    },
    {
      icon: <Undo2 className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Overcome Karmic Baggage', desc: 'Identify and understand karmic debts or patterns from past lives that may be affecting your current relationship.'
    },
    {
      icon: <Briefcase className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Support Career Growth', desc: 'Learn how to best support each other\'s career ambitions based on the professional houses in your respective charts.'
    },
    {
      icon: <TrendingUp className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Personal Growth Catalyst', desc: 'See how your partner acts as a mirror for your own growth, highlighting areas where you can evolve as an individual.'
    },
    {
      icon: <CalendarCheck className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Plan for the Future', desc: 'Use astrological timing to plan major life events together, ensuring you act when the cosmic energies are most supportive.'
    },
  ];

const faqs = [
  {
    q: 'What is a love and relationship astrology reading?',
    a: 'It is a detailed analysis of your and your partner\'s birth charts, both individually and combined (a technique called Synastry). It reveals the dynamics, strengths, challenges, and ultimate potential of your relationship.'
  },
  {
    q: 'Can this reading help if I am single?',
    a: 'Absolutely. By analyzing your chart, we can reveal your relationship patterns, the type of partner you are likely to attract, and favorable periods for meeting someone significant. It empowers you to attract a healthy relationship.'
  },
  {
    q: 'Do you need the birth details of both partners?',
    a: 'For a comprehensive compatibility analysis (Synastry), the birth details (date, time, and place) of both individuals are ideal. However, valuable insights can still be gained from analyzing just one chart.'
  },
  {
    q: 'Can astrology predict if we will get married or break up?',
    a: 'Astrology highlights potentials and probabilities, not absolute certainties. It can show strong indicators for marriage or challenges that could lead to a breakup. Ultimately, how you use this information (your free will) plays the most significant role in the outcome.'
  },
  {
    q: 'What is the difference between Synastry and a Composite Chart?',
    a: 'Synastry compares the two individual charts, showing how your planets interact with each other. A Composite Chart creates a single, new chart representing the relationship itself as a third entity. We often use both techniques for a complete picture.'
  }
];


export default function LoveRelationshipPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white font-sans">
      <div className="container mx-auto pt-8 px-4 pb-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Love & Relationship Analysis
          </h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-2xl font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Unlock the cosmic secrets of your heart. Understand your relationship dynamics, compatibility, and karmic connections through the timeless wisdom of astrology.
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
            <p>Relationships are the cornerstone of a meaningful life, yet they are often our greatest challenge. Vedic Astrology offers a profound and unparalleled lens through which to understand the intricate dynamics of love, partnership, and compatibility. A Love & Relationship Analysis goes far beyond simplistic sun-sign comparisons, delving deep into the cosmic DNA of two individuals to reveal the true nature of their bond. By examining the precise placements of planets in each person&apos;s birth chart, we can uncover the karmic contracts, inherent strengths, and potential friction points that define a relationship.</p>
            <p>The primary technique used in this analysis is <span className="font-bold text-indigo-900">Synastry</span>, the art of comparing two birth charts. We analyze how your planets interact with your partner&apos;s. For example, a harmonious connection (a trine or sextile) between your Moon (emotions) and their Sun (ego) suggests a natural ease and understanding. Conversely, a challenging aspect (a square or opposition) between your Mars (action, desire) and their Saturn (restriction, discipline) might indicate areas where frustration and conflict can arise. Understanding these interactions is the first step to navigating them consciously and lovingly.</p>
            <p>Beyond Synastry, we often create a <span className="font-bold text-indigo-900">Composite Chart</span>. This is a fascinating technique where we calculate the mathematical midpoint between your and your partner&apos;s planets to create a single, unified chart for the relationship itself. This chart describes the purpose and destiny of the relationship as a third entity. It answers questions like: What is the core purpose of this partnership? How does the outside world perceive us as a couple? What are our shared strengths and weaknesses? The Composite Chart provides a roadmap for the journey you are on together.</p>
             <p>A comprehensive analysis also involves examining the 7th House (the house of partnership) in each chart, the condition of Venus (the planet of love and romance), and Jupiter (for wisdom and expansion in the relationship). We also look at the Dasha (planetary period) sequence for both individuals to identify periods of ease or challenge in relationship matters. This multi-layered approach ensures a holistic and deeply insightful reading, providing you with practical guidance to nurture your bond and overcome obstacles.</p>
            <p>The role of the Ascendant, or Lagna, is foundational. It represents your core identity and how you approach life. In a relationship analysis, we assess the synergy between the two Ascendants and their ruling planets. When your Ascendant lord is in harmony with your partner&apos;s chart, it signifies a fundamental compatibility in your life paths and purposes, creating a relationship that feels naturally supportive and aligned with who you are.</p>
            <p>While Venus governs romance, the Moon represents our &apos;Manas&apos; – our mind, emotions, and deepest needs. True, lasting compatibility is often found in the connection between the two Moons. A harmonious Moon-to-Moon aspect suggests a profound intuitive understanding and emotional resonance. It means you feel &apos;at home&apos; with each other, creating the emotional security that is vital for a long-term partnership to flourish.</p>
            <p>For deeper insights, we meticulously analyze the Navamsha (D9) chart, considered the single most important divisional chart for marriage. If the main birth chart is the tree, the D9 chart is the fruit, revealing the ultimate promise and inner reality of your relationships. Strong compatibility seen in the Navamsha can often overcome challenges present in the main birth chart, indicating a powerful, destined connection.</p>
            <p>The karmic axis of Rahu and Ketu holds significant sway over our relationships. When these nodes are active across the 1st and 7th houses in a synastry chart, it often points to a powerful karmic connection with lessons to be learned about self and other. These relationships can feel fated and intensely magnetic, and our analysis helps you understand the purpose behind this bond and how to navigate its transformative energy.</p>
            <p>A key element of our analysis is the often-misunderstood &apos;Kuja Dosha&apos; or Mars affliction. Specific placements of Mars can introduce excess fire, anger, or competition into a relationship. However, a proper analysis goes beyond simply identifying this placement. We assess its true intensity and, crucially, look for numerous cancellation factors that can completely nullify its negative effects, providing a clear and fear-free perspective.</p>
            <p>We distinguish between the 5th House, which governs romance, love affairs, and flirtation, and the 7th House, which rules committed partnerships and marriage. A couple may have fantastic 5th house connections, indicating a fun and passionate romance, but a strong 7th house connection is essential for the relationship to mature into a stable, lasting union. Our analysis examines both to give you a complete view of the relationship&apos;s potential.</p>
            <p>Using advanced Jaimini astrology techniques, we also assess the Upapada Lagna (UL). This is a special calculated point in the chart that specifically signifies the institution of marriage and the nature of the spouse. The condition of the UL and its lord provides a unique and remarkably accurate layer of insight into the quality, longevity, and overall experience of your married life.</p>
            <p>The dignity of the planets is paramount. It&apos;s not enough to see that your Venus aspects your partner&apos;s Mars; we must assess the condition, or dignity, of those planets. A well-dignified planet (exalted, in its own sign) brings its highest qualities to the relationship, fostering love and harmony. A poorly-dignified planet can introduce challenges. This qualitative analysis is key to understanding the true nature of the energy exchange between you.</p>
            <p>A relationship&apos;s potential, as promised in the charts, is only activated by timing. We analyze the Dasha sequences (major planetary periods) and Gochara (transits) for both partners to identify windows of opportunity for love, as well as periods that may test the relationship&apos;s strength. This understanding of timing empowers you to be proactive, preparing for challenges and seizing opportunities to deepen your bond.</p>
            <p>Finally, our analysis is not about a deterministic judgment but about empowerment through understanding. By illuminating the cosmic forces at play, we provide you with a roadmap. This map shows you the smoothest paths, the potential roadblocks, and the scenic routes. Armed with this knowledge, you can make conscious choices, appreciate your partner&apos;s perspective, and co-create a relationship filled with more love, compassion, and understanding.</p>
            <p>A level of analysis that offers incredible nuance is the examination of Nakshatras, or lunar mansions. Each of the 27 Nakshatras has its own unique personality, deity, and symbolism. True compatibility often goes beyond planetary aspects and is found in the synergy between the Nakshatras of key planets, especially the Moon. We analyze specific compatibility techniques like &apos;Ashtakoota Milan&apos; (an eight-fold matching system), which assesses factors like temperament (Gana Koota), spiritual compatibility (Nadi Koota), and mutual affection (Bhakoot Koota), providing a detailed percentage score of the match&apos;s potential for long-term happiness.</p>
            <p>To add a quantitative layer to our qualitative analysis, we utilize the Ashtakavarga system. This complex method assigns benefic points to each house based on the positions of all the planets relative to each other and to the Ascendant. By assessing the point score in the 7th house (partnership), 5th house (romance), and for planets like Venus, we can numerically gauge the inherent strength and supportiveness of these areas in your life. A high score suggests ease and flow in relationships, while a low score might indicate areas that require more conscious effort and attention to navigate successfully.</p>
            <p>While planets like Venus and Jupiter are celebrated for bringing love and joy, the role of Saturn is equally crucial, albeit more sobering. Saturn is the planet of karma, discipline, reality, and longevity. A strong and positive connection between one person&apos;s Saturn and another&apos;s personal planets can be the very glue that holds a relationship together through thick and thin, signifying unwavering commitment and loyalty. Conversely, challenging Saturnine aspects can bring feelings of restriction, delay, or criticism, but they also offer profound lessons in patience, maturity, and taking responsibility for one&apos;s role in the partnership.</p>
            <p>While the Navamsha (D9) is critical for marriage, other divisional charts, or Vargas, add further layers of specific insight. The Saptamsha (D7) chart, for instance, provides a focused view on children, legacy, and the creative fruits of the relationship. The Dwadasamsa (D12) chart reveals the influence of parental lineage and ancestral karma on the partnership. By synthesizing information from these specialized charts, we can understand how the relationship will function across different domains of life, from creative expression to family legacy.</p>
            <p>A key principle of Vedic Astrology is that &apos;forewarned is forearmed.&apos; Our analysis doesn&apos;t end with simply identifying challenges; it aims to provide solutions. When difficult planetary placements or periods are identified, we offer personalized and effective remedial measures (Upayas). These are not magic spells but are practical tools to harmonize planetary energies. They can range from recommending specific gemstones to wear, chanting powerful mantras associated with certain planets, practicing charity, or performing specific pujas (rituals). These remedies empower you to actively participate in softening karmic difficulties and enhancing the positive potential within your relationship.</p>
          </motion.div>
        )}
        
        {activeTab === 'Benefits' && (
            <section className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Relationship Analysis</h2>
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