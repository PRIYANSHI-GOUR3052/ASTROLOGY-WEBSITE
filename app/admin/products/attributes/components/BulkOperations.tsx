'use client';
import React, { useState } from 'react';
import { Download, Upload, FileText, Trash2, Plus, Save, Copy } from 'lucide-react';
import { Attribute, Category, ZodiacSign, BulkAssignmentData, AttributeValue } from '../types';

interface BulkOperationsProps {
  attributes: Attribute[];
  categories: Category[];
  zodiacSigns: ZodiacSign[];
  onDataUpdate: () => void;
}

interface AttributeTemplate {
  id: string;
  name: string;
  description: string;
  attributes: Omit<Attribute, 'id' | 'created_at' | 'updated_at'>[];
  created_at: string;
}

export default function BulkOperations({ attributes, categories, zodiacSigns, onDataUpdate }: BulkOperationsProps) {
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'templates'>('import');
  const [importData, setImportData] = useState('');
  const [importType, setImportType] = useState<'attributes' | 'values' | 'assignments'>('attributes');
  const [templates, setTemplates] = useState<AttributeTemplate[]>([]);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    selectedAttributes: [] as number[]
  });

  // Predefined templates for common use cases
  const predefinedTemplates: AttributeTemplate[] = [
    {
      id: 'gemstone-template',
      name: 'Gemstone Attributes',
      description: 'Common attributes for gemstone products',
      attributes: [
        { name: 'Color', slug: 'color', type: 'select', description: 'Gemstone color', is_required: true, is_filterable: true, is_searchable: true, sort_order: 1 },
        { name: 'Clarity', slug: 'clarity', type: 'select', description: 'Gemstone clarity grade', is_required: true, is_filterable: true, is_searchable: false, sort_order: 2 },
        { name: 'Cut', slug: 'cut', type: 'select', description: 'Gemstone cut type', is_required: true, is_filterable: true, is_searchable: false, sort_order: 3 },
        { name: 'Carat Weight', slug: 'carat-weight', type: 'number', description: 'Weight in carats', is_required: true, is_filterable: true, is_searchable: true, sort_order: 4 },
        { name: 'Origin', slug: 'origin', type: 'select', description: 'Country of origin', is_required: false, is_filterable: true, is_searchable: true, sort_order: 5 },
        { name: 'Treatment', slug: 'treatment', type: 'multiselect', description: 'Any treatments applied', is_required: false, is_filterable: true, is_searchable: false, sort_order: 6 }
      ],
      created_at: new Date().toISOString()
    },
    {
      id: 'jewelry-template',
      name: 'Jewelry Attributes',
      description: 'Common attributes for jewelry products',
      attributes: [
        { name: 'Material', slug: 'material', type: 'select', description: 'Primary material', is_required: true, is_filterable: true, is_searchable: true, sort_order: 1 },
        { name: 'Metal Purity', slug: 'metal-purity', type: 'select', description: 'Metal purity (e.g., 18K, 24K)', is_required: false, is_filterable: true, is_searchable: false, sort_order: 2 },
        { name: 'Size', slug: 'size', type: 'select', description: 'Ring size or chain length', is_required: true, is_filterable: true, is_searchable: true, sort_order: 3 },
        { name: 'Style', slug: 'style', type: 'select', description: 'Jewelry style', is_required: false, is_filterable: true, is_searchable: true, sort_order: 4 },
        { name: 'Occasion', slug: 'occasion', type: 'multiselect', description: 'Suitable occasions', is_required: false, is_filterable: true, is_searchable: true, sort_order: 5 }
      ],
      created_at: new Date().toISOString()
    },
    {
      id: 'spiritual-template',
      name: 'Spiritual Items Attributes',
      description: 'Common attributes for spiritual and religious items',
      attributes: [
        { name: 'Deity', slug: 'deity', type: 'select', description: 'Associated deity or spiritual figure', is_required: false, is_filterable: true, is_searchable: true, sort_order: 1 },
        { name: 'Purpose', slug: 'purpose', type: 'multiselect', description: 'Intended spiritual purpose', is_required: true, is_filterable: true, is_searchable: true, sort_order: 2 },
        { name: 'Material', slug: 'material', type: 'select', description: 'Primary material', is_required: true, is_filterable: true, is_searchable: true, sort_order: 3 },
        { name: 'Size', slug: 'size', type: 'select', description: 'Item size', is_required: false, is_filterable: true, is_searchable: false, sort_order: 4 },
        { name: 'Blessed', slug: 'blessed', type: 'boolean', description: 'Whether item has been blessed', is_required: false, is_filterable: true, is_searchable: false, sort_order: 5 }
      ],
      created_at: new Date().toISOString()
    }
  ];

  // Initialize templates with predefined ones
  React.useEffect(() => {
    setTemplates(predefinedTemplates);
  }, []);

  const handleImport = () => {
    try {
      const data = JSON.parse(importData);
      
      switch (importType) {
        case 'attributes':
          // Handle attribute import
          console.log('Importing attributes:', data);
          break;
        case 'values':
          // Handle attribute values import
          console.log('Importing attribute values:', data);
          break;
        case 'assignments':
          // Handle assignments import
          console.log('Importing assignments:', data);
          break;
      }
      
      setImportData('');
      onDataUpdate();
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  const handleExport = (type: 'attributes' | 'values' | 'assignments') => {
    let data: Attribute[] | AttributeValue[] | BulkAssignmentData[] = [];
    
    switch (type) {
      case 'attributes':
        data = attributes;
        break;
      case 'values':
        // Export attribute values
        data = [];
        break;
      case 'assignments':
        // Export assignments
        data = [];
        break;
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCreateTemplate = () => {
    if (!templateForm.name.trim() || templateForm.selectedAttributes.length === 0) return;
    
    const newTemplate: AttributeTemplate = {
      id: `template-${Date.now()}`,
      name: templateForm.name,
      description: templateForm.description,
      attributes: templateForm.selectedAttributes.map(id => {
        const attr = attributes.find(a => a.id === id);
        if (!attr) throw new Error(`Attribute ${id} not found`);
        return {
          name: attr.name,
          slug: attr.slug,
          type: attr.type,
          description: attr.description || '',
          is_required: attr.is_required,
          is_filterable: attr.is_filterable,
          is_searchable: attr.is_searchable,
          sort_order: attr.sort_order
        };
      }),
      created_at: new Date().toISOString()
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setShowTemplateModal(false);
    setTemplateForm({ name: '', description: '', selectedAttributes: [] });
  };

  const handleUseTemplate = (template: AttributeTemplate) => {
    // Apply template attributes to current system
    console.log('Using template:', template);
    // In real implementation, this would create the attributes
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const tabs = [
    { id: 'import', label: 'Import Data', icon: Upload },
    { id: 'export', label: 'Export Data', icon: Download },
    { id: 'templates', label: 'Templates', icon: FileText }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Bulk Operations
        </h2>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'import' | 'export' | 'templates')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Import Tab */}
      {activeTab === 'import' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Import Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Import attributes, values, or assignments from a JSON file.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Import Type
              </label>
              <select
                value={importType}
                onChange={(e) => setImportType(e.target.value as 'attributes' | 'values' | 'assignments')}
                className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="attributes">Attributes</option>
                <option value="values">Attribute Values</option>
                <option value="assignments">Assignments</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                JSON Data
              </label>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Paste your JSON data here..."
              />
            </div>

            <button
              onClick={handleImport}
              disabled={!importData.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              <Upload className="h-4 w-4 inline mr-2" />
              Import Data
            </button>
          </div>
        </div>
      )}

      {/* Export Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Export Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Export your attributes, values, or assignments as JSON files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Attributes</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Export all attribute definitions
              </p>
              <button
                onClick={() => handleExport('attributes')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Export Attributes
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Attribute Values</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Export predefined attribute values
              </p>
              <button
                onClick={() => handleExport('values')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Export Values
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Assignments</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Export category and zodiac assignments
              </p>
              <button
                onClick={() => handleExport('assignments')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                <Download className="h-4 w-4 inline mr-2" />
                Export Assignments
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Attribute Templates
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Predefined attribute sets for common product types
              </p>
            </div>
            <button
              onClick={() => setShowTemplateModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              <Plus className="h-4 w-4 inline mr-2" />
              Create Template
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {templates.map(template => (
              <div key={template.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {template.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {template.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      title="Use template"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    {!predefinedTemplates.find(t => t.id === template.id) && (
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete template"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attributes ({template.attributes.length}):
                  </h5>
                  <div className="space-y-1">
                    {template.attributes.slice(0, 3).map((attr, index) => (
                      <div key={index} className="text-sm text-gray-600 dark:text-gray-400">
                        • {attr.name} ({attr.type})
                      </div>
                    ))}
                    {template.attributes.length > 3 && (
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        +{template.attributes.length - 3} more...
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleUseTemplate(template)}
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
                >
                  Use This Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create New Template
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter template name..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={templateForm.description}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Describe this template..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Attributes *
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                    {attributes.map(attribute => (
                      <label key={attribute.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={templateForm.selectedAttributes.includes(attribute.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setTemplateForm(prev => ({
                                ...prev,
                                selectedAttributes: [...prev.selectedAttributes, attribute.id]
                              }));
                            } else {
                              setTemplateForm(prev => ({
                                ...prev,
                                selectedAttributes: prev.selectedAttributes.filter(id => id !== attribute.id)
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
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setShowTemplateModal(false);
                    setTemplateForm({ name: '', description: '', selectedAttributes: [] });
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTemplate}
                  disabled={!templateForm.name.trim() || templateForm.selectedAttributes.length === 0}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-gray-400"
                >
                  Create Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
