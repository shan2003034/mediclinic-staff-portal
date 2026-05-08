import React from 'react';

function PrescriptionBuilder() {
  return (
    <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-extrabold text-slate-800">Prescription Details (Rx)</h3>
        {/* අර කලින් තිබ්බ + Add Medicine බොත්තම දැන් අවශ්‍ය නැති නිසා අයින් කළා */}
      </div>

      <div className="space-y-4">
        {/* Database එකේ medicince_details TEXT එකට ගැලපෙන Text Area එක */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">Medicine & Instructions</p>
          <textarea 
            rows="6"
            placeholder="e.g.&#10;1. Amoxicillin 500mg - 1 Tablet (Twice a day)&#10;2. Paracetamol - 2 Tablets (As needed for fever)&#10;3. Vitamin C - 1 Tablet (Daily)" 
            className="w-full bg-transparent font-medium text-slate-700 outline-none resize-none" 
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default PrescriptionBuilder;