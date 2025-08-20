import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function ProductOfTheDay() {
  return (
    <section className="w-full bg-white py-20 px-4">
      {/* Single Card Container */}
      <div className="max-w-6xl mx-auto bg-[#f7f5ed] rounded-3xl shadow-2xl overflow-hidden">
        {/* Heading inside card */}
        <div className="px-6 pt-8 pb-4 lg:px-10 lg:pt-10 lg:pb-6">
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative text-3xl md:text-4xl font-extrabold text-center leading-tight fancy-heading"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            <span className="inline-block animate-heading-pop">
              <span className="bg-black bg-[length:200%_100%] bg-clip-text text-transparent drop-shadow-sm animate-gradient-sheen">
                Product Of The Day
              </span>
            </span>
            <span className="pointer-events-none absolute left-1/2 -bottom-2 h-[3px] w-40 -translate-x-1/2 rounded-full bg-gradient-to-r from-green-700 via-emerald-500 to-green-700 opacity-80 animate-underline-flow" />
          </motion.h2>
          <style jsx>{`
            @keyframes gradientSheen {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes underlineFlow {
              0% { transform: translate(-50%,0) scaleX(0.4); opacity: .4; }
              50% { transform: translate(-50%,0) scaleX(1); opacity: 1; }
              100% { transform: translate(-50%,0) scaleX(0.4); opacity: .4; }
            }
            @keyframes headingPop {
              0% { transform: translateY(25px) scale(.92); opacity: 0; }
              60% { transform: translateY(0) scale(1.02); opacity: 1; }
              100% { transform: translateY(0) scale(1); opacity: 1; }
            }
            .animate-gradient-sheen { animation: gradientSheen 6s linear infinite; }
            .animate-underline-flow { animation: underlineFlow 3.5s ease-in-out infinite; }
            .animate-heading-pop { animation: headingPop .9s cubic-bezier(.19,1,.22,1); }
          `}</style>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch border-t border-black/5">
          {/* Product Image */}
          <div className="w-full lg:w-[40%] p-5 lg:p-6 flex items-center justify-center">
            <div className="relative w-full max-w-sm h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg">
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
          <div className="flex flex-col justify-center p-6 lg:p-12 w-full lg:w-[60%]">
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