#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { spawn } = require('child_process');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require('path');

console.log('🚀 Starting Socket.IO server...');

// Path to the socket server
const socketServerPath = path.join(__dirname, '..', 'lib', 'socket-server.js');

// Start the socket server
const socketServer = spawn('node', [socketServerPath], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development'
  }
});

socketServer.on('error', (error) => {
  console.error('❌ Failed to start socket server:', error);
  process.exit(1);
});

socketServer.on('close', (code) => {
  if (code !== 0) {
    console.error(`❌ Socket server exited with code ${code}`);
    process.exit(code);
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down socket server...');
  socketServer.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down socket server...');
  socketServer.kill('SIGTERM');
});

console.log('✅ Socket server started successfully');
console.log('📡 Server will be available at http://localhost:3001');
console.log('🏥 Health check available at http://localhost:3001/health'); 