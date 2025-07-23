"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';
import ShopProductCarousel from "../../components/ShopProductCarousel";
import { useParams } from 'next/navigation';
import ServiceCarousels from '../../components/ServiceCarousels';
import { motion, AnimatePresence } from 'framer-motion';
import { UniversalCartButton } from '../../components/UniversalCartButton';
import ProductAssuranceBar from '../../components/ProductAssuranceBar';
import ProductPurchaseInfo from '../../components/ProductPurchaseInfo';
import { CTASection } from '../../components/CTASection';
import { ProductServiceCard } from "../../components/UniversalServiceGrid";

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

const product = {
  title: "Astrology Reports & Kundli Services",
  images: [
    "/images/products/astrology-report-main.jpg",
    "/images/products/kundli-sample-1.jpg",
    "/images/products/kundli-sample-2.jpg",
    "/images/products/astrology-report-detail.jpg",
    "/images/products/astrology-consultation.jpg",
    "/images/products/puja-kit.jpg",
  ],
  variants: [
    { label: "Basic Kundli Report", image: "/images/products/kundli-sample-1.jpg" },
    { label: "Premium Astrology Report", image: "/images/products/astrology-report-main.jpg" },
  ],
  features: ["Personalized Analysis", "PDF Delivery", "Expert Astrologer Review"],
  price: "₹499",
  oldPrice: "₹1,299",
  discount: "62% OFF",
  offerEnds: "05 hr : 22 min : 41 sec",
  rating: 4.9,
  reviews: 1247,
  orders: 2103,
};

const faqs = [
  {
    question: "What information do I need to provide for my astrology report?",
    answer: "You will need to provide your date of birth, time of birth, and place of birth for the most accurate analysis.",
  },
  {
    question: "How will I receive my Kundli or astrology report?",
    answer: "Your personalized report will be delivered as a PDF to your email address within 24-48 hours.",
  },
  {
    question: "Are these reports prepared by real astrologers?",
    answer: "Yes, all reports are prepared and reviewed by experienced, expert astrologers.",
  },
  {
    question: "Can I ask follow-up questions after receiving my report?",
    answer: "Absolutely! You can reply to your report email with any follow-up questions, and our astrologers will assist you.",
  },
  {
    question: "Is my personal information kept confidential?",
    answer: "Yes, your data is 100% confidential and used only for preparing your astrology report.",
  },
];

type Recommendation = {
  title: string;
  image: string;
  price: string;
  slug: string;
  oldPrice?: string;
};
const recommendations: Recommendation[] = [
  {
    title: 'Selenite Crystal Recharging Plate',
    image: '/images/products/selenite-plate.jpg',
    price: '₹699',
    oldPrice: '₹1,099',
    slug: 'selenite-crystal-plate',
  },
  {
    title: '7 Mukhi Rudraksha Bracelet',
    image: '/images/products/7-mukhi-rudraksha.jpg',
    price: '₹599',
    oldPrice: '₹2,499',
    slug: '7-mukhi-rudraksha-bracelet',
  },
  {
    title: 'Raw Pyrite Bracelet',
    image: '/images/products/raw-pyrite-bracelet.jpg',
    price: '₹599',
    oldPrice: '₹1,999',
    slug: 'raw-pyrite-bracelet',
  },
  {
    title: 'Nepal Origin 7 Mukhi Rudraksha',
    image: '/images/products/nepal-7-mukhi.jpg',
    price: '₹999',
    oldPrice: '₹1,799',
    slug: 'nepal-7-mukhi-rudraksha',
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  let slug = params?.slug || '';
  if (Array.isArray(slug)) slug = slug.join('-');

  // Rose Quartz Bracelet product config
  const roseQuartzProduct = {
    title: "Rose Quartz Bracelet",
    images: [
      "/images/products/rose-quartz-main.jpg",
      "/images/products/rose-quartz-thumb1.jpg",
      "/images/products/rose-quartz-thumb2.jpg",
      "/images/products/rose-quartz-thumb3.jpg",
    ],
    variants: [
      { label: "Classic Rose Quartz", image: "/images/products/rose-quartz-main.jpg" },
      { label: "Energized Rose Quartz", image: "/images/products/rose-quartz-thumb2.jpg" },
    ],
    features: ["Promotes Love & Harmony", "Natural Gemstone", "Handcrafted"],
    price: "₹799",
    oldPrice: "₹1,499",
    discount: "47% OFF",
    offerEnds: "02 hr : 45 min : 10 sec",
    rating: 4.8,
    reviews: 312,
    orders: 890,
  };

  // Gemstone Consultation product config
  const gemstoneConsultationProduct = {
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

  // Gemstone Collection product config
  const gemstoneCollectionProduct = {
    title: "Gemstone Collection",
    images: [
      "/images/gemstones.jpg",
      "/images/products/gemstone-1.jpg",
      "/images/products/gemstone-2.jpg",
      "/images/products/gemstone-3.jpg",
    ],
    variants: [
      { label: "Emerald (Panna)", image: "/images/products/gemstone-1.jpg" },
      { label: "Blue Sapphire (Neelam)", image: "/images/products/gemstone-2.jpg" },
      { label: "Yellow Sapphire (Pukhraj)", image: "/images/products/gemstone-3.jpg" },
    ],
    features: ["Authentic, lab-certified gemstones", "Personalized recommendation", "Expert astrologer guidance"],
    price: "₹2,499",
    oldPrice: "₹4,999",
    discount: "50% OFF",
    offerEnds: "06 hr : 00 min : 00 sec",
    rating: 4.97,
    reviews: 876,
    orders: 1543,
  };

  // Use gemstone collection config if slug matches, else fallback
  const isGemstoneCollectionPage = slug === 'gemstone-collection';
  const isGemstoneConsultation = slug === 'gemstone-consultation';
  const isRoseQuartz = slug === 'rose-quartz-bracelet';
  const productData = isGemstoneCollectionPage ? gemstoneCollectionProduct : isGemstoneConsultation ? gemstoneConsultationProduct : isRoseQuartz ? roseQuartzProduct : product;

  // Rose Quartz Bracelet FAQs
  const roseQuartzFaqs = [
    {
      question: "Is the Rose Quartz Bracelet made from genuine natural rose quartz?",
      answer: "Yes, our bracelets are handcrafted using 100% natural, authentic rose quartz gemstones, carefully sourced and quality-checked.",
    },
    {
      question: "What are the benefits of wearing a Rose Quartz Bracelet?",
      answer: "Rose Quartz is known as the stone of love and harmony. It is believed to promote emotional healing, self-love, and attract positive relationships.",
    },
    {
      question: "How do I care for my Rose Quartz Bracelet?",
      answer: "To maintain its shine and energy, gently wipe the bracelet with a soft cloth and avoid exposure to harsh chemicals or prolonged water contact.",
    },
    {
      question: "Will the bracelet fit my wrist?",
      answer: "Our bracelets are made with a stretchable elastic cord to fit most wrist sizes comfortably. If you need a custom size, please contact our support team.",
    },
    {
      question: "How long does delivery take?",
      answer: "Orders are typically delivered within 3-7 business days, depending on your location. You will receive tracking details once your order is shipped.",
    },
    {
      question: "Can I wear the Rose Quartz Bracelet every day?",
      answer: "Yes, the bracelet is designed for daily wear. Just avoid harsh chemicals and remove it before swimming or bathing for longevity.",
    },
    {
      question: "Is this bracelet suitable as a gift?",
      answer: "Absolutely! Rose Quartz Bracelets are a thoughtful gift for loved ones, symbolizing love, care, and positive energy.",
    },
  ];

  // Gemstone Consultation FAQs
  const gemstoneConsultationFaqs = [
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

  // Gemstone Collection FAQs
  const gemstoneCollectionFaqs = [
    {
      question: "Are the gemstones in the collection genuine and certified?",
      answer: "Yes, all gemstones in our collection are 100% natural, lab-certified, and come with a certificate of authenticity."
    },
    {
      question: "How do I know which gemstone is right for me?",
      answer: "We recommend consulting with our expert astrologers for a personalized recommendation based on your birth chart. You can also opt for our Gemstone Consultation service."
    },
    {
      question: "What is included with each gemstone purchase?",
      answer: "Each gemstone comes with a premium box, a certificate of authenticity, and care instructions."
    },
    {
      question: "Are the gemstones ready to wear?",
      answer: "Most gemstones are provided as loose stones. If you need them set in jewelry, please contact our support for customization options."
    },
    {
      question: "How should I care for my gemstone?",
      answer: "Keep your gemstone clean by gently wiping it with a soft cloth. Avoid exposure to harsh chemicals and store it in the provided box when not in use."
    },
  ];

  const faqsToShow = isGemstoneCollectionPage ? gemstoneCollectionFaqs : isGemstoneConsultation ? gemstoneConsultationFaqs : isRoseQuartz ? roseQuartzFaqs : faqs;

  // Gemstone Collection Product Description Content
  const gemstoneDescription = {
    description: `Embrace the calming energy of our Rose Quartz Bracelet, handcrafted to channel love, inner peace, and emotional balance. This sacred gemstone strengthens the heart chakra and helps restore harmony to your spiritual self.`,
    features: [
      'Natural, ethically sourced Rose Quartz',
      'Adjustable fit for all wrist sizes',
      'Hand-knotted for durability',
      'Energetically cleansed before delivery',
    ],
    benefits: [
      'Promotes emotional healing and compassion',
      'Attracts love and strengthens existing relationships',
      'Calms anxiety and relieves stress',
      'Enhances spiritual awareness and intuition.',
    ],
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [added, setAdded] = useState(false);

  // Real-time offer timer for Rose Quartz Bracelet
  const ROSE_QUARTZ_DURATION = 2 * 60 * 60 + 45 * 60 + 10; // 2 hr 45 min 10 sec in seconds
  const [secondsLeft, setSecondsLeft] = useState(isRoseQuartz ? ROSE_QUARTZ_DURATION : 0);
  useEffect(() => {
    if (!isRoseQuartz || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRoseQuartz, secondsLeft]);
  function formatTime(secs: number) {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h} hr : ${m} min : ${s} sec`;
  }

  // Real-time offer timer for Gemstone Collection
  const GEMSTONE_COLLECTION_DURATION = 6 * 60 * 60; // 6 hours in seconds
  const [gemstoneSecondsLeft, setGemstoneSecondsLeft] = useState(isGemstoneCollectionPage ? GEMSTONE_COLLECTION_DURATION : 0);
  useEffect(() => {
    if (!isGemstoneCollectionPage || gemstoneSecondsLeft <= 0) return;
    const interval = setInterval(() => {
      setGemstoneSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isGemstoneCollectionPage, gemstoneSecondsLeft]);
  function formatGemstoneTime(secs: number) {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h} hr : ${m} min : ${s} sec`;
  }

  // Accordion state for description
  const [descOpen, setDescOpen] = useState(isGemstoneCollectionPage);
  // Curated content for Gemstone Collection
  const gemstoneAccordionContent = {
    description: `Our Gemstone Collection features authentic, lab-certified gemstones, handpicked for their astrological benefits and beauty. Each stone is recommended by expert astrologers and comes with a certificate of authenticity.`,
    specs: [
      { label: 'Material', value: 'Natural Gemstones (Emerald, Blue Sapphire, Yellow Sapphire, etc.)' },
      { label: 'Certification', value: 'Lab-Certified, Astrologer Recommended' },
      { label: 'Origin', value: 'Ethically Sourced' },
      { label: 'Packaging', value: 'Premium Box with Certificate' },
      { label: 'Consultation', value: 'Personalized Gemstone Recommendation Available' },
    ],
  };

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
              {isRoseQuartz && secondsLeft === 0 ? (
                <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{roseQuartzProduct.oldPrice}</span>
              ) : (
                <>
                  <span className="text-xl font-bold text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}>{productData.price}</span>
                  <span className="text-base text-gray-400 line-through">{productData.oldPrice}</span>
                  <span className="text-base font-semibold text-green-700">{productData.discount}</span>
                </>
              )}
            </div>
            <div className="text-red-600 font-medium text-sm mt-1">
              {isGemstoneCollectionPage
                ? (gemstoneSecondsLeft > 0 ? `Offer ends in ${formatGemstoneTime(gemstoneSecondsLeft)}` : 'Offer ended')
                : isRoseQuartz
                  ? (secondsLeft > 0 ? `Offer ends in ${formatTime(secondsLeft)}` : 'Offer ended')
                  : `Offer ends in ${productData.offerEnds}`}
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
                productId={slug}
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
            {/* Accordion Description for Gemstone Collection (moved here) */}
            {isGemstoneCollectionPage && (
              <div className="w-full max-w-3xl mx-auto mt-8 mb-8">
                <div className="border-b border-gray-200">
                  <button
                    className="flex justify-between items-center w-full py-4 px-2 text-xl font-semibold text-[#23244a] focus:outline-none"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                    onClick={() => setDescOpen(v => !v)}
                    aria-expanded={descOpen}
                  >
                    Description
                    <span className={`ml-2 transition-transform ${descOpen ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  {descOpen && (
                    <div className="py-2 px-2 animate-fadeIn">
                      <p className="text-base text-[#23244a] mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>{gemstoneAccordionContent.description}</p>
                      <ul className="list-disc pl-6 space-y-2 text-base text-[#23244a]">
                        {gemstoneAccordionContent.specs.map(spec => (
                          <li key={spec.label}><span className="font-semibold">{spec.label}:</span> {spec.value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ProductAssuranceBar before FAQ for Gemstone Collection */}
        {isGemstoneCollectionPage && <ProductAssuranceBar />}
        {/* FAQ Section */}
        <div className="w-screen overflow-x-clip mt-14 mb-10" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
          <div className="max-w-5xl w-full mx-auto px-2 md:px-0">
            <h2 className="text-2xl md:text-3xl font-semibold mb-7 text-[#23244a] text-center" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.02em' }}>Frequently Asked Questions</h2>
            <div className="space-y-5 w-full">
              {faqsToShow.map((faq, idx) => (
                <FAQItem key={idx} faq={faq} index={idx} />
              ))}
            </div>
          </div>
        </div>
        {/* ProductPurchaseInfo after FAQ for Gemstone Collection */}
        {isGemstoneCollectionPage && <ProductPurchaseInfo />}
        {isRoseQuartz && <ProductPurchaseInfo />}
        {/* Full-width ServiceCarousels */}
        <div className="w-screen overflow-x-clip" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
          <ServiceCarousels />
        </div>
        {/* CTA Section at the end */}
        {isGemstoneCollectionPage && (
          <div className="w-screen overflow-x-clip mb-12" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
            <div className="max-w-5xl w-full mx-auto px-2 md:px-0">
              <CTASection />
            </div>
          </div>
        )}
        {/* You May Also Like Recommendations */}
        {isGemstoneCollectionPage && (
          <div className="w-screen overflow-x-clip mb-16" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-[#23244a] text-center" style={{ fontFamily: 'Playfair Display, serif' }}>You May Also Like</h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8">
              {recommendations.slice(0, 4).map(rec => (
                <div key={rec.slug} className="group">
                  <ProductServiceCard
                    image={rec.image}
                    title={rec.title}
                    description={rec.oldPrice ? `${rec.price} (was ${rec.oldPrice})` : rec.price}
                    badge={rec.oldPrice ? 'Recommended' : ''}
                    href={`/shop/${rec.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 