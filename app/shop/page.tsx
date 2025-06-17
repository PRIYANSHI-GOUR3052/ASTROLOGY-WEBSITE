import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import { FeaturedProducts } from '../components/FeaturedProducts'
import { ProductGrid } from '../components/ProductGrid'
import { AstrologyStones } from '../components/AstrologyStones'
import { ShopCTA } from '../components/ShopCTA'

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
          <ProductGrid />
          <ShopCTA />
        </div>
      </MysticBackground>
    </div>
  )
}
