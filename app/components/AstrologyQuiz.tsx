'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

const quizQuestions = [
  {
    question: "Which planet rules the zodiac sign Leo?",
    options: ["Mars", "Venus", "Sun", "Jupiter"],
    correctAnswer: "Sun"
  },
  {
    question: "What is the element associated with Scorpio?",
    options: ["Fire", "Earth", "Air", "Water"],
    correctAnswer: "Water"
  },
  {
    question: "Which zodiac sign is represented by the Scales?",
    options: ["Libra", "Aquarius", "Gemini", "Pisces"],
    correctAnswer: "Libra"
  }
]

export function AstrologyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleAnswer = () => {
    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer('')
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer('')
    setScore(0)
    setQuizCompleted(false)
  }

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-celestial-blue/30 to-cosmic-purple/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-gold">
          ज्योतिष प्रश्नोत्तरी
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-gold">
          Astrology Quiz
        </h3>
        <Card className="bg-midnight-blue-light/80 border border-gold/30 max-w-2xl mx-auto">
          <CardContent className="p-6">
            {!quizCompleted ? (
              <>
                <h4 className="text-xl font-serif font-semibold mb-4 text-gold">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </h4>
                <p className="mb-4 text-lavender">{quizQuestions[currentQuestion].question}</p>
                <RadioGroup onValueChange={setSelectedAnswer} value={selectedAnswer}>
                  {quizQuestions[currentQuestion].options.map((option) => (
                    <div key={option} className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="text-lavender">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
                <Button onClick={handleAnswer} className="w-full bg-gold text-midnight-blue hover:bg-gold-light mt-4" disabled={!selectedAnswer}>
                  Next Question
                </Button>
              </>
            ) : (
              <>
                <h4 className="text-xl font-serif font-semibold mb-4 text-gold">
                  Quiz Completed!
                </h4>
                <p className="mb-4 text-lavender">Your score: {score} out of {quizQuestions.length}</p>
                <Button onClick={resetQuiz} className="w-full bg-gold text-midnight-blue hover:bg-gold-light">
                  Try Again
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

