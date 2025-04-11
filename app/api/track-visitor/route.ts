import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Utility to convert JavaScript Date or ISO string to MySQL datetime format
function formatDateForMySQL(dateInput: string | number | Date) {
  const date = new Date(dateInput);
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

export async function POST(request: { json: () => PromiseLike<{ visitorId: any; path: any; timestamp: any; referrer: any; }> | { visitorId: any; path: any; timestamp: any; referrer: any; }; }) {
  try {
    const data = await request.json();
    
    // Debug: Log received data
    console.log('Received visitor data:', data);
    
    const { visitorId, path, timestamp, referrer } = data;
    
    // Debug: Log extracted fields
    console.log('Processing visitor tracking with data:', {
      visitorId,
      path,
      timestamp,
      referrer
    });

    // Format timestamp to MySQL-compatible datetime string
    const formattedTimestamp = formatDateForMySQL(timestamp);
    console.log('Formatted timestamp:', formattedTimestamp);

    const connection = await pool.getConnection();
    console.log('Database connection established');

    try {
      // Check if visitor exists
      const [rows] = await connection.query<any[]>(
        'SELECT * FROM visitors WHERE visitor_id = ?',
        [visitorId]
      );
      const existingVisitor = rows[0];
      
      console.log('Visitor exists:', !!existingVisitor);

      if (existingVisitor) {
        // Update existing visitor
        console.log('Updating existing visitor:', visitorId);
        await connection.query(
          'UPDATE visitors SET last_visit = ?, visit_count = visit_count + 1 WHERE visitor_id = ?',
          [formattedTimestamp, visitorId]
        );
      } else {
        // Insert new visitor
        console.log('Creating new visitor record:', visitorId);
        await connection.query(
          'INSERT INTO visitors (visitor_id, first_visit, last_visit, visit_count) VALUES (?, ?, ?, 1)',
          [visitorId, formattedTimestamp, formattedTimestamp]
        );
      }

      // Record page visit
      console.log('Recording page visit:', path);
      await connection.query(
        'INSERT INTO page_visits (visitor_id, path, timestamp, referrer) VALUES (?, ?, ?, ?)',
        [visitorId, path, formattedTimestamp, referrer]
      );

      connection.release();
      console.log('Visitor tracking completed successfully');
      return NextResponse.json({ success: true });

    } catch (error) {
      connection.release();
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

  } catch (error) {
    console.error('Failed to track visitor:', error);
    return NextResponse.json(
      { error: 'Failed to track visitor' },
      { status: 500 }
    );
  }
}