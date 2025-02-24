import { useRouter } from 'next/router';
import { blogPosts } from '../components/BlogGrid'; // Adjust the import path

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div>404 - Post Not Found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <p>{post.excerpt}</p>
      {/* Add more content as needed */}
    </div>
  );
} 