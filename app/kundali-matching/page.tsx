"use client";

import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Shield,
  CreditCard,
  Truck,
} from "lucide-react";
import { ZodiacWheel } from "../components/ZodiacWheel";
import { Testimonials } from "../components/Testimonials";
import { Statistics } from "../components/Statistics";
import { AstrologerProfile } from "../components/AstrologerProfile";

const faqs = [
  {
    question: "Is Kundali matching scientifically proven?",
    answer:
      "While Kundali matching is based on astrological calculations and traditions, it is not scientifically proven by modern empirical standards. However, it's deeply rooted in Vedic beliefs.",
    icon: "HelpCircle",
  },
  {
    question: "What if the Kundali doesn't match?",
    answer:
      "In cases of low compatibility, astrologers suggest remedies or upayas to reduce negative impacts. It is advised to consult an experienced astrologer for personalized solutions.",
    icon: "Shield",
  },
  {
    question: "Is Kundali matching necessary for love marriages?",
    answer:
      "Yes, even in love marriages, Kundali matching helps understand future compatibility challenges and provides insights to maintain harmony in the relationship.",
    icon: "CreditCard",
  },
  {
    question: "What details are required for accurate Kundali matching?",
    answer:
      "Date of birth, exact time of birth, and place of birth for both individuals are essential to generate accurate charts and assess compatibility.",
    icon: "Truck",
  },
];

const IconComponent = ({ Icon }) => {
    return <Icon className="w-6 h-6 text-white" />;
  };
  
  switch (iconName) {
    case "HelpCircle":
      return <HelpCircle className="w-6 h-6 text-white" />;
    case "Shield":
      return <Shield className="w-6 h-6 text-white" />;
    case "CreditCard":
      return <CreditCard className="w-6 h-6 text-white" />;
    case "Truck":
      return <Truck className="w-6 h-6 text-white" />;
    default:
      return null;
  }
};

export default function KundaliMatchingPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FAD9C1] to-[#A3BFF3] px-6 py-16 text-black">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Heading */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4 font-serif">💑 Kundali Matching</h1>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div className="md:w-1/2">
            <p className="text-xl text-gray-800 leading-relaxed">
              Kundali Matching, also known as Horoscope Matching, is a vital aspect of Vedic astrology...
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <ZodiacWheel />
          </div>
        </div>

        {/* What is Kundali Matching? */}
        <div className="bg-white/80 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">📜 What is Kundali Matching?</h2>
          <p className="text-gray-800 leading-relaxed">
            Kundali Matching is a detailed astrological procedure that analyzes two individuals' charts...
          </p>
        </div>

        {/* Benefits Section */}
        <div className="bg-white/80 p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">🌟 Benefits of Kundali Matching</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-800">
            <li>Ensures compatibility in values and beliefs</li>
            <li>Identifies potential conflicts or health issues</li>
            <li>Helps decide auspicious timing for marriage</li>
            <li>Strengthens emotional and spiritual bonding</li>
          </ul>
        </div>

        {/* FAQ Section */}
        <section className="bg-white/80 p-6 rounded-xl shadow">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#f4ebe6] rounded-full p-4 mb-4">
              <HelpCircle className="w-8 h-8 text-[#fe7b57]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-2 text-[#343d48] text-center">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-center text-lg">
              Can't find your question?{" "}
              <Link href="#" className="text-[#fe7b57] font-semibold hover:underline">
                Contact support.
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={false}
                animate={{ backgroundColor: activeIndex === index ? "#fff" : "#fff" }}
                whileHover={{
                  scale: 1.01,
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                }}
                whileTap={{ scale: 0.99 }}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out"
              >
                <button
                  className="flex items-center w-full p-4 text-left focus:outline-none"
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                >
                  <motion.div
                    className="flex-shrink-0 bg-[#fe7b57] rounded-lg p-2 mr-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    animate={{
                      rotate: [0, -5, 5, -5, 5, 0],
                      transition: {
                        duration: 1.5,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 3,
                      },
                    }}
                  >
                    <IconComponent iconName={faq.icon} />
                  </motion.div>
                  <span className="flex-grow text-lg font-medium text-[#343d48]">
                    {faq.question}
                  </span>
                  {activeIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#fe7b57]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#fe7b57]" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {activeIndex === index && (
                    <motion.div
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t border-gray-200 ml-16 pr-4 py-4 text-gray-700">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Astrologer Profile */}
        <AstrologerProfile />

        {/* Statistics */}
        <Statistics />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">💍 Match Your Kundali Now</h2>
          <p className="text-lg mb-4 text-gray-700">
            Get a detailed compatibility report from our expert astrologers.
          </p>
          <Button className="bg-gold text-black text-lg px-8 py-3 hover:bg-yellow-400 transition">
            Start Matching
          </Button>
        </div>
      </div>
    </div>
  );
}
