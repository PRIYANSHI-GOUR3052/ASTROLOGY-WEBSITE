'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Zap, Shield, Clock, DollarSign, ClipboardList, BrainCircuit, Users, CalendarCheck, TrendingUp, Sun, Moon, Heart } from 'lucide-react';
import { DrNarendraProfile } from '../../components/DrNarendraProfile';
import { Statistics } from '../../components/Statistics';
import { ContactForm } from '../../components/ContactForm';

const tabs = ['Overview', 'Benefits', 'How To', 'FAQs'];

const benefits = [
    {
      icon: <Zap className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Instant Clarity', desc: 'Get immediate answers to your burning questions without the need to schedule an appointment weeks in advance.'
    },
    {
      icon: <Clock className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Convenience & Accessibility', desc: 'Chat with an astrologer from anywhere in the world, at any time, using just your phone or computer.'
    },
    {
      icon: <Shield className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Privacy & Anonymity', desc: 'Discuss your most personal concerns in a secure, confidential, and private one-on-one setting.'
    },
    {
      icon: <MessageSquare className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Interactive Dialogue', desc: 'Ask follow-up questions and get clarifications in real-time, ensuring a deeper and more thorough understanding.'
    },
    {
      icon: <DollarSign className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Cost-Effective', desc: 'Pay per minute for the time you use, making it an affordable way to get expert advice for specific questions.'
    },
    {
      icon: <ClipboardList className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Record of Conversation', desc: 'Receive a transcript of your chat session, so you can review the guidance and insights at any time.'
    },
    {
      icon: <BrainCircuit className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Focused Problem-Solving', desc: 'Ideal for tackling specific, urgent issues with targeted advice from a seasoned astrological expert.'
    },
    {
      icon: <Users className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Multiple Perspectives', desc: 'Easily connect with different astrologers to gain varied insights and find the expert who resonates most with you.'
    },
    {
      icon: <CalendarCheck className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Pre-Event Guidance', desc: 'Perfect for getting quick astrological advice before an important meeting, date, or decision.'
    },
    {
      icon: <TrendingUp className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Track Your Progress', desc: 'Use chat transcripts to track your personal growth and see how astrological guidance has impacted your journey over time.'
    },
    {
      icon: <Sun className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Daily Dilemmas', desc: 'Navigate small, everyday uncertainties with a quick cosmic check-in to ensure you are aligned with planetary energies.'
    },
    {
      icon: <Moon className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Understanding Transits', desc: 'Get real-time explanations of how current planetary transits are affecting you personally and how to navigate them.'
    },
    {
      icon: <Heart className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Relationship Insights', desc: 'Quickly get to the heart of a relationship dynamic or compatibility question with immediate, focused advice.'
    },
    {
      icon: <Star className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Learn Astrology', desc: 'Ask specific questions about your own chart to learn astrology in an interactive, personalized, and practical way.'
    },
    {
      icon: <Zap className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Emergency Support', desc: 'Provides crucial spiritual and strategic support during moments of crisis or high stress, right when you need it.'
    },
  ];

const faqs = [
  {
    q: 'Is this a chat with a real person or a bot?',
    a: 'This is a 100% live chat with a real, professional Vedic astrologer from our team. We do not use bots for our consultations.'
  },
  {
    q: 'What kind of questions can I ask?',
    a: 'You can ask anything! Common topics include love, relationships, career, finance, health, and spiritual growth. Whether it\'s a specific question or a general reading, our astrologers are here to help.'
  },
  {
    q: 'Do I need my exact birth time?',
    a: 'While an exact birth time allows for the most accurate analysis, our astrologers can still provide valuable insights using your date and place of birth through methods like Horary Astrology (Prashna).'
  },
  {
    q: 'Is my chat session private and confidential?',
    a: 'Absolutely. We use secure, encrypted technology, and all conversations are strictly confidential. Your privacy is our utmost priority.'
  },
  {
    q: 'What happens if I get disconnected during the chat?',
    a: 'Don\'t worry. Our system will allow you to reconnect with the same astrologer to continue your session from where you left off. Your paid minutes are protected.'
  },
  {
    q: 'Can I get a copy of my chat conversation?',
    a: 'Yes, after your session ends, you will have the option to receive a full transcript of your conversation via email for your personal records.'
  },
  {
    q: 'How are the astrologers selected?',
    a: 'Our astrologers undergo a rigorous vetting process. We verify their credentials, test their knowledge and predictive accuracy, and ensure they have years of practical experience and adhere to our strict ethical guidelines.'
  },
  {
    q: 'What if I am not satisfied with my consultation?',
    a: 'Your satisfaction is paramount. If you are not satisfied with your session, please contact our customer support within 24 hours. We will review your case and may offer a credit for another session with a different astrologer.'
  },
  {
    q: 'Can I chat with the same astrologer again?',
    a: 'Yes, of course. You can check the availability of your preferred astrologer and connect with them whenever they are online to build an ongoing guidance relationship.'
  },
  {
    q: 'Is there a time limit for chat sessions?',
    a: 'There is no fixed time limit. The session lasts as long as you need, based on the per-minute billing. You have complete control over the duration and cost of your consultation.'
  },
  {
    q: 'Can chat be as effective as a full-length phone or video call?',
    a: 'For specific, targeted questions, chat is incredibly effective and efficient. It allows for quick problem-solving. For a more comprehensive, in-depth life overview, a full-length consultation might be more suitable. Many clients use both services for different needs.'
  }
];


export default function ChatWithAstrologerPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white font-sans">
      <div className="container mx-auto pt-8 px-4 pb-16 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Chat with an Astrologer
          </h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-2xl font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Get instant answers to your pressing questions. Connect live with our expert astrologers for real-time guidance and clarity, anytime, anywhere.
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
            <p>In today&apos;s fast-paced world, waiting for answers isn&apos;t always an option. Our &quot;Chat with an Astrologer&quot; service is designed for your immediate needs, providing direct, one-on-one access to our team of seasoned professionals. This is not a chatbot; this is a live, confidential conversation with a real astrologer who is dedicated to providing you with insightful, personalized guidance. Whether you&apos;re facing a sudden dilemma, a nagging doubt, or a moment of curiosity, our experts are here to shed light on your path through the wisdom of the stars.</p>
            <p>The beauty of a live chat is its immediacy and interactivity. You can ask follow-up questions, seek clarification on complex topics, and build a real rapport with your guide. This dynamic format allows for a fluid exploration of your concerns, moving from one area of life to another as the conversation unfolds. From urgent questions about career and relationships to deeper inquiries about your spiritual journey or karmic patterns, our astrologers use their expertise to analyze your situation and provide clear, actionable advice in real-time.</p>
            <p>Our platform ensures complete privacy and security, allowing you to discuss sensitive matters with confidence and peace of mind. The process is simple and seamless: choose an available astrologer, start your session, and begin your dialogue. We believe that astrological guidance should be accessible, convenient, and, most importantly, empowering. Our chat service embodies this belief, putting profound cosmic wisdom directly at your fingertips, whenever you need it most.</p>
            <p>The core of our chat service relies on the ancient art of Prashna Shastra, or Horary Astrology. This powerful branch of Vedic astrology allows an astrologer to cast a chart for the exact moment a question is asked. This &quot;chart of the moment&quot; holds the seed of the answer, providing remarkably accurate insights even without a precise birth time. It&apos;s the perfect tool for the spontaneous and immediate nature of a live chat, enabling our experts to address your specific queries with stunning precision.</p>
            <p>Think of a chat session as a focused spiritual check-in. It&apos;s an opportunity to gain a cosmic perspective on a pressing issue, helping you see the situation from a higher vantage point. This shift in perspective can be incredibly liberating, transforming anxiety into understanding and indecision into confident action. Our astrologers are not just technicians; they are compassionate guides skilled in translating complex astrological language into practical, supportive, and easy-to-understand advice that you can apply to your life immediately.</p>
            <p>This service is particularly powerful for navigating the energies of planetary transits. Feeling unusually stressed or surprisingly lucky? A quick chat can reveal which planets are currently influencing your chart and how to best harness their energy. Understanding whether it&apos;s a challenging Saturn transit demanding patience or a benevolent Jupiter transit opening doors can empower you to work with the cosmic flow rather than against it, making your day-to-day life smoother and more productive.</p>
            <p>Beyond problem-solving, live chat serves as a fantastic learning tool. Curious about a specific placement in your birth chart? Want to understand the meaning of a particular yoga or dosha? You can ask specific, targeted questions and receive instant, personalized lessons from an expert. It&apos;s like having a personal astrology tutor on demand, helping you deepen your own understanding of this profound science in a way that is directly relevant to your own life story.</p>
            <p>Our commitment extends beyond just the technical accuracy of the reading. We emphasize a supportive and non-judgmental environment. Life is complex, and everyone&apos;s journey is unique. Our astrologers are here to listen with empathy and provide guidance that uplifts and validates your experience. The goal is to leave you feeling not just informed, but also seen, heard, and emotionally supported, with renewed confidence to face whatever lies ahead.</p>
            <p>The chat transcript you receive after the session is an invaluable resource. It&apos;s more than just a record; it&apos;s a written roadmap you can refer back to whenever you need a reminder of the guidance you received. In moments of doubt, re-reading the insights can recenter your focus and reinforce your confidence in the path you&apos;ve chosen. This allows the value of a single chat session to extend far beyond the time you spent online.</p>
            <p>One of the most powerful yet subtle benefits of a live chat is the psychological comfort it provides. In moments of high anxiety or uncertainty, the simple act of reaching out and receiving an immediate, intelligent, and compassionate response can be incredibly grounding. It&apos;s a form of in-the-moment support that acknowledges your concerns and provides a constructive, spiritual framework for understanding them. This process can instantly reduce feelings of isolation and stress, reminding you that you are not alone in your journey and that cosmic wisdom is available to support you.</p>
            <p>For those new or hesitant about astrology, a chat session offers the perfect entry point. It&apos;s less intimidating than a full-hour consultation and allows you to test the waters by asking a single, specific question. This low-commitment interaction lets you experience the accuracy and value of a live reading firsthand. Many of our long-term clients began with a single chat, and the clarity they received in those few minutes opened the door to a deeper, more transformative relationship with astrology and our expert guidance.</p>
            <p>The service is exceptionally useful for quick Muhurta (Electional Astrology) inquiries. Wondering if it&apos;s an auspicious time to launch a project, send an important email, or schedule a difficult conversation? A brief chat with an astrologer can provide a quick analysis of the current planetary energies, helping you choose a moment that is cosmically aligned for success. This practical application of astrology can give you a significant strategic advantage in both your personal and professional life.</p>
            <p>The anonymity of a chat format provides a unique safe space for discussing topics that might feel too sensitive or taboo for a face-to-face or even a voice conversation. Questions about deep-seated fears, intimate relationship issues, or personal habits can be explored with a degree of detachment and privacy that encourages total honesty. Our astrologers are trained to handle such inquiries with the utmost sensitivity and discretion, ensuring a judgment-free zone for your most private concerns.</p>
            <p>A skilled astrologer can deftly handle conflicting planetary energies within a chat. They can explain, for instance, why you might feel an optimistic pull from Jupiter while simultaneously feeling a restrictive push from Saturn. By breaking down these complex, simultaneous influences into clear, concise text, they help you understand the internal tug-of-war you might be experiencing. This clarification empowers you to navigate these mixed energies consciously, rather than feeling confused or conflicted by them.</p>
            <p>Don&apos;t underestimate the role of the astrologer&apos;s intuition, even in a text-based format. As they read your words, a seasoned guide tunes into the underlying energy and intention of your questions. They are not just analyzing data; they are connecting with you on a subtle level. This intuitive link, combined with their technical expertise, allows them to provide guidance that is not only astrologically sound but also deeply resonant and spiritually attuned to your unique situation.</p>
            <p>Engaging in frequent, brief chat sessions helps you build a personal relationship with the celestial bodies. Instead of seeing planets as distant, abstract forces, you begin to recognize their personalities and patterns in your daily life. Regular check-ins can feel like an ongoing conversation with the cosmos, fostering a sense of connection and co-creation with the universe. This demystifies astrology and transforms it into a living, breathing source of wisdom in your life.</p>
            <p>It&apos;s crucial to distinguish a live chat reading from a computer-generated report. An automated report can only state planetary positions; it cannot synthesize, interpret, or provide context. A live astrologer, however, brings wisdom, experience, and intuition to the reading. They can understand the nuance of your question, weigh the importance of different planetary influences, and tailor the guidance specifically to your unique life circumstances, offering a level of depth and personalization that a machine simply cannot replicate.</p>
            <p>Live chat is also an excellent tool for quick compatibility checks. Whether you&apos;re considering a new business partner, evaluating a potential romantic interest, or trying to understand a dynamic with a family member, a quick synopsis of the key synastry points can be incredibly revealing. An astrologer can instantly highlight the areas of harmony and potential friction, providing you with valuable intelligence for navigating your relationships more effectively.</p>
            <p>Perhaps most importantly, a chat session can serve as powerful validation for your own intuition. Often, you may already have a gut feeling about a situation. Hearing an astrologer independently confirm your intuitive insights through the language of the stars can be incredibly empowering. It builds confidence in your own inner guidance system and affirms that you are, indeed, in tune with your own path, providing the final push you need to act with conviction.</p>
            <p>The service acts as a powerful supplement to full-length consultations. After a comprehensive reading, new questions inevitably arise as you begin to process the information. A quick chat provides the perfect follow-up mechanism to clarify a point, ask about a new development, or get a quick check-in on your progress without needing to book another full session. This creates a continuous guidance loop, ensuring you always feel supported on your journey.</p>
            <p>Chat is an excellent medium for understanding remedial measures. If an astrologer has recommended a specific mantra, gemstone, or practice, you can use the chat service to ask clarifying questions as they arise. &ldquo;Is it better to start this chant on a Friday or a Sunday?&rdquo; or &ldquo;I feel restless after wearing this gemstone, is this normal?&rdquo; These quick, practical questions can be answered immediately, ensuring your remedial efforts are effective and correctly applied.</p>
            <p>Consider the chat service as your personal astrological journal, but with an expert guide. As you move through life&apos;s ups and downs, you can document significant events by having a quick chat about them. This creates a time-stamped, astrologically-contextualized record of your journey. Over time, you and your astrologer can review these chats to see larger patterns emerge, providing profound insights into your personal karmic cycles and growth.</p>
            <p>The bite-sized nature of chat makes complex astrological concepts more digestible. Instead of being overwhelmed by a dense report, you can learn about your chart piece by piece, at your own pace. A single session might focus solely on your Moon sign, another on your Saturn placement. This incremental learning process is less intimidating and more effective for long-term retention, gradually building your astrological literacy in a way that feels manageable and engaging.</p>
            <p>In moments of emotional turmoil, the objective and text-based nature of chat can be profoundly steadying. It filters out emotional intensity, allowing you to focus on the core issue and the astrological wisdom being shared. The astrologer acts as a calm, dispassionate anchor, providing a stable reference point when your own thoughts and feelings may be chaotic. This emotional distance can be a powerful tool for regaining perspective and making clear-headed decisions.</p>
            <p>Ultimately, our chat service is about making ancient wisdom profoundly practical. It bridges the gap between timeless cosmic knowledge and the immediate, real-world challenges and opportunities you face every day. It&apos;s a modern solution for the modern seeker, providing a direct, reliable, and empowering connection to the stars, helping you navigate your life with greater wisdom, clarity, and purpose.</p>
            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                <span className="text-indigo-600 font-medium">Core Principle:</span> To provide instant, confidential, and expert astrological guidance through a live, interactive chat experience, empowering you with the clarity to navigate life&apos;s questions.
            </div>
          </motion.div>
        )}
        
        {activeTab === 'Benefits' && (
            <section className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Benefits of Live Chat</h2>
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

        {activeTab === 'How To' && (
            <section className="mb-12">
                <h2 className="text-3xl font-bold text-indigo-900 mb-8 border-b pb-2 text-left" style={{ fontFamily: 'Playfair Display, serif' }}>How to Start Your Chat</h2>
                <div className="max-w-3xl mx-auto">
                    <ol className="space-y-8 relative border-l-2 border-indigo-200">
                        <li className="ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -left-4 ring-4 ring-white">1</span>
                            <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>Create Your Account</h3>
                            <p className="text-gray-600">Quickly sign up or log in to your Nakshatra Gyaan account.</p>
                        </li>
                        <li className="ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -left-4 ring-4 ring-white">2</span>
                            <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>Choose an Astrologer</h3>
                            <p className="text-gray-600">Browse our list of available experts. View their profiles, ratings, and areas of specialization to find the perfect match for you.</p>
                        </li>
                        <li className="ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-full -left-4 ring-4 ring-white">3</span>
                            <h3 className="font-bold text-xl text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>Start Your Chat</h3>
                            <p className="text-gray-600">Click the &ldquo;Chat&rdquo; button to instantly connect and begin your live consultation. Provide your birth details if needed and ask your questions.</p>
                        </li>
                    </ol>
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