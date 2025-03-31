import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs'; // Import bcrypt for hashing

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Create admins table and insert default admin with hashed password
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();

    // Create admins table if it doesn't exist
    await connection.query(`
        CREATE TABLE IF NOT EXISTS admins (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          role VARCHAR(50) NOT NULL DEFAULT 'admin',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);

    // Define the default password
    const defaultPassword = 'adminPass@123';
    
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);

    // Insert default admin with hashed password if not exists
    await connection.query(`
      INSERT IGNORE INTO admins (email, password) 
      VALUES ('Scalixity@example.com', ?)
    `, [hashedPassword]); // Use parameterized query to prevent SQL injection

    console.log('Database initialized successfully');
    connection.release();
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

initializeDatabase();

export default pool;