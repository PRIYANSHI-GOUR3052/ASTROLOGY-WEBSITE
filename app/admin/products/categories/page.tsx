'use client';
import React, { useState } from "react";
import { Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

type SubcategoryModalProps = {
  parentCategory: string;
  onClose: () => void;
  onCreate: (subName: string) => void;
};

const SubcategoryModal: React.FC<SubcategoryModalProps> = ({ parentCategory, onClose, onCreate }) => {
  const [subName, setSubName] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Add New Subcategory</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subcategory Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
            placeholder="Subcategory name"
            value={subName}
            onChange={e => setSubName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parent Category</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-sm bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
            value={parentCategory}
            disabled
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            onClick={() => {
              if (subName.trim()) onCreate(subName.trim());
            }}
            disabled={!subName.trim()}
          >
            Create Subcategory
          </button>
        </div>
      </div>
    </div>
  );
};

type Category = {
  name: string;
  slug?: string;
  icon: string;
  image?: string | null;
};

type CategoryRowProps = {
  category: Category;
  onAddSubcategory: (slug: string, subName: string) => void;
  subcategories: string[];
};

type Subcategory = {
  name: string;
  subcategories?: Subcategory[];
};

type CategoryTree = {
  name: string;
  icon: string;
  subcategories?: Subcategory[];
};

const demoCategories: CategoryTree[] = [
  { name: "Gemstones & Crystals", icon: "💎", subcategories: [] },
  { name: "Rudraksha & Malas", icon: "📿", subcategories: [] },
  { name: "Spiritual Bracelets", icon: "🧿", subcategories: [] },
  { name: "Sacred Yantras", icon: "🔱", subcategories: [] },
  { name: "Astrology Reports", icon: "📜", subcategories: [] },
  { name: "Puja Essentials", icon: "🪔", subcategories: [] },
  { name: "Feng Shui Items", icon: "🌬️", subcategories: [] },
  { name: "Meditation Tools", icon: "🧘", subcategories: [] },
];

const SubcategoryList: React.FC<{
  subcategories: Subcategory[];
  onAddSubcategory: (path: number[], name: string) => void;
  path: number[];
}> = ({ subcategories, onAddSubcategory, path }) => {
  const [expanded, setExpanded] = useState<boolean[]>(subcategories.map(() => false));
  const [showModalIdx, setShowModalIdx] = useState<number | null>(null);

  return (
    <>
      {subcategories.map((sub, idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-2 pl-8 py-2 border-l border-gray-200 dark:border-gray-700 bg-purple-50 dark:bg-purple-900">
            <button
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Expand"
              onClick={() => {
                setExpanded(exp => exp.map((e, i) => i === idx ? !e : e));
              }}
              disabled={!sub.subcategories || sub.subcategories.length === 0}
            >
              {sub.subcategories && sub.subcategories.length > 0 ? (
                expanded[idx] ? <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300" /> : <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : <span className="w-4" />}
            </button>
            <span className="font-bold text-gray-900 dark:text-gray-100">{sub.name}</span>
            <button
              className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs ml-2"
              onClick={() => setShowModalIdx(idx)}
            >
              + Subcategory
            </button>
            <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ml-2" title="Edit">
              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Delete">
              <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          {expanded[idx] && sub.subcategories && sub.subcategories.length > 0 && (
            <SubcategoryList subcategories={sub.subcategories} onAddSubcategory={onAddSubcategory} path={[...path, idx]} />
          )}
          {showModalIdx === idx && (
            <SubcategoryModal
              parentCategory={sub.name}
              onClose={() => setShowModalIdx(null)}
              onCreate={subName => {
                onAddSubcategory([...path, idx], subName);
                setShowModalIdx(null);
              }}
            />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

const CategoryModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onSave: (name: string, image: string | null) => void;
  initialName?: string;
  initialImage?: string | null;
  isEdit?: boolean;
}> = ({ open, onClose, onSave, initialName = '', initialImage = null, isEdit = false }) => {
  const [name, setName] = useState(initialName);
  const [image, setImage] = useState<string | null>(initialImage);

  // Reset state when modal opens
  React.useEffect(() => {
    if (open) {
      setName(initialName);
      setImage(initialImage);
    }
  }, [open, initialName, initialImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">{isEdit ? 'Edit Category' : 'Add Category'}</h2>
        <div className="flex flex-col items-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden mb-2">
            <img
              src={image || "/placeholder-user.jpg"}
              alt={isEdit ? 'Edit category image' : 'Add category image'}
              className="w-16 h-16 object-cover rounded-full"
              style={{ display: 'block' }}
            />
          </div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 cursor-pointer">
            <span className="underline">{isEdit ? 'Edit Image' : 'Add Image'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded text-sm bg-white dark:bg-gray-800 text-black dark:text-white"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold"
            onClick={() => onSave(name.trim(), image)}
            disabled={!name.trim()}
          >
            {isEdit ? 'Save Changes' : 'Add Category'}
          </button>
        </div>
      </div>
    </div>
  );
};

const CategoryRow: React.FC<{
  category: CategoryTree;
  idx: number;
  onAddSubcategory: (path: number[], name: string) => void;
  onEdit: (idx: number) => void;
  onDelete: (idx: number) => void;
}> = ({ category, idx, onAddSubcategory, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900 transition-colors align-middle h-14">
        <td className="align-middle px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Expand"
              onClick={() => setExpanded(e => !e)}
              disabled={!category.subcategories || category.subcategories.length === 0}
            >
              {category.subcategories && category.subcategories.length > 0 ? (
                expanded ? <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-300" /> : <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              ) : <span className="w-4" />}
            </button>
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium text-gray-900 dark:text-gray-100">{category.name}</span>
            <button
              className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs ml-3"
              onClick={() => setShowModal(true)}
            >
              + Subcategory
            </button>
          </div>
        </td>
        <td className="align-middle px-6 py-4 text-center">
          <div className="flex gap-2 justify-center items-center">
            <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Edit" onClick={() => onEdit(idx)}>
              <Edit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Delete" onClick={() => setShowDeleteModal(true)}>
              <Trash2 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </td>
      </tr>
      {expanded && category.subcategories && category.subcategories.length > 0 && (
        <tr>
          <td colSpan={2} className="p-0">
            <SubcategoryList subcategories={category.subcategories} onAddSubcategory={onAddSubcategory} path={[idx]} />
          </td>
        </tr>
      )}
      {showModal && (
        <SubcategoryModal
          parentCategory={category.name}
          onClose={() => setShowModal(false)}
          onCreate={subName => {
            onAddSubcategory([idx], subName);
            setShowModal(false);
          }}
        />
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Delete Category</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this category?</p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={() => { setShowDeleteModal(false); onDelete(idx); }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

type SubcategoriesState = {
  [slug: string]: string[];
};

const addSubcategoryToTree = (tree: CategoryTree[], path: number[], name: string): CategoryTree[] => {
  if (path.length === 0) return tree;
  const [idx, ...rest] = path;
  return tree.map((cat, i) => {
    if (i !== idx) return cat;
    if (rest.length === 0) {
      return {
        ...cat,
        subcategories: [...(cat.subcategories || []), { name, subcategories: [] }],
      };
    }
    return {
      ...cat,
      subcategories: cat.subcategories ? addSubcategoryToSub(cat.subcategories, rest, name) : [],
    };
  });
};

const addSubcategoryToSub = (subs: Subcategory[], path: number[], name: string): Subcategory[] => {
  if (path.length === 0) return subs;
  const [idx, ...rest] = path;
  return subs.map((sub, i) => {
    if (i !== idx) return sub;
    if (rest.length === 0) {
      return {
        ...sub,
        subcategories: [...(sub.subcategories || []), { name, subcategories: [] }],
      };
    }
    return {
      ...sub,
      subcategories: sub.subcategories ? addSubcategoryToSub(sub.subcategories, rest, name) : [],
    };
  });
};

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryTree[]>(demoCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModalIdx, setShowEditModalIdx] = useState<number | null>(null);
  const [editCategory, setEditCategory] = useState<{ name: string; image: string | null } | null>(null);
  const [showDeleteModalIdx, setShowDeleteModalIdx] = useState<number | null>(null);

  const handleAddSubcategory = (path: number[], name: string) => {
    setCategories(prev => addSubcategoryToTree(prev, path, name));
  };

  const handleAddCategory = (name: string, image: string | null) => {
    setCategories(prev => [
      ...prev,
      { name, icon: '🆕', subcategories: [], image },
    ]);
    setShowAddModal(false);
  };

  const handleEditCategory = (idx: number) => {
    const cat = categories[idx];
    setEditCategory({ name: cat.name, image: (cat as any).image || null });
    setShowEditModalIdx(idx);
  };

  const handleSaveEditCategory = (name: string, image: string | null) => {
    setCategories(prev => prev.map((cat, i) =>
      i === showEditModalIdx ? { ...cat, name, image } : cat
    ));
    setShowEditModalIdx(null);
    setEditCategory(null);
  };

  const handleDeleteCategory = (idx: number) => {
    setCategories(prev => prev.filter((_, i) => i !== idx));
    setShowDeleteModalIdx(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Categories</h1>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors"
          onClick={() => setShowAddModal(true)}
        >
          + Add Category
        </button>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 align-middle h-14">
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200 align-middle">NAME</th>
              <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-200 align-middle text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, idx) => (
              <CategoryRow
                key={cat.name}
                category={cat}
                idx={idx}
                onAddSubcategory={handleAddSubcategory}
                onEdit={handleEditCategory}
                onDelete={setShowDeleteModalIdx}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Add Category Modal */}
      <CategoryModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCategory}
      />
      {/* Edit Category Modal */}
      <CategoryModal
        open={showEditModalIdx !== null}
        onClose={() => { setShowEditModalIdx(null); setEditCategory(null); }}
        onSave={handleSaveEditCategory}
        initialName={editCategory?.name}
        initialImage={editCategory?.image}
        isEdit
      />
      {/* Delete Category Modal */}
      {showDeleteModalIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Delete Category</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">Are you sure you want to delete this category?</p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold"
                onClick={() => setShowDeleteModalIdx(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={() => handleDeleteCategory(showDeleteModalIdx)}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;