"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface ServiceContent {
  title: string;
  description: string;
  benefits: string[];
  price: string;
  consultationDetails?: string;  // Optional property
  additionalInfo?: string;      // Optional property
}

const serviceContent: Record<string, ServiceContent> = {
  "face-reading": {
    title: "चेहरे की पहेली (Face Reading)",
    description: "चेहरे की रेखाओं से जानें अपने भविष्य और व्यक्तित्व के बारे में",
    benefits: [
      "व्यक्तित्व विश्लेषण",
      "भावी जीवन की झलक",
      "करियर मार्गदर्शन",
      "स्वास्थ्य संकेत"
    ],
    price: "₹2,100 से शुरू"
  },
  "horoscope": {
    title: "जन्म कुंडली (Horoscope)",
    description: "वैदिक ज्योतिष के माध्यम से जानें अपने जीवन का पूर्ण विश्लेषण",
    benefits: [
      "विस्तृत जन्म कुंडली विश्लेषण",
      "दशा-अंतर्दशा फल",
      "वार्षिक भविष्यवाणी",
      "ग्रह शांति उपाय"
    ],
    price: "₹3,100 से शुरू"
  },
  "astrocartography": {
    title: "भौतिक स्थल ज्योतिष (Astrocartography)",
    description: "जानें कौन सा स्थान आपके लिए सबसे शुभ है",
    benefits: [
      "स्थान आधारित भाग्य विश्लेषण",
      "यात्रा के शुभ समय",
      "व्यवसाय के लिए उत्तम स्थान",
      "निवास के लिए शुभ स्थान"
    ],
    price: "₹2,500 से शुरू"
  },
  "vastu-shastra": {
    title: "वास्तु शास्त्र",
    description: "प्राचीन भारतीय वास्तुकला के सिद्धांतों से करें अपने घर का निर्माण",
    benefits: [
      "घर का वास्तु विश्लेषण",
      "कार्यालय का वास्तु",
      "दोष निवारण",
      "वास्तु समाधान"
    ],
    price: "₹5,100 से शुरू"
  },
  "palmistry": {
    title: "हाथ ज्योतिष (Palmistry)",
    description: "हस्त रेखाओं द्वारा आपके जीवन की महत्वपूर्ण जानकारी प्राप्त करें। हमारे विशेषज्ञ ज्योतिषी आपकी हस्त रेखाओं का गहन अध्ययन करके आपके भविष्य, करियर, विवाह और स्वास्थ्य के बारे में मार्गदर्शन करेंगे।",
    benefits: [
      "जीवन रेखा का विस्तृत विश्लेषण",
      "भाग्य रेखा और करियर की संभावनाएं",
      "विवाह योग और संबंधों का विश्लेषण",
      "धन योग और आर्थिक भविष्य",
      "स्वास्थ्य संबंधी संकेतों की पहचान",
      "व्यक्तिगत समस्याओं का समाधान"
    ],
    price: "₹1,100 से शुरू",
    consultationDetails: "30 मिनट का विस्तृत परामर्श सत्र",
    additionalInfo: "कृपया परामर्श के समय अपने दोनों हाथों की स्पष्ट तस्वीरें साथ रखें"
  },
  "numerology": {
    title: "अंक ज्योतिष (Numerology)",
    description: "अंकों के वैज्ञानिक विश्लेषण द्वारा अपने जीवन के रहस्यों को जानें। जन्म तिथि और नाम के अंकों से जानें अपनी छिपी प्रतिभाएं और भाग्य के संकेत।",
    benefits: [
      "जन्मांक का विशेष विश्लेषण",
      "नाम के अंकों का प्रभाव",
      "भाग्यांक और कर्मांक की गणना",
      "व्यवसाय के लिए शुभ अंक",
      "शुभ रंग और दिशाएं",
      "नाम परिवर्तन के सुझाव"
    ],
    price: "₹1,500 से शुरू",
    consultationDetails: "45 मिनट का विस्तृत परामर्श सत्र",
    additionalInfo: "कृपया अपनी सटीक जन्म तिथि और पूरा नाम तैयार रखें"
  }
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceContent[params.slug as keyof typeof serviceContent];

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-gold text-center mb-8">
          {service.title}
        </h1>
        
        <p className="text-xl text-lavender text-center mb-12">
          {service.description}
        </p>

        <div className="bg-midnight-blue-light/80 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-serif text-gold mb-6">लाभ (Benefits):</h2>
          <ul className="space-y-4">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center text-lavender">
                <span className="mr-2">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {service.consultationDetails && service.additionalInfo && (
          <div className="bg-midnight-blue-light/80 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-serif text-gold mb-4">परामर्श विवरण:</h2>
            <p className="text-lavender mb-4">{service.consultationDetails}</p>
            <p className="text-lavender italic">{service.additionalInfo}</p>
          </div>
        )}

        <div className="text-center">
          <p className="text-xl text-gold mb-8">
            परामर्श शुल्क (Consultation Fee): {service.price}
          </p>
          <Link href={`/contact?service=${params.slug}`}>
            <Button className="bg-black text-white hover:bg-gray-900 text-lg px-8 py-4">
              अभी बुक करें (Book Now)
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 