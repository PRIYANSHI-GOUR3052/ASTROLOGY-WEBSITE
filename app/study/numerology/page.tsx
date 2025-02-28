import React from 'react';
import { AnimatedStars } from '../../components/AnimatedStars';
import { MysticBackground } from '../../components/MysticBackground';

export default function NumerologyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-nebula-indigo via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-gold">Numerology Essentials</h1>
        <h2 className="text-2xl font-semibold text-center mb-2 text-gold">अंक ज्योतिष के आवश्यक तत्व</h2>
        <p className="text-lg mb-4 text-starlight-silver">
          Numerology is the study of numbers and their mystical significance. It is based on the idea that numbers have unique vibrations and energies that can influence our lives. Each number is associated with specific traits and characteristics, which can provide insights into a person's personality and life path.
        </p>
        <p className="text-lg mb-4 text-starlight-silver">
          अंक ज्योतिष संख्याओं और उनके रहस्यमय महत्व का अध्ययन है। यह इस विचार पर आधारित है कि संख्याओं में अद्वितीय कंपन और ऊर्जा होती है जो हमारे जीवन को प्रभावित कर सकती है। प्रत्येक संख्या विशेष गुणों और विशेषताओं से जुड़ी होती है, जो किसी व्यक्ति के व्यक्तित्व और जीवन पथ में अंतर्दृष्टि प्रदान कर सकती है।
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-starlight-silver">Core Numbers in Numerology</h3>
        <ul className="list-disc list-inside mb-4 text-starlight-silver">
          <li><strong>Life Path Number:</strong> Calculated from the birth date, it reveals the individual's life purpose and challenges.</li>
          <li><strong>Expression Number:</strong> Derived from the full name, it indicates natural talents and abilities.</li>
          <li><strong>Heart's Desire Number:</strong> Based on the vowels in the name, it reflects inner motivations and desires.</li>
        </ul>
        <p className="text-lg mb-4 text-starlight-silver">
          Each of these core numbers plays a significant role in understanding oneself and making informed decisions.
        </p>
        <p className="text-lg mb-4 text-starlight-silver">
          इन मूल संख्याओं में से प्रत्येक का व्यक्ति को समझने और सूचित निर्णय लेने में महत्वपूर्ण भूमिका होती है।
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2 text-starlight-silver">Practical Applications of Numerology</h3>
        <p className="text-lg mb-4 text-starlight-silver">
          Numerology can be applied in various aspects of life, including:
        </p>
        <ul className="list-disc list-inside mb-4 text-starlight-silver">
          <li>Choosing auspicious dates for events</li>
          <li>Understanding personal relationships and compatibility</li>
          <li>Making career choices based on strengths</li>
          <li>Enhancing personal growth and self-awareness</li>
        </ul>
        <p className="text-lg mb-4 text-starlight-silver">
          By harnessing the power of numbers, individuals can align their actions with their true purpose.
        </p>
        <p className="text-lg mb-4 text-starlight-silver">
          संख्याओं की शक्ति का उपयोग करके, व्यक्ति अपने कार्यों को अपने सच्चे उद्देश्य के साथ संरेखित कर सकते हैं।
        </p>
        {/* Add more content as needed */}
      </div>
    </div>
  );
} 