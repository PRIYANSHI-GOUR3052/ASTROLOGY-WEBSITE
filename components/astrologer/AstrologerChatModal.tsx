import { useState, useRef, useEffect } from 'react';

type Chat = {
  id: number;
  client: string;
  lastMessage: string;
  date: string;
  type: string;
};

type Message = {
  sender: 'astrologer' | 'user';
  content: string;
};

type AstrologerChatModalProps = {
  open: boolean;
  chat: Chat | null;
  onClose: () => void;
};

const AstrologerChatModal = ({ open, chat, onClose }: AstrologerChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && chat) {
      setMessages([
        { sender: 'user', content: chat.lastMessage },
        { sender: 'astrologer', content: 'Hello, how can I help you?' },
      ]);
    }
  }, [open, chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'astrologer', content: input }]);
    setInput('');
  };

  if (!open || !chat) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg w-[350px] sm:w-[400px] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="font-bold text-lg text-purple-700">Chat with {chat.client}</div>
          <button
            className="bg-white text-xs text-black rounded-full py-1 px-2 shadow hover:bg-gray-200"
            onClick={onClose}
          >
            &#10005;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50 dark:bg-gray-800" style={{ minHeight: 200, maxHeight: 300 }}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'astrologer' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-3 py-2 rounded-lg max-w-[70%] text-sm shadow
                  ${msg.sender === 'astrologer' ? 'bg-purple-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'}`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-900 dark:text-white"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <button
            className="px-4 py-2 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AstrologerChatModal; 