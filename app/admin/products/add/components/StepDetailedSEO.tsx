import React, { useState } from "react";

interface StepDetailedSEOProps {
  seo: {
    shortDescription: string;
    fullDescription: string;
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
  };
  onFieldChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  errors: { [key: string]: string };
}

const StepDetailedSEO: React.FC<StepDetailedSEOProps> = ({
  seo,
  onFieldChange,
  onBack,
  onNext,
  errors,
}) => {
  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">
        <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Detailed Descriptions &amp; SEO</h2>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-6 mb-0">
        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Short Description</label>
          <div className="mb-1">
            <textarea
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
              rows={3}
              maxLength={255}
              placeholder="Enter a brief description (max 255 characters)"
              value={seo.shortDescription}
              onChange={e => onFieldChange('shortDescription', e.target.value)}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">You can use formatting options like bold, italic, bullet points, etc.</div>
        </div>
        {/* Full Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Description</label>
          <div className="mb-1">
            <textarea
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
              rows={6}
              placeholder="Enter detailed product description"
              value={seo.fullDescription}
              onChange={e => onFieldChange('fullDescription', e.target.value)}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Use the toolbar above to format your text with bullet points, headings, and other styles.</div>
        </div>
        {/* Meta Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
            maxLength={100}
            placeholder="Enter meta title (max 100 characters)"
            value={seo.metaTitle}
            onChange={e => onFieldChange('metaTitle', e.target.value)}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Recommended length: 50-60 characters</div>
        </div>
        {/* Meta Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Description</label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
            maxLength={255}
            placeholder="Enter meta description (max 255 characters)"
            value={seo.metaDescription}
            onChange={e => onFieldChange('metaDescription', e.target.value)}
            rows={2}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Recommended length: 150-160 characters</div>
        </div>
        {/* Meta Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Keywords</label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900"
            placeholder="Enter keywords separated by commas"
            value={seo.metaKeywords}
            onChange={e => onFieldChange('metaKeywords', e.target.value)}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Keywords are automatically generated from the full description. You can modify them manually.</div>
        </div>
        {/* SEO Preview */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 mt-4">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">SEO Preview</div>
          <div className="text-sm font-semibold text-purple-600 mb-1">
            {seo.metaTitle ? seo.metaTitle : 'Your meta title will appear here'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {seo.metaDescription ? seo.metaDescription : 'Your meta description will appear here'}
          </div>
        </div>
        </div>
        {/* Navigation Buttons INSIDE the light card, just after the dark card */}
        <div className="flex justify-between pt-6 px-2">
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
            Update Meta Data &amp; Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepDetailedSEO;
