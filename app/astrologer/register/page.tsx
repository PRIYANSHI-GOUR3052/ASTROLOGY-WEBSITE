"use client";

import React from "react";
import Link from "next/link";

const AstrologerRegisterPage = () => {
  return (
    <div className="min-h-screen bg-[#FAEBE6] flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-3xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00]">
          Register Astrologer Account
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Create your astrologer account to start offering your services
        </p>

        <form className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>

          {/* Business Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Astrology Specialization
            </label>
            <input className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio / Description
            </label>
            <textarea
              rows={3}
              className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                WhatsApp / Business Phone
              </label>
              <input className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500" />
            </div>
          </div>

          {/* Business Location */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                placeholder="Enter your country"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl bg-gray-100 focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                State/Province
              </label>
              <input
                type="text"
                placeholder="State or Province"
                className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 bg-gray-100 rounded-xl focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Account Security */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full mt-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox accent-gray-400" />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <span className="text-orange-600 font-medium underline">
                Terms
              </span>{" "}
              and{" "}
              <span className="text-orange-600 font-medium underline">
                Privacy Policy
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-gradient-to-r from-[#6A0DAD] to-[#FF8C00] rounded-xl font-semibold hover:shadow-md transition"
          >
            Register Astrologer
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an astrologer account?{" "}
          <Link
            href="/astrologer/auth"
            className="text-orange-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AstrologerRegisterPage;
