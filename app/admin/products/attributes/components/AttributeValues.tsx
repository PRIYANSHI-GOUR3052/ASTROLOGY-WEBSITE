'use client';
import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';
import { Attribute, AttributeValue, AttributeValueFormData } from '../types';

interface AttributeValuesProps {
  attributes: Attribute[];
  attributeValues: AttributeValue[];
  onValuesUpdate: (values: AttributeValue[]) => void;
  loading: boolean;
}

export default function AttributeValues({ attributes, attributeValues, onValuesUpdate, loading }: AttributeValuesProps) {
  const [selectedAttribute, setSelectedAttribute] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingValue, setEditingValue] = useState<AttributeValue | null>(null);
  const [localAttributeValues, setLocalAttributeValues] = useState<AttributeValue[]>([]);
  const [formData, setFormData] = useState<AttributeValueFormData>({
    value: '',
    slug: '',
    sort_order: 0,
    is_active: true
  });

  const selectAttributes = attributes.filter(attr => 
    attr.type === 'select' || attr.type === 'multiselect'
  );

  // Initialize local values when attributeValues prop changes
  useEffect(() => {
    setLocalAttributeValues(attributeValues);
  }, [attributeValues]);

  // Fetch attribute values when an attribute is selected
  useEffect(() => {
    if (selectedAttribute) {
      fetchAttributeValues(selectedAttribute);
    }
  }, [selectedAttribute]);

  const fetchAttributeValues = async (attributeId: number) => {
    try {
      const response = await fetch(`/api/attributes/${attributeId}/values`);
      if (response.ok) {
        const values = await response.json();
        setLocalAttributeValues(values);
        onValuesUpdate(values);
      } else {
        console.error('Failed to fetch attribute values:', response.status);
        setLocalAttributeValues([]);
        onValuesUpdate([]);
      }
    } catch (error) {
      console.error('Error fetching attribute values:', error);
      setLocalAttributeValues([]);
      onValuesUpdate([]);
    }
  };

  const getAttributeValues = (attributeId: number) => {
    return localAttributeValues
      .filter(val => val.attribute_id === attributeId)
      .sort((a, b) => a.sort_order - b.sort_order);
  };

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleAddValue = async () => {
    if (!selectedAttribute || !formData.value.trim()) return;

    try {
      const response = await fetch(`/api/attributes/${selectedAttribute}/values`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: formData.value,
          slug: formData.slug || generateSlug(formData.value),
          sort_order: formData.sort_order,
          is_active: formData.is_active
        })
      });

      if (response.ok) {
        const newValue = await response.json();
        const updatedValues = [...localAttributeValues, newValue];
        setLocalAttributeValues(updatedValues);
        onValuesUpdate(updatedValues);
        setShowAddModal(false);
        setFormData({ value: '', slug: '', sort_order: 0, is_active: true });
      } else {
        throw new Error('Failed to create attribute value');
      }
    } catch (error) {
      console.error('Error creating attribute value:', error);
    }
  };

  const handleUpdateValue = async () => {
    if (!editingValue) return;

    try {
      const response = await fetch(`/api/attributes/${selectedAttribute}/values/${editingValue.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          value: formData.value,
          slug: formData.slug,
          sort_order: formData.sort_order,
          is_active: formData.is_active
        })
      });

      if (response.ok) {
        const updatedValue = await response.json();
        const updatedValues = localAttributeValues.map(val => 
          val.id === editingValue.id ? updatedValue : val
        );
        setLocalAttributeValues(updatedValues);
        onValuesUpdate(updatedValues);
        setShowAddModal(false);
        setEditingValue(null);
        setFormData({ value: '', slug: '', sort_order: 0, is_active: true });
      } else {
        throw new Error('Failed to update attribute value');
      }
    } catch (error) {
      console.error('Error updating attribute value:', error);
    }
  };

  const handleDeleteValue = async (valueId: number) => {
    try {
      const response = await fetch(`/api/attributes/${selectedAttribute}/values/${valueId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedValues = localAttributeValues.filter(val => val.id !== valueId);
        setLocalAttributeValues(updatedValues);
        onValuesUpdate(updatedValues);
      } else {
        throw new Error('Failed to delete attribute value');
      }
    } catch (error) {
      console.error('Error deleting attribute value:', error);
    }
  };

  const handleEditValue = (value: AttributeValue) => {
    setEditingValue(value);
    setFormData({
      value: value.value,
      slug: value.slug,
      sort_order: value.sort_order,
      is_active: value.is_active
    });
    setShowAddModal(true);
  };

  const handleValueChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      value,
      slug: prev.slug || generateSlug(value)
    }));
  };

  if (selectAttributes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          No select or multiselect attributes found.
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Create attributes with type "Single Select" or "Multi Select" to manage predefined values.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Attribute Values
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={!selectedAttribute}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          <Plus className="h-4 w-4 inline mr-2" />
          Add Value
        </button>
      </div>

      {/* Attribute Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Attribute
        </label>
        <select
          value={selectedAttribute || ''}
          onChange={(e) => setSelectedAttribute(Number(e.target.value) || null)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">Choose an attribute...</option>
          {selectAttributes.map(attr => (
            <option key={attr.id} value={attr.id}>
              {attr.name} ({attr.type})
            </option>
          ))}
        </select>
      </div>

      {/* Values List */}
      {selectedAttribute && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {selectAttributes.find(attr => attr.id === selectedAttribute)?.name} Values
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage predefined values for this attribute
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {getAttributeValues(selectedAttribute).map((value) => (
              <div key={value.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center space-x-4">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {value.value}
                      </span>
                      {!value.is_active && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {value.slug} • Sort: {value.sort_order}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditValue(value)}
                    className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    title="Edit value"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteValue(value.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    title="Delete value"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {getAttributeValues(selectedAttribute).length === 0 && (
            <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
              No values defined for this attribute yet.
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {editingValue ? 'Edit Value' : 'Add New Value'}
              </h3>

              <form onSubmit={(e) => { e.preventDefault(); editingValue ? handleUpdateValue() : handleAddValue(); }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Value *
                    </label>
                    <input
                      type="text"
                      value={formData.value}
                      onChange={(e) => handleValueChange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter value..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Auto-generated from value"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sort Order
                    </label>
                    <input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData(prev => ({ ...prev, sort_order: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      min="0"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900 dark:text-white">
                      Active
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingValue(null);
                      setFormData({ value: '', slug: '', sort_order: 0, is_active: true });
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
                  >
                    {editingValue ? 'Update Value' : 'Add Value'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
