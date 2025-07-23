"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface Slot {
  id?: number;
  date: string;
  start: string;
  end: string;
  repeat: string;
}

type APIErrorResponse = { error?: string };


const repeatOptions = ["None", "Daily", "Weekly"];

const AvailabilityPage = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [form, setForm] = useState<Slot>({ date: "", start: "", end: "", repeat: "None" });
  const [showForm, setShowForm] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch slots on mount
  React.useEffect(() => {
    const token = localStorage.getItem('astrologerToken');
    if (!token) return;
    setLoading(true);
    fetch('/api/astrologer/availability', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setSlots(data.map(slot => ({ ...slot, date: slot.date.slice(0, 10) })));
        else setError(data.error || 'Failed to load slots');
      })
      .catch(() => setError('Failed to load slots'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateSlot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem('astrologerToken');
    if (!token) return setError('Not authenticated');
    if (!form.date || !form.start || !form.end) return;
    setLoading(true);
    try {
      let res: Response;
      if (editId !== null) {
        // Update existing slot
        res = await fetch('/api/astrologer/availability', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ ...form, id: editId })
        });
        const data = await res.json();
        if (res.ok) {
          const updatedSlot = data as Slot;
          setSlots(prev => prev.map(slot => slot.id === editId ? { ...updatedSlot, date: updatedSlot.date.slice(0, 10) } : slot));
          setEditId(null);
        } else {
          const errorData = data as APIErrorResponse;
          setError(errorData.error || 'Failed to update slot');
        }
      } else {
        // Add new slot
        res = await fetch('/api/astrologer/availability', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(form)
        });
        const data = await res.json();
        if (res.ok) {
          const newSlot = data as Slot;
          setSlots(prev => [...prev, { ...newSlot, date: newSlot.date.slice(0, 10) }]);
        } else {
          const errorData = data as APIErrorResponse;
          setError(errorData.error || 'Failed to add slot');
        }
      }
      setForm({ date: "", start: "", end: "", repeat: "None" });
    } catch {
      setError('Failed to save slot');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSlot = async (id?: number) => {
    if (!id) return;
    setError("");
    const token = localStorage.getItem('astrologerToken');
    if (!token) return setError('Not authenticated');
    setLoading(true);
    try {
      const res: Response = await fetch('/api/astrologer/availability', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id })
      });
      if (res.status === 204) {
        setSlots(prev => prev.filter(slot => slot.id !== id));
      } else {
        const data: APIErrorResponse = await res.json();
        setError(data.error || 'Failed to delete slot');
      }
    } catch {
      setError('Failed to delete slot');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSlot = (slot: Slot) => {
    setForm({ date: slot.date, start: slot.start, end: slot.end, repeat: slot.repeat });
    setEditId(slot.id!);
    setShowForm(true);
  };

  return (
    <motion.div
      className="w-full mx-auto bg-amber dark:bg-black p-5 sm:p-8 rounded-xl shadow"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="text-2xl font-bold mb-4">Availability Schedule</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Set your available slots for consultations here.</p>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {loading && <div className="text-gray-500 mb-2">Loading...</div>}
      <AnimatePresence>
        {showForm && (
          <motion.form
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            onSubmit={handleAddOrUpdateSlot}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div>
              <label className="block font-semibold text-sm mb-1">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full px-4 py-2 rounded border" required />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1">Start Time</label>
              <input type="time" name="start" value={form.start} onChange={handleChange} className="w-full px-4 py-2 rounded border" required />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1">End Time</label>
              <input type="time" name="end" value={form.end} onChange={handleChange} className="w-full px-4 py-2 rounded border" required />
            </div>
            <div>
              <label className="block font-semibold text-sm mb-1">Repeat</label>
              <select name="repeat" value={form.repeat} onChange={handleChange} className="w-full px-4 py-2 rounded border">
                {repeatOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="py-2 px-6 bg-amber-500 dark:bg-purple-700 text-white font-bold rounded-lg mt-2 shadow"
                disabled={loading}
              >
                {editId !== null ? "Update Slot" : "Add Slot"}
              </motion.button>
              {editId !== null && (
                <button
                  type="button"
                  className="ml-4 py-2 px-4 bg-gray-300 dark:bg-gray-600 text-black dark:text-white rounded-lg mt-2"
                  onClick={() => {
                    setEditId(null);
                    setForm({ date: "", start: "", end: "", repeat: "None" });
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      <div>
        <h2 className="text-lg font-semibold mb-2">Your Slots</h2>
        <div className="space-y-3">
          <AnimatePresence>
            {(!loading && slots.length === 0) && (
              <motion.div
                className="text-gray-400 text-center py-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                No slots added yet.
              </motion.div>
            )}
            {slots.map((slot) => (
              <motion.div
                key={slot.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-midnight-black border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 shadow-sm gap-2"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
                  <span><span className="font-semibold">Date:</span> {slot.date}</span>
                  <span><span className="font-semibold">Start:</span> {slot.start}</span>
                  <span><span className="font-semibold">End:</span> {slot.end}</span>
                  <span><span className="font-semibold">Repeat:</span> {slot.repeat}</span>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: '#ef4444', color: '#fff' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 rounded bg-red-100 text-red-600 font-semibold text-xs transition-colors"
                    onClick={() => handleRemoveSlot(slot.id)}
                    disabled={loading}
                  >
                    Remove
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: '#f59e42', color: '#fff' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 rounded bg-amber-100 text-amber-700 font-semibold text-xs transition-colors"
                    onClick={() => handleEditSlot(slot)}
                    disabled={loading}
                  >
                    Edit
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default AvailabilityPage;
