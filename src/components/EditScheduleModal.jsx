import React from 'react';

function EditScheduleModal({ isOpen, onClose, doctor }) {
  // Modal එක Open වෙලා නැත්නම් හරි, Doctor කෙනෙක් Select කරලා නැත්නම් හරි මුකුත් පෙන්වන්න එපා
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh] animate-slide-up overflow-hidden">
        
        {/* Header (Doctor's Info) */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <img src={doctor.imageUrl} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm" />
            <div>
              <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">{doctor.name}</h2>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-0.5">{doctor.specialty}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 shadow-sm border border-slate-100 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          
          {/* Shift Time Update */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Update Shift Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Working Days</label>
                <input 
                  type="text" 
                  defaultValue={doctor.days}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Shift Time</label>
                <input 
                  type="text" 
                  defaultValue={doctor.shift}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium text-slate-700" 
                />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          {/* Current Status Update */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Quick Status Update</h3>
            <div>
              <select 
                defaultValue={doctor.status}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none"
              >
                <option value="Available">🟢 Available</option>
                <option value="In Consultation">🔵 In Consultation</option>
                <option value="On Leave">🔴 On Leave</option>
              </select>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 transition-all text-sm shadow-sm">
            Cancel
          </button>
          <button className="px-8 py-3 rounded-xl font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 transition-all text-sm hover:-translate-y-0.5">
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}

export default EditScheduleModal;