'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Sun, Home, Map, ArrowRight, Facebook, Instagram, Twitter, MessageSquare, Heart, Bookmark, Share2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Dummy content for new sections based on snapshot
const snapshotContent = {
  forDevelopers: {
    title: { en: "For Beginners in Astrology", hi: "ज्योतिष के शुरुआती लोगों के लिए" },
    description: { en: "No prior knowledge required. Our intuitive platform makes learning astrology easy and accessible.", hi: "किसी पूर्व ज्ञान की आवश्यकता नहीं। हमारा सहज मंच ज्योतिष सीखना आसान और सुलभ बनाता है।" },
  },
  pasteCoolPhotos: {
    title: { en: "Daily Horoscope Insights", hi: "दैनिक राशिफल अंतर्दृष्टि" },
    description: { en: "Get precise, daily predictions curated just for you. Start your day with cosmic guidance.", hi: "आपके लिए विशेष रूप से तैयार की गई सटीक, दैनिक भविष्यवाणियां प्राप्त करें। ब्रह्मांडीय मार्गदर्शन के साथ अपने दिन की शुरुआत करें।" },
    imageUrl: "/images/horoscope_daily.jpg", // Placeholder image
  },
  fitsForCatlovers: {
    title: { en: "Zodiac Sign Compatibility", hi: "राशिफल संगतता" },
    description: { en: "Discover how compatible you are with other zodiac signs and deepen your understanding of relationships.", hi: "जानें कि आप अन्य राशियों के साथ कितने संगत हैं और रिश्तों की अपनी समझ को गहरा करें।" },
    imageUrl: "/images/zodiac_compatibility.jpg", // Placeholder image
  },
  coffeinia: {
    title: { en: "Personalized Astrology App", hi: "व्यक्तिगत ज्योतिष ऐप" },
    description: { en: "Experience personalized readings and daily insights on the go with our mobile application.", hi: "हमारे मोबाइल एप्लिकेशन के साथ चलते-फिरते व्यक्तिगत रीडिंग और दैनिक अंतर्दृष्टि का अनुभव करें।" },
    appScreenshot: "/images/astrology_app_mockup.jpg", // Placeholder image
  },
  equipATeam: {
    title: { en: "Equip Yourself with Cosmic Knowledge", hi: "ब्रह्मांडीय ज्ञान से स्वयं को सुसज्जित करें" },
    description: { en: "For those seeking deeper understanding, our curated courses and resources are designed for all levels.", hi: "गहरी समझ चाहने वालों के लिए, हमारे क्यूरेट किए गए पाठ्यक्रम और संसाधन सभी स्तरों के लिए डिज़ाइन किए गए हैं।" },
  },
  saveTime: {
    title: { en: "Save Time, Gain Clarity", hi: "समय बचाएं, स्पष्टता प्राप्त करें" },
    description: { en: "Our streamlined consultation process and comprehensive reports give you answers quickly and efficiently.", hi: "हमारी सुव्यवस्थित परामर्श प्रक्रिया और व्यापक रिपोर्ट आपको जल्दी और कुशलता से जवाब देती हैं।" },
  },
  rescalable: {
    title: { en: "Explore Advanced Vedic Concepts", hi: "उन्नत वैदिक अवधारणाओं का अन्वेषण करें" },
    description: { en: "Move beyond the basics. Our advanced courses and workshops cover complex astrological principles for profound insights.", hi: "मूल बातों से आगे बढ़ें। हमारे उन्नत पाठ्यक्रम और कार्यशालाएं गहन अंतर्दृष्टि के लिए जटिल ज्योतिषीय सिद्धांतों को कवर करती हैं।" },
  },
  forDesigners: {
    title: { en: "Astrology Resources for Everyone", hi: "सभी के लिए ज्योतिष संसाधन" },
    description: { en: "Access our rich library of articles, e-books, and tools to enhance your astrological journey.", hi: "अपनी ज्योतिषीय यात्रा को बढ़ाने के लिए लेखों, ई-पुस्तकों और उपकरणों की हमारी समृद्ध लाइब्रेरी तक पहुंचें।" },
  },
  simpleMockups: {
    title: { en: "Visualize Your Planetary Alignments", hi: "अपनी ग्रहीय संरेखण की कल्पना करें" },
    description: { en: "Interactive tools to see your birth chart and planetary transits come to life.", hi: "अपनी जन्म कुंडली और ग्रहों के गोचर को जीवंत देखने के लिए इंटरैक्टिव उपकरण।" },
    laptopScreenshot: "/images/birth_chart_mockup.jpg", // Placeholder image
  }
};

const floatingShapes = [
  { className: 'w-24 h-24 rounded-full bg-blue-200 opacity-60 blur-xl', style: { top: '5%', left: '10%' } },
  { className: 'w-32 h-32 rounded-full bg-pink-200 opacity-60 blur-xl', style: { top: '20%', right: '5%' } },
  { className: 'w-28 h-28 rounded-full bg-purple-200 opacity-60 blur-xl', style: { bottom: '15%', left: '20%' } },
  { className: 'w-20 h-20 rounded-full bg-yellow-200 opacity-60 blur-xl', style: { bottom: '5%', right: '25%' } },
  { className: 'w-40 h-40 rounded-full bg-green-200 opacity-60 blur-xl', style: { top: '50%', left: '5%' } },
  { className: 'w-36 h-36 rounded-full bg-red-200 opacity-60 blur-xl', style: { top: '40%', right: '15%' } },
];

const cuteGradients = [
  "bg-gradient-to-br from-pink-300 to-purple-400", // Stronger Pink to Purple
  "bg-gradient-to-br from-blue-300 to-green-400",  // Stronger Blue to Green
  "bg-gradient-to-br from-yellow-300 to-orange-400", // Stronger Yellow to Orange
  "bg-gradient-to-br from-teal-300 to-cyan-400",   // Stronger Teal to Cyan
  "bg-gradient-to-br from-red-300 to-pink-400",    // Stronger Red to Pink
  "bg-gradient-to-br from-indigo-300 to-blue-400", // Stronger Indigo to Blue
  "bg-gradient-to-br from-purple-300 to-fuchsia-400", // Stronger Purple to Fuchsia
  "bg-gradient-to-br from-lime-300 to-emerald-400", // Stronger Lime to Emerald
  "bg-gradient-to-br from-rose-300 to-red-400",    // Stronger Rose to Red
  "bg-gradient-to-br from-violet-300 to-indigo-400", // Stronger Violet to Indigo
];

interface Service {
  title: { en: string; hi: string; };
  description: { en: string; hi: string; };
  fullDescription?: { en: string; hi: string; };
  slug: string;
  icon: JSX.Element;
  price: number;
  themeColor: string;
}

const services: Service[] = [
  {
    title: { en: "Face Reading", hi: "चेहरे की पहेली" },
    description: { en: "Gain insights into your nature and destiny by analyzing facial lines.", hi: "आपके स्वभाव और तकदीर के बारे में जानकारी प्राप्त करने के लिए चेहरे की लकीरों का विश्लेषण।" },
    fullDescription: { en: "Gain insights into your nature and destiny by analyzing facial lines. This ancient art reveals hidden personality traits and future tendencies, guiding you towards self-discovery and a harmonious life. Discover the deeper meanings behind your facial features and understand their cosmic influence.", hi: "नक्षत्र अंतर्दृष्टि के माध्यम से अपने कर्मिक पैटर्न और आध्यात्मिक मार्ग की गहरी समझ प्राप्त करें। जानें कि आकाशीय पिंड आपके भाग्य को कैसे प्रभावित करते हैं। यह प्राचीन कला छिपे हुए व्यक्तित्व लक्षणों और भविष्य की प्रवृत्तियों को प्रकट करती है, जिससे आपको आत्म-खोज और एक सामंजस्यपूर्ण जीवन की ओर मार्गदर्शन मिलता है। अपने चेहरे की विशेषताओं के पीछे छिपे गहरे अर्थों को जानें और उनके ब्रह्मांडीय प्रभाव को समझें।" },
    slug: "face-reading",
    icon: <Moon className="w-12 h-12 text-black" />,
    price: 1999,
    themeColor: '#F5F5DC',
  },
  {
    title: { en: "Horoscope", hi: "जन्म कुंडली" },
    description: { en: "Customized horoscope readings for career, love, and health predictions.", hi: "करियर, प्रेम और स्वास्थ्य की भविष्यवाणियों के लिए अनुकूलित जन्म कुंडली पठन।" },
    fullDescription: { en: "Customized horoscope readings for career, love, and health predictions. Our expert astrologers provide detailed analysis of your birth chart, offering guidance on crucial life decisions and future opportunities. Get daily, weekly, and monthly insights to navigate your path.", hi: "करियर, प्रेम और स्वास्थ्य की भविष्यवाणियों के लिए अनुकूलित जन्म कुंडली पठन। हमारे विशेषज्ञ ज्योतिषी आपकी जन्म कुंडली का विस्तृत विश्लेषण प्रदान करते हैं, महत्वपूर्ण जीवन निर्णयों और भविष्य के अवसरों पर मार्गदर्शन प्रदान करते हैं। दैनिक, साप्ताहिक और मासिक अंतर्दृष्टि प्राप्त करें।" },
    slug: "horoscope",
    icon: <Sun className="w-12 h-12 text-black" />,
    price: 2499,
    themeColor: '#F0F8FF',
  },
  {
    title: { en: "Vastu Shastra", hi: "वास्तु शास्त्र" },
    description: { en: "Suggestions on home and office design based on Vastu principles for prosperity and peace.", hi: "समृद्धि (संपन्नता) और शांति के लिए वास्तु सिद्धांतों पर आधारित घर और दफ्तर के डिजाइन पर सुझाव।" },
    fullDescription: { en: "Suggestions on home and office design based on Vastu principles for prosperity and peace. Optimize your living and working spaces to enhance positive energy flow, leading to better health, wealth, and relationships. Create a harmonious environment that supports your well-being.", hi: "समृद्धि (संपन्नता) और शांति के लिए वास्तु सिद्धांतों पर आधारित घर और दफ्तर के डिजाइन पर सुझाव। सकारात्मक ऊर्जा प्रवाह को बढ़ाने के लिए अपने रहने और काम करने की जगहों को अनुकूलित करें, जिससे बेहतर स्वास्थ्य, धन और संबंध प्राप्त हों। एक सामंजस्यपूर्ण वातावरण बनाएं जो आपके कल्याण का समर्थन करे।" },
    slug: "vastu-shastra",
    icon: <Home className="w-12 h-12 text-black" />,
    price: 1499,
    themeColor: '#F5FFFA',
  },
  {
    title: { en: "Astrocartography", hi: "भौतिक स्थल ज्योतिष" },
    description: { en: "Discover ideal locations for work, love, and personal growth.", hi: "काम, प्यार और व्यक्तिगत विकास के लिए आदर्श स्थान (स्थल) खोजें।" },
    slug: "astrocartography",
    icon: <Map className="w-12 h-12 text-black" />,
    price: 1799,
    themeColor: '#FFF0F5',
  },
];

interface RecentPost {
  title: { en: string; hi: string; };
  imageUrl: string;
  date: string;
  slug: string;
}

const recentPosts: RecentPost[] = [
  {
    title: { en: "Understanding Your Birth Chart", hi: "अपनी जन्म कुंडली को समझना" },
    imageUrl: "/images/recent-post-1.jpg",
    date: "10 May, 2024",
    slug: "understanding-birth-chart",
  },
  {
    title: { en: "The Power of Gemstones", hi: "रत्न का महत्व" },
    imageUrl: "/images/recent-post-2.jpg",
    date: "09 May, 2024",
    slug: "power-of-gemstones",
  },
  {
    title: { en: "Meditation for Astrological Balance", hi: "ज्योतिषीय संतुलन के लिए ध्यान" },
    imageUrl: "/images/recent-post-3.jpg",
    date: "08 May, 2024",
    slug: "meditation-astrological-balance",
  },
  {
    title: { en: "Navigating Retrograde Periods", hi: "वक्री काल को समझना" },
    imageUrl: "/images/recent-post-4.jpg",
    date: "07 May, 2024",
    slug: "navigating-retrograde-periods",
  },
];


export function ServicesOverview() {
  const [showFullDescription, setShowFullDescription] = useState<{ [key: string]: boolean }>({});

  const toggleDescription = (slug: string) => {
    setShowFullDescription(prevState => ({
      ...prevState,
      [slug]: !prevState[slug],
    }));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section className="relative min-h-screen py-16 bg-white font-sans overflow-hidden">
      {/* Floating background shapes */}
      {floatingShapes.map((shape, index) => (
        <div
          key={index}
          className={`absolute ${shape.className}`}
          style={shape.style}
        ></div>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* For Developers / Beginners in Astrology -> Face Reading Service */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative flex flex-col rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl p-6 text-center ${cuteGradients[0]}`}
          >
            {/* Cart Icon at top-right */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
              <Link href="/cart" passHref>
                <ShoppingBag className="w-6 h-6 text-black" />
              </Link>
            </div>
            <CardContent className="flex-grow p-0 flex flex-col justify-between h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md">
                      {services[0].icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {services[0].title.en}
                  </h3>
                  <p className="text-black text-sm mb-4">
                    {showFullDescription[services[0].slug] && services[0].fullDescription ? services[0].fullDescription.en : truncateText(services[0].description.en, 100)}
                  </p>
                  {services[0].fullDescription && (
                    <Button
                      onClick={() => toggleDescription(services[0].slug)}
                      className="mt-2 bg-transparent hover:bg-gray-100 text-blue-600 hover:text-blue-700 py-1 px-2 rounded"
                    >
                      {showFullDescription[services[0].slug] ? 'Read Less' : 'Read More'}
                    </Button>
                  )}
                  <div className="mb-4 mt-2">
                    <span className="text-3xl font-bold text-black">₹{services[0].price}</span>
                  </div>
                  <div className="space-y-2 w-full">
                    <Button className="w-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full py-2 shadow-md transition duration-300">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
          </motion.div>

          {/* Cards colored with Mockups - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 flex items-center justify-center"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center">
              Explore Our Key Offerings
            </h2>
          </motion.div>

          {/* Paste cool photos! / Daily Horoscope Insights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${cuteGradients[1]} rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between`}
          >
            <h3 className="text-xl font-bold text-black mb-2 text-center">{snapshotContent.pasteCoolPhotos.title.en}</h3>
            <p className="text-black text-sm mb-4 text-center">{snapshotContent.pasteCoolPhotos.description.en}</p>
            <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden">
              <Image src={snapshotContent.pasteCoolPhotos.imageUrl} alt="Horoscope Daily" fill style={{ objectFit: 'cover' }} />
            </div>
            <Link href="/daily-horoscope" passHref>
              <Button className="btn-grad rounded-full text-sm font-semibold">
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Fits for Catlovers / Zodiac Sign Compatibility -> Horoscope Service */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`relative flex flex-col rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl p-6 text-center ${cuteGradients[2]}`}
          >
            {/* Cart Icon at top-right */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
              <Link href="/cart" passHref>
                <ShoppingBag className="w-6 h-6 text-black" />
              </Link>
            </div>
            <CardContent className="flex-grow p-0 flex flex-col justify-between h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md">
                      {services[1].icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {services[1].title.en}
                  </h3>
                  <p className="text-black text-sm mb-4">
                    {showFullDescription[services[1].slug] && services[1].fullDescription ? services[1].fullDescription.en : truncateText(services[1].description.en, 100)}
                  </p>
                  {services[1].fullDescription && (
                    <Button
                      onClick={() => toggleDescription(services[1].slug)}
                      className="mt-2 bg-transparent hover:bg-gray-100 text-blue-600 hover:text-blue-700 py-1 px-2 rounded"
                    >
                      {showFullDescription[services[1].slug] ? 'Read Less' : 'Read More'}
                    </Button>
                  )}
                  <div className="mb-4 mt-2">
                    <span className="text-3xl font-bold text-black">₹{services[1].price}</span>
                  </div>
                  <div className="space-y-2 w-full">
                    <Button className="w-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full py-2 shadow-md transition duration-300">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
          </motion.div>

          {/* Coffeinia / Personalized Astrology App */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`relative rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center overflow-hidden ${cuteGradients[3]}`}
          >
            <h3 className="text-2xl font-bold text-black mb-2 text-center">{snapshotContent.coffeinia.title.en}</h3>
            <p className="text-black text-sm mb-4 text-center">{snapshotContent.coffeinia.description.en}</p>
            <div className="relative w-48 h-96">
              <Image src={snapshotContent.coffeinia.appScreenshot} alt="App Screenshot" fill style={{ objectFit: 'contain' }} />
            </div>
            <div className="space-y-2 w-full mt-4">
                <Button className="w-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full py-2 shadow-md transition duration-300">
                  Buy Now
                </Button>
            </div>
          </motion.div>

          {/* Equip a team / Equip Yourself with Cosmic Knowledge & Save Time, Gain Clarity */}
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cuteGradients[4]}`}
            >
              <div className="flex items-center mb-4">
                <ArrowRight className="w-6 h-6 text-black mr-2" />
                <h3 className="text-xl font-bold text-black">{snapshotContent.equipATeam.title.en}</h3>
              </div>
              <p className="text-black text-sm mb-4">{snapshotContent.equipATeam.description.en}</p>
              <Link href="/courses" passHref className="ml-auto">
                <Button className="btn-grad rounded-full text-sm font-semibold">
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cuteGradients[5]}`}
            >
              <div className="flex items-center mb-4">
                <ArrowRight className="w-6 h-6 text-black mr-2" />
                <h3 className="text-xl font-bold text-black">{snapshotContent.saveTime.title.en}</h3>
              </div>
              <p className="text-black text-sm mb-4">{snapshotContent.saveTime.description.en}</p>
              <Link href="/consultation" passHref className="ml-auto">
                <Button className="btn-grad rounded-full text-sm font-semibold">
                  Book Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* When You're Thinking It's Your Potential Limit To Reach a Success -> Vastu Shastra Service */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`relative flex flex-col rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl p-6 text-center ${cuteGradients[6]}`}
          >
            {/* Cart Icon at top-right */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
              <Link href="/cart" passHref>
                <ShoppingBag className="w-6 h-6 text-black" />
              </Link>
            </div>
            <CardContent className="flex-grow p-0 flex flex-col justify-between h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md">
                      {services[2].icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {services[2].title.en}
                  </h3>
                  <p className="text-black text-sm mb-4">
                    {showFullDescription[services[2].slug] && services[2].fullDescription ? services[2].fullDescription.en : truncateText(services[2].description.en, 100)}
                  </p>
                  {services[2].fullDescription && (
                    <Button
                      onClick={() => toggleDescription(services[2].slug)}
                      className="mt-2 bg-transparent hover:bg-gray-100 text-blue-600 hover:text-blue-700 py-1 px-2 rounded"
                    >
                      {showFullDescription[services[2].slug] ? 'Read Less' : 'Read More'}
                    </Button>
                  )}
                  <div className="mb-4 mt-2">
                    <span className="text-3xl font-bold text-black">₹{services[2].price}</span>
                  </div>
                  <div className="space-y-2 w-full">
                    <Button className="w-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full py-2 shadow-md transition duration-300">
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
          </motion.div>

          {/* Simple Mockups / Visualize Your Planetary Alignments */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`relative rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center overflow-hidden ${cuteGradients[7]}`}
          >
            <h3 className="text-2xl font-bold text-black mb-2 text-center">{snapshotContent.simpleMockups.title.en}</h3>
            <p className="text-black text-sm mb-4 text-center">{snapshotContent.simpleMockups.description.en}</p>
            <div className="relative w-full h-48">
              <Image src={snapshotContent.simpleMockups.laptopScreenshot} alt="Laptop Screenshot" fill style={{ objectFit: 'contain' }} />
            </div>
          </motion.div>

          {/* Rescalable / Explore Advanced Vedic Concepts & For Designers / Astrology Resources */}
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cuteGradients[8]}`}
            >
              <h3 className="text-xl font-bold text-black mb-2">{snapshotContent.rescalable.title.en}</h3>
              <p className="text-black text-sm mb-4">{snapshotContent.rescalable.description.en}</p>
              <Link href="/advanced-courses" passHref>
                <Button className="btn-grad rounded-full text-sm font-semibold mt-auto">
                  Download Resources
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cuteGradients[9]}`}
            >
              <h3 className="text-xl font-bold text-black mb-2">{snapshotContent.forDesigners.title.en}</h3>
              <p className="text-black text-sm mb-4">{snapshotContent.forDesigners.description.en}</p>
              <div className="flex justify-end mt-auto">
                <Image src="/images/designer_icon.png" alt="Designer Icon" width={80} height={80} className="opacity-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}