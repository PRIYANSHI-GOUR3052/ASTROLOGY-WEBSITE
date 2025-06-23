export interface HoroscopeCard {
  title: { en: string; hi: string; };
  description: { en: string; hi: string; };
  href: string;
}

export const horoscopeCards: HoroscopeCard[] = [
  {
    title: { en: "Aries Horoscope", hi: "मेष राशिफल" },
    description: { en: "Your daily insights for Aries, focusing on career and finance.", hi: "मेष राशि के लिए आपकी दैनिक अंतर्दृष्टि, करियर और वित्त पर ध्यान केंद्रित करते हुए।" },
    href: "/daily-horoscope/aries",
  },
  {
    title: { en: "Taurus Horoscope", hi: "वृषभ राशिफल" },
    description: { en: "Discover what the stars hold for Taurus in love and relationships.", hi: "प्रेम और रिश्तों में वृषभ के लिए सितारे क्या कहते हैं, जानें।" },
    href: "/daily-horoscope/taurus",
  },
  {
    title: { en: "Gemini Horoscope", hi: "मिथुन राशिफल" },
    description: { en: "Guidance for Gemini on health and well-being today.", hi: "आज स्वास्थ्य और कल्याण पर मिथुन राशि के लिए मार्गदर्शन।" },
    href: "/daily-horoscope/gemini",
  },
  {
    title: { en: "Cancer Horoscope", hi: "कर्क राशिफल" },
    description: { en: "Career growth and personal development tips for Cancerians.", hi: "कर्क राशि वालों के लिए करियर में वृद्धि और व्यक्तिगत विकास के सुझाव।" },
    href: "/daily-horoscope/cancer",
  },
  {
    title: { en: "Leo Horoscope", hi: "सिंह राशिफल" },
    description: { en: "Financial predictions and lucky numbers for Leo today.", hi: "आज सिंह राशि के लिए वित्तीय भविष्यवाणियां और भाग्यशाली संख्याएँ।" },
    href: "/daily-horoscope/leo",
  },
  {
    title: { en: "Virgo Horoscope", hi: "कन्या राशिफल" },
    description: { en: "Love life and social interactions for Virgo this week.", hi: "इस सप्ताह कन्या राशि के लिए प्रेम जीवन और सामाजिक संबंध।" },
    href: "/daily-horoscope/virgo",
  },
]; 