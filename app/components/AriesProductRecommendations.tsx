'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Zap, Shield, Crown, Heart, Star, Info, Gem, Sparkles, Eye, Gift, Book, Compass } from 'lucide-react';

// Aries-specific product categories with explanations (EXPANDED WITH MORE CATEGORIES)
const ariesRecommendations = {
  "Specially for Aries": [
    {
      id: 'mars-energy-bracelet',
      name: 'Mars Energy Bracelet',
      image: '/images/course-1.jpg',
      price: '₹2,499',
      originalPrice: '₹4,999',
      category: 'Power Jewelry',
      ariesBenefit: 'Enhances Natural Leadership',
      whyForAries: 'Mars is your ruling planet, making this bracelet perfectly aligned with your energy. It amplifies your natural leadership qualities and boosts confidence in challenging situations.',
      benefits: ['Increases courage', 'Enhances decision-making', 'Boosts leadership aura'],
      powerLevel: 95,
      icon: <Crown className="w-5 h-5" />,
      slug: 'mars-energy-bracelet'
    },
    {
      id: 'red-coral-ring',
      name: 'Red Coral Ring',
      image: '/images/course-2.jpg',
      price: '₹4,999',
      originalPrice: '₹8,999',
      category: 'Gemstone Therapy',
      ariesBenefit: 'Controls Mars Energy',
      whyForAries: 'Red Coral is the primary gemstone for Mars. It helps channel your fiery Aries energy constructively, reducing impulsiveness while maintaining your natural drive.',
      benefits: ['Balances aggression', 'Improves patience', 'Enhances focus'],
      powerLevel: 98,
      icon: <Flame className="w-5 h-5" />,
      slug: 'red-coral-ring'
    },
    {
      id: 'carnelian-power-stone',
      name: 'Carnelian Power Stone',
      image: '/images/course-3.jpg',
      price: '₹1,299',
      originalPrice: '₹2,599',
      category: 'Crystal Healing',
      ariesBenefit: 'Amplifies Courage & Motivation',
      whyForAries: 'Carnelian resonates with your fire element, boosting motivation and courage. Perfect for Aries who want to overcome fears and take bold actions.',
      benefits: ['Increases motivation', 'Builds confidence', 'Enhances creativity'],
      powerLevel: 90,
      icon: <Zap className="w-5 h-5" />,
      slug: 'carnelian-power-stone'
    },
    {
      id: 'aries-victory-crystal',
      name: 'Aries Victory Crystal',
      image: '/images/course-4.jpg',
      price: '₹3,299',
      originalPrice: '₹5,999',
      category: 'Victory Stones',
      ariesBenefit: 'Unleashes Winning Energy',
      whyForAries: 'Specially designed for Aries competitive spirit, this crystal amplifies your natural drive to succeed and helps you achieve victory in all your endeavors.',
      benefits: ['Boosts competitive edge', 'Enhances success rate', 'Increases determination'],
      powerLevel: 92,
      icon: <Shield className="w-5 h-5" />,
      slug: 'aries-victory-crystal'
    },
    {
      id: 'garnet-empower-ring',
      name: 'Garnet Empower Ring',
      image: '/images/course-5.jpg',
      price: '₹2,799',
      originalPrice: '₹4,499',
      category: 'Empowerment Jewelry',
      ariesBenefit: 'Boosts vitality and self-confidence',
      whyForAries: 'Garnet is known for its grounding and vitality properties, perfect for Aries who need to balance their fiery energy with stability.',
      benefits: ['Increases vitality', 'Enhances self-confidence', 'Balances emotional energy'],
      powerLevel: 91,
      icon: <Heart className="w-5 h-5" />,
      slug: 'garnet-empower-ring'
    },
    {
      id: 'turquoise-energy-bracelet',
      name: 'Turquoise Energy Bracelet',
      image: '/images/course-6.jpg',
      price: '₹1,999',
      originalPrice: '₹3,499',
      category: 'Power Jewelry',
      ariesBenefit: 'Enhances Focus and Clarity',
      whyForAries: 'Turquoise is a powerful stone for Aries, helping to clear mental fog and enhance focus and clarity. It also promotes communication and creativity.',
      benefits: ['Enhances focus', 'Improves communication', 'Promotes creativity'],
      powerLevel: 93,
      icon: <Star className="w-5 h-5" />,
      slug: 'turquoise-energy-bracelet'
    },
    {
      id: 'amethyst-mind-stone',
      name: 'Amethyst Mind Stone',
      image: '/images/course-7.jpg',
      price: '₹2,199',
      originalPrice: '₹3,999',
      category: 'Crystal Healing',
      ariesBenefit: 'Enhances Intuition and Creativity',
      whyForAries: 'Amethyst is a stone of spiritual protection and wisdom, perfect for Aries who need to balance their fiery energy with calm and intuition.',
      benefits: ['Enhances intuition', 'Promotes creativity', 'Provides spiritual protection'],
      powerLevel: 94,
      icon: <Info className="w-5 h-5" />,
      slug: 'amethyst-mind-stone'
    },
    {
      id: 'lapis-lazuli-ring',
      name: 'Lapis Lazuli Ring',
      image: '/images/course-8.jpg',
      price: '₹3,999',
      originalPrice: '₹6,999',
      category: 'Gemstone Therapy',
      ariesBenefit: 'Enhances Leadership and Confidence',
      whyForAries: 'Lapis Lazuli is a stone of royalty and power, perfect for Aries who need to enhance their leadership qualities and confidence.',
      benefits: ['Enhances leadership', 'Increases confidence', 'Promotes clarity of thought'],
      powerLevel: 96,
      icon: <Crown className="w-5 h-5" />,
      slug: 'lapis-lazuli-ring'
    }
  ],
  "All Product Categories": [
    {
      category: 'Gemstones & Crystals',
      description: 'Planetary gems and healing crystals for energy enhancement',
      icon: <Gem className="w-6 h-6" />,
      items: [
        { name: 'Ruby - Sun Stone', price: '₹5,999', benefit: 'Boosts leadership authority', slug: 'ruby-sun-stone' },
        { name: 'Diamond - Venus Stone', price: '₹15,999', benefit: 'Enhances relationships', slug: 'diamond-venus-stone' },
        { name: 'Emerald - Mercury Stone', price: '₹8,999', benefit: 'Improves communication', slug: 'emerald-mercury-stone' },
        { name: 'Blue Sapphire - Saturn Stone', price: '₹12,999', benefit: 'Brings discipline', slug: 'blue-sapphire-saturn-stone' },
        { name: 'Yellow Sapphire - Jupiter Stone', price: '₹9,999', benefit: 'Increases wisdom', slug: 'yellow-sapphire-jupiter-stone' },
        { name: 'Pearl - Moon Stone', price: '₹3,999', benefit: 'Enhances intuition', slug: 'pearl-moon-stone' }
      ],
      ariesRecommendation: 'Ruby and Red Coral work best for your Mars energy and leadership qualities'
    },
    {
      category: 'Spiritual Jewelry',
      description: 'Bracelets, rings, and pendants for daily spiritual protection',
      icon: <Sparkles className="w-6 h-6" />,
      items: [
        { name: 'Rudraksha Mala', price: '₹1,999', benefit: 'Provides spiritual protection', slug: 'rudraksha-mala' },
        { name: 'Om Pendant', price: '₹899', benefit: 'Increases positive vibrations', slug: 'om-pendant' },
        { name: 'Navratna Ring', price: '₹7,999', benefit: 'Balances all planetary energies', slug: 'navratna-ring' },
        { name: 'Evil Eye Bracelet', price: '₹599', benefit: 'Protects from negativity', slug: 'evil-eye-bracelet' },
        { name: 'Copper Kada', price: '₹1,299', benefit: 'Enhances Mars energy', slug: 'copper-kada' },
        { name: 'Sandalwood Beads', price: '₹749', benefit: 'Brings peace and clarity', slug: 'sandalwood-beads' }
      ],
      ariesRecommendation: 'Fire-element jewelry like copper and rudraksha enhances your natural energy'
    },
    {
      category: 'Yantras & Sacred Geometry',
      description: 'Mystical diagrams for prosperity, protection and spiritual growth',
      icon: <Eye className="w-6 h-6" />,
      items: [
        { name: 'Shree Yantra', price: '₹2,999', benefit: 'Attracts wealth and prosperity', slug: 'shree-yantra' },
        { name: 'Durga Yantra', price: '₹1,599', benefit: 'Provides protection and strength', slug: 'durga-yantra' },
        { name: 'Ganesh Yantra', price: '₹1,299', benefit: 'Removes obstacles', slug: 'ganesh-yantra' },
        { name: 'Hanuman Yantra', price: '₹999', benefit: 'Increases courage and strength', slug: 'hanuman-yantra' },
        { name: 'Mars Yantra', price: '₹1,799', benefit: 'Strengthens Mars influence', slug: 'mars-yantra' },
        { name: 'Kuber Yantra', price: '₹1,499', benefit: 'Enhances financial growth', slug: 'kuber-yantra' }
      ],
      ariesRecommendation: 'Mars Yantra and Hanuman Yantra are specifically powerful for your warrior sign'
    },
    {
      category: 'Puja & Ritual Items',
      description: 'Complete spiritual kits for daily worship and special ceremonies',
      icon: <Gift className="w-6 h-6" />,
      items: [
        { name: 'Mars Puja Kit', price: '₹1,799', benefit: 'Strengthens Mars energy', slug: 'mars-puja-kit' },
        { name: 'Navgraha Puja Set', price: '₹2,999', benefit: 'Balances all planetary influences', slug: 'navgraha-puja-set' },
        { name: 'Ganesha Puja Kit', price: '₹899', benefit: 'Removes obstacles', slug: 'ganesha-puja-kit' },
        { name: 'Durga Puja Set', price: '₹1,499', benefit: 'Invokes divine protection', slug: 'durga-puja-set' },
        { name: 'Hanuman Chalisa Set', price: '₹699', benefit: 'Builds courage and strength', slug: 'hanuman-chalisa-set' },
        { name: 'Sacred Incense Collection', price: '₹499', benefit: 'Purifies environment', slug: 'sacred-incense-collection' }
      ],
      ariesRecommendation: 'Mars Puja Kit directly enhances your ruling planet and personal power'
    },
    {
      category: 'Astrology Services',
      description: 'Personalized consultations, reports and guidance from expert astrologers',
      icon: <Compass className="w-6 h-6" />,
      items: [
        { name: 'Aries Life Reading', price: '₹2,999', benefit: 'Complete life path analysis', slug: 'aries-life-reading' },
        { name: 'Mars Transit Report', price: '₹999', benefit: 'Timing for major decisions', slug: 'mars-transit-report' },
        { name: 'Career Guidance', price: '₹1,999', benefit: 'Optimizes professional growth', slug: 'career-guidance' },
        { name: 'Relationship Compatibility', price: '₹1,499', benefit: 'Improves personal relationships', slug: 'relationship-compatibility' },
        { name: 'Business Astrology', price: '₹3,499', benefit: 'Strategic business insights', slug: 'business-astrology' },
        { name: 'Health Predictions', price: '₹1,799', benefit: 'Preventive health guidance', slug: 'health-predictions' }
      ],
      ariesRecommendation: 'Mars Transit Reports and Career Guidance are crucial for your professional success'
    },
    {
      category: 'Spiritual Books & Learning',
      description: 'Ancient wisdom texts, mantras and spiritual knowledge resources',
      icon: <Book className="w-6 h-6" />,
      items: [
        { name: 'Bhagavad Gita Commentary', price: '₹899', benefit: 'Spiritual wisdom and guidance', slug: 'bhagavad-gita-commentary' },
        { name: 'Mars Mantras Collection', price: '₹599', benefit: 'Strengthens planetary influence', slug: 'mars-mantras-collection' },
        { name: 'Vedic Astrology Guide', price: '₹1,299', benefit: 'Understanding cosmic influences', slug: 'vedic-astrology-guide' },
        { name: 'Meditation Techniques', price: '₹749', benefit: 'Inner peace and clarity', slug: 'meditation-techniques' },
        { name: 'Chakra Balancing Guide', price: '₹649', benefit: 'Energy center alignment', slug: 'chakra-balancing-guide' },
        { name: 'Ayurveda for Aries', price: '₹799', benefit: 'Health according to constitution', slug: 'ayurveda-for-aries' }
      ],
      ariesRecommendation: 'Mars Mantras and Vedic Astrology knowledge will deepen your cosmic understanding'
    }
  ]
};

export default function AriesProductRecommendations() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Specially for Aries');

  return (
    <div ref={ref} className="space-y-12">
      
      {/* SECTION HEADER */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-serif font-light mb-6 text-black">
          Aries Power Collection
        </h2>
        <div className="w-40 h-0.5 bg-black mx-auto mb-8"></div>
        <p className="text-lg text-slate-600 max-w-4xl mx-auto font-light leading-relaxed">
          Curated products that align perfectly with your Mars energy and Aries nature. Each recommendation is specifically chosen to enhance your natural strengths and support your cosmic journey.
        </p>
      </motion.div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-2 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
        {Object.keys(ariesRecommendations).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 sm:px-8 py-2 sm:py-4 rounded-xl sm:rounded-2xl font-serif font-medium transition-all duration-300 text-sm sm:text-base ${
              activeCategory === category
                ? 'bg-black text-white shadow-xl'
                : 'bg-white text-slate-700 hover:bg-orange-50 border border-gray-200 hover:border-orange-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* SPECIALLY FOR ARIES SECTION */}
      {activeCategory === 'Specially for Aries' && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {ariesRecommendations["Specially for Aries"].map((product, index) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="group block bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-200"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative h-36 sm:h-64 w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>

              {/* PRODUCT INFO */}
              <div className="p-3 sm:p-6 flex flex-col h-full">
                <h3 className="text-base sm:text-xl font-serif font-bold text-black mb-1 sm:mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-1 sm:mb-2">
                  <span className="text-lg sm:text-2xl font-bold text-black">{product.price}</span>
                  <span className="text-xs sm:text-sm text-slate-400 line-through">{product.originalPrice}</span>
                </div>
                <p className="text-xs sm:text-base text-slate-700 font-medium mb-1 sm:mb-2 font-serif leading-relaxed line-clamp-2">{product.ariesBenefit}</p>
                <button
                  className="w-full mt-auto bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 text-black font-serif font-bold py-1.5 sm:py-3 rounded-xl shadow hover:from-orange-100 hover:to-amber-200 transition-all duration-300 flex items-center justify-center gap-2 text-xs sm:text-base group-hover:scale-[1.02]"
                  tabIndex={-1}
                  type="button"
                >
                  <Flame className="w-3 h-3 sm:w-5 sm:h-5" />
                  Claim Your Power
                </button>
                <span className="block mt-1 sm:mt-2 text-amber-700 font-semibold underline text-xs sm:text-sm group-hover:text-amber-900 transition-colors">Read More</span>
              </div>
            </Link>
          ))}
        </motion.div>
      )}

      {/* ALL CATEGORIES SECTION */}
      {activeCategory === 'All Product Categories' && (
        <motion.div
          className="space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {ariesRecommendations["All Product Categories"].map((categoryData, index) => (
            <motion.div
              key={categoryData.category}
              className="bg-white shadow-lg p-8 border border-gray-300 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* CATEGORY HEADER */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center text-white shadow-lg">
                    {categoryData.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-medium text-black">{categoryData.category}</h3>
                    <p className="text-black font-light">{categoryData.description}</p>
                  </div>
                </div>
              </div>

              {/* ARIES RECOMMENDATION */}
              <div className="mb-8 p-6 bg-white border border-black">
                <h4 className="font-serif font-medium text-black mb-2 flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Aries Recommendation:
                </h4>
                <p className="text-black text-sm font-light leading-relaxed">{categoryData.ariesRecommendation}</p>
              </div>

              {/* PRODUCTS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categoryData.items.map((item, itemIndex) => (
                  <Link key={item.name} href={`/shop/${item.slug}`}>
                    <motion.div
                      className="p-4 min-h-[220px] border border-gray-300 hover:border-black hover:shadow-md transition-all duration-300 cursor-pointer group bg-white flex flex-col"
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <h4 className="font-serif font-medium text-black mb-2 group-hover:text-gray-800 transition-colors">{item.name}</h4>
                      <p className="text-black font-bold mb-3 font-serif">{item.price}</p>
                      <p className="text-sm text-black font-light leading-relaxed">{item.benefit}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
} 