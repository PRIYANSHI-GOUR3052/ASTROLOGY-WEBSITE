import { blogPosts } from '../data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';

const posts = Object.values(blogPosts).slice(0, 3); // Show top 3

export default function BlogShowcase() {
  return (
    <section className="w-full bg-[#f7f7f7] py-16 px-4 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Left: Heading and Subtitle */}
      <div className="flex-1 max-w-xl">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">Global Stories<br />& Articles</h2>
        <p className="text-lg text-gray-700 mb-2">A place to read, write, and deepen your understanding</p>
      </div>
      {/* Right: Stacked Cards */}
      <div className="flex-1 flex items-center justify-center relative min-w-[340px] max-w-[400px] h-[340px]">
        {posts.map((post, i) => (
          <div
            key={post.title.en}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-300 ${
              i === 0 ? 'z-30 translate-x-0 scale-100 shadow-2xl' :
              i === 1 ? 'z-20 translate-x-8 scale-95 shadow-xl' :
              'z-10 translate-x-16 scale-90 shadow-lg'
            }`}
            style={{ borderRadius: '22px', background: '#fff' }}
          >
            <div className="w-full h-48 rounded-t-2xl overflow-hidden relative">
              <Image src={post.imageUrl} alt={post.title.en} fill style={{ objectFit: 'cover' }} />
            </div>
            <div className="p-5">
              <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1 rounded mb-2">{post.category}</span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{post.title.en}</h3>
              <div className="flex items-center text-xs text-gray-500 mb-4 gap-3">
                <span>🗓️ {post.date}</span>
                <span>•</span>
                <span>8 mins</span>
              </div>
              <Link href={`/blog/${post.title.en.replace(/\s+/g, '-').toLowerCase()}`}
                className="inline-block px-5 py-2 rounded-lg bg-black text-white text-sm font-semibold shadow hover:bg-gray-800 transition-all">
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 