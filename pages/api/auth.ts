import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  // Ensure database and table are ready
  await ensureDatabaseReady()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig)

    const { email, password, name, action } = req.body

    if (action === 'signup') {
      // Check if user already exists
      const [existingUsers] = await connection.execute(
        'SELECT * FROM users WHERE email = ?', 
        [email]
      )

      if ((existingUsers as any[]).length > 0) {
        await connection.end()
        return res.status(400).json({ error: 'User already exists' })
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Insert new user
      const [result] = await connection.execute(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
        [name, email, hashedPassword]
      )

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: (result as any).insertId, 
          email,
          name 
        }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '1h' }
      )

      await connection.end()

      return res.status(201).json({ 
        token, 
        user: { id: (result as any).insertId, email, name } 
      })

    } else if (action === 'login') {
      // Find user by email
      const [users] = await connection.execute(
        'SELECT * FROM users WHERE email = ?', 
        [email]
      )

      const user = (users as any[])[0]

      if (!user) {
        await connection.end()
        return res.status(400).json({ error: 'Invalid email or password' })
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (!isPasswordValid) {
        await connection.end()
        return res.status(400).json({ error: 'Invalid email or password' })
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          email: user.email,
          name: user.name 
        }, 
        process.env.JWT_SECRET!, 
        { expiresIn: '1h' }
      )

      await connection.end()

      return res.status(200).json({ 
        token, 
        user: { id: user.id, email: user.email, name: user.name } 
      })
    }

  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

// User table creation SQL
const CREATE_USERS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
`

export async function initializeDatabase() {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection(dbConfig)
    
    // Execute the CREATE TABLE IF NOT EXISTS query
    await connection.execute(CREATE_USERS_TABLE_SQL)
    
    console.log('Database initialized successfully')
    
    // Close the connection
    await connection.end()
    
    return true
  } catch (error) {
    console.error('Database initialization error:', error)
    return false
  }
}

// Optional: Function to check if table exists
export async function checkTableExists() {
  try {
    const connection = await mysql.createConnection(dbConfig)
    
    try {
      // Try to describe the users table
      await connection.execute('DESCRIBE users')
      return true
    } catch (error) {
      return false
    } finally {
      await connection.end()
    }
  } catch (error) {
    console.error('Error checking table existence:', error)
    return false
  }
}

// You can call this in your API route or server startup
export async function ensureDatabaseReady() {
  const tableExists = await checkTableExists()
  
  if (!tableExists) {
    console.log('Initializing database...')
    await initializeDatabase()
  }
}