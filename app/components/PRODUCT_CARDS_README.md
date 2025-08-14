# Reusable Product Card Components

Reusable product card components for displaying products in various layouts and configurations.

## Components

### ReusableProductCard
A flexible product card component that can render in grid or list view with various customization options.

### ReusableProductGrid
A container component that handles layout and displays multiple ReusableProductCard components with consistent spacing and animations.

## Features

- **Responsive Design**: Adapts to different screen sizes
- **Multiple View Modes**: Grid and list layouts
- **Interactive Elements**: Wishlist, compare, quick view actions
- **Loading States**: Skeleton placeholders while data loads
- **Empty States**: Customizable empty state messaging
- **Animations**: Smooth transitions and hover effects
- **Badges**: Support for discount, new, featured, and category badges
- **Stock Status**: Visual indicators for out-of-stock items
- **Rating Display**: Star ratings with review counts
- **Price Display**: Current and original price with discount calculations

## Usage

### Basic ReusableProductCard

```tsx
import { ReusableProductCard } from '@/app/components/product-cards';

const product = {
  id: '1',
  title: 'Natural Ruby Gemstone',
  description: 'Authentic lab-certified ruby for planetary remedies.',
  price: '₹2,999',
  originalPrice: '₹3,999',
  slug: 'natural-ruby-gemstone',
  image: '/images/ruby.jpg',
  category: 'Gemstones',
  rating: 4.5,
  reviewCount: 24,
  inStock: true,
  isNew: true,
};

<ReusableProductCard
  product={product}
  viewMode="grid"
  showQuickActions={true}
  showWishlist={true}
  onWishlistClick={(product) => handleWishlist(product)}
  onQuickViewClick={(product) => handleQuickView(product)}
/>
```

### ReusableProductGrid with Multiple Products

```tsx
import { ReusableProductGrid } from '@/app/components/product-cards';

<ReusableProductGrid
  products={products}
  viewMode="grid"
  columns={4}
  gap="md"
  showQuickActions={true}
  showWishlist={true}
  showCompare={false}
  loading={false}
  emptyMessage="No products found"
  onWishlistClick={handleWishlist}
  onQuickViewClick={handleQuickView}
  onCompareClick={handleCompare}
/>
```

## Props

### ReusableProductCard Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `product` | `Product` | - | **Required.** Product data object |
| `viewMode` | `'grid' \| 'list'` | `'grid'` | Display mode |
| `showQuickActions` | `boolean` | `true` | Show hover action buttons |
| `showWishlist` | `boolean` | `true` | Show wishlist button |
| `showCompare` | `boolean` | `false` | Show compare button |
| `className` | `string` | - | Additional CSS classes |
| `imageClassName` | `string` | - | Image-specific CSS classes |
| `priority` | `boolean` | `false` | Image loading priority |
| `onWishlistClick` | `(product: Product) => void` | - | Wishlist click handler |
| `onCompareClick` | `(product: Product) => void` | - | Compare click handler |
| `onQuickViewClick` | `(product: Product) => void` | - | Quick view click handler |

### ReusableProductGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `products` | `Product[]` | - | **Required.** Array of products |
| `viewMode` | `'grid' \| 'list'` | `'grid'` | Display mode |
| `columns` | `2 \| 3 \| 4 \| 5` | `4` | Grid columns (grid mode only) |
| `gap` | `'sm' \| 'md' \| 'lg'` | `'md'` | Spacing between items |
| `showQuickActions` | `boolean` | `true` | Show hover action buttons |
| `showWishlist` | `boolean` | `true` | Show wishlist buttons |
| `showCompare` | `boolean` | `false` | Show compare buttons |
| `className` | `string` | - | Additional CSS classes |
| `loading` | `boolean` | `false` | Show loading skeletons |
| `emptyMessage` | `string` | `'No products found'` | Empty state message |
| `onWishlistClick` | `(product: Product) => void` | - | Wishlist click handler |
| `onCompareClick` | `(product: Product) => void` | - | Compare click handler |
| `onQuickViewClick` | `(product: Product) => void` | - | Quick view click handler |

## Product Interface

```typescript
interface Product {
  id: string;                    // Unique identifier
  title: string;                 // Product name
  description: string;           // Product description
  price: string;                 // Current price (formatted)
  originalPrice?: string;        // Original price (formatted)
  slug: string;                  // URL slug
  image?: string;                // Image URL
  category?: string;             // Product category
  rating?: number;               // Star rating (0-5)
  reviewCount?: number;          // Number of reviews
  inStock?: boolean;             // Stock availability
  isNew?: boolean;               // New product badge
  isFeatured?: boolean;          // Featured product badge
}
```

## Styling

The components use Tailwind CSS for styling and are designed to integrate seamlessly with the existing design system. Key style features:

- **Hover Effects**: Smooth scale and shadow transitions
- **Focus States**: Accessible keyboard navigation
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Purple accent colors matching the brand
- **Typography**: Consistent font weights and sizes

## Animations

Powered by Framer Motion for smooth animations:
- **Layout animations** when switching view modes
- **Staggered entrance** animations in grids
- **Hover interactions** on buttons and cards
- **Loading transitions** between states

## Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG compliant color combinations

## Integration with Cart System

The components integrate with the existing `UniversalCartButton` component for seamless cart functionality. Each product card includes an "Add to Cart" button that:

- Handles cart state management
- Shows loading states during cart operations
- Provides user feedback via toasts
- Supports different cart actions (add, buy now)

## Examples

Visit `/demo/product-cards` to see live examples of all component variations and configurations.

## File Structure

```
app/
└── components/
    ├── ReusableProductCard.tsx     # Main product card component
    ├── ReusableProductGrid.tsx     # Grid container component
    ├── product-cards.ts            # Export file for easy imports
    └── PRODUCT_CARDS_README.md     # This documentation
```

## Dependencies

- **Next.js**: Image optimization and routing
- **Framer Motion**: Animations and transitions
- **Lucide React**: Icons
- **Tailwind CSS**: Styling
- **shadcn/ui**: Base UI components (Card, Badge, Button)
