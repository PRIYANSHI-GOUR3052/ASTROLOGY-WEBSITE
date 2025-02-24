'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'

export default function SignInPage() {
  const [role, setRole] = useState<'user' | 'admin'>('user')

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      {/* Background Animations */}
      <div className="fixed inset-0 z-0">
        <AnimatedStars />
        <MysticBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4">
        <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign In / Sign Up</h2>

          {/* Toggle Between User & Admin */}
          <div className="flex justify-center mb-6">
            <Button
              variant={role === 'user' ? 'default' : 'outline'}
              className="mr-2"
              onClick={() => setRole('user')}
            >
              User
            </Button>
            <Button
              variant={role === 'admin' ? 'default' : 'outline'}
              onClick={() => setRole('admin')}
            >
              Admin
            </Button>
          </div>

          {/* Tabs for Login and Signup */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN FORM */}
            <TabsContent value="login">
              <form className="space-y-4">
                <Input 
                  type="email" 
                  placeholder={`${role === 'user' ? 'User' : 'Admin'} Email`} 
                  required 
                  className="bg-white/80"
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  required 
                  className="bg-white/80"
                />
                <Button className="w-full">Login</Button>
                <p className="text-center text-sm mt-4">
                  Forgot Password?{' '}
                  <Link href="/reset-password" className="text-blue-600 hover:text-blue-800">
                    Reset here
                  </Link>
                </p>
              </form>
            </TabsContent>

            {/* SIGNUP FORM */}
            <TabsContent value="signup">
              <form className="space-y-4">
                <Input 
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  className="bg-white/80"
                />
                <Input 
                  type="email" 
                  placeholder={`${role === 'user' ? 'User' : 'Admin'} Email`} 
                  required 
                  className="bg-white/80"
                />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  required 
                  className="bg-white/80"
                />
                <Input 
                  type="password" 
                  placeholder="Confirm Password" 
                  required 
                  className="bg-white/80"
                />
                <Button className="w-full">Sign Up</Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}