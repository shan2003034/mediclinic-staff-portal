import React from 'react';

function DoctorAvailabilityCard({ name, specialty, status, color, imageUrl }) {
  // Status එකේ Dot එකට අදාළ පාට
  const dotColors = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500'
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-slate-50/80 rounded-[1.5rem] transition-colors border border-transparent hover:border-slate-100 group">
      
      <div className="flex items-center gap-4">
        {/* Doctor Photo or Fallback Icon */}
        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-white shadow-md shrink-0">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          )}
        </div>
        
        <div>
          <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{name}</p>
          <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest mt-0.5">{specialty}</p>
        </div>
      </div>

      {/* Modern Status Pill */}
      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
        <div className={`w-2 h-2 rounded-full ${dotColors[color] || dotColors.blue}`}></div>
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{status}</span>
      </div>

    </div>
  );
}

export default DoctorAvailabilityCard;