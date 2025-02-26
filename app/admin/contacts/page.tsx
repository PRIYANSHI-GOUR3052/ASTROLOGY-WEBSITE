import { prisma } from '@/lib/prisma'

export default async function ContactsAdmin() {
  const contacts = await prisma.contact.findMany({
    orderBy: {
      timestamp: 'desc',
    },
  })

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Form Submissions</h1>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div 
            key={contact.id} 
            className="p-4 border rounded-lg bg-midnight-blue-light"
          >
            <p className="font-bold">{contact.name}</p>
            <p className="text-sm text-lavender">{contact.email}</p>
            <p className="mt-2">{contact.message}</p>
            <p className="text-sm text-gold mt-2">
              {new Date(contact.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
} 