'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Phone, Video, X, MessageCircle, RefreshCw, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { io, Socket } from 'socket.io-client';
import axios from 'axios';
import { getCurrentUser, getAuthToken } from '@/lib/auth-client';

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
  const [sendingMessages, setSendingMessages] = useState<Set<string>>(new Set()); // Track messages being sent
  const [isSending, setIsSending] = useState(false); // Global sending state
  
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

  // Get user authentication data using the auth utility
  const getUserAuthData = useCallback(async () => {
    try {
      console.log('Getting user authentication data...');
      
      // Use the auth utility to get current user
      const authResult = await getCurrentUser();
      console.log('Auth result:', authResult);
      
      if (!authResult.user || !authResult.user.id) {
        console.log('No authenticated user found in auth result');
        throw new Error('No authenticated user found. Please log in and try again.');
      }

      const clientId = authResult.user.id;
      console.log('Found authenticated user with ID:', clientId);
      
      setCurrentUserId(clientId);

      // Get or create token using the auth utility
      const token = await getAuthToken();
      console.log('Token obtained:', token ? 'Yes' : 'No');
      
      if (!token) {
        throw new Error('Failed to get authentication token. Please log in again.');
      }

      console.log('Successfully obtained authentication token');
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
        console.log('Received new message:', message.id, message.senderType, message.message);
        
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
          
          // Remove any temporary messages with the same content
          const filteredPrev = prev.filter(msg => 
            !(msg.id < 0 && msg.message === message.message && msg.senderType === message.senderType)
          );
          
          return [...filteredPrev, message];
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

      // Handle message sending errors
      socketInstance.on('message-error', (error) => {
        console.error('Message sending error:', error);
        setError('Failed to send message: ' + (error.message || 'Unknown error'));
        
        // Remove any temporary messages that failed to send
        setMessages(prev => prev.filter(msg => msg.id >= 0));
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
  
      // Check if component is still mounted
      if (!bookingId) return;
  
      const bookingResponse = await axios.get(`/api/user/booking?clientId=${clientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Check again before state updates
      if (!bookingId) return;
      
      const bookingData = bookingResponse.data.bookings?.find((b: { id: number; isPaid: boolean; chatEnabled: boolean }) => b.id === bookingId);
      
      if (!bookingData) {
        throw new Error('Booking not found');
      }
  
      console.log('Booking data loaded:', bookingData);
  
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
      
      if (messagesResponse.data.messages && bookingId) { // Check again
        const loadedMessages = messagesResponse.data.messages;
        setMessages(loadedMessages);
        
        if (loadedMessages.length > 0) {
          const maxId = Math.max(...loadedMessages.map((m: Message) => m.id));
          setLastMessageId(maxId);
        }
      }
  
    } catch (error: unknown) {
      console.error('Failed to load booking data:', error);
      if (!bookingId) return; // Don't update state if component unmounted
      
      // Type guard for axios error
      const axiosError = error as { response?: { data?: { error?: string } }; message?: string };
      const errorMessage = axiosError.response?.data?.error || axiosError.message || 'Failed to load booking data';
      setError(errorMessage);
      
      if (errorMessage.includes('Payment required')) {
        onPaymentRequired();
      }
    } finally {
      if (bookingId) { // Only update if still mounted
        setIsLoading(false);
      }
    }
  }, [bookingId, getUserAuthData, onPaymentRequired]);

  const debouncedReconnect = useCallback(
    debounce(() => {
      if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        setReconnectAttempts(prev => prev + 1);
        initializeSocket();
      }
    }, 1000),
    [reconnectAttempts, initializeSocket]
  );
  
  function debounce(func: (...args: unknown[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: unknown[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  useEffect(() => {
    if (bookingId && bookingId > 0) {
      loadBookingData();
    } else {
      setError('Invalid booking ID');
      setIsLoading(false);
    }
  }, [bookingId, getUserAuthData, onPaymentRequired]);

  useEffect(() => {
    // Initialize socket only after booking data is loaded and user is authenticated
    if (booking && currentUserId && !socket) {
      initializeSocket();
    }
  }, [booking, currentUserId, socket]);

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
    if (!newMessage.trim() || !socket || !isConnected || isSending) return;
  
    const messageToSend = newMessage.trim();
    const messageKey = `${messageToSend}-${Date.now()}`;
    const tempMessageId = -Date.now();
    
    // Set global sending state
    setIsSending(true);
    
    // Add to sending messages set
    setSendingMessages(prev => new Set(prev).add(messageKey));
    
    // Clear input and typing
    setNewMessage('');
    handleTyping(false);
  
    try {
      // Add temporary message for better UX
      const tempMessage: Message = {
        id: tempMessageId,
        senderId: currentUserId!,
        senderType: 'client',
        message: messageToSend,
        messageType: 'text',
        createdAt: new Date().toISOString(),
        isRead: false
      };
  
      setMessages(prev => [...prev, tempMessage]);
  
      // Send via socket
      socket.emit('send-message', {
        bookingId,
        message: messageToSend,
        messageType: 'text'
      });
  
      console.log('Message sent via socket:', messageToSend);
  
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Remove temporary message on error
      setMessages(prev => prev.filter(msg => msg.id !== tempMessageId));
      
      // Queue message for retry
      messageQueueRef.current.push({
        message: messageToSend,
        timestamp: Date.now()
      });
      
      setError('Failed to send message. Will retry when reconnected.');
    } finally {
      // Remove from sending messages set after a delay
      setTimeout(() => {
        setSendingMessages(prev => {
          const newSet = new Set(prev);
          newSet.delete(messageKey);
          return newSet;
        });
        
        // Clear global sending state - check current size, not old state
        setSendingMessages(currentSending => {
          if (currentSending.size <= 1) { // Will be 0 after this message is removed
            setIsSending(false);
          }
          const newSet = new Set(currentSending);
          newSet.delete(messageKey);
          return newSet;
        });
      }, 1000);
    }
  }, [newMessage, socket, isConnected, bookingId, currentUserId, handleTyping, isSending]);
  
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
              const isClientMessage = message.senderType === 'client';
              const isTemporaryMessage = message.id < 0;
              // Fix the key generation for temporary messages
              const messageKey = isTemporaryMessage 
                ? `${message.message}-${Math.abs(message.id)}`
                : message.id.toString();
              const isSending = isTemporaryMessage && sendingMessages.has(messageKey);
              
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isClientMessage ? 'justify-end' : 'justify-start'} ${
                    isTemporaryMessage ? 'opacity-70' : ''
                  }`}
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
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl relative ${
                      isClientMessage
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-800'
                    } ${isTemporaryMessage ? 'border-2 border-dashed border-gray-400' : ''}`}
                  >
                    <p className="text-sm">{message.message}</p>
                    
                    {/* Loading indicator for temporary messages */}
                    {isTemporaryMessage && (
                      <div className="absolute -top-2 -right-2">
                        <div className="w-4 h-4 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                      </div>
                    )}
                    
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
                        {isTemporaryMessage && ' (sending...)'}
                      </p>
                      {isClientMessage && !isTemporaryMessage && (
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
          
          {/* Global sending indicator */}
          {isSending && (
            <div className="flex justify-end">
              <div className="bg-indigo-100 rounded-2xl px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-indigo-400 border-t-indigo-600 rounded-full animate-spin"></div>
                <span className="text-xs text-indigo-600">Sending message...</span>
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
              placeholder={isConnected ? (isSending ? "Sending message..." : "Type your message...") : "Connecting..."}
              disabled={!isConnected || !booking?.chatEnabled || isSending}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || !isConnected || !booking?.chatEnabled || isSending}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center min-w-[60px]"
            >
              {isSending ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
          
          {/* Connection status */}
          {!isConnected && (
            <div className="mt-2 text-center">
              <p className="text-xs text-red-500">Disconnected. Trying to reconnect...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 