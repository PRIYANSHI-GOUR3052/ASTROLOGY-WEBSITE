'use client';

import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Category: {params?.slug}</h1>
      <p className="text-lg text-gray-600">This is a placeholder page for the selected category. You can build out the product listing here.</p>
    </div>
  );
} 