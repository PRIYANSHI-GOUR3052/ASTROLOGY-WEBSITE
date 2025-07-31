'use client';

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useLanguage } from '../contexts/useLanguage'

const credentials = [
  {
    titleKey: 'astrologerProfile.credentials.0.title',
    descriptionKey: 'astrologerProfile.credentials.0.description',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042880/astro_ca0pkb.jpg',
  },
  {
    titleKey: 'astrologerProfile.credentials.1.title',
    descriptionKey: 'astrologerProfile.credentials.1.description',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752042876/phd_klwwvl.jpg',
  },
]

export function AstrologerProfile() {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 relative bg-white">
      <div className="absolute inset-0"></div>
      <div className="container mx-auto px-4 relative z-10 mt-20">
        <div className="w-full max-w-6xl mx-auto mb-12 rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 flex flex-col items-center justify-center shadow-lg">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight font-sans">{t('astrologerProfile.heading')}</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl font-sans">{t('astrologerProfile.subheading')}</p>
        </div>
        <div className="space-y-8">
          {credentials.map((credential, index) => (
            <Card key={index} className="bg-[#fef6f2] border border-black/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-semibold text-black">
                      {t(credential.titleKey)}
                    </h3>
                    <p className="text-black">{t(credential.descriptionKey)}</p>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image 
                      src={credential.image}
                      alt={t(credential.titleKey)}
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
            {t('astrologerProfile.belief.hindi')}
          </p>
          <p className="text-lg text-black">
            {t('astrologerProfile.belief.english')}
          </p>
          <p className="text-lg text-black font-semibold">
            {t('astrologerProfile.experience.hindi')}
          </p>
          <p className="text-lg text-black font-semibold">
            {t('astrologerProfile.experience.english')}
          </p>
          <Link href="/contact">
            <Button asChild className="bg-[#F3E8FF] text-[#7C3AED] border border-[#E0E0E0] hover:bg-[#E0F2FE] hover:text-[#FBBF24] mt-8 text-lg px-8 py-6 transition-all duration-200">
              <span>{t('astrologerProfile.cta.button')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
