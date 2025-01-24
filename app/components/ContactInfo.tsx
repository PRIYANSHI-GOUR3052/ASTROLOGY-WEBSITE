import { Phone, Mail, MapPin } from 'lucide-react'

export function ContactInfo() {
  return (
    <div className="bg-midnight-blue-light/80 p-8 rounded-lg border border-gold/30">
      <h2 className="text-3xl font-serif font-semibold mb-6 text-gold">संपर्क जानकारी (Contact Information)</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Phone className="text-gold mr-4" />
          <div>
            <p className="text-lavender">फोन (Phone)</p>
            <p className="text-gold">+91 98765 43210</p>
          </div>
        </div>
        <div className="flex items-center">
          <Mail className="text-gold mr-4" />
          <div>
            <p className="text-lavender">ईमेल (Email)</p>
            <p className="text-gold">info@nakshatragyaan.com</p>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="text-gold mr-4" />
          <div>
            <p className="text-lavender">पता (Address)</p>
            <p className="text-gold">123, Celestial Street, Cosmic City, India 400001</p>
          </div>
        </div>
      </div>
    </div>
  )
}

