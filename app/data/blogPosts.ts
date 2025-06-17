interface BlogPost {
  title: {
    hi: string;
    en: string;
  };
  description: {
    hi: string;
    en: string;
  };
  content: {
    hi: string;
    en: string;
  };
  imageUrl: string;
  themeColor: string;
  author: string;
  date: string;
  category: string;
}

export const blogPosts: Record<string, BlogPost> = {
  "influence-of-planets": {
    title: {
      hi: "ग्रहों का प्रभाव",
      en: "The Influence of Planets"
    },
    description: {
      hi: "खगोलीय पिंड हमारे दैनिक जीवन और आध्यात्मिक यात्रा को कैसे प्रभावित करते हैं, इस विषय की गहन जानकारी।",
      en: "Discover how celestial bodies affect our daily lives and spiritual journey."
    },
    content: {
      hi: `खगोलीय पिंड हमारे दैनिक जीवन और आध्यात्मिक यात्रा को कैसे प्रभावित करते हैं, इस विषय की गहन जानकारी।

प्रमुख बिंदु:
• नवग्रहों का महत्व
• ग्रहों की चाल का प्रभाव
• ग्रह दशा और अंतर्दशा
• ग्रहों के उपाय`,
      en: `Discover how celestial bodies affect our daily lives and spiritual journey.

Key Points:
• Importance of the Nine Planets
• Effects of Planetary Movements
• Planetary Periods and Sub-periods
• Planetary Remedies`
    },
    imageUrl: "/images/blog/planets.jpg",
    themeColor: "#a78bfa",
    author: "Dr. Narendra Kumar Sharma",
    date: "15 April, 2024",
    category: "Astrology"
  },
  "understanding-vedic-astrology": {
    title: {
      hi: "वैदिक ज्योतिष को समझना",
      en: "Understanding Vedic Astrology"
    },
    description: {
      hi: "वैदिक ज्योतिष के मूल सिद्धांतों और जीवन के निर्णयों पर इसके प्रभाव की विस्तृत जानकारी।",
      en: "Learn the fundamentals of Vedic astrology and its impact on life decisions."
    },
    content: {
      hi: `वैदिक ज्योतिष के मूल सिद्धांतों और जीवन के निर्णयों पर इसके प्रभाव की विस्तृत जानकारी।

मुख्य विषय:
• जन्म कुंडली का महत्व
• राशियों का प्रभाव
• ग्रह योग
• दशा प्रणाली`,
      en: `Learn the fundamentals of Vedic astrology and its impact on life decisions.

Main Topics:
• Importance of Birth Chart
• Influence of Zodiac Signs
• Planetary Combinations
• Dasha System`
    },
    imageUrl: "/images/blog/vedic-astrology.jpg",
    themeColor: "#fca4a4",
    author: "Dr. Narendra Kumar Sharma",
    date: "15 April, 2024",
    category: "Astrology"
  },
  "gemstones-and-powers": {
    title: {
      hi: "रत्नों की शक्तियां",
      en: "Gemstones and Their Powers"
    },
    description: {
      hi: "रत्नों के रहस्यमय गुणों और उनके ज्योतिषीय महत्व की विस्तृत जानकारी।",
      en: "Explore the mystical properties of gemstones and their astrological significance."
    },
    content: {
      hi: `रत्नों के रहस्यमय गुणों और उनके ज्योतिषीय महत्व की विस्तृत जानकारी।

प्रमुख रत्न:
• पुखराज - गुरु का रत्न
• मोती - चंद्र का रत्न
• माणिक - सूर्य का रत्न
• पन्ना - बुध का रत्न`,
      en: `Explore the mystical properties of gemstones and their astrological significance.

Major Gemstones:
• Yellow Sapphire - Jupiter's Stone
• Pearl - Moon's Stone
• Ruby - Sun's Stone
• Emerald - Mercury's Stone`
    },
    imageUrl: "/images/blog/gemstones.jpg",
    themeColor: "#86efad",
    author: "Dr. Narendra Kumar Sharma",
    date: "15 April, 2024",
    category: "Astrology"
  },
  "numerology-basics": {
    title: {
      hi: "अंक ज्योतिष का परिचय",
      en: "Numerology Basics"
    },
    description: {
      hi: "संख्याओं का जीवन पर प्रभाव और उनका वैज्ञानिक महत्व।",
      en: "Understanding how numbers influence your life path and destiny."
    },
    content: {
      hi: `संख्याओं का जीवन पर प्रभाव और उनका वैज्ञानिक महत्व।

मूल सिद्धांत:
• मूलांक की गणना
• भाग्यांक का महत्व
• नाम का प्रभाव
• अंकों का स्वभाव`,
      en: `Understanding how numbers influence your life path and destiny.

Basic Principles:
• Calculating Root Number
• Significance of Destiny Number
• Name's Influence
• Nature of Numbers`
    },
    imageUrl: "/images/blog/numerology.jpg",
    themeColor: "#a78bfa",
    author: "Dr. Narendra Kumar Sharma",
    date: "15 April, 2024",
    category: "Astrology"
  },
  "understanding-your-birth-chart": {
    title: {
      hi: "अपनी जन्म कुंडली को समझना",
      en: "Understanding Your Birth Chart"
    },
    description: {
      hi: "जन्म कुंडली आपके जीवन का एक महत्वपूर्ण मानचित्र है। यह आपके जन्म के समय आकाश में ग्रहों की स्थिति को दर्शाती है।",
      en: "A birth chart is a vital map of your life, showing the position of planets at the time of your birth."
    },
    content: {
      hi: `जन्म कुंडली आपके जीवन का एक महत्वपूर्ण मानचित्र है। यह आपके जन्म के समय आकाश में ग्रहों की स्थिति को दर्शाती है।

जन्म कुंडली के मुख्य घटक:
• लग्न - आपकी व्यक्तिगत पहचान
• सूर्य - आपका मूल स्वभाव
• चंद्र - आपका मानसिक स्वभाव
• नवग्रह - जीवन के विभिन्न पहलुओं को प्रभावित करने वाले ग्रह

अपनी कुंडली को समझने के लिए इन बिंदुओं पर ध्यान दें:
1. राशियों का महत्व
2. ग्रहों की स्थिति
3. भावों का प्रभाव
4. दशा और अंतर्दशा`,
      en: `A birth chart is a vital map of your life, showing the position of planets at the time of your birth.

Key Components of Birth Chart:
• Ascendant - Your personal identity
• Sun - Your core nature
• Moon - Your mental nature
• Nine Planets - Influencing different aspects of life

Points to understand your horoscope:
1. Importance of zodiac signs
2. Position of planets
3. Impact of houses
4. Major and sub-periods`
    },
    imageUrl: "/images/blog/birth-chart.jpg",
    themeColor: "#fca4a4",
    author: "Dr. Narendra Kumar Sharma",
    date: "15 April, 2024",
    category: "Astrology"
  },
  "power-of-meditation": {
    title: {
      hi: "ध्यान की शक्ति",
      en: "The Power of Meditation"
    },
    description: {
      hi: "ध्यान एक प्राचीन अभ्यास है जो मन और शरीर को शांति प्रदान करता है।",
      en: "Meditation is an ancient practice that brings peace to mind and body."
    },
    content: {
      hi: `ध्यान एक प्राचीन अभ्यास है जो मन और शरीर को शांति प्रदान करता है।

ध्यान के प्रकार:
• श्वास पर ध्यान
• मंत्र जप
• विजुअलाइजेशन
• बॉडी स्कैन

ध्यान के लाभ:
1. तनाव में कमी
2. एकाग्रता में वृद्धि
3. भावनात्मक संतुलन
4. आध्यात्मिक विकास`,
      en: `Meditation is an ancient practice that brings peace to mind and body.

Types of Meditation:
• Breath Awareness
• Mantra Chanting
• Visualization
• Body Scan

Benefits of Meditation:
1. Stress Reduction
2. Increased Focus
3. Emotional Balance
4. Spiritual Growth`
    },
    imageUrl: "/images/blog/meditation.jpg",
    themeColor: "#86efad",
    author: "Dr. Narendra Kumar Sharma",
    date: "15 April, 2024",
    category: "Spiritual Healing"
  },
  "crystal-healing": {
    title: {
      hi: "क्रिस्टल हीलिंग का मार्गदर्शन",
      en: "Guide to Crystal Healing"
    },
    description: {
      hi: "क्रिस्टल हीलिंग एक प्राचीन उपचार पद्धति है जो ऊर्जा के संतुलन पर आधारित है।",
      en: "Crystal healing is an ancient therapy based on energy balance."
    },
    content: {
      hi: `क्रिस्टल हीलिंग एक प्राचीन उपचार पद्धति है जो ऊर्जा के संतुलन पर आधारित है।

प्रमुख क्रिस्टल:
• क्वार्ट्ज - शुद्धि और स्पष्टता
• एमेथिस्ट - शांति और आध्यात्मिकता
• रोज क्वार्ट्ज - प्रेम और सद्भाव
• जेड - सौभाग्य और समृद्धि

उपयोग के तरीके:
1. पहनने के लिए
2. ध्यान में
3. घर में स्थापना
4. चक्र संतुलन`,
      en: `Crystal healing is an ancient therapy based on energy balance.

Major Crystals:
• Quartz - Purity and Clarity
• Amethyst - Peace and Spirituality
• Rose Quartz - Love and Harmony
• Jade - Fortune and Prosperity

Ways to Use:
1. As Jewelry
2. In Meditation
3. Home Placement
4. Chakra Balancing`
    },
    imageUrl: "/images/blog/crystal-healing.jpg",
    themeColor: "#fca4a4",
    author: "Dr. Narendra Kumar Sharma",
    date: "15 April, 2024",
    category: "Spiritual Healing"
  },
  
   
  }
