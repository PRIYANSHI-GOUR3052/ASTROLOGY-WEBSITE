'use client'

import { blogPosts } from '../data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';

const posts = Object.values(blogPosts).slice(0, 4); // 1 featured + 3 side

export default function RecentPosts() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">Recent Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left: Featured Blog */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative w-full h-72 md:h-80 flex items-center justify-center" style={{ background: posts[0].themeColor, transition: 'background 0.3s' }}>
              <Image src={posts[0].imageUrl} alt={posts[0].title.en} fill className="object-cover rounded-2xl" />
              <span className="absolute top-4 left-4 bg-white text-gray-800 text-sm font-semibold px-4 py-1 rounded-lg shadow">{posts[0].category}</span>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{posts[0].title.en}</h3>
              <div className="flex items-center text-sm text-gray-500 mb-4 gap-4 flex-wrap">
                <span>👤 {posts[0].author}</span>
                <span>📅 {posts[0].date}</span>
                <span>⏱️ 2 min read</span>
              </div>
              <Link href={`/blog/${posts[0].title.en.replace(/\s+/g, '-').toLowerCase()}`}
                className="inline-block px-6 py-2 rounded-lg bg-black text-white text-base font-semibold shadow hover:bg-gray-800 transition-all">
                Read more →
              </Link>
            </div>
          </div>
        </div>
        {/* Right: 3 Stacked Blogs */}
        <div className="flex flex-col gap-6">
          {posts.slice(1).map((post, i) => (
            <div key={post.title.en} className="flex flex-row bg-white rounded-2xl shadow-lg overflow-hidden min-h-[160px] md:min-h-[200px] w-full md:w-[420px] mx-auto">
              <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center" style={{ background: post.themeColor, transition: 'background 0.3s' }}>
                <Image src={post.imageUrl} alt={post.title.en} fill className="object-cover rounded-2xl" />
                <span className="absolute top-4 left-4 bg-white text-gray-800 text-sm font-semibold px-4 py-1 rounded shadow">{post.category}</span>
              </div>
              <div className="flex-1 p-6 flex flex-col justify-center">
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{post.title.en}</h4>
                <div className="flex items-center text-sm text-gray-500 mb-3 gap-3 flex-wrap">
                  <span>📅 {post.date}</span>
                  <span>⏱️ {4 + i} min read</span>
                </div>
                <Link href={`/blog/${post.title.en.replace(/\s+/g, '-').toLowerCase()}`}
                  className="inline-block px-6 py-2 rounded-lg bg-black text-white text-base font-semibold shadow hover:bg-gray-800 transition-all w-max">
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 