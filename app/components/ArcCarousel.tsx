import { useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { blogPosts } from '../data/blogPosts';

// Extract blog images
const blogImages = Object.values(blogPosts).map(post => post.imageUrl);

const ARC_RADIUS = 180; // px, controls the arc's height
const IMAGE_SIZE = 120; // px
const ARC_WIDTH = 900; // px, controls the arc's width

export default function ArcCarousel() {
  const { scrollY } = useViewportScroll();
  // Map scrollY from 0-500px to progress 0-1
  const progress = useTransform(scrollY, [0, 500], [0, 1]);

  // Arc from left to right (0 to PI)
  return (
    <div className="relative w-full h-[340px] flex items-center justify-center select-none overflow-visible">
      {blogImages.map((src, i) => {
        // Each image's base position along the arc (0 = left, 1 = right)
        const baseT = i / (blogImages.length - 1);
        // Animate t with scroll progress (images move horizontally along the arc)
        const t = useTransform(progress, v => baseT + v * 0.7); // 0.7 = how much arc to move
        // Clamp t between 0 and 1
        const clampedT = useTransform(t, tVal => Math.max(0, Math.min(1, tVal)));
        // Calculate angle for the arc (0 = left, PI = right)
        const angle = useTransform(clampedT, tVal => Math.PI * tVal);
        // X: from left to right across ARC_WIDTH
        const x = useTransform(angle, a => `calc(${(Math.cos(a) * ARC_RADIUS + ARC_WIDTH/2) / ARC_WIDTH * 100}% - ${IMAGE_SIZE/2}px)`);
        // Y: arc height
        const y = useTransform(angle, a => `${160 - Math.sin(a) * ARC_RADIUS}px`);
        // Scale center image
        const scale = useTransform(angle, a => Math.abs(a - Math.PI/2) < 0.2 ? 1.1 : 0.92);
        return (
          <motion.div
            key={src}
            className="absolute"
            style={{
              left: x,
              top: y,
              width: IMAGE_SIZE,
              height: IMAGE_SIZE,
              zIndex: 10 - Math.abs(i - blogImages.length / 2),
              scale,
              boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
              borderRadius: '18px',
              overflow: 'hidden',
              background: '#fff',
            }}
            whileHover={{ scale: 1.13 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Image src={src} alt="Blog" width={IMAGE_SIZE} height={IMAGE_SIZE} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </motion.div>
        );
      })}
    </div>
  );
} 