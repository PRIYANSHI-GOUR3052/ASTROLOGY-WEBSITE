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
  let connection;
  try {
    connection = await pool.getConnection();

    // Create admins table if it doesn't exist
    // 1. Create all base tables (no change here, just keeping them for completeness)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        available INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        google_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // 2. Create cart table (without foreign key on product_id)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS cart (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        is_stone BOOLEAN NOT NULL DEFAULT FALSE,
        is_service BOOLEAN NOT NULL DEFAULT FALSE,
        carats DECIMAL(10, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        -- FOREIGN KEY (product_id) intentionally omitted to support services
      )
    `);

 
    

    

    

    // 6. services table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title_hi VARCHAR(255) NOT NULL,
        title_en VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description_hi TEXT NOT NULL,
        description_en TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        icon_type VARCHAR(50) NOT NULL,
        icon_path VARCHAR(255) NOT NULL,
        benefits_hi TEXT,
        benefits_en TEXT,
        priority INT DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    

    await connection.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        visitor_id VARCHAR(255) NOT NULL UNIQUE,
        first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        visit_count INT DEFAULT 1
      )
    `);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS page_visits (
        id INT AUTO_INCREMENT PRIMARY KEY,
        visitor_id VARCHAR(255) NOT NULL,
        path VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        referrer VARCHAR(255),
        FOREIGN KEY (visitor_id) REFERENCES visitors(visitor_id) ON DELETE CASCADE
      );
    `);

    // Get admin credentials from environment variables
    const adminEmail = process.env.ADMIN_EMAIL || 'default@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.warn('Warning: ADMIN_PASSWORD environment variable is not set. Default admin will not be created.');
      return;
    }
    
    // Hash the password using bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Insert default admin with hashed password if not exists
    await connection.query(`
      INSERT IGNORE INTO admins (email, password) 
      VALUES (?, ?)
    `, [adminEmail, hashedPassword]); // Use parameterized query to prevent SQL injection

    console.log('Database initialized successfully with admin:', adminEmail);
  } catch (error) {
    console.error('Database initialization error:', error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

if (process.env.NODE_ENV !== 'production') {
  initializeDatabase();
}

export default pool;