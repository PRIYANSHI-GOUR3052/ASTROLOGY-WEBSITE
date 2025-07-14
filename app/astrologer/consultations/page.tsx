'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const initialChats = [
  {
    id: 1,
    client: 'John Doe',
    messages: [
      { sender: 'client', text: 'Thank you for your advice!', timestamp: '2024-06-10T15:00:00' },
    ],
  },
  {
    id: 2,
    client: 'Amit Kumar',
    messages: [
      { sender: 'client', text: 'Can we discuss my birth chart?', timestamp: '2024-06-12T18:30:00' },
    ],
  },
  {
    id: 3,
    client: 'Priya Singh',
    messages: [
      { sender: 'client', text: 'I have a question about my career.', timestamp: '2024-06-13T10:00:00' },
    ],
  },
];

const ConsultationsPage = () => {
  const [chats, setChats] = useState(initialChats);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const activeChat = chats.find((chat) => chat.id === activeChatId);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const updatedChats = chats.map((chat) => {
      if (chat.id === activeChat.id) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            {
              sender: 'you',
              text: newMessage,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage('');
  };

  return (
    <motion.div
      className="flex w-full h-[80vh] bg-white dark:bg-black rounded-xl shadow overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Left Chat List */}
      <div className="w-full md:w-1/4 border-r bg-[#FFF5E1} border-gray-300 dark:border-gray-700 dark:bg-midnight p-4 space-y-3">

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Start Consultation</h2>
        {chats.map((chat) => {
          const lastMsg = chat.messages.at(-1);
          return (
            <div
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={cn(
                'cursor-pointer p-3 rounded-lg transition',
                activeChatId === chat.id
                  ? 'bg-[#FFE4B8] dark:bg-[#333]'
                  : 'hover:bg-[#FFF1CC] dark:hover:bg-[#222]'
              )}
              
            >
              <h3 className="text-purple-700 dark:text-purple-400 font-semibold">{chat.client}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic truncate">{lastMsg?.text}</p>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {new Date(lastMsg?.timestamp).toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right Chat Panel */}
      <div className="flex-1 bg-white dark:bg-black flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-300 dark:border-gray-700 text-lg font-semibold text-gray-800 dark:text-white">
              Chat with {activeChat.client}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {activeChat.messages.map((msg, index) => (
                <div
                  key={index}
                  className={cn(
                    'max-w-xs px-4 py-2 rounded-lg',
                    msg.sender === 'you'
                      ? 'bg-purple-600 text-white self-end ml-auto'
                      : 'bg-amber-100 dark:bg-[#222] text-gray-800 dark:text-gray-100 self-start mr-auto'
                  )}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-[10px] text-gray-500 mt-1 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 rounded-full px-4 py-2 bg-gray-100 dark:bg-[#222] text-gray-900 dark:text-white focus:outline-none"
              />
              <button
                onClick={sendMessage}
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
            Click a customer name to start a chat
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ConsultationsPage;
