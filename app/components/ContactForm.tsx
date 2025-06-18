"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useState, useRef } from 'react'
import { Phone, Mail } from 'lucide-react';

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
    <section id="contact-us" className="py-16 bg-gradient-to-r from-[#fdf6f2] via-[#f3e8ff] to-[#e0f2fe] text-black">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 relative pb-4">
          CONTACT US
          <span className="block absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#7C3AED]"></span>
        </h1>
        <p className="text-lg text-center mb-12">
          Reach out to Nakshatra Gyaan for personalized astrology guidance, spiritual consultations, or any questions about your cosmic journey. Our team is here to support you with expert advice and compassionate care.
        </p>

        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Section: Contact Information */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black mb-6">Contact Information</h2>
            <p className="text-lg text-gray-700 mb-4">
              We are always happy to connect! Whether you have questions about astrology, want to book a consultation, or need spiritual guidance, Nakshatra Gyaan is here for you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-8 mt-8 place-items-center">
              {/* Phone */}
              <div className="flex flex-col items-center justify-center text-gray-700 text-center">
                <div className="p-4 rounded-full bg-[#F3E8FF] mb-2">
                  <Phone className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <p className="text-lg font-semibold">(+654) 6544 55</p>
                <p className="text-sm text-gray-500">Call us for astrology support</p>
              </div>

              {/* Mail */}
              <div className="flex flex-col items-center justify-center text-gray-700 text-center">
                <div className="p-4 rounded-full bg-[#F3E8FF] mb-2">
                  <Mail className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <p className="text-lg font-semibold">mail@nakshatragyaan.com</p>
                <p className="text-sm text-gray-500">Email for queries & appointments</p>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center justify-center text-gray-700 text-center">
                <div className="p-4 rounded-full bg-[#F3E8FF] mb-2">
                  <img src="/images/location-pin.png" alt="Location Pin" className="w-6 h-6" />
                </div>
                <p className="text-lg font-semibold">Delhi, India</p>
                <p className="text-sm text-gray-500">Serving clients worldwide</p>
              </div>
            </div>
            
            {/* Image Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 mt-8 md:mt-16 overflow-hidden relative">
              <img src="/images/contact-bg.jpg" alt="Contact Background" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="flex-1 w-full bg-[#F3E8FF] text-black p-8 rounded-lg border border-[#E0E0E0]">
            <h2 className="text-3xl font-bold mb-3">Get In Touch!</h2>
            <p className="text-lg mb-6">
              Fill out the form below and our astrology team will get back to you as soon as possible. Your journey to cosmic clarity starts here!
            </p>

            <form 
              ref={formRef}
              onSubmit={handleSubmit} 
              className="space-y-4"
            >
              <Input type="email" id="email" name="email" placeholder="Email" required className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-black" />
              <Input type="text" id="name" name="name" placeholder="Name" required className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-black" />
              
              <Textarea 
                id="message" name="message" 
                placeholder="Message" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7C3AED] resize-y text-black"
                rows={7}
                required
              />

              <Button 
                type="submit" 
                className="w-full bg-[#F3E8FF] text-[#7C3AED] border border-[#E0E0E0] py-3 rounded-md text-lg font-semibold hover:bg-[#E0F2FE] hover:text-[#FBBF24] transition-colors duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
              
              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">
                  आपका संदेश सफलतापूर्वक भेज दिया गया है! (Your message has been sent successfully!)
                </p>
              )}
              
              {submitStatus === 'error' && (
                <p className="text-red-500 text-center">
                  कुछ गलत हो गया। कृपया पुनः प्रयास करें। (Something went wrong. Please try again.)
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

