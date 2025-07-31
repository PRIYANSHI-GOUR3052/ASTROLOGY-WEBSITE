'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Phone, Video, X, MessageCircle, RefreshCw, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';

interface Message {
  id: number;
  senderId: number;
  senderType: 'client' | 'astrologer';
  message: string;
  messageType: string;
  createdAt: string;
  isRead?: boolean;
}

interface Booking {
  id: number;
  isPaid: boolean;
  chatEnabled: boolean;
  videoEnabled: boolean;
  sessionStart: string | null;
  sessionEnd: string | null;
  astrologer: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage: string;
    pricePerChat: number;
  };
}

interface RealTimeChatProps {
  bookingId: number;
  astrologer: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage: string;
    pricePerChat: number;
  };
  onClose: () => void;
  onPaymentRequired: () => void;
  onVideoCall?: () => void;
}

export default function RealTimeChat({ 
  bookingId, 
  astrologer, 
  onClose, 
  onPaymentRequired,
  onVideoCall 
}: RealTimeChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [lastMessageId, setLastMessageId] = useState<number>(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const messageQueueRef = useRef<Array<{ message: string; timestamp: number }>>([]);

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 2000;
  const TYPING_TIMEOUT = 3000;

  console.log('RealTimeChat mounted with bookingId:', bookingId);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Get user authentication data
  const getUserAuthData = useCallback(async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        throw new Error('No user data found');
      }

      const userData = JSON.parse(user);
      const clientId = userData.id;
      
      if (!clientId) {
        throw new Error('Invalid user data');
      }

      setCurrentUserId(clientId);

      // Get or create token
      let token = localStorage.getItem('token');
      if (!token) {
        const response = await fetch('/api/auth/create-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: clientId,
            email: userData.email,
            name: userData.name
          })
        });

        if (!response.ok) {
          throw new Error('Failed to create authentication token');
        }

        const data = await response.json();
        token = data.token;
        localStorage.setItem('token', token);
      }

      return { clientId, token };
    } catch (error) {
      console.error('Failed to get user auth data:', error);
      throw error;
    }
  }, []);

  // Initialize socket connection with reconnection logic
  const initializeSocket = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError('');

      const { clientId, token } = await getUserAuthData();

      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }

      console.log('Initializing socket connection...');
      
      const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        auth: { 
          token,
          userId: clientId,
          userRole: 'client'
        },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
        reconnectionDelay: RECONNECT_DELAY,
        reconnectionDelayMax: 10000
      });

      socketInstance.on('connect', () => {
        console.log('Socket connected successfully');
        setIsConnected(true);
        setIsConnecting(false);
        setReconnectAttempts(0);
        setError('');
        
        // Join booking room
        if (bookingId) {
          console.log('Joining booking room:', bookingId);
          socketInstance.emit('join-booking', { bookingId });
        }

        // Process any queued messages
        if (messageQueueRef.current.length > 0) {
          console.log('Processing queued messages:', messageQueueRef.current.length);
          messageQueueRef.current.forEach(({ message, timestamp }) => {
            if (Date.now() - timestamp < 30000) { // Only send messages from last 30 seconds
              socketInstance.emit('send-message', {
                bookingId,
                message,
                messageType: 'text'
              });
            }
          });
          messageQueueRef.current = [];
        }
      });

      socketInstance.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        setIsConnected(false);
        
        if (reason === 'io server disconnect') {
          // Server disconnected us, try to reconnect
          setTimeout(() => {
            socketInstance.connect();
          }, RECONNECT_DELAY);
        }
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setIsConnecting(false);
        setError('Connection failed. Retrying...');
        
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          setReconnectAttempts(prev => prev + 1);
          reconnectTimeoutRef.current = setTimeout(() => {
            initializeSocket();
          }, RECONNECT_DELAY * (reconnectAttempts + 1));
        } else {
          setError('Failed to connect after multiple attempts. Please refresh the page.');
        }
      });

      socketInstance.on('joined-booking', (data) => {
        console.log('Successfully joined booking:', data);
        setBooking(prev => prev ? { ...prev, ...data } : null);
      });

      socketInstance.on('new-message', (message: Message) => {
        console.log('Received new message:', message.id, message.senderType);
        
        // Check for duplicates
        setMessages(prev => {
          const messageExists = prev.some(msg => msg.id === message.id);
          if (messageExists) {
            console.log('Message already exists, skipping duplicate:', message.id);
            return prev;
          }
          
          // Update last message ID
          if (message.id > lastMessageId) {
            setLastMessageId(message.id);
          }
          
          return [...prev, message];
        });

        // Mark message as read if from astrologer
        if (message.senderType === 'astrologer' && currentUserId) {
          markMessageAsRead(message.id);
        }
      });

      socketInstance.on('typing-start', (data) => {
        if (data.userId !== currentUserId) {
          setTypingUsers(prev => new Set(prev).add(data.userId));
        }
      });

      socketInstance.on('typing-stop', (data) => {
        setTypingUsers(prev => {
          const newSet = new Set(prev);
          newSet.delete(data.userId);
          return newSet;
        });
      });

      socketInstance.on('video-call-request', (data) => {
        console.log('Received video call request:', data);
        if (onVideoCall) {
          onVideoCall();
        }
      });

      socketInstance.on('session-ended', (data) => {
        setError('Session has ended');
        setTimeout(() => {
          onClose();
        }, 3000);
      });

      socketInstance.on('error', (error) => {
        console.error('Socket error:', error);
        if (error.message?.includes('not paid')) {
          onPaymentRequired();
        } else {
          setError(error.message || 'Connection error');
        }
      });

      socketRef.current = socketInstance;
      setSocket(socketInstance);

    } catch (error) {
      console.error('Socket initialization error:', error);
      setIsConnecting(false);
      setError(error instanceof Error ? error.message : 'Failed to connect to chat');
    }
  }, [bookingId, currentUserId, lastMessageId, onPaymentRequired, onVideoCall, onClose, reconnectAttempts, getUserAuthData]);

  // Load booking data and messages
  const loadBookingData = useCallback(async () => {
    try {
      console.log('Loading booking data for bookingId:', bookingId);
      setIsLoading(true);
      setError('');
      
      const { clientId, token } = await getUserAuthData();

      // Fetch booking data
      const bookingResponse = await axios.get(`/api/user/booking?clientId=${clientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const bookingData = bookingResponse.data.bookings?.find((b: any) => b.id === bookingId);
      
      if (!bookingData) {
        throw new Error('Booking not found');
      }

      console.log('Booking data loaded:', bookingData);

      // Validate booking status
      if (!bookingData.isPaid) {
        throw new Error('Payment required to start chat');
      }

      if (!bookingData.chatEnabled) {
        throw new Error('Chat is not enabled for this booking');
      }

      setBooking(bookingData);

      // Load messages
      const messagesResponse = await axios.get(`/api/user/chat?bookingId=${bookingId}&clientId=${clientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (messagesResponse.data.messages) {
        const loadedMessages = messagesResponse.data.messages;
        setMessages(loadedMessages);
        
        // Set last message ID
        if (loadedMessages.length > 0) {
          const maxId = Math.max(...loadedMessages.map((m: Message) => m.id));
          setLastMessageId(maxId);
        }
      }

    } catch (error: any) {
      console.error('Failed to load booking data:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to load booking data';
      setError(errorMessage);
      
      if (errorMessage.includes('Payment required')) {
        onPaymentRequired();
      }
    } finally {
      setIsLoading(false);
    }
  }, [bookingId, getUserAuthData, onPaymentRequired]);

  // Initialize socket and load data
  useEffect(() => {
    if (bookingId && bookingId > 0) {
      loadBookingData().then(() => {
        initializeSocket();
      });
    } else {
      setError('Invalid booking ID');
      setIsLoading(false);
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [bookingId, loadBookingData, initializeSocket]);

  // Mark message as read
  const markMessageAsRead = useCallback(async (messageId: number) => {
    try {
      const { clientId, token } = await getUserAuthData();
      
      await axios.patch(`/api/user/chat/mark-read`, {
        messageId,
        clientId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  }, [getUserAuthData]);

  // Handle typing indicator
  const handleTyping = useCallback((isTyping: boolean) => {
    if (!socket || !isConnected) return;

    if (isTyping) {
      socket.emit('typing-start', { bookingId });
    } else {
      socket.emit('typing-stop', { bookingId });
    }
  }, [socket, isConnected, bookingId]);

  // Handle message input change
  const handleMessageChange = useCallback((value: string) => {
    setNewMessage(value);
    
    // Handle typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    handleTyping(true);
    
    typingTimeoutRef.current = setTimeout(() => {
      handleTyping(false);
    }, TYPING_TIMEOUT);
  }, [handleTyping]);

  // Send message
  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !socket || !isConnected) return;

    const messageToSend = newMessage.trim();
    setNewMessage('');
    handleTyping(false);

    try {
      // Send via socket
      socket.emit('send-message', {
        bookingId,
        message: messageToSend,
        messageType: 'text'
      });

      // Add to local state immediately for better UX
      const tempMessage: Message = {
        id: Date.now(), // Temporary ID
        senderId: currentUserId!,
        senderType: 'client',
        message: messageToSend,
        messageType: 'text',
        createdAt: new Date().toISOString(),
        isRead: false
      };

      setMessages(prev => [...prev, tempMessage]);

    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Queue message for retry
      messageQueueRef.current.push({
        message: messageToSend,
        timestamp: Date.now()
      });
      
      setError('Failed to send message. Will retry when reconnected.');
    }
  }, [newMessage, socket, isConnected, bookingId, currentUserId, handleTyping]);

  // Handle key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  // Handle video call
  const handleVideoCall = useCallback(() => {
    if (!booking?.videoEnabled) {
      setError('Video calls not available for this session');
      return;
    }
    
    if (!socket || !isConnected) {
      setError('Not connected to chat server');
      return;
    }
    
    socket.emit('video-call-request', {
      bookingId,
      type: 'video'
    });
    
    if (onVideoCall) {
      onVideoCall();
    }
  }, [booking?.videoEnabled, socket, isConnected, bookingId, onVideoCall]);

  // Handle voice call
  const handleVoiceCall = useCallback(() => {
    if (!booking?.videoEnabled) {
      setError('Voice calls not available for this session');
      return;
    }
    
    if (!socket || !isConnected) {
      setError('Not connected to chat server');
      return;
    }
    
    socket.emit('video-call-request', {
      bookingId,
      type: 'voice'
    });
  }, [booking?.videoEnabled, socket, isConnected, bookingId]);

  // Manual reconnect
  const handleReconnect = useCallback(() => {
    setReconnectAttempts(0);
    setError('');
    initializeSocket();
  }, [initializeSocket]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <span>Loading chat...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error && !isConnecting) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleReconnect}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-indigo-600 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <Image
              src={astrologer.profileImage}
              alt={`${astrologer.firstName} ${astrologer.lastName}`}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{`${astrologer.firstName} ${astrologer.lastName}`}</h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <p className="text-sm text-indigo-200">
                  {isConnecting ? 'Connecting...' : isConnected ? 'Online' : 'Disconnected'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceCall}
              disabled={!booking?.videoEnabled || !isConnected}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
              title="Voice Call"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={handleVideoCall}
              disabled={!booking?.videoEnabled || !isConnected}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
              title="Video Call"
            >
              <Video className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isClientMessage = currentUserId && message.senderId === currentUserId;
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isClientMessage ? 'justify-end' : 'justify-start'}`}
                >
                  {!isClientMessage && (
                    <Image
                      src={astrologer.profileImage}
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      isClientMessage
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p
                        className={`text-xs ${
                          isClientMessage ? 'text-indigo-200' : 'text-slate-500'
                        }`}
                      >
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      {isClientMessage && (
                        <div className="flex items-center gap-1">
                          {message.isRead ? (
                            <div className="w-3 h-3 text-indigo-200">✓✓</div>
                          ) : (
                            <div className="w-3 h-3 text-indigo-200">✓</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  {isClientMessage && (
                    <Image
                      src="/placeholder-user.jpg"
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>
              );
            })
          )}
          
          {/* Typing indicator */}
          {typingUsers.size > 0 && (
            <div className="flex gap-3">
              <Image
                src={astrologer.profileImage}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <div className="bg-slate-100 rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => handleMessageChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Type your message..." : "Connecting..."}
              disabled={!isConnected || !booking?.chatEnabled}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected || !booking?.chatEnabled}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 