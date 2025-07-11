'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { useLanguage } from '../contexts/useLanguage'

interface Testimonial {
  name: string;
  occupation: string;
  image: string;
  text: string;
  rating: number;
  type: 'quote_top' | 'avatar_top' | 'simple_with_stars' | 'large_avatar_quote';
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
  "/images/placeholder_male.webp",
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

  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
      ))}
    </div>
  )

  // Get testimonials from translation
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
        type: testimonialTypes[i] as any
      });
    }
    return testimonialsData;
  };

  const testimonials = getTestimonials();

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden py-20">
      

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-6xl mx-auto mb-12 rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 flex flex-col items-center justify-center shadow-lg"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight font-sans">Client Reviews</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl font-sans">Read what our clients say about their experiences with our astrology services.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const bgColor = pastelColors[index % pastelColors.length]

            return (
              <motion.div
                key={index}
                className={
                  `${bgColor} rounded-xl shadow-md p-3 sm:p-5 relative overflow-hidden
                  ${testimonial.type === 'quote_top' ? 'w-5/6 sm:w-full md:w-[48%] lg:w-[31%]' : ''}
                  ${testimonial.type === 'avatar_top' ? 'w-5/6 sm:w-full md:w-[48%] lg:w-[31%]' : ''}
                  ${testimonial.type === 'simple_with_stars' ? 'w-5/6 sm:w-full md:w-[48%] lg:w-[65%]' : ''}
                  ${testimonial.type === 'large_avatar_quote' ? 'w-5/6 sm:w-full md:w-[48%] lg:w-[31%] flex flex-col justify-between' : ''}
                  `
                }
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}

                whileTap={{ rotate: 2, scale: 0.98 }}
              >
                {testimonial.type === 'quote_top' && (
                  <div className="flex flex-col items-start">
                    <span className="text-3xl sm:text-5xl font-extrabold text-gray-300 mb-2">&ldquo;</span>
                    <p className="text-gray-700 text-xs sm:text-sm mb-4 leading-relaxed opacity-70 text-black">{testimonial.text}</p>
                    <div className="flex items-center w-full">
                      <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 border-2 border-gray-100 shadow">
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-600">{testimonial.occupation}</p>
                      </div>
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                )}

                {testimonial.type === 'avatar_top' && (
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-3 border-2 border-gray-100 shadow">
                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 mb-1">{testimonial.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2">{testimonial.occupation}</p>
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-700 text-xs sm:text-sm mt-3 leading-relaxed opacity-70 text-black">"{testimonial.text}"</p>
                  </div>
                )}

                {testimonial.type === 'simple_with_stars' && (
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-gray-700 text-xs sm:text-sm mb-3 leading-relaxed opacity-70 text-black">"{testimonial.text}"</p>
                    <div className="flex items-center w-full justify-center md:justify-start">
                      <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 border-2 border-gray-100 shadow">
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-600">{testimonial.occupation}</p>
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                )}

                {testimonial.type === 'large_avatar_quote' && (
                  <div className="flex flex-col items-center h-full justify-between">
                    <div className="relative w-14 h-14 sm:w-24 sm:h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1">{testimonial.name}</h3>
                    <p className="text-[10px] sm:text-sm text-gray-600 mb-3">{testimonial.occupation}</p>
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-700 text-xs sm:text-sm mt-4 text-center leading-relaxed opacity-70 text-black">
                      <span className="text-2xl sm:text-4xl font-serif text-gray-300 mr-1">&ldquo;</span>
                      {testimonial.text}
                      <span className="text-2xl sm:text-4xl font-serif text-gray-300 ml-1">&rdquo;</span>
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
