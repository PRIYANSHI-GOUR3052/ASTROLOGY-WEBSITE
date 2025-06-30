'use client';

import Link from 'next/link';
import { GraduationCap, BookOpen, Star, BarChart, Users, Zap, ShieldCheck } from 'lucide-react';
import { DrNarendraProfile } from '../components/DrNarendraProfile';
import { FAQSection } from '../components/FAQSection';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/useLanguage';
import { motion } from 'framer-motion';

export default function CoursesPage() {
  const { t } = useLanguage();

  const courses = [
    {
      title: t('courses.courses.0.title'),
      slug: 'vedic-astrology-mastery',
      description: t('courses.courses.0.description'),
      icon: BookOpen,
      iconBg: 'bg-purple-400',
      tags: [t('courses.courses.0.tags.0'), t('courses.courses.0.tags.1'), t('courses.courses.0.tags.2')],
    },
    {
      title: t('courses.courses.1.title'),
      slug: 'numerology-cosmic-codes',
      description: t('courses.courses.1.description'),
      icon: BarChart,
      iconBg: 'bg-purple-400',
      tags: [t('courses.courses.1.tags.0')],
    },
    {
      title: t('courses.courses.2.title'),
      slug: 'art-of-palmistry',
      description: t('courses.courses.2.description'),
      icon: Zap,
      iconBg: 'bg-purple-400',
      tags: [t('courses.courses.2.tags.0'), t('courses.courses.2.tags.1')],
    },
    {
      title: t('courses.courses.3.title'),
      slug: 'tarot-reading-modern-mystic',
      description: t('courses.courses.3.description'),
      icon: Star,
      iconBg: 'bg-purple-400',
      tags: [t('courses.courses.3.tags.0')],
    },
    {
      title: t('courses.courses.4.title'),
      slug: 'advanced-predictive-astrology',
      description: t('courses.courses.4.description'),
      icon: GraduationCap,
      iconBg: 'bg-purple-400',
      tags: [t('courses.courses.4.tags.0')],
    },
    {
      title: t('courses.courses.5.title'),
      slug: 'vaastu-shastra-harmony',
      description: t('courses.courses.5.description'),
      icon: ShieldCheck,
      iconBg: 'bg-purple-400',
      tags: [t('courses.courses.5.tags.0')],
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: t('courses.benefits.0.title'),
      description: t('courses.benefits.0.description')
    },
    {
      icon: BookOpen,
      title: t('courses.benefits.1.title'),
      description: t('courses.benefits.1.description')
    },
    {
      icon: Star,
      title: t('courses.benefits.2.title'),
      description: t('courses.benefits.2.description')
    },
    {
      icon: Zap,
      title: t('courses.benefits.3.title'),
      description: t('courses.benefits.3.description')
    }
  ];

  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* New Banner */}
      <div className="w-full rounded-3xl bg-[#E8DAC8] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-amber-200 max-w-7xl mx-auto mt-20">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#23244a] mb-4 text-center drop-shadow-lg tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Our Astrology Courses
        </h1>
        <p className="text-lg md:text-2xl text-[#3a3b5c] text-center max-w-3xl leading-relaxed">
          Learn from the best astrologers and master the science of the stars.
        </p>
      </div>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Georgia, serif' }}>Course Curriculum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-3xl bg-[#E8DAC8] shadow-md p-8 flex flex-col items-start justify-between min-h-[340px]`}
              >
                <div className="mb-4 p-3 rounded-full bg-[#F6F5EF]">
                  <course.icon className="w-8 h-8 text-gray-800" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>{course.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{course.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold bg-gray-200 text-gray-800 px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <Link href={`/courses/${course.slug}`} className="w-full">
                  <Button className="w-full bg-orange-300 hover:bg-orange-400 text-white font-bold py-3 rounded-lg transition-all">
                    {t('courses.courses.enrollButton')}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn With Us Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ fontFamily: 'Georgia, serif' }}>{t('courses.why.heading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.button
                key={index}
                type="button"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.04, y: -4, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
                className="text-center p-8 bg-white rounded-2xl border border-gray-100 shadow-lg flex flex-col items-center cursor-pointer focus:outline-none transition-transform"
                tabIndex={0}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-[#F6F5EF] rounded-full">
                    <benefit.icon className="w-8 h-8 text-gray-800" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Profile */}
      <section className="py-20">
        <DrNarendraProfile />
      </section>
      
      {/* FAQ Section */}
       <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('courses.faq.heading')}</h2>
           <FAQSection />
        </div>
      </section>

    </div>
  );
}
