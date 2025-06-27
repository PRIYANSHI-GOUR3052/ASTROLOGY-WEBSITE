'use client';

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '../contexts/useLanguage'
import { format } from 'date-fns'
import { es, fr, de, zhCN, arSA, ru } from 'date-fns/locale'

interface BlogPost {
  title: { [lang: string]: string };
  description: { [lang: string]: string };
  content: { [lang: string]: string };
  imageUrl: string;
  themeColor: string;
  author: { [lang: string]: string };
  date: string;
  category: string;
  readTime?: number;
}

interface BlogPostProps {
  post: BlogPost;
  className?: string;
}

const localeMap = { en: undefined, hi: undefined, es, fr, de, zh: zhCN, ar: arSA, ru };

export function BlogPreview({ post, className }: BlogPostProps) {
  const { lang, t } = useLanguage();
  const fallbackColor = '#FFF5E6';
  if (!post) return null;
  const safeLang = lang in post.title ? lang : 'en';
  const author = post.author?.[safeLang] || post.author?.['en'] || '';
  const dateFormat = t('blog.featured.dateFormat') || 'PPP';
  const locale = localeMap[safeLang] || undefined;
  const formattedDate = post.date ? format(new Date(post.date), dateFormat, { locale }) : '';

  return (
    <BlogPostCard post={post} className={className} />
  );
}

export function BlogPostCard({ post, className }: BlogPostProps) {
  const { lang, t } = useLanguage();
  const fallbackColor = '#FFF5E6';
  const safeLang = lang in post.title ? lang : 'en';
  const author = post.author?.[safeLang] || post.author?.['en'] || '';
  const dateFormat = t('blog.featured.dateFormat') || 'PPP';
  const locale = localeMap[safeLang] || undefined;
  const formattedDate = post.date ? format(new Date(post.date), dateFormat, { locale }) : '';

  return (
    <Card className={className} style={{ backgroundColor: post.themeColor || fallbackColor }}>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center text-xs text-gray-500 mb-1 gap-2">
            <span>{post.category}</span>
            <span className="mx-2">•</span>
            <span>📅 {formattedDate}</span>
          </div>
          <h3 className="text-2xl font-bold mb-2 text-black leading-tight">{post.title?.[safeLang] || post.title?.['en']}</h3>
          <p className="text-gray-700 mb-4 line-clamp-3">{post.description?.[safeLang] || post.description?.['en']}</p>
          <div className="flex items-center text-sm text-gray-500 mb-3 gap-3 flex-wrap">
            <span>👤 {author}</span>
            <span>⏱ {post.readTime || 2} {t('blog.featured.minRead')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
