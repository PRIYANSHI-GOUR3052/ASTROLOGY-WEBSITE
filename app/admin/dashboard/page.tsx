'use client';

import { 
  Users, 
  BookOpen, 
  MessageCircle, 
  Calendar 
} from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Clients */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
          <Users className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Total Clients</p>
            <h3 className="text-2xl font-bold">847</h3>
          </div>
        </div>

        {/* Active Courses */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Active Courses</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </div>

        {/* Unread Messages */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
          <MessageCircle className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Unread Messages</p>
            <h3 className="text-2xl font-bold">23</h3>
          </div>
        </div>

        {/* Today's Consultations */}
        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center space-x-4">
          <Calendar className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Today's Consultations</p>
            <h3 className="text-2xl font-bold">8</h3>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { 
                title: 'New consultation booking', 
                time: '10 minutes ago', 
                type: 'consultation' 
              },
              { 
                title: 'Course enrollment: Vedic Astrology', 
                time: '1 hour ago', 
                type: 'course' 
              },
              { 
                title: 'New client registration', 
                time: '3 hours ago', 
                type: 'registration' 
              }
            ].map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 
                bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-2 h-2 rounded-full 
                    ${activity.type === 'consultation' ? 'bg-purple-500' : 
                      activity.type === 'course' ? 'bg-blue-500' : 'bg-green-500'}
                  `}></div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
                <button className="text-xs text-blue-600 hover:underline">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Consultations */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Today's Consultations</h2>
          <div className="space-y-4">
            {[
              { 
                client: 'Rahul Sharma', 
                type: 'Kundli Reading', 
                time: '11:00 AM' 
              },
              { 
                client: 'Priya Patel', 
                type: 'Career Consultation', 
                time: '2:30 PM' 
              },
              { 
                client: 'Amit Kumar', 
                type: 'Marriage Compatibility', 
                time: '4:00 PM' 
              }
            ].map((consultation, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 
                bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-sm">{consultation.client}</p>
                  <p className="text-xs text-gray-500">
                    {consultation.type} - {consultation.time}
                  </p>
                </div>
                <button className="text-xs text-blue-600 hover:underline">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}