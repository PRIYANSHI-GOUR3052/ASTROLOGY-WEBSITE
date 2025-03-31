'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Stone {
  name: string;
  nameEn: string;
  zodiac: string;
  zodiacEn: string;
  benefits: string;
  benefitsEn: string;
  pricePerCarat: number;
}

const stones: Stone[] = [
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
  // State for carat values
  const [caratValues, setCaratValues] = useState<Record<string, number>>(
    stones.reduce((acc, stone) => ({ ...acc, [stone.nameEn]: 1 }), {})
  );

  // Handler for carat changes
  const handleCaratChange = (stoneName: string, value: number) => {
    setCaratValues(prev => ({
      ...prev,
      [stoneName]: value <= 0 ? 1 : value
    }));
  };

  // Handler for add to cart
  const handleAddToCart = (stone: Stone) => {
    // Add your cart logic here
    alert(`Added ${caratValues[stone.nameEn]} carats of ${stone.nameEn} to cart!`);
  };

  return (
    <section className="my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-mystic-brown">
          ज्योतिष रत्न<br />
          <span className="text-2xl md:text-3xl">Astrology Stones</span>
        </h2>
        <p className="text-lg text-mystic-brown max-w-3xl mx-auto mb-4">
          खगोलीय ऊर्जाओं की शक्ति का उपयोग करें हमारे ज्योतिष रत्नों के संग्रह के साथ। प्रत्येक पत्थर को विशिष्ट राशि चिह्नों और ग्रहीय प्रभावों के साथ संरेखित करने के लिए सावधानीपूर्वक चुना गया है।
        </p>
        <p className="text-lg text-mystic-brown max-w-3xl mx-auto">
          Harness the power of celestial energies with our collection of astrology stones. Each stone is carefully selected to align with specific zodiac signs and planetary influences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stones.map((stone) => (
          <Card key={stone.nameEn} className="bg-celestial-cream/90 shadow-lg overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-serif font-semibold mb-2 text-mystic-brown">
                  {stone.nameEn} ({stone.name})
                </h3>
                <p className="text-mystic-brown/80 mb-2">
                  Associated with {stone.zodiacEn} ({stone.zodiac})
                </p>
                <p className="text-mystic-brown/80 mb-4">
                  {stone.benefitsEn}
                </p>
                <div className="mt-6 border-t border-mystic-brown/20 pt-4">
                  <p className="text-mystic-brown font-medium mb-3">
                    ₹{stone.pricePerCarat.toLocaleString('en-IN')} per carat
                  </p>
                  <div className="flex items-center justify-center mb-4">
                    <input
                      type="number"
                      min="1"
                      value={caratValues[stone.nameEn]}
                      onChange={(e) => handleCaratChange(stone.nameEn, parseInt(e.target.value) || 1)}
                      className="w-16 p-2 text-center border border-mystic-brown/30 rounded mr-2"
                    />
                    <span className="text-mystic-brown/80">carats</span>
                  </div>
                  <p className="text-lg font-bold text-mystic-brown mb-4">
                    Total: ₹{(stone.pricePerCarat * caratValues[stone.nameEn]).toLocaleString('en-IN')}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => handleAddToCart(stone)}
                      className="w-full bg-black text-white hover:bg-gray-800"
                    >
                      <span>Add to Cart</span>
                    </Button>
                    <Button 
                      asChild 
                      className="w-full bg-black text-white hover:bg-gray-800"
                    >
                      <Link href={`/shop/${stone.nameEn.toLowerCase().replace(' ', '-')}`}>
                        <span>खरीदें (Buy Now)</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}