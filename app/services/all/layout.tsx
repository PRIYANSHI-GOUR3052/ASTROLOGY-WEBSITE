import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Spiritual Services | Complete Astrology Services Collection',
  description: 'Explore our comprehensive collection of spiritual and astrology services. From Vedic astrology consultations to spiritual guidance, find the perfect service for your journey of self-discovery.',
  keywords: [
    'astrology services',
    'spiritual guidance',
    'vedic astrology',
    'horoscope reading',
    'consultation services',
    'spiritual services',
    'astrology consultation',
    'spiritual counseling'
  ],
  openGraph: {
    title: 'All Spiritual Services | Complete Astrology Services Collection',
    description: 'Discover our complete range of spiritual and astrology services designed to guide you on your journey of enlightenment.',
    type: 'website',
    url: '/services/all',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Spiritual Services | Complete Astrology Services Collection',
    description: 'Explore our comprehensive collection of spiritual and astrology services for your journey of self-discovery.',
  },
  alternates: {
    canonical: '/services/all',
  },
};

export default function AllServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
