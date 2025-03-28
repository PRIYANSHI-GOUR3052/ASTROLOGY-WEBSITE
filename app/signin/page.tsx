'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCredentialSubmit = async (event: React.FormEvent<HTMLFormElement>, action: 'login' | 'signup') => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData(event.currentTarget)
      
      if (action === 'signup') {
        const password = formData.get('password') as string
        const confirmPassword = formData.get('confirmPassword') as string
        
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }

        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.get('email'),
            password,
            name: formData.get('name'),
            action: 'signup'
          })
        })

        if (!response.ok) throw new Error('Signup failed')
        
        const result = await response.json()
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        window.dispatchEvent(new Event('authChange'))
        router.push('/')
      } else {
        // Use NextAuth's signIn for credentials
        const result = await signIn('credentials', {
          redirect: false,
          email: formData.get('email'),
          password: formData.get('password'),
        })

        if (result?.error) {
          throw new Error(result.error)
        }
        router.push('/')
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      setError('Google authentication failed')
      setIsLoading(false)
    }
  }

  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <div className="fixed inset-0 z-0">
        <AnimatedStars />
        <MysticBackground />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4">
        <div className="bg-white/95 backdrop-blur-sm shadow-xl rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">User Authentication</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form className="space-y-4" onSubmit={(e) => handleCredentialSubmit(e, 'login')}>
                <Input name="email" type="email" placeholder="Email" required className="bg-white/80" />
                <Input name="password" type="password" placeholder="Password" required className="bg-white/80" />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Login'}
                </Button>
              </form>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  Sign in with Google
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="signup">
              <form className="space-y-4" onSubmit={(e) => handleCredentialSubmit(e, 'signup')}>
                <Input name="name" type="text" placeholder="Full Name" required className="bg-white/80" />
                <Input name="email" type="email" placeholder="Email" required className="bg-white/80" />
                <Input name="password" type="password" placeholder="Password" required className="bg-white/80" />
                <Input name="confirmPassword" type="password" placeholder="Confirm Password" required className="bg-white/80" />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Sign Up'}
                </Button>
              </form>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  Sign up with Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}