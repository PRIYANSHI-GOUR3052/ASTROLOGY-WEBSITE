'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface ProductServiceCardProps {
  image: string;
  title: string;
  description: string;
  badge?: string;
  href: string;
}

export function ProductServiceCard({ image, title, description, badge, href }: ProductServiceCardProps) {
  return (
    <Link href={href} className="block group h-full" style={{ textDecoration: 'none' }}>
      <div className="relative rounded-2xl overflow-hidden shadow-lg h-[380px] min-h-[380px] flex flex-col justify-end group-hover:scale-[1.02] group-hover:shadow-2xl duration-200 bg-[#f7f5ed]">
        {/* Service/Product Image */}
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ minHeight: 220, maxHeight: 380 }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.92 }}
          />
        </motion.div>
        {/* Badge */}
        {badge && (
          <span className="absolute top-4 left-4 bg-[#e74c3c] text-white text-xs px-3 py-1 rounded-full z-10 shadow" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.01em' }}>{badge}</span>
        )}
        {/* Overlay for text */}
        <div className="relative z-10 w-full px-6 py-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end min-h-[120px]">
          <h3 className="text-xl mb-2 text-white text-left" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>{title}</h3>
          <p className="text-sm text-white text-left" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>{description}</p>
        </div>
      </div>
    </Link>
  );
}
