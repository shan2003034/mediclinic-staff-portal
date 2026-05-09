import React from 'react';

function ScheduleCard({ schedule }) {
  return (
    <div className="bg-white rounded-[1.5rem] p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
      <div className="flex items-center gap-4">
        
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm uppercase group-hover:bg-blue-600 group-hover:text-white transition-colors">
          {schedule.dayOfWeek.substring(0, 3)}
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-slate-800 capitalize">{schedule.dayOfWeek}</h3>
          <p className="text-sm font-medium text-slate-500 flex items-center gap-1.5 mt-0.5">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {schedule.startTime} - {schedule.endTime}
          </p>
        </div>
      </div>
      
      
      <div className="text-right bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Max Patients</p>
        <p className="text-lg font-black text-slate-700">{schedule.maxPatients}</p>
      </div>
    </div>
  );
}

export default ScheduleCard;