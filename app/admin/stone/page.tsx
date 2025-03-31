'use client';

import { useState } from 'react';
import { Plus, Edit, Trash, Search, Filter } from 'lucide-react';

export default function StonesPage() {
  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for form fields
  const [stoneName, setStoneName] = useState('');
  const [stoneNameEn, setStoneNameEn] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [zodiacEn, setZodiacEn] = useState('');
  const [benefits, setBenefits] = useState('');
  const [benefitsEn, setBenefitsEn] = useState('');
  const [pricePerCarat, setPricePerCarat] = useState('');

  // Sample stones data
  const stonesData = [
    { name: "रूबी", nameEn: "Ruby", zodiac: "सिंह", zodiacEn: "Leo", benefits: "आत्मविश्वास, नेतृत्व और जीवन शक्ति बढ़ाता है", benefitsEn: "Enhances confidence, leadership, and vitality", pricePerCarat: 15000 },
    { name: "मोती", nameEn: "Pearl", zodiac: "कर्क", zodiacEn: "Cancer", benefits: "भावनात्मक संतुलन और अंतर्ज्ञान को बढ़ावा देता है", benefitsEn: "Promotes emotional balance and intuition", pricePerCarat: 5000 },
    { name: "पन्ना", nameEn: "Emerald", zodiac: "वृषभ", zodiacEn: "Taurus", benefits: "विकास, धैर्य और कल्याण को प्रोत्साहित करता है", benefitsEn: "Encourages growth, patience, and wellbeing", pricePerCarat: 18000 },
    { name: "पुखराज", nameEn: "Yellow Sapphire", zodiac: "धनु", zodiacEn: "Sagittarius", benefits: "ज्ञान, समृद्धि और आशावाद लाता है", benefitsEn: "Brings wisdom, prosperity, and optimism", pricePerCarat: 12000 },
    { name: "हीरा", nameEn: "Diamond", zodiac: "मेष", zodiacEn: "Aries", benefits: "व्यक्तिगत शक्ति और स्पष्टता को बढ़ाता है", benefitsEn: "Amplifies personal power and clarity", pricePerCarat: 50000 },
  ];

  // Function to open modal
  const openModal = () => setIsModalOpen(true);

  // Function to close modal
  const closeModal = () => setIsModalOpen(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle the form submission here, like sending the data to an API.
    console.log({ 
      stoneName, 
      stoneNameEn, 
      zodiac, 
      zodiacEn, 
      benefits, 
      benefitsEn, 
      pricePerCarat 
    });
    closeModal(); // Close modal after submitting the form
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Stones (रत्न)</h2>
        <button
          onClick={openModal}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Stone
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search stones..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Stones Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stone Name (नाम)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Zodiac Sign (राशि)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Per Carat (₹)
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stonesData.map((stone, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{stone.nameEn} ({stone.name})</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{stone.zodiacEn} ({stone.zodiac})</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{stone.pricePerCarat.toLocaleString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding New Stone */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Add New Stone (नया रत्न जोड़ें)</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stone Name (Hindi)</label>
                    <input
                      type="text"
                      value={stoneName}
                      onChange={(e) => setStoneName(e.target.value)}
                      placeholder="रूबी"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stone Name (English)</label>
                    <input
                      type="text"
                      value={stoneNameEn}
                      onChange={(e) => setStoneNameEn(e.target.value)}
                      placeholder="Ruby"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Zodiac Sign (Hindi)</label>
                    <input
                      type="text"
                      value={zodiac}
                      onChange={(e) => setZodiac(e.target.value)}
                      placeholder="सिंह"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Zodiac Sign (English)</label>
                    <input
                      type="text"
                      value={zodiacEn}
                      onChange={(e) => setZodiacEn(e.target.value)}
                      placeholder="Leo"
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Benefits (Hindi)</label>
                  <textarea
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                    placeholder="आत्मविश्वास, नेतृत्व और जीवन शक्ति बढ़ाता है"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={2}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Benefits (English)</label>
                  <textarea
                    value={benefitsEn}
                    onChange={(e) => setBenefitsEn(e.target.value)}
                    placeholder="Enhances confidence, leadership, and vitality"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    rows={2}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price Per Carat (₹)</label>
                  <input
                    type="number"
                    value={pricePerCarat}
                    onChange={(e) => setPricePerCarat(e.target.value)}
                    placeholder="15000"
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Save Stone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}