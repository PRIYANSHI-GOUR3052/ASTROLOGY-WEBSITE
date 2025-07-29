#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Socket.IO server...');

// Set environment variables
process.env.SOCKET_PORT = process.env.SOCKET_PORT || '3001';
process.env.NEXT_PUBLIC_SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';
process.env.NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

console.log('Environment variables set:');
console.log('- SOCKET_PORT:', process.env.SOCKET_PORT);
console.log('- NEXT_PUBLIC_SOCKET_URL:', process.env.NEXT_PUBLIC_SOCKET_URL);
console.log('- NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);

// Start the socket server
const socketServer = spawn('node', ['lib/socket-server.js'], {
  stdio: 'inherit',
  env: process.env
});

socketServer.on('error', (error) => {
  console.error('❌ Failed to start socket server:', error);
  process.exit(1);
});

socketServer.on('close', (code) => {
  console.log(`Socket server exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping socket server...');
  socketServer.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Stopping socket server...');
  socketServer.kill('SIGTERM');
}); 