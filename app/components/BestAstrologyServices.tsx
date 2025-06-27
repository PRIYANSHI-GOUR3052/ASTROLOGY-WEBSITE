"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from '../contexts/useLanguage';

interface Service {
  title: {
    en: string;
    hi: string;
  };
  icon: string;
  slug: string;
  price: string;
  description: {
    en: string;
    hi: string;
  };
  themeColor: string;
}

const services: Service[] = [
  {
    title: { hi: "ज्योतिष", en: "Astrology" },
    icon: "/images/astrology.svg",
    slug: "astrology",
    price: "₹1,999",
    description: {
      en: "Unlock celestial guidance for your destiny. Gain insights and clarity on life's journey through expert astrology services tailored just for you.",
      hi: "अपनी नियति के लिए खगोलीय मार्गदर्शन को खोलें। विशेषज्ञ ज्योतिष सेवाओं के माध्यम से जीवन की यात्रा पर अंतर्दृष्टि और स्पष्टता प्राप्त करें।",
    },
    themeColor: '#F1F9FF' // Soft sky blue
  },
  {
    title: { hi: "अंक ज्योतिष", en: "Numerology" },
    icon: "/images/Numerology.svg",
    slug: "numerology",
    price: "₹1,499",
    description: {
      en: "Decode the numbers of your life's path. Explore personality traits, destiny, and potential through personalized numerology guidance.",
      hi: "अपने जीवन के मार्ग की संख्याओं को समझें। व्यक्तिगत अंक ज्योतिष मार्गदर्शन के माध्यम से व्यक्तित्व, भाग्य और क्षमता का पता लगाएं।",
    },
    themeColor: '#FFF9F0' // Light peach
  },
  {
    title: { hi: "हस्त रेखा", en: "Palmistry" },
    icon: "/images/palm.svg",
    slug: "palmistry",
    price: "₹1,799",
    description: {
      en: "Delve into the ancient wisdom of palmistry to reveal your destiny and potential. Explore the intricate lines of your palms for insights.",
      hi: "अपनी नियति और क्षमता को प्रकट करने के लिए हस्त रेखा के प्राचीन ज्ञान में गहराई से जाएं। अंतर्दृष्टि के लिए अपनी हथेलियों की जटिल रेखाओं का पता लगाएं।",
    },
    themeColor: '#F9F0FF' // Light lavender
  },
  {
    title: { hi: "तंत्र विद्या", en: "Tantra" },
    icon: "/images/tantra.svg",
    slug: "tantra",
    price: "₹2,299",
    description: {
      en: "Embark on a journey of spiritual awakening and self-discovery through tantra. Experience profound healing and empowerment.",
      hi: "तंत्र के माध्यम से आध्यात्मिक जागृति और आत्म-खोज की यात्रा पर निकलें। गहन चिकित्सा और सशक्तिकरण का अनुभव करें।",
    },
    themeColor: '#EFFFF7' // Light mint green
  }
];

// Helper function for safe language access
function getLocalizedText(obj: { en: string; hi: string }, lang: string) {
  return obj[lang as keyof typeof obj] ?? obj['en'];
}

const BestAstrologyServices = () => {
  const [expandedCards, setExpandedCards] = useState<boolean[]>(Array(services.length).fill(false));
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { lang } = useLanguage();

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const toggleCard = (index: number) => {
    const newExpandedCards = [...expandedCards];
    newExpandedCards[index] = !newExpandedCards[index];
    setExpandedCards(newExpandedCards);
  };

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <div className="py-16 bg-gradient-to-b from-white via-[#F8F8F8] to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-[#5A3B2B]">
          {lang === 'hi' ? 'हमारी सर्वश्रेष्ठ ज्योतिष सेवाएं' : 'Our Best Astrology Services'}
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-[#5A3B2B]">
          {lang === 'hi' ? 'अपने भविष्य को जानें' : 'Discover Your Future'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`rounded-xl shadow-xl p-6 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105`}
              style={{
                backgroundColor: service.themeColor,
                marginTop: index % 2 === 1 ? '4rem' : '0',
                marginLeft: index % 3 === 1 ? '2rem' : index % 3 === 2 ? '-2rem' : '0',
                boxShadow: '0 10px 30px -5px rgba(106, 13, 173, 0.2)'
              }}
              whileHover={{
                scale: 1.05,
                y: -5,
                x: index % 2 === 0 ? 5 : -5,
                boxShadow: "0 20px 40px -10px rgba(106, 13, 173, 0.3)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
              initial={{
                opacity: 0,
                y: index % 2 === 0 ? 50 : -50,
                x: index % 3 === 1 ? 30 : index % 3 === 2 ? -30 : 0
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }
              }}
            >
              <motion.div
                className="flex-grow flex items-center justify-center mb-4 w-32 h-32 relative"
                whileHover={{
                  scale: 1.1,
                  rotate: index % 2 === 0 ? 5 : -5,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Image
                  src={service.icon}
                  alt={getLocalizedText(service.title, lang)}
                  layout="fill"
                  objectFit="contain"
                />
              </motion.div>
              <h3 className="text-3xl font-serif font-extrabold mb-2 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-transparent bg-clip-text">{getLocalizedText(service.title, lang)}</h3>
              <p className="text-sm font-serif text-black mb-4 leading-tight tracking-wide">
                {expandedCards[index] ? getLocalizedText(service.description, lang) : truncateText(getLocalizedText(service.description, lang), 100)}
              </p>
              {getLocalizedText(service.description, lang).length > 100 && (
                <Button
                  variant="link"
                  className="text-purple-600 hover:underline p-0 h-auto text-sm font-semibold"
                  onClick={() => toggleCard(index)}
                >
                  {expandedCards[index] ? 'Read Less' : 'Read More'}
                </Button>
              )}
              <div className="mb-4 mt-2">
                <span className="text-2xl font-bold text-black">{service.price}</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 justify-center mb-4 w-full">
                <Button className="flex-1 bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">Add to Cart</Button>
                <Button className="flex-1 bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">{lang === 'hi' ? 'खरीदें' : 'Buy Now'}</Button>
              </div>
              <div className="space-y-4 w-full">
                <Dialog open={selectedService === service} onOpenChange={(open) => !open && setSelectedService(null)}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-2"
                      onClick={() => handleLearnMore(service)}
                    >
                      {lang === 'hi' ? 'और जानें' : 'LEARN MORE'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white border-gray-200 text-black shadow-xl p-6">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-serif text-black">{selectedService ? getLocalizedText(selectedService.title, lang) : ''}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      <p className="text-black mb-4">{selectedService ? getLocalizedText(selectedService.description, lang) : ''}</p>
                      <div className="mt-4">
                        <span className="text-2xl font-bold text-black">{selectedService?.price}</span>
                      </div>
                      {selectedService?.title.en === "Face Reading" && (
                        <div className="mt-6 space-y-4">
                          <h4 className="text-black font-serif text-xl">{lang === 'hi' ? 'अतिरिक्त लाभ:' : 'Additional Benefits:'}</h4>
                          <ul className="list-disc list-inside text-black space-y-2">
                            <li>{lang === 'hi' ? 'व्यक्तिगत जन्म कुंडली विश्लेषण' : 'Personalized birth chart analysis'}</li>
                            <li>{lang === 'hi' ? 'भविष्य की भविष्यवाणियां और मार्गदर्शन' : 'Future predictions and guidance'}</li>
                            <li>{lang === 'hi' ? 'रिश्ते की संगतता' : 'Relationship compatibility'}</li>
                            <li>{lang === 'hi' ? 'करियर और वित्तीय अंतर्दृष्टि' : 'Career and financial insights'}</li>
                          </ul>
                        </div>
                      )}
                      {selectedService?.title.en === "Horoscope" && (
                        <div className="mt-6 space-y-4">
                          <h4 className="text-black font-serif text-xl">{lang === 'hi' ? 'अतिरिक्त लाभ:' : 'Additional Benefits:'}</h4>
                          <ul className="list-disc list-inside text-black space-y-2">
                            <li>{lang === 'hi' ? 'पूर्ण अंक ज्योतिषीय प्रोफ़ाइल' : 'Complete numerological profile'}</li>
                            <li>{lang === 'hi' ? 'भाग्यशाली संख्या और तिथियां' : 'Lucky numbers and dates'}</li>
                            <li>{lang === 'hi' ? 'नाम विश्लेषण और सुझाव' : 'Name analysis and suggestions'}</li>
                            <li>{lang === 'hi' ? 'जीवन पथ संख्या व्याख्या' : 'Life path number interpretation'}</li>
                          </ul>
                        </div>
                      )}
                      {selectedService?.title.en === "Vastu Shastra" && (
                        <div className="mt-6 space-y-4">
                          <h4 className="text-black font-serif text-xl">{lang === 'hi' ? 'अतिरिक्त लाभ:' : 'Additional Benefits:'}</h4>
                          <ul className="list-disc list-inside text-black space-y-2">
                            <li>{lang === 'hi' ? 'विस्तृत हस्त रेखा पढ़ना' : 'Detailed palm reading'}</li>
                            <li>{lang === 'hi' ? 'जीवन रेखा विश्लेषण' : 'Life line analysis'}</li>
                            <li>{lang === 'hi' ? 'हृदय रेखा व्याख्या' : 'Heart line interpretation'}</li>
                            <li>{lang === 'hi' ? 'करियर और सफलता संकेतक' : 'Career and success indicators'}</li>
                          </ul>
                        </div>
                      )}
                      {selectedService?.title.en === "Tantra" && (
                        <div className="mt-6 space-y-4">
                          <h4 className="text-black font-serif text-xl">{lang === 'hi' ? 'अतिरिक्त लाभ:' : 'Additional Benefits:'}</h4>
                          <ul className="list-disc list-inside text-black space-y-2">
                            <li>{lang === 'hi' ? 'प्राचीन तांत्रिक अभ्यास' : 'Ancient tantric practices'}</li>
                            <li>{lang === 'hi' ? 'आध्यात्मिक उपचार तकनीकें' : 'Spiritual healing techniques'}</li>
                            <li>{lang === 'hi' ? 'ऊर्जा संरेखण' : 'Energy alignment'}</li>
                            <li>{lang === 'hi' ? 'संरक्षण और आशीर्वाद अनुष्ठान' : 'Protection and blessing rituals'}</li>
                          </ul>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <button
                        onClick={() => setSelectedService(null)}
                        className="px-6 py-2 rounded-full border border-[#2B6CB0] text-[#2B6CB0] hover:bg-[#E6F3FF] transition-all duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // Handle booking confirmation
                        }}
                        className="px-6 py-2 rounded-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Link href={`/services/${service.slug}`} className="block w-full">
                  <Button
                    className="w-full bg-[#E6F3FF] hover:bg-[#D1E7FF] text-[#2B6CB0] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    {lang === 'hi' ? 'परामर्श बुक करें' : 'Book Consultation'}
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestAstrologyServices;
