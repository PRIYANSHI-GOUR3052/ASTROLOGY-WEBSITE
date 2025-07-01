'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X, CalendarClock, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Calendar as DateCalendar } from '@/components/ui/calendar';
import { TimePicker } from '@/app/components/ui/time-picker';

// Mock data for bookings
const mockBookings = [
  {
    id: 1,
    client: 'John Doe',
    date: '2024-06-10T15:00:00',
    type: 'Vedic Astrology',
    status: 'upcoming',
  },
  {
    id: 2,
    client: 'Jane Smith',
    date: '2024-05-20T11:00:00',
    type: 'Tarot Reading',
    status: 'past',
  },
  {
    id: 3,
    client: 'Amit Kumar',
    date: '2024-06-12T18:30:00',
    type: 'Numerology',
    status: 'upcoming',
  },
  {
    id: 4,
    client: 'Priya Singh',
    date: '2024-05-01T09:00:00',
    type: 'Palmistry',
    status: 'past',
  },
];

interface TimePickerNoSecondsProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const BookingsPage = () => {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [filterDate, setFilterDate] = useState('');
  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [rescheduleBookingId, setRescheduleBookingId] = useState<number | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<Date | undefined>(undefined);

  const filteredBookings = mockBookings.filter(b => {
    if (b.status !== tab) return false;
    if (!filterDate) return true;
    // Compare only the date part (YYYY-MM-DD)
    return b.date.slice(0, 10) === filterDate;
  });

  const handleOpenReschedule = (booking: typeof mockBookings[0]) => {
    setRescheduleBookingId(booking.id);
    setRescheduleDate(new Date(booking.date));
    setRescheduleOpen(true);
  };

  const handleCloseReschedule = () => {
    setRescheduleOpen(false);
    setRescheduleBookingId(null);
    setRescheduleDate(undefined);
  };

  const handleSaveReschedule = () => {
    // Here you would update the booking with the new date/time
    setRescheduleOpen(false);
    setRescheduleBookingId(null);
    setRescheduleDate(undefined);
  };

  return (
    <motion.div
      className="w-full mx-auto bg-gray-50 dark:bg-gray-900 p-5 sm:p-8 rounded-xl shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h1 className="text-2xl font-bold mb-4">View Bookings</h1>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none ${tab === 'upcoming' ? 'bg-purple-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
            onClick={() => setTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-colors focus:outline-none ${tab === 'past' ? 'bg-purple-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
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
              className="bg-white dark:bg-gray-700 border-2 border-purple-400 dark:border-purple-600 shadow focus:border-purple-600 focus:ring-2 focus:ring-purple-300 px-2"
            />
            {/* <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 w-5 h-5 pointer-events-none" /> */}
          </div>
        </div>
      </div>
      {filteredBookings.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-300 py-10">
          No {tab} bookings found.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredBookings.map(booking => (
            <motion.div
              key={booking.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 border-l-4 border-purple-500 flex flex-col gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * booking.id }}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-purple-700">{booking.type}</span>
                <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-700 font-semibold">
                  {tab === 'upcoming' ? 'Upcoming' : 'Past'}
                </span>
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Client:</span> {booking.client}
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Date:</span> {new Date(booking.date).toLocaleString()}
              </div>
              {tab === 'upcoming' && (
                <div className="flex gap-2 mt-2">
                  <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-1">
                    <Check className="w-4 h-4" /> Accept
                  </Button>
                  <Button variant="destructive" size="sm" className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1">
                    <X className="w-4 h-4" /> Reject
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-500 text-purple-700 hover:bg-purple-50 flex items-center gap-1"
                    onClick={() => handleOpenReschedule(booking)}>
                    <CalendarClock className="w-4 h-4" /> Reschedule
                  </Button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
      {/* Reschedule Modal */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-8 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl w-full mx-auto">
            {/* Selected Date Badge */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Selected Date</span>
              <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200 text-lg font-bold tracking-wide shadow">
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
                    day_selected: 'bg-purple-600 text-white hover:bg-purple-700 focus:bg-purple-700',
                  }}
                />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-gray-500 dark:text-gray-400 mb-1">Select Time</span>
                <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700 shadow gap-2">
                  {/* Custom compact time picker: Only hours, minutes, AM/PM */}
                  <TimePickerNoSeconds date={rescheduleDate} setDate={setRescheduleDate} />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseReschedule}>Cancel</Button>
            <Button variant="outline" onClick={handleSaveReschedule}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// Custom TimePicker without seconds
function TimePickerNoSeconds({ date, setDate }: TimePickerNoSecondsProps) {
  const minuteRef = React.useRef(null);
  const periodRef = React.useRef(null);
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
            let newDate = new Date(date);
            let hours = parseInt(e.target.value);
            if (isNaN(hours) || hours < 1 || hours > 12) return;
            let currentHours = newDate.getHours();
            let isPM = currentHours >= 12;
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
            let newDate = new Date(date);
            let minutes = parseInt(e.target.value);
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
            let newDate = new Date(date);
            let hours = newDate.getHours();
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