"use client"

import { Phone, Clock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-[#fef6f2]">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-black relative pb-4">
          CONTACT US
          <span className="block absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#A6033F]"></span>
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
          {/* Left Section: Contact Information */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-black mb-6">Innovana Astro Services Limited</h2>
            <p className="text-lg text-gray-700 mb-4">1- KHA -18, Jawahar Nagar,</p>
            <p className="text-lg text-gray-700 mb-6">Jaipur, Rajasthan, 302004 India</p>

            <div className="flex items-center text-gray-700 mb-3">
              <Phone className="w-5 h-5 mr-3 text-[#A6033F]" />
              <p className="text-lg">Customer Support: +91-7229808887</p>
            </div>
            <div className="flex items-center text-gray-700 mb-3">
              <Clock className="w-5 h-5 mr-3 text-[#A6033F]" />
              <p className="text-lg">Working Hours: 10:00AM to 7:00PM (Monday to Friday)</p>
            </div>
            <div className="flex items-center text-gray-700 mb-8">
              <Mail className="w-5 h-5 mr-3 text-[#A6033F]" />
              <p className="text-lg">support@anytimeastro.com</p>
            </div>
            
            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Map Not Necessary
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="flex-1 w-full">
            <h2 className="text-3xl font-bold text-black mb-3">Have any questions?</h2>
            <p className="text-lg text-gray-700 mb-6">We are happy to help. Tell us your issue and we will get back to you at the earliest.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Input type="text" placeholder="Name" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A6033F]" />
              <Input type="email" placeholder="Email Address" className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A6033F]" />
            </div>
            
            <Select>
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A6033F] mb-4">
                <SelectValue placeholder="Select your query type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Inquiry</SelectItem>
                <SelectItem value="support">Support Request</SelectItem>
                <SelectItem value="feedback">Feedback</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Textarea 
              placeholder="Write your message here" 
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A6033F] resize-y mb-2"
              rows={7}
              maxLength={500}
            />
            <p className="text-right text-sm text-gray-500 mb-6">500 characters left.</p>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <input type="checkbox" id="robot-checkbox" className="mr-2" />
                <label htmlFor="robot-checkbox" className="text-gray-700">I'm not a robot</label>
              </div>
              {/* reCAPTCHA placeholder */}
              <div className="text-sm text-gray-500">reCAPTCHA Privacy - Terms</div>
            </div>

            <Button className="w-full bg-[#E54868] text-white py-3 rounded-md text-lg font-semibold hover:bg-[#d43a57] transition-colors duration-300">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

