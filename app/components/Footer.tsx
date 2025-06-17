import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Instagram, Youtube } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-r from-[#FAD9C1] to-[#A3BFF3] text-black py-12 overflow-hidden">
      {/* Wave-like SVG or background element */}
      <div className="absolute top-0 left-0 w-full h-full">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,192L48,192C96,192,192,192,288,181.3C384,171,480,149,576,149.3C672,149,768,171,864,192C960,213,1056,235,1152,224C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 items-start text-dark-charcoal">
          {/* Keep Exploring */}
          <div>
            <h3 className="text-xl font-bold font-serif mb-4">Keep Exploring</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-gray-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xl font-serif mb-4 font-bold">Connect</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li><Link href="/contact" className="hover:text-gray-700 transition-colors">Contact Us</Link></li>
            </ul>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition-colors">
                <span className="sr-only">YouTube</span>
                <Youtube className="h-6 w-6" />
              </Link>
              
            </div>
          </div>

          {/* Stay in the Know (Newsletter) */}
          <div>
            <h4 className="text-xl font-serif mb-4 font-bold">Stay in the Know</h4>
            <p className="text-sm mb-4 text-gray-700">
            Sign up for our newsletter to receive celestial insights and special offers
            </p>
            <form className="flex flex-col sm:flex-row gap-2 w-full">
              <Input
                type="email"
                placeholder="Email Address"
                className="bg-white/50 border border-gray-300 text-black placeholder-gray-500 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 flex-grow"
              />
              <Button className="bg-[#5C4D7D] hover:bg-[#4a3e64] text-white font-bold py-2 px-6 rounded-full">
                Sign Up
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-black/20 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="mb-2 md:mb-0 text-dark-charcoal">&copy;  Nakshatra Gyaan. All rights reserved..</p>
          <div className="flex space-x-4 text-dark-charcoal">
            <Link href="/site-credits" className="hover:text-gray-700 transition-colors">Site Credits</Link>
            <span>|</span>
            <Link href="/terms-conditions" className="hover:text-gray-700 transition-colors">Terms & Conditions</Link>
            <span>|</span>
            <Link href="/privacy-policy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-[#5C4D7D] hover:bg-[#4a3e64] text-white p-3 rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
    </footer>
  )
}

