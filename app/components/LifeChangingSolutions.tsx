"use client";

import { GraduationCap, Heart, Activity, Briefcase, Users, Baby } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const solutions = [
  {
    icon: <GraduationCap className="w-12 h-12" />,
    title: "करियर (Career)",
    description: {
      hi: "छात्रों को परीक्षाओं के बाद क्या करना है, नौकरियों और भविष्य के बारे में जानने की जरूरत होती है। ज्योतिषी अरुण जी आपकी जन्म कुंडली का विश्लेषण करके सही करियर चुनने में मदद करेंगे।",
      en: "Many students get confused about what to do after exams, jobs, and the future. Talk to astrologer Arun ji who can assist you in making the right career choices by analyzing your birth chart."
    }
  },
  {
    icon: <Heart className="w-12 h-12" />,
    title: "प्रेम और रिश्ते (Love & Relationship)",
    description: {
      hi: "अपने साथी के साथ सर्वश्रेष्ठ प्रेम राशिफल संगतता की तलाश में हैं? एक परामर्श कॉल आपके रिश्ते की संभावनाओं को उजागर कर सकती है।",
      en: "Looking for the best love horoscope compatibility with your partner? One counseling call can reveal the potential of your relationship."
    }
  },
  {
    icon: <Activity className="w-12 h-12" />,
    title: "स्वास्थ्य (Health)",
    description: {
      hi: "वैदिक ज्योतिष भविष्यवाणियां स्वास्थ्य समस्याओं की पूर्व सूचना दे सकती हैं। शीघ्र परामर्श के लिए ज्योतिषी से बात करें।",
      en: "Vedic astrology predictions can forecast health issues before they appear. Seek early consultation by talking to the astrologer."
    }
  },
  {
    icon: <Briefcase className="w-12 h-12" />,
    title: "व्यापार (Business)",
    description: {
      hi: "व्यापार शुरू करते समय या बड़े निर्णय लेते समय, ज्योतिष से सटीक मार्गदर्शन महत्वपूर्ण है। एक ज्योतिषी से परामर्श आपकी व्यावसायिक समस्याओं को हल कर सकता है।",
      en: "When starting a business or facing big choices, getting accurate insights from astrology is important. Consulting an astrologer can help solve your business problems."
    }
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "विवाह (Marriage)",
    description: {
      hi: "भारत में विवाह के लिए कुंडली मिलान की प्रथा बहुत महत्वपूर्ण है। गुण मिलान, मंगल दोष और संगतता विश्लेषण प्राप्त करें।",
      en: "In India, the practice of Kundli Milan for marriage is very important. Get Gun Milan, Mangal Dosha, & compatibility analysis."
    }
  },
  {
    icon: <Baby className="w-12 h-12" />,
    title:"संतान (Child)",
    description: {
      hi: "प्राचीन भारतीय वैदिक ज्योतिष दोनों साथियों की कुंडली का परीक्षण करता है, विशेष रूप से बच्चों के बारे में जानने के इच्छुक लोगों के लिए। ज्योतिषी आपको संतान से संबंधित समस्याओं के लिए सटीक समाधान प्रदान करेंगे।",
      en: "The ancient Indian Vedic astrology examines the horoscopes of both partners, especially for those interested in knowing about children. The astrologer will provide accurate solutions for issues related to childbirth."
    }
  }
]

export function LifeChangingSolutions() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/30 to-celestial-blue/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-gold">
          एक कॉल में जीवन बदलने वाले समाधान
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-gold">
          Best Life Changing Solutions In Just One Call
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="bg-midnight-blue-light/80 hover:bg-midnight-blue transition-colors transform hover:scale-105 duration-300 border border-gold/30 hover:border-gold">
              <CardContent className="p-6">
                <div className="text-gold mb-4 flex justify-center">
                  {solution.icon}
                </div>
                <h3 className="text-2xl font-serif font-semibold mb-4 text-gold text-center">{solution.title}</h3>
                <p className="text-sm text-lavender mb-2 text-center">{solution.description.hi}</p>
                <p className="text-sm text-lavender text-center">{solution.description.en}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            className="bg-black text-white hover:bg-gray-900 text-lg px-8 py-6"
            onClick={scrollToContact}
          >
            अभी कॉल बुक करें (BOOK YOUR CALL NOW)
          </Button>
        </div>
      </div>
    </section>
  )
}

