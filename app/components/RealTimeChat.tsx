'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, X, MessageCircle } from 'lucide-react';
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
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  console.log('RealTimeChat mounted with bookingId:', bookingId);

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket connection
  useEffect(() => {
    const initializeSocket = async () => {
      try {
        // First, check if we have user data in localStorage (custom auth)
        const user = localStorage.getItem('user');
        if (!user) {
          console.log('No localStorage user data found, skipping socket connection');
          setError('User not authenticated - please login with normal login (not Google)');
          return;
        }

        const userData = JSON.parse(user);
        const socketUserId = userData.id;
        setCurrentUserId(socketUserId);
        console.log('Found localStorage user data - ID:', socketUserId);

        // For normal login users, we need a token. If not in localStorage, create one
        let token = localStorage.getItem('token');
        
        if (!token) {
          // Create a simple token for the localStorage user
          try {
            const response = await fetch('/api/auth/create-token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: socketUserId,
                email: userData.email,
                name: userData.name
              })
            });
            if (response.ok) {
              const data = await response.json();
              token = data.token;
              console.log('Created token for localStorage user');
            }
          } catch (error) {
            console.error('Failed to create token:', error);
          }
        }

        if (!token) {
          setError('Authentication token not available');
          return;
        }

        // Connect to socket server
        console.log('Connecting to socket with localStorage user ID:', socketUserId);
        console.log('Connecting to socket with token type:', typeof token);
        
        if (!token || typeof token !== 'string') {
          console.error('Invalid token for socket connection:', token);
          setError('Authentication failed - invalid token');
          return;
        }
        
        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
          auth: { 
            token,
            userId: socketUserId // Pass the correct user ID
          }
        });

        socketInstance.on('connect', () => {
          setIsConnected(true);
          console.log('Connected to chat server');
          
          // Join the booking room immediately after connection
          if (bookingId) {
            console.log('Joining booking room:', bookingId);
            socketInstance.emit('join-booking', { bookingId });
          }
        });

        socketInstance.on('disconnect', () => {
          setIsConnected(false);
          console.log('Disconnected from chat server');
        });

        socketInstance.on('error', (error) => {
          setError(error.message);
          if (error.message.includes('not paid')) {
            onPaymentRequired();
          }
        });

        socketInstance.on('joined-booking', (data) => {
          console.log('Successfully joined booking:', data);
          setBooking(prev => prev ? { ...prev, ...data } : null);
        });

        socketInstance.on('error', (error) => {
          console.error('Socket error:', error);
          setError(error.message || 'Socket connection error');
        });

        socketInstance.on('new-message', (message) => {
          // Check if message already exists to prevent duplicates
          setMessages(prev => {
            const messageExists = prev.some(msg => msg.id === message.id);
            if (messageExists) {
              console.log('Message already exists, skipping duplicate:', message.id);
              return prev;
            }
            console.log('Adding new message from socket:', message.id, message.senderType);
            return [...prev, message];
          });
        });

        socketInstance.on('video-call-request', (data) => {
          console.log('Received video call request:', data);
          // Handle incoming video call request
          if (data.type === 'video') {
            setError('Incoming video call... (Feature coming soon)');
          } else {
            setError('Incoming voice call... (Feature coming soon)');
          }
        });

        socketInstance.on('user-joined', (data) => {
          console.log('User joined:', data);
        });

        socketInstance.on('user-left', (data) => {
          console.log('User left:', data);
        });

        socketInstance.on('session-ended', (data) => {
          setError('Session has ended');
        });

        setSocket(socketInstance);

      } catch (error) {
        console.error('Socket initialization error:', error);
        setError('Failed to connect to chat');
      }
    };

    initializeSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [bookingId, onPaymentRequired]);

  // Load booking data and messages
  useEffect(() => {
    const loadBookingData = async () => {
      try {
        console.log('Loading booking data for bookingId:', bookingId);
        setIsLoading(true);
        
        // Get user token and client ID
        let token = localStorage.getItem('token');
        let clientId: number | null = null;
        
        // First, check if we have user data in localStorage (custom auth)
        const user = localStorage.getItem('user');
        if (user) {
          const userData = JSON.parse(user);
          clientId = userData.id;
          console.log('Using localStorage user data - clientId:', clientId);
          
          // If we don't have a token, create one for the localStorage user
          if (!token) {
            try {
              const response = await fetch('/api/auth/create-token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  userId: clientId,
                  email: userData.email,
                  name: userData.name
                })
              });
              if (response.ok) {
                const data = await response.json();
                token = data.token;
                console.log('Created token for localStorage user');
              }
            } catch (error) {
              console.error('Failed to create token:', error);
            }
          }
        } else {
          // No localStorage user data - show error
          console.log('No localStorage user data found');
          setError('Please login with normal login (not Google)');
          return;
        }

        if (!token || !clientId) {
          setError('User not authenticated');
          return;
        }

        // Validate token format
        if (typeof token !== 'string') {
          console.error('Invalid token format in loadBookingData:', typeof token, token);
          setError('Authentication failed - invalid token format');
          return;
        }

        console.log('Client ID:', clientId);
        console.log('Token before API calls:', typeof token, token);

        // Fetch all bookings for the client and find the specific booking
        console.log('Fetching all bookings for client...');
        const bookingResponse = await axios.get(`/api/user/booking?clientId=${clientId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Booking response:', bookingResponse.data);
        
        const bookingData = bookingResponse.data.bookings?.find((b: any) => b.id === bookingId);
        
        if (!bookingData) {
          console.log('Booking not found in response');
          setError('Booking not found');
          return;
        }

        console.log('Booking data loaded:', bookingData);

        // Check if booking is paid and chat is enabled
        if (!bookingData.isPaid) {
          console.log('Booking not paid, triggering payment required');
          setError('Payment required to start chat');
          onPaymentRequired();
          return;
        }

        if (!bookingData.chatEnabled) {
          console.log('Chat not enabled for booking');
          setError('Chat is not enabled for this booking');
          return;
        }

        setBooking(bookingData);

        // Now load messages
        console.log('Loading messages...');
        const messagesResponse = await axios.get(`/api/user/chat?bookingId=${bookingId}&clientId=${clientId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Messages response:', messagesResponse.data);
        
        if (messagesResponse.data.messages) {
          setMessages(messagesResponse.data.messages);
        }

      } catch (error: any) {
        console.error('Failed to load booking data:', error);
        setError(error.response?.data?.error || 'Failed to load booking data');
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId && bookingId > 0) {
      loadBookingData();
    } else {
      console.log('Invalid bookingId:', bookingId);
      setError('Invalid booking ID');
    }
  }, [bookingId, onPaymentRequired]);

  // Listen for new messages when socket connects
  useEffect(() => {
    if (socket) {
      // Listen for new messages
      socket.on('new-message', (message: Message) => {
        // Check if message already exists to prevent duplicates
        setMessages(prev => {
          const messageExists = prev.some(msg => msg.id === message.id);
          if (messageExists) {
            console.log('Message already exists, skipping duplicate:', message.id);
            return prev;
          }
          console.log('Adding new message:', message.id, message.senderType);
          return [...prev, message];
        });
      });

      return () => {
        socket.off('new-message');
      };
    }
  }, [socket]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !socket) return;

    const messageToSend = newMessage.trim();
    setNewMessage(''); // Clear input immediately for better UX

    try {
      // Get user token and client ID
      let token = localStorage.getItem('token');
      let clientId: number | null = null;
      
      const user = localStorage.getItem('user');
      if (user) {
        const userData = JSON.parse(user);
        clientId = userData.id;
        
        if (!token) {
          try {
            const response = await fetch('/api/auth/create-token', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: clientId,
                email: userData.email,
                name: userData.name
              })
            });
            if (response.ok) {
              const data = await response.json();
              token = data.token;
            }
          } catch (error) {
            console.error('Failed to create token:', error);
          }
        }
      } else {
        setError('Please login with normal login (not Google)');
        return;
      }

      if (!token || !clientId) {
        setError('User not authenticated');
        return;
      }

      // Send message via socket only (not API) to prevent duplicates
      socket.emit('send-message', {
        bookingId,
        message: messageToSend,
        messageType: 'text'
      });

    } catch (error: any) {
      console.error('Failed to send message:', error);
      setError('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVideoCall = () => {
    if (!booking?.videoEnabled) {
      setError('Video calls not available for this session');
      return;
    }
    
    if (!socket) {
      setError('Not connected to chat server');
      return;
    }
    
    // Emit video call request
    socket.emit('video-call-request', {
      bookingId,
      type: 'video'
    });
    
    console.log('Video call request sent');
    
    // Call the onVideoCall prop if provided
    if (onVideoCall) {
      onVideoCall();
    }
  };

  const handleVoiceCall = () => {
    if (!booking?.videoEnabled) {
      setError('Voice calls not available for this session');
      return;
    }
    
    if (!socket) {
      setError('Not connected to chat server');
      return;
    }
    
    // Emit voice call request
    socket.emit('video-call-request', {
      bookingId,
      type: 'voice'
    });
    
    console.log('Voice call request sent');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <span>Connecting to chat...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
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
              <p className="text-sm text-indigo-200">
                {isConnected ? 'Online' : 'Connecting...'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceCall}
              disabled={!booking?.videoEnabled}
              className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors disabled:opacity-50"
              title="Voice Call"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={handleVideoCall}
              disabled={!booking?.videoEnabled}
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
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesEndRef}>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              // Determine if this message is from the current user (client side)
              const isClientMessage = currentUserId && message.senderId === currentUserId;
              console.log('Rendering message:', {
                id: message.id,
                senderType: message.senderType,
                senderId: message.senderId,
                currentUserId: currentUserId,
                isClientMessage: isClientMessage,
                messageText: message.message.substring(0, 50) + '...'
              });
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
                    <p
                      className={`text-xs mt-1 ${
                        isClientMessage ? 'text-indigo-200' : 'text-slate-500'
                      }`}
                    >
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
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
          
          {isTyping && (
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
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
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