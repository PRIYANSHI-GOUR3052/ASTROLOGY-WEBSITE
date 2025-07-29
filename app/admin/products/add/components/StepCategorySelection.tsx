import React from 'react';

interface Category {
  id: number;
  name: string;
  subcategories?: { id: number; name: string }[];
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
}

// Category list (no subcategories)
const categories = [
  { id: 1, name: 'Gemstones & Crystals' },
  { id: 2, name: 'Rudraksha & Malas' },
  { id: 3, name: 'Spiritual Bracelets' },
  { id: 4, name: 'Sacred Yantras' },
  { id: 5, name: 'Astrology Reports' },
  { id: 6, name: 'Puja Essentials' },
  { id: 7, name: 'Feng Shui Items' },
  { id: 8, name: 'Meditation Tools' },
];

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const StepCategorySelection: React.FC<StepCategorySelectionProps> = ({
  zodiacSign = '',
  categoryId,
  onZodiacChange = () => {},
  onCategoryChange,
  onNext,
  errors,
  step = 1,
  totalSteps = 2,
}) => {


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
              <option key={sign} value={sign}>{sign}</option>
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
