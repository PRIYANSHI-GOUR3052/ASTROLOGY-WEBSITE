import { blogPosts } from '../data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';

// Get the 4 most recent astrology blog posts
const posts = Object.values(blogPosts)
  .filter(post => post.category.toLowerCase().includes('astrology'))
  .slice(0, 4);

export default function RecentBlogs() {
  return (
    <aside className="bg-white rounded-3xl p-6 shadow-lg w-full max-w-xs">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
        <h3 className="text-xl font-bold text-gray-900">Recent Post</h3>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Link href={`/blog/${post.title.en.replace(/\s+/g, '-').toLowerCase()}`} key={post.title.en} className="flex gap-4 group">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={post.imageUrl} alt={post.title.en} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors mb-1">
                {post.title.en}
              </h4>
              <p className="text-xs text-gray-500">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
} 