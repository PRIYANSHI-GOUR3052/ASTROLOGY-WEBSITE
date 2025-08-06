'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Send, Phone, Video, MessageCircle, Clock, User } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import RealTimeChat from '../../components/RealTimeChat';
import VideoCall from '../../components/VideoCall';

interface Chat {
  id: number;
  client: string;
  clientId: number;
  bookingId: number;
  lastMessage: string;
  timestamp: string;
  isPaid: boolean;
  chatEnabled: boolean;
  videoEnabled: boolean;
  status: 'active' | 'ended' | 'pending';
}

interface Message {
  id: number;
  senderId: number;
  senderType: 'client' | 'astrologer';
  message: string;
  messageType: string;
  createdAt: string;
}

const ConsultationsPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<{ id: number; client: { id: number; name: string } } | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [astrologer, setAstrologer] = useState<{ 
    id: number; 
    name: string; 
    email: string; 
    firstName?: string; 
    lastName?: string; 
    profileImage?: string; 
    pricePerChat?: number; 
  } | null>(null);
  const [astrologerId, setAstrologerId] = useState<number | null>(null);

  useEffect(() => {
    fetchAstrologerData();
    fetchBookings();
    initializeSocket();
  }, []);

  const fetchAstrologerData = async () => {
    try {
      const token = localStorage.getItem('astrologerToken');
      if (!token) {
        console.error('Astrologer not authenticated');
        return;
      }

      const response = await axios.get('/api/astrologer/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.astrologer) {
        setAstrologer(response.data.astrologer);
      }
    } catch (error) {
      console.error('Failed to fetch astrologer data:', error);
    }
  };

  const initializeSocket = async () => {
    try {
      // Get astrologer token from localStorage
      const astrologerToken = localStorage.getItem('astrologerToken');
      if (!astrologerToken) {
        console.error('Astrologer not authenticated');
        return;
      }

      // Get astrologer data to get the ID
      const astrologerResponse = await axios.get('/api/astrologer/profile', {
        headers: { Authorization: `Bearer ${astrologerToken}` }
      });
      
      const astrologerData = astrologerResponse.data.astrologer;
      setAstrologerId(astrologerData.id);
      console.log('Astrologer data for socket:', astrologerData);

      // Connect to socket server
      const { io } = await import('socket.io-client');
      const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
        auth: { 
          token: astrologerToken,
          userId: astrologerData.id,
          userRole: 'astrologer'
        }
      });

      socketInstance.on('connect', () => {
        console.log('Connected to chat server with socket ID:', socketInstance.id);
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        console.error('Socket error details:', {
          message: error.message,
          type: 'type' in error ? (error as { type: string }).type : 'unknown',
          description: 'description' in error ? (error as { description: string }).description : 'unknown'
        });
      });

      socketInstance.on('disconnect', (reason) => {
        console.log('Disconnected from chat server:', reason);
      });

      socketInstance.on('error', (error) => {
        console.error('Socket error event:', error);
      });

      socketInstance.on('new-message', (message) => {
        // Update chat list with new message
        setChats(prev => prev.map(chat => {
          if (chat.bookingId === message.bookingId) {
            return {
              ...chat,
              lastMessage: message.message,
              timestamp: message.createdAt
            };
          }
          return chat;
        }));
      });

      setSocket(socketInstance);
    } catch (error) {
      console.error('Socket initialization error:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      
      // Get astrologer token
      const token = localStorage.getItem('astrologerToken');
      if (!token) {
        console.error('Astrologer not authenticated');
        return;
      }

      const response = await axios.get('/api/astrologer/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const chatData = response.data.bookings.map((booking: { id: number; client: { name: string }; clientId: number; lastMessage?: string; updatedAt: string; isPaid: boolean; chatEnabled: boolean; videoEnabled: boolean; status: string }) => ({
        id: booking.id,
        client: booking.client.name,
        clientId: booking.clientId,
        bookingId: booking.id,
        lastMessage: booking.lastMessage || 'No messages yet',
        timestamp: booking.updatedAt,
        isPaid: booking.isPaid,
        chatEnabled: booking.chatEnabled,
        videoEnabled: booking.videoEnabled,
        status: booking.status
      }));

      setChats(chatData);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartChat = (chat: Chat) => {
    setSelectedBooking({
      id: chat.bookingId,
      client: {
        id: chat.clientId,
        name: chat.client
      }
    });
    setShowChat(true);
  };

  const handleStartVideoCall = (chat: Chat) => {
    setSelectedBooking({
      id: chat.bookingId,
      client: {
        id: chat.clientId,
        name: chat.client
      }
    });
    setShowVideoCall(true);
  };

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="text-lg font-medium text-slate-600">Loading consultations...</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="flex w-full h-[80vh] bg-white dark:bg-black rounded-xl shadow overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Left Chat List */}
      <div className="w-full md:w-1/4 border-r bg-[#FFF5E1] border-gray-300 dark:border-gray-700 dark:bg-midnight p-4 space-y-3">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Active Consultations</h2>
        
        {chats.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No active consultations</p>
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                'cursor-pointer p-3 rounded-lg transition border',
                activeChatId === chat.id
                  ? 'bg-[#FFE4B8] dark:bg-[#333] border-indigo-300'
                  : 'hover:bg-[#FFF1CC] dark:hover:bg-[#222] border-gray-200'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-purple-700 dark:text-purple-400 font-semibold">{chat.client}</h3>
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full',
                  chat.status === 'active' ? 'bg-green-100 text-green-700' :
                  chat.status === 'ended' ? 'bg-gray-100 text-gray-700' :
                  'bg-yellow-100 text-yellow-700'
                )}>
                  {chat.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 italic truncate mb-2">
                {chat.lastMessage}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {new Date(chat.timestamp).toLocaleString()}
                </span>
                
                <div className="flex gap-1">
                  {chat.isPaid && chat.chatEnabled && (
                    <button
                      onClick={() => handleStartChat(chat)}
                      className="p-1 bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200 transition-colors"
                      title="Start Chat"
                    >
                      <MessageCircle className="w-3 h-3" />
                    </button>
                  )}
                  
                  {chat.isPaid && chat.videoEnabled && (
                    <button
                      onClick={() => handleStartVideoCall(chat)}
                      className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                      title="Start Video Call"
                    >
                      <Video className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Right Chat Panel */}
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700 text-lg font-semibold text-gray-800 dark:text-white">
              Chat with {activeChat.client}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {/* Placeholder for messages - would be replaced with real messages */}
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>Click on a consultation to start chatting</p>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 rounded-full px-4 py-2 bg-gray-100 dark:bg-[#222] text-gray-900 dark:text-white focus:outline-none"
                disabled
              />
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full disabled:opacity-50"
                disabled
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">No consultation selected</h3>
              <p>Choose a consultation from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>

      {/* Real-time Chat Modal */}
      {showChat && selectedBooking && astrologer && (
        <RealTimeChat
          bookingId={selectedBooking.id}
          astrologer={{
            id: astrologer.id,
            firstName: astrologer.firstName || '',
            lastName: astrologer.lastName || '',
            profileImage: astrologer.profileImage || '/placeholder-user.jpg',
            pricePerChat: astrologer.pricePerChat || 0
          }}
          onClose={() => setShowChat(false)}
          onPaymentRequired={() => setShowChat(false)}
          onVideoCall={() => {
            setShowChat(false);
            setShowVideoCall(true);
          }}
        />
      )}

      {/* Video Call Modal */}
      {showVideoCall && selectedBooking && socket && astrologer && (
        <VideoCall
          bookingId={selectedBooking.id}
          astrologer={{
            id: astrologer.id,
            firstName: astrologer.firstName || '',
            lastName: astrologer.lastName || '',
            profileImage: astrologer.profileImage || '/placeholder-user.jpg'
          }}
          onClose={() => setShowVideoCall(false)}
          socket={socket}
        />
      )}
    </motion.div>
  );
};

export default ConsultationsPage;
