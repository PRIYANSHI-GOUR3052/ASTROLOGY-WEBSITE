import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig)

    // Check if user already exists
    const [existingUsers] = await connection.execute(
      'SELECT * FROM users WHERE email = ?', 
      [email]
    )

    if ((existingUsers as unknown[]).length > 0) {
      await connection.end()
      return res.status(400).json({ error: 'User already exists with this email' })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, password, google_id) VALUES (?, ?, ?, ?)', 
      [name, email, hashedPassword, null]
    )

    await connection.end()

    return res.status(201).json({ 
      message: 'User created successfully',
      user: { 
        id: (result as { insertId: number }).insertId, 
        email, 
        name 
      } 
    })

  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 