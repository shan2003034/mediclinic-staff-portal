import React from 'react';
import { useNavigate } from 'react-router-dom';

function PatientQueueCard({ number, name, type, time, patientId = "101" }) {
  const navigate = useNavigate(); // Page eka maru karanna meka ona

  return (
    <div className="flex items-center justify-between p-4 bg-white hover:bg-blue-50/50 rounded-2xl border border-slate-100 transition-all group">
      <div className="flex items-center gap-4">
        {/* Token Number */}
        <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-xl flex items-center justify-center font-black text-lg transition-all shadow-sm">
          {number}
        </div>
        <div>
          <p className="font-bold text-slate-800">{name}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type} • {time}</p>
        </div>
      </div>
      
      {/* Start Session Button */}
      <button 
        onClick={() => navigate(`/doctor/consultation/${patientId}`)} // Click karama Consultation page ekata yanawa
        className="px-4 py-2 bg-white text-blue-600 border border-blue-100 font-bold text-xs rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
      >
        Start Session
      </button>
    </div>
  );
}

export default PatientQueueCard;