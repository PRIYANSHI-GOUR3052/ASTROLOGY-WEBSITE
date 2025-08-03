import { Socket } from 'socket.io-client';

export interface VideoCallConfig {
  socket: Socket;
  bookingId: number;
  userId: number;
  userRole: 'client' | 'astrologer';
  onLocalStream?: (stream: MediaStream) => void;
  onRemoteStream?: (stream: MediaStream) => void;
  onConnectionStateChange?: (state: RTCPeerConnectionState) => void;
  onIceConnectionStateChange?: (state: RTCIceConnectionState) => void;
  onError?: (error: string) => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
}

export interface VideoOfferData {
  offer: RTCSessionDescriptionInit;
  fromUserId: string;
}

export interface VideoAnswerData {
  answer: RTCSessionDescriptionInit;
  fromUserId: string;
}

export interface IceCandidateData {
  candidate: RTCIceCandidateInit;
  fromUserId: string;
}

export class VideoCallService {
  private config: VideoCallConfig;
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private isInitialized = false;
  private iceCandidates: RTCIceCandidateInit[] = [];

  // Enhanced WebRTC configuration
  private readonly rtcConfig: RTCConfiguration = {
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
    iceCandidatePoolSize: 10,
    bundlePolicy: 'max-bundle',
    rtcpMuxPolicy: 'require'
  };

  constructor(config: VideoCallConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      console.log('Initializing video call service...');

      // Get user media
      await this.getUserMedia();

      // Create peer connection
      this.createPeerConnection();

      // Setup socket event listeners
      this.setupSocketListeners();

      this.isInitialized = true;
      console.log('Video call service initialized successfully');

    } catch (error) {
      console.error('Failed to initialize video call service:', error);
      this.config.onError?.(error instanceof Error ? error.message : 'Initialization failed');
      throw error;
    }
  }

  private async getUserMedia(): Promise<void> {
    try {
      console.log('Requesting user media...');
      
      // Try to get both video and audio first
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
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
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
      }

      console.log('Got user media stream');
      this.config.onLocalStream?.(this.localStream);

    } catch (error) {
      console.error('Failed to get user media:', error);
      throw new Error('Failed to access camera/microphone. Please check permissions.');
    }
  }

  private createPeerConnection(): void {
    console.log('Creating peer connection...');
    
    this.peerConnection = new RTCPeerConnection(this.rtcConfig);

    // Add local stream to peer connection
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection!.addTrack(track, this.localStream!);
        console.log('Added track to peer connection:', track.kind);
      });
    }

    // Handle remote stream
    this.peerConnection.ontrack = (event) => {
      console.log('Received remote stream:', event.streams[0]);
      this.remoteStream = event.streams[0];
      this.config.onRemoteStream?.(this.remoteStream);
      this.config.onConnected?.();
    };

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate && this.config.socket.connected) {
        console.log('Sending ICE candidate');
        this.config.socket.emit('ice-candidate', {
          bookingId: this.config.bookingId,
          candidate: event.candidate
        });
      }
    };

    // Handle connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state changed:', this.peerConnection!.connectionState);
      this.config.onConnectionStateChange?.(this.peerConnection!.connectionState);
      
      switch (this.peerConnection!.connectionState) {
        case 'connected':
          this.config.onConnected?.();
          break;
        case 'disconnected':
        case 'failed':
          this.config.onDisconnected?.();
          break;
      }
    };

    // Handle ICE connection state changes
    this.peerConnection.oniceconnectionstatechange = () => {
      console.log('ICE connection state:', this.peerConnection!.iceConnectionState);
      this.config.onIceConnectionStateChange?.(this.peerConnection!.iceConnectionState);
    };

    // Handle ICE gathering state
    this.peerConnection.onicegatheringstatechange = () => {
      console.log('ICE gathering state:', this.peerConnection!.iceGatheringState);
    };

    console.log('Peer connection created successfully');
  }

  private setupSocketListeners(): void {
    const socket = this.config.socket;

    // Handle video offer
    socket.on('video-offer', async (data: VideoOfferData) => {
      try {
        console.log('Received video offer from:', data.fromUserId);
        
        if (!this.peerConnection || this.peerConnection.signalingState !== 'stable') {
          console.log('Signaling state not stable, ignoring offer');
          return;
        }
        
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        
        socket.emit('video-answer', {
          bookingId: this.config.bookingId,
          answer
        });
        console.log('Sent video answer');
      } catch (error) {
        console.error('Error handling video offer:', error);
        this.config.onError?.('Failed to establish video call');
      }
    });

    // Handle video answer
    socket.on('video-answer', async (data: VideoAnswerData) => {
      try {
        console.log('Received video answer from:', data.fromUserId);
        
        if (!this.peerConnection || this.peerConnection.signalingState !== 'have-local-offer') {
          console.log('Signaling state not have-local-offer, ignoring answer');
          return;
        }
        
        await this.peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      } catch (error) {
        console.error('Error handling video answer:', error);
        this.config.onError?.('Failed to establish video call');
      }
    });

    // Handle ICE candidates
    socket.on('ice-candidate', async (data: IceCandidateData) => {
      try {
        console.log('Received ICE candidate from:', data.fromUserId);
        
        if (this.peerConnection?.remoteDescription) {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        } else {
          // Store candidate for later
          this.iceCandidates.push(data.candidate);
        }
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    });

    // Handle user joined/left events
    socket.on('user-joined', (data: { userId: string; userRole: string }) => {
      console.log('User joined video call:', data);
    });

    socket.on('user-left', (data: { userId: string; userRole: string }) => {
      console.log('User left video call:', data);
      this.config.onDisconnected?.();
    });
  }

  async startCall(): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    try {
      console.log('Starting video call...');
      
      // Create and send offer
      const offer = await this.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      
      await this.peerConnection.setLocalDescription(offer);
      
      this.config.socket.emit('video-offer', {
        bookingId: this.config.bookingId,
        offer
      });
      
      console.log('Sent video offer');
    } catch (error) {
      console.error('Error starting call:', error);
      this.config.onError?.('Failed to start video call');
      throw error;
    }
  }

  async addStoredIceCandidates(): Promise<void> {
    if (!this.peerConnection?.remoteDescription || this.iceCandidates.length === 0) {
      return;
    }

    console.log('Adding stored ICE candidates:', this.iceCandidates.length);
    
    for (const candidate of this.iceCandidates) {
      try {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (error) {
        console.error('Error adding stored ICE candidate:', error);
      }
    }
    
    this.iceCandidates = [];
  }

  toggleAudio(enabled: boolean): void {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = enabled;
        console.log('Audio toggled:', enabled);
      }
    }
  }

  toggleVideo(enabled: boolean): void {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = enabled;
        console.log('Video toggled:', enabled);
      }
    }
  }

  getLocalStream(): MediaStream | null {
    return this.localStream;
  }

  getRemoteStream(): MediaStream | null {
    return this.remoteStream;
  }

  getConnectionState(): RTCPeerConnectionState | null {
    return this.peerConnection?.connectionState || null;
  }

  getIceConnectionState(): RTCIceConnectionState | null {
    return this.peerConnection?.iceConnectionState || null;
  }

  cleanup(): void {
    console.log('Cleaning up video call service...');
    
    // Remove socket listeners
    if (this.config.socket) {
      this.config.socket.off('video-offer');
      this.config.socket.off('video-answer');
      this.config.socket.off('ice-candidate');
      this.config.socket.off('user-joined');
      this.config.socket.off('user-left');
    }
    
    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        track.stop();
        console.log('Stopped track:', track.kind);
      });
      this.localStream = null;
    }
    
    // Close peer connection
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    
    // Clear remote stream
    this.remoteStream = null;
    
    // Clear stored candidates
    this.iceCandidates = [];
    
    this.isInitialized = false;
    
    console.log('Video call service cleaned up');
  }
}

// Utility function to create video call service
export function createVideoCallService(config: VideoCallConfig): VideoCallService {
  return new VideoCallService(config);
} 