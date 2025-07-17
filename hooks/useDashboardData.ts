import { useState, useEffect, useCallback } from 'react';
import { DashboardData } from '@/types/dashboard';

export function useDashboardData() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/dashboard');

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data: unknown = await response.json();

      // Ensure data is properly formatted for charts
      if (data?.storePerformance?.performanceData) {
        data.storePerformance.performanceData = data.storePerformance.performanceData.map((item: any) => ({
          ...item,
          visitors: Number(item.visitors),
          unique_visitors: Number(item.unique_visitors),
          sales: Number(item.sales),
          orders: Number(item.orders),
          // Keep conversionRate as string, but ensure it's formatted as '55.56%'
          conversionRate: typeof item.conversionRate === 'number'
            ? `${item.conversionRate.toFixed(2)}%`
            : item.conversionRate,
        }));

        // Ensure totals.conversionRate is also formatted correctly
        if (data.storePerformance.totals) {
          const totals = data.storePerformance.totals;
          totals.visitors = Number(totals.visitors);
          totals.unique_visitors = Number(totals.unique_visitors);
          totals.sales = Number(totals.sales);
          totals.orders = Number(totals.orders);
          totals.conversionRate = typeof totals.conversionRate === 'number'
            ? `${totals.conversionRate.toFixed(2)}%`
            : totals.conversionRate;
        }
      }

      setDashboardData(data);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const refreshData = () => {
    fetchDashboardData();
  };

  return {
    dashboardData,
    isLoading,
    error,
    refreshData,
  };
}
