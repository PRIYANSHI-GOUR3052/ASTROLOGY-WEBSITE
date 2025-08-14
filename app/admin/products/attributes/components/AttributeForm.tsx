'use client';
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Attribute } from '../types';

interface AttributeFormProps {
  attribute?: Attribute | null;
  onSave: (attribute: Omit<Attribute, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

const attributeTypes = [
  { value: 'text', label: 'Text', description: 'Free text input' },
  { value: 'number', label: 'Number', description: 'Numeric value' },
  { value: 'select', label: 'Single Select', description: 'Choose one option' },
  { value: 'multiselect', label: 'Multi Select', description: 'Choose multiple options' },
  { value: 'boolean', label: 'Yes/No', description: 'True or false' },
  { value: 'date', label: 'Date', description: 'Date picker' }
];

export default function AttributeForm({ attribute, onSave, onCancel }: AttributeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'text',
    description: '',
    is_required: false,
    is_filterable: false,
    is_searchable: false,
    sort_order: 0
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (attribute) {
      setFormData({
        name: attribute.name,
        slug: attribute.slug,
        type: attribute.type,
        description: attribute.description || '',
        is_required: attribute.is_required,
        is_filterable: attribute.is_filterable,
        is_searchable: attribute.is_searchable,
        sort_order: attribute.sort_order
      });
    }
  }, [attribute]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
    if (!attribute) { // Only auto-generate slug for new attributes
      setFormData(prev => ({ ...prev, slug: generateSlug(name) }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'Slug can only contain lowercase letters, numbers, and hyphens';
    }

    if (!formData.type) {
      newErrors.type = 'Type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {attribute ? 'Edit Attribute' : 'Create New Attribute'}
            </h3>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter attribute name"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.slug ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="attribute-slug"
              />
              {errors.slug && <p className="text-red-600 text-xs mt-1">{errors.slug}</p>}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                URL-friendly identifier (auto-generated from name)
              </p>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                {attributeTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label} - {type.description}
                  </option>
                ))}
              </select>
              {errors.type && <p className="text-red-600 text-xs mt-1">{errors.type}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Optional description for this attribute"
              />
            </div>

            {/* Settings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_required"
                  checked={formData.is_required}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_required: e.target.checked }))}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="is_required" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Required
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_filterable"
                  checked={formData.is_filterable}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_filterable: e.target.checked }))}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="is_filterable" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Filterable
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_searchable"
                  checked={formData.is_searchable}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_searchable: e.target.checked }))}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="is_searchable" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Searchable
                </label>
              </div>
            </div>

            {/* Sort Order */}
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Lower numbers appear first
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
              >
                {attribute ? 'Update Attribute' : 'Create Attribute'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
