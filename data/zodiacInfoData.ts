// zodiacInfoData.ts
// Data for all zodiac signs, structured for easy extension
import {
  Sparkles,
  Heart,
  Zap,
  Star,
  Gem,
  TrendingUp,
  HelpCircle,
} from "lucide-react";

// Universal navigation items for all zodiac signs
export const universalNavigationItems = [
  { id: "about", label: "About", shortLabel: "About", icon: Sparkles },
  { id: "daily", label: "Daily Insights", shortLabel: "Daily", icon: Star },
  { id: "lucky", label: "Lucky Elements", shortLabel: "Lucky", icon: Gem },
  {
    id: "compatibility",
    label: "Compatibility",
    shortLabel: "Match",
    icon: Heart,
  },
  { id: "growth", label: "Growth", shortLabel: "Growth", icon: TrendingUp },
  { id: "uranus", label: "Uranus", shortLabel: "Uranus", icon: Zap },
  { id: "faq", label: "FAQ", shortLabel: "FAQ", icon: HelpCircle },
];

export const zodiacInfoData = {
  aquarius: {
    navigationItems: universalNavigationItems,
    about: {
      title: "About Aquarius",
      description:
        "The innovative water bearer, bringing revolutionary ideas and humanitarian spirit to the world.",
      cards: [
        {
          title: "Element & Quality",
          content:
            "Air sign with Fixed quality. Aquarius represents innovation, humanitarianism, and a unique perspective on the world.",
        },
        {
          title: "Ruling Planet",
          content:
            "Uranus, the planet of innovation, rebellion, and sudden change. This gives Aquarius their revolutionary spirit and originality.",
        },
        {
          title: "Natural Strengths",
          content:
            "Innovation, independence, humanitarianism, intellectual curiosity, and thinking outside the box.",
        },
      ],
      libra: {
        navigationItems: universalNavigationItems,
        about: {
          elementQuality: {
            title: "Element & Quality",
            description:
              "Air sign with Cardinal quality. Libra represents balance, harmony, and a natural desire for justice and beauty.",
          },
          rulingPlanet: {
            title: "Ruling Planet",
            description:
              "Venus, the planet of love, beauty, and harmony. This gives Libra their appreciation for aesthetics, diplomacy, and balanced relationships.",
          },
          naturalStrengths: {
            title: "Natural Strengths",
            description:
              "Diplomacy, fairness, charm, artistic sense, and natural ability to see both sides of any situation. Libra excels in creating harmony.",
          },
        },
        daily: {
          forecast: {
            title: "Today's Forecast",
            description:
              "Venus aligns with Jupiter today, bringing opportunities for harmony, beauty, and balanced decision-making. Your diplomatic skills are enhanced.",
            luckyNumber: "6",
            bestTime: "3:00 PM - 5:00 PM",
          },
          weeklyFocus: {
            title: "Weekly Focus",
            description:
              "This week emphasizes balance and harmony. Perfect time to resolve conflicts, make fair decisions, and surround yourself with beauty.",
          },
        },
        lucky: {
          colors: "Pink, Blue, Green, White",
          numbers: "6, 7, 15, 24, 33",
          days: "Friday, Monday",
          stones: "Rose Quartz, Opal, Lapis Lazuli",
        },
        compatibility: {
          bestMatches: {
            title: "Best Matches",
            description:
              "Gemini, Aquarius, Leo, and Sagittarius. These signs appreciate Libra's charm and provide the intellectual stimulation they crave.",
          },
          challengingMatches: {
            title: "Challenging Matches",
            description:
              "Cancer and Capricorn may find Libra too indecisive, while Libra may see them as too emotional or rigid.",
          },
          friendship: {
            title: "Friendship Compatibility",
            description:
              "Excellent with Air and Fire signs. Libra values intellectual conversations, fairness, and harmonious relationships.",
          },
        },
        growth: {
          areas: {
            title: "Areas for Growth",
            description:
              "Learning to make decisions more confidently, developing assertiveness, and balancing the needs of others with their own needs.",
          },
          challenges: {
            title: "Common Challenges",
            description:
              "Indecisiveness, people-pleasing, and sometimes avoiding conflict at all costs. Learning to be more decisive is key.",
          },
        },
        venus: {
          love: {
            title: "Love & Relationships",
            description:
              "Venus makes Libra naturally romantic and diplomatic. They seek balanced, harmonious relationships and value partnership deeply.",
          },
          aesthetics: {
            title: "Aesthetics & Beauty",
            description:
              "Libra has an innate appreciation for beauty, art, and elegance. They enjoy creating beautiful environments and experiences.",
          },
        },
        faq: [
          {
            question: "Why are Libra so indecisive?",
            answer:
              "Libra's desire to see all sides of a situation and their fear of making the wrong choice can lead to indecision. They want to make the fairest decision.",
          },
          {
            question: "What careers suit Libra?",
            answer:
              "Law, diplomacy, interior design, fashion, counseling, and any field requiring fairness, beauty, and interpersonal skills.",
          },
          {
            question: "How can Libra improve relationships?",
            answer:
              "By being more decisive, learning to express their own needs clearly, and finding the right balance between compromise and self-assertion.",
          },
        ],
      },
    },
    daily: {
      title: "Daily Insights",
      forecast: {
        title: ",Today’s Forecast",
        description:
          "Uranus aligns with Mercury today, bringing innovative ideas and opportunities for intellectual breakthroughs. Embrace your unique perspective.",
        luckyNumber: "11",
        bestTime: "3-5 PM",
      },
      weekly: {
        title: "Weekly Focus",
        description:
          "This week emphasizes innovation and humanitarian efforts. Perfect time to share your unique ideas and work toward positive change.",
        keyThemes: [
          "Innovation and creativity",
          "Community connections",
          "Progressive thinking",
        ],
      },
    },
    lucky: {
      title: "Lucky Elements",
      categories: [
        {
          title: "Colors",
          items: ["Electric Blue", "Turquoise", "Silver", "Purple"],
        },
        { title: "Numbers", items: ["4", "7", "11", "22", "29"] },
        { title: "Days", items: ["Saturday", "Wednesday"] },
        {
          title: "Stones",
          items: ["Amethyst", "Aquamarine", "Clear Quartz", "Fluorite"],
        },
      ],
    },
    compatibility: {
      title: "Compatibility",
      bestMatches: ["Gemini", "Libra", "Sagittarius", "Aries"],
      challenging: ["Taurus", "Scorpio"],
      friendship:
        "Excellent with Air and Fire signs who value intellectual connection and independence.",
    },
    growth: {
      title: "Growth & Challenges",
      areasForGrowth: [
        "Learning emotional expression",
        "Developing patience",
        "Balancing independence with connection",
      ],
      commonChallenges: [
        "Being too detached emotionally",
        "Fixed opinions and stubbornness",
        "Sometimes too idealistic",
      ],
    },
    uranus: {
      title: "Uranus Influence",
      description:
        "The revolutionary planet that shapes Aquarius' innovative spirit and desire for change.",
      cards: [
        {
          title: "Innovation & Rebellion",
          content:
            "Uranus gives Aquarius a revolutionary spirit, love for innovation, and desire to break free from traditional norms and create positive change in the world.",
        },
        {
          title: "Originality & Independence",
          content:
            "Aquarius' Uranian influence brings unique perspectives, intellectual curiosity, and a strong need for personal freedom and authentic self-expression.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Why are Aquarius so innovative?",
          answer:
            "Aquarius' ruling planet Uranus brings a revolutionary spirit and love for innovation. They are naturally drawn to new ideas and progressive thinking.",
        },
        {
          question: "What careers suit Aquarius?",
          answer:
            "Technology, science, humanitarian work, social activism, research, and any field requiring innovation, originality, and progressive thinking.",
        },
        {
          question: "How can Aquarius improve relationships?",
          answer:
            "By being more emotionally expressive, developing patience, and balancing their need for independence with emotional connection and intimacy.",
        },
      ],
    },
  },
  aries: {
    navigationItems: universalNavigationItems,
    about: {
      title: "About Aries",
      description:
        "The pioneering fire sign, known for leadership, courage, and boundless energy.",
      cards: [
        {
          title: "Element & Quality",
          content:
            "Fire sign with Cardinal quality. Aries represents initiative, passion, and a drive to lead and conquer.",
        },
        {
          title: "Ruling Planet",
          content:
            "Mars, the planet of action, desire, and motivation. This gives Aries their boldness and competitive spirit.",
        },
        {
          title: "Natural Strengths",
          content:
            "Leadership, courage, determination, honesty, optimism, and passion.",
        },
      ],
    },
    daily: {
      title: "Daily Insights",
      forecast: {
        description:
          "Mars energizes you today—perfect for bold moves and new beginnings. Trust your instincts and take the lead.",
        luckyNumber: "9",
        bestTime: "6-9 AM",
      },
      weekly: {
        description:
          "This week, focus on channeling your energy into productive pursuits. Great time for starting projects and inspiring others.",
        keyThemes: [
          "Initiative and leadership",
          "Courage in challenges",
          "Inspiring others",
        ],
      },
    },
    lucky: {
      title: "Lucky Elements",
      categories: [
        { title: "Colors", items: ["Red", "Scarlet", "Crimson", "White"] },
        { title: "Numbers", items: ["1", "9", "18", "27"] },
        { title: "Days", items: ["Tuesday", "Saturday"] },
        { title: "Stones", items: ["Ruby", "Red Jasper", "Carnelian"] },
      ],
    },
    compatibility: {
      title: "Compatibility",
      bestMatches: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
      challenging: ["Cancer", "Capricorn", "Virgo"],
      friendship:
        "Best with Fire and Air signs who match Aries’ energy and enthusiasm.",
    },
    growth: {
      title: "Growth & Challenges",
      areasForGrowth: [
        "Practicing patience",
        "Developing empathy",
        "Balancing impulsiveness with planning",
      ],
      commonChallenges: [
        "Impatience",
        "Quick temper",
        "Difficulty with routine tasks",
      ],
    },
    uranus: {
      title: "Mars Influence",
      description:
        "Mars, the red planet, fuels Aries’ drive, courage, and pioneering spirit.",
      cards: [
        {
          title: "Action & Initiative",
          content:
            "Mars gives Aries the courage to take risks, start new ventures, and lead others.",
        },
        {
          title: "Competitive Edge",
          content:
            "Aries’ Martian energy brings a love for competition and a desire to be first.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Why are Aries so impatient?",
          answer:
            "Mars energy creates urgency. Aries want immediate results and action.",
        },
        {
          question: "What careers suit Aries?",
          answer:
            "Entrepreneurship, sports, military, sales, and any field requiring initiative and leadership.",
        },
        {
          question: "How can Aries improve relationships?",
          answer:
            "By practicing patience, listening more, and considering others’ feelings.",
        },
      ],
    },
  },
  capricorn: {
    navigationItems: universalNavigationItems,
    about: {
      title: "About Capricorn",
      cards: [
        {
          title: "Element & Quality",
          content:
            "Earth sign with Cardinal quality. Capricorn represents ambition, discipline, and a practical approach to achieving goals.",
        },
        {
          title: "Ruling Planet",
          content:
            "Saturn, the planet of discipline, responsibility, and structure. This gives Capricorn their determination, patience, and ability to build lasting foundations.",
        },
        {
          title: "Natural Strengths",
          content:
            "Ambition, discipline, patience, responsibility, and practical wisdom. Capricorn excels in building and achieving long-term goals.",
        },
      ],
    },
    daily: {
      title: "Daily Insights for Capricorn",
      forecast: {
        description:
          "Saturn aligns with Venus today, bringing opportunities for building relationships and achieving career goals. Focus on practical steps toward your ambitions.",
        luckyNumber: "8",
        bestTime: "2:00 PM - 4:00 PM",
      },
      weekly: {
        description:
          "This week emphasizes discipline and achievement. Perfect time to set new goals, work on long-term projects, and build solid foundations.",
      },
    },
    lucky: {
      title: "Lucky Elements for Capricorn",
      categories: [
        { title: "Colors", items: ["Brown", "Black", "Gray", "Dark Green"] },
        { title: "Numbers", items: ["4", "8", "13", "17", "22", "26"] },
        { title: "Days", items: ["Saturday", "Tuesday"] },
        {
          title: "Stones",
          items: ["Onyx", "Obsidian", "Jet", "Black Tourmaline"],
        },
      ],
    },
    compatibility: {
      title: "Capricorn Compatibility",
      bestMatches: ["Taurus", "Virgo", "Scorpio", "Pisces"],
      challenging: ["Aries", "Libra"],
      friendship:
        "Excellent with Earth and Water signs. Capricorn values loyalty, reliability, and shared goals in friendships.",
    },
    growth: {
      title: "Growth & Challenges",
      areasForGrowth: [
        "Learning to relax",
        "Developing emotional expression",
        "Balancing work with personal life",
        "Embracing spontaneity and joy",
      ],
      commonChallenges: [
        "Being too serious",
        "Perfectionism",
        "Sometimes being too rigid. Learning to enjoy life and be more flexible is key.",
      ],
    },
    saturn: {
      title: "Saturn Influence on Capricorn",
      cards: [
        {
          title: "Discipline & Structure",
          content:
            "Saturn gives Capricorn a strong sense of responsibility, discipline, and the ability to build lasting structures and achieve long-term goals.",
        },
        {
          title: "Patience & Wisdom",
          content:
            "Capricorn's Saturnian influence brings patience, practical wisdom, and a methodical approach to life and success.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Why are Capricorns so ambitious?",
          answer:
            "Saturn’s influence gives Capricorn a strong drive for achievement and responsibility.",
        },
        {
          question: "What careers suit Capricorn?",
          answer:
            "Business, finance, management, law, engineering, and any field requiring discipline and long-term planning.",
        },
        {
          question: "How can Capricorn improve relationships?",
          answer:
            "By being more emotionally expressive, learning to relax, and balancing work with personal life.",
        },
      ],
    },
  },
  gemini: {
    navigationItems: universalNavigationItems,
    about: {
      title: "About Gemini",
      description:
        "The adaptable air sign, known for wit, curiosity, and communication skills.",
      cards: [
        {
          title: "Element & Quality",
          content:
            "Air sign with Mutable quality. Gemini represents communication, adaptability, and intellectual curiosity.",
        },
        {
          title: "Ruling Planet",
          content:
            "Mercury, the planet of communication, intellect, and quick thinking. This gives Gemini their natural gift for expression and learning.",
        },
        {
          title: "Natural Strengths",
          content:
            "Versatility, communication skills, intellectual curiosity, adaptability, and social charm. Gemini excels in connecting with others.",
        },
      ],
    },
    daily: {
      title: "Daily Insights",
      forecast: {
        description:
          "Mercury aligns with Jupiter today, bringing opportunities for learning, travel, and meaningful conversations. Perfect day for networking.",
        luckyNumber: "5",
        bestTime: "10:00 AM - 12:00 PM",
      },
      weekly: {
        description:
          "This week emphasizes communication and learning. Perfect time to start new projects, connect with friends, and expand your knowledge.",
        keyThemes: [
          "Communication and networking",
          "Learning and curiosity",
          "Social connections",
        ],
      },
    },
    lucky: {
      title: "Lucky Elements",
      categories: [
        { title: "Colors", items: ["Yellow", "Orange", "Light Blue", "White"] },
        { title: "Numbers", items: ["3", "5", "7", "12", "21"] },
        { title: "Days", items: ["Wednesday", "Friday"] },
        { title: "Stones", items: ["Agate", "Pearl", "Citrine"] },
      ],
    },
    compatibility: {
      title: "Compatibility",
      bestMatches: ["Libra", "Aquarius", "Aries", "Leo"],
      challenging: ["Pisces", "Virgo"],
      friendship:
        "Excellent with Air and Fire signs. Gemini values mental connection and stimulating conversations.",
    },
    growth: {
      title: "Growth & Challenges",
      areasForGrowth: [
        "Learning to focus and commit",
        "Developing emotional depth",
        "Finding balance between variety and consistency",
      ],
      commonChallenges: ["Restlessness", "Inconsistency", "Superficiality"],
    },
    uranus: {
      title: "Mercury Influence",
      description:
        "Mercury, the planet of intellect and communication, gives Gemini their quick wit and adaptability.",
      cards: [
        {
          title: "Communication & Learning",
          content:
            "Mercury makes Gemini naturally gifted communicators and learners. They excel in writing, speaking, and absorbing new information quickly.",
        },
        {
          title: "Adaptability & Versatility",
          content:
            "Gemini’s mutable nature combined with Mercury’s quick thinking makes them highly adaptable and able to handle multiple tasks simultaneously.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Why are Geminis so talkative?",
          answer:
            "Mercury’s influence makes Gemini natural communicators. They process thoughts through speaking and love sharing ideas with others.",
        },
        {
          question: "What careers suit Gemini?",
          answer:
            "Journalism, teaching, sales, marketing, public relations, and any field requiring communication, versatility, and quick thinking.",
        },
        {
          question: "How can Gemini improve relationships?",
          answer:
            "By developing emotional depth, learning to commit and follow through, and balancing their need for variety with stability.",
        },
      ],
    },
  },
  leo: {
    navigationItems: universalNavigationItems,
    about: {
      title: "About Leo",
      description:
        "The radiant fire sign, known for leadership, creativity, and charisma.",
      cards: [
        {
          title: "Element & Quality",
          content:
            "Fire sign with Fixed quality. Leo represents creativity, leadership, and a natural desire to shine and inspire others.",
        },
        {
          title: "Ruling Planet",
          content:
            "The Sun, the center of our solar system and source of life. This gives Leo their natural charisma, confidence, and radiant personality.",
        },
        {
          title: "Natural Strengths",
          content:
            "Leadership, creativity, generosity, loyalty, and natural charisma. Leo excels in inspiring others and taking center stage.",
        },
      ],
    },
    daily: {
      title: "Daily Insights",
      forecast: {
        description:
          "The Sun aligns with Jupiter today, bringing opportunities for leadership, recognition, and creative success. Your natural charisma is amplified.",
        luckyNumber: "1",
        bestTime: "12:00 PM - 2:00 PM",
      },
      weekly: {
        description:
          "This week emphasizes leadership and creativity. Perfect time to take charge, express yourself, and inspire others with your natural talents.",
        keyThemes: [
          "Leadership and recognition",
          "Creative expression",
          "Inspiring others",
        ],
      },
    },
    lucky: {
      title: "Lucky Elements",
      categories: [
        { title: "Colors", items: ["Gold", "Orange", "Red", "Purple"] },
        { title: "Numbers", items: ["1", "4", "10", "22", "31"] },
        { title: "Days", items: ["Sunday", "Tuesday"] },
        { title: "Stones", items: ["Ruby", "Amber", "Tiger Eye"] },
      ],
    },
    compatibility: {
      title: "Compatibility",
      bestMatches: ["Aries", "Sagittarius", "Gemini", "Libra"],
      challenging: ["Taurus", "Scorpio"],
      friendship:
        "Excellent with Fire and Air signs. Leo values loyalty, fun, and mutual admiration in friendships.",
    },
    growth: {
      title: "Growth & Challenges",
      areasForGrowth: [
        "Learning to share the spotlight",
        "Developing humility",
        "Balancing confidence with sensitivity to others",
      ],
      commonChallenges: ["Pride", "Stubbornness", "Being too self-centered"],
    },
    uranus: {
      title: "Sun Influence",
      description:
        "The Sun, source of Leo’s vitality, gives them confidence, creativity, and a magnetic personality.",
      cards: [
        {
          title: "Leadership & Charisma",
          content:
            "The Sun makes Leo natural leaders with magnetic personalities. They have an innate ability to inspire and motivate others.",
        },
        {
          title: "Creativity & Expression",
          content:
            "Leo’s solar influence gives them a natural flair for drama, creativity, and self-expression. They love to entertain and be entertained.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Why are Leos so confident?",
          answer:
            "The Sun’s influence makes Leo naturally confident and self-assured. They have an innate sense of their own worth and abilities.",
        },
        {
          question: "What careers suit Leo?",
          answer:
            "Acting, politics, teaching, sales, entertainment, and any field requiring leadership, creativity, and public speaking.",
        },
        {
          question: "How can Leo improve relationships?",
          answer:
            "By learning to share attention, developing humility, and balancing their need for recognition with genuine care for others.",
        },
      ],
    },
  },
  cancer: {
    navigationItems: universalNavigationItems,
    about: {
      title: "About Cancer",
      cards: [
        {
          title: "Element & Quality",
          content:
            "Water sign with Cardinal quality. Cancer represents emotional depth, nurturing instincts, and strong family bonds.",
        },
        {
          title: "Ruling Planet",
          content:
            "The Moon, the planet of emotions, intuition, and the subconscious. This gives Cancer their deep emotional sensitivity and nurturing nature.",
        },
        {
          title: "Natural Strengths",
          content:
            "Intuition, emotional intelligence, nurturing abilities, loyalty, and strong protective instincts. Cancer excels in creating safe, loving environments.",
        },
      ],
    },
    daily: {
      title: "Daily Insights for Cancer",
      forecast: {
        description:
          "The Moon aligns with Venus today, bringing opportunities for emotional healing and deepening relationships. Trust your intuition.",
        luckyNumber: "2",
        bestTime: "7:00 PM - 9:00 PM",
      },
      weekly: {
        description:
          "This week emphasizes emotional well-being and family connections. Perfect time to nurture relationships and create a peaceful home environment.",
      },
    },
    lucky: {
      title: "Lucky Elements for Cancer",
      categories: [
        { title: "Colors", items: ["Silver", "White", "Pale Blue", "Cream"] },
        { title: "Numbers", items: ["2", "7", "11", "16", "20"] },
        { title: "Days", items: ["Monday", "Thursday"] },
        { title: "Stones", items: ["Pearl", "Moonstone", "Opal"] },
      ],
    },
    compatibility: {
      title: "Cancer Compatibility",
      bestMatches: ["Scorpio", "Pisces", "Taurus", "Virgo"],
      challenging: ["Aries", "Libra"],
      friendship:
        "Excellent with Water and Earth signs. Cancer values emotional connection and loyalty in friendships.",
    },
    growth: {
      title: "Growth & Challenges",
      areasForGrowth: [
        "Learning to set healthy boundaries",
        "Developing independence",
        "Balancing emotional sensitivity with practical action",
      ],
      commonChallenges: [
        "Over-sensitivity",
        "Moodiness",
        "Sometimes being too clingy. Learning to manage emotions and develop self-reliance is key.",
      ],
    },
    moon: {
      title: "Moon Influence on Cancer",
      cards: [
        {
          title: "Emotional Depth & Intuition",
          content:
            "The Moon makes Cancer deeply intuitive and emotionally sensitive. They have a natural ability to understand others' feelings and create nurturing environments.",
        },
        {
          title: "Nurturing & Protection",
          content:
            "Cancer's lunar influence gives them strong maternal instincts and a deep need to protect and care for loved ones.",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      faqs: [
        {
          question: "Why are Cancers so emotional?",
          answer:
            "The Moon’s influence makes Cancer deeply sensitive and intuitive.",
        },
        {
          question: "What careers suit Cancer?",
          answer:
            "Nursing, counseling, teaching, real estate, hospitality, and any field requiring empathy and care.",
        },
        {
          question: "How can Cancer improve relationships?",
          answer:
            "By setting healthy boundaries, developing independence, and communicating needs clearly.",
        },
      ],
    },
  },
  pisces: {
    navigationItems: universalNavigationItems,
    about: {
      elementQuality: {
        title: "Element & Quality",
        description:
          "Water sign with Mutable quality. Pisces represents intuition, compassion, and a deep connection to the spiritual realm.",
      },
      rulingPlanet: {
        title: "Ruling Planet",
        description:
          "Neptune, the planet of dreams, intuition, and spirituality. This gives Pisces their psychic abilities, compassion, and artistic talents.",
      },
      naturalStrengths: {
        title: "Natural Strengths",
        description:
          "Intuition, empathy, creativity, spirituality, and compassion. Pisces excels in understanding others and connecting with the divine.",
      },
    },
    daily: {
      forecast: {
        title: "Today's Forecast",
        description:
          "Neptune aligns with Venus today, bringing heightened intuition and creative inspiration. Trust your instincts and embrace your artistic side.",
        luckyNumber: "7",
        bestTime: "9:00 PM - 11:00 PM",
      },
      weeklyFocus: {
        title: "Weekly Focus",
        description:
          "This week emphasizes intuition and spiritual growth. Perfect time for meditation, creative projects, and deepening your spiritual connection.",
      },
    },
    lucky: {
      colors: "Sea Green, Purple, Silver, Turquoise",
      numbers: "3, 7, 12, 16, 21, 25",
      days: "Thursday, Monday",
      stones: "Moonstone, Aquamarine, Amethyst, Pearl",
    },
    compatibility: {
      bestMatches: {
        title: "Best Matches",
        description:
          "Cancer, Scorpio, Taurus, and Capricorn. These signs appreciate Pisces's sensitivity and provide the emotional security they need.",
      },
      challengingMatches: {
        title: "Challenging Matches",
        description:
          "Gemini and Sagittarius may find Pisces too emotional, while Pisces may see them as too rational or restless.",
      },
      friendship: {
        title: "Friendship Compatibility",
        description:
          "Excellent with Water and Earth signs. Pisces values emotional connection, understanding, and shared spiritual values in friendships.",
      },
    },
    growth: {
      areas: {
        title: "Areas for Growth",
        description:
          "Learning to be more practical, developing boundaries, and balancing dreams with reality. Embracing structure and discipline.",
      },
      challenges: {
        title: "Common Challenges",
        description:
          "Being too idealistic, emotional overwhelm, and sometimes being too escapist. Learning to stay grounded and practical is key.",
      },
    },
    neptune: {
      dreams: {
        title: "Dreams & Intuition",
        description:
          "Neptune gives Pisces a deep connection to the spiritual realm, heightened intuition, and a natural ability to understand the unseen.",
      },
      compassion: {
        title: "Compassion & Creativity",
        description:
          "Pisces's Neptunian influence brings boundless compassion, artistic talents, and a desire to help and heal others.",
      },
    },
    faq: [
      {
        question: "Why are Pisces so intuitive?",
        answer:
          "Pisces's ruling planet Neptune brings a deep connection to the spiritual realm and heightened psychic abilities. They are naturally sensitive to energy and emotions.",
      },
      {
        question: "What careers suit Pisces?",
        answer:
          "Art, music, therapy, healing, spiritual work, charity, and any field requiring empathy, creativity, and helping others.",
      },
      {
        question: "How can Pisces improve relationships?",
        answer:
          "By setting healthy boundaries, being more practical, and balancing their emotional nature with logical thinking and self-care.",
      },
    ],
  },

  sagittarius: {
    navigationItems: universalNavigationItems,
    about: {
      elementQuality: {
        title: "Element & Quality",
        description:
          "Fire sign with Mutable quality. Sagittarius represents exploration, optimism, and a quest for truth and adventure.",
      },
      rulingPlanet: {
        title: "Ruling Planet",
        description:
          "Jupiter, the planet of expansion, wisdom, and good fortune. This gives Sagittarius their adventurous spirit, optimism, and love for learning.",
      },
      naturalStrengths: {
        title: "Natural Strengths",
        description:
          "Optimism, curiosity, independence, honesty, and a love for travel and new experiences. Sagittarius excels in inspiring others to explore.",
      },
    },
    daily: {
      forecast: {
        title: "Today's Forecast",
        description:
          "Jupiter aligns with Mercury today, bringing opportunities for learning, travel, and expanding your horizons. Embrace new ideas and adventures.",
        luckyNumber: "3",
        bestTime: "4:00 PM - 6:00 PM",
      },
      weeklyFocus: {
        title: "Weekly Focus",
        description:
          "This week emphasizes adventure and growth. Perfect time to start a new journey, learn something new, or plan a trip.",
      },
    },
    lucky: {
      colors: "Purple, Blue, Gold, Turquoise",
      numbers: "3, 12, 21, 30, 42",
      days: "Thursday, Sunday",
      stones: "Turquoise, Amethyst, Lapis Lazuli, Citrine",
    },
    compatibility: {
      bestMatches: {
        title: "Best Matches",
        description:
          "Aries, Leo, Libra, and Aquarius. These signs appreciate Sagittarius's optimism and provide the excitement and freedom they crave.",
      },
      challengingMatches: {
        title: "Challenging Matches",
        description:
          "Virgo and Pisces may find Sagittarius too restless, while Sagittarius may see them as too cautious or sensitive.",
      },
      friendship: {
        title: "Friendship Compatibility",
        description:
          "Excellent with Fire and Air signs. Sagittarius values adventure, honesty, and open-mindedness in friendships.",
      },
    },
    growth: {
      areas: {
        title: "Areas for Growth",
        description:
          "Learning to be more patient, developing focus, and balancing freedom with responsibility. Embracing commitment and follow-through.",
      },
      challenges: {
        title: "Common Challenges",
        description:
          "Restlessness, impatience, and sometimes being too blunt. Learning to listen and consider others' feelings is key.",
      },
    },
    jupiter: {
      expansion: {
        title: "Expansion & Wisdom",
        description:
          "Jupiter gives Sagittarius a love for learning, growth, and expanding their horizons. They are optimistic and open-minded.",
      },
      adventure: {
        title: "Adventure & Optimism",
        description:
          "Sagittarius's Jupiterian influence brings a thirst for adventure, travel, and a positive outlook on life.",
      },
    },
    faq: [
      {
        question: "Why are Sagittarius so adventurous?",
        answer:
          "Sagittarius's ruling planet Jupiter brings a love for exploration, learning, and new experiences. They are naturally curious and optimistic.",
      },
      {
        question: "What careers suit Sagittarius?",
        answer:
          "Travel, education, philosophy, publishing, sports, and any field requiring exploration, learning, and open-mindedness.",
      },
      {
        question: "How can Sagittarius improve relationships?",
        answer:
          "By being more patient, listening to others, and balancing their need for freedom with commitment and understanding.",
      },
    ],
  },
  scorpio: {
    navigationItems: universalNavigationItems,
    about: {
      elementQuality: {
        title: "Element & Quality",
        description:
          "Water sign with Fixed quality. Scorpio represents transformation, depth, and a powerful drive for truth and intensity.",
      },
      rulingPlanet: {
        title: "Ruling Planet",
        description:
          "Pluto (and Mars, traditionally), the planet of transformation, power, and rebirth. This gives Scorpio their intensity, resilience, and magnetic presence.",
      },
      naturalStrengths: {
        title: "Natural Strengths",
        description:
          "Determination, intuition, emotional depth, resourcefulness, and the ability to transform and heal. Scorpio excels in uncovering hidden truths.",
      },
    },
    daily: {
      forecast: {
        title: "Today's Forecast",
        description:
          "Pluto aligns with the Moon today, bringing opportunities for deep emotional healing and powerful transformation. Trust your intuition.",
        luckyNumber: "9",
        bestTime: "8:00 PM - 10:00 PM",
      },
      weeklyFocus: {
        title: "Weekly Focus",
        description:
          "This week emphasizes transformation and renewal. Perfect time to let go of the past, embrace change, and focus on personal growth.",
      },
    },
    lucky: {
      colors: "Deep red, maroon, black, and dark purple",
      numbers: "8, 11, 18, and 22",
      stones: "Obsidian, garnet, malachite, and topaz",
      days: "Tuesday and Thursday",
    },
    compatibility: {
      bestMatches: {
        title: "Best Matches",
        description:
          "Cancer, Pisces, Virgo, and Capricorn. These signs appreciate Scorpio's depth and provide the loyalty and stability they need.",
      },
      challengingMatches: {
        title: "Challenging Matches",
        description:
          "Leo and Aquarius may find Scorpio too intense, while Scorpio may see them as too detached or unpredictable.",
      },
      friendship: {
        title: "Friendship Compatibility",
        description:
          "Excellent with Water and Earth signs. Scorpio values loyalty, trust, and deep emotional connections in friendships.",
      },
    },
    growth: {
      areas: {
        title: "Areas for Growth",
        description:
          "Learning to let go of grudges, developing trust, and embracing vulnerability. Allowing transformation and healing to occur.",
      },
      challenges: {
        title: "Common Challenges",
        description:
          "Jealousy, secrecy, and sometimes being too controlling. Learning to trust and open up is key.",
      },
    },
    pluto: {
      transformation: {
        title: "Transformation & Power",
        description:
          "Pluto gives Scorpio a powerful drive for transformation, rebirth, and uncovering hidden truths. They are resilient and resourceful.",
      },
      depth: {
        title: "Emotional Depth",
        description:
          "Scorpio's Plutonic influence brings emotional depth, intuition, and the ability to heal themselves and others.",
      },
    },
    faq: [
      {
        question: "Why are Scorpio so intense?",
        answer:
          "Scorpio's ruling planet Pluto brings intensity, depth, and a desire for transformation. They feel emotions deeply and seek truth in all things.",
      },
      {
        question: "What careers suit Scorpio?",
        answer:
          "Psychology, research, healing, investigation, finance, and any field requiring depth, intuition, and resilience.",
      },
      {
        question: "How can Scorpio improve relationships?",
        answer:
          "By learning to trust, being more open, and letting go of control. Embracing vulnerability and honest communication is key.",
      },
    ],
  },
  taurus: {
    navigationItems: universalNavigationItems,
    about: {
      elementQuality: {
        title: "Element & Quality",
        description:
          "Earth sign with Fixed quality. Taurus represents stability, determination, and a deep connection to the physical world.",
      },
      rulingPlanet: {
        title: "Ruling Planet",
        description:
          "Venus, the planet of love, beauty, and harmony. This gives Taurus their appreciation for luxury and aesthetic pleasures.",
      },
      naturalStrengths: {
        title: "Natural Strengths",
        description:
          "Patience, reliability, sensuality, determination, and a strong work ethic. Taurus excels in building lasting foundations.",
      },
    },
    daily: {
      forecast: {
        title: "Today's Forecast",
        description:
          "Venus aligns with Jupiter today, bringing opportunities for financial growth and romantic connections. Focus on your long-term goals.",
        luckyNumber: "6",
        bestTime: "2:00 PM - 4:00 PM",
      },
      weeklyFocus: {
        title: "Weekly Focus",
        description:
          "This week emphasizes stability and growth. Perfect time to invest in yourself, strengthen relationships, and build your foundation.",
      },
    },
    lucky: {
      colors: "Green, Pink, White, Light Blue",
      numbers: "2, 6, 9, 12, 24",
      days: "Friday, Monday",
      stones: "Emerald, Rose Quartz, Diamond",
    },
    compatibility: {
      bestMatches: {
        title: "Best Matches",
        description:
          "Cancer, Virgo, Capricorn, and Pisces. These signs appreciate Taurus's stability and provide the emotional depth they crave.",
      },
      challengingMatches: {
        title: "Challenging Matches",
        description:
          "Aquarius and Leo may find Taurus too stubborn, while Taurus may see them as too unpredictable.",
      },
      friendship: {
        title: "Friendship Compatibility",
        description:
          "Excellent with Earth and Water signs. Taurus values loyalty and deep, meaningful connections.",
      },
    },
    growth: {
      areas: {
        title: "Areas for Growth",
        description:
          "Learning to embrace change, developing flexibility, and opening up to new experiences while maintaining your core values.",
      },
      challenges: {
        title: "Common Challenges",
        description:
          "Stubbornness, resistance to change, and sometimes being too materialistic. Learning to let go and adapt is key.",
      },
    },
    venus: {
      love: {
        title: "Love & Relationships",
        description:
          "Venus makes Taurus deeply romantic and loyal. They seek stable, long-term relationships and value physical affection and quality time.",
      },
      aesthetics: {
        title: "Aesthetics & Luxury",
        description:
          "Taurus has an innate appreciation for beauty, art, and luxury. They enjoy surrounding themselves with quality and comfort.",
      },
    },
    faq: [
      {
        question: "Why are Taurus so stubborn?",
        answer:
          "Taurus's fixed earth nature makes them determined and persistent. Once they set their mind to something, they rarely give up.",
      },
      {
        question: "What careers suit Taurus?",
        answer:
          "Finance, real estate, agriculture, culinary arts, and any field requiring patience, reliability, and attention to detail.",
      },
      {
        question: "How can Taurus improve relationships?",
        answer:
          "By being more flexible, communicating openly about their needs, and learning to compromise while maintaining their values.",
      },
    ],
  },
  virgo: {
    navigationItems: universalNavigationItems,
    about: {
      elementQuality: {
        title: "Element & Quality",
        description:
          "Earth sign with Mutable quality. Virgo represents precision, service, and a deep desire for perfection and order.",
      },
      rulingPlanet: {
        title: "Ruling Planet",
        description:
          "Mercury, the planet of communication, intellect, and analysis. This gives Virgo their sharp mind, attention to detail, and practical approach.",
      },
      naturalStrengths: {
        title: "Natural Strengths",
        description:
          "Analytical thinking, attention to detail, reliability, practicality, and a strong work ethic. Virgo excels in organization and problem-solving.",
      },
    },
    daily: {
      forecast: {
        title: "Today's Forecast",
        description:
          "Mercury aligns with Venus today, bringing opportunities for clear communication, practical solutions, and harmonious relationships.",
        luckyNumber: "5",
        bestTime: "9:00 AM - 11:00 AM",
      },
      weeklyFocus: {
        title: "Weekly Focus",
        description:
          "This week emphasizes organization and efficiency. Perfect time to tackle projects, improve systems, and focus on health and wellness.",
      },
    },
    lucky: {
      colors: "Green, Brown, Navy Blue, White",
      numbers: "5, 14, 15, 23, 32",
      days: "Wednesday, Friday",
      stones: "Peridot, Jade, Moss Agate",
    },
    compatibility: {
      bestMatches: {
        title: "Best Matches",
        description:
          "Taurus, Capricorn, Cancer, and Scorpio. These signs appreciate Virgo's reliability and provide the emotional depth they need.",
      },
      challengingMatches: {
        title: "Challenging Matches",
        description:
          "Sagittarius and Gemini may find Virgo too critical, while Virgo may see them as too scattered or impractical.",
      },
      friendship: {
        title: "Friendship Compatibility",
        description:
          "Excellent with Earth and Water signs. Virgo values loyalty, reliability, and meaningful conversations in friendships.",
      },
    },
    growth: {
      areas: {
        title: "Areas for Growth",
        description:
          "Learning to be less critical of themselves and others, embracing imperfection, and developing more flexibility and spontaneity.",
      },
      challenges: {
        title: "Common Challenges",
        description:
          "Perfectionism, overthinking, and sometimes being too critical. Learning to relax and accept imperfection is key.",
      },
    },
    mercury: {
      analyticalMind: {
        title: "Analytical Mind",
        description:
          "Mercury gives Virgo a sharp, analytical mind with excellent problem-solving skills and attention to detail.",
      },
      communication: {
        title: "Communication & Service",
        description:
          "Virgo excels in clear communication and has a natural desire to serve and help others through practical means.",
      },
    },
    faq: [
      {
        question: "Why are Virgo so critical?",
        answer:
          "Virgo's attention to detail and desire for perfection can make them notice flaws that others miss. They often have high standards for themselves and others.",
      },
      {
        question: "What careers suit Virgo?",
        answer:
          "Healthcare, research, accounting, editing, quality control, and any field requiring attention to detail, analysis, and practical problem-solving.",
      },
      {
        question: "How can Virgo improve relationships?",
        answer:
          "By being less critical, learning to accept imperfection, and developing more flexibility while maintaining their helpful and reliable nature.",
      },
    ],
  },
};
