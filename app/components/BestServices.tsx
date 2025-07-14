'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '../contexts/useLanguage'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, CheckCircle, ShoppingBag } from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { CTASection } from './CTASection'

// New set of card backgrounds inspired by the snapshot
const cardBackgrounds = [
  "bg-gradient-to-br from-blue-50 to-indigo-100",  // Light Blue/Indigo
  "bg-gradient-to-br from-green-50 to-emerald-100", // Light Green/Emerald
  "bg-gradient-to-br from-orange-50 to-red-100",   // Light Orange/Red
  "bg-gradient-to-br from-purple-50 to-pink-100",  // Light Purple/Pink
  "bg-gradient-to-br from-yellow-50 to-lime-100",   // Light Yellow/Lime
  "bg-gradient-to-br from-teal-50 to-cyan-100",    // Light Teal/Cyan
];

interface Service {
  titleKey: string;
  descriptionKey: string;
  slug: string;
  price: string;
  categoryKey: string;
  rating?: number;
  percentage?: number;
  cardSize: 'small' | 'large';
}

const services: Service[] = [
  {
    titleKey: "bestServices.services.0.title",
    descriptionKey: "bestServices.services.0.description",
    slug: "nakshatra-insights",
    price: "₹1,999",
    categoryKey: "bestServices.services.0.category",
    rating: 4.1,
    percentage: 85,
    cardSize: 'small',
  },
  {
    titleKey: "bestServices.services.1.title",
    descriptionKey: "bestServices.services.1.description",
    slug: "spiritual-growth",
    price: "₹1,499",
    categoryKey: "bestServices.services.1.category",
    rating: 4.5,
    percentage: 70,
    cardSize: 'small',
  },
  {
    titleKey: "bestServices.services.2.title",
    descriptionKey: "bestServices.services.2.description",
    slug: "personalized-horoscope",
    price: "₹2,299",
    categoryKey: "bestServices.services.2.category",
    rating: 5,
    percentage: 90,
    cardSize: 'large',
  },
  {
    titleKey: "bestServices.services.3.title",
    descriptionKey: "bestServices.services.3.description",
    slug: "future-visioning",
    price: "₹1,799",
    categoryKey: "bestServices.services.3.category",
    rating: 4.6,
    percentage: 100,
    cardSize: 'large',
  },
  {
    titleKey: "bestServices.services.4.title",
    descriptionKey: "bestServices.services.4.description",
    slug: "goal-alignment",
    price: "₹1,899",
    categoryKey: "bestServices.services.4.category",
    rating: 4.2,
    percentage: 75,
    cardSize: 'small',
  },
  {
    titleKey: "bestServices.services.5.title",
    descriptionKey: "bestServices.services.5.description",
    slug: "self-belief",
    price: "₹1,299",
    categoryKey: "bestServices.services.5.category",
    rating: 3.9,
    percentage: 60,
    cardSize: 'small',
  },
];

export function BestServices() {
  const { t } = useLanguage();

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const smallCards = services.filter(service => service.cardSize === 'small');
  const largeCards = services.filter(service => service.cardSize === 'large');

  return (
    <section className="min-h-screen py-16 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="flex justify-between items-center py-4 mb-12">
          <div className="flex items-center gap-2">
            <Image src="/zodiac_wheel_icon.svg" alt={t('bestServices.bannerIconAlt')} width={30} height={30} />
            <span className="text-xl font-bold text-gray-900">{t('bestServices.bannerTitle')}</span>
          </div>
          <div className="flex items-center gap-6">
          </div>
        </div>

        {/* New Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl p-10 mb-12 text-center shadow-xl overflow-hidden bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe]"
        >
          {/* Starry background effect */}
          <div className="absolute inset-0 z-0 opacity-70" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 10%), radial-gradient(circle at 80% 90%, rgba(255,255,255,0.08) 0%, transparent 15%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 10%), radial-gradient(circle at 30% 70%, rgba(255,255,255,0.06) 0%, transparent 12%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.04) 0%, transparent 10%)', backgroundSize: '300px 300px, 400px 400px, 200px 200px, 350px 350px, 250px 250px' }}></div>

          <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold mb-4 leading-tight text-black">
            {t('bestServices.bannerHeading')}
          </h2>
          <p className="relative z-10 text-lg md:text-xl mb-6 opacity-90 text-black">
            {t('bestServices.bannerDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {smallCards.slice(0, 2).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.05 + index * 0.07, type: 'spring', stiffness: 300 }}
              className={`relative rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cardBackgrounds[index]}`}
              style={{ height: '220px' }}
            >
              <span className="absolute top-4 left-6 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{t(service.categoryKey)}</span>
              
              <div className="absolute top-4 right-6 bg-white rounded-full p-2 shadow-md">
                <Star className="w-5 h-5 text-black" /> 
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-xl font-extrabold text-black leading-tight mb-2">
                  {t(service.titleKey)}
                </h4>
                <p className="text-black text-sm mb-4">
                  {truncateText(t(service.descriptionKey), 80)}
                </p>
                <div className="flex items-center text-black text-sm">
                  {service.rating && <><Star className="w-4 h-4 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-4 h-4 ml-4 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}

          {largeCards.slice(0, 1).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.19, type: 'spring', stiffness: 300 }}
              className={`relative rounded-2xl shadow-lg p-8 flex flex-col justify-between ${cardBackgrounds[2]}`}
              style={{ minHeight: '380px' }}
            >
              <span className="absolute top-6 left-8 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{t(service.categoryKey)}</span>
              
              <div className="absolute top-6 right-8 bg-white rounded-full p-3 shadow-md">
                <Star className="w-6 h-6 text-black" />
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-3xl md:text-4xl font-extrabold text-black leading-tight mb-4">
                  {t(service.titleKey)}
                </h4>
                <p className="text-black text-base mb-6">
                  {truncateText(t(service.descriptionKey), 150)}
                </p>
                <div className="flex items-center text-black text-lg">
                  {service.rating && <><Star className="w-5 h-5 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-5 h-5 ml-6 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}

          {largeCards.slice(1, 2).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.26, type: 'spring', stiffness: 300 }}
              className={`relative rounded-2xl shadow-lg p-8 flex flex-col justify-between ${cardBackgrounds[3]}`}
              style={{ minHeight: '380px' }}
            >
              <span className="absolute top-6 left-8 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{t(service.categoryKey)}</span>
              
              <div className="absolute top-6 right-8 bg-white rounded-full p-3 shadow-md">
                <Star className="w-6 h-6 text-black" />
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-3xl md:text-4xl font-extrabold text-black leading-tight mb-4">
                  {t(service.titleKey)}
                </h4>
                <p className="text-black text-base mb-6">
                  {truncateText(t(service.descriptionKey), 150)}
                </p>
                <div className="flex items-center text-black text-lg">
                  {service.rating && <><Star className="w-5 h-5 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-5 h-5 ml-6 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}
          
          {smallCards.slice(2, 4).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.33 + index * 0.07, type: 'spring', stiffness: 300 }}
              className={`relative rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cardBackgrounds[index + 4]}`}
              style={{ height: '220px' }}
            >
              <span className="absolute top-4 left-6 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{t(service.categoryKey)}</span>
              
              <div className="absolute top-4 right-6 bg-white rounded-full p-2 shadow-md">
                <Star className="w-5 h-5 text-black" />
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-xl font-extrabold text-black leading-tight mb-2">
                  {t(service.titleKey)}
                </h4>
                <p className="text-black text-sm mb-4">
                  {truncateText(t(service.descriptionKey), 80)}
                </p>
                <div className="flex items-center text-black text-sm">
                  {service.rating && <><Star className="w-4 h-4 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-4 h-4 ml-4 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {smallCards.slice(4, 6).map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.47 + index * 0.07, type: 'spring', stiffness: 300 }}
              className={`relative rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cardBackgrounds[index + 4]}`}
              style={{ height: '220px' }}
            >
              <span className="absolute top-4 left-6 text-xs font-semibold text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">{t(service.categoryKey)}</span>
              
              <div className="absolute top-4 right-6 bg-white rounded-full p-2 shadow-md">
                <Star className="w-5 h-5 text-black" />
              </div>

              <div className="flex flex-col justify-end h-full">
                <h4 className="text-xl font-extrabold text-black leading-tight mb-2">
                  {t(service.titleKey)}
                </h4>
                <p className="text-black text-sm mb-4">
                  {truncateText(t(service.descriptionKey), 80)}
                </p>
                <div className="flex items-center text-black text-sm">
                  {service.rating && <><Star className="w-4 h-4 mr-1 fill-current text-black" /> {service.rating}</>}
                  {service.percentage && <><CheckCircle className="w-4 h-4 ml-4 mr-1 fill-current text-black" /> {service.percentage}%</>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
