import React from 'react';

function StatCard({ label, value, iconPath, color }) {
  // පාට අනුව Tailwind Classes වෙනස් කරන Logic එක
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600'
  };

  const currentColors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${currentColors}`}>
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath}></path>
        </svg>
      </div>
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">{value}</h3>
      </div>
    </div>
  );
}

export default StatCard;