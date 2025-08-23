import { Star, Quote } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../contexts/useLanguage';

export function AboutSummary() {
  const { t } = useLanguage();
  
  return (
    <section className="bg-white rounded-2xl shadow p-6 border border-indigo-100 mb-8">
      <h2 className="text-2xl font-bold text-indigo-900 mb-4 font-serif">{t('about.journey.heading')}</h2>
      <div className="mb-6 text-gray-700 space-y-4 text-base">
        <p>{t('about.journey.description')}</p>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
          <h3 className="font-bold text-blue-900 text-base mb-2 flex items-center">
            <Star className="w-4 h-4 mr-2" />
            {t('about.philosophy.heading')}
          </h3>
          <p className="text-blue-800">{t('about.philosophy.description')}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-orange-400 p-4 rounded-lg">
          <span className="text-orange-700 font-bold">{t('about.milestone.label')}:</span> <span className="text-black font-semibold">{t('about.milestone.description')}</span>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-4 rounded-lg">
          <span className="text-green-700 font-bold">{t('about.values.label')}:</span> <span className="text-black font-semibold">{t('about.values.description')}</span>
        </div>
      </div>
      <div className="bg-indigo-50 rounded-lg p-4 mb-6">
        <h3 className="text-lg font-bold text-indigo-900 mb-2">{t('about.quickFacts.heading')}</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>{t('about.quickFacts.fact1')}</li>
          <li>{t('about.quickFacts.fact2')}</li>
          <li>{t('about.quickFacts.fact3')}</li>
          <li>{t('about.quickFacts.fact4')}</li>
          <li>{t('about.quickFacts.fact5')}</li>
          <li>{t('about.quickFacts.fact6')}</li>
        </ul>
      </div>
      <div className="bg-indigo-50 rounded-lg p-4">
        <h3 className="text-lg font-bold text-indigo-900 mb-2">{t('about.recommendedResources.heading')}</h3>
        <ul className="space-y-2">
          <li><Link href="/blog/understanding-your-birth-chart" className="text-indigo-700 hover:underline flex items-center"><span className="text-indigo-500 mr-2">→</span>{t('about.recommendedResources.resource1')}</Link></li>
          <li><Link href="/blog/gemstones-and-their-powers" className="text-indigo-700 hover:underline flex items-center"><span className="text-indigo-500 mr-2">→</span>{t('about.recommendedResources.resource2')}</Link></li>
          <li><Link href="/blog/numerology-basics" className="text-indigo-700 hover:underline flex items-center"><span className="text-indigo-500 mr-2">→</span>{t('about.recommendedResources.resource3')}</Link></li>
          <li><Link href="/blog/the-influence-of-planets" className="text-indigo-700 hover:underline flex items-center"><span className="text-indigo-500 mr-2">→</span>{t('about.recommendedResources.resource4')}</Link></li>
        </ul>
      </div>
    </section>
  );
} 