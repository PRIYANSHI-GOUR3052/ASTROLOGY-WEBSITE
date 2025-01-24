'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'

interface StoneDetailsProps {
  pricePerCarat: number
}

export function StoneDetails({ pricePerCarat }: StoneDetailsProps) {
  const [carats, setCarats] = useState(1)

  const handleCaratChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value)
    setCarats(isNaN(value) ? 0 : value)
  }

  return (
    <div className="mb-4">
      <p className="text-lg font-semibold text-mystic-brown text-center mb-2">
        ₹{pricePerCarat.toLocaleString('en-IN')} per carat
      </p>
      <div className="flex items-center justify-center space-x-2">
        <Input
          type="number"
          min="0.1"
          step="0.1"
          value={carats}
          onChange={handleCaratChange}
          className="w-20 text-center bg-celestial-cream border-sunburst-yellow text-mystic-brown"
        />
        <span className="text-mystic-brown">carats</span>
      </div>
      <p className="text-xl font-bold mt-2 text-mystic-brown text-center">
        Total: ₹{(pricePerCarat * carats).toLocaleString('en-IN')}
      </p>
    </div>
  )
}

