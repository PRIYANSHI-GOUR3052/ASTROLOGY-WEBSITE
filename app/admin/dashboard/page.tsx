'use client';

import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Plus, Loader2, MoveRight, Info } from 'lucide-react';
import { useDashboardData } from '@/hooks/useDashboardData';

// Helper function to safely convert to number and format
const formatCurrency = (value: string | number) => {
  const numValue = typeof value === 'string' ? parseFloat(value) : Number(value);
  return isNaN(numValue) ? '0.00' : numValue.toFixed(2);
};

// Helper function to safely convert to string
const formatNumber = (value: number) => {
  return value ? String(value) : '0';
};

export default function AdminDashboard() {
  const { dashboardData, isLoading, error } = useDashboardData();

  if (isLoading) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p className="mt-2 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-red-600 border border-red-200">
          <h3 className="font-bold">Error loading dashboard</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return null;
  }

  const { 
    summaryStats, 
    todayStats, 
    productInventory = { products: [], stones: [], services: [] },
    storePerformance, 
    topSellingProducts = [], 
    topSellingServices = [], 
    topSellingStones = [],
    topCustomers = [] 
  } = dashboardData;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Hi Admin | Astrology Consultant</h1>
      </div>

      {/* Overall Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
      
        {[
          { icon: '💰', label: 'Total Sales', value: `₹${formatCurrency(summaryStats.totalSales)}`, change: summaryStats.changes.totalSales },
          { icon: '📋', label: 'Total Orders', value: formatNumber(summaryStats.totalOrders), change: summaryStats.changes.totalOrders },
          { icon: '👥', label: 'Total Customers', value: formatNumber(summaryStats.totalCustomers), change: summaryStats.changes.totalCustomers },
          { icon: '📊', label: 'Average Order Sale', value: `₹${formatCurrency(summaryStats.averageOrderSale)}`, change: summaryStats.changes.averageOrderSale },
          { icon: '💳', label: 'Total Unpaid Invoices', value: `₹${formatCurrency(summaryStats.totalUnpaid)}`, change: summaryStats.changes.totalUnpaid }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs text-gray-500">{item.label}</p>
            <h3 className="text-lg font-bold">{item.value}</h3>
            <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.change}</p>
          </div>
        ))}
      </div>

      {/* Today's Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { icon: '💰', label: 'Today\'s Sales', value: `₹${formatCurrency(todayStats.todaySales)}`, change: todayStats.changes.todaySales },
          { icon: '📋', label: 'Today\'s Orders', value: formatNumber(todayStats.todayOrders), change: todayStats.changes.todayOrders },
          { icon: '👥', label: 'Today\'s Customers', value: formatNumber(todayStats.todayCustomers), change: todayStats.changes.todayCustomers }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs text-gray-500">{item.label}</p>
            <h3 className="text-lg font-bold">{item.value}</h3>
            <p className={`text-xs ${item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
        {/* Inventory Section - Modified to show products, stones and services */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4">Inventory Overview</h2>
          
          {/* Products */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2 text-blue-600">Products</h3>
            {productInventory.products && productInventory.products.length > 0 ? (
              productInventory.products.map((product, index) => (
                <div key={`product-${index}`} className="flex items-center mb-2 pb-2 border-b">
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p>₹{formatCurrency(product.price)}</p>
                    <p className="text-xs text-green-500">{product.stock} Stock</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">No products available</p>
            )}
          </div>
          
          {/* Stones */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2 text-purple-600">Stones</h3>
            {productInventory.stones && productInventory.stones.length > 0 ? (
              productInventory.stones.map((stone, index) => (
                <div key={`stone-${index}`} className="flex items-center mb-2 pb-2 border-b">
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">{stone.name} ({stone.name_en})</p>
                    <p className="text-xs text-gray-500">SKU: {stone.sku} | Zodiac: {stone.zodiac}</p>
                  </div>
                  <div className="text-right">
                    <p>₹{formatCurrency(stone.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">No stones available</p>
            )}
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-md font-semibold mb-2 text-green-600">Services</h3>
            {productInventory.services && productInventory.services.length > 0 ? (
              productInventory.services.map((service, index) => (
                <div key={`service-${index}`} className="flex items-center mb-2 pb-2 border-b">
                  <div className="flex-grow">
                    <p className="text-sm font-semibold">{service.name_en}</p>
                    <p className="text-xs text-gray-500">SKU: {service.sku}</p>
                  </div>
                  <div className="text-right">
                    <p>₹{formatCurrency(service.price)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 italic">No services available</p>
            )}
          </div>
        </div>
      </div>

      {/* Top Selling Items and Customers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Top Selling Items - Combined Version */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Top Selling Items</h2>
            <span className="text-sm text-gray-500">{storePerformance.dateRange.formattedRange}</span>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b mb-4">
            <button className="px-4 py-2 border-b-2 border-blue-500 text-blue-500 font-medium">
              All Items
            </button>
          </div>
          
          {/* Combined Content */}
          {topSellingProducts.length > 0 || topSellingServices.length > 0 || topSellingStones.length > 0 ? (
            <div className="space-y-2">
              {/* Products */}
              {topSellingProducts.length > 0 && topSellingProducts.map((product, index) => (
                <div key={`product-${index}`} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded mr-2">Product</span>
                      <p className="text-sm font-semibold">{product.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{product.total_sold} units sold</p>
                  </div>
                  <p className="text-sm font-bold">₹{formatCurrency(product.total_revenue)}</p>
                </div>
              ))}
              
              {/* Services */}
              {topSellingServices && topSellingServices.length > 0 && topSellingServices.map((service, index) => (
                <div key={`service-${index}`} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded mr-2">Service</span>
                      <p className="text-sm font-semibold">{service.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{service.total_sold} bookings</p>
                  </div>
                  <p className="text-sm font-bold">₹{formatCurrency(service.total_revenue)}</p>
                </div>
              ))}
              
              {/* Stones */}
              {topSellingStones && topSellingStones.length > 0 && topSellingStones.map((stone, index) => (
                <div key={`stone-${index}`} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <div className="flex items-center">
                      <span className="bg-purple-100 text-purple-600 text-xs px-2 py-1 rounded mr-2">Stone</span>
                      <p className="text-sm font-semibold">{stone.name} ({stone.name_en})</p>
                    </div>
                    <p className="text-xs text-gray-500">{stone.total_carats_sold} carats sold</p>
                  </div>
                  <p className="text-sm font-bold">₹{formatCurrency(stone.total_revenue)}</p>
                </div>
              ))}
              
              {/* If all arrays are empty, show the empty state */}
              {topSellingProducts.length === 0 && 
               (!topSellingServices || topSellingServices.length === 0) && 
               (!topSellingStones || topSellingStones.length === 0) && (
                <EmptyStateCard type="product" />
              )}
            </div>
          ) : (
            <EmptyStateCard type="product" />
          )}
          
          {/* View all products link */}
          {(topSellingProducts.length > 0 || 
            (topSellingServices && topSellingServices.length > 0) || 
            (topSellingStones && topSellingStones.length > 0)) && (
            <div className="mt-4 flex justify-end">
              <a href="/admin/products" className="text-sm text-blue-500 flex items-center">
                View all products <MoveRight size={16} className="ml-1" />
              </a>
            </div>
          )}
        </div>

        {/* Top Customers */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Top Customers</h2>
            <span className="text-sm text-gray-500">{storePerformance.dateRange.formattedRange}</span>
          </div>
          
          {topCustomers.length > 0 ? (
            <div className="space-y-2">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold">{customer.name}</h3>
                        <p className="text-xs text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-700">₹{formatCurrency(customer.total_spent)}</p>
                    <p className="text-xs text-gray-500">{customer.order_count} Orders</p>
                  </div>
                </div>
              ))}
              
              {/* View all customers link */}
              <div className="mt-4 flex justify-end">
                <a href="/admin/clients" className="text-sm text-blue-500 flex items-center">
                  View all customers <MoveRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ) : (
            <EmptyStateCard type="customer" />
          )}
        </div>
      </div>
      
      {/* Sales Overview */}
      <div className="mt-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Sales Overview</h2>
            <div className="flex items-center">
              <Info size={16} className="text-gray-400 mr-1" />
              <span className="text-sm text-gray-500">Last 30 days</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                label: 'Total Revenue', 
                value: `₹${formatCurrency(summaryStats.totalSales)}`, 
                subtext: 'Across all channels',
                icon: '💵',
                color: 'bg-green-50 text-green-600'
              },
              { 
                label: 'Total Orders', 
                value: formatNumber(storePerformance.totals.orders), 
                subtext: `${storePerformance.totals.conversionRate} conversion`,
                icon: '📦',
                color: 'bg-blue-50 text-blue-600'
              },
              { 
                label: 'Average Order Value', 
                value: storePerformance.totals.orders > 0 ? 
                  `₹${formatCurrency(summaryStats.totalSales / storePerformance.totals.orders)}` : 
                  '₹0.00', 
                subtext: 'Per completed order',
                icon: '📈',
                color: 'bg-purple-50 text-purple-600'
              }
            ].map((item, index) => (
              <div key={index} className={`p-4 rounded-lg ${item.color} flex items-center`}>
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
    </div>
  );
}

// Reusable empty state component
function EmptyStateCard({ type }: { type: 'product' | 'customer' }) {
  return (
    <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-200 rounded-lg">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          <div className="bg-blue-100 p-3 rounded-full">
            <Plus className="text-blue-500" size={24} />
          </div>
        </div>
        <h3 className="text-sm font-semibold">
          {type === 'product' ? 'No items sold yet' : 'No customers yet'}
        </h3>
        <p className="text-xs text-gray-500">
          {type === 'product' 
            ? 'Start adding products and complete sales to see data' 
            : 'Customer data will appear as sales are made'}
        </p>
      </div>
    </div>
  );
}