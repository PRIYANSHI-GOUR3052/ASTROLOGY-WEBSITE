import mysql from 'mysql2/promise'

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