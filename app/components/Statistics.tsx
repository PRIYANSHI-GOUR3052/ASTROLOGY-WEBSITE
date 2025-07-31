'use client';

import { useLanguage } from '../contexts/useLanguage';

export function Statistics() {
  const { t } = useLanguage();
  
  const stats = [
    {
      value: "150k+",
      label: t('about.statistics.kundli_served'),
    },
    {
      value: "40+",
      label: t('about.statistics.years_legacy'),
    },
    {
      value: "100k+",
      label: t('about.statistics.consultations_given'),
    },
    {
      value: "20+",
      label: t('about.statistics.awards_occult'),
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 -mt-8 md:-mt-12 lg:-mt-16" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-row justify-between items-center gap-4 md:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center flex-1 py-6 md:py-8">
              <div className="text-3xl md:text-5xl lg:text-7xl font-bold text-green-800 mb-2 md:mb-3 lg:mb-4" 
                   style={{ fontFamily: 'Inter, sans-serif' }}>
                {stat.value}
              </div>
              <p className="text-sm md:text-base lg:text-lg text-green-700 font-medium uppercase tracking-wide leading-tight"
                 style={{ fontFamily: 'Inter, sans-serif' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
