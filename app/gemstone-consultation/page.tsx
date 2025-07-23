"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ServiceCarousels from '../components/ServiceCarousels';
import { Testimonials } from '../components/Testimonials';
import { motion, AnimatePresence } from 'framer-motion';
import { UniversalCartButton } from '../components/UniversalCartButton';

// FAQ Item Component
function FAQItem({ faq, index }: { faq: { question: string; answer: string }; index: number }) {
  const [open, setOpen] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="rounded-md border border-gray-200 bg-gray-50 p-3 group"
    >
      <button
        className="w-full text-left font-medium text-[#23244a] cursor-pointer text-base group-open:text-[#77A656] focus:outline-none flex justify-between items-center"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {faq.question}
        <span className={`ml-2 transition-transform ${open ? 'rotate-90' : ''}`}>▶</span>
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
            <div className="mt-2 text-[#2C3A4B] text-sm">{faq.answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const productData = {
  title: "Gemstone Consultation",
  images: [
    "/images/blog/gemstones.jpg",
    "/images/blog/vedic-astrology.jpg",
    "/images/astrowellness.jpg",
    "/images/astrology_understanding.jpg",
  ],
  variants: [
    { label: "Basic Consultation", image: "/images/blog/gemstones.jpg" },
    { label: "Premium Consultation", image: "/images/blog/vedic-astrology.jpg" },
  ],
  features: [
    "Personalized Gemstone Advice",
    "Expert Astrologer Guidance",
    "Remedy Recommendations"
  ],
  price: "₹999",
  oldPrice: "₹1,999",
  discount: "50% OFF",
  offerEnds: "03 hr : 10 min : 00 sec",
  rating: 4.95,
  reviews: 542,
  orders: 1201,
};

const faqsToShow = [
  {
    question: "What is a Gemstone Consultation?",
    answer: "A Gemstone Consultation is a personalized session with an expert astrologer to determine which gemstones are most beneficial for you based on your birth chart and current planetary influences.",
  },
  {
    question: "How do I prepare for my consultation?",
    answer: "Simply provide your date, time, and place of birth. If you have specific concerns (health, career, relationships), mention them for a more focused recommendation.",
  },
  {
    question: "Will I get a written report?",
    answer: "Yes, you will receive a detailed PDF report outlining the recommended gemstones, their benefits, and how to wear them for maximum effect.",
  },
  {
    question: "Are the recommendations unique to me?",
    answer: "Absolutely. All advice is tailored to your unique astrological profile and life circumstances.",
  },
  {
    question: "Can I ask follow-up questions after the consultation?",
    answer: "Yes, you can email us with any follow-up questions regarding your gemstone recommendations or remedies.",
  },
  {
    question: "Are the gemstones provided as part of the consultation?",
    answer: "The consultation includes recommendations only. However, you can purchase the suggested gemstones separately from our shop.",
  },
  {
    question: "Is my information confidential?",
    answer: "Yes, all your personal and birth details are kept strictly confidential and used only for your consultation.",
  },
];

export default function GemstoneConsultationPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  // Real-time offer timer (6 hours)
  const OFFER_DURATION = 6 * 60 * 60; // 6 hours in seconds
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
                src={productData.images[selectedImage]}
                alt={productData.title}
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-row gap-2 w-full overflow-x-auto pb-2">
              {productData.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg border-2 ${selectedImage === idx ? 'border-black' : 'border-transparent'} overflow-hidden focus:outline-none`}
                  style={{ minWidth: 54, minHeight: 54 }}
                >
                  <Image src={img} alt={productData.title} width={54} height={54} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#23244a]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{productData.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#FFD700] text-lg">&#9733;</span>
              <span className="text-base font-medium text-[#23244a]">{productData.rating}</span>
              <span className="text-sm text-[#23244a]">{productData.reviews} reviews</span>
            </div>
            <div className="flex gap-2 mt-2">
              {productData.features.map((f, i) => (
                <span key={f} className={`px-3 py-0.5 rounded-full text-xs font-medium ${i === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'}`}>{f}</span>
              ))}
            </div>
            <div className="flex items-end gap-3 mt-3">
              <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{productData.price}</span>
              <span className="text-base text-gray-400 line-through">{productData.oldPrice}</span>
              <span className="text-base font-semibold text-green-700">{productData.discount}</span>
            </div>
            <div className="text-red-600 font-medium text-sm mt-1">
              {secondsLeft > 0 ? `Offer ends in ${formatTime(secondsLeft)}` : 'Offer ended'}
            </div>
            {/* Variants/Combos */}
            <div className="flex gap-4 mt-3">
              {productData.variants.map((v, idx) => (
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
            <div className="text-xs text-gray-600 mt-1">{productData.orders.toLocaleString()} orders placed in the last 24 hours</div>
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
                productId={"gemstone-consultation"}
                productName={productData.title}
                price={Number(productData.price.replace(/[^\d]/g, ''))}
                image={productData.images && productData.images[0] ? (productData.images[0].startsWith('/') ? productData.images[0] : `/images/products/${productData.images[0]}`) : '/images/products/fallback.jpg'}
                quantity={quantity}
                className="flex-1 bg-black text-white py-3 rounded-md font-semibold text-base hover:bg-[#23244a] transition"
              >
                ADD TO CART
              </UniversalCartButton>
              <button className="flex-1 bg-yellow-400 text-black py-3 rounded-md font-semibold text-base hover:bg-yellow-500 transition">BUY IT NOW</button>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="max-w-2xl w-full mx-auto mt-12 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-[#23244a] text-center" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqsToShow.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} index={idx} />
            ))}
          </div>
        </div>
        {/* Full-width Testimonials */}
        <div className="w-screen overflow-x-clip" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
          <Testimonials />
        </div>
        {/* Full-width ServiceCarousels */}
        <div className="w-screen overflow-x-clip" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
          <ServiceCarousels />
        </div>
      </div>
    </>
  );
} 