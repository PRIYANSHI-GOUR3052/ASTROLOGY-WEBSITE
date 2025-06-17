

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '../contexts/LanguageContext'

interface BlogPostProps {
  post?: {
    title: { en: string; hi: string };
    description: { en: string; hi: string };
    date: string;
    slug: string;
    imageUrl: string;
    category: string;
    themeColor?: string;
  };
  className?: string;
}

export function BlogPreview({ post, className }: BlogPostProps) {
  const { lang } = useLanguage();
  const fallbackColor = '#FFF5E6';

  if (!post) return null; // ⛔ Prevent rendering if post is undefined

  return (
    <Card
      className={`flex flex-col rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${className || ''}`}
      style={{ backgroundColor: post.themeColor || fallbackColor }}
    >
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        <Image src={post.imageUrl} alt={post.title[lang]} layout="fill" objectFit="cover" />
      </div>
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: post.themeColor || fallbackColor }}></span>
          <span>{post.category}</span>
          <span className="mx-2">•</span>
          <span>{post.date}</span>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-black leading-tight">{post.title[lang]}</h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.description[lang].split('\n')[0]}</p>
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-purple-700 hover:text-purple-800 transition-colors group">
          {lang === 'en' ? 'Continue Reading' : 'पढ़ना जारी रखें'}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </CardContent>
    </Card>
  )
}
