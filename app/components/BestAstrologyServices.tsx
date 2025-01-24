import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const services = [
  {
    title: "ज्योतिष (Astrology)",
    icon: "/placeholder.svg?height=200&width=200", // Replace with actual astrology chart image
    description: {
      en: "Unlock celestial guidance for your destiny. Gain insights and clarity on life's journey through expert astrology services tailored just for you.",
      hi: "अपनी नियति के लिए खगोलीय मार्गदर्शन को खोलें। विशेषज्ञ ज्योतिष सेवाओं के माध्यम से जीवन की यात्रा पर अंतर्दृष्टि और स्पष्टता प्राप्त करें।"
    }
  },
  {
    title: "अंक ज्योतिष (Numerology)",
    icon: "/placeholder.svg?height=200&width=200", // Replace with actual numerology symbol
    description: {
      en: "Decode the numbers of your life's path. Explore personality traits, destiny, and potential through personalized numerology guidance.",
      hi: "अपने जीवन के मार्ग की संख्याओं को समझें। व्यक्तिगत अंक ज्योतिष मार्गदर्शन के माध्यम से व्यक्तित्व, भाग्य और क्षमता का पता लगाएं।"
    }
  },
  {
    title: "हस्त रेखा (Palmistry)",
    icon: "/placeholder.svg?height=200&width=200", // Replace with actual palmistry diagram
    description: {
      en: "Delve into the ancient wisdom of palmistry to reveal your destiny and potential. Explore the intricate lines of your palms for insights.",
      hi: "अपनी नियति और क्षमता को प्रकट करने के लिए हस्त रेखा के प्राचीन ज्ञान में गहराई से जाएं। अंतर्दृष्टि के लिए अपनी हथेलियों की जटिल रेखाओं का पता लगाएं।"
    }
  },
  {
    title: "तंत्र विद्या (Tantra)",
    icon: "/placeholder.svg?height=200&width=200", // Replace with actual tantra symbol
    description: {
      en: "Embark on a journey of spiritual awakening and self-discovery through tantra. Experience profound healing and empowerment.",
      hi: "तंत्र के माध्यम से आध्यात्मिक जागृति और आत्म-खोज की यात्रा पर निकलें। गहन चिकित्सा और सशक्तिकरण का अनुभव करें।"
    }
  }
]

export function BestAstrologyServices() {
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
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-midnight-blue">
                  और जानें (LEARN MORE)
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

