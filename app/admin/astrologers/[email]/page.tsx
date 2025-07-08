"use client";

import React, { useState } from 'react';
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
    documents: {
      aadharCard: '/aadhar-narendra.pdf',
      panCard: '/pan-narendra.pdf',
      selfie: '/selfie-narendra.jpg',
      workProof: '/work-proof-narendra.pdf',
      declarationForm: '/declaration-narendra.pdf',
      addressProof: '/address-proof-narendra.pdf',
    },
    bankDetails: {
      accountNo: '12345678911',
      bankName: 'SBI',
      ifsc: 'SBIN0001234',
    },
  },
];

const documentLabels = {
  aadharCard: 'Aadhar Card',
  panCard: 'PAN Card',
  selfie: 'Selfie Photo',
  workProof: 'Work Proof',
  declarationForm: 'Declaration Form',
  addressProof: 'Address Proof',
};

export default function AstrologerDetailPage({ params }: { params: { email: string } }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [documentStatuses, setDocumentStatuses] = useState({});
  const [rejectionReasons, setRejectionReasons] = useState({});
  const [showRejectionInput, setShowRejectionInput] = useState({});

  const decodedEmail = decodeURIComponent(params?.email || 'narendra@nakshatra.com');
  const astrologer = mockAstrologers.find(a => a.email === decodedEmail);

  if (!astrologer) return notFound();

  const documentKeys = Object.keys(astrologer.documents);
  const currentDocKey = documentKeys[currentDocIndex];
  const currentDocUrl = astrologer.documents[currentDocKey];

  const handleNextDoc = () => {
    setCurrentDocIndex((prev) => (prev + 1) % documentKeys.length);
  };

  const handlePrevDoc = () => {
    setCurrentDocIndex((prev) => (prev - 1 + documentKeys.length) % documentKeys.length);
  };

  const handleAccept = (docKey) => {
    setDocumentStatuses(prev => ({ ...prev, [docKey]: 'accepted' }));
    setShowRejectionInput(prev => ({ ...prev, [docKey]: false }));
    setRejectionReasons(prev => ({ ...prev, [docKey]: '' }));
  };

  const handleReject = (docKey) => {
    setShowRejectionInput(prev => ({ ...prev, [docKey]: true }));
  };

  const handleRejectConfirm = (docKey) => {
    if (rejectionReasons[docKey]?.trim()) {
      setDocumentStatuses(prev => ({ ...prev, [docKey]: 'rejected' }));
      setShowRejectionInput(prev => ({ ...prev, [docKey]: false }));
    }
  };

  const handleRejectCancel = (docKey) => {
    setShowRejectionInput(prev => ({ ...prev, [docKey]: false }));
    setRejectionReasons(prev => ({ ...prev, [docKey]: '' }));
  };

  const getFileType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension) ? 'image' : 'pdf';
  };

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
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Documents
                </button>
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

      {/* Document Viewer Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {documentLabels[currentDocKey]}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentDocIndex + 1} of {documentKeys.length}
                </span>
              </div>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex h-[calc(95vh-200px)]">
              {/* Navigation */}
              <div className="flex flex-col justify-center p-4">
                <button
                  onClick={handlePrevDoc}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={documentKeys.length <= 1}
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              {/* Document Display */}
              <div className="flex-1 p-6 flex items-center justify-center">
                <div className="w-full h-full bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                  {getFileType(currentDocUrl) === 'image' ? (
                    <img
                      src={currentDocUrl}
                      alt={documentLabels[currentDocKey]}
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  ) : (
                    <iframe
                      src={currentDocUrl}
                      className="w-full h-full rounded-lg"
                      title={documentLabels[currentDocKey]}
                    />
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col justify-center p-4">
                <button
                  onClick={handleNextDoc}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={documentKeys.length <= 1}
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-4">
                {/* Document Status */}
                {documentStatuses[currentDocKey] && (
                  <div className="flex items-center justify-center">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      documentStatuses[currentDocKey] === 'accepted' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {documentStatuses[currentDocKey] === 'accepted' ? 'Accepted' : 'Rejected'}
                    </span>
                  </div>
                )}

                {/* Rejection Reason Input */}
                {showRejectionInput[currentDocKey] && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={rejectionReasons[currentDocKey] || ''}
                      onChange={(e) => setRejectionReasons(prev => ({ ...prev, [currentDocKey]: e.target.value }))}
                      placeholder="Please enter the reason for rejection..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleRejectCancel(currentDocKey)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleRejectConfirm(currentDocKey)}
                        disabled={!rejectionReasons[currentDocKey]?.trim()}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                      >
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}

                {/* Accept/Reject Buttons */}
                {!documentStatuses[currentDocKey] && !showRejectionInput[currentDocKey] && (
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleAccept(currentDocKey)}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Accept Document
                    </button>
                    <button
                      onClick={() => handleReject(currentDocKey)}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Reject Document
                    </button>
                  </div>
                )}

                {/* Show rejection reason if rejected */}
                {documentStatuses[currentDocKey] === 'rejected' && rejectionReasons[currentDocKey] && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      <strong>Rejection Reason:</strong> {rejectionReasons[currentDocKey]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}