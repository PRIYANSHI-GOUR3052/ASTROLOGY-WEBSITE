'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, CheckCircle, ShoppingBag } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

// New set of card backgrounds inspired by the snapshot
const cardBackgrounds = [
  "bg-gradient-to-br from-blue-50 to-indigo-100",  // Light Blue/Indigo
  "bg-gradient-to-br from-green-50 to-emerald-100", // Light Green/Emerald
  "bg-gradient-to-br from-orange-50 to-red-100",   // Light Orange/Red
  "bg-gradient-to-br from-purple-50 to-pink-100",  // Light Purple/Pink
  "bg-gradient-to-br from-yellow-50 to-lime-100",   // Light Yellow/Lime
  "bg-gradient-to-br from-teal-50 to-cyan-100",    // Light Teal/Cyan
];

interface Service {
  title: { en: string; hi: string; };
  description: { en: string; hi: string; };
  slug: string;
  price: string;
  category: string;
  rating?: number;
  percentage?: number;
  cardSize: 'small' | 'large';
}

const services: Service[] = [
  {
    title: { hi: "कर्मयोग साधना", en: "Nakshatra Insights" },
    description: {
      en: "Gain deeper understanding of your karmic patterns and spiritual path through Nakshatra insights. Learn how celestial bodies influence your destiny.",
      hi: "नक्षत्र अंतर्दृष्टि के माध्यम से अपने कर्मिक पैटर्न और आध्यात्मिक मार्ग की गहरी समझ प्राप्त करें। जानें कि आकाशीय पिंड आपके भाग्य को कैसे प्रभावित करते हैं।"
    },
    slug: "nakshatra-insights",
    price: "₹1,999",
    category: "Astrology",
    rating: 4.1,
    percentage: 85,
    cardSize: 'small',
  },
  {
    title: { hi: "आत्म-वृद्धि योग", en: "Spiritual Growth" },
    description: {
      en: "Develop a personalized plan for spiritual growth that aligns with your cosmic blueprint and fosters inner peace. Connect with your higher self.",
      hi: "अपनी ब्रह्मांडीय ब्लूप्रिंट के साथ संरेखित और आंतरिक शांति को बढ़ावा देने वाली आध्यात्मिक वृद्धि के लिए एक व्यक्तिगत योजना विकसित करें। अपने उच्च स्व से जुड़ें।"
    },
    slug: "spiritual-growth",
    price: "₹1,499",
    category: "Spirituality",
    rating: 4.5,
    percentage: 70,
    cardSize: 'small',
  },
  {
    title: { hi: "कुंडली विश्लेषण", en: "Personalized Horoscope" },
    description: {
      en: "Develop a deeper sense of belonging and an active involvement in meaningful cosmic alignment through personalized horoscope analysis. Uncover hidden strengths and challenges.",
      hi: "व्यक्तिगत कुंडली विश्लेषण के माध्यम से सार्थक ब्रह्मांडीय संरेखण में संबंध और सक्रिय भागीदारी की गहरी भावना विकसित करें। छिपी हुई शक्तियों और चुनौतियों को उजागर करें।"
    },
    slug: "personalized-horoscope",
    price: "₹2,299",
    category: "Horoscopy",
    rating: 5,
    percentage: 90,
    cardSize: 'large',
  },
  {
    title: { hi: "भविष्य दर्शन", en: "Future Visioning" },
    description: {
      en: "Learn how to strategize and formulate your own future path based on astrological predictions and intuitive guidance. Chart your course for success.",
      hi: "ज्योतिषीय भविष्यवाणियों और सहज ज्ञान युक्त मार्गदर्शन के आधार पर अपने भविष्य के मार्ग की रणनीति और निर्माण करना सीखें। सफलता के लिए अपना मार्ग निर्धारित करें।"
    },
    slug: "future-visioning",
    price: "₹1,799",
    category: "Predictions",
    rating: 4.6,
    percentage: 100,
    cardSize: 'large',
  },
  {
    title: { hi: "लक्ष्य संरेखण", en: "Goal Alignment" },
    description: {
      en: "Adapt your strategies to maximize personal and professional success by aligning with auspicious planetary periods. Achieve your aspirations.",
      hi: "शुभ ग्रहों की अवधि के साथ संरेखित करके व्यक्तिगत और व्यावसायिक सफलता को अधिकतम करने के लिए अपनी रणनीतियों को अनुकूलित करें। अपनी आकांक्षाओं को प्राप्त करें।"
    },
    slug: "goal-alignment",
    price: "₹1,899",
    category: "Coaching",
    rating: 4.2,
    percentage: 75,
    cardSize: 'small',
  },
  {
    title: { hi: "आत्मविश्वास मंत्र", en: "Self-belief & Empowerment" },
    description: {
      en: "Gain confidence in your abilities and foster an empowered mindset to overcome obstacles with astrological remedies and positive affirmations. Embrace your power.",
      hi: "ज्योतिषीय उपायों और सकारात्मक प्रतिज्ञानों के साथ बाधाओं को दूर करने के लिए अपनी क्षमताओं में विश्वास प्राप्त करें और एक सशक्त मानसिकता को बढ़ावा दें। अपनी शक्ति को गले लगाओ।"
    },
    slug: "self-belief",
    price: "₹1,299",
    category: "Remedies",
    rating: 3.9,
    percentage: 60,
    cardSize: 'small',
  },
];

export function BestServices() {
  const { lang } = useLanguage();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const smallCards = services.filter(service => service.cardSize === 'small');
  const largeCards = services.filter(service => service.cardSize === 'large');

  return (
    <section className="min-h-screen py-16 bg-[#FDF7ED] font-sans overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="flex justify-between items-center py-4 mb-12">
          <div className="flex items-center gap-2">
            <Image src="/zodiac_wheel_icon.svg" alt="Astrology Magic" width={30} height={30} />
            <span className="text-xl font-bold text-gray-900">Astrology Magic</span>
          </div>
          <div className="flex items-center gap-6">
          </div>
        </div>

        {/* New Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl p-10 mb-12 text-center shadow-xl overflow-hidden"
          style={{ backgroundImage: 'linear-gradient(to right, #ff6e7f 0%, #bfe9ff 51%, #ff6e7f 100%)' }}
        >
          {/* Starry background effect */}
          <div className="absolute inset-0 z-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 10%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.08) 0%, transparent 15%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 10%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 12%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 10%)', backgroundSize: '300px 300px, 400px 400px, 200px 200px, 350px 350px, 250px 250px' }}></div>

          <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-black">
            {lang === 'en' ? "Unlock Your Cosmic Potential" : "अपनी ब्रह्मांडीय क्षमता को अनलॉक करें"}
          </h2>
          <p className="relative z-10 text-lg md:text-xl mb-6 opacity-90 text-black">
            {lang === 'en' ? "Discover personalized insights and guidance for a life aligned with the stars." : "सितारों के साथ संरेखित जीवन के लिए व्यक्तिगत अंतर्दृष्टि और मार्गदर्शन प्राप्त करें।"}
          </p>
          <Link href="/contact-us">
            <Button className="btn-grad rounded-full text-lg font-semibold relative z-10">
              {lang === 'en' ? "Book a Consultation" : "परामर्श बुक करें"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {smallCards.slice(0, 2).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className={`relative rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cardBackgrounds[index]}`}
              style={{ height: '220px' }}
            >
              <span className="absolute top-4 left-6 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{service.category}</span>
              
              <div className="absolute top-4 right-6 bg-white rounded-full p-2 shadow-md">
                <Star className="w-5 h-5 text-black" /> 
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-xl font-extrabold text-black leading-tight mb-2">
                  {service.title[lang]}
                </h4>
                <p className="text-black text-sm mb-4">
                  {truncateText(service.description[lang], 80)}
                </p>
                <div className="flex items-center text-black text-sm">
                  {service.rating && <><Star className="w-4 h-4 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-4 h-4 ml-4 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}

          {largeCards.slice(0, 1).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`relative rounded-2xl shadow-lg p-8 flex flex-col justify-between ${cardBackgrounds[2]}`}
              style={{ minHeight: '380px' }}
            >
              <span className="absolute top-6 left-8 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{service.category}</span>
              
              <div className="absolute top-6 right-8 bg-white rounded-full p-3 shadow-md">
                <Star className="w-6 h-6 text-black" />
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-3xl md:text-4xl font-extrabold text-black leading-tight mb-4">
                  {service.title[lang]}
                </h4>
                <p className="text-black text-base mb-6">
                  {truncateText(service.description[lang], 150)}
                </p>
                <div className="flex items-center text-black text-lg">
                  {service.rating && <><Star className="w-5 h-5 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-5 h-5 ml-6 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}

          {largeCards.slice(1, 2).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`relative rounded-2xl shadow-lg p-8 flex flex-col justify-between ${cardBackgrounds[3]}`}
              style={{ minHeight: '380px' }}
            >
              <span className="absolute top-6 left-8 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{service.category}</span>
              
              <div className="absolute top-6 right-8 bg-white rounded-full p-3 shadow-md">
                <Star className="w-6 h-6 text-black" />
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-3xl md:text-4xl font-extrabold text-black leading-tight mb-4">
                  {service.title[lang]}
                </h4>
                <p className="text-black text-base mb-6">
                  {truncateText(service.description[lang], 150)}
                </p>
                <div className="flex items-center text-black text-lg">
                  {service.rating && <><Star className="w-5 h-5 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-5 h-5 ml-6 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}
          
          {smallCards.slice(2, 4).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className={`relative rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cardBackgrounds[index + 4]}`}
              style={{ height: '220px' }}
            >
              <span className="absolute top-4 left-6 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{service.category}</span>
              
              <div className="absolute top-4 right-6 bg-white rounded-full p-2 shadow-md">
                <Star className="w-5 h-5 text-black" />
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-xl font-extrabold text-black leading-tight mb-2">
                  {service.title[lang]}
                </h4>
                <p className="text-black text-sm mb-4">
                  {truncateText(service.description[lang], 80)}
                </p>
                <div className="flex items-center text-black text-sm">
                  {service.rating && <><Star className="w-4 h-4 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-4 h-4 ml-4 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-12">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl md:text-4xl font-extrabold mb-4 text-black"
          >
            {lang === 'en' ? "EXPLORE OUR TOP ASTROLOGY SERVICES" : "हमारी शीर्ष ज्योतिष सेवाओं का अन्वेषण करें"}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto mb-8"
          >
            {lang === 'en' ? "Discover our comprehensive range of astrology services designed to guide you through life's journey with cosmic wisdom." : "ब्रह्मांडीय ज्ञान के साथ जीवन की यात्रा में आपका मार्गदर्शन करने के लिए डिज़ाइन की गई हमारी व्यापक ज्योतिष सेवाओं की खोज करें।"}
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/services/popular">
              <Button className="btn-grad rounded-full text-lg font-semibold">
                {lang === 'en' ? "Popular Services" : "लोकप्रिय सेवाएं"}
              </Button>
            </Link>
            <Link href="/services/consultation">
              <Button className="btn-grad rounded-full text-lg font-semibold">
                {lang === 'en' ? "Consultation" : "परामर्श"}
              </Button>
            </Link>
            <Link href="/services/learn">
              <Button className="btn-grad rounded-full text-lg font-semibold">
                {lang === 'en' ? "Learn More" : "और जानें"}
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {smallCards.slice(4, 6).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className={`relative rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cardBackgrounds[index + 4]}`}
              style={{ height: '220px' }}
            >
              <span className="absolute top-4 left-6 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{service.category}</span>
              
              <div className="absolute top-4 right-6 bg-white rounded-full p-2 shadow-md">
                <Star className="w-5 h-5 text-black" />
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-xl font-extrabold text-black leading-tight mb-2">
                  {service.title[lang]}
                </h4>
                <p className="text-black text-sm mb-4">
                  {truncateText(service.description[lang], 80)}
                </p>
                <div className="flex items-center text-black text-sm">
                  {service.rating && <><Star className="w-4 h-4 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-4 h-4 ml-4 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
