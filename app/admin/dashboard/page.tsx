'use client';

import React from 'react';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { Plus, Loader2, MoveRight, Info } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

// Currency formatting
const formatCurrency = (value: string | number) => {
  const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(numValue) ? '0.00' : numValue.toFixed(2);
};

const formatNumber = (value: number) => value ? String(value) : '0';

export default function AdminDashboard() {
  const { dashboardData, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="p-4 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="mt-2 text-gray-600 dark:text-gray-300">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800">
          <h3 className="font-bold">Error loading dashboard</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const {
    summaryStats, todayStats, productInventory = { products: [], stones: [], services: [] },
    storePerformance, topSellingProducts = [], topSellingServices = [], topSellingStones = [], topCustomers = []
  } = dashboardData;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Hi Admin | Astrology Consultant</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
        {[
          { icon: '💰', label: 'Total Sales', value: `₹${formatCurrency(summaryStats.totalSales)}`, change: summaryStats.changes.totalSales },
          { icon: '📋', label: 'Total Orders', value: formatNumber(summaryStats.totalOrders), change: summaryStats.changes.totalOrders },
          { icon: '👥', label: 'Total Customers', value: formatNumber(summaryStats.totalCustomers), change: summaryStats.changes.totalCustomers },
          { icon: '📊', label: 'Average Order Sale', value: `₹${formatCurrency(summaryStats.averageOrderSale)}`, change: summaryStats.changes.averageOrderSale },
          { icon: '💳', label: 'Total Unpaid Invoices', value: `₹${formatCurrency(summaryStats.totalUnpaid)}`, change: summaryStats.changes.totalUnpaid },
        ].map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
            <h3 className="text-lg font-bold">{item.value}</h3>
            <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.change}</p>
          </div>
        ))}
      </div>

      {/* Today’s Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { icon: '💰', label: "Today's Sales", value: `₹${formatCurrency(todayStats.todaySales)}`, change: todayStats.changes.todaySales },
          { icon: '📋', label: "Today's Orders", value: formatNumber(todayStats.todayOrders), change: todayStats.changes.todayOrders },
          { icon: '👥', label: "Today's Customers", value: formatNumber(todayStats.todayCustomers), change: todayStats.changes.todayCustomers },
        ].map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
            <h3 className="text-lg font-bold">{item.value}</h3>
            <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.change}</p>
          </div>
        ))}
      </div>

      {/* Inventory Overview */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
        <h2 className="text-lg font-bold mb-4">Inventory Overview</h2>

        {/* Products */}
        <Section title="Products" color="blue" items={productInventory.products} type="product" />

        {/* Stones */}
        <Section title="Stones" color="purple" items={productInventory.stones} type="stone" />

        {/* Services */}
        <Section title="Services" color="green" items={productInventory.services} type="service" />
      </div>

      {/* Sales Overview */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Sales Overview</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">Last 30 days</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Total Revenue', value: `₹${formatCurrency(summaryStats.totalSales)}`,
              subtext: 'Across all channels', icon: '💵', color: 'bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300'
            },
            {
              label: 'Total Orders', value: formatNumber(storePerformance.totals.orders),
              subtext: `${storePerformance.totals.conversionRate} conversion`, icon: '📦', color: 'bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
            },
            {
              label: 'Average Order Value',
              value: storePerformance.totals.orders > 0 ? `₹${formatCurrency(summaryStats.totalSales / storePerformance.totals.orders)}` : '₹0.00',
              subtext: 'Per completed order', icon: '📈', color: 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
            },
          ].map((item, i) => (
            <div key={i} className={`p-4 rounded-lg ${item.color} flex items-center`}>
              <div className="text-2xl mr-3">{item.icon}</div>
              <div>
                <p className="text-xs opacity-75">{item.label}</p>
                <p className="text-xl font-bold">{item.value}</p>
                <p className="text-xs">{item.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Reusable Section Component
// Define types for product, stone, and service items
type ProductItem = { name?: string; name_en?: string; sku?: string; price: number | string; stock?: number };
type StoneItem = { name: string; name_en: string; sku?: string; zodiac?: string; price: number | string; stock?: number };
type ServiceItem = { name?: string; name_en?: string; sku?: string; price: number | string; stock?: number };

type SectionItem = ProductItem | StoneItem | ServiceItem;

function Section({ title, color, items, type }: {
  title: string,
  color: string,
  items: SectionItem[],
  type: 'product' | 'stone' | 'service'
}) {
  return (
    <div className="mb-4">
      <h3 className={`text-md font-semibold mb-2 text-${color}-600 dark:text-${color}-400`}>{title}</h3>
      {items && items.length > 0 ? (
        items.map((item, index) => (
          <div key={index} className="flex items-center mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex-grow">
              <p className="text-sm font-semibold">
                {type === 'stone' ? `${item.name} (${item.name_en})` : item.name || item.name_en}
              </p>
              <p className="text-xs text-gray-500">
                {type === 'product' && `SKU: ${item.sku}`}
                {type === 'stone' && `SKU: ${item.sku}${'zodiac' in item && item.zodiac ? ` | Zodiac: ${item.zodiac}` : ''}`}
                {type === 'service' && `SKU: ${item.sku}`}
              </p>
            </div>
            <div className="text-right">
              <p>₹{formatCurrency(item.price)}</p>
              {item.stock !== undefined && (
                <p className="text-xs text-green-500">{item.stock} Stock</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-xs text-gray-500 italic">No {title.toLowerCase()} available</p>
      )}
    </div>
  );
}
