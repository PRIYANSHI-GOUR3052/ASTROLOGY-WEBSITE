import { useRouter } from 'next/router';
import { blogPosts } from '../components/BlogGrid';

interface BlogPost {
  title: {
    hi: string;
    en: string;
  };
  excerpt: {
    hi: string;
    en: string;
  };
  content: {
    hi: string;
    en: string;
  };
  date: string;
  slug: string;
}

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const language = 'en'; // You can make this dynamic based on user preference

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div>404 - Post Not Found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title[language as keyof typeof post.title]}</h1>
      <p className="text-gray-600 mb-4">{post.date}</p>
      <p className="text-lg mb-8">{post.excerpt[language as keyof typeof post.excerpt]}</p>
      <div className="prose max-w-none">
        {post.content[language as keyof typeof post.content].split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
} 