'use client';

import { Search, Filter, Star, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reviews</h2>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search reviews..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg bg-white dark:bg-[#0B1120] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-5000"
        />
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {[
          {
            name: 'Rahul Sharma',
            rating: 5,
            date: 'Feb 15, 2024',
            course: 'Vedic Astrology Fundamentals',
            comment: 'Excellent course! The instructor explained complex concepts in a simple way. Highly recommended for beginners.',
            likes: 12,
            dislikes: 0
          },
          {
            name: 'Priya Patel',
            rating: 4,
            date: 'Feb 10, 2024',
            course: 'Advanced Kundli Reading',
            comment: 'Good course overall. The practical examples were very helpful. Would have liked more case studies.',
            likes: 8,
            dislikes: 2
          },
          {
            name: 'Amit Kumar',
            rating: 5,
            date: 'Feb 5, 2024',
            course: 'Career Astrology',
            comment: 'This course completely changed my perspective on career planning. The birth chart analysis was eye-opening.',
            likes: 15,
            dislikes: 0
          }
        ].map((review, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm rounded-lg overflow-hidden p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.course}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">{review.comment}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-green-600">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{review.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">{review.dislikes}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 