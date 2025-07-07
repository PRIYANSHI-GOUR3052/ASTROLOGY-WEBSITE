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
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="w-full p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            {astrologer.profilePicture && (
              <img
                src={astrologer.profilePicture}
                alt="Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-gray-300 dark:border-gray-600"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{astrologer.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">{astrologer.expertise}</p>
              <div className="flex items-center mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {astrologer.documentStatus}
                </span>
                <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">
                  {astrologer.experience} years experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contact Info Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.44a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Info
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Joined</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.joined}</p>
              </div>
            </div>
          </div>

          {/* Expertise Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Expertise & Experience
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Specialization</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.expertise}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.experience} years</p>
              </div>
            </div>
          </div>

          {/* Bank Details Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Bank Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Account Number</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.bankDetails.accountNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Bank Name</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.bankDetails.bankName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">IFSC Code</p>
                <p className="font-medium text-gray-900 dark:text-gray-100">{astrologer.bankDetails.ifsc}</p>
              </div>
            </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documents
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Aadhar Card</p>
                {astrologer.aadharCard ? (
                  <a
                    href={astrologer.aadharCard}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Document
                  </a>
                ) : (
                  <p className="italic text-gray-500 dark:text-gray-400">Not Uploaded</p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                  {astrologer.documentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card - Full Width */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            About the Astrologer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{astrologer.description}</p>
        </div>
      </div>
    </div>
  );
}