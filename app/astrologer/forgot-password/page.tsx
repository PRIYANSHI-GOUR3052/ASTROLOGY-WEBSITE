'use client';

import Link from 'next/link';

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAEBE6] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Reset Password</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Enter your email address and we’ll send you instructions to reset your password.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] text-white rounded-xl font-semibold hover:shadow-md transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-orange-600 hover:underline font-medium">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
