const { createServer } = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Store active sessions
const activeSessions = new Map();
const userSessions = new Map();

// Middleware for authentication
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const providedUserId = socket.handshake.auth.userId;
    const userRole = socket.handshake.auth.userRole;
    
    console.log('Socket auth attempt - token received:', !!token);
    console.log('Socket auth attempt - token type:', typeof token);
    console.log('Socket auth attempt - provided userId:', providedUserId);
    console.log('Socket auth attempt - provided userRole:', userRole);
    
    if (!token) {
      console.log('Socket auth failed - no token provided');
      return next(new Error('Authentication error'));
    }

    // Ensure token is a string
    if (typeof token !== 'string') {
      console.error('JWT verification failed: jwt must be a string, received:', typeof token, token);
      return next(new Error('Invalid token format'));
    }

    let userId, role, email;

    // Try to decode the token first (for user tokens)
    try {
      const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
      const decoded = jwt.verify(token, jwtSecret);
      console.log('JWT token decoded successfully:', { id: decoded.id, role: decoded.role });
      
      userId = providedUserId || decoded.id;
      role = userRole || decoded.role || 'client';
      email = decoded.email;
    } catch (jwtError) {
      console.log('JWT verification failed, trying astrologer token...');
      
      // If JWT fails, this might be an astrologer token
      // For astrologer tokens, we need the userId and role to be provided explicitly
      if (!providedUserId || !userRole) {
        console.error('Astrologer token requires userId and userRole to be provided');
        return next(new Error('Invalid astrologer token - missing userId or userRole'));
      }
      
      userId = providedUserId;
      role = userRole;
      email = null;
      
      console.log('Using astrologer token with provided userId and role:', { userId, role });
    }

    console.log('Socket auth success - final user info:', { userId, role, email });
    
    // Store user info in socket
    socket.userId = userId;
    socket.userRole = role;
    socket.userEmail = email;
    
    console.log('Socket user info stored:', {
      userId: socket.userId,
      userRole: socket.userRole,
      userEmail: socket.userEmail
    });
    
    next();
  } catch (error) {
    console.error('Socket auth error:', error.message);
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId} (${socket.userRole}) with socket ID: ${socket.id}`);

  // Store the socket connection
  activeSessions.set(socket.id, {
    userId: socket.userId,
    userRole: socket.userRole,
    connectedAt: new Date()
  });

  // Join booking room
  socket.on('join-booking', async (data) => {
    try {
      const { bookingId } = data;
      console.log(`Socket ${socket.id} trying to join booking ${bookingId}`);
      
      // Verify booking access
      const booking = await prisma.booking.findUnique({
        where: { id: parseInt(bookingId) },
        include: { astrologer: true, client: true }
      });

      if (!booking) {
        console.log(`Booking ${bookingId} not found`);
        socket.emit('error', { message: 'Booking not found' });
        return;
      }

      console.log('Booking data for socket:', {
        id: booking.id,
        date: booking.date,
        isPaid: booking.isPaid,
        clientId: booking.clientId,
        astrologerId: booking.astrologerId,
        chatEnabled: booking.chatEnabled,
        videoEnabled: booking.videoEnabled
      });

      // Check if user has access to this booking
      const socketUserId = Number(socket.userId);
      const hasAccess = (socket.userRole === 'client' && booking.clientId === socketUserId) ||
                       (socket.userRole === 'astrologer' && booking.astrologerId === socketUserId);
      
      console.log('Access check:', {
        socketRole: socket.userRole,
        socketUserId: socketUserId,
        bookingClientId: booking.clientId,
        bookingAstrologerId: booking.astrologerId,
        hasAccess: hasAccess
      });

      if (!hasAccess) {
        console.log(`Access denied for user ${socketUserId} to booking ${bookingId}`);
        socket.emit('error', { message: 'Access denied' });
        return;
      }

      // Check if booking is paid
      if (!booking.isPaid) {
        console.log(`Booking ${bookingId} not paid`);
        socket.emit('error', { message: 'Booking not paid' });
        return;
      }

      // Skip time check for now - just join the room
      console.log(`User ${socketUserId} has access to booking ${bookingId}, joining room`);

      // Join the booking room
      socket.join(`booking-${bookingId}`);
      userSessions.set(socket.userId, bookingId);
      
      console.log(`Socket ${socket.id} joined room booking-${bookingId}`);

      // Update session status
      const now = new Date();
      if (!booking.sessionStart) {
        await prisma.booking.update({
          where: { id: parseInt(bookingId) },
          data: { 
            sessionStart: now,
            chatEnabled: true,
            videoEnabled: true
          }
        });
        console.log(`Updated booking ${bookingId} session start time`);
      }

      socket.emit('joined-booking', { 
        bookingId,
        chatEnabled: booking.chatEnabled || true,
        videoEnabled: booking.videoEnabled || true
      });

      console.log(`Emitted joined-booking event for booking ${bookingId}`);

      // Notify other participants
      socket.to(`booking-${bookingId}`).emit('user-joined', {
        userId: socket.userId,
        userRole: socket.userRole
      });

      console.log(`User ${socketUserId} successfully joined booking ${bookingId}`);

    } catch (error) {
      console.error('Join booking error:', error);
      socket.emit('error', { message: 'Failed to join booking: ' + error.message });
    }
  });

  // Handle chat messages
  socket.on('send-message', async (data) => {
    try {
      const { bookingId, message, messageType = 'text' } = data;
      
      console.log(`Received message from user ${socket.userId} in booking ${bookingId}:`, message);
      
      // Determine the correct sender type based on the booking
      const booking = await prisma.booking.findUnique({
        where: { id: parseInt(bookingId) },
        include: { astrologer: true, client: true }
      });

      if (!booking || !booking.chatEnabled) {
        socket.emit('error', { message: 'Chat not available' });
        return;
      }

      if (!booking) {
        socket.emit('error', { message: 'Booking not found' });
        return;
      }

      // Determine sender type based on user ID comparison
      let senderType;
      const socketUserId = parseInt(socket.userId);
      const bookingAstrologerId = parseInt(booking.astrologerId);
      const bookingClientId = parseInt(booking.clientId);
      
      console.log('Sender type determination:', {
        socketUserId,
        bookingAstrologerId,
        bookingClientId,
        socketUserRole: socket.userRole
      });
      
      if (socketUserId === bookingAstrologerId) {
        senderType = 'astrologer';
      } else if (socketUserId === bookingClientId) {
        senderType = 'client';
      } else {
        console.error('Unauthorized access attempt:', {
          socketUserId,
          bookingAstrologerId,
          bookingClientId
        });
        socket.emit('error', { message: 'Unauthorized access' });
        return;
      }
      
      console.log('Determined sender type:', senderType);

      // Save message to database
      const chatMessage = await prisma.chatMessage.create({
        data: {
          bookingId: parseInt(bookingId),
          senderId: parseInt(socket.userId),
          senderType: senderType,
          message,
          messageType
        }
      });

      console.log(`Saved message to database with ID: ${chatMessage.id}, senderType: ${senderType}`);

      // Create message object for broadcasting
      const messageObject = {
        id: chatMessage.id,
        senderId: parseInt(socket.userId),
        senderType: senderType,
        message,
        messageType,
        createdAt: chatMessage.createdAt
      };

      // Broadcast message to all participants in the booking (including sender)
      io.to(`booking-${bookingId}`).emit('new-message', messageObject);

      console.log(`Broadcasted message to booking ${bookingId} room`);

    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // Handle video call requests
  socket.on('video-call-request', (data) => {
    const { bookingId, type } = data;
    console.log(`Video call request from user ${socket.userId} in booking ${bookingId}, type: ${type}`);
    
    // Notify other participants in the booking
    socket.to(`booking-${bookingId}`).emit('video-call-request', {
      fromUserId: socket.userId,
      fromUserRole: socket.userRole,
      type: type
    });
  });

  // Handle video call signaling
  socket.on('video-offer', (data) => {
    const { bookingId, offer } = data;
    console.log(`Video offer from user ${socket.userId} in booking ${bookingId}`);
    socket.to(`booking-${bookingId}`).emit('video-offer', {
      offer,
      fromUserId: socket.userId
    });
  });

  socket.on('video-answer', (data) => {
    const { bookingId, answer } = data;
    console.log(`Video answer from user ${socket.userId} in booking ${bookingId}`);
    socket.to(`booking-${bookingId}`).emit('video-answer', {
      answer,
      fromUserId: socket.userId
    });
  });

  socket.on('ice-candidate', (data) => {
    const { bookingId, candidate } = data;
    console.log(`ICE candidate from user ${socket.userId} in booking ${bookingId}`);
    socket.to(`booking-${bookingId}`).emit('ice-candidate', {
      candidate,
      fromUserId: socket.userId
    });
  });

  // Handle session end
  socket.on('end-session', async (data) => {
    try {
      const { bookingId } = data;
      
      // Update booking session end time
      await prisma.booking.update({
        where: { id: parseInt(bookingId) },
        data: { 
          sessionEnd: new Date(),
          chatEnabled: false,
          videoEnabled: false
        }
      });

      // Notify all participants
      io.to(`booking-${bookingId}`).emit('session-ended', {
        bookingId,
        endedBy: socket.userId
      });

    } catch (error) {
      console.error('End session error:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', async () => {
    console.log(`User disconnected: ${socket.userId} with socket ID: ${socket.id}`);
    
    // Clean up session
    activeSessions.delete(socket.id);
    
    const bookingId = userSessions.get(socket.userId);
    if (bookingId) {
      socket.to(`booking-${bookingId}`).emit('user-left', {
        userId: socket.userId,
        userRole: socket.userRole
      });
      userSessions.delete(socket.userId);
    }
  });
});

const PORT = process.env.SOCKET_PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

module.exports = { io, httpServer }; 