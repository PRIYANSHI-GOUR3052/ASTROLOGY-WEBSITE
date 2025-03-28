'use client';

import { Search, Send, MoreVertical, Check } from 'lucide-react';

export default function MessagesPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Conversations List */}
      <div className="w-80 border-r bg-white">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {[
            {
              name: 'Rahul Sharma',
              lastMessage: 'Thank you for the consultation',
              time: '2:30 PM',
              unread: 2
            },
            {
              name: 'Priya Patel',
              lastMessage: 'When is the next session?',
              time: '1:45 PM',
              unread: 0
            },
            {
              name: 'Amit Kumar',
              lastMessage: 'I have a question about my birth chart',
              time: '11:20 AM',
              unread: 1
            }
          ].map((conversation, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{conversation.name}</h3>
                  <p className="text-sm text-gray-500 truncate max-w-[200px]">
                    {conversation.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                  {conversation.unread > 0 && (
                    <span className="mt-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">R</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Rahul Sharma</h3>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {[
            {
              message: 'Hello, I have a question about my birth chart',
              time: '2:25 PM',
              sent: false
            },
            {
              message: 'Sure, I can help you with that. What would you like to know?',
              time: '2:26 PM',
              sent: true
            },
            {
              message: 'I want to understand my career prospects',
              time: '2:27 PM',
              sent: false
            },
            {
              message: 'I can analyze your birth chart for career guidance. Would you like to schedule a consultation?',
              time: '2:28 PM',
              sent: true
            }
          ].map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sent
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-900'
                }`}
              >
                <p>{message.message}</p>
                <div className="flex items-center justify-end mt-1">
                  <span className="text-xs opacity-70">{message.time}</span>
                  {message.sent && (
                    <Check className="w-4 h-4 ml-1 opacity-70" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white border-t">
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 