"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { AnimatedStars } from '../../components/AnimatedStars';
import { MysticBackground } from '../../components/MysticBackground';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token"); // token from query string

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast({ title: "Error", description: "Invalid or missing token.", variant: "destructive" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/astrologer/reset-password", { token, newPassword });
      toast({ title: "Success", description: "Password has been reset!", variant: "default" });
      router.push("/astrologer/auth");
    } catch (err: unknown) {
      toast({
        title: "Error",
        description: (err && typeof err === 'object' && 'response' in err && (err as { response?: { data?: { message?: string } } })?.response?.data?.message)
          ? (err as { response?: { data?: { message?: string } } }).response!.data!.message
          : "Failed to reset password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#ece7e4] relative min-h-screen flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-90">
        <AnimatedStars />
        <MysticBackground />
      </div>

      <div className="relative z-10 max-w-md w-full bg-[#111] p-8 rounded-3xl shadow-2xl border border-[#222] text-white">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
          Reset Your Password
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Enter a new password for your astrologer account
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-300">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-700 bg-[#1C1C1C] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-300">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full px-4 py-2 border border-gray-700 bg-[#1C1C1C] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#a084ee] to-[#f857a6] text-white rounded-xl font-semibold hover:brightness-110 transition"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Back to{" "}
            <Link href="/astrologer/auth" className="text-[#f857a6] hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
