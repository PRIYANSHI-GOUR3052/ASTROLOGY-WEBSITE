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
  CREATE TABLE IF NOT EXISTS stones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    zodiac VARCHAR(255) NOT NULL,
    zodiac_en VARCHAR(255) NOT NULL,
    benefits TEXT NOT NULL,
    benefits_en TEXT NOT NULL,
    price_per_carat DECIMAL(10, 2) NOT NULL,
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

// 3. Orders table (unchanged)
await connection.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stripe_session_id VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_method VARCHAR(50) NOT NULL DEFAULT 'online',
    shipping_status VARCHAR(50) DEFAULT 'pending',
    address_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES user_addresses(id) ON DELETE SET NULL
);

`);

// 4. order_items table (with is_service column)
await connection.query(`
  CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    is_stone BOOLEAN NOT NULL DEFAULT FALSE,
    is_service BOOLEAN NOT NULL DEFAULT FALSE,
    quantity INT NOT NULL,
    carats DECIMAL(10, 2),
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    -- FOREIGN KEY (product_id) intentionally omitted to support services
  )
`);

// 5. user_addresses table (unchanged)
await connection.query(`
  CREATE TABLE IF NOT EXISTS user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
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
  CREATE TABLE IF NOT EXISTS order_addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  address_line1 VARCHAR(255) NOT NULL,
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  pincode VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);`);

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