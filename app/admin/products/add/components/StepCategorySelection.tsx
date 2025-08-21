import React, { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  subcategories?: { id: number; name: string; slug: string }[];
}

interface ZodiacSign {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
}

interface StepCategorySelectionProps {
  zodiacSign?: string | null;
  categoryId: number | null;
  onZodiacChange?: (sign: string | null) => void;
  onCategoryChange: (id: number | null) => void;
  onNext: () => void;
  errors: { [key: string]: string };
  step?: number;
  totalSteps?: number;
  productId?: number; // Add productId for edit mode
}

const StepCategorySelection: React.FC<StepCategorySelectionProps> = ({
  zodiacSign = '',
  categoryId,
  onZodiacChange = () => {},
  onCategoryChange,
  onNext,
  errors,
  step = 1,
  totalSteps = 2,
  productId,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [zodiacSigns, setZodiacSigns] = useState<ZodiacSign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // Prevent multiple API calls
    if (dataLoaded) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories and zodiac signs in parallel
        const [categoriesResponse, zodiacResponse] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/zodiac-signs')
        ]);

        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }

        if (!zodiacResponse.ok) {
          throw new Error('Failed to fetch zodiac signs');
        }

        const categoriesData = await categoriesResponse.json();
        const zodiacData = await zodiacResponse.json();

        setCategories(categoriesData);
        setZodiacSigns(zodiacData);

        // If in edit mode, load product data to pre-fill category and zodiac
        if (productId) {
          try {
            const productResponse = await fetch(`/api/products/${productId}`);
            if (productResponse.ok) {
              const product = await productResponse.json();
              console.log('✅ Product data loaded for category selection:', product);
              
              // Pre-fill category and zodiac if they exist
              if (product.category_id) {
                onCategoryChange(product.category_id);
              }
              if (product.zodiac_id) {
                onZodiacChange(product.zodiac_id.toString());
              }
            }
          } catch (error) {
            console.error('Error loading product data for category selection:', error);
          }
        }

        setDataLoaded(true);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId, dataLoaded]); // Add dataLoaded to dependencies

  if (loading) {
    return (
      <div className="space-y-6 w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 w-full">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 w-full">
          <div className="text-center py-8">
            <div className="text-red-600 dark:text-red-400 mb-2">Error loading data</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{error}</div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 w-full">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Select Category</h2>

        {/* Zodiac Sign Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zodiac Sign</label>
          <select
            className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-500 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
            value={zodiacSign ?? ''}
            onChange={e => onZodiacChange(e.target.value || null)}
          >
            <option value="">Select zodiac sign</option>
            {zodiacSigns.map(sign => (
              <option key={sign.id} value={sign.id}>{sign.name}</option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            className={`w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-gray-300 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-500 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 ${errors.categoryId ? 'border-red-400 dark:border-red-400' : ''}`}
            value={categoryId ?? ''}
            onChange={e => {
              const val = e.target.value ? parseInt(e.target.value) : null;
              onCategoryChange(val);
            }}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {errors.categoryId && (
            <div className="text-xs text-red-600 dark:text-red-400 mt-1">{errors.categoryId}</div>
          )}
        </div>

        {/* Next Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepCategorySelection;
