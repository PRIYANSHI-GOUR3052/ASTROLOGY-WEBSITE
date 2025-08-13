import Link from 'next/link';
import Image from 'next/image';

export default function ProductOfTheDay() {
  return (
    <section className="w-full bg-white py-20 px-4">
      <h2 className="text-3xl md:text-4xl font-normal text-black text-center mb-12" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>Product Of The Day</h2>
      
      {/* Single Card Container */}
      <div className="max-w-6xl mx-auto bg-[#f7f5ed] rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row items-stretch">
          {/* Product Image */}
          <div className="w-full lg:w-[40%] p-6 lg:p-8 flex items-center justify-center">
            <div className="relative w-full max-w-sm h-64 lg:h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://res.cloudinary.com/dxwspucxw/image/upload/v1753092333/natural_gemstones_kstmb8.jpg"
                alt="Natural Gemstone Collection"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 40vw"
                loading="lazy"
              />
              {/* Gradient Overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
          
          {/* Info Content */}
          <div className="flex flex-col justify-center p-8 lg:p-16 w-full lg:w-[60%]">
            <span className="text-sm text-amber-600 mb-2 font-bold uppercase tracking-wider" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>Limited Edition</span>
            <h3 className="text-2xl md:text-4xl font-bold mb-6 text-black leading-tight" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Natural Gemstone Collection</h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, lineHeight: '1.7' }}>
              Discover the power of authentic, lab-certified gemstones including <span className="font-bold text-black">Ruby, Emerald, Blue Sapphire</span> and more precious stones. Each piece is carefully selected for planetary remedies and spiritual growth.
            </p>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'Inter, sans-serif' }}>₹2,499</span>
              <span className="text-xl text-gray-400 line-through">₹4,999</span>
              <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">50% OFF</span>
            </div>
            
            <button className="w-full lg:w-auto px-10 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 