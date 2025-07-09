import Image from 'next/image';

const images = [
  'https://res.cloudinary.com/dxwspucxw/image/upload/v1752049128/planets_aeujo5.jpg',
  '/images/blog/vedic-astrology.jpg',
  'https://res.cloudinary.com/dxwspucxw/image/upload/v1752049127/gemstones_wztxzb.jpg',
];

export default function CardStack() {
  return (
    <div className="relative w-[500px] h-[560px] flex items-center justify-center bg-white rounded-3xl">
      {/* Back card */}
      <div className="absolute top-14 left-14 w-[440px] h-[32rem] rounded-2xl shadow-xl bg-white z-10 rotate-6">
        <Image src={images[2]} alt="Astrology Card 3" fill className="rounded-2xl object-cover" />
      </div>
      {/* Middle card */}
      <div className="absolute top-7 left-7 w-[440px] h-[32rem] rounded-2xl shadow-2xl bg-white z-20 -rotate-3">
        <Image src={images[1]} alt="Astrology Card 2" fill className="rounded-2xl object-cover" />
      </div>
      {/* Soft pastel background behind top card */}
      <div className="absolute w-[440px] h-[32rem] rounded-2xl bg-[#f3f4f6] z-30" style={{filter: 'blur(8px)', top: 0, left: 0}} />
      {/* Top card */}
      <div className="relative w-[440px] h-[32rem] rounded-2xl shadow-2xl bg-white z-40">
        <Image src={images[0]} alt="Astrology Card 1" fill className="rounded-2xl object-cover" />
      </div>
    </div>
  );
} 