'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

const credentials = [
  {
    title: 'Vedic Astrology Expert',
    description: 'Dr. Narendra is a renowned Vedic Astrologer with over 15 years of experience in traditional Indian astrology. He specializes in birth chart analysis, planetary remedies, and life guidance through ancient Vedic wisdom.',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042880/astro_ca0pkb.jpg',
    icon: '🔮',
    highlights: ['Birth Chart Analysis', 'Planetary Remedies', 'Life Guidance']
  },
  {
    title: 'PhD in Astrology & Philosophy',
    description: 'With a PhD in Astrology and Philosophy, Dr. Narendra combines traditional knowledge with modern understanding to provide comprehensive astrological consultations and spiritual guidance.',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042876/phd_klwwvl.jpg',
    icon: '🎓',
    highlights: ['Traditional Knowledge', 'Modern Understanding', 'Spiritual Guidance']
  },
]

export function AstrologerProfile() {
  return (
    <>
      <style jsx>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(10deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-8deg); }
          50% { transform: rotate(6deg); }
          60% { transform: rotate(-6deg); }
          70% { transform: rotate(4deg); }
          80% { transform: rotate(-4deg); }
          90% { transform: rotate(2deg); }
        }
      `}</style>
      <section className="py-16 relative bg-gradient-to-br from-slate-50 via-purple-50/30 to-orange-50/20">
      <div className="absolute inset-0">
        {/* Subtle decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 mt-20">
        {/* Heading section restyled to match BestServices/BestProducts */}
  <div className="relative rounded-3xl p-10 mb-12 text-center shadow-xl overflow-hidden border border-[#e6c77e]" style={{ backgroundColor: '#FEFBF2' }}>
          <div className="absolute inset-0 z-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 10%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.08) 0%, transparent 15%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 10%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 12%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 10%)', backgroundSize: '300px 300px, 400px 400px, 200px 200px, 350px 350px, 250px 250px' }}></div>
          <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-black">Meet Dr. Narendra - Your Trusted Astrologer</h1>
          <p className="relative z-10 text-lg md:text-xl mb-6 opacity-90" style={{ color: '#166534' }}>
            Expert Vedic Astrologer with Decades of Experience
          </p>
        </div>

        {/* Mobile astrologer image - only visible on mobile */}
        <div className="block md:hidden mb-12">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-xl border-4 border-white">
            <Image 
              src="https://res.cloudinary.com/dxwspucxw/image/upload/v1752042880/astro_ca0pkb.jpg"
              alt="Dr. Narendra - Vedic Astrologer"
              fill
              className="object-cover"
            />
            {/* Floating icon for mobile */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl shadow-lg">
              🔮
            </div>
          </div>
        </div>

        {/* Modern credentials layout */}
        <div className="grid gap-12 lg:gap-16">
          {credentials.map((credential, index) => (
            <div key={index} className={`relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              <Card className="group overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[500px] ${index % 2 === 1 ? 'lg:grid-cols-[1fr_0.8fr]' : 'lg:grid-cols-[0.8fr_1fr]'}`}>
                    {/* Image section */}
                    <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}
                      >
                      {/* Only show image on mobile if NOT the first card (Vedic Astrology Expert) */}
                      {!(index === 0) && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-orange-500/10 z-10"></div>
                          <Image 
                            src={credential.image}
                            alt={credential.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Floating icon */}
                          <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl shadow-lg z-20">
                            {credential.icon}
                          </div>
                        </>
                      )}
                      {/* On desktop, always show image. On mobile, hide image for first card. */}
                      {index === 0 && (
                        <div className="hidden md:block">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-orange-500/10 z-10"></div>
                          <Image 
                            src={credential.image}
                            alt={credential.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Floating icon */}
                          <div className="absolute top-6 right-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl shadow-lg z-20">
                            {credential.icon}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Content section */}
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="space-y-6">
                        {/* Title with decorative element */}
                        <div className="relative">
                          <div className="absolute -left-2 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-orange-500 rounded-full"></div>
                          <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 pl-4">
                            {credential.title}
                          </h3>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {credential.description}
                        </p>
                        
                        {/* Highlights */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Specializations</h4>
                          <div className="flex flex-wrap gap-2">
                            {credential.highlights.map((highlight, idx) => (
                              <span key={idx} className="px-4 py-2 bg-gradient-to-r from-purple-100 to-orange-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200/50">
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {/* Subtle testimonial/experience section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-slate-100/80 to-gray-100/80 border border-gray-200/50 text-gray-700 overflow-hidden relative backdrop-blur-sm">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23888888' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat'
              }}></div>
            </div>
            <CardContent className="p-6 md:p-8 text-center relative z-10">
              <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
                {/* Subtle quote icon */}
                {/* <div className="text-4xl opacity-15 mb-2 text-gray-400">"</div> */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 text-sm md:text-base leading-relaxed">
                  <div className="space-y-2">
                    <p className="italic font-light text-gray-600">
                      मैं मानता हूं कि हर व्यक्ति का जीवन अनोखा है और हर समस्या का समाधान संभव है।
                    </p>
                    <p className="italic font-light text-gray-600">
                      I believe that every individual&apos;s life is unique and every problem has a solution.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-4 md:space-x-6">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-green-800">15+</div>
                        <div className="text-xs uppercase tracking-wide text-green-700">Years Experience</div>
                      </div>
                      <div className="w-px h-6 md:h-8 bg-green-300"></div>
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-green-800">1000+</div>
                        <div className="text-xs uppercase tracking-wide text-green-700">Satisfied Clients</div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-green-600">
                      15+ वर्षों का अनुभव और हजारों संतुष्ट ग्राहक
                    </p>
                  </div>
                </div>
                
                {/* Black CTA Button with Phone Ring Animation */}
                <div className="pt-4 md:pt-6">
                  <div className="flex justify-center">
                    <div className="relative inline-block w-full sm:w-auto max-w-sm sm:max-w-none">
                      <Link href="/contact">
                        <Button className="bg-black border border-gray-800 text-white text-base md:text-xl px-6 md:px-16 py-4 md:py-8 rounded-full font-bold shadow-lg hover:bg-gray-900 hover:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out group relative overflow-hidden w-full">
                          <span className="relative z-10 flex items-center justify-center">
                            <span className="group-hover:animate-[ring_0.5s_ease-in-out_infinite] transition-transform duration-200 mr-2 inline-block origin-center">📞</span>
                            <span className="text-center whitespace-nowrap">Book Your Consultation Now</span>
                          </span>
                          {/* Subtle shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                        </Button>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Additional subtle CTA text */}
                  <div className="mt-3 md:mt-4 space-y-1 px-4">
                    <p className="text-xs md:text-sm text-green-700 font-medium">Transform your life with ancient wisdom</p>
                    <p className="text-xs text-green-600">⭐ Trusted by thousands • Available 24/7 • Instant booking</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    </>
  )
}