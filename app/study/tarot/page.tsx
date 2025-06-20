'use client';
import React, { useState } from 'react';
import { AnimatedStars } from '../../components/AnimatedStars';
import { MysticBackground } from '../../components/MysticBackground';
import { motion } from 'framer-motion';
import { FAQSection } from '../../components/FAQSection';
import { DrNarendraProfile } from '../../components/DrNarendraProfile';
import { Statistics } from '../../components/Statistics';
import { ContactForm } from '../../components/ContactForm';
import Image from 'next/image';

const tabs = ['Overview', 'Card Meanings', 'Reading Techniques', 'FAQs'];

const faqs = [
  {
    q: 'What is the difference between Major and Minor Arcana?',
    a: "The Major Arcana consists of 22 cards representing significant life events and spiritual lessons, while the Minor Arcana's 56 cards deal with day-to-day matters and mundane aspects of life. Together, they provide a comprehensive view of life's journey."
  },
  {
    q: 'How accurate are tarot readings?',
    a: "Tarot readings are tools for insight and guidance rather than definitive predictions. Their accuracy depends on the reader's skill, the querent's openness, and the understanding that cards offer possibilities rather than fixed outcomes."
  },
  {
    q: 'Can anyone learn to read tarot cards?',
    a: "Yes, anyone can learn to read tarot cards with dedication and practice. It requires studying the card meanings, developing intuition, and understanding the various spreads and their interpretations."
  },
  {
    q: 'How often should I get a tarot reading?',
    a: "The frequency of readings depends on personal needs, but it's generally recommended to allow time between readings for situations to develop. Monthly or quarterly readings are common, while daily readings might lead to dependency."
  }
];

export default function TarotPage() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="flex justify-center items-center py-12">
        <div className="w-full max-w-5xl rounded-3xl shadow-lg px-6 py-12 md:px-16 md:py-16 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-100">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-center mb-2 text-black" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Tarot Card Reading
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-black" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            टैरो कार्ड रीडिंग
          </h2>
          <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto">
            Explore the ancient art of tarot and discover how the cards reveal your story, strengths, and destiny.
          </p>
        </div>
      </div>
      <div className="bg-gradient-to-b from-nebula-indigo via-cosmic-purple to-celestial-blue">
        <AnimatedStars />
        <MysticBackground>
          <div className="container mx-auto px-4 py-16 relative z-10">
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
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                <p><span className="font-bold text-indigo-900">Tarot</span> is an ancient divination practice that uses a deck of 78 cards to gain insights into the past, present, and future. Each card carries rich symbolism and meaning, serving as a mirror to our subconscious and a guide to understanding life's journey.</p>
                
                <p>The practice of <span className="font-bold text-indigo-900">Tarot reading</span> combines intuition with knowledge of archetypal symbols and their meanings. The cards act as a bridge between the conscious and unconscious mind, helping to reveal hidden truths and potential paths forward. Through the interpretation of these symbols, readers can provide guidance on relationships, career decisions, personal growth, and spiritual development.</p>

                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded-lg">
                  <span className="text-indigo-600 font-medium">Key Takeaway:</span> <span className="font-bold text-indigo-900">Tarot</span> serves as a powerful tool for self-discovery, guidance, and spiritual insight, offering a unique perspective on life's challenges and opportunities.
                </div>

                <p className="text-lg mb-4 text-gray-600">
                  टैरो कार्ड रीडिंग एक प्राचीन भविष्यवाणी प्रथा है जो अतीत, वर्तमान और भविष्य के बारे में अंतर्दृष्टि प्राप्त करने के लिए 78 कार्ड के एक डेक का उपयोग करती है। प्रत्येक कार्ड का अपना प्रतीकवाद और अर्थ होता है।
                </p>
              </motion.div>
            )}

            {activeTab === 'Card Meanings' && (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                <h3 className="text-xl font-semibold mb-4 font-serif text-indigo-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>The Major Arcana</h3>
                <p>The <span className="font-bold text-indigo-900">Major Arcana</span> consists of 22 cards that represent life's spiritual and karmic lessons. These cards carry powerful messages about major life events and personal growth:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><span className="font-bold text-indigo-900">The Fool (0):</span> New beginnings, innocence, spontaneity</li>
                  <li><span className="font-bold text-indigo-900">The Magician (1):</span> Manifestation, resourcefulness, power</li>
                  <li><span className="font-bold text-indigo-900">The High Priestess (2):</span> Intuition, mystery, inner knowledge</li>
                  <li><span className="font-bold text-indigo-900">The Empress (3):</span> Fertility, nurturing, abundance</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 font-serif text-indigo-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>The Minor Arcana</h3>
                <p>The <span className="font-bold text-indigo-900">Minor Arcana</span> consists of 56 cards divided into four suits:</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><span className="font-bold text-indigo-900">Wands:</span> Passion, creativity, and spiritual growth</li>
                  <li><span className="font-bold text-indigo-900">Cups:</span> Emotions, relationships, and intuition</li>
                  <li><span className="font-bold text-indigo-900">Swords:</span> Intellect, challenges, and communication</li>
                  <li><span className="font-bold text-indigo-900">Pentacles:</span> Material world, career, and finances</li>
                </ul>
              </motion.div>
            )}

            {activeTab === 'Reading Techniques' && (
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-700 space-y-6 font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                <h3 className="text-xl font-semibold mb-4 font-serif text-indigo-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Common Tarot Spreads</h3>
                <p>A <span className="font-bold text-indigo-900">tarot spread</span> is the arrangement of cards used to answer specific questions or provide insight. Here are some popular spreads:</p>
                
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li><span className="font-bold text-indigo-900">Three-Card Spread:</span> Past, Present, Future or Mind, Body, Spirit</li>
                  <li><span className="font-bold text-indigo-900">Celtic Cross:</span> A comprehensive 10-card spread for detailed readings</li>
                  <li><span className="font-bold text-indigo-900">Relationship Spread:</span> Understanding dynamics between two people</li>
                  <li><span className="font-bold text-indigo-900">Career Path Spread:</span> Guidance for professional decisions</li>
                </ul>

                <h3 className="text-xl font-semibold mb-4 font-serif text-indigo-900" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Reading Tips</h3>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Set a clear intention before each reading</li>
                  <li>Create a peaceful environment</li>
                  <li>Trust your intuition</li>
                  <li>Keep a tarot journal to track your progress</li>
                </ul>

                <p className="text-lg mb-4 text-gray-600">
                  टैरो रीडिंग की तकनीकें सीखने के लिए धैर्य और अभ्यास की आवश्यकता होती है। नियमित अभ्यास से आप अपनी अंतर्ज्ञान को विकसित कर सकते हैं।
                </p>
              </motion.div>
            )}

            {activeTab === 'FAQs' && (
              <FAQSection faqs={faqs} />
            )}

            {/* Dr. Narendra Profile & Statistics */}
            <div className="mt-20 space-y-20">
              <DrNarendraProfile />
              <Statistics />
            </div>

            {/* Contact Form */}
            <div className="mt-20">
              <ContactForm />
            </div>
          </div>
        </MysticBackground>
      </div>
    </div>
  );
}