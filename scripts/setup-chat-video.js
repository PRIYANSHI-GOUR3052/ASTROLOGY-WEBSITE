#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { execSync } = require('child_process');

console.log('🚀 Setting up Chat and Video Call System...\n');

// Check if required dependencies are installed
const requiredDeps = [
  'socket.io',
  'socket.io-client',
  'uuid'
];

console.log('📦 Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);

if (missingDeps.length > 0) {
  console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
  console.log('Installing missing dependencies...');
  try {
    execSync(`npm install ${missingDeps.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
  } catch (error) {
    console.error('❌ Failed to install dependencies:', error.message);
    process.exit(1);
  }
} else {
  console.log('✅ All dependencies are installed');
}

// Check if .env file exists
console.log('\n🔧 Checking environment configuration...');
if (!fs.existsSync('.env')) {
  console.log('❌ .env file not found');
  console.log('Creating .env file with default values...');
  
  const envContent = `# Database Configuration
DATABASE_URL="mysql://user:password@localhost:3306/scalixity_nakshatra"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Socket Server Configuration
SOCKET_PORT=3001
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"

# Application Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Development Configuration
NODE_ENV="development"
DEBUG="socket.io:*"
`;

  fs.writeFileSync('.env', envContent);
  console.log('✅ .env file created');
  console.log('⚠️  Please update the .env file with your actual configuration values');
} else {
  console.log('✅ .env file exists');
}

// Check database connection
console.log('\n🗄️  Checking database connection...');
try {
  // This would require database connection testing
  console.log('⚠️  Please ensure your database is running and accessible');
  console.log('   Run: npx prisma migrate dev (if you haven\'t already)');
} catch (error) {
  console.log('❌ Database connection failed');
  console.log('   Please check your DATABASE_URL in .env file');
}

// Check if socket server file exists
console.log('\n🔌 Checking socket server...');
const socketServerPath = path.join(__dirname, '../lib/socket-server.js');
if (!fs.existsSync(socketServerPath)) {
  console.log('❌ Socket server file not found');
  console.log('   Please ensure lib/socket-server.js exists');
} else {
  console.log('✅ Socket server file exists');
}

// Check if components exist
console.log('\n🧩 Checking components...');
const components = [
  '../app/components/RealTimeChat.tsx',
  '../app/components/VideoCall.tsx',
  '../app/components/PaymentModal.tsx'
];

components.forEach(component => {
  const componentPath = path.join(__dirname, component);
  if (fs.existsSync(componentPath)) {
    console.log(`✅ ${path.basename(component)} exists`);
  } else {
    console.log(`❌ ${path.basename(component)} not found`);
  }
});

// Check API routes
console.log('\n🌐 Checking API routes...');
const apiRoutes = [
  '../pages/api/user/payment/route.ts',
  '../pages/api/user/chat/route.ts',
  '../pages/api/astrologer/chat/route.ts'
];

apiRoutes.forEach(route => {
  const routePath = path.join(__dirname, route);
  if (fs.existsSync(routePath)) {
    console.log(`✅ ${path.basename(route)} exists`);
  } else {
    console.log(`❌ ${path.basename(route)} not found`);
  }
});

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Update your .env file with actual configuration values');
console.log('2. Ensure your database is running and accessible');
console.log('3. Run database migrations: npx prisma migrate dev');
console.log('4. Start the development servers: npm run dev:full');
console.log('5. Test the chat and video functionality');

console.log('\n🚀 To start development:');
console.log('   npm run dev:full');
console.log('\n📚 For more information, see CHAT_VIDEO_SETUP.md'); 