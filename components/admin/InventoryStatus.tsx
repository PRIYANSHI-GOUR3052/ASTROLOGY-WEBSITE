import { useState } from 'react'
import { Package, AlertCircle, MoreVertical } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  category: string
  stock: number
  status: 'in_stock' | 'low_stock' | 'out_of_stock'
  lastUpdated: string
}

export default function InventoryStatus() {
  const [inventory] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Product A',
      category: 'Electronics',
      stock: 150,
      status: 'in_stock',
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      name: 'Product B',
      category: 'Accessories',
      stock: 5,
      status: 'low_stock',
      lastUpdated: '2024-03-14'
    },
    {
      id: '3',
      name: 'Product C',
      category: 'Electronics',
      stock: 0,
      status: 'out_of_stock',
      lastUpdated: '2024-03-13'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock':
        return 'bg-green-100 text-green-700'
      case 'low_stock':
        return 'bg-yellow-100 text-yellow-700'
      case 'out_of_stock':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Inventory Status</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock').length} alerts
          </span>
          <AlertCircle size={20} className="text-purple-600" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 font-medium">Category</th>
              <th className="pb-3 font-medium">Stock</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Last Updated</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <Package className="text-gray-400" size={20} />
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                </td>
                <td className="py-3 text-gray-500">{item.category}</td>
                <td className="py-3 text-gray-800">{item.stock}</td>
                <td className="py-3">
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(item.status)}`}>
                    {formatStatus(item.status)}
                  </span>
                </td>
                <td className="py-3 text-gray-500">
                  {new Date(item.lastUpdated).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-center">
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          View Full Inventory
        </button>
      </div>
    </div>
  )
} 