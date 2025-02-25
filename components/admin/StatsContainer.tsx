import { Users, Eye, ShoppingBag, Mail } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  change: {
    value: number
    text: string
  }
  icon: React.ReactNode
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-gray-400">{icon}</div>
        <div className="text-sm font-medium text-gray-500">
          {change.value > 0 ? '↑' : '↓'} {change.text}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-1">{value.toLocaleString()}</h3>
      <p className="text-gray-500">{title}</p>
    </div>
  )
}

export default function StatsContainer() {
  const stats = [
    {
      title: 'Total Users',
      value: 2453,
      change: {
        value: 16,
        text: '16% increase this month'
      },
      icon: <Users size={24} />
    },
    {
      title: 'Daily Visitors',
      value: 342,
      change: {
        value: 8,
        text: '8% increase today'
      },
      icon: <Eye size={24} />
    },
    {
      title: 'Shop Items',
      value: 86,
      change: {
        value: -3,
        text: '3 items low in stock'
      },
      icon: <ShoppingBag size={24} />
    },
    {
      title: 'Unread Messages',
      value: 24,
      change: {
        value: -12,
        text: '12 pending for >24 hours'
      },
      icon: <Mail size={24} />
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
} 