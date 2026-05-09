import React, { useState } from 'react';
import axios from 'axios';

function ApplyLeaveModal({ isOpen, onClose, onLeaveApplied }) {
  const [leaveDate, setLeaveDate] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!leaveDate || !reason) {
      setError("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('staffToken');

      await axios.post(`http://localhost:8080/api/doctor-management/leaves/apply/${userId}`, {
        leaveDate,
        reason
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      
      setLeaveDate('');
      setReason('');
      setIsSubmitting(false);
      onLeaveApplied(); 
      onClose();
    } catch (err) {
      setError("Failed to apply leave. Please try again.");
      setIsSubmitting(false);
    }
  };


  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 animate-fade-in p-8">
        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Apply for Leave</h2>
        <p className="text-sm font-medium text-slate-500 mb-6">Submit a new leave request for administrator approval.</p>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Leave Date</label>
            <input 
              type="date" 
              min={today}
              value={leaveDate}
              onChange={(e) => setLeaveDate(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Reason for Leave</label>
            <textarea 
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="E.g., Personal matter, Medical emergency..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
            ></textarea>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center">
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyLeaveModal;