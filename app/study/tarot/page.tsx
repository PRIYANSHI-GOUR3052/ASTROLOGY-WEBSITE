import React from 'react';
import { AnimatedStars } from '../../components/AnimatedStars';
import { MysticBackground } from '../../components/MysticBackground';

export default function TarotPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-nebula-indigo via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-gold">Tarot Card Reading</h1>
        <h2 className="text-2xl font-semibold text-center mb-2 text-gold">टैरो कार्ड रीडिंग</h2>
        <p className="text-lg mb-4">
          Tarot card reading is a divination practice that uses a deck of tarot cards to gain insights into the past, present, and future. Each card has its own symbolism and meaning, which can be interpreted based on the context of the reading.
        </p>
        <p className="text-lg mb-4">
          टैरो कार्ड रीडिंग एक भविष्यवाणी प्रथा है जो टैरो कार्ड के एक डेक का उपयोग करके अतीत, वर्तमान और भविष्य के बारे में अंतर्दृष्टि प्राप्त करती है। प्रत्येक कार्ड का अपना प्रतीकवाद और अर्थ होता है, जिसे रीडिंग के संदर्भ के आधार पर व्याख्यायित किया जा सकता है।
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Major Arcana and Minor Arcana</h3>
        <p className="text-lg mb-4">
          The tarot deck consists of 78 cards, divided into two main categories:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Major Arcana:</strong> 22 cards that represent significant life events and spiritual lessons.</li>
          <li><strong>Minor Arcana:</strong> 56 cards that focus on day-to-day events and experiences.</li>
        </ul>
        <p className="text-lg mb-4">
          Understanding the difference between these two categories is crucial for accurate readings.
        </p>
        <p className="text-lg mb-4">
          इन दो श्रेणियों के बीच का अंतर समझना सटीक रीडिंग के लिए महत्वपूर्ण है।
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">How to Conduct a Tarot Reading</h3>
        <p className="text-lg mb-4">
          Conducting a tarot reading involves several steps:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li>Set a clear intention for the reading.</li>
          <li>Shuffle the cards while focusing on the question or situation.</li>
          <li>Draw cards and lay them out in a spread.</li>
          <li>Interpret the cards based on their positions and meanings.</li>
        </ol>
        <p className="text-lg mb-4">
          With practice, tarot reading can become a powerful tool for self-reflection and guidance.
        </p>
        <p className="text-lg mb-4">
          अभ्यास के साथ, टैरो रीडिंग आत्म-प्रतिबिंब और मार्गदर्शन के लिए एक शक्तिशाली उपकरण बन सकती है।
        </p>
        {/* Add more content as needed */}
      </div>
    </div>
  );
} 