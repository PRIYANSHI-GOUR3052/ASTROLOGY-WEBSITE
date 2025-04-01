'use client';

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Moon, Sun, Hash, Home, Map, Gem, Sparkles, Heart } from 'lucide-react'
import ServiceButton from './ServiceButton'
import AddToCartButton from './AddToCartButton'

interface Service {
  title: string;
  description: string;
  slug: string;
  icon: JSX.Element;
  price: number;
}

const services: Service[] = [
  {
    title: "चेहरे की पहेली (Face Reading)",
    description: "आपके स्वभाव और तकदीर के बारे में जानकारी प्राप्त करने के लिए चेहरे की लकीरों का विश्लेषण।",
    slug: "face-reading",
    icon: <Moon className="w-12 h-12" />,
    price: 1999,
  },
  {
    title: "जन्म कुंडली (Horoscope)",
    description: "करियर, प्रेम और स्वास्थ्य की भविष्यवाणियों के लिए अनुकूलित जन्म कुंडली पठन।",
    slug: "horoscope",
    icon: <Sun className="w-12 h-12" />,
    price: 2499,
  },
  {
    title: "वास्तु शास्त्र",
    description: "समृद्धि (संपन्नता) और शांति के लिए वास्तु सिद्धांतों पर आधारित घर और दफ्तर के डिजाइन पर सुझाव।",
    slug: "vastu-shastra",
    icon: <Home className="w-12 h-12" />,
    price: 1499,
  },
  {
    title: "भौतिक स्थल ज्योतिष (Astrocartography)",
    description: "काम, प्यार और व्यक्तिगत विकास के लिए आदर्श स्थान (स्थल) खोजें।",
    slug: "astrocartography",
    icon: <Map className="w-12 h-12" />,
    price: 1799,
  },
]

export function ServicesOverview() {
  const handleBuyNow = (service: Service) => {
    console.log(`Buy Now: ${service.title}`);
    // Add your buy now logic here
  };

  const handleBookConsultation = (service: Service) => {
    console.log(`Book Consultation for ${service.title}`);
    // Add your consultation booking logic here
  };

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/30 to-celestial-blue/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-gold">
          हमारी आध्यात्मिक सेवाएं
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-gold">
          Our Spiritual Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-midnight-blue-light/80 hover:bg-midnight-blue transition-colors transform hover:scale-105 duration-300 border border-gold/30 hover:border-gold">
              <CardContent className="p-6">
                <div className="text-gold mb-4 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-gold text-center">{service.title}</h3>
                <p className="mb-6 text-sm text-lavender text-center">{service.description}</p>
                
                {/* Price display */}
                <div className="flex justify-center mb-4">
                  <p className="text-2xl font-bold text-gold">₹{service.price}</p>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2 justify-center mb-4">
                  <AddToCartButton
                    id={service.slug}
                    name={service.title}
                    price={service.price}
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
                  />
                  <button 
                    className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors w-full"
                    onClick={() => handleBuyNow(service)}
                  >
                    खरीदें (Buy Now)
                  </button>
                </div>
                
                {/* Learn more button */}
                <button 
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors w-full mb-4"
                  onClick={() => console.log(`Learn more about ${service.title}`)}
                >
                  और जानें (LEARN MORE)
                </button>
                
                {/* Book consultation button */}
                <button 
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors w-full"
                  onClick={() => handleBookConsultation(service)}
                >
                  Book Consultation
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}