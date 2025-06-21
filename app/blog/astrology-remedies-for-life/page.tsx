"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { FaPrayingHands, FaGem, FaBurn, FaHandsHelping, FaSeedling, FaShieldAlt, FaSun, FaMoon, FaStarOfLife, FaPalette, FaWater, FaDonate } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DrNarendraProfile } from '../../components/DrNarendraProfile';
import { Statistics } from '../../components/Statistics';
import { ContactForm } from '../../components/ContactForm';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

const tabs = ['Overview', 'Benefits', 'FAQs', 'Book a Consultation'];

const benefits = [
  {
    icon: <FaShieldAlt className="text-green-400 w-8 h-8 mb-2" />, title: 'Mitigate Malefic Influences', desc: 'Pacify challenging planetary placements in your chart to reduce obstacles and promote smoother life progress.'
  },
  {
    icon: <FaSun className="text-yellow-400 w-8 h-8 mb-2" />, title: 'Strengthen Benefic Planets', desc: 'Amplify the positive effects of well-placed planets to enhance luck, opportunities, and overall well-being.'
  },
  {
    icon: <FaHandsHelping className="text-rose-400 w-8 h-8 mb-2" />, title: 'Resolve Specific Life Issues', desc: 'Receive targeted remedies for specific problems related to career, relationships, health, or finances.'
  },
  {
    icon: <FaGem className="text-cyan-400 w-8 h-8 mb-2" />, title: 'Harness Gemstone Power', desc: 'Learn which specific gemstones can be worn to balance your energies, protect you from negativity, and attract prosperity.'
  },
  {
    icon: <FaPrayingHands className="text-indigo-400 w-8 h-8 mb-2" />, title: 'Empower with Mantras', desc: 'Utilize the vibrational power of personalized mantras to connect with planetary deities and align your intentions with cosmic forces.'
  },
  {
    icon: <FaDonate className="text-orange-400 w-8 h-8 mb-2" />, title: 'Karmic Healing through Charity', desc: 'Understand how specific acts of charity (Daan) related to different planets can help resolve past karmic imbalances.'
  },
  {
    icon: <FaBurn className="text-red-500 w-8 h-8 mb-2" />, title: 'Purify with Rituals (Yagyas)', desc: 'Leverage ancient fire ceremonies and rituals to cleanse your aura and create a sacred space for positive transformation.'
  },
  {
    icon: <FaSeedling className="text-lime-500 w-8 h-8 mb-2" />, title: 'Improve Health & Vitality', desc: 'Apply astrological remedies related to diet, lifestyle, and herbs to support your physical and mental health based on your chart.'
  }
];

const faqs = [
  {
    q: 'What are astrological remedies?',
    a: 'Astrological remedies are a set of ancient practices prescribed in Vedic texts designed to pacify or strengthen planetary energies in one\'s life. They are therapeutic measures used to alleviate challenges and enhance positive outcomes based on an individual\'s unique birth chart.'
  },
  {
    q: 'How do remedies work?',
    a: 'Remedies work on the principle of resonance and karmic adjustment. Practices like chanting mantras, wearing gemstones, or performing charity create specific energetic vibrations that counteract negative planetary influences or amplify positive ones. They are tools to help consciously re-align your energy with a more favorable cosmic flow.'
  },
  {
    q: 'Is it necessary to spend a lot of money on remedies?',
    a: 'Not at all. While some remedies like high-quality gemstones or elaborate Yagyas can be an investment, many of the most powerful remedies are free. These include chanting specific mantras, fasting on certain days, offering water to celestial bodies, and performing simple acts of service and charity. The sincerity and consistency of the practice are more important than the cost.'
  },
  {
    q: 'Can anyone perform these remedies?',
    a: 'Yes, most simple remedies can be performed by anyone. However, it is crucial that they are recommended by a qualified astrologer based on a thorough analysis of your birth chart. Performing the wrong remedy can be ineffective or, in some cases, even counterproductive. Personalization is key.'
  },
  {
    q: 'How long does it take to see results from remedies?',
    a: 'The time frame for results varies greatly depending on the individual, the intensity of the planetary affliction, and the consistency of the practice. Some people may notice subtle shifts in their mindset and environment within days, while for others, it may take several weeks or months of dedicated practice to see significant tangible results. Patience and faith are essential.'
  },
  {
    q: 'Are remedies a substitute for medical treatment or professional advice?',
    a: 'Absolutely not. Astrological remedies are a form of spiritual and energetic support. They are meant to complement, not replace, professional medical, legal, or financial advice. You should always consult with a qualified professional for any serious health or life issues.'
  }
];

export default function AstrologicalRemediesPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-green-50 to-white font-sans pt-16 md:pt-24">
      <div className="container mx-auto pb-16 px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="w-full rounded-3xl bg-gradient-to-r from-[#f0fff4] via-[#f5fff5] to-[#f0fff9] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-green-100">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg font-serif" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Astrological Remedies for Life</h1>
          <p className="text-xl md:text-2xl text-center text-gray-700 max-w-2xl font-sans" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
            Harmonize planetary energies and overcome life's obstacles with time-tested Vedic solutions.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors font-sans ${activeTab === tab ? 'border-green-500 text-green-600 font-bold' : 'border-transparent text-gray-600 hover:text-gray-900'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-12 text-lg leading-relaxed text-gray-800 space-y-6" style={{ fontFamily: 'Lora, serif', textAlign: 'justify' }}>
            <p>Vedic astrology does not just diagnose problems; it offers a profound and practical system of <span className="font-bold text-green-900">Upaaya</span>, or remedial measures, to harmonize planetary energies and navigate life's challenges. These remedies are not superstitions but are sophisticated tools for karmic healing, designed to work on subtle energetic levels to bring about tangible positive changes. They empower you to move from a state of passive fate to one of conscious co-creation with the cosmos.</p>
            <p>The core principle is that a planet causing affliction in a birth chart represents a specific karmic debt or energetic imbalance. Remedies work to address this imbalance. This can be done by either strengthening a weak benefic planet to enhance its positive qualities or by pacifying a strong malefic planet to mitigate its harmful effects. The goal is always to restore balance and align your personal energy field with the harmonious vibrations of the universe.</p>
            <p>Remedies are highly personalized and must be prescribed by a knowledgeable astrologer after a deep analysis of your unique birth chart. A remedy that works wonders for one person may be ineffective or even harmful for another. The selection depends on the specific planet, its position, its dignity, and the nature of the issue you are facing. Common categories of remedies include wearing specific gemstones (<span className="font-bold">Ratna</span>), chanting planetary mantras (<span className="font-bold">Mantra</span>), performing acts of charity (<span className="font-bold">Daan</span>), and conducting sacred rituals (<span className="font-bold">Yagya</span>).</p>
            <p>Another powerful form of remedy involves the use of <span className="font-bold text-green-900">Yantras</span>. These are sacred geometric diagrams that serve as visual tools for meditation and focus. Each planet has a specific Yantra that is a mystical representation of its energy pattern. By meditating upon a Yantra, one can tune into the frequency of the planet, internalize its positive qualities, and create a powerful shield against its negative influences. Keeping a Yantra in one's home or place of work can purify the space and attract auspicious energies.</p>
            <p>The practice of <span className="font-bold text-green-900">Vratas</span>, or ritual fasting on specific days of the week, is a time-honored remedy for appeasing planetary deities. For example, fasting on a Monday is dedicated to Lord Shiva and strengthens the Moon, promoting emotional peace. Similarly, a Saturday fast can pacify an afflicted Saturn, reducing obstacles and hardship. These acts of discipline and devotion generate a powerful spiritual energy that can renegotiate challenging karmic patterns and earn planetary grace.</p>
            <p>The element of fire is a potent agent of purification, and this is harnessed in <span className="font-bold text-green-900">Homas</span> or <span className="font-bold text-green-900">Yagyas</span> (fire rituals). In these ceremonies, specific offerings, such as ghee and grains, along with particular types of wood corresponding to different planets (like Sandalwood for Jupiter), are offered to the fire while chanting Vedic mantras. This ritual is believed to directly transmit the offerings to the deities through the fire god, Agni, thereby cleansing negative karma and creating a powerful field of divine protection and blessings.</p>
            <p>Beyond prescribed rituals, the concept of <span className="font-bold text-green-900">Seva</span>, or selfless service, is considered a universal remedy of the highest order. Every planet signifies certain relationships or aspects of society. For instance, Saturn represents the elderly, the poor, and laborers. By performing selfless service for these groups—helping at an old age home or donating to the needy, for example—one can directly appease Saturn and mitigate its malefic effects. Seva helps dissolve negative karma by transforming selfish patterns into compassionate action.</p>
            <p>The ancient seers understood that sound and color have a profound effect on our energetic system. <span className="font-bold text-green-900">Nada</span> (sound) and <span className="font-bold text-green-900">Varna Chikitsa</span> (color therapy) are integral parts of astrological remedies. Chanting the Bija (seed) mantras for each planet creates sound vibrations that resonate with their cosmic frequency. Similarly, wearing colors associated with benefic planets (like yellow for Jupiter) or avoiding colors of malefic ones can subtly shift your aura and how you interact with planetary energies on a daily basis.</p>
            <p>Water is a carrier of memory and intention, making it a powerful medium for remedies. A simple yet profound remedy involves offering water (<span className="font-bold text-green-900">Arghya</span>) to the Sun in the morning. As you pour the water, you chant the Gayatri Mantra or a Sun mantra, infusing the water with your prayers. This practice is believed to strengthen the Sun in your chart, boosting confidence, health, and vitality. Similar offerings can be made to the Moon to enhance emotional well-being.</p>
            <p>Ultimately, the most powerful remedy is the cultivation of self-awareness and right action. Astrology provides the map of your karmic landscape, but your free will is the vehicle. By understanding your planetary patterns, you can become conscious of your ingrained tendencies. A remedy for an afflicted Mars, for instance, might be the conscious practice of anger management and patience. By actively choosing to respond differently to planetary triggers, you transform the energy from a source of conflict into a source of strength, which is the true essence of karmic evolution.</p>
            <p>The ultimate and most personalized remedy is the worship of one's <span className="font-bold text-green-900">Ishta Devata</span>, or personal guiding deity. This deity is determined from specific placements in the birth chart, often linked to the Atmakaraka planet in the Navamsha chart. Unlike general planetary remedies, connecting with your Ishta Devata aligns you with your highest spiritual purpose and provides a direct line to divine grace. This practice acts as a master key, gradually harmonizing all planetary energies and providing an unwavering source of inner strength and guidance throughout life's journey.</p>
            <p>Remedies are not just for planets but also for the houses (<span className="font-bold text-green-900">Bhavas</span>) they affect. If the 7th house of marriage is afflicted, remedies might involve honoring couples, donating items related to Venus, or specific pujas for Shiva and Parvati. If the 10th house of career is weak, strengthening the Sun or the 10th lord through their corresponding remedies can invigorate one's professional life. This house-specific approach allows for highly targeted solutions, addressing the exact area of life where a person is facing challenges.</p>
            <p>It is essential to understand that Vedic remedies are a form of <span className="font-bold text-green-900">Pratikara</span>, meaning "counteraction," not magical intervention. They do not erase karma but provide the spiritual and psychological strength to navigate it gracefully. A remedy for an afflicted Saturn won't magically remove all hard work from your life. Instead, it instills the discipline and resilience required to meet Saturn's demands, transforming its energy from a source of suffering into a catalyst for profound maturity.</p>
            <p>The ancient texts associate each of the nine planets with a specific tree or plant, known as <span className="font-bold text-green-900">Vanaspati</span>. These plants are living receptacles of their planet's energy. A powerful and eco-friendly remedy involves planting or meditating near the tree associated with an afflicted planet. For example, nurturing a Peepal tree can appease Jupiter. This practice creates a deep, symbiotic connection with nature's healing energies, grounding your remedial efforts in the living world.</p>
            <p>Just as there is a right time to start a journey, there is an auspicious time to begin a remedy. Starting a remedy during a favorable <span className="font-bold text-green-900">Muhurta</span> (electional timing) can significantly amplify its effectiveness. An astrologer will select a time when the planet being remedied is well-disposed and the Moon is in a favorable Nakshatra, ensuring your efforts are launched on a wave of positive celestial support.</p>
            <p>Specific, complex remedies are often prescribed for challenging planetary combinations, or <span className="font-bold text-green-900">Yogas</span>, like Kaal Sarp Dosha or Kemadruma Yoga. These remedies are often more intricate, involving specific pujas at designated holy places (Tirthas), targeted donations, and the consistent chanting of powerful protective mantras like the Mahamrityunjaya Mantra, designed to untangle these deep-seated karmic knots.</p>
            <p>On a psychological level, remedies function as powerful tools for shifting one's mindset. The act of consistently chanting a mantra redirects the mind from anxiety to a state of meditative calm. Wearing a gemstone serves as a constant physical reminder of your intention to cultivate a planet's positive qualities. This disciplined practice rewires neural pathways, fostering a positive mental attitude that, in itself, becomes a magnet for better life experiences, demonstrating the profound mind-body connection inherent in Vedic wisdom.</p>
            <p>Each of the nine planets is presided over by a specific deity, or <span className="font-bold text-green-900">Adhidevata</span>, who embodies the highest and most sattvic (pure) form of that planet's energy. Propitiating these deities through specific prayers, hymns, and pujas is a very direct and powerful form of remedy. For instance, worshipping Lord Surya (the Sun God) can remedy an afflicted Sun, while honoring Lord Ganesha is a classic remedy for both Ketu-related obstacles and a weak Mercury (as Ganesha rules intellect). This devotional approach helps one connect with the divine intelligence behind the celestial forces, seeking grace and transformation.</p>
            <p>The sacred <span className="font-bold text-green-900">Rudraksha</span> beads, believed to be the tears of Lord Shiva, are another potent remedial tool. Each bead's number of facets, or <span className="font-bold text-green-900">Mukhis</span>, corresponds to a specific planet or deity. For example, a 1-Mukhi Rudraksha is for the Sun, a 2-Mukhi for the Moon, and a 7-Mukhi for Saturn. Wearing the appropriate Rudraksha, after it has been properly energized (prana pratishtha), is said to create a protective bio-electric shield around the wearer, neutralizing negative planetary influences and promoting health, success, and spiritual growth.</p>
            <p>Just as planets are remedied, so too are the <span className="font-bold text-green-900">Nakshatras</span>, or lunar mansions. Each of the 27 Nakshatras has its own ruling deity, mantra, and symbolic tree. If a key planet in your chart is placed in a difficult Nakshatra, or if your birth Nakshatra is afflicted, performing pujas for the Nakshatra's deity or meditating on its specific mantra can bring immense relief. This is a finer, more nuanced level of astrological healing that addresses the specific quality of consciousness that a Nakshatra represents.</p>
            <p>Lifestyle adjustments in alignment with planetary energies are a foundational and often overlooked remedy. This involves embodying the highest qualities of the planets in your daily routine. To strengthen Jupiter, one might engage in teaching or studying sacred texts. To pacify an aggressive Mars, one could channel that energy into disciplined physical exercise or volunteer work. For Saturn, practicing punctuality, respecting elders, and maintaining integrity in one's work are paramount. These conscious actions transform daily life into a continuous act of planetary harmonization.</p>
            <p>Vedic Astrology's sister science, <span className="font-bold text-green-900">Ayurveda</span>, offers another dimension of remedies through diet and herbs. According to Ayurveda, the three doshas (Vata, Pitta, Kapha) are influenced by planetary energies. An afflicted planet can aggravate a corresponding dosha, leading to health issues. An Ayurvedic practitioner with astrological knowledge can recommend a specific diet, lifestyle, and herbal regimen to balance the affected dosha, thereby pacifying the planet on a physiological level and promoting holistic well-being.</p>
            <p>The principles of <span className="font-bold text-green-900">Vastu Shastra</span>, the Vedic science of architecture and space, provide remedies connected to one's living and working environment. An afflicted planet in the chart can correspond to a 'Vastu dosha' (defect) in a particular direction of the home. For example, issues with the Sun might be linked to problems in the east direction. Simple remedies like placing a specific yantra, using certain colors, or reorganizing a room can correct the energy flow in the space, which in turn helps to mitigate the planetary affliction and create a more supportive environment.</p>
            <p>Crucially, the efficacy of any remedy is magnified by the <span className="font-bold text-green-900">Shraddha</span> (faith) and <span className="font-bold text-green-900">Bhakti</span> (devotion) with which it is performed. Remedies are not mechanical transactions. They are spiritual practices that require sincerity, consistency, and a humble heart. The universe responds to intention and feeling. A simple prayer offered with immense faith can be more powerful than an elaborate ritual done without presence. Consistency is also key; just as one takes medicine regularly, remedial practices must be maintained over a prescribed period to allow their subtle energies to take root and bring about lasting transformation.</p>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
              <span className="text-green-600 font-medium">Fundamental Principle:</span> Astrological remedies are practical tools that empower you to heal your karma and consciously improve your destiny.
            </div>
          </motion.div>
        )}
        {activeTab === 'Benefits' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Karmic Resolution</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>Remedies provide a pathway to consciously address and resolve karmic debts, turning fated challenges into opportunities for growth and liberation from past patterns.</p>
              </div>
              {/* Card 2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Enhanced Protection</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>Practices like chanting mantras or wearing yantras create a powerful shield of spiritual energy, protecting you from negative influences and unforeseen dangers.</p>
              </div>
              {/* Card 7 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Deeper Spiritual Connection</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>Remedial practices are a form of sadhana (spiritual discipline) that purifies the mind and deepens your connection to the divine, aligning your individual consciousness with the universal consciousness.</p>
              </div>
              {/* Card 8 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Harmonized Relationships</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>By pacifying planets that govern relationships (like Venus and Mars), remedies can reduce interpersonal conflicts, foster understanding, and attract more loving and supportive connections.</p>
              </div>
              {/* Card 9 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Enhanced Intuition & Clarity</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>As remedies clear energetic blockages related to planets like Ketu and the Moon, your intuitive faculties are sharpened, leading to clearer thinking and better decision-making.</p>
              </div>
              {/* Card 10 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Increased Confidence & Courage</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>Strengthening the Sun and Mars through specific remedies boosts self-esteem, courage, and leadership qualities, empowering you to pursue your goals with renewed vigor.</p>
              </div>
              {/* Card 11 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Removal of Obstacles</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>Propitiating planets like Saturn and Rahu helps dissolve persistent obstacles and delays, allowing for accelerated progress in career, personal projects, and spiritual pursuits.</p>
              </div>
              {/* Card 12 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Alignment with Life Purpose</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>Connecting with your Ishta Devata and strengthening your soul planet (Atmakaraka) through remedies helps align your actions with your true purpose, bringing profound fulfillment.</p>
              </div>
              {/* Card 13 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2">
                <h3 className="text-xl font-bold text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>Improved Financial Flow</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Lora, serif' }}>By strengthening planets like Jupiter (wealth) and Venus (luxury) and remedying afflictions to the 2nd and 11th houses, one can attract greater financial stability and abundance.</p>
              </div>
            </div>
          </motion.div>
        )}
        {activeTab === 'FAQs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">What are astrological remedies?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  Astrological remedies are a set of ancient practices prescribed in Vedic texts designed to pacify or strengthen planetary energies in one's life. They are therapeutic measures used to alleviate challenges and enhance positive outcomes based on an individual's unique birth chart.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">How do remedies work?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  Remedies work on the principle of resonance and karmic adjustment. Practices like chanting mantras, wearing gemstones, or performing charity create specific energetic vibrations that counteract negative planetary influences or amplify positive ones. They are tools to help consciously re-align your energy with a more favorable cosmic flow.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">Is it necessary to spend a lot of money on remedies?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  Not at all. While some remedies like high-quality gemstones or elaborate Yagyas can be an investment, many of the most powerful remedies are free. These include chanting specific mantras, fasting on certain days, offering water to celestial bodies, and performing simple acts of service and charity. The sincerity and consistency of the practice are more important than the cost.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">Can anyone perform these remedies?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  Yes, most simple remedies can be performed by anyone. However, it is crucial that they are recommended by a qualified astrologer based on a thorough analysis of your birth chart. Performing the wrong remedy can be ineffective or, in some cases, even counterproductive. Personalization is key.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">Can I perform remedies for future problems?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  Absolutely. One of the primary purposes of Vedic astrology is proactive guidance. By identifying potential future challenges in the birth chart, an astrologer can prescribe preemptive remedies to mitigate their impact long before they manifest, allowing for a smoother life journey.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">Can I do remedies for someone else, like my child or spouse?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  Yes, certain remedies, especially prayers, pujas, and acts of charity (Daan), can be performed by close family members on behalf of another. The intention (Sankalpa) is key. However, remedies involving wearing something on the body, like a gemstone or Rudraksha, must be done by the individual themselves.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">What if I can't afford expensive gemstones? Are there effective, low-cost remedies?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  Definitely. Vedic astrology offers a vast range of remedies for every budget. Mantra chanting, fasting on specific days, offering water (Arghya), selfless service (Seva), and lifestyle changes are incredibly powerful and completely free. The sincerity and consistency of the practice are more important than the monetary cost.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">How do I know if a remedy is working?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  The effects are often subtle at first. Look for signs of inner change: increased mental peace, a more positive outlook, and feeling more 'in flow'. Externally, you may notice that obstacles seem to dissolve more easily, and new opportunities begin to appear. It's a gradual shift, not an overnight miracle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-9" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">Can remedies change my destiny completely?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  Remedies don't erase karma, but they can significantly change how you experience it. They provide the wisdom and strength to navigate your karmic path gracefully. Think of it like this: you can't change the cards you were dealt, but remedies teach you how to play your hand masterfully, drastically improving the outcome of the game.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-10" className="bg-white rounded-lg shadow-md px-6 py-4">
                <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-green-700 text-left">Why is a qualified astrologer necessary for prescribing remedies?</AccordionTrigger>
                <AccordionContent className="pt-4 text-gray-600" style={{ fontFamily: 'Lora, serif' }}>
                  A birth chart is a complex document. An experienced astrologer can analyze the intricate planetary relationships to pinpoint the true source of a problem. Prescribing the wrong remedy, like strengthening a planet that should be pacified, can be ineffective or even counterproductive. Professional guidance ensures the remedy is safe, appropriate, and powerful.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        )}
        {activeTab === 'Book a Consultation' && (
          <section className="mb-12">
            <div className="rounded-3xl bg-gradient-to-r from-[#f0fff4] via-[#f5fff5] to-[#f0fff9] p-10 shadow-xl border border-green-100 flex flex-col items-center">
              <h2 className="text-3xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Get Your Personalized Remedies</h2>
              <p className="text-lg text-center mb-6 text-gray-700" style={{ fontFamily: 'Open Sans, Arial, sans-serif' }}>
                Consult with our expert astrologer to receive a personalized remedy plan based on your birth chart.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-green-900 block mb-2 font-semibold">Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                  <div>
                    <label className="text-green-900 block mb-2 font-semibold">Email</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                   <div>
                    <label className="text-green-900 block mb-2 font-semibold">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                  <div>
                    <label className="text-green-900 block mb-2 font-semibold">Date of Birth</label>
                    <input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                  <div className="md:col-span-2">
                     <label className="text-green-900 block mb-2 font-semibold">Time of Birth (e.g., 03:45 PM)</label>
                    <input type="time" value={formData.timeOfBirth} onChange={(e) => setFormData({...formData, timeOfBirth: e.target.value})} className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-green-900 block mb-2 font-semibold">Place of Birth (City, Country)</label>
                    <input type="text" value={formData.placeOfBirth} onChange={(e) => setFormData({...formData, placeOfBirth: e.target.value})} className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full" required />
                  </div>
                </div>
                <div>
                  <label className="text-green-900 block mb-2 font-semibold">Your Message or Specific Questions (Optional)</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="bg-white/80 text-green-900 border border-green-200 rounded-lg px-4 py-2 w-full h-32" />
                </div>
                <Button type="submit" className="w-full bg-green-700 text-white hover:bg-green-800 text-lg px-8 py-4 font-bold rounded-full shadow-lg transition-transform transform hover:scale-105">
                  Request My Remedy Plan
                </Button>
              </form>
            </div>
          </section>
        )}

        <div className="mt-20 space-y-20">
          <DrNarendraProfile />
          <Statistics />
        </div>

        <div className="mt-20">
          <ContactForm />
        </div>
      </div>
    </div>
  )
} 