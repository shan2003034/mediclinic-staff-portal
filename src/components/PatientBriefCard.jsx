import React from 'react';

function PatientBriefCard({ patientName, age, gender, bloodGroup, lastVisit }) {
  return (
    <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-sm flex flex-wrap items-center gap-8">
      <div className="flex items-center gap-4 border-r border-slate-100 pr-8">
        <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-blue-500/20">
          {patientName.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">{patientName}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Consultation</p>
        </div>
      </div>
      
      <div className="flex gap-10">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Age / Gender</p>
          <p className="text-sm font-bold text-slate-700">{age} Yrs • {gender}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Blood Group</p>
          <p className="text-sm font-bold text-rose-600">{bloodGroup}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Visit</p>
          <p className="text-sm font-bold text-slate-700">{lastVisit}</p>
        </div>
      </div>
    </div>
  );
}

export default PatientBriefCard;