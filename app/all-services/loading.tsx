import { Skeleton } from '@/components/ui/skeleton';

export default function AllServicesLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 md:h-16 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto mb-8" />
          
          {/* Quick Stats Skeleton */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-8 w-12 mx-auto mb-2" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="max-w-2xl mx-auto mb-8">
          <Skeleton className="h-16 w-full rounded-2xl" />
        </div>

        {/* Filter Controls Skeleton */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>

        {/* Services Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
