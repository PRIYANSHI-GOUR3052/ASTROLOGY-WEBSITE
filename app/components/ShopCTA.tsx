import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ShopCTA() {
  return (
    <section className="text-center py-16 px-4 bg-sunburst-yellow/20 rounded-lg mt-16">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-mystic-brown">
        Enhance Your Spiritual Journey
      </h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto text-mystic-brown/80">
        Discover the perfect tools and artifacts to support your spiritual growth and daily practices.
      </p>
      <Button asChild size="lg" className="bg-sunburst-yellow text-mystic-brown hover:bg-sunburst-yellow-light">
        <Link href="/contact">Get Personalized Recommendations</Link>
      </Button>
    </section>
  )
}

