import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db'; // Adjust path as needed based on your project structure

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Get connection from pool
    const connection = await pool.getConnection();
    
    try {
      // Query for the admin with the provided email
      const [rows] = await connection.query(
        'SELECT * FROM admins WHERE email = ?',
        [email]
      );
      
      const admins = rows as any[];
      
      if (admins.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const admin = admins[0];
      
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: admin.id,
          email: admin.email,
          role: admin.role
        },
        process.env.JWT_SECRET || 'your-secret-key', // You should set this in your environment variables
        { expiresIn: '8h' }
      );
      
      // Set the token as an HTTP-only cookie
      res.setHeader('Set-Cookie', serialize('adminToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 8 * 60 * 60, // 8 hours in seconds
        sameSite: 'strict',
        path: '/',
      }));
      
      return res.status(200).json({ 
        message: 'Logged in successfully',
        user: {
          id: admin.id,
          email: admin.email,
          role: admin.role
        }
      });
      
    } finally {
      connection.release(); // Always release the connection back to the pool
    }
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}