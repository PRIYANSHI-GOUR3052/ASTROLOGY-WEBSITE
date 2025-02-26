import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PersonalReadingPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <Button asChild className="mb-8">
        <Link href="/">← Back to Home</Link>
      </Button>
      
      <h1 className="text-4xl font-serif font-bold mb-8 text-mystic-brown">
        Personal Astrology Reading
      </h1>

      <div className="grid gap-8">
        {/* English Content */}
        <section className="prose max-w-none">
          <h2>Discover Your Cosmic Blueprint</h2>
          <p>Our personal astrology reading service offers an in-depth analysis of your natal chart, providing insights into:</p>
          <ul>
            <li>Your personality traits and core characteristics</li>
            <li>Life path and destiny</li>
            <li>Career opportunities and challenges</li>
            <li>Relationship patterns</li>
            <li>Current planetary influences and future predictions</li>
          </ul>
        </section>

        {/* Hindi Content */}
        <section className="prose max-w-none">
          <h2>अपनी कॉस्मिक ब्लूप्रिंट जानें</h2>
          <p>हमारी व्यक्तिगत ज्योतिष सेवा आपकी जन्मपत्रिका का गहन विश्लेषण प्रदान करती है, जिसमें शामिल हैं:</p>
          <ul>
            <li>आपके व्यक्तित्व के गुण और मूल विशेषताएं</li>
            <li>जीवन पथ और भाग्य</li>
            <li>करियर के अवसर और चुनौतियां</li>
            <li>रिश्तों के पैटर्न</li>
            <li>वर्तमान ग्रहीय प्रभाव और भविष्य की भविष्यवाणियां</li>
          </ul>
        </section>
      </div>
    </div>
  )
} 