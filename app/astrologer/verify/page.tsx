"use client";

import React, { useEffect, useState } from 'react';
import { useAuthToken } from '@/hooks/useAuthToken';

interface Certification {
  courseName: string;
  instituteName: string;
  yearOfCompletion: string;
  file: File | null;
}
interface Education {
  qualification: string;
  fieldOfStudy: string;
  universityName: string;
  file: File | null;
}

const initialCert: Certification = { courseName: '', instituteName: '', yearOfCompletion: '', file: null };
const initialEdu: Education = { qualification: '', fieldOfStudy: '', universityName: '', file: null };

export default function AstrologerVerificationPage() {
  const [status, setStatus] = useState('');
  const [adminRemarks, setAdminRemarks] = useState('');
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const token = useAuthToken();

  // Form state
  const [aadharCard, setAadharCard] = useState<File | null>(null);
  const [panCard, setPanCard] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [workProof, setWorkProof] = useState<File | null>(null);
  const [declarationForm, setDeclarationForm] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);
  const [certifications, setCertifications] = useState<Certification[]>([{ ...initialCert }]);
  const [educations, setEducations] = useState<Education[]>([{ ...initialEdu }]);

  // Fetch verification status only when token is available
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch('/api/astrologer/verification', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.verification) {
          setStatus(data.verification.status);
          setAdminRemarks(data.verification.adminRemarks || '');
        }
      })
      .catch(() => setError('Failed to fetch verification status'))
      .finally(() => setLoading(false));
  }, [token]);

  // Handlers for dynamic fields
  const handleCertChange = (idx: number, field: keyof Certification, value: string) => {
    setCertifications(certs => certs.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  };
  const handleCertFile = (idx: number, file: File | null) => {
    setCertifications(certs => certs.map((c, i) => i === idx ? { ...c, file } : c));
  };
  const addCert = () => setCertifications(certs => [...certs, { ...initialCert }]);
  const removeCert = (idx: number) => {
    setCertifications(certs => certs.length > 1 ? certs.filter((_, i) => i !== idx) : certs);
  };

  const handleEduChange = (idx: number, field: keyof Education, value: string) => {
    setEducations(edus => edus.map((e, i) => i === idx ? { ...e, [field]: value } : e));
  };
  const handleEduFile = (idx: number, file: File | null) => {
    setEducations(edus => edus.map((e, i) => i === idx ? { ...e, file } : e));
  };
  const addEdu = () => setEducations(edus => [...edus, { ...initialEdu }]);
  const removeEdu = (idx: number) => {
    setEducations(edus => edus.length > 1 ? edus.filter((_, i) => i !== idx) : edus);
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!token) {
      setError('No token found. Please log in again.');
      return;
    }
    const formData = new FormData();
    if (aadharCard) formData.append('aadharCard', aadharCard);
    if (panCard) formData.append('panCard', panCard);
    if (selfie) formData.append('selfie', selfie);
    if (workProof) formData.append('workProof', workProof);
    if (declarationForm) formData.append('declarationForm', declarationForm);
    if (addressProof) formData.append('addressProof', addressProof);
    // Certifications
    formData.append('certifications', JSON.stringify(certifications.map(({ courseName, instituteName, yearOfCompletion }) => ({ courseName, instituteName, yearOfCompletion }))));
    certifications.forEach((cert) => {
      if (cert.file) formData.append('certificationFiles', cert.file);
    });
    // Educations
    formData.append('educations', JSON.stringify(educations.map(({ qualification, fieldOfStudy, universityName }) => ({ qualification, fieldOfStudy, universityName }))));
    educations.forEach((edu) => {
      if (edu.file) formData.append('degreeFiles', edu.file);
    });
    try {
      const res = await fetch('/api/astrologer/verification', {
        method: 'POST',
        body: formData,
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Verification submitted successfully!');
        setStatus('pending');
        // Reset form after success
        setAadharCard(null);
        setPanCard(null);
        setSelfie(null);
        setWorkProof(null);
        setDeclarationForm(null);
        setAddressProof(null);
        setCertifications([{ ...initialCert }]);
        setEducations([{ ...initialEdu }]);
      } else {
        setError(data.error || 'Submission failed');
      }
    } catch (e) {
      setError('Submission failed');
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Astrologer Verification</h1>
      {loading ? <p>Loading...</p> : (
        <>
          <p>Status: <b>{status}</b></p>
          {adminRemarks && <p className="text-red-600">Admin remarks: {adminRemarks}</p>}
        </>
      )}
      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 mt-4" encType="multipart/form-data">
        <div>
          <label>Aadhar Card: <input type="file" accept="image/*,.pdf" onChange={e => setAadharCard(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)} /></label>
        </div>
        <div>
          <label>PAN Card: <input type="file" accept="image/*,.pdf" onChange={e => setPanCard(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)} /></label>
        </div>
        <div>
          <label>Live Selfie: <input type="file" accept="image/*" onChange={e => setSelfie(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)} /></label>
        </div>
        <div>
          <label>Work Proof: <input type="file" accept="image/*,.pdf" onChange={e => setWorkProof(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)} /></label>
        </div>
        <div>
          <label>Declaration Form: <input type="file" accept="image/*,.pdf" onChange={e => setDeclarationForm(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)} /></label>
        </div>
        <div>
          <label>Address Proof: <input type="file" accept="image/*,.pdf" onChange={e => setAddressProof(e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)} /></label>
        </div>
        <div>
          <h2 className="font-semibold">Astrology/Spiritual Certifications</h2>
          {certifications.map((cert, idx) => (
            <div key={idx} className="border p-2 mb-2">
              <input type="text" placeholder="Course Name" value={cert.courseName} onChange={e => handleCertChange(idx, 'courseName', e.target.value)} className="mr-2" />
              <input type="text" placeholder="Institute Name" value={cert.instituteName} onChange={e => handleCertChange(idx, 'instituteName', e.target.value)} className="mr-2" />
              <input type="text" placeholder="Year of Completion" value={cert.yearOfCompletion} onChange={e => handleCertChange(idx, 'yearOfCompletion', e.target.value)} className="mr-2" />
              <input type="file" accept="image/*,.pdf" onChange={e => handleCertFile(idx, e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)} />
              {certifications.length > 1 && <button type="button" onClick={() => removeCert(idx)} className="ml-2 text-red-600">Remove</button>}
            </div>
          ))}
          <button type="button" onClick={addCert} className="text-blue-600">Add Certification</button>
        </div>
        <div>
          <h2 className="font-semibold">General Educational Degree</h2>
          {educations.map((edu, idx) => (
            <div key={idx} className="border p-2 mb-2">
              <input type="text" placeholder="Qualification" value={edu.qualification} onChange={e => handleEduChange(idx, 'qualification', e.target.value)} className="mr-2" />
              <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={e => handleEduChange(idx, 'fieldOfStudy', e.target.value)} className="mr-2" />
              <input type="text" placeholder="University/College Name" value={edu.universityName} onChange={e => handleEduChange(idx, 'universityName', e.target.value)} className="mr-2" />
              <input type="file" accept="image/*,.pdf" onChange={e => handleEduFile(idx, e.target.files && e.target.files.length > 0 ? e.target.files[0] : null)} />
              {educations.length > 1 && <button type="button" onClick={() => removeEdu(idx)} className="ml-2 text-red-600">Remove</button>}
            </div>
          ))}
          <button type="button" onClick={addEdu} className="text-blue-600">Add Education</button>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Verification</button>
      </form>
      {/* TODO: Add better styling and UX */}
    </div>
  );
} 