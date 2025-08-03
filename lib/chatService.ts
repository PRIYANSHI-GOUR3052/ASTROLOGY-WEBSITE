import { io, Socket } from 'socket.io-client';

export interface ChatMessage {
  id: number;
  senderId: number;
  senderType: 'client' | 'astrologer';
  message: string;
  messageType: string;
  createdAt: string;
  isRead?: boolean;
}

export interface ChatConfig {
  socketUrl: string;
  bookingId: number;
  userId: number;
  userRole: 'client' | 'astrologer';
  token: string;
  onMessage?: (message: ChatMessage) => void;
  onTyping?: (userId: string, isTyping: boolean) => void;
  onUserJoined?: (userId: string, userRole: string) => void;
  onUserLeft?: (userId: string, userRole: string) => void;
  onError?: (error: string) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onReconnect?: () => void;
}

export class ChatService {
  private socket: Socket | null = null;
  private config: ChatConfig;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000;
  private isConnecting = false;
  private messageQueue: Array<{ message: string; timestamp: number }> = [];

  constructor(config: ChatConfig) {
    this.config = config;
  }

  async connect(): Promise<void> {
    if (this.isConnecting || this.socket?.connected) {
      return;
    }

    this.isConnecting = true;

    try {
      console.log('Connecting to chat server...');
      
      this.socket = io(this.config.socketUrl, {
        auth: {
          token: this.config.token,
          userId: this.config.userId,
          userRole: this.config.userRole
        },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
        reconnectionDelayMax: 10000
      });

      this.setupEventListeners();
      
      // Wait for connection
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, 10000);

        this.socket!.on('connect', () => {
          clearTimeout(timeout);
          this.reconnectAttempts = 0;
          this.isConnecting = false;
          this.config.onConnect?.();
          resolve();
        });

        this.socket!.on('connect_error', (error) => {
          clearTimeout(timeout);
          this.isConnecting = false;
          reject(error);
        });
      });

      // Join booking room
      await this.joinBooking();

    } catch (error) {
      this.isConnecting = false;
      console.error('Failed to connect to chat server:', error);
      this.config.onError?.(error instanceof Error ? error.message : 'Connection failed');
      throw error;
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to chat server');
      this.config.onConnect?.();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from chat server:', reason);
      this.config.onDisconnect?.();
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.config.onError?.(error.message);
    });

    this.socket.on('new-message', (message: ChatMessage) => {
      console.log('Received new message:', message.id);
      this.config.onMessage?.(message);
    });

    this.socket.on('typing-start', (data: { userId: string; userRole: string }) => {
      this.config.onTyping?.(data.userId, true);
    });

    this.socket.on('typing-stop', (data: { userId: string; userRole: string }) => {
      this.config.onTyping?.(data.userId, false);
    });

    this.socket.on('user-joined', (data: { userId: string; userRole: string }) => {
      this.config.onUserJoined?.(data.userId, data.userRole);
    });

    this.socket.on('user-left', (data: { userId: string; userRole: string }) => {
      this.config.onUserLeft?.(data.userId, data.userRole);
    });

    this.socket.on('error', (error: { message: string }) => {
      this.config.onError?.(error.message);
    });

    this.socket.on('reconnect', () => {
      console.log('Reconnected to chat server');
      this.reconnectAttempts = 0;
      this.config.onReconnect?.();
      this.joinBooking();
    });
  }

  private async joinBooking(): Promise<void> {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Join booking timeout'));
      }, 5000);

      this.socket!.emit('join-booking', { bookingId: this.config.bookingId });

      this.socket!.once('joined-booking', (data) => {
        clearTimeout(timeout);
        console.log('Successfully joined booking:', data);
        resolve();
      });

      this.socket!.once('error', (error) => {
        clearTimeout(timeout);
        reject(new Error(error.message));
      });
    });
  }

  async sendMessage(message: string, messageType: string = 'text'): Promise<void> {
    if (!this.socket?.connected) {
      // Queue message for later
      this.messageQueue.push({
        message,
        timestamp: Date.now()
      });
      throw new Error('Not connected to chat server');
    }

    if (!message.trim()) {
      throw new Error('Message cannot be empty');
    }

    if (message.length > 1000) {
      throw new Error('Message too long (max 1000 characters)');
    }

    try {
      this.socket.emit('send-message', {
        bookingId: this.config.bookingId,
        message: message.trim(),
        messageType
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  startTyping(): void {
    if (this.socket?.connected) {
      this.socket.emit('typing-start', { bookingId: this.config.bookingId });
    }
  }

  stopTyping(): void {
    if (this.socket?.connected) {
      this.socket.emit('typing-stop', { bookingId: this.config.bookingId });
    }
  }

  async markMessageAsRead(messageId: number): Promise<void> {
    if (!this.socket?.connected) {
      throw new Error('Not connected to chat server');
    }

    try {
      this.socket.emit('mark-message-read', {
        messageId,
        bookingId: this.config.bookingId
      });
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      throw error;
    }
  }

  requestVideoCall(type: 'video' | 'voice' = 'video'): void {
    if (!this.socket?.connected) {
      throw new Error('Not connected to chat server');
    }

    this.socket.emit('video-call-request', {
      bookingId: this.config.bookingId,
      type
    });
  }

  endSession(): void {
    if (this.socket?.connected) {
      this.socket.emit('end-session', { bookingId: this.config.bookingId });
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.messageQueue = [];
    this.reconnectAttempts = 0;
    this.isConnecting = false;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getMessageQueue(): Array<{ message: string; timestamp: number }> {
    return [...this.messageQueue];
  }

  clearMessageQueue(): void {
    this.messageQueue = [];
  }
}

// Utility function to create chat service
export function createChatService(config: ChatConfig): ChatService {
  return new ChatService(config);
} 