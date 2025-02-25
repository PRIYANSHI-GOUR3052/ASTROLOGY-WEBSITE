import { useState } from 'react'
import { MoreVertical, UserPlus } from 'lucide-react'
import Image from 'next/image'

interface User {
  id: string
  name: string
  email: string
  role: string
  joinDate: string
  avatar: string
}

export default function RecentUsers() {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Customer',
      joinDate: '2024-03-15',
      avatar: 'https://via.placeholder.com/40'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Customer',
      joinDate: '2024-03-14',
      avatar: 'https://via.placeholder.com/40'
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Customer',
      joinDate: '2024-03-13',
      avatar: 'https://via.placeholder.com/40'
    }
  ])

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Recent Users</h2>
        <button className="text-purple-600 hover:text-purple-700 flex items-center gap-2">
          <UserPlus size={20} />
          <span>Add User</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium">User</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Join Date</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-b-0">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3">
                  <span className="px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-700">
                    {user.role}
                  </span>
                </td>
                <td className="py-3 text-gray-500">
                  {new Date(user.joinDate).toLocaleDateString()}
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
          View All Users
        </button>
      </div>
    </div>
  )
} 