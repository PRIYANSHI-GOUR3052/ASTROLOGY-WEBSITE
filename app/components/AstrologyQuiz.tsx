'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup } from '@/components/ui/radio-group'
import { motion } from 'framer-motion'
import { useLanguage } from '@/app/contexts/LanguageContext'
import { Sparkles, Trophy, Lightbulb, Puzzle, Star } from 'lucide-react'
import Link from 'next/link'

interface QuizQuestion {
  question: {
    en: string;
    hi: string;
  };
  options: {
    en: string;
    hi: string;
  }[];
  correctAnswer: {
    en: string;
    hi: string;
  };
}

const quizQuestions: QuizQuestion[] = [
  {
    question: {
      en: "Which planet rules the zodiac sign Leo?",
      hi: "कौन सा ग्रह सिंह राशि का स्वामी है?"
    },
    options: [
      { en: "Mars", hi: "मंगल" },
      { en: "Venus", hi: "शुक्र" },
      { en: "Sun", hi: "सूर्य" },
      { en: "Jupiter", hi: "बृहस्पति" }
    ],
    correctAnswer: { en: "Sun", hi: "सूर्य" }
  },
  {
    question: {
      en: "What is the element associated with Scorpio?",
      hi: "वृश्चिक राशि से जुड़ा तत्व क्या है?"
    },
    options: [
      { en: "Fire", hi: "अग्नि" },
      { en: "Earth", hi: "पृथ्वी" },
      { en: "Air", hi: "वायु" },
      { en: "Water", hi: "जल" }
    ],
    correctAnswer: { en: "Water", hi: "जल" }
  },
  {
    question: {
      en: "Which zodiac sign is represented by the Scales?",
      hi: "किस राशि का प्रतिनिधित्व तुला द्वारा किया जाता है?"
    },
    options: [
      { en: "Libra", hi: "तुला" },
      { en: "Aquarius", hi: "कुंभ" },
      { en: "Gemini", hi: "मिथुन" },
      { en: "Pisces", hi: "मीन" }
    ],
    correctAnswer: { en: "Libra", hi: "तुला" }
  },
  {
    question: {
      en: "What is the ruling planet of Aries?",
      hi: "मेष राशि का स्वामी ग्रह कौन सा है?"
    },
    options: [
      { en: "Venus", hi: "शुक्र" },
      { en: "Mars", hi: "मंगल" },
      { en: "Mercury", hi: "बुध" },
      { en: "Saturn", hi: "शनि" }
    ],
    correctAnswer: { en: "Mars", hi: "मंगल" }
  },
  {
    question: {
      en: "Which house in astrology represents marriage and partnerships?",
      hi: "ज्योतिष में कौन सा भाव विवाह और साझेदारी का प्रतिनिधित्व करता है?"
    },
    options: [
      { en: "2nd House", hi: "दूसरा भाव" },
      { en: "5th House", hi: "पांचवां भाव" },
      { en: "7th House", hi: "सातवां भाव" },
      { en: "10th House", hi: "दसवां भाव" }
    ],
    correctAnswer: { en: "7th House", hi: "सातवां भाव" }
  }
]

const randomCardsData = [
  {
    title: { en: "Astrology Fact", hi: "ज्योतिष तथ्य" },
    description: { en: "Did you know that Mercury retrograde isn't always bad?", hi: "क्या आप जानते हैं कि बुध वक्री हमेशा बुरा नहीं होता?" },
    icon: Sparkles,
    gradient: "bg-gradient-to-br from-purple-200 to-pink-200",
    position: { top: '10%', left: '5%', rotate: '-5deg' }
  },
  {
    title: { en: "Horoscope Tip", hi: "राशिफल टिप" },
    description: { en: "Read your rising sign horoscope for more accuracy!", hi: "अधिक सटीकता के लिए अपनी लग्न राशि का राशिफल पढ़ें!" },
    icon: Lightbulb,
    gradient: "bg-gradient-to-br from-green-200 to-yellow-200",
    position: { bottom: '15%', right: '10%', rotate: '8deg' }
  },
  {
    title: { en: "Zodiac Insight", hi: "राशि अंतर्दृष्टि" },
    description: { en: "Each zodiac sign has unique strengths and weaknesses.", hi: "प्रत्येक राशि की अपनी अनूठी ताकत और कमजोरियां होती हैं।" },
    icon: Star,
    gradient: "bg-gradient-to-br from-blue-200 to-purple-200",
    position: { top: '20%', right: '5%', rotate: '3deg' }
  },
  {
    title: { en: "Quiz Challenge", hi: "क्विज चुनौती" },
    description: { en: "Test your knowledge with our daily astrology quiz!", hi: "हमारे दैनिक ज्योतिष क्विज के साथ अपने ज्ञान का परीक्षण करें!" },
    icon: Puzzle,
    gradient: "bg-gradient-to-br from-orange-200 to-red-200",
    position: { bottom: '5%', left: '15%', rotate: '-10deg' }
  }
]

// Helper function for safe language access
function getLocalizedText(obj: { en: string; hi: string }, lang: string) {
  return obj[lang as keyof typeof obj] ?? obj['en'];
}

export function AstrologyQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const { lang } = useLanguage()

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex)
    setShowFeedback(true)

    if (currentQuestion.options[selectedIndex].en === currentQuestion.correctAnswer.en) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        setQuizCompleted(true)
      }
    }, 1500)
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
    setShowFeedback(false)
  }

  const optionLetters = ['A', 'B', 'C', 'D']

  return (
    <section className="py-16 relative bg-gradient-to-b from-[#EADCF5] via-[#FBEAFF] to-[#F5ECFB] min-h-screen flex items-center justify-center overflow-hidden">

      {randomCardsData.map((card, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-xl shadow-lg p-4 text-white z-0 ${card.gradient}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: card.position.rotate || '0deg' }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
          style={{
            top: card.position.top,
            left: card.position.left,
            right: card.position.right,
            bottom: card.position.bottom,
          }}
        >
          <card.icon className="w-8 h-8 mb-2" />
          <h5 className="font-bold mb-1 text-sm">{getLocalizedText(card.title, lang)}</h5>
          <p className="text-xs">{getLocalizedText(card.description, lang)}</p>
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
            <img src="/images/female-avatar.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-400 text-transparent bg-clip-text">
            {lang === 'en' ? "Today's Astrology Quiz!" : "आज का ज्योतिष प्रश्नोत्तरी!"}
          </h2>
          <p className="text-lg max-w-md bg-gradient-to-r from-gray-800 via-purple-700 to-pink-500 text-transparent bg-clip-text">
            {lang === 'en' ? "Tell us which one is the correct answer in the comment below" : "हमें बताएं कि नीचे टिप्पणी में कौन सा सही उत्तर है"}
          </p>
        </div>

        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8 max-w-2xl mx-auto border-none">
          <div className="relative bg-[#6A0DAD] text-white p-6 pb-12 rounded-t-2xl transform -skew-y-3 origin-bottom-left">
            <div className="transform skew-y-3 px-4 py-2 flex items-center">
              <h3 className="text-2xl font-bold uppercase text-white">{lang === 'en' ? "What is your question?" : "आपका प्रश्न क्या है?"}</h3>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-200">
              {currentQuestion && (
                <p className="text-xl font-bold text-gray-800 uppercase">{getLocalizedText(currentQuestion.question, lang)}</p>
              )}
            </div>
          </div>

          <CardContent className="p-8 pt-16">
            {!quizCompleted ? (
              <RadioGroup onValueChange={(value) => setSelectedAnswer(parseInt(value))} value={selectedAnswer !== null ? selectedAnswer.toString() : ''}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <Button
                        variant="default"
                        className={`w-full justify-start text-left py-6 px-4 rounded-xl text-lg font-semibold
                          ${selectedAnswer === index
                            ? (currentQuestion.options[index].en === currentQuestion.correctAnswer.en ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                            : 'bg-[#EFE6F7] text-[#6A0DAD] hover:bg-[#E0CCF5]'}
                          ${showFeedback && currentQuestion.options[index].en === currentQuestion.correctAnswer.en && 'bg-green-500 text-white'}
                        `}
                        onClick={() => handleAnswer(index)}
                        disabled={showFeedback}
                      >
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg">{optionLetters[index]}.</span>
                        <span className="ml-8">{getLocalizedText(option, lang)}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h4 className="text-2xl font-bold text-[#6A0DAD] mb-4">
                  {lang === 'en' ? 'Quiz Completed!' : 'प्रश्नोत्तरी पूर्ण!'}
                </h4>
                <p className="text-xl text-gray-700 mb-6">
                  {lang === 'en' ? `Your score: ${score} out of ${quizQuestions.length}` : `आपका स्कोर: ${score} / ${quizQuestions.length}`}
                </p>
                <Button onClick={resetQuiz} className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white px-8 py-3 rounded-lg hover:opacity-90">
                  {lang === 'en' ? 'Try Again' : 'पुनः प्रयास करें'}
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-lg font-semibold uppercase mb-2 bg-gradient-to-r from-purple-700 via-fuchsia-500 to-rose-400 text-transparent bg-clip-text">
            {lang === 'en' ? 'More Quiz At' : 'और प्रश्नोत्तरी यहाँ'}
          </p>
          <Link href="/quiz" className="text-white underline text-xl">
            www.nakshatragyaan.com/quiz
          </Link>
        </div>
      </div>
    </section>
  )
}