'use client'
import { useState } from 'react';

interface StoneDetailsProps {
  pricePerCarat: number;
}

export function StoneDetails({ pricePerCarat }: StoneDetailsProps) {
  const [carats, setCarats] = useState(1);
  
  const handleCaratChange = (value: number) => {
    setCarats(value <= 0 ? 1 : value);
  };
  
  return (
    <div className="mb-4">
      <p className="text-mystic-brown font-medium mb-3">
        ₹{pricePerCarat.toLocaleString('en-IN')} per carat
      </p>
      <div className="flex items-center justify-center mb-4">
        <input
          type="number"
          min="1"
          value={carats}
          onChange={(e) => handleCaratChange(parseInt(e.target.value) || 1)}
          className="w-16 p-2 text-center border border-mystic-brown/30 rounded mr-2"
        />
        <span className="text-mystic-brown/80">carats</span>
      </div>
      <p className="text-xl font-bold text-mystic-brown text-center">
        Total: ₹{(pricePerCarat * carats).toLocaleString('en-IN')}
      </p>
    </div>
  );
}
