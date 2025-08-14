// Comprehensive services data for the astrology website
// This file contains all service information including pricing, descriptions, features, and details

// Helper function to generate default detailed description if not provided
function getDefaultDetailedDescription(service) {
  return `
    <div style="color: #374151; line-height: 1.8;">
      <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">About ${service.title}</h3>
      <p style="margin-bottom: 1rem; color: #4b5563;">${service.description}</p>
      
      <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Key Features:</h4>
      <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Expert astrologers with years of experience</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Personalized analysis based on your birth chart</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Traditional Vedic methodology</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Practical remedies and solutions</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Confidential and compassionate guidance</li>
      </ul>
      
      <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Benefits:</h4>
      <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Gain clarity and direction in life</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Make informed decisions with cosmic guidance</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Understand your strengths and challenges</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Receive effective remedial measures</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Achieve balance and harmony in life</li>
      </ul>
      
      <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">What to Expect:</h4>
      <p style="margin-bottom: 1rem; color: #4b5563;">Our consultation process is thorough and personalized. We analyze your birth details, current planetary positions, and life circumstances to provide accurate and helpful guidance. Each session includes practical advice and remedial measures tailored to your specific needs.</p>
    </div>
  `;
}

export const services = [
  {
    id: 'astrology',
    slug: 'astrology',
    title: 'Vedic Astrology Consultation',
    shortDescription: 'Comprehensive Vedic astrology consultation to understand your life path, personality, and future guidance.',
    description: 'Unlock the mysteries of the stars with our expert astrology services—personalized horoscopes, birth chart analysis, compatibility readings, and more, all designed to illuminate your path and empower your journey.',
    detailedDescription: `
      <div style="color: #374151; line-height: 1.8;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Vedic Astrology: Your Cosmic Compass</h3>
        <p style="margin-bottom: 1rem; color: #4b5563;">Astrology is one of humanity's oldest spiritual sciences—a profound system of understanding the self and the universe through the movements and relationships of celestial bodies. At Nakshatra Gyaan, we honor this timeless Vedic tradition by fusing it with thoughtful modern interpretation.</p>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">What We Analyze:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Birth Chart (Janam Kundali) Analysis</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Planetary Positions and Their Effects</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Dasha (Planetary Periods) Analysis</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Transit Predictions</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Yogas and Doshas in Your Chart</li>
        </ul>
      </div>
    `,
    price: 1500,
    originalPrice: 2500,
    discount: '40% OFF',
    duration: '45-60 minutes',
    consultationType: 'Video/Audio Call',
    category: 'astrology',
    tags: ['vedic', 'consultation', 'birth-chart', 'predictions'],
    rating: 4.8,
    reviewsCount: 1250,
    ordersCount: 2100,
    features: [
      'Detailed birth chart analysis',
      'Personalized predictions',
      'Life guidance and remedies',
      'Future planning insights',
      'Career and relationship advice'
    ],
    images: [
      '/images/birth_chart_mockup.jpg',
      '/images/astrology_understanding.jpg',
      '/images/astrowellness.jpg'
    ],
    faqs: [
      {
        question: 'What is Vedic Astrology?',
        answer: 'Vedic Astrology is an ancient Indian system of astrology that uses the sidereal zodiac and focuses on karma, dharma, and spiritual evolution along with practical life guidance.'
      },
      {
        question: 'What information do I need to provide?',
        answer: 'You need to provide your exact birth date, time, and place of birth for accurate chart calculation and analysis.'
      },
      {
        question: 'How accurate are the predictions?',
        answer: 'Vedic astrology is highly accurate when performed by experienced astrologers. The accuracy depends on precise birth data and the astrologer\'s expertise.'
      }
    ]
  },
  {
    id: 'business-astrology',
    slug: 'business-astrology',
    title: 'Business Astrology Consultation',
    shortDescription: 'Strategic business guidance using Vedic astrology principles for entrepreneurs and business owners.',
    description: 'Leverage cosmic intelligence for business success. Our business astrology consultation helps entrepreneurs make strategic decisions, choose auspicious timing, and overcome business challenges.',
    price: 2500,
    originalPrice: 4000,
    discount: '38% OFF',
    duration: '60-75 minutes',
    consultationType: 'Video/Audio Call',
    category: 'business',
    tags: ['business', 'entrepreneurship', 'timing', 'strategy'],
    rating: 4.7,
    reviewsCount: 890,
    ordersCount: 1450,
    features: [
      'Business timing analysis',
      'Partnership compatibility',
      'Market trend predictions',
      'Investment guidance',
      'Growth strategies'
    ],
    images: [
      '/images/course-1.jpg',
      '/images/astrowellness.jpg',
      '/images/course-2.jpg'
    ]
  },
  {
    id: 'career-guidance',
    slug: 'career-guidance',
    title: 'Career Guidance & Planning',
    shortDescription: 'Professional career guidance based on your astrological profile and planetary influences.',
    description: 'Discover your ideal career path through astrological analysis. Get insights into suitable professions, optimal timing for career changes, and strategies for professional growth.',
    price: 1800,
    originalPrice: 2800,
    discount: '36% OFF',
    duration: '50-60 minutes',
    consultationType: 'Video/Audio Call',
    category: 'career',
    tags: ['career', 'profession', 'job-change', 'growth'],
    rating: 4.9,
    reviewsCount: 1100,
    ordersCount: 1890,
    features: [
      'Career path analysis',
      'Job change timing',
      'Professional strengths identification',
      'Interview and promotion timing',
      'Workplace harmony solutions'
    ],
    images: [
      '/images/course-3.jpg',
      '/images/astrology_understanding.jpg',
      '/images/course-4.jpg'
    ]
  },
  {
    id: 'career-job',
    slug: 'career-job',
    title: 'Career & Job Astrology',
    shortDescription: 'Comprehensive career and job analysis for professional success and fulfillment.',
    description: 'Navigate your professional path with cosmic clarity. Our expert astrologers provide personalized guidance to help you make informed career decisions, identify opportunities, and overcome workplace challenges.',
    price: 2100,
    originalPrice: 3500,
    discount: '40% OFF',
    duration: '60-75 minutes',
    consultationType: 'Video/Audio Call',
    category: 'career',
    tags: ['career', 'job', 'professional-guidance', 'success'],
    rating: 4.8,
    reviewsCount: 950,
    ordersCount: 1650,
    features: [
      'Detailed career analysis',
      'Job market predictions',
      'Professional networking guidance',
      'Salary negotiation timing',
      'Career transformation strategies'
    ],
    images: [
      '/images/course-3.jpg',
      '/images/astrowellness.jpg',
      '/images/course-6.jpg'
    ]
  },
  {
    id: 'chat-with-astrologer',
    slug: 'chat-with-astrologer',
    title: 'Chat with Astrologer',
    shortDescription: 'Instant chat consultation with experienced astrologers for quick guidance and solutions.',
    description: 'Get immediate astrological guidance through our chat service. Perfect for quick questions, urgent concerns, or when you need instant cosmic insights.',
    price: 500,
    originalPrice: 800,
    discount: '38% OFF',
    duration: '30 minutes',
    consultationType: 'Text Chat',
    category: 'instant',
    tags: ['chat', 'instant', 'quick-guidance', 'online'],
    rating: 4.6,
    reviewsCount: 2100,
    ordersCount: 3500,
    features: [
      'Instant responses',
      'Quick problem solving',
      'Affordable consultation',
      'Text-based guidance',
      'Flexible timing'
    ],
    images: [
      '/images/astrology_app.jpg',
      '/images/astrology_app_mockup.jpg',
      '/images/cosmiccalendar.png'
    ]
  },
  {
    id: 'child-astrology',
    slug: 'child-astrology',
    title: 'Child Astrology & Guidance',
    shortDescription: 'Specialized astrological consultation for children\'s development, education, and future planning.',
    description: 'Understand your child\'s inherent nature, talents, and potential through Vedic astrology. Get guidance on education, career planning, and nurturing their unique gifts.',
    price: 1600,
    originalPrice: 2400,
    discount: '33% OFF',
    duration: '45-60 minutes',
    consultationType: 'Video/Audio Call',
    category: 'family',
    tags: ['children', 'parenting', 'education', 'development'],
    rating: 4.9,
    reviewsCount: 750,
    ordersCount: 1200,
    features: [
      'Child\'s personality analysis',
      'Educational guidance',
      'Talent identification',
      'Health and development insights',
      'Future planning advice'
    ],
    images: [
      '/images/birth_chart_mockup.jpg',
      '/images/course-6.jpg',
      '/images/astrology_understanding.jpg'
    ]
  },
  {
    id: 'couple-compatibility',
    slug: 'couple-compatibility',
    title: 'Couple Compatibility Analysis',
    shortDescription: 'Comprehensive compatibility analysis for couples to understand relationship dynamics and harmony.',
    description: 'Discover the cosmic connection between you and your partner. Our compatibility analysis reveals relationship strengths, challenges, and guidance for lasting harmony.',
    price: 1900,
    originalPrice: 3000,
    discount: '37% OFF',
    duration: '60-75 minutes',
    consultationType: 'Video/Audio Call',
    category: 'relationships',
    tags: ['compatibility', 'relationships', 'marriage', 'love'],
    rating: 4.8,
    reviewsCount: 1300,
    ordersCount: 2000,
    features: [
      'Detailed compatibility score',
      'Relationship dynamics analysis',
      'Conflict resolution guidance',
      'Marriage timing predictions',
      'Harmony enhancement tips'
    ]
  },
  {
    id: 'daily-horoscope',
    slug: 'daily-horoscope',
    title: 'Personalized Daily Horoscope',
    shortDescription: 'Get your personalized daily horoscope based on your birth chart for accurate daily guidance.',
    description: 'Start your day with cosmic clarity. Our personalized daily horoscope provides insights into opportunities, challenges, and auspicious timings for the day.',
    price: 299,
    originalPrice: 500,
    discount: '40% OFF',
    duration: 'Daily Updates',
    consultationType: 'Digital Report',
    category: 'horoscope',
    tags: ['daily', 'horoscope', 'guidance', 'predictions'],
    rating: 4.5,
    reviewsCount: 3200,
    ordersCount: 5500,
    features: [
      'Personalized predictions',
      'Daily lucky factors',
      'Caution and advice',
      'Auspicious timings',
      'Health and wealth insights'
    ],
    images: [
      '/images/cosmiccalendar.png',
      '/images/horoscope_daily.jpg',
      '/images/course-4.jpg'
    ]
  },
  {
    id: 'grah-shanti',
    slug: 'grah-shanti',
    title: 'Grah Shanti Puja Services',
    shortDescription: 'Sacred planetary peace rituals to harmonize cosmic energies and remove planetary afflictions.',
    description: 'Harmonize planetary energies and mitigate negative influences with traditional Grah Shanti Puja. This sacred ritual brings peace, prosperity, and balance to your life.',
    price: 3500,
    originalPrice: 5000,
    discount: '30% OFF',
    duration: '2-3 hours',
    consultationType: 'Online/Offline Puja',
    category: 'remedies',
    tags: ['puja', 'remedies', 'planetary-peace', 'rituals'],
    rating: 4.9,
    reviewsCount: 680,
    ordersCount: 950,
    features: [
      'Complete puja ritual',
      'Planetary peace mantras',
      'Sacred offerings',
      'Energized prasadam',
      'Video documentation'
    ],
    images: [
      '/images/course-2.jpg',
      '/images/astrowellness.jpg',
      '/images/course-1.jpg'
    ]
  },
  {
    id: 'health-astrology',
    slug: 'health-astrology',
    title: 'Health & Medical Astrology',
    shortDescription: 'Astrological analysis for health concerns, disease prevention, and wellness guidance.',
    description: 'Understand your health patterns through medical astrology. Get insights into potential health issues, preventive measures, and optimal timing for treatments.',
    price: 2000,
    originalPrice: 3200,
    discount: '38% OFF',
    duration: '60 minutes',
    consultationType: 'Video/Audio Call',
    category: 'health',
    tags: ['health', 'medical', 'wellness', 'prevention'],
    rating: 4.7,
    reviewsCount: 820,
    ordersCount: 1350,
    features: [
      'Health pattern analysis',
      'Disease prediction and prevention',
      'Treatment timing guidance',
      'Dietary recommendations',
      'Wellness strategies'
    ]
  },
  {
    id: 'kundali-matching',
    slug: 'kundali-matching',
    title: 'Kundali Matching for Marriage',
    shortDescription: 'Traditional Vedic marriage compatibility analysis through comprehensive horoscope matching.',
    description: 'Discover the science and sacred art of Vedic compatibility. Our expert astrologers blend tradition and modern insight to guide you toward a harmonious, blessed union.',
    price: 2100,
    originalPrice: 3500,
    discount: '40% OFF',
    duration: '75-90 minutes',
    consultationType: 'Video/Audio Call',
    category: 'marriage',
    tags: ['marriage', 'matching', 'compatibility', 'union'],
    rating: 4.9,
    reviewsCount: 1850,
    ordersCount: 2800,
    features: [
      'Ashtakoot matching',
      'Mangal dosha analysis',
      'Guna compatibility',
      'Marriage muhurat',
      'Remedial solutions'
    ],
    images: [
      '/images/birth_chart_mockup.jpg',
      '/images/course-2.jpg',
      '/images/astrowellness.jpg'
    ]
  },
  {
    id: 'love-relationship',
    slug: 'love-relationship',
    title: 'Love & Relationship Guidance',
    shortDescription: 'Astrological guidance for love relationships, dating, and romantic compatibility.',
    description: 'Navigate the cosmic dance of love with expert guidance. Understand relationship patterns, attract love, and create lasting romantic harmony through astrological wisdom.',
    price: 1700,
    originalPrice: 2600,
    discount: '35% OFF',
    duration: '50-60 minutes',
    consultationType: 'Video/Audio Call',
    category: 'relationships',
    tags: ['love', 'relationships', 'romance', 'dating'],
    rating: 4.8,
    reviewsCount: 1450,
    ordersCount: 2200,
    features: [
      'Love compatibility analysis',
      'Relationship timing',
      'Attraction enhancement',
      'Conflict resolution',
      'Romance improvement tips'
    ]
  },
  {
    id: 'manokamna-pooja',
    slug: 'manokamna-pooja',
    title: 'Manokamna Pooja Services',
    shortDescription: 'Sacred wish fulfillment rituals to manifest your desires and achieve life goals.',
    description: 'Manifest your deepest desires through sacred Manokamna Pooja. This powerful ritual helps fulfill wishes, achieve goals, and remove obstacles from your path.',
    price: 4500,
    originalPrice: 6500,
    discount: '31% OFF',
    duration: '3-4 hours',
    consultationType: 'Online/Offline Puja',
    category: 'remedies',
    tags: ['wish-fulfillment', 'manifestation', 'puja', 'desires'],
    rating: 4.8,
    reviewsCount: 560,
    ordersCount: 780,
    features: [
      'Personalized ritual',
      'Wish manifestation prayers',
      'Sacred offerings',
      'Divine blessings',
      'Goal achievement guidance'
    ]
  },
  {
    id: 'monthly-horoscope',
    slug: 'monthly-horoscope',
    title: 'Monthly Horoscope Report',
    shortDescription: 'Comprehensive monthly predictions and guidance based on your personal birth chart.',
    description: 'Get detailed monthly insights into opportunities, challenges, and cosmic influences. Plan your month strategically with personalized astrological guidance.',
    price: 800,
    originalPrice: 1200,
    discount: '33% OFF',
    duration: 'Monthly Report',
    consultationType: 'Digital Report',
    category: 'horoscope',
    tags: ['monthly', 'predictions', 'planning', 'report'],
    rating: 4.6,
    reviewsCount: 2100,
    ordersCount: 3200,
    features: [
      'Monthly predictions',
      'Key dates and events',
      'Career and finance outlook',
      'Health and wellness guide',
      'Relationship insights'
    ]
  },
  {
    id: 'numerology',
    slug: 'numerology',
    title: 'Numerology Analysis & Reading',
    shortDescription: 'Discover the power and significance of numbers in your life through comprehensive numerology analysis.',
    description: 'Discover the power of numbers in your life with personalized numerology reading. Understand your life path, destiny number, and cosmic numerical influences.',
    price: 1500,
    originalPrice: 2300,
    discount: '35% OFF',
    duration: '45-60 minutes',
    consultationType: 'Video/Audio Call',
    category: 'numerology',
    tags: ['numerology', 'numbers', 'life-path', 'destiny'],
    rating: 4.7,
    reviewsCount: 1050,
    ordersCount: 1650,
    features: [
      'Life path number analysis',
      'Destiny number calculation',
      'Name numerology',
      'Lucky numbers identification',
      'Numerical remedies'
    ]
  },
  {
    id: 'online-puja',
    slug: 'online-puja',
    title: 'Online Puja Services',
    shortDescription: 'Authentic Vedic rituals and pujas performed online by expert priests for your spiritual needs.',
    description: 'Experience the sacred power of Vedic rituals from the comfort of your home. Our online puja services connect you with expert priests, authentic traditions, and divine blessings.',
    price: 5100,
    originalPrice: 7500,
    discount: '32% OFF',
    duration: '2-4 hours',
    consultationType: 'Live Online Puja',
    category: 'spiritual',
    tags: ['puja', 'rituals', 'spiritual', 'blessings'],
    rating: 4.9,
    reviewsCount: 890,
    ordersCount: 1200,
    features: [
      'Live puja streaming',
      'Expert priest services',
      'Sacred mantras and rituals',
      'Energized prasadam delivery',
      'Spiritual guidance'
    ]
  },
  {
    id: 'palmistry',
    slug: 'palmistry',
    title: 'Palmistry Reading & Analysis',
    shortDescription: 'Ancient palm reading to reveal your personality, life path, and future through hand analysis.',
    description: 'Unlock the secrets hidden in your hands. Our palmistry experts provide insightful readings on your life path, character, and future through detailed palm analysis.',
    price: 1200,
    originalPrice: 1800,
    discount: '33% OFF',
    duration: '40-50 minutes',
    consultationType: 'Video Call',
    category: 'palmistry',
    tags: ['palmistry', 'palm-reading', 'hands', 'character'],
    rating: 4.6,
    reviewsCount: 980,
    ordersCount: 1450,
    features: [
      'Complete palm analysis',
      'Life line interpretation',
      'Character assessment',
      'Future predictions',
      'Hand health insights'
    ]
  },
  {
    id: 'panchang',
    slug: 'panchang',
    title: 'Daily Panchang & Almanac',
    shortDescription: 'Your daily Vedic almanac for cosmic alignment, auspicious timings, and spiritual clarity.',
    description: 'Your daily Vedic almanac for cosmic alignment, auspicious timings, and spiritual clarity. Discover the five limbs of time, planetary positions, and sacred rituals.',
    price: 0,
    originalPrice: 0,
    discount: 'Free',
    duration: 'Daily Updates',
    consultationType: 'Digital Resource',
    category: 'panchang',
    tags: ['panchang', 'almanac', 'timing', 'free'],
    rating: 4.4,
    reviewsCount: 4500,
    ordersCount: 8900,
    features: [
      'Daily tithi and nakshatra',
      'Auspicious timings',
      'Planetary positions',
      'Festival dates',
      'Muhurat calculations'
    ]
  },
  {
    id: 'personal-reading',
    slug: 'personal-reading',
    title: 'Personal Astrology Reading',
    shortDescription: 'Comprehensive personal astrology consultation covering all aspects of your life and future.',
    description: 'Our personal astrology reading service offers an in-depth analysis of your natal chart, providing insights into your personality, life path, career, relationships, and more.',
    price: 3100,
    originalPrice: 4500,
    discount: '31% OFF',
    duration: '90-120 minutes',
    consultationType: 'Video/Audio Call',
    category: 'personal',
    tags: ['personal', 'comprehensive', 'life-reading', 'detailed'],
    rating: 4.9,
    reviewsCount: 1650,
    ordersCount: 2350,
    features: [
      'Complete life analysis',
      'Personality assessment',
      'Career and relationship guidance',
      'Health and wealth insights',
      'Spiritual growth advice'
    ]
  },
  {
    id: 'spiritual-counseling',
    slug: 'spiritual-counseling',
    title: 'Spiritual Counseling & Guidance',
    shortDescription: 'Spiritual guidance and counseling for inner growth, purpose discovery, and enlightenment.',
    description: 'Embark on a journey of spiritual discovery and inner transformation. Our spiritual counseling combines ancient wisdom with modern understanding for personal growth.',
    price: 2200,
    originalPrice: 3400,
    discount: '35% OFF',
    duration: '60-75 minutes',
    consultationType: 'Video/Audio Call',
    category: 'spiritual',
    tags: ['spiritual', 'counseling', 'growth', 'enlightenment'],
    rating: 4.8,
    reviewsCount: 750,
    ordersCount: 1100,
    features: [
      'Spiritual path guidance',
      'Inner growth strategies',
      'Purpose discovery',
      'Meditation techniques',
      'Consciousness expansion'
    ]
  },
  {
    id: 'tantra',
    slug: 'tantra',
    title: 'Tantra Consultation & Guidance',
    shortDescription: 'Sacred tantra practices and consultation for spiritual transformation and energy work.',
    description: 'Explore the transformative path of Tantra with expert guidance. Our consultations focus on spiritual growth, healing, and meditation practices.',
    price: 4100,
    originalPrice: 6000,
    discount: '32% OFF',
    duration: '75-90 minutes',
    consultationType: 'Video/Audio Call',
    category: 'tantra',
    tags: ['tantra', 'spiritual', 'energy', 'transformation'],
    rating: 4.7,
    reviewsCount: 420,
    ordersCount: 650,
    features: [
      'Tantra philosophy guidance',
      'Energy work techniques',
      'Spiritual transformation',
      'Sacred practices',
      'Consciousness development'
    ]
  },
  {
    id: 'tarot-reading',
    slug: 'tarot-reading',
    title: 'Tarot Card Reading',
    shortDescription: 'Mystical tarot card readings to gain insights into your past, present, and future.',
    description: 'Unlock the mystical secrets of the cards and gain profound insight into your life\'s journey. Our expert tarot readers provide intuitive guidance and clarity.',
    price: 1800,
    originalPrice: 2800,
    discount: '36% OFF',
    duration: '45-60 minutes',
    consultationType: 'Video/Audio Call',
    category: 'tarot',
    tags: ['tarot', 'cards', 'intuitive', 'guidance'],
    rating: 4.6,
    reviewsCount: 1250,
    ordersCount: 1900,
    features: [
      'Intuitive card readings',
      'Life guidance insights',
      'Future predictions',
      'Relationship clarity',
      'Decision-making support'
    ]
  },
  {
    id: 'vedic-remedies',
    slug: 'vedic-remedies',
    title: 'Vedic Remedies & Solutions',
    shortDescription: 'Traditional Vedic remedies and solutions for life problems based on astrological analysis.',
    description: 'Discover powerful Vedic remedies tailored to your specific challenges. Our ancient solutions help overcome obstacles and enhance positive planetary influences.',
    price: 1400,
    originalPrice: 2100,
    discount: '33% OFF',
    duration: '45-60 minutes',
    consultationType: 'Video/Audio Call',
    category: 'remedies',
    tags: ['vedic', 'remedies', 'solutions', 'healing'],
    rating: 4.8,
    reviewsCount: 950,
    ordersCount: 1400,
    features: [
      'Personalized remedy consultation',
      'Mantra prescriptions',
      'Gemstone recommendations',
      'Ritual guidance',
      'Yantra suggestions'
    ]
  },
  {
    id: 'yearly-horoscope',
    slug: 'yearly-horoscope',
    title: 'Yearly Horoscope Report',
    shortDescription: 'Comprehensive annual predictions and planning guide based on your complete astrological analysis.',
    description: 'Plan your entire year with cosmic wisdom. Our comprehensive yearly horoscope provides detailed predictions, important dates, and strategic guidance for the year ahead.',
    price: 2500,
    originalPrice: 3800,
    discount: '34% OFF',
    duration: 'Annual Report',
    consultationType: 'Digital Report + Consultation',
    category: 'horoscope',
    tags: ['yearly', 'annual', 'planning', 'comprehensive'],
    rating: 4.9,
    reviewsCount: 1350,
    ordersCount: 1900,
    features: [
      'Complete year predictions',
      'Monthly breakdown',
      'Important dates and events',
      'Strategic planning guide',
      'Personal consultation included'
    ]
  }
];

// Helper function to get service by slug
export function getServiceBySlug(slug) {
  return services.find(service => service.slug === slug);
}

// Helper function to get services by category
export function getServicesByCategory(category) {
  return services.filter(service => service.category === category);
}

// Helper function to get featured services (highest rated)
export function getFeaturedServices(limit = 6) {
  return services
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

// Helper function to get popular services (most orders)
export function getPopularServices(limit = 6) {
  return services
    .sort((a, b) => b.ordersCount - a.ordersCount)
    .slice(0, limit);
}

// Helper function to search services
export function searchServices(query) {
  const lowercaseQuery = query.toLowerCase();
  return services.filter(service => 
    service.title.toLowerCase().includes(lowercaseQuery) ||
    service.description.toLowerCase().includes(lowercaseQuery) ||
    service.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}

// Service categories for filtering
export const serviceCategories = [
  { id: 'all', name: 'All Services', count: services.length },
  { id: 'astrology', name: 'Astrology', count: services.filter(s => s.category === 'astrology').length },
  { id: 'career', name: 'Career', count: services.filter(s => s.category === 'career').length },
  { id: 'relationships', name: 'Relationships', count: services.filter(s => s.category === 'relationships').length },
  { id: 'remedies', name: 'Remedies', count: services.filter(s => s.category === 'remedies').length },
  { id: 'spiritual', name: 'Spiritual', count: services.filter(s => s.category === 'spiritual').length },
  { id: 'horoscope', name: 'Horoscope', count: services.filter(s => s.category === 'horoscope').length }
];

export default services;
