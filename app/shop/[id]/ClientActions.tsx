'use client';

export default function ClientActions({ productTitle }: { productTitle: string }) {
  return (
    <div className="flex gap-3">
      <button
        className="flex-1 bg-black text-white py-3 rounded-md font-semibold text-base hover:bg-gray-800 transition"
        onClick={() => alert(`Added ${productTitle} to cart`)}
      >
        Add to Cart
      </button>
      <button
        className="flex-1 bg-yellow-400 text-black py-3 rounded-md font-semibold text-base hover:bg-yellow-500 transition"
        onClick={() => alert(`Buying ${productTitle} now`)}
      >
        Buy Now
      </button>
    </div>
  );
}


