import Link from 'next/link';

export default function ProductOfTheDay() {
  return (
    <section className="w-full bg-white py-20 px-0">
      <h2 className="text-3xl md:text-4xl font-normal text-black text-center mb-12" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>Product Of The Day</h2>
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-center gap-0 lg:gap-0">
        {/* Product Image */}
        <div className="relative flex-shrink-0 w-full lg:w-[52vw] min-h-[340px] lg:min-h-[600px] flex items-center justify-center overflow-hidden" style={{ background: '#f7f5ed' }}>
          <img
            src="/images/pyrite.jpg"
            alt="Raw Pyrite Stone"
            className="w-full h-full object-contain object-center rounded-none lg:rounded-r-2xl shadow-none"
            style={{ maxHeight: '700px', minHeight: '340px' }}
          />
        </div>
        {/* Info Card */}
        <div className="flex flex-col justify-center bg-[#f7f5ed] lg:rounded-l-2xl rounded-none shadow-none p-8 lg:p-16 w-full lg:w-[40vw] min-w-[320px] max-w-full lg:max-w-[700px]">
          <span className="text-sm text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Only 1 piece in stock!</span>
          <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-black" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 600 }}>7Kg Raw Pyrite Stone</h3>
          <p className="text-base text-gray-700 mb-4 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            Invite prosperity and success into your space with this <span className="font-bold text-black">7Kg Original Raw Pyrite Stone</span>. Known for attracting wealth, boosting financial opportunities, and strengthening Shani's influence, it protects against negativity, promotes vitality, and eliminates financial obstacles.
          </p>
          <button className="mt-2 px-8 py-3 bg-black text-white rounded-lg font-semibold text-base hover:bg-gray-900 transition" style={{ fontFamily: 'Inter, sans-serif' }}>Buy Now</button>
        </div>
      </div>
    </section>
  );
} 