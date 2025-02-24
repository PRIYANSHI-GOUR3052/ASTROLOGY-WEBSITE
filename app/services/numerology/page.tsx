"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function NumerologyPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    fullName: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-4 text-gold">
        अंक ज्योतिष परामर्श (Numerology Consultation)
      </h1>
      <div className="max-w-3xl mx-auto mt-12">
        <Card className="bg-midnight-blue-light/80 border-gold">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-gold block mb-2">Name</label>
                  <Input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-midnight-blue text-lavender border-gold"
                    required
                  />
                </div>
                <div>
                  <label className="text-gold block mb-2">Email</label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-midnight-blue text-lavender border-gold"
                    required
                  />
                </div>
                <div>
                  <label className="text-gold block mb-2">Phone Number</label>
                  <Input 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-midnight-blue text-lavender border-gold"
                    required
                  />
                </div>
                <div>
                  <label className="text-gold block mb-2">Date of Birth</label>
                  <Input 
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="bg-midnight-blue text-lavender border-gold"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-gold block mb-2">Full Name (as per birth certificate)</label>
                  <Input 
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="bg-midnight-blue text-lavender border-gold"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-gold block mb-2">Your Message or Specific Questions</label>
                <Textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-midnight-blue text-lavender border-gold h-32"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-gold text-midnight-blue hover:bg-gold/90"
              >
                Book Consultation
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

