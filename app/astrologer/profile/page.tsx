'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      className="w-full mx-auto bg-gray-50 dark:bg-gray-900 p-5 sm:p-8 rounded-xl shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>
      {/* Profile Photo Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-28 h-28 mb-2">
          <img
            src={
              previewPhoto ||
              selectedAvatar ||
              "/public/images/placeholder-user.jpg"
            }
            alt="Profile Preview"
            className="w-28 h-28 object-cover rounded-full border-4 border-purple-400 shadow"
          />
          <label className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-2 cursor-pointer shadow-lg hover:bg-purple-700 transition-colors">
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
              className={`w-10 h-10 rounded-full border-2 ${selectedAvatar === avatar ? "border-purple-600" : "border-gray-300"} overflow-hidden focus:outline-none focus:ring-2 focus:ring-purple-500`}
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
                className="w-fit px-3 py-2 bg-purple-600 text-white rounded"
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
            className="py-3 px-6 bg-purple-700 text-white font-bold rounded-lg mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Save Profile
          </motion.button>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ProfilePage;