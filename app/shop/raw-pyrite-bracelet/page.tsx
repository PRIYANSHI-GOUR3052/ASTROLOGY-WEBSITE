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

// Raw Pyrite Bracelet Product Configuration
const rawPyriteProduct = {
  title: "Raw Pyrite Bracelet",
  images: [
    "/images/products/pyrite-bracelet-1.jpg",
    "/images/products/pyrite-bracelet-2.jpg",
    "/images/products/pyrite-bracelet-3.jpg",
    "/images/products/pyrite-bracelet-4.jpg",
    "/images/products/pyrite-bracelet-5.jpg",
    "/images/products/pyrite-bracelet-6.jpg",
  ],
  variants: [
    { label: "Raw Pyrite Bracelet", image: "/images/products/pyrite-bracelet-1.jpg" },
    { label: "Pyrite & Black Onyx Combo", image: "/images/products/pyrite-bracelet-2.jpg" },
  ],
  features: ["Attracts Wealth", "Business Success", "Protection"],
  price: "₹1,299",
  oldPrice: "₹3,999",
  discount: "67% + Extra 15% OFF",
  offerEnds: "09 hr : 06 min : 59 sec",
  rating: 4.9,
  reviews: 567,
  orders: 892,
};

// Raw Pyrite Bracelet FAQs
const rawPyriteFaqs = [
  {
    question: "What is Raw Pyrite and what are its benefits?",
    answer: "Raw Pyrite, also known as Fool's Gold, is a powerful crystal that attracts wealth, abundance, and prosperity. It's believed to enhance business success, protect against negative energy, and boost confidence and willpower.",
  },
  {
    question: "How do I know if my Raw Pyrite bracelet is genuine?",
    answer: "All our Raw Pyrite products are lab-certified and 100% authentic. Each bracelet comes with a certificate of authenticity and is sourced from trusted suppliers.",
  },
  {
    question: "How should I wear my Raw Pyrite bracelet?",
    answer: "Wear it on your left wrist to receive its energy, or on your right wrist to project its energy outward. For best results, cleanse it regularly with moonlight or salt water.",
  },
  {
    question: "Can anyone wear Raw Pyrite?",
    answer: "Yes, Raw Pyrite can be worn by anyone. It's especially beneficial for entrepreneurs, business professionals, and those seeking financial abundance.",
  },
  {
    question: "How often should I cleanse my Raw Pyrite bracelet?",
    answer: "Cleanse your bracelet once a month or whenever you feel its energy has diminished. You can use moonlight, salt water, or smudging with sage.",
  },
  {
    question: "What makes this Raw Pyrite bracelet special?",
    answer: "Our Raw Pyrite bracelets are handcrafted with genuine pyrite stones, blessed by expert astrologers, and designed to maximize the crystal's natural energy for wealth attraction.",
  },
  {
    question: "How long does shipping take?",
    answer: "We offer fast shipping with delivery within 3-5 business days across India. International shipping takes 7-14 business days depending on your location.",
  },
];

// Related Products
const relatedProducts = [
  {
    title: 'Dhan Yog Bracelet',
    image: '/images/products/dhan-yog-bracelet.jpg',
    price: '₹999',
    oldPrice: '₹2,999',
    slug: 'dhan-yog-bracelet',
  },
  {
    title: 'Money Magnet Bracelet',
    image: '/images/products/money-magnet-bracelet.jpg',
    price: '₹1,199',
    oldPrice: '₹3,500',
    slug: 'money-magnet-bracelet',
  },
  {
    title: 'Rose Quartz Bracelet',
    image: '/images/products/rose-quartz-bracelet.jpg',
    price: '₹899',
    oldPrice: '₹2,500',
    slug: 'rose-quartz-bracelet',
  },
  {
    title: 'Gemstone Consultation',
    image: '/images/astrology_understanding.jpg',
    price: '₹1,500',
    oldPrice: '₹2,500',
    slug: 'gemstone-consultation',
  },
];

export default function RawPyriteBraceletPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  // Real-time offer timer
  const OFFER_DURATION = 9 * 60 * 60 + 6 * 60 + 59; // 9 hr 6 min 59 sec in seconds
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
                src={rawPyriteProduct.images[selectedImage]}
                alt={rawPyriteProduct.title}
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-row gap-2 w-full overflow-x-auto pb-2">
              {rawPyriteProduct.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg border-2 ${selectedImage === idx ? 'border-black' : 'border-transparent'} overflow-hidden focus:outline-none`}
                  style={{ minWidth: 54, minHeight: 54 }}
                >
                  <Image src={img} alt={rawPyriteProduct.title} width={54} height={54} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#23244a]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{rawPyriteProduct.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#FFD700] text-lg">&#9733;</span>
              <span className="text-base font-medium text-[#23244a]">{rawPyriteProduct.rating}</span>
              <span className="text-sm text-[#23244a]">{rawPyriteProduct.reviews} reviews</span>
            </div>
            <div className="flex gap-2 mt-2">
              {rawPyriteProduct.features.map((f, i) => (
                <span key={f} className={`px-3 py-0.5 rounded-full text-xs font-medium ${i === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'}`}>{f}</span>
              ))}
            </div>
            <div className="flex items-end gap-3 mt-3">
              {secondsLeft === 0 ? (
                <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{rawPyriteProduct.oldPrice}</span>
              ) : (
                <>
                  <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{rawPyriteProduct.price}</span>
                  <span className="text-base text-gray-400 line-through">{rawPyriteProduct.oldPrice}</span>
                  <span className="text-base font-semibold text-green-700">{rawPyriteProduct.discount}</span>
                </>
              )}
            </div>
            <div className="text-red-600 font-medium text-sm mt-1">
              {secondsLeft > 0 ? `Offer ends in ${formatTime(secondsLeft)}` : 'Offer ended'}
            </div>
            {/* Product Variants */}
            <div className="flex gap-4 mt-3">
              {rawPyriteProduct.variants.map((v, idx) => (
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
            <div className="text-xs text-gray-600 mt-1">{rawPyriteProduct.orders.toLocaleString()} orders placed in the last 24 hours</div>
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
                productId="raw-pyrite-bracelet"
                productName={rawPyriteProduct.title}
                price={Number(rawPyriteProduct.price.replace(/[^\d]/g, ''))}
                image={rawPyriteProduct.images[0]}
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
              {rawPyriteFaqs.map((faq, idx) => {
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
        {/* Related Products */}
        <div className="w-screen overflow-x-clip mb-16" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-[#23244a] text-center" style={{ fontFamily: 'Playfair Display, serif' }}>Related Products</h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8">
            {relatedProducts.map(product => (
              <div key={product.slug} className="group">
                <ProductServiceCard
                  image={product.image}
                  title={product.title}
                  description={product.oldPrice ? `${product.price} (was ${product.oldPrice})` : product.price}
                  badge={product.oldPrice ? 'Recommended' : ''}
                  href={`/${product.slug}`}
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