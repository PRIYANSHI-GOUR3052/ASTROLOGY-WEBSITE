'use client';

import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  // Mock data for visitors and sales
  const visitorData = [
    { date: '26 Feb', visitors: 1, sales: 0 },
    { date: '27 Feb', visitors: 2, sales: 0 },
    { date: '28 Feb', visitors: 3, sales: 50 },
    { date: '01 Mar', visitors: 0, sales: 0 },
    { date: '02 Mar', visitors: 0, sales: 0 },
    { date: '03 Mar', visitors: 0, sales: 0 }
  ];

  const kundliProducts = [
    {
      image: '/path/to/natal-chart.jpg',
      name: 'Comprehensive Natal Chart Reading',
      sku: 'KUNDLI-NATAL-2024',
      price: 99.99,
      stock: 50
    },
    {
      image: '/path/to/compatibility-report.jpg',
      name: 'Marriage Compatibility Analysis',
      sku: 'KUNDLI-COMPAT-2024',
      price: 129.99,
      stock: 30
    },
    {
      image: '/path/to/career-forecast.jpg',
      name: 'Career Path Astrological Forecast',
      sku: 'KUNDLI-CAREER-2024',
      price: 79.99,
      stock: 75
    },
    {
      image: '/path/to/gem-recommendation.jpg',
      name: 'Gemstone Recommendation Report',
      sku: 'KUNDLI-GEMS-2024',
      price: 59.99,
      stock: 100
    },
    {
      image: '/path/to/annual-prediction.jpg',
      name: 'Annual Prediction and Guidance',
      sku: 'KUNDLI-ANNUAL-2024',
      price: 149.99,
      stock: 25
    }
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Hi Admin | Astrology Consultant</h1>
      </div>

      {/* Overall Details */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        {[
          { icon: '💰', label: 'Total Sales', value: '$340.96', change: '+5%' },
          { icon: '📋', label: 'Total Orders', value: '4', change: '+2%' },
          { icon: '👥', label: 'Total Customers', value: '12', change: '+3%' },
          { icon: '📊', label: 'Average Order Sale', value: '$85.24', change: '+4%' },
          { icon: '💳', label: 'Total Unpaid Invoices', value: '$0.00', change: '0' }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs text-gray-500">{item.label}</p>
            <h3 className="text-lg font-bold">{item.value}</h3>
            <p className="text-xs text-green-500">{item.change}</p>
          </div>
        ))}
      </div>

      {/* Today's Details */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[
          { icon: '💰', label: 'Today\'s Sales', value: '$129.99', change: '+10%' },
          { icon: '📋', label: 'Today\'s Orders', value: '2', change: '+1%' },
          { icon: '👥', label: 'Today\'s Customers', value: '3', change: '+2%' }
        ].map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <p className="text-xs text-gray-500">{item.label}</p>
            <h3 className="text-lg font-bold">{item.value}</h3>
            <p className="text-xs text-green-500">{item.change}</p>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* Stock Threshold */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-bold mb-4">Kundli Products Inventory</h2>
          {kundliProducts.map((product, index) => (
            <div key={index} className="flex items-center mb-2 pb-2 border-b">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-12 h-12 mr-4 object-cover rounded"
              />
              <div className="flex-grow">
                <p className="text-sm font-semibold">{product.name}</p>
                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">${product.price}</p>
                <p className="text-xs text-green-500">{product.stock} Stock</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visitors and Sales Charts */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Store Performance</h2>
            <div className="text-sm text-gray-500">26 Feb - 28 Mar</div>
          </div>
          
          {/* Dual Charts Container */}
          <div className="grid grid-cols-2 gap-2">
            {/* Visitors Chart */}
            <div>
              <p className="text-xs text-gray-500 text-center">Daily Visitors</p>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={visitorData}>
                  <XAxis dataKey="date" />
                  <Tooltip />
                  <Bar dataKey="visitors" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-500 text-center">6 Total Visitors (1 unique)</p>
            </div>

            {/* Sales Chart */}
            <div>
              <p className="text-xs text-gray-500 text-center">Daily Sales</p>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={visitorData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-gray-500 text-center">$340.96 Total Sales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg">
        <span>197:55</span>
        <p className="text-xs">Add related products on the go</p>
      </div>
    </div>
  );
}