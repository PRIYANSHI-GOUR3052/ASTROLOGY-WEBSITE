"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Statistics } from '@/app/components/Statistics';

interface ServiceContent {
  title: string;
  description: string;
  benefits: string[];
  price: string;
  consultationDetails?: string;
  additionalInfo?: string;
  stats?: { label: string; value: string }[];
  astrologer?: {
    name: string;
    photo: string;
    credentials: string;
    bio: string;
  };
  faqs?: { question: string; answer: string }[];
}

const serviceContent: Record<string, ServiceContent> = {
  "chat-with-astrologer": {
    title: "ज्योतिषी से लाइव चैट (Chat with Astrologer)",
    description: "सीधे विशेषज्ञ ज्योतिषी से लाइव चैट करें और अपने जीवन से जुड़े सवालों के तुरंत उत्तर पाएं।",
    benefits: [
      "त्वरित समाधान और मार्गदर्शन",
      "गोपनीय और व्यक्तिगत चर्चा",
      "करियर, विवाह, स्वास्थ्य, धन आदि के लिए सलाह",
      "आपकी सुविधा अनुसार समय",
      "किसी भी विषय पर पूछें सवाल"
    ],
    price: "₹500 प्रति 10 मिनट",
    consultationDetails: "लाइव चैट सेशन, 10 मिनट के स्लॉट में उपलब्ध",
    additionalInfo: "चैट शुरू करने के लिए बुकिंग के बाद आपको लिंक और समय भेजा जाएगा।",
    stats: [
      { label: "कुल परामर्श", value: "12,000+" },
      { label: "सालों का अनुभव", value: "18+" },
      { label: "संतुष्ट ग्राहक", value: "10,500+" },
      { label: "औसत रेटिंग", value: "4.9/5" }
    ],
    astrologer: {
      name: "आचार्य विवेक शर्मा",
      photo: "/images/astrologer-vivek.jpg",
      credentials: "PhD, ज्योतिषाचार्य, 18+ वर्षों का अनुभव",
      bio: "आचार्य विवेक शर्मा वैदिक ज्योतिष, अंक ज्योतिष, हस्तरेखा, और वास्तु शास्त्र के विशेषज्ञ हैं। इन्होंने 18 वर्षों में 12,000+ से अधिक लोगों को जीवन के विभिन्न क्षेत्रों में मार्गदर्शन प्रदान किया है। इनकी सलाह व्यावहारिक, सटीक और गोपनीय होती है।"
    },
    faqs: [
      {
        question: "क्या चैट पूरी तरह गोपनीय है?",
        answer: "हाँ, आपकी सभी जानकारियाँ और बातचीत पूरी तरह गोपनीय रखी जाती है।"
      },
      {
        question: "किस-किस विषय पर पूछ सकते हैं?",
        answer: "आप करियर, विवाह, शिक्षा, स्वास्थ्य, धन, परिवार आदि किसी भी विषय पर सवाल पूछ सकते हैं।"
      },
      {
        question: "अगर समय से अधिक सवाल हुए तो?",
        answer: "आप अतिरिक्त समय के लिए फिर से बुकिंग कर सकते हैं।"
      },
      {
        question: "क्या चैट हिंदी में होगी?",
        answer: "हाँ, आप हिंदी या अंग्रेज़ी दोनों में बातचीत कर सकते हैं।"
      }
    ]
  },

  "love-relationship": {
    title: "Love & Relationship Guidance",
    description: "Get personalized insights into your love life and relationship journey from experienced astrologers.",
    benefits: [
      "Clarity on current relationships",
      "Guidance on finding true love",
      "Astrological compatibility checks",
      "Practical solutions to love issues",
      "Confidential and honest discussions"
    ],
    price: "₹700 per 15 minutes",
    consultationDetails: "Live consultation available in 15-minute slots",
    additionalInfo: "After booking, you will receive a time slot and link for the live session.",
    stats: [
      { label: "Total Consultations", value: "15,000+" },
      { label: "Years of Experience", value: "20+" },
      { label: "Happy Clients", value: "13,000+" },
      { label: "Average Rating", value: "4.95/5" }
    ],
    astrologer: {
      name: "Acharya Nandita Rao",
      photo: "/images/astrologer-nandita.jpg",
      credentials: "MA in Astrology, Relationship Expert, 20+ years experience",
      bio: "Acharya Nandita Rao is a trusted guide in the domain of love and relationships. With two decades of expertise in Vedic astrology, she has helped over 15,000 individuals find direction, harmony, and deeper connections in their love lives."
    },
    faqs: [
      {
        question: "Is this session suitable for singles too?",
        answer: "Yes, we offer guidance for both singles looking for love and individuals already in a relationship."
      },
      {
        question: "Can I ask about marriage prospects?",
        answer: "Absolutely. We can discuss compatibility, timelines, and remedies related to marriage."
      },
      {
        question: "Is my data and conversation secure?",
        answer: "Yes, all your information and discussions remain completely private and confidential."
      },
      {
        question: "Which languages are supported?",
        answer: "You can consult in English or Hindi as per your comfort."
      }
    ]
  },

  // Placeholder for the services you requested; full detailed content for each
  "career-job": {
    title: "Career & Job Guidance",
    description: "Unlock your career path with personalized astrological insights for job growth, changes, or new ventures.",
    benefits: ["Career clarity", "Right time for switch", "Job stability remedies"],
    price: "₹600 for 15 minutes"
  },
  "numerology": {
    title: "Numerology Analysis",
    description: "Discover the power of numbers in your life with personalized numerology reading.",
    benefits: ["Name correction", "Lucky number discovery", "Numerology-based remedies"],
    price: "₹450/session"
  },
  "online-puja": {
    title: "Online Puja Services",
    description: "Book spiritual pujas online with proper rituals conducted by expert pundits.",
    benefits: ["Vastu Puja", "Mangal Dosh Nivaran", "Customized rituals"],
    price: "Starts ₹2100"
  },
  "grah-shanti": {
    title: "Grah Shanti Puja",
    description: "Balance your planetary energies through traditional Grah Shanti pujas.",
    benefits: ["Remedies for Doshas", "Positive energy at home", "Family harmony"],
    price: "₹3100 - ₹5100"
  },
  "manokamna-pooja": {
    title: "Manokamna Pooja",
    description: "Fulfill your desires with this sacred pooja performed by qualified Vedic pundits.",
    benefits: ["Customized rituals", "Spiritual upliftment", "Wish fulfillment"],
    price: "₹5100 - ₹9100"
  },
  "daily-horoscope": {
    title: "Daily Horoscope",
    description: "Check your personalized daily astrology forecast to plan your day better.",
    benefits: ["Daily planetary insights", "Emotion & mood tracking", "Do’s & Don’ts"],
    price: "Free"
  },
  "monthly-horoscope": {
    title: "Monthly Horoscope",
    description: "Get monthly astrological predictions for better planning and decision-making.",
    benefits: ["Finance & Career trends", "Love & Family insights", "Monthly remedy tips"],
    price: "Free"
  },
  "yearly-horoscope": {
    title: "Yearly Horoscope",
    description: "Discover what the stars hold for you in the year ahead.",
    benefits: ["Major opportunities & challenges", "Marriage & travel predictions", "Health & career outlook"],
    price: "Free"
  },
  "courses": {
    title: "Astrology Courses",
    description: "Join our professional astrology courses ranging from beginner to advanced levels.",
    benefits: [
      "Vedic Astrology Foundation",
      "Numerology Mastery",
      "Palmistry & Face Reading",
      "Advanced Horoscope Reading",
      "Remedial Astrology Techniques"
    ],
    price: "₹1500 - ₹15,000 (depending on course level)",
    consultationDetails: "Online classes | Certification provided | Lifetime access to materials",
    additionalInfo: "Join our WhatsApp group after registration for updates and mentoring support."
  }
};

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceContent[params.slug as keyof typeof serviceContent];

  if (!service) {
    return <div style={{ color: "#000" }}>Service not found</div>;
  }

  return (
<div className="container mx-auto px-4 py-16 bg-gradient-to-r from-[#FAD9C1] to-[#A3BFF3] min-h-screen" style={{ color: "#000" }}>

      <div className="max-w-3xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold mb-4">{service.title}</h1>
          <p className="text-xl mb-6">{service.description}</p>
          <Link href={`/contact?service=${params.slug}`}>
            <Button className="bg-gold text-black hover:bg-yellow-400 text-lg px-8 py-4 font-bold shadow-lg">
              Book Consultation
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        {service.stats && (
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {service.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center bg-gray-100 rounded-lg px-6 py-4 shadow">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-md">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Astrologer Profile */}
        {service.astrologer && (
          <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg p-6 mb-12 shadow">
            <div className="mb-4 md:mb-0 md:mr-8">
              <Image
                src={service.astrologer.photo}
                alt={service.astrologer.name}
                width={120}
                height={120}
                className="rounded-full border-4 border-gold"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">{service.astrologer.name}</h2>
              <p className="font-semibold mb-1">{service.astrologer.credentials}</p>
              <p>{service.astrologer.bio}</p>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="bg-gray-100 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-serif mb-6">Benefits:</h2>
          <ul className="space-y-4">
            {service.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Consultation Details */}
        {(service.consultationDetails || service.additionalInfo) && (
          <div className="bg-gray-100 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-serif mb-4">Consultation Details:</h2>
            {service.consultationDetails && <p className="mb-4">{service.consultationDetails}</p>}
            {service.additionalInfo && <p className="italic">{service.additionalInfo}</p>}
          </div>
        )}

        {/* Fee Section */}
        <div className="text-center mb-12">
          <p className="text-xl mb-8 font-bold">
            Consultation Fee: {service.price}
          </p>
          <Link href={`/contact?service=${params.slug}`}>
            <Button className="bg-gold text-black hover:bg-yellow-400 text-lg px-8 py-4 font-bold shadow-lg">
              Book Now
            </Button>
          </Link>
        </div>

        {/* FAQs */}
        {service.faqs && (
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-serif mb-6">FAQs:</h2>
            <ul className="space-y-6">
              {service.faqs.map((faq, idx) => (
                <li key={idx}>
                  <p className="font-semibold">{faq.question}</p>
                  <p className="ml-2">{faq.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
