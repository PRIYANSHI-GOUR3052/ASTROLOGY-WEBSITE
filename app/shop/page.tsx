import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { FeaturedProducts } from '../components/FeaturedProducts'
import { ProductGrid } from '../components/ProductGrid'
import { AstrologyStones } from '../components/AstrologyStones'
import { ShopCTA } from '../components/ShopCTA'
import Link from 'next/link'

const products = [
  {
    title: 'Retinol Serum',
    description: 'Achieve your healthiest, smoothest, clearest and most luminous skin yet',
    price: 'IDR 270,000.00',
    slug: 'retinol-serum',
  },
  {
    title: 'Cherry Lip Balm',
    description: 'Achieve your healthiest, smoothest, clearest and most luminous skin yet',
    price: 'IDR 270,000.00',
    slug: 'cherry-lip-balm',
  },
  {
    title: 'Hyaluronic Acid Serum',
    description: 'Achieve your healthiest, smoothest, clearest and most luminous skin yet',
    price: 'IDR 270,000.00',
    slug: 'hyaluronic-acid-serum',
  },
  {
    title: 'Vitamin C Serum',
    description: 'Achieve your healthiest, smoothest, clearest and most luminous skin yet',
    price: 'IDR 270,000.00',
    slug: 'vitamin-c-serum',
  },
]

export default function ShopPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-golden-amber-dark via-sunburst-yellow to-golden-amber-dark">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-black">
            आध्यात्मिक दुकान<br />
            <span className="text-3xl md:text-5xl text-black">Spiritual Shop</span>
          </h1>
          <p className="text-xl text-black text-center mb-16 max-w-3xl mx-auto">
            Discover a curated collection of spiritual tools, gemstones, and artifacts to enhance your spiritual journey and daily practices.
          </p>
          <FeaturedProducts />
          <AstrologyStones />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 px-0">
            {products.map((product) => (
              <div key={product.slug} className="relative bg-[#f7f5ed] shadow-sm p-6 flex flex-col items-center group transition hover:shadow-md border border-[#e0e0e0]">
                {/* View Button */}
                <Link href={`/shop/${product.slug}`} className="absolute top-4 left-4 bg-[#23244a] text-white text-xs px-3 py-1 font-semibold opacity-0 group-hover:opacity-100 transition">View</Link>
                {/* Favorite Icon */}
                <button className="absolute top-4 right-4 text-[#bdbdbd] hover:text-[#77A656] transition">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                {/* Product Image Placeholder */}
                <div className="w-24 h-24 bg-[#edece6] flex items-center justify-center mb-6 mt-4">
                  <svg className="w-10 h-10 text-[#bdbdbd]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 48 48"><rect x="6" y="6" width="36" height="36" rx="4"/><circle cx="18" cy="18" r="3"/><path d="M6 34l10-10 7 7 9-9 10 10"/></svg>
                </div>
                {/* Title */}
                <div className="w-full text-left">
                  <h3 className="text-lg font-bold text-[#23244a] mb-1">{product.title}</h3>
                  <p className="text-xs text-[#888] italic mb-4">{product.description}</p>
                </div>
                {/* Price and Rating */}
                <div className="w-full flex items-center justify-between mt-auto pt-2">
                  <span className="text-base font-bold text-[#77A656]">{product.price}</span>
                  <span className="text-xs text-[#bdbdbd]">&#9733; &#9733; &#9733; &#9733; &#9733;</span>
                </div>
              </div>
            ))}
          </div>
          <ProductGrid />
          <ShopCTA />
        </div>
      </MysticBackground>
    </div>
  )
}
