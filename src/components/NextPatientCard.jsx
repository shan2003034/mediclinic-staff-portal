import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NextPatientCard({ patientName, time, image }) {
  const navigate = useNavigate();
  // Image error handle madalu state
  const [imgError, setImgError] = useState(false); 

  // Rogigalu yaru illade iddaga
  if (patientName === "No waiting patients" || !patientName) {
    return (
      <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-lg font-bold text-slate-800">No Waiting Patients</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">You have cleared the queue for now.</p>
      </div>
    );
  }

  // Mundina rogi iddaga
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 shadow-xl shadow-blue-500/30 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/20 rounded-2xl border-2 border-white/30 flex items-center justify-center text-3xl font-black overflow-hidden shrink-0 shadow-lg backdrop-blur-sm">
            {/* Image load agade iddaga fallback torisuva code */}
            {image && !imgError ? (
              <img
                src={image}
                alt={patientName}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              patientName ? patientName.charAt(0).toUpperCase() : 'U'
            )}
          </div>
          <div>
            <p className="text-blue-100 font-bold text-xs uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Next in Queue
            </p>
            <h3 className="text-2xl font-black text-white leading-tight">{patientName}</h3>
            <p className="text-blue-100 font-medium flex items-center gap-1.5 mt-2 text-sm">
              <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {time}
            </p>
          </div>
        </div>

        <button
          // Sidebar nalli torisuva "TodayQueue" path ge navigate maduvudu
          onClick={() => navigate('/doctor/todayAppoinments')}
          className="px-6 py-3.5 bg-white text-blue-600 font-extrabold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all whitespace-nowrap active:scale-95"
        >
          View Queue
        </button>
      </div>
    </div>
  );
}

export default NextPatientCard;