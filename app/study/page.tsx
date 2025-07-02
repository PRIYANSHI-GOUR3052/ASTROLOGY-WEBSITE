'use client';

import { useState } from 'react';
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Star, Moon, Sun, HelpCircle, Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonials } from '../components/Testimonials';
import { FAQSection } from '../components/FAQSection';
import { useLanguage } from '../contexts/useLanguage';

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

const faqs = [
  ["Do I need prior knowledge to start?", "No, our courses are designed for all levels—from beginners to advanced seekers."],
  ["Are the study materials available in Hindi?", "Yes, most of our resources are available in both English and Hindi."],
  ["Can I get a certificate?", "Yes, you will receive a certificate upon successful completion of each course."],
  ["Is there any fee?", "Many resources are free, but some advanced courses may require a fee."],
  ["How do I ask questions during my study?", "You can join our community forums or contact our mentors directly for guidance."]
];

export default function StudyPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { lang } = useLanguage();

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2000);
    setEmail('');
  };

  // Animation variants
  const sectionVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.25, duration: 0.9 } }
  };
  const cardVariant = {
    hidden: { opacity: 0, scale: 0.95, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: i * 0.12, type: 'spring', bounce: 0.35, duration: 0.8 }
    }),
    hover: { scale: 1.04, rotate: -2, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.12)' },
    tap: { scale: 0.97 }
  };
  const buttonVariant = {
    rest: { scale: 1 },
    hover: { scale: 1.08, boxShadow: '0 4px 24px 0 rgba(254,123,87,0.18)' },
    tap: { scale: 0.93 }
  };
  const iconVariant = {
    rest: { rotate: 0 },
    hover: { rotate: 10, scale: 1.15, transition: { type: 'spring', stiffness: 300 } }
  };

  // Editorial content for hero/banner and value section
  const heroContent = {
    en: {
      title: 'Spiritual Studies',
      subtitle: 'Embark on a profound journey of spiritual awakening and inner transformation as you step into the sacred world of the mystical arts.',
      description: `Within these ancient teachings lie the keys to understanding the invisible forces that shape our lives — energies that connect the stars to our souls, the past to the present, and the seen to the unseen. Our platform is more than just a place to learn; it is a sanctuary for seekers, dreamers, and those yearning for deeper meaning. With an ever-growing library of comprehensive study materials, guided video courses, and intuitive resources, we invite you to explore a universe of knowledge rooted in astrology, tarot, numerology, chakra healing, spiritual psychology, and metaphysical science. Each course is crafted to not only educate but to awaken your inner wisdom — helping you decode the symbols of the cosmos, realign with your soul's purpose, and tap into the divine energy that surrounds and flows within you. Whether you're a beginner drawn by curiosity or an experienced practitioner seeking mastery, our offerings are designed to illuminate your path, expand your consciousness, and elevate your spirit. This is your invitation to reconnect with the universe, rediscover your higher self, and embrace a life of clarity, purpose, and mystical connection. Your spiritual evolution begins here — open your heart, trust your intuition, and let the journey unfold.`
    },
    hi: {
      title: 'आध्यात्मिक अध्ययन',
      subtitle: 'रहस्यमय कलाओं की पवित्र दुनिया में कदम रखते हुए आध्यात्मिक जागृति और आंतरिक परिवर्तन की गहन यात्रा शुरू करें।',
      description: `इन प्राचीन शिक्षाओं में हमारे जीवन को आकार देने वाली अदृश्य शक्तियों को समझने की कुंजी छिपी है — ऐसी ऊर्जा जो सितारों को हमारी आत्मा से, अतीत को वर्तमान से, और दृश्य को अदृश्य से जोड़ती है। हमारा मंच केवल सीखने का स्थान नहीं है; यह जिज्ञासुओं, स्वप्नदर्शियों और गहरे अर्थ की तलाश करने वालों के लिए एक पवित्र स्थान है। व्यापक अध्ययन सामग्री, मार्गदर्शित वीडियो पाठ्यक्रमों और सहज संसाधनों के साथ, हम आपको ज्योतिष, टैरो, अंक ज्योतिष, चक्र चिकित्सा, आध्यात्मिक मनोविज्ञान और पारलौकिक विज्ञान में निहित ज्ञान के ब्रह्मांड का अन्वेषण करने के लिए आमंत्रित करते हैं। प्रत्येक पाठ्यक्रम न केवल शिक्षित करने के लिए बल्कि आपकी आंतरिक बुद्धि को जगाने के लिए तैयार किया गया है — आपको ब्रह्मांड के प्रतीकों को डिकोड करने, अपनी आत्मा के उद्देश्य के साथ पुनः संरेखित करने और आपके चारों ओर और भीतर प्रवाहित होने वाली दिव्य ऊर्जा का दोहन करने में मदद करता है। चाहे आप जिज्ञासा से प्रेरित एक शुरुआती हों या महारत की तलाश में एक अनुभवी साधक, हमारे प्रस्ताव आपके मार्ग को प्रकाशित करने, आपकी चेतना का विस्तार करने और आपकी आत्मा को ऊंचा उठाने के लिए डिज़ाइन किए गए हैं। यह ब्रह्मांड से पुनः जुड़ने, अपने उच्चतर स्व को पुनः खोजने और स्पष्टता, उद्देश्य और रहस्यमय संबंध से भरा जीवन अपनाने का आपका निमंत्रण है। आपकी आध्यात्मिक विकास यात्रा यहीं से शुरू होती है — अपना दिल खोलें, अपनी अंतर्ज्ञान पर विश्वास करें, और यात्रा को प्रकट होने दें।`
    }
  };

  const valueSection = {
    en: [
      `Spiritual study is the gateway to self-realization and conscious living. By delving into the mysteries of astrology, numerology, tarot, and other mystical sciences, you gain tools to understand your true nature, navigate life's challenges, and unlock your highest potential.`,
      `Our courses are designed to bridge ancient wisdom with modern life, offering practical insights and transformative practices that empower you to live with clarity, confidence, and purpose.`,
      `Through guided lessons, interactive exercises, and community support, you will learn to interpret cosmic patterns, harness universal energies, and cultivate a deeper connection with your inner self.`,
      `The journey of spiritual study is not just about acquiring knowledge—it's about awakening your intuition, expanding your consciousness, and embracing a life of meaning and fulfillment.`,
      `Whether you seek personal growth, professional mastery, or a deeper understanding of the universe, our platform provides the resources, mentorship, and inspiration you need to thrive.`,
      `Join a global community of seekers, share your experiences, and embark on a path of lifelong learning and spiritual evolution.`,
      `Every lesson is an invitation to explore, reflect, and transform. Begin your journey today and discover the power of spiritual study to illuminate your path and elevate your soul.`,
      `Remember, the greatest wisdom lies within you—our mission is to help you uncover it.`
    ],
    hi: [
      `आध्यात्मिक अध्ययन आत्म-साक्षात्कार और जागरूक जीवन का द्वार है। ज्योतिष, अंक ज्योतिष, टैरो और अन्य रहस्यमय विज्ञानों के रहस्यों में गहराई से उतरकर, आप अपने सच्चे स्वभाव को समझने, जीवन की चुनौतियों का सामना करने और अपनी सर्वोच्च क्षमता को अनलॉक करने के उपकरण प्राप्त करते हैं।`,
      `हमारे पाठ्यक्रम प्राचीन ज्ञान और आधुनिक जीवन के बीच सेतु का कार्य करते हैं, व्यावहारिक अंतर्दृष्टि और परिवर्तनकारी अभ्यास प्रदान करते हैं जो आपको स्पष्टता, आत्मविश्वास और उद्देश्य के साथ जीने के लिए सशक्त बनाते हैं।`,
      `मार्गदर्शित पाठों, इंटरैक्टिव अभ्यासों और सामुदायिक समर्थन के माध्यम से, आप ब्रह्मांडीय पैटर्न की व्याख्या करना, सार्वभौमिक ऊर्जा का उपयोग करना और अपने आंतरिक स्व के साथ गहरा संबंध विकसित करना सीखेंगे।`,
      `आध्यात्मिक अध्ययन की यात्रा केवल ज्ञान प्राप्त करने के बारे में नहीं है—यह आपकी अंतर्ज्ञान को जगाने, अपनी चेतना का विस्तार करने और अर्थ और पूर्ति से भरा जीवन अपनाने के बारे में है।`,
      `चाहे आप व्यक्तिगत विकास, पेशेवर महारत या ब्रह्मांड की गहरी समझ चाहते हों, हमारा मंच आपको फलने-फूलने के लिए आवश्यक संसाधन, मार्गदर्शन और प्रेरणा प्रदान करता है।`,
      `दुनिया भर के साधकों के समुदाय में शामिल हों, अपने अनुभव साझा करें, और आजीवन सीखने और आध्यात्मिक विकास के मार्ग पर चलें।`,
      `हर पाठ अन्वेषण, चिंतन और परिवर्तन के लिए एक निमंत्रण है। आज ही अपनी यात्रा शुरू करें और अपने मार्ग को प्रकाशित करने और अपनी आत्मा को ऊंचा उठाने के लिए आध्यात्मिक अध्ययन की शक्ति की खोज करें।`,
      `याद रखें, सबसे बड़ी बुद्धि आपके भीतर है—हमारा मिशन है आपको इसे खोजने में मदद करना।`
    ]
  };

  // Benefits section (8 cards)
  const benefits = [
    {
      title: 'Unlock Self-Knowledge',
      desc: 'Gain deep insights into your personality, strengths, and life path through the study of astrology, numerology, and spiritual sciences.'
    },
    {
      title: 'Navigate Life\'s Challenges',
      desc: 'Learn to interpret cosmic patterns and cycles, empowering you to make informed decisions and overcome obstacles with confidence.'
    },
    {
      title: 'Enhance Intuition',
      desc: 'Develop your intuitive abilities and inner wisdom, allowing you to trust your instincts and align with your higher purpose.'
    },
    {
      title: 'Foster Personal Growth',
      desc: 'Embrace a journey of self-discovery and transformation, cultivating resilience, mindfulness, and emotional balance.'
    },
    {
      title: 'Connect with Community',
      desc: 'Join a supportive network of like-minded seekers, sharing experiences, insights, and encouragement on your spiritual path.'
    },
    {
      title: 'Access Expert Guidance',
      desc: 'Learn from experienced mentors and practitioners who provide personalized support, feedback, and inspiration.'
    },
    {
      title: 'Practical Tools & Techniques',
      desc: 'Master practical methods for meditation, energy work, and self-healing that you can integrate into your daily life.'
    },
    {
      title: 'Lifelong Learning',
      desc: 'Enjoy a rich library of resources and courses designed for continuous growth, exploration, and spiritual evolution.'
    }
  ];

  // Premium FAQ section (8+ Q&A)
  const faqs = [
    {
      q: 'What is spiritual study and why is it important?',
      a: 'Spiritual study involves exploring mystical sciences such as astrology, numerology, tarot, and metaphysics to gain a deeper understanding of yourself and the universe. It is important because it empowers you to live with awareness, purpose, and harmony, helping you navigate life\'s challenges and unlock your highest potential.'
    },
    {
      q: 'Do I need any prior knowledge to begin?',
      a: 'No prior experience is required. Our courses are designed for all levels, from curious beginners to advanced practitioners. Each lesson builds foundational knowledge and gradually introduces more advanced concepts.'
    },
    {
      q: 'Are the courses interactive and practical?',
      a: 'Yes, our courses combine theoretical knowledge with practical exercises, guided meditations, and real-life applications to ensure a holistic and engaging learning experience.'
    },
    {
      q: 'Will I receive a certificate?',
      a: 'Yes, you will receive a certificate upon successful completion of each course, recognizing your dedication and achievement in spiritual studies.'
    },
    {
      q: 'Is there a fee for all courses?',
      a: 'Many of our introductory resources are free, while advanced courses and personalized mentorship may require a fee. We strive to make spiritual education accessible to all.'
    },
    {
      q: 'How do I ask questions or get support during my study?',
      a: 'You can join our community forums, attend live Q&A sessions, or contact our mentors directly for personalized guidance and support.'
    },
    {
      q: 'Are study materials available in Hindi?',
      a: 'Yes, most of our resources are available in both English and Hindi. You can switch your preferred language at any time.'
    },
    {
      q: 'How can spiritual study benefit my daily life?',
      a: 'Spiritual study provides practical tools for self-reflection, stress management, and personal growth. It helps you cultivate mindfulness, resilience, and a deeper sense of purpose in everyday life.'
    },
    {
      q: 'Can I connect with other learners?',
      a: 'Absolutely. Our platform fosters a vibrant community where you can share experiences, ask questions, and build meaningful connections with fellow seekers.'
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7 }}
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-indigo-50 to-white text-black"
      >
        <AnimatedStars />
        <MysticBackground>
          <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
            {/* Glassmorphic Hero/Banner */}
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative w-full rounded-[2.5rem] bg-white/40 backdrop-blur-xl shadow-2xl border-2 border-transparent bg-clip-padding px-4 md:px-16 py-14 mb-16 flex flex-col items-center justify-center overflow-hidden"
              style={{ borderImage: 'linear-gradient(90deg, #a5b4fc 0%, #f0abfc 50%, #fcd34d 100%) 1' }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-serif font-bold mb-4 text-center text-black drop-shadow-lg z-10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0.4, duration: 1 }}
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {lang === 'hi' ? heroContent.hi.title : heroContent.en.title}
              </motion.h1>
              <motion.p
                className="text-2xl md:text-3xl text-gray-800 text-center max-w-3xl leading-relaxed mb-4 z-10 font-serif"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {lang === 'hi' ? heroContent.hi.subtitle : heroContent.en.subtitle}
              </motion.p>
              <motion.p
                className="text-lg md:text-xl text-black text-justify max-w-4xl mb-2 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}
              >
                {lang === 'hi' ? heroContent.hi.description : heroContent.en.description}
              </motion.p>
            </motion.div>

            {/* The Value of Spiritual Study Section */}
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
                {lang === 'hi' ? 'आध्यात्मिक अध्ययन का महत्व' : 'The Value of Spiritual Study'}
              </h2>
              <div className="space-y-6 max-w-4xl mx-auto">
                {(lang === 'hi' ? valueSection.hi : valueSection.en).map((para, idx) => (
                  <p key={idx} className="text-black text-justify text-lg" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>{para}</p>
                ))}
              </div>
            </motion.div>

            {/* Study Topics Grid (4 cards, restyled) */}
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="w-full max-w-7xl mx-auto px-0 md:px-2 py-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {studyTopics.map((topic, idx) => (
                    <motion.div
                      key={idx}
                      custom={idx}
                      variants={cardVariant}
                      initial="hidden"
                      whileInView="visible"
                      whileHover="hover"
                      whileTap="tap"
                      viewport={{ once: true }}
                      className={
                        `rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transition-all duration-300 cursor-pointer border border-indigo-100 backdrop-blur-md ` +
                        [
                          'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200', // Card 1: warm gold
                          'bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100',   // Card 2: soft peach
                          'bg-gradient-to-br from-orange-100 via-pink-200 to-yellow-50',   // Card 3: coral pastel
                          'bg-gradient-to-br from-yellow-50 via-pink-100 to-orange-200'    // Card 4: pastel apricot
                        ][idx]
                      }
                    >
                      <div className="relative w-full flex items-center justify-center p-4">
                        <div className="w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 via-purple-100 to-yellow-50 mb-2">
                          {topic.icon}
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 p-5">
                        <h3 className="text-xl font-extrabold mb-2 leading-snug text-black text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{topic.title}</h3>
                        {lang === 'hi' && <h4 className="text-lg font-serif mb-2 text-black text-center">{topic.titleHi}</h4>}
                        <p className="text-gray-700 mb-4 text-center text-base md:text-lg" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>{topic.description}</p>
                        <motion.div whileHover={{ x: 5 }} className="mt-auto w-max mx-auto">
                          <Button asChild className="inline-flex items-center px-4 py-2 rounded-lg bg-gold text-nebula-indigo font-semibold hover:bg-gold-light transition">
                            <Link href={topic.href}>{lang === 'hi' ? 'शुरू करें' : 'Start Learning'} <span className="ml-2">→</span></Link>
                          </Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Benefits Section (8 glassmorphic cards) */}
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{lang === 'hi' ? 'अध्ययन के लाभ' : 'Benefits of Spiritual Study'}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    whileTap="tap"
                    viewport={{ once: true }}
                    className={
                      `rounded-2xl shadow-lg p-8 flex flex-col items-center border border-indigo-100 backdrop-blur-md transition-transform duration-200 ` +
                      [
                        'bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200', // 1
                        'bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100',   // 2
                        'bg-gradient-to-br from-orange-100 via-pink-200 to-yellow-50',   // 3
                        'bg-gradient-to-br from-yellow-50 via-pink-100 to-orange-200',   // 4
                        'bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-100',  // 5
                        'bg-gradient-to-br from-pink-200 via-orange-100 to-yellow-200',  // 6
                        'bg-gradient-to-br from-yellow-200 via-pink-100 to-orange-100',  // 7
                        'bg-gradient-to-br from-orange-100 via-yellow-50 to-pink-200'    // 8
                      ][idx % 8]
                    }
                  >
                    <h3 className="font-bold text-lg mb-2 text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{benefit.title}</h3>
                    <p className="text-gray-700 text-center text-base">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Study With Us Section (restyled) */}
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-indigo-900 mb-6 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{lang === 'hi' ? 'हमारे साथ क्यों पढ़ें?' : 'Why Study With Us?'}</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[0,1,2,3].map((i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    whileTap="tap"
                    viewport={{ once: true }}
                  >
                    {i === 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                        <h3 className="font-bold text-blue-900 text-lg mb-2 flex items-center"><Users className="w-5 h-5 mr-2" />{lang === 'hi' ? 'विशेषज्ञ मेंटर्स' : 'Expert Mentors'}</h3>
                        <p className="text-blue-800 text-justify">{lang === 'hi' ? 'अनुभवी ज्योतिषियों, अंक ज्योतिषियों और आध्यात्मिक मार्गदर्शकों से सीखें जो आपके विकास के लिए समर्पित हैं।' : 'Learn from experienced astrologers, numerologists, and spiritual guides who are passionate about teaching and supporting your growth.'}</p>
                      </div>
                    )}
                    {i === 1 && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-100">
                        <h3 className="font-bold text-yellow-900 text-lg mb-2 flex items-center"><BookOpen className="w-5 h-5 mr-2" />{lang === 'hi' ? 'व्यापक संसाधन' : 'Comprehensive Resources'}</h3>
                        <p className="text-yellow-800 text-justify">{lang === 'hi' ? 'सभी स्तरों के लिए अनुकूल अध्ययन सामग्री, इंटरैक्टिव पाठ और व्यावहारिक अभ्यास तक पहुंचें।' : 'Access a wide range of study materials, interactive lessons, and practical exercises tailored for all levels.'}</p>
                      </div>
                    )}
                    {i === 2 && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                        <h3 className="font-bold text-green-900 text-lg mb-2 flex items-center"><Star className="w-5 h-5 mr-2" />{lang === 'hi' ? 'सामुदायिक समर्थन' : 'Community Support'}</h3>
                        <p className="text-green-800 text-justify">{lang === 'hi' ? 'सीखने वालों के जीवंत समुदाय में शामिल हों, अपने अनुभव साझा करें, और हमारे मंचों और लाइव सत्रों में अपने प्रश्नों के उत्तर पाएं।' : 'Join a vibrant community of learners, share your experiences, and get your questions answered in our forums and live sessions.'}</p>
                      </div>
                    )}
                    {i === 3 && (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                        <h3 className="font-bold text-purple-900 text-lg mb-2 flex items-center"><Moon className="w-5 h-5 mr-2" />{lang === 'hi' ? 'व्यक्तिगत विकास' : 'Personal Growth'}</h3>
                        <p className="text-purple-800 text-justify">{lang === 'hi' ? 'हमारे पाठ्यक्रम आत्म-खोज, आत्मविश्वास और हर कदम पर आध्यात्मिक परिवर्तन को बढ़ावा देने के लिए डिज़ाइन किए गए हैं।' : 'Our courses are designed to foster self-discovery, confidence, and spiritual transformation at every step.'}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Premium FAQ Section (no accordions) */}
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-indigo-900 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{lang === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न' : 'Frequently Asked Questions'}</h2>
              <div className="space-y-8 max-w-3xl mx-auto">
                {faqs.map((faq, idx) => (
                  <div key={idx}>
                    <div className="flex items-center mb-2">
                      <span className="text-indigo-600 mr-2 text-xl">&#x3f;</span>
                      <span className="font-bold text-lg text-indigo-900" style={{ fontFamily: 'Playfair Display, serif' }}>{faq.q}</span>
                    </div>
                    <p className="text-black text-justify pl-8" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Testimonials Section (restyled) */}
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>{lang === 'hi' ? 'छात्र प्रशंसापत्र' : 'Student Testimonials'}</h2>
              <Testimonials />
            </motion.div>

            {/* Newsletter Signup/CTA (glassmorphic) */}
            <motion.div
              variants={sectionVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 mb-8 max-w-2xl mx-auto border border-orange-100 shadow-lg"
            >
              <h3 className="text-lg font-bold text-orange-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>{lang === 'hi' ? 'साप्ताहिक अध्ययन टिप्स और अपडेट प्राप्त करें' : 'Get Weekly Study Tips & Updates'}</h3>
              <p className="text-gray-700 mb-4" style={{ fontFamily: 'Inter, Lato, Open Sans, sans-serif' }}>{lang === 'hi' ? 'हमारे न्यूज़लेटर के लिए साइन अप करें और हर सप्ताह विशेष अध्ययन टिप्स, कोर्स अपडेट और आध्यात्मिक अंतर्दृष्टि प्राप्त करें।' : 'Sign up for our newsletter and receive exclusive study tips, course updates, and spiritual insights every week.'}</p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'hi' ? 'अपना ईमेल पता' : 'Your email address'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  required
                  whileFocus={{ scale: 1.04, borderColor: '#fe7b57' }}
                />
                <motion.button
                  type="submit"
                  variants={buttonVariant}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm relative overflow-hidden"
                >
                  {subscribed ? (
                    <motion.span
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1.1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: 'spring', bounce: 0.5, duration: 0.5 }}
                      className="inline-block"
                    >
                      🎉 {lang === 'hi' ? 'सब्सक्राइब्ड!' : 'Subscribed!'}
                    </motion.span>
                  ) : (
                    <span>{lang === 'hi' ? 'अभी सब्सक्राइब करें' : 'Subscribe Now'}</span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </MysticBackground>
      </motion.div>
    </AnimatePresence>
  );
}

