import React from 'react';

function ConsultationRecordOffcanvas({ isOpen, onClose, record }) {
  // Modal එක Open වෙලා නැත්නම් හෝ Record එකක් ඇවිත් නැත්නම් මුකුත් පෙන්වන්න එපා
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* 1. Backdrop (පිටිපස්ස බොඳ වෙන කොටස) */}
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      ></div>

      {/* 2. Slide-over Panel (දකුණු පැත්තෙන් එන කොටස) */}
      <div className={`relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors z-10 border border-slate-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Header - Patient Info */}
        <div className="p-8 border-b border-slate-100 bg-slate-50/80 pt-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-blue-500/30">
              {record.patientName.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">{record.patientName}</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Session: {record.id}</p>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6">
            <span className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold shadow-sm flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {record.date} • {record.time}
            </span>
          </div>
        </div>

        {/* Body Content - Scrollable */}
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar space-y-8">
          
          {/* Clinical Notes */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Diagnosis & Clinical Notes</h3>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 shadow-inner">
              <p className="text-sm font-bold text-slate-800 mb-2">{record.reason}</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {record.notes || "Patient presented with typical symptoms. Conducted routine examination. Vitals are normal. Recommended rest and prescribed standard medication."}
              </p>
            </div>
          </div>

          {/* Prescription Summary */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 flex items-center justify-between">
              <span>Prescription Issued</span>
              <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded-md">{record.prescriptionId}</span>
            </h3>
            <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-slate-50/80 px-4 py-3 border-b border-slate-100 grid grid-cols-12 gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                <div className="col-span-6">Medicine</div>
                <div className="col-span-3">Dosage</div>
                <div className="col-span-3">Frequency</div>
              </div>
              <div className="divide-y divide-slate-50 bg-white">
                <div className="px-4 py-3 grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6 font-bold text-slate-700 text-sm">Amoxicillin 500mg</div>
                  <div className="col-span-3 font-medium text-slate-600 text-xs">1 Tablet</div>
                  <div className="col-span-3 font-bold text-blue-600 text-xs">Twice (1-0-1)</div>
                </div>
                <div className="px-4 py-3 grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6 font-bold text-slate-700 text-sm">Paracetamol</div>
                  <div className="col-span-3 font-medium text-slate-600 text-xs">2 Tablets</div>
                  <div className="col-span-3 font-bold text-blue-600 text-xs">As needed</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button className="flex-1 py-3.5 bg-white text-slate-600 font-bold rounded-xl border border-slate-200 hover:bg-slate-100 transition-all text-sm flex items-center justify-center gap-2 shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
            Print Record
          </button>
          <button onClick={onClose} className="flex-1 py-3.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-all text-sm shadow-lg shadow-slate-800/20">
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConsultationRecordOffcanvas;