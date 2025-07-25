'use client';
import React, { useState } from 'react';
import { Edit, Trash2, ChevronDown } from 'lucide-react';

const zodiacSigns = [
  { name: 'Aries', slug: 'aries' },
  { name: 'Taurus', slug: 'taurus' },
  { name: 'Gemini', slug: 'gemini' },
  { name: 'Cancer', slug: 'cancer' },
  { name: 'Leo', slug: 'leo' },
  { name: 'Virgo', slug: 'virgo' },
  { name: 'Libra', slug: 'libra' },
  { name: 'Scorpio', slug: 'scorpio' },
  { name: 'Sagittarius', slug: 'sagittarius' },
  { name: 'Capricorn', slug: 'capricorn' },
  { name: 'Aquarius', slug: 'aquarius' },
  { name: 'Pisces', slug: 'pisces' },
];



export default function ZodiacSignPage() {
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState<string | null>(null);

  const handleEdit = (idx: number) => {
    setEditIdx(idx);
    setEditName(zodiacSigns[idx].name);
    setEditImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditImage(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Zodiac Signs</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors">
          + Add Zodiac Sign
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200">NAME</th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {zodiacSigns.map((sign, idx) => (
              <tr key={sign.slug} className="border-b border-gray-100 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors">
                <td className="align-middle px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Image placeholder */}
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      <img
                        src={editIdx === idx && editImage ? editImage : "/placeholder-user.jpg"}
                        alt={sign.name + ' image'}
                        className="w-8 h-8 object-cover rounded-full"
                        style={{ display: 'block' }}
                      />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{sign.name}</span>
                  </div>
                </td>
                <td className="align-middle px-6 py-4">
                  <div className="flex gap-3">
                    <button
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit"
                      onClick={() => handleEdit(idx)}
                    >
                      <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                    <button
                      className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Delete"
                      onClick={() => setDeleteIdx(idx)}
                    >
                      <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Are you sure you want to delete?</h2>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold"
                onClick={() => setDeleteIdx(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={() => setDeleteIdx(null)}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Edit Zodiac Sign</h2>
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mb-2">
                <img
                  src={editImage || "/placeholder-user.jpg"}
                  alt="Edit zodiac image"
                  className="w-16 h-16 object-cover rounded-full"
                  style={{ display: 'block' }}
                />
              </div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 cursor-pointer">
                <span className="underline">Edit Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zodiac Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold"
                onClick={() => setEditIdx(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                onClick={() => setEditIdx(null)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
