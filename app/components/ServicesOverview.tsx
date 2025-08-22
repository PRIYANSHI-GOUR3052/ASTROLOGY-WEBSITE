'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Home, Map, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/useLanguage';
import { useEffect, useRef, useState } from 'react';

// Define the structure for a service, ensuring it aligns with the data provided.
interface Service {
  title: { [lang: string]: string };
  description: { [lang: string]: string };
  slug: string;
  icon: JSX.Element;
  themeColor: string; // Keep for potential future use or icons
}

// Data for the four cards, extracted from the original component's data.
const services: Service[] = [
  {
    title: {
      en: "Face Reading",
      hi: "चेहरे की पहेली",
      es: "Lectura de rostro",
      fr: "Lecture du visage",
      de: "Gesichtslesen",
      zh: "面相学",
      ar: "قراءة الوجه",
      ru: "Чтение по лицу"
    },
    description: {
      en: "Gain insights into your nature and destiny by analyzing facial lines. This ancient art reveals hidden personality traits and future tendencies, guiding you towards self-discovery and a harmonious life.",
      hi: "आपके स्वभाव और तकदीर के बारे में जानकारी प्राप्त करने के लिए चेहरे की लकीरों का विश्लेषण।",
      es: "Obtén información sobre tu naturaleza y destino analizando las líneas faciales.",
      fr: "Obtenez des informations sur votre nature et votre destin en analysant les lignes du visage.",
      de: "Gewinnen Sie Einblicke in Ihre Natur und Ihr Schicksal durch die Analyse von Gesichtslinien.",
      zh: "通过分析面部线条了解你的性格和命运。",
      ar: "احصل على رؤى حول طبيعتك وقدرك من خلال تحليل خطوط الوجه.",
      ru: "Узнайте о своей природе и судьбе, анализируя линии лица."
    },
    slug: "face-reading",
    icon: <Moon className="w-8 h-8 text-indigo-500" />,
    themeColor: '#F5F5DC',
  },
  {
    title: {
      en: "Horoscope Analysis",
      hi: "जन्म कुंडली विश्लेषण",
      es: "Análisis de horóscopo",
      fr: "Analyse d'horoscope",
      de: "Horoskopanalyse",
      zh: "星座运势分析",
      ar: "تحليل الأبراج",
      ru: "Анализ гороскопа"
    },
    description: {
      en: "Customized horoscope readings for career, love, and health predictions. Our expert astrologers provide detailed analysis of your birth chart, offering guidance on crucial life decisions and future opportunities.",
      hi: "करियर, प्रेम और स्वास्थ्य की भविष्यवाणियों के लिए अनुकूलित जन्म कुंडली पठन।",
      es: "Lecturas de horóscopos personalizadas para predicciones de carrera, amor y salud.",
      fr: "Lectures d'horoscope personnalisées pour les prédictions de carrière, d'amour et de santé.",
      de: "Individuelle Horoskop-Lesungen für Karriere-, Liebes- und Gesundheitsvorhersagen.",
      zh: "为事业、爱情和健康定制的星座解读。",
      ar: "قراءات الأبراج المخصصة للتنبؤات المهنية والعاطفية والصحية.",
      ru: "Индивидуальные гороскопы для прогнозов в карьере, любви и здоровье."
    },
    slug: "horoscope",
    icon: <Sun className="w-8 h-8 text-orange-500" />,
    themeColor: '#F0F8FF',
  },
  {
    title: {
      en: "Vastu Shastra",
      hi: "वास्तु शास्त्र",
      es: "Vastu Shastra",
      fr: "Vastu Shastra",
      de: "Vastu Shastra",
      zh: "风水学",
      ar: "فاستو شاسترا",
      ru: "Васту Шастра"
    },
    description: {
      en: "Suggestions on home and office design based on Vastu principles for prosperity and peace. Optimize your living and working spaces to enhance positive energy flow.",
      hi: "समृद्धि और शांति के लिए वास्तु सिद्धांतों पर आधारित घर और दफ्तर के डिजाइन पर सुझाव।",
      es: "Sugerencias sobre el diseño del hogar y la oficina basadas en los principios de Vastu para la prosperidad y la paz.",
      fr: "Suggestions sur la conception de la maison et du bureau basées sur les principes du Vastu pour la prospérité et la paix.",
      de: "Vorschläge für die Gestaltung von Haus und Büro nach Vastu-Prinzipien für Wohlstand und Frieden.",
      zh: "基于风水原则的家居和办公室设计建议，带来繁荣与和平。",
      ar: "اقتراحات لتصميم المنزل والمكتب بناءً على مبادئ فاستو لتحقيق الازدهار والسلام.",
      ru: "Рекомендации по дизайну дома и офиса на основе принципов Васту для процветания и мира."
    },
    slug: "vastu-shastra",
    icon: <Home className="w-8 h-8 text-green-500" />,
    themeColor: '#F5FFFA',
  },
  {
    title: {
      en: "Astrocartography",
      hi: "भौतिक स्थल ज्योतिष",
      es: "Astrocartografía",
      fr: "Astrocartographie",
      de: "Astrokartographie",
      zh: "天体地理学",
      ar: "الخرائط الفلكية",
      ru: "Астрокартография"
    },
    description: {
      en: "Discover ideal geographic locations for your work, love life, and personal growth by analyzing planetary influences across the globe.",
      hi: "काम, प्यार और व्यक्तिगत विकास के लिए आदर्श स्थान खोजें।",
      es: "Descubre ubicaciones ideales para el trabajo, el amor y el crecimiento personal.",
      fr: "Découvrez des lieux idéaux pour le travail, l'amour et le développement personnel.",
      de: "Entdecken Sie ideale Orte für Arbeit, Liebe und persönliches Wachstum.",
      zh: "发现适合工作、爱情和个人成长的理想地点。",
      ar: "اكتشف المواقع المثالية للعمل والحب والنمو الشخصي.",
      ru: "Откройте для себя идеальные места для работы, любви и личного роста."
    },
    slug: "astrocartography",
    icon: <Map className="w-8 h-8 text-blue-500" />,
    themeColor: '#FFF0F5',
  },
];

// --- Service List from Header Consultation Dropdown ---
const consultationServices = [
  { href: '/panchang', key: 'panchang', label: 'Panchang' },
  { href: '/kundali-matching', key: 'kundali_matching', label: 'Kundali Matching' },
  { href: '/shop', key: 'buy_products', label: 'Buy Products' },
  { href: '/daily-horoscope', key: 'free_daily_horoscope', label: 'Free Daily Horoscope' },
  { href: '/services/astrology', key: 'astrology', label: 'Astrology' },
  { href: '/services/chat-with-astrologer', key: 'chat_with_astrologer', label: 'Chat with Astrologer' },
  { href: '/services/love-relationship', key: 'love_relationship', label: 'Love Relationship' },
  { href: '/services/career-guidance', key: 'career_guidance', label: 'Career Guidance' },
  { href: '/services/numerology', key: 'numerology', label: 'Numerology' },
];
const half = Math.ceil(consultationServices.length / 2);
const card1Services = consultationServices.slice(0, half);
const card2Services = consultationServices.slice(half);

// --- Service Images (map by key, fallback to a default) ---
const serviceImages: Record<string, string> = {
  panchang: '/images/horoscopedaily.jpg',
  kundali_matching: '/images/astrology_app.jpg',
  buy_products: '/images/astro.jpg',
  free_daily_horoscope: '/images/horoscopedaily.jpg',
  astrology: '/images/spiritualpathway.jpg',
  chat_with_astrologer: '/images/phd.jpg',
  love_relationship: '/images/placeholder-author.jpg',
  career_guidance: '/images/astrowellness.jpg',
  numerology: '/images/astrology_understanding.jpg',
};
const defaultServiceImage = '/images/placeholder-author.jpg';

// --- Card 1 Marquee ---
function Card1Marquee() {
  // Duplicate for seamless loop
  const images = [...card1Services, ...card1Services];
  return (
    <div className="w-full mb-4 overflow-hidden" style={{ borderRadius: '1rem', height: 220, maxHeight: 220 }}>
      <div
        className="flex items-center gap-4 animate-marquee"
        style={{ width: 'max-content', height: 220 }}
      >
        {images.map((svc, idx) => (
          <a
            key={idx}
            href={svc.href}
            target="_self"
            rel="noopener noreferrer"
            style={{ minWidth: 350, height: 220, borderRadius: '1rem', overflow: 'hidden', display: 'block' }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={serviceImages[svc.key] || defaultServiceImage}
              alt={svc.label}
              width={350}
              height={220}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem', display: 'block' }}
            />
          </a>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </div>
  );
}

// --- Card 2 Carousel (fade effect, one image at a time) ---
function Card2Carousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const images = card2Services;
  const transitionDuration = 700; // ms
  const displayDuration = 3200; // ms

  // Set the new, taller height
  const carouselHeight = 340;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, displayDuration);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, images.length]);

  return (
    <div className="w-full mb-4 relative" style={{ borderRadius: '1rem', height: carouselHeight, maxHeight: carouselHeight, overflow: 'hidden' }}>
      {images.map((svc, idx) => (
        <motion.a
          key={svc.key}
          href={svc.href}
          target="_self"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '1rem',
            overflow: 'hidden',
            display: 'block',
            pointerEvents: current === idx ? 'auto' : 'none',
            zIndex: current === idx ? 2 : 1,
          }}
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: current === idx ? 1 : 0 }}
          transition={{ duration: transitionDuration / 1000, ease: 'easeInOut' }}
        >
          <Image
            src={serviceImages[svc.key] || defaultServiceImage}
            alt={svc.label}
            width={350}
            height={carouselHeight}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem', display: 'block' }}
          />
        </motion.a>
      ))}
      {/* Dots navigation (optional, for clarity) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${current === idx ? 'bg-gray-800' : 'bg-gray-300'} transition-colors`}
            style={{ border: 'none', outline: 'none', padding: 0, cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); setCurrent(idx); }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Reusable Card Component
const ServiceCard = ({ service, index, children }: { service: Service; index: number; children?: React.ReactNode }) => {
  const { lang } = useLanguage();
  // Card click handler (except image)
  const handleCardClick = (e: React.MouseEvent) => {
    // Only trigger if not clicking on a link/image
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'a' || (e.target as HTMLElement).closest('a')) return;
    window.location.href = 'http://localhost:3000/services';
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full cursor-pointer"
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      style={{ outline: 'none' }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-gray-100 p-3 rounded-full">{service.icon}</div>
        <h3 className="text-xl font-extrabold text-gray-800" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>{service.title[lang] || service.title.en}</h3>
      </div>
      {/* Carousel/Marquee for Card 1 or Card 2 */}
      {children}
      <p className="text-gray-600 flex-grow mb-6">{service.description[lang] || service.description.en}</p>
      <Link href={`/services/${service.slug}`} passHref>
        <Button variant="outline" className="w-full mt-auto">
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
};

export function ServicesOverview() {
  const cardData = services.slice(0, 4);

  // Card 2 click handler (excluding carousel)
  const handleCard2Click = () => {
    // Only trigger if not clicking on the carousel image area
    // (carousel stops propagation on image and controls)
    window.location.href = 'http://localhost:3000/services';
  };

  return (
    <section className="py-16 sm:py-24 bg-white font-sans" style={{ width: '97vw', margin: '0 auto' }}>
      <div className="w-full p-0 m-0">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div
            className="rounded-3xl shadow-md"
            style={{
              backgroundColor: '#FEFBF2',
              boxShadow: '0 4px 16px 0 rgba(36, 34, 68, 0.08)',
              padding: '3rem 1.5rem',
              borderRadius: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1
              className="text-4xl md:text-5xl font-extrabold mb-2"
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                color: '#111',
                letterSpacing: '-0.01em',
                textAlign: 'center',
                lineHeight: 1.1,
              }}
            >
              Explore our key services
            </h1>
            <div
              className="text-lg md:text-xl font-medium"
              style={{
                fontFamily: 'Montserrat, Arial, sans-serif',
                color: '#166534',
                textAlign: 'center',
                marginTop: '0.5rem',
              }}
            >
              Discover our most popular astrology services and solutions
            </div>
          </div>
        </div>

        {/* Layout Section */}
        <div className="grid grid-cols-1 gap-8">
          {/* Card 1: Full Width */}
          {cardData[0] && (
            <ServiceCard service={cardData[0]} index={0}>
              <Card1Marquee />
            </ServiceCard>
          )}

          {/* 2-Column Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 2: Left Column (Clickable except carousel) */}
            <div
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full items-center justify-center relative group hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={handleCard2Click}
              tabIndex={0}
              role="button"
              style={{outline: 'none'}}
            >
              <div className="w-full flex items-center justify-center mb-4">
                <span className="font-extrabold text-2xl text-gray-800" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Our Services</span>
              </div>
              <Card2Carousel />
            </div>

            {/* Right Column with stacked cards */}
            <div className="flex flex-col gap-8">
              {/* Card 3 */}
              {cardData[2] && <ServiceCard service={cardData[2]} index={2} />}
              {/* Card 4 */}
              {cardData[3] && <ServiceCard service={cardData[3]} index={3} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}