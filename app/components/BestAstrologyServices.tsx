"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from 'react'
import Link from 'next/link'

interface Service {
  title: string;
  icon: string;
  slug: string;
  price: string;
  description: {
    en: string;
    hi: string;
  };
}

const services: Service[] = [
  {
    title: "ज्योतिष (Astrology)",
    icon: "/images/astrology.svg", // Replace with actual astrology chart image
    slug: "astrology",
    price: "₹1,999",
    description: {
      en: "Unlock celestial guidance for your destiny. Gain insights and clarity on life's journey through expert astrology services tailored just for you.",
      hi: "अपनी नियति के लिए खगोलीय मार्गदर्शन को खोलें। विशेषज्ञ ज्योतिष सेवाओं के माध्यम से जीवन की यात्रा पर अंतर्दृष्टि और स्पष्टता प्राप्त करें।"
    }
  },
  {
    title: "अंक ज्योतिष (Numerology)",
    icon: "/images/Numerology.svg", // Replace with actual numerology symbol
    slug: "numerology",
    price: "₹1,499",
    description: {
      en: "Decode the numbers of your life's path. Explore personality traits, destiny, and potential through personalized numerology guidance.",
      hi: "अपने जीवन के मार्ग की संख्याओं को समझें। व्यक्तिगत अंक ज्योतिष मार्गदर्शन के माध्यम से व्यक्तित्व, भाग्य और क्षमता का पता लगाएं।"
    }
  },
  {
    title: "हस्त रेखा (Palmistry)",
    icon: "/images/palm.svg", // Replace with actual palmistry diagram
    slug: "palmistry",
    price: "₹1,799",
    description: {
      en: "Delve into the ancient wisdom of palmistry to reveal your destiny and potential. Explore the intricate lines of your palms for insights.",
      hi: "अपनी नियति और क्षमता को प्रकट करने के लिए हस्त रेखा के प्राचीन ज्ञान में गहराई से जाएं। अंतर्दृष्टि के लिए अपनी हथेलियों की जटिल रेखाओं का पता लगाएं।"
    }
  },
  {
    title: "तंत्र विद्या (Tantra)",
    icon: "/images/tantra.svg", // Replace with actual tantra symbol
    slug: "tantra",
    price: "₹2,299",
    description: {
      en: "Embark on a journey of spiritual awakening and self-discovery through tantra. Experience profound healing and empowerment.",
      hi: "तंत्र के माध्यम से आध्यात्मिक जागृति और आत्म-खोज की यात्रा पर निकलें। गहन चिकित्सा और सशक्तिकरण का अनुभव करें।"
    }
  }
]

export function BestAstrologyServices() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleLearnMore = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/30 to-celestial-blue/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-gold">
          हमारी सर्वश्रेष्ठ ज्योतिष सेवाएं
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-gold">
          Our Best Astrology Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-midnight-blue-light/80 hover:bg-midnight-blue transition-colors transform hover:scale-105 duration-300 border border-gold/30 hover:border-gold">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <img
                    src={service.icon}
                    alt={service.title}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-gold">{service.title}</h3>
                <p className="text-sm text-lavender mb-2">{service.description.hi}</p>
                <p className="text-sm text-lavender mb-6">{service.description.en}</p>
                
                {/* Price Display */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gold">{service.price}</span>
                </div>
                
                {/* Add to Cart and Buy Now buttons */}
                <div className="flex flex-col sm:flex-row gap-2 justify-center mb-4">
                  <Button 
                    className="bg-black text-white hover:bg-gray-800 flex-1 border border-gold/30"
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    className="bg-black text-white hover:bg-gray-800 flex-1 border border-gold/30"
                  >
                    खरीदें (Buy Now)
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="border-gold bg-black text-white hover:bg-gold hover:text-midnight-blue w-full mb-2"
                        onClick={() => handleLearnMore(service)}
                      >
                        और जानें (LEARN MORE)
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-midnight-blue border-gold text-white shadow-xl p-6">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-serif text-gold">{service.title}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <p className="text-lavender mb-4">{service.description.hi}</p>
                        <p className="text-lavender">{service.description.en}</p>
                        <div className="mt-4">
                          <span className="text-2xl font-bold text-gold">{service.price}</span>
                        </div>
                        <div className="mt-6 space-y-4">
                          <h4 className="text-gold font-serif text-xl">Additional Benefits:</h4>
                          {service.title.includes("ज्योतिष") && (
                            <ul className="list-disc list-inside text-lavender space-y-2">
                              <li>Personalized birth chart analysis</li>
                              <li>Future predictions and guidance</li>
                              <li>Relationship compatibility</li>
                              <li>Career and financial insights</li>
                            </ul>
                          )}
                          {service.title.includes("अंक ज्योतिष") && (
                            <ul className="list-disc list-inside text-lavender space-y-2">
                              <li>Complete numerological profile</li>
                              <li>Lucky numbers and dates</li>
                              <li>Name analysis and suggestions</li>
                              <li>Life path number interpretation</li>
                            </ul>
                          )}
                          {service.title.includes("हस्त रेखा") && (
                            <ul className="list-disc list-inside text-lavender space-y-2">
                              <li>Detailed palm reading</li>
                              <li>Life line analysis</li>
                              <li>Heart line interpretation</li>
                              <li>Career and success indicators</li>
                            </ul>
                          )}
                          {service.title.includes("तंत्र") && (
                            <ul className="list-disc list-inside text-lavender space-y-2">
                              <li>Ancient tantric practices</li>
                              <li>Spiritual healing techniques</li>
                              <li>Energy alignment</li>
                              <li>Protection and blessing rituals</li>
                            </ul>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Link href={`/services/${service.slug}`} className="block">
                    <Button 
                      variant="outline" 
                      className="border-gold bg-black text-white hover:bg-gold hover:text-midnight-blue w-full"
                    >
                      Book Consultation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}