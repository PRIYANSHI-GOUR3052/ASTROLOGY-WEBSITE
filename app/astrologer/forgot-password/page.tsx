'use client';

import Link from 'next/link';
import { AnimatedStars } from '../../components/AnimatedStars';
import { MysticBackground } from '../../components/MysticBackground';

const ForgotPasswordPage = () => {
  return (
    <div className="bg-[#ece7e4] relative min-h-screen flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 opacity-90">
        <AnimatedStars />
        <MysticBackground />
      </div>

      <div className="relative z-10 max-w-md w-full bg-[#111] p-8 rounded-3xl shadow-2xl border border-[#222] text-white">
        <h2 className="text-2xl font-bold text-center mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
          Reset Password
        </h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Enter your email address and we’ll send you instructions to reset your password.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-700 bg-[#1C1C1C] text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a084ee]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#a084ee] to-[#f857a6] text-white rounded-xl font-semibold hover:brightness-110 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-[#f857a6] hover:underline font-medium">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
