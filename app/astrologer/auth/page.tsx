"use client";

import React from "react";
import Link from "next/link";
import { AnimatedStars } from "../../components/AnimatedStars";
import { MysticBackground } from "../../components/MysticBackground";
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const AstrologerAuthPage = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/astrologer/profile/');
  };

  return (
    <div className="bg-[#ece7e4] relative min-h-screen flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-90">
        <AnimatedStars />
        <MysticBackground />
      </div>

      <div className="relative z-10 max-w-md w-full bg-[#111] p-8 rounded-3xl shadow-2xl border border-[#222] text-white">
        <h2
          className="text-2xl font-bold text-center mb-2"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Astrologer Account Login
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Access your astrologer dashboard
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-300">
              Astrologer Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-700 bg-[#1C1C1C] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-medium text-gray-300">Password</label>
              <Link
                href="/astrologer/forgot-password"
                className="text-sm text-[#f857a6] hover:underline whitespace-nowrap"
              >
                Forgot your password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-700 bg-[#1C1C1C] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-[#a084ee]" />
            <label className="text-sm text-gray-300">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#a084ee] to-[#f857a6] text-white rounded-xl font-semibold hover:brightness-110 transition"
          >
            Sign in to Astrologer Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          <p>
            Don't have an astrologer account?{" "}
            <Link
              href="/astrologer/register"
              className="text-[#f857a6] hover:underline font-medium"
            >
              Register
            </Link>
          </p>
          <p className="mt-2">
            Need a user account?{" "}
            <Link
              href="/signin"
              className="text-[#f857a6] hover:underline font-medium"
            >
              Sign in as user
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AstrologerAuthPage;
