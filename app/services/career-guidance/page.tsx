import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function CareerGuidancePage() {
  return (
    <main className="min-h-screen pt-[100px]">
      <div className="container mx-auto px-4 py-8">
        <Button asChild className="mb-8">
          <Link href="/">← Back to Home</Link>
        </Button>
        
        <h1 className="text-4xl font-serif font-bold mb-8 text-mystic-brown">
          Career Guidance Through Astrology
        </h1>

        <div className="grid gap-8">
          {/* English Content */}
          <section className="prose max-w-none">
            <h2>Navigate Your Professional Path</h2>
            <p>Our astrological career guidance includes:</p>
            <ul>
              <li>Natural talents and abilities</li>
              <li>Ideal career paths</li>
              <li>Favorable periods for career moves</li>
              <li>Professional relationship dynamics</li>
            </ul>
          </section>

          {/* Hindi Content */}
          <section className="prose max-w-none">
            <h2>अपने व्यावसायिक मार्ग का मार्गदर्शन करें</h2>
            <p>हमारा ज्योतिषीय करियर मार्गदर्शन शामिल करता है:</p>
            <ul>
              <li>प्राकृतिक प्रतिभाएं और क्षमताएं</li>
              <li>आदर्श करियर पथ</li>
              <li>करियर में बदलाव के लिए अनुकूल समय</li>
              <li>व्यावसायिक संबंधों की गतिशीलता</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
} 