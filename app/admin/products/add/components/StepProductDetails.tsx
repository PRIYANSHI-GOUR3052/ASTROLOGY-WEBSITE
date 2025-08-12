
import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

type FormData = {
  name: string;
  description: string;
  sku: string;
  sellingPrice: string;
  images: string[];
  categoryId: number | null;
  zodiacSign: string | null;
};

type StepProductDetailsProps = {
  formData: FormData;
  categoryLabel: string;
  categoryId: number | null;
  zodiacSign: string | null;
  onFieldChange: (field: string, value: any) => void;
  onBack: () => void;
  onSubmit: () => void;
  errors: { [key: string]: string };
  isSubmitting?: boolean;
};

const StepProductDetails: React.FC<StepProductDetailsProps> = ({
  formData,
  categoryLabel,
  categoryId,
  zodiacSign,
  onFieldChange,
  onBack,
  onSubmit,
  errors,
  isSubmitting = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: number]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate SKU based on product name and category
  const generateSKU = (name: string, categoryLabel: string) => {
    if (!name.trim() || !categoryLabel) return '';
    
    const categoryPrefix = categoryLabel.split(' ')[0].toUpperCase().substring(0, 3);
    const productCode = name
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .substring(0, 6);
    const timestamp = Date.now().toString().slice(-4);
    
    return `${categoryPrefix}-${productCode}-${timestamp}`;
  };

  // Handle product name change and auto-generate SKU
  const handleNameChange = (value: string) => {
    onFieldChange('name', value);
    const autoSKU = generateSKU(value, categoryLabel);
    onFieldChange('sku', autoSKU);
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (files: FileList) => {
    setUploading(true);
    const newImages: string[] = [];
    const fileArray = Array.from(files);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      setUploadProgress(prev => ({ ...prev, [i]: 0 }));

      try {
        // Convert file to base64 for Cloudinary upload
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        // Upload to Cloudinary using the existing utility
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64,
            folder: 'products'
          }),
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();
        newImages.push(data.url);
        setUploadProgress(prev => ({ ...prev, [i]: 100 }));

      } catch (error) {
        console.error('Image upload error:', error);
        setUploadProgress(prev => ({ ...prev, [i]: -1 })); // Error state
      }
    }

    // Add new images to existing ones
    const currentImages = formData.images || [];
    onFieldChange('images', [...currentImages, ...newImages]);
    setUploading(false);
    setUploadProgress({});
  };

  // Remove image
  const removeImage = (index: number) => {
    const currentImages = formData.images || [];
    const updatedImages = currentImages.filter((_, i) => i !== index);
    onFieldChange('images', updatedImages);
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files);
    }
  };

  // Trigger file input
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Product Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Add basic product information and images
        </p>
      </div>

      {/* Category & Zodiac Info */}
      <div className="mb-6 flex flex-wrap gap-2">
        {categoryLabel && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium">
            📂 {categoryLabel}
          </span>
        )}
        {zodiacSign && (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium">
            ⭐ {zodiacSign}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors ${errors.name ? 'border-red-500 dark:border-red-400' : ''}`}
            value={formData.name}
            onChange={e => handleNameChange(e.target.value)}
            placeholder="e.g., Premium Amethyst Crystal Bracelet"
          />
          {errors.name && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Auto-generated SKU */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SKU (Auto-generated) *
          </label>
          <input
            type="text"
            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 transition-colors ${errors.sku ? 'border-red-500 dark:border-red-400' : ''}`}
            value={formData.sku}
            onChange={e => onFieldChange('sku', e.target.value)}
            placeholder="SKU will be auto-generated"
            readOnly={!formData.sku}
          />
          {formData.sku && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Auto-generated based on product name and category
            </p>
          )}
          {errors.sku && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.sku}</p>}
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Description *
          </label>
          <textarea
            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors resize-none ${errors.description ? 'border-red-500 dark:border-red-400' : ''}`}
            value={formData.description}
            onChange={e => onFieldChange('description', e.target.value)}
            placeholder="Describe your product in detail..."
            rows={4}
          />
          {errors.description && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Selling Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selling Price (₹) *
          </label>
          <input
            type="number"
            className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors ${errors.sellingPrice ? 'border-red-500 dark:border-red-400' : ''}`}
            value={formData.sellingPrice}
            onChange={e => onFieldChange('sellingPrice', e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
          {errors.sellingPrice && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.sellingPrice}</p>}
        </div>

        {/* Product Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Product Images *
          </label>
          
          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-purple-400 dark:hover:border-purple-400 transition-colors">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {uploading ? (
              <div className="space-y-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Uploading images...</p>
                {/* Upload Progress */}
                {Object.entries(uploadProgress).map(([index, progress]) => (
                  <div key={index} className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progress === -1 ? 'bg-red-500' : 'bg-purple-600'
                      }`}
                      style={{ width: `${Math.abs(progress)}%` }}
                    ></div>
                  </div>
                ))}
              </div>
            ) : (
              <div onClick={handleUploadClick} className="cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Click to upload images
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload 4-5 high-quality product images (JPG, PNG, WebP)
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  First image will be the main product image
                </p>
              </div>
            )}
          </div>

          {/* Image Preview Grid */}
          {formData.images && formData.images.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Remove button */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    {/* Primary image indicator */}
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {formData.images && formData.images.length < 5 && (
                <button
                  onClick={handleUploadClick}
                  className="mt-4 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center"
                >
                  <ImageIcon className="w-4 h-4 mr-1" />
                  Add more images ({formData.images?.length || 0}/5)
                </button>
              )}
            </div>
          )}

          {errors.images && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.images}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700 mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600 transition-colors"
        >
          ← Back
        </button>
        
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting || uploading}
          className="px-8 py-3 text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            'Save & Continue'
          )}
        </button>
      </div>
    </div>
  );
};

export default StepProductDetails;
