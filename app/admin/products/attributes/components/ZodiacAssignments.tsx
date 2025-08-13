'use client';
import React, { useState, useEffect } from 'react';
import { Check, X, Plus, Filter, Search } from 'lucide-react';
import { Attribute, ZodiacSign, ZodiacAttribute } from '../types';

interface ZodiacAssignmentsProps {
  attributes: Attribute[];
  zodiacSigns: ZodiacSign[];
  loading: boolean;
}

export default function ZodiacAssignments({ attributes, zodiacSigns, loading }: ZodiacAssignmentsProps) {
  const [assignments, setAssignments] = useState<ZodiacAttribute[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkSelection, setBulkSelection] = useState<{
    attributeIds: number[];
    zodiacIds: number[];
    isRequired: boolean;
    sortOrder: number;
  }>({
    attributeIds: [],
    zodiacIds: [],
    isRequired: false,
    sortOrder: 0
  });

  // Fetch zodiac attribute assignments from API
  useEffect(() => {
    fetchZodiacAssignments();
  }, []);

  const fetchZodiacAssignments = async () => {
    try {
      const response = await fetch('/api/zodiac-attributes');
      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
      }
    } catch (error) {
      console.error('Error fetching zodiac assignments:', error);
    }
  };

  const getZodiacAssignments = (zodiacId: number) => {
    return assignments
      .filter(assignment => assignment.zodiac_id === zodiacId)
      .map(assignment => {
        const attribute = attributes.find(attr => attr.id === assignment.attribute_id);
        return { ...assignment, attribute };
      })
      .filter(item => item.attribute) // Filter out any assignments with missing attributes
      .sort((a, b) => a.sort_order - b.sort_order);
  };

  const isAssigned = (zodiacId: number, attributeId: number) => {
    return assignments.some(assignment => 
      assignment.zodiac_id === zodiacId && assignment.attribute_id === attributeId
    );
  };

  const getAssignment = (zodiacId: number, attributeId: number) => {
    return assignments.find(assignment => 
      assignment.zodiac_id === zodiacId && assignment.attribute_id === attributeId
    );
  };

  const handleAssign = async (zodiacId: number, attributeId: number, isRequired: boolean = false, sortOrder: number = 0) => {
    try {
      const response = await fetch('/api/zodiac-attributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zodiac_id: zodiacId,
          attribute_id: attributeId,
          is_required: isRequired,
          sort_order: sortOrder
        })
      });

      if (response.ok) {
        const newAssignment = await response.json();
        setAssignments(prev => [...prev, newAssignment]);
      } else {
        throw new Error('Failed to assign attribute to zodiac sign');
      }
    } catch (error) {
      console.error('Error assigning attribute to zodiac sign:', error);
    }
  };

  const handleUnassign = async (zodiacId: number, attributeId: number) => {
    try {
      const assignment = getAssignment(zodiacId, attributeId);
      if (!assignment) return;

      const response = await fetch(`/api/zodiac-attributes/${assignment.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAssignments(prev => 
          prev.filter(a => a.id !== assignment.id)
        );
      } else {
        throw new Error('Failed to unassign attribute from zodiac sign');
      }
    } catch (error) {
      console.error('Error unassigning attribute from zodiac sign:', error);
    }
  };

  const handleUpdateAssignment = async (zodiacId: number, attributeId: number, updates: Partial<ZodiacAttribute>) => {
    try {
      const assignment = getAssignment(zodiacId, attributeId);
      if (!assignment) return;

      const response = await fetch('/api/zodiac-attributes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignments: [{
            id: assignment.id,
            ...updates
          }]
        })
      });

      if (response.ok) {
        const updatedAssignments = await response.json();
        setAssignments(prev => 
          prev.map(a => 
            a.id === assignment.id ? updatedAssignments[0] : a
          )
        );
      } else {
        throw new Error('Failed to update assignment');
      }
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  const handleBulkAssign = async () => {
    try {
      const assignmentsToCreate: Array<{
        zodiac_id: number;
        attribute_id: number;
        is_required: boolean;
        sort_order: number;
      }> = [];
      
      bulkSelection.zodiacIds.forEach(zodiacId => {
        bulkSelection.attributeIds.forEach(attributeId => {
          // Check if assignment already exists
          if (!isAssigned(zodiacId, attributeId)) {
            assignmentsToCreate.push({
              zodiac_id: zodiacId,
              attribute_id: attributeId,
              is_required: bulkSelection.isRequired,
              sort_order: bulkSelection.sortOrder
            });
          }
        });
      });

      // Create assignments one by one (or implement a bulk endpoint)
      for (const assignment of assignmentsToCreate) {
        const response = await fetch('/api/zodiac-attributes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(assignment)
        });

        if (response.ok) {
          const newAssignment = await response.json();
          setAssignments(prev => [...prev, newAssignment]);
        }
      }

      setShowBulkModal(false);
      setBulkSelection({ attributeIds: [], zodiacIds: [], isRequired: false, sortOrder: 0 });
    } catch (error) {
      console.error('Error bulk assigning attributes:', error);
    }
  };

  const filteredZodiacSigns = zodiacSigns.filter(zodiac =>
    zodiac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    zodiac.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Zodiac Sign Assignments
        </h2>
        <button
          onClick={() => setShowBulkModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Bulk Assign
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search zodiac signs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Zodiac Signs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredZodiacSigns.map(zodiac => (
          <div key={zodiac.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                {zodiac.image_url && (
                  <img 
                    src={zodiac.image_url} 
                    alt={zodiac.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {zodiac.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {zodiac.slug}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {attributes.map(attribute => {
                  const assigned = isAssigned(zodiac.id, attribute.id);
                  const assignment = getAssignment(zodiac.id, attribute.id);

                  return (
                    <div key={attribute.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {attribute.name}
                          </span>
                          {assignment?.is_required && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {attribute.type} • Sort: {assignment?.sort_order || 0}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {assigned ? (
                          <>
                            <button
                              onClick={() => handleUpdateAssignment(zodiac.id, attribute.id, { 
                                is_required: !assignment?.is_required 
                              })}
                              className={`text-xs px-2 py-1 rounded ${
                                assignment?.is_required
                                  ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                  : 'bg-green-100 text-green-800 hover:bg-green-200'
                              }`}
                            >
                              {assignment?.is_required ? 'Required' : 'Optional'}
                            </button>
                            <button
                              onClick={() => handleUnassign(zodiac.id, attribute.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              title="Remove assignment"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleAssign(zodiac.id, attribute.id)}
                            className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                            title="Assign attribute"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {getZodiacAssignments(zodiac.id).length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No attributes assigned
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredZodiacSigns.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            {searchTerm ? 'No zodiac signs found matching your search.' : 'No zodiac signs found.'}
          </div>
        </div>
      )}

      {/* Bulk Assignment Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Bulk Assign Attributes to Zodiac Signs
              </h3>

              <div className="space-y-6">
                {/* Select Attributes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Attributes
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                    {attributes.map(attribute => (
                      <label key={attribute.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={bulkSelection.attributeIds.includes(attribute.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBulkSelection(prev => ({
                                ...prev,
                                attributeIds: [...prev.attributeIds, attribute.id]
                              }));
                            } else {
                              setBulkSelection(prev => ({
                                ...prev,
                                attributeIds: prev.attributeIds.filter(id => id !== attribute.id)
                              }));
                            }
                          }}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {attribute.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Select Zodiac Signs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Zodiac Signs
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                    {zodiacSigns.map(zodiac => (
                      <label key={zodiac.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={bulkSelection.zodiacIds.includes(zodiac.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBulkSelection(prev => ({
                                ...prev,
                                zodiacIds: [...prev.zodiacIds, zodiac.id]
                              }));
                            } else {
                              setBulkSelection(prev => ({
                                ...prev,
                                zodiacIds: prev.zodiacIds.filter(id => id !== zodiac.id)
                              }));
                            }
                          }}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {zodiac.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="bulk_required_zodiac"
                      checked={bulkSelection.isRequired}
                      onChange={(e) => setBulkSelection(prev => ({ ...prev, isRequired: e.target.checked }))}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="bulk_required_zodiac" className="ml-2 block text-sm text-gray-900 dark:text-white">
                      Mark as Required
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={bulkSelection.sortOrder}
                      onChange={(e) => setBulkSelection(prev => ({ ...prev, sortOrder: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowBulkModal(false);
                    setBulkSelection({ attributeIds: [], zodiacIds: [], isRequired: false, sortOrder: 0 });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkAssign}
                  disabled={bulkSelection.attributeIds.length === 0 || bulkSelection.zodiacIds.length === 0}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-gray-400"
                >
                  Assign Attributes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
