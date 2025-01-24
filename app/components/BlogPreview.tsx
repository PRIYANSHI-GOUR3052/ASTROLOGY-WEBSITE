import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const blogPosts = [
  {
    title: "अपनी जन्म कुंडली को समझना (Understanding Your Birth Chart)",
    excerpt: "अपनी ज्योतिषीय जन्म कुंडली को पढ़ने और समझने की मूल बातें सीखें।",
    date: "2023-06-01",
    slug: "understanding-your-birth-chart"
  },
  {
    title: "दैनिक जीवन में क्रिस्टल की शक्ति (The Power of Crystals in Daily Life)",
    excerpt: "अपने रोजमर्रा के जीवन में उपचार क्रिस्टल को कैसे शामिल करें, यह जानें।",
    date: "2023-05-15",
    slug: "power-of-crystals-in-daily-life"
  },
  {
    title: "शुरुआती लोगों के लिए ध्यान तकनीक (Meditation Techniques for Beginners)",
    excerpt: "इन सरल, प्रभावी तकनीकों के साथ अपनी ध्यान यात्रा शुरू करें।",
    date: "2023-05-01",
    slug: "meditation-techniques-for-beginners"
  },
]

export function BlogPreview() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-purple/30 to-celestial-blue/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-gold">
          आकाशीय अंतर्दृष्टि ब्लॉग
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-gold">
          Celestial Insights Blog
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-midnight-blue-light/80 hover:bg-midnight-blue transition-colors transform hover:scale-105 duration-300 border border-gold/30 hover:border-gold">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-semibold mb-2 text-gold">{post.title}</h3>
                <p className="mb-4 text-sm text-lavender/70">{post.date}</p>
                <p className="mb-4 text-sm text-lavender">{post.excerpt}</p>
                <Button asChild className="bg-gold text-midnight-blue hover:bg-gold-light">
                  <Link href={`/blog/${post.slug}`}>और पढ़ें (Read More)</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

