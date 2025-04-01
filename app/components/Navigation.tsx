'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'
import CartIcon from './CartIcon'

export function Navigation() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Move console logs outside of the return statement
  console.log("Current user:", user)
  console.log("Navigation render - user state:", user)
  console.log("Is user logged in?:", !!user)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-white text-xl font-bold">
            नक्षत्र ज्ञान
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-white hover:text-gray-300">
              होम
            </Link>
            <Link href="/services" className="text-white hover:text-gray-300">
              सेवाएं
            </Link>
            <Link href="/shop" className="text-white hover:text-gray-300">
              दुकान
            </Link>
            <Link href="/blog" className="text-white hover:text-gray-300">
              ब्लॉग
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              हमारे बारे में
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300">
              संपर्क
            </Link>
            <Link href="/study" className="text-white hover:text-gray-300">
              अध्ययन
            </Link>
            {user && user.isAdmin && (
              <Link href="/admin" className="text-white hover:text-gray-300">
                Admin
              </Link>
            )}
            <div className="h-5 w-px bg-gray-600/50" /> {/* Divider */}
            <CartIcon />
            <div className="h-5 w-px bg-gray-600/50" /> {/* Divider */}
            {user ? (
              <motion.button 
                onClick={handleLogout}
                className="text-white hover:text-gold transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                लॉग आउट
              </motion.button>
            ) : (
              <Link href="/signin">
                <Button variant="outline" className="text-white hover:text-gold border-gold/50 hover:border-gold">
                  साइन इन
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 