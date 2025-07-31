import React, { useState } from "react";

interface StepAttributeMediaProps {
  categoryId: number | null;
  attributes?: { color?: string };
  media?: File[];
  onAttributeChange: (field: string, value: string) => void;
  onMediaChange: (files: File[]) => void;
  onBack: () => void;
  onSubmit: () => void;
  errors: { [key: string]: string };
}

const StepAttributeMedia: React.FC<StepAttributeMediaProps> = ({
  categoryId,
  attributes = {},
  media = [],
  onAttributeChange,
  onMediaChange,
  onBack,
  onSubmit,
  errors,
}) => {
  const [dragActive, setDragActive] = useState(false);

  // Demo: Only color attribute
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-8 w-full space-y-8">
      {/* Product Attributes */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Product Attributes</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Color <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 ${errors.color ? 'border-red-400 dark:border-red-400' : ''}`}
              value={attributes.color || ''}
              onChange={e => onAttributeChange('color', e.target.value)}
              placeholder="Enter color (e.g., Red, Blue)"
              required
            />
            {errors.color && <p className="text-red-600 text-xs mt-1">{errors.color}</p>}
          </div>
        </div>
      </div>

      {/* Product Media */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Product Media</h2>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          {/* Media Info */}
          <div className="flex flex-wrap gap-8 mb-6">
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Total Media</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{media.length}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Images</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{media.filter(f => f.type.startsWith('image/')).length}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Videos</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{media.filter(f => f.type.startsWith('video/')).length}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Remaining Slots</div>
              <div className="text-lg font-semibold text-gray-800 dark:text-gray-100">{5 - media.length}</div>
            </div>
          </div>
          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center transition ${dragActive ? 'border-purple-500 bg-purple-50 dark:bg-purple-900' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'}`}
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={e => { e.preventDefault(); setDragActive(false); }}
            onDrop={e => {
              e.preventDefault();
              setDragActive(false);
              const files = Array.from(e.dataTransfer.files);
              onMediaChange([...media, ...files].slice(0, 5));
            }}
            onClick={() => document.getElementById('media-upload')?.click()}
            style={{ cursor: 'pointer' }}
          >
            <svg className="w-10 h-10 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12m-5 4v-4m0 0l-2 2m2-2l2 2" /></svg>
            <div className="text-gray-600 dark:text-gray-300 mb-2">Drag and drop files here, or click to select files</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">Supported formats: JPEG, PNG, GIF, WebP (max 10MB), MP4, MOV, AVI (max 50MB). Only 1 video file allowed.</div>
            <input
              id="media-upload"
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={e => {
                const files = e.target.files ? Array.from(e.target.files) : [];
                onMediaChange([...media, ...files].slice(0, 5));
              }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <button
          type="button"
          className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600"
          onClick={onBack}
        >
          Back
        </button>
        <button
          type="button"
          className="px-6 py-2.5 text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600"
          onClick={onSubmit}
        >
          Save &amp; Next
        </button>
      </div>
    </div>
  );
};

export default StepAttributeMedia;
