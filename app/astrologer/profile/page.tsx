'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, XCircle, AlertCircle, Plus, Trash } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const expertiseOptions = [
  "Vedic Astrology",
  "Tarot Reading",
  "Numerology",
  "Palmistry",
  "Vastu",
  "Other"
];

const avatarOptions = [
  "/images/astrologer/astrology.gif",
  "/images/astrologer/crystal-ball.gif",
  "/images/astrologer/sagittarius.gif",
  "/images/astrologer/tarot.gif",
];

type ApprovalStatus = 'unverified' | 'pending' | 'approved' | 'rejected';

// Add interfaces at the top
interface Certification {
  id?: number;
  courseName: string;
  instituteName: string;
  yearOfCompletion: string;
  certificateFile?: string;
  file?: File;
  status?: string;
  remarks?: string;
}
interface Education {
  id?: number;
  qualification: string;
  fieldOfStudy: string;
  universityName: string;
  degreeFile?: string;
  file?: File;
  status?: string;
  remarks?: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>('unverified');
  const [adminRemarks, setAdminRemarks] = useState('');
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verification, setVerification] = useState<any>(null);
  const [docFiles, setDocFiles] = useState<{ [key: string]: File | null }>({});
  const [astrologer, setAstrologer] = useState<any>(null);
  // Basic details form state
  const [basicForm, setBasicForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    yearsOfExperience: '',
    areasOfExpertise: [] as string[],
    profileImage: '',
    avatar: '',
  });
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [modalDoc, setModalDoc] = useState<{ url: string; label: string } | null>(null);

  const requiredDocs = [
    { name: 'aadharCard', label: 'Aadhar Card', statusKey: 'aadharStatus', remarksKey: 'aadharRemarks' },
    { name: 'panCard', label: 'PAN Card', statusKey: 'panStatus', remarksKey: 'panRemarks' },
    { name: 'selfie', label: 'Selfie', statusKey: 'selfieStatus', remarksKey: 'selfieRemarks' },
    { name: 'workProof', label: 'Work Proof', statusKey: 'workProofStatus', remarksKey: 'workProofRemarks' },
    { name: 'declarationForm', label: 'Declaration Form', statusKey: 'declarationStatus', remarksKey: 'declarationRemarks' },
    { name: 'addressProof', label: 'Address Proof', statusKey: 'addressStatus', remarksKey: 'addressRemarks' },
  ];

  useEffect(() => {
    const token = localStorage.getItem('astrologerToken');
    if (!token) return;
    setLoading(true);
    // Fetch basic details from new endpoint
    fetch('/api/astrologer/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.astrologer) {
          setBasicForm({
            firstName: data.astrologer.firstName || '',
            lastName: data.astrologer.lastName || '',
            email: data.astrologer.email || '',
            phone: data.astrologer.phone || '',
            yearsOfExperience: data.astrologer.yearsOfExperience?.toString() || '',
            areasOfExpertise: data.astrologer.areasOfExpertise ? data.astrologer.areasOfExpertise.split(',').map((s: string) => s.trim()) : [],
            profileImage: data.astrologer.profileImage || '',
            avatar: '',
          });
          setSelectedAvatar(null);
          setProfileImagePreview(data.astrologer.profileImage || null);
        }
      })
      .catch(() => setError('Failed to fetch astrologer details'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('astrologerToken');
    if (!token) return;
    setLoading(true);
    fetch('/api/astrologer/verification', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.verification) {
          setApprovalStatus(data.verification.status);
          setAdminRemarks(data.verification.adminRemarks || '');
          setVerification(data.verification);
          setCertifications(data.verification.certifications || []);
          setEducations(data.verification.educations || []);
          setAstrologer(data.verification.astrologer || null);
          // Pre-fill basic form if astrologer info exists
          if (data.verification.astrologer) {
            setBasicForm({
              firstName: data.verification.astrologer.firstName || '',
              lastName: data.verification.astrologer.lastName || '',
              email: data.verification.astrologer.email || '',
              phone: data.verification.astrologer.phone || '',
              yearsOfExperience: data.verification.astrologer.yearsOfExperience?.toString() || '',
              areasOfExpertise: data.verification.astrologer.areasOfExpertise ? data.verification.astrologer.areasOfExpertise.split(',').map((s: string) => s.trim()) : [],
              profileImage: data.verification.astrologer.profileImage || '',
              avatar: '',
            });
            setSelectedAvatar(null);
            setProfileImagePreview(data.verification.astrologer.profileImage || null);
          }
        }
      })
      .catch(() => setError('Failed to fetch verification data'))
      .finally(() => setLoading(false));
  }, []);

  // Check if user should only access profile page
  useEffect(() => {
    if (approvalStatus === 'pending' || approvalStatus === 'rejected') {
      const currentPath = window.location.pathname;
      if (currentPath !== '/astrologer/profile') {
        router.replace('/astrologer/profile');
      }
    }
  }, [approvalStatus, router]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          text: 'Verified'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          text: 'Pending Approval'
        };
      case 'rejected':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          text: 'Rejected'
        };
      default:
        return {
          icon: Clock,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          text: 'Not Submitted'
        };
    }
  };

  const statusConfig = getStatusConfig(approvalStatus);
  const StatusIcon = statusConfig.icon;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const token = localStorage.getItem('astrologerToken');
    if (!token) return setError('Not authenticated');
    const formData = new FormData();
    requiredDocs.forEach(doc => {
      if (docFiles[doc.name]) formData.append(doc.name, docFiles[doc.name]!);
    });
    // Logging certifications and their files
    console.log('Submitting certifications:', certifications);
    console.log('Certification files:', certifications.map(c => c.file));
    formData.append('certifications', JSON.stringify(
      certifications.map(({ id, courseName, instituteName, yearOfCompletion }) =>
        ({ id, courseName, instituteName, yearOfCompletion })
      )
    ));
    certifications.forEach((cert) => {
      if (cert.file) formData.append('certificationFiles', cert.file);
    });
    // Logging educations and their files
    console.log('Submitting educations:', educations);
    console.log('Education files:', educations.map(e => e.file));
    formData.append('educations', JSON.stringify(
      educations.map(({ id, qualification, fieldOfStudy, universityName }) =>
        ({ id, qualification, fieldOfStudy, universityName })
      )
    ));
    educations.forEach((edu) => {
      if (edu.file) formData.append('degreeFiles', edu.file);
    });
    setLoading(true);
    fetch('/api/astrologer/verification', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setSuccess('Verification submitted successfully!');
          setVerification({ status: 'pending', ...data });
        } else {
          setError(data.error || 'Submission failed');
        }
      })
      .catch(() => setError('Submission failed'))
      .finally(() => setLoading(false));
  };

  // Handle file input changes
  const handleDocFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDocFiles({ ...docFiles, [e.target.name]: e.target.files ? e.target.files[0] : null });
  };

  // Dynamic certifications/educations
  const handleCertChange = (idx: number, field: string, value: string) => {
    setCertifications((prev) => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));
  };
  const handleCertFile = (idx: number, file: File) => {
    setCertifications((prev) => prev.map((c, i) => i === idx ? { ...c, file } : c));
  };
  const addCert = () => setCertifications([...certifications, { courseName: '', instituteName: '', yearOfCompletion: '' }]);
  const removeCert = (idx: number) => setCertifications(certifications.filter((_, i) => i !== idx));

  const handleEduChange = (idx: number, field: string, value: string) => {
    setEducations((prev) => prev.map((e, i) => i === idx ? { ...e, [field]: value } : e));
  };
  const handleEduFile = (idx: number, file: File) => {
    setEducations((prev) => prev.map((e, i) => i === idx ? { ...e, file } : e));
  };
  const addEdu = () => setEducations([...educations, { qualification: '', fieldOfStudy: '', universityName: '' }]);
  const removeEdu = (idx: number) => setEducations(educations.filter((_, i) => i !== idx));

  // Show basic details (from verification.astrologer or a separate fetch)
  const details = astrologer || verification?.astrologer || {};

  // Basic details form handlers
  const handleBasicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBasicForm(prev => ({ ...prev, [name]: value }));
  };
  const handleExpertiseCheckbox = (option: string) => {
    setBasicForm(prev => {
      const exists = prev.areasOfExpertise.includes(option);
      return {
        ...prev,
        areasOfExpertise: exists
          ? prev.areasOfExpertise.filter((ex) => ex !== option)
          : [...prev.areasOfExpertise, option],
      };
    });
  };
  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setProfileImagePreview(avatar);
    setProfileImageFile(null);
    setBasicForm(prev => ({ ...prev, avatar, profileImage: '' }));
  };
  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
      setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
      setSelectedAvatar(null);
      setBasicForm(prev => ({ ...prev, avatar: '', profileImage: '' }));
    }
  };
  // Placeholder for save details
  const handleSaveBasicDetails = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); setSuccess("");
    const token = localStorage.getItem('astrologerToken');
    if (!token) return setError('Not authenticated');
    setLoading(true);
    // Prepare data
    let profileImageUrl = basicForm.profileImage;
    if (selectedAvatar) {
      profileImageUrl = selectedAvatar;
    }
    // If profileImageFile is set, you would upload it to cloudinary here and get the URL
    // For now, skip upload and use avatar or existing URL
    const payload = {
      firstName: basicForm.firstName,
      lastName: basicForm.lastName,
      email: basicForm.email, // not editable, but sent for completeness
      phone: basicForm.phone,
      yearsOfExperience: basicForm.yearsOfExperience,
      areasOfExpertise: basicForm.areasOfExpertise.join(','),
      profileImage: profileImageUrl,
    };
    fetch('/api/astrologer/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data.astrologer) {
          setSuccess('Profile details updated!');
          setBasicForm({
            firstName: data.astrologer.firstName || '',
            lastName: data.astrologer.lastName || '',
            email: data.astrologer.email || '',
            phone: data.astrologer.phone || '',
            yearsOfExperience: data.astrologer.yearsOfExperience?.toString() || '',
            areasOfExpertise: data.astrologer.areasOfExpertise ? data.astrologer.areasOfExpertise.split(',').map((s: string) => s.trim()) : [],
            profileImage: data.astrologer.profileImage || '',
            avatar: '',
          });
          setSelectedAvatar(null);
          setProfileImagePreview(data.astrologer.profileImage || null);
        } else {
          setError(data.error || 'Failed to update profile');
        }
      })
      .catch(() => setError('Failed to update profile'))
      .finally(() => setLoading(false));
  };

  // Helper to check if any doc/cert/edu is not accepted
  const hasAnyNotAccepted = () => {
    // Check documents
    const docRejectedOrPending = requiredDocs.some(doc => {
      const status = verification?.[doc.statusKey] || 'unverified';
      return status !== 'accepted';
    });
    
    // Check certifications
    const certRejectedOrPending = certifications.some(cert => cert.status !== 'accepted');
    
    // Check educations
    const eduRejectedOrPending = educations.some(edu => edu.status !== 'accepted');
    
    return docRejectedOrPending || certRejectedOrPending || eduRejectedOrPending;
  };

  // Helper to check if all docs/certs/edus are accepted (i.e., verified)
  const isFullyVerified = () => {
    // Check documents
    const allDocsAccepted = requiredDocs.every(doc => {
      const status = verification?.[doc.statusKey] || 'unverified';
      return status === 'accepted';
    });
    
    // Check certifications
    const allCertsAccepted = certifications.every(cert => cert.status === 'accepted');
    
    // Check educations
    const allEdusAccepted = educations.every(edu => edu.status === 'accepted');
    
    return allDocsAccepted && allCertsAccepted && allEdusAccepted;
  };

  return (
    <div className="relative">
      {loading ? (
        <div className="p-8 text-center">Loading...</div>
      ) : (
        <>
          {/* Always show manage profile section at the top */}
          <motion.form className="bg-white dark:bg-black p-6 rounded shadow mb-8 relative" onSubmit={handleSaveBasicDetails}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Status Indicator - Top Right (moved inside card) */}
            <div className="absolute top-4 right-4 z-10">
              <motion.div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor} shadow-lg`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <StatusIcon className={`w-5 h-5 ${statusConfig.color}`} />
                <span className={`font-semibold text-sm ${statusConfig.color}`}>{isFullyVerified() ? 'Verified' : statusConfig.text}</span>
              </motion.div>
            </div>
            <h2 className="text-lg font-bold mb-4">Manage Profile</h2>
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-28 h-28 mb-2">
                <img
                  src={profileImagePreview || basicForm.profileImage || selectedAvatar || "/images/placeholder-user.jpg"}
                  alt="Profile Preview"
                  className="w-28 h-28 object-cover rounded-full border-4 border-amber-400 dark:border-purple-400 shadow"
                />
                <label className="absolute bottom-0 right-0 bg-amber-500 dark:bg-purple-600 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-amber-600 dark:hover:bg-purple-700 transition-colors">
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    className="hidden"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9A.75.75 0 016.75 12zm0 0V9.75A2.25 2.25 0 019 7.5h6a2.25 2.25 0 012.25 2.25V12m-12 0v2.25A2.25 2.25 0 009 16.5h6a2.25 2.25 0 002.25-2.25V12" />
                  </svg>
                </label>
              </div>
              <div className="flex gap-2 mt-2">
                {avatarOptions.map((avatar) => (
                  <button
                    type="button"
                    key={avatar}
                    className={`w-10 h-10 rounded-full border-2 ${selectedAvatar === avatar ? "border-amber-600 dark:border-purple-600" : "border-gray-300"} overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-1">Upload a photo or select an avatar</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-sm mb-1">First Name</label>
                <input type="text" name="firstName" value={basicForm.firstName} onChange={handleBasicChange} className="w-full px-4 py-2 rounded border" required />
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Last Name</label>
                <input type="text" name="lastName" value={basicForm.lastName} onChange={handleBasicChange} className="w-full px-4 py-2 rounded border" required />
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Email</label>
                <input type="email" name="email" value={basicForm.email} readOnly className="w-full px-4 py-2 rounded border" />
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Phone</label>
                <input type="tel" name="phone" value={basicForm.phone} onChange={handleBasicChange} className="w-full px-4 py-2 rounded border" required />
              </div>
              <div>
                <label className="block font-semibold text-sm mb-1">Years of Experience</label>
                <input type="number" name="yearsOfExperience" value={basicForm.yearsOfExperience} onChange={handleBasicChange} className="w-full px-4 py-2 rounded border" min="0" required />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold text-sm mb-1">Areas of Expertise</label>
                <div className="flex flex-wrap gap-2">
                  {expertiseOptions.map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={basicForm.areasOfExpertise.includes(option)}
                        onChange={() => handleExpertiseCheckbox(option)}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-2 flex item-center justify-center">
              <motion.button
                type="submit"
                className="py-3 px-6 bg-amber-500 dark:bg-purple-700 text-white font-bold rounded-lg mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Save Details
              </motion.button>
            </div>
          </motion.form>

          {/* Show doc/cert/edu status and re-upload section at the bottom only if not fully verified */}
          {/* --- Modernized Document/Credential Section --- */}
          {!isFullyVerified() && (
            <div className="bg-white dark:bg-black p-6 rounded shadow mb-8">
              {/* Alert for rejection */}
              {approvalStatus === 'rejected' && (
                <div className="mb-6 p-4 rounded-lg border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-red-600" />
                    <div>
                      <h3 className="font-semibold text-red-800 dark:text-red-200">Profile Rejected</h3>
                      <p className="text-sm mt-1 text-red-700 dark:text-red-300">
                        Your profile or some documents were rejected. Please review the remarks and re-upload only the rejected items.
                      </p>
                      {adminRemarks && (
                        <p className="text-sm mt-2 text-red-600 dark:text-red-300"><b>Admin Remarks:</b> {adminRemarks}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {approvalStatus === 'rejected' ? (
                <form className="mt-4" onSubmit={handleSubmit}>
                  {/* Documents Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requiredDocs.map(doc => {
                      const status = verification?.[doc.statusKey] || 'unverified';
                      const remarks = verification?.[doc.remarksKey] || '';
                      const url = verification?.[doc.name] || '';
                      
                      return (
                        <div key={doc.name} className="p-4 rounded-lg border flex flex-col gap-2 bg-gray-50 dark:bg-gray-900/40">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{doc.label}</span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              status === 'accepted' ? 'bg-green-100 text-green-800' : 
                              status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              status === 'rejected' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-200 text-gray-800'
                            }`}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                          </div>
                          {url && (
                            <button 
                              type="button" 
                              className="text-blue-600 underline text-sm w-fit" 
                              onClick={() => setModalDoc({ url, label: doc.label })}
                            >
                              View
                            </button>
                          )}
                          {status === 'rejected' && remarks && (
                            <div className="text-xs text-red-600 mt-1">Remarks: {remarks}</div>
                          )}
                          {(status === 'rejected' || status === 'unverified') && (
                            <input 
                              type="file" 
                              name={doc.name} 
                              accept="application/pdf,image/*" 
                              onChange={handleDocFileChange} 
                              className="w-full mt-2" 
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Certifications Grid */}
                  <div className="mt-8">
                    <h3 className="font-semibold mb-2">Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certifications.length > 0 ? certifications.map((cert, idx) => (
                        <div key={cert.id || idx} className="p-4 rounded-lg border flex flex-col gap-2 bg-gray-50 dark:bg-gray-900/40">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{cert.courseName} ({cert.instituteName})</span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${cert.status === 'accepted' ? 'bg-green-100 text-green-800' : cert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : cert.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'}`}>{cert.status ? cert.status.charAt(0).toUpperCase() + cert.status.slice(1) : 'Unverified'}</span>
                          </div>
                          <div className="text-xs text-gray-500">Year: {cert.yearOfCompletion}</div>
                          {cert.certificateFile && (
                            <button type="button" className="text-blue-600 underline text-sm w-fit" onClick={() => setModalDoc({ url: cert.certificateFile!, label: cert.courseName })}>View</button>
                          )}
                          {cert.status === 'rejected' && cert.remarks && (
                            <div className="text-xs text-red-600 mt-1">Remarks: {cert.remarks}</div>
                          )}
                          {cert.status === 'rejected' && (
                            <input type="file" accept="application/pdf,image/*" onChange={e => { const file = e.target.files && e.target.files[0]; if (file) handleCertFile(idx, file); }} className="w-full mt-2" />
                          )}
                        </div>
                      )) : <div className="text-gray-500">No certifications uploaded.</div>}
                    </div>
                  </div>
                  {/* Educations Grid */}
                  <div className="mt-8">
                    <h3 className="font-semibold mb-2">Educations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {educations.length > 0 ? educations.map((edu, idx) => (
                        <div key={edu.id || idx} className="p-4 rounded-lg border flex flex-col gap-2 bg-gray-50 dark:bg-gray-900/40">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{edu.qualification} ({edu.universityName})</span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${edu.status === 'accepted' ? 'bg-green-100 text-green-800' : edu.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : edu.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'}`}>{edu.status ? edu.status.charAt(0).toUpperCase() + edu.status.slice(1) : 'Unverified'}</span>
                          </div>
                          <div className="text-xs text-gray-500">Field: {edu.fieldOfStudy}</div>
                          {edu.degreeFile && (
                            <button type="button" className="text-blue-600 underline text-sm w-fit" onClick={() => setModalDoc({ url: edu.degreeFile!, label: edu.qualification })}>View</button>
                          )}
                          {edu.status === 'rejected' && edu.remarks && (
                            <div className="text-xs text-red-600 mt-1">Remarks: {edu.remarks}</div>
                          )}
                          {edu.status === 'rejected' && (
                            <input type="file" accept="application/pdf,image/*" onChange={e => { const file = e.target.files && e.target.files[0]; if (file) handleEduFile(idx, file); }} className="w-full mt-2" />
                          )}
                        </div>
                      )) : <div className="text-gray-500">No education documents uploaded.</div>}
                    </div>
                  </div>
                  <button type="submit" className="mt-6 py-2 px-6 bg-amber-500 text-white font-bold rounded-lg">Resubmit for Verification</button>
                </form>
              ) : (
                // ... existing modernized grid/modal UI for rejected/pending/accepted ...
                // (leave as is from previous refactor)
                <form onSubmit={handleSubmit}>
                  {/* Documents Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {requiredDocs.map(doc => {
                      const status = verification?.[doc.statusKey] || 'unverified';
                      const remarks = verification?.[doc.remarksKey] || '';
                      const url = verification?.[doc.name] || '';
                      return (
                        <div key={doc.name} className="p-4 rounded-lg border flex flex-col gap-2 bg-gray-50 dark:bg-gray-900/40">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{doc.label}</span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${status === 'accepted' ? 'bg-green-100 text-green-800' : status === 'pending' ? 'bg-yellow-100 text-yellow-800' : status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                          </div>
                          {url && (
                            <button type="button" className="text-blue-600 underline text-sm w-fit" onClick={() => setModalDoc({ url, label: doc.label })}>View</button>
                          )}
                          {status === 'rejected' && remarks && (
                            <div className="text-xs text-red-600 mt-1">Remarks: {remarks}</div>
                          )}
                          {(status === 'rejected' || status === 'unverified') && (
                            <input type="file" name={doc.name} accept="application/pdf,image/*" onChange={handleDocFileChange} className="w-full mt-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Certifications Grid */}
                  <div className="mt-8">
                    <h3 className="font-semibold mb-2">Certifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {certifications.length > 0 ? certifications.map((cert, idx) => (
                        <div key={cert.id || idx} className="p-4 rounded-lg border flex flex-col gap-2 bg-gray-50 dark:bg-gray-900/40">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{cert.courseName} ({cert.instituteName})</span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${cert.status === 'accepted' ? 'bg-green-100 text-green-800' : cert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : cert.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'}`}>{cert.status ? cert.status.charAt(0).toUpperCase() + cert.status.slice(1) : 'Unverified'}</span>
                          </div>
                          <div className="text-xs text-gray-500">Year: {cert.yearOfCompletion}</div>
                          {cert.certificateFile && (
                            <button type="button" className="text-blue-600 underline text-sm w-fit" onClick={() => setModalDoc({ url: cert.certificateFile!, label: cert.courseName })}>View</button>
                          )}
                          {cert.status === 'rejected' && cert.remarks && (
                            <div className="text-xs text-red-600 mt-1">Remarks: {cert.remarks}</div>
                          )}
                          {(cert.status === 'rejected' || cert.status === 'unverified') && (
                            <input type="file" accept="application/pdf,image/*" onChange={e => { const file = e.target.files && e.target.files[0]; if (file) handleCertFile(idx, file); }} className="w-full mt-2" />
                          )}
                        </div>
                      )) : <div className="text-gray-500">No certifications uploaded.</div>}
                    </div>
                  </div>
                  {/* Educations Grid */}
                  <div className="mt-8">
                    <h3 className="font-semibold mb-2">Educations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {educations.length > 0 ? educations.map((edu, idx) => (
                        <div key={edu.id || idx} className="p-4 rounded-lg border flex flex-col gap-2 bg-gray-50 dark:bg-gray-900/40">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{edu.qualification} ({edu.universityName})</span>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${edu.status === 'accepted' ? 'bg-green-100 text-green-800' : edu.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : edu.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-800'}`}>{edu.status ? edu.status.charAt(0).toUpperCase() + edu.status.slice(1) : 'Unverified'}</span>
                          </div>
                          <div className="text-xs text-gray-500">Field: {edu.fieldOfStudy}</div>
                          {edu.degreeFile && (
                            <button type="button" className="text-blue-600 underline text-sm w-fit" onClick={() => setModalDoc({ url: edu.degreeFile!, label: edu.qualification })}>View</button>
                          )}
                          {edu.status === 'rejected' && edu.remarks && (
                            <div className="text-xs text-red-600 mt-1">Remarks: {edu.remarks}</div>
                          )}
                          {(edu.status === 'rejected' || edu.status === 'unverified') && (
                            <input type="file" accept="application/pdf,image/*" onChange={e => { const file = e.target.files && e.target.files[0]; if (file) handleEduFile(idx, file); }} className="w-full mt-2" />
                          )}
                        </div>
                      )) : <div className="text-gray-500">No education documents uploaded.</div>}
                    </div>
                  </div>
                  <button type="submit" className="mt-6 py-2 px-6 bg-amber-500 text-white font-bold rounded-lg">Submit for Verification</button>
                </form>
              )}
            </div>
          )}

          {/* Modal for document preview - Moved outside all forms */}
          <Dialog open={!!modalDoc} onOpenChange={open => !open && setModalDoc(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>View Document</DialogTitle>
              </DialogHeader>
              {modalDoc && (
                <div className="flex flex-col items-center gap-4">
                  {modalDoc.url.endsWith('.pdf') ? (
                    <iframe src={modalDoc.url} title={modalDoc.label} className="w-full h-96 rounded border" />
                  ) : (
                    <img src={modalDoc.url} alt={modalDoc.label} className="max-w-full max-h-96 rounded border" />
                  )}
                  <div className="text-sm text-gray-600">{modalDoc.label}</div>
                  <a href={modalDoc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open in new tab</a>
                </div>
              )}
              <DialogClose asChild>
                <button className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200">Close</button>
              </DialogClose>
            </DialogContent>
          </Dialog>

        </>
      )}
    </div>
  );
};

export default ProfilePage;