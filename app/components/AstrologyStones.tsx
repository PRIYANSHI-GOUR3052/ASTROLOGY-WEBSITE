'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { UniversalCartButton } from './UniversalCartButton'

interface Stone {
  id: number;
  name: string;
  nameEn: string;
  zodiac: string;
  zodiacEn: string;
  benefits: string;
  benefits_en: string;
  price_per_carat: number;
}

export function AstrologyStones() {
  const [stones, setStones] = useState<Stone[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // State for carat values
  const [caratValues, setCaratValues] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchStones = async () => {
      try {
        const res = await fetch("/api/products/stones");
        if (!res.ok) {
          throw new Error('Failed to fetch astrology stones');
        }
        const data = await res.json();
        setStones(data.stones);
        
        // Initialize carat values
        const initialCaratValues: Record<string, number> = {};
        data.stones.forEach((stone: Stone) => {
          initialCaratValues[stone.nameEn || ''] = 1;
        });
        setCaratValues(initialCaratValues);
      } catch (err) {
        setError('Failed to load astrology stones');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStones();
  }, []);

  // Handler for carat changes
  const handleCaratChange = (stoneName: string, value: number) => {
    setCaratValues(prev => ({
      ...prev,
      [stoneName]: value <= 0 ? 1 : value
    }));
  };

  return (
    <section className="my-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-mystic-brown">
          ज्योतिष रत्न<br />
          <span className="text-2xl md:text-3xl">Astrology Stones</span>
        </h2>
        <p className="text-lg text-mystic-brown max-w-3xl mx-auto mb-4">
          खगोलीय ऊर्जाओं की शक्ति का उपयोग करें हमारे ज्योतिष रत्नों के संग्रह के साथ। प्रत्येक पत्थर को विशिष्ट राशि चिह्नों और ग्रहीय प्रभावों के साथ संरेखित करने के लिए सावधानीपूर्वक चुना गया है।
        </p>
        <p className="text-lg text-mystic-brown max-w-3xl mx-auto">
          Harness the power of celestial energies with our collection of astrology stones. Each stone is carefully selected to align with specific zodiac signs and planetary influences.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-mystic-brown"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 p-8">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stones.map((stone) => (
            <Card key={stone.nameEn || `stone-${Math.random()}`} className="bg-celestial-cream/90 shadow-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-2xl font-serif font-semibold mb-2 text-mystic-brown">
                    {stone.nameEn || 'Stone'} ({stone.name || ''})
                  </h3>
                  <p className="text-mystic-brown/80 mb-2">
                    Associated with {stone.zodiacEn || ''} ({stone.zodiac || ''})
                  </p>
                  <div className="mb-4">
                    <p className="text-mystic-brown/80 mb-1 font-medium">Benefits:</p>
                    <p className="text-mystic-brown/80 italic mb-2">
                      {stone.benefits || ''}
                    </p>
                    <p className="text-mystic-brown/80">
                      {stone.benefits_en || ''}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-mystic-brown/20 pt-4">
                    <p className="text-mystic-brown font-medium mb-3">
                      ₹{stone.price_per_carat ? stone.price_per_carat.toLocaleString('en-IN') : '0'} per carat
                    </p>
                    <div className="flex items-center justify-center mb-4">
                      <input
                        type="number"
                        min="1"
                        value={caratValues[stone.nameEn || ''] || 1}
                        onChange={(e) => handleCaratChange(stone.nameEn || '', parseInt(e.target.value) || 1)}
                        className="w-16 p-2 text-center border border-mystic-brown/30 rounded mr-2"
                      />
                      <span className="text-mystic-brown/80">carats</span>
                    </div>
                    <p className="text-lg font-bold text-mystic-brown mb-4">
                      Total: ₹{((stone.price_per_carat || 0) * (caratValues[stone.nameEn || ''] || 1)).toLocaleString('en-IN')}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <UniversalCartButton 
                        productId={stone.id.toString()}
                        productName={stone.nameEn || 'Stone'}
                        price={stone.price_per_carat || 0}
                        isStone={true}
                        carats={caratValues[stone.nameEn || ''] || 1}
                        variant="addToCart"
                        className="w-full bg-black text-white hover:bg-gray-800"
                      >
                        Add to Cart
                      </UniversalCartButton>
                      
                      <UniversalCartButton 
                        productId={stone.id.toString()}
                        productName={stone.nameEn || 'Stone'}
                        price={stone.price_per_carat || 0}
                        isStone={true}
                        carats={caratValues[stone.nameEn || ''] || 1}
                        variant="buyNow"
                        className="w-full bg-black text-white hover:bg-gray-800"
                      >
                        खरीदें (Buy Now)
                      </UniversalCartButton>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}