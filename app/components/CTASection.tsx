import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="text-center py-16 px-4 bg-sunburst-yellow/20 rounded-2xl shadow-lg border border-yellow-200">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black drop-shadow-sm">
        Begin Your Spiritual Journey Today
      </h2>
      <p className="text-xl font-semibold mb-8 max-w-2xl mx-auto text-black">
        Unlock the secrets of the cosmos and discover your true potential with our expert guidance.
      </p>
      <Button asChild size="lg" className="bg-black text-white hover:bg-gray-900 font-bold shadow-md">
        <Link href="/contact">Book a Consultation</Link>
      </Button>
    </section>
  )
}

