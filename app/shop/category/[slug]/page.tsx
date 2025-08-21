"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { UniversalCartButton } from "@/app/components/UniversalCartButton";
import SpiritualTicker from "@/app/components/Hero/SpiritualTicker";
import NakshatraGyaanBanner from "@/app/components/NakshatraGyaanBanner";
import SpiritualJourneyBanner from "@/app/components/SpiritualJourneyBanner";

// Type definitions
interface Product {
  id: number;
  name: string;
  material?: string;
  type?: string;
  color?: string;
  purpose: string[];
  style?: string;
  gender?: string;
  zodiac?: string[];
  chakra?: string[];
  planet?: string;
  price: string;
  oldPrice: string;
  image: string;
  description: string;
  path: string;
  category: string;
}

interface CategoryData {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  banner_url: string | null;
  tags?: string[] | null;
  gradient_from?: string | null;
  gradient_to?: string | null;
  created_at: string | null;
  updated_at: string | null;
  subcategories: Array<{
    id: number;
    name: string;
    slug: string;
    image_url: string | null;
  }>;
}

interface CategoryConfig {
  title: string;
  description: string;
  bannerImage: string;
  tags: string[];
  gradientFrom: string;
  gradientTo: string;
}

interface Filters {
  [key: string]: string[];
}

type FilterCategory = string;
type DropdownType = FilterCategory | null;

// Category configurations
const categoryConfigs: Record<string, CategoryConfig> = {
  bracelets: {
    title: "Spiritual Bracelets",
    description: "Sacred energy wrapped around your wrist for daily protection and healing",
    bannerImage: "/images/products/bracelets-banner.jpg",
    tags: ["Healing Energy", "Protection", "Spiritual Growth"],
    gradientFrom: "purple-50",
    gradientTo: "rose-50"
  },
  "gemstones-crystals": {
    title: "Gemstones & Crystals",
    description: "The whispers of the universe curated into a collection of powerful healing stones",
    bannerImage: "/images/products/gemstones-banner.jpg",
    tags: ["Natural Energy", "Spiritual Healing", "Cosmic Wisdom"],
    gradientFrom: "blue-50",
    gradientTo: "amber-50"
  },
  rings: {
    title: "Sacred Rings",
    description: "Powerful spiritual rings designed to channel divine energy and protection",
    bannerImage: "/images/products/rings-banner.jpg",
    tags: ["Divine Energy", "Sacred Protection", "Spiritual Power"],
    gradientFrom: "emerald-50",
    gradientTo: "yellow-50"
  },
  pendants: {
    title: "Mystical Pendants",
    description: "Sacred pendants that connect you to higher realms and spiritual wisdom",
    bannerImage: "/images/products/pendants-banner.jpg",
    tags: ["Mystical Power", "Divine Connection", "Sacred Wisdom"],
    gradientFrom: "indigo-50",
    gradientTo: "purple-50"
  },
  malas: {
    title: "Prayer Malas",
    description: "Traditional prayer beads for meditation, chanting, and spiritual practice",
    bannerImage: "/images/products/malas-banner.jpg",
    tags: ["Meditation", "Prayer", "Spiritual Practice"],
    gradientFrom: "orange-50",
    gradientTo: "red-50"
  }
};

// Mock product data
const allProducts: Product[] = [
  // Bracelets
  {
    id: 1,
    name: "Rudraksha Bracelet",
    material: "Rudraksha",
    purpose: ["Protection", "Spiritual Growth"],
    style: "Adjustable Thread",
    gender: "Unisex",
    price: "₹1,299",
    oldPrice: "₹2,999",
    image: "/images/products/rudraksha-bracelet.jpg",
    description: "Sacred Rudraksha beads for spiritual protection and growth",
    path: "/shop/rudraksha-bracelet",
    category: "bracelets"
  },
  {
    id: 2,
    name: "Rose Quartz Bracelet",
    material: "Rose Quartz",
    purpose: ["Love & Relationship", "Emotional Healing"],
    style: "Elastic Beaded",
    gender: "Women's",
    price: "₹1,199",
    oldPrice: "₹2,499",
    image: "/images/products/rose-quartz-bracelet.jpg",
    description: "Rose quartz for love, compassion and emotional healing",
    path: "/shop/rose-quartz-bracelet",
    category: "bracelets"
  },
  {
    id: 3,
    name: "Tiger Eye Bracelet",
    material: "Tiger Eye",
    purpose: ["Wealth & Abundance", "Protection"],
    style: "Elastic Beaded",
    gender: "Unisex",
    price: "₹1,399",
    oldPrice: "₹2,799",
    image: "/images/products/tiger-eye-bracelet.jpg",
    description: "Tiger eye stones for wealth attraction and protection",
    path: "/shop/tiger-eye-bracelet",
    category: "bracelets"
  },
  // Gemstones & Crystals
  {
    id: 4,
    name: "Amethyst Crystal",
    type: "Amethyst",
    color: "Purple",
    purpose: ["Healing Crystals", "Meditation & Focus"],
    zodiac: ["Pisces", "Aquarius"],
    chakra: ["Third Eye", "Crown"],
    planet: "Jupiter",
    price: "₹1,200",
    oldPrice: "₹2,000",
    image: "/images/products/amethyst.jpg",
    description: "Enhances spiritual awareness and promotes calm",
    path: "/shop/amethyst-crystal",
    category: "gemstones-crystals"
  },
  {
    id: 5,
    name: "Citrine Crystal",
    type: "Citrine",
    color: "Yellow",
    purpose: ["Abundance / Wealth", "Chakra Balancing"],
    zodiac: ["Leo", "Sagittarius"],
    chakra: ["Solar Plexus"],
    planet: "Sun",
    price: "₹1,500",
    oldPrice: "₹2,500",
    image: "/images/products/citrine.jpg",
    description: "Manifests abundance and personal power",
    path: "/shop/citrine-crystal",
    category: "gemstones-crystals"
  },
  // Rings
  {
    id: 6,
    name: "Om Sacred Ring",
    material: "Silver",
    purpose: ["Spiritual Growth", "Protection"],
    style: "Adjustable",
    gender: "Unisex",
    price: "₹2,499",
    oldPrice: "₹4,999",
    image: "/images/products/om-ring.jpg",
    description: "Sacred Om symbol ring for spiritual connection",
    path: "/shop/om-ring",
    category: "rings"
  },
  {
    id: 7,
    name: "Ganesha Protection Ring",
    material: "Brass",
    purpose: ["Protection", "Success"],
    style: "Fixed Size",
    gender: "Unisex",
    price: "₹1,899",
    oldPrice: "₹3,799",
    image: "/images/products/ganesha-ring.jpg",
    description: "Lord Ganesha ring for removing obstacles",
    path: "/shop/ganesha-ring",
    category: "rings"
  },
  // Pendants
  {
    id: 8,
    name: "Trishul Pendant",
    material: "Silver",
    purpose: ["Protection", "Spiritual Power"],
    style: "Chain Included",
    gender: "Unisex",
    price: "₹3,299",
    oldPrice: "₹6,599",
    image: "/images/products/trishul-pendant.jpg",
    description: "Sacred Trishul pendant for divine protection",
    path: "/shop/trishul-pendant",
    category: "pendants"
  },
  {
    id: 9,
    name: "Lotus Pendant",
    material: "Gold Plated",
    purpose: ["Spiritual Growth", "Love & Relationship"],
    style: "Chain Included",
    gender: "Women's",
    price: "₹2,799",
    oldPrice: "₹5,599",
    image: "/images/products/lotus-pendant.jpg",
    description: "Sacred lotus for purity and enlightenment",
    path: "/shop/lotus-pendant",
    category: "pendants"
  },
  // Malas
  {
    id: 10,
    name: "Rudraksha Mala 108 Beads",
    material: "Rudraksha",
    purpose: ["Meditation", "Spiritual Growth"],
    style: "Traditional",
    gender: "Unisex",
    price: "₹4,999",
    oldPrice: "₹9,999",
    image: "/images/products/rudraksha-mala.jpg",
    description: "Traditional 108 bead Rudraksha mala for meditation",
    path: "/shop/rudraksha-mala",
    category: "malas"
  },
  {
    id: 11,
    name: "Crystal Quartz Mala",
    material: "Crystal Quartz",
    purpose: ["Chakra Balancing", "Meditation"],
    style: "Traditional",
    gender: "Unisex",
    price: "₹3,499",
    oldPrice: "₹6,999",
    image: "/images/products/crystal-mala.jpg",
    description: "Clear quartz mala for energy amplification",
    path: "/shop/crystal-mala",
    category: "malas"
  }
];

// Dynamic filter options based on category
const getFilterOptions = (category: string, products: Product[]): Record<string, string[]> => {
  const categoryProducts = products.filter(p => p.category === category);
  
  const baseFilters = {
    purpose: [...new Set(categoryProducts.flatMap(p => p.purpose))].sort()
  };

  // Add category-specific filters
  switch (category) {
    case "bracelets":
      return {
        ...baseFilters,
        material: [...new Set(categoryProducts.map(p => p.material).filter((m): m is string => Boolean(m)))].sort(),
        style: [...new Set(categoryProducts.map(p => p.style).filter((s): s is string => Boolean(s)))].sort(),
        gender: [...new Set(categoryProducts.map(p => p.gender).filter((g): g is string => Boolean(g)))].sort()
      };
    case "gemstones-crystals":
      return {
        ...baseFilters,
        type: [...new Set(categoryProducts.map(p => p.type).filter((t): t is string => Boolean(t)))].sort(),
        color: [...new Set(categoryProducts.map(p => p.color).filter((c): c is string => Boolean(c)))].sort(),
        zodiac: [...new Set(categoryProducts.flatMap(p => p.zodiac || []))].sort(),
        chakra: [...new Set(categoryProducts.flatMap(p => p.chakra || []))].sort(),
        planet: [...new Set(categoryProducts.map(p => p.planet).filter((p): p is string => Boolean(p)))].sort()
      };
    case "rings":
    case "pendants":
      return {
        ...baseFilters,
        material: [...new Set(categoryProducts.map(p => p.material).filter((m): m is string => Boolean(m)))].sort(),
        style: [...new Set(categoryProducts.map(p => p.style).filter((s): s is string => Boolean(s)))].sort(),
        gender: [...new Set(categoryProducts.map(p => p.gender).filter((g): g is string => Boolean(g)))].sort()
      };
    case "malas":
      return {
        ...baseFilters,
        material: [...new Set(categoryProducts.map(p => p.material).filter((m): m is string => Boolean(m)))].sort(),
        style: [...new Set(categoryProducts.map(p => p.style).filter((s): s is string => Boolean(s)))].sort()
      };
    default:
      return baseFilters;
  }
};

// Product Banner Component
const ProductBanner: React.FC<{ config: CategoryConfig }> = ({ config }) => (
  <div className={`w-full bg-gradient-to-r from-${config.gradientFrom} via-${config.gradientFrom} to-${config.gradientTo} py-8 md:py-12 relative overflow-hidden`}>
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Section - Full Height Image */}
        <div className="relative h-48 md:h-64 lg:h-80">
          <Image
            src={config.bannerImage}
            alt={`${config.title} Collection`}
            fill
            className="object-cover rounded-2xl shadow-2xl"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
        </div>
        
        {/* Right Section - Text Content */}
        <div className="text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-3 leading-tight">
            {config.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-4">
            {config.description}
          </p>
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {config.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 ${index === 0 ? 'bg-purple-100/50 text-purple-800 border-purple-200/50' : 
                          index === 1 ? 'bg-pink-100/50 text-pink-800 border-pink-200/50' : 
                          'bg-rose-100/50 text-rose-800 border-rose-200/50'} rounded-full text-xs font-medium border`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [filters, setFilters] = useState<Filters>({});
  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productLoading, setProductLoading] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  // Fetch category data from API
  useEffect(() => {
    const fetchCategoryData = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/categories/slug/${slug}`);
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch category data');
        }
        
        setCategoryData(result.data);
      } catch (err) {
        console.error('Error fetching category data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch category data');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [slug]);

  // Fetch products for this category from API once category id is known
  useEffect(() => {
    const fetchProductsForCategory = async () => {
      if (!categoryData?.id) return;

      try {
        setProductLoading(true);
        const res = await fetch(`/api/products?category=${categoryData.id}&limit=100`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        const apiProducts = Array.isArray(data.products) ? data.products : [];

        // Map API products to local Product shape used by this page
        const mapped: Product[] = apiProducts.map((p: any) => ({
          id: p.id,
          name: p.name,
          material: p.material || undefined,
          type: p.product_type || undefined,
          color: p.color || undefined,
          purpose: [],
          style: undefined,
          gender: undefined,
          zodiac: [],
          chakra: [],
          planet: undefined,
          price: `₹${p.price}`,
          oldPrice: p.original_price ? `₹${p.original_price}` : `₹${(Number(p.price) * 1.2).toFixed(2)}`,
          image: (p.product_media && p.product_media[0]?.media_url) || p.image || '/images/products/default.jpg',
          description: p.description || '',
          path: `/shop/${p.id}`,
          category: slug
        }));

        setCategoryProducts(mapped);
      } catch (err) {
        console.error('Error fetching products:', err);
        setCategoryProducts([]);
      } finally {
        setProductLoading(false);
      }
    };

    fetchProductsForCategory();
  }, [categoryData, slug]);

  // Get category configuration based on API data or fallback
  const categoryConfig = useMemo(() => {
    if (categoryData) {
      return {
        title: categoryData.name,
        description: categoryData.description || "Discover our collection of spiritual products",
        bannerImage: categoryData.banner_url || categoryData.image_url || "/images/products/default-banner.jpg",
        tags: categoryData.tags || ["Spiritual", "Sacred", "Divine"],
        gradientFrom: categoryData.gradient_from || "gray-50",
        gradientTo: categoryData.gradient_to || "gray-100"
      };
    }
    
    // Fallback configuration
    return categoryConfigs[slug] || {
      title: "Products",
      description: "Discover our collection of spiritual products",
      bannerImage: "/images/products/default-banner.jpg",
      tags: ["Spiritual", "Sacred", "Divine"],
      gradientFrom: "gray-50",
      gradientTo: "gray-100"
    };
  }, [categoryData, slug]);

  // Get filter options for current category
  const filterOptions = useMemo(() => {
    return getFilterOptions(slug, categoryProducts);
  }, [slug, categoryProducts]);

  // Initialize filters when category changes
  useEffect(() => {
    const initialFilters: Filters = {};
    Object.keys(filterOptions).forEach(key => {
      initialFilters[key] = [];
    });
    setFilters(initialFilters);
  }, [filterOptions]);

  // Filter products based on selected criteria
  const filteredProducts = useMemo(() => {
    return categoryProducts.filter(product => {
      return Object.entries(filters).every(([filterKey, filterValues]) => {
        if (filterValues.length === 0) return true;
        
        switch (filterKey) {
          case 'purpose':
            return product.purpose.some(p => filterValues.includes(p));
          case 'zodiac':
            return product.zodiac?.some(z => filterValues.includes(z)) || false;
          case 'chakra':
            return product.chakra?.some(c => filterValues.includes(c)) || false;
          case 'material':
            return filterValues.includes(product.material || '');
          case 'type':
            return filterValues.includes(product.type || '');
          case 'color':
            return filterValues.includes(product.color || '');
          case 'style':
            return filterValues.includes(product.style || '');
          case 'gender':
            return filterValues.includes(product.gender || '');
          case 'planet':
            return filterValues.includes(product.planet || '');
          default:
            return true;
        }
      });
    });
  }, [categoryProducts, filters]);

  const toggleFilter = (category: FilterCategory, value: string): void => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category]?.includes(value)
        ? prev[category].filter(item => item !== value)
        : [...(prev[category] || []), value]
    }));
  };

  const clearAllFilters = (): void => {
    const clearedFilters: Filters = {};
    Object.keys(filterOptions).forEach(key => {
      clearedFilters[key] = [];
    });
    setFilters(clearedFilters);
  };

  const getActiveFiltersCount = (): number => {
    return Object.values(filters).reduce((sum, arr) => sum + arr.length, 0);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveDropdown(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Show loading state
  if (loading || productLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Product Banner */}
      <ProductBanner config={categoryConfig} />
      
      {/* Spiritual Ticker */}
      <SpiritualTicker />
      
      {/* Category Description */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filters Section */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-6 mb-12 border border-gray-100">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-gray-700 font-medium">Filter by:</span>
            
            {Object.entries(filterOptions).map(([filterKey, options]) => (
              <div key={filterKey} className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveDropdown(activeDropdown === filterKey ? null : filterKey);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors capitalize text-gray-900"
                >
                  {filterKey.replace(/([A-Z])/g, ' $1')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === filterKey ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto transition-all duration-200 ease-out ${activeDropdown === filterKey ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2 pointer-events-none'}`}>
                  {options.map(option => (
                    <label key={option} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-900">
                      <input
                        type="checkbox"
                        checked={filters[filterKey]?.includes(option) || false}
                        onChange={() => toggleFilter(filterKey, option)}
                        className="mr-2"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            {/* Clear All Filters */}
            {getActiveFiltersCount() > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium"
              >
                Clear all ({getActiveFiltersCount()})
              </button>
            )}
          </div>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([category, values]) =>
                values.map((value: string) => (
                  <span
                    key={`${category}-${value}`}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                  >
                    {value}
                    <button
                      onClick={() => toggleFilter(category, value)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </span>
                ))
              )}
            </div>
          )}
        </div>

        {/* Subcategories Section */}
        {categoryData?.subcategories && categoryData.subcategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Subcategories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categoryData.subcategories.map((subcategory) => (
                <Link 
                  key={subcategory.id} 
                  href={`/shop/category/${slug}/${subcategory.slug}`}
                  className="group"
                >
                  <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow text-center">
                    {subcategory.image_url && (
                      <div className="relative h-20 mb-3">
                        <Image
                          src={subcategory.image_url}
                          alt={subcategory.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h3 
                      className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors overflow-hidden text-ellipsis line-clamp-2 min-h-[2.5rem]"
                      title={subcategory.name}
                    >
                      {subcategory.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {categoryProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={product.path} className="w-full max-w-sm">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group h-full flex flex-col"
                >
                                     {/* Product Image */}
                   <div className="relative h-36 overflow-hidden rounded-t-2xl">
                     <Image
                       src={product.image}
                       alt={product.name}
                       fill
                       className="object-cover group-hover:scale-105 transition-transform duration-300"
                     />
                     
                     {/* Edit Button Overlay */}
                     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                       <Link
                         href={`/admin/products/add?edit=${product.id}`}
                         className="bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 group/edit"
                         onClick={(e) => e.stopPropagation()}
                         title="Edit Product"
                       >
                         <Edit className="w-4 h-4" />
                         <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20">
                           Edit Product
                         </span>
                       </Link>
                     </div>
                   </div>

                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 
                      className="font-serif font-bold text-gray-900 mb-2 text-lg overflow-hidden text-ellipsis line-clamp-2 min-h-[3.5rem]"
                      title={product.name}
                    >
                      {product.name}
                    </h3>
                    <p 
                      className="text-gray-600 text-sm mb-3 font-light overflow-hidden text-ellipsis line-clamp-2 min-h-[2.5rem]"
                      title={product.description}
                    >
                      {product.description}
                    </p>
                    
                    {/* Product Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.purpose.slice(0, 2).map((purpose, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-full overflow-hidden text-ellipsis max-w-full"
                          title={purpose}
                        >
                          {purpose.length > 15 ? `${purpose.substring(0, 15)}...` : purpose}
                        </span>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
                      <div className="flex items-center flex-wrap">
                        <span className="font-bold text-gray-900">{product.price}</span>
                        <span className="text-gray-500 line-through text-sm ml-2">{product.oldPrice}</span>
                      </div>
                      <span className="text-green-600 text-sm font-medium whitespace-nowrap">
                        {Math.round(((parseInt(product.oldPrice.replace(/[^\d]/g, '')) - parseInt(product.price.replace(/[^\d]/g, ''))) / parseInt(product.oldPrice.replace(/[^\d]/g, ''))) * 100)}% OFF
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <UniversalCartButton
                      productId={product.id.toString()}
                      productName={product.name}
                      price={Number(product.price.replace(/[^\d]/g, ''))}
                      image={product.image}
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </UniversalCartButton>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products match your current filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
              >
                Clear Filters
                <span className="ml-2">→</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nakshatra Gyaan Banner */}
      <NakshatraGyaanBanner />

      {/* Spiritual Journey Banner */}
      {/* <SpiritualJourneyBanner /> */}
    </div>
  );
}