"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const dummyEarnings = [
  { month: "Jan", earnings: 8000 },
  { month: "Feb", earnings: 12000 },
  { month: "Mar", earnings: 9500 },
  { month: "Apr", earnings: 14000 },
  { month: "May", earnings: 11500 },
  { month: "Jun", earnings: 16000 },
];

const dummyWithdrawals = [
  { date: "2024-06-15", amount: 5000, status: "Approved" },
  { date: "2024-06-01", amount: 3000, status: "Pending" },
  { date: "2024-05-15", amount: 2000, status: "Rejected" },
  { date: "2024-05-01", amount: 4000, status: "Approved" },
];

const WithdrawPage = () => {
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    alert(`Withdrawal request submitted for ₹${amount}`);
    setAmount("");
  };

  return (
    <div className="min-h-screen p-8 rounded-xl bg-[#FFF5E1] dark:bg-black text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Withdraw Earnings</h1>

      {/* 🧾 Earnings Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-50 dark:bg-[#111] border border-[#222] p-5 rounded-xl shadow text-gray-900 dark:text-white">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Earnings</p>
          <h3 className="text-2xl font-bold mt-2">₹75,000</h3>
        </div>
        <div className="bg-gray-50 dark:bg-[#111] border border-[#222] p-5 rounded-xl shadow text-gray-900 dark:text-white">
          <p className="text-sm text-gray-500 dark:text-gray-400">Available Balance</p>
          <h3 className="text-2xl font-bold mt-2">₹18,000</h3>
        </div>
        <div className="bg-gray-50 dark:bg-[#111] border border-[#222] p-5 rounded-xl shadow text-gray-900 dark:text-white">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending Withdrawals</p>
          <h3 className="text-2xl font-bold mt-2">₹3,000</h3>
        </div>
        <div className="bg-gray-50 dark:bg-[#111] border border-[#222] p-5 rounded-xl shadow text-gray-900 dark:text-white">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Withdrawn</p>
          <h3 className="text-2xl font-bold mt-2">₹54,000</h3>
        </div>
      </div>
      
      {/* Earnings Overview */}
      <div className="bg-gray-50 dark:bg-[#111] border border-[#222] p-6 rounded-xl shadow mb-8 text-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">
          Earnings Overview (Last 6 Months)
        </h2>
        <div className="w-full h-64 text-amber-500 dark:text-purple-500">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="currentColor"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Withdrawal Request */}
      <div className="bg-gray-50 dark:bg-[#111] border border-[#222] p-6 rounded-xl shadow mb-8 text-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Request Withdrawal</h2>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Input
            placeholder="Enter Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full md:w-1/2 bg-white dark:bg-[#1C1C1C] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
          />
          <Button
            onClick={handleWithdraw}
            className="bg-amber-500 dark:bg-purple-500 hover:bg-amber-600 dark:hover:bg-purple-600 text-white"
          >
            Withdraw
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Minimum withdrawal: ₹1000</p>
      </div>

      {/* Withdrawal History */}
      <div className="bg-gray-50 dark:bg-[#111] border border-[#222] p-6 rounded-xl shadow text-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold mb-4">Withdrawal History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Amount (₹)</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyWithdrawals.map((entry, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-[#1A1A1A]"
                >
                  <td className="py-2 px-4">{entry.date}</td>
                  <td className="py-2 px-4">₹{entry.amount}</td>
                  <td
                    className={`py-2 px-4 ${
                      entry.status === "Approved"
                        ? "text-green-600 dark:text-green-400"
                        : entry.status === "Rejected"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {entry.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;
