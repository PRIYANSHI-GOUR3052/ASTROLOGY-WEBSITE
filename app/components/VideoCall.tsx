'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Video, Mic, MicOff, VideoOff, X, Settings, RefreshCw, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Socket } from 'socket.io-client';

interface VideoCallProps {
  bookingId: number;
  astrologer: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  onClose: () => void;
  socket: Socket | null; // Socket instance for signaling
}

interface VideoOfferData {
  offer: RTCSessionDescriptionInit;
  fromUserId: string;
}

interface VideoAnswerData {
  answer: RTCSessionDescriptionInit;
  fromUserId: string;
}

interface IceCandidateData {
  candidate: RTCIceCandidateInit;
  fromUserId: string;
}

interface VideoCallRequestData {
  fromUserId: string;
  fromUserRole: string;
  type: string;
}

export default function VideoCall({ bookingId, astrologer, onClose, socket }: VideoCallProps) {
  console.log('VideoCall component rendered with props:', {
    bookingId,
    astrologerId: astrologer?.id,
    hasSocket: !!socket,
    socketConnected: !!socket?.connected
  });

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'good' | 'poor' | 'unknown'>('unknown');
  const [isReconnecting, setIsReconnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [socketConnected, setSocketConnected] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const callStartTimeRef = useRef<number>(0);
  const reconnectAttemptsRef = useRef(0);
  const iceCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  const MAX_RECONNECT_ATTEMPTS = 3;
  const RECONNECT_DELAY = 2000;

  // Enhanced WebRTC configuration with multiple STUN/TURN servers
  const rtcConfig = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
      // Add TURN servers for better connectivity (replace with your TURN server)
      // {
      //   urls: 'turn:your-turn-server.com:3478',
      //   username: 'username',
      //   credential: 'password'
      // }
    ],
    iceCandidatePoolSize: 10
  };

  // Monitor socket connection state
  useEffect(() => {
    if (!socket) {
      setSocketConnected(false);
      return;
    }

    const handleConnect = () => {
      console.log('Socket connected in VideoCall');
      setSocketConnected(true);
      setError('');
    };

    const handleDisconnect = () => {
      console.log('Socket disconnected in VideoCall');
      setSocketConnected(false);
      if (isConnected) {
        setError('Connection lost. Please refresh the page.');
      }
    };

    const handleConnectError = (error: { message: string }) => {
      console.error('Socket connection error in VideoCall:', error);
      setSocketConnected(false);
      setError('Socket connection failed. Please refresh the page.');
    };

    // Set initial state
    setSocketConnected(socket.connected);

    // Add event listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('connect_error', handleConnectError);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('connect_error', handleConnectError);
    };
  }, [socket, isConnected]);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected && callStartTimeRef.current > 0) {
      interval = setInterval(() => {
        const duration = Math.floor((Date.now() - callStartTimeRef.current) / 1000);
        setCallDuration(duration);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  // Initialize call
  const initializeCall = useCallback(async () => {
    try {
      console.log('Initializing video call for booking:', bookingId);
      setError('');
      setIsConnecting(true);
      
      if (!socket) {
        throw new Error('Socket connection not available');
      }

      // Check socket server health first
      try {
        const healthResponse = await fetch(`${process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001'}/health`);
        if (!healthResponse.ok) {
          throw new Error('Socket server is not responding');
        }
        console.log('Socket server health check passed');
      } catch (healthError) {
        console.error('Socket server health check failed:', healthError);
        throw new Error('Socket server is not available. Please start it with: npm run socket');
      }

      if (!socket.connected) {
        console.log('Socket not connected, attempting to connect...');
        socket.connect();
        
        // Wait for connection with timeout
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error('Socket connection timeout'));
          }, 10000);

          const handleConnect = () => {
            clearTimeout(timeout);
            socket.off('connect', handleConnect);
            socket.off('connect_error', handleConnectError);
            resolve();
          };

          const handleConnectError = (error: { message: string }) => {
            clearTimeout(timeout);
            socket.off('connect', handleConnect);
            socket.off('connect_error', handleConnectError);
            reject(new Error(`Socket connection failed: ${error.message}`));
          };

          socket.on('connect', handleConnect);
          socket.on('connect_error', handleConnectError);
        });
      }

      console.log('Socket is connected, joining booking room...');

      // Join the booking room
      socket.emit('join-booking', { bookingId });
      
      socket.on('joined-booking', (data: { bookingId: number; message: string }) => {
        console.log('Successfully joined booking room:', data);
        setIsJoined(true);
        startWebRTC();
      });
      
      socket.on('error', (data: { message: string }) => {
        console.error('Socket error:', data);
        setError(data.message || 'Failed to join video call');
        setIsConnecting(false);
      });

    } catch (error) {
      console.error('Error initializing call:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize video call');
      setIsConnecting(false);
    }
  }, [bookingId, socket]);

  // Start WebRTC connection
  const startWebRTC = useCallback(async () => {
    try {
      console.log('Starting WebRTC connection...');
      
      // Request user media with fallback options
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            frameRate: { ideal: 30 }
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      } catch (mediaError) {
        console.warn('Failed to get video+audio, trying audio only:', mediaError);
        stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      }

      console.log('Got user media stream');
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Create peer connection
      const peerConnection = new RTCPeerConnection(rtcConfig);
      peerConnectionRef.current = peerConnection;

      console.log('Created peer connection');

      // Add local stream to peer connection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
        console.log('Added track to peer connection:', track.kind);
      });

      // Handle remote stream
      peerConnection.ontrack = (event) => {
        console.log('Received remote stream:', event.streams[0]);
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
        setIsConnected(true);
        setIsConnecting(false);
        callStartTimeRef.current = Date.now();
      };

      // Handle ICE candidates
      peerConnection.onicecandidate = (event) => {
        if (event.candidate && socket) {
          console.log('Sending ICE candidate');
          socket.emit('ice-candidate', {
            bookingId,
            candidate: event.candidate
          });
        }
      };

      // Handle connection state changes
      peerConnection.onconnectionstatechange = () => {
        console.log('Connection state changed:', peerConnection.connectionState);
        
        switch (peerConnection.connectionState) {
          case 'connected':
            setIsConnected(true);
            setIsConnecting(false);
            setIsReconnecting(false);
            reconnectAttemptsRef.current = 0;
            setConnectionQuality('good');
            break;
          case 'connecting':
            setIsConnecting(true);
            setConnectionQuality('unknown');
            break;
          case 'disconnected':
            setIsConnected(false);
            setConnectionQuality('poor');
            handleReconnection();
            break;
          case 'failed':
            setError('Connection failed');
            setIsConnecting(false);
            setConnectionQuality('poor');
            break;
          case 'closed':
            setIsConnected(false);
            setIsConnecting(false);
            break;
        }
      };

      // Handle ICE connection state changes
      peerConnection.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', peerConnection.iceConnectionState);
        
        switch (peerConnection.iceConnectionState) {
          case 'connected':
            setConnectionQuality('good');
            break;
          case 'checking':
            setConnectionQuality('unknown');
            break;
          case 'failed':
            setConnectionQuality('poor');
            handleReconnection();
            break;
          case 'disconnected':
            setConnectionQuality('poor');
            break;
        }
      };

      // Handle ICE gathering state
      peerConnection.onicegatheringstatechange = () => {
        console.log('ICE gathering state:', peerConnection.iceGatheringState);
      };

      // Socket event listeners for WebRTC signaling
      if (socket) {
        socket.on('video-offer', async (data: VideoOfferData) => {
          try {
            console.log('Received video offer from:', data.fromUserId);
            
            if (peerConnection.signalingState !== 'stable') {
              console.log('Signaling state not stable, ignoring offer');
              return;
            }
            
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);
            
            socket.emit('video-answer', {
              bookingId,
              answer
            });
            console.log('Sent video answer');
          } catch (error) {
            console.error('Error handling video offer:', error);
            setError('Failed to establish video call');
          }
        });

        socket.on('video-answer', async (data: VideoAnswerData) => {
          try {
            console.log('Received video answer from:', data.fromUserId);
            
            if (peerConnection.signalingState !== 'have-local-offer') {
              console.log('Signaling state not have-local-offer, ignoring answer');
              return;
            }
            
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
          } catch (error) {
            console.error('Error handling video answer:', error);
            setError('Failed to establish video call');
          }
        });

        socket.on('ice-candidate', async (data: IceCandidateData) => {
          try {
            console.log('Received ICE candidate from:', data.fromUserId);
            
            if (peerConnection.remoteDescription) {
              await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
            } else {
              // Store candidate for later
              iceCandidatesRef.current.push(data.candidate);
            }
          } catch (error) {
            console.error('Error adding ICE candidate:', error);
          }
        });

        // Listen for video call requests
        socket.on('video-call-request', (data: VideoCallRequestData) => {
          console.log('Received video call request:', data);
        });

        // Listen for user joined/left events
        socket.on('user-joined', (data: { userId: string; userRole: string }) => {
          console.log('User joined video call:', data);
        });

        socket.on('user-left', (data: { userId: string; userRole: string }) => {
          console.log('User left video call:', data);
          setError('Other participant left the call');
          setTimeout(() => {
            endCall();
          }, 3000);
        });
      }

      // Create and send offer after a short delay
      setTimeout(async () => {
        try {
          console.log('Creating video offer...');
          const offer = await peerConnection.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true
          });
          await peerConnection.setLocalDescription(offer);
          
          if (socket) {
            socket.emit('video-offer', {
              bookingId,
              offer
            });
            console.log('Sent video offer');
          }
        } catch (error) {
          console.error('Error creating offer:', error);
          setError('Failed to start video call');
        }
      }, 1000);

    } catch (error) {
      console.error('Error starting WebRTC:', error);
      setError('Failed to access camera/microphone. Please check permissions.');
      setIsConnecting(false);
    }
  }, [bookingId, socket, rtcConfig]);

  // Handle reconnection
  const handleReconnection = useCallback(() => {
    if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
      setError('Connection lost. Maximum reconnection attempts reached.');
      return;
    }

    setIsReconnecting(true);
    reconnectAttemptsRef.current++;

    console.log(`Attempting reconnection ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}`);

    setTimeout(() => {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      startWebRTC();
    }, RECONNECT_DELAY * reconnectAttemptsRef.current);
  }, [startWebRTC]);

  // Manual reconnect
  const handleManualReconnect = useCallback(() => {
    setError('');
    reconnectAttemptsRef.current = 0;
    setIsReconnecting(false);
    cleanupCall();
    
    // Wait a bit before trying to reconnect
    setTimeout(() => {
      initializeCall();
    }, 1000);
  }, [initializeCall]);

  // Cleanup call
  const cleanupCall = useCallback(() => {
    console.log('Cleaning up video call...');
    
    // Remove socket listeners
    if (socket) {
      socket.off('joined-booking');
      socket.off('video-offer');
      socket.off('video-answer');
      socket.off('ice-candidate');
      socket.off('video-call-request');
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('error');
    }
    
    // Stop local stream
    if (localStream) {
      localStream.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped track:', track.kind);
      });
    }
    
    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      console.log('Closed peer connection');
    }

    // Clear refs
    setLocalStream(null);
    setRemoteStream(null);
    setIsConnected(false);
    setIsConnecting(false);
    setIsJoined(false);
    setCallDuration(0);
    callStartTimeRef.current = 0;
    iceCandidatesRef.current = [];
  }, [socket, localStream]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
        console.log('Audio toggled:', audioTrack.enabled);
      }
    }
  }, [localStream]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
        console.log('Video toggled:', videoTrack.enabled);
      }
    }
  }, [localStream]);

  // End call
  const endCall = useCallback(() => {
    console.log('Ending video call...');
    cleanupCall();
    onClose();
  }, [cleanupCall, onClose]);

  // Initialize call on mount
  useEffect(() => {
    if (socket) {
      // Add a small delay to ensure socket is properly initialized
      const timeoutId = setTimeout(() => {
        initializeCall();
      }, 500);

      return () => {
        clearTimeout(timeoutId);
        cleanupCall();
      };
    } else {
      setError('Socket connection not available. Please refresh the page.');
    }
  }, [socket, initializeCall, cleanupCall]);

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (error && !isConnecting && !isReconnecting) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
            <div className="text-red-600 text-lg mb-4">{error}</div>
            <div className="text-sm text-gray-600 mb-4">
              {!socket ? 'No socket connection available' : 
               !socket.connected ? 'Socket is not connected' : 
               'Socket is connected but call failed'}
            </div>
            {!socket && (
              <div className="text-xs text-gray-500 mb-4 p-3 bg-gray-50 rounded">
                <strong>To fix this:</strong><br/>
                1. Make sure the socket server is running<br/>
                2. Run: <code className="bg-gray-200 px-1 rounded">npm run socket</code><br/>
                3. Or run: <code className="bg-gray-200 px-1 rounded">npm run dev:full</code>
              </div>
            )}
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleManualReconnect}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </button>
              <button
                onClick={endCall}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Video Container */}
      <div className="relative w-full h-full">
        {/* Remote Video (Main) */}
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        
        {/* Local Video (Picture-in-Picture) */}
        <div className="absolute top-4 right-4 w-48 h-36 bg-gray-900 rounded-lg overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        {/* Connection Status */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isConnecting && (
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                {isJoined ? 'Connecting...' : 'Joining room...'}
              </div>
            </div>
          )}

          {isReconnecting && (
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Reconnecting... ({reconnectAttemptsRef.current}/{MAX_RECONNECT_ATTEMPTS})
              </div>
            </div>
          )}

          {isConnected && (
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  connectionQuality === 'good' ? 'bg-green-400' : 
                  connectionQuality === 'poor' ? 'bg-red-400' : 'bg-yellow-400'
                }`}></div>
                <span>Connected</span>
                {callDuration > 0 && (
                  <span className="text-sm opacity-75">({formatDuration(callDuration)})</span>
                )}
              </div>
            </div>
          )}

          {/* Debug Info - Only show in development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-xs">
              <div>Socket: {socket ? (socket.connected ? 'Connected' : 'Disconnected') : 'None'}</div>
              <div>Booking: {bookingId}</div>
              <div>Joined: {isJoined ? 'Yes' : 'No'}</div>
            </div>
          )}
        </div>

        {/* Astrologer Info */}
        <div className="absolute top-20 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          <div className="flex items-center gap-2">
            <Image
              src={astrologer.profileImage}
              alt={`${astrologer.firstName} ${astrologer.lastName}`}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <span>{`${astrologer.firstName} ${astrologer.lastName}`}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={toggleAudio}
            className={`p-4 rounded-full ${
              isAudioEnabled ? 'bg-white text-gray-800' : 'bg-red-500 text-white'
            } hover:bg-opacity-80 transition-colors`}
            title={isAudioEnabled ? 'Mute' : 'Unmute'}
          >
            {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoEnabled ? 'bg-white text-gray-800' : 'bg-red-500 text-white'
            } hover:bg-opacity-80 transition-colors`}
            title={isVideoEnabled ? 'Turn off video' : 'Turn on video'}
          >
            {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>

          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            title="End call"
          >
            <Phone className="w-6 h-6 rotate-135" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={endCall}
          className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
} 