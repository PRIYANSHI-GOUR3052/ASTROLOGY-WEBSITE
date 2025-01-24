import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const blogPosts = [
  {
    title: "ग्रहों का प्रभाव: आपके जीवन पर कैसे पड़ता है",
    excerpt: "ग्रहों की स्थिति का आपके दैनिक जीवन पर कैसे प्रभाव पड़ता है, इसके बारे में जानें।",
    date: "2023-07-15",
    slug: "influence-of-planets"
  },
  {
    title:"वास्तु शास्त्र के रहस्य: घर को कैसे बनाएं सकारात्मक ऊर्जा का केंद्र",
    excerpt: "वास्तु शास्त्र के मूल सिद्धांतों और आपके घर में सकारात्मक ऊर्जा लाने के तरीकों के बारे में जानें।",
    date: "2023-07-01",
    slug: "vastu-shastra-secrets"
  },
  {
    title: "ज्योतिष और आधुनिक विज्ञान: क्या है संबंध?",
    excerpt: "ज्योतिष और आधुनिक विज्ञान के बीच संबंधों की खोज करें और जानें कि वे कैसे एक दूसरे को पूरक हो सकते हैं।",
    date: "2023-06-20",
    slug: "astrology-and-modern-science"
  },
  {
    title: "राशि के अनुसार व्यक्तित्व विश्लेषण",
    excerpt: "अपनी राशि के आधार पर अपने व्यक्तित्व के गुणों और विशेषताओं को समझें।",
    date: "2023-06-10",
    slug: "personality-analysis-by-zodiac"
  },
  {
    title: "कर्म और भाग्य: क्या हम अपनी किस्मत बदल सकते हैं?",
    excerpt: "कर्म के सिद्धांत और भाग्य के बीच संबंध की गहराई से जांच करें।",
    date: "2023-05-25",
    slug: "karma-and-destiny"
  },
]

export function BlogGrid() {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-center text-gold">
        सभी ब्लॉग पोस्ट (All Blog Posts)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
    </section>
  )
}

