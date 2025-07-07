'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CheckCircle, Clock, XCircle, AlertCircle, Plus, Trash } from "lucide-react";

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

type ApprovalStatus = 'verified' | 'pending' | 'rejected';

type ProfileForm = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  otp: string;
  phoneVerified: boolean;
  experience: string;
  expertise: string[];
  aadhar: File | null;
  profilePhoto: File | null;
  bankDetails: string;
  aadharVerified: boolean;
  adminApproved: boolean;
};

const ProfilePage = () => {
  const router = useRouter();
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>('pending'); // Mock status - change as needed
  const [form, setForm] = useState<ProfileForm>({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    otp: "",
    phoneVerified: false,
    experience: "",
    expertise: [],
    aadhar: null,
    profilePhoto: null,
    bankDetails: "",
    aadharVerified: false,
    adminApproved: false,
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  // Check if user should only access profile page
  useEffect(() => {
    if (approvalStatus === 'pending' || approvalStatus === 'rejected') {
      const currentPath = window.location.pathname;
      if (currentPath !== '/astrologer/profile') {
        router.replace('/astrologer/profile');
      }
    }
  }, [approvalStatus, router]);

  const getStatusConfig = (status: ApprovalStatus) => {
    switch (status) {
      case 'verified':
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
    }
  };

  const statusConfig = getStatusConfig(approvalStatus);
  const StatusIcon = statusConfig.icon;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files ? files[0] : null;
      setForm({ ...form, [name]: file });
      if (file) {
        setPreviewPhoto(URL.createObjectURL(file));
        setSelectedAvatar(null); // Clear avatar if uploading
      } else {
        setPreviewPhoto(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleExpertiseChange = (option: string) => {
    setForm((prev) => {
      const exists = prev.expertise.includes(option);
      return {
        ...prev,
        expertise: exists
          ? prev.expertise.filter((ex) => ex !== option)
          : [...prev.expertise, option],
      };
    });
  };

  const sendOtp = () => {
    setOtpSent(true);
    // Simulate sending OTP
  };

  const verifyOtp = () => {
    // Simulate OTP verification
    setForm({ ...form, phoneVerified: true });
  };

  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setPreviewPhoto(null);
    setForm((prev) => ({ ...prev, profilePhoto: null }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here
    alert("Profile submitted (mock)");
  };

  return (
    <div className="relative">
      {/* Access Restriction Notice */}
      {(approvalStatus === 'pending' || approvalStatus === 'rejected') && (
        <motion.div
          className={`mb-6 p-4 rounded-lg border-l-4 ${
            approvalStatus === 'pending' 
              ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' 
              : 'border-red-500 bg-red-50 dark:bg-red-900/20'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
              approvalStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
            }`} />
            <div>
              <h3 className={`font-semibold ${
                approvalStatus === 'pending' 
                  ? 'text-yellow-800 dark:text-yellow-200' 
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {approvalStatus === 'pending' ? 'Profile Under Review' : 'Profile Rejected'}
              </h3>
              <p className={`text-sm mt-1 ${
                approvalStatus === 'pending' 
                  ? 'text-yellow-700 dark:text-yellow-300' 
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {approvalStatus === 'pending' 
                  ? 'Your profile is currently being reviewed by our admin team. You can only access this profile management page until your account is approved.'
                  : 'Your profile has been rejected. Please update your information and resubmit for review. You can only access this profile management page.'
                }
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Manage Profile Card */}
      <motion.div
        className="w-full mx-auto bg-amber-new dark:bg-black p-5 sm:p-8 rounded-xl shadow relative"
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
            <span className={`font-semibold text-sm ${statusConfig.color}`}>
              {statusConfig.text}
            </span>
          </motion.div>
        </div>
        <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>
        
        {/* Profile Photo Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-28 h-28 mb-2">
            <img
              src={
                previewPhoto ||
                selectedAvatar ||
                "/images/placeholder-user.jpg"
              }
              alt="Profile Preview"
              className="w-28 h-28 object-cover rounded-full border-4 border-amber-400 dark:border-purple-400 shadow"
            />
            <label className="absolute bottom-0 right-0 bg-amber-500 dark:bg-purple-600 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-amber-600 dark:hover:bg-purple-700 transition-colors">
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
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

        <motion.form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div>
            <label className="block font-semibold text-sm mb-1">Full Name</label>
            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} className="w-full px-4 py-2 rounded border" required />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Email ID</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded border" required />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="w-full px-4 py-2 rounded border" required />
          </div>
          <div>
            <label className="block font-semibold text-sm mb-1">YOE</label>
            <input type="number" name="experience" value={form.experience} onChange={handleChange} className="w-full px-4 py-2 rounded border" min="0" required />
          </div>
          <div className="col-span-2">
            <label className="block font-semibold text-sm mb-1">Phone Number</label>
            <div className="flex flex-wrap gap-2">
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="flex-1 px-4 py-2 rounded border" required disabled={form.phoneVerified} />
              {!form.phoneVerified && (
                <motion.button
                  type="button"
                  className="w-fit px-3 py-2 bg-amber-500 dark:bg-purple-600 text-white rounded"
                  onClick={sendOtp}
                  disabled={otpSent || !form.phone}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send OTP
                </motion.button>
              )}
              {form.phoneVerified && <span className="text-green-600 font-semibold">Verified</span>}
            </div>
            <AnimatePresence>
              {otpSent && !form.phoneVerified && (
                <motion.div
                  className="flex gap-2 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <input type="text" placeholder="Enter OTP" value={otpInput} onChange={e => setOtpInput(e.target.value)} className="flex-1 px-4 py-2 rounded border" />
                  <motion.button
                    type="button"
                    className="px-3 py-2 bg-green-600 text-white rounded"
                    onClick={verifyOtp}
                    disabled={!otpInput}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Verify OTP
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="col-span-2">
            <label className="block font-semibold text-sm mb-1">Areas of Expertise</label>
            <div className="flex flex-wrap gap-2">
              {expertiseOptions.map((option) => (
                <label key={option} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={form.expertise.includes(option)}
                    onChange={() => handleExpertiseChange(option)}
                  />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block font-semibold text-sm mb-1">Upload Aadhar Card</label>
            <input type="file" name="aadhar" accept="application/pdf,image/*" onChange={handleChange} className="w-full" />
            <div className="text-xs text-gray-500 mt-1">PDF or image, max 2MB</div>
          </div>
          <div className="col-span-2">
            <label className="block font-semibold text-sm mb-1">Bank Details <span className="text-xs text-gray-400">(optional, or during approval)</span></label>
            <input type="text" name="bankDetails" value={form.bankDetails} onChange={handleChange} className="w-full px-4 py-2 rounded border" placeholder="Account No, IFSC, etc." />
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <div className="flex items-center text-sm gap-2">
              <span className="font-semibold">Aadhar Verification:</span>
              <span className={form.aadharVerified ? "text-green-600" : "text-yellow-600"}>{form.aadharVerified ? "Verified" : "Pending (manual/API KYC)"}</span>
            </div>
            <div className="flex items-center text-sm gap-2">
              <span className="font-semibold">Admin Approval:</span>
              <span className={form.adminApproved ? "text-green-600" : "text-yellow-600"}>{form.adminApproved ? "Approved" : "Pending"}</span>
            </div>
          </div>
          <div className="col-span-2 flex item-center justify-center">
            <motion.button
              type="submit"
              className="py-3 px-6 bg-amber-500 dark:bg-purple-700 text-white font-bold rounded-lg mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Save Profile
            </motion.button>
          </div>
        </motion.form>
      </motion.div>

      {/* Verification Documents Section */}
      <VerificationDocumentsSection />
    </div>
  );
};

const VerificationDocumentsSection = () => {
  const [docs, setDocs] = useState({
    pan: null as File | null,
    selfie: null as File | null,
    workProof: null as File | null,
    declaration: null as File | null,
    addressProof: null as File | null,
  });
  const [certifications, setCertifications] = useState([
    { courseName: '', instituteName: '', yearOfCompletion: '', file: null as File | null },
  ]);
  const [educations, setEducations] = useState([
    { qualification: '', fieldOfStudy: '', universityName: '', file: null as File | null },
  ]);

  const handleDocChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setDocs((prev) => ({ ...prev, [name]: files && files[0] ? files[0] : null }));
  };

  const handleCertChange = (idx: number, field: string, value: string | File | null) => {
    setCertifications((prev) =>
      prev.map((c, i) =>
        i === idx ? { ...c, [field]: value } : c
      )
    );
  };
  const addCert = () => setCertifications((prev) => [...prev, { courseName: '', instituteName: '', yearOfCompletion: '', file: null }]);
  const removeCert = (idx: number) => setCertifications((prev) => prev.filter((_, i) => i !== idx));

  const handleEduChange = (idx: number, field: string, value: string | File | null) => {
    setEducations((prev) =>
      prev.map((e, i) =>
        i === idx ? { ...e, [field]: value } : e
      )
    );
  };
  const addEdu = () => setEducations((prev) => [...prev, { qualification: '', fieldOfStudy: '', universityName: '', file: null }]);
  const removeEdu = (idx: number) => setEducations((prev) => prev.filter((_, i) => i !== idx));

  return (
    <motion.div
      className="w-full mx-auto bg-amber-new dark:bg-black p-5 sm:p-8 rounded-xl shadow mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className="text-xl font-bold mb-4">Verification Documents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-semibold text-sm mb-1">Upload PAN Card</label>
          <input type="file" name="pan" accept="application/pdf,image/*" onChange={handleDocChange} className="w-full" />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">Upload Selfie</label>
          <input type="file" name="selfie" accept="image/*" onChange={handleDocChange} className="w-full" />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">Upload Work Proof</label>
          <input type="file" name="workProof" accept="application/pdf,image/*" onChange={handleDocChange} className="w-full" />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">Upload Declaration Form</label>
          <input type="file" name="declaration" accept="application/pdf,image/*" onChange={handleDocChange} className="w-full" />
        </div>
        <div>
          <label className="block font-semibold text-sm mb-1">Upload Address Proof</label>
          <input type="file" name="addressProof" accept="application/pdf,image/*" onChange={handleDocChange} className="w-full" />
        </div>
      </div>
      {/* Certifications Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Certifications</h3>
          <button type="button" onClick={addCert} className="flex items-center gap-1 px-2 py-1 bg-amber-500 dark:bg-purple-700 text-white rounded hover:bg-amber-600 dark:hover:bg-purple-800 transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {certifications.map((cert, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end bg-white dark:bg-zinc-900 p-3 rounded-lg shadow border border-gray-200 dark:border-zinc-800">
              <input type="text" placeholder="Course Name" value={cert.courseName} onChange={e => handleCertChange(idx, 'courseName', e.target.value)} className="col-span-1 px-2 py-1 rounded border" />
              <input type="text" placeholder="Institute Name" value={cert.instituteName} onChange={e => handleCertChange(idx, 'instituteName', e.target.value)} className="col-span-1 px-2 py-1 rounded border" />
              <input type="text" placeholder="Year of Completion" value={cert.yearOfCompletion} onChange={e => handleCertChange(idx, 'yearOfCompletion', e.target.value)} className="col-span-1 px-2 py-1 rounded border" />
              <input type="file" accept="application/pdf,image/*" onChange={e => handleCertChange(idx, 'file', e.target.files && e.target.files[0] ? e.target.files[0] : null)} className="col-span-1" />
              <button type="button" onClick={() => removeCert(idx)} className="col-span-1 flex items-center justify-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Educations Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">Educations</h3>
          <button type="button" onClick={addEdu} className="flex items-center gap-1 px-2 py-1 bg-amber-500 dark:bg-purple-700 text-white rounded hover:bg-amber-600 dark:hover:bg-purple-800 transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {educations.map((edu, idx) => (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end bg-white dark:bg-zinc-900 p-3 rounded-lg shadow border border-gray-200 dark:border-zinc-800">
              <input type="text" placeholder="Qualification" value={edu.qualification} onChange={e => handleEduChange(idx, 'qualification', e.target.value)} className="col-span-1 px-2 py-1 rounded border" />
              <input type="text" placeholder="Field of Study" value={edu.fieldOfStudy} onChange={e => handleEduChange(idx, 'fieldOfStudy', e.target.value)} className="col-span-1 px-2 py-1 rounded border" />
              <input type="text" placeholder="University Name" value={edu.universityName} onChange={e => handleEduChange(idx, 'universityName', e.target.value)} className="col-span-1 px-2 py-1 rounded border" />
              <input type="file" accept="application/pdf,image/*" onChange={e => handleEduChange(idx, 'file', e.target.files && e.target.files[0] ? e.target.files[0] : null)} className="col-span-1" />
              <button type="button" onClick={() => removeEdu(idx)} className="col-span-1 flex items-center justify-center px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                <Trash className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;