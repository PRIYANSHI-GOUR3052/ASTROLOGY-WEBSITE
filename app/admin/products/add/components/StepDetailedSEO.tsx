import React, { useState, useEffect } from "react";
import { Search, Eye, RefreshCw, Globe, Twitter, Facebook, Link } from "lucide-react";

interface ProductMeta {
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
}

interface StepDetailedSEOProps {
  productId?: number;
  productName?: string;
  productDescription?: string;
  productImage?: string;
  seo: ProductMeta;
  onFieldChange: (field: string, value: string) => void;
  onBack: () => void;
  onNext: () => void;
  errors: { [key: string]: string };
  isSubmitting?: boolean;
}

const StepDetailedSEO: React.FC<StepDetailedSEOProps> = ({
  productId,
  productName = "",
  productDescription = "",
  productImage = "",
  seo,
  onFieldChange,
  onBack,
  onNext,
  errors,
  isSubmitting = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [existingMeta, setExistingMeta] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState<'google' | 'facebook' | 'twitter'>('google');

  // Load existing meta data if productId is provided
  useEffect(() => {
    if (productId) {
      loadExistingMeta();
    }
  }, [productId]);

  const loadExistingMeta = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}/meta`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setExistingMeta(data);
          // Pre-fill form with existing data
          Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'product_id' && key !== 'created_at' && key !== 'updated_at' && key !== 'structured_data') {
              onFieldChange(key, data[key] || '');
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading meta data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMeta = async () => {
    try {
      setLoading(true);
      
      const metaData = {
        meta_title: seo.meta_title,
        meta_description: seo.meta_description,
        meta_keywords: seo.meta_keywords,
        og_title: seo.og_title,
        og_description: seo.og_description,
        og_image: seo.og_image,
        twitter_title: seo.twitter_title,
        twitter_description: seo.twitter_description,
        twitter_image: seo.twitter_image,
        canonical_url: seo.canonical_url
      };

      const method = existingMeta ? 'PUT' : 'POST';
      const response = await fetch(`/api/products/${productId}/meta`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(metaData)
      });

      if (response.ok) {
        const savedData = await response.json();
        setExistingMeta(savedData);
        onNext();
      } else {
        const errorData = await response.json();
        console.error('Error saving meta data:', errorData);
      }
    } catch (error) {
      console.error('Error saving meta data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSEOText = (text: string, maxLength: number = 160): string => {
    if (!text) return '';
    
    // Remove HTML tags and extra whitespace
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    
    if (cleanText.length <= maxLength) return cleanText;
    
    // Truncate at word boundary
    const truncated = cleanText.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  const generateKeywords = (text: string, productName: string = ''): string => {
    if (!text && !productName) return '';
    
    const fullText = `${productName} ${text}`.toLowerCase();
    
    // Common stop words to exclude
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'his', 'hers', 'ours', 'theirs'
    ]);
    
    // Extract words and filter
    const words = fullText
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word))
      .filter((word, index, arr) => arr.indexOf(word) === index); // Remove duplicates
    
    // Return top 10 keywords
    return words.slice(0, 10).join(', ');
  };

  const handleAutoGenerate = () => {
    const autoTitle = generateSEOText(productName, 60);
    const autoDescription = generateSEOText(productDescription, 160);
    const autoKeywords = generateKeywords(productDescription, productName);

    onFieldChange('meta_title', autoTitle);
    onFieldChange('meta_description', autoDescription);
    onFieldChange('meta_keywords', autoKeywords);
    onFieldChange('og_title', autoTitle);
    onFieldChange('og_description', autoDescription);
    onFieldChange('og_image', productImage);
    onFieldChange('twitter_title', autoTitle);
    onFieldChange('twitter_description', autoDescription);
    onFieldChange('twitter_image', productImage);
  };

  const getCharacterCount = (text: string): number => text?.length || 0;
  const getCharacterColor = (count: number, max: number): string => {
    if (count > max) return 'text-red-500';
    if (count > max * 0.9) return 'text-yellow-500';
    return 'text-green-500';
  };

  if (loading) {
  return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading SEO data...</span>
        </div>
          </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Search className="w-6 h-6 text-purple-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">SEO & Meta Data</h2>
        </div>
        <button
          type="button"
          onClick={handleAutoGenerate}
          className="flex items-center px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Auto Generate
        </button>
          </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Meta Data */}
        <div className="space-y-6">
          {/* Basic Meta Data */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Basic Meta Data</h3>
        </div>
            
        {/* Meta Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Title
                <span className="text-red-500 ml-1">*</span>
              </label>
          <input
            type="text"
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 ${errors.meta_title ? 'border-red-500' : ''}`}
                maxLength={60}
                placeholder="Enter meta title (max 60 characters)"
                value={seo.meta_title}
                onChange={e => onFieldChange('meta_title', e.target.value)}
              />
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${getCharacterColor(getCharacterCount(seo.meta_title), 60)}`}>
                  {getCharacterCount(seo.meta_title)}/60 characters
                </span>
                {errors.meta_title && <span className="text-xs text-red-500">{errors.meta_title}</span>}
              </div>
        </div>

        {/* Meta Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Meta Description
                <span className="text-red-500 ml-1">*</span>
              </label>
          <textarea
                className={`w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 ${errors.meta_description ? 'border-red-500' : ''}`}
                maxLength={160}
                rows={3}
                placeholder="Enter meta description (max 160 characters)"
                value={seo.meta_description}
                onChange={e => onFieldChange('meta_description', e.target.value)}
              />
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${getCharacterColor(getCharacterCount(seo.meta_description), 160)}`}>
                  {getCharacterCount(seo.meta_description)}/160 characters
                </span>
                {errors.meta_description && <span className="text-xs text-red-500">{errors.meta_description}</span>}
              </div>
        </div>

        {/* Meta Keywords */}
            <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Meta Keywords</label>
          <input
            type="text"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
            placeholder="Enter keywords separated by commas"
                value={seo.meta_keywords}
                onChange={e => onFieldChange('meta_keywords', e.target.value)}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Keywords are automatically generated from product name and description
              </p>
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Canonical URL</label>
              <input
                type="url"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800"
                placeholder="https://example.com/product-page"
                value={seo.canonical_url}
                onChange={e => onFieldChange('canonical_url', e.target.value)}
              />
            </div>
          </div>

          {/* Social Media Meta Data */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <Globe className="w-5 h-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Social Media</h3>
            </div>
            
            {/* Open Graph */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Facebook className="w-4 h-4 mr-1" />
                Open Graph (Facebook)
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm"
                  placeholder="OG Title"
                  value={seo.og_title}
                  onChange={e => onFieldChange('og_title', e.target.value)}
                />
                <textarea
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm"
                  rows={2}
                  placeholder="OG Description"
                  value={seo.og_description}
                  onChange={e => onFieldChange('og_description', e.target.value)}
                />
                <input
                  type="url"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm"
                  placeholder="OG Image URL"
                  value={seo.og_image}
                  onChange={e => onFieldChange('og_image', e.target.value)}
                />
              </div>
            </div>

            {/* Twitter Card */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <Twitter className="w-4 h-4 mr-1" />
                Twitter Card
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm"
                  placeholder="Twitter Title"
                  value={seo.twitter_title}
                  onChange={e => onFieldChange('twitter_title', e.target.value)}
                />
                <textarea
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm"
                  rows={2}
                  placeholder="Twitter Description"
                  value={seo.twitter_description}
                  onChange={e => onFieldChange('twitter_description', e.target.value)}
                />
                <input
                  type="url"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 text-sm"
                  placeholder="Twitter Image URL"
                  value={seo.twitter_image}
                  onChange={e => onFieldChange('twitter_image', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-6">
          {/* Preview Tabs */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <Eye className="w-5 h-5 text-gray-500 mr-2" />
                Preview
              </h3>
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={() => setPreviewMode('google')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    previewMode === 'google'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('facebook')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    previewMode === 'facebook'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Facebook
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode('twitter')}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    previewMode === 'twitter'
                      ? 'bg-blue-400 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Twitter
                </button>
              </div>
            </div>

            {/* Google Preview */}
            {previewMode === 'google' && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Google Search Result</div>
                <div className="text-blue-600 text-sm mb-1">
                  {seo.canonical_url || 'https://example.com/product-page'}
        </div>
                <div className="text-lg text-blue-800 dark:text-blue-400 font-medium mb-1">
                  {seo.meta_title || 'Your meta title will appear here'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
                  {seo.meta_description || 'Your meta description will appear here'}
                </div>
              </div>
            )}

            {/* Facebook Preview */}
            {previewMode === 'facebook' && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <div className="text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-700">
                  Facebook Share Preview
                </div>
                {seo.og_image && (
                  <img
                    src={seo.og_image}
                    alt="OG Image"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">example.com</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {seo.og_title || 'Your OG title will appear here'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {seo.og_description || 'Your OG description will appear here'}
                  </div>
                </div>
              </div>
            )}

            {/* Twitter Preview */}
            {previewMode === 'twitter' && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                <div className="text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-700">
                  Twitter Card Preview
                </div>
                {seo.twitter_image && (
                  <img
                    src={seo.twitter_image}
                    alt="Twitter Image"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="p-3">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">example.com</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {seo.twitter_title || 'Your Twitter title will appear here'}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {seo.twitter_description || 'Your Twitter description will appear here'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SEO Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-3">SEO Best Practices</h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Meta title should be 50-60 characters</li>
              <li>• Meta description should be 150-160 characters</li>
              <li>• Include primary keywords in title and description</li>
              <li>• Use unique, descriptive titles for each page</li>
              <li>• Write compelling descriptions that encourage clicks</li>
              <li>• Use high-quality images for social media previews</li>
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
          onClick={productId ? handleSaveMeta : onNext}
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

export default StepDetailedSEO;
