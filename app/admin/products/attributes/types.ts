export interface Attribute {
  id: number;
  name: string;
  slug: string;
  type: string;
  description?: string;
  is_required: boolean;
  is_filterable: boolean;
  is_searchable: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface AttributeValue {
  id: number;
  attribute_id: number;
  value: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  banner_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ZodiacSign {
  id: number;
  name: string;
  slug: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryAttribute {
  id: number;
  category_id: number;
  attribute_id: number;
  is_required: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  attribute?: Attribute;
}

export interface ZodiacAttribute {
  id: number;
  zodiac_id: number;
  attribute_id: number;
  is_required: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
  attribute?: Attribute;
}

export interface AttributeFormData {
  name: string;
  slug: string;
  type: Attribute['type'];
  description?: string;
  is_required: boolean;
  is_filterable: boolean;
  is_searchable: boolean;
  sort_order: number;
}

export interface AttributeValueFormData {
  value: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
}

export interface BulkAssignmentData {
  attributeIds: number[];
  categoryIds?: number[];
  zodiacIds?: number[];
  isRequired: boolean;
  sortOrder: number;
}
