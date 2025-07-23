'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Trash, Search, Filter } from 'lucide-react';

// Define TypeScript interfaces
interface Stone {
  id: number;
  name: string;
  name_en: string;
  zodiac: string;
  zodiac_en: string;
  benefits: string;
  benefits_en: string;
  price_per_carat: number;
}

export default function StonesPage() {
  // State for managing modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentStoneId, setCurrentStoneId] = useState<number | null>(null);
  
  // State for stones data
  const [stones, setStones] = useState<Stone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // State for form fields
  const [stoneName, setStoneName] = useState('');
  const [stoneNameEn, setStoneNameEn] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [zodiacEn, setZodiacEn] = useState('');
  const [benefits, setBenefits] = useState('');
  const [benefitsEn, setBenefitsEn] = useState('');
  const [pricePerCarat, setPricePerCarat] = useState('');

  // Fetch stones data
  useEffect(() => {
    fetchStones();
  }, []);

  const fetchStones = async (search = '') => {
    try {
      setLoading(true);
      const url = search 
        ? `/api/products/stones?search=${encodeURIComponent(search)}`
        : '/api/products/stones';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch stones');
      }
      
      const data = await response.json();
      setStones(data.stones);
      setError('');
    } catch (err) {
      setError('Error loading stones. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = () => {
    fetchStones(searchQuery);
  };

  // Function to open modal for adding new stone
  const openAddModal = () => {
    resetForm();
    setIsEditMode(false);
    setCurrentStoneId(null);
    setIsModalOpen(true);
  };

  // Function to open modal for editing a stone
  const openEditModal = async (stoneId: number) => {
    try {
      const response = await fetch(`/api/products/stones/${stoneId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch stone details');
      }
      
      const { stone } = await response.json();
      
      // Populate form with stone data
      setStoneName(stone.name);
      setStoneNameEn(stone.name_en);
      setZodiac(stone.zodiac);
      setZodiacEn(stone.zodiac_en);
      setBenefits(stone.benefits);
      setBenefitsEn(stone.benefits_en);
      setPricePerCarat(stone.price_per_carat.toString());
      
      setIsEditMode(true);
      setCurrentStoneId(stoneId);
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('Error fetching stone details');
    }
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setStoneName('');
    setStoneNameEn('');
    setZodiac('');
    setZodiacEn('');
    setBenefits('');
    setBenefitsEn('');
    setPricePerCarat('');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const stoneData = {
      stoneName,
      stoneNameEn,
      zodiac,
      zodiacEn,
      benefits,
      benefitsEn,
      pricePerCarat
    };
    
    try {
      let response;
      
      if (isEditMode && currentStoneId) {
        // Update existing stone
        response = await fetch(`/api/products/stones/${currentStoneId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stoneData)
        });
      } else {
        // Add new stone
        response = await fetch('/api/products/stones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stoneData)
        });
      }
      
      if (!response.ok) {
        throw new Error('Failed to save stone');
      }
      
      // Refresh the stones list
      fetchStones();
      closeModal();
      alert(isEditMode ? 'Stone updated successfully' : 'Stone added successfully');
    } catch (err) {
      console.error(err);
      alert('Error saving stone. Please try again.');
    }
  };

  // Handle stone deletion
  const handleDeleteStone = async (stoneId: number) => {
    if (!confirm('Are you sure you want to delete this stone?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/products/stones/${stoneId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete stone');
      }
      
      // Refresh the stones list
      fetchStones();
      alert('Stone deleted successfully');
    } catch (err) {
      console.error(err);
      alert('Error deleting stone. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Stones (रत्न)</h2>
        <button
          onClick={openAddModal}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button 
          onClick={handleSearch}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-4">Loading stones...</div>
      ) : (
        /* Stones Table */
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {stones.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No stones found. Add your first stone by clicking the &quot;Add New Stone&quot; button.
            </div>
          ) : (
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
                {stones.map((stone) => (
                  <tr key={stone.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {stone.name_en} ({stone.name})
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {stone.zodiac_en} ({stone.zodiac})
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ₹{parseFloat(stone.price_per_carat.toString()).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => openEditModal(stone.id)}
                        className="text-blue-600 hover:text-blue-900 mr-2"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStone(stone.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Modal for Adding/Editing Stone */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? 'Edit Stone (रत्न संपादित करें)' : 'Add New Stone (नया रत्न जोड़ें)'}
            </h3>
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
                  {isEditMode ? 'Update Stone' : 'Save Stone'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}