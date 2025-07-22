'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X, CalendarClock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar as DateCalendar } from '@/components/ui/calendar';
import { TimePicker } from '@/app/components/ui/time-picker';

// Mock data for bookings
// Remove mockBookings array

interface TimePickerNoSecondsProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

type Booking = {
  id: number;
  type: string;
  client: string;
  date: string;
  [key: string]: unknown;
};

const BookingsPage = () => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [filterDate, setFilterDate] = useState('');
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleBookingId, setRescheduleBookingId] = useState<number | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(undefined);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectBookingId, setRejectBookingId] = useState<number | null>(null);
  const [rejectRemarks, setRejectRemarks] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false); // for accept/reject/reschedule only
  const fetchIdRef = useRef(0);

  // Get JWT token (adjust as per your auth storage)
  const token = typeof window !== 'undefined' ? localStorage.getItem('astrologerToken') : null;

  // Robust fetchBookings with race condition prevention
  const fetchBookings = useCallback(async () => {
    const fetchId = ++fetchIdRef.current;
    setLoading(true);
    setError(null);
    try {
      let url = `/api/astrologer/bookings?status=${tab}`;
      if (filterDate) url += `&date=${filterDate}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      // Only update if this is the latest fetch
      if (fetchId === fetchIdRef.current) {
        setBookings(data.bookings || []);
      }
    } catch (e: unknown) {
      if (fetchId === fetchIdRef.current) setError(e instanceof Error ? e.message : 'Error fetching bookings');
    } finally {
      if (fetchId === fetchIdRef.current) setLoading(false);
    }
  }, [tab, filterDate, token]);

  useEffect(() => {
    if (token) fetchBookings();
  }, [tab, filterDate, token, fetchBookings]);

  // Manual reload
  const handleReload = () => {
    if (token) fetchBookings();
  };

  const handleAccept = async (bookingId: number) => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/astrologer/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'accept', bookingId }),
      });
      if (!res.ok) throw new Error('Failed to accept booking');
      await fetchBookings();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error accepting booking');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenReschedule = (booking: Booking) => {
    setRescheduleBookingId(booking.id);
    setRescheduleDate(new Date(booking.date));
    setRescheduleOpen(true);
  };

  const handleCloseReschedule = () => {
    setRescheduleOpen(false);
    setRescheduleBookingId(null);
    setRescheduleDate(undefined);
  };

  const handleSaveReschedule = async () => {
    if (!rescheduleBookingId || !rescheduleDate) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/astrologer/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'reschedule', bookingId: rescheduleBookingId, newDate: rescheduleDate }),
      });
      if (!res.ok) throw new Error('Failed to reschedule booking');
      await fetchBookings();
      handleCloseReschedule();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error rescheduling booking');
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenReject = (booking: Booking) => {
    setRejectBookingId(booking.id);
    setRejectRemarks("");
    setRejectOpen(true);
  };

  const handleCloseReject = () => {
    setRejectOpen(false);
    setRejectBookingId(null);
    setRejectRemarks("");
  };

  const handleConfirmReject = async () => {
    if (!rejectBookingId) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/astrologer/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'reject', bookingId: rejectBookingId, remarks: rejectRemarks }),
      });
      if (!res.ok) throw new Error('Failed to reject booking');
      await fetchBookings();
      handleCloseReject();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error rejecting booking');
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered bookings for UI
  const filteredBookings = bookings;

  return (
    <motion.div
      className="w-full mx-auto bg-amber-new dark:bg-black p-5 sm:p-8 rounded-xl shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">View Bookings</h1>
        <Button variant="outline" onClick={handleReload} disabled={loading || actionLoading}>
          {loading ? 'Refreshing...' : 'Reload'}
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none ${
              tab === 'upcoming'
                ? 'bg-amber-500 dark:bg-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none ${
              tab === 'past'
                ? 'bg-amber-500 dark:bg-purple-500 text-white'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
            }`}
            onClick={() => setTab('past')}
          >
            Past
          </button>
        </div>
        <div className="flex flex-col gap-1 w-full max-w-36">
          <Label htmlFor="date-filter">Filter by Date</Label>
          <div className="relative">
            <Input
              id="date-filter"
              type="date"
              value={filterDate}
              onChange={e => setFilterDate(e.target.value)}
              className="bg-white dark:bg-gray-700 border-2 border-amber-400 dark:border-purple-500 shadow focus:border-amber-600 dark:focus:border-purple-500 focus:ring-2 focus:ring-amber-300 dark:focus:ring-purple-300 px-2"
            />
          </div>
        </div>
      </div>
      {loading && <div className="text-center text-gray-500 dark:text-gray-300 py-10">Loading bookings...</div>}
      {error && <div className="text-center text-red-500 dark:text-red-400 py-10">{error}</div>}
      {filteredBookings.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-300 py-10">
          No {tab} bookings found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredBookings.map(booking => (
            <motion.div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border-l-4 border-amber-500 dark:border-purple-500 flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * booking.id }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-amber-500 dark:text-purple-400">{booking.type}</span>
                <span className="text-xs px-2 py-1 rounded bg-amber-100 dark:bg-purple-900 text-amber-700 dark:text-purple-200 font-semibold">
                  {tab === 'upcoming' ? 'Upcoming' : 'Past'}
                </span>
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Client:</span> {booking.client?.name} ({booking.client?.email})
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleString()}
              </div>
              {tab === 'upcoming' && (
                <div className="flex gap-2 mt-2">
                  <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1" onClick={() => handleAccept(booking.id)} disabled={loading || actionLoading}>
                    {loading || actionLoading ? 'Accepting...' : <Check className="w-4 h-4" />} Accept
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1"
                    onClick={() => handleOpenReject(booking)}
                    disabled={loading || actionLoading}
                  >
                    {loading || actionLoading ? 'Rejecting...' : <X className="w-4 h-4" />} Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-amber-500 dark:border-purple-500 text-amber-700 dark:text-purple-400 hover:bg-amber-50 dark:hover:bg-purple-950 flex items-center gap-1"
                    onClick={() => handleOpenReschedule(booking)}
                    disabled={loading || actionLoading}
                  >
                    {loading || actionLoading ? 'Rescheduling...' : <CalendarClock className="w-4 h-4" />} Reschedule
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      {/* Reschedule Modal */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent className='bg-amber-new dark:bg-midnight-black'>
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-8 p-4 bg-amber-new-light dark:bg-black rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full mx-auto">
            {/* Selected Date Badge */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Selected Date</span>
              <span className="inline-block px-4 py-2 rounded-full bg-amber-100 dark:bg-purple-900 text-amber-700 dark:text-purple-200 text-lg font-bold tracking-wide shadow">
                {rescheduleDate ? rescheduleDate.toLocaleDateString() : 'No date selected'}
              </span>
            </div>
            <div className="flex flex-col gap-8 items-center justify-center overflow-y-auto h-72 pt-56 pb-10">
              <div>
                <DateCalendar
                  mode="single"
                  selected={rescheduleDate}
                  onSelect={setRescheduleDate}
                  className="rounded-lg border shadow calendar-modern"
                  classNames={{
                    day_selected: 'bg-amber-600 dark:bg-purple-600 text-white hover:bg-amber-700 dark:hover:bg-purple-700 focus:bg-amber-700 dark:focus:bg-purple-700',
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Select Time</span>
                <div className="flex items-center justify-center bg-amber-light dark:bg-black rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700 shadow gap-2">
                  {/* Custom compact time picker: Only hours, minutes, AM/PM */}
                  <TimePickerNoSeconds date={rescheduleDate} setDate={setRescheduleDate} />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseReschedule} disabled={loading || actionLoading}>Cancel</Button>
            <Button variant="outline" onClick={handleSaveReschedule} disabled={loading || actionLoading}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Reject Modal */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent className='bg-amber-new dark:bg-midnight-black'>
          <DialogHeader>
            <DialogTitle>Reject Booking</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 p-4 bg-amber-new-light dark:bg-black rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full mx-auto">
            <Label htmlFor="remarks">Remarks (optional)</Label>
            <textarea
              id="remarks"
              value={rejectRemarks}
              onChange={e => setRejectRemarks(e.target.value)}
              className="w-full min-h-[80px] rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white"
              placeholder="Enter remarks for rejection..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseReject} disabled={loading || actionLoading}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmReject} disabled={loading || actionLoading}>Confirm Reject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// Custom TimePicker without seconds
function TimePickerNoSeconds({ date, setDate }: TimePickerNoSecondsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400 mx-auto">Hours</span>
        <Input
          type="number"
          min={1}
          max={12}
          value={date ? ((date.getHours() % 12) || 12).toString().padStart(2, '0') : ''}
          onChange={e => {
            if (!date) return;
            const newDate = new Date(date);
            let hours = parseInt(e.target.value);
            if (isNaN(hours) || hours < 1 || hours > 12) return;
            const currentHours = newDate.getHours();
            const isPM = currentHours >= 12;
            if (isPM) hours = (hours % 12) + 12;
            else hours = hours % 12;
            newDate.setHours(hours);
            setDate(newDate);
          }}
          className="w-fit text-center"
        />
      </div>
      <span className="text-xl font-bold mt-2">:</span>
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">Minutes</span>
        <Input
          type="number"
          min={0}
          max={59}
          value={date ? date.getMinutes().toString().padStart(2, '0') : ''}
          onChange={e => {
            if (!date) return;
            const newDate = new Date(date);
            const minutes = parseInt(e.target.value);
            if (isNaN(minutes) || minutes < 0 || minutes > 59) return;
            newDate.setMinutes(minutes);
            setDate(newDate);
          }}
          className="w-fit text-center"
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">AM/PM</span>
        <select
          value={date ? (date.getHours() >= 12 ? 'PM' : 'AM') : 'AM'}
          onChange={e => {
            if (!date) return;
            const newDate = new Date(date);
            const hours = newDate.getHours();
            if (e.target.value === 'PM' && hours < 12) newDate.setHours(hours + 12);
            if (e.target.value === 'AM' && hours >= 12) newDate.setHours(hours - 12);
            setDate(newDate);
          }}
          className="w-16 text-center rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-2 py-1"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}

export default BookingsPage;