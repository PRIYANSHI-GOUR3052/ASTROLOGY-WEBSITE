import { useState } from 'react'
import { MoreVertical, Mail } from 'lucide-react'

interface ContactRequest {
  id: string
  name: string
  email: string
  subject: string
  date: string
  status: 'pending' | 'responded' | 'closed'
}

export default function ContactRequests() {
  const [requests] = useState<ContactRequest[]>([
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      subject: 'Product Inquiry',
      date: '2024-03-15',
      status: 'pending'
    },
    {
      id: '2',
      name: 'Mike Brown',
      email: 'mike@example.com',
      subject: 'Support Request',
      date: '2024-03-14',
      status: 'responded'
    },
    {
      id: '3',
      name: 'Emma Davis',
      email: 'emma@example.com',
      subject: 'Feedback',
      date: '2024-03-13',
      status: 'closed'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'responded':
        return 'bg-green-100 text-green-700'
      case 'closed':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Contact Requests</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {requests.filter(r => r.status === 'pending').length} pending
          </span>
          <Mail size={20} className="text-purple-600" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Subject</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} className="border-b last:border-b-0">
                <td className="py-3">
                  <div>
                    <p className="font-medium text-gray-800">{request.name}</p>
                    <p className="text-sm text-gray-500">{request.email}</p>
                  </div>
                </td>
                <td className="py-3 text-gray-800">{request.subject}</td>
                <td className="py-3 text-gray-500">
                  {new Date(request.date).toLocaleDateString()}
                </td>
                <td className="py-3">
                  <span className={`px-3 py-1 text-sm rounded-full capitalize ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
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
          View All Requests
        </button>
      </div>
    </div>
  )
} 