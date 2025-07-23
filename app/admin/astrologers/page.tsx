"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter } from "lucide-react";

// Define a type for the astrologers list items based on usage
interface AstrologerListItem {
  id?: string | number;
  astrologer?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    yearsOfExperience?: number;
    verificationStatus?: string;
    createdAt?: string;
    // Remove [key: string]: any; and use a safer index signature if needed
    [key: string]: unknown;
  };
  // Remove [key: string]: any; and use a safer index signature if needed
  [key: string]: unknown;
}

export default function AstrologersPage() {
  const router = useRouter();
  const [astrologers, setAstrologers] = useState<AstrologerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAstrologers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/astrologer/verifications-pending", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch astrologers");
        const data = await res.json();
        setAstrologers(data.pending || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Unknown error");
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAstrologers();
  }, []);

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

      {/* Loading/Error */}
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}

      {/* Astrologers Table */}
      {!loading && !error && (
        <div className="bg-white dark:bg-[#0B1120] rounded-lg shadow-sm overflow-x-auto border border-gray-200 dark:border-[#1f2937]">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-[#1e293b]">
              <tr>
                {["Name", "Phone", "Experience", "Status", "Joined"].map((heading, index) => (
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
              {astrologers.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No astrologers pending verification.
                  </td>
                </tr>
              )}
              {astrologers.map((astro, index) => (
                <tr
                  key={astro.id || index}
                  className="hover:bg-gray-50 dark:hover:bg-[#1e293b] transition-colors cursor-pointer"
                  onClick={() => router.push(`/admin/astrologers/${encodeURIComponent((astro.astrologer && typeof astro.astrologer.email === 'string') ? astro.astrologer.email : '')}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {(astro.astrologer && typeof astro.astrologer.firstName === 'string' ? astro.astrologer.firstName : '')} {(astro.astrologer && typeof astro.astrologer.lastName === 'string' ? astro.astrologer.lastName : '')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                    {(astro.astrologer && typeof astro.astrologer.phone === 'string' ? astro.astrologer.phone : '-')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-200">
                    {(astro.astrologer && typeof astro.astrologer.yearsOfExperience === 'number' ? astro.astrologer.yearsOfExperience : '-')} yrs
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          astro.astrologer && astro.astrologer.verificationStatus === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : astro.astrologer && astro.astrologer.verificationStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        }`}
                    >
                      {(astro.astrologer && typeof astro.astrologer.verificationStatus === 'string' && astro.astrologer.verificationStatus)
                        ? astro.astrologer.verificationStatus.charAt(0).toUpperCase() + astro.astrologer.verificationStatus.slice(1)
                        : "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                    {(astro.astrologer && typeof astro.astrologer.createdAt === 'string' && astro.astrologer.createdAt)
                      ? new Date(astro.astrologer.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
