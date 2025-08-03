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
  shortDescription: string;
  fullDescription: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};
const initialSEO: SEOData = {
  shortDescription: '',
  fullDescription: '',
  metaTitle: '',
  metaDescription: '',
  metaKeywords: '',
};

type StockData = {
  quantity: number;
  lowStockThreshold: number;
};
const initialStock: StockData = {
  quantity: 0,
  lowStockThreshold: 0,
};
type ShippingData = {
  weight: string;
  weightUnit: string;
  length: string;
  width: string;
  height: string;
  dimensionUnit: string;
  shippingClass: string;
};
const initialShipping: ShippingData = {
  weight: '',
  weightUnit: 'Kilograms (kg)',
  length: '',
  width: '',
  height: '',
  dimensionUnit: 'Centimeters (cm)',
  shippingClass: '',
};

type FormData = {
  zodiacSign?: string | null;
  categoryId: number | null;
  name: string;
  description: string;
  sku: string;
  sellingPrice: string;
  discountedPrice: string;
  color?: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  zodiacSign: '',
  categoryId: null,
  name: "",
  description: "",
  sku: "",
  sellingPrice: "",
  discountedPrice: "",
  color: '',
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
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [shipping, setShipping] = useState<ShippingData>(initialShipping);
  const [seo, setSEO] = useState<SEOData>(initialSEO);
  const [errors, setErrors] = useState<Errors>({});
  const [stock, setStock] = useState<StockData>(initialStock);
  const handleStockFieldChange = (field: string, value: number) => {
    setStock(prev => ({ ...prev, [field]: value }));
  };

  const handleStockUpdate = () => {
    // Final stock update logic here
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/products/create");
    }, 1200);
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

  const handleAttributeChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMediaChange = (files: File[]) => {
    setMedia(files);
  };

  const handleAttributeMediaSubmit = () => {
    // Final submit logic here
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/products/create");
    }, 1200);
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
            attributes={{ color: formData.color || '' }}
            media={media}
            onAttributeChange={handleAttributeChange}
            onMediaChange={handleMediaChange}
            onBack={() => setActiveStep(1)}
            onSubmit={() => setActiveStep(3)}
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
            stock={stock}
            onFieldChange={handleStockFieldChange}
            onUpdate={handleStockUpdate}
            onBack={() => setActiveStep(4)}
            errors={{}}
          />
        )}
      </div>
    </div>
  );
}
