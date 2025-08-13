import React, { useState, useEffect } from "react";
import { Package, Truck, DollarSign, Globe, Info } from "lucide-react";

interface ShippingDetails {
  weight: string;
  weight_unit: string;
  length: string;
  width: string;
  height: string;
  dimension_unit: string;
  shipping_class: string;
  is_free_shipping: boolean;
  shipping_cost: string;
  max_shipping_cost: string;
}

interface StepShippingDetailsProps {
  productId?: number;
  shipping: ShippingDetails;
  onFieldChange: (field: string, value: any) => void;
  onBack: () => void;
  onNext: () => void;
  errors: { [key: string]: string };
  isSubmitting?: boolean;
}

const weightUnits = [
  { value: "kg", label: "Kilograms (kg)" },
  { value: "g", label: "Grams (g)" },
  { value: "lb", label: "Pounds (lb)" }
];

const dimensionUnits = [
  { value: "cm", label: "Centimeters (cm)" },
  { value: "in", label: "Inches (in)" }
];

const shippingClasses = [
  { value: "standard", label: "Standard Shipping", description: "3-5 business days" },
  { value: "express", label: "Express Shipping", description: "1-2 business days" },
  { value: "free", label: "Free Shipping", description: "No additional cost" },
  { value: "heavy", label: "Heavy Items", description: "Special handling required" },
  { value: "fragile", label: "Fragile Items", description: "Extra care packaging" }
];

const StepShippingDetails: React.FC<StepShippingDetailsProps> = ({
  productId,
  shipping,
  onFieldChange,
  onBack,
  onNext,
  errors,
  isSubmitting = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [existingShipping, setExistingShipping] = useState<any>(null);

  // Load existing shipping details if productId is provided
  useEffect(() => {
    if (productId) {
      loadExistingShipping();
    }
  }, [productId]);

  const loadExistingShipping = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}/shipping`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setExistingShipping(data);
          // Pre-fill form with existing data
          Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'product_id' && key !== 'created_at' && key !== 'updated_at') {
              onFieldChange(key, data[key]);
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading shipping details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveShipping = async () => {
    try {
      setLoading(true);
      
      const shippingData = {
        weight: shipping.weight ? parseFloat(shipping.weight) : null,
        weight_unit: shipping.weight_unit,
        length: shipping.length ? parseFloat(shipping.length) : null,
        width: shipping.width ? parseFloat(shipping.width) : null,
        height: shipping.height ? parseFloat(shipping.height) : null,
        dimension_unit: shipping.dimension_unit,
        shipping_class: shipping.shipping_class || null,
        is_free_shipping: shipping.is_free_shipping,
        shipping_cost: shipping.shipping_cost ? parseFloat(shipping.shipping_cost) : null,
        max_shipping_cost: shipping.max_shipping_cost ? parseFloat(shipping.max_shipping_cost) : null,
        shipping_zones: null // Can be extended later
      };

      const method = existingShipping ? 'PUT' : 'POST';
      const response = await fetch(`/api/products/${productId}/shipping`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shippingData)
      });

      if (response.ok) {
        const savedData = await response.json();
        setExistingShipping(savedData);
        onNext();
      } else {
        const errorData = await response.json();
        console.error('Error saving shipping details:', errorData);
      }
    } catch (error) {
      console.error('Error saving shipping details:', error);
    } finally {
      setLoading(false);
    }
  };

  const convertWeight = (value: string, fromUnit: string, toUnit: string): number => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;

    // Convert to kg first
    let kgValue = numValue;
    if (fromUnit === 'g') kgValue = numValue / 1000;
    if (fromUnit === 'lb') kgValue = numValue * 0.453592;

    // Convert from kg to target unit
    if (toUnit === 'g') return kgValue * 1000;
    if (toUnit === 'lb') return kgValue / 0.453592;
    return kgValue; // kg
  };

  const convertDimension = (value: string, fromUnit: string, toUnit: string): number => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return 0;

    if (fromUnit === 'in' && toUnit === 'cm') return numValue * 2.54;
    if (fromUnit === 'cm' && toUnit === 'in') return numValue / 2.54;
    return numValue;
  };

  const handleUnitChange = (field: string, newUnit: string) => {
    const oldUnit = shipping[field as keyof ShippingDetails] as string;
    
    if (field === 'weight_unit' && shipping.weight) {
      const convertedWeight = convertWeight(shipping.weight, oldUnit, newUnit);
      onFieldChange('weight', convertedWeight.toFixed(3));
    } else if (field === 'dimension_unit') {
      if (shipping.length) {
        const convertedLength = convertDimension(shipping.length, oldUnit, newUnit);
        onFieldChange('length', convertedLength.toFixed(2));
      }
      if (shipping.width) {
        const convertedWidth = convertDimension(shipping.width, oldUnit, newUnit);
        onFieldChange('width', convertedWidth.toFixed(2));
      }
      if (shipping.height) {
        const convertedHeight = convertDimension(shipping.height, oldUnit, newUnit);
        onFieldChange('height', convertedHeight.toFixed(2));
      }
    }
    
    onFieldChange(field, newUnit);
  };

  // Preview values
  const previewWeight = shipping.weight ? parseFloat(shipping.weight).toFixed(3) : "0.000";
  const previewLength = shipping.length ? parseFloat(shipping.length).toFixed(2) : "0.00";
  const previewWidth = shipping.width ? parseFloat(shipping.width).toFixed(2) : "0.00";
  const previewHeight = shipping.height ? parseFloat(shipping.height).toFixed(2) : "0.00";

  const selectedShippingClass = shippingClasses.find(cls => cls.value === shipping.shipping_class);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading shipping details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">
      <div className="flex items-center mb-6">
        <Package className="w-6 h-6 text-purple-600 mr-3" />
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Shipping Details</h2>
      </div>

      <div className="space-y-6">
        {/* Weight Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Package className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Weight</h3>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              step="0.001"
              className={`flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 ${errors.weight ? 'border-red-500' : ''}`}
              placeholder="Enter product weight"
              value={shipping.weight}
              onChange={e => onFieldChange("weight", e.target.value)}
            />
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-600"
              value={shipping.weight_unit}
              onChange={e => handleUnitChange("weight_unit", e.target.value)}
            >
              {weightUnits.map(unit => (
                <option key={unit.value} value={unit.value}>{unit.label}</option>
              ))}
            </select>
          </div>
          {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
        </div>

        {/* Dimensions Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Truck className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dimensions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Length</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 ${errors.length ? 'border-red-500' : ''}`}
                placeholder="Length"
                value={shipping.length}
                onChange={e => onFieldChange("length", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 ${errors.width ? 'border-red-500' : ''}`}
                placeholder="Width"
                value={shipping.width}
                onChange={e => onFieldChange("width", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 ${errors.height ? 'border-red-500' : ''}`}
                placeholder="Height"
                value={shipping.height}
                onChange={e => onFieldChange("height", e.target.value)}
              />
            </div>
          </div>
          <select
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-600"
            value={shipping.dimension_unit}
            onChange={e => handleUnitChange("dimension_unit", e.target.value)}
          >
            {dimensionUnits.map(unit => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>

        {/* Shipping Class Section */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Globe className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shipping Class</h3>
          </div>
          <select
            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-purple-600 ${errors.shipping_class ? 'border-red-500' : ''}`}
            value={shipping.shipping_class}
            onChange={e => onFieldChange("shipping_class", e.target.value)}
          >
            <option value="">Select a shipping class</option>
            {shippingClasses.map(cls => (
              <option key={cls.value} value={cls.value}>
                {cls.label} - {cls.description}
              </option>
            ))}
          </select>
          {selectedShippingClass && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {selectedShippingClass.description}
            </p>
          )}
        </div>

        {/* Free Shipping Option */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Free Shipping</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Offer free shipping for this product</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={shipping.is_free_shipping}
                onChange={e => onFieldChange("is_free_shipping", e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>

        {/* Shipping Cost Section */}
        {!shipping.is_free_shipping && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shipping Cost</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fixed Shipping Cost</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                  placeholder="0.00"
                  value={shipping.shipping_cost}
                  onChange={e => onFieldChange("shipping_cost", e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Leave empty for variable rates</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Shipping Cost</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                  placeholder="0.00"
                  value={shipping.max_shipping_cost}
                  onChange={e => onFieldChange("max_shipping_cost", e.target.value)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Maximum cost for variable rates</p>
              </div>
            </div>
          </div>
        )}

        {/* Preview Section */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Info className="w-5 h-5 text-gray-500 mr-2" />
            <h3 className="font-semibold text-gray-700 dark:text-gray-200">Shipping Calculator Preview</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Weight:</span> {previewWeight} {shipping.weight_unit || 'kg'}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Dimensions:</span> {previewLength} × {previewWidth} × {previewHeight} {shipping.dimension_unit || 'cm'}
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Shipping Class:</span> {selectedShippingClass?.label || 'Not selected'}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Shipping Cost:</span> {
                  shipping.is_free_shipping 
                    ? 'Free' 
                    : shipping.shipping_cost 
                      ? `$${parseFloat(shipping.shipping_cost).toFixed(2)}` 
                      : 'Variable'
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          className="px-6 py-3 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition-colors"
          onClick={onBack}
          disabled={isSubmitting || loading}
        >
          ← Back
        </button>
        <button
          type="button"
          className="px-8 py-3 text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={productId ? handleSaveShipping : onNext}
          disabled={isSubmitting || loading}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </div>
          ) : (
            productId ? 'Save & Continue' : 'Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default StepShippingDetails;
