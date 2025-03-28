import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StoneDetails } from './StoneDetails'

const products = [
  {
    name: "रुद्राक्ष माला (Rudraksha Mala)",
    description: "शुद्ध रुद्राक्ष बीज से निर्मित पारंपरिक माला, आध्यात्मिक शक्ति और सुरक्षा के लिए।",
    price: 2499,
    slug: "rudraksha-mala"
  },
  {
    name: "ध्यान गद्दी (Meditation Cushion)",
    description: "हमारे आरामदायक कुशन के साथ अपने ध्यान अभ्यास को बढ़ाएं।",
    price: 1499,
    slug: "meditation-cushion"
  },
  {
    name: "Ruby (रूबी)",
    description: "Enhances confidence, leadership, and vitality. Associated with the Sun.",
    pricePerCarat: 15000,
    slug: "ruby",
    isStone: true
  },
  {
    name: "Blue Sapphire (नीलम)",
    description: "Enhances mental clarity and spiritual insight. Associated with Saturn.",
    pricePerCarat: 20000,
    slug: "blue-sapphire",
    isStone: true
  },
  {
    name: "Emerald (पन्ना)",
    description: "Encourages growth, patience, and wellbeing. Associated with Mercury.",
    pricePerCarat: 18000,
    slug: "emerald",
    isStone: true
  },
  {
    name: "Yellow Sapphire (पुखराज)",
    description: "Brings wisdom, prosperity, and optimism. Associated with Jupiter.",
    pricePerCarat: 12000,
    slug: "yellow-sapphire",
    isStone: true
  }
]

export function ProductGrid() {
  return (
    <section className="py-16">
      <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-8 text-center text-mystic-brown">
        हमारे सभी उत्पाद (All Our Products)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Card key={index} className="bg-celestial-cream/90 hover:bg-celestial-cream transition-colors transform hover:scale-105 duration-300 border border-sunburst-yellow/30 hover:border-sunburst-yellow">
            <CardContent className="p-6">
              <h3 className="text-2xl font-serif font-semibold mb-2 text-mystic-brown text-center">{product.name}</h3>
              <p className="mb-4 text-sm text-mystic-brown/80 text-center">{product.description}</p>
              {product.isStone ? (
                <StoneDetails pricePerCarat={product.pricePerCarat} />
              ) : (
                <p className="text-xl font-bold mb-4 text-mystic-brown text-center">
                  ₹{product.price ? product.price.toLocaleString('en-IN') : 'Price not available'}
                </p>
              )}
              <div className="text-center">
                <Button asChild className="bg-sunburst-yellow text-mystic-brown hover:bg-sunburst-yellow-light">
                  <Link href={`/shop/${product.slug}`}>खरीदें (Buy Now)</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

