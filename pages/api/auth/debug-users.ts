import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);
    
    try {
      const [users] = await connection.execute('SELECT id, name, email, google_id FROM users ORDER BY id DESC LIMIT 10');
      
      return res.status(200).json({ 
        users: users,
        message: 'Recent users from database'
      });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Debug users error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 