import { BlogPreview } from '../components/BlogPreview'
import { BlogGrid } from '../components/BlogGrid'
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'

export default function BlogPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-midnight-blue via-cosmic-purple to-celestial-blue">
      <AnimatedStars />
      <MysticBackground>
        <div className="container mx-auto pt-32 px-4 py-16 relative z-10">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-12 text-center text-gold animate-pulse">
            आकाशीय अंतर्दृष्टि ब्लॉग<br />
            <span className="text-3xl md:text-5xl">Celestial Insights Blog</span>
          </h1>
          <BlogPreview />
          <BlogGrid />
        </div>
      </MysticBackground>
    </div>
  )
}

