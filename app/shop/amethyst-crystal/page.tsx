"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { UniversalCartButton } from "@/app/components/UniversalCartButton";
import ProductAssuranceBar from "@/app/components/ProductAssuranceBar";
import ProductPurchaseInfo from "@/app/components/ProductPurchaseInfo";
import ServiceCarousels from "@/app/components/ServiceCarousels";
import NakshatraGyaanBanner from "@/app/components/NakshatraGyaanBanner";
import SpiritualJourneyBanner from "@/app/components/SpiritualJourneyBanner";

const amethystProduct = {
  title: "Amethyst Crystal",
  images: [
    "/images/products/amethyst-1.jpg",
    "/images/products/amethyst-2.jpg",
    "/images/products/amethyst-3.jpg",
    "/images/products/amethyst-4.jpg",
    "/images/products/amethyst-5.jpg",
    "/images/products/amethyst-6.jpg",
  ],
  variants: [
    { label: "Natural Amethyst", image: "/images/products/amethyst-1.jpg" },
    { label: "Amethyst Cluster", image: "/images/products/amethyst-2.jpg" },
  ],
  features: ["Stress Relief", "Spiritual Growth", "Protection"],
  price: "₹1,299",
  oldPrice: "₹2,999",
  discount: "56% OFF",
  offerEnds: "05 hr : 30 min : 15 sec",
  rating: 4.8,
  reviews: 892,
  orders: 1247,
};

const faqs = [
  {
    question: "What are the healing properties of Amethyst?",
    answer: "Amethyst is known for its calming and stress-relieving properties. It helps with spiritual growth, protection, and promotes peaceful sleep. It's also associated with the crown chakra and enhances meditation practices."
  },
  {
    question: "How should I cleanse my Amethyst crystal?",
    answer: "You can cleanse your Amethyst by placing it under moonlight overnight, using sage smoke, or rinsing it with clean water. Avoid direct sunlight as it can fade the color. Regular cleansing helps maintain its energy."
  },
  {
    question: "Where should I place Amethyst in my home?",
    answer: "Place Amethyst in your bedroom for peaceful sleep, meditation area for spiritual growth, or near your workspace for stress relief. It's also beneficial in the northeast corner of your home for positive energy."
  },
  {
    question: "Is this natural Amethyst or treated?",
    answer: "Our Amethyst crystals are 100% natural and untreated. Each piece is carefully selected for its quality, color, and energy properties. We source directly from trusted mines to ensure authenticity."
  },
  {
    question: "What size Amethyst should I choose?",
    answer: "For personal use, a small to medium piece (2-4 inches) is perfect. For home decoration or larger spaces, choose a larger cluster. The size doesn't affect the healing properties, but larger pieces can have stronger energy."
  },
  {
    question: "Can Amethyst help with anxiety and stress?",
    answer: "Yes, Amethyst is highly effective for anxiety and stress relief. Its calming energy helps soothe the mind, reduce tension, and promote emotional balance. Many people use it during meditation or keep it nearby for daily stress relief."
  }
];

const relatedProducts = [
  {
    title: "Rose Quartz Crystal",
    image: "/images/products/rose-quartz.jpg",
    price: "₹999",
    oldPrice: "₹1,999",
    slug: "rose-quartz-crystal",
  },
  {
    title: "Clear Quartz Crystal",
    image: "/images/products/clear-quartz.jpg",
    price: "₹799",
    oldPrice: "₹1,599",
    slug: "clear-quartz-crystal",
  },
  {
    title: "Citrine Crystal",
    image: "/images/products/citrine.jpg",
    price: "₹1,199",
    oldPrice: "₹2,399",
    slug: "citrine-crystal",
  },
  {
    title: "Black Tourmaline",
    image: "/images/products/black-tourmaline.jpg",
    price: "₹1,099",
    oldPrice: "₹2,199",
    slug: "black-tourmaline",
  }
];

export default function AmethystCrystalPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % amethystProduct.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + amethystProduct.images.length) % amethystProduct.images.length);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                <Image
                  src={amethystProduct.images[selectedImage]}
                  alt={amethystProduct.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-6 gap-2">
                {amethystProduct.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-purple-500' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${amethystProduct.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
                  {amethystProduct.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Natural Amethyst crystal for stress relief, spiritual growth, and protection. 
                  This beautiful purple crystal is perfect for meditation and healing practices.
                </p>
              </div>

              {/* Variants */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Variant</h3>
                <div className="flex gap-3">
                  {amethystProduct.variants.map((variant, index) => (
                    <button
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={variant.image}
                          alt={variant.label}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium">{variant.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {amethystProduct.features.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price and Offer */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">{amethystProduct.price}</span>
                  <span className="text-xl text-gray-500 line-through">{amethystProduct.oldPrice}</span>
                  <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                    {amethystProduct.discount}
                  </span>
                </div>
                
                {/* Timer */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Offer ends in:</p>
                  <div className="flex gap-2">
                    <div className="bg-white px-3 py-2 rounded-lg text-center">
                      <span className="text-lg font-bold text-gray-900">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <p className="text-xs text-gray-500">hr</p>
                    </div>
                    <div className="bg-white px-3 py-2 rounded-lg text-center">
                      <span className="text-lg font-bold text-gray-900">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <p className="text-xs text-gray-500">min</p>
                    </div>
                    <div className="bg-white px-3 py-2 rounded-lg text-center">
                      <span className="text-lg font-bold text-gray-900">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <p className="text-xs text-gray-500">sec</p>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(amethystProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {amethystProduct.rating} ({amethystProduct.reviews} reviews)
                  </span>
                  <span className="text-sm text-gray-500">• {amethystProduct.orders} orders</span>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <UniversalCartButton
                  productId="amethyst-crystal"
                  productName={amethystProduct.title}
                  price={Number(amethystProduct.price.replace(/[^\d]/g, ''))}
                  image={amethystProduct.images[0]}
                  quantity={quantity}
                  className="w-full bg-black text-white py-3 rounded-md font-semibold text-base hover:bg-[#23244a] transition mb-4"
                >
                  ADD TO CART
                </UniversalCartButton>
              </div>
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
              {faqs.map((faq, idx) => {
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
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group overflow-hidden">
                  <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-serif font-bold text-gray-900 mb-3 text-xl">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="font-bold text-gray-900 text-lg">{product.price}</span>
                      <span className="text-gray-500 line-through text-sm">{product.oldPrice}</span>
                    </div>
                    <UniversalCartButton
                      productId={product.slug}
                      productName={product.title}
                      price={Number(product.price.replace(/[^\d]/g, ''))}
                      image={product.image}
                      quantity={1}
                      className="w-full bg-black text-white py-3 px-6 rounded-xl font-medium hover:bg-[#23244a] transition-colors"
                    >
                      Add to Cart
                    </UniversalCartButton>
                  </div>
                </div>
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