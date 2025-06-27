'use client';

import React from 'react';
import Link from 'next/link';

const AstrologerAuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAEBE6] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-[#e2e2e2]">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00]">
          Astrologer Account Login
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Access your astrologer dashboard
        </p>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-800">Astrologer Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-800">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Link
                href="/astrologer/forgot-password"
                className="absolute top-2 right-3 text-sm text-orange-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox accent-gray-400" />
            <label className="text-sm text-gray-700">Remember me</label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white py-2 px-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Sign in to Astrologer Account
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700">
          <p>
            Don’t have an astrologer account?{' '}
            <Link href="/astrologer/register" className="text-orange-600 hover:underline font-medium">
              Register
            </Link>
          </p>
          <p className="mt-2">
            Need a user account?{' '}
            <Link href="/signin" className="text-orange-600 hover:underline font-medium">
              Sign in as user
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AstrologerAuthPage;
