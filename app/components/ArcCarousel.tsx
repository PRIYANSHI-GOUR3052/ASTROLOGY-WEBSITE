import { motion, useViewportScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';
import { blogPosts } from '../data/blogPosts';

// Extract blog images
const blogImages = Object.values(blogPosts).map(post => post.imageUrl);

const ARC_RADIUS = 180; // px, controls the arc's height
const IMAGE_SIZE = 120; // px
const ARC_WIDTH = 900; // px, controls the arc's width

interface ImageTransform {
  x: MotionValue<string>;
  y: MotionValue<string>;
  scale: MotionValue<number>;
}

export default function ArcCarousel() {
  const { scrollY } = useViewportScroll();
  // Map scrollY from 0-500px to progress 0-1
  const progress = useTransform(scrollY, [0, 500], [0, 1]);

  // Create individual transforms for each image to avoid hooks in loop
  const baseT0 = 0 / (blogImages.length - 1);
  const t0 = useTransform(progress, (v: number) => baseT0 + v * 0.7);
  const clampedT0 = useTransform(t0, (tVal: number) => Math.max(0, Math.min(1, tVal)));
  const angle0 = useTransform(clampedT0, (tVal: number) => Math.PI * tVal);
  const x0 = useTransform(angle0, (a: number) => `calc(${(Math.cos(a) * ARC_RADIUS + ARC_WIDTH/2) / ARC_WIDTH * 100}% - ${IMAGE_SIZE/2}px)`);
  const y0 = useTransform(angle0, (a: number) => `${160 - Math.sin(a) * ARC_RADIUS}px`);
  const scale0 = useTransform(angle0, (a: number): number => Math.abs(a - Math.PI/2) < 0.2 ? 1.1 : 0.92);

  const baseT1 = 1 / (blogImages.length - 1);
  const t1 = useTransform(progress, (v: number) => baseT1 + v * 0.7);
  const clampedT1 = useTransform(t1, (tVal: number) => Math.max(0, Math.min(1, tVal)));
  const angle1 = useTransform(clampedT1, (tVal: number) => Math.PI * tVal);
  const x1 = useTransform(angle1, (a: number) => `calc(${(Math.cos(a) * ARC_RADIUS + ARC_WIDTH/2) / ARC_WIDTH * 100}% - ${IMAGE_SIZE/2}px)`);
  const y1 = useTransform(angle1, (a: number) => `${160 - Math.sin(a) * ARC_RADIUS}px`);
  const scale1 = useTransform(angle1, (a: number): number => Math.abs(a - Math.PI/2) < 0.2 ? 1.1 : 0.92);

  const baseT2 = 2 / (blogImages.length - 1);
  const t2 = useTransform(progress, (v: number) => baseT2 + v * 0.7);
  const clampedT2 = useTransform(t2, (tVal: number) => Math.max(0, Math.min(1, tVal)));
  const angle2 = useTransform(clampedT2, (tVal: number) => Math.PI * tVal);
  const x2 = useTransform(angle2, (a: number) => `calc(${(Math.cos(a) * ARC_RADIUS + ARC_WIDTH/2) / ARC_WIDTH * 100}% - ${IMAGE_SIZE/2}px)`);
  const y2 = useTransform(angle2, (a: number) => `${160 - Math.sin(a) * ARC_RADIUS}px`);
  const scale2 = useTransform(angle2, (a: number): number => Math.abs(a - Math.PI/2) < 0.2 ? 1.1 : 0.92);

  const baseT3 = 3 / (blogImages.length - 1);
  const t3 = useTransform(progress, (v: number) => baseT3 + v * 0.7);
  const clampedT3 = useTransform(t3, (tVal: number) => Math.max(0, Math.min(1, tVal)));
  const angle3 = useTransform(clampedT3, (tVal: number) => Math.PI * tVal);
  const x3 = useTransform(angle3, (a: number) => `calc(${(Math.cos(a) * ARC_RADIUS + ARC_WIDTH/2) / ARC_WIDTH * 100}% - ${IMAGE_SIZE/2}px)`);
  const y3 = useTransform(angle3, (a: number) => `${160 - Math.sin(a) * ARC_RADIUS}px`);
  const scale3 = useTransform(angle3, (a: number): number => Math.abs(a - Math.PI/2) < 0.2 ? 1.1 : 0.92);

  const baseT4 = 4 / (blogImages.length - 1);
  const t4 = useTransform(progress, (v: number) => baseT4 + v * 0.7);
  const clampedT4 = useTransform(t4, (tVal: number) => Math.max(0, Math.min(1, tVal)));
  const angle4 = useTransform(clampedT4, (tVal: number) => Math.PI * tVal);
  const x4 = useTransform(angle4, (a: number) => `calc(${(Math.cos(a) * ARC_RADIUS + ARC_WIDTH/2) / ARC_WIDTH * 100}% - ${IMAGE_SIZE/2}px)`);
  const y4 = useTransform(angle4, (a: number) => `${160 - Math.sin(a) * ARC_RADIUS}px`);
  const scale4 = useTransform(angle4, (a: number): number => Math.abs(a - Math.PI/2) < 0.2 ? 1.1 : 0.92);

  const baseT5 = 5 / (blogImages.length - 1);
  const t5 = useTransform(progress, (v: number) => baseT5 + v * 0.7);
  const clampedT5 = useTransform(t5, (tVal: number) => Math.max(0, Math.min(1, tVal)));
  const angle5 = useTransform(clampedT5, (tVal: number) => Math.PI * tVal);
  const x5 = useTransform(angle5, (a: number) => `calc(${(Math.cos(a) * ARC_RADIUS + ARC_WIDTH/2) / ARC_WIDTH * 100}% - ${IMAGE_SIZE/2}px)`);
  const y5 = useTransform(angle5, (a: number) => `${160 - Math.sin(a) * ARC_RADIUS}px`);
  const scale5 = useTransform(angle5, (a: number): number => Math.abs(a - Math.PI/2) < 0.2 ? 1.1 : 0.92);

  // Create array of transforms
  const imageTransforms: ImageTransform[] = [
    { x: x0, y: y0, scale: scale0 },
    { x: x1, y: y1, scale: scale1 },
    { x: x2, y: y2, scale: scale2 },
    { x: x3, y: y3, scale: scale3 },
    { x: x4, y: y4, scale: scale4 },
    { x: x5, y: y5, scale: scale5 },
  ];

  // Arc from left to right (0 to PI)
  return (
    <div className="relative w-full h-[340px] flex items-center justify-center select-none overflow-visible">
      {blogImages.map((src, i) => {
        const { x, y, scale } = imageTransforms[i];
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