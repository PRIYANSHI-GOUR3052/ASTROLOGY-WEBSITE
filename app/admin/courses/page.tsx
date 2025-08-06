'use client';


import { useState } from 'react';
import { Plus, Search, Filter, BookOpen, Clock, Users, Star, X } from 'lucide-react';

export default function CoursesPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: 1,
    image: '',
    price: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (name === 'duration') {
      setForm({ ...form, duration: Math.max(1, Number(value)) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((prev) => ({ ...prev, image: ev.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would handle the course creation logic
    setShowModal(false);
    setForm({ title: '', description: '', duration: 1, image: '', price: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Courses</h2>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-5 h-5" />
          Add New Course
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-[#0B1120] rounded-2xl shadow-2xl w-full max-w-md p-4 sm:p-6 relative border border-purple-200 dark:border-[#334155] animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-purple-700 dark:text-white mb-4 text-center">Create New Course</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image upload */}
              <div className="flex flex-col items-center mb-2">
                <label htmlFor="image-upload" className="cursor-pointer w-full block">
                  {form.image ? (
                    <img src={form.image} alt="Course" className="w-full h-32 object-cover rounded-lg border-2 border-dashed border-purple-400 transition-all" />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-[#1e293b] rounded-lg border-2 border-dashed border-purple-400 transition-all">
                      <span className="text-gray-400">Click to add image</span>
                    </div>
                  )}
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows={2}
                  required
                />
              </div>
              {/* Duration stepper */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Duration (weeks)</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-lg border border-purple-300 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-800"
                    onClick={() => setForm((prev) => ({ ...prev, duration: Math.max(1, prev.duration - 1) }))}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    name="duration"
                    value={form.duration}
                    min={1}
                    onChange={handleChange}
                    className="w-16 text-center px-2 py-2 rounded-lg border border-gray-300 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <button
                    type="button"
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 rounded-lg border border-purple-300 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-800"
                    onClick={() => setForm((prev) => ({ ...prev, duration: prev.duration + 1 }))}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* Price input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1">Price (INR)</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-[#334155] bg-white dark:bg-[#1e293b] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="e.g. 1999"
                  min={0}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition-colors mt-2 shadow-lg"
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg bg-white dark:bg-[#0B1120] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-5000"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e293b] text-gray-800 dark:text-gray-100">
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
            image: '/courses/vedic-astrology.jpg',
            price: 1999
          },
          {
            title: 'Advanced Kundli Reading',
            description: 'Master the art of reading and interpreting birth charts',
            duration: '12 weeks',
            students: 32,
            rating: 4.9,
            image: '/courses/kundli-reading.jpg',
            price: 2499
          },
          {
            title: 'Career Astrology',
            description: 'Understand career prospects through astrological analysis',
            duration: '10 weeks',
            students: 38,
            rating: 4.7,
            image: '/courses/career-astrology.jpg',
            price: 1799
          }
        ].map((course, index) => (
          <div key={index} className="bg-white dark:bg-[#0B1120] border border-gray-200 dark:border-[#1f2937] rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-gray-200 dark:bg-[#1e293b] relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-300">₹{course.price}</p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Star className="w-4 h-4 mr-2 text-yellow-400" />
                  {course.rating} / 5.0
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-2" />
                  {course.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Users className="w-4 h-4 mr-2" />
                  {course.students} students
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-4 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors">
                  Edit
                </button>
                <button className="flex-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
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