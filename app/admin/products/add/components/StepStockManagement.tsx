import React from "react";

interface StepStockManagementProps {
  stock: {
    quantity: number;
    lowStockThreshold: number;
  };
  onFieldChange: (field: string, value: number) => void;
  onUpdate: () => void;
  onBack: () => void;
  errors?: { [key: string]: string };
}

const StepStockManagement: React.FC<StepStockManagementProps> = ({
  stock,
  onFieldChange,
  onUpdate,
  onBack,
  errors = {},
}) => {
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Stock Management</h2>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 w-full">
        <form
          className="flex flex-col gap-8"
          onSubmit={e => {
            e.preventDefault();
            onUpdate();
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Stock Quantity</label>
              <input
                type="number"
                min={0}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
                value={stock.quantity}
                onChange={e => onFieldChange("quantity", Number(e.target.value))}
              />
              {errors.quantity && (
                <div className="text-sm text-red-500 mt-1">{errors.quantity}</div>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Low Stock Threshold</label>
              <input
                type="number"
                min={0}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
                value={stock.lowStockThreshold}
                onChange={e => onFieldChange("lowStockThreshold", Number(e.target.value))}
              />
              {errors.lowStockThreshold && (
                <div className="text-sm text-red-500 mt-1">{errors.lowStockThreshold}</div>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="px-8 py-3 text-lg font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-3 text-lg font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
            >
              Update Stock &amp; Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepStockManagement;
