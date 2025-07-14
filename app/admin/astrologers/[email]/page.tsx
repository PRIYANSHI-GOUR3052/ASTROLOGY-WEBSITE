"use client";

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';


const documentLabels = {
  aadharCard: 'Aadhar Card',
  panCard: 'PAN Card',
  selfie: 'Selfie Photo',
  workProof: 'Work Proof',
  declarationForm: 'Declaration Form',
  addressProof: 'Address Proof',
};

type DocumentKey = 'aadharCard' | 'panCard' | 'selfie' | 'workProof' | 'declarationForm' | 'addressProof';
type DocumentStatus = 'unverified' | 'pending' | 'accepted' | 'rejected';
interface DocumentStatuses {
  [key: string]: DocumentStatus;
}
interface RejectionReasons {
  [key: string]: string;
}
interface ShowRejectionInput {
  [key: string]: boolean;
}

interface Astrologer {
  name: string;
  email: string;
  phone: string;
  expertise: string;
  experience: number;
  joined: string;
  documentStatus: string;
  description: string;
  profilePicture: string;
  documents: Record<DocumentKey, string>;
  bankDetails: {
    accountNo: string;
    bankName: string;
    ifsc: string;
  };
}

export default function AstrologerDetailPage({ params }: { params: { email: string } }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [documentStatuses, setDocumentStatuses] = useState<DocumentStatuses>({});
  const [rejectionReasons, setRejectionReasons] = useState<RejectionReasons>({});
  const [showRejectionInput, setShowRejectionInput] = useState<ShowRejectionInput>({});
  const [astrologer, setAstrologer] = useState<Astrologer | null>(null);
  const [loading, setLoading] = useState(true);

  const decodedEmail = decodeURIComponent(params?.email || '');

  // Add after fetching verification in useEffect
  const [educations, setEducations] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<any[]>([]);
  const [eduStatuses, setEduStatuses] = useState<{ [id: number]: DocumentStatus }>({});
  const [eduRemarks, setEduRemarks] = useState<{ [id: number]: string }>({});
  const [eduShowReject, setEduShowReject] = useState<{ [id: number]: boolean }>({});
  const [certStatuses, setCertStatuses] = useState<{ [id: number]: DocumentStatus }>({});
  const [certRemarks, setCertRemarks] = useState<{ [id: number]: string }>({});
  const [certShowReject, setCertShowReject] = useState<{ [id: number]: boolean }>({});

  // Add state for modal
  const [eduModal, setEduModal] = useState<{ open: boolean; file: string; label: string } | null>(null);
  const [certModal, setCertModal] = useState<{ open: boolean; file: string; label: string } | null>(null);

  // Add state for admin remarks
  const [adminRemarks, setAdminRemarks] = useState('');
  // Add state for success message
  const [profileActionMsg, setProfileActionMsg] = useState<string | null>(null);

  // Fetch astrologer and verification data from backend on mount
  useEffect(() => {
    async function fetchAstrologer() {
      setLoading(true);
      try {
        const res = await fetch(`/api/astrologer/verification-by-email?email=${encodeURIComponent(decodedEmail)}`, { credentials: 'include' });
        if (!res.ok) {
          setAstrologer(null);
          setLoading(false);
          return;
        }
        const { verification } = await res.json();
        // Compose astrologer object from backend data
        const astro: Astrologer = {
          name: verification.astrologer.firstName + ' ' + verification.astrologer.lastName,
          email: verification.astrologer.email,
          phone: verification.astrologer.phone,
          expertise: verification.astrologer.areasOfExpertise,
          experience: verification.astrologer.yearsOfExperience || 0,
          joined: verification.astrologer.createdAt ? new Date(verification.astrologer.createdAt).toLocaleDateString() : '',
          documentStatus: verification.status,
          description: verification.astrologer.description || '',
          profilePicture: verification.astrologer.profileImage || '/placeholder-user.jpg',
          documents: {
            aadharCard: verification.aadharCard || '',
            panCard: verification.panCard || '',
            selfie: verification.selfie || '',
            workProof: verification.workProof || '',
            declarationForm: verification.declarationForm || '',
            addressProof: verification.addressProof || '',
          },
          bankDetails: {
            accountNo: verification.astrologer.accountNumber || '',
            bankName: verification.astrologer.bankName || '',
            ifsc: verification.astrologer.ifscCode || '',
          },
        };
        setAstrologer(astro);
        // Set document statuses and rejection reasons from backend
        const docStatuses: DocumentStatuses = {};
        const docReasons: RejectionReasons = {};
        (['aadharCard', 'panCard', 'selfie', 'workProof', 'declarationForm', 'addressProof'] as DocumentKey[]).forEach((key) => {
          const statusKey = key + 'Status';
          const remarksKey = key + 'Remarks';
          docStatuses[key] = verification[statusKey] || 'unverified';
          docReasons[key] = verification[remarksKey] || '';
        });
        setDocumentStatuses(docStatuses);
        setRejectionReasons(docReasons);
        setEducations(verification.educations || []);
        setCertifications(verification.certifications || []);
        const eduStat: { [id: number]: DocumentStatus } = {};
        const eduRem: { [id: number]: string } = {};
        (verification.educations || []).forEach((e: any) => {
          eduStat[e.id] = e.status || 'unverified';
          eduRem[e.id] = e.remarks || '';
        });
        setEduStatuses(eduStat);
        setEduRemarks(eduRem);
        const certStat: { [id: number]: DocumentStatus } = {};
        const certRem: { [id: number]: string } = {};
        (verification.certifications || []).forEach((c: any) => {
          certStat[c.id] = c.status || 'unverified';
          certRem[c.id] = c.remarks || '';
        });
        setCertStatuses(certStat);
        setCertRemarks(certRem);
        setAdminRemarks(verification.adminRemarks || '');
      } catch {
        setAstrologer(null);
      }
      setLoading(false);
    }
    fetchAstrologer();
  }, [decodedEmail]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!astrologer) return notFound();

  const documentKeys = Object.keys(astrologer.documents) as DocumentKey[];
  const currentDocKey = documentKeys[currentDocIndex];
  const currentDocUrl = astrologer.documents[currentDocKey];

  const handleNextDoc = () => {
    setCurrentDocIndex((prev) => (prev + 1) % documentKeys.length);
  };

  const handlePrevDoc = () => {
    setCurrentDocIndex((prev) => (prev - 1 + documentKeys.length) % documentKeys.length);
  };

  const handleAccept = async (docKey: DocumentKey) => {
    setDocumentStatuses(prev => ({ ...prev, [docKey]: 'accepted' }));
    setShowRejectionInput(prev => ({ ...prev, [docKey]: false }));
    setRejectionReasons(prev => ({ ...prev, [docKey]: '' }));
    await fetch('/api/astrologer/verification-by-email', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: decodedEmail,
        type: 'document',
        key: docKey,
        status: 'accepted',
        remarks: ''
      })
    });
  };

  const handleReject = (docKey: DocumentKey) => {
    setShowRejectionInput(prev => ({ ...prev, [docKey]: true }));
  };

  const handleRejectConfirm = async (docKey: DocumentKey) => {
    if (rejectionReasons[docKey]?.trim()) {
      setDocumentStatuses(prev => ({ ...prev, [docKey]: 'rejected' }));
      setShowRejectionInput(prev => ({ ...prev, [docKey]: false }));
      await fetch('/api/astrologer/verification-by-email', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: decodedEmail,
          type: 'document',
          key: docKey,
          status: 'rejected',
          remarks: rejectionReasons[docKey]
        })
      });
    }
  };

  const handleRejectCancel = (docKey: DocumentKey) => {
    setShowRejectionInput(prev => ({ ...prev, [docKey]: false }));
    setRejectionReasons(prev => ({ ...prev, [docKey]: '' }));
  };

  // Add handlers for education/certification accept/reject
  const handleAcceptEducation = async (id: number) => {
    setEduStatuses(prev => ({ ...prev, [id]: 'accepted' }));
    setEduShowReject(prev => ({ ...prev, [id]: false }));
    setEduRemarks(prev => ({ ...prev, [id]: '' }));
    await fetch('/api/astrologer/verification-by-email', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: decodedEmail,
        type: 'education',
        key: id,
        status: 'accepted',
        remarks: ''
      })
    });
  };
  const handleRejectEducation = (id: number) => {
    setEduShowReject(prev => ({ ...prev, [id]: true }));
  };
  const handleRejectConfirmEducation = async (id: number) => {
    if (eduRemarks[id]?.trim()) {
      setEduStatuses(prev => ({ ...prev, [id]: 'rejected' }));
      setEduShowReject(prev => ({ ...prev, [id]: false }));
      await fetch('/api/astrologer/verification-by-email', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: decodedEmail,
          type: 'education',
          key: id,
          status: 'rejected',
          remarks: eduRemarks[id]
        })
      });
    }
  };
  const handleRejectCancelEducation = (id: number) => {
    setEduShowReject(prev => ({ ...prev, [id]: false }));
    setEduRemarks(prev => ({ ...prev, [id]: '' }));
  };
  const handleAcceptCertification = async (id: number) => {
    setCertStatuses(prev => ({ ...prev, [id]: 'accepted' }));
    setCertShowReject(prev => ({ ...prev, [id]: false }));
    setCertRemarks(prev => ({ ...prev, [id]: '' }));
    await fetch('/api/astrologer/verification-by-email', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        email: decodedEmail,
        type: 'certification',
        key: id,
        status: 'accepted',
        remarks: ''
      })
    });
  };
  const handleRejectCertification = (id: number) => {
    setCertShowReject(prev => ({ ...prev, [id]: true }));
  };
  const handleRejectConfirmCertification = async (id: number) => {
    if (certRemarks[id]?.trim()) {
      setCertStatuses(prev => ({ ...prev, [id]: 'rejected' }));
      setCertShowReject(prev => ({ ...prev, [id]: false }));
      await fetch('/api/astrologer/verification-by-email', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: decodedEmail,
          type: 'certification',
          key: id,
          status: 'rejected',
          remarks: certRemarks[id]
        })
      });
    }
  };
  const handleRejectCancelCertification = (id: number) => {
    setCertShowReject(prev => ({ ...prev, [id]: false }));
    setCertRemarks(prev => ({ ...prev, [id]: '' }));
  };

  const getFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase() || '';
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension) ? 'image' : 'pdf';
  };

  // Add function to refetch verification and update state
  const refetchVerification = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/astrologer/verification-by-email?email=${encodeURIComponent(decodedEmail)}`, { credentials: 'include' });
      if (!res.ok) return;
      const { verification } = await res.json();
      const astro: Astrologer = {
        name: verification.astrologer.firstName + ' ' + verification.astrologer.lastName,
        email: verification.astrologer.email,
        phone: verification.astrologer.phone,
        expertise: verification.astrologer.areasOfExpertise,
        experience: verification.astrologer.yearsOfExperience || 0,
        joined: verification.astrologer.createdAt ? new Date(verification.astrologer.createdAt).toLocaleDateString() : '',
        documentStatus: verification.status,
        description: verification.astrologer.description || '',
        profilePicture: verification.astrologer.profileImage || '/placeholder-user.jpg',
        documents: {
          aadharCard: verification.aadharCard || '',
          panCard: verification.panCard || '',
          selfie: verification.selfie || '',
          workProof: verification.workProof || '',
          declarationForm: verification.declarationForm || '',
          addressProof: verification.addressProof || '',
        },
        bankDetails: {
          accountNo: verification.astrologer.accountNumber || '',
          bankName: verification.astrologer.bankName || '',
          ifsc: verification.astrologer.ifscCode || '',
        },
      };
      setAstrologer(astro);
      setAdminRemarks(verification.adminRemarks || '');
    } finally {
      setLoading(false);
    }
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

          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Education Documents</h2>
            {educations.length === 0 && <p className="text-gray-500">No education documents submitted.</p>}
            {educations.map(edu => (
              <div key={edu.id} className="mb-6 p-4 border rounded-xl bg-white dark:bg-gray-800 flex flex-col md:flex-row md:items-center md:space-x-6">
                <div className="flex-1">
                  <div className="mb-2 font-semibold">{edu.qualification} in {edu.fieldOfStudy}</div>
                  <div className="mb-2 text-sm text-gray-500">{edu.universityName}</div>
                  <div className="mb-2 text-sm text-gray-500">Degree File: {edu.degreeFile ? (
                    <button onClick={() => setEduModal({ open: true, file: edu.degreeFile, label: `${edu.qualification} - ${edu.universityName}` })} className="text-blue-600 underline">View Document</button>
                  ) : 'Not uploaded'}</div>
                </div>
                <div className="flex flex-col items-end">
                  {eduStatuses[edu.id] === 'accepted' && <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">Accepted</span>}
                  {eduStatuses[edu.id] === 'rejected' && <span className="px-3 py-1 rounded-full bg-red-100 text-red-800">Rejected</span>}
                  {(eduStatuses[edu.id] === 'unverified' || eduStatuses[edu.id] === 'pending') && !eduShowReject[edu.id] && (
                    <div className="flex space-x-2 mt-2">
                      <button onClick={() => handleAcceptEducation(edu.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg">Accept</button>
                      <button onClick={() => handleRejectEducation(edu.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg">Reject</button>
                    </div>
                  )}
                  {eduShowReject[edu.id] && (
                    <div className="mt-2 space-y-2">
                      <input type="text" value={eduRemarks[edu.id] || ''} onChange={e => setEduRemarks(prev => ({ ...prev, [edu.id]: e.target.value }))} placeholder="Rejection reason..." className="px-2 py-1 border rounded" />
                      <div className="flex space-x-2">
                        <button onClick={() => handleRejectCancelEducation(edu.id)} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
                        <button onClick={() => handleRejectConfirmEducation(edu.id)} disabled={!eduRemarks[edu.id]?.trim()} className="px-3 py-1 bg-red-600 text-white rounded disabled:bg-gray-400">Confirm</button>
                      </div>
                    </div>
                  )}
                  {eduStatuses[edu.id] === 'rejected' && eduRemarks[edu.id] && (
                    <div className="mt-2 text-sm text-red-700">Reason: {eduRemarks[edu.id]}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Certification Documents</h2>
            {certifications.length === 0 && <p className="text-gray-500">No certification documents submitted.</p>}
            {certifications.map(cert => (
              <div key={cert.id} className="mb-6 p-4 border rounded-xl bg-white dark:bg-gray-800 flex flex-col md:flex-row md:items-center md:space-x-6">
                <div className="flex-1">
                  <div className="mb-2 font-semibold">{cert.courseName} ({cert.yearOfCompletion})</div>
                  <div className="mb-2 text-sm text-gray-500">{cert.instituteName}</div>
                  <div className="mb-2 text-sm text-gray-500">Certificate File: {cert.certificateFile ? (
                    <button onClick={() => setCertModal({ open: true, file: cert.certificateFile, label: `${cert.courseName} - ${cert.instituteName}` })} className="text-blue-600 underline">View Document</button>
                  ) : 'Not uploaded'}</div>
                </div>
                <div className="flex flex-col items-end">
                  {certStatuses[cert.id] === 'accepted' && <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">Accepted</span>}
                  {certStatuses[cert.id] === 'rejected' && <span className="px-3 py-1 rounded-full bg-red-100 text-red-800">Rejected</span>}
                  {(certStatuses[cert.id] === 'unverified' || certStatuses[cert.id] === 'pending') && !certShowReject[cert.id] && (
                    <div className="flex space-x-2 mt-2">
                      <button onClick={() => handleAcceptCertification(cert.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg">Accept</button>
                      <button onClick={() => handleRejectCertification(cert.id)} className="px-4 py-2 bg-red-600 text-white rounded-lg">Reject</button>
                    </div>
                  )}
                  {certShowReject[cert.id] && (
                    <div className="mt-2 space-y-2">
                      <input type="text" value={certRemarks[cert.id] || ''} onChange={e => setCertRemarks(prev => ({ ...prev, [cert.id]: e.target.value }))} placeholder="Rejection reason..." className="px-2 py-1 border rounded" />
                      <div className="flex space-x-2">
                        <button onClick={() => handleRejectCancelCertification(cert.id)} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
                        <button onClick={() => handleRejectConfirmCertification(cert.id)} disabled={!certRemarks[cert.id]?.trim()} className="px-3 py-1 bg-red-600 text-white rounded disabled:bg-gray-400">Confirm</button>
                      </div>
                    </div>
                  )}
                  {certStatuses[cert.id] === 'rejected' && certRemarks[cert.id] && (
                    <div className="mt-2 text-sm text-red-700">Reason: {certRemarks[cert.id]}</div>
                  )}
                </div>
              </div>
            ))}
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

        {/* Profile Verification Control */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19v-7" />
            </svg>
            Profile Verification Control
          </h2>
          <div className="mb-2 text-sm text-gray-500">Current Status: <span className="font-semibold text-gray-900 dark:text-gray-100">{astrologer.documentStatus}</span></div>
          <div className="mb-2 text-sm text-gray-500">Admin Remarks: <span className="font-medium text-gray-700 dark:text-gray-200">{adminRemarks || '—'}</span></div>
          {(() => {
            const allAccepted = Object.values(documentStatuses).every(s => s === 'accepted') &&
              Object.values(eduStatuses).every(s => s === 'accepted') &&
              Object.values(certStatuses).every(s => s === 'accepted');
            return (
              <div className="mt-4 flex flex-col gap-4">
                <button
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-400"
                  disabled={!allAccepted}
                  onClick={async () => {
                    await fetch('/api/astrologer/verification-by-email', {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      credentials: 'include',
                      body: JSON.stringify({
                        email: decodedEmail,
                        type: 'profile',
                        status: 'approved',
                        remarks: ''
                      })
                    });
                    await refetchVerification();
                    setProfileActionMsg('Astrologer approved successfully.');
                    setTimeout(() => setProfileActionMsg(null), 2000);
                  }}
                >
                  Approve Astrologer
                </button>
                <div>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-gray-100 mb-2"
                    placeholder="Enter reason for rejection..."
                    value={adminRemarks}
                    onChange={e => setAdminRemarks(e.target.value)}
                  />
                  <button
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-400"
                    disabled={!adminRemarks.trim()}
                    onClick={async () => {
                      await fetch('/api/astrologer/verification-by-email', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        credentials: 'include',
                        body: JSON.stringify({
                          email: decodedEmail,
                          type: 'profile',
                          status: 'rejected',
                          remarks: adminRemarks
                        })
                      });
                      await refetchVerification();
                      setProfileActionMsg('Astrologer rejected.');
                      setTimeout(() => setProfileActionMsg(null), 2000);
                    }}
                  >
                    Reject Astrologer
                  </button>
                </div>
              </div>
            );
          })()}
          {profileActionMsg && (
            <div className="mt-2 text-green-600 font-medium">{profileActionMsg}</div>
          )}
        </div>

      </div>

      {/* Document Viewer Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-scroll">
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
                {(documentStatuses[currentDocKey] === 'accepted') && (
                  <div className="flex items-center justify-center">
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Accepted
                    </span>
                  </div>
                )}
                {(documentStatuses[currentDocKey] === 'rejected') && (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <span className="px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                      Rejected
                    </span>
                    {rejectionReasons[currentDocKey] && (
                      <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <p className="text-sm text-red-800 dark:text-red-200">
                          <strong>Rejection Reason:</strong> {rejectionReasons[currentDocKey]}
                        </p>
                      </div>
                    )}
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
                {/* Accept/Reject Buttons (only if not accepted or rejected) */}
                {(documentStatuses[currentDocKey] === 'unverified' || documentStatuses[currentDocKey] === 'pending') && !showRejectionInput[currentDocKey] && (
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
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education Modal */}
      {eduModal && eduModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{eduModal.label}</h3>
              <button onClick={() => setEduModal(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center p-6">
              {getFileType(eduModal.file) === 'image' ? (
                <img src={eduModal.file} alt={eduModal.label} className="max-w-full max-h-[70vh] object-contain rounded-lg" />
              ) : (
                <iframe src={eduModal.file} className="w-full h-[70vh] rounded-lg" title={eduModal.label} />
              )}
            </div>
          </div>
        </div>
      )}
      {/* Certification Modal */}
      {certModal && certModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{certModal.label}</h3>
              <button onClick={() => setCertModal(null)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex items-center justify-center p-6">
              {getFileType(certModal.file) === 'image' ? (
                <img src={certModal.file} alt={certModal.label} className="max-w-full max-h-[70vh] object-contain rounded-lg" />
              ) : (
                <iframe src={certModal.file} className="w-full h-[70vh] rounded-lg" title={certModal.label} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}