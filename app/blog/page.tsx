import { BlogPreview } from '../components/BlogPreview'
import FeaturedBlogs from '../components/FeaturedBlogs'
import RecentPosts from '../components/RecentPosts'
import { CTASection } from '../components/CTASection'

export default function BlogPage() {
  return (
    <div className="relative min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Banner Heading */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">Astrology Blog</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">Explore the latest insights, remedies, and wisdom from the world of Vedic astrology, Nakshatras, and spiritual healing.</p>
        </div>
        <FeaturedBlogs />
        <RecentPosts />
        <CTASection />
        <BlogPreview  />
      </div>
    </div>
  )
}

