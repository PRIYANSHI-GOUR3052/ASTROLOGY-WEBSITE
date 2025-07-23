import { useState } from 'react';

import { useAuth } from "../contexts/AuthContext";
import { Dialog, DialogContent, DialogTitle } from "../../components/ui/dialog";
import { useRouter } from "next/navigation";
import {  User, X } from "lucide-react";

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getDays(month: string, year: number) {
  const monthIndex = months.indexOf(month);
  return new Date(year, monthIndex + 1, 0).getDate();
}

const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i + 1);
const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

function PersonForm({ prefix }: { prefix: string }) {
  const [month, setMonth] = useState(months[0]);
  const [day, setDay] = useState(1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [hour, setHour] = useState('12');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmpm] = useState('AM');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [dontKnowTime, setDontKnowTime] = useState(false);

  // Generate options for dropdowns
  const dayOptions = Array.from({ length: getDays(month, year) }, (_, i) => i + 1);
  const yearOptions = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
  const hourOptions = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

  return (
    <div className="flex flex-col gap-6 w-full">
      <label className="font-semibold text-base text-[#4b3f2a]">*Name:
        <input type="text" className="mt-2 w-full border border-[#e6c77e] rounded-xl px-4 py-3 bg-white text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base" placeholder={`Enter ${prefix}'s Name`} value={name} onChange={e => setName(e.target.value)} required />
      </label>
      <div>
        <span className="font-semibold text-base text-[#4b3f2a]">*Birth Date:</span>
        <div className="flex gap-3 mt-2 items-center">
          <select className="border border-[#e6c77e] rounded-xl px-3 py-3 bg-[#f5f5f4] text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base appearance-none w-32" value={month} onChange={e => setMonth(e.target.value)}>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select className="border border-[#e6c77e] rounded-xl px-3 py-3 bg-[#f5f5f4] text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base appearance-none w-20" value={day} onChange={e => setDay(Number(e.target.value))}>
            {dayOptions.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="border border-[#e6c77e] rounded-xl px-3 py-3 bg-[#f5f5f4] text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base appearance-none w-28" value={year} onChange={e => setYear(Number(e.target.value))}>
            {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>
      <div>
        <span className="font-semibold text-base text-[#4b3f2a]">*Birth Time:</span>
        <div className="flex gap-3 mt-2 items-center">
          <select className="border border-[#e6c77e] rounded-xl px-3 py-3 bg-[#f5f5f4] text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base appearance-none w-20" value={hour} onChange={e => setHour(e.target.value)} disabled={dontKnowTime}>
            {hourOptions.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
          <select className="border border-[#e6c77e] rounded-xl px-3 py-3 bg-[#f5f5f4] text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base appearance-none w-20" value={minute} onChange={e => setMinute(e.target.value)} disabled={dontKnowTime}>
            {minuteOptions.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select className="border border-[#e6c77e] rounded-xl px-3 py-3 bg-[#f5f5f4] text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base appearance-none w-20" value={ampm} onChange={e => setAmpm(e.target.value)} disabled={dontKnowTime}>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <label className="ml-3 text-sm text-[#4b3f2a] flex items-center gap-1">
            <input type="checkbox" checked={dontKnowTime} onChange={e => setDontKnowTime(e.target.checked)} /> Don&apos;t Know Birth Time
          </label>
        </div>
      </div>
      <label className="font-semibold text-base text-[#4b3f2a]">*Birth City:
        <input type="text" className="mt-2 w-full border border-[#e6c77e] rounded-xl px-4 py-3 bg-white text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
      </label>
      <div className="text-center text-[#b89c6a] text-sm cursor-pointer mt-2">[ + Advanced options / Custom Location ]</div>
    </div>
  );
}

export default function KundaliMatchingForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    if (!isAuthenticated) {
      e.preventDefault();
      setShowSignIn(true);
      return;
    }
    // ...existing submit logic (if any)...
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="max-w-5xl w-full text-center mb-4">
        <h2 className="text-lg font-medium text-[#b89c6a]">KUNDALI MATCHING BY DATE OF BIRTH</h2>
        <div className="text-2xl font-bold text-[#4b3f2a] mb-2">Get Free Online Kundali Matching Report For Marriage</div>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-[#f9f6f2] rounded-3xl shadow-xl border border-[#e6c77e] p-10 flex flex-col gap-10" style={{ boxShadow: '0 6px 32px 0 rgba(36,34,68,0.10)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          <div>
            <div className="text-lg font-semibold text-[#4b3f2a] mb-6">Enter Boy&apos;s Detail</div>
            <PersonForm prefix="Boy" />
          </div>
          <div>
            <div className="text-lg font-semibold text-[#4b3f2a] mb-6">Enter Girl&apos;s Detail</div>
            <PersonForm prefix="Girl" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 mt-2">
          <div />
          <div>
            <label className="font-semibold text-base text-[#4b3f2a]">Email:
              <input type="email" className="mt-2 w-full border border-[#e6c77e] rounded-xl px-4 py-3 bg-white text-[#4b3f2a] focus:outline-none focus:ring-2 focus:ring-[#e6c77e] text-base" placeholder="Email (optional)" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-6 mt-6">
          <button type="reset" className="px-10 py-3 rounded-xl border border-black text-black font-semibold bg-white hover:bg-gray-100 transition text-base">Clear</button>
          <button type="submit" className="px-10 py-3 rounded-xl bg-black text-white font-semibold shadow hover:bg-gray-900 transition text-base" disabled={loading}>{loading ? 'Matching...' : 'Match Kundali'}</button>
        </div>
      </form>
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent className="fixed left-1/2 top-1/2 z-50 flex flex-col items-center gap-0 p-0 rounded-3xl max-w-md w-full translate-x-[-50%] translate-y-[-50%] bg-[#fdf6f2] shadow-xl border border-[#e6c77e] overflow-hidden">
          {/* Top Row: User Icon and Close */}
          <div className="w-full flex items-center justify-between px-6 pt-6 pb-2">
            <User className="w-7 h-7 text-[#4b3f2a]" />
            <button onClick={() => setShowSignIn(false)} className="p-1 rounded-full hover:bg-gray-200 transition">
              <X className="w-6 h-6 text-[#4b3f2a]" />
            </button>
          </div>
          {/* Heading */}
          <div className="w-full flex flex-col items-center px-8 pb-6">
            <DialogTitle className="text-2xl font-bold text-[#4b3f2a] mb-2 text-center">Please sign in to continue</DialogTitle>
          </div>
          {/* Divider */}
          <div className="w-full h-px bg-[#ece6da]" />
          {/* Action Buttons */}
          <div className="w-full flex">
            <button
              className="flex-1 py-4 text-base font-semibold text-[#4b3f2a] bg-transparent hover:bg-[#f3e8ff] transition rounded-bl-3xl"
              onClick={() => router.push('/signin')}
            >
              Sign In
            </button>
            <div className="w-px bg-[#ece6da]" />
            <button
              className="flex-1 py-4 text-base font-semibold text-[#4b3f2a] bg-transparent hover:bg-[#e0f2fe] transition rounded-br-3xl"
              onClick={() => setShowSignIn(false)}
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 