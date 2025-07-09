import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const credentials = [
  {
    title: 'Vedic Astrology Expert',
    description: 'Dr. Narendra is a renowned Vedic Astrologer with over 15 years of experience in traditional Indian astrology. He specializes in birth chart analysis, planetary remedies, and life guidance through ancient Vedic wisdom.',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042880/astro_ca0pkb.jpg',
  },
  {
    title: 'PhD in Astrology & Philosophy',
    description: 'With a PhD in Astrology and Philosophy, Dr. Narendra combines traditional knowledge with modern understanding to provide comprehensive astrological consultations and spiritual guidance.',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042876/phd_klwwvl.jpg',
  },
]

export function AstrologerProfile() {
  return (
    <section className="py-16 relative bg-[#fef6f2]">
      <div className="absolute inset-0"></div>
      <div className="container mx-auto px-4 relative z-10 mt-20">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-black">
          Meet Dr. Narendra - Your Trusted Astrologer
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-black">
          Expert Vedic Astrologer with Decades of Experience
        </h3>
        <div className="space-y-8">
          {credentials.map((credential, index) => (
            <Card key={index} className="bg-white border border-black/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-semibold text-black">
                      {credential.title}
                    </h3>
                    <p className="text-black">{credential.description}</p>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image 
                      src={credential.image}
                      alt={credential.title}
                      fill
                      className="object-cover [object-position:0_14.285%]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center max-w-4xl mx-auto mt-12 space-y-6">
          <p className="text-lg text-black">
            मैं मानता हूं कि हर व्यक्ति का जीवन अनोखा है और हर समस्या का समाधान संभव है।
          </p>
          <p className="text-lg text-black">
            I believe that every individual's life is unique and every problem has a solution.
          </p>
          <p className="text-lg text-black font-semibold">
            15+ वर्षों का अनुभव और हजारों संतुष्ट ग्राहक
          </p>
          <p className="text-lg text-black font-semibold">
            15+ Years of Experience and Thousands of Satisfied Clients
          </p>
          <Link href="/contact">
            <Button asChild className="bg-[#F3E8FF] text-[#7C3AED] border border-[#E0E0E0] hover:bg-[#E0F2FE] hover:text-[#FBBF24] mt-8 text-lg px-8 py-6 transition-all duration-200">
              <span>Book Your Consultation</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

