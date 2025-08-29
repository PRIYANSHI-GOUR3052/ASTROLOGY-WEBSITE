'use client';

import ZodiacPageTemplate from '@/app/components/ZodiacPageTemplate';

export default function ScorpioZodiacPage() {
  return (
    <ZodiacPageTemplate 
      zodiacSlug="scorpio"
      signKey="scorpio"
      theme={{
        gradient: 'from-teal-50/30 via-white to-emerald-50/40',
        glowColor: 'rgba(239, 68, 68, 0.15)',
        animationColor: 'rgba(239, 68, 68, 0.12)'
      }}
    />
  );
}