import React from 'react';

function PrescriptionBuilder() {
  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-extrabold text-slate-800">Prescription (Rx)</h3>
        <button className="text-blue-600 font-bold text-xs bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
          + Add Medicine
        </button>
      </div>

      <div className="space-y-4">
        {/* Mock Row for UI Design */}
        <div className="grid grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="col-span-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Medicine Name</p>
            <input type="text" placeholder="Amoxicillin 500mg" className="w-full bg-transparent font-bold text-slate-700 outline-none" />
          </div>
          <div className="col-span-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Dosage</p>
            <input type="text" placeholder="1 Tablet" className="w-full bg-transparent font-bold text-slate-700 outline-none" />
          </div>
          <div className="col-span-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Frequency</p>
            <select className="w-full bg-transparent font-bold text-slate-700 outline-none appearance-none">
              <option>Daily (1-1-1)</option>
              <option>Twice (1-0-1)</option>
            </select>
          </div>
          <div className="col-span-1 text-right">
            <button className="text-slate-300 hover:text-rose-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionBuilder;