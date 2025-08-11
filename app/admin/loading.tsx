import LoadingSpinner from './components/LoadingSpinner';

export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading admin panel...</p>
      </div>
    </div>
  );
}
