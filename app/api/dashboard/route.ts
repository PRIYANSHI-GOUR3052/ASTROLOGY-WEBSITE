// app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { PoolConnection } from 'mysql2/promise';
import { RowDataPacket } from 'mysql2';
export async function GET(request: Request) {
  try {
    // Get summary statistics
    const summaryStats = await getSummaryStatistics();
    
    // Get today's statistics
    const todayStats = await getTodayStatistics();
    
    // Get product inventory
    const productInventory = await getProductInventory();
    
    // Get store performance data
    const storePerformance = await getStorePerformance();
    
    // Get top selling products
    const topSellingProducts = await getTopSellingProducts();
    
    // Get top selling services
    const topSellingServices = await getTopSellingServices();
    
    // Get top selling stones
    const topSellingStones = await getTopSellingStones();
    
    // Get customer with most sales
    const topCustomers = await getTopCustomers();
    
    return NextResponse.json({
      summaryStats,
      todayStats,
      productInventory,
      storePerformance,
      topSellingProducts,
      topSellingServices,
      topSellingStones,
      topCustomers
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

// Helper functions to fetch specific data
async function getSummaryStatistics() {
  const connection = await pool.getConnection();
  try {
    interface TotalSalesRow extends RowDataPacket {
      totalSales: number;
    }
    
    interface TotalOrdersRow extends RowDataPacket {
      totalOrders: number;
    }
    
    interface TotalCustomersRow extends RowDataPacket {
      totalCustomers: number;
    }
    
    interface AvgOrderRow extends RowDataPacket {
      averageOrderSale: number;
    }
    
    interface TotalUnpaidRow extends RowDataPacket {
      totalUnpaid: number;
    }
    
    // Get total sales
    const [salesRows] = await connection.query<TotalSalesRow[]>(`
      SELECT SUM(total_amount) AS totalSales
      FROM orders
      WHERE status = 'paid'
    `);

    

    // Get total orders
    const [ordersRows] = await connection.query<TotalOrdersRow[]>(`
      SELECT COUNT(*) AS totalOrders
      FROM orders
    `);
    
    // Get total customers
    const [customersRows] = await connection.query<TotalCustomersRow[]>(`
      SELECT COUNT(DISTINCT user_id) AS totalCustomers
      FROM orders
    `);
    
    // Get average order value
    const [avgOrderRows] = await connection.query<AvgOrderRow[]>(`
      SELECT AVG(total_amount) AS averageOrderSale
      FROM orders
      WHERE status = 'paid'
    `);
    
    // Get total unpaid invoices
    const [unpaidRows] = await connection.query<TotalUnpaidRow[]>(`
      SELECT SUM(total_amount) AS totalUnpaid
      FROM orders
      WHERE status = 'processing'
    `);
    
    // Get monthly comparison for calculating percentage changes
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const currentYear = currentDate.getFullYear();
    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    
    
    
    interface MonthlyData extends RowDataPacket {
      monthlySales: number;
      monthlyOrders: number;
      monthlyCustomers: number;
    }

    const [currentMonthData] = await connection.query<MonthlyData[]>(`
      SELECT 
        SUM(total_amount) AS monthlySales,
        COUNT(*) AS monthlyOrders,
        COUNT(DISTINCT user_id) AS monthlyCustomers
      FROM orders
      WHERE 
        MONTH(created_at) = ? AND
        YEAR(created_at) = ?
    `, [currentMonth, currentYear]);
    
    const [lastMonthData] = await connection.query<MonthlyData[]>(`
      SELECT 
        SUM(total_amount) AS monthlySales,
        COUNT(*) AS monthlyOrders,
        COUNT(DISTINCT user_id) AS monthlyCustomers
      FROM orders
      WHERE 
        MONTH(created_at) = ? AND
        YEAR(created_at) = ?
    `, [lastMonth, lastMonthYear]);
    
    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (!previous || previous === 0) return '0%';
      const change = ((current - previous) / previous) * 100;
      return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
    };
    
    const currentMonthlySales = currentMonthData[0].monthlySales || 0;
    const lastMonthlySales = lastMonthData[0].monthlySales || 0;
    const currentMonthlyOrders = currentMonthData[0].monthlyOrders || 0;
    const lastMonthlyOrders = lastMonthData[0].monthlyOrders || 0;
    const currentMonthlyCustomers = currentMonthData[0].monthlyCustomers || 0;
    const lastMonthlyCustomers = lastMonthData[0].monthlyCustomers || 0;
    
    return {
      totalSales: salesRows[0].totalSales || 0,
      totalOrders: ordersRows[0].totalOrders || 0,
      totalCustomers: customersRows[0].totalCustomers || 0,
      averageOrderSale: avgOrderRows[0].averageOrderSale || 0,
      totalUnpaid: unpaidRows[0].totalUnpaid || 0,
      changes: {
        totalSales: calculateChange(currentMonthlySales, lastMonthlySales),
        totalOrders: calculateChange(currentMonthlyOrders, lastMonthlyOrders),
        totalCustomers: calculateChange(currentMonthlyCustomers, lastMonthlyCustomers),
        averageOrderSale: calculateChange(
          currentMonthlySales / (currentMonthlyOrders || 1), 
          lastMonthlySales / (lastMonthlyOrders || 1)
        ),
        totalUnpaid: '0%' // We don't track historical unpaid amounts
      }
    };
  } finally {
    connection.release();
  }
}

async function getTodayStatistics() {
  const connection = await pool.getConnection();
  try {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    interface SalesRow extends RowDataPacket {
      todaySales: number;
    }

    interface YesterdaySalesRow extends RowDataPacket {
      sales: number;
    }

    interface YesterdayOrdersRow extends RowDataPacket {
      orders: number;
    }

    interface YesterdayCustomersRow extends RowDataPacket {
      customers: number;
    }

    // Get today's sales
    const [salesRows] = await connection.query<SalesRow[]>(`
      SELECT SUM(total_amount) AS todaySales
      FROM orders
      WHERE DATE(created_at) = ? AND status = 'paid'
    `, [today]);
    
    interface TodayOrdersRow extends RowDataPacket {
      todayOrders: number;
    }

    // Get today's orders
    const [ordersRows] = await connection.query<TodayOrdersRow[]>(`
      SELECT COUNT(*) AS todayOrders
      FROM orders
      WHERE DATE(created_at) = ?
    `, [today]);
    
    interface TodayCustomersRow extends RowDataPacket {
      todayCustomers: number;
    }
    
    // Get today's customers
    const [customersRows] = await connection.query<TodayCustomersRow[]>(`
      SELECT COUNT(DISTINCT user_id) AS todayCustomers
      FROM orders
      WHERE DATE(created_at) = ?
    `, [today]);
    
    // Get yesterday's stats for comparison
    const [yesterdaySalesRows] = await connection.query<YesterdaySalesRow[]>(`
      SELECT SUM(total_amount) AS sales
      FROM orders
      WHERE DATE(created_at) = ? AND status = 'paid'
    `, [yesterdayStr]);
    
    const [yesterdayOrdersRows] = await connection.query<YesterdayOrdersRow[]>(`
      SELECT COUNT(*) AS orders
      FROM orders
      WHERE DATE(created_at) = ?
    `, [yesterdayStr]);
    
    const [yesterdayCustomersRows] = await connection.query<YesterdayCustomersRow[]>(`
      SELECT COUNT(DISTINCT user_id) AS customers
      FROM orders
      WHERE DATE(created_at) = ?
    `, [yesterdayStr]);
    
    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (!previous || previous === 0) return '0%';
      const change = ((current - previous) / previous) * 100;
      return `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
    };
    
    const todaySales = salesRows[0].todaySales || 0;
    const yesterdaySales = yesterdaySalesRows[0].sales || 0;
    const todayOrders = ordersRows[0].todayOrders || 0;
    const yesterdayOrders = yesterdayOrdersRows[0].orders || 0;
    const todayCustomers = customersRows[0].todayCustomers || 0;
    const yesterdayCustomers = yesterdayCustomersRows[0].customers || 0;
    
    return {
      todaySales,
      todayOrders,
      todayCustomers,
      changes: {
        todaySales: calculateChange(todaySales, yesterdaySales),
        todayOrders: calculateChange(todayOrders, yesterdayOrders),
        todayCustomers: calculateChange(todayCustomers, yesterdayCustomers)
      }
    };
  } finally {
    connection.release();
  }
}

async function getProductInventory() {
  const connection = await pool.getConnection();
  try {
    interface TotalProductsRow extends RowDataPacket {
      total: number;
    }

    // First, check if there are any products at all
    const [totalProductsCheck] = await connection.query<TotalProductsRow[]>(`
      SELECT COUNT(*) as total FROM products
    `);
    
    console.log(`Total products in database: ${totalProductsCheck[0].total}`);
    
    interface TotalCountRow extends RowDataPacket {
      total: number;
    }

    // Check products with inventory
    const [availableProductsCheck] = await connection.query<TotalCountRow[]>(`
      SELECT COUNT(*) as total FROM products WHERE available > 0
    `);
    
    console.log(`Products with available inventory: ${availableProductsCheck[0].total}`);
    
    interface ProductRow extends RowDataPacket {
      id: number;
      name: string;
      description: string;
      price: number;
      slug: string;
      stock: number;
      sku: string;
    }

    // Get products with inventory information - MODIFIED to include items with 0 inventory
    const [productsRows] = await connection.query<ProductRow[]>(`
      SELECT 
        id, 
        name, 
        description, 
        CAST(price AS DECIMAL(10,2)) as price, 
        slug, 
        available as stock, 
        CONCAT('PROD-', UPPER(SUBSTRING(slug, 1, 6)), '-', id) as sku
      FROM products
      ORDER BY price DESC
      LIMIT 5
    `);
    
    // Debug product rows
    console.log(`Products query returned ${productsRows.length} rows`);
    if (productsRows.length > 0) {
      console.log('Sample product:', productsRows[0]);
    }
    
    interface StoneRow extends RowDataPacket {
      id: number;
      name: string;
      name_en: string;
      zodiac: string;
      zodiac_en: string;
      price: number;
      sku: string;
    }

    // For stones inventory - Fixed price casting
    const [stonesRows] = await connection.query<StoneRow[]>(`
      SELECT 
        id, 
        name,
        name_en, 
        zodiac,
        zodiac_en,
        CAST(price_per_carat AS DECIMAL(10,2)) as price,
        CONCAT('STONE-', UPPER(SUBSTRING(name_en, 1, 6)), '-', id) as sku
      FROM stones
      ORDER BY price_per_carat DESC
      LIMIT 5
    `);
    
    // Debug stones
    console.log(`Stones query returned ${stonesRows.length} rows`);
    if (stonesRows.length > 0) {
      console.log('Sample stone:', stonesRows[0]);
    }
    
    interface ServiceRow extends RowDataPacket {
      id: number;
      name_hi: string;
      name_en: string;
      description_en: string;
      description_hi: string;
      price: number;
      slug: string;
      sku: string;
    }

    // For services inventory - Fixed price casting
    const [servicesRows] = await connection.query<ServiceRow[]>(`
      SELECT 
        id, 
        title_hi as name_hi,
        title_en as name_en,
        description_en,
        description_hi,
        CAST(price AS DECIMAL(10,2)) as price,
        slug,
        CONCAT('SERV-', UPPER(SUBSTRING(slug, 1, 6)), '-', id) as sku
      FROM services
      ORDER BY price DESC
      LIMIT 5
    `);
    
    // Debug services
    console.log(`Services query returned ${servicesRows.length} rows`);
    if (servicesRows.length > 0) {
      console.log('Sample service:', servicesRows[0]);
    }
    
    return {
      products: productsRows,
      stones: stonesRows,
      services: servicesRows
    };
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  } finally {
    connection.release();
  }
}
function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  return `${day} ${month}`;
}

// Enhanced getStorePerformance function
async function getStorePerformance() {
  console.log('[DEBUG] Starting getStorePerformance');
  const connection = await pool.getConnection();
  console.log('[DEBUG] Database connection established');

  try {
    // Get date range (last 30 days)
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const startDate = thirtyDaysAgo.toISOString().split('T')[0];
    const endDate = today.toISOString().split('T')[0];

    console.log(`[DEBUG] Date range: ${startDate} to ${endDate}`);

    interface SalesRow extends RowDataPacket {
      date_raw: string;
      date: string;
      sales: number;
    }

    // Get daily sales data from orders table
    console.log('[DEBUG] Executing sales data query');
    const [salesRows] = await connection.query<SalesRow[]>(`
      SELECT 
        DATE(created_at) as date_raw,
        DATE_FORMAT(DATE(created_at), '%d %b') as date,
        SUM(total_amount) as sales
      FROM orders
      WHERE created_at BETWEEN ? AND ?
      GROUP BY DATE(created_at), date
      ORDER BY date_raw
    `, [startDate, endDate]);

    console.log(`[DEBUG] Retrieved sales data: ${salesRows.length} rows`);
    if (salesRows.length > 0) {
      console.log('[DEBUG] Sample sales data:', salesRows[0]);
    }

    interface VisitorRow extends RowDataPacket {
      date_raw: string;
      date: string;
      visitors: number;
      unique_visitors: number;
    }

    // Get daily visitor data from page_visits table
    console.log('[DEBUG] Executing visitor data query');
    const [visitorRows] = await connection.query<VisitorRow[]>(`
      SELECT 
        DATE(timestamp) as date_raw,
        DATE_FORMAT(DATE(timestamp), '%d %b') as date,
        COUNT(*) as visitors,
        COUNT(DISTINCT visitor_id) as unique_visitors
      FROM page_visits
      WHERE timestamp BETWEEN ? AND ?
      GROUP BY DATE(timestamp), date
      ORDER BY date_raw
    `, [startDate, endDate]);

    console.log(`[DEBUG] Retrieved visitor data: ${visitorRows.length} rows`);
    if (visitorRows.length > 0) {
      console.log('[DEBUG] Sample visitor data:', visitorRows[0]);
    }

    // Create a dataset with continuous dates
    console.log('[DEBUG] Creating combined dataset with continuous dates');
    const combinedData = [];
    let currentDate = new Date(thirtyDaysAgo);

    while (currentDate <= today) {
      const dateKey = currentDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
      const formattedDate = formatDate(currentDate); // 'dd MMM' for display

      // Match data using raw date
      const salesData = salesRows.find(row => row.date_raw === dateKey);
      const visitorData = visitorRows.find((row: { date_raw: string; }) => row.date_raw === dateKey);

      const dailySales = salesData ? Number(salesData.sales) : 0;
      const dailyVisitors = visitorData ? Number(visitorData.visitors) : 0;
      const dailyuniqueVisitors = visitorData ? Number(visitorData.unique_visitors) : 0;

      // Calculate orders and conversion rate
      const ordersForDay = await getOrdersForDay(connection, dateKey);
      const conversionRate = dailyVisitors > 0 ? (ordersForDay / dailyVisitors * 100).toFixed(2) : "0";

      combinedData.push({
        date: formattedDate,
        visitors: dailyVisitors,
        unique_visitors: dailyuniqueVisitors,
        sales: dailySales,
        orders: ordersForDay,
        conversionRate: `${conversionRate}%`
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log(`[DEBUG] Combined dataset created with ${combinedData.length} days`);

    // Calculate totals
    console.log('[DEBUG] Calculating totals');
    const totalSales = combinedData.reduce((sum, item) => sum + item.sales, 0);
    const totalVisitors = combinedData.reduce((sum, item) => sum + item.visitors, 0);
    const unique_visitors = combinedData.reduce((sum, item) => sum + item.unique_visitors, 0);
    const totalOrders = await getTotalOrdersInDateRange(connection, startDate, endDate);
    const overallConversionRate = totalVisitors > 0 ? (totalOrders / totalVisitors * 100).toFixed(2) : "0";

    console.log('[DEBUG] Preparing final result object');
    const result = {
      performanceData: combinedData,
      dateRange: {
        start: startDate,
        end: endDate,
        formattedRange: `${formatDate(thirtyDaysAgo)} - ${formatDate(today)}`
      },
      totals: {
        visitors: totalVisitors,
        unique_visitors: unique_visitors,
        sales: totalSales,
        orders: totalOrders,
        conversionRate: `${overallConversionRate}%`
      }
    };

    console.log('[DEBUG] getStorePerformance completed successfully');
    return result;
  } catch (error) {
    console.error('[ERROR] getStorePerformance failed:', error);
    throw error;
  } finally {
    console.log('[DEBUG] Releasing database connection');
    connection.release();
  }
}// Helper function to get orders for a specific day
async function getOrdersForDay(connection: PoolConnection, date: string | number | Date) {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    interface OrderCountRow extends RowDataPacket {
      order_count: number;
    }
    
    const [rows] = await connection.query<OrderCountRow[]>(`
      SELECT COUNT(*) as order_count
      FROM orders
      WHERE created_at BETWEEN ? AND ?
    `, [startOfDay, endOfDay]);
    
    return rows[0].order_count || 0;
  } catch (error) {
    console.error('[ERROR] getOrdersForDay failed:', error);
    return 0;
  }
}

// Helper function to get total orders in date range
async function getTotalOrdersInDateRange(connection: PoolConnection, startDate: string, endDate: string) {
  try {
    interface OrderCountRow extends RowDataPacket {
      order_count: number;
    }
    
    const [rows] = await connection.query(`
      SELECT COUNT(*) as order_count
      FROM orders
      WHERE created_at BETWEEN ? AND ?
    `, [startDate, endDate]) as [OrderCountRow[], any];
    
    return rows[0].order_count || 0;
  } catch (error) {
    console.error('[ERROR] getTotalOrdersInDateRange failed:', error);
    return 0;
  }
}
async function getTopSellingProducts() {
  const connection = await pool.getConnection();
  try {
    interface TopProductRow extends RowDataPacket {
      id: number;
      name: string;
      slug: string;
      price: number;
      total_sold: number;
      total_revenue: number;
    }

    // Modified query to match your schema
    const [topProductsRows] = await connection.query<TopProductRow[]>(`
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.price,
        SUM(oi.quantity) as total_sold,
        SUM(oi.quantity * oi.price) as total_revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id 
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status = 'paid' 
        AND oi.is_service = FALSE 
        AND oi.is_stone = FALSE
      GROUP BY p.id
      ORDER BY total_sold DESC
      LIMIT 5
    `);
    
    console.log('Top selling products data:', JSON.stringify(topProductsRows, null, 2));
    
    // If there's no data, let's run a more basic query to check products existence
    if (topProductsRows.length === 0) {
      interface ProductCountRow extends RowDataPacket {
        count: number;
      }
      const [productCheck] = await connection.query<ProductCountRow[]>('SELECT COUNT(*) as count FROM products');
      console.log('Total products in database:', productCheck[0]?.count || 0);
      
      const [orderCheck] = await connection.query<ProductCountRow[]>('SELECT COUNT(*) as count FROM orders WHERE status = "completed"');
      console.log('Total completed orders:', orderCheck[0]?.count || 0);
      
      interface CountRow extends RowDataPacket {
        count: number;
      }
      const [orderItemCheck] = await connection.query<CountRow[]>(`
        SELECT COUNT(*) as count FROM order_items 
        WHERE is_service = FALSE AND is_stone = FALSE
      `);
      console.log('Total product order items:', orderItemCheck[0]?.count || 0);
    }
    
    return topProductsRows;
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    return [];
  } finally {
    connection.release();
  }
}

async function getTopSellingServices() {
  const connection = await pool.getConnection();
  try {
    // Check if services table exists (it's not in your schema)
    interface TableRow extends RowDataPacket {
      Tables_in_database: string;
    }
    
    const [tables] = await connection.query<TableRow[]>(`
      SHOW TABLES LIKE 'services'
    `);
    
    if (tables.length === 0) {
      console.log('Services table does not exist in the database');
      
      // Query directly from order_items for service data
      const [topServicesRows] = await connection.query(`
        SELECT 
          oi.product_id as id,
          'Service' as name,
          SUM(oi.quantity) as total_sold,
          SUM(oi.quantity * oi.price) as total_revenue
        FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE o.status = 'paid' AND oi.is_service = TRUE
        GROUP BY oi.product_id
        ORDER BY total_sold DESC
        LIMIT 5
      `);
      
      return topServicesRows;
    }
    
    // If services table exists, use the original query
    const [topServicesRows] = await connection.query(`
      SELECT 
        s.id,
        s.title_en as name,
        s.title_hi as name_hi,
        s.slug,
        s.price,
        s.icon_path as icon,
        SUM(oi.quantity) as total_sold,
        SUM(oi.quantity * oi.price) as total_revenue
      FROM order_items oi
      JOIN services s ON oi.product_id = s.id 
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status = 'paid' AND oi.is_service = TRUE
      GROUP BY s.id
      ORDER BY total_sold DESC
      LIMIT 5
    `);
    
   
    
    return topServicesRows;
  } catch (error) {
    console.error('Error fetching top selling services:', error);
    return [];
  } finally {
    connection.release();
  }
}

async function getTopSellingStones() {
  const connection = await pool.getConnection();
  try {
    interface TopStoneRow extends RowDataPacket {
      id: number;
      name: string;
      name_en: string;
      zodiac: string;
      zodiac_en: string;
      price: number;
      total_carats_sold: number;
      total_sold: number;
      total_revenue: number;
    }

    // Get top selling stones based on order_items
    const [topStonesRows] = await connection.query<TopStoneRow[]>(`
      SELECT 
        s.id,
        s.name,
        s.name_en,
        s.zodiac,
        s.zodiac_en,
        s.price_per_carat as price,
        SUM(oi.carats) as total_carats_sold,
        SUM(oi.quantity) as total_sold,
        SUM(oi.carats * oi.price) as total_revenue
      FROM order_items oi
      JOIN stones s ON oi.product_id = s.id 
      JOIN orders o ON oi.order_id = o.id
      WHERE o.status = 'paid' AND oi.is_stone = TRUE
      GROUP BY s.id
      ORDER BY total_revenue DESC
      LIMIT 5
    `);
    
    
    
    // If no stones found, check if there are any stones or completed orders
    if (topStonesRows.length === 0) {
      interface StoneCountRow extends RowDataPacket {
        count: number;
      }
      const [stoneCheck] = await connection.query<StoneCountRow[]>('SELECT COUNT(*) as count FROM stones');
      console.log('Total stones in database:', stoneCheck[0]?.count || 0);
      
      interface OrderItemCountRow extends RowDataPacket {
        count: number;
      }
      const [orderItemCheck] = await connection.query<OrderItemCountRow[]>(`
        SELECT COUNT(*) as count FROM order_items 
        WHERE is_stone = TRUE
      `);
    
    }
    
    return topStonesRows;
  } catch (error) {
    console.error('Error fetching top selling stones:', error);
    return [];
  } finally {
    connection.release();
  }
}


async function getTopCustomers() {
  const connection = await pool.getConnection();
  try {
    interface TopCustomerRow extends RowDataPacket {
      id: number;
      name: string;
      email: string;
      order_count: number;
      total_spent: number;
      last_order_date: string | Date;
    }

    // Get customers with most sales
    const [topCustomersRows] = await connection.query<TopCustomerRow[]>(`
      SELECT 
        u.id,
        u.name,
        u.email,
        COUNT(o.id) as order_count,
        SUM(o.total_amount) as total_spent,
        MAX(o.created_at) as last_order_date
      FROM users u
      JOIN orders o ON u.id = o.user_id
      WHERE o.status = 'paid'
      GROUP BY u.id
      ORDER BY total_spent DESC
      LIMIT 5
    `);
    
    // Format dates
    const formattedCustomers = topCustomersRows.map((customer: { last_order_date: string | number | Date; }) => ({
      ...customer,
      last_order_date: new Date(customer.last_order_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }));
    
    return formattedCustomers;
  } finally {
    connection.release();
  }
}