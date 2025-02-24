'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'

export default function SignInPage() {
  const router = useRouter()
  const [role, setRole] = useState<'user' | 'admin'>('user')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, action: 'login' | 'signup') => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData(event.currentTarget)
      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirmPassword') as string

      // Check if passwords match for signup
      if (action === 'signup' && password !== confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const data = {
        email: formData.get('email'),
        password,
        name: action === 'signup' ? formData.get('name') : undefined,
        role,
        action,
      }

      console.log('Submitting data:', { ...data, password: '***' })

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Authentication failed')
      }

      const result = await response.json()
      console.log('Response:', result)

      if (result.token) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        router.push('/')
      } else {
        throw new Error('No token received')
      }

    } catch (error) {
      console.error('Authentication error:', error)
      setError(error instanceof Error ? error.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

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

          {/* Display error message if any */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

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
              <form className="space-y-4" onSubmit={(e) => handleSubmit(e, 'login')}>
                <Input 
                  name="email"
                  type="email" 
                  placeholder={`${role === 'user' ? 'User' : 'Admin'} Email`} 
                  required 
                  className="bg-white/80"
                />
                <Input 
                  name="password"
                  type="password" 
                  placeholder="Password" 
                  required 
                  className="bg-white/80"
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP FORM */}
            <TabsContent value="signup">
              <form className="space-y-4" onSubmit={(e) => handleSubmit(e, 'signup')}>
                <Input 
                  name="name"
                  type="text" 
                  placeholder="Full Name" 
                  required 
                  className="bg-white/80"
                />
                <Input 
                  name="email"
                  type="email" 
                  placeholder={`${role === 'user' ? 'User' : 'Admin'} Email`} 
                  required 
                  className="bg-white/80"
                />
                <Input 
                  name="password"
                  type="password" 
                  placeholder="Password" 
                  required 
                  className="bg-white/80"
                />
                <Input 
                  name="confirmPassword"
                  type="password" 
                  placeholder="Confirm Password" 
                  required 
                  className="bg-white/80"
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Sign Up'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}