'use client';

import { Plus, Search, Filter, BookOpen, Clock, Users, Star } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Course
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Vedic Astrology Fundamentals',
            description: 'Learn the basics of Vedic astrology and planetary positions',
            duration: '8 weeks',
            students: 45,
            rating: 4.8,
            image: '/courses/vedic-astrology.jpg'
          },
          {
            title: 'Advanced Kundli Reading',
            description: 'Master the art of reading and interpreting birth charts',
            duration: '12 weeks',
            students: 32,
            rating: 4.9,
            image: '/courses/kundli-reading.jpg'
          },
          {
            title: 'Career Astrology',
            description: 'Understand career prospects through astrological analysis',
            duration: '10 weeks',
            students: 38,
            rating: 4.7,
            image: '/courses/career-astrology.jpg'
          }
        ].map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">{course.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-2" />
                  {course.students} students
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  {course.rating} / 5.0
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors">
                  Edit
                </button>
                <button className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 