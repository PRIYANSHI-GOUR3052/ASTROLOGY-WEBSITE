'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Moon, Sun, Home, Map, ArrowRight, Facebook, Instagram, Twitter, MessageSquare, Heart, Bookmark, Share2, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../contexts/useLanguage';

// Dummy content for new sections based on snapshot
const snapshotContent = {
  forDevelopers: {
    title: {
      en: "For Beginners in Astrology",
      hi: "ज्योतिष के शुरुआती लोगों के लिए",
      es: "Para principiantes en astrología",
      fr: "Pour les débutants en astrologie",
      de: "Für Anfänger in der Astrologie",
      zh: "占星初学者",
      ar: "للمبتدئين في علم التنجيم",
      ru: "Для начинающих в астрологии"
    },
    description: {
      en: "No prior knowledge required. Our intuitive platform makes learning astrology easy and accessible.",
      hi: "किसी पूर्व ज्ञान की आवश्यकता नहीं। हमारा सहज मंच ज्योतिष सीखना आसान और सुलभ बनाता है।",
      es: "No se requiere conocimiento previo. Nuestra plataforma intuitiva hace que aprender astrología sea fácil y accesible.",
      fr: "Aucune connaissance préalable requise. Notre plateforme intuitive rend l'apprentissage de l'astrologie facile et accessible.",
      de: "Keine Vorkenntnisse erforderlich. Unsere intuitive Plattform macht das Erlernen der Astrologie einfach und zugänglich.",
      zh: "无需先前知识。我们直观的平台让学习占星变得简单易行。",
      ar: "لا يتطلب معرفة مسبقة. منصتنا البديهية تجعل تعلم علم التنجيم سهلاً ومتاحاً.",
      ru: "Не требуется предварительных знаний. Наша интуитивная платформа делает изучение астрологии простым и доступным."
    },
  },
  pasteCoolPhotos: {
    title: {
      en: "Daily Horoscope Insights",
      hi: "दैनिक राशिफल अंतर्दृष्टि",
      es: "Perspectivas diarias del horóscopo",
      fr: "Aperçus quotidiens de l'horoscope",
      de: "Tägliche Horoskop-Einblicke",
      zh: "每日星座洞察",
      ar: "رؤى الأبراج اليومية",
      ru: "Ежедневные астрологические прогнозы"
    },
    description: {
      en: "Get precise, daily predictions curated just for you. Start your day with cosmic guidance.",
      hi: "आपके लिए विशेष रूप से तैयार की गई सटीक, दैनिक भविष्यवाणियां प्राप्त करें। ब्रह्मांडीय मार्गदर्शन के साथ अपने दिन की शुरुआत करें।",
      es: "Obtén predicciones diarias precisas hechas solo para ti. Comienza tu día con orientación cósmica.",
      fr: "Recevez des prédictions quotidiennes précises, conçues juste pour vous. Commencez votre journée avec des conseils cosmiques.",
      de: "Erhalten Sie präzise, tägliche Vorhersagen, die nur für Sie erstellt wurden. Beginnen Sie Ihren Tag mit kosmischer Führung.",
      zh: "为您量身定制的每日精准预测。用宇宙指引开启新一天。",
      ar: "احصل على توقعات يومية دقيقة مصممة خصيصاً لك. ابدأ يومك بتوجيه كوني.",
      ru: "Получайте точные ежедневные прогнозы, составленные специально для вас. Начните свой день с космического руководства."
    },
    imageUrl: "/images/horoscope_daily.jpg"
  },
  fitsForCatlovers: {
    title: {
      en: "Zodiac Sign Compatibility",
      hi: "राशिफल संगतता",
      es: "Compatibilidad de signos del zodiaco",
      fr: "Compatibilité des signes du zodiaque",
      de: "Sternzeichen-Kompatibilität",
      zh: "星座配对",
      ar: "توافق الأبراج",
      ru: "Совместимость знаков зодиака"
    },
    description: {
      en: "Discover how compatible you are with other zodiac signs and deepen your understanding of relationships.",
      hi: "जानें कि आप अन्य राशियों के साथ कितने संगत हैं और रिश्तों की अपनी समझ को गहरा करें।",
      es: "Descubre tu compatibilidad con otros signos del zodiaco y profundiza tu comprensión de las relaciones.",
      fr: "Découvrez votre compatibilité avec d'autres signes du zodiaque et approfondissez votre compréhension des relations.",
      de: "Entdecken Sie, wie kompatibel Sie mit anderen Sternzeichen sind, und vertiefen Sie Ihr Verständnis von Beziehungen.",
      zh: "了解你与其他星座的配对程度，深化你对关系的理解。",
      ar: "اكتشف مدى توافقك مع الأبراج الأخرى وعمق فهمك للعلاقات.",
      ru: "Узнайте, насколько вы совместимы с другими знаками зодиака, и углубите понимание отношений."
    },
    imageUrl: "/images/zodiac_compatibility.jpg"
  },
  coffeinia: {
    title: {
      en: "Personalized Astrology App",
      hi: "व्यक्तिगत ज्योतिष ऐप",
      es: "Aplicación de astrología personalizada",
      fr: "Application d'astrologie personnalisée",
      de: "Personalisierte Astrologie-App",
      zh: "个性化占星应用",
      ar: "تطبيق التنجيم الشخصي",
      ru: "Персонализированное астрологическое приложение"
    },
    description: {
      en: "Experience personalized readings and daily insights on the go with our mobile application.",
      hi: "हमारे मोबाइल एप्लिकेशन के साथ चलते-फिरते व्यक्तिगत रीडिंग और दैनिक अंतर्दृष्टि का अनुभव करें।",
      es: "Experimenta lecturas personalizadas y perspectivas diarias en cualquier lugar con nuestra aplicación móvil.",
      fr: "Découvrez des lectures personnalisées et des aperçus quotidiens en déplacement avec notre application mobile.",
      de: "Erleben Sie personalisierte Lesungen und tägliche Einblicke unterwegs mit unserer mobilen Anwendung.",
      zh: "通过我们的移动应用，随时随地体验个性化解读和每日洞察。",
      ar: "اختبر قراءات شخصية ورؤى يومية أثناء التنقل مع تطبيقنا المحمول.",
      ru: "Получайте персональные прогнозы и ежедневные советы в нашем мобильном приложении."
    },
    appScreenshot: "/images/astrology_app_mockup.jpg"
  },
  equipATeam: {
    title: {
      en: "Equip Yourself with Cosmic Knowledge",
      hi: "ब्रह्मांडीय ज्ञान से स्वयं को सुसज्जित करें",
      es: "Equípate con conocimiento cósmico",
      fr: "Équipez-vous de connaissances cosmiques",
      de: "Rüste dich mit kosmischem Wissen aus",
      zh: "装备你的宇宙知识",
      ar: "جهز نفسك بالمعرفة الكونية",
      ru: "Оснасти себя космическими знаниями"
    },
    description: {
      en: "For those seeking deeper understanding, our curated courses and resources are designed for all levels.",
      hi: "गहरी समझ चाहने वालों के लिए, हमारे क्यूरेट किए गए पाठ्यक्रम और संसाधन सभी स्तरों के लिए डिज़ाइन किए गए हैं।",
      es: "Para quienes buscan una comprensión más profunda, nuestros cursos y recursos seleccionados están diseñados para todos los niveles.",
      fr: "Pour ceux qui recherchent une compréhension plus profonde, nos cours et ressources sélectionnés sont conçus pour tous les niveaux.",
      de: "Für alle, die ein tieferes Verständnis suchen, sind unsere ausgewählten Kurse und Ressourcen für alle Niveaus konzipiert.",
      zh: "为寻求更深理解的人士，我们精选的课程和资源适合所有水平。",
      ar: "لمن يسعى لفهم أعمق، تم تصميم دوراتنا ومواردنا المنسقة لجميع المستويات.",
      ru: "Для тех, кто ищет более глубокое понимание, наши курсы и ресурсы подходят для всех уровней."
    },
  },
  saveTime: {
    title: {
      en: "Save Time, Gain Clarity",
      hi: "समय बचाएं, स्पष्टता प्राप्त करें",
      es: "Ahorra tiempo, gana claridad",
      fr: "Gagnez du temps, gagnez en clarté",
      de: "Zeit sparen, Klarheit gewinnen",
      zh: "节省时间，获得清晰",
      ar: "وفر الوقت، واكتسب الوضوح",
      ru: "Экономьте время, получайте ясность"
    },
    description: {
      en: "Our streamlined consultation process and comprehensive reports give you answers quickly and efficiently.",
      hi: "हमारी सुव्यवस्थित परामर्श प्रक्रिया और व्यापक रिपोर्ट आपको जल्दी और कुशलता से जवाब देती हैं।",
      es: "Nuestro proceso de consulta optimizado y los informes completos te dan respuestas rápida y eficientemente.",
      fr: "Notre processus de consultation rationalisé et nos rapports complets vous donnent des réponses rapidement et efficacement.",
      de: "Unser optimierter Beratungsprozess und umfassende Berichte liefern Ihnen schnell und effizient Antworten.",
      zh: "我们精简的咨询流程和全面的报告让您快速高效地获得答案。",
      ar: "تمنحك عملية الاستشارة المبسطة والتقارير الشاملة لدينا إجابات بسرعة وكفاءة.",
      ru: "Наш оптимизированный процесс консультаций и подробные отчеты дают вам быстрые и эффективные ответы."
    },
  },
  rescalable: {
    title: {
      en: "Explore Advanced Vedic Concepts",
      hi: "उन्नत वैदिक अवधारणाओं का अन्वेषण करें",
      es: "Explora conceptos védicos avanzados",
      fr: "Explorez des concepts védiques avancés",
      de: "Erkunden Sie fortgeschrittene vedische Konzepte",
      zh: "探索高级吠陀概念",
      ar: "استكشف مفاهيم الفيدا المتقدمة",
      ru: "Изучайте продвинутые ведические концепции"
    },
    description: {
      en: "Move beyond the basics. Our advanced courses and workshops cover complex astrological principles for profound insights.",
      hi: "मूल बातों से आगे बढ़ें। हमारे उन्नत पाठ्यक्रम और कार्यशालाएं गहन अंतर्दृष्टि के लिए जटिल ज्योतिषीय सिद्धांतों को कवर करती हैं।",
      es: "Ve más allá de lo básico. Nuestros cursos y talleres avanzados cubren principios astrológicos complejos para obtener ideas profundas.",
      fr: "Allez au-delà des bases. Nos cours et ateliers avancés couvrent des principes astrologiques complexes pour des idées profondes.",
      de: "Gehen Sie über die Grundlagen hinaus. Unsere fortgeschrittenen Kurse und Workshops behandeln komplexe astrologische Prinzipien für tiefgreifende Einblicke.",
      zh: "超越基础。我们的高级课程和讲习班涵盖复杂的占星原理，带来深刻见解。",
      ar: "تجاوز الأساسيات. تغطي دوراتنا وورش العمل المتقدمة مبادئ التنجيم المعقدة لرؤى عميقة.",
      ru: "Выходите за рамки основ. Наши продвинутые курсы и мастер-классы охватывают сложные астрологические принципы для глубоких инсайтов."
    },
  },
  forDesigners: {
    title: {
      en: "Astrology Resources for Everyone",
      hi: "सभी के लिए ज्योतिष संसाधन",
      es: "Recursos de astrología para todos",
      fr: "Ressources d'astrologie pour tous",
      de: "Astrologieressourcen für alle",
      zh: "人人皆可用的占星资源",
      ar: "موارد التنجيم للجميع",
      ru: "Астрологические ресурсы для всех"
    },
    description: {
      en: "Access our rich library of articles, e-books, and tools to enhance your astrological journey.",
      hi: "अपनी ज्योतिषीय यात्रा को बढ़ाने के लिए लेखों, ई-पुस्तकों और उपकरणों की हमारी समृद्ध लाइब्रेरी तक पहुंचें।",
      es: "Accede a nuestra rica biblioteca de artículos, libros electrónicos y herramientas para mejorar tu viaje astrológico.",
      fr: "Accédez à notre riche bibliothèque d'articles, de livres électroniques et d'outils pour améliorer votre parcours astrologique.",
      de: "Greifen Sie auf unsere umfangreiche Bibliothek mit Artikeln, E-Books und Tools zu, um Ihre astrologische Reise zu bereichern.",
      zh: "访问我们丰富的文章、电子书和工具库，提升您的占星之旅。",
      ar: "الوصول إلى مكتبتنا الغنية بالمقالات والكتب الإلكترونية والأدوات لتعزيز رحلتك الفلكية.",
      ru: "Получите доступ к нашей богатой библиотеке статей, электронных книг и инструментов, чтобы улучшить свое астрологическое путешествие."
    },
  },
  simpleMockups: {
    title: {
      en: "Visualize Your Planetary Alignments",
      hi: "अपनी ग्रहीय संरेखण की कल्पना करें",
      es: "Visualiza tus alineaciones planetarias",
      fr: "Visualisez vos alignements planétaires",
      de: "Visualisieren Sie Ihre planetaren Ausrichtungen",
      zh: "可视化您的行星排列",
      ar: "تخيل محاذاة كواكبك",
      ru: "Визуализируйте свои планетарные выравнивания"
    },
    description: {
      en: "Interactive tools to see your birth chart and planetary transits come to life.",
      hi: "अपनी जन्म कुंडली और ग्रहों के गोचर को जीवंत देखने के लिए इंटरैक्टिव उपकरण।",
      es: "Herramientas interactivas para ver tu carta natal y los tránsitos planetarios cobrar vida.",
      fr: "Des outils interactifs pour voir votre carte du ciel et les transits planétaires prendre vie.",
      de: "Interaktive Tools, um Ihr Geburtshoroskop und planetare Transite zum Leben zu erwecken.",
      zh: "交互式工具让您的出生星盘和行星过境栩栩如生。",
      ar: "أدوات تفاعلية لرؤية خريطتك الفلكية وعبور الكواكب تنبض بالحياة.",
      ru: "Интерактивные инструменты для визуализации вашей натальной карты и транзитов планет."
    },
    laptopScreenshot: "/images/birth_chart_mockup.jpg"
  }
};

const floatingShapes = [
  { className: 'w-24 h-24 rounded-full bg-blue-200 opacity-60 blur-xl', style: { top: '5%', left: '10%' } },
  { className: 'w-32 h-32 rounded-full bg-pink-200 opacity-60 blur-xl', style: { top: '20%', right: '5%' } },
  { className: 'w-28 h-28 rounded-full bg-purple-200 opacity-60 blur-xl', style: { bottom: '15%', left: '20%' } },
  { className: 'w-20 h-20 rounded-full bg-yellow-200 opacity-60 blur-xl', style: { bottom: '5%', right: '25%' } },
  { className: 'w-40 h-40 rounded-full bg-green-200 opacity-60 blur-xl', style: { top: '50%', left: '5%' } },
  { className: 'w-36 h-36 rounded-full bg-red-200 opacity-60 blur-xl', style: { top: '40%', right: '15%' } },
];

const cuteGradients = [
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-white",
  "bg-white",
];

interface Service {
  title: { en: string; hi: string; es: string; fr: string; de: string; zh: string; ar: string; ru: string };
  description: { en: string; hi: string; es: string; fr: string; de: string; zh: string; ar: string; ru: string };
  fullDescription?: { en: string; hi: string; es: string; fr: string; de: string; zh: string; ar: string; ru: string };
  slug: string;
  icon: JSX.Element;
  price: number;
  themeColor: string;
}

const services: Service[] = [
  {
    title: {
      en: "Face Reading",
      hi: "चेहरे की पहेली",
      es: "Lectura de rostro",
      fr: "Lecture du visage",
      de: "Gesichtslesen",
      zh: "面相学",
      ar: "قراءة الوجه",
      ru: "Чтение по лицу"
    },
    description: {
      en: "Gain insights into your nature and destiny by analyzing facial lines.",
      hi: "आपके स्वभाव और तकदीर के बारे में जानकारी प्राप्त करने के लिए चेहरे की लकीरों का विश्लेषण।",
      es: "Obtén información sobre tu naturaleza y destino analizando las líneas faciales.",
      fr: "Obtenez des informations sur votre nature et votre destin en analysant les lignes du visage.",
      de: "Gewinnen Sie Einblicke in Ihre Natur und Ihr Schicksal durch die Analyse von Gesichtslinien.",
      zh: "通过分析面部线条了解你的性格和命运。",
      ar: "احصل على رؤى حول طبيعتك وقدرك من خلال تحليل خطوط الوجه.",
      ru: "Узнайте о своей природе и судьбе, анализируя линии лица."
    },
    fullDescription: {
      en: "Gain insights into your nature and destiny by analyzing facial lines. This ancient art reveals hidden personality traits and future tendencies, guiding you towards self-discovery and a harmonious life. Discover the deeper meanings behind your facial features and understand their cosmic influence.",
      hi: "नक्षत्र अंतर्दृष्टि के माध्यम से अपने कर्मिक पैटर्न और आध्यात्मिक मार्ग की गहरी समझ प्राप्त करें। जानें कि आकाशीय पिंड आपके भाग्य को कैसे प्रभावित करते हैं। यह प्राचीन कला छिपे हुए व्यक्तित्व लक्षणों और भविष्य की प्रवृत्तियों को प्रकट करती है, जिससे आपको आत्म-खोज और एक सामंजस्यपूर्ण जीवन की ओर मार्गदर्शन मिलता है। अपने चेहरे की विशेषताओं के पीछे छिपे गहरे अर्थों को जानें और उनके ब्रह्मांडीय प्रभाव को समझें।",
      es: "Obtén información sobre tu naturaleza y destino analizando las líneas faciales. Este antiguo arte revela rasgos de personalidad ocultos y tendencias futuras, guiándote hacia el autodescubrimiento y una vida armoniosa. Descubre los significados más profundos detrás de tus rasgos faciales y comprende su influencia cósmica.",
      fr: "Obtenez des informations sur votre nature et votre destin en analysant les lignes du visage. Cet art ancien révèle des traits de personnalité cachés et des tendances futures, vous guidant vers la découverte de soi et une vie harmonieuse. Découvrez les significations plus profondes derrière vos traits du visage et comprenez leur influence cosmique.",
      de: "Gewinnen Sie Einblicke in Ihre Natur und Ihr Schicksal durch die Analyse von Gesichtslinien. Diese alte Kunst offenbart verborgene Persönlichkeitsmerkmale und zukünftige Tendenzen und führt Sie zur Selbstfindung und zu einem harmonischen Leben. Entdecken Sie die tieferen Bedeutungen hinter Ihren Gesichtszügen und verstehen Sie ihren kosmischen Einfluss.",
      zh: "通过分析面部线条了解你的性格和命运。这一古老的艺术揭示了隐藏的个性特征和未来趋势，引导你走向自我发现和和谐生活。发现你面部特征背后的深层含义，理解它们的宇宙影响。",
      ar: "احصل على رؤى حول طبيعتك وقدرك من خلال تحليل خطوط الوجه. يكشف هذا الفن القديم عن سمات شخصية خفية واتجاهات مستقبلية، ويوجهك نحو اكتشاف الذات وحياة متناغمة. اكتشف المعاني الأعمق وراء ملامح وجهك وافهم تأثيرها الكوني.",
      ru: "Узнайте о своей природе и судьбе, анализируя линии лица. Это древнее искусство раскрывает скрытые черты характера и будущие тенденции, направляя вас к самопознанию и гармоничной жизни. Откройте для себя более глубокие значения своих черт лица и поймите их космическое влияние."
    },
    slug: "face-reading",
    icon: <Moon className="w-12 h-12 text-black" />,
    price: 1999,
    themeColor: '#F5F5DC',
  },
  {
    title: {
      en: "Horoscope",
      hi: "जन्म कुंडली",
      es: "Horóscopo",
      fr: "Horoscope",
      de: "Horoskop",
      zh: "星座运势",
      ar: "الأبراج",
      ru: "Гороскоп"
    },
    description: {
      en: "Customized horoscope readings for career, love, and health predictions.",
      hi: "करियर, प्रेम और स्वास्थ्य की भविष्यवाणियों के लिए अनुकूलित जन्म कुंडली पठन।",
      es: "Lecturas de horóscopos personalizadas para predicciones de carrera, amor y salud.",
      fr: "Lectures d'horoscope personnalisées pour les prédictions de carrière, d'amour et de santé.",
      de: "Individuelle Horoskop-Lesungen für Karriere-, Liebes- und Gesundheitsvorhersagen.",
      zh: "为事业、爱情和健康定制的星座解读。",
      ar: "قراءات الأبراج المخصصة للتنبؤات المهنية والعاطفية والصحية.",
      ru: "Индивидуальные гороскопы для прогнозов в карьере, любви и здоровье."
    },
    fullDescription: {
      en: "Customized horoscope readings for career, love, and health predictions. Our expert astrologers provide detailed analysis of your birth chart, offering guidance on crucial life decisions and future opportunities. Get daily, weekly, and monthly insights to navigate your path.",
      hi: "करियर, प्रेम और स्वास्थ्य की भविष्यवाणियों के लिए अनुकूलित जन्म कुंडली पठन। हमारे विशेषज्ञ ज्योतिषी आपकी जन्म कुंडली का विस्तृत विश्लेषण प्रदान करते हैं, महत्वपूर्ण जीवन निर्णयों और भविष्य के अवसरों पर मार्गदर्शन प्रदान करते हैं। दैनिक, साप्ताहिक और मासिक अंतर्दृष्टि प्राप्त करें।",
      es: "Lecturas de horóscopos personalizadas para predicciones de carrera, amor y salud. Nuestros astrólogos expertos brindan un análisis detallado de tu carta natal, ofreciendo orientación sobre decisiones cruciales de la vida y oportunidades futuras. Obtén información diaria, semanal y mensual para navegar tu camino.",
      fr: "Lectures d'horoscope personnalisées pour les prédictions de carrière, d'amour et de santé. Nos astrologues experts fournissent une analyse détaillée de votre carte du ciel, offrant des conseils sur les décisions de vie cruciales et les opportunités futures. Obtenez des informations quotidiennes, hebdomadaires et mensuelles pour naviguer sur votre chemin.",
      de: "Individuelle Horoskop-Lesungen für Karriere-, Liebes- und Gesundheitsvorhersagen. Unsere erfahrenen Astrologen bieten eine detaillierte Analyse Ihres Geburtshoroskops und geben Orientierung bei wichtigen Lebensentscheidungen und zukünftigen Möglichkeiten. Erhalten Sie tägliche, wöchentliche und monatliche Einblicke, um Ihren Weg zu navigieren.",
      zh: "为事业、爱情和健康定制的星座解读。我们的专家占星师会详细分析你的出生星盘，为你的人生决策和未来机会提供指导。获取每日、每周和每月的洞察，助你顺利前行。",
      ar: "قراءات الأبراج المخصصة للتنبؤات المهنية والعاطفية والصحية. يقدم خبراؤنا الفلكيون تحليلاً مفصلاً لخريطتك الفلكية، ويوفرون إرشادات حول قرارات الحياة الحاسمة والفرص المستقبلية. احصل على رؤى يومية وأسبوعية وشهرية للتنقل في طريقك.",
      ru: "Индивидуальные гороскопы для прогнозов в карьере, любви и здоровье. Наши опытные астрологи предоставляют подробный анализ вашей натальной карты, помогая принимать важные жизненные решения и использовать будущие возможности. Получайте ежедневные, еженедельные и ежемесячные советы для уверенного движения по жизни."
    },
    slug: "horoscope",
    icon: <Sun className="w-12 h-12 text-black" />,
    price: 2499,
    themeColor: '#F0F8FF',
  },
  {
    title: {
      en: "Vastu Shastra",
      hi: "वास्तु शास्त्र",
      es: "Vastu Shastra",
      fr: "Vastu Shastra",
      de: "Vastu Shastra",
      zh: "风水学",
      ar: "فاستو شاسترا",
      ru: "Васту Шастра"
    },
    description: {
      en: "Suggestions on home and office design based on Vastu principles for prosperity and peace.",
      hi: "समृद्धि (संपन्नता) और शांति के लिए वास्तु सिद्धांतों पर आधारित घर और दफ्तर के डिजाइन पर सुझाव।",
      es: "Sugerencias sobre el diseño del hogar y la oficina basadas en los principios de Vastu para la prosperidad y la paz.",
      fr: "Suggestions sur la conception de la maison et du bureau basées sur les principes du Vastu pour la prospérité et la paix.",
      de: "Vorschläge für die Gestaltung von Haus und Büro nach Vastu-Prinzipien für Wohlstand und Frieden.",
      zh: "基于风水原则的家居和办公室设计建议，带来繁荣与和平。",
      ar: "اقتراحات لتصميم المنزل والمكتب بناءً على مبادئ فاستو لتحقيق الازدهار والسلام.",
      ru: "Рекомендации по дизайну дома и офиса на основе принципов Васту для процветания и мира."
    },
    fullDescription: {
      en: "Suggestions on home and office design based on Vastu principles for prosperity and peace. Optimize your living and working spaces to enhance positive energy flow, leading to better health, wealth, and relationships. Create a harmonious environment that supports your well-being.",
      hi: "समृद्धि (संपन्नता) और शांति के लिए वास्तु सिद्धांतों पर आधारित घर और दफ्तर के डिजाइन पर सुझाव। सकारात्मक ऊर्जा प्रवाह को बढ़ाने के लिए अपने रहने और काम करने की जगहों को अनुकूलित करें, जिससे बेहतर स्वास्थ्य, धन और संबंध प्राप्त हों। एक सामंजस्यपूर्ण वातावरण बनाएं जो आपके कल्याण का समर्थन करे।",
      es: "Sugerencias sobre el diseño del hogar y la oficina basadas en los principios de Vastu para la prosperidad y la paz. Optimiza tus espacios de vida y trabajo para mejorar el flujo de energía positiva, lo que conduce a una mejor salud, riqueza y relaciones. Crea un entorno armonioso que apoye tu bienestar.",
      fr: "Suggestions sur la conception de la maison et du bureau basées sur les principes du Vastu pour la prospérité et la paix. Optimisez vos espaces de vie et de travail pour améliorer le flux d'énergie positive, ce qui conduit à une meilleure santé, richesse et relations. Créez un environnement harmonieux qui soutient votre bien-être.",
      de: "Vorschläge für die Gestaltung von Haus und Büro nach Vastu-Prinzipien für Wohlstand und Frieden. Optimieren Sie Ihre Wohn- und Arbeitsräume, um den Fluss positiver Energie zu verbessern, was zu besserer Gesundheit, Wohlstand und Beziehungen führt. Schaffen Sie eine harmonische Umgebung, die Ihr Wohlbefinden unterstützt.",
      zh: "基于风水原则的家居和办公室设计建议，带来繁荣与和平。优化您的生活和工作空间，增强正能量流动，带来更好的健康、财富和人际关系。营造支持您幸福的和谐环境。",
      ar: "اقتراحات لتصميم المنزل والمكتب بناءً على مبادئ فاستو لتحقيق الازدهار والسلام. قم بتحسين مساحات المعيشة والعمل لديك لتعزيز تدفق الطاقة الإيجابية، مما يؤدي إلى صحة أفضل وثروة وعلاقات. أنشئ بيئة متناغمة تدعم رفاهيتك.",
      ru: "Рекомендации по дизайну дома и офиса на основе принципов Васту для процветания и мира. Оптимизируйте свои жилые и рабочие пространства для улучшения потока положительной энергии, что приведет к лучшему здоровью, богатству и отношениям. Создайте гармоничную среду, поддерживающую ваше благополучие."
    },
    slug: "vastu-shastra",
    icon: <Home className="w-12 h-12 text-black" />,
    price: 1499,
    themeColor: '#F5FFFA',
  },
  {
    title: {
      en: "Astrocartography",
      hi: "भौतिक स्थल ज्योतिष",
      es: "Astrocartografía",
      fr: "Astrocartographie",
      de: "Astrokartographie",
      zh: "天体地理学",
      ar: "الخرائط الفلكية",
      ru: "Астрокартография"
    },
    description: {
      en: "Discover ideal locations for work, love, and personal growth.",
      hi: "काम, प्यार और व्यक्तिगत विकास के लिए आदर्श स्थान (स्थल) खोजें।",
      es: "Descubre ubicaciones ideales para el trabajo, el amor y el crecimiento personal.",
      fr: "Découvrez des lieux idéaux pour le travail, l'amour et le développement personnel.",
      de: "Entdecken Sie ideale Orte für Arbeit, Liebe und persönliches Wachstum.",
      zh: "发现适合工作、爱情和个人成长的理想地点。",
      ar: "اكتشف المواقع المثالية للعمل والحب والنمو الشخصي.",
      ru: "Откройте для себя идеальные места для работы, любви и личного роста."
    },
    slug: "astrocartography",
    icon: <Map className="w-12 h-12 text-black" />,
    price: 1799,
    themeColor: '#FFF0F5',
  },
];

interface RecentPost {
  title: { en: string; hi: string; };
  imageUrl: string;
  date: string;
  slug: string;
}

const recentPosts: RecentPost[] = [
  {
    title: { en: "Understanding Your Birth Chart", hi: "अपनी जन्म कुंडली को समझना" },
    imageUrl: "/images/recent-post-1.jpg",
    date: "10 May, 2024",
    slug: "understanding-birth-chart",
  },
  {
    title: { en: "The Power of Gemstones", hi: "रत्न का महत्व" },
    imageUrl: "/images/recent-post-2.jpg",
    date: "09 May, 2024",
    slug: "power-of-gemstones",
  },
  {
    title: { en: "Meditation for Astrological Balance", hi: "ज्योतिषीय संतुलन के लिए ध्यान" },
    imageUrl: "/images/recent-post-3.jpg",
    date: "08 May, 2024",
    slug: "meditation-astrological-balance",
  },
  {
    title: { en: "Navigating Retrograde Periods", hi: "वक्री काल को समझना" },
    imageUrl: "/images/recent-post-4.jpg",
    date: "07 May, 2024",
    slug: "navigating-retrograde-periods",
  },
];


export function ServicesOverview() {
  const [showFullDescription, setShowFullDescription] = useState<{ [key: string]: boolean }>({});
  const { t, lang } = useLanguage();

  const toggleDescription = (slug: string) => {
    setShowFullDescription(prevState => ({
      ...prevState,
      [slug]: !prevState[slug],
    }));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section className="min-h-screen py-16 bg-white font-sans">
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* For Developers / Beginners in Astrology -> Face Reading Service */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative flex flex-col rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl p-6 text-center ${cuteGradients[0]}`}
          >
            {/* Cart Icon at top-right */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
              <Link href="/cart" passHref>
                <ShoppingBag className="w-6 h-6 text-black" />
              </Link>
            </div>
            <CardContent className="flex-grow p-0 flex flex-col justify-between h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md">
                      {services[0].icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {services[0].title[lang] || services[0].title.en}
                  </h3>
                  <p className="text-black text-sm mb-4">
                    {showFullDescription[services[0].slug] && services[0].fullDescription ? (services[0].fullDescription[lang] || services[0].fullDescription.en) : truncateText(services[0].description[lang] || services[0].description.en, 100)}
                  </p>
                  {services[0].fullDescription && (
                    <Button
                      onClick={() => toggleDescription(services[0].slug)}
                      className="mt-2 bg-transparent hover:bg-gray-100 text-blue-600 hover:text-blue-700 py-1 px-2 rounded"
                    >
                      {showFullDescription[services[0].slug] ? (lang === 'en' ? 'Read Less' : t('readLess')) : (lang === 'en' ? 'Read More' : t('readMore'))}
                    </Button>
                  )}
                  <div className="mb-4 mt-2">
                    <span className="text-3xl font-bold text-black">₹{services[0].price}</span>
                  </div>
                  <div className="relative w-full flex justify-center">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <div className="rounded-full bg-black w-full h-14"></div>
                    </div>
                    <Button className="relative z-10 w-full bg-black text-white rounded-full py-4 shadow-lg hover:bg-gray-800 transition duration-300">
                      {lang === 'en' ? 'Buy Now' : t('buyNow')}
                    </Button>
                  </div>
                </CardContent>
          </motion.div>

          {/* Cards colored with Mockups - Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1 flex items-center justify-center"
          >
            <div className="flex justify-center items-center w-full py-8 my-8">
              <span className="relative inline-flex items-center">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-8 md:px-16 py-14 bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] rounded-full w-auto h-auto z-0" style={{ minWidth: 'calc(100% + 64px)' }}></span>
                <h1 className="relative z-10 text-4xl md:text-5xl font-extrabold font-serif text-gray-900 text-center tracking-tight drop-shadow-lg px-8">
                  {t('Explore Key Offerings')}
                </h1>
              </span>
            </div>
          </motion.div>

          {/* Paste cool photos! / Daily Horoscope Insights */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`${cuteGradients[1]} rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between`}
          >
            <h3 className="text-xl font-bold text-black mb-2 text-center">{snapshotContent.pasteCoolPhotos.title[lang] || snapshotContent.pasteCoolPhotos.title.en}</h3>
            <p className="text-black text-sm mb-4 text-center">{snapshotContent.pasteCoolPhotos.description[lang] || snapshotContent.pasteCoolPhotos.description.en}</p>
            <div className="relative w-full h-32 mb-4 rounded-xl overflow-hidden">
              <Image src={snapshotContent.pasteCoolPhotos.imageUrl} alt="Horoscope Daily" fill style={{ objectFit: 'cover' }} />
            </div>
            <Link href="/daily-horoscope" passHref>
              <Button className="btn-grad rounded-full text-sm font-semibold">
                {lang === 'en' ? 'Learn More' : t('learnMore')} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Fits for Catlovers / Zodiac Sign Compatibility -> Horoscope Service */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`relative flex flex-col rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl p-6 text-center ${cuteGradients[2]}`}
          >
            {/* Cart Icon at top-right */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
              <Link href="/cart" passHref>
                <ShoppingBag className="w-6 h-6 text-black" />
              </Link>
            </div>
            <CardContent className="flex-grow p-0 flex flex-col justify-between h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md">
                      {services[1].icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {services[1].title[lang] || services[1].title.en}
                  </h3>
                  <p className="text-black text-sm mb-4">
                    {showFullDescription[services[1].slug] && services[1].fullDescription ? (services[1].fullDescription[lang] || services[1].fullDescription.en) : truncateText(services[1].description[lang] || services[1].description.en, 100)}
                  </p>
                  {services[1].fullDescription && (
                    <Button
                      onClick={() => toggleDescription(services[1].slug)}
                      className="mt-2 bg-transparent hover:bg-gray-100 text-blue-600 hover:text-blue-700 py-1 px-2 rounded"
                    >
                      {showFullDescription[services[1].slug] ? (lang === 'en' ? 'Read Less' : t('readLess')) : (lang === 'en' ? 'Read More' : t('readMore'))}
                    </Button>
                  )}
                  <div className="mb-4 mt-2">
                    <span className="text-3xl font-bold text-black">₹{services[1].price}</span>
                  </div>
                  <div className="relative w-full flex justify-center">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <div className="rounded-full bg-black w-full h-14"></div>
                    </div>
                    <Button className="relative z-10 w-full bg-black text-white rounded-full py-4 shadow-lg hover:bg-gray-800 transition duration-300">
                      {lang === 'en' ? 'Buy Now' : t('buyNow')}
                    </Button>
                  </div>
                </CardContent>
          </motion.div>

          {/* Coffeinia / Personalized Astrology App */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`relative rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center overflow-hidden ${cuteGradients[3]}`}
          >
            <h3 className="text-2xl font-bold text-black mb-2 text-center">{snapshotContent.coffeinia.title[lang] || snapshotContent.coffeinia.title.en}</h3>
            <p className="text-black text-sm mb-4 text-center">{snapshotContent.coffeinia.description[lang] || snapshotContent.coffeinia.description.en}</p>
            <div className="relative w-48 h-96">
              <Image src={snapshotContent.coffeinia.appScreenshot} alt="App Screenshot" fill style={{ objectFit: 'contain' }} />
            </div>
            <div className="space-y-2 w-full mt-4">
                <Button className="btn-grad rounded-full text-sm font-semibold">
                  {lang === 'en' ? 'Buy Now' : t('buyNow')}
                </Button>
            </div>
          </motion.div>

          {/* Equip a team / Equip Yourself with Cosmic Knowledge & Save Time, Gain Clarity */}
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cuteGradients[4]}`}
            >
              <div className="flex items-center mb-4">
                <ArrowRight className="w-6 h-6 text-black mr-2" />
                <h3 className="text-xl font-bold text-black">{snapshotContent.equipATeam.title[lang] || snapshotContent.equipATeam.title.en}</h3>
              </div>
              <p className="text-black text-sm mb-4">{snapshotContent.equipATeam.description[lang] || snapshotContent.equipATeam.description.en}</p>
              <Link href="/courses" passHref className="ml-auto">
                <Button className="btn-grad rounded-full text-sm font-semibold">
                  {lang === 'en' ? 'Explore Courses' : t('exploreCourses')}
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cuteGradients[5]}`}
            >
              <div className="flex items-center mb-4">
                <ArrowRight className="w-6 h-6 text-black mr-2" />
                <h3 className="text-xl font-bold text-black">{snapshotContent.saveTime.title[lang] || snapshotContent.saveTime.title.en}</h3>
              </div>
              <p className="text-black text-sm mb-4">{snapshotContent.saveTime.description[lang] || snapshotContent.saveTime.description.en}</p>
              <Link href="/consultation" passHref className="ml-auto">
                <Button className="btn-grad rounded-full text-sm font-semibold">
                  {lang === 'en' ? 'Book Now' : t('bookNow')}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* When You're Thinking It's Your Potential Limit To Reach a Success -> Vastu Shastra Service */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`relative flex flex-col rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl p-6 text-center ${cuteGradients[6]}`}
          >
            {/* Cart Icon at top-right */}
            <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
              <Link href="/cart" passHref>
                <ShoppingBag className="w-6 h-6 text-black" />
              </Link>
            </div>
            <CardContent className="flex-grow p-0 flex flex-col justify-between h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-white shadow-md">
                      {services[2].icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {services[2].title[lang] || services[2].title.en}
                  </h3>
                  <p className="text-black text-sm mb-4">
                    {showFullDescription[services[2].slug] && services[2].fullDescription ? (services[2].fullDescription[lang] || services[2].fullDescription.en) : truncateText(services[2].description[lang] || services[2].description.en, 100)}
                  </p>
                  {services[2].fullDescription && (
                    <Button
                      onClick={() => toggleDescription(services[2].slug)}
                      className="mt-2 bg-transparent hover:bg-gray-100 text-blue-600 hover:text-blue-700 py-1 px-2 rounded"
                    >
                      {showFullDescription[services[2].slug] ? (lang === 'en' ? 'Read Less' : t('readLess')) : (lang === 'en' ? 'Read More' : t('readMore'))}
                    </Button>
                  )}
                  <div className="mb-4 mt-2">
                    <span className="text-3xl font-bold text-black">₹{services[2].price}</span>
                  </div>
                  <div className="relative w-full flex justify-center">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <div className="rounded-full bg-black w-full h-14"></div>
                    </div>
                    <Button className="relative z-10 w-full bg-black text-white rounded-full py-4 shadow-lg hover:bg-gray-800 transition duration-300">
                      {lang === 'en' ? 'Buy Now' : t('buyNow')}
                    </Button>
                  </div>
                </CardContent>
          </motion.div>

          {/* Simple Mockups / Visualize Your Planetary Alignments */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`relative rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center overflow-hidden ${cuteGradients[7]}`}
          >
            <h3 className="text-2xl font-bold text-black mb-2 text-center">{snapshotContent.simpleMockups.title[lang] || snapshotContent.simpleMockups.title.en}</h3>
            <p className="text-black text-sm mb-4 text-center">{snapshotContent.simpleMockups.description[lang] || snapshotContent.simpleMockups.description.en}</p>
            <div className="relative w-full h-48">
              <Image src={snapshotContent.simpleMockups.laptopScreenshot} alt="Laptop Screenshot" fill style={{ objectFit: 'contain' }} />
            </div>
          </motion.div>

          {/* Rescalable / Explore Advanced Vedic Concepts & For Designers / Astrology Resources */}
          <div className="grid grid-cols-1 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cuteGradients[8]}`}
            >
              <h3 className="text-xl font-bold text-black mb-2">{snapshotContent.rescalable.title[lang] || snapshotContent.rescalable.title.en}</h3>
              <p className="text-black text-sm mb-4">{snapshotContent.rescalable.description[lang] || snapshotContent.rescalable.description.en}</p>
              <Link href="/advanced-courses" passHref>
                <Button className="btn-grad rounded-full text-sm font-semibold mt-auto">
                  {lang === 'en' ? 'Download Resources' : t('downloadResources')}
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col justify-between ${cuteGradients[9]}`}
            >
              <h3 className="text-xl font-bold text-black mb-2">{snapshotContent.forDesigners.title[lang] || snapshotContent.forDesigners.title.en}</h3>
              <p className="text-black text-sm mb-4">{snapshotContent.forDesigners.description[lang] || snapshotContent.forDesigners.description.en}</p>
              <div className="flex justify-end mt-auto">
                <Image src="/images/designer_icon.png" alt="Designer Icon" width={80} height={80} className="opacity-50" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}