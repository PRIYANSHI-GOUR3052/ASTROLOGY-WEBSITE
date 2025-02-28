import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CoupleCompatibilityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild className="mb-8">
        <Link href="/">← Back to Home</Link>
      </Button>
      
      <h1 className="text-4xl font-serif font-bold mb-8 text-mystic-brown">
        Couple Compatibility Analysis
      </h1>

      <div className="grid gap-8">
        {/* English Content */}
        <section className="prose max-w-none">
          <h2>Understanding Your Relationship Through The Stars</h2>
          <p>Our couple compatibility analysis examines:</p>
          <ul>
            <li>Emotional compatibility</li>
            <li>Communication patterns</li>
            <li>Shared life goals</li>
            <li>Potential challenges and solutions</li>
          </ul>
        </section>

        {/* Hindi Content */}
        <section className="prose max-w-none">
          <h2>सितारों के माध्यम से अपने रिश्ते को समझें</h2>
          <p>हमारा कपल कम्पैटिबिलिटी विश्लेषण जांचता है:</p>
          <ul>
            <li>भावनात्मक संगतता</li>
            <li>संवाद के पैटर्न</li>
            <li>साझा जीवन लक्ष्य</li>
            <li>संभावित चुनौतियां और समाधान</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 