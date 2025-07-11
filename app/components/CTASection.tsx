import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLanguage } from '../contexts/useLanguage'

export function CTASection() {
  const { t } = useLanguage();
  return (
    <section className="text-center py-16 px-4 bg-sunburst-yellow/20 rounded-2xl shadow-lg border border-yellow-200">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black drop-shadow-sm">
        {t('blog.cta.heading')}
      </h2>
      <p className="text-xl font-semibold mb-8 max-w-2xl mx-auto text-black">
        {t('blog.cta.subheading')}
      </p>
      <Button asChild size="lg" className="bg-black text-white rounded-full py-3 px-8 font-semibold shadow-lg hover:bg-gray-800 border border-black transition-all duration-300">
        <Link href="/contact">{t('blog.cta.button')}</Link>
      </Button>
    </section>
  )
}

