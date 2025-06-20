'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
        }

        const result = await response.json()
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        window.dispatchEvent(new Event('authChange'))
        router.push('/')
      } else {
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
    <div className="bg-black">
      <main className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col">
        <div className="absolute inset-0 z-0">
          <AnimatedStars />
          <MysticBackground />
        </div>
        
        <FloatingCard className="top-[15%] -left-24 w-72 h-40 transform -rotate-12 p-8 flex items-center justify-between">
          <span className="text-7xl text-white/10">🌙</span>
          <span className="text-5xl text-white/10 mt-12">✨</span>
        </FloatingCard>
        <FloatingCard className="top-[30%] -right-20 w-80 h-56 transform rotate-8 p-8 flex flex-col justify-between overflow-hidden">
          <span className="text-8xl text-white/10 self-end -mr-4">♌</span>
          <span className="text-8xl text-white/10 self-start -ml-4">♏</span>
        </FloatingCard>
        <FloatingCard className="bottom-[10%] -left-16 w-80 h-32 transform rotate-12 p-6 overflow-hidden">
            <div className="absolute w-full h-full">
                <div className="absolute top-8 left-10 w-3 h-3 bg-white/20 rounded-full" />
                <div className="absolute top-16 right-12 w-2 h-2 bg-white/20 rounded-full" />
                <div className="absolute bottom-6 left-24 w-4 h-4 bg-white/20 rounded-full" />
                <div className="absolute top-6 right-28 w-2 h-2 bg-white/20 rounded-full" />
                <svg className="absolute top-0 left-0 w-full h-full opacity-10" preserveAspectRatio="none">
                    <line x1="46" y1="38" x2="260" y2="70" stroke="white" strokeWidth="1" strokeDasharray="4 4"/>
                    <line x1="102" y1="110" x2="260" y2="70" stroke="white" strokeWidth="1" strokeDasharray="4 4"/>
                </svg>
            </div>
        </FloatingCard>
        
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
                    {isLoading ? 'Loading...' : 'Create Account'}
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
                    Sign up with Google
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer /> 
      </main>
    </div>
  )
}
