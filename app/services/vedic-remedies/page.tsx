"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { UniversalCartButton } from '../../components/UniversalCartButton';
import ProductAssuranceBar from '../../components/ProductAssuranceBar';
import ProductPurchaseInfo from '../../components/ProductPurchaseInfo';
import { ProductServiceCard } from "../../components/UniversalServiceGrid";
import ServiceCarousels from '../../components/ServiceCarousels';
import NakshatraGyaanBanner from '../../components/NakshatraGyaanBanner';
import SpiritualJourneyBanner from '../../components/SpiritualJourneyBanner';

// Vedic Remedies Service Configuration
const vedicRemediesService = {
  title: "Vedic Remedies Consultation",
  images: [
    "/images/spiritualpathway.jpg",
    "/images/birth_chart_mockup.jpg",
    "/images/astrology_understanding.jpg",
    "/images/course-2.jpg",
  ],
  variants: [
    { label: "Basic Remedies Package", image: "/images/spiritualpathway.jpg" },
    { label: "Complete Vedic Solutions", image: "/images/astrology_understanding.jpg" },
  ],
  features: ["Expert Vedic Astrologers", "Personalized Remedies", "Ancient Wisdom"],
  price: "₹1,800",
  oldPrice: "₹3,200",
  discount: "43% OFF",
  offerEnds: "06 hr : 30 min : 20 sec",
  rating: 4.7,
  reviews: 892,
  orders: 1345,
};

// Vedic Remedies FAQs
const vedicRemediesFaqs = [
  {
    question: "What are Vedic Remedies and how do they work?",
    answer: "Vedic Remedies are ancient solutions based on Vedic astrology that help balance planetary energies and overcome life challenges. They include mantras, gemstones, rituals, and lifestyle changes designed to harmonize your cosmic energy and attract positive outcomes.",
  },
  {
    question: "How are Vedic Remedies personalized for me?",
    answer: "Our expert astrologers analyze your birth chart to identify specific planetary imbalances and doshas. Based on this analysis, they prescribe remedies tailored to your unique astrological profile, ensuring maximum effectiveness for your specific situation.",
  },
  {
    question: "What types of Vedic Remedies are available?",
    answer: "We offer various remedies including gemstone recommendations, specific mantras and prayers, yantras, pujas, fasting guidelines, color therapy, and lifestyle modifications. Each remedy is chosen based on your specific planetary positions and life challenges.",
  },
  {
    question: "How long does it take to see results from Vedic Remedies?",
    answer: "Results vary depending on the type of remedy and your situation. Some people experience immediate relief, while others notice gradual improvements over weeks or months. Consistency and faith in the remedies are key factors for success.",
  },
  {
    question: "Are Vedic Remedies safe for everyone?",
    answer: "Yes, Vedic Remedies are completely safe and natural. They are based on ancient wisdom and don't involve any harmful substances. However, we always recommend consulting with our experts to ensure the remedies are appropriate for your specific situation.",
  },
  {
    question: "Can I combine Vedic Remedies with other treatments?",
    answer: "Absolutely! Vedic Remedies complement other treatments and therapies. They work on the spiritual and energetic level, while other treatments address physical and mental aspects. Many people find that combining them enhances overall results.",
  },
  {
    question: "What information do you need to prescribe remedies?",
    answer: "We need your complete birth details including date, time, and place of birth. We also ask about your current challenges and goals to ensure the remedies address your specific needs and concerns.",
  },
  {
    question: "Do you provide follow-up support for the remedies?",
    answer: "Yes, we provide comprehensive follow-up support including guidance on how to perform the remedies correctly, progress tracking, and adjustments if needed. Our experts are available to answer questions and provide ongoing guidance.",
  },
];

// Related Services
const relatedServices = [
  {
    title: 'Grah Shanti Puja',
    image: '/images/course-2.jpg',
    price: '₹3,500',
    oldPrice: '₹5,000',
    slug: 'grah-shanti',
  },
  {
    title: 'Personal Astrology Reading',
    image: '/images/astrology_understanding.jpg',
    price: '₹2,500',
    oldPrice: '₹3,500',
    slug: 'personal-reading',
  },
  {
    title: 'Kundali Matching',
    image: '/images/birth_chart_mockup.jpg',
    price: '₹2,100',
    oldPrice: '₹4,500',
    slug: 'kundali-matching',
  },
  {
    title: 'Online Puja Services',
    image: '/images/astrology_understanding.jpg',
    price: '₹2,500',
    oldPrice: '₹4,000',
    slug: 'online-puja',
  },
];

export default function VedicRemediesPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  // Real-time offer timer
  const OFFER_DURATION = 6 * 60 * 60 + 30 * 60 + 20; // 6 hr 30 min 20 sec in seconds
  const [secondsLeft, setSecondsLeft] = useState(OFFER_DURATION);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  function formatTime(secs: number) {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h} hr : ${m} min : ${s} sec`;
  }

  return (
    <>
      <style jsx global>{`
        *::-webkit-scrollbar {
          display: none !important;
          height: 0 !important;
          width: 0 !important;
          background: transparent !important;
        }
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
      `}</style>
      <div className="min-h-screen bg-white flex flex-col items-center justify-start py-6 px-2 md:px-0 mt-8">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8">
          {/* Left: Main Image and Thumbnails */}
          <div className="flex flex-col items-center md:w-1/2">
            <div className="w-full rounded-xl overflow-hidden bg-[#f7f5ed] flex items-center justify-center mb-3" style={{ aspectRatio: '1/1', maxWidth: 340 }}>
              <Image
                src={vedicRemediesService.images[selectedImage]}
                alt={vedicRemediesService.title}
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-row gap-2 w-full overflow-x-auto pb-2">
              {vedicRemediesService.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg border-2 ${selectedImage === idx ? 'border-black' : 'border-transparent'} overflow-hidden focus:outline-none`}
                  style={{ minWidth: 54, minHeight: 54 }}
                >
                  <Image src={img} alt={vedicRemediesService.title} width={54} height={54} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Service Info */}
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#23244a]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{vedicRemediesService.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#FFD700] text-lg">&#9733;</span>
              <span className="text-base font-medium text-[#23244a]">{vedicRemediesService.rating}</span>
              <span className="text-sm text-[#23244a]">{vedicRemediesService.reviews} reviews</span>
            </div>
            <div className="flex gap-2 mt-2">
              {vedicRemediesService.features.map((f, i) => (
                <span key={f} className={`px-3 py-0.5 rounded-full text-xs font-medium ${i === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'}`}>{f}</span>
              ))}
            </div>
            <div className="flex items-end gap-3 mt-3">
              {secondsLeft === 0 ? (
                <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{vedicRemediesService.oldPrice}</span>
              ) : (
                <>
                  <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{vedicRemediesService.price}</span>
                  <span className="text-base text-gray-400 line-through">{vedicRemediesService.oldPrice}</span>
                  <span className="text-base font-semibold text-green-700">{vedicRemediesService.discount}</span>
                </>
              )}
            </div>
            <div className="text-red-600 font-medium text-sm mt-1">
              {secondsLeft > 0 ? `Offer ends in ${formatTime(secondsLeft)}` : 'Offer ended'}
            </div>
            {/* Service Variants */}
            <div className="flex gap-4 mt-3">
              {vedicRemediesService.variants.map((v, idx) => (
                <button
                  key={v.label}
                  onClick={() => setSelectedVariant(idx)}
                  className={`flex flex-col items-center gap-1 focus:outline-none ${selectedVariant === idx ? 'ring-2 ring-black' : ''}`}
                >
                  <Image src={v.image} alt={v.label} width={40} height={40} className="rounded-full object-cover" />
                  <span className="text-xs text-[#23244a] mt-1 font-normal">{v.label}</span>
                </button>
              ))}
            </div>
            {/* Quantity Selector */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-sm text-[#23244a]">Quantity</span>
              <button
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-[#23244a] bg-white"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >-</button>
              <span className="text-base font-medium text-[#23244a] w-7 text-center">{quantity}</span>
              <button
                className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-lg font-bold text-[#23244a] bg-white"
                onClick={() => setQuantity(q => q + 1)}
              >+</button>
            </div>
            <div className="text-xs text-gray-600 mt-1">{vedicRemediesService.orders.toLocaleString()} orders placed in the last 24 hours</div>
            {/* Delivery Date Input */}
            <div className="mt-3 bg-gray-100 rounded-lg p-3 flex flex-col gap-2">
              <span className="text-xs font-medium text-[#23244a]">ESTIMATED DELIVERY DATE</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="rounded-md px-3 py-1.5 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#23244a] bg-white"
                  style={{ maxWidth: 120 }}
                />
                <button className="bg-black text-white px-4 py-1.5 rounded-md font-semibold text-sm hover:bg-[#23244a] transition">CHECK</button>
              </div>
            </div>
            {/* Add to Cart / Buy Now */}
            <div className="flex gap-3 mt-5">
              <UniversalCartButton
                productId="vedic-remedies"
                productName={vedicRemediesService.title}
                price={Number(vedicRemediesService.price.replace(/[^\d]/g, ''))}
                image={vedicRemediesService.images[0]}
                quantity={quantity}
                className="flex-1 bg-black text-white py-3 rounded-md font-semibold text-base hover:bg-[#23244a] transition"
              >
                ADD TO CART
              </UniversalCartButton>
              <button className="flex-1 bg-yellow-400 text-black py-3 rounded-md font-semibold text-base hover:bg-yellow-500 transition">BUY IT NOW</button>
            </div>
          </div>
        </div>
        {/* ProductAssuranceBar */}
        <ProductAssuranceBar />
        {/* FAQ Section */}
        <div className="w-screen overflow-x-clip mt-14 mb-10" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
          <div className="max-w-5xl w-full mx-auto px-2 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-7 text-[#23244a] text-center" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}>Frequently Asked Questions</h2>
            <div className="space-y-5 w-full">
              {vedicRemediesFaqs.map((faq, idx) => {
                const isOpen = openFaqs.has(idx);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.07 }}
                    className="rounded-xl border border-gray-200 bg-white/80 shadow-md p-4 group hover:shadow-lg transition-all w-full"
                  >
                    <button
                      className="w-full text-left font-medium text-[#23244a] cursor-pointer text-base group-open:text-[#77A656] focus:outline-none flex justify-between items-center"
                      onClick={() => {
                        const newOpenFaqs = new Set(openFaqs);
                        if (isOpen) {
                          newOpenFaqs.delete(idx);
                        } else {
                          newOpenFaqs.add(idx);
                        }
                        setOpenFaqs(newOpenFaqs);
                      }}
                      aria-expanded={isOpen}
                    >
                      {faq.question}
                      <span className={`ml-2 transition-transform text-lg ${isOpen ? 'rotate-90' : ''}`}>▶</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-2 text-[#2C3A4B] text-sm leading-relaxed">{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
        {/* ProductPurchaseInfo */}
        <ProductPurchaseInfo />
        {/* Full-width ServiceCarousels */}
        <div className="w-screen overflow-x-clip" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
          <ServiceCarousels />
        </div>
        {/* Nakshatra Gyaan Banner */}
        <NakshatraGyaanBanner />
        {/* Related Services */}
        <div className="w-screen overflow-x-clip mb-16" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-[#23244a] text-center" style={{ fontFamily: 'Playfair Display, serif' }}>Related Services</h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8">
            {relatedServices.map(service => (
              <div key={service.slug} className="group">
                <ProductServiceCard
                  image={service.image}
                  title={service.title}
                  description={service.oldPrice ? `${service.price} (was ${service.oldPrice})` : service.price}
                  badge={service.oldPrice ? 'Recommended' : ''}
                  href={`/services/${service.slug}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Spiritual Journey Banner */}
        <SpiritualJourneyBanner />
      </div>
    </>
  );
} 