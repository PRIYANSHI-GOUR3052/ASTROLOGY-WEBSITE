"use client";
import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';

const faqs = [
  {
    question: "What is a Rudraksha and why is it special?",
    answer: "Rudraksha beads are sacred seeds used for spiritual and healing purposes, believed to bring peace, protection, and prosperity.",
  },
  {
    question: "How do I know if my Rudraksha is genuine?",
    answer: "All our Rudraksha products are lab-certified and 100% authentic, with certification provided.",
  },
  {
    question: "How should I wear or use my Rudraksha?",
    answer: "You can wear it as a bracelet or mala, or keep it in your puja space. For best results, energize it with a simple mantra before use.",
  },
  {
    question: "Can anyone wear Rudraksha?",
    answer: "Yes, Rudraksha can be worn by anyone regardless of age, gender, or faith.",
  },
  {
    question: "Is my personal information kept confidential?",
    answer: "Yes, your data is 100% confidential and used only for order processing.",
  },
];

const product = {
  title: "Maha Dhan Yog Combo",
  images: [
    "/images/products/maha-dhan-yog-main.jpg",
    "/images/products/dhan-yog-bracelet.jpg",
    "/images/products/maha-dhan-yog-combo.jpg",
    "/images/products/5-mukhi-bracelet.jpg",
    "/images/products/evil-eye-bracelet.jpg",
    "/images/products/make-moments.jpg",
  ],
  variants: [
    { label: "Maha Dhan Yog Combo", image: "/images/products/maha-dhan-yog-main.jpg" },
    { label: "Dhan-Raksha Combo", image: "/images/products/dhan-yog-bracelet.jpg" },
  ],
  features: ["Attracts Wealth", "Brings Peace"],
  price: "₹999",
  oldPrice: "₹5,397",
  discount: "61% + Extra 20% OFF",
  offerEnds: "09 hr : 06 min : 59 sec",
  rating: 4.8,
  reviews: 383,
  orders: 1231,
};

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [added, setAdded] = useState(false);

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
      <div className="min-h-screen bg-white flex flex-col items-center justify-start py-10 px-2 md:px-0 mt-16">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12">
          {/* Left: Main Image and Thumbnails */}
          <div className="flex flex-col items-center md:w-1/2">
            <div className="w-full rounded-2xl overflow-hidden bg-[#f7f5ed] flex items-center justify-center mb-4" style={{ aspectRatio: '1/1' }}>
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                width={480}
                height={480}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <div className="flex flex-row gap-3 w-full overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-xl border-2 ${selectedImage === idx ? 'border-black' : 'border-transparent'} overflow-hidden focus:outline-none`}
                  style={{ minWidth: 70, minHeight: 70 }}
                >
                  <Image src={img} alt={product.title} width={70} height={70} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          </div>
          {/* Right: Product Info */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#23244a]" style={{ fontFamily: 'Playfair Display, serif' }}>{product.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[#FFD700] text-xl">&#9733;</span>
              <span className="text-lg font-semibold text-[#23244a]">{product.rating}</span>
              <span className="text-base text-[#23244a]">{product.reviews} reviews</span>
            </div>
            <div className="flex gap-2 mt-2">
              {product.features.map((f, i) => (
                <span key={f} className={`px-4 py-1 rounded-full text-sm font-semibold ${i === 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-indigo-100 text-indigo-800'}`}>{f}</span>
              ))}
            </div>
            <div className="flex items-end gap-4 mt-4">
              <span className="text-3xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>{product.price}</span>
              <span className="text-lg text-gray-400 line-through">{product.oldPrice}</span>
              <span className="text-lg font-bold text-green-700">{product.discount}</span>
            </div>
            <div className="text-red-600 font-bold text-base mt-1">Offer ends in {product.offerEnds}</div>
            {/* Variants/Combos */}
            <div className="flex gap-6 mt-4">
              {product.variants.map((v, idx) => (
                <button
                  key={v.label}
                  onClick={() => setSelectedVariant(idx)}
                  className={`flex flex-col items-center gap-1 focus:outline-none ${selectedVariant === idx ? 'ring-2 ring-black' : ''}`}
                >
                  <Image src={v.image} alt={v.label} width={60} height={60} className="rounded-full object-cover" />
                  <span className="text-xs text-[#23244a] mt-1">{v.label}</span>
                </button>
              ))}
            </div>
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-base text-[#23244a]">Quantity</span>
              <button
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-2xl font-bold text-[#23244a] bg-white"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >-</button>
              <span className="text-lg font-semibold text-[#23244a] w-8 text-center">{quantity}</span>
              <button
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-2xl font-bold text-[#23244a] bg-white"
                onClick={() => setQuantity(q => q + 1)}
              >+</button>
            </div>
            <div className="text-sm text-gray-600 mt-2">{product.orders.toLocaleString()} orders placed in the last 24 hours</div>
            {/* Delivery Date Input */}
            <div className="mt-4 bg-gray-100 rounded-xl p-4 flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#23244a]">ESTIMATED DELIVERY DATE</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your pincode"
                  value={pincode}
                  onChange={e => setPincode(e.target.value)}
                  className="rounded-lg px-4 py-2 border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#23244a] bg-white"
                  style={{ maxWidth: 180 }}
                />
                <button className="bg-black text-white px-6 py-2 rounded-lg font-bold text-base hover:bg-[#23244a] transition">CHECK</button>
              </div>
            </div>
            {/* Add to Cart / Buy Now */}
            <div className="flex gap-4 mt-6">
              <button
                className={`flex-1 bg-black text-white py-4 rounded-lg font-bold text-lg hover:bg-[#23244a] transition ${added ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={added}
                onClick={() => {
                  setAdded(true);
                  window.alert('Added to cart!');
                  setTimeout(() => setAdded(false), 2000);
                }}
              >
                {added ? 'Added!' : 'ADD TO CART'}
              </button>
              <button className="flex-1 bg-yellow-400 text-black py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition">BUY IT NOW</button>
            </div>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="max-w-3xl w-full mx-auto mt-16 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#23244a] text-center" style={{ fontFamily: 'Playfair Display, serif' }}>Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <details key={idx} className="rounded-lg border border-gray-200 bg-gray-50 p-4 group">
                <summary className="font-semibold text-[#23244a] cursor-pointer text-lg group-open:text-[#77A656]">{faq.question}</summary>
                <div className="mt-2 text-[#2C3A4B] text-base">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
} 