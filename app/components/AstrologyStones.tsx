'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const stones = [
  { name: "रूबी", nameEn: "Ruby", zodiac: "सिंह", zodiacEn: "Leo", benefits: "आत्मविश्वास, नेतृत्व और जीवन शक्ति बढ़ाता है", benefitsEn: "Enhances confidence, leadership, and vitality", pricePerCarat: 15000 },
  { name: "मोती", nameEn: "Pearl", zodiac: "कर्क", zodiacEn: "Cancer", benefits: "भावनात्मक संतुलन और अंतर्ज्ञान को बढ़ावा देता है", benefitsEn: "Promotes emotional balance and intuition", pricePerCarat: 5000 },
  { name: "पन्ना", nameEn: "Emerald", zodiac: "वृषभ", zodiacEn: "Taurus", benefits: "विकास, धैर्य और कल्याण को प्रोत्साहित करता है", benefitsEn: "Encourages growth, patience, and wellbeing", pricePerCarat: 18000 },
  { name: "पुखराज", nameEn: "Yellow Sapphire", zodiac: "धनु", zodiacEn: "Sagittarius", benefits: "ज्ञान, समृद्धि और आशावाद लाता है", benefitsEn: "Brings wisdom, prosperity, and optimism", pricePerCarat: 12000 },
  { name: "हीरा", nameEn: "Diamond", zodiac: "मेष", zodiacEn: "Aries", benefits: "व्यक्तिगत शक्ति और स्पष्टता को बढ़ाता है", benefitsEn: "Amplifies personal power and clarity", pricePerCarat: 50000 },
  { name: "नीलम", nameEn: "Blue Sapphire", zodiac: "तुला", zodiacEn: "Libra", benefits: "मानसिक स्पष्टता और आध्यात्मिक अंतर्दृष्टि को बढ़ाता है", benefitsEn: "Enhances mental clarity and spiritual insight", pricePerCarat: 20000 },
  { name: "मूंगा", nameEn: "Red Coral", zodiac: "वृश्चिक", zodiacEn: "Scorpio", benefits: "ऊर्जा, साहस और महत्वाकांक्षा को बढ़ावा देता है", benefitsEn: "Boosts energy, courage, and ambition", pricePerCarat: 8000 },
  { name: "गोमेद", nameEn: "Hessonite", zodiac: "मकर", zodiacEn: "Capricorn", benefits: "ऊर्जा को जमीन से जोड़ता है और व्यावहारिकता को बढ़ाता है", benefitsEn: "Grounds energy and enhances practicality", pricePerCarat: 6000 },
  { name: "लहसुनिया", nameEn: "Cat's Eye", zodiac: "केतु", zodiacEn: "Ketu", benefits: "नकारात्मक ऊर्जाओं और अचानक परिवर्तनों से सुरक्षा प्रदान करता है", benefitsEn: "Protects against negative energies and sudden changes", pricePerCarat: 10000 }
]

export function AstrologyStones() {
  const [selectedStone, setSelectedStone] = useState(stones[0])

  return (
    <section className="my-16">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-mystic-brown">
        ज्योतिष रत्न<br />
        <span className="text-2xl md:text-3xl">Astrology Stones</span>
      </h2>
      <p className="text-xl text-mystic-brown text-center mb-8 max-w-3xl mx-auto">
        खगोलीय ऊर्जाओं की शक्ति का उपयोग करें हमारे ज्योतिष रत्नों के संग्रह के साथ। प्रत्येक पत्थर को विशिष्ट राशि चिह्नों और ग्रहीय प्रभावों के साथ संरेखित करने के लिए सावधानीपूर्वक चुना गया है।
      </p>
      <p className="text-xl text-mystic-brown text-center mb-8 max-w-3xl mx-auto">
        Harness the power of celestial energies with our collection of astrology stones. Each stone is carefully selected to align with specific zodiac signs and planetary influences.
      </p>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-8">
        {stones.map((stone) => (
          <Button
            key={stone.name}
            onClick={() => setSelectedStone(stone)}
            className={`${
              selectedStone.name === stone.name
                ? 'bg-sunburst-yellow text-mystic-brown'
                : 'bg-celestial-cream text-mystic-brown hover:bg-sunburst-yellow-light'
            }`}
          >
            <span className="block">{stone.name}</span>
            <span className="block text-sm">{stone.nameEn}</span>
          </Button>
        ))}
      </div>
      <motion.div
        key={selectedStone.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-celestial-cream/90 shadow-lg">
          <CardContent className="p-6">
            <h3 className="text-2xl font-serif font-semibold mb-2 text-mystic-brown">{selectedStone.name} ({selectedStone.nameEn})</h3>
            <p className="text-mystic-brown/80 mb-2">संबंधित राशि / Associated Zodiac: {selectedStone.zodiac} ({selectedStone.zodiacEn})</p>
            <p className="text-mystic-brown/80 mb-2">लाभ / Benefits: {selectedStone.benefits}</p>
            <p className="text-mystic-brown/80 mb-2">{selectedStone.benefitsEn}</p>
            <p className="text-mystic-brown/80 mb-4">मूल्य / Price: ₹{selectedStone.pricePerCarat.toLocaleString('en-IN')} प्रति कैरेट / per carat</p>
            <Button asChild className="bg-sunburst-yellow text-mystic-brown hover:bg-sunburst-yellow-light">
              <Link href={`/shop/${selectedStone.nameEn.toLowerCase().replace(' ', '-')}`}>
                <span className="block">{selectedStone.name} खरीदें</span>
                <span className="block">Shop {selectedStone.nameEn}</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}

