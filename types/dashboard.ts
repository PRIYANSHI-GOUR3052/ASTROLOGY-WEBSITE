// types/dashboard.ts
export interface SummaryStatistic {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  averageOrderSale: number;
  totalUnpaid: number;
  changes: {
    totalSales: string;
    totalOrders: string;
    totalCustomers: string;
    averageOrderSale: string;
    totalUnpaid: string;
  };
}

export interface TodayStatistic {
  todaySales: number;
  todayOrders: number;
  todayCustomers: number;
  changes: {
    todaySales: string;
    todayOrders: string;
    todayCustomers: string;
  };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  slug: string;
  stock: number;
  sku: string;
}

export interface Stone {
  id: number;
  name: string;
  name_en: string;
  zodiac: string;
  zodiac_en: string;
  price: number;
  sku: string;
}

export interface Service {
  id: number;
  name_hi: string;
  name_en: string;
  description_en: string;
  description_hi: string;
  price: number;
  slug: string;
  sku: string;
}

export interface ProductInventory {
  products: Product[];
  stones: Stone[];
  services: Service[];
}

export interface PerformanceDataPoint {
  date: string;
  visitors: number;
  sales: number;
}

export interface StorePerformance {
  performanceData: PerformanceDataPoint[];
  dateRange: {
    start: string;
    end: string;
    formattedRange: string;
  };
  totals: {
    visitors: number;
    uniqueVisitors: number;
    sales: number;
    orders: number;
    conversionRate: string;
  };
}

export interface TopSellingProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  total_sold: number;
  total_revenue: number;
}

export interface TopCustomer {
  id: number;
  name: string;
  email: string;
  order_count: number;
  total_spent: number;
}

export interface DashboardData {
  summaryStats: SummaryStatistic;
  todayStats: TodayStatistic;
  productInventory: ProductInventory;
  storePerformance: StorePerformance;
  topSellingProducts?: TopSellingProduct[];
  topSellingServices?: any[];
  topSellingStones?: any[];
  topCustomers: TopCustomer[];

}
