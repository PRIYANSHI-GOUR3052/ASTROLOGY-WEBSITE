'use client';
import { BlogPreview } from '../components/BlogPreview'
import FeaturedBlogs from '../components/FeaturedBlogs'
import RecentPosts from '../components/RecentPosts'
import { CTASection } from '../components/CTASection'
import { useLanguage } from '../contexts/useLanguage'
import { blogPosts } from '../data/blogPosts'

export default function BlogPage() {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Banner Heading */}
        <div className="w-full rounded-3xl bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] py-12 px-4 md:px-16 mb-12 flex flex-col items-center justify-center shadow-md border border-[#f3e8ff]">
          <h1 className="text-5xl md:text-6xl font-extrabold text-black mb-4 text-center drop-shadow-lg tracking-tight">{t('blog.banner.heading')}</h1>
          <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl">{t('blog.banner.subheading')}</p>
        </div>
        <FeaturedBlogs />
        <RecentPosts />
        <CTASection />
        <BlogPreview post={Object.values(blogPosts)[0]} />
      </div>
    </div>
  )
}

