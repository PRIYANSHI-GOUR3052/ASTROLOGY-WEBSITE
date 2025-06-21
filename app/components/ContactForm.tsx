"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState, useRef } from 'react'
import { Phone, Mail, MapPin, Send, Star, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FloatingCard = ({ 
  className, 
  children, 
  gradient,
  href,
}: { 
  className?: string; 
  children?: React.ReactNode;
  gradient?: string;
  href: string;
}) => (
  <Link
    href={href}
    className={`absolute ${gradient || 'bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400'} rounded-2xl shadow-2xl hidden lg:block cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ${className}`}
  >
    <div className="p-6">
      {children}
    </div>
  </Link>
);

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formData = new FormData(event.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit')
      }
      
      setSubmitStatus('success')
      formRef.current?.reset()
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact-us" className="relative bg-black text-white overflow-hidden min-h-screen py-20">
      {/* Floating decorative cards matching footer style */}
      <FloatingCard 
        href="#contact-us"
        className="top-[10%] left-4 w-72 rotate-[-12deg] opacity-90 z-10"
        gradient="bg-gradient-to-br from-violet-500 via-pink-500 to-orange-400"
      >
        <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">Cosmic Connection</div>
        <h3 className="text-white font-bold text-lg mb-2 leading-snug">Your celestial journey begins here</h3>
        <div className="flex items-center text-white/80 text-sm mb-4">
          <Star className="w-4 h-4 mr-2" />
          <span>Connect with the cosmos</span>
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">Reach out →</div>
      </FloatingCard>

      <FloatingCard 
        href="/services"
        className="top-[50%] right-4 w-72 rotate-[12deg] opacity-90 z-10"
        gradient="bg-gradient-to-br from-blue-500 via-teal-400 to-green-400"
      >
        <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">Guidance Awaits</div>
        <h3 className="text-white font-bold text-lg mb-2 leading-snug">Transform your path with stellar wisdom</h3>
        <div className="flex items-center text-white/80 text-sm mb-4">
          <Sparkles className="w-4 h-4 mr-2" />
          <span>Personalized insights</span>
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">Discover →</div>
      </FloatingCard>

      <FloatingCard 
        href="/services"
        className="bottom-[5%] left-4 w-80 rotate-[-8deg] opacity-90 z-10"
        gradient="bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500"
      >
        <div className="bg-black/20 rounded-md px-3 py-1 text-xs text-white mb-4 inline-block">Expert Consultation</div>
        <h3 className="text-white font-bold text-lg mb-2 leading-snug">Professional astrological guidance</h3>
        <div className="flex items-center text-white/80 text-sm mb-4">
          <span className="mr-2">🌟</span>
          <span>Available worldwide</span>
        </div>
        <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">Book now →</div>
      </FloatingCard>

      <div className="max-w-6xl mx-auto px-5 relative z-20">
        {/* Header section matching footer style */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Connect with the<br />
            <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">cosmic realm</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Have a question for Innovana Astro Services Limited, need guidance, or wish to book a consultation? Reach out to us. Your cosmic conversation awaits.
          </p>
        </div>

        {/* Main content container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                We are available via phone, email, or you can send us a message directly. We look forward to guiding you on your celestial journey.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-violet-500 to-pink-500 rounded-full mt-1 flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Phone</h3>
                  <p className="text-gray-300 text-lg">+91-7229808887</p>
                  <p className="text-sm text-gray-400">10:00AM to 7:00PM (Mon-Fri)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full mt-1 flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Email</h3>
                  <p className="text-gray-300 text-lg">support@anytimeastro.com</p>
                  <p className="text-sm text-gray-400">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-full mt-1 flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">Location</h3>
                  <p className="text-gray-300 text-lg">1- KHA -18, Jawahar Nagar, Jaipur</p>
                  <p className="text-sm text-gray-400">Rajasthan, 302004 India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
            <h2 className="text-3xl font-bold mb-6 text-white">Send us a message</h2>
            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="space-y-4">
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Your Name" 
                  required 
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-base"
                />
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Your Email" 
                  required 
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all text-base"
                />
              </div>
              
              <Textarea 
                id="message" 
                name="message" 
                placeholder="Tell us about your cosmic journey..." 
                className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none transition-all text-base"
                rows={6}
                required
              />

              <Button 
                type="submit" 
                className="w-full font-semibold text-lg py-4 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:scale-105 transition-transform flex items-center justify-center gap-2 border-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Sending message...'
                ) : (
                  <>
                    Send Message 
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
              
              {submitStatus === 'success' && (
                <div className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-2xl">
                  <p className="text-green-300 font-medium">
                    ✨ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-2xl">
                  <p className="text-red-300 font-medium">
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Large brand name matching footer */}
        <div className="text-center mt-20 mb-12">
          <h1 className="text-[48px] md:text-[64px] font-bold text-white/10 tracking-wider m-0 select-none">nakshatra</h1>
        </div>
      </div>
    </section>
  )
}