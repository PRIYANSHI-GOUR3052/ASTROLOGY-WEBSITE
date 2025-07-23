import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../../components/ui/table';

type Chat = {
  id: number;
  client: string;
  lastMessage: string;
  date: string;
  type: string;
};

type AstrologerChatTableProps = {
  chats: Chat[];
  onChatClick: (id: number) => void;
};

const AstrologerChatTable = ({ chats, onChatClick }: AstrologerChatTableProps) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client</TableHead>
          <TableHead>Last Message</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chats.map((chat) => (
          <TableRow key={chat.id}>
            <TableCell className="font-semibold text-amber-600 dark:text-purple-700">{chat.client}</TableCell>
            <TableCell className="italic text-gray-700 dark:text-gray-200">&quot;{chat.lastMessage}&quot;</TableCell>
            <TableCell className="text-gray-700 dark:text-gray-200">{new Date(chat.date).toLocaleString()}</TableCell>
            <TableCell>
              <button
                className="px-4 py-2 bg-amber-500 dark:bg-purple-700 text-white rounded-lg font-semibold hover:bg-amber-600 dark:hover:bg-purple-800 transition-colors"
                onClick={() => onChatClick(chat.id)}
              >
                Chat
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default AstrologerChatTable; 