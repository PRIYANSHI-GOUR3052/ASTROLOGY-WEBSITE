"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { UniversalCartButton } from '../../components/UniversalCartButton';
import ProductAssuranceBar from '../../components/ProductAssuranceBar';
import ProductPurchaseInfo from '../../components/ProductPurchaseInfo';
import { ProductServiceCard } from "../../components/UniversalServiceGrid";
import ServiceCarousels from '../../components/ServiceCarousels';
import NakshatraGyaanBanner from '../../components/NakshatraGyaanBanner';
import SpiritualJourneyBanner from '../../components/SpiritualJourneyBanner';

// FAQ Item Component
function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="rounded-xl border border-gray-200 bg-white/80 shadow-md p-4 group hover:shadow-lg transition-all w-full"
    >
      <button
        className="w-full text-left font-medium text-[#23244a] cursor-pointer text-base group-open:text-[#77A656] focus:outline-none flex justify-between items-center"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {faq.question}
        <span className={`ml-2 transition-transform text-lg ${open ? 'rotate-90' : ''}`}>▶</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
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
}

// Grah Shanti Service Configuration
const grahShantiService = {
  title: "Grah Shanti Puja",
  images: [
    "/images/course-2.jpg",
    "/images/birth_chart_mockup.jpg",
    "/images/astrology_understanding.jpg",
    "/images/spiritualpathway.jpg",
  ],
  variants: [
    { label: "Basic Grah Shanti", image: "/images/course-2.jpg" },
    { label: "Premium Navagraha Puja", image: "/images/astrology_understanding.jpg" },
  ],
  features: ["Expert Vedic Priests", "Sacred Rituals", "Personalized Remedies"],
  price: "₹3,500",
  oldPrice: "₹5,000",
  discount: "30% OFF",
  offerEnds: "05 hr : 45 min : 20 sec",
  rating: 4.9,
  reviews: 1247,
  orders: 2103,
};

// Grah Shanti FAQs
const grahShantiFaqs = [
  {
    question: "What is a Grah Shanti Puja?",
    answer: "A Grah Shanti Puja is a sacred Vedic ritual performed to appease the nine planets (Navagrahas) and reduce their negative effects (doshas) in a person's life, as indicated by their birth chart. The goal is to restore cosmic balance and attract peace and prosperity.",
  },
  {
    question: "How do I know if I need a Grah Shanti Puja?",
    answer: "If you are experiencing persistent challenges, delays, conflicts, or health issues despite your best efforts, it could be due to malefic planetary influences. An astrological consultation can analyze your birth chart to determine if a Grah Shanti Puja is recommended for you.",
  },
  {
    question: "Is the puja performed for all nine planets at once?",
    answer: "It depends on the individual's chart. Sometimes a general Navagraha Puja is performed for overall harmony. More often, the puja is focused on a specific planet that is causing the most trouble (e.g., a Shani Shanti Puja for Saturn or a Rahu Puja).",
  },
  {
    question: "Can this puja be performed remotely?",
    answer: "Yes. Our learned priests can perform the puja on your behalf. You will be given the specific timings, and you can participate mentally or via live stream from your location. The positive vibrations and blessings will reach you regardless of your physical presence.",
  },
  {
    question: "What details are required for the puja?",
    answer: "We typically require your full name, your date, time, and place of birth, and your Gotra (if known). A 'Sankalpa' (statement of purpose) will be taken in your name before the ritual begins.",
  },
  {
    question: "How long does it take to see the effects of the puja?",
    answer: "The effects can vary from person to person. Some people experience a sense of peace and clarity immediately, while for others, the positive changes unfold gradually over several weeks or months. The sincerity of your faith and your own karmic patterns also play a role.",
  },
  {
    question: "What is included in the Grah Shanti Puja package?",
    answer: "Our package includes the complete puja ritual, sacred materials, priest fees, detailed report, and follow-up consultation. You will also receive specific remedies and recommendations for ongoing spiritual practices.",
  },
];

// Related Services
const relatedServices = [
  {
    title: 'Kundali Matching',
    image: '/images/birth_chart_mockup.jpg',
    price: '₹2,100',
    oldPrice: '₹4,500',
    slug: 'kundali-matching',
  },
  {
    title: "Today's Panchang",
    image: '/images/cosmiccalendar.png',
    price: '₹299',
    oldPrice: '₹599',
    slug: 'panchang',
  },
  {
    title: 'Numerology Analysis',
    image: '/images/course-4.jpg',
    price: '₹1,800',
    oldPrice: '₹2,500',
    slug: 'numerology',
  },
  {
    title: 'Personal Astrology Reading',
    image: '/images/astrology_understanding.jpg',
    price: '₹2,500',
    oldPrice: '₹3,500',
    slug: 'personal-reading',
  },
];

export default function GrahShantiPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [added, setAdded] = useState(false);

  // Real-time offer timer
  const OFFER_DURATION = 5 * 60 * 60 + 45 * 60 + 20; // 5 hr 45 min 20 sec in seconds
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
                src={grahShantiService.images[selectedImage]}
                alt={grahShantiService.title}
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-row gap-2 w-full overflow-x-auto pb-2">
              {grahShantiService.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg border-2 ${selectedImage === idx ? 'border-black' : 'border-transparent'} overflow-hidden focus:outline-none`}
                  style={{ minWidth: 54, minHeight: 54 }}
                >
                  <Image src={img} alt={grahShantiService.title} width={54} height={54} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Service Info */}
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#23244a]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{grahShantiService.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#FFD700] text-lg">&#9733;</span>
              <span className="text-base font-medium text-[#23244a]">{grahShantiService.rating}</span>
              <span className="text-sm text-[#23244a]">{grahShantiService.reviews} reviews</span>
            </div>
            <div className="flex gap-2 mt-2">
              {grahShantiService.features.map((f, i) => (
                <span key={f} className={`px-3 py-0.5 rounded-full text-xs font-medium ${i === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'}`}>{f}</span>
              ))}
            </div>
            <div className="flex items-end gap-3 mt-3">
              {secondsLeft === 0 ? (
                <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{grahShantiService.oldPrice}</span>
              ) : (
                <>
                  <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{grahShantiService.price}</span>
                  <span className="text-base text-gray-400 line-through">{grahShantiService.oldPrice}</span>
                  <span className="text-base font-semibold text-green-700">{grahShantiService.discount}</span>
                </>
              )}
            </div>
            <div className="text-red-600 font-medium text-sm mt-1">
              {secondsLeft > 0 ? `Offer ends in ${formatTime(secondsLeft)}` : 'Offer ended'}
            </div>
            {/* Service Variants */}
            <div className="flex gap-4 mt-3">
              {grahShantiService.variants.map((v, idx) => (
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
            <div className="text-xs text-gray-600 mt-1">{grahShantiService.orders.toLocaleString()} orders placed in the last 24 hours</div>
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
                productId="grah-shanti"
                productName={grahShantiService.title}
                price={Number(grahShantiService.price.replace(/[^\d]/g, ''))}
                image={grahShantiService.images[0]}
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
              {grahShantiFaqs.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} index={idx} />
              ))}
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