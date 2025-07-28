import React, { useState } from "react";

interface StepShippingDetailsProps {
  shipping: {
    weight: string;
    weightUnit: string;
    length: string;
    width: string;
    height: string;
    dimensionUnit: string;
    shippingClass: string;
  };
  onFieldChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  errors: { [key: string]: string };
}

const weightUnits = ["Kilograms (kg)", "Grams (g)", "Pounds (lb)"];
const dimensionUnits = ["Centimeters (cm)", "Inches (in)"];
const shippingClasses = ["Standard", "Express", "Free Shipping", "Heavy"];

const StepShippingDetails: React.FC<StepShippingDetailsProps> = ({
  shipping,
  onFieldChange,
  onBack,
  onNext,
  errors,
}) => {
  // Preview values
  const previewWeight = shipping.weight ? parseFloat(shipping.weight).toFixed(2) : "0.00";
  const previewLength = shipping.length ? parseFloat(shipping.length).toFixed(2) : "0.00";
  const previewWidth = shipping.width ? parseFloat(shipping.width).toFixed(2) : "0.00";
  const previewHeight = shipping.height ? parseFloat(shipping.height).toFixed(2) : "0.00";
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Shipping Details</h2>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6">
        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight</label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              step="0.01"
              className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
              placeholder="Enter product weight"
              value={shipping.weight}
              onChange={e => onFieldChange("weight", e.target.value)}
            />
            <select
              className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              value={shipping.weightUnit}
              onChange={e => onFieldChange("weightUnit", e.target.value)}
            >
              {weightUnits.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Dimensions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dimensions</label>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              min="0"
              step="0.01"
              className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
              placeholder="Length"
              value={shipping.length}
              onChange={e => onFieldChange("length", e.target.value)}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
              placeholder="Width"
              value={shipping.width}
              onChange={e => onFieldChange("width", e.target.value)}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
              placeholder="Height"
              value={shipping.height}
              onChange={e => onFieldChange("height", e.target.value)}
            />
          </div>
          <select
            className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            value={shipping.dimensionUnit}
            onChange={e => onFieldChange("dimensionUnit", e.target.value)}
          >
            {dimensionUnits.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>
        {/* Shipping Class */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Shipping Class</label>
          <select
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            value={shipping.shippingClass}
            onChange={e => onFieldChange("shippingClass", e.target.value)}
          >
            <option value="">Select a shipping class</option>
            {shippingClasses.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
        {/* Preview */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 mt-4">
          <div className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Shipping Calculator Preview</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Weight: {previewWeight} {shipping.weightUnit || 'kg'}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Dimensions: {previewLength} x {previewWidth} x {previewHeight} {shipping.dimensionUnit || 'cm'}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300">Shipping Class: {shipping.shippingClass || 'Not selected'}</div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
          onClick={onNext}
        >
          Update Shipping and Next
        </button>
      </div>
    </div>
  );
};

export default StepShippingDetails;
