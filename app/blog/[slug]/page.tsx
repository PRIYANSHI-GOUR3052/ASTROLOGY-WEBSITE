import { blogPosts as newBlogPosts } from '../../data/blogPosts'
import { blogPosts as gridBlogPosts } from '../../components/BlogGrid'
import { notFound } from 'next/navigation'

export default function BlogPost({ params }: { params: { slug: string } }) {
  // First check if it's a new format blog post
  const newPost = newBlogPosts[params.slug]
  
  // Then check if it's a grid format blog post
  const gridPost = gridBlogPosts.find(post => post.slug === params.slug)

  if (!newPost && !gridPost) {
    notFound()
  }

  // If it's a new format post, render with both languages
  if (newPost) {
    return (
      <div className="container mx-auto pt-32 px-4 py-16">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold">
            {newPost.title.hi}
          </h1>
          <h2 className="text-2xl md:text-3xl font-serif mb-8 text-gold">
            {newPost.title.en}
          </h2>
          
          <div className="prose prose-lg prose-invert max-w-none">
            {/* Hindi Content */}
            <div className="mb-12">
              {newPost.content.hi.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-lavender">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* English Content */}
            <div>
              {newPost.content.en.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-lavender">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    )
  }

  // If it's a grid format post, render bilingual format
  return (
    <div className="container mx-auto pt-32 px-4 py-16">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-gold">
          {gridPost!.title.hi}
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif mb-8 text-gold">
          {gridPost!.title.en}
        </h2>
        
        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-sm text-lavender/70 mb-8">
            {new Date(gridPost!.date).toLocaleDateString('hi-IN')}
          </p>
          
          {/* Hindi Content */}
          <div className="mb-12">
            {gridPost!.content.hi.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-lavender">
                {paragraph}
              </p>
            ))}
          </div>

          {/* English Content */}
          <div>
            {gridPost!.content.en.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-lavender">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
} 