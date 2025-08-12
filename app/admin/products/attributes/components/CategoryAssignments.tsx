'use client';
import React, { useState, useEffect } from 'react';
import { Check, X, Plus, Filter, Search } from 'lucide-react';
import { Attribute, Category, CategoryAttribute } from '../types';

interface CategoryAssignmentsProps {
  attributes: Attribute[];
  categories: Category[];
  loading: boolean;
}

export default function CategoryAssignments({ attributes, categories, loading }: CategoryAssignmentsProps) {
  const [assignments, setAssignments] = useState<CategoryAttribute[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkSelection, setBulkSelection] = useState<{
    attributeIds: number[];
    categoryIds: number[];
    isRequired: boolean;
    sortOrder: number;
  }>({
    attributeIds: [],
    categoryIds: [],
    isRequired: false,
    sortOrder: 0
  });

  // Fetch category attribute assignments from API
  useEffect(() => {
    fetchCategoryAssignments();
  }, []);

  const fetchCategoryAssignments = async () => {
    try {
      const response = await fetch('/api/category-attributes');
      if (response.ok) {
        const data = await response.json();
        setAssignments(data);
      }
    } catch (error) {
      console.error('Error fetching category assignments:', error);
    }
  };

  const getCategoryAssignments = (categoryId: number) => {
    return assignments
      .filter(assignment => assignment.category_id === categoryId)
      .map(assignment => {
        const attribute = attributes.find(attr => attr.id === assignment.attribute_id);
        return { ...assignment, attribute };
      })
      .filter(item => item.attribute) // Filter out any assignments with missing attributes
      .sort((a, b) => a.sort_order - b.sort_order);
  };

  const isAssigned = (categoryId: number, attributeId: number) => {
    return assignments.some(assignment => 
      assignment.category_id === categoryId && assignment.attribute_id === attributeId
    );
  };

  const getAssignment = (categoryId: number, attributeId: number) => {
    return assignments.find(assignment => 
      assignment.category_id === categoryId && assignment.attribute_id === attributeId
    );
  };

  const handleAssign = async (categoryId: number, attributeId: number, isRequired: boolean = false, sortOrder: number = 0) => {
    try {
      const response = await fetch('/api/category-attributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_id: categoryId,
          attribute_id: attributeId,
          is_required: isRequired,
          sort_order: sortOrder
        })
      });

      if (response.ok) {
        const newAssignment = await response.json();
        setAssignments(prev => [...prev, newAssignment]);
      } else {
        throw new Error('Failed to assign attribute to category');
      }
    } catch (error) {
      console.error('Error assigning attribute to category:', error);
    }
  };

  const handleUnassign = async (categoryId: number, attributeId: number) => {
    try {
      const assignment = getAssignment(categoryId, attributeId);
      if (!assignment) return;

      const response = await fetch(`/api/category-attributes/${assignment.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAssignments(prev => 
          prev.filter(a => a.id !== assignment.id)
        );
      } else {
        throw new Error('Failed to unassign attribute from category');
      }
    } catch (error) {
      console.error('Error unassigning attribute from category:', error);
    }
  };

  const handleUpdateAssignment = async (categoryId: number, attributeId: number, updates: Partial<CategoryAttribute>) => {
    try {
      const assignment = getAssignment(categoryId, attributeId);
      if (!assignment) return;

      const response = await fetch('/api/category-attributes', {
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
        category_id: number;
        attribute_id: number;
        is_required: boolean;
        sort_order: number;
      }> = [];
      
      bulkSelection.categoryIds.forEach(categoryId => {
        bulkSelection.attributeIds.forEach(attributeId => {
          // Check if assignment already exists
          if (!isAssigned(categoryId, attributeId)) {
            assignmentsToCreate.push({
              category_id: categoryId,
              attribute_id: attributeId,
              is_required: bulkSelection.isRequired,
              sort_order: bulkSelection.sortOrder
            });
          }
        });
      });

      // Create assignments one by one (or implement a bulk endpoint)
      for (const assignment of assignmentsToCreate) {
        const response = await fetch('/api/category-attributes', {
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
      setBulkSelection({ attributeIds: [], categoryIds: [], isRequired: false, sortOrder: 0 });
    } catch (error) {
      console.error('Error bulk assigning attributes:', error);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Category Assignments
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
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCategories.map(category => (
          <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {category.slug}
              </p>
              {category.description && (
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  {category.description}
                </p>
              )}
            </div>

            <div className="p-4">
              <div className="space-y-3">
                {attributes.map(attribute => {
                  const assigned = isAssigned(category.id, attribute.id);
                  const assignment = getAssignment(category.id, attribute.id);

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
                              onClick={() => handleUpdateAssignment(category.id, attribute.id, { 
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
                              onClick={() => handleUnassign(category.id, attribute.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              title="Remove assignment"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleAssign(category.id, attribute.id)}
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

              {getCategoryAssignments(category.id).length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No attributes assigned
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            {searchTerm ? 'No categories found matching your search.' : 'No categories found.'}
          </div>
        </div>
      )}

      {/* Bulk Assignment Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Bulk Assign Attributes
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

                {/* Select Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Categories
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={bulkSelection.categoryIds.includes(category.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setBulkSelection(prev => ({
                                ...prev,
                                categoryIds: [...prev.categoryIds, category.id]
                              }));
                            } else {
                              setBulkSelection(prev => ({
                                ...prev,
                                categoryIds: prev.categoryIds.filter(id => id !== category.id)
                              }));
                            }
                          }}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {category.name}
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
                      id="bulk_required"
                      checked={bulkSelection.isRequired}
                      onChange={(e) => setBulkSelection(prev => ({ ...prev, isRequired: e.target.checked }))}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="bulk_required" className="ml-2 block text-sm text-gray-900 dark:text-white">
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
                    setBulkSelection({ attributeIds: [], categoryIds: [], isRequired: false, sortOrder: 0 });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkAssign}
                  disabled={bulkSelection.attributeIds.length === 0 || bulkSelection.categoryIds.length === 0}
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
