import { Star } from 'lucide-react'

const testimonials = [
  {
    name: "Rahul S., Software Engineer",
    text: "The career guidance from my horoscope reading was spot on! It helped me make a crucial decision about my job change.",
    rating: 5,
  },
  {
    name: "Priya M., College Student",
    text: "As a teenager, I was confused about my future. The numerology session gave me clarity and boosted my confidence.",
    rating: 5,
  },
  {
    name: "Amit and Neha, Newlyweds",
    text: "The compatibility analysis through face reading was incredibly accurate. It's helping us understand each other better.",
    rating: 4,
  },
  {
    name: "Dr. Sharma, Medical Professional",
    text: "The Vastu consultation for my clinic has noticeably improved the energy. My patients feel more at ease now.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <div className="py-12 bg-midnight-blue-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-semibold mb-8 text-center text-gold">What Our Clients Say (Hamare Grahak Kya Kehte Hain)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-midnight-blue p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold fill-current" />
                ))}
              </div>
              <p className="text-lavender mb-4">"{testimonial.text}"</p>
              <p className="text-gold font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

