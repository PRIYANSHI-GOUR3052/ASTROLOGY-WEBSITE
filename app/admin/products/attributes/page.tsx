'use client';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { X, Plus, ChevronDown, ChevronUp, Link } from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

enum AttributeInputType {
  TEXT = 'text',
  NUMBER = 'number',
  SELECT = 'select',
  MULTI_SELECT = 'multiselect',
  BOOLEAN = 'boolean',
}

interface ICustomAttribute {
  attribute_id: number;
  code: string;
  name: string;
  input_type: AttributeInputType;
  created_at?: string;
}

interface IAttributeValue {
  attribute_id: number;
  value_code: string;
  value_label: string;
}

interface ICategory {
  category_id: number;
  name: string;
  slug: string;
  description?: string;
  parent_id?: number;
  icon_url?: string;
  created_at?: string;
  updated_at?: string;
  subcategories?: ICategory[];
}

interface IDeleteModal {
  show: boolean;
  type: 'attribute' | 'attributeValue';
  id: number | null;
  valueCode?: string;
  name?: string;
}

export default function ProductAttributesPage() {
  const [activeTab, setActiveTab] = useState<'custom' | 'category'>('custom');
  // Local state for demo purposes
  const [customAttributes, setCustomAttributes] = useState<ICustomAttribute[]>([
    {
      attribute_id: 1,
      code: 'color',
      name: 'Color',
      input_type: AttributeInputType.SELECT,
    },
    {
      attribute_id: 2,
      code: 'size',
      name: 'Size',
      input_type: AttributeInputType.TEXT,
    },
  ]);
  const [attributeValues, setAttributeValues] = useState<IAttributeValue[]>([
    { attribute_id: 1, value_code: 'red', value_label: 'Red' },
    { attribute_id: 1, value_code: 'blue', value_label: 'Blue' },
    { attribute_id: 2, value_code: 'small', value_label: 'Small' },
    { attribute_id: 2, value_code: 'large', value_label: 'Large' },
  ]);
  // Demo categories for Category-Specific Attributes tab
  const demoCategories = [
    { category_id: 1, name: "Gemstones & Crystals", slug: "gemstones-crystals" },
    { category_id: 2, name: "Rudraksha & Malas", slug: "rudraksha-malas" },
    { category_id: 3, name: "Spiritual Bracelets", slug: "spiritual-bracelets" },
    { category_id: 4, name: "Sacred Yantras", slug: "sacred-yantras" },
    { category_id: 5, name: "Astrology Reports", slug: "astrology-reports" },
    { category_id: 6, name: "Puja Essentials", slug: "puja-essentials" },
    { category_id: 7, name: "Feng Shui Items", slug: "feng-shui-items" },
    { category_id: 8, name: "Meditation Tools", slug: "meditation-tools" },
  ];
  const [categories, setCategories] = useState<ICategory[]>(demoCategories);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [linkAttributeId, setLinkAttributeId] = useState<number | null>(null);
  const [markRequired, setMarkRequired] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedAttributes, setExpandedAttributes] = useState<Record<number, boolean>>({});
  const [showAddCustomAttribute, setShowAddCustomAttribute] = useState<boolean>(false);
  const [newCustomAttribute, setNewCustomAttribute] = useState<{
    code: string;
    name: string;
    input_type: AttributeInputType;
  }>({
    code: '',
    name: '',
    input_type: AttributeInputType.TEXT,
  });
  const [selectedAttribute, setSelectedAttribute] = useState<number | null>(null);
  const [newAttributeValue, setNewAttributeValue] = useState<{
    value_code: string;
    value_label: string;
  }>({
    value_code: '',
    value_label: '',
  });
  const [showAddValueModal, setShowAddValueModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<IDeleteModal>({ show: false, type: 'attribute', id: null });

  // useEffect(() => {
  //   fetchAttributes();
  //   fetchCategories();
  // }, []);

  // useEffect(() => {
  //   customAttributes.forEach((attr: ICustomAttribute) => {
  //     fetchAttributeValues(attr.attribute_id);
  //   });
  // }, [customAttributes]);

  // const fetchAttributes = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem('access_token');
  //     if (!token) return toast.error('Please login again.');
  //     const res = await fetch(`${API_BASE_URL}/api/superadmin/attributes`, {
  //       headers: { 'Authorization': `Bearer ${token}` },
  //     });
  //     if (!res.ok) throw new Error('Failed to fetch attributes');
  //     setCustomAttributes(await res.json());
  //   } catch (e) {
  //     toast.error('Failed to fetch attributes');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchCategories = async () => {
  //   try {
  //     setLoading(true);
  //     const token = localStorage.getItem('access_token');
  //     if (!token) return toast.error('Please login again.');
  //     const res = await fetch(`${API_BASE_URL}/api/superadmin/categories`, {
  //       headers: { 'Authorization': `Bearer ${token}` },
  //     });
  //     if (!res.ok) throw new Error('Failed to fetch categories');
  //     setCategories(await res.json());
  //   } catch (e) {
  //     toast.error('Failed to fetch categories');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchAttributeValues = async (attributeId: number) => {
  //   try {
  //     const token = localStorage.getItem('access_token');
  //     if (!token) return;
  //     const res = await fetch(`${API_BASE_URL}/api/superadmin/attribute-values/${attributeId}`, {
  //       headers: { 'Authorization': `Bearer ${token}` },
  //     });
  //     if (!res.ok) throw new Error('Failed to fetch attribute values');
  //     const data: IAttributeValue[] = await res.json();
  //     setAttributeValues(prev => [...prev.filter((v: IAttributeValue) => v.attribute_id !== attributeId), ...data]);
  //   } catch {}
  // };

  const handleAddCustomAttribute = () => {
    if (!newCustomAttribute.name.trim() || !newCustomAttribute.code.trim()) return toast.error('Fill all fields');
    // Backend logic commented out
    // try {
    //   setLoading(true);
    //   const token = localStorage.getItem('access_token');
    //   const res = await fetch(`${API_BASE_URL}/api/superadmin/attributes`, {
    //     method: 'POST',
    //     headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newCustomAttribute),
    //   });
    //   if (!res.ok) throw new Error('Failed to create attribute');
    //   const created: ICustomAttribute = await res.json();
    //   setCustomAttributes([...customAttributes, created]);
    //   setShowAddCustomAttribute(false);
    //   setNewCustomAttribute({ code: '', name: '', input_type: AttributeInputType.TEXT });
    //   toast.success('Attribute created');
    // } catch (e) {
    //   toast.error('Failed to create attribute');
    // } finally {
    //   setLoading(false);
    // }
    // Local logic
    const newId = customAttributes.length > 0 ? Math.max(...customAttributes.map(a => a.attribute_id)) + 1 : 1;
    const created: ICustomAttribute = {
      attribute_id: newId,
      code: newCustomAttribute.code,
      name: newCustomAttribute.name,
      input_type: newCustomAttribute.input_type,
    };
    setCustomAttributes([...customAttributes, created]);
    setShowAddCustomAttribute(false);
    setNewCustomAttribute({ code: '', name: '', input_type: AttributeInputType.TEXT });
    toast.success('Attribute created');
  };

  const handleAddAttributeValue = () => {
    if (!selectedAttribute || !newAttributeValue.value_label.trim()) return toast.error('Select attribute and enter value');
    // Backend logic commented out
    // try {
    //   setLoading(true);
    //   const token = localStorage.getItem('access_token');
    //   const res = await fetch(`${API_BASE_URL}/api/superadmin/attribute-values`, {
    //     method: 'POST',
    //     headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       attribute_id: selectedAttribute,
    //       value_code: newAttributeValue.value_code || newAttributeValue.value_label.toLowerCase().replace(/\s+/g, '_'),
    //       value_label: newAttributeValue.value_label,
    //     }),
    //   });
    //   if (!res.ok) throw new Error('Failed to add value');
    //   const created: IAttributeValue = await res.json();
    //   setAttributeValues([...attributeValues, created]);
    //   setShowAddValueModal(false);
    //   setNewAttributeValue({ value_code: '', value_label: '' });
    //   toast.success('Value added');
    // } catch (e) {
    //   toast.error('Failed to add value');
    // } finally {
    //   setLoading(false);
    // }
    // Local logic
    const created: IAttributeValue = {
      attribute_id: selectedAttribute,
      value_code: newAttributeValue.value_code || newAttributeValue.value_label.toLowerCase().replace(/\s+/g, '_'),
      value_label: newAttributeValue.value_label,
    };
    setAttributeValues([...attributeValues, created]);
    setShowAddValueModal(false);
    setNewAttributeValue({ value_code: '', value_label: '' });
    toast.success('Value added');
  };

  const handleDeleteAttribute = (attributeId: number) => {
    // Backend logic commented out
    // try {
    //   setLoading(true);
    //   const token = localStorage.getItem('access_token');
    //   const res = await fetch(`${API_BASE_URL}/api/superadmin/attributes/${attributeId}`, {
    //     method: 'DELETE',
    //     headers: { 'Authorization': `Bearer ${token}` },
    //   });
    //   if (!res.ok) throw new Error('Failed to delete attribute');
    //   setCustomAttributes(customAttributes.filter((attr: ICustomAttribute) => attr.attribute_id !== attributeId));
    //   toast.success('Attribute deleted');
    // } catch (e) {
    //   toast.error('Failed to delete attribute');
    // } finally {
    //   setLoading(false);
    //   setShowDeleteModal({ show: false, type: 'attribute', id: null, valueCode: '', name: '' });
    // }
    // Local logic
    setCustomAttributes(customAttributes.filter((attr: ICustomAttribute) => attr.attribute_id !== attributeId));
    setAttributeValues(attributeValues.filter((val: IAttributeValue) => val.attribute_id !== attributeId));
    toast.success('Attribute deleted');
    setShowDeleteModal({ show: false, type: 'attribute', id: null, valueCode: '', name: '' });
  };

  const handleDeleteAttributeValue = (attributeId: number, valueCode: string) => {
    // Backend logic commented out
    // try {
    //   setLoading(true);
    //   const token = localStorage.getItem('access_token');
    //   const res = await fetch(`${API_BASE_URL}/api/superadmin/attribute-values/${attributeId}/${valueCode}`, {
    //     method: 'DELETE',
    //     headers: { 'Authorization': `Bearer ${token}` },
    //   });
    //   if (!res.ok) throw new Error('Failed to delete value');
    //   setAttributeValues(attributeValues.filter((val: IAttributeValue) => !(val.attribute_id === attributeId && val.value_code === valueCode)));
    //   toast.success('Value deleted');
    // } catch (e) {
    //   toast.error('Failed to delete value');
    // } finally {
    //   setLoading(false);
    //   setShowDeleteModal({ show: false, type: 'attributeValue', id: null, valueCode: '', name: '' });
    // }
    // Local logic
    setAttributeValues(attributeValues.filter((val: IAttributeValue) => !(val.attribute_id === attributeId && val.value_code === valueCode)));
    toast.success('Value deleted');
    setShowDeleteModal({ show: false, type: 'attributeValue', id: null, valueCode: '', name: '' });
  };

  const handleExpandAttribute = (attributeId: number) => {
    setExpandedAttributes(prev => ({ ...prev, [attributeId]: !prev[attributeId] }));
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setNewCustomAttribute({
      ...newCustomAttribute,
      name,
      code: name ? name.toLowerCase().replace(/\s+/g, '_') : '',
    });
  };

  const filteredAttributes = customAttributes.filter(attr =>
    attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attr.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Theme colors and classes matching Categories page (light/dark mode)
  const theme = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white',
    accent: 'bg-purple-100 text-purple-700',
    card: 'bg-white dark:bg-gray-800',
    text: 'text-gray-900 dark:text-gray-100',
    border: 'border border-gray-200 dark:border-gray-700',
    focus: 'focus:ring-purple-600',
    hover: 'hover:bg-purple-50 dark:hover:bg-purple-900',
    divider: 'divide-y divide-gray-200 dark:divide-gray-700',
    input: 'bg-white dark:bg-gray-800 text-black dark:text-white',
    inputDisabled: 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400',
    label: 'text-gray-700 dark:text-gray-300',
    button: 'bg-purple-600 hover:bg-purple-700 text-white font-semibold',
    buttonSecondary: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold',
    modal: 'bg-white dark:bg-gray-900',
    shadow: 'shadow-lg',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-4 sm:px-6 py-6">
      <h1 className={`text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100`}>Product Attributes</h1>
      <div className={`rounded-lg shadow-md p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}>  
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          <button
            className={`px-4 py-2 mr-4 font-semibold ${activeTab === 'custom' ? 'border-b-2 border-purple-600 text-purple-700 dark:text-purple-400' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab('custom')}
          >
            Custom Attributes
          </button>
          <button
            className={`px-4 py-2 font-semibold ${activeTab === 'category' ? 'border-b-2 border-purple-600 text-purple-700 dark:text-purple-400' : 'text-gray-600 dark:text-gray-300'}`}
            onClick={() => setActiveTab('category')}
          >
            Category-Specific Attributes
          </button>
        </div>
        {activeTab === 'custom' && (
          <div>
            <div className="flex flex-col lg:flex-row gap-4 justify-start xl:justify-between items-start lg:items-center mb-4">
              <input
                type="text"
                className={`w-full lg:w-1/3 p-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-purple-600`}
                placeholder="Search attributes..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow transition-colors`}
                onClick={() => setShowAddCustomAttribute(true)}
              >
                <Plus size={18} /> Add New Attribute
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Add values for additional attributes specific to your product.</p>
            {filteredAttributes.length > 0 ? (
              <div className="space-y-6">
                {filteredAttributes.map(attr => (
                  <div key={attr.attribute_id} className={`rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700`}>  
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-gray-900 dark:text-gray-100">{attr.name}</span>
                        <span className="ml-2 text-xs text-gray-400">({attr.code})</span>
                        <span className="ml-2 text-xs text-gray-500">{attr.input_type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className={`p-1 rounded text-gray-900 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400`}
                          onClick={() => handleExpandAttribute(attr.attribute_id)}
                          title="Show Values"
                        >
                          {expandedAttributes[attr.attribute_id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        <button
                          className="p-1 rounded text-red-500 hover:text-red-700"
                          onClick={() => setShowDeleteModal({ show: true, type: 'attribute', id: attr.attribute_id, name: attr.name })}
                          title="Delete Attribute"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    </div>
                    {expandedAttributes[attr.attribute_id] && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm">Values</span>
                          <button
                            className={`flex items-center gap-1 px-2 py-1 rounded bg-purple-100 text-purple-700 border border-purple-200 shadow-sm hover:bg-purple-200`}
                            onClick={() => { setSelectedAttribute(attr.attribute_id); setShowAddValueModal(true); }}
                          >
                            <Plus size={16} /> Add Value
                          </button>
                        </div>
                        <div className="space-y-2">
                          {attributeValues.filter(v => v.attribute_id === attr.attribute_id).length > 0 ? (
                            attributeValues.filter(v => v.attribute_id === attr.attribute_id).map(val => (
                              <div key={val.value_code} className="flex justify-between items-center bg-white dark:bg-gray-900 rounded px-3 py-2 border border-gray-200 dark:border-gray-700">
                                <span className="text-sm">{val.value_label} <span className="text-xs text-gray-400">({val.value_code})</span></span>
                                <button
                                  className="p-1 rounded text-red-500 hover:text-red-700"
                                  onClick={() => setShowDeleteModal({ show: true, type: 'attributeValue', id: attr.attribute_id, valueCode: val.value_code, name: val.value_label })}
                                  title="Delete Value"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-gray-400">No values yet.</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 bg-purple-100 rounded">
                <span className="text-purple-700">No attributes found.</span>
              </div>
            )}
          </div>
        )}
        {activeTab === 'category' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Categories Card */}
            <div className="col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
                <span className="font-semibold text-lg text-purple-700 dark:text-purple-400 block mb-4">Categories</span>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {categories.map(cat => (
                    <div key={cat.category_id} className="flex items-center justify-between py-3">
                      <div>
                        <span className="font-bold text-purple-700 dark:text-purple-400">{cat.name}</span>
                        <span className="ml-2 text-xs text-gray-400">{cat.slug}</span>
                      </div>
                      <button
                        className="p-2 rounded hover:bg-purple-100 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-400"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setLinkAttributeId(null);
                          setMarkRequired(false);
                        }}
                        title="Link Attribute"
                      >
                        <Link size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right: Link Attributes Card */}
            <div className="col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
                <span className="font-semibold text-lg text-purple-700 dark:text-purple-400 block mb-4">Link Attributes</span>
                {selectedCategory ? (
                  <div>
                    <div className="mb-4">
                      <span className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Selected Category</span>
                      <div className="bg-purple-100 dark:bg-purple-900 rounded px-4 py-2 flex flex-col">
                        <span className="font-bold text-purple-700 dark:text-purple-400">{selectedCategory.name}</span>
                        <span className="text-xs text-gray-400">{selectedCategory.slug}</span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <span className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Select Attribute</span>
                      <select
                        className="w-full p-2 border rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                        value={linkAttributeId ?? ''}
                        onChange={e => setLinkAttributeId(Number(e.target.value))}
                      >
                        <option value="">Select an attribute...</option>
                        {customAttributes.map(attr => (
                          <option key={attr.attribute_id} value={attr.attribute_id}>{attr.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="markRequired"
                        checked={markRequired}
                        onChange={e => setMarkRequired(e.target.checked)}
                      />
                      <label htmlFor="markRequired" className="text-sm text-gray-600 dark:text-gray-300">Mark as Required</label>
                    </div>
                    <button
                      className="px-5 py-2 rounded bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-400 font-semibold border border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                      disabled={!linkAttributeId}
                      onClick={() => {
                        toast.success('Attribute linked (demo only)');
                        setLinkAttributeId(null);
                        setMarkRequired(false);
                      }}
                    >
                      Link Attribute
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-12">Select a category to link attributes.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {showAddCustomAttribute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add New Custom Attribute</h3>
              <button onClick={() => setShowAddCustomAttribute(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={e => { e.preventDefault(); handleAddCustomAttribute(); }}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white focus:ring-purple-600"
                  placeholder="Enter attribute name"
                  value={newCustomAttribute.name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  placeholder="Attribute code"
                  value={newCustomAttribute.code}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <select
                  className="w-full p-2 border rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                  value={newCustomAttribute.input_type}
                  onChange={e => setNewCustomAttribute({ ...newCustomAttribute, input_type: e.target.value as AttributeInputType })}
                >
                  <option value={AttributeInputType.TEXT}>Text</option>
                  <option value={AttributeInputType.NUMBER}>Number</option>
                  <option value={AttributeInputType.SELECT}>Select</option>
                  <option value={AttributeInputType.MULTI_SELECT}>Multi Select</option>
                  <option value={AttributeInputType.BOOLEAN}>Boolean</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 rounded bg-purple-100 text-purple-700 font-semibold border border-purple-200 shadow-sm hover:bg-purple-200">
                  Add Attribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showAddValueModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Add Attribute Value</h3>
              <button onClick={() => setShowAddValueModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={e => { e.preventDefault(); handleAddAttributeValue(); }}>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                  placeholder="Enter value label"
                  value={newAttributeValue.value_label}
                  onChange={e => setNewAttributeValue({
                    ...newAttributeValue,
                    value_label: e.target.value,
                    value_code: e.target.value.toLowerCase().replace(/\s+/g, '_'),
                  })}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded-md border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                  placeholder="Value code (optional)"
                  value={newAttributeValue.value_code}
                  onChange={e => setNewAttributeValue({ ...newAttributeValue, value_code: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 rounded bg-purple-100 text-purple-700 font-semibold border border-purple-200 shadow-sm hover:bg-purple-200">
                  Add Value
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">Confirm Deletion</h3>
              <button onClick={() => setShowDeleteModal({ show: false, type: 'attribute', id: null })}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300">Are you sure you want to delete this {showDeleteModal.type === 'attribute' ? 'attribute' : 'value'}?</p>
              {showDeleteModal.name && (
                <p className="font-semibold text-purple-700 dark:text-purple-400">{showDeleteModal.name}</p>
              )}
              <p className="text-sm text-red-600 mt-2">This action cannot be undone.</p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowDeleteModal({ show: false, type: showDeleteModal.type, id: null })}
              >
                Cancel
              </button>
              <button
                className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 px-4 py-2 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                onClick={() => {
                  if (showDeleteModal.type === 'attribute' && showDeleteModal.id !== null) handleDeleteAttribute(showDeleteModal.id);
                  else if (showDeleteModal.type === 'attributeValue' && showDeleteModal.id !== null) handleDeleteAttributeValue(showDeleteModal.id, showDeleteModal.valueCode ?? '');
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
