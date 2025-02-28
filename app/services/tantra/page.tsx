"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export default function TantraPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    experience: "",
    purpose: "",
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
        तंत्र विद्या परामर्श (Tantra Consultation)
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
                <div>
                  <label className="text-gold block mb-2">Previous Experience with Tantra</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full bg-midnight-blue text-lavender border-gold rounded-md p-2"
                    required
                  >
                    <option value="">Select your experience level</option>
                    <option value="none">No prior experience</option>
                    <option value="beginner">Basic knowledge</option>
                    <option value="intermediate">Some practice</option>
                    <option value="advanced">Advanced practitioner</option>
                  </select>
                </div>
                <div>
                  <label className="text-gold block mb-2">Purpose of Consultation</label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                    className="w-full bg-midnight-blue text-lavender border-gold rounded-md p-2"
                    required
                  >
                    <option value="">Select primary purpose</option>
                    <option value="spiritual">Spiritual Growth</option>
                    <option value="healing">Healing & Energy Work</option>
                    <option value="meditation">Meditation Practices</option>
                    <option value="protection">Protection & Blessing</option>
                    <option value="general">General Guidance</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gold block mb-2">Additional Information or Questions</label>
                <Textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-midnight-blue text-lavender border-gold h-32"
                  placeholder="Please share your specific interests or questions about Tantra practices..."
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