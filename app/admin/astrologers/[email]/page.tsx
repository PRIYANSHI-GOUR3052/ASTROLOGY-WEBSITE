"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const documentLabels = {
  aadharCard: 'Aadhar Card',
  panCard: 'PAN Card',
  selfie: 'Selfie Photo',
  workProof: 'Work Proof',
  declarationForm: 'Declaration Form',
  addressProof: 'Address Proof',
};

export default function AstrologerDetailPage({ params }: { params: { email: string } }) {
  const router = useRouter();
  const [verification, setVerification] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [adminRemarks, setAdminRemarks] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/astrologer/verification-by-email?email=${decodeURIComponent(params.email)}`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch verification');
        const data = await res.json();
        setVerification(data.verification || null);
      } catch (e: any) {
        setError(e.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.email]);

  const handleAction = async (status: 'approved' | 'rejected') => {
    if (!verification?.astrologerId) return;
    setActionLoading(true);
    setSuccess('');
    setError('');
    try {
      const res = await fetch('/api/astrologer/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ astrologerId: verification.astrologerId, status, adminRemarks }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      setSuccess('Status updated successfully!');
      setVerification((v: any) => v ? { ...v, status, adminRemarks } : v);
      router.push("/admin/astrologers");
    } catch (e: any) {
      setError(e.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
  if (!verification) return <div className="p-8 text-center">Astrologer not found.</div>;
  const { astrologer, certifications, educations, ...docs } = verification;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Astrologer Verification</h1>
      {success && <div className="text-green-600">{success}</div>}
      {error && <div className="text-red-600">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Personal Info</h2>
          <div><b>Name:</b> {astrologer?.firstName} {astrologer?.lastName}</div>
          <div><b>Email:</b> {astrologer?.email}</div>
          <div><b>Phone:</b> {astrologer?.phone}</div>
          <div><b>Experience:</b> {astrologer?.yearsOfExperience} yrs</div>
          <div><b>Status:</b> <span className={`px-2 py-1 rounded text-xs font-semibold ${verification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : verification.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{verification.status}</span></div>
          <div><b>Joined:</b> {astrologer?.createdAt ? new Date(astrologer.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-2">Bank Details</h2>
          <div><b>Bank Name:</b> {astrologer?.bankName}</div>
          <div><b>Account Number:</b> {astrologer?.accountNumber}</div>
          <div><b>IFSC Code:</b> {astrologer?.ifscCode}</div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(documentLabels).map(([key, label]) => (
            verification[key] ? (
              <div key={key} className="mb-2">
                <div className="font-medium">{label}</div>
                {verification[key].endsWith('.pdf') ? (
                  <a href={verification[key]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View PDF</a>
                ) : (
                  <img src={verification[key]} alt={label} className="max-w-xs max-h-40 rounded border" />
                )}
              </div>
            ) : null
          ))}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Certifications</h2>
        {certifications && certifications.length > 0 ? certifications.map((cert: any, idx: number) => (
          <div key={idx} className="mb-4 p-2 border rounded">
            <div><b>Course Name:</b> {cert.courseName}</div>
            <div><b>Institute:</b> {cert.instituteName}</div>
            <div><b>Year:</b> {cert.yearOfCompletion}</div>
            {cert.certificateFile && (cert.certificateFile.endsWith('.pdf') ? (
              <a href={cert.certificateFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Certificate PDF</a>
            ) : (
              <img src={cert.certificateFile} alt="Certificate" className="max-w-xs max-h-40 rounded border" />
            ))}
          </div>
        )) : <div>No certifications uploaded.</div>}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Educations</h2>
        {educations && educations.length > 0 ? educations.map((edu: any, idx: number) => (
          <div key={idx} className="mb-4 p-2 border rounded">
            <div><b>Qualification:</b> {edu.qualification}</div>
            <div><b>Field of Study:</b> {edu.fieldOfStudy}</div>
            <div><b>University:</b> {edu.universityName}</div>
            {edu.degreeFile && (edu.degreeFile.endsWith('.pdf') ? (
              <a href={edu.degreeFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Degree PDF</a>
            ) : (
              <img src={edu.degreeFile} alt="Degree" className="max-w-xs max-h-40 rounded border" />
            ))}
          </div>
        )) : <div>No education documents uploaded.</div>}
      </div>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <textarea
          className="border rounded p-2 flex-1"
          placeholder="Admin remarks (optional)"
          value={adminRemarks}
          onChange={e => setAdminRemarks(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-6 py-3 rounded font-semibold disabled:opacity-50"
          disabled={actionLoading || verification.status === 'approved'}
          onClick={() => handleAction('approved')}
        >
          Approve
        </button>
        <button
          className="bg-red-600 text-white px-6 py-3 rounded font-semibold disabled:opacity-50"
          disabled={actionLoading || verification.status === 'rejected'}
          onClick={() => handleAction('rejected')}
        >
          Reject
        </button>
      </div>
    </div>
  );
}