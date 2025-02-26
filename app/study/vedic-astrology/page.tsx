import React from 'react';
import { AnimatedStars } from '../../components/AnimatedStars';
import { MysticBackground } from '../../components/MysticBackground';

const VedicAstrology = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-nebula-indigo via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-gold">Vedic Astrology Fundamentals</h1>
        <h2 className="text-2xl font-semibold text-center mb-2 text-gold">वैदिक ज्योतिष के मूल सिद्धांत</h2>
        <p className="text-lg mb-4">
          Vedic astrology, also known as Jyotish, is an ancient Indian science that provides insights into the past, present, and future through the positions of celestial bodies. It is based on the belief that the positions of the planets and stars at the time of a person's birth can influence their personality and life events.
        </p>
        <p className="text-lg mb-4">
          वैदिक ज्योतिष, जिसे ज्योतिष भी कहा जाता है, एक प्राचीन भारतीय विज्ञान है जो आकाशीय पिंडों की स्थिति के माध्यम से अतीत, वर्तमान और भविष्य की अंतर्दृष्टि प्रदान करता है। यह विश्वास पर आधारित है कि जन्म के समय ग्रहों और सितारों की स्थिति किसी व्यक्ति के व्यक्तित्व और जीवन की घटनाओं को प्रभावित कर सकती है।
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Key Components of Vedic Astrology</h3>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Planets (Grahas):</strong> The nine planets in Vedic astrology include the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, and the two lunar nodes, Rahu and Ketu.</li>
          <li><strong>Houses (Bhavas):</strong> The twelve houses represent different areas of life, such as career, relationships, and health.</li>
          <li><strong>Zodiac Signs (Rashis):</strong> The twelve zodiac signs are used to interpret the positions of planets and their effects on individuals.</li>
        </ul>
        <p className="text-lg mb-4">
          Understanding these components is essential for interpreting a birth chart (Kundali) and making predictions about an individual's life path.
        </p>
        <p className="text-lg mb-4">
          इन घटकों को समझना जन्म कुंडली (कुंडली) की व्याख्या करने और किसी व्यक्ति के जीवन पथ के बारे में भविष्यवाणियाँ करने के लिए आवश्यक है।
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Applications of Vedic Astrology</h3>
        <p className="text-lg mb-4">
          Vedic astrology can be used for various purposes, including:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Personal guidance and self-discovery</li>
          <li>Compatibility analysis for relationships</li>
          <li>Timing of important life events (muhurta)</li>
          <li>Remedies for planetary afflictions</li>
        </ul>
        <p className="text-lg mb-4">
          By understanding the cosmic influences, individuals can make informed decisions and navigate their lives more effectively.
        </p>
        <p className="text-lg mb-4">
          ब्रह्मांडीय प्रभावों को समझकर, व्यक्ति सूचित निर्णय ले सकते हैं और अपने जीवन को अधिक प्रभावी ढंग से नेविगेट कर सकते हैं।
        </p>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default VedicAstrology; 