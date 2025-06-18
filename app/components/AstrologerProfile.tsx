import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const credentials = [
  {
    title: "Brand Ambassador of International Vedic Astrology Federation, USA",
    titleHi: "अंतर्राष्ट्रीय वैदिक ज्योतिष महासंघ, यूएसए के ब्रांड एंबेसडर",
    description: "Dr. Narendra Kumar Sharma's acknowledgement by the International Vedic Astrology Federation, USA, as their brand ambassador is a testament to his dedication and expertise in the field.",
    descriptionHi: "डॉ. नरेंद्र कुमार शर्मा को अंतर्राष्ट्रीय वैदिक ज्योतिष महासंघ, यूएसए द्वारा उनके ब्रांड एंबेसडर के रूप में मान्यता उनके समर्पण और विशेषज्ञता का प्रमाण है।",
    image: "/images/ASTRO.webp"
  },
  {
    title: "Grand Ph.D. in Astrology",
    titleHi: "ज्योतिष में ग्रैंड पीएचडी",
    description: "Dr. Narendra Kumar Sharma's remarkable achievement of receiving the Grand Ph.D. in Astrology stands as a testament to his exceptional contributions to the field.",
    descriptionHi: "डॉ. नरेंद्र कुमार शर्मा की ज्योतिष में ग्रैंड पीएचडी प्राप्त करने की उल्लेखनीय उपलब्धि इस क्षेत्र में उनके असाधारण योगदान का प्रमाण है।",
    image: "/images/PHD.webp"
  }
]

export function AstrologerProfile() {
  return (
    <section className="py-16 relative bg-[#fef6f2]">
      <div className="absolute inset-0"></div>
      <div className="container mx-auto px-4 relative z-10 mt-20">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-black">
          डॉ. नरेंद्र कुमार शर्मा क्यों?
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-black">
          Why Dr. Narendra Kumar Sharma?
        </h3>
        
        <div className="space-y-8">
          {credentials.map((credential, index) => (
            <Card key={index} className="bg-white border border-black/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-semibold text-black">
                      {credential.titleHi}<br />
                      {credential.title}
                    </h3>
                    <p className="text-black">{credential.descriptionHi}</p>
                    <p className="text-black">{credential.description}</p>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image 
                      src={credential.image}
                      alt={credential.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center max-w-4xl mx-auto mt-12 space-y-6">
          <p className="text-lg text-black">
            डॉ. शर्मा का मानना है कि शारीरिक स्वास्थ्य की तरह, प्रत्येक व्यक्ति में आध्यात्मिक कल्याण को पोषित करने की क्षमता होती है।
          </p>
          <p className="text-lg text-black">
            Dr. Sharma believes that, akin to physical health, every individual possesses spiritual well-being to nurture.
          </p>
          <p className="text-lg text-black font-semibold">
            25+ वर्षों का ज्योतिष शिक्षण और अभ्यास का अनुभव
          </p>
          <p className="text-lg text-black font-semibold">
            25+ years of experience in teaching astrology and practicing
          </p>
          <Link href="/contact">
            <Button asChild className="bg-[#F3E8FF] text-[#7C3AED] border border-[#E0E0E0] hover:bg-[#E0F2FE] hover:text-[#FBBF24] mt-8 text-lg px-8 py-6 transition-all duration-200">
              <span>अपॉइंटमेंट बुक करें (Book Appointment)</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

