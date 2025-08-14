# Reusable Service Components

This directory contains reusable service card components that can be used throughout the astrology website for displaying services consistently.

## Components

### ReusableServiceCard

A flexible service card component that supports both grid and list view modes.

**Features:**
- **Grid and List Views**: Toggle between compact grid cards and detailed list cards
- **Service-Specific Fields**: Displays duration, consultation type, ratings, availability status
- **Availability Indicators**: Shows real-time availability (available/busy/offline) with color-coded indicators
- **Consultation Type Icons**: Visual icons for different consultation types (video, phone, in-person)
- **Booking Integration**: Built-in UniversalCartButton for service bookings
- **Rating Display**: Star ratings with review counts
- **Service Badges**: Popular, New, and discount badges
- **Responsive Design**: Optimized for all screen sizes
- **Animations**: Smooth Framer Motion animations

**Props:**
```typescript
interface ReusableServiceCardProps {
  service: Service;
  viewMode?: 'grid' | 'list';
  showQuickActions?: boolean;
  showBookmark?: boolean;
  showCompare?: boolean;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  onBookmarkClick?: (service: Service) => void;
  onCompareClick?: (service: Service) => void;
  onQuickViewClick?: (service: Service) => void;
}
```

**Service Interface:**
```typescript
interface Service {
  id: string;
  title: string;
  shortDescription?: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  slug: string;
  duration?: string;
  consultationType?: string;
  category?: string;
  tags?: string[];
  rating?: number;
  reviewsCount?: number;
  ordersCount?: number;
  features?: string[];
  images?: string[];
  icon?: React.ReactNode;
  isPopular?: boolean;
  isNew?: boolean;
  availability?: 'available' | 'busy' | 'offline';
}
```

### ReusableServiceGrid

A container component for displaying multiple service cards with controls and filtering.

**Features:**
- **View Mode Toggle**: Switch between grid and list layouts
- **Search Functionality**: Real-time service search
- **Sorting Options**: Sort by price, rating, popularity, or name
- **Loading States**: Skeleton loading animations
- **Empty States**: Customizable empty state messaging
- **Responsive Grid**: Auto-adjusting grid layouts
- **Animation Support**: Smooth layout transitions

**Props:**
```typescript
interface ReusableServiceGridProps {
  services: Service[];
  className?: string;
  showControls?: boolean;
  showViewToggle?: boolean;
  showSortOptions?: boolean;
  showFilterOptions?: boolean;
  showSearchBar?: boolean;
  initialViewMode?: 'grid' | 'list';
  loading?: boolean;
  loadingCount?: number;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateAction?: React.ReactNode;
  onServiceClick?: (service: Service) => void;
  onBookmarkClick?: (service: Service) => void;
  onCompareClick?: (service: Service) => void;
}
```

## Usage Examples

### Basic Grid Usage
```tsx
import { ReusableServiceGrid } from '@/app/components/service-cards';
import { services } from '@/data/services';

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>
      <ReusableServiceGrid 
        services={services}
        showControls={true}
        showViewToggle={true}
        showSortOptions={true}
        showSearchBar={true}
      />
    </div>
  );
}
```

### Grid with Custom Controls
```tsx
import { ReusableServiceGrid } from '@/app/components/service-cards';

export default function FeaturedServices() {
  const featuredServices = services.filter(service => service.isPopular);
  
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Featured Services</h2>
      <ReusableServiceGrid 
        services={featuredServices}
        showControls={false}
        initialViewMode="grid"
        className="max-w-6xl mx-auto"
      />
    </section>
  );
}
```

### Individual Service Card
```tsx
import { ReusableServiceCard } from '@/app/components/service-cards';

export default function ServiceHighlight({ service }) {
  return (
    <div className="max-w-sm mx-auto">
      <ReusableServiceCard 
        service={service}
        viewMode="grid"
        showQuickActions={true}
        priority={true}
      />
    </div>
  );
}
```

### List View with Custom Actions
```tsx
import { ReusableServiceGrid } from '@/app/components/service-cards';

export default function ServiceComparison() {
  const handleServiceBookmark = (service) => {
    // Handle bookmark logic
  };

  const handleServiceCompare = (service) => {
    // Handle comparison logic
  };

  return (
    <ReusableServiceGrid 
      services={services}
      initialViewMode="list"
      showControls={true}
      showSortOptions={true}
      onBookmarkClick={handleServiceBookmark}
      onCompareClick={handleServiceCompare}
    />
  );
}
```

## Service-Specific Features

### Consultation Types
The service cards automatically display appropriate icons for different consultation types:
- **Video Call**: Video camera icon
- **Phone Call**: Phone icon  
- **In-Person**: Users icon
- **Default**: Video camera icon

### Availability Status
Real-time availability indicators with color coding:
- **Available**: Green indicator
- **Busy**: Yellow indicator
- **Offline**: Red indicator

### Service Categories
Services are automatically categorized and display category badges for easy identification.

### Booking Integration
All service cards include integrated booking functionality through the UniversalCartButton component, handling the booking process seamlessly.

## Styling

The components use Tailwind CSS with consistent design patterns:
- **Color Scheme**: Purple-based theme matching the astrology website
- **Spacing**: Consistent padding and margins
- **Typography**: Clear hierarchy with proper font weights
- **Shadows**: Subtle elevation effects
- **Borders**: Rounded corners and clean borders
- **Responsive**: Mobile-first design approach

## Animation

Framer Motion provides smooth animations:
- **Layout Animations**: Automatic layout transitions
- **Entrance Animations**: Fade and slide effects
- **Hover Effects**: Scale and shadow transitions
- **Loading States**: Pulse animations for skeletons

## Best Practices

1. **Performance**: Use `priority={true}` for above-the-fold service cards
2. **Accessibility**: All interactive elements include proper ARIA labels
3. **SEO**: Service links use semantic HTML for better search indexing
4. **Loading**: Always provide loading states for better UX
5. **Empty States**: Include helpful empty state messaging
6. **Error Handling**: Handle missing images and data gracefully

## Files

- `ReusableServiceCard.tsx` - Individual service card component
- `ReusableServiceGrid.tsx` - Grid container component
- `service-cards.ts` - Export file for easy imports
- `README.md` - This documentation file
