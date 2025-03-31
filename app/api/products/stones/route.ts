import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // In a real application, you would fetch this data from your database
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
    ];

    return NextResponse.json({ stones });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch astrology stones' }, { status: 500 });
  }
}
