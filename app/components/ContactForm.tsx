import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
  return (
    <section id="contact-us" className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-celestial-blue/30 to-cosmic-purple/30 rounded-3xl"></div>
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-center text-gold">
          हमसे संपर्क करें
        </h2>
        <h3 className="text-2xl md:text-3xl font-serif text-center mb-12 text-gold">
          Contact Us
        </h3>
        <form className="space-y-6 bg-midnight-blue-light/80 p-8 rounded-lg border border-gold/30 max-w-2xl mx-auto">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-gold">नाम (Name)</label>
            <Input id="name" name="name" required className="bg-midnight-blue text-lavender border-lavender/20 focus:border-gold" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gold">ईमेल (Email)</label>
            <Input id="email" name="email" type="email" required className="bg-midnight-blue text-lavender border-lavender/20 focus:border-gold" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-gold">संदेश (Message)</label>
            <Textarea id="message" name="message" rows={5} required className="bg-midnight-blue text-lavender border-lavender/20 focus:border-gold" />
          </div>
          <Button type="submit" className="w-full bg-gold text-midnight-blue hover:bg-gold-light">
            संदेश भेजें (Send Message)
          </Button>
        </form>
      </div>
    </section>
  )
}

