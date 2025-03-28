"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface Product {
  name: string;
  description: string;
  price: number;
}

function PurchaseContent() {
  const searchParams = useSearchParams();
  const productName = searchParams?.get('productName');
  const price = Number(searchParams?.get('price')) || 0;

  if (!productName || !price) {
    return <div className="text-center p-8">Invalid product information</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{productName}</h1>
        <p className="text-xl font-semibold mb-6">
          Price: ₹{price.toLocaleString('en-IN')}
        </p>
        <button
          onClick={() => {
            // Add purchase logic here
            console.log('Processing purchase...');
          }}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default function PurchasePage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <PurchaseContent />
    </Suspense>
  );
}
