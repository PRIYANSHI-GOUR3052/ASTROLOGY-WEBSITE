'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnimatedStars } from '../components/AnimatedStars'
import { MysticBackground } from '../components/MysticBackground'
import Footer from '../components/Footer'
import { User, Lock, Mail, Star } from 'lucide-react'

const FloatingCard = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div
    className={`absolute bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl pointer-events-none hidden lg:block ${className}`}
  >
    {children}
  </div>
);

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
      const email = formData.get('email') as string
      const password = formData.get('password') as string

      if (action === 'signup') {
        const name = formData.get('name') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }

        // Create user account
        const signupResponse = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            name
          })
        })

        if (!signupResponse.ok) {
          const errorData = await signupResponse.json();
          throw new Error(errorData.error || 'Signup failed');
        }

        // After successful signup, sign in the user
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        })

        if (result?.error) {
          throw new Error(result.error)
        }

        if (result?.ok) {
          router.push('/')
        }
      } else {
        // Login
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        })

        if (result?.error) {
          throw new Error(result.error)
        }

        if (result?.ok) {
          router.push('/')
        }
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
    <div className="relative bg-black">
      {/* Exact cosmic background overlay, no floating cards */}
      <ExactCosmicBackground />
      <main className="relative w-full min-h-screen overflow-hidden bg-transparent flex flex-col">
        {/* FloatingCard components removed for exact match */}
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-4 py-20">
          <div className="bg-[#111] border border-[#222] shadow-2xl rounded-3xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
               <h2 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Welcome to <span className="bg-gradient-to-r from-[#a084ee] to-[#f857a6] bg-clip-text text-transparent">Nakshatra Gyaan</span>
               </h2>
               <p className="text-gray-400">Unlock the secrets of the cosmos. Your journey begins here.</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-xl border border-red-500/50 text-center text-sm">
                {error}
              </div>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-black border border-[#222] rounded-xl p-1">
                <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a084ee] data-[state=active]:to-[#f857a6] data-[state=active]:text-white rounded-lg text-gray-400 transition-all">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#a084ee] data-[state=active]:to-[#f857a6] data-[state=active]:text-white rounded-lg text-gray-400 transition-all">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <form className="space-y-4" onSubmit={(e) => handleCredentialSubmit(e, 'login')}>
                  <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-[#1C1C1C] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
                      />
                  </div>
                  <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-[#1C1C1C] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
                      />
                  </div>
                  <Button type="submit" className="w-full font-semibold text-lg py-3 rounded-lg bg-gradient-to-r from-[#a084ee] to-[#f857a6] text-white hover:brightness-110 transition-all" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                  </Button>
                </form>
                <div className="mt-6 text-center text-gray-500 text-sm">Or continue with</div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="w-full font-semibold py-3 rounded-lg border border-gray-700 bg-[#1C1C1C] text-gray-400 hover:bg-[#222] transition-all flex items-center justify-center"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <Star className="w-5 h-5 mr-3 text-yellow-500" />
                    Sign in with Google
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <div className="text-center mb-6">
                  <p className="text-gray-400 mb-4">Create your account to unlock the secrets of the cosmos.</p>
                  <Button
                    variant="outline"
                    className="w-full font-semibold py-3 rounded-lg border border-gray-700 bg-[#1C1C1C] text-gray-400 hover:bg-[#222] transition-all flex items-center justify-center mb-4"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <Star className="w-5 h-5 mr-3 text-yellow-500" />
                    Sign up with Google
                  </Button>
                  <p className="text-gray-500 text-sm">Or create an account with email</p>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => handleCredentialSubmit(e, 'signup')}>
                  <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-[#1C1C1C] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
                      />
                  </div>
                  <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-[#1C1C1C] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
                      />
                  </div>
                  <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        name="password"
                        type="password"
                        placeholder="Create Password"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-[#1C1C1C] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
                      />
                  </div>
                  <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        required
                        className="w-full pl-11 pr-4 py-3 bg-[#1C1C1C] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
                      />
                  </div>
                  <Button type="submit" className="w-full font-semibold text-lg py-3 rounded-lg bg-gradient-to-r from-[#a084ee] to-[#f857a6] text-white hover:brightness-110 transition-all" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer /> 
      </main>
    </div>
  )
}

// Exact cosmic background component
function ExactCosmicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Main solid black background to match footer */}
      <div className="absolute inset-0 bg-[#111]" />
      {/* Glowing orbs/planets, less blur, more defined */}
      <div className="absolute -left-40 top-0 w-[380px] h-[380px] rounded-full bg-[#F8B195] opacity-80 blur-[60px]" />
      <div className="absolute left-1/4 top-32 w-[180px] h-[180px] rounded-full bg-[#A084EE] opacity-70 blur-[40px]" />
      <div className="absolute right-1/4 top-1/2 w-[260px] h-[260px] rounded-full bg-[#F857A6] opacity-80 blur-[50px]" />
      <div className="absolute right-0 bottom-0 w-[340px] h-[340px] rounded-full bg-[#A084EE] opacity-70 blur-[60px]" />
      <div className="absolute left-1/2 bottom-0 w-[120px] h-[120px] rounded-full bg-[#F8B195] opacity-50 blur-[30px]" />
      <div className="absolute left-[60%] top-[10%] w-[90px] h-[90px] rounded-full bg-[#F857A6] opacity-60 blur-[25px]" />
      {/* Dense, subtle stars, slightly brighter */}
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full opacity-50"
          style={{
            width: `${Math.random() * 1.5 + 1}px`,
            height: `${Math.random() * 1.5 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.3px)'
          }}
        />
      ))}
    </div>
  );
}
