'use client';

import Link from 'next/link';
import { BookOpen, Star, Zap, ShieldCheck, GraduationCap, Users, Briefcase, HelpCircle } from 'lucide-react';
import { AnimatedStars } from '../components/AnimatedStars';
import { MysticBackground } from '../components/MysticBackground';
import { DrNarendraProfile } from '../components/DrNarendraProfile';
import { FAQSection } from '../components/FAQSection';
import { Button } from '@/components/ui/button';

const advancedCourses = [
  {
    title: 'Advanced Predictive Astrology',
    slug: 'advanced-predictive-astrology',
    description: 'A deep dive into Dasha systems, complex transits, Sarvashtakavarga, and divisional chart analysis for highly accurate predictions.',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-sky-500',
    tags: ['Advanced', 'Prediction', 'Vedic'],
  },
  {
    title: 'Jaimini Sutras Revealed',
    slug: 'jaimini-sutras-revealed',
    description: 'Unlock the profound secrets of Jaimini astrology, including Chara Dasha, Karakamsha, and other unique predictive tools.',
    icon: BookOpen,
    gradient: 'from-purple-500 to-indigo-500',
    tags: ['Expert', 'Jaimini', 'Rare Techniques'],
  },
  {
    title: 'Medical Astrology In-Depth',
    slug: 'medical-astrology-in-depth',
    description: 'Explore the intricate connections between planetary positions, cosmic energies, and human health and well-being.',
    icon: ShieldCheck,
    gradient: 'from-green-500 to-emerald-500',
    tags: ['Specialized', 'Health', 'Remedial'],
  },
  {
    title: 'Prashna (Horary) Astrology Mastery',
    slug: 'prashna-horary-astrology-mastery',
    description: 'Master the art of answering specific questions by casting a chart for the moment the question is asked. A powerful tool for direct answers.',
    icon: Zap,
    gradient: 'from-amber-500 to-yellow-500',
    tags: ['Horary', 'Divination', 'Advanced'],
  },
  {
    title: 'Financial Astrology & Wealth Potentials',
    slug: 'financial-astrology-wealth-potentials',
    description: 'Analyze planetary influences on financial markets and personal wealth. Learn techniques for identifying investment opportunities and auspicious timings.',
    icon: Briefcase,
    gradient: 'from-lime-500 to-green-500',
    tags: ['Finance', 'Wealth', 'Specialized'],
  },
  {
    title: 'Relationship & Synastry Secrets',
    slug: 'relationship-synastry-secrets',
    description: 'Master the complex art of chart comparison (Synastry) and composite charts to analyze relationship dynamics and compatibility.',
    icon: Users,
    gradient: 'from-rose-500 to-pink-500',
    tags: ['Synastry', 'Relationships', 'Advanced'],
  },
];

const benefits = [
  {
    icon: GraduationCap,
    title: 'Achieve True Mastery',
    description: 'Go beyond the basics to learn the nuanced techniques that distinguish a professional from an amateur.'
  },
  {
    icon: BookOpen,
    title: 'Unlock Esoteric Knowledge',
    description: 'Study rare and profound astrological systems that are not commonly taught, giving you a unique edge.'
  },
  {
    icon: Users,
    title: 'Elite Community',
    description: 'Connect and collaborate with a dedicated group of serious astrology students and practitioners.'
  },
  {
    icon: Star,
    title: 'Professional Application',
    description: 'Gain the skills and confidence to handle complex charts and provide high-level consultations.'
  }
];

export default function AdvancedCoursesPage() {
  return (
    <div className="bg-black text-white">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <AnimatedStars />
        <MysticBackground />
      </div>

      {/* Hero Section */}
      <section className="relative text-center py-24 md:py-32">
        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
            Advanced Astrological Studies
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            For those committed to the path of mastery. These courses unlock the deepest layers of cosmic wisdom.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Mastery-Level Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advancedCourses.map((course, index) => (
              <div key={index} className={`bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-2xl p-8 flex flex-col items-start transition-all duration-300 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20`}>
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
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold py-3 rounded-lg hover:brightness-110 transition-all">
                    View Course Details
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Go Advanced Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Pursue Advanced Studies?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-gray-800/60 rounded-xl border border-gray-700">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full">
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
          <h2 className="text-4xl font-bold text-center mb-12">Advanced Course FAQs</h2>
           <FAQSection />
        </div>
      </section>

    </div>
  );
} 