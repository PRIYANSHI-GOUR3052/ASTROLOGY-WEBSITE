'use client';

import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';
import { HiOutlineStar } from 'react-icons/hi';

const dummyReviews = [
  {
    id: 1,
    rating: 5,
    review: 'Very insightful session.',
    context: 'Career',
    date: '2024-06-10',
    sentiment: 'Positive',
  },
  {
    id: 2,
    rating: 4,
    review: 'Good but can improve timing.',
    context: 'Marriage',
    date: '2024-06-12',
    sentiment: 'Neutral',
  },
  {
    id: 3,
    rating: 3,
    review: 'Average consultation.',
    context: 'Health',
    date: '2024-06-15',
    sentiment: 'Neutral',
  },
  {
    id: 4,
    rating: 5,
    review: 'Amazing experience!',
    context: 'Vastu',
    date: '2024-06-18',
    sentiment: 'Positive',
  },
  {
    id: 5,
    rating: 2,
    review: 'Didn’t feel connected.',
    context: 'Love',
    date: '2024-06-20',
    sentiment: 'Negative',
  },
];

const ratingsData = [
  { stars: '5★', count: 2 },
  { stars: '4★', count: 1 },
  { stars: '3★', count: 1 },
  { stars: '2★', count: 1 },
  { stars: '1★', count: 0 },
];

const ReviewsPage = () => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState('Newest');

  const handleSort = (a: any, b: any) => {
    if (sortOption === 'Highest Rated') return b.rating - a.rating;
    if (sortOption === 'Lowest Rated') return a.rating - b.rating;
    if (sortOption === 'Newest')
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  };

  const filteredReviews = dummyReviews
    .filter((r) => (selectedRating ? r.rating === selectedRating : true))
    .sort(handleSort);

  const getAverageRating = (data: typeof ratingsData) => {
    let total = 0,
      count = 0;
    data.forEach((r) => {
      total += parseInt(r.stars) * r.count;
      count += r.count;
    });
    return count ? (total / count).toFixed(1) : '0.0';
  };
  const getTotalRatings = (data: typeof ratingsData) =>
    data.reduce((sum, r) => sum + r.count, 0);

  const maxCount = Math.max(...ratingsData.map((r) => r.count));
  const averageRating = getAverageRating(ratingsData);
  const totalRatings = getTotalRatings(ratingsData);

  return (
    <div className="w-full min-h-screen bg-[#FFF5E1] dark:bg-black p-8 rounded-xl shadow text-gray-900 dark:text-white">
      <div className="flex items-center gap-2 text-3xl font-bold mb-6">
  
  Ratings & Reviews
</div>



      {/* Ratings Summary */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        {/* Average Rating */}
        <div className="flex flex-col items-center md:items-start min-w-[120px]">
          <span className="text-5xl font-bold">{averageRating}</span>
          <div className="flex items-center my-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(Number(averageRating))
                    ? 'text-amber-500 dark:text-purple-500'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {totalRatings.toLocaleString()} ratings
          </span>
        </div>

        {/* Ratings Breakdown Bars */}
        <div className="flex-1 flex flex-col gap-2 w-full max-w-md">
          {[5, 4, 3, 2, 1].map((star) => {
            const item = ratingsData.find((r) => parseInt(r.stars) === star);
            const percent = maxCount ? (item?.count || 0) / maxCount : 0;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="w-4 text-sm">{star}</span>
                <div className="flex-1 h-3 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500 dark:bg-purple-500 transition-all"
                    style={{ width: `${percent * 100}%` }}
                  />
                </div>
                <span className="w-6 text-xs text-gray-600 dark:text-gray-400 text-right">
                  {item?.count || 0}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap mb-10">
        <select
          className="bg-white dark:bg-[#1C1C1C] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option>Newest</option>
          <option>Oldest</option>
          <option>Highest Rated</option>
          <option>Lowest Rated</option>
        </select>
        <select
          className="bg-white dark:bg-[#1C1C1C] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg"
          onChange={(e) => setSelectedRating(Number(e.target.value) || null)}
        >
          <option value="">All Ratings</option>
          <option value="5">5★</option>
          <option value="4">4★</option>
          <option value="3">3★</option>
          <option value="2">2★</option>
          <option value="1">1★</option>
        </select>
      </div>

      {/* Reviews */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-midnight-black border border-gray-300 dark:border-gray-700 p-6 rounded-xl"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }, (_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-amber-500 dark:text-purple-500" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  ({review.rating}★)
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {format(new Date(review.date), 'dd MMM yyyy')}
              </span>
            </div>
            <p className="mb-2">{review.review}</p>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="bg-gray-200 dark:bg-[#333] text-xs text-gray-800 dark:text-white px-3 py-1 rounded-full">
                #{review.context}
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  review.sentiment === 'Positive'
                    ? 'bg-green-700 text-green-200'
                    : review.sentiment === 'Neutral'
                    ? 'bg-yellow-700 text-yellow-200'
                    : 'bg-red-700 text-red-200'
                }`}
              >
                {review.sentiment}
              </span>
            </div>

            <button className="mt-2 px-4 py-2 bg-amber-500 dark:bg-purple-500 text-white rounded-lg text-sm hover:brightness-110 transition">
              Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
