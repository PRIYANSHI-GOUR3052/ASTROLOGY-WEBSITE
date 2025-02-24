import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { blogPosts } from '../data/blogPosts'

const blogPostPreviews = Object.entries(blogPosts).map(([slug, post]) => ({
  title: `${post.title.hi} (${post.title.en})`,
  excerpt: post.content.hi.split('\n')[0],
  date: "2024-02-25",
  slug
})).reverse()

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
          {blogPostPreviews.map((post, index) => (
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

