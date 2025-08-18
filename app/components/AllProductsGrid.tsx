import React from 'react';
import { useLanguage } from '../contexts/useLanguage';
import { ProductServiceCard } from './ProductServiceCard';

const productKeys = [
  'dhanYogBracelet',
  'rawPyriteBracelet',
  'moneyMagnetBracelet',
  'loveMoneyAttractorBracelet',
  'selenitePlate',
  'navgrahaShantiBracelet',
  'sevenMukhiRudrakshaBracelet',
  'mahaDhanYogCombo',
  'richieRichCombo',
  'loveAttractionBracelet',
  'energisedDhanYogBracelet',
  'rawPyriteStone',
  'evilEyeObsidianBracelet',
  'problemSolverCombo',
  'successCombo',
  'healthWellnessBracelet',
  'careerBoosterBracelet',
  'protectionBracelet',
  'peaceHarmonyBracelet',
  'spiritualGrowthBracelet',
  'focusClarityBracelet',
  'confidenceBoosterBracelet',
  'calmMindBracelet',
];

const products = [
  // Use productKeys for translation lookup
  { key: 'dhanYogBracelet', image: '/images/dhan-yog-bracelet.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'rawPyriteBracelet', image: '/images/pyrite.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'moneyMagnetBracelet', image: '/images/money-magnet.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'loveMoneyAttractorBracelet', image: '/images/love-money-attractor.jpg', price: 499, oldPrice: 1999, discountKey: 'discount75' },
  { key: 'selenitePlate', image: '/images/selenite-plate.jpg', price: 699, oldPrice: 1999, discountKey: 'discount65' },
  { key: 'navgrahaShantiBracelet', image: '/images/navgraha-shanti.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'sevenMukhiRudrakshaBracelet', image: '/images/7mukhi-rudraksha.jpg', price: 599, oldPrice: 2499, discountKey: 'discount76' },
  { key: 'mahaDhanYogCombo', image: '/images/maha-dhan-yog.jpg', price: 999, oldPrice: 5307, discountKey: 'discount81' },
  { key: 'richieRichCombo', image: '/images/richie-rich.jpg', price: 999, oldPrice: 2999, discountKey: 'discount67' },
  { key: 'loveAttractionBracelet', image: '/images/love-attraction.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'energisedDhanYogBracelet', image: '/images/energised-dhan-yog.jpg', price: 699, oldPrice: 1999, discountKey: 'discount65' },
  { key: 'rawPyriteStone', image: '/images/pyrite.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'evilEyeObsidianBracelet', image: '/images/evil-eye-obsidian.jpg', price: 499, oldPrice: 1699, discountKey: 'discount71' },
  { key: 'problemSolverCombo', image: '/images/problem-solver.jpg', price: 999, oldPrice: 7896, discountKey: 'discount88' },
  { key: 'successCombo', image: '/images/success-combo.jpg', price: 899, oldPrice: 2999, discountKey: 'discount70' },
  { key: 'healthWellnessBracelet', image: '/images/health-wellness.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'careerBoosterBracelet', image: '/images/career-booster.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'protectionBracelet', image: '/images/protection.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'peaceHarmonyBracelet', image: '/images/peace-harmony.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'spiritualGrowthBracelet', image: '/images/spiritual-growth.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'focusClarityBracelet', image: '/images/focus-clarity.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'confidenceBoosterBracelet', image: '/images/confidence-booster.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
  { key: 'calmMindBracelet', image: '/images/calm-mind.jpg', price: 599, oldPrice: 1999, discountKey: 'discount70' },
];

export const defaultProducts = products;

export default function AllProductsGrid() {
  const { t } = useLanguage();
  return (
    <section className="w-full flex flex-col items-center py-12">
      <h2 className="text-4xl font-normal mb-8 text-black text-center" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>{t('shop.products.heading')}</h2>
      <p className="mb-8 text-lg text-gray-700 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>{t('shop.products.description')}</p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16">
        {products.slice(0, 21).map((product, idx) => (
          <ProductServiceCard
            key={product.key}
            image={product.image}
            title={product.key}
            description={`₹${product.price} (was ₹${product.oldPrice})`}
            badge={product.discountKey || ''}
            href={`/shop/${product.key}`}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </section>
  );
} 