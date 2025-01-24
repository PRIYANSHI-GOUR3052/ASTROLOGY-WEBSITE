'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gold text-midnight-blue hover:bg-gold-light rounded-full p-4"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      ) : (
        <div className="bg-midnight-blue-light border border-gold rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-lavender/20">
            <h3 className="text-gold font-serif">Live Chat</h3>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-lavender hover:text-gold"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close chat</span>
            </Button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {/* Chat messages would go here */}
            <p className="text-lavender">Welcome to Celestial Insights! How can we assist you today?</p>
          </div>
          <div className="p-4 border-t border-lavender/20">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 rounded bg-midnight-blue text-lavender border border-lavender/20 focus:border-gold"
            />
          </div>
        </div>
      )}
    </div>
  )
}

