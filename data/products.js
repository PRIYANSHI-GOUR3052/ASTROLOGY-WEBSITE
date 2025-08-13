// Centralized mock products data. Swap this module later to fetch from an API.

// Helper function to generate default detailed description if not provided
function getDefaultDetailedDescription(product) {
  return `
    <div style="color: #374151; line-height: 1.8;">
      <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">About ${product.title}</h3>
      <p style="margin-bottom: 1rem; color: #4b5563;">${product.description}</p>
      
      <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Key Features:</h4>
      <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Authentic and high-quality materials</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Handpicked by spiritual experts</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Traditional craftsmanship</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Energized through Vedic rituals</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Suitable for personal and professional use</li>
      </ul>
      
      <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Benefits:</h4>
      <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Enhances spiritual growth and awareness</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Provides positive energy and protection</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Supports meditation and mindfulness practices</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Brings harmony and balance to your life</li>
        <li style="margin-bottom: 0.5rem; color: #4b5563;">Perfect for gifting to loved ones</li>
      </ul>
      
      <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Usage & Care:</h4>
      <p style="margin-bottom: 1rem; color: #4b5563;">This item is ready to use and comes with care instructions. For best results, keep in a clean, sacred space and handle with respect. Regular cleansing and energizing will maintain its spiritual potency.</p>
    </div>
  `;
}

export const products = [
  {
    id: 'gemstone-collection',
    title: 'Natural Gemstone Collection',
    description:
      'Authentic, lab-certified gemstones for planetary remedies and spiritual growth. Includes Ruby, Emerald, Blue Sapphire, and more precious stones.',
    detailedDescription: `
      <div style="color: #374151; line-height: 1.8;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Premium Natural Gemstones for Astrological Remedies</h3>
        <p style="margin-bottom: 1rem; color: #4b5563;">Our Natural Gemstone Collection features hand-selected, lab-certified precious stones that have been revered for centuries for their powerful metaphysical properties and astrological benefits. Each gemstone in this collection is carefully sourced from the finest mines around the world and authenticated by certified gemologists.</p>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">What's Included:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Ruby (Manik)</strong> - For Sun planet, enhances leadership and confidence</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Emerald (Panna)</strong> - For Mercury planet, improves communication and intelligence</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Blue Sapphire (Neelam)</strong> - For Saturn planet, brings discipline and success</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Yellow Sapphire (Pukhraj)</strong> - For Jupiter planet, attracts wisdom and prosperity</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Diamond (Heera)</strong> - For Venus planet, enhances love and luxury</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Benefits:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Planetary remedies as per Vedic astrology</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Enhanced spiritual energy and protection</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Improved focus and mental clarity</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Balancing of chakras and energy centers</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Positive influence on health and relationships</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Quality Assurance:</h4>
        <p style="margin-bottom: 1rem; color: #4b5563;">Each gemstone comes with a certificate of authenticity from recognized gemological institutes. All stones are natural, untreated, and energized by our expert astrologers before shipping.</p>
      </div>
    `,
    price: '₹2,499',
    originalPrice: '₹4,999',
    slug: 'gemstone-collection',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753177/naturalstones_xsst5z.jpg',
    category: 'Gemstones',
    rating: 4.8,
  },
  {
    id: 'rudraksha-collection',
    title: 'Rudraksha Mala & Beads',
    description:
      'Energized Rudraksha beads and malas for protection, peace, and spiritual power. Handpicked from Nepal for maximum benefits.',
    detailedDescription: `
      <div>
        <h3>Sacred Rudraksha Beads from the Himalayas</h3>
        <p>Our Rudraksha collection features authentic beads directly sourced from the sacred forests of Nepal. Each bead is carefully selected, tested for authenticity, and energized through traditional Vedic rituals. Rudraksha beads are believed to be the tears of Lord Shiva and are considered one of the most powerful spiritual accessories in Hindu tradition.</p>
        
        <h4>Collection Includes:</h4>
        <ul>
          <li><strong>1 Mukhi Rudraksha</strong> - For spiritual awakening and connection with the divine</li>
          <li><strong>5 Mukhi Rudraksha</strong> - For overall well-being and peace</li>
          <li><strong>7 Mukhi Rudraksha</strong> - For prosperity and financial stability</li>
          <li><strong>108 Bead Mala</strong> - For meditation and chanting practices</li>
          <li><strong>Gauri Shankar</strong> - For relationship harmony and marital bliss</li>
        </ul>
        
        <h4>Spiritual Benefits:</h4>
        <ul>
          <li>Protection from negative energies</li>
          <li>Enhanced meditation and spiritual practices</li>
          <li>Stress reduction and mental peace</li>
          <li>Improved concentration and focus</li>
          <li>Balancing of all chakras</li>
          <li>Strengthened connection with higher consciousness</li>
        </ul>
        
        <h4>Authenticity Guarantee:</h4>
        <p>Each Rudraksha bead undergoes water test verification and comes with natural surface texture and holes. We provide detailed instructions for care and maintenance to preserve their spiritual potency.</p>
      </div>
    `,
    price: '₹1,199',
    originalPrice: '₹2,399',
    slug: 'rudraksha-collection',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1752753830/rudrakshamala_pibmxj.jpg',
    category: 'Spiritual',
    rating: 4.9,
  },
  {
    id: 'yantras',
    title: 'Energized Yantras',
    description:
      'Sacred spiritual diagrams (Yantras) energized for prosperity, health, and harmony. Copper and brass varieties available.',
    detailedDescription: `
      <div>
        <h3>Powerful Sacred Geometry for Spiritual Transformation</h3>
        <p>Yantras are mystical diagrams that represent divine energies and cosmic forces. Our collection features authentic, handcrafted Yantras made from pure copper and brass, energized through traditional Vedic rituals by experienced pundits. Each Yantra serves as a powerful tool for meditation, manifestation, and spiritual protection.</p>
        
        <h4>Available Yantras:</h4>
        <ul>
          <li><strong>Sri Yantra</strong> - The most powerful Yantra for wealth and prosperity</li>
          <li><strong>Kuber Yantra</strong> - For financial abundance and business success</li>
          <li><strong>Mahamrityunjaya Yantra</strong> - For health, healing, and protection</li>
          <li><strong>Saraswati Yantra</strong> - For knowledge, wisdom, and educational success</li>
          <li><strong>Ganesh Yantra</strong> - For removing obstacles and new beginnings</li>
        </ul>
        
        <h4>Material & Craftsmanship:</h4>
        <ul>
          <li>Made from pure copper and brass for maximum energy conductivity</li>
          <li>Hand-engraved with precise geometric patterns</li>
          <li>Energized through traditional Vedic mantras and rituals</li>
          <li>Available in multiple sizes from pocket to wall-mount versions</li>
        </ul>
        
        <h4>Usage Instructions:</h4>
        <p>Place the Yantra in your home, office, or meditation space facing east or north. Regular worship with flowers, incense, and lighting a diya enhances its power. Chant the corresponding mantra daily for maximum benefits.</p>
      </div>
    `,
    price: '₹799',
    originalPrice: '₹1,599',
    slug: 'yantras',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754014/yantra_kppksi.jpg',
    category: 'Yantras',
    rating: 4.7,
  },
  {
    id: 'healing-jewelry',
    title: 'Healing Bracelets & Jewelry',
    description:
      'Gemstone bracelets, healing pendants, and spiritual jewelry for protection, love, and prosperity.',
    detailedDescription: `
      <div>
        <h3>Wearable Healing Energy for Daily Protection</h3>
        <p>Our healing jewelry collection combines the beauty of precious gemstones with their powerful metaphysical properties. Each piece is carefully designed to not only look elegant but also provide continuous healing energy throughout your day. Crafted with authentic gemstones and sterling silver or gold-plated settings.</p>
        
        <h4>Featured Collections:</h4>
        <ul>
          <li><strong>Chakra Balancing Bracelets</strong> - 7 chakra stones for energy alignment</li>
          <li><strong>Protection Pendants</strong> - Black tourmaline and obsidian for shielding</li>
          <li><strong>Love & Relationship Jewelry</strong> - Rose quartz and moonstone pieces</li>
          <li><strong>Prosperity Rings</strong> - Citrine and green aventurine for abundance</li>
          <li><strong>Healing Earrings</strong> - Amethyst and clear quartz for clarity</li>
        </ul>
        
        <h4>Gemstone Properties:</h4>
        <ul>
          <li><strong>Amethyst</strong> - Enhances intuition and spiritual awareness</li>
          <li><strong>Rose Quartz</strong> - Promotes love, compassion, and emotional healing</li>
          <li><strong>Black Tourmaline</strong> - Provides protection from negative energy</li>
          <li><strong>Citrine</strong> - Attracts abundance and positive energy</li>
          <li><strong>Clear Quartz</strong> - Amplifies energy and promotes clarity</li>
        </ul>
        
        <h4>Care Instructions:</h4>
        <p>Cleanse your healing jewelry regularly under running water or moonlight. Store in a soft cloth when not wearing. Each piece comes with a detailed guide on gemstone properties and care instructions.</p>
      </div>
    `,
    price: '₹1,199',
    originalPrice: '₹2,399',
    slug: 'healing-jewelry',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092130/jewelery_tbvrw1.jpg',
    category: 'Jewelry',
    rating: 4.9,
  },
  {
    id: 'puja-samagri-kits',
    title: 'Puja Samagri & Ritual Kits',
    description:
      'Complete kits for home puja, havan, and Vedic rituals, including all essentials. Perfect for daily worship and special occasions.',
    detailedDescription: `
      <div>
        <h3>Complete Spiritual Ritual Essentials</h3>
        <p>Our comprehensive Puja Samagri kits contain everything you need for traditional Hindu rituals and ceremonies. Each kit is carefully assembled with authentic materials sourced from sacred places across India, ensuring the highest quality for your spiritual practices.</p>
        
        <h4>Kit Contents:</h4>
        <ul>
          <li>Pure cow ghee and sesame oil for lamps</li>
          <li>Natural incense sticks and dhoop</li>
          <li>Sacred flowers and garlands</li>
          <li>Kumkum, turmeric, and sandalwood paste</li>
          <li>Camphor and cotton wicks</li>
          <li>Brass diya and puja thali</li>
          <li>Sacred threads and offerings</li>
        </ul>
        
        <h4>Perfect For:</h4>
        <ul>
          <li>Daily home worship and prayers</li>
          <li>Festival celebrations and special occasions</li>
          <li>Havan and fire ceremonies</li>
          <li>Griha pravesh and house warming</li>
          <li>Personal spiritual practices</li>
        </ul>
      </div>
    `,
    price: '₹999',
    originalPrice: '₹1,999',
    slug: 'puja-samagri-kits',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754218/puja_samagri_sc0vpt.jpg',
    category: 'Ritual Kits',
    rating: 4.6,
  },
  {
    id: 'astrology-reports-kundli',
    title: 'Astrology Reports & Kundli Services',
    description:
      'Personalized astrology reports, Janam Kundli, and detailed horoscope analysis by expert astrologers.',
    detailedDescription: `
      <div>
        <h3>Comprehensive Astrological Analysis & Guidance</h3>
        <p>Get detailed insights into your life path with our personalized astrology reports prepared by experienced Vedic astrologers. Each report is meticulously crafted based on your exact birth details to provide accurate predictions and remedial measures.</p>
        
        <h4>Report Includes:</h4>
        <ul>
          <li>Complete Janam Kundli with planetary positions</li>
          <li>Detailed personality analysis and characteristics</li>
          <li>Career and financial predictions</li>
          <li>Marriage and relationship compatibility</li>
          <li>Health and wellness insights</li>
          <li>Auspicious dates for important events</li>
          <li>Gemstone and remedy recommendations</li>
        </ul>
        
        <h4>What You Get:</h4>
        <ul>
          <li>20-30 page detailed PDF report</li>
          <li>Birth chart in multiple formats</li>
          <li>Planetary period (Dasha) analysis</li>
          <li>Remedial measures and mantras</li>
          <li>One consultation call with astrologer</li>
        </ul>
      </div>
    `,
    price: '₹499',
    originalPrice: '₹999',
    slug: 'astrology-reports-kundli',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754647/kundli_h5hiqg.jpg',
    category: 'Reports',
    rating: 4.8,
  },
  {
    id: 'spiritual-accessories',
    title: 'Spiritual Accessories',
    description:
      'Incense holders, copper bottles, meditation mats, and more for your spiritual space. Premium quality materials.',
    detailedDescription: `
      <div>
        <h3>Essential Accessories for Your Spiritual Journey</h3>
        <p>Transform your sacred space with our carefully curated collection of spiritual accessories. Each item is designed to enhance your meditation, prayer, and spiritual practices while adding beauty and positive energy to your environment.</p>
        
        <h4>Collection Includes:</h4>
        <ul>
          <li>Handcrafted incense holders in various designs</li>
          <li>Pure copper water bottles for health benefits</li>
          <li>Meditation mats made from natural materials</li>
          <li>Crystal stands and display cases</li>
          <li>Brass oil lamps and diya stands</li>
          <li>Sacred symbol wall hangings</li>
          <li>Jewelry boxes and storage solutions</li>
        </ul>
        
        <h4>Benefits of Each Item:</h4>
        <ul>
          <li><strong>Copper Bottles:</strong> Natural antimicrobial properties, improves digestion</li>
          <li><strong>Meditation Mats:</strong> Comfortable seating, energy grounding</li>
          <li><strong>Incense Holders:</strong> Safe burning, aromatic ambiance</li>
          <li><strong>Crystal Stands:</strong> Proper display, energy amplification</li>
        </ul>
      </div>
    `,
    price: '₹399',
    originalPrice: '₹799',
    slug: 'spiritual-accessories',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754784/accessory_viwtit.jpg',
    category: 'Accessories',
    rating: 4.5,
  },
  {
    id: 'personalized-astrology-tools',
    title: 'Personalized Astrology Tools',
    description:
      'Custom-engraved pendants, name plates, and tools based on your birth chart. Made to order with astrological precision.',
    price: '₹1,499',
    originalPrice: '₹2,999',
    slug: 'personalized-astrology-tools',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1752754941/personalized_astrology_tools_mj3501.jpg',
    category: 'Custom',
    rating: 4.9,
  },
  {
    id: 'crystal-healing-collection',
    title: 'Crystal Healing Collection',
    description:
      'Premium healing crystals including Amethyst, Rose Quartz, and Clear Quartz for energy cleansing and spiritual healing.',
    price: '₹899',
    originalPrice: '₹1,799',
    slug: 'crystal-healing-collection',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1753090379/healing_crystals_dkfrib.jpg',
    category: 'Crystals',
    rating: 4.8,
  },
  {
    id: 'sacred-malas',
    title: 'Sacred Malas & Prayer Beads',
    description:
      'Traditional 108-bead malas made from sandalwood, tulsi, and other sacred materials for meditation and chanting.',
    price: '₹699',
    originalPrice: '₹1,399',
    slug: 'sacred-malas',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753091688/mala_svpxn3.jpg',
    category: 'Meditation',
    rating: 4.7,
  },
  {
    id: 'vedic-incense',
    title: 'Vedic Incense & Dhoop',
    description:
      'Pure, natural incense sticks and dhoop cones made from traditional Vedic ingredients for purification rituals.',
    price: '₹299',
    originalPrice: '₹599',
    slug: 'vedic-incense',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092130/natural_incense_sticks_xa8jr6.jpg',
    category: 'Aromatherapy',
    rating: 4.5,
  },
  {
    id: 'copper-vessels',
    title: 'Copper Vessels & Utensils',
    description:
      'Handcrafted copper water bottles, glasses, and ritual vessels for health benefits and spiritual practices.',
    price: '₹1,299',
    originalPrice: '₹2,599',
    slug: 'copper-vessels',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092131/copper_items_nnae1n.jpg',
    category: 'Wellness',
    rating: 4.6,
  },
  {
    id: 'meditation-accessories',
    title: 'Meditation Cushions & Mats',
    description:
      'Comfortable meditation cushions and yoga mats made from organic materials for your spiritual practice.',
    price: '₹1,999',
    originalPrice: '₹3,999',
    slug: 'meditation-accessories',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092130/meditationn_cushion_ocofmg.jpg',
    category: 'Meditation',
    rating: 4.8,
  },
  {
    id: 'spiritual-books',
    title: 'Spiritual Books & Mantras',
    description:
      'Sacred texts, mantra books, and spiritual guides including Bhagavad Gita, Vedic scriptures, and more.',
    price: '₹599',
    originalPrice: '₹1,199',
    slug: 'spiritual-books',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092132/book_collection_xmxrru.jpg',
    category: 'Books',
    rating: 4.9,
  },
  {
    id: 'feng-shui-vastu',
    title: 'Feng Shui & Vastu Items',
    description:
      'Feng Shui crystals, Vastu pyramids, and harmony items to balance energy in your home and workplace.',
    price: '₹799',
    originalPrice: '₹1,599',
    slug: 'feng-shui-vastu',
    image:
      'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092133/feng_shui_vzelik.jpg',
    category: 'Energy',
    rating: 4.7,
  },
  {
    id: 'divine-statues',
    title: 'Divine Statues & Idols',
    description:
      'Beautiful brass and marble statues of Hindu deities, Buddha, and spiritual figures for your home temple.',
    price: '₹1,999',
    originalPrice: '₹3,999',
    slug: 'divine-statues',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092130/idols_vgyune.jpg',
    category: 'Devotional',
    rating: 4.8,
  },
  {
    id: 'healing-jewelry',
    title: 'Healing Bracelets & Jewelry',
    description:
      'Gemstone bracelets, healing pendants, and spiritual jewelry for protection, love, and prosperity.',
    price: '₹1,199',
    originalPrice: '₹2,399',
    slug: 'healing-jewelry',
    image: 'https://res.cloudinary.com/dxwspucxw/image/upload/v1753092130/jewelery_tbvrw1.jpg',
    category: 'Jewelry',
    rating: 4.9,
  },
  {
    id: 'mars-energy-bracelet',
    title: 'Mars Energy Bracelet',
    description: 'Natural gemstone bracelet channeling Mars planet energy for courage, strength, and leadership qualities.',
    detailedDescription: `
      <div style="color: #374151; line-height: 1.8;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Mars Energy Bracelet - Channel Courage & Strength</h3>
        <p style="margin-bottom: 1rem; color: #4b5563;">The Mars Energy Bracelet is expertly crafted with natural gemstones that resonate with Mars planet energy. Mars represents courage, strength, leadership, and determination. This powerful bracelet helps channel Mars's positive energy to enhance your confidence, overcome obstacles, and achieve your goals with unwavering determination.</p>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Gemstones Used:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Red Jasper</strong> - Enhances courage and physical strength</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Carnelian</strong> - Boosts confidence, motivation, and leadership qualities</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Benefits:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Enhances courage and determination</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Boosts leadership qualities and confidence</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Helps overcome obstacles and fears</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Increases physical strength and energy</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Supports goal achievement and success</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">How to Use:</h4>
        <p style="margin-bottom: 1rem; color: #4b5563;">Wear the bracelet on your right wrist for maximum Mars energy absorption. It's best to wear it during the day, especially when you need courage or strength. You can also wear it during Mars hora (Tuesday) for enhanced benefits. Cleanse it monthly with running water to maintain its energy.</p>
      </div>
    `,
    price: '₹1,299',
    originalPrice: '₹2,499',
    slug: 'mars-energy-bracelet',
    image: '/images/products/mars-energy-bracelet-main.jpg',
    category: 'Energy Bracelets',
    rating: 4.7,
  },
  {
    id: 'jupiter-energy-bracelet',
    title: 'Jupiter Energy Bracelet',
    description: 'Natural gemstone bracelet channeling Jupiter planet energy for wisdom, knowledge, and spiritual growth.',
    detailedDescription: `
      <div style="color: #374151; line-height: 1.8;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Jupiter Energy Bracelet - Enhance Wisdom & Prosperity</h3>
        <p style="margin-bottom: 1rem; color: #4b5563;">The Jupiter Energy Bracelet is crafted with natural gemstones that resonate with Jupiter planet energy. Jupiter represents wisdom, knowledge, spirituality, higher learning, and good fortune. This sacred bracelet helps channel Jupiter's positive energy to enhance wisdom, attract prosperity, and strengthen spiritual growth.</p>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Gemstones Used:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Yellow Sapphire</strong> - Primary gemstone for Jupiter, enhancing wisdom and knowledge</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Citrine</strong> - Boosts optimism, abundance, and positive energy</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Benefits:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Enhances wisdom and knowledge</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Attracts good fortune and prosperity</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Strengthens spiritual growth and development</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Improves decision-making abilities</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Supports higher education and learning</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">How to Use:</h4>
        <p style="margin-bottom: 1rem; color: #4b5563;">Wear the bracelet on your right wrist for maximum Jupiter energy absorption. It's best to wear it during the day, especially during Jupiter hora (Thursday). The morning hours are most auspicious for Jupiter energy. Cleanse it monthly with running water and charge it in sunlight for enhanced benefits.</p>
      </div>
    `,
    price: '₹1,399',
    originalPrice: '₹2,599',
    slug: 'jupiter-energy-bracelet',
    image: '/images/products/jupiter-energy-bracelet-main.jpg',
    category: 'Energy Bracelets',
    rating: 4.9,
  },
  {
    id: 'sun-energy-bracelet',
    title: 'Sun Energy Bracelet',
    description: 'Natural gemstone bracelet channeling Sun planet energy for leadership, authority, and success.',
    detailedDescription: `
      <div style="color: #374151; line-height: 1.8;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Sun Energy Bracelet - Boost Leadership & Authority</h3>
        <p style="margin-bottom: 1rem; color: #4b5563;">The Sun Energy Bracelet is crafted with natural gemstones that resonate with Sun planet energy. The Sun represents leadership, authority, confidence, and success. This powerful bracelet helps channel the Sun's positive energy to enhance your leadership qualities, boost confidence, and achieve success in all areas of life.</p>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Gemstones Used:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Ruby</strong> - Primary gemstone for Sun, enhancing leadership and authority</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Orange Carnelian</strong> - Boosts confidence, creativity, and personal power</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Benefits:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Enhances leadership qualities and authority</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Boosts confidence and self-esteem</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Attracts success and recognition</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Improves relationships with authority figures</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Increases personal power and influence</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">How to Use:</h4>
        <p style="margin-bottom: 1rem; color: #4b5563;">Wear the bracelet on your right wrist for maximum Sun energy absorption. It's best to wear it during the day, especially during Sun hora (Sunday). The morning hours are most auspicious for Sun energy. Cleanse it monthly with running water and charge it in sunlight for enhanced energy.</p>
      </div>
    `,
    price: '₹1,199',
    originalPrice: '₹2,299',
    slug: 'sun-energy-bracelet',
    image: '/images/products/sun-energy-bracelet-main.jpg',
    category: 'Energy Bracelets',
    rating: 4.8,
  },
  {
    id: 'amethyst-crystal',
    title: 'Amethyst Crystal',
    description: 'Natural Amethyst crystal for stress relief, spiritual growth, and protection. Perfect for meditation and healing.',
    detailedDescription: `
      <div style="color: #374151; line-height: 1.8;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Natural Amethyst Crystal - Your Gateway to Peace & Spiritual Growth</h3>
        <p style="margin-bottom: 1rem; color: #4b5563;">Amethyst is one of the most beloved and powerful crystals in the healing world. Known for its stunning purple hue and calming energy, this natural Amethyst crystal is perfect for stress relief, spiritual growth, and protection. Each piece is carefully selected for its quality, color, and energy properties.</p>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Healing Properties:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Stress Relief</strong> - Calms the mind and reduces anxiety</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Spiritual Growth</strong> - Enhances intuition and spiritual awareness</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Protection</strong> - Creates a protective energy shield</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Better Sleep</strong> - Promotes peaceful and restful sleep</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Best Uses:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Place in bedroom for peaceful sleep</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Use during meditation for spiritual growth</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Keep near workspace for stress relief</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Position in northeast corner for positive energy</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Care Instructions:</h4>
        <p style="margin-bottom: 1rem; color: #4b5563;">Cleanse your Amethyst by placing it under moonlight overnight, using sage smoke, or rinsing with clean water. Avoid direct sunlight as it can fade the color. Regular cleansing helps maintain its powerful energy and effectiveness.</p>
      </div>
    `,
    price: '₹1,299',
    originalPrice: '₹2,999',
    slug: 'amethyst-crystal',
    image: '/images/products/amethyst-1.jpg',
    category: 'Healing Crystals',
    rating: 4.8,
  },
  {
    id: 'raw-pyrite-bracelet',
    title: 'Raw Pyrite Bracelet',
    description: 'Natural Raw Pyrite bracelet for attracting wealth, business success, and protection. Known as "Fool\'s Gold".',
    detailedDescription: `
      <div style="color: #374151; line-height: 1.8;">
        <h3 style="font-size: 1.5rem; font-weight: 600; color: #23244a; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Raw Pyrite Bracelet - Attract Wealth & Success</h3>
        <p style="margin-bottom: 1rem; color: #4b5563;">Raw Pyrite, also known as "Fool's Gold," is a powerful crystal that attracts wealth, abundance, and prosperity. This handcrafted Raw Pyrite bracelet is believed to enhance business success, protect against negative energy, and boost confidence and willpower. Each bracelet is made with genuine pyrite stones and blessed by expert astrologers.</p>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Key Benefits:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Wealth Attraction</strong> - Draws financial abundance and prosperity</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Business Success</strong> - Enhances entrepreneurial skills and opportunities</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Protection</strong> - Shields against negative energy and influences</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;"><strong style="color: #23244a; font-weight: 600;">Confidence Boost</strong> - Increases willpower and self-confidence</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">Who Should Wear:</h4>
        <ul style="margin-bottom: 1.5rem; padding-left: 1.5rem;">
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Entrepreneurs and business professionals</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Those seeking financial abundance</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">People looking to boost confidence</li>
          <li style="margin-bottom: 0.5rem; color: #4b5563;">Anyone wanting protection from negativity</li>
        </ul>
        
        <h4 style="font-size: 1.25rem; font-weight: 600; color: #23244a; margin-top: 1.5rem; margin-bottom: 0.75rem;">How to Use:</h4>
        <p style="margin-bottom: 1rem; color: #4b5563;">Wear on your left wrist to receive its energy, or on your right wrist to project its energy outward. For best results, cleanse it monthly with moonlight or salt water. The natural stones will maintain their energy with proper care and intention.</p>
      </div>
    `,
    price: '₹1,299',
    originalPrice: '₹3,999',
    slug: 'raw-pyrite-bracelet',
    image: '/images/products/pyrite-bracelet-1.jpg',
    category: 'Wealth Bracelets',
    rating: 4.9,
  },
];

export function getProductById(id) {
  if (!id) return undefined;
  const idString = String(id);
  const product = products.find(
    (p) => String(p.id) === idString || String(p.slug) === idString
  );
  
  // Add default detailed description if not provided
  if (product && !product.detailedDescription) {
    product.detailedDescription = getDefaultDetailedDescription(product);
  }
  
  return product;
}


