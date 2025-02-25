import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Star, Moon, Sun } from 'lucide-react'

const studyTopics = [
  {
    title: "Vedic Astrology Fundamentals",
    titleHi: "वैदिक ज्योतिष के मूल सिद्धांत",
    description: "Learn the basics of Vedic astrology, including planets, houses, and zodiac signs.",
    icon: <Sun className="w-12 h-12 text-gold" />,
    href: "/study/vedic-astrology"
  },
  {
    title: "Numerology Essentials",
    titleHi: "अंक ज्योतिष के आवश्यक तत्व",
    description: "Discover the mystical significance of numbers in your life and their impact on your destiny.",
    icon: <Star className="w-12 h-12 text-gold" />,
    href: "/study/numerology"
  },
  {
    title: "Palmistry Techniques",
    titleHi: "हस्तरेखा विज्ञान की तकनीकें",
    description: "Explore the art of reading palms and understanding the lines that shape our lives.",
    icon: <Moon className="w-12 h-12 text-gold" />,
    href: "/study/palmistry"
  },
  {
    title: "Tarot Card Reading",
    titleHi: "टैरो कार्ड रीडिंग",
    description: "Learn the meanings behind tarot cards and how to conduct insightful readings.",
    icon: <BookOpen className="w-12 h-12 text-gold" />,
    href: "/study/tarot"
  }
]

export default function StudyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-nebula-indigo via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground />
      <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-gold animate-pulse">
          आध्यात्मिक अध्ययन<br />
          <span className="text-3xl md:text-5xl">Spiritual Studies</span>
        </h1>
        <p className="text-starlight-silver text-lg mb-12 text-center max-w-2xl mx-auto">
          Embark on a journey of spiritual enlightenment. Explore our comprehensive study materials and courses designed to deepen your understanding of the mystical arts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studyTopics.map((topic, index) => (
            <Card key={index} className="bg-nebula-indigo/50 hover:bg-cosmic-purple/50 transition-colors transform hover:scale-105 duration-300 border border-gold/30 hover:border-gold">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {topic.icon}
                </div>
                <h2 className="text-2xl font-serif font-semibold mb-2 text-gold text-center">{topic.title}</h2>
                <h3 className="text-xl font-serif mb-4 text-gold text-center">{topic.titleHi}</h3>
                <p className="text-starlight-silver mb-6 text-center">{topic.description}</p>
                <div className="text-center">
                  <Button asChild className="bg-gold text-nebula-indigo hover:bg-gold-light">
                    <Link href={topic.href}>Start Learning</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

