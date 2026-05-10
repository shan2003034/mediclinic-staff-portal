import React, { useState } from 'react';

function PatientProfileOffcanvas({ patient, isOpen, onClose }) {
  const [imgError, setImgError] = useState(false);

  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      
      <div 
        className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={onClose}
      ></div>

     
      <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
       
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors z-10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col items-center text-center pt-12">
          <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-extrabold mb-4 border-4 border-white shadow-lg overflow-hidden shrink-0">
            {patient.profileImgPath && !imgError ? (
              <img 
                src={patient.profileImgPath} 
                alt={patient.fullName} 
                className="w-full h-full object-cover" 
                onError={() => setImgError(true)} 
              />
            ) : (
              patient.fullName ? patient.fullName.charAt(0).toUpperCase() : 'U'
            )}
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800">{patient.fullName}</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{patient.patientId}</p>
          
          <div className="flex items-center gap-3 mt-4">
            <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold shadow-sm">{patient.age ? `${patient.age} Years` : 'N/A'}</span>
            <span className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold shadow-sm">{patient.gender || 'Unknown'}</span>
            <span className="px-3 py-1 bg-rose-50 border border-rose-100 text-rose-600 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              {patient.bloodGroup || 'O+'}
            </span>
          </div>
        </div>

        
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
          
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Contact Information</h3>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 shadow-sm mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Phone</p>
                <p className="text-sm font-semibold text-slate-800">{patient.phoneNumber}</p>
              </div>
            </div>
            <div className="w-full h-px bg-slate-100"></div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Registered Date</p>
                <p className="text-sm font-semibold text-slate-800">{patient.registeredDate}</p>
              </div>
            </div>
          </div>

          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full py-4 bg-blue-50 text-blue-600 font-bold rounded-2xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all text-sm flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              Book New Appointment
            </button>
            <button className="w-full py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all text-sm flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
              View Full Medical History
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default PatientProfileOffcanvas;