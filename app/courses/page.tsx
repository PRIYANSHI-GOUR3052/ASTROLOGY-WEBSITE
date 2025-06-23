'use client';

import Link from 'next/link';
import { GraduationCap, BookOpen, Star, BarChart, Users, Zap, ShieldCheck } from 'lucide-react';
import { AnimatedStars } from '../components/AnimatedStars';
import { MysticBackground } from '../components/MysticBackground';
import { DrNarendraProfile } from '../components/DrNarendraProfile';
import { FAQSection } from '../components/FAQSection';
import { Button } from '@/components/ui/button';

const courses = [
  {
    title: 'Vedic Astrology Mastery',
    slug: 'vedic-astrology-mastery',
    description: 'A comprehensive journey from the fundamentals to advanced predictive techniques of Vedic Astrology.',
    icon: BookOpen,
    gradient: 'from-purple-500 to-indigo-500',
    tags: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    title: 'Numerology & Cosmic Codes',
    slug: 'numerology-cosmic-codes',
    description: 'Unlock the secrets of numbers and their vibrations. Learn to create detailed numerology reports.',
    icon: BarChart,
    gradient: 'from-pink-500 to-rose-500',
    tags: ['All Levels'],
  },
  {
    title: 'The Art of Palmistry',
    slug: 'art-of-palmistry',
    description: 'Read the stories etched in the palms. A practical course on identifying lines, mounts, and signs.',
    icon: Zap,
    gradient: 'from-teal-500 to-cyan-500',
    tags: ['Beginner', 'Intermediate'],
  },
  {
    title: 'Tarot Reading for the Modern Mystic',
    slug: 'tarot-reading-modern-mystic',
    description: 'Master the 78 keys of the Tarot to provide insightful and empowering readings.',
    icon: Star,
    gradient: 'from-amber-500 to-yellow-500',
    tags: ['All Levels'],
  },
  {
    title: 'Advanced Predictive Astrology',
    slug: 'advanced-predictive-astrology',
    description: 'For seasoned astrologers. Dive deep into Dasha, Transits, and Ashtakavarga.',
    icon: GraduationCap,
    gradient: 'from-blue-500 to-sky-500',
    tags: ['Advanced'],
  },
  {
    title: 'Vaastu Shastra for Harmony',
    slug: 'vaastu-shastra-harmony',
    description: 'Learn the ancient science of architecture to create harmonious living and working spaces.',
    icon: ShieldCheck,
    gradient: 'from-green-500 to-emerald-500',
    tags: ['Beginner'],
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Expert-Led Instruction',
    description: 'Learn directly from seasoned astrologers and mystics with decades of practical experience.'
  },
  {
    icon: BookOpen,
    title: 'Comprehensive Curriculum',
    description: 'Our courses cover everything from foundational principles to advanced predictive techniques.'
  },
  {
    icon: Star,
    title: 'Practical Application',
    description: 'Emphasis on real-world case studies and chart analysis to build your confidence.'
  },
  {
    icon: Zap,
    title: 'Interactive Learning',
    description: 'Engage in live Q&A sessions, community forums, and hands-on exercises.'
  }
];

export default function CoursesPage() {
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
            Astrology Courses
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Embark on a transformative journey into the heart of cosmic wisdom. Master ancient arts and unlock your potential.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Curriculum</h2>
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
                    Enroll Now
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
          <h2 className="text-4xl font-bold text-center mb-12">Why Learn with Nakshatra Gyaan?</h2>
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
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
           <FAQSection />
        </div>
      </section>

    </div>
  );
}
