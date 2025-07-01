'use client';

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { FaStar } from 'react-icons/fa';
import { format } from 'date-fns';

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
	const [replyInput, setReplyInput] = useState({});

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

	return (
		<div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-8 rounded-xl shadow text-white">
			<h1 className="text-3xl font-bold mb-6">⭐ Ratings & Reviews</h1>

			{/* Chart */}
			<div className="mb-6">
				<div className="bg-[#111] p-6 rounded-xl border border-[#222] w-full md:w-1/2">
					<h3 className="text-xl font-semibold mb-4">Ratings Breakdown</h3>
					<ResponsiveContainer width="100%" height={200}>
						<BarChart data={ratingsData}>
							<XAxis dataKey="stars" />
							<YAxis allowDecimals={false} />
							<Bar
								dataKey="count"
								fill="#a084ee"
								activeBar={false} // No hover effect at all
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Filters */}
			<div className="flex gap-4 flex-wrap mb-10">
				<select
					className="bg-[#1C1C1C] border border-gray-700 text-white px-4 py-2 rounded-lg"
					onChange={(e) => setSortOption(e.target.value)}
				>
					<option>Newest</option>
					<option>Oldest</option>
					<option>Highest Rated</option>
					<option>Lowest Rated</option>
				</select>
				<select
					className="bg-[#1C1C1C] border border-gray-700 text-white px-4 py-2 rounded-lg"
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
						className="bg-[#1C1C1C] border border-gray-700 p-6 rounded-xl"
					>
						<div className="flex justify-between items-center mb-2">
							<div className="flex items-center gap-2">
								<div className="flex gap-1">
									{Array.from({ length: review.rating }, (_, i) => (
										<FaStar key={i} className="text-purple-400 w-4 h-4" />
									))}
								</div>
								<span className="text-gray-400 text-sm">
									({review.rating}★)
								</span>
							</div>
							<span className="text-sm text-gray-400">
								{format(new Date(review.date), 'dd MMM yyyy')}
							</span>
						</div>
						<p className="mb-2">{review.review}</p>
						<div className="flex gap-2 flex-wrap mb-3">
							<span className="bg-[#333] text-xs px-3 py-1 rounded-full">
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

						{/* Reply Input */}
						<div>
							<textarea
								placeholder="Write a reply..."
								className="w-full bg-[#111] border border-gray-600 text-white rounded-lg p-2 mt-2 text-sm"
								rows={2}
								onChange={(e) =>
									setReplyInput((prev) => ({
										...prev,
										[review.id]: e.target.value,
									}))
								}
							/>
							<button className="mt-2 px-4 py-2 bg-gradient-to-r from-[#a084ee] to-[#a084ee] text-white rounded-lg text-sm">
								Reply
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ReviewsPage;
