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
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042880/astro_ca0pkb.jpg"
  },
  {
    titleKey: 'astrologerProfile.credentials.1.title',
    descriptionKey: 'astrologerProfile.credentials.1.description',
    image: "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042876/phd_klwwvl.jpg"
  }
]

export function AstrologerProfile() {
  const { t, lang } = useLanguage();
  
  // Debug: Log what the translation function returns
  console.log('Translation test:', {
    lang: lang,
    heading: t('astrologerProfile.heading'),
    cred0Title: t('astrologerProfile.credentials.0.title'),
    cred0Desc: t('astrologerProfile.credentials.0.description'),
    cred1Title: t('astrologerProfile.credentials.1.title'),
    cred1Desc: t('astrologerProfile.credentials.1.description')
  });
  
  // Force English content for now to fix user experience
  const isEnglish = lang === 'en';
  
  return (
    <section className="py-16 bg-white text-black font-sans">
      <div className="container mx-auto px-4">
        {/* Banner Section */}
        <div className="w-full rounded-3xl py-10 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#e6c77e]" style={{ backgroundColor: '#FEFBF2' }}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">
            {isEnglish ? 'Meet Our Expert Astrologer' : t('astrologerProfile.heading')}
          </h1>
          <p className="text-lg md:text-2xl text-center max-w-2xl" style={{ color: '#166534' }}>
            {isEnglish ? 'Discover Your Destiny Through Ancient Wisdom and Modern Expertise' : t('astrologerProfile.subheading')}
          </p>
        </div>
        
        <div className="space-y-3">
          {credentials.map((credential, index) => (
            <Card key={index} className="bg-[#FEFBF2] border border-black/30 min-h-[500px]">
              <CardContent className="p-6 h-full">
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center h-full ${index % 2 === 1 ? 'md:grid-flow-col-dense' : ''}`}>
                  {index % 2 === 0 ? (
                    <>
                      <div className="space-y-4 flex flex-col justify-center">
                        <h3 className="text-3xl font-serif font-bold text-black leading-tight">
                          {isEnglish ? (index === 0 ? 'Vedic Astrology Expert' : 'PhD in Astrology & Philosophy') : t(`astrologerProfile.credentials.${index}.title`)}
                        </h3>
                        <p className="text-lg text-black leading-relaxed text-justify font-serif">
                          {isEnglish ? (index === 0 ? 'Specialized in Vedic astrology with over 15 years of experience in birth chart analysis, planetary positions, and cosmic influences. Expert in providing accurate predictions and life guidance based on ancient Vedic wisdom.' : 'Holds a Doctorate in Astrology and Philosophy from prestigious institutions. Combines traditional knowledge with modern research to offer comprehensive astrological consultations and remedies.') : t(`astrologerProfile.credentials.${index}.description`)}
                        </p>
                      </div>
                      <div className="relative h-[450px] rounded-lg overflow-hidden">
                        <Image 
                          src={credential.image}
                          alt={isEnglish ? (index === 0 ? 'Vedic Astrology Expert' : 'PhD in Astrology & Philosophy') : t(`astrologerProfile.credentials.${index}.title`)}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative h-[450px] rounded-lg overflow-hidden">
                        <Image 
                          src={credential.image}
                          alt={isEnglish ? (index === 0 ? 'Vedic Astrology Expert' : 'PhD in Astrology & Philosophy') : t(`astrologerProfile.credentials.${index}.title`)}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-4 flex flex-col justify-center">
                        <h3 className="text-3xl font-serif font-bold text-black leading-tight">
                          {isEnglish ? (index === 0 ? 'Vedic Astrology Expert' : 'PhD in Astrology & Philosophy') : t(`astrologerProfile.credentials.${index}.title`)}
                        </h3>
                        <p className="text-lg text-black leading-relaxed text-justify font-serif">
                          {isEnglish ? (index === 0 ? 'Specialized in Vedic astrology with over 15 years of experience in birth chart analysis, planetary positions, and cosmic influences. Expert in providing accurate predictions and life guidance based on ancient Vedic wisdom.' : 'Holds a Doctorate in Astrology and Philosophy from prestigious institutions. Combines traditional knowledge with modern research to offer comprehensive astrological consultations and remedies.') : t(`astrologerProfile.credentials.${index}.description`)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}