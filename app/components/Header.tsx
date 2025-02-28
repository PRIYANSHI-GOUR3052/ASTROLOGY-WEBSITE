'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Home, BookOpen, ShoppingBag, PenTool, Info, PhoneCall, GraduationCap, LogIn, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on page load
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token')
      console.log('Token found:', !!token) // Debug log
      setIsLoggedIn(!!token)
      setIsLoading(false)
    }

    // Run immediately
    checkLoginStatus()

    // Add event listener for storage changes
    // Listen for auth changes triggered by login/signup/logout
    window.addEventListener('authChange', checkLoginStatus)

    // Also listen to storage changes (for multi-tab support)
    window.addEventListener('storage', checkLoginStatus)

    return () => {
      window.removeEventListener('authChange', checkLoginStatus)
      window.removeEventListener('storage', checkLoginStatus)
    }
  }, [])

  // Add this useEffect to debug state changes
  useEffect(() => {
    console.log('Login state:', isLoggedIn)
    console.log('Loading state:', isLoading)
  }, [isLoggedIn, isLoading])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    router.push('/signin')
  }

  const navItems = [
    { label: 'Home', labelHi: 'होम', href: '/', icon: Home },
    { label: 'Services', labelHi: 'सेवाएं', href: '/services', icon: BookOpen },
    { label: 'Shop', labelHi: 'दुकान', href: '/shop', icon: ShoppingBag },
    { label: 'Blog', labelHi: 'ब्लॉग', href: '/blog', icon: PenTool },
    { label: 'About', labelHi: 'हमारे बारे में', href: '/about', icon: Info },
    { label: 'Contact', labelHi: 'संपर्क', href: '/contact', icon: PhoneCall },
    { label: 'Study', labelHi: 'अध्ययन', href: '/study', icon: GraduationCap },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-nebula-indigo/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold text-royal-gold hover:text-royal-gold-light transition-colors">
            Nakshatra Gyaan<br />
            <span className="text-sm">नक्षत्र ज्ञान</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href
                    ? 'bg-royal-gold text-nebula-indigo'
                    : 'text-starlight-silver hover:bg-celestial-blue hover:text-starlight-silver'
                } transition-colors duration-200`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span>{item.label}</span>
                <span className="text-xs">{item.labelHi}</span>
              </Link>
            ))}

            {/* Sign In / Sign Out Button */}
            {!isLoading && (
              isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center py-2 px-4 rounded-md text-black hover:text-gray-700 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="ml-4 px-4 py-2 font-bold bg-royal-gold text-nebula-indigo hover:bg-goldenrod rounded-md transition-colors flex items-center"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-royal-gold hover:text-royal-gold-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav 
            className="lg:hidden mt-4 space-y-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-2 px-4 rounded-md ${
                  pathname === item.href
                    ? 'bg-royal-gold text-nebula-indigo'
                    : 'text-starlight-silver hover:bg-celestial-blue hover:text-starlight-silver'
                } transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs">{item.labelHi}</span>
                </span>
              </Link>
            ))}

            {/* Sign In / Sign Out Button for Mobile */}
            {!isLoading && (
              isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center py-2 px-4 rounded-md text-black hover:text-gray-700 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/signin"
                  className="flex items-center py-2 px-4 rounded-md bg-royal-gold text-nebula-indigo hover:bg-goldenrod transition-colors w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Sign In
                </Link>
              )
            )}
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
