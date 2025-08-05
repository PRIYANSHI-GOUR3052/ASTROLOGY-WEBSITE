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
  Heart,
  Globe
} from 'lucide-react';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { LANGUAGE_NAMES } from '../../contexts/LanguageContext';
import RealTimeChat from '../../components/RealTimeChat';
import VideoCall from '../../components/VideoCall';
import PaymentModal from '../../components/PaymentModal';

// Add/strengthen types for all state and function parameters
interface Booking {
  id: number;
  date: string;
  time?: string;
  status: string;
  canRate?: boolean;
  rating?: number;
  client?: { name?: string; email?: string };
  isPaid?: boolean;
  chatEnabled?: boolean;
  videoEnabled?: boolean;
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

interface Astrologer {
  id: string | number;
  firstName: string;
  lastName: string;
  title: string;
  profileImage: string;
  verificationStatus: string;
  yearsOfExperience: number;
  rating: number;
  totalRatings: number;
  orders: number;
  price: number;
  pricePerChat: number;
  areasOfExpertise: string;
  availability: string;
  about: string;
  skills: string[];
  languages: string | string[];
  responseTime: string;
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
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Booking[]>(initialBookedSlots as Booking[]);
  const [bookingStatus, setBookingStatus] = useState('');
  const [ratingSlot, setRatingSlot] = useState<number | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');
  const [astrologer, setAstrologer] = useState<Astrologer>({
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
    pricePerChat: 25,
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
  const [showChat, setShowChat] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentBookingId, setCurrentBookingId] = useState<number | null>(null);
  const [isFetchingBookings, setIsFetchingBookings] = useState(false);

  // 6. fetchUserBookings as useCallback - moved here to avoid initialization error
  const fetchUserBookings = useCallback(async (clientId: string | number) => {
    if (!clientId || isNaN(Number(clientId))) {
      console.log('Invalid clientId:', clientId);
      return;
    }

    if (!astrologer?.id) {
      console.log('Astrologer ID not available yet');
      return;
    }

    // Prevent multiple simultaneous calls
    if (isFetchingBookings) {
      console.log('Already fetching bookings, skipping...');
      return;
    }

    setIsFetchingBookings(true);

    // Add a small delay to prevent rapid successive calls
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
      console.log('Fetching bookings for clientId:', clientId, 'astrologerId:', astrologer.id);
      const res = await axios.get(`/api/user/booking?clientId=${clientId}`);
      const allBookings = res.data?.bookings || [];

      console.log('All bookings fetched:', allBookings);
      console.log('Current astrologer ID:', astrologer?.id);

      // Filter bookings for the current astrologer and sort by date (latest first)
      const currentAstrologerBookings = allBookings
        .filter((booking: { astrologerId: number; date: string }) => booking.astrologerId === Number(astrologer?.id))
        .sort((a: { date: string }, b: { date: string }) => new Date(b.date).getTime() - new Date(a.date).getTime());

      console.log('Filtered and sorted bookings for current astrologer:', currentAstrologerBookings);
      console.log('Booking details:', currentAstrologerBookings.map((b: { id: number; date: string; status: string; isPaid: boolean; chatEnabled: boolean; videoEnabled: boolean }) => ({
        id: b.id,
        date: b.date,
        status: b.status,
        isPaid: b.isPaid,
        chatEnabled: b.chatEnabled,
        videoEnabled: b.videoEnabled
      })));

      setBookedSlots(currentAstrologerBookings);

      // Find the most recent active booking (paid and enabled)
      const latestActiveBooking = currentAstrologerBookings.find((booking: { isPaid: boolean; chatEnabled: boolean; videoEnabled: boolean; status: string; id: number }) =>
        booking.isPaid && (booking.chatEnabled || booking.videoEnabled) &&
        (booking.status === 'upcoming' || booking.status === 'accepted' || booking.status === 'active')
      );

      if (latestActiveBooking) {
        setBookingStatus('You have an active booking. Chat and video features are available.');
        // Set the current booking ID to the latest active booking
        setCurrentBookingId(latestActiveBooking.id);
      } else {
        // Check if there's an unpaid booking that needs payment
        const unpaidBooking = currentAstrologerBookings.find((booking: { status: string; isPaid: boolean; id: number }) =>
          (booking.status === 'upcoming' || booking.status === 'accepted') && !booking.isPaid
        );
        if (unpaidBooking) {
          setCurrentBookingId(unpaidBooking.id);
          setBookingStatus('Payment required to unlock chat and video features.');
        } else {
          setCurrentBookingId(null);
          setBookingStatus('');
        }
      }

    } catch (error) {
      console.error('Failed to fetch user bookings:', error);
      // Don't clear existing bookings on error
    } finally {
      setIsFetchingBookings(false);
    }
  }, [astrologer?.id, isFetchingBookings]);

  // Define handlePaymentSuccess early to avoid scope issues
  const handlePaymentSuccess = () => {
    console.log('Payment successful, updating booking state...');
    setShowPayment(false);
    setCurrentBookingId(null);
    setBookingStatus('Payment successful! Chat and video features are now unlocked.');

    // Immediately update the bookedSlots state to reflect payment success
    setBookedSlots(prevSlots =>
      prevSlots.map(slot => {
        if (slot.status === 'upcoming' || slot.status === 'active') {
          return {
            ...slot,
            isPaid: true,
            chatEnabled: true,
            videoEnabled: true
          };
        }
        return slot;
      })
    );

    // Refresh user bookings to get updated payment status from database
    if (user?.id) {
      console.log('Refreshing bookings after payment success for user:', user.id);
      // Add a small delay to ensure the payment API has updated the database
      setTimeout(() => {
        fetchUserBookings(user.id);
      }, 1000);
    }
  };

  // 4. Fetch user from localStorage or session using auth utility
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setUserLoading(true);
        
        // Import the auth utility dynamically to avoid SSR issues
        const { getCurrentUser: getAuthUser } = await import('@/lib/auth-client');
        const authResult = await getAuthUser();
        
        if (authResult.user) {
          console.log('Found authenticated user:', authResult.user);
          setUser(authResult.user as User);
          
          // Store the JWT token for socket authentication if available
          if (authResult.token) {
            localStorage.setItem('token', authResult.token);
            console.log('Stored JWT token for authenticated user');
          }
        } else {
          console.log('No authenticated user found:', authResult.error);
          setUser(null);
        }
      } catch (error) {
        console.error('Error getting user:', error);
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  // Fetch user bookings when user is loaded
  useEffect(() => {
    let isMounted = true;

    if (user?.id && astrologer?.id && !userLoading) {
      console.log('Loading bookings on mount/update for user:', user.id, 'astrologer:', astrologer.id);
      console.log('User data:', user);

      // Use setTimeout to allow for cleanup
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          fetchUserBookings(user.id);
        }
      }, 100);

      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
      };
    } else if (!userLoading && !user?.id) {
      console.log('No authenticated user found');
    }
  }, [user?.id, astrologer?.id, userLoading]); // Removed fetchUserBookings from dependencies

  // Single effect to handle tab changes and refresh bookings when needed
  useEffect(() => {
    let isMounted = true;

    if (user?.id && astrologer?.id && (activeTab === 'booked' || activeTab === 'chat')) {
      console.log(`Tab changed to ${activeTab}, refreshing bookings...`);

      // Use setTimeout to allow for cleanup
      const timeoutId = setTimeout(() => {
        if (isMounted) {
          fetchUserBookings(user.id);
        }
      }, 100);

      return () => {
        isMounted = false;
        clearTimeout(timeoutId);
      };
    }
  }, [activeTab, user?.id, astrologer?.id]); // Removed fetchUserBookings from dependencies

  // Initialize socket for video calls
  useEffect(() => {
    // Wait for user loading to complete before initializing socket
    if (userLoading) {
      return;
    }
  
    const initializeSocket = async () => {
      try {
        // Get user data and token
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (!storedUser || !token) {
          console.log('No user or token found, skipping socket initialization');
          return;
        }
  
        let userData;
        try {
          userData = JSON.parse(storedUser);
        } catch {
          console.log('Failed to parse user data, skipping socket initialization');
          return;
        }
  
        if (!userData.id) {
          console.log('No user ID found, skipping socket initialization');
          return;
        }
  
        console.log('Initializing socket connection for user:', userData.id);
  
        // Import socket.io-client dynamically
        const { io } = await import('socket.io-client');
        const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
          auth: { 
            token,
            userId: userData.id,
            userRole: 'client'
          },
          transports: ['websocket', 'polling'],
          timeout: 20000,
          forceNew: true // Force a new connection
        });
  
        socketInstance.on('connect', () => {
          console.log('Connected to socket server with ID:', socketInstance.id);
          setSocket(socketInstance); // Set socket only after successful connection
        });
  
        socketInstance.on('connect_error', (error) => {
          console.error('Socket connection error:', error);
          setBookingError('Failed to connect to video service. Please refresh the page.');
        });
  
        socketInstance.on('disconnect', (reason) => {
          console.log('Disconnected from socket server:', reason);
          setSocket(null);
        });
  
        socketInstance.on('error', (error) => {
          console.error('Socket error:', error);
          setBookingError('Video service error. Please try again.');
        });
  
      } catch (error) {
        console.error('Failed to initialize socket:', error);
        setBookingError('Failed to initialize video service.');
      }
    };
  
    initializeSocket();
  
    // Cleanup function
    return () => {
      if (socket) {
        console.log('Cleaning up socket connection');
        socket.disconnect();
        setSocket(null);
      }
    };
  }, [userLoading, user?.id]);
  
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

  // After fetching astrologer, normalize languages if needed
  useEffect(() => {
    if (astrologer && typeof astrologer.languages === 'string') {
      setAstrologer((prev: Astrologer) => ({
        ...prev,
        languages: astrologer.languages ? (astrologer.languages as string).split(',').map((l: string) => l.trim()) : [],
      }));
    }
  }, [astrologer?.languages]);

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
  }, [activeTab, astrologer?.id, user]);

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

  // Show login prompt if user is not authenticated
  if (!userLoading && !user?.id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">Please log in to view astrologer details</div>
          <button
            onClick={() => window.location.href = '/signin'}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Go to Login
          </button>
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

  const handleStartChat = async () => {
    console.log('handleStartChat called with user:', user);
    
    if (!user?.id) {
      console.log('No user ID found, showing error');
      setBookingError('Please log in to start chat');
      return;
    }

    console.log('Current bookedSlots:', bookedSlots);
    console.log('Current astrologer ID:', astrologer?.id);

    // Use the current booking ID if available, otherwise find the latest booking
    let userBooking = null;
    if (currentBookingId) {
      userBooking = bookedSlots.find(slot => slot.id === currentBookingId);
    }

    // If no current booking ID or booking not found, find the latest booking
    if (!userBooking) {
      userBooking = bookedSlots.find(slot =>
        slot.status === 'upcoming' || slot.status === 'accepted' || slot.status === 'active'
      );
    }

    console.log('Found user booking:', userBooking);

    if (!userBooking) {
      setBookingError('Please book a slot first to start chat');
      return;
    }

    // Set the current booking ID
    setCurrentBookingId(userBooking.id);

    // Check if booking is paid - if not, show payment modal
    if (!userBooking.isPaid || !userBooking.chatEnabled) {
      if (!userBooking.id || userBooking.id === 0) {
        setBookingError('Invalid booking. Please try booking again.');
        return;
      }
      setShowPayment(true);
      return;
    }

    // If paid, start chat directly
    setShowChat(true);
  };

  const handleStartVideoCall = async () => {
    console.log('handleStartVideoCall called');

    if (!user?.id) {
      setBookingError('Please log in to start video call');
      return;
    }

    if (!socket) {
      setBookingError('Socket connection not available. Please refresh the page.');
      return;
    }

    // Use the current booking ID if available, otherwise find the latest booking
    let userBooking = null;
    if (currentBookingId) {
      userBooking = bookedSlots.find(slot => slot.id === currentBookingId);
    }

    // If no current booking ID or booking not found, find the latest booking
    if (!userBooking) {
      userBooking = bookedSlots.find(slot =>
        slot.status === 'upcoming' || slot.status === 'accepted' || slot.status === 'active'
      );
    }

    console.log('Found user booking for video call:', userBooking);

    if (!userBooking) {
      setBookingError('Please book a slot first to start video call');
      return;
    }

    // Set the current booking ID
    setCurrentBookingId(userBooking.id);

    // Check if booking is paid - if not, show payment modal
    if (!userBooking.isPaid || !userBooking.videoEnabled) {
      if (!userBooking.id || userBooking.id === 0) {
        setBookingError('Invalid booking. Please try booking again.');
        return;
      }
      console.log('Booking not paid, showing payment modal');
      setShowPayment(true);
      return;
    }

    // If paid, start video call directly
    console.log('Starting video call for booking:', userBooking.id);
    setShowVideoCall(true);
  };

  // Create properly typed astrologer objects for components
  const chatAstrologer = {
    id: Number(astrologer.id),
    firstName: astrologer.firstName,
    lastName: astrologer.lastName,
    profileImage: astrologer.profileImage,
    pricePerChat: astrologer.pricePerChat
  };

  const videoAstrologer = {
    id: Number(astrologer.id),
    firstName: astrologer.firstName,
    lastName: astrologer.lastName,
    profileImage: astrologer.profileImage
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
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months.indexOf(monthStr);
      const day = parseInt(dayStr, 10);
      const [hour, minute] = selectedSlot.start.split(':').map(Number);
      const dateObj = new Date(Number(year), month, day, hour, minute);
      const isoDate = dateObj.toISOString();

      const bookingResponse = await axios.post('/api/user/booking', {
        astrologerId: astrologer?.id,
        clientId: user.id,
        date: isoDate,
        type: 'chat',
      });

      // After successful booking, show payment modal
      if (bookingResponse.data.success) {
        setSelectedSlot(null);
        // Store the booking ID for payment
        const bookingId = bookingResponse.data.booking?.id;
        if (bookingId) {
          setCurrentBookingId(bookingId);
          // Refresh bookings to include the new booking
          fetchUserBookings(user.id);
          // Show payment modal immediately after booking
          setShowPayment(true);
        }
      }
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
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {(() => {
                      if (Array.isArray(astrologer?.languages)) {
                        return astrologer.languages.map(code =>
                          LANGUAGE_NAMES[code.trim() as keyof typeof LANGUAGE_NAMES] || code.trim()
                        ).join(', ');
                      } else if (typeof astrologer?.languages === 'string') {
                        return astrologer.languages.split(',').map(code =>
                          LANGUAGE_NAMES[code.trim() as keyof typeof LANGUAGE_NAMES] || code.trim()
                        ).join(', ');
                      }
                      return '';
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-6 lg:ml-auto">
              <div className="text-center">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-lg text-slate-800">4.5</span>
                </div>
                <p className="text-xs text-slate-500">{astrologer?.totalRatings} ratings</p>
              </div>
              {/* <div className="text-center">
                <div className="font-bold text-lg text-slate-800">{astrologer?.orders}</div>
                <p className="text-xs text-slate-500">consultations</p>
              </div> */}
              <div className="text-center">
                <div className="font-bold text-lg text-emerald-600">₹{astrologer?.pricePerChat}</div>
                <p className="text-xs text-slate-500">per chat</p>
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
                    <button
                      onClick={handleStartChat}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="Start Chat"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Video call button clicked in header');
                        handleStartVideoCall();
                      }}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                      title="Start Video Call"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Booking Status Indicator */}
                {user && (
                  <div className="mt-3 pt-3 border-t border-indigo-500">
                    {(() => {
                      // Use current booking ID if available, otherwise find the latest booking
                      let userBooking = null;
                      if (currentBookingId) {
                        userBooking = bookedSlots.find(slot => slot.id === currentBookingId);
                      }

                      if (!userBooking) {
                        userBooking = bookedSlots.find(slot =>
                          slot.status === 'upcoming' || slot.status === 'accepted' || slot.status === 'active'
                        );
                      }

                      if (!userBooking) {
                        return (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-indigo-200">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                              <span className="text-sm">Book a slot to start chatting</span>
                            </div>
                            <button
                              onClick={() => user?.id && fetchUserBookings(user.id)}
                              className="text-xs px-2 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                              title="Refresh"
                            >
                              ↻
                            </button>
                          </div>
                        );
                      }

                      return (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-indigo-200">
                            <div className={`w-2 h-2 rounded-full ${userBooking.isPaid && userBooking.chatEnabled ? 'bg-green-400' : 'bg-yellow-400'
                              }`}></div>
                            <span className="text-sm">
                              Booking: {new Date(userBooking.date).toLocaleDateString()} at {new Date(userBooking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${userBooking.isPaid ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                              }`}>
                              {userBooking.isPaid ? 'Paid' : 'Unpaid'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${userBooking.chatEnabled ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
                              }`}>
                              {userBooking.chatEnabled ? 'Chat Active' : 'Chat Locked'}
                            </span>
                            <button
                              onClick={() => user?.id && fetchUserBookings(user.id)}
                              className="text-xs px-2 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                              title="Refresh"
                            >
                              ↻
                            </button>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Start a Conversation</h3>
                  <p className="text-gray-500 mb-6">
                    Click the chat button above to start a real-time conversation with {astrologer?.firstName}
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleStartChat}
                      disabled={(() => {
                        let userBooking = null;
                        if (currentBookingId) {
                          userBooking = bookedSlots.find(slot => slot.id === currentBookingId);
                        }
                        if (!userBooking) {
                          userBooking = bookedSlots.find(slot =>
                            slot.status === 'upcoming' || slot.status === 'accepted' || slot.status === 'active'
                          );
                        }
                        return !userBooking?.isPaid;
                      })()}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Start Chat
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Main video call button clicked');
                        handleStartVideoCall();
                      }}
                      disabled={(() => {
                        let userBooking = null;
                        if (currentBookingId) {
                          userBooking = bookedSlots.find(slot => slot.id === currentBookingId);
                        }
                        if (!userBooking) {
                          userBooking = bookedSlots.find(slot =>
                            slot.status === 'upcoming' || slot.status === 'accepted' || slot.status === 'active'
                          );
                        }
                        const isDisabled = !userBooking?.isPaid || !socket;
                        console.log('Video call button disabled:', isDisabled, 'userBooking:', userBooking, 'hasSocket:', !!socket);
                        return isDisabled;
                      })()}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      Video Call
                    </button>
                  </div>
                  {bookingError && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                      {bookingError}
                    </div>
                  )}
                  {bookingStatus && (
                    <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg border border-green-200">
                      {bookingStatus}
                    </div>
                  )}
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
                        {slots.map((slot: Slot, slotIndex: number) => {
                          // Determine if slot is in the past
                          const slotDate = new Date(slot.date);
                          const now = new Date();
                          const isPast = slotDate < now;
                          const isAvailable = slot.isAvailable && !isPast;
                          return (
                            <button
                              key={slotIndex}
                              onClick={() => isAvailable && setSelectedSlot({ ...slot, date })}
                              disabled={!isAvailable}
                              className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center justify-center ${selectedSlot?.id === slot.id
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : !isAvailable
                                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
                                  : 'bg-white text-gray-900 hover:bg-slate-50 border-slate-200 hover:border-indigo-300'
                                }`}
                              title={
                                isPast
                                  ? 'Past slot'
                                  : slot.isAvailable === false
                                    ? 'Already booked'
                                    : 'Available'
                              }
                            >
                              <div className="flex items-center gap-2 justify-center">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">{slot.start} - {slot.end}</span>
                              </div>
                              <div className="text-xs mt-1">
                                {isPast ? 'Past' : slot.isAvailable === false ? 'Booked' : 'Available'}
                              </div>
                            </button>
                          );
                        })}
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
              <h3 className="text-xl font-bold mb-4 text-slate-800">About {astrologer?.firstName} {astrologer?.lastName}</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-slate-600 leading-relaxed">{astrologer?.about}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-slate-800">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {(astrologer?.areasOfExpertise ?? '').split(',').map((skill: string) => (
                      <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm border border-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-slate-800">Languages</h4>
                  <p className="text-slate-600">{
                    Array.isArray(astrologer?.languages)
                      ? astrologer.languages.map((code: string) => LANGUAGE_NAMES[code as keyof typeof LANGUAGE_NAMES] || code).join(', ')
                      : (astrologer?.languages || '').split(',').map((code: string) => LANGUAGE_NAMES[code as keyof typeof LANGUAGE_NAMES] || code).join(', ')
                  }</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-slate-800">Price Per Chat</h4>
                  <p className="text-slate-600">₹{astrologer?.pricePerChat ?? astrologer?.price} per chat</p>
                </div>
                {/* <div>
                  <h4 className="font-semibold mb-2 text-slate-800">Response Time</h4>
                  <p className="text-slate-600">{astrologer?.responseTime}</p>
                </div> */}
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

      {/* Real-time Chat Modal */}
      {showChat && currentBookingId && (
        <RealTimeChat
          bookingId={currentBookingId}
          astrologer={{
            id: Number(astrologer.id),
            firstName: astrologer.firstName,
            lastName: astrologer.lastName,
            profileImage: astrologer.profileImage,
            pricePerChat: astrologer.pricePerChat
          }}
          onClose={() => setShowChat(false)}
          onPaymentRequired={() => {
            setShowChat(false);
            setShowPayment(true);
          }}
          onVideoCall={() => {
            setShowChat(false);
            setShowVideoCall(true);
          }}
        />
      )}

      {/* Video Call Modal */}
      {showVideoCall && socket && currentBookingId && (
  <div className="fixed inset-0 z-50">
    <VideoCall
      bookingId={currentBookingId}
      astrologer={{
        id: Number(astrologer.id),
        firstName: astrologer.firstName,
        lastName: astrologer.lastName,
        profileImage: astrologer.profileImage
      }}
      onClose={() => {
        console.log('Closing video call modal');
        setShowVideoCall(false);
      }}
      socket={socket}
    />
  </div>
)}

      {/* Debug info for video call */}
      {/* {console.log('Video call modal state:', {
        showVideoCall,
        hasSocket: !!socket,
        currentBookingId,
        astrologerId: astrologer?.id
      })} */}

      {/* Payment Modal */}
      {showPayment && currentBookingId && (
        <PaymentModal
          bookingId={currentBookingId}
          astrologer={{
            id: Number(astrologer.id),
            firstName: astrologer.firstName,
            lastName: astrologer.lastName,
            pricePerChat: astrologer.pricePerChat
          }}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => {
            setShowPayment(false);
            setCurrentBookingId(null);
          }}
        />
      )}
    </div>
  );
}