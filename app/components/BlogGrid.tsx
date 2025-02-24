import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface BlogPost {
  title: {
    hi: string;
    en: string;
  };
  excerpt: {
    hi: string;
    en: string;
  };
  content: {
    hi: string;
    en: string;
  };
  date: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: {
      hi: "ग्रहों का प्रभाव: आपके जीवन पर कैसे पड़ता है",
      en: "Planetary Influences: How They Affect Your Life"
    },
    excerpt: {
      hi: "ग्रहों की स्थिति का आपके दैनिक जीवन पर कैसे प्रभाव पड़ता है, इसके बारे में जानें।",
      en: "Learn how planetary positions influence your daily life and decisions."
    },
    content: {
      hi: `ग्रहों का हमारे जीवन पर गहरा प्रभाव पड़ता है। प्राचीन वैदिक ज्योतिष के अनुसार, नौ ग्रह हमारे जीवन के विभिन्न पहलुओं को प्रभावित करते हैं।

सूर्य हमारे आत्मविश्वास और व्यक्तित्व को प्रभावित करता है। यह हमारी ऊर्जा का स्रोत है और हमारी सफलता में महत्वपूर्ण भूमिका निभाता है।

चंद्रमा हमारे मन और भावनाओं को नियंत्रित करता है। इसका प्रभाव हमारी मानसिक स्थिति और भावनात्मक स्वास्थ्य पर पड़ता है।

मंगल हमारी शक्ति और साहस का प्रतीक है। यह हमारी कार्यक्षमता और निर्णय लेने की क्षमता को प्रभावित करता है।

बुध हमारी बुद्धि और संचार कौशल को प्रभावित करता है। यह शिक्षा और व्यापार में सफलता के लिए महत्वपूर्ण है।

गुरु भाग्य और ज्ञान का कारक है। यह हमारी आध्यात्मिक प्रगति और जीवन में विस्तार को प्रभावित करता है।

शुक्र प्रेम, सौंदर्य और समृद्धि का कारक है। यह हमारे रिश्तों और भौतिक सुख को प्रभावित करता है।

शनि कर्म और अनुशासन का ग्रह है। यह हमें जीवन के कठिन पाठ सिखाता है और परिपक्वता प्रदान करता है।

राहु और केतु छाया ग्रह हैं जो हमारी आध्यात्मिक यात्रा और कर्म को प्रभावित करते हैं।

इन ग्रहों की स्थिति और गति का प्रभाव हमारे दैनिक जीवन से लेकर महत्वपूर्ण निर्णयों तक पर पड़ता है। ज्योतिष के माध्यम से हम इन प्रभावों को समझ सकते हैं और अपने जीवन को बेहतर बना सकते हैं।`,
      en: `Planets have a profound influence on our lives. According to ancient Vedic astrology, nine planets affect different aspects of our lives.

The Sun influences our confidence and personality. It is our source of energy and plays a crucial role in our success.

The Moon controls our mind and emotions. It affects our mental state and emotional well-being.

Mars represents our strength and courage. It influences our efficiency and decision-making ability.

Mercury affects our intelligence and communication skills. It is important for success in education and business.

Jupiter is the factor of fortune and knowledge. It influences our spiritual progress and expansion in life.

Venus is the factor of love, beauty, and prosperity. It affects our relationships and material comforts.

Saturn is the planet of karma and discipline. It teaches us life's tough lessons and provides maturity.

Rahu and Ketu are shadow planets that influence our spiritual journey and karma.

The position and movement of these planets affect everything from our daily lives to important decisions. Through astrology, we can understand these influences and improve our lives.`
    },
    date: "2023-07-15",
    slug: "influence-of-planets"
  },
  {
    title: {
      hi: "वास्तु शास्त्र के रहस्य: घर को कैसे बनाएं सकारात्मक ऊर्जा का केंद्र",
      en: "Vastu Shastra Secrets: How to Create a Center of Positive Energy in Your Home"
    },
    excerpt: {
      hi: "वास्तु शास्त्र के मूल सिद्धांतों और आपके घर में सकारात्मक ऊर्जा लाने के तरीकों के बारे में जानें।",
      en: "Learn about the principles of Vastu Shastra and how to bring positive energy into your home."
    },
    content: {
      hi: `वास्तु शास्त्र एक प्राचीन भारतीय विज्ञान है जो हमारे आवास और कार्यस्थल में सकारात्मक ऊर्जा के प्रवाह को सुनिश्चित करता है।

मुख्य सिद्धांत:
1. दिशाओं का महत्व: हर दिशा का अपना विशेष महत्व होता है। पूर्व दिशा सूर्य की ऊर्जा से संबंधित है, उत्तर दिशा धन और समृद्धि से जुड़ी है।

2. पंच तत्वों का संतुलन: पृथ्वी, जल, अग्नि, वायु और आकाश - इन पांच तत्वों का संतुलन आवश्यक है।

3. प्रवेश द्वार: घर का मुख्य द्वार शुभ दिशा में होना चाहिए। यह सकारात्मक ऊर्जा के प्रवेश का मुख्य स्थान है।

4. रसोई की स्थिति: रसोई अग्नि तत्व से जुड़ी है, इसलिए इसकी दिशा का विशेष महत्व है।

5. शयन कक्ष: शयन कक्ष की दिशा नींद की गुणवत्ता को प्रभावित करती है।

सकारात्मक ऊर्जा बढ़ाने के उपाय:
• घर को साफ-सुथरा रखें
• प्राकृतिक प्रकाश और हवा का प्रवाह सुनिश्चित करें
• हरे पौधों का उपयोग करें
• क्रिस्टल और यंत्रों का उचित प्रयोग करें

वास्तु के नियमों का पालन करने से घर में सकारात्मक ऊर्जा का प्रवाह बना रहता है, जो परिवार के सदस्यों के स्वास्थ्य, समृद्धि और खुशहाली में वृद्धि करता है।`,
      en: `Vastu Shastra is an ancient Indian science that ensures the flow of positive energy in our homes and workplaces.

Key Principles:
1. Direction Importance: Each direction has its own unique significance. The east is related to the energy of the Sun, the north is related to wealth and prosperity.

2. Balance of Five Elements: The balance of the five elements - Earth, Water, Fire, Air, and Space - is essential.

3. Main Door: The main door should be in a favorable direction. It is the main entrance for positive energy.

4. Kitchen Direction: The kitchen is related to the Fire element, so its direction has special significance.

5. Sleeping Direction: The direction of the bedroom affects the quality of sleep.

Ways to Increase Positive Energy:
• Keep the home clean and tidy
• Ensure natural light and air circulation
• Use natural plants
• Use crystals and equipment properly

Following Vastu principles ensures the flow of positive energy in your home, which contributes to the health, prosperity, and happiness of family members.`
    },
    date: "2023-07-01",
    slug: "vastu-shastra-secrets"
  },
  {
    title: {
      hi: "ज्योतिष और आधुनिक विज्ञान: क्या है संबंध?",
      en: "Astrology and Modern Science: What's the Connection?"
    },
    excerpt: {
      hi: "ज्योतिष और आधुनिक विज्ञान के बीच संबंधों की खोज करें और जानें कि वे कैसे एक दूसरे को पूरक हो सकते हैं।",
      en: "Discover the connections between astrology and modern science and learn how they can complement each other."
    },
    content: {
      hi: `ज्योतिष और आधुनिक विज्ञान के बीच संबंध एक रोचक विषय है। दोनों अपने-अपने तरीके से मानव जीवन को समझने का प्रयास करते हैं।

वैज्ञानिक दृष्टिकोण:
• ग्रहों की गति और उनका पृथ्वी पर प्रभाव
• चंद्रमा का ज्वार-भाटा पर प्रभाव
• सौर चक्र का मौसम पर प्रभाव
• बायोरिदम और मानव शरीर

ज्योतिषीय दृष्टिकोण:
• ग्रहों की स्थिति का मानव जीवन पर प्रभाव
• जन्म कुंडली और व्यक्तित्व विश्लेषण
• दशा-अंतर्दशा का सिद्धांत
• ग्रह गोचर का प्रभाव

समन्वय की संभावनाएं:
1. अनुसंधान आधारित अध्ययन
2. आधुनिक तकनीक का उपयोग
3. वैज्ञानिक परीक्षण
4. नए सिद्धांतों का विकास

दोनों विधाएं एक-दूसरे की पूरक हो सकती हैं और मानव जीवन को बेहतर समझने में मदद कर सकती हैं।`,
      en: `The connection between astrology and modern science is fascinating. Both disciplines strive to understand human life.

Scientific Approach:
• Planetary Movement and Its Impact on Earth
• Impact of Lunar Eclipse
• Impact of Solar Cycle
• Biology and Human Body

Astrological Approach:
• Impact of Planetary Positions on Human Life
• Birth Chart and Personality Analysis
• Aspect Theory
• Planetary Influence

Areas of Collaboration:
1. Research-Based Study
2. Use of Modern Technology
3. Scientific Verification
4. Development of New Concepts

Both approaches can complement each other and help us better understand human life.`
    },
    date: "2023-06-20",
    slug: "astrology-and-modern-science"
  },
  {
    title: {
      hi: "राशि के अनुसार व्यक्तित्व विश्लेषण",
      en: "Personality Analysis by Zodiac Sign"
    },
    excerpt: {
      hi: "अपनी राशि के आधार पर अपने व्यक्तित्व के गुणों और विशेषताओं को समझें।",
      en: "Understand the characteristics and traits of your zodiac sign."
    },
    content: {
      hi: `हर राशि के जातक में कुछ विशिष्ट गुण और विशेषताएं होती हैं। आइए जानें हर राशि की मुख्य विशेषताएं:

मेष: साहसी, ऊर्जावान, नेतृत्व क्षमता
• मजबूत इच्छाशक्ति
• नई चुनौतियों का सामना करने की क्षमता
• स्वतंत्र विचारधारा

वृषभ: धैर्यवान, व्यावहारिक, दृढ़
• भौतिक सुख-सुविधाओं की चाह
• कला और सौंदर्य की समझ
• वफादार स्वभाव

मिथुन: बुद्धिमान, संचार कुशल, बहुमुखी प्रतिभा
• जिज्ञासु स्वभाव
• अच्छे वक्ता
• परिवर्तनशील स्वभाव

कर्क: भावनात्मक, देखभाल करने वाले, परिवार-प्रेमी
• गहरी संवेदनशीलता
• मजबूत स्मृति
• घर और परिवार से लगाव

सिंह: आत्मविश्वासी, नेतृत्वकर्ता, रचनात्मक
• महत्वाकांक्षी स्वभाव
• दयालु हृदय
• प्रभावशाली व्यक्तित्व

इस तरह हर राशि की अपनी विशेषताएं हैं जो व्यक्तित्व को आकार देती हैं।`,
      en: `Each zodiac sign has some unique characteristics and traits. Let's learn about the main characteristics of each sign:

Aries: Adventurous, Energetic, Leadership Ability
• Strong Willpower
• Ability to Face New Challenges
• Independent Thought Process

Taurus: Patient, Practical, Determined
• Desire for Physical Comfort and Amenities
• Understanding and Appreciation of Art and Beauty
• Affable Personality

Gemini: Intelligent, Communicative, Versatile
• Curious Personality
• Good Speaker
• Versatile Personality

Cancer: Emotional, Caring, Family-Oriented
• Deep Emotional Sensitivity
• Strong Memory
• Feeling of Attachment to Home and Family

Leo: Confident, Leader, Creative
• Confident Personality
• Kind-Hearted Heart
• Powerful Personality

This is how each zodiac sign has its own characteristics that shape your personality.`
    },
    date: "2023-06-10",
    slug: "personality-analysis-by-zodiac"
  },
  {
    title: {
      hi: "कर्म और भाग्य: क्या हम अपनी किस्मत बदल सकते हैं?",
      en: "Karma and Destiny: Can We Change Our Fate?"
    },
    excerpt: {
      hi: "कर्म के सिद्धांत और भाग्य के बीच संबंध की गहराई से जांच करें।",
      en: "Examine the relationship between karma and destiny."
    },
    content: {
      hi: `कर्म और भाग्य का संबंध जटिल है। क्या हमारा भाग्य पूर्व निर्धारित है या हम अपने कर्मों से इसे बदल सकते हैं?

कर्म का सिद्धांत:
• हर कार्य का प्रतिफल मिलता है
• वर्तमान कर्म भविष्य को प्रभावित करते हैं
• पूर्व जन्म के कर्म वर्तमान को प्रभावित करते हैं

भाग्य का प्रभाव:
• जन्म कुंडली में भाग्य का संकेत
• दशा-अंतर्दशा का प्रभाव
• ग्रहों की चाल का प्रभाव

कर्म से भाग्य परिवर्तन:
1. सकारात्मक कर्म
2. उपाय और अनुष्ठान
3. आध्यात्मिक साधना
4. सेवा और दान

निष्कर्ष: हम अपने कर्मों से भाग्य को प्रभावित कर सकते हैं। सकारात्मक कर्म और आध्यात्मिक साधना से जीवन को बेहतर बना सकते हैं।`,
      en: `Karma and destiny are complex. Is our fate predetermined or can we change it?

Karma Concept:
• Every action has its reward
• Present actions affect the future
• Past actions affect the present

Destiny Influence:
• Indication of Destiny in Birth Chart
• Impact of Aspects
• Impact of Planetary Movement

Karma to Destiny Change:
1. Positive Karma
2. Solutions and Devotion
3. Spiritual Practice
4. Service and Donation

Conclusion: We can influence our destiny through our actions. Positive karma and spiritual practice can improve our lives.`
    },
    date: "2023-05-25",
    slug: "karma-and-destiny"
  }
]

export function BlogGrid() {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-center text-gold">
        सभी ब्लॉग पोस्ट (All Blog Posts)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="bg-midnight-blue-light/80 hover:bg-midnight-blue transition-colors transform hover:scale-105 duration-300 border border-gold/30 hover:border-gold">
            <CardContent className="p-6">
              <h3 className="text-2xl font-serif font-semibold mb-2 text-gold">
                {post.title.hi}
              </h3>
              <h4 className="text-xl font-serif mb-2 text-gold/80">
                {post.title.en}
              </h4>
              <p className="mb-4 text-sm text-lavender/70">{post.date}</p>
              <p className="mb-2 text-sm text-lavender">{post.excerpt.hi}</p>
              <p className="mb-4 text-sm text-lavender/80">{post.excerpt.en}</p>
              <Button asChild className="bg-gold text-midnight-blue hover:bg-gold-light">
                <Link href={`/blog/${post.slug}`}>और पढ़ें (Read More)</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
