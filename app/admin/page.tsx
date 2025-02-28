'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { Users, Star, BookOpen, MessageSquare, Calendar, Clock } from 'lucide-react';

const DashboardLayout = dynamic(() => import('../../components/layouts/DashboardLayout'), {
  ssr: false
});

const AdminDashboard: FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nakshatra Gyaan Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome to your spiritual administration center</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Clients */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <h3 className="text-2xl font-bold text-gray-900">847</h3>
              </div>
            </div>
          </div>

          {/* Upcoming Consultations */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Consultations</p>
                <h3 className="text-2xl font-bold text-gray-900">12</h3>
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <h3 className="text-2xl font-bold text-gray-900">8</h3>
              </div>
            </div>
          </div>

          {/* Unread Messages */}
          <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Unread Messages</p>
                <h3 className="text-2xl font-bold text-gray-900">23</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity & Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { title: 'New consultation booking', time: '10 minutes ago', type: 'consultation' },
                { title: 'Course enrollment: "Vedic Astrology Basics"', time: '1 hour ago', type: 'course' },
                { title: 'New horoscope request', time: '2 hours ago', type: 'horoscope' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      item.type === 'consultation' ? 'bg-purple-600' :
                      item.type === 'course' ? 'bg-blue-600' : 'bg-green-600'
                    }`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                  <span className="text-xs text-royal-gold hover:text-royal-gold-dark cursor-pointer">View</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Consultations */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Today's Consultations</h2>
            <div className="space-y-4">
              {[
                { client: 'Rahul Sharma', time: '11:00 AM', type: 'Kundli Reading' },
                { client: 'Priya Patel', time: '2:30 PM', type: 'Career Consultation' },
                { client: 'Amit Kumar', time: '4:00 PM', type: 'Marriage Compatibility' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-royal-gold/10 rounded-lg">
                      <Clock className="w-4 h-4 text-royal-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.client}</p>
                      <p className="text-xs text-gray-500">{item.type} - {item.time}</p>
                    </div>
                  </div>
                  <span className="text-xs text-royal-gold hover:text-royal-gold-dark cursor-pointer">Join</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;