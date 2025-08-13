"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StepCategorySelection from "./components/StepCategorySelection";
import StepProductDetails from "./components/StepProductDetails";
import StepAttributeMedia from "./components/StepAttribute&Media";
import StepShippingDetails from "./components/StepShippingDetails";
import StepDetailedSEO from "./components/StepDetailedSEO";
import StepStockManagement from "./components/StepStockManagement";
type SEOData = {
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  twitter_title: string;
  twitter_description: string;
  twitter_image: string;
  canonical_url: string;
};

const initialSEO: SEOData = {
  meta_title: '',
  meta_description: '',
  meta_keywords: '',
  og_title: '',
  og_description: '',
  og_image: '',
  twitter_title: '',
  twitter_description: '',
  twitter_image: '',
  canonical_url: '',
};

type StockData = {
  sku: string;
  quantity: number;
  reserved: number;
  min_stock: number;
  max_stock: number;
  location: string;
  batch_number: string;
  expiry_date: string;
  cost_price: number;
};

const initialStock: StockData = {
  sku: '',
  quantity: 0,
  reserved: 0,
  min_stock: 0,
  max_stock: 0,
  location: '',
  batch_number: '',
  expiry_date: '',
  cost_price: 0,
};
type ShippingData = {
  weight: string;
  weight_unit: string;
  length: string;
  width: string;
  height: string;
  dimension_unit: string;
  shipping_class: string;
  is_free_shipping: boolean;
  shipping_cost: string;
  handling_time: string;
  max_shipping_cost: string;
};

const initialShipping: ShippingData = {
  weight: '',
  weight_unit: 'kg',
  length: '',
  width: '',
  height: '',
  dimension_unit: 'cm',
  shipping_class: '',
  is_free_shipping: false,
  shipping_cost: '',
  handling_time: '',
  max_shipping_cost: '',
};

type ProductFormData = {
  zodiacSign: string | null;
  categoryId: number | null;
  name: string;
  description: string;
  sku: string;
  sellingPrice: string;
  discountedPrice: string;
  color: string;
  images: string[];
};

type Errors = Partial<Record<keyof ProductFormData, string>>;

const initialFormData: ProductFormData = {
  zodiacSign: null,
  categoryId: null,
  name: "",
  description: "",
  sku: "",
  sellingPrice: "",
  discountedPrice: "",
  color: '',
  images: [],
};

const steps = [
  "Category",
  "Product Details",
  "Attributes & Media",
  "Shipping",
  "SEO",
  "Stock"
];

export default function AddProductPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [media, setMedia] = useState<File[]>([]);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [shipping, setShipping] = useState<ShippingData>(initialShipping);
  const [seo, setSEO] = useState<SEOData>(initialSEO);
  const [errors, setErrors] = useState<Errors>({});
  const [stock, setStock] = useState<StockData>(initialStock);
  const [createdProductId, setCreatedProductId] = useState<number | undefined>(undefined);
  
  const handleStockFieldChange = (field: string, value: any) => {
    setStock(prev => ({ ...prev, [field]: value }));
  };

  const handleStockUpdate = async () => {
    if (!createdProductId) {
      console.error('No product ID available for stock update');
      return;
    }

    try {
      setLoading(true);
      
      const stockData = {
        sku: stock.sku,
        quantity: Number(stock.quantity) || 0,
        reserved: Number(stock.reserved) || 0,
        min_stock: Number(stock.min_stock) || 0,
        max_stock: stock.max_stock ? Number(stock.max_stock) : null,
        location: stock.location || null,
        batch_number: stock.batch_number || null,
        expiry_date: stock.expiry_date || null,
        cost_price: stock.cost_price ? Number(stock.cost_price) : null
      };

      const response = await fetch(`/api/products/${createdProductId}/stock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stockData)
      });

      if (response.ok) {
        const savedData = await response.json();
        console.log('Stock saved successfully:', savedData);
        router.push("/admin/products");
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
  const [loading, setLoading] = useState<boolean>(false);
  const handleSEOFieldChange = (field: string, value: string) => {
    setSEO(prev => ({ ...prev, [field]: value }));
  };

  const handleSEONext = () => {
    // Final submit or next step logic here
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/products/create");
    }, 1200);
  };
  const handleShippingFieldChange = (field: string, value: string) => {
    setShipping(prev => ({ ...prev, [field]: value }));
  };

  const handleShippingNext = () => {
    // Final submit or next step logic here
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/products/create");
    }, 1200);
  };

  // Step 0 validation
  const validateStep0 = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1 validation
  const validateStep1 = (): boolean => {
    const newErrors: Errors = {};
    if (!formData.name) {
      newErrors.name = "Product name is required.";
    }
    if (!formData.sellingPrice) {
      newErrors.sellingPrice = "Selling price is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handlers
  const handleCategoryChange = (categoryId: number | null) => {
    setFormData((prev) => ({ ...prev, categoryId }));
    setErrors((prev) => ({ ...prev, categoryId: undefined }));
  };

  const handleZodiacChange = (zodiacSign: string | null) => {
    setFormData((prev) => ({ ...prev, zodiacSign }));
  };

  const handleNext = () => {
    if (validateStep0()) {
      setActiveStep(1);
      setErrors({});
    }
  };

  const handleFieldChange = (field: keyof FormData, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleBack = () => {
    setActiveStep(0);
    setErrors({});
  };

  const handleSubmit = () => {
    if (!validateStep1()) return;
    setActiveStep(2);
  };

  const handleAttributeChange = (attributeId: number, value: any) => {
    // Map attribute IDs to form fields
    if (attributeId === 1) { // Assuming 1 is color attribute ID
      setFormData(prev => ({ ...prev, color: value }));
    }
  };

  const handleMediaChange = (files: File[]) => {
    setMedia(files);
  };

  const handleAttributeMediaSubmit = async () => {
    try {
      setLoading(true);
      
      // Create the main product first
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.sellingPrice,
        sku: formData.sku,
        category_id: formData.categoryId,
        zodiac_id: formData.zodiacSign ? parseInt(formData.zodiacSign) : null,
        images: formData.images
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const result = await response.json();
        setCreatedProductId(result.product.id);
        console.log('Product created successfully:', result.product);
        setActiveStep(3);
      } else {
        const errorData = await response.json();
        console.error('Error creating product:', errorData);
      }
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get category label for Step 1 (mocked, replace with actual lookup if needed)
  const categoryLabel = formData.categoryId ? `Category #${formData.categoryId}` : "";

  return (
    <div className="w-full p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mt-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Add Product</h1>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((label, idx) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-200 
                  ${activeStep === idx
                    ? 'bg-purple-600 border-purple-600 text-white'
                    : activeStep > idx
                    ? 'bg-purple-500 border-purple-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300'}
                `}
              >
                {idx + 1}
              </div>
              <span className={`mt-2 text-xs font-medium ${activeStep === idx ? 'text-purple-600' : 'text-gray-500 dark:text-gray-300'}`}>{label}</span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${((activeStep) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
      {/* End Progress Bar */}
      <div className="">
        {activeStep === 0 && (
          <StepCategorySelection
            zodiacSign={formData.zodiacSign}
            categoryId={formData.categoryId}
            onZodiacChange={handleZodiacChange}
            onCategoryChange={handleCategoryChange}
            onNext={handleNext}
            errors={errors}
          />
        )}
        {activeStep === 1 && (
          <StepProductDetails
            categoryId={formData.categoryId}
            zodiacSign={formData.zodiacSign}
            formData={formData}
            onFieldChange={handleFieldChange as (field: string, value: string) => void}
            onBack={handleBack}
            onSubmit={handleSubmit}
            categoryLabel={categoryLabel}
            errors={errors}
          />
        )}
        {activeStep === 2 && (
          <StepAttributeMedia
            categoryId={formData.categoryId}
            zodiacId={formData.zodiacSign ? parseInt(formData.zodiacSign) : null}
            selectedAttributes={{ color: formData.color || '' }}
            onAttributeChange={handleAttributeChange}
            onBack={() => setActiveStep(1)}
            onSubmit={handleAttributeMediaSubmit}
            errors={errors}
          />
        )}
        {activeStep === 3 && (
          <StepShippingDetails
            shipping={shipping}
            onFieldChange={handleShippingFieldChange}
            onBack={() => setActiveStep(2)}
            onNext={() => setActiveStep(4)}
            errors={{}}
          />
        )}
        {activeStep === 4 && (
          <StepDetailedSEO
            seo={seo}
            onFieldChange={handleSEOFieldChange}
            onBack={() => setActiveStep(3)}
            onNext={() => setActiveStep(5)}
            errors={{}}
          />
        )}
        {activeStep === 5 && (
          <StepStockManagement
            productId={createdProductId}
            stock={stock}
            onFieldChange={handleStockFieldChange}
            onBack={() => setActiveStep(4)}
            onNext={handleStockUpdate}
            errors={{}}
            isSubmitting={loading}
          />
        )}
      </div>
    </div>
  );
}
