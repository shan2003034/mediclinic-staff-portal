import React from 'react';

function StatCard({ title, value, icon, colorClass, bgColorClass }) {
  return (
    <div className="bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5 group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${bgColorClass} ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-slate-800">{value}</h3>
      </div>
    </div>
  );
}

export default StatCard;