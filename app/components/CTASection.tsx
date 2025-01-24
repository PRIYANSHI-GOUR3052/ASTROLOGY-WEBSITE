import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="text-center py-16 px-4 bg-sunburst-yellow/20 rounded-lg">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-mystic-brown">
        Begin Your Spiritual Journey Today
      </h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto text-mystic-brown/80">
        Unlock the secrets of the cosmos and discover your true potential with our expert guidance.
      </p>
      <Button asChild size="lg" className="bg-sunburst-yellow text-mystic-brown hover:bg-sunburst-yellow-light">
        <Link href="/contact">Book a Consultation</Link>
      </Button>
    </section>
  )
}

