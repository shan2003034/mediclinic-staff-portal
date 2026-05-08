import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AppointmentQueueCard({ appointment }) {
  const navigate = useNavigate();
  
 
  const [imgError, setImgError] = useState(false);

  const getStatusBadge = (status) => {
    if (status === 'Completed') return <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-extrabold uppercase tracking-wider rounded-lg">Completed</span>;
    if (status === 'In Progress') return <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-extrabold uppercase tracking-wider rounded-lg">In Progress</span>;
    return <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-extrabold uppercase tracking-wider rounded-lg">Waiting</span>;
  };

  const handleStartConsultation = () => {
    alert(`Starting consultation for ${appointment.patientName} (App. ID: ${appointment.appointmentId})`);
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-center gap-6">
      
      {/* 1. Queue Number */}
      <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-100 rounded-2xl flex flex-col items-center justify-center shadow-inner">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Queue</span>
        <span className="text-2xl font-black text-blue-600 leading-none">
          {appointment.appointmentNumber < 10 ? `0${appointment.appointmentNumber}` : appointment.appointmentNumber}
        </span>
      </div>

      {/* 2. Patient Info */}
      <div className="flex items-center gap-4 flex-1 w-full">
        
        
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl font-black overflow-hidden border-2 border-white shadow-sm shrink-0">
          {appointment.patientProfileImage && !imgError ? (
            <img 
              src={appointment.patientProfileImage} 
              alt={appointment.patientName} 
              className="w-full h-full object-cover" 
              onError={() => setImgError(true)} 
            />
          ) : (
           
            appointment.patientName ? appointment.patientName.charAt(0).toUpperCase() : 'U'
          )}
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-800 leading-tight">{appointment.patientName}</h3>
          <p className="text-sm font-semibold text-slate-500 mt-0.5 truncate max-w-[200px] md:max-w-[250px]">{appointment.reason || "General Checkup"}</p>
        </div>
      </div>

      {/* 3. Time & Status */}
      <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 md:gap-1 border-t md:border-t-0 border-slate-100 pt-4 md:pt-0">
        <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span className="text-xs font-bold">{appointment.timeSlot}</span>
        </div>
        {getStatusBadge(appointment.status)}
      </div>

      {/* 4. Action Button */}
      <div className="w-full md:w-auto mt-4 md:mt-0 shrink-0">
        <button 
          onClick={handleStartConsultation}
          disabled={appointment.status === 'Completed'}
          className={`w-full md:w-auto px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-lg flex items-center justify-center gap-2 ${
            appointment.status === 'Completed' 
            ? 'bg-slate-100 text-slate-400 shadow-none cursor-not-allowed'
            : 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5'
          }`}
        >
          {appointment.status === 'Completed' ? 'Consultation Done' : 'Start Consultation'}
          {appointment.status !== 'Completed' && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          )}
        </button>
      </div>

    </div>
  );
}

export default AppointmentQueueCard;