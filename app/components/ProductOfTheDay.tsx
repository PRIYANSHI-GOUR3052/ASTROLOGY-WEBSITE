import Link from 'next/link';

export default function ProductOfTheDay() {
  return (
    <section className="w-full bg-white py-20 px-0">
      <h2 className="text-3xl md:text-4xl font-normal text-black text-center mb-12" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>Product Of The Day</h2>
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-0 lg:gap-0">
        {/* Product Image - Much Bigger and Prominent */}
        <div className="relative flex-shrink-0 w-full lg:w-[55vw] min-h-[500px] lg:min-h-[800px] flex items-center justify-center overflow-hidden" style={{ background: '#f7f5ed' }}>
          <img
            src="https://res.cloudinary.com/dxwspucxw/image/upload/v1753092333/natural_gemstones_kstmb8.jpg"
            alt="Natural Gemstone Collection"
            className="w-full h-full object-cover object-center rounded-none lg:rounded-r-3xl shadow-xl"
            style={{ minHeight: '500px', maxHeight: '800px' }}
          />
          {/* Gradient Overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-none lg:rounded-r-3xl"></div>
        </div>
        {/* Info Card */}
        <div className="flex flex-col justify-center bg-[#f7f5ed] lg:rounded-l-3xl rounded-none shadow-xl p-8 lg:p-16 w-full lg:w-[40vw] min-w-[320px] max-w-full lg:max-w-[700px]">
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
    </section>
  );
} 