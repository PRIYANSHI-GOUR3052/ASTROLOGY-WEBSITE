'use client';

import Link from 'next/link';
import { GraduationCap, BookOpen, Star, BarChart, Users, Zap, ShieldCheck } from 'lucide-react';
import { AnimatedStars } from '../components/AnimatedStars';
import { MysticBackground } from '../components/MysticBackground';
import { DrNarendraProfile } from '../components/DrNarendraProfile';
import { FAQSection } from '../components/FAQSection';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../contexts/useLanguage';

export default function CoursesPage() {
  const { t } = useLanguage();

  const courses = [
    {
      title: t('courses.courses.0.title'),
      slug: 'vedic-astrology-mastery',
      description: t('courses.courses.0.description'),
      icon: BookOpen,
      gradient: 'from-purple-500 to-indigo-500',
      tags: [t('courses.courses.0.tags.0'), t('courses.courses.0.tags.1'), t('courses.courses.0.tags.2')],
    },
    {
      title: t('courses.courses.1.title'),
      slug: 'numerology-cosmic-codes',
      description: t('courses.courses.1.description'),
      icon: BarChart,
      gradient: 'from-pink-500 to-rose-500',
      tags: [t('courses.courses.1.tags.0')],
    },
    {
      title: t('courses.courses.2.title'),
      slug: 'art-of-palmistry',
      description: t('courses.courses.2.description'),
      icon: Zap,
      gradient: 'from-teal-500 to-cyan-500',
      tags: [t('courses.courses.2.tags.0'), t('courses.courses.2.tags.1')],
    },
    {
      title: t('courses.courses.3.title'),
      slug: 'tarot-reading-modern-mystic',
      description: t('courses.courses.3.description'),
      icon: Star,
      gradient: 'from-amber-500 to-yellow-500',
      tags: [t('courses.courses.3.tags.0')],
    },
    {
      title: t('courses.courses.4.title'),
      slug: 'advanced-predictive-astrology',
      description: t('courses.courses.4.description'),
      icon: GraduationCap,
      gradient: 'from-blue-500 to-sky-500',
      tags: [t('courses.courses.4.tags.0')],
    },
    {
      title: t('courses.courses.5.title'),
      slug: 'vaastu-shastra-harmony',
      description: t('courses.courses.5.description'),
      icon: ShieldCheck,
      gradient: 'from-green-500 to-emerald-500',
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
    <div className="bg-black text-white">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <AnimatedStars />
        <MysticBackground />
      </div>

      {/* Hero Section */}
      <section className="relative text-center py-24 md:py-32">
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
            {t('courses.hero.heading')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {t('courses.hero.subheading')}
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('courses.curriculum.heading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className={`bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 flex flex-col items-start transition-all duration-300 hover:border-fuchsia-500 hover:shadow-2xl hover:shadow-fuchsia-500/20`}>
                <div className={`mb-4 p-3 rounded-full bg-gradient-to-r ${course.gradient}`}>
                  <course.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 mb-4 flex-grow">{course.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                    {course.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold bg-gray-700 text-white px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
                <Link href={`/courses/${course.slug}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold py-3 rounded-lg hover:brightness-110 transition-all">
                    {t('courses.courses.enrollButton')}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn With Us Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">{t('courses.why.heading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-800/60 rounded-xl border border-gray-700">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 rounded-full">
                        <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
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
