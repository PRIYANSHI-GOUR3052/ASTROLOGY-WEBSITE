"use client"

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Shield,
  Award,
  Star,
  MessageCircle,
  Calendar,
  BookOpen,
  User,
  Phone,
  Video,
  Send,
  Clock,
  Heart
} from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Image from 'next/image';

// Add/strengthen types for all state and function parameters
interface Booking {
  id: number;
  date: string;
  time?: string;
  status: string;
  canRate?: boolean;
  rating?: number;
  client?: { name?: string; email?: string };
  [key: string]: unknown;
}
interface Slot {
  id: number;
  date: string;
  start: string;
  end: string;
  [key: string]: unknown;
}
interface User {
  id: number | string;
  name?: string;
  email?: string;
  [key: string]: unknown;
}

const initialMessages = [
  {
    id: 1,
    sender: 'astrologer',
    text: 'Namaste! Welcome to my consultation space. I\'m here to guide you through your spiritual journey. How can I help you today?',
    time: '10:30 AM',
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    sender: 'user',
    text: 'Hello! I wanted to ask about my career prospects for the coming year.',
    time: '10:32 AM',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2d4b32e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    sender: 'astrologer',
    text: 'I\'d be happy to help you with career guidance. Could you please share your birth details - date, time, and place of birth?',
    time: '10:33 AM',
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
];

const initialBookedSlots = [
  {
    id: 1,
    date: "Dec 15, 2024",
    time: "3:00 PM",
    status: "completed",
    canRate: true,
    rating: 0
  },
  {
    id: 2,
    date: "Dec 12, 2024",
    time: "11:00 AM",
    status: "completed",
    canRate: false,
    rating: 5
  },
  {
    id: 3,
    date: "Dec 20, 2024",
    time: "2:00 PM",
    status: "upcoming",
    canRate: false,
    rating: 0
  }
];

interface TabButtonProps {
  tab: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: (tab: string) => void;
}
const TabButton: React.FC<TabButtonProps> = ({ tab, icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={() => onClick(tab)}
    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all font-medium ${isActive
      ? 'bg-indigo-600 text-white shadow-md'
      : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
      }`}
  >
    <Icon className="w-4 h-4" />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export default function AstrologerProfile() {
  // All hooks at the top
  const params = useParams<{ id: string }>();
  const astrologerIdParam = params?.id || '';
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Booking[]>(initialBookedSlots as Booking[]);
  const [bookingStatus, setBookingStatus] = useState('');
  const [ratingSlot, setRatingSlot] = useState<number | null>(null);
  const [userRating, setUserRating] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [astrologer, setAstrologer] = useState({
    id: '1',
    firstName: 'Dr. Yogeshwara',
    lastName: 'Sharma',
    title: 'Vedic Astrologer & Spiritual Guide',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    verificationStatus: 'approved',
    yearsOfExperience: 15,
    rating: 4.8,
    totalRatings: 1250,
    orders: 2500,
    price: 25,
    areasOfExpertise: 'Career,Relationships,Health,Finance',
    availability: 'Online',
    about: 'With over 15 years of experience in Vedic astrology, I specialize in providing accurate predictions and spiritual guidance to help you navigate through life\'s challenges.',
    skills: ['Vedic Astrology', 'Numerology', 'Palmistry', 'Vastu Shastra'],
    languages: ['Hindi', 'English', 'Sanskrit'],
    responseTime: 'Within 2 hours'
  });
  const [astrologerLoading, setAstrologerLoading] = useState(true);
  const [astrologerError, setAstrologerError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [rateLoading, setRateLoading] = useState(false);
  const [rateError, setRateError] = useState('');

  // 4. Fetch user from localStorage
  useEffect(() => {
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error('Failed to parse user data');
        localStorage.removeItem('user');
      }
    }
    setUserLoading(false);
  }, []);

  // 5. Fetch astrologer details
  useEffect(() => {
    if (!astrologerIdParam || !astrologerIdParam.trim()) return;
    setAstrologerLoading(true);
    setAstrologerError('');
    const controller = new AbortController();
    axios.get(`/api/user/astrologer/${astrologerIdParam}`, { signal: controller.signal })
      .then(res => {
        if (res.data?.astrologer) {
          setAstrologer(res.data.astrologer);
        } else {
          throw new Error('Invalid response format');
        }
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          setAstrologerError('Failed to load astrologer details');
          console.error('Astrologer fetch error:', error);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setAstrologerLoading(false);
        }
      });
    return () => controller.abort();
  }, [astrologerIdParam]);

  // 6. fetchUserBookings as useCallback
  const fetchUserBookings = useCallback(async (clientId: string | number) => {
    if (!clientId || isNaN(Number(clientId))) return;
    try {
      const res = await axios.get(`/api/user/booking?clientId=${clientId}`);
      setBookedSlots(res.data?.bookings || []);
    } catch (error) {
      console.error('Failed to fetch user bookings:', error);
    }
  }, []);

  // 7. Refetch on tab switch
  useEffect(() => {
    if (!astrologer?.id) return;
    if (activeTab === 'slots') {
      setSlotsLoading(true);
      setSlotsError('');
      axios.get(`/api/user/booking?availableSlots=1&astrologerId=${astrologer.id}`)
        .then(res => {
          setAvailableSlots(res.data || []);
          setSlotsLoading(false);
        })
        .catch(() => {
          setSlotsError('Failed to fetch available slots');
          setSlotsLoading(false);
        });
    } else if (activeTab === 'booked' && user && user.id) {
      fetchUserBookings(user.id);
    }
  }, [activeTab, astrologer?.id, user, fetchUserBookings]);

  // 8. slotsByDate with useMemo
  const slotsByDate = useMemo<Record<string, Slot[]>>(() => {
    if (!availableSlots?.length) return {};
    return availableSlots.reduce((acc: Record<string, Slot[]>, slot: Slot) => {
      if (!slot?.date) return acc;
      try {
        const dateStr = new Date(slot.date).toLocaleDateString(undefined, {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
        if (!acc[dateStr]) acc[dateStr] = [];
        acc[dateStr].push(slot);
      } catch (error) {
        console.error('Invalid slot date:', slot.date, error);
      }
      return acc;
    }, {});
  }, [availableSlots]);

  // 9. Cleanup for bookingStatus timer
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (bookingStatus) {
      timeoutId = setTimeout(() => setBookingStatus(''), 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [bookingStatus]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 2. Conditional rendering for loading/error
  const LoadingSpinner = ({ size = 'md', text = '' }: { size?: 'sm' | 'md' | 'lg'; text?: string }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    };
    return (
      <div className="flex items-center justify-center gap-2 py-4">
        <div className={`${sizeClasses[size]} border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin`}></div>
        {text && <span className="text-slate-600">{text}</span>}
      </div>
    );
  };

  if (userLoading || astrologerLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="text-lg font-medium text-slate-600">
            {userLoading ? 'Loading user data...' : 'Loading astrologer details...'}
          </div>
        </div>
      </div>
    );
  }
  if (astrologerError || !astrologer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">Failed to load astrologer details</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2d4b32e?w=150&h=150&fit=crop&crop=face'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const astrologerReply = {
        id: messages.length + 2,
        sender: 'astrologer',
        text: "Thank you for sharing. Let me analyze your birth chart and provide you with detailed insights about your career prospects.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      };
      setMessages(prev => [...prev, astrologerReply]);
      setIsTyping(false);
    }, 2000);
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) return;
    if (!user?.id) {
      setBookingError('User not logged in.');
      return;
    }
    setBookingLoading(true);
    setBookingError('');
    try {
      // Parse the selectedSlot date and start time into a valid ISO string
      // selectedSlot.date is like 'Tuesday, Jul 22, 2025', selectedSlot.start is '09:37'
      const [, monthDay, year] = selectedSlot.date.split(',').map((s: string) => s.trim());
      // monthDay: 'Jul 22', year: '2025', start: '09:37'
      const [monthStr, dayStr] = monthDay.split(' ');
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const month = months.indexOf(monthStr);
      const day = parseInt(dayStr, 10);
      const [hour, minute] = selectedSlot.start.split(':').map(Number);
      const dateObj = new Date(Number(year), month, day, hour, minute);
      const isoDate = dateObj.toISOString();
      await axios.post('/api/user/booking', {
        astrologerId: astrologer?.id,
        clientId: user.id,
        date: isoDate,
        type: 'chat',
      });
      setBookingStatus('Slot booked successfully!');
      setSelectedSlot(null);
      fetchUserBookings(user.id);
    } catch (e: unknown) {
      const err = e as { response?: { data?: { error?: string } } };
      setBookingError(err.response?.data?.error || 'Failed to book slot');
    } finally {
      setBookingLoading(false);
      setTimeout(() => setBookingStatus(''), 3000);
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    setCancelLoading(true);
    setCancelError('');
    try {
      await axios.patch('/api/user/booking', { bookingId, action: 'cancel' });
      fetchUserBookings(user?.id ?? '');
    } catch (e: unknown) {
      const err = e as { response?: { data?: { error?: string } } };
      setCancelError(err.response?.data?.error || 'Failed to cancel booking');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleSubmitRating = async () => {
    if (!ratingSlot || userRating === 0) return;
    setRateLoading(true);
    setRateError('');
    try {
      await axios.patch('/api/user/booking', { bookingId: ratingSlot, action: 'rate', rating: userRating });
      fetchUserBookings(user?.id ?? '');
      setRatingSlot(null);
      setUserRating(0);
    } catch (e: unknown) {
      const err = e as { response?: { data?: { error?: string } } };
      setRateError(err.response?.data?.error || 'Failed to submit rating');
    } finally {
      setRateLoading(false);
    }
  };

  // availableSlots is now a flat array of slots, not grouped by day
  // Group slots by date for display
  // const slotsByDate = availableSlots.reduce((acc, slot) => {
  //   const dateStr = new Date(slot.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  //   if (!acc[dateStr]) acc[dateStr] = [];
  //   acc[dateStr].push(slot);
  //   return acc;
  // }, {});

  // Show loading state while checking for user
  // if (userLoading) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  // }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-inter">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
          <div className="flex items-center gap-4 mb-4">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-700" />
            </button>
            <h1 className="text-2xl font-bold text-slate-800">Astrologer Details</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Profile Info */}
            <div className="flex gap-4">
              <div className="relative">
                <Image
                  src={astrologer?.profileImage}
                  alt={`${astrologer?.firstName} ${astrologer?.lastName}`}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-300"
                />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-slate-800">{`${astrologer?.firstName} ${astrologer?.lastName}`}</h2>
                  {astrologer?.verificationStatus === 'approved' && <CheckCircle className="w-5 h-5 text-indigo-600" />}
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-indigo-600 font-medium mb-2">{astrologer?.title}</p>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    {astrologer?.yearsOfExperience} years exp
                  </div>
                  {/* <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {astrologer?.languages.join(", ")}
                  </div> */}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 lg:ml-auto">
              <div className="text-center">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-lg text-slate-800">{astrologer?.rating}</span>
                </div>
                <p className="text-xs text-slate-500">{astrologer?.totalRatings} ratings</p>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-slate-800">{astrologer?.orders}</div>
                <p className="text-xs text-slate-500">consultations</p>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-emerald-600">₹{astrologer?.price}</div>
                <p className="text-xs text-slate-500">per minute</p>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="mt-4 flex flex-wrap gap-2">
            {astrologer?.areasOfExpertise?.split(',').map(specialty => (
              <span key={specialty} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 p-1 bg-white rounded-xl shadow-sm border border-slate-200">
          <TabButton tab="chat" icon={MessageCircle} label="Chat" isActive={activeTab === 'chat'} onClick={setActiveTab} />
          <TabButton tab="slots" icon={Calendar} label="Book Slots" isActive={activeTab === 'slots'} onClick={setActiveTab} />
          <TabButton tab="booked" icon={BookOpen} label="My Bookings" isActive={activeTab === 'booked'} onClick={setActiveTab} />
          <TabButton tab="about" icon={User} label="About" isActive={activeTab === 'about'} onClick={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg min-h-96 border border-slate-200">
          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="h-96 flex flex-col">
              <div className="p-4 border-b bg-indigo-600 text-white rounded-t-2xl">
                <div className="flex items-center gap-3">
                  <Image src={astrologer?.profileImage} alt={`${astrologer?.firstName} ${astrologer?.lastName}`} width={40} height={40} className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-semibold">{`${astrologer?.firstName} ${astrologer?.lastName}`}</h3>
                    <p className="text-sm text-indigo-200">{astrologer?.availability}</p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(message => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                    {message.sender === 'astrologer' && (
                      <Image src={message.avatar} alt="" width={32} height={32} className="w-8 h-8 rounded-full" />
                    )}
                    <div className={`max-w-xs lg:max-w-md ${message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-800'
                      } rounded-2xl px-4 py-2`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-indigo-200' : 'text-slate-500'
                        }`}>
                        {message.time}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <Image src={message.avatar} alt="" width={32} height={32} className="w-8 h-8 rounded-full" />
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <Image src={astrologer?.profileImage} alt="" width={32} height={32} className="w-8 h-8 rounded-full" />
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

              <div className="p-4 border-t border-slate-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Slots Tab */}
          {activeTab === 'slots' && (
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-slate-800">Available Slots</h3>
              {slotsLoading && <LoadingSpinner size="sm" text="Loading slots..." />}
              {slotsError && <div className="text-red-600 mb-2">{slotsError}</div>}
              {!slotsLoading && !slotsError && (
              <div className="space-y-6">
                  {Object.keys(slotsByDate).length === 0 && <div>No slots available.</div>}
                  {Object.entries(slotsByDate).map(([date, slots]) => (
                    <div key={date}>
                      <h4 className="font-semibold text-slate-700 mb-3">{date}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {slots.map((slot: Slot, slotIndex: number) => (
                        <button
                          key={slotIndex}
                            onClick={() => setSelectedSlot({ ...slot, date })}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedSlot?.id === slot.id
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-white text-gray-900 hover:bg-slate-50 border-slate-200 hover:border-indigo-300'
                            }`}
                        >
                          <div className="flex items-center gap-2 justify-center">
                            <Clock className="w-4 h-4" />
                              <span className="text-sm font-medium">{slot.start} - {slot.end}</span>
                          </div>
                            <div className="text-xs text-emerald-600 mt-1">Slot</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              )}

              {selectedSlot && (
                <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold mb-2 text-slate-800">Selected Slot</h4>
                  <p className="text-sm text-slate-600">
                    {selectedSlot.date} at {selectedSlot.start} - {selectedSlot.end}
                  </p>
                  {bookingError && <div className="text-red-600 mb-2">{bookingError}</div>}
                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={handleBookSlot}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      disabled={bookingLoading}
                    >
                      {bookingLoading ? 'Booking...' : 'Book Now'}
                    </button>
                    <button
                      onClick={() => setSelectedSlot(null)}
                      className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                      disabled={bookingLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {bookingStatus && (
                <div className="mt-4 p-3 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                  {bookingStatus}
                </div>
              )}
            </div>
          )}

          {/* Booked Slots Tab */}
          {activeTab === 'booked' && (
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-slate-800">My Bookings</h3>
              {cancelError && <div className="text-red-600 mb-2">{cancelError}</div>}
              <div className="space-y-4">
                {bookedSlots.map((slot: Booking) => (
                  <div key={slot.id} className="mx-auto p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <div className="mx-auto flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-slate-800">
                          {new Date(slot.date).toLocaleDateString()} at {new Date(slot.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </h4>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${slot.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                          }`}>
                          {slot.status}
                        </span>
                        {/* Show client name/email if available */}
                        {(slot as Booking).client && (
                          <div className="text-xs text-slate-500 mt-1">
                            Client: {(slot as Booking).client?.name || ''} ({(slot as Booking).client?.email || ''})
                          </div>
                        )}
                      </div>
                      {slot.status === 'upcoming' && (
                        <button
                          onClick={() => handleCancelBooking(slot.id)}
                          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                          disabled={cancelLoading}
                        >
                          {cancelLoading ? 'Cancelling...' : 'Cancel'}
                        </button>
                      )}
                      {slot.canRate && !slot.rating && (
                        <button
                          onClick={() => setRatingSlot(slot.id)}
                          className="px-4 py-2 bg-amber-400 text-slate-800 rounded-lg hover:bg-amber-500 transition-colors"
                        >
                          Rate Session
                        </button>
                      )}
                      {slot.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-slate-600">Your rating:</span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${star <= (slot.rating ?? 0) ? 'text-amber-400 fill-current' : 'text-slate-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Rating Modal */}
              {ratingSlot && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 border border-slate-200">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800">Rate your session</h3>
                    {rateError && <div className="text-red-600 mb-2">{rateError}</div>}
                    <div className="flex justify-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setUserRating(star)}
                          className={`w-8 h-8 ${star <= userRating ? 'text-amber-400 fill-current' : 'text-slate-300'} hover:text-amber-400 transition-colors`}
                        >
                          <Star className="w-full h-full" />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSubmitRating}
                        disabled={userRating === 0 || rateLoading}
                        className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {rateLoading ? 'Submitting...' : 'Submit Rating'}
                      </button>
                      <button
                        onClick={() => {
                          setRatingSlot(null);
                          setUserRating(0);
                        }}
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 text-slate-800">About Dr. Yogeshwara</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-slate-600 leading-relaxed">{astrologer?.about}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-slate-800">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {(astrologer?.skills ?? []).map((skill: string) => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-slate-800">Languages</h4>
                  <p className="text-slate-600">{astrologer?.languages.join(", ")}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-slate-800">Response Time</h4>
                  <p className="text-slate-600">{astrologer?.responseTime}</p>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                  <button className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors">
                    <Heart className="w-4 h-4" />
                    Add to Favorites
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
                    <Shield className="w-4 h-4" />
                    Report
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}