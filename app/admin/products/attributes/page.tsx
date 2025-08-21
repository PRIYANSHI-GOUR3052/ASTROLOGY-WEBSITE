'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import AttributeList from './components/AttributeList';
import AttributeForm from './components/AttributeForm';
import AttributeValues from './components/AttributeValues';
import CategoryAssignments from './components/CategoryAssignments';
import ZodiacAssignments from './components/ZodiacAssignments';
import BulkOperations from './components/BulkOperations';
import { Attribute, AttributeValue, Category, ZodiacSign } from './types';

type TabType = 'attributes' | 'values' | 'categories' | 'zodiac' | 'bulk';

export default function ProductAttributesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('attributes');
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [zodiacSigns, setZodiacSigns] = useState<ZodiacSign[]>([]);
  const [attributeValues, setAttributeValues] = useState<AttributeValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAttributeForm, setShowAttributeForm] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [attributesRes, categoriesRes, zodiacRes] = await Promise.all([
        fetch('/api/attributes'),
        fetch('/api/categories'),
        fetch('/api/zodiac-signs')
      ]);

      if (attributesRes.ok) setAttributes(await attributesRes.json());
      if (categoriesRes.ok) setCategories(await categoriesRes.json());
      if (zodiacRes.ok) setZodiacSigns(await zodiacRes.json());
    } catch (error: unknown) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAttribute = async (attribute: Omit<Attribute, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch('/api/attributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attribute)
      });

      if (response.ok) {
        const newAttribute = await response.json();
        setAttributes(prev => [...prev, newAttribute]);
        setShowAttributeForm(false);
        toast.success('Attribute created successfully');
      } else {
        throw new Error('Failed to create attribute');
      }
    } catch (error: unknown) {
      toast.error('Failed to create attribute');
    }
  };

  const handleUpdateAttribute = async (id: number, attribute: Omit<Attribute, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch(`/api/attributes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attribute)
      });

      if (response.ok) {
        const updatedAttribute = await response.json();
        setAttributes(prev => prev.map(attr => attr.id === id ? updatedAttribute : attr));
        setShowAttributeForm(false);
        setEditingAttribute(null);
        toast.success('Attribute updated successfully');
      } else {
        throw new Error('Failed to update attribute');
      }
    } catch (error: unknown) {
      toast.error('Failed to update attribute');
    }
  };

  const handleDeleteAttribute = async (id: number) => {
    try {
      const response = await fetch(`/api/attributes/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setAttributes(prev => prev.filter(attr => attr.id !== id));
        toast.success('Attribute deleted successfully');
      } else {
        throw new Error('Failed to delete attribute');
      }
    } catch (error: unknown) {
      toast.error('Failed to delete attribute');
    }
  };

  const tabs = [
    { id: 'attributes', label: 'Global Attributes', icon: '📋' },
    { id: 'values', label: 'Attribute Values', icon: '🔢' },
    { id: 'categories', label: 'Category Assignments', icon: '📂' },
    { id: 'zodiac', label: 'Zodiac Assignments', icon: '⭐' },
    { id: 'bulk', label: 'Bulk Operations', icon: '⚡' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Product Attributes Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage product attributes, values, and assignments across categories and zodiac signs
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {activeTab === 'attributes' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Global Attributes
                </h2>
                <button
                  onClick={() => setShowAttributeForm(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Add New Attribute
                </button>
              </div>
              
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <AttributeList
                  attributes={attributes}
                  onEdit={(attribute) => {
                    setEditingAttribute(attribute);
                    setShowAttributeForm(true);
                  }}
                  onDelete={handleDeleteAttribute}
                />
              )}
            </div>
          )}

          {activeTab === 'values' && (
            <div className="p-6">
              <AttributeValues
                attributes={attributes}
                attributeValues={attributeValues}
                onValuesUpdate={setAttributeValues}
                loading={loading}
              />
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="p-6">
              <CategoryAssignments
                attributes={attributes}
                categories={categories}
                loading={loading}
              />
            </div>
          )}

          {activeTab === 'zodiac' && (
            <div className="p-6">
              <ZodiacAssignments
                attributes={attributes}
                zodiacSigns={zodiacSigns}
                loading={loading}
              />
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="p-6">
              <BulkOperations
                attributes={attributes}
                categories={categories}
                zodiacSigns={zodiacSigns}
                onDataUpdate={fetchData}
              />
            </div>
          )}
        </div>

        {/* Attribute Form Modal */}
        {showAttributeForm && (
          <AttributeForm
            attribute={editingAttribute}
            onSave={(attribute) => {
              if (editingAttribute) {
                handleUpdateAttribute(editingAttribute.id, attribute);
              } else {
                handleCreateAttribute(attribute);
              }
            }}
            onCancel={() => {
              setShowAttributeForm(false);
              setEditingAttribute(null);
            }}
          />
        )}
      </div>
    </div>
  );
}
