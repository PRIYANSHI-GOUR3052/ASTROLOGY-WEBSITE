import React from 'react';
import Link from 'next/link';
import { Instagram, Youtube, ArrowUp, Facebook, Twitter } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Blog', href: '/blog' },
];

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="relative bg-black text-white py-20 overflow-hidden">
      {/* Floating decorative cards */}
      <Link href="/blog/astrology-remedies-for-life" className="hidden md:block absolute top-10 left-10 rotate-[-12deg] opacity-90 z-10 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400 rounded-2xl p-6 w-72 shadow-2xl">
          <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">Astrology & Culture</div>
          <h3 className="text-white font-bold text-lg mb-2 leading-snug">The mystical art of celestial guidance</h3>
          <div className="flex items-center text-white/80 text-sm mb-4">
            <span className="mr-2">🌟</span>
            <span>December 20, 2024</span>
            <span className="ml-auto">5 mins</span>
          </div>
          <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all hover:bg-white/30 inline-block">Read more →</span>
        </div>
      </Link>
      <Link href="/blog/the-influence-of-planets" className="hidden md:block absolute top-16 right-10 rotate-[12deg] opacity-90 z-10 cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="bg-gradient-to-br from-blue-500 via-teal-400 to-green-400 rounded-2xl p-6 w-72 shadow-2xl">
          <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">Cosmic Insights</div>
          <h3 className="text-white font-bold text-lg mb-2 leading-snug">The importance of planetary alignment for spiritual results</h3>
          <div className="flex items-center text-white/80 text-sm mb-4">
            <span className="mr-2">📅</span>
            <span>December 11, 2024</span>
            <span className="ml-auto">8 mins</span>
          </div>
          <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium border-none cursor-pointer transition-all hover:bg-white/30 inline-block">Read more →</span>
        </div>
      </Link>

      <div className="max-w-6xl mx-auto px-5 relative z-20">
        {/* Main content */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Stay in the know with our<br />
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">celestial newsletter</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Regular updates ensure that readers have access to fresh cosmic perspectives, making Nakshatra Gyaan a must-read.
          </p>
          {/* Newsletter signup */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-12 justify-center">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 min-w-[200px] bg-white/10 border border-white/20 text-white rounded-full px-6 py-3 text-base outline-none placeholder-gray-300"
            />
            <button className="bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full text-base transition-transform hover:scale-105">Subscribe →</button>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12 text-center">
          <div>
            <h4 className="font-semibold mb-4 text-white">Keep Exploring</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <ul className="space-y-2 mb-4">
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/terms-conditions" className="text-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/site-credits" className="text-gray-400 hover:text-white text-sm transition-colors">Site Credits</Link></li>
            </ul>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 mb-12">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Facebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Twitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Instagram size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Youtube size={24} />
          </a>
        </div>

        {/* Large brand name */}
        <div className="text-center mb-8">
          <h1 className="text-[64px] md:text-[80px] font-bold text-white/10 tracking-wider m-0 select-none">nakshatra</h1>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm border-t border-white/10 pt-8 gap-4">
          <div>
            <span>Designed by </span>
            <a href="#" className="text-white hover:underline">Nakshatra Team</a>
          </div>
          <div className="text-center">
            <p className="m-0">© Nakshatra Gyaan. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by </span>
            <a href="#" className="text-white hover:underline">Cosmic Energy</a>
            <div className="text-xs bg-white/10 px-2 py-1 rounded">🌍 EN English</div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-violet-500 to-pink-500 text-white p-3 rounded-full shadow-xl z-50 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-violet-300"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
}

