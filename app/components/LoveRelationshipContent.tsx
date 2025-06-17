"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ServiceContent {
  title: string;
  description: string;
  benefits: string[];
  price: string;
  consultationDetails?: string;
  additionalInfo?: string;
}

const serviceContent: Record<string, ServiceContent> = {
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
    additionalInfo: "After booking, you will receive a time slot and link for the live session."
  }
};

const stats = [
  { label: "Total Consultations", value: "15,000+" },
  { label: "Years of Experience", value: "20+" },
  { label: "Happy Clients", value: "13,000+" },
  { label: "Average Rating", value: "4.95/5" },
];

const astrologer = {
  name: "Acharya Nandita Rao",
  photo: "/images/astrologer-nandita.jpg", // Replace with your image path
  credentials: "MA in Astrology, Relationship Expert, 20+ years experience",
  bio: "Acharya Nandita Rao is a trusted guide in the domain of love and relationships. With two decades of expertise in Vedic astrology, she has helped over 15,000 individuals find direction, harmony, and deeper connections in their love lives."
};

const faqs = [
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
];

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceContent[params.slug as keyof typeof serviceContent];

  if (!service) {
    return <div style={{ color: "#000" }}>Service not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16" style={{ color: "#000" }}>
      <div className="max-w-3xl mx-auto">
        {/* CTA Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold mb-4">{service.title}</h1>
          <p className="text-xl mb-6">{service.description}</p>
          <Link href={`/contact?service=${params.slug}`}>
            <Button className="bg-gold text-black hover:bg-yellow-400 text-lg px-8 py-4 font-bold shadow-lg">
              Book Love Consultation Now
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center bg-gray-100 rounded-lg px-6 py-4 shadow">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-md">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Astrologer Profile */}
        <div className="flex flex-col md:flex-row items-center bg-gray-50 rounded-lg p-6 mb-12 shadow">
          <div className="mb-4 md:mb-0 md:mr-8">
            <Image
              src={astrologer.photo}
              alt={astrologer.name}
              width={120}
              height={120}
              className="rounded-full border-4 border-gold"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{astrologer.name}</h2>
            <p className="font-semibold mb-1">{astrologer.credentials}</p>
            <p>{astrologer.bio}</p>
          </div>
        </div>

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
            {service.consultationDetails && (
              <p className="mb-4">{service.consultationDetails}</p>
            )}
            {service.additionalInfo && (
              <p className="italic">{service.additionalInfo}</p>
            )}
          </div>
        )}

        {/* Consultation Fee */}
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

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-serif mb-6">Frequently Asked Questions (FAQ):</h2>
          <ul className="space-y-6">
            {faqs.map((faq, idx) => (
              <li key={idx}>
                <p className="font-semibold">{faq.question}</p>
                <p className="ml-2">{faq.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
