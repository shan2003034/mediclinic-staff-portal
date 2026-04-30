import React from 'react';

function NewAppointmentModal({ isOpen, onClose }) {
  // Modal එක Open වෙලා නැත්නම් මුකුත් පෙන්වන්න එපා
  if (!isOpen) return null;

  return (
    // 1. Dark Overlay (පිටිපස්සේ අඳුරු වෙන කොටස)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose} // එළියෙන් Click කරාමත් වැහෙනවා
      ></div>

      {/* 2. Modal Box */}
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] animate-slide-up overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">New Appointment</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">Schedule a new visit for a patient.</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 shadow-sm border border-slate-100 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Form Body (Scroll වෙන්න හදලා තියෙන්නේ) */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <form className="space-y-6">
            
            {/* Patient Details Section */}
            <div>
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Patient Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Patient Name</label>
                  <input type="text" placeholder="e.g. John Doe" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Phone Number</label>
                  <input type="tel" placeholder="+94 77 000 0000" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                </div>
              </div>
            </div>

            {/* Appointment Details Section */}
            <div className="pt-2">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Appointment Details</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Select Doctor</label>
                  <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 appearance-none">
                    <option value="">Choose a specialist...</option>
                    <option value="1">Dr. Sarah Johnson (Cardiology)</option>
                    <option value="2">Dr. Michael Lee (Neurology)</option>
                    <option value="3">Dr. Emily Chen (Pediatrics)</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Date</label>
                    <input type="date" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Time Slot</label>
                    <select className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 appearance-none">
                      <option value="">Select time...</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:30">11:30 AM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Reason for Visit (Optional)</label>
                  <textarea rows="2" placeholder="Briefly describe the symptoms..." className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700 resize-none"></textarea>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-all text-sm shadow-sm"
          >
            Cancel
          </button>
          <button 
            className="px-8 py-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all text-sm hover:-translate-y-0.5"
          >
            Book Appointment
          </button>
        </div>

      </div>
    </div>
  );
}

export default NewAppointmentModal;