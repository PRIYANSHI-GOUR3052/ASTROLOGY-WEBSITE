
import React, { useState, useRef, useEffect } from "react";
import { Upload, X, Image as ImageIcon, Calculator, Sparkles } from "lucide-react";

type FormData = {
  name: string;
  description: string;
  sku: string;
  sellingPrice: string;
  discountPrice: string;
  originalPrice: string;
  images: string[];
  categoryId: number | null;
  zodiacSign: string | null;
  productType: string;
  weight?: string;
  carats?: string;
  quantity?: string;
  quality?: string;
  clarity?: string;
  color?: string;
  mukhi?: string;
  material?: string;
  perCaratPrice?: string;
  perGramPrice?: string;
  perPiecePrice?: string;
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

// Type definitions for price rules
type PriceRule = {
  label: string;
  basePrice: number;
  unit: string;
  field: string | null;
  hasQuality?: boolean;
  qualityMultipliers?: Record<string, number>;
  hasClarity?: boolean;
  clarityMultipliers?: Record<string, number>;
  hasColor?: boolean;
  colorMultipliers?: Record<string, number>;
  hasMukhi?: boolean;
  mukhiMultipliers?: Record<string, number>;
  hasMaterial?: boolean;
  materialMultipliers?: Record<string, number>;
};

// Price calculation rules
const PRICE_RULES: Record<string, PriceRule> = {
  'gemstone': {
    label: 'Gemstone (per carat)',
    basePrice: 5000, // ₹5000 per carat
    unit: 'carats',
    field: 'carats',
    hasQuality: true,
    qualityMultipliers: {
      'AAA': 3.0,    // Premium quality
      'AA': 2.0,     // High quality
      'A': 1.5,      // Good quality
      'B': 1.0,      // Standard quality
      'C': 0.7       // Basic quality
    },
    hasClarity: true,
    clarityMultipliers: {
      'VVS': 2.5,    // Very Very Slightly Included
      'VS': 2.0,     // Very Slightly Included
      'SI': 1.5,     // Slightly Included
      'I': 1.0       // Included
    },
    hasColor: true,
    colorMultipliers: {
      'Exceptional': 3.0,
      'Excellent': 2.5,
      'Very Good': 2.0,
      'Good': 1.5,
      'Fair': 1.0
    }
  },
  'rudraksh': {
    label: 'Rudraksh Mala',
    basePrice: 2500, // ₹2500 per mala
    unit: 'quantity',
    field: 'quantity',
    hasMukhi: true,
    mukhiMultipliers: {
      '1 Mukhi': 10.0,   // Rare and expensive
      '2 Mukhi': 8.0,
      '3 Mukhi': 6.0,
      '4 Mukhi': 4.0,
      '5 Mukhi': 3.0,
      '6 Mukhi': 2.5,
      '7 Mukhi': 2.0,
      '8 Mukhi': 1.8,
      '9 Mukhi': 1.5,
      '10 Mukhi': 1.3,
      '11 Mukhi': 1.2,
      '12 Mukhi': 1.1,
      '13 Mukhi': 1.0,
      '14 Mukhi': 1.0,
      '15 Mukhi': 1.0,
      '16 Mukhi': 1.0,
      '17 Mukhi': 1.0,
      '18 Mukhi': 1.0,
      '19 Mukhi': 1.0,
      '20 Mukhi': 1.0,
      '21 Mukhi': 1.0
    }
  },
  'crystal': {
    label: 'Crystal (per gram)',
    basePrice: 800, // ₹800 per gram
    unit: 'weight',
    field: 'weight',
    hasQuality: true,
    qualityMultipliers: {
      'Premium': 2.5,
      'High': 2.0,
      'Standard': 1.5,
      'Basic': 1.0
    }
  },
  'yantra': {
    label: 'Yantra',
    basePrice: 1500, // ₹1500 per piece
    unit: 'quantity',
    field: 'quantity',
    hasMaterial: true,
    materialMultipliers: {
      'Gold': 5.0,
      'Silver': 3.0,
      'Copper': 2.0,
      'Brass': 1.5,
      'Paper': 1.0
    }
  },
  'bracelet': {
    label: 'Bracelet',
    basePrice: 1200, // ₹1200 per piece
    unit: 'quantity',
    field: 'quantity',
    hasMaterial: true,
    materialMultipliers: {
      'Gold': 4.0,
      'Silver': 2.5,
      'Copper': 1.8,
      'Brass': 1.3,
      'Thread': 1.0
    }
  },
  'custom': {
    label: 'Custom Price',
    basePrice: 0,
    unit: 'manual',
    field: null
  }
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
  const [showAutoPrice, setShowAutoPrice] = useState(false);
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

  // Calculate auto price based on product type
  const calculateAutoPrice = () => {
    const productType = formData.productType;
    if (!productType || productType === 'custom') return 0;

    const rule = PRICE_RULES[productType as keyof typeof PRICE_RULES];
    if (!rule) return 0;

    const fieldValue = parseFloat(formData[rule.field as keyof FormData] as string) || 0;
    
    // Use custom price if available, otherwise use base price
    let unitPrice = rule.basePrice;
    
    if (productType === 'gemstone' && formData.perCaratPrice) {
      unitPrice = parseFloat(formData.perCaratPrice) || rule.basePrice;
    } else if (productType === 'crystal' && formData.perGramPrice) {
      unitPrice = parseFloat(formData.perGramPrice) || rule.basePrice;
    } else if ((productType === 'yantra' || productType === 'bracelet' || productType === 'rudraksh') && formData.perPiecePrice) {
      unitPrice = parseFloat(formData.perPiecePrice) || rule.basePrice;
    }
    
    let basePrice = unitPrice * fieldValue;

    // Apply quality multiplier for gemstones and crystals
    if (rule.hasQuality && formData.quality && rule.qualityMultipliers) {
      const qualityMultiplier = rule.qualityMultipliers[formData.quality] || 1;
      basePrice *= qualityMultiplier;
    }

    // Apply clarity multiplier for gemstones
    if (rule.hasClarity && formData.clarity && rule.clarityMultipliers) {
      const clarityMultiplier = rule.clarityMultipliers[formData.clarity] || 1;
      basePrice *= clarityMultiplier;
    }

    // Apply color multiplier for gemstones
    if (rule.hasColor && formData.color && rule.colorMultipliers) {
      const colorMultiplier = rule.colorMultipliers[formData.color] || 1;
      basePrice *= colorMultiplier;
    }

    // Apply mukhi multiplier for rudraksh
    if (rule.hasMukhi && formData.mukhi && rule.mukhiMultipliers) {
      const mukhiMultiplier = rule.mukhiMultipliers[formData.mukhi] || 1;
      basePrice *= mukhiMultiplier;
    }

    // Apply material multiplier for yantras and bracelets
    if (rule.hasMaterial && formData.material && rule.materialMultipliers) {
      const materialMultiplier = rule.materialMultipliers[formData.material] || 1;
      basePrice *= materialMultiplier;
    }

    return Math.round(basePrice);
  };

  // Apply auto price
  const applyAutoPrice = () => {
    const calculatedPrice = calculateAutoPrice();
    if (calculatedPrice > 0) {
      onFieldChange('sellingPrice', calculatedPrice.toString());
      // Set original price same as selling price initially
      onFieldChange('originalPrice', calculatedPrice.toString());
      onFieldChange('discountPrice', '0');
    }
  };

  // Calculate discount percentage
  const calculateDiscountPercentage = () => {
    const original = parseFloat(formData.originalPrice) || 0;
    const selling = parseFloat(formData.sellingPrice) || 0;
    if (original === 0) return 0;
    return Math.round(((original - selling) / original) * 100);
  };

  // Calculate discount price from percentage
  const calculateDiscountPrice = () => {
    const original = parseFloat(formData.originalPrice) || 0;
    const discountPercent = parseFloat(formData.discountPrice) || 0;
    const discountAmount = (original * discountPercent) / 100;
    const finalPrice = original - discountAmount;
    onFieldChange('sellingPrice', finalPrice.toFixed(2));
  };

  // Handle product name change and auto-generate SKU
  const handleNameChange = (value: string) => {
    onFieldChange('name', value);
    const autoSKU = generateSKU(value, categoryLabel);
    onFieldChange('sku', autoSKU);
  };

  // Handle original price change
  const handleOriginalPriceChange = (value: string) => {
    onFieldChange('originalPrice', value);
    // If discount percentage is set, recalculate selling price
    if (formData.discountPrice && parseFloat(formData.discountPrice) > 0) {
      const original = parseFloat(value) || 0;
      const discountPercent = parseFloat(formData.discountPrice) || 0;
      const finalPrice = original - (original * discountPercent / 100);
      onFieldChange('sellingPrice', finalPrice.toFixed(2));
    } else {
      // If no discount, set selling price same as original
      onFieldChange('sellingPrice', value);
    }
  };

  // Handle discount percentage change
  const handleDiscountChange = (value: string) => {
    onFieldChange('discountPrice', value);
    if (value && parseFloat(value) > 0) {
      calculateDiscountPrice();
    }
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

    // Add new images to existing ones (limit to 5 images)
    const currentImages = formData.images || [];
    const totalImages = [...currentImages, ...newImages];
    const limitedImages = totalImages.slice(0, 5); // Limit to 5 images
    onFieldChange('images', limitedImages);
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

  const discountPercentage = calculateDiscountPercentage();
  const selectedRule = formData.productType ? PRICE_RULES[formData.productType as keyof typeof PRICE_RULES] : null;

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

        {/* Auto Price Section */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Auto Price Calculator
            </h3>
            <button
              type="button"
              onClick={() => setShowAutoPrice(!showAutoPrice)}
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              {showAutoPrice ? 'Hide' : 'Show'} Calculator
            </button>
          </div>

          {showAutoPrice && (
            <div className="space-y-4">
              {/* Product Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Type
                </label>
                <select
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors"
                  value={formData.productType || ''}
                  onChange={e => onFieldChange('productType', e.target.value)}
                >
                  <option value="">Select product type</option>
                  {Object.entries(PRICE_RULES).map(([key, rule]) => (
                    <option key={key} value={key}>{rule.label}</option>
                  ))}
                </select>
              </div>

                                            {/* Custom Price Input */}
               {selectedRule && selectedRule.field && (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {/* Quantity/Weight/Carats Input */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                       {selectedRule.unit.charAt(0).toUpperCase() + selectedRule.unit.slice(1)} *
                     </label>
                     <input
                       type="number"
                       className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors"
                       value={formData[selectedRule.field as keyof FormData] as string || ''}
                       onChange={e => onFieldChange(selectedRule.field!, e.target.value)}
                       placeholder={`Enter ${selectedRule.unit}`}
                       min="0"
                       step="0.01"
                     />
                   </div>

                   {/* Custom Price per Unit */}
                   <div>
                     <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                       Price per {selectedRule.unit} (₹)
                     </label>
                     <input
                       type="number"
                       className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors"
                       value={
                         selectedRule.unit === 'carats' ? formData.perCaratPrice || '' :
                         selectedRule.unit === 'weight' ? formData.perGramPrice || '' :
                         formData.perPiecePrice || ''
                       }
                       onChange={e => {
                         if (selectedRule.unit === 'carats') {
                           onFieldChange('perCaratPrice', e.target.value);
                         } else if (selectedRule.unit === 'weight') {
                           onFieldChange('perGramPrice', e.target.value);
                         } else {
                           onFieldChange('perPiecePrice', e.target.value);
                         }
                       }}
                       placeholder={`₹${selectedRule.basePrice.toLocaleString()}`}
                       min="0"
                       step="0.01"
                     />
                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                       Default: ₹{selectedRule.basePrice.toLocaleString()} per {selectedRule.unit}
                     </p>
                   </div>
                 </div>
               )}

               {/* Quality Selection for Gemstones and Crystals */}
               {selectedRule && selectedRule.hasQuality && selectedRule.qualityMultipliers && (
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                     Quality Grade
                   </label>
                   <select
                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors"
                     value={formData.quality || ''}
                     onChange={e => onFieldChange('quality', e.target.value)}
                   >
                     <option value="">Select quality grade</option>
                     {Object.entries(selectedRule.qualityMultipliers).map(([grade, multiplier]) => (
                       <option key={grade} value={grade}>
                         {grade} (×{multiplier})
                       </option>
                     ))}
                   </select>
                 </div>
               )}

               {/* Clarity Selection for Gemstones */}
               {selectedRule && selectedRule.hasClarity && selectedRule.clarityMultipliers && (
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                     Clarity Grade
                   </label>
                   <select
                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors"
                     value={formData.clarity || ''}
                     onChange={e => onFieldChange('clarity', e.target.value)}
                   >
                     <option value="">Select clarity grade</option>
                     {Object.entries(selectedRule.clarityMultipliers).map(([clarity, multiplier]) => (
                       <option key={clarity} value={clarity}>
                         {clarity} (×{multiplier})
                       </option>
                     ))}
                   </select>
                 </div>
               )}

               {/* Color Selection for Gemstones */}
               {selectedRule && selectedRule.hasColor && selectedRule.colorMultipliers && (
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                     Color Grade
                   </label>
                   <select
                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors"
                     value={formData.color || ''}
                     onChange={e => onFieldChange('color', e.target.value)}
                   >
                     <option value="">Select color grade</option>
                     {Object.entries(selectedRule.colorMultipliers).map(([color, multiplier]) => (
                       <option key={color} value={color}>
                         {color} (×{multiplier})
                       </option>
                     ))}
                   </select>
                 </div>
               )}

               {/* Mukhi Selection for Rudraksh */}
               {selectedRule && selectedRule.hasMukhi && selectedRule.mukhiMultipliers && (
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                     Mukhi Count
                   </label>
                   <select
                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors"
                     value={formData.mukhi || ''}
                     onChange={e => onFieldChange('mukhi', e.target.value)}
                   >
                     <option value="">Select mukhi count</option>
                     {Object.entries(selectedRule.mukhiMultipliers).map(([mukhi, multiplier]) => (
                       <option key={mukhi} value={mukhi}>
                         {mukhi} (×{multiplier})
                       </option>
                     ))}
                   </select>
                 </div>
               )}

               {/* Material Selection for Yantras and Bracelets */}
               {selectedRule && selectedRule.hasMaterial && selectedRule.materialMultipliers && (
                 <div>
                   <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                     Material
                   </label>
                   <select
                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors"
                     value={formData.material || ''}
                     onChange={e => onFieldChange('material', e.target.value)}
                   >
                     <option value="">Select material</option>
                     {Object.entries(selectedRule.materialMultipliers).map(([material, multiplier]) => (
                       <option key={material} value={material}>
                         {material} (×{multiplier})
                       </option>
                     ))}
                   </select>
                 </div>
               )}

                             {/* Real-time Price Calculation Display */}
               {selectedRule && selectedRule.field && (
                 <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                   <div className="flex items-center justify-between mb-2">
                     <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Live Calculation:</span>
                     <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                       ₹{calculateAutoPrice().toLocaleString()}
                     </span>
                   </div>
                   
                   {/* Calculation Breakdown */}
                   <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                     {(() => {
                       const fieldValue = parseFloat(formData[selectedRule.field as keyof FormData] as string) || 0;
                       let unitPrice = selectedRule.basePrice;
                       
                       if (selectedRule.unit === 'carats' && formData.perCaratPrice) {
                         unitPrice = parseFloat(formData.perCaratPrice) || selectedRule.basePrice;
                       } else if (selectedRule.unit === 'weight' && formData.perGramPrice) {
                         unitPrice = parseFloat(formData.perGramPrice) || selectedRule.basePrice;
                       } else if (selectedRule.unit === 'quantity' && formData.perPiecePrice) {
                         unitPrice = parseFloat(formData.perPiecePrice) || selectedRule.basePrice;
                       }
                       
                       const baseCalculation = fieldValue * unitPrice;
                       
                       return (
                         <>
                           <div>{fieldValue} {selectedRule.unit} × ₹{unitPrice.toLocaleString()} = ₹{baseCalculation.toLocaleString()}</div>
                           {formData.quality && selectedRule.qualityMultipliers && (
                             <div>Quality ({formData.quality}): ×{selectedRule.qualityMultipliers[formData.quality]}</div>
                           )}
                           {formData.clarity && selectedRule.clarityMultipliers && (
                             <div>Clarity ({formData.clarity}): ×{selectedRule.clarityMultipliers[formData.clarity]}</div>
                           )}
                           {formData.color && selectedRule.colorMultipliers && (
                             <div>Color ({formData.color}): ×{selectedRule.colorMultipliers[formData.color]}</div>
                           )}
                           {formData.mukhi && selectedRule.mukhiMultipliers && (
                             <div>Mukhi ({formData.mukhi}): ×{selectedRule.mukhiMultipliers[formData.mukhi]}</div>
                           )}
                           {formData.material && selectedRule.materialMultipliers && (
                             <div>Material ({formData.material}): ×{selectedRule.materialMultipliers[formData.material]}</div>
                           )}
                         </>
                       );
                     })()}
                   </div>
                 </div>
               )}

               {/* Calculate Button */}
               {selectedRule && selectedRule.field && (
                 <button
                   type="button"
                   onClick={applyAutoPrice}
                   className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                 >
                   <Calculator className="w-4 h-4 mr-2" />
                   Apply Calculated Price
                 </button>
               )}
            </div>
          )}
        </div>

        {/* Pricing Section */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Pricing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Original Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Original Price (₹) *
              </label>
              <input
                type="number"
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors ${errors.originalPrice ? 'border-red-500 dark:border-red-400' : ''}`}
                value={formData.originalPrice}
                onChange={e => handleOriginalPriceChange(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {errors.originalPrice && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.originalPrice}</p>}
            </div>

            {/* Discount Percentage */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Discount (%) 
              </label>
              <input
                type="number"
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 transition-colors ${errors.discountPrice ? 'border-red-500 dark:border-red-400' : ''}`}
                value={formData.discountPrice}
                onChange={e => handleDiscountChange(e.target.value)}
                placeholder="0"
                min="0"
                max="100"
                step="0.01"
              />
              {errors.discountPrice && <p className="text-red-600 dark:text-red-400 text-xs mt-1">{errors.discountPrice}</p>}
            </div>

            {/* Final Selling Price */}
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
          </div>

          {/* Price Summary */}
          {formData.originalPrice && formData.sellingPrice && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Original Price:</span>
                <span className="text-gray-800 dark:text-gray-200 font-medium">₹{parseFloat(formData.originalPrice).toLocaleString()}</span>
              </div>
              {discountPercentage > 0 && (
                <>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-400">Discount:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">-{discountPercentage}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600 dark:text-gray-400">You Save:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      ₹{((parseFloat(formData.originalPrice) - parseFloat(formData.sellingPrice)) || 0).toLocaleString()}
                    </span>
                  </div>
                </>
              )}
              <div className="flex items-center justify-between text-lg font-semibold mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <span className="text-gray-800 dark:text-gray-200">Final Price:</span>
                <span className="text-purple-600 dark:text-purple-400">₹{parseFloat(formData.sellingPrice).toLocaleString()}</span>
              </div>
            </div>
          )}
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
