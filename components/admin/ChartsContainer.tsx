import { useState } from 'react'

export default function ChartsContainer() {
  const [timeframe, setTimeframe] = useState('7')
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">User Growth</h2>
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm text-gray-600"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart will appear here
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Daily Visitors</h2>
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm text-gray-600"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chart will appear here
        </div>
      </div>
    </div>
  )
} 