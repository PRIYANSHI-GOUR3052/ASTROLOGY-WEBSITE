'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { useLanguage } from '../contexts/useLanguage'
import Link from 'next/link'

interface Testimonial {
  name: string;
  occupation: string;
  image: string;
  text: string;
  rating: number;
  type: 'quote_top' | 'avatar_top' | 'simple_with_stars' | 'large_avatar_quote';
  productUrl?: string;
}

const testimonialTypes = [
  'quote_top',
  'avatar_top',
  'avatar_top',
  'simple_with_stars',
  'avatar_top',
  'large_avatar_quote',
  'simple_with_stars',
  'avatar_top',
  'quote_top'
];

const testimonialImages = [
  // Use a real product image from Cloudinary for the first testimonial
  "https://res.cloudinary.com/dxwspucxw/image/upload/v1752049127/gemstones_wztxzb.jpg",
  "/images/placeholder_female.webp",
  "/images/placeholder_couple.webp",
  "/images/placeholder_male.webp",
  "/images/placeholder_female.webp",
  "/images/placeholder_male.webp",
  "/images/placeholder_female.webp",
  "/images/placeholder_male.webp",
  "/images/placeholder_female.webp",
];

const testimonialRatings = [5, 5, 4, 5, 5, 4, 4, 5, 5];

// Add productUrl to the first testimonial as an example
const testimonialProductUrls = [
  "/shop/product/gemstone-1", // Example product URL for the first testimonial
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
];

export const pastelColors = [
  'bg-[#FDE2E4]', // light pink
  'bg-[#E4F0D0]', // mint green
  'bg-[#E0F4FD]', // baby blue
  'bg-[#F6EAC2]', // soft yellow
  'bg-[#F5E0FF]', // lavender
  'bg-[#E9F7EF]', // light teal
  'bg-[#FFF4E6]', // soft orange
  'bg-[#E8EAF6]', // lilac gray
]

export function Testimonials() {
  const { t, lang } = useLanguage()
  const [current, setCurrent] = useState(0)

  // Restore getTestimonials function
  const getTestimonials = (): Testimonial[] => {
    const testimonialsData = [];
    for (let i = 0; i < 9; i++) {
      const testimonialKey = `testimonials.testimonials.${i}`;
      const name = t(`${testimonialKey}.name`);
      const occupation = t(`${testimonialKey}.occupation`);
      const text = t(`${testimonialKey}.text`);
      testimonialsData.push({
        name,
        occupation,
        image: testimonialImages[i],
        text,
        rating: testimonialRatings[i],
        type: testimonialTypes[i] as any,
        productUrl: testimonialProductUrls[i],
      });
    }
    return testimonialsData;
  };

  const testimonials = getTestimonials();
  const total = testimonials.length;

  const handlePrev = () => setCurrent((prev) => (prev - 1 + total) % total);
  const handleNext = () => setCurrent((prev) => (prev + 1) % total);

  // Animation variants for slide/fade
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      transition: { duration: 0.6, ease: 'easeInOut' },
    }),
  };
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + total) % total);
  };

  const testimonial = testimonials[current];

  return (
    <section className="relative w-full min-h-[60vh] bg-white overflow-hidden py-20 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full mb-12 flex flex-col items-center"
        >
          <div className="w-full rounded-2xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] shadow-lg px-4 py-8 md:py-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-black text-center font-playfair mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{t('testimonials.heading') || 'Client Reviews'}</h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl font-cormorant" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{t('testimonials.subheading') || 'Read what our clients say about their experiences with our astrology services.'}</p>
          </div>
        </motion.div>
        <div className="relative w-full flex items-center justify-center">
          {/* Left Arrow */}
          <button
            aria-label="Previous testimonial"
            onClick={() => paginate(-1)}
            className="hidden md:flex absolute -left-24 z-10 h-12 w-12 rounded-full bg-gray-300 hover:bg-gray-400 shadow items-center justify-center transition-all"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          {/* Testimonial Card */}
          <div className="w-full md:w-[1000px] min-h-[650px] bg-[#f7f7f7] rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden items-stretch">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="flex-1 flex flex-col justify-center px-10 py-24 md:py-32 md:pr-0 md:pl-20"
                style={{ minWidth: 0 }}
              >
                {/* Prominent stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-7 w-7 text-yellow-400 drop-shadow-lg mr-1" style={{ filter: 'drop-shadow(0 2px 4px #eab30888)' }} fill="#facc15" />
                  ))}
                </div>
                <p className="text-gray-800 text-base md:text-lg mb-2 leading-relaxed font-cormorant" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{testimonial.text}</p>
                <div className="font-semibold text-black text-lg mb-2">{testimonial.name}</div>
              </motion.div>
              <motion.div
                key={current + '-img'}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="flex-1 flex items-center justify-center bg-white md:rounded-none md:rounded-r-2xl overflow-hidden"
                style={{ minWidth: 0 }}
              >
                <motion.div
                  className="relative w-[85%] h-[92%] max-w-[380px] max-h-[540px] flex items-center justify-center"
                  style={{ minHeight: '380px' }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {testimonial.productUrl ? (
                    <Link href={testimonial.productUrl} className="block w-full h-full">
                      <motion.div
                        className="relative w-full h-full overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      >
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" style={{ background: '#f7f7f7' }} />
                      </motion.div>
                    </Link>
                  ) : (
                    <motion.div
                      className="relative w-full h-full overflow-hidden"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" style={{ background: '#f7f7f7' }} />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Right Arrow */}
          <button
            aria-label="Next testimonial"
            onClick={() => paginate(1)}
            className="hidden md:flex absolute -right-24 z-10 h-12 w-12 rounded-full bg-gray-300 hover:bg-gray-400 shadow items-center justify-center transition-all"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        {/* Mobile navigation */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button
            aria-label="Previous testimonial"
            onClick={() => paginate(-1)}
            className="h-10 w-10 rounded-full bg-gray-300 hover:bg-gray-400 shadow flex items-center justify-center transition-all"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button
            aria-label="Next testimonial"
            onClick={() => paginate(1)}
            className="h-10 w-10 rounded-full bg-gray-300 hover:bg-gray-400 shadow flex items-center justify-center transition-all"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  )
}
