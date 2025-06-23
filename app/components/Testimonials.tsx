'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { useLanguage } from '@/app/contexts/LanguageContext'

interface Testimonial {
  name: string;
  occupation: string;
  image: string;
  text: string;
  rating: number;
  type: 'quote_top' | 'avatar_top' | 'simple_with_stars' | 'large_avatar_quote';
}

const testimonials: Testimonial[] = [
  {
    name: "Rahul S.",
    occupation: "Software Engineer",
    image: "/images/placeholder_male.webp",
    text: "The career guidance from my horoscope reading was spot on! It helped me make a crucial decision about my job change. A truly transformative experience.",
    rating: 5,
    type: 'quote_top'
  },
  {
    name: "Priya M.",
    occupation: "College Student",
    image: "/images/placeholder_female.webp",
    text: "I really appreciate!! The personalized numerology session gave me clarity and boosted my confidence, helping me navigate my academic journey with more purpose.",
    rating: 5,
    type: 'avatar_top'
  },
  {
    name: "Amit & Neha",
    occupation: "Newlyweds",
    image: "/images/placeholder_couple.webp",
    text: "Good Job! The compatibility analysis through face reading was incredibly accurate. It's helping us understand each other better and strengthen our bond.",
    rating: 4,
    type: 'avatar_top'
  },
  {
    name: "Dr. Sharma",
    occupation: "Medical Professional",
    image: "/images/placeholder_male.webp",
    text: "I was very impressed! The Vastu consultation for my clinic has noticeably improved the energy. My patients feel more at ease and the atmosphere is very positive now.",
    rating: 5,
    type: 'simple_with_stars'
  },
  {
    name: "Anjali K.",
    occupation: "Entrepreneur",
    image: "/images/placeholder_female.webp",
    text: "The guidance on auspicious timings for my new venture proved invaluable. The business is thriving, and I attribute much of it to these cosmic insights.",
    rating: 5,
    type: 'avatar_top'
  },
  {
    name: "Deepak V.",
    occupation: "Artist",
    image: "/images/placeholder_male.webp",
    text: "Truly insightful readings! The tarot session helped me unlock creative blocks and find new direction in my artistic endeavors. Highly recommend for clarity.",
    rating: 4,
    type: 'large_avatar_quote'
  },
  {
    name: "Sonia L.",
    occupation: "Student",
    image: "/images/placeholder_female.webp",
    text: "Nakshatra Gyaan's daily horoscopes are consistently accurate and provide a great start to my day. They offer subtle wisdom to navigate life's challenges.",
    rating: 4,
    type: 'simple_with_stars'
  },
  {
    name: "Rajesh P.",
    occupation: "Business Owner",
    image: "/images/placeholder_male.webp",
    text: "Excellent guidance on financial astrology. Helped me make informed decisions during volatile market times. Highly recommended!",
    rating: 5,
    type: 'avatar_top'
  },
  {
    name: "Meera D.",
    occupation: "Homemaker",
    image: "/images/placeholder_female.webp",
    text: "The family compatibility reading brought so much understanding and harmony to our home. Thank you, Nakshatra Gyaan!",
    rating: 5,
    type: 'quote_top'
  },
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
  const { lang } = useLanguage()

  const renderStars = (rating: number) => (
    <div className="flex">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
      ))}
    </div>
  )

  return (
    <section className="relative w-full min-h-screen bg-[#F0F2F5] overflow-hidden py-20">
      {/* Abstract background shapes */}
      <div className="absolute top-10 left-0 w-64 h-64 bg-[#F0F2E5] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E0F0DB] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-[#F5E2DA] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-extrabold text-[#FCAAA4] mb-16 transform -rotate-6 origin-bottom-left"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {lang === 'en' ? 'Client Reviews' : 'ग्राहक समीक्षाएं'}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const bgColor = pastelColors[index % pastelColors.length]

            return (
              <motion.div
                key={index}
                className={`${bgColor} rounded-xl shadow-md p-5 relative overflow-hidden
                  ${testimonial.type === 'quote_top' ? 'w-full md:w-[48%] lg:w-[31%]' : ''}
                  ${testimonial.type === 'avatar_top' ? 'w-full md:w-[48%] lg:w-[31%]' : ''}
                  ${testimonial.type === 'simple_with_stars' ? 'w-full md:w-[48%] lg:w-[65%]' : ''}
                  ${testimonial.type === 'large_avatar_quote' ? 'w-full md:w-[48%] lg:w-[31%] flex flex-col justify-between' : ''}
                `}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -5, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}

                whileTap={{ rotate: 2, scale: 0.98 }}
              >
                {testimonial.type === 'quote_top' && (
                  <div className="flex flex-col items-start">
                    <span className="text-5xl font-extrabold text-gray-300 mb-2">&ldquo;</span>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed opacity-70 text-black">{testimonial.text}</p>
                    <div className="flex items-center w-full">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-gray-100 shadow">
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-sm font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-xs text-gray-600">{testimonial.occupation}</p>
                      </div>
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                )}

                {testimonial.type === 'avatar_top' && (
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-gray-100 shadow">
                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-base font-bold text-gray-800 mb-1">{testimonial.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{testimonial.occupation}</p>
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-700 text-sm mt-3 leading-relaxed opacity-70 text-black">"{testimonial.text}"</p>
                  </div>
                )}

                {testimonial.type === 'simple_with_stars' && (
                  <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-gray-700 text-sm mb-3 leading-relaxed opacity-70 text-black">"{testimonial.text}"</p>
                    <div className="flex items-center w-full justify-center md:justify-start">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-gray-100 shadow">
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="text-sm font-semibold text-gray-800">{testimonial.name}</h3>
                        <p className="text-xs text-gray-600">{testimonial.occupation}</p>
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                )}

                {testimonial.type === 'large_avatar_quote' && (
                  <div className="flex flex-col items-center h-full justify-between">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                      <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{testimonial.occupation}</p>
                    {renderStars(testimonial.rating)}
                    <p className="text-gray-700 text-sm mt-4 text-center leading-relaxed opacity-70 text-black">
                      <span className="text-4xl font-serif text-gray-300 mr-1">&ldquo;</span>
                      {testimonial.text}
                      <span className="text-4xl font-serif text-gray-300 ml-1">&rdquo;</span>
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
