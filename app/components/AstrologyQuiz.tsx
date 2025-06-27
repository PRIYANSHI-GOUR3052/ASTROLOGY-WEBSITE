'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup } from '@/components/ui/radio-group'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/useLanguage'
import { Sparkles, Lightbulb, Star, Puzzle } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

const staticRandomCardsData = [
  {
    icon: Sparkles,
    gradient: "bg-gradient-to-br from-purple-200 to-pink-200",
    position: { top: '10%', left: '5%', rotate: '-5deg' }
  },
  {
    icon: Lightbulb,
    gradient: "bg-gradient-to-br from-green-200 to-yellow-200",
    position: { bottom: '15%', right: '10%', rotate: '8deg' }
  },
  {
    icon: Star,
    gradient: "bg-gradient-to-br from-blue-200 to-purple-200",
    position: { top: '20%', right: '5%', rotate: '3deg' }
  },
  {
    icon: Puzzle,
    gradient: "bg-gradient-to-br from-orange-200 to-red-200",
    position: { bottom: '5%', left: '15%', rotate: '-10deg' }
  }
]

export function AstrologyQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const { t } = useLanguage()

  const quizData: any = t('astrologyQuiz')

  if (!quizData || typeof quizData !== 'object' || !quizData.questions || quizData.questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading Quiz...</div>;
  }

  const { questions, randomCards } = quizData;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex)
    setShowFeedback(true)

    if (selectedIndex === currentQuestion.correctAnswerIndex) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
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

      {randomCards.map((cardContent: {title: string, description: string}, index: number) => (
        <motion.div
          key={index}
          className={`absolute rounded-xl shadow-lg p-4 text-white z-0 ${staticRandomCardsData[index].gradient}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, rotate: staticRandomCardsData[index].position.rotate || '0deg' }}
          transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
          style={{
            top: staticRandomCardsData[index].position.top,
            left: staticRandomCardsData[index].position.left,
            right: staticRandomCardsData[index].position.right,
            bottom: staticRandomCardsData[index].position.bottom,
          }}
        >
          {React.createElement(staticRandomCardsData[index].icon, { className: "w-8 h-8 mb-2" })}
          <h5 className="font-bold mb-1 text-sm">{cardContent.title}</h5>
          <p className="text-xs">{cardContent.description}</p>
        </motion.div>
      ))}

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
            <img src="/images/female-avatar.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-800 via-pink-600 to-orange-400 text-transparent bg-clip-text">
            {quizData.title}
          </h2>
          <p className="text-lg max-w-md bg-gradient-to-r from-gray-800 via-purple-700 to-pink-500 text-transparent bg-clip-text">
            {quizData.subtitle}
          </p>
        </div>

        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8 max-w-2xl mx-auto border-none">
          <div className="relative bg-[#6A0DAD] text-white p-6 pb-12 rounded-t-2xl transform -skew-y-3 origin-bottom-left">
            <div className="transform skew-y-3 px-4 py-2 flex items-center">
              <h3 className="text-2xl font-bold uppercase text-white">{quizData.questionHeader}</h3>
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-200">
              {currentQuestion && (
                <p className="text-xl font-bold text-gray-800 uppercase">{currentQuestion.question}</p>
              )}
            </div>
          </div>

          <CardContent className="p-8 pt-16">
            {!quizCompleted ? (
              <RadioGroup onValueChange={(value) => setSelectedAnswer(parseInt(value))} value={selectedAnswer !== null ? selectedAnswer.toString() : ''}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option: string, index: number) => (
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
                            ? (index === currentQuestion.correctAnswerIndex ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                            : 'bg-[#EFE6F7] text-[#6A0DAD] hover:bg-[#E0CCF5]'}
                          ${showFeedback && index === currentQuestion.correctAnswerIndex && 'bg-green-500 text-white'}
                        `}
                        onClick={() => handleAnswer(index)}
                        disabled={showFeedback}
                      >
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-lg">{optionLetters[index]}.</span>
                        <span className="ml-8">{option}</span>
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
                  {quizData.completedTitle}
                </h4>
                <p className="text-xl text-gray-700 mb-6">
                  {t('astrologyQuiz.scoreText').replace('{{score}}', score.toString()).replace('{{total}}', questions.length.toString())}
                </p>
                <Button onClick={resetQuiz} className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white px-8 py-3 rounded-lg hover:opacity-90">
                  {quizData.tryAgainButton}
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-12">
          <p className="text-lg font-semibold uppercase mb-2 bg-gradient-to-r from-purple-700 via-fuchsia-500 to-rose-400 text-transparent bg-clip-text">
            {quizData.moreQuizText}
          </p>
          <Link href="/quiz" className="text-white underline text-xl">
            www.nakshatragyaan.com/quiz
          </Link>
        </div>
      </div>
    </section>
  )
}