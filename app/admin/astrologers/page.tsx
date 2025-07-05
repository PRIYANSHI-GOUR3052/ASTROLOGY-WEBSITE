"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Search, Filter } from "lucide-react";

const mockAstrologers = [
  {
    name: "Dr. Narendra Sharma",
    email: "narendra@nakshatra.com",
    phone: "+91 90000 11111",
    expertise: "Vedic, Tarot",
    experience: 15,
    documentStatus: "Verified",
    joined: "Jan 10, 2024",
  },
  {
    name: "Priya Joshi",
    email: "priya@nakshatra.com",
    phone: "+91 90000 22222",
    expertise: "Numerology",
    experience: 7,
    documentStatus: "Pending",
    joined: "Feb 2, 2024",
  },
  {
    name: "Rajesh Verma",
    email: "rajesh@nakshatra.com",
    phone: "+91 90000 33333",
    expertise: "Palmistry",
    experience: 10,
    documentStatus: "Rejected",
    joined: "Mar 5, 2024",
  },
  {
    name: "Anjali Mehta",
    email: "anjali@nakshatra.com",
    phone: "+91 90000 44444",
    expertise: "Horoscope, Numerology",
    experience: 12,
    documentStatus: "Verified",
    joined: "Apr 12, 2024",
  },
  {
    name: "Siddharth Roy",
    email: "siddharth@nakshatra.com",
    phone: "+91 90000 55555",
    expertise: "Tarot",
    experience: 5,
    documentStatus: "Pending",
    joined: "May 22, 2024",
  },
  {
    name: "Meera Desai",
    email: "meera@nakshatra.com",
    phone: "+91 90000 66666",
    expertise: "Kundli Matching",
    experience: 8,
    documentStatus: "Rejected",
    joined: "Jun 14, 2024",
  },
  {
    name: "Arjun Kapoor",
    email: "arjun@nakshatra.com",
    phone: "+91 90000 77777",
    expertise: "Vastu Shastra",
    experience: 9,
    documentStatus: "Verified",
    joined: "Jul 1, 2024",
  },
];


export default function AstrologersPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Astrologers</h2>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search astrologers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg bg-white dark:bg-[#0B1120] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg hover:bg-gray-50 dark:hover:bg-[#1e293b] text-gray-800 dark:text-gray-100">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Astrologers Table */}
      <div className="bg-white dark:bg-[#0B1120] rounded-lg shadow-sm overflow-x-auto border border-gray-200 dark:border-[#1f2937]">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-[#1e293b]">
            <tr>
              {['Name', 'Phone', 'Experience', 'Status', 'Joined'].map((heading, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600 dark:text-gray-400`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#1f2937]">
            {mockAstrologers.map((astro, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-colors cursor-pointer"
                onClick={() => router.push(`/admin/astrologers/${encodeURIComponent(astro.email)}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {astro.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                  {astro.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                  {astro.experience} yrs
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${
                        astro.documentStatus === "Verified"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : astro.documentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                  >
                    {astro.documentStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                  {astro.joined}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
