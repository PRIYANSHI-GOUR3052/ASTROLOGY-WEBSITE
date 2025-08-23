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

interface QuizData {
  moreQuizText: React.ReactNode
  tryAgainButton: React.ReactNode
  completedTitle: React.ReactNode
  title: string;
  subtitle: string;
  questionHeader: string;
  questions: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
  }[];
  randomCards: { title: string; description: string }[];
}

export function AstrologyQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const { t, lang } = useLanguage()
  
  // Force English content for now to fix user experience
  const isEnglish = lang === 'en';
  const isHindi = lang === 'hi';
  const isBengali = lang === 'bn';
  const isTamil = lang === 'ta';
  const isTelugu = lang === 'te';
  const isMarathi = lang === 'mr';
  const isGujarati = lang === 'gu';
  const isMalayalam = lang === 'ml';

  // Demo quiz data fallback with complete Malayalam support
  const demoQuizData: QuizData = {
    moreQuizText: isMalayalam ? 'കൂടുതൽ ക്വിസ് വേണോ? സന്ദർശിക്കുക:' : isGujarati ? 'વધુ ક്વિઝ જોઈએ છે? મુલાકાત લો:' : isMarathi ? 'अजून क्विझ हवे आहेत? भेट द्या:' : isTelugu ? 'మరిన్ని క്విజ్‌లు కావాలా? సందర్శించండి:' : isTamil ? 'மேலும் வினாடி வினாக்கள் வேண்டுமா? பார்வையிடவும்:' : 'Want more quizzes? Visit:',
    tryAgainButton: isMalayalam ? 'വീണ്ടും ശ്രമിക്കുക' : isGujarati ? 'ફરીથી પ્રયાસ કરો' : isMarathi ? 'पुन्हा प्रयत्न करा' : isTelugu ? 'మళ్లీ ప్రయత్నించండి' : isTamil ? 'மீண்டும் முயற்சிக்கவும்' : 'Try Again',
    completedTitle: isMalayalam ? 'ക്വിസ് പൂർത്തിയായി!' : isGujarati ? 'ક്વિઝ પൂર્ણ થયું!' : isMarathi ? 'क्विझ पूर्ण झाले!' : isTelugu ? 'క്విజ్ పൂర്తయింది!' : isTamil ? 'வினாடி வினா முடிந்தது!' : 'Quiz Completed!',
    title: isMalayalam ? 'ജ്യോതിഷ ഡെമോ ക്വിസ്' : isGujarati ? 'જ്યોતિષ ડേમോ ક്વિઝ' : isMarathi ? 'ज्योतिष डेमो क्विझ' : isTelugu ? 'జ്యോతిష డെమో క്విజ్' : isTamil ? 'ஜோதிட டெமோ வினாடி வினா' : 'Astrology Demo Quiz',
    subtitle: isMalayalam ? 'ഈ രസകരമായ ചോദ്യങ്ങൾ ഉപയോഗിച്ച് നിങ്ങളുടെ ജ്യോതിഷ അറിവ് പരീക്ഷിക്കുക!' : isGujarati ? 'આ મજેદાર પ્રશ્નો સાથે તમારું જ്યോતિષ જ്ઞાન તપાસો!' : isMarathi ? 'या मजेदार प्रश्नांसह तुमचे ज्योतिष ज्ञान तपासा!' : isTelugu ? 'ఈ ఆసక్తికరమైన ప్రశ్నలతో మీ జ്యోతిష జ്ఞానాన్ని పరీక్షించండి!' : isTamil ? 'இந்த வேடிக்கையான கேள்விகளுடன் உங்கள் ஜோதிட அறிவை சோதிக்கவும்!' : isBengali ? 'এই মজার প্রশ্নগুলির সাথে আপনার জ্যোতিষ জ্ঞান পরীক্ষা করুন!' : isHindi ? 'ഇന മജേദാർ പ്രശ്നങ്ങൾ കൂടെ നിങ്ങളുടെ ജ്യോതിഷ അറിവ് പരീക്ഷിക്കുക!' : isEnglish ? 'Test your astrology knowledge with these fun questions!' : 'Test your astrology knowledge with these fun questions!',
    questionHeader: isMalayalam ? 'ചോദ്യം' : isGujarati ? 'પ્રશ્ન' : isMarathi ? 'प्रश्न' : isTelugu ? 'ప્రశ્న' : isTamil ? 'கேள்வி' : 'Question',
    questions: [
      {
        question: isMalayalam ? 'ചുവന്ന ഗ്രഹമായി ഏത് ഗ്രഹത്തെ അറിയപ്പെടുന്നു?' : isGujarati ? 'લાલ ગ્રહ તરીકે કયા ગ്રહને ઓળખવામાં આવે છે?' : isMarathi ? 'लाल ग्रह म्हणून कोणाला ओळखतात?' : isTelugu ? 'ఎరుపు గ്రహం అని ఏ గ്రహాన్ని పిలుస్తారు?' : isTamil ? 'சிவப்பு கோள் என்று எந்த கோள் அழைக்கப்படுகிறது?' : isBengali ? 'লাল গ্রহ নামে কোন গ্রহ পরিচিত?' : isHindi ? 'लाल ग्रह के नाम से कौन सा ग्रह जाना जाता है?' : 'Which planet is known as the Red Planet?',
        options: isMalayalam ? ['ശുക്രൻ', 'ചൊവ്വ', 'വ്യാഴം', 'ശനി'] : isGujarati ? ['શુક્ર', 'મંગળ', 'ગુરુ', 'શનિ'] : isMarathi ? ['शुक्र', 'मंगळ', 'गुरू', 'शनि'] : isTelugu ? ['శుక్రుడు', 'అంగారకుడు', 'గురుడు', 'శని'] : isTamil ? ['வெள்ளி', 'செவ்வாய்', 'வியாழன்', 'சனி'] : isBengali ? ['শুক্র', 'মঙ্গল', 'বৃহস্পতি', 'শনি'] : isHindi ? ['ശുക്രൻ', 'ചൊവ്വ', 'വ്യാഴം', 'ശനി'] : ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswerIndex: 1,
      },
      {
        question: isMalayalam ? 'ജൂലൈ മാസത്തിന്റെ അവസാനത്തിൽ ഏത് രാശിയാണ്?' : isGujarati ? 'જુલાઈ મહિનાના અંતમાં કયું રાશિચક્ર?' : isMarathi ? 'जुलै महिन्याच्या शेवटी कोणता राशी?' : isTelugu ? 'జూలై నెల చివరిలో ఏ రాశి?' : isTamil ? 'ஜூலை மாத இறுதியில் எந்த ராசி?' : isBengali ? 'জুলাই মাসের শেষে কোন রাশি হয়?' : isHindi ? 'ജൂലൈയുടെ അവസാനത്തിൽ ഏത് രാശിയാണ്?' : 'What is the zodiac sign for late July?',
        options: isMalayalam ? ['കർക്കടകം', 'സിംഹം', 'കന്നി', 'മിഥുനം'] : isGujarati ? ['કર્ક', 'સિંહ', 'કન્યા', 'મિથુન'] : isMarathi ? ['कर्क', 'सिंह', 'कन्या', 'मिथुन'] : isTelugu ? ['కర్కాటకం', 'సింహం', 'కన్య', 'మిథునం'] : isTamil ? ['கடகம்', 'சிம்மம்', 'கன்னி', 'மிதுனம்'] : isBengali ? ['কর্ক', 'সিংহ', 'কন্যা', 'মিথুন'] : isHindi ? ['കർക്കടകം', 'സിംഹം', 'കന്നി', 'മിഥുനം'] : ['Cancer', 'Leo', 'Virgo', 'Gemini'],
        correctAnswerIndex: 1,
      },
      {
        question: isMalayalam ? 'ഏത് രാശിയാണ് തുലാസ് ഉപയോഗിച്ച് സൂചിപ്പിക്കുന്നത്?' : isGujarati ? 'કયું રાશિચક્ર તુલા દ્વારા દર્શાવવામાં આવે છે?' : isMarathi ? 'कोणता राशी तराजूने दर्शविला जातो?' : isTelugu ? 'ఏ రాశి తులాదండం ద్వారా సూచించబడుతుంది?' : isTamil ? 'எந்த ராசி தராசு மூலம் குறிக்கப்படுகிறது?' : isBengali ? 'কোন রাশি দাঁড়িপাল্লা দিয়ে প্রতীক?' : isHindi ? 'ഏത് രാശിയാണ് തുലാസ് ഉപയോഗിച്ച് സൂചിപ്പിക്കുന്നത്?' : 'Which sign is symbolized by the scales?',
        options: isMalayalam ? ['തുലാം', 'മീനം', 'ധനു', 'മകരം'] : isGujarati ? ['તુલા', 'મીન', 'ધનુ', 'મકર'] : isMarathi ? ['तूळ', 'मीन', 'धनु', 'मकर'] : isTelugu ? ['తుల', 'మీనం', 'ధనస్సు', 'మకరం'] : isTamil ? ['துலாம்', 'மீனம்', 'தனுசு', 'மகரம்'] : isBengali ? ['তুলা', 'মীন', 'ধনু', 'মকর'] : isHindi ? ['തുലാം', 'മീനം', 'ധനു', 'മകരം'] : ['Libra', 'Pisces', 'Sagittarius', 'Capricorn'],
        correctAnswerIndex: 0,
      },
    ],
    randomCards: [
      { title: isMalayalam ? 'രസകരമായ വിവരങ്ങൾ' : isGujarati ? 'મજેદાર માહિતી' : isMarathi ? 'मजेदार माहिती' : isTelugu ? 'ఆసక్తికరమైన సమాచారం' : isTamil ? 'சுவாரஸ்யமான தகவல்' : isBengali ? 'মজার তথ্য' : isHindi ? 'രസകരമായ വിവരങ്ങൾ' : 'Fun Fact', description: isMalayalam ? 'ജ്യോതിഷത്തിൽ 12 രാശികൾ ഉണ്ട്.' : isGujarati ? 'જ്યോતિષમાં 12 રાશિચક્ર છે.' : isMarathi ? 'ज्योतिषात 12 राशी आहेत.' : isTelugu ? 'జ്యോతిషంలో 12 రాశులు ఉన్నాయి.' : isTamil ? 'ஜோதிடத்தில் 12 ராசிகள் உள்ளன.' : isBengali ? 'জ্যোতিষে ১২টি রাশি আছে।' : isHindi ? 'ജ്യോതിഷത്തിൽ 12 രാശികൾ ഉണ്ട്.' : 'Astrology has 12 zodiac signs.' },
      { title: isMalayalam ? 'നിങ്ങൾക്ക് അറിയാമോ?' : isGujarati ? 'શું તમને ખબર છે?' : isMarathi ? 'तुम्हाला माहित आहे का?' : isTelugu ? 'మీకు తెలుసా?' : isTamil ? 'நீங்கள் அறிவீர்களா?' : isBengali ? 'আপনি কি জানেন?' : isHindi ? 'നിങ്ങൾക്ക് അറിയാമോ?' : 'Did You Know?', description: isMalayalam ? 'സൂര്യൻ ഓരോ രാശിയിലും ഒരു മാസം ചെലവഴിക്കുന്നു.' : isGujarati ? 'સૂર્ય દરેક રાશિચક્રમાં લગભગ એક મહિનോ વീતાવേ છે.' : isMarathi ? 'सूर्य प्रत्येक राशीत सुमारे एक महिना घालवतो.' : isTelugu ? 'సూర్యుడు ప్రతి రాశిలో ఒక నెల చుట్టూ ఉంటాడు.' : isTamil ? 'சூரியன் ஒவ்வொரு ராசியிலும் சுமார் ஒரு மாதம் கழிக்கிறது.' : isBengali ? 'সূর্য প্রতিটি রাশিতে প্রায় এক মাস কাটায়।' : isHindi ? 'സൂര്യൻ ഓരോ രാശിയിലും ഒരു മാസം ചെലവഴിക്കുന്നു.' : 'The Sun spends about a month in each sign.' },
      { title: isMalayalam ? 'ക്വിസ് നുറുങ്ങ്' : isGujarati ? 'ક્વિઝ ટિપ' : isMarathi ? 'ક્વિઝ ટિપ' : isTelugu ? 'క്విజ్ చిట్కా' : isTamil ? 'வினாடி வினா குறிப்பு' : isBengali ? 'কুইজ টিপ' : isHindi ? 'ക്വിസ് നുറുങ്ങ്' : 'Quiz Tip', description: isMalayalam ? 'ഓരോ ചോദ്യവും ശ്രദ്ധാപൂർവ്വം വായിക്കുക!' : isGujarati ? 'દરેક પ્રશ્ન કાળજીપૂર્વક વાંચો!' : isMarathi ? 'प्रत्येक प्रश्न काळजीपूर्वक वाचा!' : isTelugu ? 'ప్రతి ప్రశ్నను జాగ్రత్తగా చదవండి!' : isTamil ? 'ஒவ்வொரு கேள்வியையும் கவனமாக படிக்கவும்!' : isBengali ? 'প্রতিটি প্রশ্ন মনোযোগ দিয়ে পড়ুন!' : isHindi ? 'ഓരോ ചോദ്യവും ശ്രദ്ധാപൂർവ്വം വായിക്കുക!' : 'Read each question carefully!' },
      { title: isMalayalam ? 'വെല്ലുവിളി' : isGujarati ? 'પડકાર' : isMarathi ? 'आव्हान' : isTelugu ? 'సవాలు' : isTamil ? 'சவால்' : isBengali ? 'চ্যালেঞ্জ' : isHindi ? 'വെല്ലുവിളി' : 'Challenge', description: isMalayalam ? 'എല്ലാ ഉത്തരങ്ങളും ശരിയാക്കാൻ ശ്രമിക്കുക!' : isGujarati ? 'બધા જવાબો સાચા મેળવવાનો પ્રયાસ કરો!' : isMarathi ? 'सर्व उत्तरे योग्य मिळवण्याचा प्रयत्न करा!' : isTelugu ? 'అన్ని సమాధానాలను సరిగ్గా పొందడానికి ప్రయత్నించండి!' : isTamil ? 'அனைத்து பதில்களையும் சரியாக பெற முயற்சிக்கவும்!' : isBengali ? 'সব উত্তর সঠিক করার চেষ্টা করুন!' : isHindi ? 'എല്ലാ ഉത്തരങ്ങളും ശരിയാക്കാൻ ശ്രമിക്കുക!' : 'Try to get all answers correct!' },
    ],
  };

  let quizData: QuizData | null = null;
  try {
    quizData = t('astrologyQuiz') as unknown as QuizData;
  } catch {
    quizData = null;
  }
  if (!quizData || typeof quizData !== 'object' || !quizData.questions || quizData.questions.length === 0) {
    quizData = demoQuizData;
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

  const optionLetters = isMalayalam ? ['അ', 'ബ', 'ക', 'ഡ'] : isGujarati ? ['અ', 'બ', 'ક', 'ડ'] : ['A', 'B', 'C', 'D']

  return (
    <section className="py-1 sm:py-8 md:py-16 rounded-3xl relative bg-[#FEFBF2] min-h-screen flex items-center justify-center overflow-hidden">

      {/* Floating cards, hidden on xs screens for clarity */}
      <div className="hidden xs:block">
        {randomCards.map((cardContent: {title: string, description: string}, index: number) => (
          <motion.div
            key={index}
            className={`absolute rounded-xl shadow-lg p-3 sm:p-4 text-black z-0 ${staticRandomCardsData[index].gradient}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, rotate: staticRandomCardsData[index].position.rotate || '0deg' }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
            style={{
              top: staticRandomCardsData[index].position.top,
              left: staticRandomCardsData[index].position.left,
              right: staticRandomCardsData[index].position.right,
              bottom: staticRandomCardsData[index].position.bottom,
              maxWidth: '180px',
              minWidth: '120px',
            }}
          >
            {React.createElement(staticRandomCardsData[index].icon, { className: "w-7 h-7 sm:w-8 sm:h-8 mb-2 text-black" })}
            <h5 className="font-bold mb-1 text-xs sm:text-sm text-black">{cardContent.title}</h5>
            <p className="text-xs sm:text-sm text-black">{cardContent.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-2 sm:px-4 relative z-10 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <div className="text-center mb-6 sm:mb-8 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 text-black">
            {isMalayalam ? 'ജ്യോതിഷ ക്വിസ്' : isGujarati ? 'જ്યോતિષ ક്વിઝ' : isMarathi ? 'ज्योतिष क्विझ' : isTelugu ? 'జ്యോతిష క്విజ్' : isTamil ? 'ஜோதிட வினாடி வினா' : isBengali ? 'জ্যোতিষ কুইজ' : isHindi ? 'ജ്യോതിഷ ക്വിസ്' : isEnglish ? 'Astrology Quiz' : quizData.title}
          </h2>
          <p className="text-base sm:text-lg max-w-xs sm:max-w-md text-green-800">
            {isMalayalam ? 'ഈ രസകരമായ ചോദ്യങ്ങൾ ഉപയോഗിച്ച് നിങ്ങളുടെ ജ്യോതിഷ അറിവ് പരീക്ഷിക്കുക!' : isGujarati ? 'આ મજેદાર પ્રશ્નો સાથે તમારું જ്યോતિષ જ്ઞાન તપાસો!' : isMarathi ? 'या मजेदार प्रश्नांसह तुमचे ज्योतिष ज्ञान तपासा!' : isTelugu ? 'ఈ ఆసక్తికరమైన ప్రశ్నలతో మీ జ്యోతిష జ്ఞానాన్ని పరీక్షించండి!' : isTamil ? 'இந்த வேடிக்கையான கேள்விகளுடன் உங்கள் ஜோதிட அறிவை சோதிக்கவும்!' : isBengali ? 'এই মজার প্রশ্নগুলির সাথে আপনার জ্যোতিষ জ্ঞান পরীক্ষা করুন!' : isHindi ? 'ഈ രസകരമായ ചോദ്യങ്ങൾ ഉപയോഗിച്ച് നിങ്ങളുടെ ജ്യോതിഷ അറിവ് പരീക്ഷിക്കുക!' : isEnglish ? 'Test your astrology knowledge with these fun questions!' : quizData.subtitle}
          </p>
        </div>

        <Card className="bg-white rounded-2xl shadow-xl overflow-hidden mt-3 sm:mt-8 max-w-full sm:max-w-2xl mx-auto border-none">
          <div className="relative bg-[#6A0DAD] text-white p-4 sm:p-6 pb-10 sm:pb-12 rounded-t-2xl transform -skew-y-3 origin-bottom-left">
            <div className="transform skew-y-3 px-2 sm:px-4 py-2 flex items-center">
              <h3 className="text-lg sm:text-2xl font-bold uppercase text-white">{isMalayalam ? 'ചോദ്യം' : isGujarati ? 'પ્રશ્ન' : isMarathi ? 'प्रश्न' : isTelugu ? 'ప્రశ્న' : isTamil ? 'கேள்வி' : isBengali ? 'প্রশ্ন' : isHindi ? 'ചോദ്യം' : isEnglish ? 'Question' : quizData.questionHeader}</h3>
            </div>
            <div className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 w-[95%] sm:w-[85%] min-h-12 sm:min-h-16 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-200 px-3 sm:px-6 py-2 sm:py-3">
              {currentQuestion && (
                <p className="text-base sm:text-lg md:text-xl font-bold text-gray-800 text-center leading-relaxed px-2 sm:px-4">
                  {currentQuestion.question}
                </p>
              )}
            </div>

          <CardContent className="p-4 sm:p-8 pt-12 sm:pt-16">
            {!quizCompleted ? (
              <RadioGroup onValueChange={(value) => setSelectedAnswer(parseInt(value))} value={selectedAnswer !== null ? selectedAnswer.toString() : ''}>
                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                  {currentQuestion.options.map((option: string, index: number) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative"
                    >
                      <Button
                        variant="default"
                        className={`w-full justify-start text-left py-4 sm:py-6 px-3 sm:px-4 rounded-xl text-base sm:text-lg font-semibold
                          ${selectedAnswer === index
                            ? (index === currentQuestion.correctAnswerIndex ? 'bg-green-500 text-white' : 'bg-red-500 text-white')
                            : 'bg-[#EFE6F7] text-[#6A0DAD] hover:bg-[#E0CCF5]'}
                          ${showFeedback && index === currentQuestion.correctAnswerIndex && 'bg-green-500 text-white'}
                        `}
                        onClick={() => handleAnswer(index)}
                        disabled={showFeedback}
                      >
                        <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 font-bold text-base sm:text-lg">{optionLetters[index]}.</span>
                        <span className="ml-7 sm:ml-8">{option}</span>
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
                <h4 className="text-xl sm:text-2xl font-bold text-[#6A0DAD] mb-3 sm:mb-4">
                  {isMalayalam ? 'ക്വിസ് പൂർത്തിയായി!' : isGujarati ? 'ક്વિઝ પൂર્ણ થયું!' : isMarathi ? 'क्विझ पूर्ण झाले!' : isTelugu ? 'క്విజ్ పൂర്తయింది!' : isTamil ? 'வினாடி வினா முடிந்தது!' : isBengali ? 'কুইজ সম্পন্ন!' : isHindi ? 'ക്വിസ് പൂർത്തിയായി!' : isEnglish ? 'Quiz Completed!' : quizData.completedTitle}
                </h4>
                <p className="text-lg sm:text-xl text-gray-700 mb-4 sm:mb-6">
                  {isMalayalam ? `നിങ്ങളുടെ സ്കോർ: ${score}/${questions.length}` : isGujarati ? `તુમચો સ્કોર: ${score} મધ્યે ${questions.length}` : isMarathi ? `तुमचा स्कोर: ${score} मध्ये ${questions.length}` : isTelugu ? `మీ స్కోరు: ${score} లో ${questions.length}` : isTamil ? `உங்கள் மதிப்பெண்: ${score} இல் ${questions.length}` : isBengali ? `আপনার স্কোর: ${score} এর মধ্যে ${questions.length}` : isHindi ? `आपका स्कोर: ${score}/${questions.length}` : isEnglish ? `Your score: ${score} out of ${questions.length}` : (t('astrologyQuiz.scoreText') ? t('astrologyQuiz.scoreText').replace('{{score}}', score.toString()).replace('{{total}}', questions.length.toString()) : `Score: ${score}/${questions.length}`)}
                </p>
                <Button onClick={resetQuiz} className="bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:opacity-90">
                  {isMalayalam ? 'വീണ്ടും ശ്രമിക്കുക' : isGujarati ? 'ફરીથી પ્રયાસ કરો' : isMarathi ? 'पुन्हा प्रयत्न करा' : isTelugu ? 'మళ్లీ ప్రయత్నించండి' : isTamil ? 'மீண்டும் முயற்சிக்கவும்' : isBengali ? 'আবার চেষ্টা করুন' : isHindi ? 'വീണ്ടും ശ്രമിക്കുക' : isEnglish ? 'Try Again' : quizData.tryAgainButton}
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}