import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  return (
    <footer className="bg-nebula-indigo-dark text-starlight-silver py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-royal-gold">Nakshatra Gyaan</h3>
            <p className="text-sm">Guiding you through your spiritual journey with ancient wisdom and modern insights.</p>
          </div>
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 text-royal-gold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="hover:text-mystic-lavender transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-serif font-semibold mb-4 text-royal-gold">Connect With Us</h4>
            <p className="text-sm mb-4">Sign up for our newsletter to receive celestial insights and special offers.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-nebula-indigo text-starlight-silver border-starlight-silver/20 focus:border-royal-gold"
              />
              <Button type="submit" className="bg-royal-gold text-nebula-indigo hover:bg-royal-gold-light whitespace-nowrap">
                Subscribe
              </Button>
            </form>
            <div className="mt-4 flex justify-start space-x-4">
              <Link href="https://facebook.com" className="text-starlight-silver hover:text-mystic-lavender transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="https://instagram.com" className="text-starlight-silver hover:text-celestial-blue transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="https://twitter.com" className="text-starlight-silver hover:text-cosmic-purple transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-starlight-silver/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Nakshatra Gyaan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

