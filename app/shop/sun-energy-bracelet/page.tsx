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

// Sun Energy Bracelet Product Configuration
const sunEnergyBracelet = {
  title: "Sun Energy Bracelet",
  images: [
    "/images/products/sun-energy-bracelet-main.jpg",
    "/images/products/sun-bracelet-detail-1.jpg",
    "/images/products/sun-bracelet-detail-2.jpg",
    "/images/products/sun-bracelet-packaging.jpg",
    "/images/products/sun-bracelet-wearing.jpg",
    "/images/products/sun-bracelet-gift.jpg",
  ],
  variants: [
    { label: "Ruby Beads", image: "/images/products/sun-bracelet-ruby.jpg" },
    { label: "Orange Carnelian", image: "/images/products/sun-bracelet-orange-carnelian.jpg" },
  ],
  features: ["Sun Planet Energy", "Leadership & Authority", "Natural Gemstones"],
  price: "₹1,199",
  oldPrice: "₹2,299",
  discount: "48% OFF",
  offerEnds: "01 hr : 45 min : 30 sec",
  rating: 4.8,
  reviews: 756,
  orders: 1089,
};

// Sun Energy Bracelet FAQs
const sunEnergyFaqs = [
  {
    question: "What is the Sun Energy Bracelet and how does it work?",
    answer: "The Sun Energy Bracelet is crafted with natural gemstones that resonate with Sun planet energy. The Sun represents leadership, authority, confidence, and success. Wearing this bracelet helps channel the Sun's positive energy to enhance your leadership qualities, boost confidence, and achieve success in life.",
  },
  {
    question: "Which gemstones are used in the Sun Energy Bracelet?",
    answer: "Our Sun Energy Bracelet features authentic Ruby and Orange Carnelian beads. Ruby is the primary gemstone for Sun, enhancing leadership, authority, and success. Orange Carnelian boosts confidence, creativity, and personal power. These stones work together to amplify the Sun's beneficial energy.",
  },
  {
    question: "How do I know if I need Sun energy in my life?",
    answer: "You may benefit from Sun energy if you experience lack of confidence, difficulty in leadership roles, low self-esteem, problems with authority figures, or lack of recognition for your work. Sun energy helps overcome these challenges and brings success and recognition.",
  },
  {
    question: "How should I wear the Sun Energy Bracelet?",
    answer: "Wear the bracelet on your right wrist for maximum Sun energy absorption. It's best to wear it during the day, especially during Sun hora (Sunday). The morning hours are most auspicious for Sun energy. Cleanse it monthly with running water and charge it in sunlight.",
  },
  {
    question: "How long does it take to see the effects?",
    answer: "Effects vary by individual. Some people feel immediate confidence and energy boost, while others notice gradual improvements over 2-4 weeks of consistent wearing. The bracelet works by aligning your energy with the Sun's positive vibrations.",
  },
  {
    question: "Is this bracelet suitable for everyone?",
    answer: "The Sun Energy Bracelet is generally suitable for most people, especially those seeking leadership qualities, confidence, and success. However, if you have Sun in a strong position in your birth chart, consult an astrologer first to ensure it's beneficial for you.",
  },
  {
    question: "How do I care for and maintain my Sun Energy Bracelet?",
    answer: "Clean your bracelet monthly with running water to remove negative energy. Charge it in morning sunlight for 15-20 minutes to enhance its energy. Avoid exposing it to harsh chemicals or extreme temperatures. Store it in a clean, dry place when not wearing.",
  },
  {
    question: "Can I wear this bracelet with other gemstone jewelry?",
    answer: "Yes, the Sun Energy Bracelet can be worn with other gemstone jewelry. It pairs well with Mars and Jupiter stones. However, avoid wearing it with Saturn-ruled stones (like blue sapphire) simultaneously, as Sun and Saturn have opposing energies.",
  },
];

// Related Products
const relatedProducts = [
  {
    title: 'Mars Energy Bracelet',
    image: '/images/products/mars-energy-bracelet.jpg',
    price: '₹1,299',
    oldPrice: '₹2,499',
    slug: 'mars-energy-bracelet',
  },
  {
    title: 'Jupiter Energy Bracelet',
    image: '/images/products/jupiter-energy-bracelet.jpg',
    price: '₹1,399',
    oldPrice: '₹2,599',
    slug: 'jupiter-energy-bracelet',
  },
  {
    title: 'Moon Energy Bracelet',
    image: '/images/products/moon-energy-bracelet.jpg',
    price: '₹1,099',
    oldPrice: '₹2,199',
    slug: 'moon-energy-bracelet',
  },
  {
    title: 'Venus Energy Bracelet',
    image: '/images/products/venus-energy-bracelet.jpg',
    price: '₹1,199',
    oldPrice: '₹2,299',
    slug: 'venus-energy-bracelet',
  },
];

export default function SunEnergyBraceletPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  // Real-time offer timer
  const OFFER_DURATION = 1 * 60 * 60 + 45 * 60 + 30; // 1 hr 45 min 30 sec in seconds
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
                src={sunEnergyBracelet.images[selectedImage]}
                alt={sunEnergyBracelet.title}
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-row gap-2 w-full overflow-x-auto pb-2">
              {sunEnergyBracelet.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg border-2 ${selectedImage === idx ? 'border-black' : 'border-transparent'} overflow-hidden focus:outline-none`}
                  style={{ minWidth: 54, minHeight: 54 }}
                >
                  <Image src={img} alt={sunEnergyBracelet.title} width={54} height={54} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col gap-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#23244a]" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{sunEnergyBracelet.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#FFD700] text-lg">&#9733;</span>
              <span className="text-base font-medium text-[#23244a]">{sunEnergyBracelet.rating}</span>
              <span className="text-sm text-[#23244a]">{sunEnergyBracelet.reviews} reviews</span>
            </div>
            <div className="flex gap-2 mt-2">
              {sunEnergyBracelet.features.map((f, i) => (
                <span key={f} className={`px-3 py-0.5 rounded-full text-xs font-medium ${i === 0 ? 'bg-yellow-100 text-yellow-800' : i === 1 ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>{f}</span>
              ))}
            </div>
            <div className="flex items-end gap-3 mt-3">
              {secondsLeft === 0 ? (
                <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{sunEnergyBracelet.oldPrice}</span>
              ) : (
                <>
                  <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{sunEnergyBracelet.price}</span>
                  <span className="text-base text-gray-400 line-through">{sunEnergyBracelet.oldPrice}</span>
                  <span className="text-base font-semibold text-green-700">{sunEnergyBracelet.discount}</span>
                </>
              )}
            </div>
            <div className="text-red-600 font-medium text-sm mt-1">
              {secondsLeft > 0 ? `Offer ends in ${formatTime(secondsLeft)}` : 'Offer ended'}
            </div>
            {/* Product Variants */}
            <div className="flex gap-4 mt-3">
              {sunEnergyBracelet.variants.map((v, idx) => (
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
            <div className="text-xs text-gray-600 mt-1">{sunEnergyBracelet.orders.toLocaleString()} orders placed in the last 24 hours</div>
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
                productId="sun-energy-bracelet"
                productName={sunEnergyBracelet.title}
                price={Number(sunEnergyBracelet.price.replace(/[^\d]/g, ''))}
                image={sunEnergyBracelet.images[0]}
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
              {sunEnergyFaqs.map((faq, idx) => {
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
                  href={`/shop/${product.slug}`}
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