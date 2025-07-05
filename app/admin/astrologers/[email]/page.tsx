import React from 'react';
import { notFound } from 'next/navigation';

const mockAstrologers = [
  {
    name: 'Dr. Narendra Sharma',
    email: 'narendra@nakshatra.com',
    phone: '+91 90000 11111',
    expertise: 'Vedic, Tarot',
    experience: 15,
    joined: 'Jan 10, 2024',
    documentStatus: 'Verified',
    description: 'Experienced Vedic astrologer with deep insight into Tarot practices.',
    profilePicture: '/profile1.jpg',
    aadharCard: '/aadhar-narendra.pdf',
    bankDetails: {
      accountNo: '12345678911',
      bankName: 'SBI',
      ifsc: 'SBIN0001234',
    },
  },
];

export default function AstrologerDetailPage({ params }: { params: { email: string } }) {
  const decodedEmail = decodeURIComponent(params.email);
  const astrologer = mockAstrologers.find(a => a.email === decodedEmail);

  if (!astrologer) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow-md mt-10 text-black">
      <h1 className="text-2xl font-bold">{astrologer.name}</h1>

      {astrologer.profilePicture && (
        <img
          src={astrologer.profilePicture}
          alt="Profile"
          className="w-32 h-32 object-cover rounded-full border"
        />
      )}

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold">Contact Info</h2>
          <p><strong>Email:</strong> {astrologer.email}</p>
          <p><strong>Phone:</strong> {astrologer.phone}</p>
          <p><strong>Joined:</strong> {astrologer.joined}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Expertise & Experience</h2>
          <p><strong>Expertise:</strong> {astrologer.expertise}</p>
          <p><strong>Experience:</strong> {astrologer.experience} years</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Bank Details</h2>
          <p><strong>Account No:</strong> {astrologer.bankDetails.accountNo}</p>
          <p><strong>Bank:</strong> {astrologer.bankDetails.bankName}</p>
          <p><strong>IFSC:</strong> {astrologer.bankDetails.ifsc}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Aadhar Document</h2>
          {astrologer.aadharCard ? (
            <a
              href={astrologer.aadharCard}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              View Aadhar Card
            </a>
          ) : (
            <p className="italic">Not Uploaded</p>
          )}
        </div>

        <div className="col-span-2">
          <h2 className="text-lg font-semibold">Astrologer Description</h2>
          <p>{astrologer.description}</p>
        </div>
      </div>
    </div>
  );
}
