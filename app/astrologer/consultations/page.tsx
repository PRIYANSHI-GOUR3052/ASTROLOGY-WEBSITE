'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AstrologerChatTable from '../../../components/astrologer/AstrologerChatTable';
import AstrologerChatModal from '../../../components/astrologer/AstrologerChatModal';


// Mock data for chat consultations
const mockChats = [
  {
    id: 1,
    client: 'John Doe',
    lastMessage: 'Thank you for your advice!',
    date: '2024-06-10T15:00:00',
    type: 'chat',
  },
  {
    id: 2,
    client: 'Amit Kumar',
    lastMessage: 'Can we discuss my birth chart?',
    date: '2024-06-12T18:30:00',
    type: 'chat',
  },
  {
    id: 3,
    client: 'Priya Singh',
    lastMessage: 'I have a question about my career.',
    date: '2024-06-13T10:00:00',
    type: 'chat',
  },
];

const ConsultationsPage = () => {
  const [openChatId, setOpenChatId] = useState<number | null>(null);
  const openChat = mockChats.find((c) => c.id === openChatId) || null;

  return (
    <motion.div
      className="w-full mx-auto bg-gray-50 dark:bg-black p-5 sm:p-8 rounded-xl shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1 className="text-2xl font-bold mb-4">Chat Consultations</h1>
      <AstrologerChatTable chats={mockChats || []} onChatClick={setOpenChatId} />
      <AstrologerChatModal
        open={!!openChat}
        chat={openChat}
        onClose={() => setOpenChatId(null)}
      />
    </motion.div>
  );
};

export default ConsultationsPage;