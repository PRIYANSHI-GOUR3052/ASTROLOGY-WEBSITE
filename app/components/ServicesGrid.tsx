'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Star, Moon, Sun, Hash, Home, Map } from 'lucide-react'

const services = [
  {
    title: "ज्योतिष परामर्श",
    titleEn: "Astrology Consultation",
    description: "अपने जीवन पथ, संबंधों और करियर के बारे में व्यक्तिगत ज्योतिषीय पठन के माध्यम से अंतर्दृष्टि प्राप्त करें।",
    descriptionEn: "Gain insights into your life path, relationships, and career through personalized astrological readings.",
    icon: <Sun className="w-12 h-12 text-sunburst-yellow" />,
    link: "/services/astrology"
  },
  {
    title: "वास्तु शास्त्र",
    titleEn: "Vastu Shastra",
    description: "सकारात्मक ऊर्जा और समृद्धि को आकर्षित करने के लिए अपने रहने और काम करने के स्थानों को सामंजस्यपूर्ण बनाएं।",
    descriptionEn: "Harmonize your living and working spaces to attract positive energy and prosperity.",
    icon: <Home className="w-12 h-12 text-sunburst-yellow" />,
    link: "/services/vastu-shastra"
  },
  {
    title: "अंक ज्योतिष",
    titleEn: "Numerology",
    description: "अपने जीवन की संख्याओं में छिपे अर्थों और आपकी नियति पर उनके प्रभाव को जानें।",
    descriptionEn: "Uncover the hidden meanings in your life's numbers and their influence on your destiny.",
    icon: <Hash className="w-12 h-12 text-sunburst-yellow" />,
    link: "/services/numerology"
  },
  {
    title: "टैरो रीडिंग",
    titleEn: "Tarot Reading",
    description: "टैरो कार्ड के प्राचीन ज्ञान के माध्यम से अपने अतीत, वर्तमान और भविष्य पर स्पष्टता प्राप्त करें।",
    descriptionEn: "Gain clarity on your past, present, and future through the ancient wisdom of tarot cards.",
    icon: <Star className="w-12 h-12 text-sunburst-yellow" />,
    link: "/services/tarot-reading"
  },
  {
    title: "कुंडली मिलान",
    titleEn: "Kundli Matching",
    description: "वैदिक ज्योतिषीय विश्लेषण के माध्यम से संबंधों में संगतता और सद्भाव सुनिश्चित करें।",
    descriptionEn: "Ensure compatibility and harmony in relationships through vedic astrological analysis.",
    icon: <Moon className="w-12 h-12 text-sunburst-yellow" />,
    link: "/services/kundli-matching"
  },
  {
    title: "ज्योतिष यात्रा परामर्श",
    titleEn: "Astro Travel Consultation",
    description: "सबसे शुभ यात्राओं के लिए खगोलीय ऊर्जाओं के साथ सामंजस्य में अपनी यात्राओं की योजना बनाएं।",
    descriptionEn: "Plan your travels in harmony with celestial energies for the most auspicious journeys.",
    icon: <Map className="w-12 h-12 text-sunburst-yellow" />,
    link: "/services/astro-travel"
  }
]

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="bg-celestial-cream/90 hover:bg-celestial-cream transition-colors shadow-lg hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h2 className="text-2xl font-serif font-semibold mb-2 text-mystic-brown text-center">{service.title}</h2>
              <h3 className="text-xl font-serif mb-4 text-mystic-brown text-center">{service.titleEn}</h3>
              <p className="text-mystic-brown/80 mb-2 text-center">{service.description}</p>
              <p className="text-mystic-brown/80 mb-4 text-center">{service.descriptionEn}</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button className="bg-black text-white hover:bg-gray-800 flex-1">
                  Add to Cart
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800 flex-1">
                  खरीदें (Buy Now)
                </Button>
              </div>
              <div className="text-center mt-4">
                <Button asChild className="bg-black text-white hover:bg-gray-800 flex-1">
                  <Link href={service.link}>
                    <span className="block">आप अभी बुक करें</span>
                    <span className="block">BOOK YOUR CALL NOW</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}