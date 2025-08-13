import React, { useState, useEffect } from "react";
import { Package, AlertTriangle, TrendingUp, MapPin, Calendar, DollarSign, Hash, RefreshCw } from "lucide-react";

interface ProductStock {
  sku: string;
  quantity: number;
  reserved: number;
  min_stock: number;
  max_stock: number;
  location: string;
  batch_number: string;
  expiry_date: string;
  cost_price: number;
}

interface StepStockManagementProps {
  productId?: number;
  stock: ProductStock;
  onFieldChange: (field: string, value: any) => void;
  onBack: () => void;
  onNext: () => void;
  errors: { [key: string]: string };
  isSubmitting?: boolean;
}

const StepStockManagement: React.FC<StepStockManagementProps> = ({
  productId,
  stock,
  onFieldChange,
  onBack,
  onNext,
  errors,
  isSubmitting = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [existingStock, setExistingStock] = useState<any>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load existing stock data if productId is provided
  useEffect(() => {
    if (productId) {
      loadExistingStock();
    }
  }, [productId]);

  const loadExistingStock = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}/stock`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setExistingStock(data);
          // Pre-fill form with existing data
          Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'product_id' && key !== 'created_at' && key !== 'updated_at') {
              if (key === 'expiry_date' && data[key]) {
                onFieldChange(key, new Date(data[key]).toISOString().split('T')[0]);
              } else {
                onFieldChange(key, data[key] || '');
              }
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStock = async () => {
    try {
      setLoading(true);
      
      const stockData = {
        sku: stock.sku,
        quantity: parseInt(stock.quantity.toString()) || 0,
        reserved: parseInt(stock.reserved.toString()) || 0,
        min_stock: parseInt(stock.min_stock.toString()) || 0,
        max_stock: stock.max_stock ? parseInt(stock.max_stock.toString()) : null,
        location: stock.location || null,
        batch_number: stock.batch_number || null,
        expiry_date: stock.expiry_date || null,
        cost_price: stock.cost_price ? parseFloat(stock.cost_price.toString()) : null
      };

      const method = existingStock ? 'PUT' : 'POST';
      const response = await fetch(`/api/products/${productId}/stock`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockData)
      });

      if (response.ok) {
        const savedData = await response.json();
        setExistingStock(savedData);
        onNext();
      } else {
        const errorData = await response.json();
        console.error('Error saving stock data:', errorData);
      }
    } catch (error) {
      console.error('Error saving stock data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoGenerateSKU = () => {
    // This will be handled by the API when SKU is empty
    onFieldChange('sku', '');
  };

  const getAvailableStock = (): number => {
    const quantity = Number(stock.quantity) || 0;
    const reserved = Number(stock.reserved) || 0;
    return quantity - reserved;
  };

  const getStockStatus = (): 'low' | 'out' | 'good' => {
    const available = getAvailableStock();
    const minStock = Number(stock.min_stock) || 0;
    
    if (available <= 0) return 'out';
    if (available <= minStock) return 'low';
    return 'good';
  };

  const getStockStatusColor = (): string => {
    const status = getStockStatus();
    switch (status) {
      case 'out': return 'text-red-500';
      case 'low': return 'text-yellow-500';
      case 'good': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStockStatusText = (): string => {
    const status = getStockStatus();
    switch (status) {
      case 'out': return 'Out of Stock';
      case 'low': return 'Low Stock';
      case 'good': return 'In Stock';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading stock data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Package className="w-6 h-6 text-purple-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Stock Management</h2>
        </div>
        <button
          type="button"
          onClick={handleAutoGenerateSKU}
          className="flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Auto SKU
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Stock Info */}
        <div className="space-y-6">
          {/* Stock Overview */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Stock Overview</h3>
            </div>
            
            {/* SKU */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                SKU (Stock Keeping Unit)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className={`flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 ${errors.sku ? 'border-red-500' : ''}`}
                  placeholder="Auto-generated or custom SKU"
                  value={stock.sku}
                  onChange={e => onFieldChange('sku', e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Leave empty for auto-generation based on product name and category
              </p>
            </div>

            {/* Quantity and Reserved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Total Quantity
                  <span className="text-red-500 ml-1">*</span>
                </label>
              <input
                type="number"
                  min="0"
                  className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 ${errors.quantity ? 'border-red-500' : ''}`}
                value={stock.quantity}
                  onChange={e => onFieldChange('quantity', parseInt(e.target.value) || 0)}
                />
                {errors.quantity && <p className="text-xs text-red-500 mt-1">{errors.quantity}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Reserved Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                  value={stock.reserved}
                  onChange={e => onFieldChange('reserved', parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Items in pending orders
                </p>
              </div>
            </div>

            {/* Stock Thresholds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Minimum Stock Level
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                  value={stock.min_stock}
                  onChange={e => onFieldChange('min_stock', parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Alert when stock falls below this level
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Maximum Stock Level
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                  value={stock.max_stock}
                  onChange={e => onFieldChange('max_stock', parseInt(e.target.value) || 0)}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Optional maximum stock limit
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Hash className="w-5 h-5 text-gray-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Advanced Options</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400"
              >
                {showAdvanced ? 'Hide' : 'Show'} Advanced
              </button>
            </div>

            {showAdvanced && (
              <div className="space-y-4">
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Storage Location
                  </label>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                      placeholder="e.g., Warehouse A, Shelf B3"
                      value={stock.location}
                      onChange={e => onFieldChange('location', e.target.value)}
                    />
                  </div>
                </div>

                {/* Batch Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Batch Number
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                    placeholder="e.g., BATCH-2024-001"
                    value={stock.batch_number}
                    onChange={e => onFieldChange('batch_number', e.target.value)}
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiry Date
                  </label>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                      value={stock.expiry_date}
                      onChange={e => onFieldChange('expiry_date', e.target.value)}
                    />
                  </div>
            </div>

                {/* Cost Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cost Price
                  </label>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="number"
                      min="0"
                      step="0.01"
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                      placeholder="0.00"
                      value={stock.cost_price}
                      onChange={e => onFieldChange('cost_price', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Cost per unit for profit calculations
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Stock Status & Preview */}
        <div className="space-y-6">
          {/* Stock Status */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-gray-500 mr-2" />
              Stock Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Available Stock</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getAvailableStock()}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock Status</span>
                <span className={`text-sm font-semibold ${getStockStatusColor()}`}>
                  {getStockStatusText()}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Reserved</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Number(stock.reserved) || 0} items
                </span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Min Stock Level</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Number(stock.min_stock) || 0} items
                </span>
              </div>
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Stock Alerts</h3>
            
            <div className="space-y-3">
              {getStockStatus() === 'out' && (
                <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">Out of Stock</p>
                    <p className="text-xs text-red-600 dark:text-red-300">No available items for sale</p>
                  </div>
                </div>
              )}
              
              {getStockStatus() === 'low' && (
                <div className="flex items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Low Stock Alert</p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-300">Stock is below minimum level</p>
                  </div>
                </div>
              )}
              
              {getStockStatus() === 'good' && (
                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">Stock Level Good</p>
                    <p className="text-xs text-green-600 dark:text-green-300">Sufficient stock available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stock Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-3">Stock Management Tips</h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Set minimum stock levels to avoid stockouts</li>
              <li>• Use batch numbers for tracking product lots</li>
              <li>• Monitor reserved stock for pending orders</li>
              <li>• Set expiry dates for perishable items</li>
              <li>• Track cost prices for profit analysis</li>
              <li>• Use locations for warehouse organization</li>
            </ul>
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
          onClick={productId ? handleSaveStock : onNext}
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

export default StepStockManagement;
