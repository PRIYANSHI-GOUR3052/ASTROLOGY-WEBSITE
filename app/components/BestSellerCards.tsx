'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ProductPurchaseInfo from './ProductPurchaseInfo';

interface Product {
  title: string;
  description: string;
  price: string;
  slug: string;
  image?: string;
  category?: string;
  rating?: number;
  originalPrice?: string;
}

interface BestSellerCardsProps {
  products: Product[];
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
};

export default function BestSellerCards({ products }: BestSellerCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Take first 8 products for featured layout, next 8 for grid
  const featuredProducts = products.slice(0, 8);
  const gridProducts = products.slice(8, 16);
  
  // First set (big left, 3 small right)
  const firstSetMain = featuredProducts[0];
  const firstSetSide = featuredProducts.slice(1, 4);
  
  // Second set (3 small left, big right)
  const secondSetSide = featuredProducts.slice(4, 7);
  const secondSetMain = featuredProducts[7];

  return (
    <section className="w-full px-0 pt-2 pb-16">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16 px-8"
        style={{ 
          fontFamily: 'Playfair Display, serif', 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
Best Seller Collection
      </motion.h2>

            {/* First Set: Big Left + 3 Small Right */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-20"
      >
        {/* Left Column: Main Featured Product */}
        <motion.div 
          variants={cardVariants}
          className="lg:col-span-2"
          onHoverStart={() => setHoveredCard(0)}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <Link href={`/shop/${firstSetMain.slug}`} className="block group">
            <motion.div 
              className="bg-white rounded-3xl shadow-xl overflow-hidden h-[480px] relative"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Product Image */}
              <div className="relative w-full h-72 overflow-hidden">
                <motion.div
                  variants={imageVariants}
                  animate={hoveredCard === 0 ? "hover" : ""}
                  className="w-full h-full"
                >
                  <Image 
                    src={firstSetMain.image || '/images/placeholder.jpg'} 
                    alt={firstSetMain.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                




                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between h-[208px]">
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {firstSetMain.title}
                  </motion.h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {firstSetMain.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {firstSetMain.price}
                      </span>
                      {firstSetMain.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {firstSetMain.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">★</span>
                      ))}
                      <span className="text-gray-500 text-sm ml-1">(4.8)</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <span className="inline-flex items-center px-8 py-3 rounded-full bg-black text-white font-bold shadow-lg hover:shadow-xl transition-all hover:bg-gray-800 border-2 border-black hover:border-gray-800">
                    Shop Now
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Right Column: Three Stacked Products */}
        <div className="flex flex-col gap-8">
          {firstSetSide.map((product, index) => (
            <motion.div
              key={product.slug}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index + 1)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Link href={`/shop/${product.slug}`} className="block group">
                <motion.div 
                  className="flex bg-white rounded-2xl shadow-xl overflow-hidden h-[180px] hover:shadow-2xl transition-all duration-300"
                  whileHover={{ x: 8, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" }}
                >
                  {/* Product Image */}
                  <div className="relative w-40 h-full flex-shrink-0 overflow-hidden">
                    <motion.div
                      variants={imageVariants}
                      animate={hoveredCard === index + 1 ? "hover" : ""}
                      className="w-full h-full"
                    >
                      <Image 
                        src={product.image || '/images/placeholder.jpg'} 
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Small Badge */}
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                      HOT
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-1" 
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                      {product.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {product.price}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
                        whileTap={{ scale: 0.9 }}
                        className="px-5 py-2 bg-black text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-black hover:border-gray-800"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Second Set: 3 Small Left + Big Right (Flipped Layout) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start"
      >
        {/* Left Column: Three Stacked Products */}
        <div className="flex flex-col gap-8">
          {secondSetSide.map((product, index) => (
            <motion.div
              key={product.slug}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(index + 5)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Link href={`/shop/${product.slug}`} className="block group">
                <motion.div 
                  className="flex bg-white rounded-2xl shadow-xl overflow-hidden h-[180px] hover:shadow-2xl transition-all duration-300"
                  whileHover={{ x: -8, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" }}
                >
                  {/* Product Image */}
                  <div className="relative w-40 h-full flex-shrink-0 overflow-hidden">
                    <motion.div
                      variants={imageVariants}
                      animate={hoveredCard === index + 5 ? "hover" : ""}
                      className="w-full h-full"
                    >
                      <Image 
                        src={product.image || '/images/placeholder.jpg'} 
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Small Badge */}
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                      HOT
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 flex flex-col justify-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-1" 
                        style={{ fontFamily: 'Playfair Display, serif' }}>
                      {product.title}
                    </h4>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-amber-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {product.price}
                      </span>
                      
                      <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: "#1f2937" }}
                        whileTap={{ scale: 0.9 }}
                        className="px-5 py-2 bg-black text-white text-sm font-bold rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-black hover:border-gray-800"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Column: Main Featured Product */}
        <motion.div 
          variants={cardVariants}
          className="lg:col-span-2"
          onHoverStart={() => setHoveredCard(8)}
          onHoverEnd={() => setHoveredCard(null)}
        >
          <Link href={`/shop/${secondSetMain.slug}`} className="block group">
            <motion.div 
              className="bg-white rounded-3xl shadow-xl overflow-hidden h-[480px] relative"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Product Image */}
              <div className="relative w-full h-72 overflow-hidden">
                <motion.div
                  variants={imageVariants}
                  animate={hoveredCard === 8 ? "hover" : ""}
                  className="w-full h-full"
                >
                  <Image 
                    src={secondSetMain.image || '/images/placeholder.jpg'} 
                    alt={secondSetMain.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                




                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between h-[208px]">
                <div>
                  <motion.h3 
                    className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {secondSetMain.title}
                  </motion.h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {secondSetMain.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold text-amber-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {secondSetMain.price}
                      </span>
                      {secondSetMain.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {secondSetMain.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-amber-400 text-lg">★</span>
                      ))}
                      <span className="text-gray-500 text-sm ml-1">(4.9)</span>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <span className="inline-flex items-center px-8 py-3 rounded-full bg-black text-white font-bold shadow-lg hover:shadow-xl transition-all hover:bg-gray-800 border-2 border-black hover:border-gray-800">
                    Shop Now
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
              </motion.div>

      {/* Product Purchase Info Section */}
      <div className="mt-20">
        <ProductPurchaseInfo />
      </div>

      {/* More Products Grid - 8 Cards in 4x2 Layout */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full px-0 mt-20"
      >
        <motion.h3 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 px-8"
          style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          More Products
        </motion.h3>

        <div className="w-full px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {gridProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 60,
                  scale: 0.8
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }
                }
              }}
              onHoverStart={() => setHoveredCard(index + 10)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <Link href={`/shop/${product.slug}`} className="block group">
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden h-[380px] relative"
                  whileHover={{ 
                    y: -12, 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    scale: 1.02
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Product Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <motion.div
                      animate={hoveredCard === index + 10 ? { scale: 1.1 } : { scale: 1 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="w-full h-full"
                    >
                      <Image 
                        src={product.image || '/images/placeholder.jpg'} 
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    
                    {/* Badge */}
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                      className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                    >
                      HOT
                    </motion.span>

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between h-[132px]">
                    <div>
                      <motion.h4 
                        className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-2"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                      >
                        {product.title}
                      </motion.h4>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-amber-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <motion.button
                        whileHover={{ 
                          scale: 1.1, 
                          backgroundColor: "#1f2937",
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="px-4 py-2 bg-black text-white text-xs font-bold rounded-full shadow-lg transition-all border border-black hover:border-gray-800"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center mt-16 px-8"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-10 py-4 bg-white text-black font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all border-2 border-black hover:bg-black hover:text-white"
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 