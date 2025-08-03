
import React from "react";

type FormData = {
  name: string;
  description: string;
  sku: string;
  sellingPrice: string;
  discountedPrice: string;
};

type StepProductDetailsProps = {
  formData: FormData;
  categoryLabel: string;
  onFieldChange: (field: string, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
  errors: { [key: string]: string };
};


const StepProductDetails: React.FC<StepProductDetailsProps> = ({
  formData,
  categoryLabel,
  onFieldChange,
  onBack,
  onSubmit,
  errors,
}) => {
  // Step and progress bar values
  const step = 2;
  const totalSteps = 2;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">


      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Add New Product</h2>

      {/* Category Label */}
      <div className="mb-6">
        <div className="flex items-center">
          <span className="inline-flex items-center px-4 py-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium border border-green-200 dark:border-green-700">
            <svg className="w-4 h-4 mr-2 text-green-500 dark:text-green-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {categoryLabel}
          </span>
        </div>
      </div>

      <form onSubmit={e => { e.preventDefault(); onSubmit(); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-100 ${errors.name ? 'border-red-400 dark:border-red-400' : ''}`}
            value={formData.name}
            onChange={e => onFieldChange('name', e.target.value)}
            placeholder="e.g., Premium Cotton T-Shirt"
          />
          {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (for product card)</label>
          <textarea
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-100 ${errors.description ? 'border-red-400 dark:border-red-400' : ''}`}
            value={formData.description}
            onChange={e => onFieldChange('description', e.target.value)}
            placeholder="Briefly describe your product..."
            rows={3}
          />
          {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
          <input
            type="text"
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-100 ${errors.sku ? 'border-red-400 dark:border-red-400' : ''}`}
            value={formData.sku}
            onChange={e => onFieldChange('sku', e.target.value)}
            placeholder="Enter SKU"
          />
          {errors.sku && <p className="text-red-600 text-xs mt-1">{errors.sku}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
          <input
            type="number"
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-100 ${errors.sellingPrice ? 'border-red-400 dark:border-red-400' : ''}`}
            value={formData.sellingPrice}
            onChange={e => onFieldChange('sellingPrice', e.target.value)}
            placeholder="Enter selling price"
            min="0"
            step="0.01"
          />
          {errors.sellingPrice && <p className="text-red-600 text-xs mt-1">{errors.sellingPrice}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
          <input
            type="number"
            className={`w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-100 ${errors.discountedPrice ? 'border-red-400 dark:border-red-400' : ''}`}
            value={formData.discountedPrice}
            onChange={e => onFieldChange('discountedPrice', e.target.value)}
            placeholder="Enter discounted price"
            min="0"
            step="0.01"
          />
          {errors.discountedPrice && <p className="text-red-600 text-xs mt-1">{errors.discountedPrice}</p>}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600"
            onClick={onBack}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
          >
            Save &amp; Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepProductDetails;
