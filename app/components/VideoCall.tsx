'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, Video, Mic, MicOff, VideoOff, X, Settings } from 'lucide-react';
import Image from 'next/image';

interface VideoCallProps {
  bookingId: number;
  astrologer: {
    id: number;
    firstName: string;
    lastName: string;
    profileImage: string;
  };
  onClose: () => void;
  socket: any; // Socket instance for signaling
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
    hasSocket: !!socket
  });

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // WebRTC configuration with better STUN servers
  const rtcConfig = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      { urls: 'stun:stun3.l.google.com:19302' },
      { urls: 'stun:stun4.l.google.com:19302' },
    ]
  };

  useEffect(() => {
    console.log('VideoCall useEffect triggered, socket:', !!socket);
    if (socket) {
      console.log('Initializing video call...');
      initializeCall();
    } else {
      console.log('No socket available, cannot initialize video call');
    }
    return () => {
      console.log('VideoCall cleanup');
      cleanupCall();
    };
  }, [socket]);

  const initializeCall = async () => {
    try {
      console.log('Initializing video call for booking:', bookingId);
      
      // First, join the booking room
      if (socket) {
        socket.emit('join-booking', { bookingId });
        
        socket.on('joined-booking', (data: any) => {
          console.log('Successfully joined booking room:', data);
          setIsJoined(true);
          startWebRTC();
        });
        
        socket.on('error', (data: any) => {
          console.error('Socket error:', data);
          setError(data.message || 'Failed to join video call');
        });
      }

    } catch (error) {
      console.error('Error initializing call:', error);
      setError('Failed to initialize video call');
    }
  };

  const startWebRTC = async () => {
    try {
      console.log('Starting WebRTC connection...');
      
      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

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
        if (peerConnection.connectionState === 'connected') {
          setIsConnected(true);
          setIsConnecting(false);
        } else if (peerConnection.connectionState === 'failed') {
          setError('Connection failed');
          setIsConnecting(false);
        } else if (peerConnection.connectionState === 'disconnected') {
          setIsConnected(false);
        }
      };

      // Handle ICE connection state changes
      peerConnection.oniceconnectionstatechange = () => {
        console.log('ICE connection state:', peerConnection.iceConnectionState);
        if (peerConnection.iceConnectionState === 'failed') {
          setError('ICE connection failed');
        }
      };

      // Socket event listeners for WebRTC signaling
      if (socket) {
        socket.on('video-offer', async (data: VideoOfferData) => {
          try {
            console.log('Received video offer from:', data.fromUserId);
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
            await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
          } catch (error) {
            console.error('Error handling video answer:', error);
            setError('Failed to establish video call');
          }
        });

        socket.on('ice-candidate', async (data: IceCandidateData) => {
          try {
            console.log('Received ICE candidate from:', data.fromUserId);
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
          } catch (error) {
            console.error('Error adding ICE candidate:', error);
          }
        });

        // Listen for video call requests
        socket.on('video-call-request', (data: VideoCallRequestData) => {
          console.log('Received video call request:', data);
          if (data.type === 'video') {
            console.log('Auto-accepting video call');
          }
        });

        // Listen for user joined/left events
        socket.on('user-joined', (data: any) => {
          console.log('User joined video call:', data);
        });

        socket.on('user-left', (data: any) => {
          console.log('User left video call:', data);
          setError('Other participant left the call');
        });
      }

      // Create and send offer after a short delay to ensure room is joined
      setTimeout(async () => {
        try {
          console.log('Creating video offer...');
          const offer = await peerConnection.createOffer();
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
    }
  };

  const cleanupCall = () => {
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
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
        console.log('Audio toggled:', audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
        console.log('Video toggled:', videoTrack.enabled);
      }
    }
  };

  const endCall = () => {
    console.log('Ending video call...');
    cleanupCall();
    onClose();
  };

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
        {isConnecting && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              {isJoined ? 'Connecting...' : 'Joining room...'}
            </div>
          </div>
        )}

        {/* Connection Status */}
        {isConnected && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              Connected
            </div>
          </div>
        )}

        {/* Astrologer Info */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
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
          >
            {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-4 rounded-full ${
              isVideoEnabled ? 'bg-white text-gray-800' : 'bg-red-500 text-white'
            } hover:bg-opacity-80 transition-colors`}
          >
            {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>

          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <Phone className="w-6 h-6 rotate-135" />
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
} 